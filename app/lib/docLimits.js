// app/lib/docLimits.js
//
// Límites contra el abuso de «Enviar documentos» (20/11/2026). Solo servidor.
//
// 1. Tope por envío (LIMITS.drive.maxTotal, 300 MB): el navegador declara
//    al empezar la lista de archivos (nombre y tamaño); el servidor rechaza
//    el envío si la suma pasa del tope y firma en el token una huella de
//    cada archivo. Después solo abre sesiones de subida para archivos de
//    esa lista, y como mucho SESSIONS_PER_FILE por archivo (reintentos).
// 2. Envíos por visitante: como mucho PER_VISITOR_DAY al día por dirección
//    IP y GLOBAL_DAY en total. De la IP solo se guarda una huella con sal
//    (no la IP), un día, en Vercel Blob (limites/…); la limpieza diaria la
//    borra.
//
// Los contadores viven en Vercel Blob. Sin Blob (local) no se aplican.
import { createHmac } from "node:crypto";
import { hasBlob, listAll, madridDate, putJson } from "./contactLog.js";

export const PER_VISITOR_DAY = 15;
export const GLOBAL_DAY = 300;
export const SESSIONS_PER_FILE = 3;

function salt() {
  return (
    process.env.DOCS_SIGNING_SECRET ||
    process.env.GOOGLE_CLIENT_SECRET ||
    process.env.BLOB_READ_WRITE_TOKEN ||
    "jx-docs-local-dev"
  );
}

const hmac = (value, len) => createHmac("sha256", salt()).update(String(value)).digest("hex").slice(0, len);

// Huella corta de un archivo declarado (nombre y tamaño).
export const fileMark = (name, size) => hmac(`f|${name}|${size}`, 10);

function visitorOf(req) {
  const ip = (req.headers.get("x-real-ip") || (req.headers.get("x-forwarded-for") || "").split(",")[0] || "").trim();
  return ip ? hmac(`ip|${ip}`, 16) : "";
}

// Regla del límite (pura, probada en tests/enviar-documentos.spec.mjs):
// `paths` son los envíos ya contados hoy; devuelve el motivo del bloqueo.
export function limitReason(paths, visitor) {
  const mine = paths.filter((p) => p.includes(`/envios/${visitor}-`)).length;
  const reason = paths.length >= GLOBAL_DAY ? "global" : mine >= PER_VISITOR_DAY ? "visitor" : "";
  return { reason, mine };
}

/**
 * ¿Puede este visitante empezar otro envío hoy? Cuenta el envío si puede.
 * Devuelve "" o el motivo ("visitor" | "global").
 */
export async function countSubmission(req) {
  if (!hasBlob()) return "";
  const day = madridDate();
  const visitor = visitorOf(req) || "sin-ip";
  const all = await listAll(`limites/${day}/envios/`);
  const { reason, mine } = limitReason(all.map((b) => b.pathname), visitor);
  // Rastro para diagnosticar (sin datos personales: 4 caracteres de la huella).
  console.log("[docLimits] envíos hoy:", `visitante ${visitor.slice(0, 4)}… ${mine}/${PER_VISITOR_DAY}`, `total ${all.length}/${GLOBAL_DAY}`);
  if (reason) return reason;
  await putJson(`limites/${day}/envios/${visitor}-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}.json`, {
    at: new Date().toISOString(),
  });
  return "";
}

/**
 * Reserva una sesión de subida para el archivo `idx` del envío `sid`. Cada
 * archivo admite SESSIONS_PER_FILE sesiones (la escritura sin sobrescribir
 * de Blob hace de contador sin carreras). true si queda hueco.
 */
export async function reserveSession(sid, idx) {
  if (!hasBlob()) return true;
  const day = madridDate();
  for (let n = 0; n < SESSIONS_PER_FILE; n++) {
    const r = await putJson(`limites/${day}/sesiones/${sid}/${idx}-${n}.json`, { at: new Date().toISOString() });
    if (r === "saved") return true;
    if (r !== "exists") return true; // Blob no responde: no se bloquea al cliente
  }
  return false;
}
