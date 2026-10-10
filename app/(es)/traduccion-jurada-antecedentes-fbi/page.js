// app/(es)/traduccion-jurada-antecedentes-fbi/page.js
import ServicePage, { serviceMetadata } from "../../components/ServicePage";
import { es as page } from "../../../content/servicios/fbi";

export const metadata = serviceMetadata(page);

export default function Page() {
  return <ServicePage page={page} />;
}
