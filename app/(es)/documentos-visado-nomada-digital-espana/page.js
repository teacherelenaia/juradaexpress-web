// app/(es)/documentos-visado-nomada-digital-espana/page.js
// Guía 2 (10/10/2026): documentos del visado de nómada digital de España,
// generada desde content/guias/nomada-digital-documentos.js con la
// plantilla GuidePage. Metadatos con serviceMetadata (mismos campos).
import GuidePage from "../../components/GuidePage";
import { serviceMetadata } from "../../components/ServicePage";
import { es as page } from "../../../content/guias/nomada-digital-documentos";

export const metadata = serviceMetadata(page);

export default function Page() {
  return <GuidePage page={page} />;
}
