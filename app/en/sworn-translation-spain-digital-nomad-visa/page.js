// app/en/sworn-translation-spain-digital-nomad-visa/page.js
import ServicePage, { serviceMetadata } from "../../components/ServicePage";
import { en as page } from "../../../content/servicios/nomada-digital";

export const metadata = serviceMetadata(page);

export default function Page() {
  return <ServicePage page={page} />;
}
