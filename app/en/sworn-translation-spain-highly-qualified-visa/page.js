// app/en/sworn-translation-spain-highly-qualified-visa/page.js
import ServicePage, { serviceMetadata } from "../../components/ServicePage";
import { en as page } from "../../../content/servicios/alta-cualificacion";

export const metadata = serviceMetadata(page);

export default function Page() {
  return <ServicePage page={page} />;
}
