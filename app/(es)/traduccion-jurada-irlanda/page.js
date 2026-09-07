// app/(es)/traduccion-jurada-irlanda/page.js
import ServicePage, { serviceMetadata } from "../../components/ServicePage";
import { es as page } from "../../../content/servicios/irlanda";

export const metadata = serviceMetadata(page);

export default function Page() {
  return <ServicePage page={page} />;
}
