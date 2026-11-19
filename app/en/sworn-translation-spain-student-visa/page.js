// app/en/sworn-translation-spain-student-visa/page.js
import ServicePage, { serviceMetadata } from "../../components/ServicePage";
import { en as page } from "../../../content/servicios/estudiante";

export const metadata = serviceMetadata(page);

export default function Page() {
  return <ServicePage page={page} />;
}
