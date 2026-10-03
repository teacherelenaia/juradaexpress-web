// app/en/for-immigration-law-firms/page.js
// Landing para despachos de inmigración de EE. UU. (solo EN) generada desde
// content/law-firms.js con app/components/LawFirmPage.js.
import LawFirmPage, { lawFirmMetadata } from "../../components/LawFirmPage";
import { LAW_FIRMS as page } from "../../../content/law-firms";

export const metadata = lawFirmMetadata(page);

export default function Page() {
  return <LawFirmPage page={page} />;
}
