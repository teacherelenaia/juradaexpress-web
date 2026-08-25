// app/en/documentos/page.js
export const metadata = {
  title: "Documents We Translate — Sworn Spanish Translator",
  description:
    "Sworn translation of birth certificates, degrees, criminal record certificates, contracts and more for your procedures in Spain. Clear pricing, quote in under 2 hours.",
  alternates: {
    canonical: "https://juradaexpress.es/en/documentos",
    languages: {
      es: "https://juradaexpress.es/documentos",
      en: "https://juradaexpress.es/en/documentos",
      "x-default": "https://juradaexpress.es/documentos",
    },
  },
};

const categories = [
  {
    t: "Certificates",
    d: "Birth, marriage, criminal record, residency and civil registry certificates.",
  },
  {
    t: "Academic documents",
    d: "University degrees, academic transcripts, study plans, reference letters — often needed for degree recognition or university admission.",
  },
  {
    t: "Immigration & residency",
    d: "Documents required for Spanish residency, family reunification or other immigration procedures (\"trámites de extranjería\").",
  },
  {
    t: "Property & notarial",
    d: "Contracts, powers of attorney, deeds and other documents for buying property or signing before a Spanish notary.",
  },
  {
    t: "Civil status",
    d: "Documents needed to get married in Spain or register a marriage that took place abroad.",
  },
  {
    t: "Business & corporate",
    d: "Company bylaws, commercial contracts and other corporate documents for use before Spanish authorities.",
  },
];

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 md:py-16">
      <h1 className="font-display text-balance text-4xl font-semibold leading-tight tracking-[-0.02em] text-slate-900 md:text-5xl">
        Documents we translate
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-slate-600">
        Sworn translation Spanish ⇆ English for official procedures in
        Spain — residency, university admissions, property, marriage and
        more. Send us your document and we'll confirm the exact scope,
        price and delivery time.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {categories.map((c) => (
          <div key={c.t} className="rounded-xl bg-white p-5 ring-1 ring-stone-200">
            <h2 className="text-2xl font-semibold leading-snug text-brand-navy md:text-3xl">{c.t}</h2>
            <p className="mt-2 text-sm text-slate-600">{c.d}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <a
          href="mailto:info@juradaexpress.es?subject=Sworn%20translation%20quote%20request"
          className="btn btn-primary"
        >
          Request a quote by email
        </a>
        <a
          href="https://wa.me/34685891214?text=Hi%20JuradaExpress,%20I%27d%20like%20a%20quote%20for%20a%20sworn%20translation"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary"
        >
          WhatsApp
        </a>
      </div>

      <p className="mt-6 text-sm text-slate-500">
        Prefer to pick your documents and pay online straight away? Our full
        interactive catalog is available at{" "}
        <a href="/documentos" className="link">
          juradaexpress.es/documentos
        </a>{" "}
        (currently in Spanish only).
      </p>
    </main>
  );
}
