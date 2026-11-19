// app/components/FileTiers.js
//
// Expedientes completos de visado (19/11/2026). Dos piezas que leen
// content/expediente.js (única fuente de cifras):
//   - FileTiersSection: tabla de tramos + reglas + botones, para /precios y
//     /en/precios.
//   - FileHomeBlock: bloque propio de la portada ES/EN con los tres ejemplos
//     y el enlace a la página de expedientes.
import TrackedLink from "./TrackedLink";
import { SectionHeading } from "./ui";
import {
  FILE_ROUTE,
  FILE_WHATSAPP_URL,
  FILE_WHATSAPP_LABEL,
  FILE_TABLE_COPY,
  FILE_EXAMPLES,
  STATEMENTS_NOTE_HTML,
  FILE_PER_PAGE,
  fileTableRows,
} from "../../content/expediente";

const COPY = {
  es: {
    title: "Expediente completo de visado",
    intro: `Si tu expediente pasa del límite de un pack, no pagas página a página: precio cerrado por todo el expediente, ${FILE_PER_PAGE} € por página de 20 a 30 páginas.`,
    more: "Ver ejemplos y qué se traduce en cada trámite",
    homeTitle: "¿Tienes el expediente de visado entero? Mándamelo completo",
    homeText: `Un solo precio cerrado en menos de dos horas, una sola fecha de entrega y todos los documentos firmados por la misma traductora jurada. De 20 a 30 páginas, ${FILE_PER_PAGE} € por página, IVA incluido.`,
    examplesLabel: "Ejemplos",
    example: (ex) => `${ex.title.es}: ${ex.pages} páginas, ${ex.price} € (${ex.single} € a ${ex.single / ex.pages} €/pág. como documento suelto), en 24 horas`,
    page: "Precios y ejemplos de expediente completo",
  },
  en: {
    title: "Full visa file",
    intro: `If your file goes over a pack's limit, you don't pay page by page: one closed price for the whole file, €${FILE_PER_PAGE} per page for 20 to 30 pages.`,
    more: "See examples and what gets translated for each procedure",
    homeTitle: "Got your whole visa file? Send it to me complete",
    homeText: `One closed price in under two hours, one delivery date and every document signed by the same sworn translator. 20 to 30 pages, €${FILE_PER_PAGE} per page, VAT included.`,
    examplesLabel: "Examples",
    example: (ex) => `${ex.title.en}: ${ex.pages} pages, €${ex.price} (€${ex.single} at €${ex.single / ex.pages}/page as single documents), within 24 hours`,
    page: "Full visa file prices and examples",
  },
};

function Bullet() {
  return (
    <span
      className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-gold-500"
      aria-hidden="true"
    />
  );
}

export function FileTiersSection({ locale = "es", className = "" }) {
  const t = COPY[locale] || COPY.es;
  const tc = FILE_TABLE_COPY[locale] || FILE_TABLE_COPY.es;
  const rows = fileTableRows(locale);
  return (
    <section
      id="expediente"
      aria-labelledby="expediente-title"
      className={className}
      data-track-section="precios_expediente"
    >
      <SectionHeading as="h2" id="expediente-title" className="!text-2xl md:!text-3xl">
        {t.title}
      </SectionHeading>
      <p className="mt-3 max-w-[68ch] text-slate-600">{t.intro}</p>
      <div
        className="mt-5 overflow-x-auto rounded-xl ring-1 ring-stone-200"
        role="region"
        tabIndex={0}
        aria-label={tc.caption}
      >
        <table className="w-full min-w-[640px] text-left text-sm">
          <caption className="sr-only">{tc.caption}</caption>
          <thead className="bg-stone-50 text-slate-600">
            <tr>
              {tc.head.map((h) => (
                <th key={h} scope="col" className="p-3 font-semibold">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white">
            {rows.map((r, i) => (
              <tr key={i} className={i % 2 ? "bg-stone-50/50" : ""}>
                {r.map((cell, j) =>
                  j === 0 ? (
                    <th key={j} scope="row" className="p-3 align-top font-medium text-slate-900">
                      {cell}
                    </th>
                  ) : (
                    <td
                      key={j}
                      className="p-3 align-top text-slate-700 [&_strong]:font-semibold [&_strong]:text-slate-900"
                      dangerouslySetInnerHTML={{ __html: cell }}
                    />
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ul className="mt-4 max-w-[68ch] space-y-2 text-sm text-slate-700">
        {tc.rules.map((r) => (
          <li key={r} className="flex gap-3">
            <Bullet />
            <span>{r}</span>
          </li>
        ))}
      </ul>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <TrackedLink
          label={`precios_expediente_whatsapp_${locale}`}
          href={FILE_WHATSAPP_URL[locale]}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
        >
          {FILE_WHATSAPP_LABEL[locale]}
        </TrackedLink>
        <a href={FILE_ROUTE[locale]} className="link">
          {t.more}
        </a>
      </div>
    </section>
  );
}

export function FileHomeBlock({ locale = "es", className = "" }) {
  const t = COPY[locale] || COPY.es;
  return (
    <section
      id="expediente-completo"
      data-track-section="portada_expediente"
      className={className}
    >
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <div className="max-w-[68ch]">
          <SectionHeading>{t.homeTitle}</SectionHeading>
          <p className="mt-4 text-slate-600">{t.homeText}</p>
          <h3 className="mt-6 text-base font-semibold text-slate-900">{t.examplesLabel}</h3>
          <ul className="mt-2 grid gap-2 text-slate-700">
            {FILE_EXAMPLES.map((ex) => (
              <li key={ex.id} className="flex gap-3">
                <Bullet />
                <span className="tabular-nums">{t.example(ex)}</span>
              </li>
            ))}
          </ul>
          {/* Los ejemplos cuentan extractos: nota del brief de Elena (19/11/2026). */}
          <p
            className="mt-3 text-sm text-slate-600"
            dangerouslySetInnerHTML={{ __html: STATEMENTS_NOTE_HTML[locale] }}
          />
          <div className="mt-7 flex flex-wrap gap-3">
            <TrackedLink
              label={`portada_expediente_whatsapp_${locale}`}
              href={FILE_WHATSAPP_URL[locale]}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              {FILE_WHATSAPP_LABEL[locale]}
            </TrackedLink>
            <TrackedLink
              label={`portada_expediente_pagina_${locale}`}
              href={FILE_ROUTE[locale]}
              className="btn btn-secondary"
            >
              {t.page}
            </TrackedLink>
          </div>
        </div>
      </div>
    </section>
  );
}
