// app/precios/page.js
import { DNV_PACK_PRICE } from "../../../content/site";
import { DOCUMENTS } from "../../../content/documents";

const certPrice = DOCUMENTS.find((d) => d.id === "partida-nacimiento")?.price;

export const metadata = {
  title: "Precios de traducción jurada y certificada (en euros)",
  description:
    "Tarifas orientativas de traducción jurada Español ⇆ Inglés. Presupuesto cerrado al ver el documento.",
  alternates: {
    canonical: "https://juradaexpress.es/precios",
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
      <h1 className="font-display text-balance text-3xl font-semibold leading-tight tracking-[-0.02em] text-slate-900 md:text-4xl">Precios traducción jurada</h1>
      <p className="mt-3 text-slate-600">
        El precio final depende de la extensión, complejidad y formato. Te damos
        presupuesto cerrado al ver el documento.
      </p>

      <div className="mt-6 overflow-hidden rounded-xl ring-1 ring-stone-200">
        <table className="w-full text-sm tabular-nums">
          <thead className="bg-stone-50 text-left text-slate-600">
            <tr>
              <th className="p-3">Documento</th>
              <th className="p-3">Desde</th>
              <th className="p-3">Plazo habitual</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            <tr>
              <td className="p-3">Certificados (nacimiento, matrimonio, penales…)</td>
              <td className="p-3">35–45 €</td>
              <td className="p-3">24/48 h</td>
            </tr>
            <tr className="bg-stone-50/50">
              <td className="p-3">Títulos y expedientes</td>
              <td className="p-3">45–60 €</td>
              <td className="p-3">24/48 h</td>
            </tr>
            <tr>
              <td className="p-3">Permiso de conducir</td>
              <td className="p-3">40 €</td>
              <td className="p-3">24 h</td>
            </tr>
            <tr className="bg-stone-50/50">
              <td className="p-3">Certificado de empresa / nóminas</td>
              <td className="p-3">45 €</td>
              <td className="p-3">24/48 h</td>
            </tr>
            <tr>
              <td className="p-3">Contratos y notariales</td>
              <td className="p-3">Presupuesto cerrado en menos de 2 h</td>
              <td className="p-3">Según extensión</td>
            </tr>
            <tr className="bg-stone-50/50">
              <td className="p-3">
                <a href="/traduccion-certificada-uscis" className="link">
                  Traducción certificada para USCIS
                </a>{" "}
                (español → inglés, con certificación)
              </td>
              <td className="p-3">
                {certPrice != null ? `${certPrice} € por certificado` : "Presupuesto en menos de 2 h"}
              </td>
              <td className="p-3">24/48 h</td>
            </tr>
            <tr>
              <td className="p-3">
                <a href="/traduccion-jurada-visado-nomada-digital" className="link">
                  Expediente visado nómada digital
                </a>{" "}
                (lote completo)
              </td>
              <td className="p-3">
                {DNV_PACK_PRICE != null ? `${DNV_PACK_PRICE} €` : "Presupuesto cerrado en menos de 2 h"}
              </td>
              <td className="p-3">Plazo único por escrito</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <a href="/documentos" className="btn btn-primary">
          Pedir presupuesto
        </a>
        <a
          href="https://wa.me/34685891214?text=Hola%20Jurada%20Express,%20quisiera%20un%20presupuesto"
          className="btn btn-secondary"
          target="_blank" rel="noopener noreferrer"
        >
          WhatsApp inmediato
        </a>
      </div>

      <p className="mt-8 text-sm text-slate-500">
        * Plazo orientativo 24/48 h para encargos habituales. Más de 20 folios: acordamos calendario específico.
      </p>
      <p className="mt-2 text-sm text-slate-500">
        Todos los precios son en euros (€), IVA incluido. Se cobran en euros con
        tarjeta internacional a través de Stripe; si pagas desde fuera de la zona
        euro, tu banco aplica el cambio.
      </p>
    </main>
  );
}
