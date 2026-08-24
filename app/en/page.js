// app/en/page.js
import Image from "next/image";
import TrackedLink from "../components/TrackedLink";
import { IconCheck, IconClock, IconSend } from "../components/Icons";

export const metadata = {
  title: "Sworn Spanish Translator — Certified Translations for Spain",
  description:
    "Certified sworn translation Spanish ⇆ English for your procedures in Spain: residency, university admissions, property, marriage. 24/48h digital delivery worldwide.",
  alternates: {
    canonical: "https://juradaexpress.es/en",
    languages: {
      es: "https://juradaexpress.es/",
      en: "https://juradaexpress.es/en",
      "x-default": "https://juradaexpress.es/",
    },
  },
  openGraph: {
    title: "Sworn Spanish Translator — Certified Translations for Spain",
    description:
      "Certified sworn translator for Spanish official procedures. 24/48h delivery. Digital delivery worldwide.",
    url: "https://juradaexpress.es/en",
    siteName: "JuradaExpress",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://juradaexpress.es/hero-internacional.jpg",
        width: 1920,
        height: 1080,
        alt: "JuradaExpress — Sworn translation Spanish ⇆ English, delivered digitally worldwide",
      },
    ],
  },
};

const Stars = () => (
  <div className="flex gap-0.5 text-brand-gold" aria-label="Rating: 5 out of 5 stars">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279L12 19.771l-7.416 3.642 1.48-8.279L0 9.306l8.332-1.151z" />
      </svg>
    ))}
  </div>
);

const SectionKicker = () => (
  <div className="mb-3 h-1 w-12 rounded-full bg-brand-gold" aria-hidden="true" />
);

const Wave = ({ className = "", flip = false }) => (
  <svg
    className={`${className} ${flip ? "rotate-180" : ""}`}
    viewBox="0 0 1440 100"
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    <path
      d="M0,0 C240,100 480,100 720,50 C960,0 1200,0 1440,50 L1440,100 L0,100 Z"
      fill="currentColor"
      className="text-slate-50"
    />
  </svg>
);

export default function Page() {
  return (
    <main>
      {/* HERO */}
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-12 md:pb-20 md:pt-16">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <h1 className="text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl">
              Sworn <span className="text-brand-navy">Spanish</span>{" "}
              Translation for Your Procedures in Spain
            </h1>
            <p className="mt-5 text-xl text-slate-600">
              Official documents translated and certified for residency,
              university admissions, property purchases, marriage
              registration and more — accepted by Spanish authorities.
            </p>
            <p className="mt-3 text-base text-slate-600">
              Based in Murcia, Spain, I work with clients across the country
              and around the world — the entire process is 100% digital, so
              it doesn't matter where you are.
            </p>

            {/* Badges */}
            <ul className="mt-6 flex flex-wrap gap-3 text-sm text-slate-700">
              <li className="inline-flex items-center gap-2 rounded-full bg-brand-navy-50 px-3 py-1 ring-1 ring-brand-navy-100">
                <IconCheck className="h-4 w-4 text-brand-gold-600" />
                Accepted by Spanish official bodies
              </li>
              <li className="inline-flex items-center gap-2 rounded-full bg-brand-navy-50 px-3 py-1 ring-1 ring-brand-navy-100">
                <IconClock className="h-4 w-4 text-brand-gold-600" />
                24/48h delivery
              </li>
              <li className="inline-flex items-center gap-2 rounded-full bg-brand-navy-50 px-3 py-1 ring-1 ring-brand-navy-100">
                <IconSend className="h-4 w-4 text-brand-gold-600" />
                Digital delivery worldwide
              </li>
            </ul>

            <div className="mt-6 flex flex-wrap gap-3">
              <TrackedLink
                label="hero_quote_en"
                href="mailto:info@juradaexpress.es?subject=Sworn%20translation%20quote%20request"
                className="rounded-xl bg-brand-navy px-5 py-3 text-white hover:bg-brand-navy-700"
              >
                Request a quote
              </TrackedLink>
              <TrackedLink
                label="hero_pricing_en"
                href="/en/precios"
                className="rounded-xl border border-brand-gold-200 bg-white px-5 py-3 text-brand-navy hover:bg-brand-gold-50"
              >
                See pricing
              </TrackedLink>
              <TrackedLink
                label="hero_whatsapp_en"
                href="https://wa.me/34685891214?text=Hi%20JuradaExpress,%20I%27d%20like%20a%20quote%20for%20a%20sworn%20translation"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-brand-gold-200 bg-white px-5 py-3 text-brand-navy hover:bg-brand-gold-50"
              >
                WhatsApp
              </TrackedLink>
            </div>
            <p className="mt-3 text-sm text-slate-500">
              * Projects over 20 pages: we agree on a delivery schedule together.
            </p>
          </div>

          <div className="flex justify-center">
            <figure>
              <img
                src="/hero-internacional.jpg"
                alt="JuradaExpress — Sworn translation Spanish ⇆ English, delivered digitally worldwide"
                className="max-h-80 rounded-2xl shadow object-cover"
              />
            </figure>
          </div>
        </div>
      </section>

      <Wave className="h-8 w-full text-slate-50" />

      {/* SERVICIOS */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <SectionKicker />
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Most commonly translated documents
              </h2>
              <p className="mt-3 max-w-md text-sm text-slate-600">
                Every document has its own translation requirements — here
                are the ones we translate most often.
              </p>
            </div>
            <div className="relative h-56 w-full overflow-hidden rounded-2xl shadow md:h-64">
              <Image
                src="/fotos/foto-documentos.jpg"
                alt="Passport and travel documents on a laptop — sworn document translation"
                fill
                sizes="(min-width: 768px) 480px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              {
                t: "Official certificates",
                d: "Birth, marriage, criminal record, residency, notarial certificates…",
                img: "/docs-real.jpg",
                alt: "Official certificates stacked: birth, marriage and criminal record",
              },
              {
                t: "Academic",
                d: "Degrees, transcripts, study plans, academic reference letters.",
                img: "/academicos.jpg",
                alt: "Academic documents: university degree and transcript",
              },
              {
                t: "Business & legal",
                d: "Contracts, powers of attorney, deeds, company bylaws.",
                img: "/mercantiles.jpg",
                alt: "Signed business contracts and legal documents",
              },
            ].map((i) => (
              <article
                key={i.t}
                className="overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200 hover:shadow"
              >
                <img src={i.img} alt={i.alt} className="h-44 w-full object-cover" />
                <div className="p-5">
                  <h3 className="font-semibold">{i.t}</h3>
                  <p className="mt-2 text-sm text-slate-600">{i.d}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Wave className="h-8 w-full text-slate-50" flip />

      {/* UK / BREXIT */}
      <Wave className="h-8 w-full text-brand-navy-50" />
      <section className="bg-brand-navy-50">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <SectionKicker />
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                British and living in Spain?
              </h2>
              <p className="mt-4 max-w-xl text-slate-600">
                I'll help you get your documents sworn-translated for your
                NIE, residency card (TIE), padrón registration, buying a
                property, or any other paperwork since Brexit. Everything
                done properly and on time, so you can focus on settling in.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <TrackedLink
                  label="uk_quote_en"
                  href="mailto:info@juradaexpress.es?subject=Sworn%20translation%20quote%20-%20UK"
                  className="rounded-xl bg-brand-navy px-5 py-3 text-white hover:bg-brand-navy-700"
                >
                  Request a quote
                </TrackedLink>
                <TrackedLink
                  label="uk_whatsapp_en"
                  href="https://wa.me/34685891214?text=Hi%20JuradaExpress,%20I%27m%20British%20and%20need%20a%20sworn%20translation%20for%20a%20procedure%20in%20Spain"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-brand-gold-200 bg-white px-5 py-3 text-brand-navy hover:bg-brand-gold-50"
                >
                  WhatsApp
                </TrackedLink>
              </div>
            </div>
            <div className="relative h-56 w-full overflow-hidden rounded-2xl shadow md:h-72">
              <Image
                src="/fotos/foto-bandera-uk.jpg"
                alt="Union Jack flag — sworn translation for British nationals living in Spain"
                fill
                sizes="(min-width: 768px) 480px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      <Wave className="h-8 w-full text-brand-navy-50" flip />

      {/* ACEPTADO POR */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <SectionKicker />
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Accepted by…</h2>
        <p className="mt-3 max-w-3xl text-sm text-slate-600">
          Sworn translations signed and stamped by an officially appointed
          sworn translator, legally valid before Spanish official bodies
          (e.g. Ministries, Universities, Immigration Offices, Civil
          Registries, Notaries, Town Halls, Spanish Consulates abroad, etc.).
        </p>
        <ul className="mt-5 flex flex-wrap gap-2 text-sm text-slate-700">
          {[
            "Ministries and Town Halls",
            "Universities and academic institutions",
            "Civil registries and notaries",
            "Consulates and embassies",
          ].map((txt) => (
            <li
              key={txt}
              className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1 ring-1 ring-slate-200"
            >
              <IconCheck className="h-4 w-4 text-brand-gold-600" />
              {txt}
            </li>
          ))}
        </ul>
      </section>

      <Wave className="h-8 w-full text-brand-navy-50" />

      {/* VENTAJAS */}
      <section className="bg-brand-navy-50">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <SectionKicker />
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Why choose JuradaExpress
          </h2>
          <ul className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              "Sworn translation, legally valid before Spanish official bodies.",
              "Fast 24/48h delivery. Digital delivery anywhere in the world.",
              "Direct communication by email and WhatsApp. Instant quote.",
            ].map((li) => (
              <li key={li} className="rounded-2xl bg-white p-5 ring-1 ring-brand-navy-100">
                {li}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Wave className="h-8 w-full text-brand-navy-50" flip />

      {/* PROCESO */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <SectionKicker />
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">How it works</h2>
            <p className="mt-3 max-w-md text-sm text-slate-600">
              The whole process is 100% digital: whether you're in Spain or
              anywhere else in the world, sending your documents, getting
              your quote and receiving your translation works exactly the
              same way.
            </p>
          </div>
          <div className="relative h-56 w-full overflow-hidden rounded-2xl shadow md:h-64">
            <Image
              src="/fotos/foto-online.jpg"
              alt="Open laptop on a desk — the entire process is handled online"
              fill
              sizes="(min-width: 768px) 480px, 100vw"
              className="object-cover"
            />
          </div>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-4">
          {[
            { t: "1. Send", d: "Send us a scan or photo of your document by email or WhatsApp." },
            { t: "2. Quote", d: "We give you a fixed price and a real delivery time." },
            { t: "3. Sworn translation", d: "Signed and stamped by an officially appointed sworn translator." },
            { t: "4. 24/48h delivery", d: "Digital and/or paper copy, shipped to your address." },
          ].map((i) => (
            <div key={i.t} className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
              <h3 className="font-semibold">{i.t}</h3>
              <p className="mt-2 text-sm text-slate-600">{i.d}</p>
            </div>
          ))}
        </div>
      </section>

      <Wave className="h-8 w-full text-slate-50" />

      {/* SOBRE MÍ */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <div className="grid items-center gap-8 md:grid-cols-[auto,1fr]">
          <div className="mx-auto flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-brand-navy-50 text-2xl font-bold text-brand-navy ring-4 ring-brand-gold-100 md:mx-0">
            EP
          </div>
          <div>
            <SectionKicker />
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">About me</h2>
            <p className="mt-4 max-w-2xl text-lg text-slate-600">
              I'm <strong className="text-brand-navy">Elena Peñaranda Ortega</strong>,
              a Sworn Translator-Interpreter for English appointed by the
              Spanish Ministry of Foreign Affairs, European Union and
              Cooperation (Accreditation No. 7310). I personally translate,
              sign and stamp every sworn translation, guaranteeing its
              validity before any official body in Spain.
            </p>
          </div>
        </div>
      </section>

      <Wave className="h-8 w-full text-slate-50" flip />

      {/* OPINIONES */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:py-20 bg-slate-50">
        <SectionKicker />
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Reviews</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            {
              n: "María G.",
              t: "Fast and professional. They sent me the digital version and then the paper copy.",
            },
            {
              n: "Javier R.",
              t: "Great communication and fair price. I'll use them again if I need to.",
            },
            { n: "Elisa P.", t: "I needed it urgently and they met the deadline without any issue." },
          ].map((op) => (
            <blockquote key={op.n} className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
              <Stars />
              <p className="mt-3">“{op.t}”</p>
              <footer className="mt-3 text-sm text-slate-600">— {op.n}</footer>
            </blockquote>
          ))}
        </div>
        <p className="mt-6 text-sm text-slate-500">
          Verified customer reviews ·{" "}
          <a
            href="https://g.page/r/PLACEHOLDER"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-brand-gold-700"
          >
            See all on Google Business
          </a>
        </p>
      </section>

      {/* CTA FINAL */}
      <section className="mx-auto max-w-6xl px-4 pb-16 md:pb-20">
        <div className="rounded-2xl bg-brand-navy p-8 text-white md:p-12">
          <div className="grid items-center gap-8 md:grid-cols-[1.2fr,0.8fr]">
            <div>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Shall we get started?</h2>
              <p className="mt-2 text-brand-navy-100">
                Send us your document and we'll reply with a quote and delivery time.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <TrackedLink
                  label="cta_quote_final_en"
                  href="mailto:info@juradaexpress.es?subject=Sworn%20translation%20quote%20request"
                  className="rounded-xl bg-white px-5 py-3 text-brand-navy hover:bg-brand-gold-50"
                >
                  Request a quote
                </TrackedLink>
                <TrackedLink
                  label="cta_pricing_final_en"
                  href="/en/precios"
                  className="rounded-xl border border-brand-gold-300/60 px-5 py-3 text-white hover:bg-white/10"
                >
                  See pricing
                </TrackedLink>
              </div>
            </div>
            <div className="relative h-48 w-full overflow-hidden rounded-2xl shadow-lg md:h-56">
              <Image
                src="/fotos/foto-firma.jpg"
                alt="Signing a document with a pen — sworn translation, signed and stamped"
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
        <SectionKicker />
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Frequently asked questions</h2>
        <div className="mt-8 divide-y rounded-2xl ring-1 ring-slate-200 bg-white">
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
            <details key={idx} className="p-5">
              <summary className="cursor-pointer font-medium">{f.q}</summary>
              <p className="mt-2 text-sm text-slate-600">{f.a}</p>
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
    </main>
  );
}
