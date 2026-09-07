"use client";

// app/components/MobileNav.js
// Menú móvil en panel deslizante. El panel está SIEMPRE montado: entra con
// translateY(-8px)+opacity en 200 ms ease-out y sale en 150 ms (clases
// .mobile-panel en globals.css). Incluye selector de idioma y redes.
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import SocialIcons from "./SocialIcons";
import { getLinks, getInternationalGroups, isActive, isEnglishPath } from "./MainNav";

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  // Acordeón "Internacional" (FASE 2B.3): abierto por defecto si la página
  // actual es una de las internacionales.
  const [intlOpen, setIntlOpen] = useState(false);
  const pathname = usePathname() || "/";
  const english = isEnglishPath(pathname);
  const links = getLinks(pathname).filter((l) => !l.menu);
  const groups = getInternationalGroups(pathname);
  const intlActive = groups.some((g) =>
    g.items.some((l) => isActive(pathname, l.href))
  );
  const panelRef = useRef(null);
  const buttonRef = useRef(null);

  // Cerrar con Escape devolviendo el foco al botón del menú.
  useEffect(() => {
    if (!open) return;
    function onKeyDown(e) {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={
          open
            ? english
              ? "Close menu"
              : "Cerrar menú"
            : english
              ? "Open menu"
              : "Abrir menú"
        }
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

      <div
        id="mobile-nav-panel"
        ref={panelRef}
        data-open={open}
        aria-hidden={!open}
        className="mobile-panel absolute inset-x-0 top-full border-t border-white/10 bg-brand-navy px-4 py-3 shadow-lg"
      >
        <nav
          aria-label={
            english ? "Main navigation (mobile)" : "Navegación principal (móvil)"
          }
          className="flex flex-col"
        >
          {links.map((l) => {
            const active = isActive(pathname, l.href);
            return (
              <a
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                tabIndex={open ? undefined : -1}
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
          {/* Acordeón Internacional (FASE 2B.3): misma jerarquía que el
              desplegable de escritorio, dos grupos. */}
          <button
            type="button"
            onClick={() => setIntlOpen((v) => !v)}
            aria-expanded={intlOpen || intlActive}
            aria-controls="mobile-nav-internacional"
            tabIndex={open ? undefined : -1}
            className={`mt-2 flex w-full items-center justify-between rounded-lg border-t border-white/10 px-3 py-3 text-left no-underline ${
              intlActive
                ? "font-medium text-brand-gold-300"
                : "text-slate-100 hover:bg-white/10 hover:text-brand-gold-300"
            }`}
          >
            {english ? "International" : "Internacional"}
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className={`transition-transform duration-[180ms] ${
                intlOpen || intlActive ? "rotate-180" : ""
              }`}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          <div
            id="mobile-nav-internacional"
            hidden={!(intlOpen || intlActive)}
            className="pb-1"
          >
            {groups.map((g) => (
              <div key={g.id} className="mt-1">
                <p
                  id={`mobile-nav-intl-${g.id}`}
                  className="px-3 pb-1 pt-2 text-xs font-medium uppercase tracking-wide text-slate-400"
                >
                  {g.label}
                </p>
                <ul aria-labelledby={`mobile-nav-intl-${g.id}`} className="flex flex-col">
                  {g.items.map((l) => {
                    const active = isActive(pathname, l.href);
                    return (
                      <li key={l.href}>
                        <a
                          href={l.href}
                          aria-current={active ? "page" : undefined}
                          tabIndex={open && (intlOpen || intlActive) ? undefined : -1}
                          onClick={() => setOpen(false)}
                          className={`block rounded-lg px-3 py-2.5 pl-6 no-underline ${
                            active
                              ? "bg-white/10 font-medium text-brand-gold-300"
                              : "text-slate-100 hover:bg-white/10 hover:text-brand-gold-300"
                          }`}
                        >
                          {l.label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-2 flex items-center justify-between border-t border-white/10 px-3 pt-3 text-slate-100">
            <LanguageSwitcher />
            <SocialIcons />
          </div>
        </nav>
      </div>
    </div>
  );
}
