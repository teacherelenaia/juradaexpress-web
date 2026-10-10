// app/(es)/documentos-visado-no-lucrativo-espana/page.js
// Guía 3 (10/10/2026): documentos del visado no lucrativo de España,
// generada desde content/guias/no-lucrativo-documentos.js con la
// plantilla GuidePage. Metadatos con serviceMetadata (mismos campos).
import GuidePage from "../../components/GuidePage";
import { serviceMetadata } from "../../components/ServicePage";
import { es as page } from "../../../content/guias/no-lucrativo-documentos";

export const metadata = serviceMetadata(page);

export default function Page() {
  return <GuidePage page={page} />;
}
