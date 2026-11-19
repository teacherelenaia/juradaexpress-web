// app/(es)/traduccion-jurada-visado-alta-cualificacion/page.js
import ServicePage, { serviceMetadata } from "../../components/ServicePage";
import { es as page } from "../../../content/servicios/alta-cualificacion";

export const metadata = serviceMetadata(page);

export default function Page() {
  return <ServicePage page={page} />;
}
