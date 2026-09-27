// app/components/Guarantees.js
//
// Tres garantías cortas con icono (FASE 1 SEO, 27/09/2026). Los textos
// viven en content/site.js (GUARANTEES) para reutilizarlos en el hero de
// la home ES/EN, en /traductor-jurado-ingles y en las landings de ciudad.
// Lista vertical siempre: tres líneas cortas bajo el chip de precio, que
// no se rompen en móvil ni compiten con los botones.
import { GUARANTEES } from "../../content/site";
import { IconShieldCheck, IconRefresh, IconClock } from "./Icons";

const ICONS = {
  shieldCheck: IconShieldCheck,
  refresh: IconRefresh,
  clock: IconClock,
};

const LABEL = { es: "Garantías", en: "Guarantees" };

export default function Guarantees({ locale = "es", className = "" }) {
  const items = GUARANTEES[locale] || GUARANTEES.es;
  return (
    <ul
      aria-label={LABEL[locale] || LABEL.es}
      className={`space-y-1.5 text-sm text-slate-700 ${className}`}
    >
      {items.map((g) => {
        const Icon = ICONS[g.icon] || IconShieldCheck;
        return (
          <li key={g.id} className="flex items-start gap-2">
            <Icon className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold-700" />
            {g.href ? (
              <a
                href={g.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={g.hrefLabel || g.text}
                className="link-nav text-slate-700"
              >
                {g.text}
              </a>
            ) : (
              <span>{g.text}</span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
