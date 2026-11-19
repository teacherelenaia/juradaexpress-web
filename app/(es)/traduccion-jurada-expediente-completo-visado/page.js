// app/(es)/traduccion-jurada-expediente-completo-visado/page.js
import ServicePage, { serviceMetadata } from "../../components/ServicePage";
import { es as page } from "../../../content/servicios/expediente";

export const metadata = serviceMetadata(page);

export default function Page() {
  return <ServicePage page={page} />;
}
