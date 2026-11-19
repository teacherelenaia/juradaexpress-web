// app/en/full-visa-file-sworn-translation-spain/page.js
import ServicePage, { serviceMetadata } from "../../components/ServicePage";
import { en as page } from "../../../content/servicios/expediente";

export const metadata = serviceMetadata(page);

export default function Page() {
  return <ServicePage page={page} />;
}
