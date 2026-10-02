// app/components/UsDocPage.js
//
// Plantilla de las landings de documento para el mercado de EE. UU.
// (2026-10), solo en inglés: /en/certified-translation-*-uscis y
// /en/certified-translation-spanish-degree-evaluation-wes. Los datos viven
// en content/us-docs.js (un objeto por documento; precios en USD calculados
// desde content/documents.js con USD_RATE y redondeo a 5 $).
//
// Estructura: miga de pan (Home / Certified translation for USCIS / doc),
// H1 + párrafo citable + tarjeta de precio en dólares (plazo, entrega,
// pago) + CTA WhatsApp y calculadora, secciones de contenido (H2), tabla
// «What USCIS requires vs. what you get», pasos, dos reseñas reales de
// content/reviews.js, FAQ (6) con JSON-LD FAQPage, CTA final y enlaces
// relacionados. JSON-LD Service (areaServed US, priceCurrency USD) +
// BreadcrumbList + FAQPage. hreflang solo EN (sin par ES).
import Image from "next/image";
import TrackedLink from "./TrackedLink";
import Guarantees from "./Guarantees";
import { SectionHeading } from "./ui";
import { US_SHIPPING_USD, MIN_PRICE_USD, RATE_NOTE } from "../../content/us-docs";
import { GOOGLE_BUSINESS_URL, GOOGLE_RATING, GOOGLE_REVIEW_COUNT } from "../../content/site";

const BASE = "https://juradaexpress.es";

const T = {
  home: "Home",
  crumb: "Breadcrumb",
  whatsapp: "WhatsApp",
  calculator: "Get an instant quote",
  how: "How I work",
  faq: "Frequently asked questions",
  related: "Other Spanish documents for USCIS",
  table: "What USCIS requires vs. what you get",
  reviews: "What clients say",
  reviewsIntro: "Published on Google by real clients, reproduced as written.",
  priceCard: "Price in US dollars",
  from: "From",
  quote: "Fixed quote in 2 hours",
  turnaround: "Turnaround",
  turnaroundValue: "Same day (up to 10 pages)",
  delivery: "Delivery",
  deliveryValue: (usd) => `Signed PDF · paper copy to the US for $${usd}`,
  payment: "Payment",
  paymentValue: "In USD, by card or Wise",
  pricesHref: "/en/precios",
  prices: "See all prices",
  uscisGuide: "Read the general USCIS guide",
};

export function usDocMetadata(doc) {
  const url = `${BASE}${doc.path}`;
  return {
    title: { absolute: doc.metaTitle },
    description: doc.metaDescription,
    // Solo inglés: canonical + hreflang en, sin par en español.
    alternates: {
      canonical: url,
      languages: { en: url },
    },
    openGraph: {
      title: `${doc.metaTitle} | Jurada Express`,
      description: doc.metaDescription,
      url,
      siteName: "Jurada Express",
      type: "website",
      locale: "en_US",
      images: [
        {
          url: `${BASE}${doc.image.src}`,
          width: 1200,
          height: 900,
          alt: doc.image.alt,
        },
      ],
    },
  };
}

const PROSE =
  "[&_a]:text-brand-navy [&_a]:underline [&_a]:underline-offset-2 [&_strong]:font-semibold [&_strong]:text-slate-900 [&_em]:not-italic [&_em]:text-slate-800";

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

function Stars({ rating, label, size = 16 }) {
  return (
    <span className="inline-flex gap-0.5 text-brand-gold-700" role="img" aria-label={label}>
      {Array.from({ length: rating }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279L12 19.771l-7.416 3.642 1.48-8.279L0 9.306l8.332-1.151z" />
        </svg>
      ))}
    </span>
  );
}

// Bloques de contenido: párrafo (HTML inline permitido) o lista.
function Block({ block }) {
  if (typeof block === "string") {
    return (
      <p
        className={`max-w-[68ch] text-slate-600 ${PROSE}`}
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
            <span className={PROSE} dangerouslySetInnerHTML={{ __html: item }} />
          </li>
        ))}
      </ul>
    );
  }
  return null;
}

function PriceCard({ doc }) {
  const hasPrice = doc.priceUsd != null;
  return (
    <div className="mt-7 rounded-xl bg-stone-50 p-5 ring-1 ring-stone-200">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{T.priceCard}</p>
      <p className="mt-1 font-display text-3xl font-semibold tracking-[-0.02em] text-slate-900">
        {hasPrice ? (
          <>
            ${doc.priceUsd}
            <span className="ml-2 text-base font-normal text-slate-600">per {doc.unit}</span>
          </>
        ) : (
          <>
            {T.quote}
            <span className="ml-2 block text-base font-normal text-slate-600 sm:inline">
              {T.from} ${MIN_PRICE_USD} for single-page certificates
            </span>
          </>
        )}
      </p>
      <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
        <div>
          <dt className="text-slate-500">{T.turnaround}</dt>
          <dd className="font-medium text-slate-900">{T.turnaroundValue}</dd>
        </div>
        <div>
          <dt className="text-slate-500">{T.delivery}</dt>
          <dd className="font-medium text-slate-900">{T.deliveryValue(US_SHIPPING_USD)}</dd>
        </div>
        <div>
          <dt className="text-slate-500">{T.payment}</dt>
          <dd className="font-medium text-slate-900">{T.paymentValue}</dd>
        </div>
      </dl>
      <p className="mt-3 text-xs text-slate-500">{RATE_NOTE}</p>
    </div>
  );
}

export default function UsDocPage({ doc }) {
  const url = `${BASE}${doc.path}`;
  const showRating = GOOGLE_RATING > 0 && GOOGLE_REVIEW_COUNT > 0;

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 md:py-16">
      {/* Miga de pan */}
      <nav aria-label={T.crumb} className="text-sm text-slate-500">
        <a href="/en" className="link-crumb">
          {T.home}
        </a>{" "}
        <span aria-hidden="true">/</span>{" "}
        <a href={doc.crumbParent.href} className="link-crumb">
          {doc.crumbParent.label}
        </a>{" "}
        <span aria-hidden="true">/</span>{" "}
        <span className="text-slate-700">{doc.short}</span>
      </nav>

      {/* Cabecera: H1 + párrafo citable + precio + CTA, imagen a la derecha */}
      <header className="mt-6 grid items-start gap-8 md:grid-cols-[1.15fr,0.85fr] md:gap-12">
        <div>
          <h1 className="font-display text-balance text-3xl font-semibold leading-tight tracking-[-0.02em] text-slate-900 md:text-4xl lg:text-[2.75rem]">
            {doc.h1}
          </h1>
          <p
            className={`mt-5 max-w-[68ch] text-lg text-slate-700 ${PROSE}`}
            dangerouslySetInnerHTML={{ __html: doc.lead }}
          />
          <PriceCard doc={doc} />
          <div className="mt-6 flex flex-wrap gap-3">
            <TrackedLink
              label={`${doc.id}_whatsapp_en`}
              href={doc.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              {doc.whatsappLabel || T.whatsapp}
            </TrackedLink>
            <TrackedLink
              label={`${doc.id}_calculator_en`}
              href={doc.calculatorHref}
              className="btn btn-secondary"
            >
              {T.calculator}
            </TrackedLink>
          </div>
          <Guarantees locale="en" className="mt-6" />
        </div>
        <figure className="relative aspect-[4/3] overflow-hidden rounded-xl shadow md:sticky md:top-24">
          <Image
            src={doc.image.src}
            alt={doc.image.alt}
            fill
            priority
            sizes="(min-width: 768px) 480px, 100vw"
            className="object-cover"
          />
        </figure>
      </header>

      <div className="mt-14 space-y-12 md:mt-16">
        {/* Secciones de contenido */}
        {doc.sections.map((s) => (
          <section key={s.id} id={s.id}>
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

        {/* Tabla: What USCIS requires vs. what you get */}
        <section aria-labelledby={`${doc.id}-table`}>
          <SectionHeading as="h2" id={`${doc.id}-table`} className="!text-2xl md:!text-3xl">
            {T.table}
          </SectionHeading>
          <div className="mt-6 overflow-x-auto rounded-xl ring-1 ring-stone-200">
            <table className="w-full min-w-[560px] text-left text-sm">
              <caption className="sr-only">{doc.table.caption}</caption>
              <thead className="bg-stone-50 text-slate-600">
                <tr>
                  {doc.table.head.map((h) => (
                    <th key={h} scope="col" className="p-3 font-semibold">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white">
                {doc.table.rows.map((r, i) => (
                  <tr key={i} className={i % 2 ? "bg-stone-50/50" : ""}>
                    <th
                      scope="row"
                      className={`p-3 align-top font-medium text-slate-900 ${PROSE}`}
                      dangerouslySetInnerHTML={{ __html: r[0] }}
                    />
                    <td
                      className={`p-3 align-top text-slate-700 ${PROSE}`}
                      dangerouslySetInnerHTML={{ __html: r[1] }}
                    />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Cómo lo hago: 4 pasos */}
        <section aria-labelledby={`${doc.id}-how`}>
          <SectionHeading as="h2" id={`${doc.id}-how`} className="!text-2xl md:!text-3xl">
            {T.how}
          </SectionHeading>
          <ol className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {doc.steps.map((step, i) => (
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

        {/* Reseñas reales (content/reviews.js) */}
        {doc.reviews.length > 0 ? (
          <section aria-labelledby={`${doc.id}-reviews`}>
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <SectionHeading as="h2" id={`${doc.id}-reviews`} className="!text-2xl md:!text-3xl">
                  {T.reviews}
                </SectionHeading>
                <p className="mt-3 max-w-[68ch] text-slate-600">{T.reviewsIntro}</p>
              </div>
              {showRating && GOOGLE_BUSINESS_URL ? (
                <a
                  href={GOOGLE_BUSINESS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-nav inline-flex min-h-[44px] shrink-0 items-center gap-2 font-medium text-slate-900"
                >
                  <Stars
                    rating={Math.round(GOOGLE_RATING)}
                    label={`Rating: ${GOOGLE_RATING} out of 5 stars`}
                    size={18}
                  />
                  <span>
                    {GOOGLE_RATING.toLocaleString("en-US", { minimumFractionDigits: 1 })} ·{" "}
                    {GOOGLE_REVIEW_COUNT} reviews on Google
                  </span>
                </a>
              ) : null}
            </div>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {doc.reviews.map((r) => (
                <blockquote
                  key={`${r.name}-${r.date}`}
                  lang="en"
                  className="flex flex-col rounded-xl bg-white p-6 ring-1 ring-stone-200"
                >
                  {r.rating ? <Stars rating={r.rating} label={`Rating: ${r.rating} out of 5 stars`} /> : null}
                  <p className="mt-3 whitespace-pre-line text-slate-800">{r.text}</p>
                  <footer className="mt-auto pt-4 text-sm text-slate-600">
                    <span className="font-medium text-slate-900">{r.name}</span>
                    <span className="mt-0.5 block text-slate-500">
                      {r.source} ·{" "}
                      {new Date(r.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                      })}
                    </span>
                  </footer>
                </blockquote>
              ))}
            </div>
          </section>
        ) : null}

        {/* FAQ */}
        <section aria-labelledby={`${doc.id}-faq`}>
          <SectionHeading as="h2" id={`${doc.id}-faq`} className="!text-2xl md:!text-3xl">
            {T.faq}
          </SectionHeading>
          <div className="mt-6 divide-y divide-stone-200 rounded-xl bg-white ring-1 ring-stone-200">
            {doc.faq.map((f) => (
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
            {doc.cta.title}
          </SectionHeading>
          <p className="mt-3 max-w-[68ch] text-slate-600">{doc.cta.text}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <TrackedLink
              label={`${doc.id}_cta_whatsapp_en`}
              href={doc.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              {doc.whatsappLabel || T.whatsapp}
            </TrackedLink>
            <TrackedLink
              label={`${doc.id}_cta_calculator_en`}
              href={doc.calculatorHref}
              className="btn btn-secondary"
            >
              {T.calculator}
            </TrackedLink>
            <a href={T.pricesHref} className="btn btn-ghost">
              {T.prices}
            </a>
          </div>

          <h3 className="mt-8 text-base font-semibold text-slate-900">{T.related}</h3>
          <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {doc.related.map((r) => (
              <li key={r.href}>
                <a href={r.href} className="link">
                  {r.label}
                </a>
              </li>
            ))}
            <li>
              <a href={doc.crumbParent.href} className="link">
                {T.uscisGuide}
              </a>
            </li>
          </ul>
        </section>
      </div>

      {/* JSON-LD: Service (US, USD) + BreadcrumbList + FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Service",
                "@id": `${url}#service`,
                name: doc.serviceName,
                serviceType: doc.serviceType,
                description: doc.metaDescription,
                url,
                inLanguage: "en",
                provider: {
                  "@type": "ProfessionalService",
                  "@id": `${BASE}/#organization`,
                  name: "Jurada Express",
                  url: `${BASE}/`,
                },
                areaServed: { "@type": "Country", name: "US" },
                availableLanguage: ["en", "es"],
                offers: {
                  "@type": "Offer",
                  priceCurrency: "USD",
                  ...(doc.priceUsd != null
                    ? { price: doc.priceUsd }
                    : {
                        priceSpecification: {
                          "@type": "PriceSpecification",
                          minPrice: MIN_PRICE_USD,
                          priceCurrency: "USD",
                        },
                      }),
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
                    name: doc.crumbParent.label,
                    item: `${BASE}${doc.crumbParent.href}`,
                  },
                  { "@type": "ListItem", position: 3, name: doc.short, item: url },
                ],
              },
              {
                "@type": "FAQPage",
                mainEntity: doc.faq.map((f) => ({
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
