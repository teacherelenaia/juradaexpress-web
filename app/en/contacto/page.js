// app/en/contacto/page.js
import {
  TIMEZONE_NOTE,
  INTERNATIONAL_SHIPPING,
  EMAIL,
} from "../../../content/site";

export const metadata = {
  title: "Contact — Sworn Spanish Translator, from any country",
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
      <h1 className="font-display text-balance text-3xl font-semibold leading-tight tracking-[-0.02em] text-slate-900 md:text-4xl">Contact</h1>
      <p className="mt-3 max-w-2xl text-slate-600">
        Need a sworn translation for a procedure in Spain? Send us your
        scanned document by WhatsApp or email and we'll reply with a fixed
        quote and delivery time — wherever in the world you are.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <a
          href="https://wa.me/34685891214?text=Hi%20Jurada%20Express,%20I%27d%20like%20a%20quote%20for%20a%20sworn%20translation"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl bg-white p-6 ring-1 ring-stone-200 hover:shadow"
        >
          <h2 className="text-2xl font-semibold leading-snug text-brand-navy md:text-3xl">WhatsApp</h2>
          <p className="mt-2 text-sm text-slate-600">
            Fast response, ideal for an instant quote.
          </p>
          <p className="mt-4 font-medium">+34 685 891 214</p>
        </a>

        <a
          href="mailto:info@juradaexpress.es?subject=Sworn%20translation%20quote%20request"
          className="rounded-xl bg-white p-6 ring-1 ring-stone-200 hover:shadow"
        >
          <h2 className="text-2xl font-semibold leading-snug text-brand-navy md:text-3xl">Email</h2>
          <p className="mt-2 text-sm text-slate-600">
            Send us your scanned document and the details of your order.
          </p>
          <p className="mt-4 font-medium">info@juradaexpress.es</p>
        </a>

        <a
          href="tel:+34685891214"
          className="rounded-xl bg-white p-6 ring-1 ring-stone-200 hover:shadow"
        >
          <h2 className="text-2xl font-semibold leading-snug text-brand-navy md:text-3xl">Phone</h2>
          <p className="mt-2 text-sm text-slate-600">
            Call us directly if you'd rather talk it through.
          </p>
          <p className="mt-4 font-medium">+34 685 891 214</p>
        </a>
      </div>

      <div className="mt-10 rounded-xl bg-brand-navy-50 p-6 ring-1 ring-brand-navy-100">
        <h2 className="text-2xl font-semibold leading-snug text-slate-900 md:text-3xl">Sworn translator for Spanish procedures</h2>
        <p className="mt-2 text-sm text-slate-600">
          Sworn translations Spanish ⇆ English, signed and stamped, valid
          before Spanish official bodies — residency, university admissions,
          property, marriage and more. Based in Murcia, Spain, working with
          clients across the country and abroad. Digital delivery worldwide,
          typically within 24/48h.
        </p>
      </div>

      {/* Clients outside Spain (FASE 2.7) */}
      <section
        aria-labelledby="contact-international"
        className="mt-10 rounded-xl bg-stone-50 p-6 ring-1 ring-stone-200 md:p-8"
      >
        <h2
          id="contact-international"
          className="font-display text-balance text-2xl font-semibold leading-snug tracking-[-0.02em] text-slate-900 md:text-3xl"
        >
          Writing to me from outside Spain?
        </h2>
        <p className="mt-3 max-w-[68ch] text-slate-600">
          I work every week with clients in the United Kingdom, Ireland, the
          United States, Canada, India and Australia. The whole process is
          digital, so it makes no difference where you write from; only the
          time changes.
        </p>
        <dl className="mt-6 grid gap-x-8 gap-y-5 text-sm md:grid-cols-2">
          <div>
            <dt className="font-semibold text-slate-900">Office hours</dt>
            <dd className="mt-1 text-slate-600">{TIMEZONE_NOTE.en}. If you write outside those hours, I reply first thing on the next working day.</dd>
          </div>
          <div>
            <dt className="font-semibold text-slate-900">WhatsApp and phone</dt>
            <dd className="mt-1 text-slate-600">
              <a href="https://wa.me/34685891214" className="link" target="_blank" rel="noopener noreferrer">
                +34 685 891 214
              </a>
              . WhatsApp works from any country; to call, dial the +34
              international prefix.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-slate-900">Email</dt>
            <dd className="mt-1 text-slate-600">
              <a href={`mailto:${EMAIL}`} className="link">
                {EMAIL}
              </a>
              . Attach the complete scanned document or a link to the folder.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-slate-900">Payment</dt>
            <dd className="mt-1 text-slate-600">
              International card (Visa, Mastercard, American Express) through
              Stripe, in euros; your bank applies the exchange rate. No Spanish
              bank account needed.
            </dd>
          </div>
          <div className="md:col-span-2">
            <dt className="font-semibold text-slate-900">Delivery</dt>
            <dd className="mt-1 text-slate-600">
              Digitally signed PDF, valid for online submission.
              {INTERNATIONAL_SHIPPING.available
                ? ` ${INTERNATIONAL_SHIPPING.note.en}.`
                : ""}
            </dd>
          </div>
        </dl>
        <p className="mt-6 text-sm text-slate-600">
          Guides by country:{" "}
          <a href="/en/sworn-translation-usa-spain" className="link">
            United States
          </a>
          ,{" "}
          <a href="/en/sworn-translation-india-spain" className="link">
            India
          </a>
          ,{" "}
          <a href="/en/sworn-translation-british-residents-spain" className="link">
            United Kingdom
          </a>
          . For US immigration,{" "}
          <a href="/en/certified-translation-uscis" className="link">
            certified translation for USCIS
          </a>
          .
        </p>
      </section>
    </main>
  );
}
