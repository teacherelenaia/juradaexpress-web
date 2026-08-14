"use client";

// app/components/MobileNav.js
import { useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/precios", label: "Precios" },
  { href: "/documentos", label: "Documentos" },
  { href: "/blog", label: "Blog" },
  { href: "/preguntas-frecuentes", label: "Preguntas Frecuentes" },
  { href: "/contacto", label: "Contacto" },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        className="inline-flex items-center justify-center rounded-md p-2 text-slate-100 hover:text-brand-gold-300"
      >
        {open ? (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="18" x2="20" y2="18" />
          </svg>
        )}
      </button>

      {open && (
        <div
          id="mobile-nav-panel"
          className="absolute inset-x-0 top-full border-t border-white/10 bg-brand-navy px-4 py-3 shadow-lg"
        >
          <nav className="flex flex-col">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-slate-100 hover:bg-white/10 hover:text-brand-gold-300"
              >
                {l.label}
              </a>
            ))}
            <div className="mt-2 border-t border-white/10 px-3 pt-3">
              <LanguageSwitcher />
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
