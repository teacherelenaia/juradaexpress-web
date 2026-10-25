"use client";

// app/components/CookieConsent.js
// Consentimiento de cookies + carga condicional de GA4 (solo tras aceptar).
// Modo de consentimiento v2 (08/10/2026; avanzado desde el 25/10/2026): los
// root layouts fijan el `consent default` (todo denegado) antes de
// cualquier script y AdsConversion.js carga la etiqueta de Google Ads en
// todas las páginas; aquí se envía el `consent update` al aceptar (y al
// cargar si ya estaba aceptado) o al rechazar. Hasta aceptar, Google no
// escribe cookies. La personalización de anuncios sigue denegada siempre
// (ni el aviso ni la política de cookies la mencionan).
// «Aceptar» y «Rechazar» tienen el mismo estilo y ancho (mismo peso, como
// pide la guía de cookies de la AEPD). La tarjeta es compacta, en la esquina inferior izquierda (máx. 420 px),
// no a ancho completo, y enlaza con la política de cookies. En móvil se
// coloca por encima de la barra de acciones fija.
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

const GA4_ID = "G-4Q24BN11PX";
export const CONSENT_KEY = "cookie_consent";
export const CONSENT_EVENT = "jx:cookie-consent";
// Si hay etiqueta de Google Ads configurada, el aviso lo dice.
const HAS_ADS = Boolean(process.env.NEXT_PUBLIC_ADS_ID);

// gtag('consent','update', …). Usa la función global que define el script
// consent-default del layout; si no existe (p. ej. bloqueador), encola en
// dataLayer con el mismo stub que usa Google.
export function updateConsent(value) {
  if (typeof window === "undefined") return;
  try {
    window.dataLayer = window.dataLayer || [];
    const gtag =
      typeof window.gtag === "function"
        ? window.gtag
        : function gtag() {
            window.dataLayer.push(arguments);
          };
    const granted = value === "accepted";
    gtag("consent", "update", {
      ad_storage: granted ? "granted" : "denied",
      ad_user_data: granted ? "granted" : "denied",
      analytics_storage: granted ? "granted" : "denied",
      ad_personalization: "denied",
    });
  } catch {
    /* sin dataLayer */
  }
}

const COPY = {
  es: {
    text: HAS_ADS
      ? "Usamos cookies de analítica y de medición de conversiones (Google Analytics y Google Ads) para mejorar la web."
      : "Usamos cookies de analítica (Google Analytics) para mejorar la web.",
    policy: "Política de cookies",
    policyHref: "/politica-cookies",
    accept: "Aceptar",
    reject: "Rechazar",
    ariaLabel: "Aviso de cookies",
  },
  en: {
    text: HAS_ADS
      ? "We use analytics and conversion-measurement cookies (Google Analytics and Google Ads) to improve this site."
      : "We use analytics cookies (Google Analytics) to improve this site.",
    policy: "Cookie policy",
    policyHref: "/en/cookie-policy",
    accept: "Accept",
    reject: "Reject",
    ariaLabel: "Cookie notice",
  },
};

export default function CookieConsent() {
  const [consent, setConsent] = useState(null);
  const [showBanner, setShowBanner] = useState(false);
  const pathname = usePathname() || "/";
  const isEnglish = pathname === "/en" || pathname.startsWith("/en/");
  const t = isEnglish ? COPY.en : COPY.es;

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored === "accepted" || stored === "rejected") {
      setConsent(stored);
      // Modo de consentimiento v2: repetir el `update` en cada carga.
      updateConsent(stored);
    } else {
      setShowBanner(true);
    }
  }, []);

  function choose(value) {
    localStorage.setItem(CONSENT_KEY, value);
    setConsent(value);
    setShowBanner(false);
    // Modo de consentimiento v2: antes de cargar GA4/Ads (abajo) y de avisar
    // al resto de componentes.
    updateConsent(value);
    // Avisa a AdsConversion (y a cualquier otro oyente) del cambio.
    window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
  }

  return (
    <>
      {consent === "accepted" && GA4_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = window.gtag || gtag;
              gtag('js', new Date());
              gtag('config', '${GA4_ID}', {
                anonymize_ip: true,
                allow_google_signals: false
              });
            `}
          </Script>
        </>
      )}

      {showBanner && (
        <div
          role="region"
          aria-label={t.ariaLabel}
          className="fixed bottom-[calc(64px+env(safe-area-inset-bottom,0px)+12px)] left-4 right-4 z-[60] max-w-[420px] rounded-xl border border-stone-200 bg-white p-4 shadow-lg sm:right-auto md:bottom-4"
        >
          <p className="text-sm text-slate-600">
            {t.text}{" "}
            <a href={t.policyHref} className="link">
              {t.policy}
            </a>
          </p>
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={() => choose("accepted")}
              className="btn btn-secondary min-h-0 flex-1 px-4 py-2 text-sm"
            >
              {t.accept}
            </button>
            <button
              type="button"
              onClick={() => choose("rejected")}
              className="btn btn-secondary min-h-0 flex-1 px-4 py-2 text-sm"
            >
              {t.reject}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
