// app/en/privacy-policy/page.js
export const metadata = {
  title: "Privacy Policy",
  description:
    "How juradaexpress.es handles your personal data: controller, purposes, legal basis, recipients, retention periods and how to exercise your GDPR rights.",
  alternates: {
    canonical: "https://juradaexpress.es/en/privacy-policy",
    languages: {
      es: "https://juradaexpress.es/politica-privacidad",
      en: "https://juradaexpress.es/en/privacy-policy",
      "x-default": "https://juradaexpress.es/politica-privacidad",
    },
  },
};

const H2 =
  "mt-10 font-display text-2xl font-semibold leading-snug text-slate-900";

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 md:py-16">
      <h1 className="font-display text-balance text-3xl font-semibold leading-tight tracking-[-0.02em] text-slate-900 md:text-4xl">
        Privacy policy
      </h1>
      <p className="mt-4 max-w-[68ch] text-slate-600">
        This policy explains how personal data is handled on
        juradaexpress.es, under Regulation (EU) 2016/679 (GDPR) and Spanish
        Organic Law 3/2018 (LOPDGDD).
      </p>

      <h2 className={H2}>Data controller</h2>
      <p className="mt-3 max-w-[68ch] text-slate-600">
        Elena Peñaranda Ortega, Tax ID 48399700H,
        address Carril de los Leales, 10, C.P. 30009, La Arboleja, Murcia (Spain). Email:{" "}
        <a href="mailto:info@juradaexpress.es" className="link">
          info@juradaexpress.es
        </a>
        . Phone: +34 685 891 214.
      </p>

      <h2 className={H2}>What data is collected and why</h2>
      <ul className="mt-3 max-w-[68ch] list-disc space-y-2 pl-6 text-slate-600">
        <li>
          <strong className="text-slate-900">Catalogue form and contact by
          email or WhatsApp:</strong>{" "}
          your name, email, phone number and the documents you want
          translated. Purpose: preparing your quote, replying to you and — if
          you place an order — delivering and invoicing the service.
        </li>
        <li>
          <strong className="text-slate-900">Documents you send for
          translation:</strong>{" "}
          they may contain personal data, including special categories. They
          are used solely to produce the sworn translation and handled in
          strict confidence, as the profession's code of conduct requires.
        </li>
        <li>
          <strong className="text-slate-900">Online payment (Stripe):</strong>{" "}
          your card details are processed directly by Stripe; this site never
          receives or stores them.
        </li>
        <li>
          <strong className="text-slate-900">Analytics (Google
          Analytics):</strong>{" "}
          only if you accept cookies; with IP anonymisation. See the{" "}
          <a href="/en/cookie-policy" className="link">
            cookie policy
          </a>
          .
        </li>
      </ul>

      <h2 className={H2}>Legal basis</h2>
      <p className="mt-3 max-w-[68ch] text-slate-600">
        Pre-contractual steps and performance of the assignment (art. 6.1.b
        GDPR) for quotes and translations; compliance with legal, tax and
        accounting obligations (art. 6.1.c); and your consent (art. 6.1.a)
        for analytics cookies.
      </p>

      <h2 className={H2}>Recipients</h2>
      <p className="mt-3 max-w-[68ch] text-slate-600">
        Data is not shared with third parties except where legally required.
        The following providers act as processors: Web3Forms (form
        delivery), Stripe (payments), Vercel (hosting) and Google (analytics,
        only with consent). Some of these providers are based in the United
        States and operate under the EU-US Data Privacy Framework or standard
        contractual clauses.
      </p>

      <h2 className={H2}>Retention</h2>
      <p className="mt-3 max-w-[68ch] text-slate-600">
        Quote requests that don't become orders are kept for a maximum of
        one year. Documentation for completed assignments is kept for the
        periods required by tax law and by a sworn translator's professional
        obligations, and then securely deleted.
      </p>

      <h2 className={H2}>Your rights</h2>
      <p className="mt-3 max-w-[68ch] text-slate-600">
        You can exercise your rights of access, rectification, erasure,
        objection, restriction and portability by writing to{" "}
        <a href="mailto:info@juradaexpress.es" className="link">
          info@juradaexpress.es
        </a>{" "}
        with a copy of your ID. If you believe your data is being mishandled,
        you can complain to the Spanish Data Protection Agency (
        <a
          href="https://www.aepd.es"
          target="_blank"
          rel="noopener noreferrer"
          className="link"
        >
          aepd.es
        </a>
        ).
      </p>

      <p className="mt-8 text-sm text-slate-500">Last reviewed: August 2026.</p>
    </main>
  );
}
