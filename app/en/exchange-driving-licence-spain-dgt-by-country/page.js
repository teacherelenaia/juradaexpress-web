// app/en/exchange-driving-licence-spain-dgt-by-country/page.js
// Guide 1 (10/10/2026): exchanging a foreign driving licence at Spain's
// DGT, by country. Rendered from content/guias/canje-permiso-dgt.js with
// the GuidePage template; metadata via serviceMetadata (same fields).
import GuidePage from "../../components/GuidePage";
import { serviceMetadata } from "../../components/ServicePage";
import { en as page } from "../../../content/guias/canje-permiso-dgt";

export const metadata = serviceMetadata(page);

export default function Page() {
  return <GuidePage page={page} />;
}
