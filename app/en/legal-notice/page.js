// app/en/legal-notice/page.js
export const metadata = {
  title: "Legal Notice",
  description:
    "Legal notice for juradaexpress.es: site owner identification, terms of use, intellectual property and applicable law.",
  alternates: {
    canonical: "https://juradaexpress.es/en/legal-notice",
    languages: {
      es: "https://juradaexpress.es/aviso-legal",
      en: "https://juradaexpress.es/en/legal-notice",
      "x-default": "https://juradaexpress.es/aviso-legal",
    },
  },
};

const H2 =
  "mt-10 font-display text-2xl font-semibold leading-snug text-slate-900";

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 md:py-16">
      <h1 className="font-display text-balance text-3xl font-semibold leading-tight tracking-[-0.02em] text-slate-900 md:text-4xl">
        Legal notice
      </h1>
      <p className="mt-4 max-w-[68ch] text-slate-600">
        In compliance with Spanish Law 34/2002 of 11 July on Information
        Society Services and Electronic Commerce (LSSI-CE), the following
        details are provided.
      </p>

      <h2 className={H2}>Site owner</h2>
      <ul className="mt-3 max-w-[68ch] space-y-1 text-slate-600">
        <li>
          <strong className="text-slate-900">Owner:</strong> Elena Peñaranda
          Ortega
        </li>
        <li>
          <strong className="text-slate-900">Tax ID (NIF):</strong>{" "}
          [[COMPLETAR: NIF de la titular]]
        </li>
        <li>
          <strong className="text-slate-900">Address:</strong> [[COMPLETAR:
          dirección fiscal]], Murcia (Spain)
        </li>
        <li>
          <strong className="text-slate-900">Email:</strong>{" "}
          <a href="mailto:info@juradaexpress.es" className="link">
            info@juradaexpress.es
          </a>
        </li>
        <li>
          <strong className="text-slate-900">Phone:</strong>{" "}
          <a href="tel:+34685891214" className="link">
            +34 685 891 214
          </a>
        </li>
        <li>
          <strong className="text-slate-900">Activity:</strong> Sworn
          translation and interpreting of English. Sworn
          Translator-Interpreter appointed by the Spanish Ministry of Foreign
          Affairs, European Union and Cooperation, accreditation no. 7310.
        </li>
      </ul>

      <h2 className={H2}>Terms of use</h2>
      <p className="mt-3 max-w-[68ch] text-slate-600">
        Access to juradaexpress.es is free of charge and implies acceptance
        of these terms. You agree to use the site and its contents properly
        and not for unlawful purposes. Prices shown are indicative: the final
        quote is always confirmed in writing before you place an order.
      </p>

      <h2 className={H2}>Intellectual property</h2>
      <p className="mt-3 max-w-[68ch] text-slate-600">
        The contents of this site (texts, brand, logo and structure) belong
        to Elena Peñaranda Ortega or are used under licence from their
        authors. Commercial reproduction or distribution without express
        permission is not allowed. Stock photographs are used under their
        platform's licence.
      </p>

      <h2 className={H2}>Liability</h2>
      <p className="mt-3 max-w-[68ch] text-slate-600">
        The owner is not responsible for misuse of this site's contents or
        for the contents of linked third-party sites. Information about
        administrative procedures is provided for guidance only: the final
        say always rests with the office handling your file.
      </p>

      <h2 className={H2}>Applicable law</h2>
      <p className="mt-3 max-w-[68ch] text-slate-600">
        These terms are governed by Spanish law. Any dispute will be heard by
        the courts of the user's place of residence where consumer law so
        provides.
      </p>

      <p className="mt-8 text-sm text-slate-500">
        See also the{" "}
        <a href="/en/privacy-policy" className="link">
          privacy policy
        </a>{" "}
        and the{" "}
        <a href="/en/cookie-policy" className="link">
          cookie policy
        </a>
        . Last reviewed: August 2026.
      </p>
    </main>
  );
}
