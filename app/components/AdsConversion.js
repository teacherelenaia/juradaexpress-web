"use client";

// app/components/AdsConversion.js
//
// Conversiones de Google Ads (FASE 1 SEO, 27/09/2026; medición ampliada el
// 08/10/2026). Se monta una vez en SiteShell, junto a CookieConsent, y:
//
//   1. Carga gtag.js con la etiqueta de Ads (NEXT_PUBLIC_ADS_ID, "AW-…")
//      SOLO si esa variable existe y el visitante ha aceptado las cookies
//      (misma clave de localStorage que CookieConsent.js). Sin variable no
//      se carga nada; sin consentimiento tampoco. El modo de consentimiento
//      v2 (default denegado en el layout, update en CookieConsent.js) va
//      aparte y siempre por delante.
//   2. Dispara gtag('event', 'conversion', { send_to: <etiqueta> }) con una
//      acción de conversión distinta según el origen:
//        - NEXT_PUBLIC_ADS_CONV_QUOTE: envío del formulario de presupuesto
//          (QuoteCalculator.js y DocumentCatalog.js llaman a trackAdsConversion).
//        - NEXT_PUBLIC_ADS_CONV_WHATSAPP: clic en enlaces wa.me / api.whatsapp.com.
//        - NEXT_PUBLIC_ADS_CONV_CALL: clic en enlaces tel:.
//        - NEXT_PUBLIC_ADS_CONV_PURCHASE: pago completado en Stripe; la dispara
//          app/(es)/documentos/pago-exitoso con value, currency y
//          transaction_id (session_id) para que Ads no cuente dos veces.
//      Si falta alguna, se usa NEXT_PUBLIC_ADS_CONVERSION_ID como reserva.
//
// Elena rellena las variables en Vercel (ver .env.local.example). La
// personalización de anuncios queda desactivada, igual que las señales
// publicitarias de GA4, para que la política de cookies siga siendo cierta.
import { useEffect, useState } from "react";
import Script from "next/script";
import { CONSENT_KEY, CONSENT_EVENT } from "./CookieConsent";

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

const WHATSAPP_RE = /^https?:\/\/(wa\.me|api\.whatsapp\.com)\//i;
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
 * etiqueta y consentimiento.
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
 * variables de entorno o si el visitante no ha aceptado las cookies.
 * `source` elige la acción (quote / whatsapp / call / purchase); `extra`
 * permite añadir value, currency y transaction_id para deduplicar.
 * Devuelve true si se ha enviado el evento.
 */
export function trackAdsConversion(source, extra = {}) {
  if (typeof window === "undefined") return false;
  const label = conversionLabel(source);
  if (!ADS_ID || !label || !hasAdsConsent()) return false;
  ensureGtag()("event", "conversion", {
    send_to: label,
    ...extra,
  });
  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.debug("[AdsConversion]", source, label, extra);
  }
  return true;
}

export default function AdsConversion() {
  const [consent, setConsent] = useState(false);

  // Estado inicial del consentimiento + cambios desde el aviso de cookies.
  useEffect(() => {
    if (!ADS_ID) return;
    setConsent(hasAdsConsent());
    function onChange(e) {
      setConsent(e?.detail === "accepted");
    }
    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, []);

  // Clics en WhatsApp (wa.me) y teléfono (tel:), en cualquier página.
  // Fase de captura: se registra aunque el enlace abra otra pestaña o la
  // app de teléfono.
  useEffect(() => {
    if (!ADS_ID) return;
    function onClick(e) {
      const a = e.target?.closest?.("a[href]");
      if (!a) return;
      const href = a.getAttribute("href") || "";
      if (WHATSAPP_RE.test(href)) trackAdsConversion("whatsapp");
      else if (TEL_RE.test(href)) trackAdsConversion("telefono");
    }
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  if (!ADS_ID || !consent) return null;

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
