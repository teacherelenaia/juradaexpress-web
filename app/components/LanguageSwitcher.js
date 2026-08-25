"use client";

// app/components/LanguageSwitcher.js
import { usePathname } from "next/navigation";

// Rutas ES que tienen equivalente en /en (mismos slugs bajo /en/*)
const ES_TO_EN = {
  "/": "/en",
  "/precios": "/en/precios",
  "/contacto": "/en/contacto",
  "/documentos": "/en/documentos",
  "/preguntas-frecuentes": "/en/preguntas-frecuentes",
  "/politica-cookies": "/en/cookie-policy",
};

const EN_TO_ES = Object.fromEntries(
  Object.entries(ES_TO_EN).map(([es, en]) => [en, es])
);

export default function LanguageSwitcher({ className = "" }) {
  const pathname = usePathname() || "/";
  const isEnglish = pathname === "/en" || pathname.startsWith("/en/");

  // Si la página actual no tiene equivalente en el otro idioma
  // (blog, catálogo, fichas de documento…), cae al home del otro idioma.
  const esHref = isEnglish ? EN_TO_ES[pathname] || "/" : pathname;
  const enHref = isEnglish ? pathname : ES_TO_EN[pathname] || "/en";

  return (
    <div
      className={`inline-flex items-center gap-1 text-sm ${className}`}
      aria-label="Selector de idioma / Language selector"
    >
      <a
        href={esHref}
        aria-current={!isEnglish ? "page" : undefined}
        className={`inline-flex min-h-[44px] items-center rounded px-2 no-underline ${
          !isEnglish
            ? "font-semibold text-brand-gold-300"
            : "text-slate-300 hover:text-brand-gold-300"
        }`}
      >
        ES
      </a>
      <span className="text-slate-500" aria-hidden="true">
        /
      </span>
      <a
        href={enHref}
        aria-current={isEnglish ? "page" : undefined}
        className={`inline-flex min-h-[44px] items-center rounded px-2 no-underline ${
          isEnglish
            ? "font-semibold text-brand-gold-300"
            : "text-slate-300 hover:text-brand-gold-300"
        }`}
      >
        EN
      </a>
    </div>
  );
}
