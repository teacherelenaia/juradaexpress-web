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
          are used solely to prepare the quote and produce the sworn
          translation, and handled in strict confidence, as the profession's
          code of conduct requires.
        </li>
        <li>
          <strong className="text-slate-900">Where the documents you upload
          on the website are stored</strong>{" "}
          (“Send documents” page, price calculator and catalogue form): in a
          private folder in the translator's Google Drive, one per
          submission, that only she can access. The folder is not shared
          with anyone and has no public link. If a file goes through Vercel's
          temporary storage (when a direct upload to Drive is not possible),
          that copy is deleted as soon as the file is in Drive or has been
          emailed to the translator, and in any case within 24 hours. When
          you send one or two small documents, they also reach the
          translator's inbox as attachments so the quote can be prepared. To
          prevent abuse, submissions per connection are counted using a
          hashed fingerprint of the IP address (not the IP itself), deleted
          within 48 hours.
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
        delivery), Stripe (payments), Vercel (hosting and temporary file
        storage), Resend (email delivery) and Google (Google Drive, storage
        of the documents you send; and analytics, only with consent). Some of these providers are based in the United
        States and operate under the EU-US Data Privacy Framework or standard
        contractual clauses.
      </p>

      <h2 className={H2}>Retention</h2>
      <p className="mt-3 max-w-[68ch] text-slate-600">
        Quote requests that don't become orders are kept for a maximum of
        one year. Documents you send through the website are stored in
        Google Drive: if they don't become an order, their folder is deleted
        3 months after the submission; if you place an order, they are kept
        for up to 1 year after delivery (in case you need another copy or a
        correction) and then deleted. Invoices and the data required by tax
        law and a sworn translator's professional obligations are kept for
        the legal periods, and then securely deleted.
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

      <p className="mt-8 text-sm text-slate-500">Last reviewed: November 2026.</p>
    </main>
  );
}
