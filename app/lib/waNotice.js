// app/lib/waNotice.js
//
// Aviso «WhatsApp desde …» (app/api/wa-click/route.js): validación del
// cuerpo que manda el navegador, asunto y texto del correo. Separado de la
// ruta para poder probarlo sin servidor (tests/avisos-campana.spec.mjs).
//
// 14/11/2026: el aviso de Google Ads dice la campaña y la palabra clave
// (app/lib/adsCampaign.js), en el cuerpo y en el asunto:
//   «WhatsApp desde Google Ads · EN · sworn translator spain · JX-ABC123».
// El asunto sigue empezando por «WhatsApp desde Google Ads» y terminando en
// la referencia (la revisión semanal busca así en Gmail); si falta la
// campaña o la palabra clave, ese tramo no aparece.
// La línea «Datos para Google Ads (importación de conversiones offline)» y
// la siguiente NO cambian de formato.
import { adsInfo, campaignLines, clickOrigin, subjectParts } from "./adsCampaign";

const ATTR_KEYS = ["gclid", "gbraid", "wbraid", "referrer", "ts"];
const UTM_KEYS = ["source", "medium", "campaign", "term", "content"];
const ADS_KEYS = ["campaignid", "kw", "mt", "ag"];
const REF_RE = /^JX-[A-Z0-9]{6}$/;
const TIME_ZONE = "Europe/Madrid";

export function clean(value, max = 200) {
  return String(value ?? "")
    .replace(/[\r\n\t]+/g, " ")
    .trim()
    .slice(0, max);
}

// Un toque de atribución con solo los campos conocidos y acotados.
export function touchOf(data) {
  if (!data || typeof data !== "object" || Array.isArray(data)) return null;
  const out = {};
  for (const k of ATTR_KEYS) out[k] = clean(data[k]);
  out.landing = clean(data.landing, 600);
  out.utm = {};
  const utm = data.utm && typeof data.utm === "object" ? data.utm : {};
  for (const k of UTM_KEYS) out.utm[k] = clean(utm[k]);
  out.ads = {};
  const ads = data.ads && typeof data.ads === "object" ? data.ads : {};
  for (const k of ADS_KEYS) out.ads[k] = clean(ads[k]);
  return out;
}

export function attributionOf(data) {
  const first = touchOf(data);
  if (!first) return null;
  const last = touchOf(data && data.last);
  if (last) first.last = last;
  return first;
}

const hasCampaign = (t) =>
  Boolean(
    t && (t.gclid || t.gbraid || t.wbraid || (t.utm && t.utm.source) || (t.ads && t.ads.campaignid))
  );

export function parseBody(raw) {
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
    page: clean(data.page, 300),
    attribution,
  };
}

// Partes de fecha en hora de Madrid.
export function madridParts(date) {
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

// Nombre de campaña para la línea «Campaña:» cuando no hay gad_campaignid
// (utm_campaign, «Google Ads» o la fuente).
function legacyCampaignName(attr) {
  const touches = [attr, attr.last].filter(Boolean);
  for (const t of touches) if (t.utm.campaign) return t.utm.campaign;
  for (const t of touches) if (t.gclid || t.gbraid || t.wbraid) return "Google Ads";
  for (const t of touches) if (t.utm.source) return t.utm.source;
  return "(sin nombre)";
}

export const ORIGIN = {
  google_ads: { subject: "WhatsApp desde Google Ads", label: "Google Ads" },
  chatgpt: { subject: "WhatsApp desde ChatGPT", label: "ChatGPT" },
  web: { subject: "WhatsApp desde la web", label: "la web (otra fuente)" },
};

export function emailSubject(ref, attr) {
  const origin = clickOrigin(attr);
  const parts = [ORIGIN[origin].subject];
  if (origin === "google_ads") parts.push(...subjectParts(adsInfo(attr)));
  parts.push(ref);
  return parts.join(" · ");
}

export function emailText({ ref, page, attribution, when }) {
  const a = attribution;
  const first = a.gclid || a.gbraid || a.wbraid ? a : a.last || a;
  const { year, month, day, hour, minute } = madridParts(when);
  const origin = clickOrigin(a);
  const info = adsInfo(a);
  const adsLines = origin === "google_ads" ? campaignLines(info) : [];
  return [
    `Alguien ha pulsado el botón de WhatsApp de la web. Origen: ${ORIGIN[origin].label}.`,
    "",
    `Referencia: ${ref} (la verás al final de su mensaje de WhatsApp)`,
    first.gclid ? `gclid: ${first.gclid}` : null,
    ...(adsLines.length && info.campaign ? adsLines : [`Campaña: ${legacyCampaignName(a)}`, ...adsLines]),
    `Fuente: utm_source=${a.utm.source || "-"} · utm_medium=${a.utm.medium || "-"} · referrer=${a.referrer || "-"}`,
    `Página: ${page || "(desconocida)"}`,
    `Fecha: ${day}/${month}/${year} ${hour}:${minute} (hora de Madrid)`,
    "",
    "Datos para Google Ads (importación de conversiones offline):",
    `gclid=${first.gclid} · gbraid=${first.gbraid} · wbraid=${first.wbraid} · landing=${first.landing} · primer toque=${a.ts}`,
    "",
  ]
    .filter((line) => line !== null)
    .join("\n");
}
