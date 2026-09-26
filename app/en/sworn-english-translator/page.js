// app/en/sworn-english-translator/page.js
// English version of /traductor-jurado-ingles (ServicePage template).
import ServicePage, { serviceMetadata } from "../../components/ServicePage";
import { en as page } from "../../../content/servicios/traductor-jurado-ingles";

export const metadata = serviceMetadata(page);

export default function Page() {
  return <ServicePage page={page} />;
}
