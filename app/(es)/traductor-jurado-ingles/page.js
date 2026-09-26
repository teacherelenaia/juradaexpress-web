// app/(es)/traductor-jurado-ingles/page.js
// Landing principal "traductor jurado de inglés" (FASE 1 SEO, 26/09/2026),
// generada desde content/servicios/traductor-jurado-ingles.js con la
// plantilla ServicePage.
import ServicePage, { serviceMetadata } from "../../components/ServicePage";
import { es as page } from "../../../content/servicios/traductor-jurado-ingles";

export const metadata = serviceMetadata(page);

export default function Page() {
  return <ServicePage page={page} />;
}
