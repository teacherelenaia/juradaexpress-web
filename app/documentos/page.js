// app/documentos/page.js
import DocumentCatalog from "../components/DocumentCatalog";

export const metadata = {
  title: "Catálogo de Documentos — Traducción Jurada en Murcia",
  description:
    "Elige tus documentos para traducción jurada en Murcia: partida de nacimiento, título universitario, antecedentes penales y más. Precios claros, presupuesto en menos de 2 horas.",
  alternates: {
    canonical: "https://juradaexpress.es/documentos",
    languages: {
      es: "https://juradaexpress.es/documentos",
      en: "https://juradaexpress.es/en/documentos",
      "x-default": "https://juradaexpress.es/documentos",
    },
  },
};

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 md:py-16">
      <h1 className="font-display text-balance text-4xl font-semibold leading-tight tracking-[-0.02em] text-slate-900 md:text-5xl">
        Catálogo de documentos
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-slate-600">
        Selecciona los documentos que necesitas traducir de forma jurada.
        Puedes elegir varios a la vez: al final verás el resumen, el precio
        orientativo y podrás enviarnos tus archivos directamente.
      </p>

      <DocumentCatalog />

      <div className="mt-16 border-t border-stone-200 pt-10">
        <h2 className="text-xl font-semibold leading-snug text-slate-900 md:text-2xl">
          Guías por tipo de documento
        </h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          <li>
            <a href="/traduccion-jurada-partida-nacimiento" className="link">
              Traducción jurada de partida de nacimiento
            </a>
          </li>
          <li>
            <a href="/traduccion-jurada-titulo-universitario" className="link">
              Traducción jurada de título universitario
            </a>
          </li>
          <li>
            <a href="/traduccion-jurada-certificado-penales" className="link">
              Traducción jurada de certificado de antecedentes penales
            </a>
          </li>
          <li>
            <a href="/traduccion-jurada-espanol-ingles" className="link">
              Traducción jurada español-inglés e inglés-español
            </a>
          </li>
          <li>
            <a href="/traduccion-jurada-validez-oficial" className="link">
              Validez ante organismos oficiales, universidades y consulados
            </a>
          </li>
          <li>
            <a href="/traduccion-jurada-certificado-matrimonio" className="link">
              Traducción jurada de certificado de matrimonio
            </a>
          </li>
          <li>
            <a href="/traduccion-jurada-contrato-escritura" className="link">
              Traducción jurada de contrato o escritura
            </a>
          </li>
        </ul>
      </div>
    </main>
  );
}
