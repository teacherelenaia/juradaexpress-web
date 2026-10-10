// app/lib/waOrigin.js
//
// «Origen» de los WhatsApp que llegan desde anuncios (09/10/2026).
//
// Casi todos los clientes contactan por WhatsApp y todos los enlaces de la
// web abren el mismo número con un texto fijo, así que Elena no tenía forma
// de saber que un WhatsApp venía de Google Ads. Este módulo, al hacer clic
// en cualquier enlace de WhatsApp (lo llama el listener de captura de
// app/components/AdsConversion.js):
//
//   1. Lee la atribución guardada por app/lib/attribution.js. Si la visita
//      no trae campaña (ni gclid/gbraid/wbraid ni utm_source) no hace nada.
//   2. Genera (o reutiliza, sessionStorage «jx_wa_ref») una referencia corta
//      «JX-» + 6 caracteres [A-Z0-9], derivada de un hash de
//      gclid|gbraid|wbraid|ts. Todos los clics de la misma visita llevan la
//      misma referencia.
//   3. Reescribe el href del enlace añadiendo una última línea al texto del
//      mensaje: «(Ref. anuncio: JX-ABC123)» o, en /en, «(Ad ref.: JX-ABC123)».
//      Elena la ve al final del WhatsApp que le llega.
//   4. Manda un beacon a /api/wa-click con la referencia y la atribución
//      (sin datos personales) para que el servidor guarde el clic en Vercel
//      Blob y avise por email. Una vez por referencia y sesión.
//
// No depende del consentimiento de cookies: el gclid es un dato de primera
// parte que el visitante trae en la URL (ver política de cookies).
// QuoteCalculator.js usa appendWaOrigin() para que su resumen de WhatsApp
// lleve también la línea.
import { getAttribution } from "./attribution";

export const WA_REF_KEY = "jx_wa_ref";
const WA_SENT_KEY = "jx_wa_ref_sent";
export const WA_REF_RE = /^JX-[A-Z0-9]{6}$/;
export const WHATSAPP_HREF_RE = /^(https?:\/\/(wa\.me|api\.whatsapp\.com)\/|whatsapp:\/\/)/i;
export const WA_CLICK_ENDPOINT = "/api/wa-click";

const LINE = {
  es: { greeting: "Hola Jurada Express,", label: "Ref. anuncio" },
  en: { greeting: "Hi Jurada Express,", label: "Ad ref." },
};

export function isWhatsAppHref(href) {
  return WHATSAPP_HREF_RE.test(String(href || ""));
}

// ¿La visita viene de una campaña? (misma regla que el beacon del servidor)
export function hasCampaign(attr) {
  if (!attr) return false;
  const touches = [attr, attr.last].filter(Boolean);
  return touches.some(
    (t) => Boolean(t.gclid || t.gbraid || t.wbraid || (t.utm && t.utm.source))
  );
}

// Hash FNV-1a de 32 bits (sin librerías) → 6 caracteres en base 36.
function hashRef(input) {
  let h = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return `JX-${h.toString(36).toUpperCase().padStart(6, "0").slice(-6)}`;
}

// Referencia de esta sesión: la guardada o una nueva a partir de la atribución.
export function getWaRef(attr) {
  let stored = "";
  try {
    stored = sessionStorage.getItem(WA_REF_KEY) || "";
  } catch {
    stored = "";
  }
  if (WA_REF_RE.test(stored)) return stored;
  const a = attr || {};
  const seed = [a.gclid, a.gbraid, a.wbraid, a.ts || new Date().toISOString()]
    .map((v) => String(v || ""))
    .join("|");
  const ref = hashRef(seed);
  try {
    sessionStorage.setItem(WA_REF_KEY, ref);
  } catch {
    /* sin storage: la referencia vale solo para este clic */
  }
  return ref;
}

export function waLang(pathname) {
  const p = String(pathname || "");
  return p === "/en" || p.startsWith("/en/") ? "en" : "es";
}

export function originLine(ref, lang = "es") {
  const t = LINE[lang] || LINE.es;
  return `(${t.label}: ${ref})`;
}

// Devuelve el href con la línea de referencia al final del parámetro `text`
// (respetando encodeURIComponent y los saltos de línea). Idempotente: si el
// texto ya lleva la referencia, devuelve el href tal cual.
export function withOriginLine(href, ref, lang = "es") {
  let url;
  try {
    url = new URL(href);
  } catch {
    return href;
  }
  const t = LINE[lang] || LINE.es;
  const line = originLine(ref, lang);
  const current = url.searchParams.get("text") || "";
  if (current.includes(ref)) return href;
  const text = current ? `${current}\n${line}` : `${t.greeting}\n${line}`;
  url.searchParams.delete("text");
  const rest = url.searchParams.toString();
  url.search = `${rest ? `${rest}&` : ""}text=${encodeURIComponent(text)}`;
  return url.toString();
}

// Para enlaces construidos en el cliente (QuoteCalculator.buildWhatsApp):
// añade la línea solo si la visita viene de una campaña.
export function appendWaOrigin(href, lang = "es") {
  if (typeof window === "undefined") return href;
  try {
    const attr = getAttribution();
    if (!hasCampaign(attr)) return href;
    return withOriginLine(href, getWaRef(attr), lang);
  } catch {
    return href;
  }
}

function sendBeacon(payload) {
  const body = JSON.stringify(payload);
  try {
    if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
      if (navigator.sendBeacon(WA_CLICK_ENDPOINT, body)) return true;
    }
  } catch {
    /* sigue con fetch */
  }
  try {
    fetch(WA_CLICK_ENDPOINT, {
      method: "POST",
      body,
      keepalive: true,
      headers: { "Content-Type": "text/plain;charset=UTF-8" },
    }).catch(() => {});
    return true;
  } catch {
    return false;
  }
}

// Avisa al servidor una vez por referencia y sesión (el servidor también
// es idempotente por referencia).
export function reportWaClick({ ref, lang, page, attribution }) {
  try {
    if (sessionStorage.getItem(WA_SENT_KEY) === ref) return false;
  } catch {
    /* sin storage: se manda igualmente */
  }
  const sent = sendBeacon({ ref, lang, page, attribution });
  if (sent) {
    try {
      sessionStorage.setItem(WA_SENT_KEY, ref);
    } catch {
      /* nada */
    }
  }
  return sent;
}

/**
 * Se llama desde el listener de clic (fase de captura) de AdsConversion.js
 * con el <a> pulsado. Reescribe su href y manda el beacon. Devuelve la
 * referencia usada o null si la visita no viene de una campaña.
 */
export function handleWhatsAppClick(anchor) {
  if (typeof window === "undefined" || !anchor) return null;
  try {
    const href = anchor.getAttribute("href") || "";
    if (!isWhatsAppHref(href)) return null;
    const attr = getAttribution();
    if (!hasCampaign(attr)) return null;
    const ref = getWaRef(attr);
    const lang = waLang(window.location.pathname);
    const next = withOriginLine(href, ref, lang);
    if (next !== href) anchor.setAttribute("href", next);
    reportWaClick({
      ref,
      lang,
      page: window.location.pathname + window.location.search,
      attribution: attr,
    });
    return ref;
  } catch {
    return null;
  }
}
