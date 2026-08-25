// app/en/page.js
import Image from "next/image";
import TrackedLink from "../components/TrackedLink";
import { SectionHeading, Card } from "../components/ui";
import Reviews from "../components/Reviews";
import { IconCheck, IconClock, IconSend } from "../components/Icons";

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
        url: "https://juradaexpress.es/hero-internacional.jpg",
        width: 1920,
        height: 1080,
        alt: "JuradaExpress — Sworn translation Spanish ⇆ English, delivered digitally worldwide",
      },
    ],
  },
};

export default function Page() {
  return (
    <main>
      {/* HERO */}
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-12 md:pb-20 md:pt-16">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <h1 className="font-display text-balance text-display font-semibold text-slate-900">
              Sworn Spanish ⇆ English translation, officially valid, in 24/48
              hours
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
              <li className="inline-flex items-center gap-2 rounded-full bg-stone-50 px-3 py-1 ring-1 ring-stone-200">
                <IconCheck className="h-4 w-4 text-brand-gold-700" />
                Accepted by Spanish official bodies
              </li>
              <li className="inline-flex items-center gap-2 rounded-full bg-stone-50 px-3 py-1 ring-1 ring-stone-200">
                <IconClock className="h-4 w-4 text-brand-gold-700" />
                24/48h delivery
              </li>
              <li className="inline-flex items-center gap-2 rounded-full bg-stone-50 px-3 py-1 ring-1 ring-stone-200">
                <IconSend className="h-4 w-4 text-brand-gold-700" />
                Digital delivery worldwide
              </li>
            </ul>

            <div className="mt-6 flex flex-wrap gap-3">
              <TrackedLink
                label="hero_quote_en"
                href="mailto:info@juradaexpress.es?subject=Sworn%20translation%20quote%20request"
                className="btn btn-primary"
              >
                Request a quote
              </TrackedLink>
              <TrackedLink
                label="hero_pricing_en"
                href="/en/precios"
                className="btn btn-secondary"
              >
                See pricing
              </TrackedLink>
              <TrackedLink
                label="hero_whatsapp_en"
                href="https://wa.me/34685891214?text=Hi%20JuradaExpress,%20I%27d%20like%20a%20quote%20for%20a%20sworn%20translation"
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

          <div className="flex justify-center">
            <figure>
              <img
                src="/hero-internacional.jpg"
                alt="JuradaExpress — Sworn translation Spanish ⇆ English, delivered digitally worldwide"
                className="max-h-80 rounded-xl shadow object-cover"
              />
            </figure>
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section className="bg-stone-50">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <SectionHeading>
                Most commonly translated documents
              </SectionHeading>
              <p className="mt-3 max-w-md text-sm text-slate-600">
                Every document has its own translation requirements — here
                are the ones we translate most often.
              </p>
            </div>
            <div className="relative h-56 w-full overflow-hidden rounded-xl shadow md:h-64">
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
                className="overflow-hidden rounded-xl bg-white ring-1 ring-stone-200"
              >
                <img src={i.img} alt={i.alt} className="h-44 w-full object-cover" />
                <div className="p-5">
                  <h3 className="text-xl font-semibold leading-snug text-slate-900 md:text-2xl">
                    {i.t}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">{i.d}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* UK / BREXIT */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <SectionHeading>
              British and living in Spain?
            </SectionHeading>
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
                className="btn btn-primary"
              >
                Request a quote
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

      {/* ACEPTADO POR */}
      <section className="bg-stone-50">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <SectionHeading>
            Accepted by…
          </SectionHeading>
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
                className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 ring-1 ring-stone-200"
              >
                <IconCheck className="h-4 w-4 text-brand-gold-700" />
                {txt}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* VENTAJAS */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <SectionHeading>
          Why choose JuradaExpress
        </SectionHeading>
        <ul className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            "Sworn translation, legally valid before Spanish official bodies.",
            "Fast 24/48h delivery. Digital delivery anywhere in the world.",
            "Direct communication by email and WhatsApp. Instant quote.",
          ].map((li) => (
            <Card as="li" key={li} className="p-5 text-slate-700">
              {li}
            </Card>
          ))}
        </ul>
      </section>

      {/* PROCESO */}
      <section className="bg-stone-50">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <SectionHeading>
                How it works
              </SectionHeading>
              <p className="mt-3 max-w-md text-sm text-slate-600">
                The whole process is 100% digital: whether you're in Spain or
                anywhere else in the world, sending your documents, getting
                your quote and receiving your translation works exactly the
                same way.
              </p>
            </div>
            <div className="relative h-56 w-full overflow-hidden rounded-xl shadow md:h-64">
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
              <Card key={i.t} className="p-5">
                <h3 className="text-xl font-semibold leading-snug text-slate-900 md:text-2xl">
                  {i.t}
                </h3>
                <p className="mt-2 text-sm text-slate-600">{i.d}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SOBRE MÍ */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <div className="grid items-center gap-8 md:grid-cols-[auto,1fr]">
          <div
            className="mx-auto flex h-24 w-24 shrink-0 items-center justify-center rounded-xl bg-stone-100 text-2xl font-semibold tracking-tight text-brand-navy md:mx-0"
            aria-hidden="true"
          >
            E.P.
          </div>
          <div>
            <SectionHeading>
              About me
            </SectionHeading>
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

      {/* OPINIONES — only rendered when content/reviews.js holds real reviews */}
      <Reviews locale="en" />

      {/* CTA FINAL */}
      <section className="mx-auto max-w-6xl px-4 pb-16 md:pb-20">
        <div
          data-surface="navy"
          className="rounded-xl bg-brand-navy p-8 text-white md:p-12"
        >
          <div className="grid items-center gap-8 md:grid-cols-[1.2fr,0.8fr]">
            <div>
              <SectionHeading light>
                Shall we get started?
              </SectionHeading>
              <p className="mt-2 text-brand-navy-100">
                Send us your document and we'll reply with a quote and delivery time.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <TrackedLink
                  label="cta_quote_final_en"
                  href="mailto:info@juradaexpress.es?subject=Sworn%20translation%20quote%20request"
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
        <SectionHeading>
          Frequently asked questions
        </SectionHeading>
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
            <details key={idx} className="p-5">
              <summary className="cursor-pointer font-medium text-slate-900">
                {f.q}
              </summary>
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
