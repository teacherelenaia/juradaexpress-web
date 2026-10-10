// app/en/spain-digital-nomad-visa-documents-checklist/page.js
// Guide 2 (10/10/2026): Spain digital nomad visa documents checklist.
// Rendered from content/guias/nomada-digital-documentos.js with the
// GuidePage template; metadata via serviceMetadata (same fields).
import GuidePage from "../../components/GuidePage";
import { serviceMetadata } from "../../components/ServicePage";
import { en as page } from "../../../content/guias/nomada-digital-documentos";

export const metadata = serviceMetadata(page);

export default function Page() {
  return <GuidePage page={page} />;
}
