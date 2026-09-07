// app/en/sworn-translation-spain-by-country/page.js
import CountryHubPage, { hubMetadata } from "../../components/CountryHubPage";
import { en as page } from "../../../content/paises";

export const metadata = hubMetadata(page);

export default function Page() {
  return <CountryHubPage page={page} />;
}
