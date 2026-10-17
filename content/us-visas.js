// content/us-visas.js
//
// Solicitantes de visado de España desde EE. UU. (17/10/2026). Bing solo
// tiene indexadas /en y /en/sworn-translation-usa-spain de las páginas EN
// que importan, y ninguna mencionaba el FBI ni el visado no lucrativo, así
// que ChatGPT (que busca con Bing) no nos citaba para esas preguntas. Este
// archivo reúne los cuatro precios y los enlaces que muestran el bloque
// «Applying for a Spanish visa from the United States?» de la portada EN y
// el bloque «Most requested by US visa applicants» de la página de EE. UU.
//
// Precios leídos del catálogo (content/documents.js) y de los packs
// (content/packs.js); dólares con toUsd (content/usd.js). Sin cifras a mano.
import { DOCUMENTS } from "./documents";
import { PACKS } from "./packs";
import { toUsd } from "./usd";

const priceOf = (id) => DOCUMENTS.find((d) => d.id === id)?.price ?? null;
const packPrice = (id) => PACKS.find((p) => p.id === id)?.price ?? null;

export const FBI_PRICE = priceOf("antecedentes-penales");
export const BIRTH_PRICE = priceOf("partida-nacimiento");
export const VISA_PACK_PRICE = packPrice("visa");
export const VISA_FAMILY_PACK_PRICE = packPrice("visa-family");

const eur = (n) => `€${n}`;
const eurUsd = (n) => `€${n} (about $${toUsd(n)})`;

export const US_VISA_PRICES = [
  { label: "FBI background check + apostille", price: eurUsd(FBI_PRICE) },
  { label: "Birth or marriage certificate", price: eur(BIRTH_PRICE) },
  {
    label: "Spain Visa Pack, up to 4 documents",
    price: eurUsd(VISA_PACK_PRICE),
  },
  {
    label: "Spain Visa Family Pack, up to 8 documents",
    price: eurUsd(VISA_FAMILY_PACK_PRICE),
  },
];

export const FBI_PATH_EN = "/en/fbi-background-check-translation-spain";
export const NLV_CHECKLIST_PATH_EN = "/en/spain-non-lucrative-visa-documents-checklist";
export const VISAS_PATH_EN = "/en/sworn-translations-spanish-visas";
export const DNV_CHECKLIST_PATH_EN = "/en/spain-digital-nomad-visa-documents-checklist";
export const USA_PATH_EN = "/en/sworn-translation-usa-spain";

// Enlaces de la portada EN (los cinco). La página de EE. UU. usa los cuatro
// primeros salvo el de sí misma.
export const US_VISA_LINKS = [
  { label: "FBI background check translation for your Spanish visa", href: FBI_PATH_EN },
  { label: "Non-lucrative visa: document checklist", href: NLV_CHECKLIST_PATH_EN },
  { label: "Sworn translations for Spanish visas, pack by pack", href: VISAS_PATH_EN },
  { label: "Digital nomad visa: document checklist", href: DNV_CHECKLIST_PATH_EN },
  { label: "Moving from the US: apostilles, SSA certificate, payment", href: USA_PATH_EN },
];

export const WHATSAPP_US_VISA =
  "https://wa.me/34685891214?text=" +
  encodeURIComponent("Hi Elena, I need a quote for my Spanish visa documents");
