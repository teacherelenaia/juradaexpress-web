"use client";

// app/components/AdsConversion.js
//
// Conversiones de Google Ads (FASE 1 SEO, 27/09/2026). Se monta una vez en
// SiteShell, junto a CookieConsent, y:
//
//   1. Carga gtag.js con la etiqueta de Ads (NEXT_PUBLIC_ADS_ID, "AW-…")
//      SOLO si esa variable existe y el visitante ha aceptado las cookies
//      (misma clave de localStorage que CookieConsent.js). Sin variable no
//      se carga nada; sin consentimiento tampoco.
//   2. Dispara gtag('event', 'conversion', { send_to: NEXT_PUBLIC_ADS_CONVERSION_ID })
//      en: clic en cualquier enlace wa.me (o api.whatsapp.com), clic en
//      enlaces tel:, envío correcto del formulario de presupuesto
//      (DocumentCatalog.js llama a trackAdsConversion) y carga de
//      /documentos/pago-exitoso (con el session_id de Stripe como
//      transaction_id para que Ads no cuente dos veces una recarga).
//
// Elena rellena las dos variables en Vercel (ver .env.local.example). La
// personalización de anuncios queda desactivada, igual que las señales
// publicitarias de GA4, para que la política de cookies siga siendo cierta.
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { CONSENT_KEY, CONSENT_EVENT } from "./CookieConsent";

const ADS_ID = process.env.NEXT_PUBLIC_ADS_ID || "";
const CONVERSION_ID = process.env.NEXT_PUBLIC_ADS_CONVERSION_ID || "";

// Páginas cuya carga cuenta como conversión.
const CONVERSION_PATHS = ["/documentos/pago-exitoso"];

const WHATSAPP_RE = /^https?:\/\/(wa\.me|api\.whatsapp\.com)\//i;
const TEL_RE = /^tel:/i;

function hasConsent() {
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

/**
 * Registra una conversión de Google Ads. No hace nada si faltan las
 * variables de entorno o si el visitante no ha aceptado las cookies.
 * `extra` permite añadir p. ej. transaction_id para deduplicar.
 * Devuelve true si se ha enviado el evento.
 */
export function trackAdsConversion(source, extra = {}) {
  if (typeof window === "undefined") return false;
  if (!ADS_ID || !CONVERSION_ID || !hasConsent()) return false;
  ensureGtag()("event", "conversion", {
    send_to: CONVERSION_ID,
    ...extra,
  });
  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.debug("[AdsConversion]", source, extra);
  }
  return true;
}

export default function AdsConversion() {
  const [consent, setConsent] = useState(false);
  const pathname = usePathname() || "/";

  // Estado inicial del consentimiento + cambios desde el aviso de cookies.
  useEffect(() => {
    if (!ADS_ID) return;
    setConsent(hasConsent());
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

  // Página de pago exitoso (Stripe redirige con ?session_id=…).
  useEffect(() => {
    if (!ADS_ID || !consent || !CONVERSION_PATHS.includes(pathname)) return;
    let extra = {};
    try {
      const sessionId = new URLSearchParams(window.location.search).get(
        "session_id"
      );
      if (sessionId) extra = { transaction_id: sessionId };
    } catch {
      /* sin query string */
    }
    trackAdsConversion("pago_exitoso", extra);
  }, [consent, pathname]);

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
            allow_ad_personalization_signals: false
          });
        `}
      </Script>
    </>
  );
}
