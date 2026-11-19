// app/(es)/enviar-documentos/page.js
//
// «Enviar documentos» (19/11/2026): el cliente sube todos sus documentos y
// llegan a una carpeta privada del Google Drive de Elena. Página de
// servicio: noindex y fuera del sitemap. Ver app/components/SendDocumentsPage.js.
import SendDocumentsPage from "../../components/SendDocumentsPage";

export const metadata = {
  title: "Enviar documentos",
  description:
    "Sube aquí todos tus documentos para la traducción jurada y recibe el presupuesto en menos de 2 horas.",
  robots: { index: false, follow: true },
  alternates: {
    canonical: "https://juradaexpress.es/enviar-documentos",
    languages: {
      es: "https://juradaexpress.es/enviar-documentos",
      en: "https://juradaexpress.es/en/send-documents",
    },
  },
};

export default function Page() {
  return <SendDocumentsPage locale="es" />;
}
