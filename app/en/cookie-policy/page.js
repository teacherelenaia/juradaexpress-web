// app/en/cookie-policy/page.js
export const metadata = {
  title: "Cookie Policy",
  description:
    "Which cookies juradaexpress.es uses, what they do, how long they last, and how to accept, reject or withdraw your consent.",
  alternates: {
    canonical: "https://juradaexpress.es/en/cookie-policy",
    languages: {
      es: "https://juradaexpress.es/politica-cookies",
      en: "https://juradaexpress.es/en/cookie-policy",
      "x-default": "https://juradaexpress.es/politica-cookies",
    },
  },
};

const COOKIES = [
  {
    name: "cookie_consent",
    provider: "juradaexpress.es",
    duration: "Persistent (localStorage)",
    purpose:
      "Remembers whether you accepted or rejected analytics cookies, so we don't ask again.",
    type: "Strictly necessary (exempt from consent)",
  },
  {
    name: "_ga",
    provider: "Google Analytics 4",
    duration: "2 years",
    purpose:
      "Distinguishes visitors with a random identifier to measure traffic in aggregate.",
    type: "Analytics (only with your consent)",
  },
  {
    name: "_ga_*",
    provider: "Google Analytics 4",
    duration: "2 years",
    purpose:
      "Keeps the measurement session state for each Google Analytics property.",
    type: "Analytics (only with your consent)",
  },
];

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 md:py-16">
      <h1 className="font-display text-balance text-3xl font-semibold leading-tight tracking-[-0.02em] text-slate-900 md:text-4xl">
        Cookie policy
      </h1>
      <p className="mt-4 text-slate-600">
        This policy explains which cookies{" "}
        <strong className="text-slate-900">juradaexpress.es</strong>, run by
        Elena Peñaranda Ortega [[COMPLETAR: NIF y dirección fiscal para
        identificar a la responsable]], uses, what they do and how you can
        manage them.
      </p>

      <h2 className="mt-10 font-display text-2xl font-semibold leading-snug text-slate-900">
        What are cookies?
      </h2>
      <p className="mt-3 text-slate-600">
        Cookies are small files your browser stores when you visit a website.
        They remember your preferences or measure, in aggregate, how the site
        is used. This site only uses one strictly necessary first-party cookie
        and — only if you accept them — Google Analytics cookies.
      </p>

      <h2 className="mt-10 font-display text-2xl font-semibold leading-snug text-slate-900">
        Cookies used on this site
      </h2>
      <div className="mt-4 overflow-x-auto rounded-xl ring-1 ring-stone-200">
        <table className="w-full text-sm">
          <thead className="bg-stone-50 text-left text-slate-600">
            <tr>
              <th className="p-3">Cookie</th>
              <th className="p-3">Provider</th>
              <th className="p-3">Duration</th>
              <th className="p-3">Purpose</th>
              <th className="p-3">Type</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {COOKIES.map((c, i) => (
              <tr key={c.name} className={i % 2 ? "bg-stone-50/50" : ""}>
                <td className="p-3 font-medium text-slate-900">{c.name}</td>
                <td className="p-3">{c.provider}</td>
                <td className="p-3">{c.duration}</td>
                <td className="p-3">{c.purpose}</td>
                <td className="p-3">{c.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-sm text-slate-500">
        Google Analytics loads with IP anonymisation and with Google
        advertising signals switched off (no remarketing).
      </p>

      <h2 className="mt-10 font-display text-2xl font-semibold leading-snug text-slate-900">
        How to accept, reject or change your mind
      </h2>
      <p className="mt-3 text-slate-600">
        On your first visit, a notice lets you accept or reject analytics
        cookies. If you reject them, Google Analytics is never loaded. To
        change your choice, clear this site's browsing data in your browser
        (cookies and local storage) and reload the page — the notice will
        appear again. You can also block or delete cookies in your browser
        settings (Chrome, Firefox, Safari or Edge).
      </p>

      <h2 className="mt-10 font-display text-2xl font-semibold leading-snug text-slate-900">
        Questions?
      </h2>
      <p className="mt-3 text-slate-600">
        If anything in this policy is unclear, email me at{" "}
        <a href="mailto:info@juradaexpress.es" className="link">
          info@juradaexpress.es
        </a>
        .
      </p>
      <p className="mt-3 text-sm text-slate-500">Last reviewed: August 2026.</p>
    </main>
  );
}
