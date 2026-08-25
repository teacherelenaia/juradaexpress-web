// app/traduccion-jurada-contrato-escritura/page.js
// Ficha de documento generada desde content/fichas.js con la plantilla
// app/components/DocumentPage.js.
import DocumentPage, { fichaMetadata } from "../components/DocumentPage";
import { getFichaBySlug } from "../../content/fichas";

const ficha = getFichaBySlug("traduccion-jurada-contrato-escritura");

export const metadata = fichaMetadata(ficha);

export default function Page() {
  return <DocumentPage ficha={ficha} />;
}
