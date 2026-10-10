// app/api/wa-click/route.js
//
// Registro de los clics en WhatsApp que vienen de un anuncio (09/10/2026).
// El navegador (app/lib/waOrigin.js) manda con sendBeacon, justo antes de
// abrir WhatsApp, { ref, lang, page, attribution }: la referencia corta
// «JX-ABC123» que va al final del mensaje y la atribución de
// app/lib/attribution.js (gclid, utm_*, landing, referrer, fecha). Nunca
// nombre, teléfono ni email.
//
// Aquí:
//   1. Se valida todo (ref /^JX-[A-Z0-9]{6}$/, campos recortados, cuerpo de
//      4 KB como máximo) y se descarta lo que no se reconoce.
//   2. Se guarda un JSON en Vercel Blob (privado) en
//      wa-clicks/AAAA/MM/JX-ABC123.json. Si ya existe, no se vuelve a
//      escribir ni a avisar (idempotente).
//   3. Se avisa por email a Elena (Resend, app/lib/resend.js) con la
//      referencia, la campaña, la página, la fecha y los datos para
//      importar la venta a Google Ads (gclid, etc.).
//   4. Responde 204 siempre: el beacon no espera nada y ningún error llega
//      al navegador (todo en try/catch, errores a console.error).
import { BlobNotFoundError, head, put } from "@vercel/blob";
import { resendConfig, sendResendEmail } from "../../lib/resend";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 4 * 1024;
const REF_RE = /^JX-[A-Z0-9]{6}$/;
const ATTR_KEYS = ["gclid", "gbraid", "wbraid", "landing", "referrer", "ts"];
const UTM_KEYS = ["source", "medium", "campaign", "term", "content"];
const BLOB_PREFIX = "wa-clicks";
const TIME_ZONE = "Europe/Madrid";

const noContent = () => new Response(null, { status: 204 });

function clean(value, max = 200) {
  return String(value ?? "")
    .replace(/[\r\n\t]+/g, " ")
    .trim()
    .slice(0, max);
}

// Un toque de atribución con solo los campos conocidos y acotados.
function touchOf(data) {
  if (!data || typeof data !== "object" || Array.isArray(data)) return null;
  const out = {};
  for (const k of ATTR_KEYS) out[k] = clean(data[k]);
  out.utm = {};
  const utm = data.utm && typeof data.utm === "object" ? data.utm : {};
  for (const k of UTM_KEYS) out.utm[k] = clean(utm[k]);
  return out;
}

function attributionOf(data) {
  const first = touchOf(data);
  if (!first) return null;
  const last = touchOf(data && data.last);
  if (last) first.last = last;
  return first;
}

const hasCampaign = (t) =>
  Boolean(t && (t.gclid || t.gbraid || t.wbraid || (t.utm && t.utm.source)));

function parseBody(raw) {
  let data;
  try {
    data = JSON.parse(raw);
  } catch {
    return null;
  }
  if (!data || typeof data !== "object" || Array.isArray(data)) return null;
  const ref = clean(data.ref, 20);
  if (!REF_RE.test(ref)) return null;
  const attribution = attributionOf(data.attribution);
  if (!attribution) return null;
  if (!hasCampaign(attribution) && !hasCampaign(attribution.last)) return null;
  return {
    ref,
    lang: clean(data.lang, 5) === "en" ? "en" : "es",
    page: clean(data.page, 200),
    attribution,
  };
}

// Partes de fecha en hora de Madrid.
function madridParts(date) {
  const parts = new Intl.DateTimeFormat("es-ES", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(date);
  const get = (type) => parts.find((p) => p.type === type)?.value || "";
  return {
    year: get("year"),
    month: get("month"),
    day: get("day"),
    hour: get("hour") === "24" ? "00" : get("hour"),
    minute: get("minute"),
  };
}

// Guarda el clic en Blob. Devuelve "saved", "exists" o "skipped" (sin token
// o error): en los dos últimos casos el email se manda igualmente salvo
// que el blob ya existiera.
async function storeClick(pathname, record) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return "skipped";
  try {
    await head(pathname, { access: "private" });
    return "exists";
  } catch (err) {
    // Caso normal: la referencia es nueva y el blob aún no existe. La
    // librería lanza BlobNotFoundError («The requested blob does not
    // exist»); se comprueba por clase y, por si cambia el mensaje o la
    // clase, por el texto. Solo lo demás se registra como error.
    const msg = String((err && err.message) || "").toLowerCase();
    const notFound =
      err instanceof BlobNotFoundError ||
      (err && err.name === "BlobNotFoundError") ||
      msg.includes("does not exist") ||
      msg.includes("not found");
    if (!notFound) console.error("[wa-click] head", err);
  }
  try {
    await put(pathname, JSON.stringify(record, null, 2), {
      access: "private",
      addRandomSuffix: false,
      contentType: "application/json",
    });
    return "saved";
  } catch (err) {
    if (/exist|overwrite/i.test(String(err && err.message))) return "exists";
    console.error("[wa-click] put", err);
    return "skipped";
  }
}

function campaignName(attr) {
  const touches = [attr, attr.last].filter(Boolean);
  for (const t of touches) if (t.utm.campaign) return t.utm.campaign;
  for (const t of touches) if (t.gclid || t.gbraid || t.wbraid) return "Google Ads";
  for (const t of touches) if (t.utm.source) return t.utm.source;
  return "(sin nombre)";
}

function emailText({ ref, page, attribution, when }) {
  const a = attribution;
  const first = a.gclid || a.gbraid || a.wbraid ? a : a.last || a;
  const { year, month, day, hour, minute } = madridParts(when);
  return [
    "Alguien ha pulsado el botón de WhatsApp de la web viniendo de un anuncio.",
    "",
    `Referencia: ${ref} (la verás al final de su mensaje de WhatsApp)`,
    `Campaña: ${campaignName(a)}`,
    `Página: ${page || "(desconocida)"}`,
    `Fecha: ${day}/${month}/${year} ${hour}:${minute} (hora de Madrid)`,
    "",
    "Datos para Google Ads (importación de conversiones offline):",
    `gclid=${first.gclid} · gbraid=${first.gbraid} · wbraid=${first.wbraid} · landing=${first.landing} · primer toque=${a.ts}`,
    "",
  ].join("\n");
}

export async function POST(req) {
  try {
    const declared = Number(req.headers.get("content-length") || 0);
    if (declared > MAX_BODY_BYTES) return noContent();
    const raw = await req.text();
    if (!raw || raw.length > MAX_BODY_BYTES) return noContent();

    const click = parseBody(raw);
    if (!click) return noContent();

    const when = new Date();
    const { year, month } = madridParts(when);
    const pathname = `${BLOB_PREFIX}/${year}/${month}/${click.ref}.json`;
    const record = { ...click, receivedAt: when.toISOString() };

    const stored = await storeClick(pathname, record);
    if (stored === "exists") return noContent();

    const mail = resendConfig();
    if (!mail) return noContent();
    const ok = await sendResendEmail({
      ...mail,
      subject: `WhatsApp desde anuncio · ${click.ref}`,
      text: emailText({ ...click, when }),
    });
    if (!ok) console.error("[wa-click] email no enviado", click.ref);
  } catch (err) {
    console.error("[wa-click]", err);
  }
  return noContent();
}
