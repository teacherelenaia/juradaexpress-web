// app/en/preguntas-frecuentes/page.js
export const metadata = {
  title: "FAQ — Sworn Spanish Translator",
  description:
    "Answers about sworn translation for Spain: validity, turnaround, pricing, delivery and accepted documents.",
  alternates: {
    canonical: "https://juradaexpress.es/en/preguntas-frecuentes",
    languages: {
      es: "https://juradaexpress.es/preguntas-frecuentes",
      en: "https://juradaexpress.es/en/preguntas-frecuentes",
      "x-default": "https://juradaexpress.es/preguntas-frecuentes",
    },
  },
};

const faqs = [
  {
    q: "Is a sworn translation valid throughout Spain?",
    a: "Yes. Sworn translations signed and stamped by a sworn translator officially appointed by the Spanish Ministry of Foreign Affairs are valid before official bodies anywhere in Spain.",
  },
  {
    q: "I live outside Spain — can I still use this service?",
    a: "Yes. The whole process is digital: you send a scan of your document, we deliver a signed PDF (and a paper copy by post if you need one), and it doesn't matter which country you're in.",
  },
  {
    q: "Do you deliver on paper and digitally?",
    a: "Yes. We deliver a digitally signed PDF and, if you need it, a physical copy shipped to your address — anywhere in the world.",
  },
  {
    q: "Can I get my translation in 24/48h?",
    a: "For standard documents, yes. For documents over 20 pages, we agree on a specific delivery schedule.",
  },
  {
    q: "Which documents can be sworn-translated?",
    a: "Birth, marriage and criminal record certificates, degrees and academic transcripts, contracts, powers of attorney, company bylaws and other official or commercial documents.",
  },
  {
    q: "How much does a sworn translation cost?",
    a: "The price depends on the length and complexity of the document. Check our indicative pricing or request a fixed quote by sending us your document.",
  },
  {
    q: "How do I send you the document?",
    a: "Send us a clear scan or photo by email or WhatsApp, along with the source and target language and what you'll use the translation for.",
  },
  {
    q: "Does the sworn translation include a signature and stamp?",
    a: "Yes. Every sworn translation is signed and stamped by a sworn translator appointed by the Spanish Ministry of Foreign Affairs, which gives it official validity.",
  },
];

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold">Frequently asked questions</h1>
      <p className="mt-3 max-w-2xl text-slate-600">
        Answers to the most common questions about sworn translation for
        procedures in Spain. Can't find what you're looking for?{" "}
        <a href="/en/contacto" className="underline hover:text-brand-gold-700">
          Get in touch
        </a>
        .
      </p>

      <div className="mt-8 divide-y rounded-2xl ring-1 ring-slate-200 bg-white">
        {faqs.map((f, idx) => (
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
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: {
                "@type": "Answer",
                text: f.a,
              },
            })),
          }),
        }}
      />
    </main>
  );
}
