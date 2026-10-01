// app/api/quote/route.js
//
// Recibe la solicitud de la calculadora de precio (QuoteCalculator.js) y la
// reenvía por email a Elena con Resend (API REST con fetch: sin dependencia
// npm). Solo servidor: RESEND_API_KEY nunca llega al navegador.
//
// La calculadora hace varias peticiones por solicitud:
//   1. Resumen SIN archivos (siempre, aunque no haya archivos o la subida
//      falle después): documento, páginas, urgencia, entrega, estimación,
//      contacto (nombre, email, teléfono) y el plan de archivos
//      (`filesEmail`: los que llegan en emails aparte; `filesWhatsApp`: los
//      que el cliente adjunta en WhatsApp y por qué). Asunto:
//      «Presupuesto web · <documento> · <email>» (sin email: teléfono o nombre).
//   2. Lotes de archivos (`part` = "i/n", < 3,5 MB cada uno por el límite de
//      cuerpo de ~4,5 MB de Vercel): PDF < 3,5 MB tal cual e imágenes ya
//      comprimidas a JPEG en el navegador. Asunto: el del resumen más
//      « · archivos (i/n)», para que queden juntos en la bandeja.
//
// Sin RESEND_API_KEY responde { ok: true, emailed: false }: la calculadora
// sigue funcionando y, como los archivos NO han llegado por email, el
// resumen de WhatsApp y la pantalla de confirmación piden al cliente que
// los adjunte en el chat. Igual ante cualquier error de envío (ok: false).
// Variables en .env.local.example.
import { NextResponse } from "next/server";
import { DOCUMENTS, MIN_PRICE } from "../../../content/documents";
import { URGENCY_SURCHARGE } from "../../../content/site";

export const runtime = "nodejs";

const MAX_FILES = 5;
const MAX_FILE_BYTES = 10 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["application/pdf", "image/jpeg", "image/png"]);
const ALLOWED_EXT = /\.(pdf|jpe?g|png)$/i;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Motivos por los que un archivo no viene por email (los manda el navegador).
const WHATSAPP_REASONS = {
  "pdf-too-large": "PDF de más de 3,5 MB",
  unsupported: "su navegador no pudo convertir la imagen",
};

const json = (body, status = 200) => NextResponse.json(body, { status });

function clean(value, max = 200) {
  return String(value ?? "")
    .replace(/[\r\n]+/g, " ")
    .trim()
    .slice(0, max);
}

// Lista JSON de archivos planificados ([{ name, sent? , reason? }]) que manda
// el resumen; se acota y se sanea campo a campo.
function fileList(raw) {
  let list;
  try {
    list = JSON.parse(String(raw ?? ""));
  } catch {
    return [];
  }
  if (!Array.isArray(list)) return [];
  return list
    .slice(0, MAX_FILES)
    .map((item) => ({
      name: clean(item && item.name, 160),
      sent: clean(item && item.sent, 160),
      reason: clean(item && item.reason, 40),
    }))
    .filter((item) => item.name);
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
  const part = clean(fd.get("part"), 20); // "1/3" en los lotes de archivos
  const lots = Math.max(0, parseInt(clean(fd.get("lots")), 10) || 0); // emails de archivos que siguen al resumen
  const filesEmail = fileList(fd.get("filesEmail"));
  const filesWhatsApp = fileList(fd.get("filesWhatsApp"));

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
  const isSummary = !part;
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
  ];
  if (isSummary) {
    // Plan de archivos: qué llega en emails aparte y qué adjunta el cliente.
    if (!filesEmail.length && !filesWhatsApp.length) {
      lines.push("Archivos: ninguno");
    }
    if (filesEmail.length) {
      lines.push(
        `Archivos que llegan en ${lots === 1 ? "un email aparte" : `${lots || "varios"} emails aparte`} (asunto «… · archivos (i/n)»): ${filesEmail
          .map((f) => (f.sent && f.sent !== f.name ? `${f.name} (enviado como ${f.sent})` : f.name))
          .join(", ")}`
      );
    }
    if (filesWhatsApp.length) {
      lines.push(
        `Archivos que el cliente adjunta en WhatsApp: ${filesWhatsApp
          .map((f) => `${f.name}${WHATSAPP_REASONS[f.reason] ? ` (${WHATSAPP_REASONS[f.reason]})` : ""}`)
          .join(", ")}`
      );
    }
  } else {
    lines.push(
      `Archivos en este email: ${files.length ? files.map((f) => f.name).join(", ") : "ninguno"}`,
      `Lote: ${part}`
    );
  }

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
  // solicitudes en la bandeja. Los lotes de archivos llevan el mismo asunto
  // más « · archivos (i/n)».
  const baseSubject = `Presupuesto web · ${docName} · ${email || phone || name || "sin contacto"}`;
  const subject = isSummary ? baseSubject : `${baseSubject} · archivos (${part})`;
  const heading = isSummary
    ? "Nueva solicitud desde la calculadora de juradaexpress.es"
    : `Archivos de la solicitud de la calculadora de juradaexpress.es (lote ${part})`;

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
        text: `${heading}\n\n${lines.join("\n")}\n`,
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
