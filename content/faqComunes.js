// content/faqComunes.js
//
// Tres preguntas frecuentes comunes (14/11/2026) para las páginas del FBI,
// visados, nómada digital y USCIS, en español e inglés, y en su FAQPage:
//   1. ¿La apostilla va incluida en el precio?
//   2. ¿Me aceptará el consulado el PDF firmado?
//   3. ¿Cuánto pago en total si mi documento tiene más páginas?
// Todas las cifras salen del catálogo y de content/site.js; ninguna se
// escribe aquí a mano.
import { DOCUMENTS } from "./documents";
import { toUsd, US_SHIPPING_USD } from "./usd";
import { FIXED_PRICE_MAX_PAGES, PRICE_PER_PAGE, SIGNATURE_ORDER } from "./site";
import { getPack, PACKS_COPY } from "./packs";

// Certificado de antecedentes penales (FBI y ACRO): precio por documento.
const RECORD_PRICE = DOCUMENTS.find((d) => d.id === "antecedentes-penales").price;

const visa = getPack("visa");
const family = getPack("visa-family");
const nomad = getPack("nomad");

export function apostilleFaq(locale = "es") {
  if (locale === "en") {
    return {
      q: "Is the apostille included in the price?",
      a: `Yes. If your consulate asks for the apostille to be translated, I translate it together with the document, in the same sworn translation and the same PDF, and it counts as one more page. A criminal record certificate (FBI or ACRO) costs €${RECORD_PRICE} (about $${toUsd(RECORD_PRICE)}) for up to ${FIXED_PRICE_MAX_PAGES} pages, apostille included; each page beyond that is €${PRICE_PER_PAGE} (about $${toUsd(PRICE_PER_PAGE)}). In the packs, the apostille counts towards the pack's page limit.`,
    };
  }
  return {
    q: "¿La apostilla va incluida en el precio?",
    a: `Sí. Si tu consulado pide traducir la apostilla, la traduzco junto con el documento, en la misma traducción jurada y el mismo PDF, y cuenta como una página más. El certificado de antecedentes penales (FBI o ACRO) cuesta ${RECORD_PRICE} € hasta ${FIXED_PRICE_MAX_PAGES} páginas, apostilla incluida; cada página por encima, ${PRICE_PER_PAGE} €. En los packs, la apostilla cuenta dentro del límite de páginas del pack.`,
  };
}

export function signedPdfFaq(locale = "es") {
  if (locale === "en") {
    return {
      q: "Will the consulate accept the signed PDF?",
      a: `Since 8 March 2025, Spain's ${SIGNATURE_ORDER} regulates sworn translations with a qualified electronic signature, and the signed PDF has the same validity as a stamped paper copy. Most consulates accept it; some still ask for paper at in-person appointments, so check your appointment instructions. If yours does, I courier the paper copy to any US address for $${US_SHIPPING_USD}.`,
    };
  }
  return {
    q: "¿Me aceptará el consulado el PDF firmado?",
    a: `Desde el 8 de marzo de 2025, la ${SIGNATURE_ORDER} regula las traducciones juradas con firma electrónica cualificada, y el PDF firmado tiene la misma validez que una copia en papel sellada. La mayoría de los consulados lo aceptan; algunos siguen pidiendo papel en las citas presenciales, así que revisa las instrucciones de tu cita. Si te lo piden, te envío la copia en papel por mensajería a Estados Unidos por ${US_SHIPPING_USD} $.`,
  };
}

export function morePagesFaq(locale = "es") {
  if (locale === "en") {
    return {
      q: "How much do I pay in total if my document has more pages?",
      a: `The FBI and ACRO criminal record certificates are priced per document: €${RECORD_PRICE} (about $${toUsd(RECORD_PRICE)}) for up to ${FIXED_PRICE_MAX_PAGES} pages and €${PRICE_PER_PAGE} for each extra page. The packs have a page limit (Spain Visa Pack, ${visa.documents} documents and ${visa.pages} pages; Family Pack, ${family.documents} and ${family.pages}; Digital Nomad Visa Pack, ${nomad.documents} and ${nomad.pages}) and each extra page is €${PRICE_PER_PAGE}. ${PACKS_COPY.en.guarantee}`,
    };
  }
  return {
    q: "¿Cuánto pago en total si mi documento tiene más páginas?",
    a: `El certificado de antecedentes penales del FBI o el ACRO tiene precio por documento: ${RECORD_PRICE} € hasta ${FIXED_PRICE_MAX_PAGES} páginas y ${PRICE_PER_PAGE} € por cada página más. Los packs tienen un límite de páginas (Spain Visa Pack, ${visa.documents} documentos y ${visa.pages} páginas; Family Pack, ${family.documents} y ${family.pages}; Digital Nomad Visa Pack, ${nomad.documents} y ${nomad.pages}) y cada página adicional cuesta ${PRICE_PER_PAGE} €. ${PACKS_COPY.es.guarantee}`,
  };
}

/** Las tres, en orden. */
export const commonFaqs = (locale = "es") => [
  apostilleFaq(locale),
  signedPdfFaq(locale),
  morePagesFaq(locale),
];
