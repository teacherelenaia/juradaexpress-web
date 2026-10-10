// app/(es)/canje-permiso-conducir-dgt-por-paises/page.js
// Guía 1 (10/10/2026): canje del permiso de conducir en la DGT por países,
// generada desde content/guias/canje-permiso-dgt.js con la plantilla
// GuidePage. Metadatos con serviceMetadata (mismos campos).
import GuidePage from "../../components/GuidePage";
import { serviceMetadata } from "../../components/ServicePage";
import { es as page } from "../../../content/guias/canje-permiso-dgt";

export const metadata = serviceMetadata(page);

export default function Page() {
  return <GuidePage page={page} />;
}
