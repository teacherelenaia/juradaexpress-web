"use client";

// app/components/CookieConsent.js
import { useEffect, useState } from "react";
import Script from "next/script";

const GA4_ID = "G-4Q24BN11PX";
const CONSENT_KEY = "cookie_consent";

export default function CookieConsent() {
  const [consent, setConsent] = useState(null);
  const [showBanner, setShowBanner] = useState(false);

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
        <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 px-4 py-4 shadow-lg backdrop-blur">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 sm:flex-row">
            <p className="text-sm text-slate-600">
              Usamos cookies de analítica (Google Analytics) para mejorar la
              web. Puedes aceptarlas o rechazarlas cuando quieras.
            </p>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={() => choose("rejected")}
                className="rounded-xl border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
              >
                Rechazar
              </button>
              <button
                type="button"
                onClick={() => choose("accepted")}
                className="rounded-xl bg-emerald-600 px-4 py-2 text-sm text-white hover:bg-emerald-700"
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
