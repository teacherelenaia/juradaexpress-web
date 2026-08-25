// app/en/sworn-translation-british-residents-spain/page.js
import TrackedLink from "../../components/TrackedLink";
import { SectionHeading } from "../../components/ui";
import { DOCUMENTS } from "../../../content/documents";

export const metadata = {
  title: "Sworn translation for British residents in Spain — procedure by procedure",
  description:
    "A practical guide for British nationals in Spain: which documents need a sworn translation for your NIE/TIE, padrón, property purchase, marriage, driving licence exchange and pension. Prices from and real turnaround times.",
  alternates: {
    canonical:
      "https://juradaexpress.es/en/sworn-translation-british-residents-spain",
    languages: {
      es: "https://juradaexpress.es/traduccion-jurada-britanicos-espana",
      en: "https://juradaexpress.es/en/sworn-translation-british-residents-spain",
      "x-default":
        "https://juradaexpress.es/traduccion-jurada-britanicos-espana",
    },
  },
};

const priceOf = (id) => DOCUMENTS.find((d) => d.id === id)?.price ?? null;

const PROCEDURES = [
  {
    title: "NIE and residency card (TIE)",
    docs: "UK criminal record certificate (ACRO), birth certificate and, depending on your case, marriage certificate.",
    apostille:
      "Apostille: yes for the ACRO certificate (immigration offices ask for it); birth and marriage depend on the office — check first, and I'll translate it apostille included.",
    price: priceOf("antecedentes-penales"),
    time: "24/48h",
    href: "/traduccion-jurada-certificado-penales",
  },
  {
    title: "Padrón registration",
    docs: "Usually your passport and rental contract or deeds are enough; some town halls ask for a sworn translation of birth certificates for children.",
    apostille: "Apostille: usually not.",
    price: priceOf("partida-nacimiento"),
    time: "24/48h",
    href: "/traduccion-jurada-partida-nacimiento",
  },
  {
    title: "Buying a property",
    docs: "Powers of attorney, reservation or deposit contracts and UK bank paperwork for the notary.",
    apostille:
      "Apostille: yes for powers of attorney signed before a UK notary; not for private contracts.",
    price: null,
    time: "Depends on length — fixed quote within 2 hours",
    href: "/traduccion-jurada-contrato-escritura",
  },
  {
    title: "Getting married in Spain",
    docs: "Birth certificate and Certificate of No Impediment (CNI); if either of you is divorced, the decree absolute.",
    apostille: "Apostille: yes, on the UK certificates.",
    price: priceOf("partida-nacimiento"),
    time: "24/48h",
    href: "/traduccion-jurada-certificado-matrimonio",
  },
  {
    title: "Driving licence exchange",
    docs: "Under the post-Brexit agreement, the DGT may ask for a sworn translation of your licence or of DVLA certificates.",
    apostille: "Apostille: usually not.",
    price: priceOf("permiso-conducir"),
    time: "24h",
    href: "/en/documentos",
  },
  {
    title: "Pension and Social Security",
    docs: "UK employment records, HMRC or DWP letters and birth certificates for Spanish pension paperwork.",
    apostille: "Apostille: depends on the office — I'll confirm when I see the document.",
    price: priceOf("certificado-empresa"),
    time: "24/48h",
    href: "/en/documentos",
  },
];

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 md:py-16">
      <h1 className="font-display text-balance text-3xl font-semibold leading-tight tracking-[-0.02em] text-slate-900 md:text-4xl">
        Sworn translation for British residents in Spain
      </h1>
      <p className="mt-4 max-w-[68ch] text-lg text-slate-600">
        If you've moved to Spain with British paperwork, sooner or later an
        official body will ask for a sworn translation. This guide goes
        procedure by procedure: which document gets translated, whether it
        needs an apostille, the price from and the usual turnaround. If your
        case isn't here, message me on WhatsApp and I'll confirm straight
        away.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {PROCEDURES.map((t) => (
          <article
            key={t.title}
            className="rounded-xl bg-white p-6 ring-1 ring-stone-200"
          >
            <h2 className="text-xl font-semibold leading-snug text-brand-navy md:text-2xl">
              {t.title}
            </h2>
            <p className="mt-3 text-sm text-slate-600">{t.docs}</p>
            <p className="mt-2 text-sm text-slate-600">{t.apostille}</p>
            <div className="mt-4 flex items-baseline justify-between gap-3 border-t border-stone-200 pt-3 text-sm">
              <span className="font-semibold tabular-nums text-slate-900">
                {t.price != null
                  ? `from €${t.price}`
                  : "fixed quote within 2 hours"}
              </span>
              <span className="text-slate-500">{t.time}</span>
            </div>
            <p className="mt-3">
              <a href={t.href} className="link text-sm">
                More about this document →
              </a>
            </p>
          </article>
        ))}
      </div>

      <div className="mt-12 rounded-xl bg-stone-50 p-6 ring-1 ring-stone-200 md:p-8">
        <SectionHeading as="h2" className="!text-2xl md:!text-3xl">
          Not sure what they'll ask you for?
        </SectionHeading>
        <p className="mt-3 max-w-[68ch] text-slate-600">
          Send me a photo or scan of the document and the name of the
          procedure. I'll tell you whether it needs an apostille, exactly
          what gets translated and the fixed price — within 2 working hours,
          no obligation.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <TrackedLink
            label="british_quote_en"
            href="/en/documentos"
            className="btn btn-primary"
          >
            Request a quote
          </TrackedLink>
          <TrackedLink
            label="british_whatsapp_en"
            href="https://wa.me/34685891214?text=Hi%20JuradaExpress,%20I%27m%20British%20and%20need%20a%20sworn%20translation%20for%20a%20procedure%20in%20Spain"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            WhatsApp
          </TrackedLink>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Service",
                name: "Sworn translation for British residents in Spain",
                serviceType: "Sworn translation Spanish ⇆ English",
                provider: {
                  "@type": "ProfessionalService",
                  name: "JuradaExpress",
                  url: "https://juradaexpress.es/",
                },
                areaServed: [
                  { "@type": "Country", name: "ES" },
                  { "@type": "Country", name: "GB" },
                ],
                availableLanguage: ["es", "en"],
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                    item: "https://juradaexpress.es/en",
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: "Sworn translation for British residents in Spain",
                    item: "https://juradaexpress.es/en/sworn-translation-british-residents-spain",
                  },
                ],
              },
            ],
          }),
        }}
      />
    </main>
  );
}
