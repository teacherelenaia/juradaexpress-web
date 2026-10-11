// app/lib/engagement.js
//
// Eventos de comportamiento sin cookies para Vercel Analytics (11/10/2026).
// Las campañas de Google Ads traían clics sin conversiones y GA4 solo ve a
// quien acepta las cookies; Vercel Analytics cuenta a todo el mundo pero
// solo registraba páginas vistas. Este módulo reúne lo que comparten
// app/components/EngagementEvents.js (scroll, tiempo, secciones, clics),
// app/components/VercelAnalytics.js (beforeSend) y QuoteCalculator.js
// (envío de la calculadora):
//
//   - trackEngagement(nombre, props): envía el evento con `track` de
//     @vercel/analytics añadiendo `lang` (es/en). Solo en producción y nunca
//     en /api/*. No se manda gclid, utm, referencia JX, email, teléfono ni
//     nada escrito por el visitante. La página la registra Vercel por su
//     cuenta (dimensión «page» de cada evento, a partir de la URL que
//     recorta beforeSend), y el plan Pro admite como mucho 2 propiedades
//     por evento: la propia del evento y `lang`.
//   - ctaOfAnchor / outboundHost: clasifican un enlace pulsado.
//   - beforeSend: quita la query (gclid, utm_*…) de la URL que el script de
//     Vercel adjunta a cada evento propio. Las páginas vistas se dejan como
//     estaban, porque Vercel usa los utm_* de esa URL para sus filtros.
import { track } from "@vercel/analytics";
import { WHATSAPP_HREF_RE } from "./waOrigin";

// Solo en producción (en `next dev` el paquete tampoco envía nada).
export const ENABLED = process.env.NODE_ENV === "production";

// Umbrales de scroll_depth (% del documento) y de time_on_page (segundos
// con la pestaña visible). Cada valor se envía una sola vez por carga.
export const DEPTHS = [25, 50, 75, 100];
export const SECONDS = [10, 30, 60, 120];

// Valores admitidos de `cta` en cta_click.
export const CTA_TYPES = [
  "whatsapp",
  "presupuesto",
  "llamar",
  "email",
  "calculadora_enviar",
  "pack",
];

// Enlaces que cuentan como «pedir presupuesto» (catálogo de documentos).
const QUOTE_PATHS = new Set(["/documentos", "/en/documentos"]);

export function isEnglishPath(pathname) {
  return pathname === "/en" || pathname.startsWith("/en/");
}

export function langOf(pathname) {
  return isEnglishPath(pathname) ? "en" : "es";
}

export function isApiPath(pathname) {
  return pathname === "/api" || pathname.startsWith("/api/");
}

/**
 * Envía un evento a Vercel Analytics con `lang` añadido (salvo con
 * `withLang: false`, para los eventos que ya llevan dos propiedades, como
 * cta_click de pack). Devuelve true si se ha enviado (false fuera de
 * producción, en servidor o en /api).
 */
export function trackEngagement(name, props = {}, { withLang = true } = {}) {
  if (!ENABLED || typeof window === "undefined") return false;
  const path = window.location.pathname || "/";
  if (isApiPath(path)) return false;
  track(name, withLang ? { ...props, lang: langOf(path) } : { ...props });
  return true;
}

/**
 * Tipo de CTA de un enlace según su href: whatsapp (wa.me, api.whatsapp.com,
 * whatsapp://), llamar (tel:), email (mailto:) o presupuesto (/documentos,
 * /en/documentos). Null si no es ninguno. Los botones con
 * data-track-cta="…" se clasifican por ese atributo, no aquí.
 */
export function ctaOfAnchor(anchor) {
  const href = anchor.getAttribute("href") || "";
  if (!href) return null;
  if (WHATSAPP_HREF_RE.test(href)) return "whatsapp";
  if (/^tel:/i.test(href)) return "llamar";
  if (/^mailto:/i.test(href)) return "email";
  try {
    const url = new URL(href, window.location.href);
    if (url.origin !== window.location.origin) return null;
    const path = url.pathname.replace(/\/+$/, "") || "/";
    if (QUOTE_PATHS.has(path)) return "presupuesto";
  } catch {
    // href no parseable (javascript:, etc.): no es un CTA.
  }
  return null;
}

/**
 * Host de un enlace a otro dominio (MAEC, DGT, consulados, Maps…) o null si
 * es interno o no es http(s). Solo el host, nunca la URL completa.
 */
export function outboundHost(anchor) {
  try {
    const url = new URL(anchor.href, window.location.href);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    if (url.host === window.location.host) return null;
    return url.hostname;
  } catch {
    return null;
  }
}

/**
 * `beforeSend` del componente <Analytics> de Vercel: el script adjunta a
 * cada envío la URL de la página (`location.href`, con query). En los
 * eventos propios (type "event") se deja solo origen y ruta, para que
 * ninguna petición lleve gclid, utm_* ni referencias. Las páginas vistas
 * (type "pageview") no se tocan.
 */
export function beforeSend(event) {
  if (!event || event.type !== "event" || typeof event.url !== "string") {
    return event;
  }
  try {
    const url = new URL(event.url);
    url.search = "";
    url.hash = "";
    return { ...event, url: url.toString() };
  } catch {
    return event;
  }
}
