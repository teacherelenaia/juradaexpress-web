"use client";

// app/components/MobileNav.js
import { useState } from "react";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import { LINKS, isActive } from "./MainNav";

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() || "/";

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        className="inline-flex h-11 w-11 items-center justify-center rounded-md text-slate-100 hover:text-brand-gold-300"
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
          <nav aria-label="Navegación principal (móvil)" className="flex flex-col">
            {LINKS.map((l) => {
              const active = isActive(pathname, l.href);
              return (
                <a
                  key={l.href}
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={`rounded-lg px-3 py-3 no-underline ${
                    active
                      ? "bg-white/10 font-medium text-brand-gold-300"
                      : "text-slate-100 hover:bg-white/10 hover:text-brand-gold-300"
                  }`}
                >
                  {l.label}
                </a>
              );
            })}
            <div className="mt-2 border-t border-white/10 px-3 pt-3">
              <LanguageSwitcher />
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
