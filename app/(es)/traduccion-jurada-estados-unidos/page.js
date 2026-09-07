// app/traduccion-jurada-estados-unidos/page.js
import ServicePage, { serviceMetadata } from "../../components/ServicePage";
import { es as page } from "../../../content/servicios/estados-unidos";

export const metadata = serviceMetadata(page);

export default function Page() {
  return <ServicePage page={page} />;
}
