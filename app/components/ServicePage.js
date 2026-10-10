// app/components/ServicePage.js
//
// Plantilla de las páginas de audiencia/servicio del encargo internacional
// (nómada digital, USCIS, Estados Unidos, India, urgentes/grandes
// volúmenes). No son fichas de documento: 700-1.100 palabras, H1 único,
// primer párrafo que responde por sí solo a la pregunta de la página
// (fragmento citable por los motores de respuesta), bloques de contenido
// con H2, tabla de documentos, "Cómo lo hacemos" en 4 pasos (estático: el
// único momento animado del sitio sigue siendo la línea de la home), FAQ
// propia con JSON-LD FAQPage, schema Service + BreadcrumbList y CTA de
// WhatsApp con texto prellenado específico. Los datos viven en
// content/servicios/*.js.
//
// Landings de campaña (08/10/2026, página de visados): campos opcionales
// `trust` (franja de confianza bajo el H1, sin iconos), `primaryCta` (un
// solo botón principal en la cabecera y en el CTA final, con WhatsApp como
// secundario) y el bloque `{ packs: [ids] }` (tarjetas de content/packs.js
// con un Offer por pack en el JSON-LD). En móvil la franja y el botón van
// antes del párrafo de entrada para que se vean sin hacer scroll.
// `quoteCta` (10/10/2026, landings del FBI y ACRO): sustituye el botón
// secundario "Pedir presupuesto" (catálogo) por otro enlace, por ejemplo la
// calculadora de la home, cuando WhatsApp es el botón principal.
//
// Datos extraíbles por los motores de respuesta (10/10/2026, página del
// traductor de inglés): bloques opcionales `{ table: { title } }` (título
// visible sobre la tabla), `{ columns: [{ title, list }] }` (dos listas
// cortas lado a lado, «incluye / no incluye») y `{ dl: [[término,
// definición]] }` (ficha en texto plano, por ejemplo los datos de la
// traductora); `steps[].time` (segunda línea con el plazo de cada paso);
// `reviews` (nota y número de reseñas con enlace a Maps, bajo las
// garantías); y en el JSON-LD, `providerPerson` (el provider del Service
// es la Person de Elena con su credencial, no la organización),
// `offerCatalog` (un Offer por fila de precios, con UnitPriceSpecification
// cuando el precio es por página) y `howTo` (HowTo con los 4 pasos).
import Image from "next/image";
import TrackedLink from "./TrackedLink";
import Guarantees from "./Guarantees";
import QuoteCalculator from "./QuoteCalculator";
import { PackGrid } from "./PacksSection";
import { SectionHeading } from "./ui";
import { SERVICE_COUNTRIES } from "../../content/site";
import { packOffers } from "../../content/packs";
import { personProviderRef } from "../../content/persona";

const BASE = "https://juradaexpress.es";

const UI = {
  es: {
    home: "Inicio",
    crumb: "Miga de pan",
    quote: "Pedir presupuesto",
    quoteHref: "/documentos",
    whatsapp: "WhatsApp",
    how: "Cómo lo hacemos",
    faq: "Preguntas frecuentes",
    related: "Páginas relacionadas",
    otherLang: "Read this page in English:",
    prices: "Ver precios",
    pricesHref: "/precios",
    docs: "Catálogo de documentos",
    docsHref: "/documentos",
    trustAria: "Datos de confianza",
  },
  en: {
    home: "Home",
    crumb: "Breadcrumb",
    quote: "Request a quote",
    quoteHref: "/en/documentos",
    whatsapp: "WhatsApp",
    how: "How I work",
    faq: "Frequently asked questions",
    related: "Related pages",
    otherLang: "Lee esta página en español:",
    prices: "See pricing",
    pricesHref: "/en/precios",
    docs: "Document catalogue",
    docsHref: "/en/documentos",
    trustAria: "Trust facts",
  },
};

export function serviceMetadata(page) {
  const es = page.alternates.es;
  const en = page.alternates.en;
  return {
    // Title ≤ 60 caracteres sin sufijo de marca (la marca ya va en OG y
    // JSON-LD); description ≤ 155. Las páginas solo en español (landings
    // de ciudad) no llevan hreflang: sin `en` solo se emite el canonical.
    title: { absolute: page.metaTitle },
    description: page.metaDescription,
    alternates: {
      canonical: `${BASE}${page.path}`,
      ...(en
        ? {
            languages: {
              es: `${BASE}${es}`,
              en: `${BASE}${en}`,
              "x-default": `${BASE}${es}`,
            },
          }
        : {}),
    },
    openGraph: {
      title: `${page.metaTitle} | Jurada Express`,
      description: page.metaDescription,
      url: `${BASE}${page.path}`,
      siteName: "Jurada Express",
      type: "website",
      locale: page.locale === "en" ? "en_GB" : "es_ES",
      images: [
        {
          url: `${BASE}${page.image.src}`,
          width: 1200,
          height: 900,
          alt: page.image.alt,
        },
      ],
    },
  };
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

// Bloques de contenido: cadena (párrafo con HTML inline permitido), lista,
// tabla o nota destacada.
export function Block({ block, page }) {
  if (typeof block === "string") {
    return (
      <p
        className="max-w-[68ch] text-slate-600 [&_a]:text-brand-navy [&_a]:underline [&_a]:underline-offset-2 [&_strong]:font-semibold [&_strong]:text-slate-900"
        dangerouslySetInnerHTML={{ __html: block }}
      />
    );
  }
  if (block.list) {
    return (
      <ul className="max-w-[68ch] space-y-2 text-slate-700">
        {block.list.map((item, i) => (
          <li key={i} className="flex gap-3">
            <span
              className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-gold-500"
              aria-hidden="true"
            />
            <span
              className="[&_a]:text-brand-navy [&_a]:underline [&_a]:underline-offset-2 [&_strong]:font-semibold [&_strong]:text-slate-900"
              dangerouslySetInnerHTML={{ __html: item }}
            />
          </li>
        ))}
      </ul>
    );
  }
  if (block.table) {
    const { head, rows, caption, title } = block.table;
    return (
      <div>
        {title ? (
          <h3 className="mb-3 font-semibold text-slate-900">{title}</h3>
        ) : null}
      <div className="overflow-x-auto rounded-xl ring-1 ring-stone-200">
        <table className="w-full min-w-[640px] text-left text-sm">
          {caption ? <caption className="sr-only">{caption}</caption> : null}
          <thead className="bg-stone-50 text-slate-600">
            <tr>
              {head.map((h) => (
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
                    <th
                      key={j}
                      scope="row"
                      className="p-3 align-top font-medium text-slate-900 [&_a]:text-brand-navy [&_a]:underline [&_a]:underline-offset-2"
                      dangerouslySetInnerHTML={{ __html: cell }}
                    />
                  ) : (
                    <td
                      key={j}
                      className="p-3 align-top text-slate-700"
                      dangerouslySetInnerHTML={{ __html: cell }}
                    />
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    );
  }
  if (block.columns) {
    // Dos (o más) listas cortas lado a lado, cada una con su título:
    // «Qué incluye el precio / Qué no incluye».
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        {block.columns.map((col) => (
          <div
            key={col.title}
            className="rounded-xl bg-white p-5 ring-1 ring-stone-200"
          >
            <h3 className="font-semibold text-slate-900">{col.title}</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              {col.list.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span
                    className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-gold-500"
                    aria-hidden="true"
                  />
                  <span
                    className="[&_a]:text-brand-navy [&_a]:underline [&_a]:underline-offset-2 [&_strong]:font-semibold [&_strong]:text-slate-900"
                    dangerouslySetInnerHTML={{ __html: item }}
                  />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }
  if (block.dl) {
    // Ficha en texto plano (término / definición), por ejemplo los datos de
    // la traductora: nombre, nombramiento, combinación, horario, contacto.
    return (
      <dl className="grid max-w-[68ch] gap-x-6 gap-y-2 rounded-xl bg-white p-5 text-sm ring-1 ring-stone-200 sm:grid-cols-[max-content,1fr]">
        {block.dl.map(([term, def]) => (
          <div key={term} className="contents">
            <dt className="font-semibold text-slate-900">{term}</dt>
            <dd
              className="text-slate-700 [&_a]:text-brand-navy [&_a]:underline [&_a]:underline-offset-2"
              dangerouslySetInnerHTML={{ __html: def }}
            />
          </div>
        ))}
      </dl>
    );
  }
  if (block.packs) {
    return (
      <PackGrid
        ids={block.packs}
        locale={page.locale}
        orderHref={page.primaryCta ? page.primaryCta.href : undefined}
        className="mt-6"
      />
    );
  }
  if (block.note) {
    return (
      <aside
        className="max-w-[68ch] rounded-xl bg-brand-gold-50 p-4 text-sm text-slate-700 ring-1 ring-brand-gold-200 [&_a]:text-brand-navy [&_a]:underline [&_a]:underline-offset-2 [&_strong]:font-semibold [&_strong]:text-slate-900"
        dangerouslySetInnerHTML={{ __html: block.note }}
      />
    );
  }
  return null;
}

export default function ServicePage({ page }) {
  const t = UI[page.locale] || UI.es;
  const otherHref =
    page.locale === "en" ? page.alternates.es : page.alternates.en;
  // Botón secundario junto a WhatsApp: el catálogo por defecto o el enlace
  // que indique la página (`quoteCta`, por ejemplo la calculadora).
  const quoteCta = page.quoteCta || { label: t.quote, href: t.quoteHref };
  // Packs mostrados en la página (bloque { packs: [ids] }) → un Offer por
  // pack en el JSON-LD, anclado a esta URL.
  const packIds = page.sections
    .flatMap((s) => s.body)
    .filter((b) => b && b.packs)
    .flatMap((b) => b.packs);
  const packOfferNodes = packIds.length
    ? packOffers(page.locale, { ids: packIds, base: `${BASE}${page.path}` })
    : [];

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 md:py-16">
      {/* Miga de pan */}
      <nav aria-label={t.crumb} className="text-sm text-slate-500">
        <a href={page.locale === "en" ? "/en" : "/"} className="link-crumb">
          {t.home}
        </a>{" "}
        <span aria-hidden="true">/</span>{" "}
        <span className="text-slate-700">{page.crumb}</span>
      </nav>

      {/* Cabecera: H1 + párrafo citable + CTA, imagen a la derecha */}
      <header className="mt-6 grid items-center gap-8 md:grid-cols-[1.15fr,0.85fr] md:gap-12">
        <div className="flex flex-col">
          <h1 className="order-1 font-display text-balance text-3xl font-semibold leading-tight tracking-[-0.02em] text-slate-900 md:text-4xl lg:text-[2.75rem]">
            {page.h1}
          </h1>
          {/* Franja de confianza (landings): hechos en una fila, sin iconos */}
          {page.trust ? (
            <ul
              aria-label={t.trustAria}
              className="order-2 mt-4 flex flex-col gap-y-1 text-sm font-medium leading-snug text-slate-700 sm:flex-row sm:flex-wrap sm:gap-x-2"
            >
              {page.trust.map((f, i) => (
                <li key={f.text} className="flex items-center gap-2">
                  {f.href ? (
                    <a
                      href={f.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={f.label}
                      className="link-nav inline-block py-1 text-slate-700 sm:py-0"
                    >
                      {f.text}
                    </a>
                  ) : (
                    <span className="inline-block py-1 sm:py-0">{f.text}</span>
                  )}
                  {i < page.trust.length - 1 ? (
                    <span className="hidden text-stone-400 sm:inline" aria-hidden="true">
                      ·
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>
          ) : null}
          <p
            className={`${page.trust ? "order-4 mt-6 md:order-3 md:mt-5" : "order-3 mt-5"} max-w-[68ch] text-lg text-slate-700 [&_a]:text-brand-navy [&_a]:underline [&_a]:underline-offset-2 [&_strong]:font-semibold [&_strong]:text-slate-900`}
            dangerouslySetInnerHTML={{ __html: page.lead }}
          />
          <div
            className={`${page.trust ? "order-3 mt-5 md:order-4 md:mt-7" : "order-4 mt-7"} flex flex-wrap gap-3`}
          >
            {page.primaryCta ? (
              <TrackedLink
                label={`${page.id}_primary_${page.locale}`}
                href={page.primaryCta.href}
                className="btn btn-primary"
              >
                {page.primaryCta.label}
              </TrackedLink>
            ) : (
              <>
                <TrackedLink
                  label={`${page.id}_whatsapp_${page.locale}`}
                  href={page.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  {page.whatsappLabel || t.whatsapp}
                </TrackedLink>
                <TrackedLink
                  label={`${page.id}_quote_${page.locale}`}
                  href={quoteCta.href}
                  className="btn btn-secondary"
                >
                  {quoteCta.label}
                </TrackedLink>
              </>
            )}
          </div>
          {/* Garantías (content/site.js → GUARANTEES), solo si la página las pide */}
          {page.guarantees ? (
            <Guarantees locale={page.locale} className="order-5 mt-6" />
          ) : null}
          {/* Nota y número de reseñas con enlace a la ficha de Google Maps */}
          {page.reviews ? (
            <p className="order-6 mt-3 text-sm font-medium text-slate-700">
              <a
                href={page.reviews.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={page.reviews.label}
                className="link-nav text-slate-700"
              >
                {page.reviews.text}
              </a>
            </p>
          ) : null}
        </div>
        <figure className="relative aspect-[4/3] overflow-hidden rounded-xl shadow">
          <Image
            src={page.image.src}
            alt={page.image.alt}
            fill
            priority
            sizes="(min-width: 768px) 480px, 100vw"
            className="object-cover"
          />
        </figure>
      </header>

      {/* Calculadora de precio + subida de documento, solo si la página la pide */}
      {page.quoteCalculator ? (
        <QuoteCalculator locale={page.locale} className="!px-0 !pb-0" />
      ) : null}

      {/* Bloques de contenido */}
      <div className="mt-14 space-y-12 md:mt-16">
        {page.sections.map((s) => (
          <section key={s.title} id={s.id}>
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

        {/* Cómo lo hacemos: 4 pasos estáticos */}
        <section aria-labelledby={`${page.id}-how`}>
          <SectionHeading
            as="h2"
            id={`${page.id}-how`}
            className="!text-2xl md:!text-3xl"
          >
            {page.howTitle || t.how}
          </SectionHeading>
          <ol className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {page.steps.map((step, i) => (
              <li key={step.t} className="flex gap-4 lg:block">
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-brand-navy-200 font-display text-base font-semibold text-brand-navy lg:mb-3"
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-semibold text-slate-900">{step.t}</h3>
                  <p className="mt-1 text-sm text-slate-600">{step.d}</p>
                  {step.time ? (
                    <p className="mt-2 text-sm font-medium text-brand-navy">
                      {step.time}
                    </p>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* FAQ */}
        <section aria-labelledby={`${page.id}-faq`}>
          <SectionHeading
            as="h2"
            id={`${page.id}-faq`}
            className="!text-2xl md:!text-3xl"
          >
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

        {/* CTA final + enlaces relacionados */}
        <section className="rounded-xl bg-stone-50 p-6 ring-1 ring-stone-200 md:p-8">
          <SectionHeading as="h2" className="!text-2xl md:!text-3xl">
            {page.cta.title}
          </SectionHeading>
          <p className="mt-3 max-w-[68ch] text-slate-600">{page.cta.text}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            {page.primaryCta ? (
              <>
                <TrackedLink
                  label={`${page.id}_cta_primary_${page.locale}`}
                  href={page.primaryCta.href}
                  className="btn btn-primary"
                >
                  {page.cta.primaryLabel || page.primaryCta.label}
                </TrackedLink>
                <TrackedLink
                  label={`${page.id}_cta_whatsapp_${page.locale}`}
                  href={page.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  {page.whatsappLabel || t.whatsapp}
                </TrackedLink>
              </>
            ) : (
              <>
                <TrackedLink
                  label={`${page.id}_cta_whatsapp_${page.locale}`}
                  href={page.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  {page.whatsappLabel || t.whatsapp}
                </TrackedLink>
                <TrackedLink
                  label={`${page.id}_cta_quote_${page.locale}`}
                  href={quoteCta.href}
                  className="btn btn-secondary"
                >
                  {quoteCta.label}
                </TrackedLink>
                <a href={t.pricesHref} className="btn btn-ghost">
                  {t.prices}
                </a>
              </>
            )}
          </div>

          <h3 className="mt-8 text-base font-semibold text-slate-900">
            {t.related}
          </h3>
          <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {page.related.map((r) => (
              <li key={r.href}>
                <a href={r.href} className="link">
                  {r.label}
                </a>
              </li>
            ))}
            <li>
              <a href={t.docsHref} className="link">
                {t.docs}
              </a>
            </li>
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

      {/* JSON-LD: Service + BreadcrumbList + FAQPage (+ un Offer por pack) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Service",
                "@id": `${BASE}${page.path}#service`,
                name: page.serviceName,
                serviceType: page.serviceType,
                description: page.metaDescription,
                url: `${BASE}${page.path}`,
                inLanguage: page.locale,
                // Por defecto el proveedor es la organización; con
                // `providerPerson` es la Person de Elena con su credencial
                // (nº MAEC y enlace al buscador STIJ), que los motores de
                // respuesta citan mejor que una marca.
                provider: page.providerPerson
                  ? personProviderRef(page.locale)
                  : {
                      "@type": "ProfessionalService",
                      "@id": `${BASE}/#organization`,
                      name: "Jurada Express",
                      url: `${BASE}/`,
                    },
                areaServed: page.areaServed || [
                  ...SERVICE_COUNTRIES.filter((c) => c.code).map((c) => ({
                    "@type": "Country",
                    name: c.code,
                  })),
                  "Worldwide",
                ],
                availableLanguage: ["es", "en"],
                offers: {
                  "@type": "Offer",
                  priceCurrency: "EUR",
                  ...(page.price != null ? { price: page.price } : {}),
                  // "desde X €": precio mínimo real del catálogo, no un
                  // precio fijo (content/documents.js → MIN_PRICE).
                  ...(page.priceFrom != null
                    ? {
                        priceSpecification: {
                          "@type": "PriceSpecification",
                          minPrice: page.priceFrom,
                          priceCurrency: "EUR",
                        },
                      }
                    : {}),
                  availability: "https://schema.org/InStock",
                  url: `${BASE}${page.path}`,
                },
                // Catálogo de precios: un Offer por fila de la tabla de
                // documentos y otro por página para los documentos largos
                // (UnitPriceSpecification). Los precios llegan ya leídos de
                // content/documents.js y content/site.js, nunca a mano.
                ...(page.offerCatalog
                  ? {
                      hasOfferCatalog: {
                        "@type": "OfferCatalog",
                        name: page.offerCatalog.name,
                        itemListElement: page.offerCatalog.offers.map((o) => ({
                          "@type": "Offer",
                          name: o.name,
                          ...(o.description ? { description: o.description } : {}),
                          price: o.price,
                          priceCurrency: "EUR",
                          availability: "https://schema.org/InStock",
                          url: `${BASE}${page.path}`,
                          ...(o.unitText
                            ? {
                                priceSpecification: {
                                  "@type": "UnitPriceSpecification",
                                  price: o.price,
                                  priceCurrency: "EUR",
                                  unitText: o.unitText,
                                  valueAddedTaxIncluded: true,
                                },
                              }
                            : {
                                priceSpecification: {
                                  "@type": "PriceSpecification",
                                  price: o.price,
                                  priceCurrency: "EUR",
                                  valueAddedTaxIncluded: true,
                                },
                              }),
                        })),
                      },
                    }
                  : {}),
              },
              // HowTo con los 4 pasos (opcional): nombre, texto y plazo total.
              ...(page.howTo
                ? [
                    {
                      "@type": "HowTo",
                      name: page.howTo.name || page.howTitle || t.how,
                      totalTime: page.howTo.totalTime || "PT24H",
                      step: page.steps.map((s, i) => ({
                        "@type": "HowToStep",
                        position: i + 1,
                        name: s.t,
                        text: s.time ? `${s.d} ${s.time}` : s.d,
                      })),
                    },
                  ]
                : []),
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: t.home,
                    item: page.locale === "en" ? `${BASE}/en` : `${BASE}/`,
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
              ...packOfferNodes,
            ],
          }),
        }}
      />
    </main>
  );
}
