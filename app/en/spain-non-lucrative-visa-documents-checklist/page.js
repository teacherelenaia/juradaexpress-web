// app/en/spain-non-lucrative-visa-documents-checklist/page.js
// Guide 3 (10/10/2026): Spain non-lucrative visa documents checklist.
// Rendered from content/guias/no-lucrativo-documentos.js with the
// GuidePage template; metadata via serviceMetadata (same fields).
import GuidePage from "../../components/GuidePage";
import { serviceMetadata } from "../../components/ServicePage";
import { en as page } from "../../../content/guias/no-lucrativo-documentos";

export const metadata = serviceMetadata(page);

export default function Page() {
  return <GuidePage page={page} />;
}
