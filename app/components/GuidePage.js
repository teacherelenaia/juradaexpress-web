// app/components/GuidePage.js
//
// Plantilla de las guías con tabla por trámite (10/10/2026). Nacen de la
// medición en ChatGPT: a las preguntas informativas («qué documentos
// necesito para…», «qué necesito para canjear mi permiso…») los motores de
// respuesta citan a quien mejor explica el trámite, no a quien vende. Cada
// guía responde a una pregunta con un H1 en afirmativo, dos párrafos de
// entrada que la contestan en directo, una tabla principal cuyas filas
// salen de fuentes oficiales consultadas durante la tarea, secciones
// breves, FAQ con FAQPage, un único bloque de oferta al final (precio
// leído de content/documents.js o content/packs.js, WhatsApp con texto
// específico y enlace a la landing) y una sección «Fuentes» con los
// enlaces oficiales y la fecha de consulta. Los datos viven en
// content/guias/*.js; la tabla se pinta como tabla en escritorio y como
// tarjetas (una por fila) en móvil para no romper el ancho de la página.
//
// JSON-LD: Article (author → Person de Elena, datePublished,
// dateModified) + BreadcrumbList + FAQPage. Metadatos con serviceMetadata
// (mismos campos: metaTitle, metaDescription, alternates, image).
import Image from "next/image";
import TrackedLink from "./TrackedLink";
import { SectionHeading } from "./ui";
import { Block } from "./ServicePage";
import { personRef, ORGANIZATION_ID } from "../../content/persona";

const BASE = "https://juradaexpress.es";

const UI = {
  es: {
    home: "Inicio",
    crumb: "Miga de pan",
    reviewed: "Guía revisada el",
    faq: "Preguntas frecuentes",
    sources: "Fuentes",
    sourcesIntro: "Fuentes oficiales consultadas para esta guía",
    consulted: "Consultadas el",
    related: "Páginas relacionadas",
    otherLang: "Read this guide in English:",
    tableAria: "Tabla principal de la guía",
    cardsAria: "Tabla principal de la guía, fila a fila",
    external: "(se abre en una pestaña nueva)",
  },
  en: {
    home: "Home",
    crumb: "Breadcrumb",
    reviewed: "Guide reviewed on",
    faq: "Frequently asked questions",
    sources: "Sources",
    sourcesIntro: "Official sources consulted for this guide",
    consulted: "Consulted on",
    related: "Related pages",
    otherLang: "Lee esta guía en español:",
    tableAria: "Main table of the guide",
    cardsAria: "Main table of the guide, row by row",
    external: "(opens in a new tab)",
  },
};

function formatDate(iso, locale) {
  const d = new Date(`${iso}T12:00:00Z`);
  return d.toLocaleDateString(locale === "en" ? "en-GB" : "es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function Chevron() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0 text-brand-navy transition-transform duration-[180ms] group-open:rotate-180"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

const CELL_CLASS =
  "[&_a]:text-brand-navy [&_a]:underline [&_a]:underline-offset-2 [&_strong]:font-semibold [&_strong]:text-slate-900";

// Tabla principal: <table> en pantallas medianas y grandes (con scroll
// horizontal si hace falta) y una tarjeta por fila en móvil, con la
// cabecera de cada columna como etiqueta.
function MainTable({ table, t }) {
  const { head, rows, caption } = table;
  return (
    <>
      <div className="hidden overflow-x-auto rounded-xl ring-1 ring-stone-200 md:block">
        <table className="w-full min-w-[900px] text-left text-sm" aria-label={t.tableAria}>
          {caption ? <caption className="sr-only">{caption}</caption> : null}
          <thead className="bg-stone-50 text-slate-600">
            <tr>
              {head.map((h) => (
                <th key={h} scope="col" className="p-3 align-bottom font-semibold">
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
                    <th
                      key={j}
                      scope="row"
                      className={`p-3 align-top font-semibold text-slate-900 ${CELL_CLASS}`}
                      dangerouslySetInnerHTML={{ __html: cell }}
                    />
                  ) : (
                    <td
                      key={j}
                      className={`p-3 align-top text-slate-700 ${CELL_CLASS}`}
                      dangerouslySetInnerHTML={{ __html: cell }}
                    />
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ul className="space-y-4 md:hidden" aria-label={t.cardsAria}>
        {rows.map((r, i) => (
          <li key={i} className="rounded-xl bg-white p-4 ring-1 ring-stone-200">
            <h3
              className={`font-semibold text-slate-900 ${CELL_CLASS}`}
              dangerouslySetInnerHTML={{ __html: r[0] }}
            />
            <dl className="mt-3 space-y-2 text-sm">
              {r.slice(1).map((cell, j) => (
                <div key={j}>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {head[j + 1]}
                  </dt>
                  <dd
                    className={`mt-0.5 text-slate-700 ${CELL_CLASS}`}
                    dangerouslySetInnerHTML={{ __html: cell }}
                  />
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>
    </>
  );
}

export default function GuidePage({ page }) {
  const t = UI[page.locale] || UI.es;
  const otherHref =
    page.locale === "en" ? page.alternates.es : page.alternates.en;
  const homeHref = page.locale === "en" ? "/en" : "/";

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 md:py-16">
      <nav aria-label={t.crumb} className="text-sm text-slate-500">
        <a href={homeHref} className="link-crumb">
          {t.home}
        </a>{" "}
        <span aria-hidden="true">/</span>{" "}
        <span className="text-slate-700">{page.crumb}</span>
      </nav>

      {/* Cabecera: pregunta en afirmativo, fecha de revisión y dos párrafos
          que la responden en directo */}
      <header className="mt-6 grid items-start gap-8 md:grid-cols-[1.25fr,0.75fr] md:gap-12">
        <div>
          <h1 className="font-display text-balance text-3xl font-semibold leading-tight tracking-[-0.02em] text-slate-900 md:text-4xl lg:text-[2.75rem]">
            {page.h1}
          </h1>
          <p className="mt-3 text-sm text-slate-500">
            {t.reviewed}{" "}
            <time dateTime={page.dateModified}>
              {formatDate(page.dateModified, page.locale)}
            </time>
          </p>
          <div className="mt-5 space-y-4">
            {page.lead.map((p, i) => (
              <p
                key={i}
                className={`max-w-[68ch] text-lg text-slate-700 ${CELL_CLASS}`}
                dangerouslySetInnerHTML={{ __html: p }}
              />
            ))}
          </div>
        </div>
        <figure className="relative aspect-[4/3] overflow-hidden rounded-xl shadow">
          <Image
            src={page.image.src}
            alt={page.image.alt}
            fill
            priority
            sizes="(min-width: 768px) 420px, 100vw"
            className="object-cover"
          />
        </figure>
      </header>

      <div className="mt-12 space-y-12 md:mt-16">
        {/* Tabla principal */}
        <section id={page.table.id || "tabla"}>
          <SectionHeading as="h2" className="!text-2xl md:!text-3xl">
            {page.table.title}
          </SectionHeading>
          {page.table.intro ? (
            <p
              className={`mt-4 max-w-[68ch] text-slate-600 ${CELL_CLASS}`}
              dangerouslySetInnerHTML={{ __html: page.table.intro }}
            />
          ) : null}
          <div className="mt-6">
            <MainTable table={page.table} t={t} />
          </div>
          {page.table.after ? (
            <p
              className={`mt-4 max-w-[68ch] text-sm text-slate-600 ${CELL_CLASS}`}
              dangerouslySetInnerHTML={{ __html: page.table.after }}
            />
          ) : null}
        </section>

        {/* Secciones breves */}
        {page.sections.map((s) => (
          <section key={s.id} id={s.id}>
            <SectionHeading as="h2" className="!text-2xl md:!text-3xl">
              {s.title}
            </SectionHeading>
            <div className="mt-4 space-y-4">
              {s.body.map((b, i) => (
                <Block key={i} block={b} page={page} />
              ))}
            </div>
          </section>
        ))}

        {/* FAQ */}
        <section aria-labelledby={`${page.id}-faq`}>
          <SectionHeading as="h2" id={`${page.id}-faq`} className="!text-2xl md:!text-3xl">
            {t.faq}
          </SectionHeading>
          <div className="mt-6 divide-y divide-stone-200 rounded-xl bg-white ring-1 ring-stone-200">
            {page.faq.map((f) => (
              <details key={f.q} className="group p-5">
                <summary className="flex cursor-pointer items-center justify-between gap-4 font-medium text-slate-900 [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <Chevron />
                </summary>
                <p className="mt-2 max-w-[68ch] text-sm text-slate-600">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Oferta: una sola vez, al cierre */}
        <section
          id={page.offer.id || "traduccion-jurada"}
          className="rounded-xl bg-stone-50 p-6 ring-1 ring-stone-200 md:p-8"
        >
          <SectionHeading as="h2" className="!text-2xl md:!text-3xl">
            {page.offer.title}
          </SectionHeading>
          {page.offer.body.map((p, i) => (
            <p
              key={i}
              className={`mt-3 max-w-[68ch] text-slate-600 ${CELL_CLASS}`}
              dangerouslySetInnerHTML={{ __html: p }}
            />
          ))}
          {page.offer.facts ? (
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-slate-800">
              {page.offer.facts.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          ) : null}
          <div className="mt-5 flex flex-wrap gap-3">
            <TrackedLink
              label={`${page.id}_whatsapp_${page.locale}`}
              href={page.offer.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              {page.offer.whatsappLabel}
            </TrackedLink>
            <a href={page.offer.landing.href} className="btn btn-secondary">
              {page.offer.landing.label}
            </a>
            {(page.offer.more || []).map((l) => (
              <a key={l.href} href={l.href} className="btn btn-ghost">
                {l.label}
              </a>
            ))}
          </div>
        </section>

        {/* Fuentes oficiales con fecha de consulta */}
        <section id="fuentes" aria-labelledby={`${page.id}-sources`}>
          <SectionHeading as="h2" id={`${page.id}-sources`} className="!text-2xl md:!text-3xl">
            {t.sources}
          </SectionHeading>
          <p className="mt-3 max-w-[68ch] text-sm text-slate-600">
            {t.sourcesIntro}. {t.consulted}{" "}
            <time dateTime={page.sources.date}>
              {formatDate(page.sources.date, page.locale)}
            </time>
            .
          </p>
          <ol className="mt-4 max-w-[80ch] list-decimal space-y-2 pl-5 text-sm text-slate-700">
            {page.sources.items.map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link"
                >
                  {s.label}
                </a>
                {s.note ? <span className="text-slate-500"> · {s.note}</span> : null}
                <span className="sr-only"> {t.external}</span>
              </li>
            ))}
          </ol>

          <h3 className="mt-8 text-base font-semibold text-slate-900">{t.related}</h3>
          <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {page.related.map((r) => (
              <li key={r.href}>
                <a href={r.href} className="link">
                  {r.label}
                </a>
              </li>
            ))}
          </ul>
          {otherHref ? (
            <p className="mt-6 text-sm text-slate-500">
              {t.otherLang}{" "}
              <a href={otherHref} className="link">
                {page.otherLangLabel}
              </a>
            </p>
          ) : null}
        </section>
      </div>

      {/* JSON-LD: Article + BreadcrumbList + FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Article",
                "@id": `${BASE}${page.path}#article`,
                headline: page.h1,
                description: page.metaDescription,
                inLanguage: page.locale,
                url: `${BASE}${page.path}`,
                mainEntityOfPage: `${BASE}${page.path}`,
                image: `${BASE}${page.image.src}`,
                datePublished: page.datePublished,
                dateModified: page.dateModified,
                author: personRef(page.locale),
                publisher: {
                  "@type": "ProfessionalService",
                  "@id": ORGANIZATION_ID,
                  name: "Jurada Express",
                  url: `${BASE}/`,
                },
                citation: page.sources.items.map((s) => s.href),
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: t.home,
                    item: `${BASE}${homeHref}`,
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: page.crumb,
                    item: `${BASE}${page.path}`,
                  },
                ],
              },
              {
                "@type": "FAQPage",
                mainEntity: page.faq.map((f) => ({
                  "@type": "Question",
                  name: f.q,
                  acceptedAnswer: { "@type": "Answer", text: f.a },
                })),
              },
            ],
          }),
        }}
      />
    </main>
  );
}
