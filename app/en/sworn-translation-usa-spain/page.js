// app/en/sworn-translation-usa-spain/page.js
import ServicePage, { serviceMetadata } from "../../components/ServicePage";
import { en as page } from "../../../content/servicios/estados-unidos";

export const metadata = serviceMetadata(page);

export default function Page() {
  return <ServicePage page={page} />;
}
