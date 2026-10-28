// app/en/precios/page.js
import { DNV_PACK_PRICE, DNV_PACK_LIMITS, DELIVERY_PROMISE_SHORT } from "../../../content/site";
import { DOCUMENTS, MIN_PRICE } from "../../../content/documents";
import { packOffers } from "../../../content/packs";
import PacksSection from "../../components/PacksSection";
import PricePerDocument from "../../components/PricePerDocument";
import QuotePromise from "../../components/QuotePromise";

const certPrice = DOCUMENTS.find((d) => d.id === "partida-nacimiento")?.price;

export const metadata = {
  title: `Sworn translation pricing from €${MIN_PRICE} (in euros)`,
  description: `Sworn Spanish ⇆ English translation from €${MIN_PRICE} per document, same-day delivery (up to 10 pages). Rates in euros, fixed quote once we see your document.`,
  alternates: {
    canonical: "https://juradaexpress.es/en/precios",
    languages: {
      es: "https://juradaexpress.es/precios",
      en: "https://juradaexpress.es/en/precios",
      "x-default": "https://juradaexpress.es/precios",
    },
  },
};

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-balance text-3xl font-semibold leading-tight tracking-[-0.02em] text-slate-900 md:text-4xl">Sworn translation pricing</h1>
      <p className="mt-3 text-slate-600">
        The final price depends on the length, complexity and format of the
        document. We give you a fixed quote once we've seen it. Prices below
        are indicative and shown in euros (€): every order is charged in
        euros to any international card through Stripe, and your bank
        applies the exchange rate.
      </p>

      <div
        className="mt-6 overflow-hidden rounded-xl ring-1 ring-stone-200"
        data-track-section="precios"
      >
        <table className="w-full text-sm tabular-nums">
          <thead className="bg-stone-50 text-left text-slate-600">
            <tr>
              <th className="p-3">Document</th>
              <th className="p-3">From</th>
              <th className="p-3">Typical turnaround</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            <tr>
              <td className="p-3">Certificates (birth, marriage, criminal record…)</td>
              <td className="p-3">€35–45</td>
              <td className="p-3">Same day (up to 10 pages)</td>
            </tr>
            <tr className="bg-stone-50/50">
              <td className="p-3">Degrees and academic transcripts</td>
              <td className="p-3">€45–60</td>
              <td className="p-3">Same day (up to 10 pages)</td>
            </tr>
            <tr>
              <td className="p-3">Driving licence</td>
              <td className="p-3">€40</td>
              <td className="p-3">Same day (up to 10 pages)</td>
            </tr>
            <tr className="bg-stone-50/50">
              <td className="p-3">Employer certificates / payslips</td>
              <td className="p-3">€45</td>
              <td className="p-3">Same day (up to 10 pages)</td>
            </tr>
            <tr>
              <td className="p-3">Contracts and notarial documents</td>
              <td className="p-3">Fixed quote within 2 hours</td>
              <td className="p-3">{DELIVERY_PROMISE_SHORT.en}</td>
            </tr>
            <tr className="bg-stone-50/50">
              <td className="p-3">
                <a href="/en/certified-translation-uscis" className="link">
                  Certified translation for USCIS
                </a>{" "}
                (Spanish → English, with certification)
              </td>
              <td className="p-3">
                {certPrice != null ? `€${certPrice} per certificate` : "Quote within 2 hours"}
              </td>
              <td className="p-3">Same day (up to 10 pages)</td>
            </tr>
            <tr>
              <td className="p-3">
                <a href="/en/sworn-translation-spain-digital-nomad-visa" className="link">
                  Digital nomad visa file
                </a>{" "}
                (package)
              </td>
              <td className="p-3">
                {DNV_PACK_PRICE != null
                  ? `€${DNV_PACK_PRICE} (${DNV_PACK_LIMITS.en})`
                  : "Fixed quote within 2 hours"}
              </td>
              <td className="p-3">Single deadline in writing</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <a href="/en/documentos" className="btn btn-primary">
          Request a quote
        </a>
        <a
          href="https://wa.me/34685891214?text=Hi%20Jurada%20Express,%20I%27d%20like%20a%20quote%20for%20a%20sworn%20translation"
          className="btn btn-secondary"
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp
        </a>
      </div>
      {/* Delivery promise (content/site.js → DELIVERY_PROMISE) under the buttons */}
      <QuotePromise locale="en" className="mt-3 max-w-[60ch]" />

      <p className="mt-8 text-sm text-slate-500">
        * Same-day delivery of more than 10 pages carries a 30% surcharge.
      </p>

      {/* Price per document, not per page + direct vs agency table */}
      <PricePerDocument locale="en" embedded className="mt-10" />

      <PacksSection locale="en" />

      {/* JSON-LD: one Offer per pack (content/packs.js) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "OfferCatalog",
            name: "Sworn translation packs by procedure",
            url: "https://juradaexpress.es/en/precios#packs",
            itemListElement: packOffers("en"),
          }),
        }}
      />
    </main>
  );
}
