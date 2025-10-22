// app/precios/page.js
export const metadata = {
  title: "Precios traducción jurada – JuradaExpress (Murcia)",
  description:
    "Tarifas orientativas de traducción jurada Español ⇆ Inglés. Presupuesto cerrado al ver el documento.",
  alternates: { canonical: "https://juradaexpress.es/precios" },
};

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold">Precios traducción jurada</h1>
      <p className="mt-3 text-slate-600">
        El precio final depende de la extensión, complejidad y formato. Te damos
        presupuesto cerrado al ver el documento.
      </p>

      <div className="mt-6 overflow-hidden rounded-2xl ring-1 ring-slate-200">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-slate-600">
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
            <tr className="bg-slate-50/50">
              <td className="p-3">Títulos y expedientes</td>
              <td className="p-3">45–60 €</td>
              <td className="p-3">24/48 h</td>
            </tr>
            <tr>
              <td className="p-3">Contratos y notariales</td>
              <td className="p-3">Consultar</td>
              <td className="p-3">Según extensión</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href="mailto:info@juradaexpress.es?subject=Presupuesto%20traducci%C3%B3n%20jurada"
          className="inline-flex items-center rounded-xl bg-emerald-600 px-5 py-3 text-white hover:bg-emerald-700"
        >
          Pedir presupuesto por email
        </a>
        <a
          href="https://wa.me/34685891214?text=Hola%20JuradaExpress,%20quisiera%20un%20presupuesto"
          className="inline-flex items-center rounded-xl border border-emerald-200 bg-white px-5 py-3 text-emerald-900 hover:bg-emerald-100"
          target="_blank" rel="noopener noreferrer"
        >
          WhatsApp inmediato
        </a>
      </div>

      <p className="mt-8 text-sm text-slate-500">
        * Plazo orientativo 24/48 h para encargos habituales. Más de 20 folios: acordamos calendario específico.
      </p>
    </main>
  );
}
