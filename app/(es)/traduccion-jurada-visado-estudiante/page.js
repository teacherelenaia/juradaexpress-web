// app/(es)/traduccion-jurada-visado-estudiante/page.js
import ServicePage, { serviceMetadata } from "../../components/ServicePage";
import { es as page } from "../../../content/servicios/estudiante";

export const metadata = serviceMetadata(page);

export default function Page() {
  return <ServicePage page={page} />;
}
