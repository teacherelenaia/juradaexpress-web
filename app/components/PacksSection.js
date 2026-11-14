// app/components/PacksSection.js
//
// Sección «Paquetes por trámite» de /precios y /en/precios (08/10/2026):
// una tarjeta por pack de content/packs.js con nombre, qué incluye, precio
// en euros (en inglés, además «approx. $X» con toUsd), la referencia
// «Por separado: …» en gris y tachada (pack.separately, content/site.js),
// lo que va incluido sin coste y dos botones: pedir el pack en el catálogo
// y WhatsApp con texto prellenado. Bajo el título, la garantía «Un pack
// nunca te cuesta más» (PackGuarantee). Componente de servidor; estilos de
// la web (btn, ring-stone-200, font-display).
//
// `PackCard` y `PackGrid` se exportan para reutilizar las mismas tarjetas
// en las páginas de servicio (bloque `{ packs: [ids] }` de ServicePage,
// p. ej. la landing de visados), con un `orderHref` propio opcional.
import { PACKS, PACKS_COPY, packWhatsAppUrl } from "../../content/packs";
import { toUsd } from "../../content/usd";

export function PackCard({ pack: p, locale = "es", orderHref }) {
  const t = PACKS_COPY[locale] || PACKS_COPY.es;
  const isEn = locale === "en";
  const name = p.name[locale] || p.name.es;
  const includes = p.includes[locale] || p.includes.es;
  return (
    <li
      id={`pack-${p.id}`}
      className="flex flex-col rounded-xl bg-white p-5 ring-1 ring-stone-200"
    >
      <h3 className="font-display text-xl font-semibold leading-snug text-slate-900">
        {name}
      </h3>
      <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-500">
        {t.documents(p.documents, p.pages)}
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
      {p.separately ? (
        <p className="mt-1 text-sm text-slate-500">
          {t.separatelyLabel}{" "}
          <s className="tabular-nums decoration-slate-400">{t.separately(p.separately)}</s>
        </p>
      ) : null}
      <p className="mt-3 text-sm text-slate-700">{t.includedFree}</p>
      <div className="mt-auto flex flex-wrap gap-2 pt-5">
        <a
          href={orderHref || t.orderHref}
          className="btn btn-primary"
          data-track-cta="pack"
          data-track-pack={p.id}
        >
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
}

// Garantía de los packs (14/11/2026): va bajo el título de la sección de
// packs en /precios y en las páginas de servicio que muestran packs.
export function PackGuarantee({ locale = "es", className = "" }) {
  const t = PACKS_COPY[locale] || PACKS_COPY.es;
  return (
    <p
      className={`max-w-2xl rounded-lg bg-brand-gold-50 px-4 py-3 text-[0.9375rem] font-medium text-slate-900 ring-1 ring-brand-gold-200 ${className}`}
    >
      {t.guarantee}
      <span className="mt-1 block font-normal text-slate-700">{t.pageLimit}</span>
    </p>
  );
}

export function PackGrid({ ids, locale = "es", orderHref, className = "" }) {
  const packs = ids
    ? ids.map((id) => PACKS.find((p) => p.id === id)).filter(Boolean)
    : PACKS;
  return (
    <ul className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-3 ${className}`}>
      {packs.map((p) => (
        <PackCard key={p.id} pack={p} locale={locale} orderHref={orderHref} />
      ))}
    </ul>
  );
}

export default function PacksSection({ locale = "es" }) {
  const t = PACKS_COPY[locale] || PACKS_COPY.es;

  return (
    <section id="packs" aria-labelledby="packs-title" className="mt-14">
      <h2
        id="packs-title"
        className="font-display text-2xl font-semibold leading-snug tracking-[-0.01em] text-slate-900 md:text-3xl"
      >
        {t.title}
      </h2>
      <PackGuarantee locale={locale} className="mt-3" />
      <p className="mt-3 max-w-2xl text-slate-600">{t.intro}</p>
      {t.visaPage ? (
        <p className="mt-2 max-w-2xl text-slate-600">
          {t.visaPage.text}{" "}
          <a href={t.visaPage.href} className="link">
            {t.visaPage.label}
          </a>
          .
        </p>
      ) : null}

      <PackGrid locale={locale} className="mt-6" />

      <p className="mt-2 text-sm text-slate-500">{t.note}</p>
    </section>
  );
}
