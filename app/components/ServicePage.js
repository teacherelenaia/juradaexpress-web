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
import Image from "next/image";
import TrackedLink from "./TrackedLink";
import { SectionHeading } from "./ui";
import { SERVICE_COUNTRIES } from "../../content/site";

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
  },
};

export function serviceMetadata(page) {
  const es = page.alternates.es;
  const en = page.alternates.en;
  return {
    // Title ≤ 60 caracteres sin sufijo de marca (la marca ya va en OG y
    // JSON-LD); description ≤ 155.
    title: { absolute: page.metaTitle },
    description: page.metaDescription,
    alternates: {
      canonical: `${BASE}${page.path}`,
      languages: {
        es: `${BASE}${es}`,
        en: `${BASE}${en}`,
        "x-default": `${BASE}${es}`,
      },
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
function Block({ block }) {
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
    const { head, rows, caption } = block.table;
    return (
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
        <div>
          <h1 className="font-display text-balance text-3xl font-semibold leading-tight tracking-[-0.02em] text-slate-900 md:text-4xl lg:text-[2.75rem]">
            {page.h1}
          </h1>
          <p
            className="mt-5 max-w-[68ch] text-lg text-slate-700 [&_a]:text-brand-navy [&_a]:underline [&_a]:underline-offset-2 [&_strong]:font-semibold [&_strong]:text-slate-900"
            dangerouslySetInnerHTML={{ __html: page.lead }}
          />
          <div className="mt-7 flex flex-wrap gap-3">
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
              href={t.quoteHref}
              className="btn btn-secondary"
            >
              {t.quote}
            </TrackedLink>
          </div>
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

      {/* Bloques de contenido */}
      <div className="mt-14 space-y-12 md:mt-16">
        {page.sections.map((s) => (
          <section key={s.title} id={s.id}>
            <SectionHeading as="h2" className="!text-2xl md:!text-3xl">
              {s.title}
            </SectionHeading>
            <div className="mt-4 space-y-4">
              {s.body.map((b, i) => (
                <Block key={i} block={b} />
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
              href={t.quoteHref}
              className="btn btn-secondary"
            >
              {t.quote}
            </TrackedLink>
            <a href={t.pricesHref} className="btn btn-ghost">
              {t.prices}
            </a>
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

          <p className="mt-6 text-sm text-slate-500">
            {t.otherLang}{" "}
            <a href={otherHref} className="link">
              {page.otherLangLabel}
            </a>
          </p>
        </section>
      </div>

      {/* JSON-LD: Service + BreadcrumbList + FAQPage */}
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
                provider: {
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
                  availability: "https://schema.org/InStock",
                  url: `${BASE}${page.path}`,
                },
              },
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
            ],
          }),
        }}
      />
    </main>
  );
}
