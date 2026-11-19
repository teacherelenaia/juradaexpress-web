// content/servicios/expediente.js
//
// Página de expedientes completos de visado (19/11/2026, brief de Elena):
// /en/full-visa-file-sworn-translation-spain y
// /traduccion-jurada-expediente-completo-visado. Objetivo: que quien tiene
// un expediente entero lo envíe completo y que los asistentes encuentren una
// página que diga a quién va dirigida, qué incluye, cuánto cuesta con un
// ejemplo y en cuánto tiempo.
//
// Precios, ejemplos, trámites y botones: content/expediente.js (única
// fuente). No escribir cifras aquí.
import {
  FILE_ROUTE,
  FILE_WHATSAPP_URL,
  FILE_WHATSAPP_LABEL,
  FILE_UPLOAD,
  FILE_TABLE_COPY,
  FILE_EXAMPLES,
  FILE_PER_PAGE,
  FILE_MID_CAP,
  FILE_MID_MAX_PAGES,
  FILE_PER_PAGE_MIN,
  FILE_PER_PAGE_MAX,
  fileTableRows,
  fileOffers,
  filePrice,
  singleDocPrice,
  procedureTable,
  PROCEDURES_CHECKED,
} from "../expediente";
import { MAEC_LIST_URL, GUARANTEE_SHORT, URGENCY_TEXT, PRICE_PER_PAGE } from "../site";
import { packPrice } from "../packs";
import { REVIEW_TEXT } from "../reviews";

const PATH_ES = FILE_ROUTE.es;
const PATH_EN = FILE_ROUTE.en;
const NOMAD = FILE_EXAMPLES.find((e) => e.id === "nomad");
const P30 = filePrice(30);
const S30 = singleDocPrice(30);

export const es = {
  id: "expediente",
  locale: "es",
  path: PATH_ES,
  alternates: { es: PATH_ES, en: PATH_EN },
  crumb: "Expediente completo de visado",
  metaTitle: `Traducción jurada de expediente de visado, ${FILE_PER_PAGE} €/pág.`,
  metaDescription: `Traductora jurada nº 7310. Tu expediente de visado entero a precio cerrado: ${FILE_PER_PAGE} €/pág. de 20 a 30 páginas (30 págs., ${P30} €), entrega en 24 h.`,
  h1: `Traducción jurada de tu expediente completo de visado para España: un solo precio cerrado, desde ${FILE_PER_PAGE} € por página`,
  lead:
    "Mándame el expediente entero. Un solo precio cerrado en menos de dos horas, una sola fecha de entrega y todos los documentos firmados por la misma traductora jurada.",
  hideHeroImageMobile: true,
  image: {
    src: "/fotos/expediente-documentos.jpg",
    alt: "Manos revisando un formulario oficial sobre una carpeta con todos los documentos de un expediente de visado",
  },
  trust: [
    {
      text: "Traductora jurada nº 7310 del MAEC",
      href: MAEC_LIST_URL,
      label: "Comprobar el nombramiento nº 7310 en el listado oficial del MAEC (se abre en una pestaña nueva)",
    },
    { text: REVIEW_TEXT.es.total, href: REVIEW_TEXT.es.href },
    { text: GUARANTEE_SHORT.es },
  ],
  whatsapp: FILE_WHATSAPP_URL.es,
  whatsappLabel: FILE_WHATSAPP_LABEL.es,
  quoteCta: FILE_UPLOAD.es,
  serviceName: "Traducción jurada de expedientes completos de visado para España",
  serviceType: "Traducción jurada inglés-español",
  providerPerson: true,
  priceFrom: packPrice("visa"),
  offerCatalog: {
    name: "Precios de expediente completo de visado",
    offers: fileOffers("es"),
  },
  sections: [
    {
      id: "resumen",
      title: "¿Quién traduce el expediente completo de tu visado y cuánto cuesta?",
      body: [
        `Soy Elena Peñaranda Ortega, traductora jurada de inglés nombrada por el Ministerio de Asuntos Exteriores con el nº 7310, y traduzco expedientes completos de visado para España (nómada digital, no lucrativo, estudiante, alta cualificación y reagrupación familiar) del inglés al español, o del español al inglés, con un solo precio cerrado. Un expediente de ${FILE_PER_PAGE_MIN} a ${FILE_PER_PAGE_MAX} páginas cuesta ${FILE_PER_PAGE} € por página, IVA incluido (30 páginas, ${P30} €), y uno de 11 a ${FILE_MID_MAX_PAGES} páginas, nunca más de ${FILE_MID_CAP} €. El presupuesto te llega en menos de dos horas y los PDF firmados, en 24 horas hasta 30 páginas; con más, en la fecha que te confirmo por escrito.`,
      ],
    },
    {
      id: "precios",
      title: "Precio del expediente completo según su tamaño",
      body: [
        {
          table: {
            caption: FILE_TABLE_COPY.es.caption,
            head: FILE_TABLE_COPY.es.head,
            rows: fileTableRows("es"),
          },
        },
        { list: FILE_TABLE_COPY.es.rules },
        { cta: { id: "precios" } },
      ],
    },
    {
      id: "ejemplos",
      title: "Tres expedientes de ejemplo, con páginas, precio y plazo",
      body: [
        `Expedientes típicos, sin datos de ningún cliente. Las páginas son las del original, apostillas incluidas; el precio tachado son esas mismas páginas a ${PRICE_PER_PAGE} € como documento suelto.`,
        { examples: FILE_EXAMPLES },
        `El de nómada digital: ${NOMAD.pages} páginas, ${NOMAD.price} € en vez de ${NOMAD.single} € a la tarifa de documento suelto. Te ahorras ${NOMAD.single - NOMAD.price} €.`,
        { cta: { id: "ejemplos" } },
      ],
    },
    {
      id: "por-que-entero",
      title: "¿Por qué conviene enviarlo entero?",
      body: [
        {
          list: [
            "<strong>Un solo precio.</strong> Sabes lo que pagas por todo antes de empezar, por escrito.",
            "<strong>Una sola fecha.</strong> Todo llega el mismo día; no persigues documentos sueltos antes de la cita.",
            "<strong>La misma terminología en todos los documentos.</strong> Tu nombre, el de la empresa y las cifras se escriben igual en el contrato, en las nóminas y en los extractos. Es lo primero que comprueba quien revisa el expediente.",
            "<strong>Un PDF firmado por documento</strong>, numerado como tu carpeta y listo para el consulado o la UGE.",
          ],
        },
      ],
    },
    {
      id: "tramites",
      title: "Qué se traduce en cada trámite",
      body: [
        `Documentos habituales de cada visado o autorización, cuáles llevan traducción jurada y cuántas páginas suelen sumar. Requisitos contrastados con la fuente oficial el ${PROCEDURES_CHECKED.es}; tu consulado puede pedir algo más, así que mándame su lista.`,
        { table: procedureTable("es") },
      ],
    },
    {
      id: "no-cuenta",
      title: "Qué no cuenta en el expediente",
      body: [
        {
          list: [
            "La copia del pasaporte: se presenta tal cual, sin traducción.",
            "Los documentos que ya están en español.",
            "Los documentos que tu consulado o la UGE no piden traducidos. Si dudas, te lo digo al revisar la lista.",
          ],
        },
      ],
    },
    {
      id: "pago",
      title: "Pago y entrega",
      body: [
        "Pagas con tarjeta en euros, dólares o libras a través de Stripe; también por transferencia o Wise.",
        "Presupuesto y entrega todos los días, sábados y domingos incluidos. De 9:00 a 23:00 (hora de Madrid) el presupuesto de un expediente sale en menos de dos horas; si me escribes de noche, lo tienes antes de las 9:00.",
        `Recibes un PDF con firma electrónica cualificada por documento, válido para la presentación telemática. Si tu consulado pide papel, te lo envío por mensajería. ${URGENCY_TEXT.es.sooner}`,
      ],
    },
  ],
  howTitle: "Cómo traducir tu expediente completo, en tres pasos",
  steps: [
    {
      t: "Me mandas la carpeta",
      d: "Todos los documentos escaneados, con apostillas y reversos, por WhatsApp, email o un enlace de Drive. Dime el trámite y el consulado.",
    },
    {
      t: "Precio y fecha por escrito",
      d: "Reviso la lista, te aviso de lo que falta y te doy un solo precio cerrado y una sola fecha.",
      time: "En menos de 2 horas",
    },
    {
      t: "Pagas y recibes los PDF",
      d: "Un PDF firmado por documento, numerado como tu carpeta.",
      time: "En 24 horas hasta 30 páginas",
    },
  ],
  faq: [
    {
      q: "¿Cuánto cuesta traducir un expediente completo de visado de nómada digital?",
      a: `Depende de las páginas. Hasta 5 documentos y 10 páginas, ${packPrice("nomad")} € (Digital Nomad Visa Pack). De 11 a ${FILE_MID_MAX_PAGES} páginas, nunca más de ${FILE_MID_CAP} €. De ${FILE_PER_PAGE_MIN} a ${FILE_PER_PAGE_MAX} páginas, ${FILE_PER_PAGE} € por página. Un expediente típico con contrato, carta de la empresa, nóminas, extractos de 3 meses y antecedentes penales suma unas ${NOMAD.pages} páginas: ${NOMAD.price} € en vez de ${NOMAD.single} €.`,
    },
    {
      q: "¿Quién traduce el expediente entero para un visado de España?",
      a: "Un traductor jurado nombrado por el Ministerio de Asuntos Exteriores de España. Yo soy Elena Peñaranda Ortega, nº 7310: traduzco, firmo y sello cada documento del expediente, sin subcontratar. El nombramiento se comprueba en el listado oficial del MAEC.",
    },
    {
      q: "¿Hay que traducir los extractos bancarios enteros?",
      a: `Depende del consulado: muchos piden los últimos 3 a 6 meses. Si tu consulado no exige el extracto completo, puedo traducir solo las páginas que necesitas, con una nota de lo omitido. Cada página cuenta para el total del expediente: de ${FILE_PER_PAGE_MIN} a ${FILE_PER_PAGE_MAX} páginas, a ${FILE_PER_PAGE} €.`,
    },
    {
      q: "¿Puedo pagar en dólares o en libras?",
      a: "Sí. Pagas con tarjeta a través de Stripe en dólares, libras o euros; también por transferencia o Wise.",
    },
    {
      q: "¿Entregas en fin de semana?",
      a: "Sí. Presupuesto y entrega todos los días, sábados y domingos incluidos. De 9:00 a 23:00 (hora de Madrid) el presupuesto sale en menos de dos horas; si escribes de noche, antes de las 9:00.",
    },
    {
      q: "¿Cuánto tarda un expediente de 30 páginas?",
      a: `24 horas desde que confirmas el presupuesto. Cuesta ${P30} € (${S30} € como documentos sueltos). ${URGENCY_TEXT.es.sooner}`,
    },
    {
      q: "¿El PDF firmado lo acepta el consulado o la UGE?",
      a: "Sí. Lleva firma electrónica cualificada conforme a la Orden AUC/213/2025 y vale para la presentación telemática ante la UGE y los consulados. Si tu consulado pide papel en la cita, te envío la copia sellada por mensajería.",
    },
    {
      q: "¿Qué pasa si luego me piden un documento más?",
      a: "Me lo mandas y lo traduzco con los mismos nombres y la misma terminología que el resto. Te digo el precio por escrito antes de empezar, y nunca más de lo que costaría como documento suelto.",
    },
  ],
  cta: {
    title: "Mándame el expediente y te digo el precio cerrado",
    text: "Por WhatsApp o por email, con el trámite y el consulado. En menos de dos horas tienes un solo precio y una sola fecha por escrito.",
  },
  related: [
    { href: "/traduccion-jurada-visados-espana", label: "Traducción jurada para visados de España" },
    { href: "/traduccion-jurada-visado-nomada-digital", label: "Visado de nómada digital" },
    { href: "/traduccion-jurada-visado-estudiante", label: "Visado de estudiante" },
    { href: "/traduccion-jurada-visado-alta-cualificacion", label: "Profesionales altamente cualificados (UGE-CE)" },
    { href: "/documentos-visado-no-lucrativo-espana", label: "Guía: documentos del visado no lucrativo" },
    { href: "/documentos-visado-nomada-digital-espana", label: "Guía: documentos del visado de nómada digital" },
    { href: "/traduccion-jurada-antecedentes-fbi", label: "Certificado del FBI" },
    { href: "/traduccion-jurada-acro-reino-unido", label: "Certificado ACRO" },
    { href: "/traduccion-jurada-urgente-grandes-volumenes", label: "Urgentes y grandes volúmenes" },
    { href: "/precios", label: "Precios" },
  ],
  otherLangLabel: "Sworn translation of your full Spain visa file",
};

export const en = {
  id: "expediente",
  locale: "en",
  path: PATH_EN,
  alternates: { es: PATH_ES, en: PATH_EN },
  crumb: "Full visa file",
  metaTitle: `Full Spain visa file sworn translation from €${FILE_PER_PAGE}/page`,
  metaDescription: `Sworn translator no. 7310. Your whole Spain visa file at one closed price: €${FILE_PER_PAGE}/page for 20–30 pages (30 pages, €${P30}), delivered in 24 h.`,
  h1: `Sworn translation of your full Spain visa file: one closed price, from €${FILE_PER_PAGE} per page`,
  lead:
    "Send me the whole file. One closed price in under two hours, one delivery date, every document signed by the same sworn translator.",
  hideHeroImageMobile: true,
  image: {
    src: "/fotos/expediente-documentos.jpg",
    alt: "Hands checking an official form on a folder holding every document of a visa file",
  },
  trust: [
    {
      text: "Sworn translator no. 7310, Spain's Foreign Ministry",
      href: MAEC_LIST_URL,
      label: "Check appointment no. 7310 on the Ministry's official register (opens in a new tab)",
    },
    { text: REVIEW_TEXT.en.total, href: REVIEW_TEXT.en.href },
    { text: GUARANTEE_SHORT.en },
  ],
  whatsapp: FILE_WHATSAPP_URL.en,
  whatsappLabel: FILE_WHATSAPP_LABEL.en,
  quoteCta: FILE_UPLOAD.en,
  serviceName: "Sworn translation of full Spanish visa files",
  serviceType: "Sworn English-Spanish translation",
  providerPerson: true,
  priceFrom: packPrice("visa"),
  offerCatalog: {
    name: "Full visa file prices",
    offers: fileOffers("en"),
  },
  sections: [
    {
      id: "summary",
      title: "Who translates your full visa file, and how much does it cost?",
      body: [
        `I'm Elena Peñaranda Ortega, sworn English translator appointed by Spain's Ministry of Foreign Affairs (no. 7310), and I translate complete Spanish visa files (digital nomad, non-lucrative, student, highly qualified and family reunification) from English into Spanish, or Spanish into English, at one closed price. A file of ${FILE_PER_PAGE_MIN} to ${FILE_PER_PAGE_MAX} pages costs €${FILE_PER_PAGE} per page, VAT included (30 pages, €${P30}), and a file of 11 to ${FILE_MID_MAX_PAGES} pages never more than €${FILE_MID_CAP}. You get the quote in under two hours and the signed PDFs within 24 hours for up to 30 pages; longer files, on the date I confirm in writing.`,
      ],
    },
    {
      id: "prices",
      title: "Full visa file price by size",
      body: [
        {
          table: {
            caption: FILE_TABLE_COPY.en.caption,
            head: FILE_TABLE_COPY.en.head,
            rows: fileTableRows("en"),
          },
        },
        { list: FILE_TABLE_COPY.en.rules },
        { cta: { id: "prices" } },
      ],
    },
    {
      id: "examples",
      title: "Three example files, with pages, price and delivery",
      body: [
        `Typical files, with no client's details. Page counts are for the originals, apostilles included; the struck-through price is the same pages at the €${PRICE_PER_PAGE} single-document rate.`,
        { examples: FILE_EXAMPLES },
        `The digital nomad file: ${NOMAD.pages} pages, €${NOMAD.price} instead of €${NOMAD.single} at the single-document rate. You save €${NOMAD.single - NOMAD.price}.`,
        { cta: { id: "examples" } },
      ],
    },
    {
      id: "why-whole",
      title: "Why send the whole file?",
      body: [
        {
          list: [
            "<strong>One price.</strong> You know what the whole file costs, in writing, before I start.",
            "<strong>One date.</strong> Everything arrives the same day; no chasing single documents before your appointment.",
            "<strong>The same terminology in every document.</strong> Your name, your employer's name and the figures read the same in the contract, the payslips and the bank statements. It is the first thing the examiner checks.",
            "<strong>One signed PDF per document</strong>, numbered like your folder and ready for the consulate or the UGE.",
          ],
        },
      ],
    },
    {
      id: "procedures",
      title: "What gets translated for each procedure",
      body: [
        `Usual documents for each visa or permit, which ones need a sworn translation and how many pages they usually add up to. Requirements checked against the official source on ${PROCEDURES_CHECKED.en}; your consulate may ask for more, so send me its checklist.`,
        { table: procedureTable("en") },
      ],
    },
    {
      id: "not-counted",
      title: "What doesn't count towards the file",
      body: [
        {
          list: [
            "Your passport copy: it is submitted as it is, without translation.",
            "Documents already in Spanish.",
            "Documents your consulate or the UGE doesn't ask to have translated. If in doubt, I tell you when I review the list.",
          ],
        },
      ],
    },
    {
      id: "payment",
      title: "Payment and delivery",
      body: [
        "You pay by card in euros, US dollars or pounds through Stripe; bank transfer and Wise also work.",
        "Quotes and delivery every day, Saturdays and Sundays included. Between 9:00 and 23:00 Madrid time a file quote takes under two hours; if you write overnight, you have it before 9:00.",
        `You get one PDF per document with a qualified electronic signature, valid for online submission. If your consulate asks for paper, I courier it to you. ${URGENCY_TEXT.en.sooner}`,
      ],
    },
  ],
  howTitle: "How to get your full visa file translated, in three steps",
  steps: [
    {
      t: "Send me the folder",
      d: "Every document scanned, with apostilles and backs, on WhatsApp, by email or as a Drive link. Tell me the procedure and the consulate.",
    },
    {
      t: "Price and date in writing",
      d: "I check the list, flag anything missing and give you one closed price and one delivery date.",
      time: "In under 2 hours",
    },
    {
      t: "Pay and get the PDFs",
      d: "One signed PDF per document, numbered like your folder.",
      time: "Within 24 hours up to 30 pages",
    },
  ],
  faq: [
    {
      q: "How much does it cost to translate a full digital nomad visa file?",
      a: `It depends on the pages. Up to 5 documents and 10 pages, €${packPrice("nomad")} (Digital Nomad Visa Pack). 11 to ${FILE_MID_MAX_PAGES} pages, never more than €${FILE_MID_CAP}. ${FILE_PER_PAGE_MIN} to ${FILE_PER_PAGE_MAX} pages, €${FILE_PER_PAGE} per page. A typical file with an employment contract, employer letter, payslips, 3 months of bank statements and a criminal record check comes to about ${NOMAD.pages} pages: €${NOMAD.price} instead of €${NOMAD.single}.`,
    },
    {
      q: "Who translates the whole file for a Spanish visa?",
      a: "A sworn translator appointed by Spain's Ministry of Foreign Affairs. I'm Elena Peñaranda Ortega, no. 7310: I translate, sign and stamp every document in your file myself, without subcontracting. You can check the appointment on the Ministry's official register.",
    },
    {
      q: "Do bank statements have to be translated in full?",
      a: `It depends on the consulate: many ask for the last 3 to 6 months. If yours doesn't require the full statement, I can translate only the pages you need, with a note of what was left out. Every page counts towards the file total: €${FILE_PER_PAGE} per page from ${FILE_PER_PAGE_MIN} to ${FILE_PER_PAGE_MAX} pages.`,
    },
    {
      q: "Can I pay in US dollars or pounds?",
      a: "Yes. You pay by card through Stripe in dollars, pounds or euros; bank transfer and Wise also work.",
    },
    {
      q: "Do you deliver at weekends?",
      a: "Yes. Quotes and delivery every day, Saturdays and Sundays included. Between 9:00 and 23:00 Madrid time a quote takes under two hours; if you write overnight, you have it before 9:00.",
    },
    {
      q: "How long does a 30-page file take?",
      a: `24 hours from when you confirm the quote. It costs €${P30} (€${S30} as single documents). ${URGENCY_TEXT.en.sooner}`,
    },
    {
      q: "Will the consulate or the UGE accept the signed PDF?",
      a: "Yes. It carries a qualified electronic signature under Spain's Order AUC/213/2025 and is valid for online submission to the UGE and the consulates. If your consulate asks for paper at the appointment, I courier the stamped copy to you.",
    },
    {
      q: "What if they ask me for one more document later?",
      a: "Send it to me and I translate it with the same names and terminology as the rest. You get the price in writing before I start, and never more than it would cost as a single document.",
    },
  ],
  cta: {
    title: "Send me your file and get a closed price",
    text: "On WhatsApp or by email, with the procedure and the consulate. In under two hours you have one price and one delivery date in writing.",
  },
  related: [
    { href: "/en/sworn-translations-spanish-visas", label: "Sworn translations for Spanish visas" },
    { href: "/en/sworn-translation-spain-digital-nomad-visa", label: "Digital nomad visa" },
    { href: "/en/sworn-translation-spain-student-visa", label: "Student visa" },
    { href: "/en/sworn-translation-spain-highly-qualified-visa", label: "Highly qualified professionals (UGE-CE)" },
    { href: "/en/spain-non-lucrative-visa-documents-checklist", label: "Guide: non-lucrative visa documents" },
    { href: "/en/spain-digital-nomad-visa-documents-checklist", label: "Guide: digital nomad visa documents" },
    { href: "/en/fbi-background-check-translation-spain", label: "FBI background check" },
    { href: "/en/acro-police-certificate-translation-spain", label: "ACRO police certificate" },
    { href: "/en/urgent-sworn-translation-large-projects", label: "Urgent and large projects" },
    { href: "/en/precios", label: "Pricing" },
  ],
  otherLangLabel: "Traducción jurada de tu expediente completo de visado",
};
