// app/en/certified-translation-uscis/page.js
import ServicePage, { serviceMetadata } from "../../components/ServicePage";
import { en as page } from "../../../content/servicios/uscis";

export const metadata = serviceMetadata(page);

export default function Page() {
  return <ServicePage page={page} />;
}
