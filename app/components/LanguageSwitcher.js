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
  "/sobre-mi": "/en/about",
  "/traduccion-jurada-britanicos-espana": "/en/sworn-translation-british-residents-spain",
  "/aviso-legal": "/en/legal-notice",
  "/politica-privacidad": "/en/privacy-policy",
  "/como-funciona": "/en/how-it-works",
};

const EN_TO_ES = Object.fromEntries(
  Object.entries(ES_TO_EN).map(([es, en]) => [en, es])
);

export default function LanguageSwitcher({ className = "" }) {
  const pathname = usePathname() || "/";
  const isEnglish = pathname === "/en" || pathname.startsWith("/en/");

  // Si la página no tiene equivalente exacto, va a la sección equivalente
  // más cercana del otro idioma (nunca al home a secas, salvo último recurso).
  function nearestEn(path) {
    if (ES_TO_EN[path]) return ES_TO_EN[path];
    if (path.startsWith("/traduccion-jurada-")) return "/en/documentos";
    if (path === "/traductor-jurado-murcia") return "/en/contacto";
    if (path.startsWith("/blog")) return "/en";
    if (path.startsWith("/documentos/")) return "/en/documentos";
    return "/en";
  }

  function nearestEs(path) {
    if (EN_TO_ES[path]) return EN_TO_ES[path];
    return "/";
  }

  const esHref = isEnglish ? nearestEs(pathname) : pathname;
  const enHref = isEnglish ? pathname : nearestEn(pathname);

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
