// app/en/contacto/page.js
export const metadata = {
  title: "Contact — Sworn Spanish Translator",
  description:
    "Contact a certified sworn Spanish translator by WhatsApp, email or phone. Instant quote and 24/48h delivery, wherever you are.",
  alternates: {
    canonical: "https://juradaexpress.es/en/contacto",
    languages: {
      es: "https://juradaexpress.es/contacto",
      en: "https://juradaexpress.es/en/contacto",
      "x-default": "https://juradaexpress.es/contacto",
    },
  },
};

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold leading-tight text-slate-900">Contact</h1>
      <p className="mt-3 max-w-2xl text-slate-600">
        Need a sworn translation for a procedure in Spain? Send us your
        scanned document by WhatsApp or email and we'll reply with a fixed
        quote and delivery time — wherever in the world you are.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <a
          href="https://wa.me/34685891214?text=Hi%20JuradaExpress,%20I%27d%20like%20a%20quote%20for%20a%20sworn%20translation"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-2xl bg-white p-6 ring-1 ring-stone-200 hover:shadow"
        >
          <h2 className="text-2xl font-semibold leading-snug text-brand-navy md:text-3xl">WhatsApp</h2>
          <p className="mt-2 text-sm text-slate-600">
            Fast response, ideal for an instant quote.
          </p>
          <p className="mt-4 font-medium">+34 685 891 214</p>
        </a>

        <a
          href="mailto:info@juradaexpress.es?subject=Sworn%20translation%20quote%20request"
          className="rounded-2xl bg-white p-6 ring-1 ring-stone-200 hover:shadow"
        >
          <h2 className="text-2xl font-semibold leading-snug text-brand-navy md:text-3xl">Email</h2>
          <p className="mt-2 text-sm text-slate-600">
            Send us your scanned document and the details of your order.
          </p>
          <p className="mt-4 font-medium">info@juradaexpress.es</p>
        </a>

        <a
          href="tel:+34685891214"
          className="rounded-2xl bg-white p-6 ring-1 ring-stone-200 hover:shadow"
        >
          <h2 className="text-2xl font-semibold leading-snug text-brand-navy md:text-3xl">Phone</h2>
          <p className="mt-2 text-sm text-slate-600">
            Call us directly if you'd rather talk it through.
          </p>
          <p className="mt-4 font-medium">+34 685 891 214</p>
        </a>
      </div>

      <div className="mt-10 rounded-2xl bg-brand-navy-50 p-6 ring-1 ring-brand-navy-100">
        <h2 className="text-2xl font-semibold leading-snug text-slate-900 md:text-3xl">Sworn translator for Spanish procedures</h2>
        <p className="mt-2 text-sm text-slate-600">
          Sworn translations Spanish ⇆ English, signed and stamped, valid
          before Spanish official bodies — residency, university admissions,
          property, marriage and more. Based in Murcia, Spain, working with
          clients across the country and abroad. Digital delivery worldwide,
          typically within 24/48h.
        </p>
      </div>
    </main>
  );
}
