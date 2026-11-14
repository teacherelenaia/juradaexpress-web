// content/packs.js
//
// Paquetes por trámite (08/10/2026): precio cerrado por lote de documentos
// habituales de un mismo trámite. Se muestran en /precios y /en/precios
// (sección «Paquetes por trámite» con un Offer por pack en el JSON-LD) y en
// las páginas de visados.
//
// 14/11/2026: los datos de cada pack (nombre, documentos incluidos, precio
// y rango «por separado») viven en content/site.js → PACKS, la única
// fuente. Este archivo los reexporta y añade los textos de la sección.
import { PRICE_PER_PAGE, PACKS, getPack, packPrice } from "./site";

export { PACKS, getPack, packPrice };

// Página adicional (extractos bancarios, pólizas o contratos) dentro del
// mismo plazo del pack, en euros: la misma cifra que el precio por página
// de los documentos largos (content/site.js → PRICE_PER_PAGE).
export const EXTRA_PAGE_PRICE = PRICE_PER_PAGE;

export const PACKS_COPY = {
  es: {
    title: "Paquetes por trámite",
    // Garantía bajo el título (14/11/2026).
    guarantee:
      "Si tus documentos por separado suman menos que el pack, pagas la suma. Un pack nunca te cuesta más.",
    // Lo que va incluido sin coste en todas las tarjetas.
    includedFree:
      "Incluye revisión de la lista de tu consulado, los mismos nombres y fechas en todos los documentos y un solo plazo de entrega.",
    // Línea de referencia bajo el precio (pack.separately).
    separatelyLabel: "Por separado:",
    separately: (s) => (s.from != null ? `desde ${s.from} €` : `hasta ${s.upTo} €`),
    intro:
      "Precio cerrado para los lotes de documentos más habituales. Si tu trámite pide algo distinto, te lo presupuesto al ver los documentos.",
    documents: (n) => `Hasta ${n} documentos`,
    extraPage: `Páginas adicionales de extractos bancarios, pólizas o contratos: ${EXTRA_PAGE_PRICE} € por página, dentro del mismo plazo.`,
    note: "Cada documento adicional fuera del paquete, a tarifa normal. Recargo de urgencia del 30 % igual que en el resto de tarifas.",
    order: "Pedir este pack",
    orderHref: "/documentos",
    whatsapp: "WhatsApp",
    whatsappText: (name, price) => `Hola, quiero el ${name} (${price} €)`,
    // Enlace desde /precios a la página de visados (08/10/2026).
    visaPage: {
      text: "Los tres paquetes de visado se explican documento a documento en la página de",
      label: "traducción jurada para visados de España",
      href: "/traduccion-jurada-visados-espana",
    },
  },
  en: {
    title: "Packs by procedure",
    guarantee:
      "If your documents cost less separately, you pay the lower amount. A pack never costs you more.",
    includedFree:
      "Includes a check against your consulate’s list, the same names and dates across every document and a single delivery deadline.",
    separatelyLabel: "Separately:",
    separately: (s) => (s.from != null ? `from €${s.from}` : `up to €${s.upTo}`),
    intro:
      "Fixed price for the most common document batches. If your procedure asks for something different, I quote it once I see the documents.",
    documents: (n) => `Up to ${n} documents`,
    extraPage: `Extra pages of bank statements, insurance policies or contracts: €${EXTRA_PAGE_PRICE} per page, within the same deadline.`,
    note: "Each additional document outside the pack is charged at the normal rate. 30% urgency surcharge, as with all other rates.",
    order: "Order this pack",
    orderHref: "/en/documentos",
    whatsapp: "WhatsApp",
    whatsappText: (name, price) => `Hi, I'd like the ${name} (€${price})`,
    // Link from /en/precios to the visa page (08/10/2026).
    visaPage: {
      text: "The three visa packs are explained document by document on the",
      label: "sworn translations for Spanish visas page",
      href: "/en/sworn-translations-spanish-visas",
    },
  },
};

export const WHATSAPP_NUMBER = "34685891214";

export function packWhatsAppUrl(pack, locale = "es") {
  const t = PACKS_COPY[locale] || PACKS_COPY.es;
  const name = pack.name[locale] || pack.name.es;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t.whatsappText(name, pack.price))}`;
}

// Offer de schema.org por pack. Sin argumentos extra, los de /precios y
// /en/precios (todos los packs, anclados a esa página). Con `ids` y `base`
// (URL absoluta de otra página, p. ej. la landing de visados), solo esos
// packs anclados a esa URL.
export function packOffers(locale = "es", { ids, base: baseUrl } = {}) {
  const base =
    baseUrl ||
    (locale === "en" ? "https://juradaexpress.es/en/precios" : "https://juradaexpress.es/precios");
  const packs = ids ? ids.map((id) => PACKS.find((p) => p.id === id)).filter(Boolean) : PACKS;
  return packs.map((p) => ({
    "@type": "Offer",
    "@id": `${base}#pack-${p.id}`,
    name: p.name[locale] || p.name.es,
    description: p.includes[locale] || p.includes.es,
    price: p.price,
    priceCurrency: "EUR",
    url: `${base}#pack-${p.id}`,
    availability: "https://schema.org/InStock",
    itemOffered: {
      "@type": "Service",
      name: p.name[locale] || p.name.es,
      serviceType: locale === "en" ? "Sworn Spanish-English translation" : "Traducción jurada español-inglés",
      provider: { "@id": "https://juradaexpress.es/#organization" },
    },
    offeredBy: { "@id": "https://juradaexpress.es/#organization" },
  }));
}
