// app/en/certified-translation-spanish-criminal-record-certificate-uscis/page.js
// Landing de documento para EE. UU. (solo EN) generada desde
// content/us-docs.js con app/components/UsDocPage.js.
import UsDocPage, { usDocMetadata } from "../../components/UsDocPage";
import { getUsDocBySlug } from "../../../content/us-docs";

const doc = getUsDocBySlug("/en/certified-translation-spanish-criminal-record-certificate-uscis");

export const metadata = usDocMetadata(doc);

export default function Page() {
  return <UsDocPage doc={doc} />;
}
