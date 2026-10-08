// app/en/sworn-translations-spanish-visas/page.js
import ServicePage, { serviceMetadata } from "../../components/ServicePage";
import { en as page } from "../../../content/servicios/visados";

export const metadata = serviceMetadata(page);

export default function Page() {
  return <ServicePage page={page} />;
}
