// app/(es)/traduccion-jurada-por-paises/page.js
import CountryHubPage, { hubMetadata } from "../../components/CountryHubPage";
import { es as page } from "../../../content/paises";

export const metadata = hubMetadata(page);

export default function Page() {
  return <CountryHubPage page={page} />;
}
