"use client";

// app/components/MainNav.js
// Navegación de escritorio con estado activo real (usePathname). El
// subrayado dorado de la página activa se dibuja con clip-path en 180 ms
// (ver .nav-underline en globals.css).
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/precios", label: "Precios" },
  { href: "/documentos", label: "Documentos" },
  { href: "/blog", label: "Blog" },
  { href: "/preguntas-frecuentes", label: "Preguntas Frecuentes" },
  { href: "/contacto", label: "Contacto" },
];

export function isActive(pathname, href) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function MainNav() {
  const pathname = usePathname() || "/";

  return (
    <nav
      aria-label="Navegación principal"
      className="hidden items-center gap-5 md:flex lg:gap-6"
    >
      {LINKS.map((l) => {
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
