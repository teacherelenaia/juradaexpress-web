// app/lib/docSubmission.js
//
// Piezas comunes de «Enviar documentos» (19/11/2026). Solo servidor.
//
// No hay base de datos: cada envío viaja en un TOKEN FIRMADO (HMAC-SHA256)
// que el servidor entrega al empezar y el navegador devuelve en cada paso.
// Lleva la referencia, la carpeta de Drive y la huella del contacto; nada
// de eso va en la URL. Cada archivo lleva además su propio token con la
// URL de sesión de Google, para que nadie pueda pedir el estado de una
// subida ajena ni hacer que el servidor llame a otra dirección.
import { createHash, createHmac, randomInt, timingSafeEqual } from "node:crypto";

export const MB = 1024 * 1024;
export const LIMITS = {
  // Drive: lo que propuso Elena (a confirmar).
  drive: { maxFiles: 40, maxBytes: 50 * MB },
  // Sin Drive conectado, los archivos van adjuntos al correo: Resend admite
  // ~25 MB reales por mensaje, así que no se puede pasar de ahí.
  // Total por envío: un correo por cada 25 MB y la función tiene 60 s.
  blob: { maxFiles: 40, maxBytes: 25 * MB, maxTotal: 100 * MB },
};
// Una semana: lo que dura una sesión de subida reanudable de Google.
export const TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000;

export const ALLOWED_EXT = /\.(pdf|jpe?g|png|heic|heif|docx|zip)$/i;
export const ALLOWED_MIME = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/heic",
  "image/heif",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/zip",
  "application/x-zip-compressed",
]);

const MIME_BY_EXT = {
  pdf: "application/pdf",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  heic: "image/heic",
  heif: "image/heif",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  zip: "application/zip",
};

export function mimeOf(name, type) {
  if (type && ALLOWED_MIME.has(type)) return type;
  const ext = String(name || "").toLowerCase().split(".").pop();
  return MIME_BY_EXT[ext] || "application/octet-stream";
}

// La extensión manda (un «x.exe» con tipo application/pdf no pasa).
export function allowedFile(name) {
  return ALLOWED_EXT.test(String(name || ""));
}

// Nombre de archivo tal cual lo eligió el cliente, sin barras ni controles.
export function cleanFileName(name) {
  const n = String(name || "")
    .replace(/[\u0000-\u001f\u007f/\\]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(-180);
  return n || "documento";
}

export function clean(value, max = 200) {
  return String(value ?? "")
    .replace(/[\r\n]+/g, " ")
    .trim()
    .slice(0, max);
}

// Comentario libre: se conservan los saltos de línea.
export function cleanMultiline(value, max = 2000) {
  return String(value ?? "")
    .replace(/\r\n?/g, "\n")
    .replace(/[\u0000-\u0008\u000b-\u001f\u007f]/g, "")
    .trim()
    .slice(0, max);
}

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ─── Entorno de pruebas ─────────────────────────────────────────────────

// En preview y en local todos los envíos usan JX-TEST (una carpeta de
// pruebas) y los correos llevan «[PRUEBA]». En producción, un envío con
// JX-TEST no manda avisos (pruebas en producción sin avisos falsos).
export const TEST_REF = "JX-TEST";
export const isProduction = () => process.env.VERCEL_ENV === "production";
export const REF_RE = /^JX-[A-Z0-9]{6}$/;

export function validRef(ref) {
  const r = String(ref || "");
  return REF_RE.test(r) || r === TEST_REF;
}

export function newRef() {
  if (!isProduction()) return TEST_REF;
  const abc = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // sin 0/O ni 1/I
  let out = "JX-";
  for (let i = 0; i < 6; i++) out += abc[randomInt(abc.length)];
  return out;
}

// ─── Tokens firmados ────────────────────────────────────────────────────

function secret() {
  const explicit = process.env.DOCS_SIGNING_SECRET;
  if (explicit) return explicit;
  // Sin variable propia se deriva de secretos que ya existen en Vercel.
  const parts = [
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REFRESH_TOKEN,
    process.env.BLOB_READ_WRITE_TOKEN,
    process.env.RESEND_API_KEY,
  ].filter(Boolean);
  if (parts.length) return createHash("sha256").update(`jx-docs|${parts.join("|")}`).digest("hex");
  if (isProduction()) throw new Error("no-signing-secret");
  return "jx-docs-local-dev";
}

const b64 = (s) => Buffer.from(s, "utf8").toString("base64url");

export function sign(payload) {
  const body = b64(JSON.stringify(payload));
  const mac = createHmac("sha256", secret()).update(body).digest("base64url");
  return `${body}.${mac}`;
}

// `graceMs`: acepta tokens caducados hace menos de ese tiempo (para
// reconocer un envío anterior del mismo navegador y añadir a su carpeta).
export function verify(token, kind, { graceMs = 0 } = {}) {
  const [body, mac] = String(token || "").split(".");
  if (!body || !mac) return null;
  let key;
  try {
    key = secret();
  } catch {
    return null;
  }
  const expected = createHmac("sha256", key).update(body).digest("base64url");
  const a = Buffer.from(mac);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  let data;
  try {
    data = JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
  } catch {
    return null;
  }
  if (!data || data.k !== kind) return null;
  if (typeof data.exp !== "number" || Date.now() > data.exp + graceMs) return null;
  return data;
}

export function contactKey(email, phone) {
  const e = String(email || "").trim().toLowerCase();
  const p = String(phone || "").replace(/[^\d+]/g, "");
  const v = e || p;
  return v ? createHash("sha256").update(`jx-contact|${v}`).digest("hex").slice(0, 16) : "";
}

// ─── Textos ─────────────────────────────────────────────────────────────

export function formatBytes(bytes) {
  const n = Number(bytes) || 0;
  if (n >= MB) return `${(n / MB).toLocaleString("es-ES", { maximumFractionDigits: 1 })} MB`;
  return `${Math.max(1, Math.round(n / 1024))} KB`;
}

// Origen del navegador para la sesión de Google (CORS). Solo dominios de la
// web, previews de Vercel y local.
export function requestOrigin(req) {
  const origin = req.headers.get("origin") || "";
  if (
    /^https:\/\/(www\.)?juradaexpress\.es$/.test(origin) ||
    /^https:\/\/[a-z0-9-]+\.vercel\.app$/.test(origin) ||
    /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)
  ) {
    return origin;
  }
  return "";
}
