// app/components/PacksSection.js
//
// Sección «Paquetes por trámite» de /precios y /en/precios (08/10/2026):
// una tarjeta por pack de content/packs.js con nombre, qué incluye, precio
// en euros (en inglés, además «approx. $X» con toUsd) y dos botones: pedir
// el pack en el catálogo y WhatsApp con texto prellenado. Componente de
// servidor; estilos de la web (btn, ring-stone-200, font-display).
import { PACKS, PACKS_COPY, packWhatsAppUrl } from "../../content/packs";
import { toUsd } from "../../content/usd";

export default function PacksSection({ locale = "es" }) {
  const t = PACKS_COPY[locale] || PACKS_COPY.es;
  const isEn = locale === "en";

  return (
    <section id="packs" aria-labelledby="packs-title" className="mt-14">
      <h2
        id="packs-title"
        className="font-display text-2xl font-semibold leading-snug tracking-[-0.01em] text-slate-900 md:text-3xl"
      >
        {t.title}
      </h2>
      <p className="mt-3 max-w-2xl text-slate-600">{t.intro}</p>

      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PACKS.map((p) => {
          const name = p.name[locale] || p.name.es;
          const includes = p.includes[locale] || p.includes.es;
          return (
            <li
              key={p.id}
              id={`pack-${p.id}`}
              className="flex flex-col rounded-xl bg-white p-5 ring-1 ring-stone-200"
            >
              <h3 className="font-display text-xl font-semibold leading-snug text-slate-900">
                {name}
              </h3>
              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-500">
                {t.documents(p.documents)}
              </p>
              <p className="mt-3 text-sm text-slate-600">{includes}</p>
              <p className="mt-4 text-2xl font-semibold tabular-nums text-slate-900">
                {isEn ? `€${p.price}` : `${p.price} €`}
                {isEn ? (
                  <span className="ml-2 text-sm font-normal text-slate-500">
                    approx. ${toUsd(p.price)}
                  </span>
                ) : null}
              </p>
              <div className="mt-5 flex flex-wrap gap-2 pt-1">
                <a href={t.orderHref} className="btn btn-primary">
                  {t.order}
                </a>
                <a
                  href={packWhatsAppUrl(p, locale)}
                  className="btn btn-secondary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t.whatsapp}
                </a>
              </div>
            </li>
          );
        })}
      </ul>

      <p className="mt-6 text-sm text-slate-500">{t.extraPage}</p>
      <p className="mt-2 text-sm text-slate-500">{t.note}</p>
    </section>
  );
}
