// app/en/acro-police-certificate-translation-spain/page.js
import ServicePage, { serviceMetadata } from "../../components/ServicePage";
import { en as page } from "../../../content/servicios/acro";

export const metadata = serviceMetadata(page);

export default function Page() {
  return <ServicePage page={page} />;
}
