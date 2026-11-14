// app/lib/attribution.js
//
// Captura de atribución para Google Ads (medición, 08/10/2026). Cuatro de
// cada cinco ventas se cobran fuera de la web (Payment Link, transferencia,
// Wise o Bizum), así que la medición se apoya en la solicitud de
// presupuesto: aquí se guarda el identificador del clic (gclid / gbraid /
// wbraid) y los parámetros utm_* para que viajen con el email del cliente y
// Elena pueda importar después la venta a Google Ads.
//
// Dónde se guarda:
//   - sessionStorage (clave ATTR_KEY) SIEMPRE: muere al cerrar la pestaña.
//   - localStorage (misma clave, caduca a los LOCAL_TTL_MS) SOLO si el
//     visitante ha aceptado las cookies (clave de CookieConsent.js). Al
//     rechazarlas se borra la copia persistente.
//
// Forma del objeto guardado:
//   { gclid, gbraid, wbraid, utm: { source, medium, campaign, term, content },
//     ads: { campaignid, kw, mt, ag }, landing, referrer, ts,
//     last: { ...mismos campos del último toque } }
//
// `ads` (14/11/2026): gad_campaignid y el sufijo de URL final de Google Ads
// (kw={keyword}&mt={matchtype}&ag={adgroupid}), para que los avisos digan
// la campaña y la palabra clave (app/lib/adsCampaign.js). Se guardan aparte
// de `landing` y, como el resto, el primer valor no se pisa pero un toque
// posterior rellena los que falten: si la primera página guardada de la
// visita ya no los traía (p. ej. una pestaña nueva o «Abrir en el
// navegador» desde una página interior, con la URL decorada por
// url_passthrough de Google, que solo lleva _gl y gclid), la página con los
// parámetros completos los añade.
// Los campos de primer nivel son el PRIMER toque (no se pisan una vez
// rellenos); `last` es el último toque con parámetros de campaña.
//
// Todo va en try/catch: sin storage (modo privado, Safari con ITP, etc.)
// la web sigue funcionando y getAttribution() devuelve null.

export const ATTR_KEY = "jx_attr";
export const CONSENT_KEY = "cookie_consent";
export const LOCAL_TTL_MS = 90 * 24 * 60 * 60 * 1000; // 90 días

const CLICK_IDS = ["gclid", "gbraid", "wbraid"];
const UTM_KEYS = ["source", "medium", "campaign", "term", "content"];
// gad_campaignid y sufijo de URL final de Google Ads → clave en `ads`.
export const ADS_PARAMS = { gad_campaignid: "campaignid", kw: "kw", mt: "mt", ag: "ag" };
const ADS_KEYS = Object.values(ADS_PARAMS);
const MAX_LEN = 200;
// La URL de entrada de un anuncio (sufijo + gad_source + gad_campaignid +
// gbraid + gclid + _gl) pasa de 200 caracteres: antes se cortaba y se
// perdía el final. 600 caben de sobra.
const LANDING_MAX_LEN = 600;

const cut = (v, max = MAX_LEN) => String(v ?? "").trim().slice(0, max);

function hasConsent() {
  try {
    return localStorage.getItem(CONSENT_KEY) === "accepted";
  } catch {
    return false;
  }
}

function readJson(storage) {
  try {
    const raw = storage.getItem(ATTR_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    return data && typeof data === "object" ? data : null;
  } catch {
    return null;
  }
}

function writeJson(storage, data) {
  try {
    storage.setItem(ATTR_KEY, JSON.stringify(data));
  } catch {
    /* storage lleno o bloqueado */
  }
}

// Normaliza un registro leído de storage (campos conocidos y acotados).
function normalize(data) {
  if (!data || typeof data !== "object") return null;
  const utm = {};
  for (const k of UTM_KEYS) utm[k] = cut(data.utm && data.utm[k]);
  const ads = {};
  for (const k of ADS_KEYS) ads[k] = cut(data.ads && data.ads[k]);
  const out = {
    gclid: cut(data.gclid),
    gbraid: cut(data.gbraid),
    wbraid: cut(data.wbraid),
    utm,
    ads,
    landing: cut(data.landing, LANDING_MAX_LEN),
    referrer: cut(data.referrer),
    ts: cut(data.ts),
  };
  if (data.last && typeof data.last === "object") {
    const { last, ...rest } = normalize(data.last) || {};
    out.last = rest;
  }
  if (data.exp) out.exp = Number(data.exp) || 0;
  return out;
}

function hasCampaign(touch) {
  return Boolean(
    touch.gclid ||
      touch.gbraid ||
      touch.wbraid ||
      (touch.ads && touch.ads.campaignid) ||
      UTM_KEYS.some((k) => touch.utm && touch.utm[k])
  );
}

// Datos de anuncio guardados (primer toque y, si faltan, último), o null.
export function storedAds(attr) {
  if (!attr) return null;
  const out = {};
  for (const k of ADS_KEYS) {
    out[k] = (attr.ads && attr.ads[k]) || (attr.last && attr.last.ads && attr.last.ads[k]) || "";
  }
  return ADS_KEYS.some((k) => out[k]) ? out : null;
}

// Lee la URL actual y construye el toque de esta carga de página.
function currentTouch() {
  const params = new URLSearchParams(window.location.search);
  const utm = {};
  for (const k of UTM_KEYS) utm[k] = cut(params.get(`utm_${k}`));
  const ads = {};
  for (const [param, key] of Object.entries(ADS_PARAMS)) ads[key] = cut(params.get(param));
  let referrer = "";
  try {
    referrer = document.referrer ? new URL(document.referrer).hostname : "";
  } catch {
    referrer = "";
  }
  if (referrer === window.location.hostname) referrer = "";
  return {
    gclid: cut(params.get("gclid")),
    gbraid: cut(params.get("gbraid")),
    wbraid: cut(params.get("wbraid")),
    utm,
    ads,
    landing: cut(window.location.pathname + window.location.search, LANDING_MAX_LEN),
    referrer,
    ts: new Date().toISOString(),
  };
}

// Rellena los campos vacíos de `base` con los de `extra` (primer toque gana).
function fillEmpty(base, extra) {
  const out = { ...base, utm: { ...(base.utm || {}) }, ads: { ...(base.ads || {}) } };
  for (const k of CLICK_IDS.concat(["landing", "referrer", "ts"])) {
    if (!out[k] && extra[k]) out[k] = extra[k];
  }
  for (const k of UTM_KEYS) {
    if (!out.utm[k] && extra.utm && extra.utm[k]) out.utm[k] = extra.utm[k];
  }
  // Datos de anuncio: se completan todos juntos y solo si al primer toque
  // no le queda ninguno, para no mezclar la campaña de un clic con la
  // palabra clave de otro.
  if (!ADS_KEYS.some((k) => out.ads[k]) && extra.ads && ADS_KEYS.some((k) => extra.ads[k])) {
    for (const k of ADS_KEYS) out.ads[k] = extra.ads[k] || "";
  }
  return out;
}

const stripLast = ({ last, exp, ...rest }) => rest;

// Combina dos registros: el más antiguo manda en el primer toque; `last`
// es el toque más reciente de los dos.
export function mergeAttribution(a, b) {
  if (!a) return b || null;
  if (!b) return a;
  const aFirst = !b.ts || (a.ts && a.ts <= b.ts);
  const older = aFirst ? a : b;
  const newer = aFirst ? b : a;
  const merged = fillEmpty(stripLast(older), stripLast(newer));
  const lastA = a.last || stripLast(a);
  const lastB = b.last || stripLast(b);
  merged.last = (lastA.ts || "") >= (lastB.ts || "") ? lastA : lastB;
  return merged;
}

function readLocal() {
  const data = normalize(readJson(localStorage));
  if (!data) return null;
  if (data.exp && data.exp < Date.now()) {
    try {
      localStorage.removeItem(ATTR_KEY);
    } catch {
      /* nada */
    }
    return null;
  }
  return data;
}

// Copia el registro de sesión a localStorage (solo con consentimiento).
export function persistAttribution() {
  try {
    if (!hasConsent()) return;
    const session = normalize(readJson(sessionStorage));
    const merged = mergeAttribution(readLocal(), session);
    if (!merged) return;
    writeJson(localStorage, { ...merged, exp: Date.now() + LOCAL_TTL_MS });
  } catch {
    /* sin storage */
  }
}

// Borra la copia persistente (al rechazar las cookies).
export function clearPersistedAttribution() {
  try {
    localStorage.removeItem(ATTR_KEY);
  } catch {
    /* nada */
  }
}

// Se llama en cada carga de página (AttributionCapture.js).
export function captureAttribution() {
  if (typeof window === "undefined") return null;
  try {
    const touch = currentTouch();
    let session = normalize(readJson(sessionStorage));
    if (hasConsent()) {
      // Con consentimiento, lo guardado en visitas anteriores (más antiguo)
      // se combina con la sesión: el primer toque gana.
      session = mergeAttribution(readLocal(), session);
    }
    let next;
    if (!session) {
      next = { ...touch, last: { ...touch } };
    } else {
      next = fillEmpty(session, touch);
      // El último toque solo cambia cuando la visita trae parámetros de
      // campaña; una navegación interna no lo pisa.
      next.last = hasCampaign(touch) ? { ...touch } : session.last || stripLast(session);
    }
    delete next.exp;
    writeJson(sessionStorage, next);
    if (hasConsent()) {
      writeJson(localStorage, { ...next, exp: Date.now() + LOCAL_TTL_MS });
    }
    return next;
  } catch {
    return null;
  }
}

// Objeto combinado (sesión + copia persistente si hay consentimiento) o
// null si no hay nada guardado o no hay storage.
export function getAttribution() {
  if (typeof window === "undefined") return null;
  try {
    const session = normalize(readJson(sessionStorage));
    const local = hasConsent() ? readLocal() : null;
    const merged = mergeAttribution(local, session);
    if (!merged) return null;
    delete merged.exp;
    return merged;
  } catch {
    return null;
  }
}
