// app/en/page.js
//
// English home (Fase A2, 18/10/2026): Elena as the visible face. Order: hero
// with photo and a single primary button → trust strip → quick documents →
// calculator → why work with Elena → how it works (3 steps) → price per
// document + direct vs agency table → reviews → US visas → digital nomad →
// UK → large projects → about (short) → FAQ by objection → closing →
// follow us. No section is removed: they are reordered, and the hero, quick
// documents, process, reviews, FAQ and closing are rewritten. Hero copy
// lives in content/site.js (HERO_H1, HERO_SUB, DELIVERY_PROMISE).
import Image from "next/image";
import TrackedLink from "../components/TrackedLink";
import Reviews from "../components/Reviews";
import TrustStrip from "../components/TrustStrip";
import HeroSeal from "../components/HeroSeal";
import QuotePromise from "../components/QuotePromise";
import QuoteCalculator from "../components/QuoteCalculator";
import ProcessTimeline from "../components/ProcessTimeline";
import ProcessVideo from "../components/ProcessVideo";
import PricePerDocument from "../components/PricePerDocument";
import FollowUs from "../components/FollowUs";
import { IconWhatsApp } from "../components/Icons";
import { SectionHeading } from "../components/ui";
import { DOCUMENTS, MIN_PRICE } from "../../content/documents";
import {
  SINCE,
  MAEC_NUMBER,
  MAEC_URL,
  PERSON_NAME,
} from "../../content/persona";
import {
  WHATSAPP_URL_EN,
  LARGE_PROJECT_CAPACITY,
  TIMEZONE_NOTE,
  SAME_DAY_CUTOFF,
  SAME_DAY_MAX_PAGES,
  HERO_H1,
  HERO_SUB,
  HERO_PHOTO,
  DELIVERY_PROMISE,
  PRICE_PER_PAGE,
  MIN_DOC_PRICE,
} from "../../content/site";
import {
  US_VISA_PRICES,
  US_VISA_LINKS,
  WHATSAPP_US_VISA,
  FBI_PRICE,
  VISA_PACK_PRICE,
  FBI_PATH_EN,
  NLV_CHECKLIST_PATH_EN,
} from "../../content/us-visas";

// Meta description (17/10/2026): names the FBI check and visa documents so
// the page answers US visa applicants on Bing/ChatGPT. Title unchanged.
const DESCRIPTION = `Sworn Spanish-English translation from €${MIN_PRICE}: FBI checks, birth certificates and visa documents for Spain. Signed PDF same day. Foreign Ministry no. ${MAEC_NUMBER}.`;

export const metadata = {
  // Explicit suffix; the root template applies to /en. The real minimum
  // price comes from content/documents.js so the title never drifts.
  title: { absolute: `Sworn Spanish-English Translation Online from €${MIN_PRICE} | Jurada Express` },
  description: DESCRIPTION,
  alternates: {
    canonical: "https://juradaexpress.es/en",
    languages: {
      es: "https://juradaexpress.es/",
      en: "https://juradaexpress.es/en",
      "x-default": "https://juradaexpress.es/",
    },
  },
  openGraph: {
    title: `Sworn Spanish-English Translation Online from €${MIN_PRICE} | Jurada Express`,
    description: DESCRIPTION,
    url: "https://juradaexpress.es/en",
    siteName: "Jurada Express",
    type: "website",
    locale: "en_GB",
    // Brand image (scripts/build-brand-images.mjs, 10/10/2026): logo, name
    // and credential, so link cards and answer engines show the brand rather
    // than a generic photo. Home page only; other pages keep their photo.
    images: [
      {
        url: "https://juradaexpress.es/og-home-en.png",
        width: 1200,
        height: 630,
        alt: "Jurada Express, sworn English–Spanish translator, MAEC No. 7310",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Sworn Spanish-English Translation Online from €${MIN_PRICE} | Jurada Express`,
    description: DESCRIPTION,
    images: ["https://juradaexpress.es/og-home-en.png"],
  },
};

// Real prices from the catalogue (content/documents.js): single source.
const priceOf = (id) => DOCUMENTS.find((d) => d.id === id)?.price ?? null;

// Quick documents: six entries with a fixed price and same-day delivery.
// The FBI check keeps its own entry because it is the top US query.
const QUICK_DOCUMENTS = [
  {
    id: "partida-nacimiento",
    name: "Birth certificate",
    cta: (p) => `Translate my birth certificate from €${p}`,
    href: "/traduccion-jurada-partida-nacimiento",
  },
  {
    id: "antecedentes-penales",
    name: "FBI background check (apostilled)",
    cta: (p) => `Translate my FBI check from €${p}`,
    href: FBI_PATH_EN,
  },
  {
    id: "antecedentes-penales",
    name: "Criminal record certificate",
    cta: (p) => `Translate my criminal record certificate from €${p}`,
    href: "/traduccion-jurada-certificado-penales",
  },
  {
    id: "certificado-matrimonio",
    name: "Marriage certificate",
    cta: (p) => `Translate my marriage certificate from €${p}`,
    href: "/traduccion-jurada-certificado-matrimonio",
  },
  {
    id: "titulo-universitario",
    name: "University degree",
    cta: (p) => `Translate my degree from €${p}`,
    href: "/traduccion-jurada-titulo-universitario",
  },
  {
    id: null,
    name: "Any other document",
    detail: "Driving licence, contract, passport, will, medical certificate…",
    cta: () => "Get a fixed price for another document",
    href: "/en/documentos",
  },
].map((d) => ({ ...d, price: d.id ? priceOf(d.id) : null }));

// Why work directly with Elena: three arguments, text only.
const WHY_ELENA = [
  {
    t: "You talk to the person who signs",
    d: "No agency, no queue: I answer you myself on WhatsApp or by email, 9:00 to 20:00 Madrid time. I translate, sign and stamp every document; nothing is passed on to anyone.",
  },
  {
    t: "Fixed price before you pay",
    d: "I tell you what it costs and when you will have it, in writing. Per document, not per page, and no surcharges afterwards.",
  },
  {
    t: "Free correction if the mistake is mine",
    d: "If an authority rejects the translation because of an error in my work, I fix it at no cost. You never pay twice for my mistake.",
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

// FAQ ordered by objection (Fase A2): validity → deadline → price → format →
// guarantee → paying from abroad → USCIS → FBI → non-lucrative → nomad.
// `link` is shown under the answer and left out of the JSON-LD text.
const FAQ = [
  {
    q: "Will my translation be accepted?",
    a: `Yes. I am a sworn translator-interpreter appointed by Spain's Ministry of Foreign Affairs (no. ${MAEC_NUMBER}, verifiable on its official register). Sworn translations signed and stamped by an officially appointed sworn translator are valid before official bodies anywhere in Spain: immigration offices, civil registries, universities, notaries, courts and Spanish consulates abroad. The PDF carries a qualified electronic signature and is as valid as paper.`,
  },
  {
    q: "When will I have it?",
    a: `${DELIVERY_PROMISE.en} Same-day delivery of more than ${SAME_DAY_MAX_PAGES} pages carries a 30% surcharge.`,
  },
  {
    q: "How much does it cost exactly?",
    a: `From €${MIN_PRICE} per document, VAT included: birth certificate, marriage certificate and criminal record certificate, €${priceOf("partida-nacimiento")}; driving licence, €${priceOf("permiso-conducir")}; university degree, €${priceOf("titulo-universitario")}. Long documents (contracts, deeds, transcripts) are priced at €${PRICE_PER_PAGE} per page with a minimum of €${MIN_DOC_PRICE} per document. You get the exact price in writing before you pay, and there are no surcharges afterwards.`,
  },
  {
    q: "PDF or paper?",
    a: "Both. You always receive the digitally signed PDF, which is valid before any official body; if you need paper, I courier it to your address in Spain or in any other country (the courier cost is stated in the quote).",
  },
  {
    q: "What if it gets rejected?",
    a: "If an authority rejects the translation because of my mistake, I fix it free and resend the PDF. If the problem lies in the original document (a missing apostille, an expired certificate), I tell you before I start so you never pay twice.",
  },
  {
    q: "Can I pay from outside Spain?",
    a: "Yes. I work with clients in the United States, India, the United Kingdom, Ireland, Canada, Australia and any other country: sending the document, paying by international card and receiving the signed PDF work the same way from anywhere, and paper copies are couriered if you need them.",
  },
  {
    q: "Do you translate for USCIS?",
    a: "Yes. I deliver the complete English translation with the certification of accuracy and competence that USCIS requires (8 CFR § 103.2(b)(3)), signed, dated and with my contact details, one certificate per document. No notary is needed.",
  },
  // US visa applicants (17/10/2026).
  {
    q: "Can you translate my FBI background check for a Spanish visa?",
    a: `Yes. I do the sworn translation of the FBI Identity History Summary and of its US Department of State apostille for €${FBI_PRICE}, delivered as a signed PDF the same day if it reaches me before ${SAME_DAY_CUTOFF.en} Madrid time. Spanish consulates in the United States accept it.`,
    link: { label: "FBI background check translation for your Spanish visa", href: FBI_PATH_EN },
  },
  {
    q: "Which documents need a sworn translation for Spain's non-lucrative visa?",
    a: `Usually the apostilled FBI background check, the medical certificate if it is in English, birth and marriage certificates if your family travels with you, and bank or pension letters depending on the consulate. The Spain Visa Pack covers up to 4 documents for €${VISA_PACK_PRICE}.`,
    link: { label: "Non-lucrative visa: document checklist", href: NLV_CHECKLIST_PATH_EN },
  },
  {
    q: "How long does a complete digital nomad visa file take?",
    a: LARGE_PROJECT_CAPACITY
      ? `You get a single fixed deadline in writing before I start; documents of up to ${SAME_DAY_MAX_PAGES} pages are delivered the same day and I can handle ${LARGE_PROJECT_CAPACITY.en}, so a complete file is usually ready within a few days.`
      : `You get a single fixed deadline in writing before I start; documents of up to ${SAME_DAY_MAX_PAGES} pages are delivered the same day.`,
  },
];

const PHOTO_ALT = "Elena Peñaranda Ortega, sworn English translator";

export default function Page() {
  return (
    <main>
      {/* HERO — text on the left; on the right Elena's photo once there is
          one (content/site.js → HERO_PHOTO) and, until then, the brand photo
          of the hand signing with the seal, with the appointment line below */}
      <section className="mx-auto max-w-6xl px-4 pb-14 pt-10 md:pb-20 md:pt-16">
        <div
          className={`grid items-center gap-8 md:gap-12 ${
            HERO_PHOTO ? "md:grid-cols-[1.15fr,0.85fr]" : "md:grid-cols-2"
          }`}
        >
          <div>
            <h1 className="font-display text-balance text-display font-semibold text-slate-900">
              {HERO_H1.en}
            </h1>
            <p className="mt-5 max-w-[60ch] text-xl text-slate-700">
              {HERO_SUB.en}
            </p>
            <p className="mt-4 max-w-[68ch] text-base text-slate-600">
              Officially valid sworn Spanish-English translation. The whole
              process is digital: you send me a scan of the document, pay by
              card from any country and receive the signed PDF. I also provide{" "}
              <a href="/en/certified-translation-uscis" className="link">
                certified translations for USCIS
              </a>
              .
            </p>

            <div className="mt-7">
              <TrackedLink
                label="hero_quote_en"
                href="#calculadora"
                className="btn btn-gold"
              >
                Get a quote in 2 hours
              </TrackedLink>
              <QuotePromise locale="en" className="mt-3 max-w-[60ch]" />
              <TrackedLink
                label="hero_whatsapp_en"
                href={WHATSAPP_URL_EN}
                target="_blank"
                rel="noopener noreferrer"
                className="link-nav mt-4 inline-flex min-h-[44px] items-center gap-2 font-medium text-brand-navy"
              >
                <IconWhatsApp className="h-5 w-5 text-brand-gold-700" />
                Message Elena on WhatsApp
              </TrackedLink>
            </div>
            <p className="mt-3 text-sm text-slate-600">
              If an authority rejects it because of my mistake, I fix it free.
            </p>
          </div>

          <figure>
            {HERO_PHOTO ? (
              <div className="relative mx-auto aspect-[4/5] w-full max-w-[380px] overflow-hidden rounded-xl shadow-lg">
                <Image
                  src={HERO_PHOTO}
                  alt={PHOTO_ALT}
                  fill
                  priority
                  sizes="(min-width: 768px) 380px, 100vw"
                  className="object-cover"
                />
                <HeroSeal className="absolute -bottom-2 -left-2 h-24 w-24" />
              </div>
            ) : (
              <div className="relative">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-lg">
                  <Image
                    src="/fotos/hero-firma.jpg"
                    alt="Hand signing a sworn translation with a pen on the document"
                    fill
                    priority
                    sizes="(min-width: 768px) 560px, 100vw"
                    className="object-cover"
                  />
                </div>
                <HeroSeal className="absolute -bottom-6 -left-4 h-32 w-32 md:-left-8 md:h-40 md:w-40" />
              </div>
            )}
            <figcaption
              className={`text-sm text-slate-600 ${
                HERO_PHOTO ? "mx-auto mt-4 max-w-[380px]" : "mt-9"
              }`}
            >
              {PERSON_NAME} · Sworn Translator-Interpreter of English ·{" "}
              <a
                href={MAEC_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="link whitespace-nowrap"
                aria-label="MAEC no. 7310: check the appointment on the Ministry's official register (opens in a new tab)"
              >
                MAEC no. {MAEC_NUMBER}
              </a>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* TRUST STRIP — four facts, no icons, no cards */}
      <TrustStrip locale="en" />

      {/* QUICK DOCUMENTS — six entries, 3×2 grid, no cards */}
      <section
        className="mx-auto max-w-6xl px-4 py-16 md:py-20"
        data-track-section="tramites_rapidos"
      >
        <SectionHeading>
          Quick documents: fixed price and same-day delivery
        </SectionHeading>
        <p className="mt-3 max-w-[68ch] text-slate-600">
          The documents I translate most often, with prices from and
          turnaround. Each has its own page with requirements, apostille and
          examples.
        </p>
        <ul className="mt-8 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
          {QUICK_DOCUMENTS.map((doc) => (
            <li
              key={doc.name}
              className="border-t border-stone-200 py-5"
            >
              <h3 className="font-medium text-slate-900">{doc.name}</h3>
              <p className="mt-1 text-sm text-slate-600">
                {doc.price != null ? (
                  <>
                    <span className="font-semibold tabular-nums text-slate-900">
                      from €{doc.price}
                    </span>{" "}
                    · same day
                  </>
                ) : (
                  <>
                    {doc.detail}{" "}
                    <span className="font-semibold text-slate-900">
                      fixed price within 2 hours
                    </span>
                  </>
                )}
              </p>
              <a href={doc.href} className="link mt-2 inline-block py-1">
                {doc.cta(doc.price)}
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-6">
          <a href="/en/documentos" className="link">
            See all documents →
          </a>
        </p>
        <p className="mt-4 text-sm text-slate-500">
          Document guides are currently in Spanish; quotes and the whole
          service are available in English. Prices are in euros and charged
          in euros to any international card.
        </p>
      </section>

      {/* CALCULATOR — same component; moved down */}
      <QuoteCalculator locale="en" className="!pt-0" />

      {/* WHY WORK DIRECTLY WITH ELENA — three blocks, text only */}
      <section className="bg-stone-50" data-track-section="por_que_elena">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <SectionHeading>Why work directly with Elena</SectionHeading>
          <dl className="mt-8 grid gap-8 md:grid-cols-3 md:gap-10">
            {WHY_ELENA.map((w) => (
              <div key={w.t} className="border-t border-brand-gold-500 pt-4">
                <dt className="text-lg font-semibold text-slate-900">{w.t}</dt>
                <dd className="mt-2 text-slate-600">{w.d}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-10 max-w-[68ch] text-slate-700">
            I&apos;m {PERSON_NAME}, a sworn translator-interpreter of English
            appointed by Spain&apos;s Ministry of Foreign Affairs in {SINCE}{" "}
            (no. {MAEC_NUMBER}; you can check it on{" "}
            <a
              href={MAEC_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              the Ministry&apos;s official register
            </a>
            ). I translate, sign and stamp every document myself; nothing is
            passed on to anyone. When you write to me, I am the one who
            answers: on WhatsApp or by email, 9:00 to 20:00 Madrid time. You
            get the price and the deadline in writing before I charge you
            anything, and if an authority rejects the translation because of
            my mistake, I fix it free. Since {SINCE} I have been translating
            the documents people rebuild their lives with: birth certificates,
            criminal record checks, degrees, visas. I treat them as what they
            are to you, a procedure that cannot fail.
          </p>
        </div>
      </section>

      {/* HOW IT WORKS — three numbered steps, no icons */}
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
                t: "Send the document",
                d: "Scanned or photographed, through the calculator, on WhatsApp or by email. PDF, JPG, PNG or HEIC all work.",
              },
              {
                t: "Get the price and deadline in writing within 2 hours",
                d: "With the link to pay by card or Apple Pay. Nothing is charged until you approve it.",
              },
              {
                t: "Receive the signed PDF",
                d: `Same day up to ${SAME_DAY_MAX_PAGES} pages. If you need paper, I send it by courier.`,
              },
            ]}
          />
        </div>
      </section>

      {/* PRICE PER DOCUMENT + DIRECT VS AGENCY TABLE (Fase A) */}
      <PricePerDocument locale="en" />

      {/* REVIEWS — four reviews from content/reviews.js, with procedure and month */}
      <Reviews locale="en" className="!bg-white" />

      {/* US VISA APPLICANTS (17/10/2026) — same style as the nomad section */}
      <section
        id="us-visas"
        data-track-section="portada_visados_us"
        className="bg-stone-50"
      >
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <div className="max-w-[68ch]">
            <SectionHeading>Applying for a Spanish visa from the United States?</SectionHeading>
            <p className="mt-4 text-slate-600">
              I translate your FBI background check (Identity History Summary)
              with its US Department of State apostille, birth and marriage
              certificates and medical certificates for Spain&apos;s
              non-lucrative, student and digital nomad visas. It is a sworn
              translation by a translator appointed by Spain&apos;s Foreign
              Ministry (no. {MAEC_NUMBER}), accepted by Spanish consulates in the
              United States. You get a signed PDF the same day if your documents
              reach me before {SAME_DAY_CUTOFF.en} Madrid time, a paper copy by
              courier if your consulate asks for one, and you pay with your US
              card.
            </p>
            <ul className="mt-6 grid gap-2 text-slate-700">
              {US_VISA_PRICES.map((p) => (
                <li key={p.label} className="flex gap-3">
                  <span
                    className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-gold-500"
                    aria-hidden="true"
                  />
                  <span>
                    {p.label}:{" "}
                    <span className="font-semibold tabular-nums text-slate-900">
                      {p.price}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
            <ul className="mt-6 grid gap-1">
              {US_VISA_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="link inline-block py-1">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap gap-3">
              <TrackedLink
                label="us_visas_whatsapp_en"
                href={WHATSAPP_US_VISA}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                WhatsApp
              </TrackedLink>
              <TrackedLink
                label="us_visas_quote_en"
                href="#calculadora"
                className="btn btn-secondary"
              >
                Get a quote online
              </TrackedLink>
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

      {/* LARGE PROJECTS, SHORT DEADLINES */}
      <section>
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

      {/* ABOUT ME — short: the full biography lives in /en/about */}
      <section className="bg-stone-50">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <div className="grid items-center gap-8 md:grid-cols-[auto,1fr]">
            {HERO_PHOTO ? (
              <Image
                src={HERO_PHOTO}
                alt={PHOTO_ALT}
                width={112}
                height={112}
                className="mx-auto h-28 w-28 rounded-xl object-cover md:mx-0"
              />
            ) : (
              <div
                className="mx-auto flex h-28 w-28 shrink-0 items-center justify-center rounded-xl bg-stone-100 font-display text-3xl font-semibold tracking-tight text-brand-navy md:mx-0"
                aria-hidden="true"
              >
                E.P.
              </div>
            )}
            <div>
              <SectionHeading>About me</SectionHeading>
              <p className="mt-4 max-w-[68ch] text-lg text-slate-600">
                I&apos;m <strong className="text-brand-navy">{PERSON_NAME}</strong>,
                a Sworn Translator-Interpreter for English appointed by the
                Spanish Ministry of Foreign Affairs, European Union and
                Cooperation under{" "}
                <a
                  href={MAEC_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link"
                >
                  accreditation no. {MAEC_NUMBER}
                </a>{" "}
                since {SINCE}. I also provide certified translations for USCIS
                and work with clients in the United States, India, the United
                Kingdom, Ireland, Canada and Australia through the same digital
                process. {TIMEZONE_NOTE.en}.
              </p>
              <p className="mt-4">
                <a href="/en/about" className="link">
                  Read my story →
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ + JSON-LD */}
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-16" data-track-section="faq">
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
              <p className="mt-2 max-w-[68ch] text-sm text-slate-600">
                {f.a}
                {f.link ? (
                  <>
                    {" "}
                    <a href={f.link.href} className="link">
                      {f.link.label}
                    </a>
                  </>
                ) : null}
              </p>
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

      {/* CLOSING */}
      <section className="mx-auto max-w-6xl px-4 pb-16 md:pb-20">
        <div
          data-surface="navy"
          className="rounded-xl bg-brand-navy p-8 text-white md:p-12"
        >
          <div className="grid items-center gap-8 md:grid-cols-[1.2fr,0.8fr]">
            <div>
              <SectionHeading light>
                Send me your document and you have your deadline today
              </SectionHeading>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                <TrackedLink
                  label="cta_quote_final_en"
                  href="#calculadora"
                  className="btn btn-gold"
                >
                  Get a quote in 2 hours
                </TrackedLink>
                <TrackedLink
                  label="cta_whatsapp_final_en"
                  href={WHATSAPP_URL_EN}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-nav inline-flex min-h-[44px] items-center gap-2 font-medium text-white"
                >
                  <IconWhatsApp className="h-5 w-5 text-brand-gold-300" />
                  Message Elena on WhatsApp
                </TrackedLink>
              </div>
              <QuotePromise locale="en" light className="mt-4 max-w-[60ch]" />
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

      {/* FOLLOW US */}
      <FollowUs locale="en" />
    </main>
  );
}
