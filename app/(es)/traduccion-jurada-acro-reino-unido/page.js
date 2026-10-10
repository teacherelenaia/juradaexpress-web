// app/(es)/traduccion-jurada-acro-reino-unido/page.js
import ServicePage, { serviceMetadata } from "../../components/ServicePage";
import { es as page } from "../../../content/servicios/acro";

export const metadata = serviceMetadata(page);

export default function Page() {
  return <ServicePage page={page} />;
}
