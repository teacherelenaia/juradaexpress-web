// app/components/PricePerDocument.js
//
// «Precio por documento, no por página» + tabla «Traductora jurada directa
// o agencia online» (Fase A, 18/10/2026). Se muestra en la home ES/EN
// después de «Cómo funciona». Cifras de content/documents.js y
// content/site.js; sin tarjetas ni iconos, solo texto y una tabla.
import { DOCUMENTS, MIN_PRICE } from "../../content/documents";
import {
  PRICE_PER_PAGE,
  MIN_DOC_PRICE,
  SAME_DAY_MAX_PAGES,
  SAME_DAY_CUTOFF,
} from "../../content/site";
import { MAEC_NUMBER } from "../../content/persona";
import { SectionHeading } from "./ui";

const priceOf = (id) => DOCUMENTS.find((d) => d.id === id)?.price ?? null;

const COPY = {
  es: {
    heading: "Precio por documento, no por página",
    intro: `Una partida de nacimiento cuesta ${priceOf("partida-nacimiento")} € tenga una cara o dos, y un título universitario ${priceOf("titulo-universitario")} €. Solo los documentos largos (contratos, escrituras, expedientes) van por página, a ${PRICE_PER_PAGE} € con un mínimo de ${MIN_DOC_PRICE} € por documento. IVA incluido, sin cobro por palabra y sin recargos después del presupuesto.`,
    tableTitle: "Traductora jurada directa o agencia online",
    colDirect: "Conmigo (directo)",
    colAgency: "Agencia online",
    rows: [
      {
        k: "Quién traduce",
        a: `Yo, Elena, traductora jurada nº ${MAEC_NUMBER} del MAEC: traduzco, firmo y sello cada página`,
        b: "Un traductor que no conoces, elegido por la agencia",
      },
      {
        k: "Cómo contactas",
        a: "WhatsApp o email, te contesto yo",
        b: "Formulario y cola",
      },
      {
        k: "Precio",
        a: `Por documento, desde ${MIN_PRICE} €, cerrado por escrito antes de pagar`,
        b: "Por palabra o por página, con recargos de urgencia y gestión",
      },
      {
        k: "Plazo",
        a: `En el día hasta ${SAME_DAY_MAX_PAGES} páginas si llega antes de las ${SAME_DAY_CUTOFF.es}`,
        b: "Según la cola de trabajo de la agencia",
      },
      {
        k: "Si hay un error",
        a: "Lo corrijo gratis y te reenvío el PDF",
        b: "Reclamación a través del gestor de la agencia",
      },
    ],
    link: "Ver todos los precios",
    href: "/precios",
  },
  en: {
    heading: "Price per document, not per page",
    intro: `A birth certificate costs €${priceOf("partida-nacimiento")} whether it has one side or two, and a university degree €${priceOf("titulo-universitario")}. Only long documents (contracts, deeds, transcripts) are priced per page, at €${PRICE_PER_PAGE} with a minimum of €${MIN_DOC_PRICE} per document. VAT included, no per-word pricing and no surcharges after the quote.`,
    tableTitle: "Direct sworn translator or online agency",
    colDirect: "With me (direct)",
    colAgency: "Online agency",
    rows: [
      {
        k: "Who translates",
        a: `Me, Elena, sworn translator no. ${MAEC_NUMBER}: I translate, sign and stamp every page`,
        b: "A translator you never meet, chosen by the agency",
      },
      {
        k: "How you reach me",
        a: "WhatsApp or email, I answer you myself",
        b: "Web form and a queue",
      },
      {
        k: "Price",
        a: `Per document, from €${MIN_PRICE}, fixed in writing before you pay`,
        b: "Per word or per page, with rush and handling fees",
      },
      {
        k: "Turnaround",
        a: `Same day up to ${SAME_DAY_MAX_PAGES} pages if it reaches me before ${SAME_DAY_CUTOFF.en} Madrid time`,
        b: "Depends on the agency's workload",
      },
      {
        k: "If there is a mistake",
        a: "I fix it free and resend the PDF",
        b: "A complaint through the agency's project manager",
      },
    ],
    link: "See all prices",
    href: "/en/precios",
  },
};

export default function PricePerDocument({ locale = "es", className = "" }) {
  const t = COPY[locale] || COPY.es;
  return (
    <section
      data-track-section="precio_documento"
      className={`bg-stone-50 ${className}`}
    >
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <SectionHeading>{t.heading}</SectionHeading>
        <p className="mt-4 max-w-[68ch] text-slate-600">{t.intro}</p>

        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
            <caption className="mb-3 text-left font-display text-xl font-semibold text-slate-900">
              {t.tableTitle}
            </caption>
            <thead>
              <tr className="border-b border-stone-300 text-xs uppercase tracking-wide text-slate-500">
                <th scope="col" className="py-2 pr-4 font-medium" />
                <th scope="col" className="py-2 pr-4 font-medium text-brand-navy">
                  {t.colDirect}
                </th>
                <th scope="col" className="py-2 font-medium">
                  {t.colAgency}
                </th>
              </tr>
            </thead>
            <tbody>
              {t.rows.map((r) => (
                <tr key={r.k} className="border-b border-stone-200 align-top">
                  <th
                    scope="row"
                    className="py-3 pr-4 font-medium text-slate-900"
                  >
                    {r.k}
                  </th>
                  <td className="py-3 pr-4 text-slate-800">{r.a}</td>
                  <td className="py-3 text-slate-600">{r.b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-6">
          <a href={t.href} className="link">
            {t.link} →
          </a>
        </p>
      </div>
    </section>
  );
}
