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
      <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
        Catálogo de documentos
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-slate-600">
        Selecciona los documentos que necesitas traducir de forma jurada.
        Puedes elegir varios a la vez: al final verás el resumen, el precio
        orientativo y podrás enviarnos tus archivos directamente.
      </p>

      <DocumentCatalog />
    </main>
  );
}
