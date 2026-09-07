// app/traduccion-jurada-india/page.js
import ServicePage, { serviceMetadata } from "../../components/ServicePage";
import { es as page } from "../../../content/servicios/india";

export const metadata = serviceMetadata(page);

export default function Page() {
  return <ServicePage page={page} />;
}
