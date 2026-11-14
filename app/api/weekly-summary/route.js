// app/api/weekly-summary/route.js
//
// Resumen semanal de contactos por correo (14/11/2026). Lo llama Vercel Cron
// (vercel.json) los sábados a las 06:00 y a las 07:00 UTC; solo manda el
// correo la llamada que cae a partir de las 8:00 de Madrid (07:00 UTC en
// invierno, 06:00 UTC en verano) y solo una vez por semana: deja una marca
// en Blob (resumenes/AAAA-MM-DD.json, fecha del sábado de inicio).
//
// Contenido (app/lib/weeklySummary.js): contactos de la semana anterior
// (sábado a viernes) por origen, con Google Ads por campaña y palabra
// clave, WhatsApp y calculadora por separado y personas distintas; pagos
// de Stripe de la semana con `ref`, por origen, en euros y en dólares; y
// el número de pagos sin `ref`. Texto plano, sin datos de los clientes.
//
// Seguridad: con CRON_SECRET en Vercel, Vercel Cron manda
// «Authorization: Bearer <CRON_SECRET>» y solo se aceptan esas llamadas;
// con ese mismo token se puede pedir a mano la semana de una fecha
// (?semana=AAAA-MM-DD, sin comprobar hora ni marca; ?enviar=0 devuelve el
// texto sin mandarlo). Sin CRON_SECRET solo se aceptan llamadas con el
// agente de Vercel Cron, y la marca semanal impide más de un correo.
import Stripe from "stripe";
import { resendConfig, sendResendEmail } from "../../lib/resend";
import { listAll, readJson, putJson, blobExists, loadRef, hasBlob } from "../../lib/contactLog";
import {
  madridNow,
  previousWeek,
  summarizeContacts,
  summarizePayments,
  summarySubject,
  summaryText,
  ymd,
} from "../../lib/weeklySummary";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const json = (body, status = 200) => Response.json(body, { status });

function authorized(req) {
  const secret = process.env.CRON_SECRET;
  const auth = req.headers.get("authorization") || "";
  if (secret) return { ok: auth === `Bearer ${secret}`, manual: auth === `Bearer ${secret}` };
  const ua = req.headers.get("user-agent") || "";
  return { ok: /vercel-cron/i.test(ua), manual: false };
}

async function loadContacts(days) {
  const blobs = (await Promise.all(days.map((d) => listAll(`contactos/${d}/`)))).flat();
  const out = await Promise.all(blobs.map((b) => readJson(b.url)));
  return out.filter(Boolean);
}

async function loadPayments(from, to) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return { payments: [], error: "sin STRIPE_SECRET_KEY" };
  const stripe = new Stripe(key, { maxNetworkRetries: 1, timeout: 20000 });
  const payments = [];
  try {
    for await (const s of stripe.checkout.sessions.list({
      created: { gte: Math.floor(from.getTime() / 1000), lt: Math.floor(to.getTime() / 1000) },
      status: "complete",
      limit: 100,
    })) {
      if (s.payment_status !== "paid" && s.payment_status !== "no_payment_required") continue;
      payments.push({
        amount: s.amount_total || 0,
        currency: s.currency || "eur",
        ref: String((s.metadata && s.metadata.ref) || "").trim(),
      });
    }
  } catch (err) {
    console.error("[weekly-summary] stripe", err?.message);
    return { payments, error: "no se pudieron leer todos los pagos de Stripe" };
  }
  await Promise.all(
    payments.map(async (p) => {
      if (/^JX-/i.test(p.ref)) p.origin = await loadRef(p.ref.toUpperCase());
    })
  );
  return { payments, error: "" };
}

export async function GET(req) {
  const auth = authorized(req);
  if (!auth.ok) return json({ error: "unauthorized" }, 401);

  const url = new URL(req.url);
  const manualDate = auth.manual ? url.searchParams.get("semana") : null;
  const send = url.searchParams.get("enviar") !== "0";

  let now = new Date();
  if (manualDate && /^\d{4}-\d{2}-\d{2}$/.test(manualDate)) {
    // La semana que termina antes de esa fecha (a mediodía, para no caer
    // en el cambio de día por la zona horaria).
    now = new Date(`${manualDate}T12:00:00Z`);
  } else {
    const m = madridNow(now);
    if (m.weekday !== 6 || m.hour < 8) return json({ skipped: "fuera de hora", madrid: m });
  }

  const week = previousWeek(now);
  const marker = `resumenes/${ymd(week.start)}.json`;
  if (!manualDate && send && (await blobExists(marker))) {
    return json({ skipped: "ya enviado", semana: ymd(week.start) });
  }

  const [contactsRaw, paymentsRes] = await Promise.all([
    loadContacts(week.days),
    loadPayments(week.from, week.to),
  ]);
  const notes = [];
  if (!hasBlob()) notes.push("Aviso: sin acceso al almacén de Vercel Blob, no hay contactos registrados.");
  if (paymentsRes.error) notes.push(`Aviso: ${paymentsRes.error}.`);
  notes.push(
    "Los WhatsApp que se cuentan son los que llegan con referencia JX (visitas con campaña: anuncio, ChatGPT u otra fuente con utm)."
  );
  const subject = summarySubject(week);
  const text = summaryText({
    week,
    contacts: summarizeContacts(contactsRaw),
    payments: summarizePayments(paymentsRes.payments),
    notes,
  });

  if (!send) return json({ subject, text });

  const mail = resendConfig();
  if (!mail) return json({ error: "email-not-configured", subject }, 500);
  const ok = await sendResendEmail({ ...mail, subject, text });
  // La marca se deja solo si el correo ha salido: si falla, la llamada de
  // la hora siguiente lo vuelve a intentar.
  if (ok && !manualDate) await putJson(marker, { at: new Date().toISOString(), subject });
  return json({ sent: ok, subject }, ok ? 200 : 502);
}
