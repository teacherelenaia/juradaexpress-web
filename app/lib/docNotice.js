// app/lib/docNotice.js
//
// Textos de «Enviar documentos» (19/11/2026): aviso a Elena, aviso de
// subida fallida, confirmación al cliente y nota de la carpeta de Drive.
// Funciones puras (sin red), probadas en tests/enviar-documentos.spec.mjs.
//
// El origen (Google Ads con campaña y palabra clave, ChatGPT o web) sale de
// la MISMA regla que los avisos actuales (app/lib/adsCampaign.js).
import { adsInfo, campaignLines, clickOrigin } from "./adsCampaign.js";

const MB = 1024 * 1024;
const ORIGIN = { google_ads: "Google Ads", chatgpt: "ChatGPT", web: "Web" };
// A partir de este número de archivos el asunto lleva «expediente».
export const EXPEDIENTE_MIN_FILES = 3;

export function sizeText(bytes) {
  const n = Number(bytes) || 0;
  if (n >= MB) return `${(n / MB).toLocaleString("es-ES", { maximumFractionDigits: 1 })} MB`;
  return `${Math.max(1, Math.round(n / 1024))} KB`;
}

function fileLine(f, locale = "es") {
  const parts = [sizeText(f.size)];
  if (f.pages) parts.push(locale === "en" ? `${f.pages} p.` : `${f.pages} pág.`);
  return `• ${f.name} (${parts.join(", ")})`;
}

const contactOf = (d) => [d.email, d.phone].filter(Boolean).join(" · ") || "sin contacto";

// «Documentos recibidos · [expediente · ]Nombre · N archivos · JX-XXXXXX»
export function receivedSubject({ name, count, ref, test = false }) {
  const n = Number(count) || 0;
  return [
    test ? "[PRUEBA] Documentos recibidos" : "Documentos recibidos",
    ...(n >= EXPEDIENTE_MIN_FILES ? ["expediente"] : []),
    name || "Sin nombre",
    `${n} ${n === 1 ? "archivo" : "archivos"}`,
    ref,
  ].join(" · ");
}

// «Subida fallida · Nombre · contacto»
export function failedSubject({ name, email, phone, test = false }) {
  return [
    test ? "[PRUEBA] Subida fallida" : "Subida fallida",
    name || "Sin nombre",
    contactOf({ email, phone }),
  ].join(" · ");
}

export function originLines(attribution) {
  const origin = clickOrigin(attribution);
  const info = origin === "google_ads" ? adsInfo(attribution) : null;
  return [`Origen: ${ORIGIN[origin]}`, ...(info ? campaignLines(info) : [])];
}

const FAIL_REASON = {
  network: "se cortó la conexión y no se pudo completar tras varios intentos",
  server: "el servidor no pudo guardarlo",
  size: "pesa más del máximo",
  type: "formato no admitido",
  empty: "el archivo está vacío",
  count: "superaba el número máximo de archivos",
  "not-verified": "no se pudo comprobar en Drive",
  expired: "la sesión de subida caducó",
};
export const failReason = (code) => FAIL_REASON[code] || "error desconocido";

/** Cuerpo del aviso a Elena. */
export function receivedText(d) {
  const lines = [
    d.folderUrl ? `Carpeta de Drive: ${d.folderUrl}` : "Archivos adjuntos a este correo (Drive no está conectado).",
    "",
    `Archivos recibidos (${d.received.length}):`,
    ...(d.received.length ? d.received.map((f) => fileLine(f)) : ["(ninguno)"]),
  ];
  if (d.failed && d.failed.length) {
    lines.push(
      "",
      `Archivos que NO han llegado (${d.failed.length}):`,
      ...d.failed.map((f) => `• ${f.name} — ${failReason(f.reason)}`)
    );
  }
  lines.push(
    "",
    `Referencia: ${d.ref}`,
    `Nombre: ${d.name || "(no indicado)"}`,
    `Email: ${d.email || "(no indicado)"}`,
    `WhatsApp / teléfono: ${d.phone || "(no indicado)"}`,
    `Trámite: ${d.tramite || "(no indicado)"}`,
    `Comentario: ${d.comment ? `\n${d.comment}` : "(ninguno)"}`,
    "",
    ...originLines(d.attribution),
    `Enviado desde: ${d.page || "/enviar-documentos"} (${d.locale === "en" ? "inglés" : "español"})`,
    d.appended ? "Este cliente ya había enviado documentos con esta referencia: se han añadido a su carpeta." : null
  );
  return lines.filter((l) => l !== null).join("\n");
}

/** Cuerpo del aviso de subida fallida. */
export function failedText(d) {
  return [
    "Un cliente no ha podido subir uno o más documentos desde la web. Escríbele:",
    "",
    ...d.failed.map((f) => `• ${f.name}${f.size ? ` (${sizeText(f.size)})` : ""} — ${failReason(f.reason)}`),
    "",
    `Referencia: ${d.ref}`,
    `Nombre: ${d.name || "(no indicado)"}`,
    `Email: ${d.email || "(no indicado)"}`,
    `WhatsApp / teléfono: ${d.phone || "(no indicado)"}`,
    `Trámite: ${d.tramite || "(no indicado)"}`,
    d.received && d.received.length ? `Sí han llegado: ${d.received.map((f) => f.name).join(", ")}` : "No ha llegado ningún archivo.",
    d.folderUrl ? `Carpeta de Drive: ${d.folderUrl}` : null,
    "",
    ...originLines(d.attribution),
  ]
    .filter((l) => l !== null)
    .join("\n");
}

const CLIENT = {
  es: {
    subject: (ref) => `Hemos recibido tus documentos · ${ref}`,
    hello: (name) => `Hola${name ? ` ${name}` : ""}:`,
    got: "Han llegado estos documentos:",
    missing: "Estos NO han llegado; puedes mandármelos por WhatsApp (+34 685 891 214) o respondiendo a este correo:",
    promise:
      "Recibirás el presupuesto en menos de dos horas entre las 9:00 y las 23:00 (hora de Madrid), fines de semana incluidos.",
    more: (ref) => `Si quieres añadir más documentos, indica la referencia ${ref} o responde a este correo.`,
    sign: "Elena Peñaranda\nTraductora-Intérprete Jurada de inglés (MAEC nº 7310)\njuradaexpress.es",
  },
  en: {
    subject: (ref) => `We have received your documents · ${ref}`,
    hello: (name) => `Hello${name ? ` ${name}` : ""},`,
    got: "These documents have arrived:",
    missing: "These have NOT arrived; you can send them on WhatsApp (+34 685 891 214) or by replying to this email:",
    promise:
      "You will receive your quote in less than two hours between 9:00 and 23:00 (Madrid time), weekends included.",
    more: (ref) => `If you want to add more documents, quote the reference ${ref} or reply to this email.`,
    sign: "Elena Peñaranda\nSworn English Translator-Interpreter (MAEC no. 7310)\njuradaexpress.es",
  },
};

export function clientSubject(locale, ref) {
  return (CLIENT[locale] || CLIENT.es).subject(ref);
}

/** Confirmación al cliente: sin enlaces a la carpeta (es privada). */
export function clientText(d) {
  const t = CLIENT[d.locale] || CLIENT.es;
  const lines = [t.hello(d.name), "", t.got, ...d.received.map((f) => fileLine(f, d.locale))];
  if (d.failed && d.failed.length) lines.push("", t.missing, ...d.failed.map((f) => `• ${f.name}`));
  lines.push("", t.promise, "", t.more(d.ref), "", t.sign);
  return lines.join("\n");
}

/** Nota de texto que se guarda en la carpeta de Drive. */
export function noteText(d) {
  return [
    `Envío del ${d.when} (hora de Madrid) · ${d.ref}`,
    "",
    `Nombre: ${d.name || "(no indicado)"}`,
    `Email: ${d.email || "(no indicado)"}`,
    `WhatsApp / teléfono: ${d.phone || "(no indicado)"}`,
    `Trámite: ${d.tramite || "(no indicado)"}`,
    `Comentario: ${d.comment ? `\n${d.comment}` : "(ninguno)"}`,
    "",
    ...originLines(d.attribution),
    `Idioma de la web: ${d.locale === "en" ? "inglés" : "español"}`,
    `Página: ${d.page || "/enviar-documentos"}`,
    "",
    `Archivos recibidos (${d.received.length}):`,
    ...d.received.map((f) => fileLine(f)),
    ...(d.failed && d.failed.length
      ? ["", "No han llegado:", ...d.failed.map((f) => `• ${f.name} — ${failReason(f.reason)}`)]
      : []),
  ].join("\n");
}
