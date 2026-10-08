// content/packs.js
//
// Paquetes por trámite (08/10/2026): precio cerrado por lote de documentos
// habituales de un mismo trámite. Se muestran en /precios y /en/precios
// (sección «Paquetes por trámite» con un Offer por pack en el JSON-LD). El
// pack de nómada digital usa el mismo precio que DNV_PACK_PRICE en
// content/site.js (la landing de nómada digital lo lee de ahí).
//
// Cada pack: id, name (ES/EN), includes (ES/EN), documents (número máximo
// de documentos) y price (euros, IVA incluido).

export const PACKS = [
  {
    id: "visa",
    name: { es: "Spain Visa Pack", en: "Spain Visa Pack" },
    includes: {
      es: "Hasta 4 documentos de hasta 2 páginas: FBI o antecedentes penales, certificado médico, partida de nacimiento o matrimonio, y las apostillas solo si tu consulado exige traducirlas.",
      en: "Up to 4 documents of up to 2 pages: FBI or police check, medical certificate, birth or marriage certificate, and apostilles only if your consulate requires them translated.",
    },
    documents: 4,
    price: 129,
  },
  {
    id: "visa-family",
    name: { es: "Spain Visa Family Pack", en: "Spain Visa Family Pack" },
    includes: {
      es: "Hasta 8 documentos: lo anterior para dos adultos, más certificado de matrimonio y partidas de los hijos.",
      en: "Up to 8 documents: the above for two adults plus marriage certificate and children's birth certificates.",
    },
    documents: 8,
    price: 229,
  },
  {
    id: "nomad",
    name: { es: "Digital Nomad Visa Pack", en: "Digital Nomad Visa Pack" },
    includes: {
      es: "Hasta 6 documentos de hasta 2 páginas: carta de la empresa o del cliente, antecedentes penales, título, certificado del seguro, prueba de ingresos y certificado de relación; los contratos largos, por página.",
      en: "Up to 6 documents of up to 2 pages: employer or client letter, police check, degree, insurance certificate, proof of income and relationship certificate; long contracts by the page.",
    },
    documents: 6,
    price: 189,
  },
  {
    id: "ireland-uk",
    name: { es: "Pack Irlanda / Reino Unido", en: "Ireland / UK Pack" },
    includes: {
      es: "Hasta 6 documentos: título, expediente, antecedentes penales, certificado de delitos sexuales y dos referencias laborales.",
      en: "Up to 6 documents: degree, transcript, police check, sexual offences certificate and two employer references.",
    },
    documents: 6,
    price: 169,
  },
  {
    id: "driving",
    name: { es: "Driving Licence Pack", en: "Driving Licence Pack" },
    includes: {
      es: "Carné por las dos caras y certificado o historial de la autoridad emisora.",
      en: "Licence (both sides) and the issuing authority's certificate or driving record.",
    },
    documents: 2,
    price: 69,
  },
];

// Página adicional (extractos bancarios, pólizas o contratos) dentro del
// mismo plazo del pack, en euros.
export const EXTRA_PAGE_PRICE = 20;

export const PACKS_COPY = {
  es: {
    title: "Paquetes por trámite",
    intro:
      "Precio cerrado para los lotes de documentos más habituales. Si tu trámite pide algo distinto, te lo presupuesto al ver los documentos.",
    documents: (n) => `Hasta ${n} documentos`,
    extraPage: `Páginas adicionales de extractos bancarios, pólizas o contratos: ${EXTRA_PAGE_PRICE} € por página, dentro del mismo plazo.`,
    note: "Cada documento adicional fuera del paquete, a tarifa normal. Recargo de urgencia del 30 % igual que en el resto de tarifas.",
    order: "Pedir este pack",
    orderHref: "/documentos",
    whatsapp: "WhatsApp",
    whatsappText: (name, price) => `Hola, quiero el ${name} (${price} €)`,
  },
  en: {
    title: "Packs by procedure",
    intro:
      "Fixed price for the most common document batches. If your procedure asks for something different, I quote it once I see the documents.",
    documents: (n) => `Up to ${n} documents`,
    extraPage: `Extra pages of bank statements, insurance policies or contracts: €${EXTRA_PAGE_PRICE} per page, within the same deadline.`,
    note: "Each additional document outside the pack is charged at the normal rate. 30% urgency surcharge, as with all other rates.",
    order: "Order this pack",
    orderHref: "/en/documentos",
    whatsapp: "WhatsApp",
    whatsappText: (name, price) => `Hi, I'd like the ${name} (€${price})`,
  },
};

export const WHATSAPP_NUMBER = "34685891214";

export function packWhatsAppUrl(pack, locale = "es") {
  const t = PACKS_COPY[locale] || PACKS_COPY.es;
  const name = pack.name[locale] || pack.name.es;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t.whatsappText(name, pack.price))}`;
}

// Offer de schema.org por pack (JSON-LD de /precios y /en/precios).
export function packOffers(locale = "es") {
  const base = locale === "en" ? "https://juradaexpress.es/en/precios" : "https://juradaexpress.es/precios";
  return PACKS.map((p) => ({
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
