"use client";

// app/components/MainNav.js
// Navegación de escritorio con estado activo real (usePathname). El
// subrayado dorado de la página activa se dibuja con clip-path en 180 ms
// (ver .nav-underline en globals.css).
//
// FASE 2.6 / 2B.3 (encargo internacional): el ítem "Internacional" es un
// desplegable en dos columnas, "Servicios" (nómada digital, USCIS,
// urgentes) y "Por país" (Reino Unido, Estados Unidos, India, Irlanda,
// Canadá, Australia, todos los países). Sustituye a "Preguntas Frecuentes"
// en el menú de escritorio para no pasar de 6 ítems (las FAQ siguen en el
// footer). En las rutas /en el menú se muestra en inglés y enlaza a las
// páginas en inglés.
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { INTERNATIONAL_MENU_GROUPS } from "../../content/servicios/routes";

const LINKS_ES = [
  { href: "/", label: "Inicio" },
  { href: "/precios", label: "Precios" },
  { href: "/documentos", label: "Documentos" },
  { menu: "internacional", label: "Internacional" },
  { href: "/blog", label: "Blog" },
  { href: "/contacto", label: "Contacto" },
];

const LINKS_EN = [
  { href: "/en", label: "Home" },
  { href: "/en/precios", label: "Pricing" },
  { href: "/en/documentos", label: "Documents" },
  { menu: "internacional", label: "International" },
  { href: "/en/blog", label: "Blog" },
  { href: "/en/contacto", label: "Contact" },
];

// Se conserva por compatibilidad (lista ES).
const LINKS = LINKS_ES;

export function isEnglishPath(pathname) {
  return pathname === "/en" || pathname.startsWith("/en/");
}

export function getLinks(pathname) {
  return isEnglishPath(pathname) ? LINKS_EN : LINKS_ES;
}

/** Grupos del menú Internacional localizados: [{ id, label, items: [{href,label}] }] */
export function getInternationalGroups(pathname) {
  const en = isEnglishPath(pathname);
  return INTERNATIONAL_MENU_GROUPS.map((g) => ({
    id: g.id,
    label: en ? g.labelEn : g.labelEs,
    items: g.items.map((r) => ({
      href: en ? r.en : r.es,
      label: en ? r.labelEn : r.labelEs,
    })),
  }));
}

/** Lista plana de todos los ítems internacionales (para estado activo). */
export function getInternationalItems(pathname) {
  return getInternationalGroups(pathname).flatMap((g) => g.items);
}

export function isActive(pathname, href) {
  if (href === "/" || href === "/en") return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

function Chevron({ open }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`transition-transform duration-[180ms] ${open ? "rotate-180" : ""}`}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function InternationalMenu({ pathname, label }) {
  const [open, setOpen] = useState(false);
  // Con puntero fino el menú se abre al pasar el ratón; el clic lo fija
  // abierto (para teclado y para quien prefiere clicar). Un clic sobre un
  // menú fijado lo cierra; salir con el ratón solo cierra si no está fijado.
  const [pinned, setPinned] = useState(false);
  const rootRef = useRef(null);
  const buttonRef = useRef(null);
  const groups = getInternationalGroups(pathname);
  const active = groups.some((g) =>
    g.items.some((i) => isActive(pathname, i.href))
  );

  // Cerrar con Escape (devolviendo el foco al botón) y al pulsar fuera.
  useEffect(() => {
    if (!open) return;
    function onKeyDown(e) {
      if (e.key === "Escape") {
        setOpen(false);
        setPinned(false);
        buttonRef.current?.focus();
      }
    }
    function onPointerDown(e) {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setOpen(false);
        setPinned(false);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => {
        if (!pinned) setOpen(false);
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        onClick={() => {
          if (open && pinned) {
            setOpen(false);
            setPinned(false);
          } else {
            setOpen(true);
            setPinned(true);
          }
        }}
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls="nav-internacional"
        className={`relative inline-flex items-center gap-1 whitespace-nowrap py-1 transition-colors ${
          active
            ? "font-medium text-white"
            : "text-slate-200 hover:text-brand-gold-300"
        }`}
      >
        {label}
        <Chevron open={open} />
        {active && <span className="nav-underline" aria-hidden="true" />}
      </button>

      <div
        id="nav-internacional"
        data-open={open}
        aria-hidden={!open}
        className="nav-dropdown absolute left-1/2 top-full z-50 w-[34rem] pt-3"
      >
        <div className="grid grid-cols-2 gap-2 rounded-xl bg-brand-navy p-3 text-sm shadow-lg ring-1 ring-white/10">
          {groups.map((g) => (
            <div key={g.id}>
              <p
                id={`nav-internacional-${g.id}`}
                className="px-3 pb-1 pt-1 text-xs font-medium uppercase tracking-wide text-slate-400"
              >
                {g.label}
              </p>
              <ul aria-labelledby={`nav-internacional-${g.id}`}>
                {g.items.map((i) => {
                  const isCurrent = isActive(pathname, i.href);
                  return (
                    <li key={i.href}>
                      <a
                        href={i.href}
                        aria-current={isCurrent ? "page" : undefined}
                        tabIndex={open ? undefined : -1}
                        className={`block rounded-lg px-3 py-2 no-underline ${
                          isCurrent
                            ? "bg-white/10 font-medium text-brand-gold-300"
                            : "text-slate-100 hover:bg-white/10 hover:text-brand-gold-300"
                        }`}
                      >
                        {i.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function MainNav() {
  const pathname = usePathname() || "/";
  const links = getLinks(pathname);
  const english = isEnglishPath(pathname);

  return (
    <nav
      aria-label={english ? "Main navigation" : "Navegación principal"}
      className="hidden items-center gap-5 md:flex lg:gap-6"
    >
      {links.map((l) => {
        if (l.menu) {
          return (
            <InternationalMenu key={l.menu} pathname={pathname} label={l.label} />
          );
        }
        const active = isActive(pathname, l.href);
        return (
          <a
            key={l.href}
            href={l.href}
            aria-current={active ? "page" : undefined}
            className={`relative whitespace-nowrap py-1 no-underline transition-colors ${
              active
                ? "font-medium text-white"
                : "text-slate-200 hover:text-brand-gold-300"
            }`}
          >
            {l.label}
            {active && <span className="nav-underline" aria-hidden="true" />}
          </a>
        );
      })}
    </nav>
  );
}

export { LINKS };
