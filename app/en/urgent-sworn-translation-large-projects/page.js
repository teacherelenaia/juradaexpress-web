// app/en/urgent-sworn-translation-large-projects/page.js
import ServicePage, { serviceMetadata } from "../../components/ServicePage";
import { en as page } from "../../../content/servicios/urgente";

export const metadata = serviceMetadata(page);

export default function Page() {
  return <ServicePage page={page} />;
}
