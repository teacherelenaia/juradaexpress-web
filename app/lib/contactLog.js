// app/lib/contactLog.js
//
// Registro mínimo de contactos y referencias en Vercel Blob (privado),
// 14/11/2026. Solo servidor (usa BLOB_READ_WRITE_TOKEN).
//
// Por qué aquí y no en Supabase: la web solo tiene el token de la función
// `recibir` del CRM (sin lectura), y los clics de WhatsApp ya se guardaban
// en este mismo almacén (wa-clicks/). Sin token, nada de esto se guarda y
// los avisos se mandan igual.
//
//   refs/JX-ABC123.json
//     Una referencia de WhatsApp con su atribución, para que el aviso de
//     pago diga de dónde vino el cliente: { ref, fecha, origen, campana,
//     campanaId, palabraClave, concordancia, grupo, gclid, gbraid, wbraid,
//     landing }. No se sobrescribe.
//
//   contactos/AAAA-MM-DD/<canal>-<id>.json   (fecha de Madrid)
//     Un contacto (WhatsApp o calculadora) para el resumen semanal:
//     { canal, ref, fecha, origen, campana, palabraClave, persona }.
//     `persona` es un hash corto del email (calculadora) para contar
//     personas distintas sin guardar el email. Nada más del cliente.
//
//   avisos/presupuesto/<hash>.json
//     Huella de cada resumen de la calculadora ya enviado (envío doble).
import { createHash } from "node:crypto";
import { BlobNotFoundError, get, head, list, put } from "@vercel/blob";

const TIME_ZONE = "Europe/Madrid";

export const hasBlob = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN);

export function shortHash(value, len = 16) {
  return createHash("sha256").update(String(value ?? "")).digest("hex").slice(0, len);
}

// Hash de persona a partir del email (minúsculas, sin espacios); "" sin email.
export function personHash(email) {
  const e = String(email ?? "").trim().toLowerCase();
  return e ? `p-${shortHash(`jx-persona|${e}`, 12)}` : "";
}

// AAAA-MM-DD en hora de Madrid.
export function madridDate(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const get_ = (t) => parts.find((p) => p.type === t)?.value || "";
  return `${get_("year")}-${get_("month")}-${get_("day")}`;
}

function isNotFound(err) {
  const msg = String((err && err.message) || "").toLowerCase();
  return (
    err instanceof BlobNotFoundError ||
    (err && err.name === "BlobNotFoundError") ||
    msg.includes("does not exist") ||
    msg.includes("not found")
  );
}

// ¿Existe ya el blob? true / false; null si no se puede saber.
export async function blobExists(pathname) {
  if (!hasBlob()) return null;
  try {
    await head(pathname, { access: "private" });
    return true;
  } catch (err) {
    if (isNotFound(err)) return false;
    console.error("[contactLog] head", pathname, err?.message);
    return null;
  }
}

// Escribe un JSON sin sobrescribir. Devuelve "saved", "exists" o "skipped".
export async function putJson(pathname, data) {
  if (!hasBlob()) return "skipped";
  try {
    await put(pathname, JSON.stringify(data, null, 2), {
      access: "private",
      addRandomSuffix: false,
      allowOverwrite: false,
      contentType: "application/json",
    });
    return "saved";
  } catch (err) {
    if (/exist|overwrite/i.test(String(err && err.message))) return "exists";
    console.error("[contactLog] put", pathname, err?.message);
    return "skipped";
  }
}

// Lee un JSON; null si no existe o falla.
export async function readJson(pathnameOrUrl) {
  if (!hasBlob()) return null;
  try {
    const res = await get(pathnameOrUrl, { access: "private" });
    if (!res || res.statusCode !== 200 || !res.stream) return null;
    const text = await new Response(res.stream).text();
    return JSON.parse(text);
  } catch (err) {
    if (!isNotFound(err)) console.error("[contactLog] get", pathnameOrUrl, err?.message);
    return null;
  }
}

// Todos los blobs con un prefijo (paginado).
export async function listAll(prefix) {
  if (!hasBlob()) return [];
  const out = [];
  let cursor;
  try {
    do {
      const res = await list({ prefix, cursor, limit: 1000 });
      out.push(...res.blobs);
      cursor = res.hasMore ? res.cursor : undefined;
    } while (cursor);
  } catch (err) {
    console.error("[contactLog] list", prefix, err?.message);
  }
  return out;
}

// ─── Referencias y contactos ────────────────────────────────────────────

export const REF_RE = /^JX-[A-Z0-9]{6}$/;
export const refPath = (ref) => `refs/${ref}.json`;

/**
 * Registro de atribución a partir del origen y los datos de campaña
 * (app/lib/adsCampaign.js). `attr` es la atribución ya saneada.
 */
export function attributionRecord({ origin, info, attr }) {
  const a = attr || {};
  const click = a.gclid || a.gbraid || a.wbraid ? a : a.last || a;
  return {
    origen: origin,
    campana: info?.campaign || "",
    campanaId: info?.campaignId || "",
    palabraClave: info?.keyword || "",
    concordancia: info?.matchType || "",
    grupo: info?.adGroup || "",
    gclid: click.gclid || "",
    gbraid: click.gbraid || "",
    wbraid: click.wbraid || "",
    landing: click.landing || "",
  };
}

export async function saveRef(ref, record) {
  if (!REF_RE.test(String(ref))) return "skipped";
  return putJson(refPath(ref), { ref, ...record });
}

export async function loadRef(ref) {
  if (!REF_RE.test(String(ref))) return null;
  return readJson(refPath(ref));
}

/**
 * Guarda un contacto para el resumen semanal. `canal`: "whatsapp" o
 * "calculadora"; `id`: la referencia o una huella de la solicitud.
 */
export async function logContact({ canal, id, when = new Date(), record }) {
  const day = madridDate(when);
  const safeId = String(id || shortHash(`${canal}|${when.toISOString()}`)).replace(/[^A-Za-z0-9-]/g, "");
  return putJson(`contactos/${day}/${canal}-${safeId}.json`, {
    canal,
    fecha: when.toISOString(),
    ...record,
  });
}
