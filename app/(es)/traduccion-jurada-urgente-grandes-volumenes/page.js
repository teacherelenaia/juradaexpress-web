// app/traduccion-jurada-urgente-grandes-volumenes/page.js
import ServicePage, { serviceMetadata } from "../../components/ServicePage";
import { es as page } from "../../../content/servicios/urgente";

export const metadata = serviceMetadata(page);

export default function Page() {
  return <ServicePage page={page} />;
}
