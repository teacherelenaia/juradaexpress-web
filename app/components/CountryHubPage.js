// app/components/CountryHubPage.js
//
// Hub "Traducción jurada por países" (FASE 2B.1). Una tarjeta por país con
// el mismo componente (CountryCard), sin banderas ni mapas: los países con
// página propia enlazan a ella y los demás a su sección con ancla en esta
// misma página. Comparte el estilo de ServicePage (miga, cabecera con H1 y
// párrafo citable, FAQ con <details>, CTA y JSON-LD Service + FAQPage +
// BreadcrumbList). Los datos viven en content/paises.js.
import Image from "next/image";
import TrackedLink from "./TrackedLink";
import { SectionHeading } from "./ui";
import { SERVICE_COUNTRIES, EXTRA_AREA_SERVED } from "../../content/site";

const BASE = "https://juradaexpress.es";

const UI = {
  es: {
    home: "Inicio",
    crumb: "Miga de pan",
    quote: "Pedir presupuesto",
    quoteHref: "/documentos",
    faq: "Preguntas frecuentes",
    related: "Páginas relacionadas",
    otherLang: "Read this page in English:",
    prices: "Ver precios",
    pricesHref: "/precios",
    docs: "Catálogo de documentos",
    docsHref: "/documentos",
    countries: "Países",
    source: "Fuente oficial enlazada en el texto.",
  },
  en: {
    home: "Home",
    crumb: "Breadcrumb",
    quote: "Request a quote",
    quoteHref: "/en/documentos",
    faq: "Frequently asked questions",
    related: "Related pages",
    otherLang: "Lee esta página en español:",
    prices: "See pricing",
    pricesHref: "/en/precios",
    docs: "Document catalogue",
    docsHref: "/en/documentos",
    countries: "Countries",
    source: "Official source linked in the text.",
  },
};

export function hubMetadata(page) {
  const es = page.alternates.es;
  const en = page.alternates.en;
  return {
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

function Arrow() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="transition-transform duration-[180ms] group-hover:translate-x-0.5"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

// Un único componente de tarjeta para los doce países: nombre, resumen y
// enlace (a la página del país o al ancla de su sección).
function CountryCard({ card, cta, locale }) {
  return (
    <li className="group flex flex-col rounded-xl bg-white p-5 ring-1 ring-stone-200 transition-shadow duration-[180ms] hover:shadow-card">
      <h3 className="font-display text-xl font-semibold text-slate-900">
        <a href={card.href} className="no-underline hover:text-brand-navy">
          {card.name}
        </a>
      </h3>
      <p className="mt-2 grow text-sm text-slate-600">{card.text}</p>
      <a
        href={card.href}
        aria-label={`${cta}: ${card.name}`}
        className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-navy no-underline"
        lang={locale}
      >
        {cta}
        <Arrow />
      </a>
    </li>
  );
}

const PROSE =
  "max-w-[68ch] text-slate-600 [&_a]:text-brand-navy [&_a]:underline [&_a]:underline-offset-2 [&_strong]:font-semibold [&_strong]:text-slate-900";

export default function CountryHubPage({ page }) {
  const t = UI[page.locale] || UI.es;
  const otherHref =
    page.locale === "en" ? page.alternates.es : page.alternates.en;

  const areaServed = [
    ...SERVICE_COUNTRIES.filter((c) => c.code).map((c) => ({
      "@type": "Country",
      name: c.code,
    })),
    ...EXTRA_AREA_SERVED.map((code) => ({ "@type": "Country", name: code })),
    "Worldwide",
  ];

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 md:py-16">
      <nav aria-label={t.crumb} className="text-sm text-slate-500">
        <a href={page.locale === "en" ? "/en" : "/"} className="link-crumb">
          {t.home}
        </a>{" "}
        <span aria-hidden="true">/</span>{" "}
        <span className="text-slate-700">{page.crumb}</span>
      </nav>

      <header className="mt-6 grid items-center gap-8 md:grid-cols-[1.15fr,0.85fr] md:gap-12">
        <div>
          <h1 className="font-display text-balance text-3xl font-semibold leading-tight tracking-[-0.02em] text-slate-900 md:text-4xl lg:text-[2.75rem]">
            {page.h1}
          </h1>
          <p className={`mt-5 text-lg ${PROSE} text-slate-700`}>{page.lead}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <TrackedLink
              label={`${page.id}_whatsapp_${page.locale}`}
              href={page.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              {page.whatsappLabel}
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

      <div className="mt-14 space-y-12 md:mt-16">
        {/* Tarjetas de país */}
        <section aria-labelledby={`${page.id}-cards`}>
          <SectionHeading
            as="h2"
            id={`${page.id}-cards`}
            className="!text-2xl md:!text-3xl"
          >
            {page.cardsTitle}
          </SectionHeading>
          <p className={`mt-3 ${PROSE}`}>{page.cardsIntro}</p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {page.cards.map((card) => (
              <CountryCard
                key={card.name}
                card={card}
                locale={page.locale}
                cta={card.anchor ? page.cardCtaAnchor : page.cardCtaPage}
              />
            ))}
          </ul>
        </section>

        {/* Secciones con ancla para los países sin página propia */}
        <section aria-labelledby={`${page.id}-sections`}>
          <SectionHeading
            as="h2"
            id={`${page.id}-sections`}
            className="!text-2xl md:!text-3xl"
          >
            {page.sectionsTitle}
          </SectionHeading>
          <div className="mt-6 space-y-10">
            {page.sections.map((s) => (
              <section key={s.id} id={s.id} className="scroll-mt-24">
                <h3 className="font-display text-xl font-semibold text-slate-900 md:text-2xl">
                  {s.title}
                </h3>
                <div className="mt-3 space-y-4">
                  {s.body.map((p, i) => (
                    <p
                      key={i}
                      className={PROSE}
                      dangerouslySetInnerHTML={{ __html: p }}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </section>

        {/* Cierre: ¿Tu país no está? */}
        <section className="rounded-xl bg-brand-navy p-6 text-white md:p-8">
          <SectionHeading as="h2" light className="!text-2xl md:!text-3xl">
            {page.closing.title}
          </SectionHeading>
          <p className="mt-3 max-w-[68ch] text-slate-200">{page.closing.text}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <TrackedLink
              label={`${page.id}_closing_whatsapp_${page.locale}`}
              href={page.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-light"
            >
              {page.whatsappLabel}
            </TrackedLink>
            <TrackedLink
              label={`${page.id}_closing_quote_${page.locale}`}
              href={t.quoteHref}
              className="btn btn-outline-light"
            >
              {t.quote}
            </TrackedLink>
          </div>
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

        {/* Enlaces relacionados */}
        <section className="rounded-xl bg-stone-50 p-6 ring-1 ring-stone-200 md:p-8">
          <h2 className="text-base font-semibold text-slate-900">{t.related}</h2>
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
            <li>
              <a href={t.pricesHref} className="link">
                {t.prices}
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
                areaServed,
                availableLanguage: ["es", "en"],
                offers: {
                  "@type": "Offer",
                  priceCurrency: "EUR",
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
