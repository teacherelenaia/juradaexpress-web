// app/traduccion-jurada-visado-nomada-digital/page.js
import ServicePage, { serviceMetadata } from "../../components/ServicePage";
import { es as page } from "../../../content/servicios/nomada-digital";

export const metadata = serviceMetadata(page);

export default function Page() {
  return <ServicePage page={page} />;
}
