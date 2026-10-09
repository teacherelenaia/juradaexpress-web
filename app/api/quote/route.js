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
// Desde el 02/10/2026 lo normal es el punto 1 con `blobs`: el navegador ya
// ha subido los archivos a Vercel Blob (privado, /api/quote/upload) y aquí
// se descargan, se adjuntan al email del resumen (y, si pasan de ~25 MB en
// total, a emails « · archivos (i/n)») y se BORRAN del almacén. Responde
// `blobsEmailed` con las URL realmente enviadas. Los lotes directos del
// punto 2 quedan como reserva si Blob no está disponible.
//
// Medición de Google Ads (08/10/2026): la calculadora manda además `source`
// («¿Cómo nos has conocido?», valor de content/sources.js) y `attribution`
// (JSON de app/lib/attribution.js: gclid, utm_*, landing, referrer). Van en
// el email tras el teléfono para que Elena pueda importar la venta a Google
// Ads con el gclid y el email del cliente.
//
// Modo despacho (03/10/2026): el formulario de /en/for-immigration-law-firms
// manda firmMode=1 con `firm` (nombre del despacho) y `reference`
// (referencia de cliente/asunto). Asunto: «[LAW FIRM] <despacho> ·
// <documento> · <contacto>»; la estimación va en dólares y sin urgencia.
//
// Sin RESEND_API_KEY responde { ok: true, emailed: false }: la calculadora
// sigue funcionando y, como los archivos NO han llegado por email, el
// resumen de WhatsApp y la pantalla de confirmación piden al cliente que
// los adjunte en el chat. Igual ante cualquier error de envío (ok: false).
// Variables en .env.local.example.
import { NextResponse } from "next/server";
import { get, del } from "@vercel/blob";
import { resendConfig, sendResendEmail } from "../../lib/resend";
import { DOCUMENTS, MIN_PRICE } from "../../../content/documents";
import { URGENCY_SURCHARGE, SAME_DAY_MAX_PAGES } from "../../../content/site";
import { toUsd, US_SHIPPING_USD } from "../../../content/usd";
import { sourceLabel } from "../../../content/sources";

export const runtime = "nodejs";
// Descargar de Blob y enviar emails con adjuntos grandes puede tardar.
export const maxDuration = 60;

const MAX_FILES = 5;
const MAX_FILE_BYTES = 25 * 1024 * 1024;
// Resend admite 40 MB por email contando el base64 (+33 %): ~25 MB reales.
const EMAIL_MAX_BYTES = 25 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["application/pdf", "image/jpeg", "image/png", "image/heic", "image/heif"]);
const ALLOWED_EXT = /\.(pdf|jpe?g|png|heic|heif)$/i;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Motivos por los que un archivo no viene por email (los manda el navegador).
const WHATSAPP_REASONS = {
  "pdf-too-large": "PDF de más de 3,5 MB",
  unsupported: "su navegador no pudo convertir la imagen",
  failed: "no se pudo subir desde su navegador",
};

// Archivos subidos por el navegador a Vercel Blob (privado):
// [{ name, url }]. Solo se aceptan URLs del almacén de Blob bajo
// /presupuestos/ (las genera /api/quote/upload).
function blobList(raw) {
  let list;
  try {
    list = JSON.parse(String(raw ?? ""));
  } catch {
    return [];
  }
  if (!Array.isArray(list)) return [];
  const out = [];
  for (const item of list.slice(0, MAX_FILES)) {
    const name = clean(item && item.name, 160);
    let url;
    try {
      url = new URL(String(item && item.url));
    } catch {
      continue;
    }
    if (
      url.protocol !== "https:" ||
      !url.hostname.endsWith(".blob.vercel-storage.com") ||
      !url.pathname.startsWith("/presupuestos/")
    ) {
      continue;
    }
    out.push({ name: name || url.pathname.split("/").pop(), url: url.toString() });
  }
  return out;
}

async function readBlob(url) {
  const res = await get(url, { access: "private" });
  if (!res || res.statusCode !== 200 || !res.stream) throw new Error("blob-missing");
  const chunks = [];
  let size = 0;
  const reader = res.stream.getReader();
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > MAX_FILE_BYTES) throw new Error("blob-too-large");
    chunks.push(Buffer.from(value));
  }
  return Buffer.concat(chunks);
}

// Reparte adjuntos en grupos de < EMAIL_MAX_BYTES (cada uno ya < 25 MB).
function groupAttachments(items) {
  const out = [];
  let cur = [];
  let size = 0;
  for (const it of items) {
    if (cur.length && size + it.bytes > EMAIL_MAX_BYTES) {
      out.push(cur);
      cur = [];
      size = 0;
    }
    cur.push(it);
    size += it.bytes;
  }
  if (cur.length) out.push(cur);
  return out;
}

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

// Atribución que manda el navegador (JSON). Solo se acepta un objeto y
// cada valor se recorta a 200 caracteres.
const ATTR_KEYS = ["gclid", "gbraid", "wbraid", "landing", "referrer", "ts"];
const UTM_KEYS = ["source", "medium", "campaign", "term", "content"];
function attributionOf(raw) {
  let data;
  try {
    data = JSON.parse(String(raw ?? ""));
  } catch {
    return null;
  }
  if (!data || typeof data !== "object" || Array.isArray(data)) return null;
  const out = {};
  for (const k of ATTR_KEYS) out[k] = clean(data[k], 200);
  out.utm = {};
  const utm = data.utm && typeof data.utm === "object" ? data.utm : {};
  for (const k of UTM_KEYS) out.utm[k] = clean(utm[k], 200);
  return out;
}

// «Atribución: gclid=… · landing=… · referrer=… · utm=source/medium/campaign»
// sin las partes vacías; si no hay nada, «directa».
function attributionLine(attr) {
  if (!attr) return "directa";
  const parts = [];
  for (const k of ["gclid", "gbraid", "wbraid"]) {
    if (attr[k]) parts.push(`${k}=${attr[k]}`);
  }
  if (attr.landing) parts.push(`landing=${attr.landing}`);
  if (attr.referrer) parts.push(`referrer=${attr.referrer}`);
  const utm = [attr.utm.source, attr.utm.medium, attr.utm.campaign].filter(Boolean);
  if (utm.length) parts.push(`utm=${utm.join("/")}`);
  return parts.length ? parts.join(" · ") : "directa";
}

// La estimación se recalcula aquí a partir del catálogo: nunca se confía
// en el importe que manda el navegador.
function estimate(doc, pages, urgent) {
  if (!doc || doc.price == null) return null;
  const base = doc.price * pages;
  return Math.round(urgent && pages > SAME_DAY_MAX_PAGES ? base * (1 + URGENCY_SURCHARGE) : base);
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
  const firmMode = clean(fd.get("firmMode")) === "1";
  const firm = firmMode ? clean(fd.get("firm"), 160) : "";
  const reference = firmMode ? clean(fd.get("reference"), 160) : "";
  const urgent = !firmMode && clean(fd.get("urgency")) === "urgent";
  const paper = clean(fd.get("delivery")) === "paper";
  const name = clean(fd.get("name"), 120);
  const emailRaw = clean(fd.get("email"), 160);
  const email = EMAIL_RE.test(emailRaw) ? emailRaw : "";
  const phone = clean(fd.get("phone"), 40);
  const source = clean(fd.get("source"), 40); // «¿Cómo nos has conocido?»
  const attribution = attributionOf(fd.get("attribution"));
  const part = clean(fd.get("part"), 20); // "1/3" en los lotes de archivos
  const lots = Math.max(0, parseInt(clean(fd.get("lots")), 10) || 0); // emails de archivos que siguen al resumen
  const filesEmail = fileList(fd.get("filesEmail")); // irán en lotes directos aparte
  const filesWhatsApp = fileList(fd.get("filesWhatsApp"));
  const blobs = blobList(fd.get("blobs")); // ya subidos a Vercel Blob

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

  const mail = resendConfig();
  if (!mail) {
    return json({ ok: true, emailed: false, reason: "email-not-configured", blobsEmailed: [] });
  }

  // Archivos de Blob: se descargan con el token del servidor. Si alguno no
  // se puede leer, se avisa en el email y el navegador lo pide por WhatsApp.
  const blobItems = [];
  const blobFailed = [];
  await Promise.all(
    blobs.map(async (b) => {
      try {
        const buf = await readBlob(b.url);
        blobItems.push({ ...b, bytes: buf.length, content: buf.toString("base64") });
      } catch {
        blobFailed.push(b);
      }
    })
  );
  const blobOrder = blobs.map((b) => b.url);
  blobItems.sort((a, b) => blobOrder.indexOf(a.url) - blobOrder.indexOf(b.url));
  const blobGroups = groupAttachments(blobItems);

  const price = estimate(doc, pages, urgent);
  const docName = doc ? doc.name : "(documento no indicado)";
  const isSummary = !part;
  const estimateLine = firmMode
    ? doc && doc.price != null
      ? `${toUsd(doc.price) * pages} $ (tarifa de despacho en dólares)`
      : `presupuesto en menos de 2 h (catálogo desde ${toUsd(MIN_PRICE)} $)`
    : price != null
    ? `${price} €`
    : `presupuesto en menos de 2 h (catálogo desde ${MIN_PRICE} €)`;
  const paperLine = firmMode
    ? `PDF firmado + papel por mensajería a EE. UU. (${US_SHIPPING_USD} $)`
    : "PDF firmado + papel por mensajería en España";
  const lines = [
    ...(firmMode
      ? [
          `DESPACHO DE ABOGADOS (EE. UU.): ${firm || "(no indicado)"}`,
          `Referencia de cliente/asunto: ${reference || "(no indicada)"}`,
        ]
      : []),
    `Documento: ${docName}`,
    `Páginas: ${pages}`,
    `Urgencia: ${urgent ? "urgente (más de 10 páginas en el día, +30 %)" : "normal (en el día hasta 10 páginas)"}`,
    `Entrega: ${paper ? paperLine : "PDF firmado"}`,
    `Estimación mostrada: ${estimateLine}`,
    `Idioma de la web: ${locale}`,
    `Nombre: ${name || "(no indicado)"}`,
    `Email: ${email || (emailRaw ? `${emailRaw} (no válido)` : "(no indicado)")}`,
    `Teléfono: ${phone || "(no indicado)"}`,
    `Cómo nos ha conocido: ${sourceLabel(source, "es") || "(no indicado)"}`,
    `Atribución: ${attributionLine(attribution)}`,
  ];
  const extraLots = Math.max(0, blobGroups.length - 1);
  if (isSummary) {
    if (!blobs.length && !filesEmail.length && !filesWhatsApp.length) {
      lines.push("Archivos: ninguno");
    }
    if (blobGroups.length) {
      lines.push(`Archivos adjuntos a este email: ${blobGroups[0].map((b) => b.name).join(", ")}`);
    }
    if (extraLots) {
      lines.push(
        `Más archivos en ${extraLots === 1 ? "un email aparte" : `${extraLots} emails aparte`} (asunto «… · archivos (i/n)»): ${blobGroups
          .slice(1)
          .flat()
          .map((b) => b.name)
          .join(", ")}`
      );
    }
    if (filesEmail.length) {
      lines.push(
        `Archivos que llegan en ${lots === 1 ? "un email aparte" : `${lots || "varios"} emails aparte`} (asunto «… · archivos (lote i/n)»): ${filesEmail
          .map((f) => (f.sent && f.sent !== f.name ? `${f.name} (enviado como ${f.sent})` : f.name))
          .join(", ")}`
      );
    }
    const missing = [
      ...filesWhatsApp.map(
        (f) => `${f.name}${WHATSAPP_REASONS[f.reason] ? ` (${WHATSAPP_REASONS[f.reason]})` : ""}`
      ),
      ...blobFailed.map((b) => `${b.name} (no se pudo recuperar del almacenamiento)`),
    ];
    if (missing.length) {
      lines.push(`Archivos que NO han llegado (se le pide que los mande por WhatsApp): ${missing.join(", ")}`);
    }
  } else {
    lines.push(
      `Archivos en este email: ${files.length ? files.map((f) => f.name).join(", ") : "ninguno"}`,
      `Lote: ${part}`
    );
  }

  const directAttachments = await Promise.all(
    files.map(async (f) => ({
      filename: f.name || "documento",
      content: Buffer.from(await f.arrayBuffer()).toString("base64"),
    }))
  );

  // Asunto pedido por Elena: «Presupuesto web · <documento> · <email>». Si el
  // cliente no dejó email se usa el teléfono o el nombre para distinguir
  // solicitudes en la bandeja. Los emails de archivos llevan el mismo asunto
  // más « · archivos (i/n)».
  const contact = email || phone || name || "sin contacto";
  const baseSubject = firmMode
    ? `[LAW FIRM] ${firm || "sin nombre"} · ${docName} · ${contact}`
    : `Presupuesto web · ${docName} · ${contact}`;

  function send(subject, heading, attachments) {
    return sendResendEmail({
      ...mail,
      replyTo: email || "",
      subject,
      text: `${heading}\n\n${lines.join("\n")}\n`,
      attachments,
    });
  }

  const toAttachment = (b) => ({ filename: b.name || "documento", content: b.content });

  if (!isSummary) {
    const ok = await send(
      `${baseSubject} · archivos (lote ${part})`,
      `Archivos de la solicitud de la calculadora de juradaexpress.es (lote ${part})`,
      directAttachments
    );
    return ok
      ? json({ ok: true, emailed: true, files: files.length })
      : json({ ok: false, emailed: false, error: "email-failed" }, 502);
  }

  // Resumen + primer grupo de archivos de Blob en el mismo email; el resto
  // en emails aparte. Un archivo cuenta como enviado solo si su email sale.
  const blobsEmailed = [];
  const summaryOk = await send(
    baseSubject,
    "Nueva solicitud desde la calculadora de juradaexpress.es",
    [...directAttachments, ...(blobGroups[0] || []).map(toAttachment)]
  );
  if (summaryOk && blobGroups[0]) blobsEmailed.push(...blobGroups[0].map((b) => b.url));
  for (let i = 1; i < blobGroups.length; i++) {
    const ok = await send(
      `${baseSubject} · archivos (${i}/${extraLots})`,
      `Archivos de la solicitud de la calculadora de juradaexpress.es (${i}/${extraLots})`,
      blobGroups[i].map(toAttachment)
    );
    if (ok) blobsEmailed.push(...blobGroups[i].map((b) => b.url));
  }

  // Los documentos enviados se borran del almacenamiento (minimización RGPD).
  if (blobsEmailed.length) {
    try {
      await del(blobsEmailed);
    } catch {
      // Si falla el borrado no se bloquea la respuesta.
    }
  }

  if (!summaryOk && !blobsEmailed.length) {
    return json({ ok: false, emailed: false, error: "email-failed", blobsEmailed }, 502);
  }
  return json({ ok: true, emailed: summaryOk, files: files.length, blobsEmailed });
}
