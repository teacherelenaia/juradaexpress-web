// app/en/sworn-translation-australia-spain/page.js
import ServicePage, { serviceMetadata } from "../../components/ServicePage";
import { en as page } from "../../../content/servicios/australia";

export const metadata = serviceMetadata(page);

export default function Page() {
  return <ServicePage page={page} />;
}
