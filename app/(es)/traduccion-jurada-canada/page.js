// app/(es)/traduccion-jurada-canada/page.js
import ServicePage, { serviceMetadata } from "../../components/ServicePage";
import { es as page } from "../../../content/servicios/canada";

export const metadata = serviceMetadata(page);

export default function Page() {
  return <ServicePage page={page} />;
}
