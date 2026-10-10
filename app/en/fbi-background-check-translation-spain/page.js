// app/en/fbi-background-check-translation-spain/page.js
import ServicePage, { serviceMetadata } from "../../components/ServicePage";
import { en as page } from "../../../content/servicios/fbi";

export const metadata = serviceMetadata(page);

export default function Page() {
  return <ServicePage page={page} />;
}
