// app/api/quote/route.js
//
// Recibe la solicitud de la calculadora de precio (QuoteCalculator.js):
// resumen (documento, páginas, urgencia, entrega, estimación), datos de
// contacto del cliente (nombre, email y teléfono, opcionales) + hasta 5
// archivos (PDF/JPG/PNG, 10 MB cada uno) y los reenvía por email a Elena
// con Resend (API REST con fetch: sin dependencia npm). Asunto:
// «Presupuesto web · <documento> · <email>» (sin email: teléfono o nombre).
// Solo servidor: RESEND_API_KEY nunca llega al navegador.
//
// Sin RESEND_API_KEY responde { ok: true, emailed: false }: la calculadora
// sigue funcionando y, como los archivos NO han llegado por email, el
// resumen de WhatsApp y la pantalla de confirmación piden al cliente que
// los adjunte en el chat. Igual ante cualquier error de envío (ok: false).
// Variables en .env.local.example.
//
// Nota Vercel: el cuerpo de una petición a una función serverless está
// limitado a ~4,5 MB, así que el cliente envía los archivos en varias
// peticiones (una por lote de hasta 4 MB); cada petición produce un email.
import { NextResponse } from "next/server";
import { DOCUMENTS, MIN_PRICE } from "../../../content/documents";
import { URGENCY_SURCHARGE } from "../../../content/site";

export const runtime = "nodejs";

const MAX_FILES = 5;
const MAX_FILE_BYTES = 10 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["application/pdf", "image/jpeg", "image/png"]);
const ALLOWED_EXT = /\.(pdf|jpe?g|png)$/i;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const json = (body, status = 200) => NextResponse.json(body, { status });

function clean(value, max = 200) {
  return String(value ?? "")
    .replace(/[\r\n]+/g, " ")
    .trim()
    .slice(0, max);
}

// La estimación se recalcula aquí a partir del catálogo: nunca se confía
// en el importe que manda el navegador.
function estimate(doc, pages, urgent) {
  if (!doc || doc.price == null) return null;
  const base = doc.price * pages;
  return Math.round(urgent ? base * (1 + URGENCY_SURCHARGE) : base);
}

export async function POST(req) {
  let fd;
  try {
    fd = await req.formData();
  } catch {
    return json({ ok: false, error: "bad-request" }, 400);
  }

  if (clean(fd.get("botcheck"))) {
    // Honeypot: lo rellenó un bot. Se ignora en silencio.
    return json({ ok: true, emailed: false });
  }
  if (clean(fd.get("privacy")) !== "on") {
    return json({ ok: false, error: "privacy-required" }, 400);
  }

  const locale = clean(fd.get("locale")) === "en" ? "en" : "es";
  const doc = DOCUMENTS.find((d) => d.id === clean(fd.get("documentId")));
  const pages = Math.min(20, Math.max(1, parseInt(clean(fd.get("pages")), 10) || 1));
  const urgent = clean(fd.get("urgency")) === "urgent";
  const paper = clean(fd.get("delivery")) === "paper";
  const name = clean(fd.get("name"), 120);
  const emailRaw = clean(fd.get("email"), 160);
  const email = EMAIL_RE.test(emailRaw) ? emailRaw : "";
  const phone = clean(fd.get("phone"), 40);
  const part = clean(fd.get("part"), 20); // "1/3" cuando hay varios lotes

  const files = fd
    .getAll("files")
    .filter((f) => typeof f === "object" && f && typeof f.arrayBuffer === "function" && f.size > 0);
  if (files.length > MAX_FILES) {
    return json({ ok: false, error: "too-many-files" }, 400);
  }
  for (const f of files) {
    if (f.size > MAX_FILE_BYTES) return json({ ok: false, error: "file-too-large" }, 413);
    if (!ALLOWED_TYPES.has(f.type) && !ALLOWED_EXT.test(f.name || "")) {
      return json({ ok: false, error: "file-type" }, 400);
    }
  }

  const price = estimate(doc, pages, urgent);
  const docName = doc ? doc.name : "(documento no indicado)";
  const lines = [
    `Documento: ${docName}`,
    `Páginas: ${pages}`,
    `Urgencia: ${urgent ? "urgente (< 24 h, +30 %)" : "normal (24/48 h)"}`,
    `Entrega: ${paper ? "PDF firmado + papel por mensajería en España" : "PDF firmado"}`,
    `Estimación mostrada: ${
      price != null ? `${price} €` : `presupuesto en menos de 2 h (catálogo desde ${MIN_PRICE} €)`
    }`,
    `Idioma de la web: ${locale}`,
    `Nombre: ${name || "(no indicado)"}`,
    `Email: ${email || (emailRaw ? `${emailRaw} (no válido)` : "(no indicado)")}`,
    `Teléfono: ${phone || "(no indicado; llegará por WhatsApp)"}`,
    `Archivos en este email: ${files.length ? files.map((f) => f.name).join(", ") : "ninguno"}`,
    part ? `Lote: ${part}` : null,
  ].filter(Boolean);

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.QUOTE_TO_EMAIL || "info@juradaexpress.es";
  const from = process.env.QUOTE_FROM_EMAIL;
  if (!apiKey || !from) {
    return json({ ok: true, emailed: false, reason: "email-not-configured" });
  }

  const attachments = await Promise.all(
    files.map(async (f) => ({
      filename: f.name || "documento",
      content: Buffer.from(await f.arrayBuffer()).toString("base64"),
    }))
  );

  // Asunto pedido por Elena: «Presupuesto web · <documento> · <email>». Si el
  // cliente no dejó email se usa el teléfono o el nombre para distinguir
  // solicitudes en la bandeja.
  const subject = `Presupuesto web · ${docName} · ${email || phone || name || "sin contacto"}`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        ...(email ? { reply_to: email } : {}),
        subject,
        text: `Nueva solicitud desde la calculadora de juradaexpress.es\n\n${lines.join("\n")}\n`,
        attachments,
      }),
    });
    if (!res.ok) {
      return json({ ok: false, emailed: false, error: "email-failed" }, 502);
    }
  } catch {
    return json({ ok: false, emailed: false, error: "email-failed" }, 502);
  }

  return json({ ok: true, emailed: true, files: files.length });
}
