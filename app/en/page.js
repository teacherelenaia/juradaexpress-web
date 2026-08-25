// app/en/page.js
import Image from "next/image";
import TrackedLink from "../components/TrackedLink";
import Reviews from "../components/Reviews";
import HeroSeal from "../components/HeroSeal";
import ProcessTimeline from "../components/ProcessTimeline";
import ProcessVideo from "../components/ProcessVideo";
import FollowUs from "../components/FollowUs";
import { SectionHeading } from "../components/ui";
import { DOCUMENTS } from "../../content/documents";
import { WHATSAPP_URL_EN } from "../../content/site";

export const metadata = {
  // The root layout appends "| JuradaExpress" through title.template.
  title: "Sworn Translator for Spain · Certified Spanish–English Translation in 24/48h",
  description:
    "Sworn translator of English appointed by Spain's Ministry of Foreign Affairs (no. 7310). Certified Spanish–English translations accepted for NIE, residency, university and property paperwork. Delivered digitally in 24/48 hours.",
  alternates: {
    canonical: "https://juradaexpress.es/en",
    languages: {
      es: "https://juradaexpress.es/",
      en: "https://juradaexpress.es/en",
      "x-default": "https://juradaexpress.es/",
    },
  },
  openGraph: {
    title:
      "Sworn Translator for Spain · Certified Spanish–English Translation in 24/48h | JuradaExpress",
    description:
      "Certified Spanish–English sworn translations accepted by Spanish authorities: NIE and residency, university admissions, property and marriage paperwork. Delivered digitally in 24/48 hours.",
    url: "https://juradaexpress.es/en",
    siteName: "JuradaExpress",
    type: "website",
    locale: "en_GB",
    images: [
      {
        url: "https://juradaexpress.es/fotos/hero-firma.jpg",
        width: 1200,
        height: 900,
        alt: "Signing a sworn translation with a pen on the document",
      },
    ],
  },
};

// Real prices from the catalogue (content/documents.js): single source.
const priceOf = (id) => DOCUMENTS.find((d) => d.id === id)?.price ?? null;

const COMMON_DOCUMENTS = [
  {
    name: "Birth certificate",
    for: "Citizenship, marriage, NIE and Civil Registry",
    price: priceOf("partida-nacimiento"),
    time: "24/48h",
    href: "/traduccion-jurada-partida-nacimiento",
  },
  {
    name: "Criminal record certificate",
    for: "Immigration, visas and job offers",
    price: priceOf("antecedentes-penales"),
    time: "24/48h",
    href: "/traduccion-jurada-certificado-penales",
  },
  {
    name: "Marriage certificate",
    for: "Civil Registry, residency and pensions",
    price: priceOf("certificado-matrimonio"),
    time: "24/48h",
    href: "/traduccion-jurada-certificado-matrimonio",
  },
  {
    name: "University degree",
    for: "UCAS, recognition of qualifications, professional bodies",
    price: priceOf("titulo-universitario"),
    time: "24/48h",
    href: "/traduccion-jurada-titulo-universitario",
  },
  {
    name: "Contract or deed",
    for: "Notary, property purchase and business",
    price: null,
    time: "Depends on length",
    href: "/traduccion-jurada-contrato-escritura",
  },
  {
    name: "Any other document",
    for: "Pick yours in the catalogue and get a quote",
    price: null,
    time: "Usually 24/48h",
    href: "/en/documentos",
  },
];

export default function Page() {
  return (
    <main>
      {/* HERO */}
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-12 md:pb-20 md:pt-16">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <h1 className="font-display text-balance text-display font-semibold text-slate-900">
              Sworn{" "}
              <em className="font-display italic text-brand-gold-700">
                Spanish ⇆ English
              </em>{" "}
              translation, officially valid, in 24/48 hours
            </h1>
            <p className="mt-5 text-xl text-slate-700">
              Officially valid · Delivered in 24/48h · All of Spain and the UK
            </p>
            <p className="mt-3 max-w-[68ch] text-base text-slate-600">
              Based in Murcia, Spain, I work with clients across the country
              and around the world — the entire process is 100% digital, so
              it doesn't matter where you are.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <TrackedLink
                label="hero_quote_en"
                href="/en/documentos"
                className="btn btn-primary"
              >
                Request a quote
              </TrackedLink>
              <TrackedLink
                label="hero_whatsapp_en"
                href={WHATSAPP_URL_EN}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                WhatsApp
              </TrackedLink>
            </div>
            <p className="mt-3 text-sm text-slate-500">
              * Projects over 20 pages: we agree a specific schedule and
              delivery in stages.
            </p>
          </div>

          <div className="relative">
            <figure className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-lg">
              <Image
                src="/fotos/hero-firma.jpg"
                alt="Hand signing a sworn translation with a pen on the document"
                fill
                priority
                sizes="(min-width: 768px) 560px, 100vw"
                className="object-cover"
              />
            </figure>
            <HeroSeal className="absolute -bottom-6 -left-4 h-32 w-32 md:-left-8 md:h-40 md:w-40" />
          </div>
        </div>
      </section>

      {/* MOST COMMON DOCUMENTS — editorial list, image on the left */}
      <section className="bg-stone-50">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <div className="grid items-start gap-10 md:grid-cols-[minmax(0,380px),1fr]">
            <div className="order-2 md:order-1">
              <div className="relative hidden aspect-[3/4] overflow-hidden rounded-xl shadow md:block">
                <Image
                  src="/fotos/foto-documentos.jpg"
                  alt="Passport and travel documents on a laptop — sworn document translation"
                  fill
                  sizes="380px"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="order-1 md:order-2">
              <SectionHeading>Most commonly translated documents</SectionHeading>
              <p className="mt-3 max-w-[68ch] text-slate-600">
                Every document has its own requirements. These are the ones I
                translate most often, with prices from and typical turnaround.
              </p>
              <ul className="mt-8 grid gap-x-10 md:grid-cols-2">
                {COMMON_DOCUMENTS.map((doc) => (
                  <li
                    key={doc.name}
                    className="border-b border-stone-200 py-4"
                  >
                    <a href={doc.href} className="group block no-underline">
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="font-medium text-brand-navy group-hover:text-brand-gold-700">
                          {doc.name}
                        </span>
                        <span className="shrink-0 text-sm font-semibold tabular-nums text-slate-900">
                          {doc.price != null ? `from €${doc.price}` : "on quote"}
                        </span>
                      </div>
                      <div className="mt-1 flex items-baseline justify-between gap-3">
                        <span className="text-sm text-slate-600">
                          {doc.for}
                        </span>
                        <span className="shrink-0 text-xs text-slate-500">
                          {doc.time}
                        </span>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-slate-500">
                Document guides are currently in Spanish; quotes and the whole
                service are available in English.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* UK / BREXIT — image on the right */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <SectionHeading>British and living in Spain?</SectionHeading>
            <p className="mt-4 max-w-[68ch] text-slate-600">
              I'll help you get your documents sworn-translated for your
              NIE, residency card (TIE), padrón registration, buying a
              property, or any other paperwork since Brexit. Everything
              done properly and on time, so you can focus on settling in.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <TrackedLink
                label="uk_guide_en"
                href="/en/sworn-translation-british-residents-spain"
                className="btn btn-primary"
              >
                Guide, procedure by procedure
              </TrackedLink>
              <TrackedLink
                label="uk_whatsapp_en"
                href="https://wa.me/34685891214?text=Hi%20JuradaExpress,%20I%27m%20British%20and%20need%20a%20sworn%20translation%20for%20a%20procedure%20in%20Spain"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                WhatsApp
              </TrackedLink>
            </div>
          </div>
          <div className="relative h-56 w-full overflow-hidden rounded-xl shadow md:h-72">
            <Image
              src="/fotos/foto-bandera-uk.jpg"
              alt="Union Jack flag — sworn translation for British nationals living in Spain"
              fill
              sizes="(min-width: 768px) 480px, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS — timeline (the home's single animated moment) */}
      <section className="bg-stone-50">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div className="order-2 md:order-1">
              <div className="relative h-56 w-full overflow-hidden rounded-xl shadow md:h-64">
                <Image
                  src="/fotos/proceso-despacho.jpg"
                  alt="Sworn translator working on the document at her desk"
                  fill
                  sizes="(min-width: 768px) 480px, 100vw"
                  className="object-cover"
                />
              </div>
              <ProcessVideo className="mt-4 aspect-video" />
            </div>
            <div className="order-1 md:order-2">
              <SectionHeading>How it works</SectionHeading>
              <p className="mt-3 max-w-[68ch] text-slate-600">
                The whole process is 100% digital: whether you're in Spain or
                anywhere else in the world, sending your documents, getting
                your quote and receiving your translation works exactly the
                same way.
              </p>
            </div>
          </div>

          <ProcessTimeline
            steps={[
              {
                t: "Send",
                d: "Send me a scan or photo of your document by email or WhatsApp.",
              },
              {
                t: "Quote",
                d: "You get a fixed price and a real delivery time within 2 hours.",
              },
              {
                t: "Sworn translation",
                d: "I translate, sign and stamp your document personally.",
              },
              {
                t: "Delivery in 24/48h",
                d: "A digitally signed PDF and, if you need it, paper by courier.",
              },
            ]}
          />
        </div>
      </section>

      {/* ABOUT ME */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <div className="grid items-center gap-8 md:grid-cols-[auto,1fr]">
          <div
            className="mx-auto flex h-28 w-28 shrink-0 items-center justify-center rounded-xl bg-stone-100 font-display text-3xl font-semibold tracking-tight text-brand-navy md:mx-0"
            aria-hidden="true"
          >
            E.P.
          </div>
          <div>
            <SectionHeading>About me</SectionHeading>
            <p className="mt-4 max-w-[68ch] text-lg text-slate-600">
              I'm <strong className="text-brand-navy">Elena Peñaranda Ortega</strong>,
              a Sworn Translator-Interpreter for English appointed by the
              Spanish Ministry of Foreign Affairs, European Union and
              Cooperation under{" "}
              <a
                href="https://www.exteriores.gob.es/es/ServiciosAlCiudadano/Paginas/Traductores-as---Interpretes-Jurados-as.aspx"
                target="_blank"
                rel="noopener noreferrer"
                className="link"
              >
                accreditation no. 7310
              </a>
              . I personally translate, sign and stamp every sworn
              translation, guaranteeing its validity before any official body
              in Spain.
            </p>
            <p className="mt-4">
              <a href="/en/about" className="link">
                Find out how I work and why my signature is trusted →
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* REVIEWS — only rendered when content/reviews.js holds real reviews */}
      <Reviews locale="en" />

      {/* FINAL CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-16 md:pb-20">
        <div
          data-surface="navy"
          className="rounded-xl bg-brand-navy p-8 text-white md:p-12"
        >
          <div className="grid items-center gap-8 md:grid-cols-[1.2fr,0.8fr]">
            <div>
              <SectionHeading light>Shall we get started?</SectionHeading>
              <p className="mt-2 text-brand-navy-100">
                Send me your document and I'll reply with a quote and delivery time.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <TrackedLink
                  label="cta_quote_final_en"
                  href="/en/documentos"
                  className="btn btn-light"
                >
                  Request a quote
                </TrackedLink>
                <TrackedLink
                  label="cta_pricing_final_en"
                  href="/en/precios"
                  className="btn btn-outline-light"
                >
                  See pricing
                </TrackedLink>
              </div>
            </div>
            <div className="relative h-48 w-full overflow-hidden rounded-xl shadow-lg md:h-56">
              <Image
                src="/docs-real.jpg"
                alt="Official certificates stacked, ready for sworn translation"
                fill
                sizes="(min-width: 768px) 360px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ + JSON-LD */}
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <SectionHeading>Frequently asked questions</SectionHeading>
        <div className="mt-8 divide-y divide-stone-200 rounded-xl bg-white ring-1 ring-stone-200">
          {[
            {
              q: "Is a sworn translation valid throughout Spain?",
              a: "Yes. Sworn translations signed and stamped by an officially appointed sworn translator are valid before official bodies anywhere in Spain.",
            },
            {
              q: "Do you deliver on paper and digitally?",
              a: "Yes. We deliver a digitally signed PDF and, if you need it, a physical copy shipped to your address.",
            },
            {
              q: "Can I get my translation in 24/48h?",
              a: "For standard documents, yes. For documents over 20 pages, we agree on a specific delivery schedule.",
            },
          ].map((f, idx) => (
            <details key={idx} className="group p-5">
              <summary className="flex cursor-pointer items-center justify-between gap-4 font-medium text-slate-900 [&::-webkit-details-marker]:hidden">
                {f.q}
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
              </summary>
              <p className="mt-2 max-w-[68ch] text-sm text-slate-600">{f.a}</p>
            </details>
          ))}
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Is a sworn translation valid throughout Spain?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text:
                      "Yes. Sworn translations signed and stamped by an officially appointed sworn translator are valid before official bodies anywhere in Spain.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Do you deliver on paper and digitally?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text:
                      "Yes. We deliver a digitally signed PDF and, if you need it, a physical copy shipped to your address.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Can I get my translation in 24/48h?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text:
                      "For standard documents, yes. For documents over 20 pages, we agree on a specific delivery schedule.",
                  },
                },
              ],
            }),
          }}
        />
      </section>

      {/* FOLLOW US */}
      <FollowUs locale="en" />
    </main>
  );
}
