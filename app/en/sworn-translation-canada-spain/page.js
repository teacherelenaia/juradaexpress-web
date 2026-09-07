// app/en/sworn-translation-canada-spain/page.js
import ServicePage, { serviceMetadata } from "../../components/ServicePage";
import { en as page } from "../../../content/servicios/canada";

export const metadata = serviceMetadata(page);

export default function Page() {
  return <ServicePage page={page} />;
}
