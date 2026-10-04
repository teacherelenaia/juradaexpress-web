// app/api/stripe-webhook/route.js
//
// Aviso a Elena de cada pago (04/10/2026). Stripe llama a esta ruta cuando
// se completa un pago (checkout.session.completed y, para métodos de pago
// diferidos, checkout.session.async_payment_succeeded). Vale para los pagos
// del catálogo/calculadora de la web y también para los Payment Links que
// Elena envía a mano. Se manda un email con Resend a QUOTE_TO_EMAIL
// (info@juradaexpress.es) con el cliente, lo pagado y el enlace al pago en
// Stripe; «Responder» contesta directamente al cliente.
//
// Requiere en Vercel: STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET (whsec_… del
// endpoint creado en Stripe), RESEND_API_KEY, QUOTE_FROM_EMAIL y,
// opcionalmente, QUOTE_TO_EMAIL.
import Stripe from "stripe";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const PAID_EVENTS = new Set([
  "checkout.session.completed",
  "checkout.session.async_payment_succeeded",
]);

function money(amount, currency) {
  if (amount == null) return "(importe no disponible)";
  try {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: String(currency || "eur").toUpperCase(),
    }).format(amount / 100);
  } catch {
    return `${(amount / 100).toFixed(2)} ${String(currency || "").toUpperCase()}`;
  }
}

function formatAddress(a) {
  if (!a) return "";
  return [a.line1, a.line2, [a.postal_code, a.city].filter(Boolean).join(" "), a.state, a.country]
    .filter(Boolean)
    .join(", ");
}

async function sendEmail({ subject, text, replyTo }) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.QUOTE_FROM_EMAIL;
  const to = process.env.QUOTE_TO_EMAIL || "info@juradaexpress.es";
  if (!apiKey || !from) throw new Error("email-not-configured");
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      ...(replyTo ? { reply_to: replyTo } : {}),
      subject,
      text,
    }),
  });
  if (!res.ok) throw new Error(`resend-${res.status}`);
}

export async function POST(req) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "webhook-not-configured" }, { status: 500 });
  }

  // La firma se comprueba sobre el cuerpo SIN parsear.
  const raw = await req.text();
  let event;
  try {
    event = stripe.webhooks.constructEvent(raw, req.headers.get("stripe-signature"), secret);
  } catch {
    return NextResponse.json({ error: "bad-signature" }, { status: 400 });
  }

  if (!PAID_EVENTS.has(event.type)) {
    return NextResponse.json({ received: true, ignored: event.type });
  }

  const session = event.data.object;
  // Con métodos diferidos (transferencia, etc.) «completed» llega antes de
  // cobrar: solo se avisa cuando está pagado.
  if (session.payment_status !== "paid") {
    return NextResponse.json({ received: true, pending: session.payment_status });
  }

  let items = [];
  try {
    const li = await stripe.checkout.sessions.listLineItems(session.id, { limit: 50 });
    items = li.data.map(
      (i) => `  - ${i.description || "(sin descripción)"} × ${i.quantity} · ${money(i.amount_total, i.currency)}`
    );
  } catch {
    items = ["  (no se han podido leer los conceptos; míralos en Stripe)"];
  }

  const c = session.customer_details || {};
  const email = c.email || session.customer_email || "";
  const name = c.name || "";
  const phone = c.phone || "";
  const meta = Object.entries(session.metadata || {}).map(([k, v]) => `  ${k}: ${v}`);
  const origin = session.payment_link ? "Payment Link enviado a mano" : "web (catálogo / calculadora)";
  const paymentUrl = session.payment_intent
    ? `https://dashboard.stripe.com/payments/${session.payment_intent}`
    : `https://dashboard.stripe.com/checkout/sessions/${session.id}`;
  const when = new Date((session.created || Date.now() / 1000) * 1000).toLocaleString("es-ES", {
    timeZone: "Europe/Madrid",
  });

  const lines = [
    "Nuevo pago recibido en Jurada Express. Ponte con el encargo.",
    "",
    `Importe: ${money(session.amount_total, session.currency)}`,
    `Fecha: ${when}`,
    `Origen: ${origin}`,
    "",
    "Conceptos:",
    ...items,
    "",
    "Cliente:",
    `  Nombre: ${name || "(no indicado)"}`,
    `  Email: ${email || "(no indicado)"}`,
    `  Teléfono: ${phone || "(no indicado)"}`,
    formatAddress(c.address) ? `  Dirección: ${formatAddress(c.address)}` : null,
    meta.length ? "" : null,
    meta.length ? "Datos adicionales:" : null,
    ...meta,
    "",
    "Si el cliente aún no ha enviado el documento, respóndele a este email (va directo a él) o escríbele por WhatsApp.",
    "",
    `Ver el pago en Stripe: ${paymentUrl}`,
  ].filter((l) => l !== null);

  const firstItem = items[0] ? items[0].replace(/^\s*-\s*/, "").split(" × ")[0] : "pedido";
  const subject = `Pago recibido · ${money(session.amount_total, session.currency)} · ${firstItem} · ${
    name || email || "cliente"
  }`;

  try {
    await sendEmail({ subject, text: lines.join("\n"), replyTo: email || undefined });
  } catch (err) {
    console.error("stripe-webhook email error:", err?.message);
    // 500 → Stripe reintenta el aviso durante varios días.
    return NextResponse.json({ error: "email-failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true, emailed: true });
}
