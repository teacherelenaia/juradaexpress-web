"use client";

// app/components/CookieConsent.js
// Renderiza también el botón flotante de WhatsApp: comparten posición fija en
// la esquina inferior, así que viven en el mismo componente para poder
// desplazar el botón hacia arriba mientras el banner de cookies está visible
// y evitar que se solapen.
import { useEffect, useRef, useState } from "react";
import Script from "next/script";

const GA4_ID = "G-4Q24BN11PX";
const CONSENT_KEY = "cookie_consent";
const WHATSAPP_URL =
  "https://wa.me/34685891214?text=Hola%20JuradaExpress,%20quisiera%20un%20presupuesto";

export default function CookieConsent() {
  const [consent, setConsent] = useState(null);
  const [showBanner, setShowBanner] = useState(false);
  const [bannerHeight, setBannerHeight] = useState(0);
  const bannerRef = useRef(null);
  const whatsappRef = useRef(null);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored === "accepted" || stored === "rejected") {
      setConsent(stored);
    } else {
      setShowBanner(true);
    }
  }, []);

  // Mide la altura real del banner (varía según cuánto envuelva el texto)
  // para que el botón de WhatsApp nunca quede tapado ni se solape con él.
  useEffect(() => {
    if (!showBanner || !bannerRef.current) return;
    const el = bannerRef.current;
    const updateHeight = () => setBannerHeight(el.offsetHeight);
    updateHeight();
    const ro = new ResizeObserver(updateHeight);
    ro.observe(el);
    return () => ro.disconnect();
  }, [showBanner]);

  // Aplicado con !important vía ref (no como prop `style`) para que gane de
  // forma inequívoca sobre las clases estáticas bottom-4/sm:bottom-6.
  useEffect(() => {
    const el = whatsappRef.current;
    if (!el) return;
    if (showBanner) {
      el.style.setProperty("bottom", `${bannerHeight + 16}px`, "important");
    } else {
      el.style.removeProperty("bottom");
    }
  }, [showBanner, bannerHeight]);

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
          ref={bannerRef}
          className="fixed inset-x-0 bottom-0 z-50 border-t border-stone-200 bg-white/95 px-4 py-4 shadow-lg backdrop-blur"
        >
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 sm:flex-row">
            <p className="text-sm text-slate-600">
              Usamos cookies de analítica (Google Analytics) para mejorar la
              web. Puedes aceptarlas o rechazarlas cuando quieras.
            </p>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={() => choose("rejected")}
                className="rounded-xl border border-stone-300 px-4 py-2 text-sm text-slate-700 hover:bg-stone-50"
              >
                Rechazar
              </button>
              <button
                type="button"
                onClick={() => choose("accepted")}
                className="rounded-xl bg-brand-navy px-4 py-2 text-sm text-white hover:bg-brand-navy-700"
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}

      <a
        ref={whatsappRef}
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escríbenos por WhatsApp"
        className="fixed right-4 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-[bottom] duration-200 hover:bg-[#20BD5A] sm:right-6 bottom-4 sm:bottom-6"
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12.05 0C5.407 0 0 5.407 0 12.05c0 2.125.553 4.198 1.606 6.024L0 24l6.075-1.594a11.99 11.99 0 0 0 5.976 1.594h.005c6.643 0 12.05-5.407 12.05-12.05 0-3.22-1.254-6.246-3.532-8.524A11.982 11.982 0 0 0 12.05 0zm0 22.06a10.05 10.05 0 0 1-5.13-1.405l-.368-.218-3.812.999 1.017-3.716-.24-.383a10.037 10.037 0 0 1-1.539-5.363c0-5.548 4.516-10.064 10.077-10.064 2.692 0 5.223 1.05 7.126 2.955a10.001 10.001 0 0 1 2.951 7.12c0 5.549-4.517 10.075-10.082 10.075z" />
        </svg>
      </a>
    </>
  );
}
