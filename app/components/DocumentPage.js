// app/components/DocumentPage.js
// Plantilla de las fichas de documento (/traduccion-jurada-*). Sigue el
// patrón de la auditoría (5.2): para qué trámites, apostilla sí/no, precio
// desde, plazo, cómo enviarlo, FAQ propia y schema Service + BreadcrumbList
// (+ FAQPage). Los datos viven en content/fichas.js.
import TrackedLink from "./TrackedLink";
import { SectionHeading } from "./ui";
import { IconCheck } from "./Icons";
import { WHATSAPP_URL } from "../../content/site";

const BASE = "https://juradaexpress.es";

export function fichaMetadata(ficha) {
  return {
    title: ficha.title,
    description: ficha.description,
    alternates: {
      canonical: `${BASE}/${ficha.slug}`,
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

export default function DocumentPage({ ficha }) {
  const priceText =
    ficha.price != null
      ? `${ficha.priceLabel || "desde"} ${ficha.price} €`
      : ficha.priceNote || "presupuesto cerrado en menos de 2 h";
  const whatsapp = `https://wa.me/34685891214?text=${encodeURIComponent(
    `Hola JuradaExpress, necesito una traducción jurada: ${ficha.name.toLowerCase()}`
  )}`;

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 md:py-16">
      {/* Miga de pan */}
      <nav aria-label="Miga de pan" className="text-sm text-slate-500">
        <a href="/" className="link-nav">
          Inicio
        </a>{" "}
        <span aria-hidden="true">/</span>{" "}
        <a href="/documentos" className="link-nav">
          Documentos
        </a>{" "}
        <span aria-hidden="true">/</span>{" "}
        <span className="text-slate-700">{ficha.name}</span>
      </nav>

      <h1 className="font-display text-balance mt-4 text-3xl font-semibold leading-tight tracking-[-0.02em] text-slate-900 md:text-4xl">
        {ficha.name}
      </h1>
      <p className="mt-4 max-w-[68ch] text-lg text-slate-600">{ficha.intro}</p>

      {/* Datos clave */}
      <dl className="mt-8 grid gap-4 rounded-xl bg-stone-50 p-6 ring-1 ring-stone-200 sm:grid-cols-3">
        <div>
          <dt className="text-sm text-slate-500">Precio</dt>
          <dd className="mt-1 font-semibold tabular-nums text-slate-900">
            {priceText}
          </dd>
        </div>
        <div>
          <dt className="text-sm text-slate-500">Plazo habitual</dt>
          <dd className="mt-1 font-semibold text-slate-900">{ficha.time}</dd>
        </div>
        <div>
          <dt className="text-sm text-slate-500">¿Apostilla?</dt>
          <dd className="mt-1 font-semibold text-slate-900">
            {ficha.apostilla.verdict}
          </dd>
        </div>
      </dl>

      {/* Para qué trámites */}
      <SectionHeading as="h2" className="mt-12 !text-2xl md:!text-3xl">
        Para qué trámites se pide
      </SectionHeading>
      <ul className="mt-4 max-w-[68ch] space-y-2">
        {ficha.tramites.map((t) => (
          <li key={t} className="flex items-start gap-2 text-slate-600">
            <IconCheck className="mt-1 h-4 w-4 shrink-0 text-brand-gold-700" />
            {t}
          </li>
        ))}
      </ul>

      {/* Apostilla */}
      <SectionHeading as="h2" className="mt-12 !text-2xl md:!text-3xl">
        ¿Necesita apostilla? {ficha.apostilla.verdict}
      </SectionHeading>
      <p className="mt-4 max-w-[68ch] text-slate-600">{ficha.apostilla.text}</p>

      {/* Cómo enviarlo */}
      <SectionHeading as="h2" className="mt-12 !text-2xl md:!text-3xl">
        Cómo enviármelo
      </SectionHeading>
      <p className="mt-4 max-w-[68ch] text-slate-600">{ficha.envio}</p>

      <div className="mt-8 flex flex-wrap gap-3">
        <TrackedLink
          label={`ficha_${ficha.slug}_presupuesto`}
          href="/documentos"
          className="btn btn-primary"
        >
          Pedir presupuesto
        </TrackedLink>
        <TrackedLink
          label={`ficha_${ficha.slug}_whatsapp`}
          href={whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary"
        >
          WhatsApp
        </TrackedLink>
      </div>

      {/* FAQ propia */}
      <SectionHeading as="h2" className="mt-12 !text-2xl md:!text-3xl">
        Preguntas frecuentes
      </SectionHeading>
      <div className="mt-4 divide-y divide-stone-200 rounded-xl bg-white ring-1 ring-stone-200">
        {ficha.faq.map((f) => (
          <details key={f.q} className="group p-5">
            <summary className="flex cursor-pointer items-center justify-between gap-4 font-medium text-slate-900 [&::-webkit-details-marker]:hidden">
              {f.q}
              <Chevron />
            </summary>
            <p className="mt-2 max-w-[68ch] text-sm text-slate-600">{f.a}</p>
          </details>
        ))}
      </div>

      {/* Relacionados */}
      {ficha.related?.length > 0 && (
        <p className="mt-8 text-sm text-slate-500">
          También te puede interesar:{" "}
          {ficha.related.map((r, i) => (
            <span key={r.href}>
              {i > 0 && " · "}
              <a href={r.href} className="link">
                {r.label}
              </a>
            </span>
          ))}
        </p>
      )}

      {/* Schema: Service + BreadcrumbList + FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Service",
                name: ficha.name,
                serviceType: "Traducción jurada Español ⇆ Inglés",
                url: `${BASE}/${ficha.slug}`,
                provider: {
                  "@type": "ProfessionalService",
                  name: "JuradaExpress",
                  url: `${BASE}/`,
                },
                areaServed: [
                  { "@type": "Country", name: "ES" },
                  { "@type": "Country", name: "GB" },
                ],
                availableLanguage: ["es", "en"],
                ...(ficha.price != null && {
                  offers: {
                    "@type": "Offer",
                    price: String(ficha.price),
                    priceCurrency: "EUR",
                    description: `Precio desde, por documento. Entrega habitual: ${ficha.time}.`,
                  },
                }),
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Inicio",
                    item: `${BASE}/`,
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: "Documentos",
                    item: `${BASE}/documentos`,
                  },
                  {
                    "@type": "ListItem",
                    position: 3,
                    name: ficha.name,
                    item: `${BASE}/${ficha.slug}`,
                  },
                ],
              },
              {
                "@type": "FAQPage",
                mainEntity: ficha.faq.map((f) => ({
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
