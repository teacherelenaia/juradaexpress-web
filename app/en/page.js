// app/en/page.js
import Image from "next/image";
import TrackedLink from "../components/TrackedLink";
import Reviews from "../components/Reviews";
import TrustStrip from "../components/TrustStrip";
import HeroSeal from "../components/HeroSeal";
import ProcessTimeline from "../components/ProcessTimeline";
import ProcessVideo from "../components/ProcessVideo";
import FollowUs from "../components/FollowUs";
import { SectionHeading } from "../components/ui";
import { DOCUMENTS } from "../../content/documents";
import {
  WHATSAPP_URL_EN,
  LARGE_PROJECT_CAPACITY,
  TIMEZONE_NOTE,
} from "../../content/site";

export const metadata = {
  // Explicit suffix (≤ 60 characters); the root template applies to /en.
  title: { absolute: "Sworn Spanish-English Translator Online | Jurada Express" },
  description:
    "Sworn translation for Spain, certified translation for USCIS and digital nomad visa documents. Sworn translator appointed by Spain's Ministry of Foreign Affairs (no. 7310). Clients in the UK, USA, India and worldwide. Delivered in 24/48h.",
  alternates: {
    canonical: "https://juradaexpress.es/en",
    languages: {
      es: "https://juradaexpress.es/",
      en: "https://juradaexpress.es/en",
      "x-default": "https://juradaexpress.es/",
    },
  },
  openGraph: {
    title: "Sworn Spanish-English Translator Online | Jurada Express",
    description:
      "Sworn translation for Spain, certified translation for USCIS and digital nomad visa documents. Sworn translator appointed by Spain's Ministry of Foreign Affairs (no. 7310). Delivered digitally in 24/48h.",
    url: "https://juradaexpress.es/en",
    siteName: "Jurada Express",
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

// Usual documents in a digital nomad visa file (source: brief 0.4).
const DNV_DOCUMENTS = [
  "Criminal record certificate, apostilled",
  "Employment contract or employer letter authorising remote work from Spain",
  "Company registration certificate (certificate of incorporation or good standing)",
  "University degree or letters proving professional experience",
  "Social security coverage certificate (UK A1, US SSA certificate of coverage)",
];

const WHATSAPP_DNV =
  "https://wa.me/34685891214?text=Hi%20Jurada%20Express,%20I%27m%20applying%20for%20Spain%27s%20digital%20nomad%20visa%20and%20need%20sworn%20translations%20of%20my%20documents";
const WHATSAPP_LARGE =
  "https://wa.me/34685891214?text=Hi%20Jurada%20Express,%20I%20have%20a%20large%20sworn%20translation%20project%20and%20need%20a%20fixed%20quote%20and%20deadline";

const FAQ = [
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
  {
    q: "Do you work with clients outside Spain?",
    a: "Yes. I work with clients in the United States, India, the United Kingdom, Ireland, Canada, Australia and any other country: sending the document, paying by card and receiving the signed PDF work the same way from anywhere, and paper copies are couriered if you need them.",
  },
  {
    q: "Do you provide certified translations for USCIS?",
    a: "Yes. I deliver the complete English translation with the certification of accuracy and competence that USCIS requires (8 CFR § 103.2(b)(3)), signed, dated and with my contact details, one certificate per document. No notary is needed.",
  },
  {
    q: "How long does a complete digital nomad visa file take?",
    a: LARGE_PROJECT_CAPACITY
      ? `You get a single fixed deadline in writing before I start; individual documents take 24/48h and I can handle ${LARGE_PROJECT_CAPACITY.en}, so a complete file is usually ready within a few days.`
      : "You get a single fixed deadline in writing before I start; individual documents take 24/48h.",
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
              Officially valid · Delivered in 24/48h · Clients in Spain, the
              UK, the USA, India and any country
            </p>
            <p className="mt-3 max-w-[68ch] text-base text-slate-600">
              The whole process is digital: you send me a scan of the
              document, pay by card from any country and receive the
              translation as a signed PDF the same day or the next. I also
              provide certified translations for USCIS.
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

      {/* TRUST STRIP — four facts, no icons, no cards */}
      <TrustStrip locale="en" />

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
                service are available in English. Prices are in euros and
                charged in euros to any international card.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DIGITAL NOMAD VISA — image on the left */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <div className="grid items-center gap-10 md:grid-cols-[minmax(0,380px),1fr]">
          <div className="relative hidden aspect-[3/4] overflow-hidden rounded-xl shadow md:block">
            <Image
              src="/fotos/expediente-nomada.jpg"
              alt="Hands checking an official form on a folder of documents — digital nomad visa file"
              fill
              sizes="380px"
              className="object-cover"
            />
          </div>
          <div>
            <SectionHeading>Applying for Spain&apos;s digital nomad visa?</SectionHeading>
            <p className="mt-4 max-w-[68ch] text-slate-600">
              The file for Spain&apos;s international remote work residence
              permit (Law 28/2022) brings together many documents from
              different countries, and almost all of them must reach the
              consulate or the UGE in Spanish. Most refusals come from
              translations that are not sworn or from missing apostilles, not
              from the merits of the case. I check your full list, tell you
              which documents need an apostille and translate the whole batch
              with a single deadline, delivered in order and clearly named so
              you can upload it straight to the platform.
            </p>
            <ul className="mt-6 grid max-w-[68ch] gap-2 text-slate-700">
              {DNV_DOCUMENTS.map((d) => (
                <li key={d} className="flex gap-3">
                  <span
                    className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-gold-500"
                    aria-hidden="true"
                  />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap gap-3">
              <TrackedLink
                label="dnv_guide_en"
                href="/en/sworn-translation-spain-digital-nomad-visa"
                className="btn btn-primary"
              >
                See which documents you need
              </TrackedLink>
              <TrackedLink
                label="dnv_whatsapp_en"
                href={WHATSAPP_DNV}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                WhatsApp
              </TrackedLink>
            </div>
          </div>
        </div>
      </section>

      {/* UK / BREXIT — image on the right */}
      <section className="bg-stone-50">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <SectionHeading>British and living in Spain?</SectionHeading>
              <p className="mt-4 max-w-[68ch] text-slate-600">
                I&apos;ll help you get your documents sworn-translated for your
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
                  href="https://wa.me/34685891214?text=Hi%20Jurada%20Express,%20I%27m%20British%20and%20need%20a%20sworn%20translation%20for%20a%20procedure%20in%20Spain"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  WhatsApp
                </TrackedLink>
              </div>
              <p className="mt-6 max-w-[68ch] text-sm text-slate-600">
                Coming from the United States, India, Ireland, Canada or
                Australia?{" "}
                <a href="/en/sworn-translation-spain-by-country" className="link">
                  You have your own guide
                </a>
                .
              </p>
            </div>
            <div className="relative h-56 w-full overflow-hidden rounded-xl shadow md:h-72">
              <Image
                src="/fotos/escritorio-documentos.jpg"
                alt="Hand writing in a notebook next to a laptop, preparing the paperwork for a procedure in Spain"
                fill
                sizes="(min-width: 768px) 480px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS — timeline (the home's single animated moment) */}
      <section>
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
                The whole process is 100% digital: whether you&apos;re in Spain
                or on another continent, sending your documents, getting your
                quote, paying by card and receiving your translation work
                exactly the same way.
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

      {/* LARGE PROJECTS, SHORT DEADLINES */}
      <section className="bg-stone-50">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-16">
          <div className="grid gap-8 md:grid-cols-[1.4fr,1fr] md:items-center">
            <div>
              <SectionHeading>Large projects, short deadlines</SectionHeading>
              <p className="mt-4 max-w-[68ch] text-slate-600">
                I translate complete visa files and batches of documents for
                individuals, companies, law firms and relocation agencies.
                Before I start you get a fixed quote and deadline in writing;
                when I finish you receive every document as a signed PDF, in
                order and clearly named so you know what each file is.
                {LARGE_PROJECT_CAPACITY
                  ? ` I can handle ${LARGE_PROJECT_CAPACITY.en}; for larger volumes or rush jobs, ask me and I will confirm a deadline in writing.`
                  : " For large volumes or rush jobs, ask me and I will confirm a deadline in writing."}
              </p>
            </div>
            <div className="flex flex-col items-start gap-4">
              <TrackedLink
                label="large_whatsapp_en"
                href={WHATSAPP_LARGE}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Tell me about your project on WhatsApp
              </TrackedLink>
              <a
                href="/en/urgent-sworn-translation-large-projects"
                className="link inline-block py-1"
              >
                How I handle a batch of documents →
              </a>
            </div>
          </div>
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
              I&apos;m <strong className="text-brand-navy">Elena Peñaranda Ortega</strong>,
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
            <p className="mt-4 max-w-[68ch] text-slate-600">
              I also provide certified translations for USCIS and work with
              clients in the United States, India, the United Kingdom,
              Ireland, Canada and Australia through the same digital process.{" "}
              {TIMEZONE_NOTE.en}.
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
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-16 md:pb-20 md:pt-20">
        <div
          data-surface="navy"
          className="rounded-xl bg-brand-navy p-8 text-white md:p-12"
        >
          <div className="grid items-center gap-8 md:grid-cols-[1.2fr,0.8fr]">
            <div>
              <SectionHeading light>Shall we get started?</SectionHeading>
              <p className="mt-2 text-brand-navy-100">
                Send me your document and I&apos;ll reply with a quote and delivery time.
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
          {FAQ.map((f, idx) => (
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
              mainEntity: FAQ.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            }),
          }}
        />
      </section>

      {/* FOLLOW US */}
      <FollowUs locale="en" />
    </main>
  );
}
