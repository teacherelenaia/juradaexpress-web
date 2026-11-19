// app/en/send-documents/page.js
//
// "Send documents" (19/11/2026): see app/(es)/enviar-documentos/page.js.
import SendDocumentsPage from "../../components/SendDocumentsPage";

export const metadata = {
  title: "Send documents",
  description:
    "Upload all your documents for the sworn translation here and get your quote in less than 2 hours.",
  robots: { index: false, follow: true },
  alternates: {
    canonical: "https://juradaexpress.es/en/send-documents",
    languages: {
      es: "https://juradaexpress.es/enviar-documentos",
      en: "https://juradaexpress.es/en/send-documents",
    },
  },
};

export default function Page() {
  return <SendDocumentsPage locale="en" />;
}
