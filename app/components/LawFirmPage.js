// app/components/LawFirmPage.js
//
// Plantilla de la landing para despachos de inmigración de EE. UU.
// (2026-10), solo en inglés: /en/for-immigration-law-firms. Los datos viven
// en content/law-firms.js (precios en USD calculados con toUsd, igual que
// las landings de content/us-docs.js).
//
// Estructura: miga de pan (Home / Certified translation for USCIS / página),
// hero (chip + H1 + CTA), cómo funciona (4 pasos), qué incluye, tabla de
// precios en dólares, facturación mensual, prueba gratuita, formulario de
// pedido (QuoteCalculator en modo despacho), FAQ (6) y CTA final. JSON-LD
// Service (areaServed US, priceCurrency USD, audience) + BreadcrumbList +
// FAQPage. hreflang solo EN (sin par ES).
import Image from "next/image";
import TrackedLink from "./TrackedLink";
import QuoteCalculator from "./QuoteCalculator";
import { SectionHeading } from "./ui";
import { Block, Chevron, PROSE } from "./UsDocPage";
import { MIN_PRICE_USD } from "../../content/us-docs";

const BASE = "https://juradaexpress.es";
const ORDER_HREF = "#order";

const T = {
  home: "Home",
  crumb: "Breadcrumb",
  faq: "Frequently asked questions",
  related: "Related pages",
};

export function lawFirmMetadata(page) {
  const url = `${BASE}${page.path}`;
  return {
    title: { absolute: page.metaTitle },
    description: page.metaDescription,
    // Solo inglés: canonical + hreflang en, sin par en español.
    alternates: {
      canonical: url,
      languages: { en: url },
    },
    openGraph: {
      title: `${page.metaTitle} | Jurada Express`,
      description: page.metaDescription,
      url,
      siteName: "Jurada Express",
      type: "website",
      locale: "en_US",
      images: [
        {
          url: `${BASE}${page.image.src}`,
          width: 1200,
          height: 900,
          alt: page.image.alt,
        },
      ],
    },
    // twitter:image con la misma foto que og:image (ver ServicePage).
    twitter: {
      card: "summary_large_image",
      title: `${page.metaTitle} | Jurada Express`,
      description: page.metaDescription,
      images: [`${BASE}${page.image.src}`],
    },
  };
}

const H2 = "!text-2xl md:!text-3xl";

export default function LawFirmPage({ page }) {
  const url = `${BASE}${page.path}`;

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 md:py-16">
      {/* Miga de pan */}
      <nav aria-label={T.crumb} className="text-sm text-slate-500">
        <a href="/en" className="link-crumb">
          {T.home}
        </a>{" "}
        <span aria-hidden="true">/</span>{" "}
        <a href={page.crumbParent.href} className="link-crumb">
          {page.crumbParent.label}
        </a>{" "}
        <span aria-hidden="true">/</span>{" "}
        <span className="text-slate-700">{page.crumb}</span>
      </nav>

      {/* Hero: chip + H1 (antetítulo con la búsqueda + frase) + CTA */}
      <header className="mt-6 grid items-start gap-8 md:grid-cols-[1.15fr,0.85fr] md:gap-12">
        <div>
          <p className="inline-flex rounded-full bg-brand-gold-50 px-3.5 py-1.5 text-sm font-medium text-brand-navy ring-1 ring-brand-gold-200">
            {page.chip}
          </p>
          <h1 className="mt-5">
            <span className="block text-sm font-medium uppercase tracking-wide text-slate-500">
              {page.eyebrow}
            </span>
            <span className="mt-3 block font-display text-balance text-3xl font-semibold leading-tight tracking-[-0.02em] text-slate-900 md:text-4xl lg:text-[2.75rem]">
              {page.hero}
            </span>
          </h1>
          <p className={`mt-5 max-w-[68ch] text-lg text-slate-700 ${PROSE}`}>{page.lead}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <TrackedLink
              label={`${page.id}_order_en`}
              href={ORDER_HREF}
              className="btn btn-primary"
            >
              {page.orderLabel}
            </TrackedLink>
            <TrackedLink
              label={`${page.id}_whatsapp_en`}
              href={page.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              {page.whatsappLabel}
            </TrackedLink>
          </div>
        </div>
        <figure className="relative aspect-[4/3] overflow-hidden rounded-xl shadow md:sticky md:top-24">
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

      <div className="mt-14 space-y-12 md:mt-16">
        {/* 1. Cómo funciona: 4 pasos */}
        <section aria-labelledby={`${page.id}-how`}>
          <SectionHeading as="h2" id={`${page.id}-how`} className={H2}>
            {page.how.title}
          </SectionHeading>
          <p className="mt-4 max-w-[68ch] text-slate-600">{page.how.intro}</p>
          <ol className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {page.how.steps.map((step, i) => (
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

        {/* 2. Qué incluye */}
        <section aria-labelledby={`${page.id}-included`}>
          <SectionHeading as="h2" id={`${page.id}-included`} className={H2}>
            {page.included.title}
          </SectionHeading>
          <p className="mt-4 max-w-[68ch] text-slate-600">{page.included.intro}</p>
          <ul className="mt-6 grid gap-6 md:grid-cols-3">
            {page.included.items.map((item) => (
              <li key={item.t} className="rounded-xl bg-white p-6 ring-1 ring-stone-200">
                <h3 className="font-semibold text-slate-900">{item.t}</h3>
                <p
                  className={`mt-2 text-sm text-slate-600 ${PROSE}`}
                  dangerouslySetInnerHTML={{ __html: item.d }}
                />
              </li>
            ))}
          </ul>
        </section>

        {/* 3. Precios fijos en dólares */}
        <section aria-labelledby={`${page.id}-prices`}>
          <SectionHeading as="h2" id={`${page.id}-prices`} className={H2}>
            {page.prices.title}
          </SectionHeading>
          <p className="mt-4 max-w-[68ch] text-slate-600">{page.prices.intro}</p>
          <div className="mt-6 max-w-3xl overflow-x-auto rounded-xl ring-1 ring-stone-200">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">{page.prices.caption}</caption>
              <thead className="bg-stone-50 text-slate-600">
                <tr>
                  {page.prices.head.map((h, i) => (
                    <th
                      key={h}
                      scope="col"
                      className={`p-3 font-semibold ${i ? "text-right" : ""}`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white">
                {page.prices.rows.map((r, i) => (
                  <tr key={r.label} className={i % 2 ? "bg-stone-50/50" : ""}>
                    <th scope="row" className={`p-3 align-top font-medium text-slate-900 ${PROSE}`}>
                      {r.href ? <a href={r.href}>{r.label}</a> : r.label}
                    </th>
                    <td className="p-3 text-right align-top tabular-nums text-slate-700">
                      {r.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 space-y-4">
            <Block block={page.prices.discount} />
            <p className="max-w-[68ch] text-xs text-slate-500">{page.prices.rateNote}</p>
          </div>
        </section>

        {/* 4. Facturación mensual */}
        <section aria-labelledby={`${page.id}-invoicing`}>
          <SectionHeading as="h2" id={`${page.id}-invoicing`} className={H2}>
            {page.invoicing.title}
          </SectionHeading>
          <div className="mt-4 space-y-4">
            {page.invoicing.body.map((b, i) => (
              <Block key={i} block={b} />
            ))}
          </div>
        </section>

        {/* 5. Prueba gratuita */}
        <section
          aria-labelledby={`${page.id}-trial`}
          className="rounded-xl bg-brand-gold-50 p-6 ring-1 ring-brand-gold-200 md:p-8"
        >
          <SectionHeading as="h2" id={`${page.id}-trial`} className={H2}>
            {page.trial.title}
          </SectionHeading>
          <p className="mt-3 max-w-[68ch] text-slate-700">{page.trial.text}</p>
          <TrackedLink
            label={`${page.id}_trial_order_en`}
            href={ORDER_HREF}
            className="btn btn-primary mt-5"
          >
            {page.orderLabel}
          </TrackedLink>
        </section>

        {/* Formulario de pedido: calculadora en modo despacho */}
        <QuoteCalculator locale="en" firmMode className="!px-0 !py-0" />

        {/* 6. FAQ */}
        <section aria-labelledby={`${page.id}-faq`}>
          <SectionHeading as="h2" id={`${page.id}-faq`} className={H2}>
            {T.faq}
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

        {/* 7. CTA final + enlaces relacionados */}
        <section className="rounded-xl bg-stone-50 p-6 ring-1 ring-stone-200 md:p-8">
          <SectionHeading as="h2" className={H2}>
            {page.cta.title}
          </SectionHeading>
          <p className="mt-3 max-w-[68ch] text-slate-600">{page.cta.text}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <TrackedLink
              label={`${page.id}_cta_order_en`}
              href={ORDER_HREF}
              className="btn btn-primary"
            >
              {page.orderLabel}
            </TrackedLink>
            <TrackedLink
              label={`${page.id}_cta_whatsapp_en`}
              href={page.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              {page.whatsappLabel}
            </TrackedLink>
          </div>

          <h3 className="mt-8 text-base font-semibold text-slate-900">{T.related}</h3>
          <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {page.related.map((r) => (
              <li key={r.href}>
                <a href={r.href} className="link">
                  {r.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* JSON-LD: Service (US, USD, abogados de inmigración) + BreadcrumbList + FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Service",
                "@id": `${url}#service`,
                name: page.metaTitle,
                serviceType: "Certified translation (USCIS)",
                description: page.metaDescription,
                url,
                inLanguage: "en",
                provider: {
                  "@type": "ProfessionalService",
                  "@id": `${BASE}/#organization`,
                  name: "Jurada Express",
                  url: `${BASE}/`,
                },
                areaServed: { "@type": "Country", name: "US" },
                audience: { "@type": "Audience", audienceType: "Immigration attorneys" },
                availableLanguage: ["en", "es"],
                offers: {
                  "@type": "Offer",
                  priceCurrency: "USD",
                  priceSpecification: {
                    "@type": "PriceSpecification",
                    minPrice: MIN_PRICE_USD,
                    priceCurrency: "USD",
                  },
                  availability: "https://schema.org/InStock",
                  url,
                },
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: T.home, item: `${BASE}/en` },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: page.crumbParent.label,
                    item: `${BASE}${page.crumbParent.href}`,
                  },
                  { "@type": "ListItem", position: 3, name: page.crumb, item: url },
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
