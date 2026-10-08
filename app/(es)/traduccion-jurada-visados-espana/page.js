// app/(es)/traduccion-jurada-visados-espana/page.js
import ServicePage, { serviceMetadata } from "../../components/ServicePage";
import { es as page } from "../../../content/servicios/visados";

export const metadata = serviceMetadata(page);

export default function Page() {
  return <ServicePage page={page} />;
}
