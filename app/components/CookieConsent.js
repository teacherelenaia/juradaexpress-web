"use client";

// app/components/CookieConsent.js
// Consentimiento de cookies + carga condicional de GA4 (solo tras aceptar).
// La tarjeta es compacta, en la esquina inferior izquierda (máx. 420 px),
// no a ancho completo, y enlaza con la política de cookies. En móvil se
// coloca por encima de la barra de acciones fija.
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

const GA4_ID = "G-4Q24BN11PX";
const CONSENT_KEY = "cookie_consent";

const COPY = {
  es: {
    text: "Usamos cookies de analítica (Google Analytics) para mejorar la web.",
    policy: "Política de cookies",
    policyHref: "/politica-cookies",
    accept: "Aceptar",
    reject: "Rechazar",
    ariaLabel: "Aviso de cookies",
  },
  en: {
    text: "We use analytics cookies (Google Analytics) to improve this site.",
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
    } else {
      setShowBanner(true);
    }
  }, []);

  function choose(value) {
    localStorage.setItem(CONSENT_KEY, value);
    setConsent(value);
    setShowBanner(false);
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
              className="btn btn-primary min-h-0 flex-1 px-4 py-2 text-sm"
            >
              {t.accept}
            </button>
            <button
              type="button"
              onClick={() => choose("rejected")}
              className="btn btn-ghost min-h-0 px-4 py-2 text-sm"
            >
              {t.reject}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
