// app/traduccion-jurada-certificado-medico/page.js
// Ficha de documento generada desde content/fichas.js con la plantilla
// app/components/DocumentPage.js.
import DocumentPage, { fichaMetadata } from "../components/DocumentPage";
import { getFichaBySlug } from "../../content/fichas";

const ficha = getFichaBySlug("traduccion-jurada-certificado-medico");

export const metadata = fichaMetadata(ficha);

export default function Page() {
  return <DocumentPage ficha={ficha} />;
}
