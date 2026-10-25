"use client";

// app/components/AdsConversion.js
//
// Conversiones de Google Ads (FASE 1 SEO, 27/09/2026; medición ampliada el
// 08/10/2026; modo de consentimiento avanzado el 25/10/2026). Se monta una
// vez en SiteShell, junto a CookieConsent, y:
//
//   1. Carga gtag.js con la etiqueta de Ads (NEXT_PUBLIC_ADS_ID, "AW-…") en
//      todas las páginas desde el principio, si esa variable existe (sin
//      ella no se carga nada). Modo de consentimiento v2 AVANZADO: el
//      layout fija el `consent default` (todo denegado) antes de cualquier
//      script y CookieConsent.js manda el `update` al aceptar. Mientras no
//      se acepte, gtag.js no escribe cookies y solo manda pings sin cookies
//      (con ads_data_redaction y url_passthrough), que Google usa para
//      modelar las conversiones de quien rechaza o ignora el aviso.
//   2. Dispara gtag('event', 'conversion', { send_to: <etiqueta> }) con una
//      acción de conversión distinta según el origen:
//        - NEXT_PUBLIC_ADS_CONV_QUOTE: envío del formulario de presupuesto
//          (QuoteCalculator.js y DocumentCatalog.js llaman a trackAdsConversion).
//        - NEXT_PUBLIC_ADS_CONV_WHATSAPP: clic en enlaces wa.me / api.whatsapp.com.
//        - NEXT_PUBLIC_ADS_CONV_CALL: clic en enlaces tel:.
//        - NEXT_PUBLIC_ADS_CONV_PURCHASE: pago completado en Stripe; la
//          disparan /documentos/pago-exitoso, /gracias y /en/thank-you
//          (PurchaseConversion.js) con value, currency y transaction_id
//          (session_id) para que Ads no cuente dos veces.
//      Si falta alguna, se usa NEXT_PUBLIC_ADS_CONVERSION_ID como reserva.
//
// Elena rellena las variables en Vercel (ver .env.local.example). La
// personalización de anuncios queda desactivada, igual que las señales
// publicitarias de GA4, para que la política de cookies siga siendo cierta.
import { useEffect } from "react";
import Script from "next/script";
import { CONSENT_KEY } from "./CookieConsent";
import { handleWhatsAppClick, WHATSAPP_HREF_RE } from "../lib/waOrigin";

const ADS_ID = process.env.NEXT_PUBLIC_ADS_ID || "";
const FALLBACK_ID = process.env.NEXT_PUBLIC_ADS_CONVERSION_ID || "";

// Etiqueta ("send_to") de cada acción de conversión, con la antigua variable
// única como reserva.
const CONVERSION_LABELS = {
  quote: process.env.NEXT_PUBLIC_ADS_CONV_QUOTE || FALLBACK_ID,
  whatsapp: process.env.NEXT_PUBLIC_ADS_CONV_WHATSAPP || FALLBACK_ID,
  call: process.env.NEXT_PUBLIC_ADS_CONV_CALL || FALLBACK_ID,
  purchase: process.env.NEXT_PUBLIC_ADS_CONV_PURCHASE || FALLBACK_ID,
};

// Origen que pasan los componentes → acción de conversión.
const SOURCE_TO_ACTION = {
  whatsapp: "whatsapp",
  telefono: "call",
  call: "call",
  pago_exitoso: "purchase",
  compra: "purchase",
  purchase: "purchase",
};

// wa.me, api.whatsapp.com y whatsapp:// (misma regla que app/lib/waOrigin.js).
const WHATSAPP_RE = WHATSAPP_HREF_RE;
const TEL_RE = /^tel:/i;

export function hasAdsConsent() {
  try {
    return localStorage.getItem(CONSENT_KEY) === "accepted";
  } catch {
    return false;
  }
}

function ensureGtag() {
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== "function") {
    // Mismo stub que usa Google: las llamadas se encolan en dataLayer y
    // gtag.js las procesa cuando termina de cargar.
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
  }
  return window.gtag;
}

// Etiqueta de conversión para un origen dado ("" si no está configurada).
export function conversionLabel(source) {
  const action = SOURCE_TO_ACTION[source] || "quote";
  return CONVERSION_LABELS[action] || "";
}

/**
 * Conversiones mejoradas: datos del cliente (email) que gtag.js cifra
 * antes de enviarlos. Llamar ANTES de trackAdsConversion. Solo con
 * etiqueta y consentimiento (sin él no se pasa ningún dato personal).
 */
export function setAdsUserData(data = {}) {
  if (typeof window === "undefined") return false;
  if (!ADS_ID || !hasAdsConsent()) return false;
  const clean = {};
  if (data.email) clean.email = String(data.email).trim().toLowerCase();
  if (data.phone) clean.phone_number = String(data.phone).trim();
  if (!Object.keys(clean).length) return false;
  ensureGtag()("set", "user_data", clean);
  return true;
}

/**
 * Registra una conversión de Google Ads. No hace nada si faltan las
 * variables de entorno. Se envía con o sin consentimiento: el modo de
 * consentimiento decide si va con cookies o como ping sin cookies.
 * `source` elige la acción (quote / whatsapp / call / purchase); `extra`
 * permite añadir value, currency y transaction_id para deduplicar.
 * transport_type 'beacon': la petición sale aunque la página se cierre o
 * pierda el foco (WhatsApp se abre en otra pestaña o en la app).
 * Devuelve true si se ha enviado el evento.
 */
export function trackAdsConversion(source, extra = {}) {
  if (typeof window === "undefined") return false;
  const label = conversionLabel(source);
  if (!ADS_ID || !label) return false;
  ensureGtag()("event", "conversion", {
    send_to: label,
    transport_type: "beacon",
    ...extra,
  });
  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.debug("[AdsConversion]", source, label, extra);
  }
  return true;
}

export default function AdsConversion() {
  // Clics en WhatsApp (wa.me) y teléfono (tel:), en cualquier página: un
  // único listener delegado en document, así cuenta cualquier enlace
  // (cabecera, flotante, CTA, documentos, landings, blog y los que se
  // pintan después). Fase de captura: se registra aunque el enlace abra
  // otra pestaña o la app de teléfono. `auxclick` (rueda del ratón, abrir
  // en pestaña nueva) no dispara `click`, así que no se cuenta dos veces.
  // En los de WhatsApp, app/lib/waOrigin.js añade antes la referencia de
  // origen («Ref. anuncio: JX-…») al mensaje y avisa a /api/wa-click si la
  // visita viene de una campaña; eso no depende de la etiqueta de Ads.
  useEffect(() => {
    function onClick(e) {
      const a = e.target?.closest?.("a[href]");
      if (!a) return;
      const href = a.getAttribute("href") || "";
      if (WHATSAPP_RE.test(href)) {
        handleWhatsAppClick(a);
        trackAdsConversion("whatsapp");
      } else if (TEL_RE.test(href)) trackAdsConversion("telefono");
    }
    function onAuxClick(e) {
      if (e.button === 1) onClick(e);
    }
    document.addEventListener("click", onClick, true);
    document.addEventListener("auxclick", onAuxClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("auxclick", onAuxClick, true);
    };
  }, []);

  if (!ADS_ID) return null;

  // url_passthrough: sin cookies, el gclid viaja en la URL de los enlaces
  // internos. ads_data_redaction: sin consentimiento de ad_storage, los
  // pings van sin identificadores de anuncio. Se fijan con `set` antes del
  // `config`, como indica Google.
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${ADS_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ads-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = window.gtag || gtag;
          gtag('set', 'url_passthrough', true);
          gtag('set', 'ads_data_redaction', true);
          gtag('js', new Date());
          gtag('config', '${ADS_ID}', {
            allow_ad_personalization_signals: false,
            allow_enhanced_conversions: true
          });
        `}
      </Script>
    </>
  );
}
