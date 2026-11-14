// app/lib/adsCampaign.js
//
// Campaña y palabra clave de Google Ads en los avisos (14/11/2026).
//
// Desde el 14/11/2026 la cuenta de Google Ads añade a la URL final de cada
// anuncio el sufijo `kw={keyword}&mt={matchtype}&ag={adgroupid}`, y Google
// añade por su cuenta `gad_campaignid` (y gclid / gbraid / wbraid). La web
// guarda esos datos en el primer toque (app/lib/attribution.js → `ads` y
// `landing`). Este módulo, sin dependencias y válido en servidor y cliente:
//
//   - adsInfo(attr): { campaignId, campaign, keyword, matchType, adGroup }
//     del toque que trae el clic de anuncio (primer toque y, si no, último),
//     leyendo `ads` o, para avisos de navegadores con la versión anterior
//     del código, la URL de entrada (`landing`).
//   - clickOrigin(attr): "google_ads" | "chatgpt" | "web" (la regla de los
//     avisos de WhatsApp desde el 25/10/2026, ahora compartida con el correo
//     de la calculadora y el resumen semanal).
//   - campaignLine / keywordLine / subjectParts: las líneas y los tramos del
//     asunto («EN · sworn translator spain»), sin huecos si falta algo.

// gad_campaignid → nombre corto. Un identificador que no esté aquí se
// muestra tal cual.
export const CAMPAIGNS = {
  "24339671482": { short: "EN", name: "Extranjeros en España (EN)" },
  "24363650778": { short: "ES", name: "Documentos España (ES)" },
  "24333703631": { short: "Marca", name: "Marca" },
};

// {matchtype} de Google Ads: e (exacta), p (frase), b (amplia).
export const MATCH_TYPES = { e: "exacta", p: "frase", b: "amplia" };

export const ADS_KEYS = ["campaignid", "kw", "mt", "ag"];
// Parámetro de la URL → clave en `ads`.
export const ADS_URL_PARAMS = { gad_campaignid: "campaignid", kw: "kw", mt: "mt", ag: "ag" };

const MAX = 200;
const cut = (v, max = MAX) =>
  String(v ?? "")
    .replace(/[\r\n\t]+/g, " ")
    .trim()
    .slice(0, max);

// Decodifica una palabra clave: «+» y %20 como espacio, tildes y eñes en
// UTF-8. Si viene mal codificada, se devuelve tal cual.
export function decodeKeyword(raw) {
  const s = String(raw ?? "");
  if (!s) return "";
  let out = s.replace(/\+/g, " ");
  // Hasta dos pasadas: algunos navegadores vuelven a codificar el «%».
  for (let i = 0; i < 2 && /%[0-9a-f]{2}/i.test(out); i++) {
    try {
      out = decodeURIComponent(out);
    } catch {
      break;
    }
  }
  return out.replace(/\s+/g, " ").trim();
}

// Parámetros de anuncio de una URL o ruta con query («/en?kw=…&gclid=…»).
// URLSearchParams ya decodifica una vez; decodeKeyword termina el trabajo.
export function adsFromUrl(urlish) {
  const out = { campaignid: "", kw: "", mt: "", ag: "" };
  const s = String(urlish ?? "");
  const q = s.indexOf("?");
  if (q < 0) return out;
  let params;
  try {
    params = new URLSearchParams(s.slice(q + 1).split("#")[0]);
  } catch {
    return out;
  }
  for (const [param, key] of Object.entries(ADS_URL_PARAMS)) {
    out[key] = cut(params.get(param));
  }
  return out;
}

// Normaliza un objeto `ads` (solo claves conocidas, recortadas).
export function cleanAds(data) {
  const out = { campaignid: "", kw: "", mt: "", ag: "" };
  if (!data || typeof data !== "object") return out;
  for (const k of ADS_KEYS) out[k] = cut(data[k]);
  return out;
}

const hasAds = (a) => Boolean(a && ADS_KEYS.some((k) => a[k]));

// Datos de anuncio de un toque: `ads` si lo trae, si no la URL de entrada.
// Cada campo vacío se completa con la URL (avisos antiguos o parciales).
export function touchAds(touch) {
  if (!touch || typeof touch !== "object") return cleanAds(null);
  const own = cleanAds(touch.ads);
  const fromLanding = adsFromUrl(touch.landing);
  for (const k of ADS_KEYS) if (!own[k]) own[k] = fromLanding[k];
  return own;
}

const hasClickId = (t) => Boolean(t && (t.gclid || t.gbraid || t.wbraid));

/**
 * Campaña y palabra clave del clic de anuncio. Se mira primero el toque que
 * lleva identificador de clic (primer toque; si no, el último) y, si le
 * faltan datos, se completan con el otro toque.
 */
export function adsInfo(attr) {
  if (!attr || typeof attr !== "object") return emptyInfo();
  const first = attr;
  const last = attr.last && typeof attr.last === "object" ? attr.last : null;
  const order = hasClickId(first) || !last ? [first, last] : [last, first];
  const ads = cleanAds(null);
  for (const t of order.filter(Boolean)) {
    const a = touchAds(t);
    for (const k of ADS_KEYS) if (!ads[k] && a[k]) ads[k] = a[k];
  }
  if (!hasAds(ads)) return emptyInfo();
  const known = CAMPAIGNS[ads.campaignid];
  const mt = String(ads.mt || "").toLowerCase();
  return {
    campaignId: ads.campaignid,
    campaign: known ? known.short : ads.campaignid,
    campaignName: known ? known.name : ads.campaignid,
    keyword: decodeKeyword(ads.kw),
    matchType: MATCH_TYPES[mt] || (mt ? mt : ""),
    adGroup: ads.ag,
  };
}

function emptyInfo() {
  return { campaignId: "", campaign: "", campaignName: "", keyword: "", matchType: "", adGroup: "" };
}

// ─── Origen (Google Ads / ChatGPT / web) ────────────────────────────────

const utmOf = (t) => (t && t.utm && typeof t.utm === "object" ? t.utm : {});

export const isGoogleAdsTouch = (t) =>
  Boolean(
    t &&
      (hasClickId(t) ||
        cut(touchAds(t).campaignid) ||
        (String(utmOf(t).source || "").toLowerCase() === "google" &&
          String(utmOf(t).medium || "").toLowerCase() === "cpc"))
  );

export const isChatGptTouch = (t) =>
  Boolean(
    t &&
      (/^chatgpt(\.com)?$/i.test(String(utmOf(t).source || "")) ||
        /(^|\.)chatgpt\.com$/i.test(String(t.referrer || "")))
  );

// Con identificador de clic en el primer o en el último toque, Google Ads;
// ChatGPT solo por el primer toque; el resto, web.
export function clickOrigin(attr) {
  if (!attr) return "web";
  if (isGoogleAdsTouch(attr) || isGoogleAdsTouch(attr.last)) return "google_ads";
  if (isChatGptTouch(attr)) return "chatgpt";
  return "web";
}

export const ORIGIN_LABEL = { google_ads: "Google Ads", chatgpt: "ChatGPT", web: "web" };

// ─── Textos de los avisos ───────────────────────────────────────────────

// «sworn translator spain (frase)»; sin palabra clave, "".
export function keywordText(info) {
  if (!info || !info.keyword) return "";
  return info.matchType ? `${info.keyword} (${info.matchType})` : info.keyword;
}

// Líneas para el cuerpo; solo las que tienen dato.
export function campaignLines(info) {
  const lines = [];
  if (info && info.campaign) lines.push(`Campaña: ${info.campaign}`);
  if (info && info.keyword) lines.push(`Palabra clave: ${keywordText(info)}`);
  return lines;
}

// Tramos del asunto: ["EN", "sworn translator spain"] sin huecos (la
// palabra clave sin el tipo de concordancia, para que el asunto sea corto).
export function subjectParts(info) {
  const parts = [];
  if (info && info.campaign) parts.push(info.campaign);
  if (info && info.keyword) parts.push(info.keyword);
  return parts;
}

// «Google Ads · EN · sworn translator spain» / «ChatGPT» / «web».
export function originSummary(origin, info) {
  const label = ORIGIN_LABEL[origin] || ORIGIN_LABEL.web;
  if (origin !== "google_ads") return label;
  return [label, ...subjectParts(info)].join(" · ");
}
