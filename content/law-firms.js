// content/law-firms.js
//
// Landing para despachos de inmigración de EE. UU. (2026-10), solo en
// inglés y en primera persona (Elena): /en/for-immigration-law-firms,
// generada con app/components/LawFirmPage.js. Sigue el patrón de
// content/us-docs.js: precios en dólares calculados desde
// content/documents.js con toUsd (content/usd.js), nunca escritos a mano.
// Extensión objetivo: 900-1.200 palabras renderizadas.
import { DOCUMENTS } from "./documents";
import { US_DOCS, RATE_NOTE, US_SHIPPING_USD, toUsd } from "./us-docs";
import { SERVICE_ROUTES, LAW_FIRMS_ROUTE } from "./servicios/routes";
import { MAEC_NUMBER, SINCE } from "./persona";

const USCIS = SERVICE_ROUTES.find((r) => r.id === "uscis");

// Condiciones para despachos (encargo de Elena, 03/10/2026).
export const FIRM_DISCOUNT = 0.1; // descuento por volumen
export const FIRM_DISCOUNT_MIN_DOCS = 10; // documentos al mes para aplicarlo
export const FIRM_PAYMENT_DAYS = 30; // factura mensual, pago a 30 días

const discountPct = Math.round(FIRM_DISCOUNT * 100);
const QUOTE = "Fixed quote in 2 hours";
const usd = (eur) => (eur != null ? `$${toUsd(eur)}` : QUOTE);
const catalog = (id) => DOCUMENTS.find((d) => d.id === id);

// Tabla de precios: las seis landings de documento para EE. UU. (mismo
// precio que en cada una) más los documentos de catálogo con precio que
// también llegan en expedientes de inmigración.
const PRICE_ROWS = [
  ...US_DOCS.map((d) => ({
    label: d.short,
    href: d.path,
    price: d.priceUsd != null ? `$${d.priceUsd}` : QUOTE,
  })),
  ...["permiso-conducir", "certificado-empresa"].map((id) => ({
    label: catalog(id).nameEn,
    price: usd(catalog(id).price),
  })),
  { label: "Court judgments, deeds, transcripts and anything else", price: QUOTE },
];

export const LAW_FIRMS = {
  id: "law-firms",
  path: LAW_FIRMS_ROUTE.en,
  crumb: LAW_FIRMS_ROUTE.labelEn,
  crumbParent: { href: USCIS.en, label: USCIS.labelEn },
  metaTitle: "Spanish Document Translation for US Immigration Law Firms",
  metaDescription:
    "Certified Spanish to English translation for US immigration law firms: same-day delivery up to 10 pages, monthly invoice, USD. Sworn translator no. 7310.",
  eyebrow: "Spanish document translation for US immigration law firms",
  hero: "Your paralegals upload, I translate and certify, you get one invoice a month.",
  chip: `Sworn translator no. ${MAEC_NUMBER} · Spain · since ${SINCE}`,
  lead:
    "I am Elena Peñaranda Ortega, a sworn translator appointed by Spain's Ministry of Foreign Affairs. I translate the Spanish-language documents in your clients' files into English and certify each one for USCIS under 8 CFR § 103.2(b)(3). Every translation is done and signed by me, and your firm deals with one person from the upload to the invoice.",
  image: {
    src: "/fotos/irlanda-despacho.jpg",
    alt: "Desk with client documents ready for certified translation",
  },
  whatsapp: `https://wa.me/34685891214?text=${encodeURIComponent(
    "Hi Elena, I am writing from an immigration law firm in the US. We need certified translations of Spanish documents for USCIS."
  )}`,
  orderLabel: "Send your first document",
  whatsappLabel: "Ask me on WhatsApp",

  how: {
    title: "How it works for firms",
    intro:
      "There is no portal to learn and no account manager. Your team uses one form and gets one answer.",
    steps: [
      {
        t: "Upload",
        d: "Your paralegal sends the scan through the order form below, with the firm name and your client or matter reference.",
      },
      {
        t: "Quote in 2 hours",
        d: "I reply with a fixed price in US dollars and a delivery date within 2 working hours. Listed documents cost what the table says.",
      },
      {
        t: "Signed PDF the same day",
        d: "Files of up to 10 pages come back the same working day, each with its own certification page. Longer files get a written deadline before I start.",
      },
      {
        t: "Paper copy if you need it",
        d: `If the case calls for the original with my handwritten signature, I courier it to your office for a flat $${US_SHIPPING_USD}.`,
      },
    ],
  },

  included: {
    title: "What's included",
    intro: "The price per document covers all of this, with no extras added later:",
    items: [
      {
        t: "USCIS certification page",
        d: "A signed and dated <em>Certificate of Translation Accuracy</em> for every document, with my statement of competence, name, stamp and contact details. No notary is needed.",
      },
      {
        t: "Free pre-filing review of any Spanish document",
        d: "Before you file, send me any Spanish document in the case and I will tell you whether it is the version USCIS expects (long-form record or extract), whether pages or stamps are missing and whether it is legible. I do this at no charge, even if I do not translate it.",
      },
      {
        t: "Consistent terminology across a client's file",
        d: "Names, both surnames, registry references and the titles of Spanish authorities are rendered the same way in every document of the same client, so an officer comparing the birth certificate with the marriage record finds no discrepancy to question.",
      },
    ],
  },

  prices: {
    title: "Fixed prices in USD",
    intro:
      "These are per-document prices, the same ones I publish for individual clients. Your paralegals can quote them to a client before the document reaches me.",
    caption: "Price per document in US dollars for immigration law firms",
    head: ["Spanish document", "Price per document"],
    rows: PRICE_ROWS,
    discount: `<strong>${discountPct}% off from ${FIRM_DISCOUNT_MIN_DOCS} documents a month.</strong> When your firm sends ${FIRM_DISCOUNT_MIN_DOCS} or more documents in a calendar month, I take ${discountPct}% off that month's invoice. There is no minimum volume and no retainer.`,
    rateNote: RATE_NOTE,
  },

  invoicing: {
    title: "Monthly invoicing",
    body: [
      `Individual clients pay before I start. Firms do not: I send <strong>one invoice per firm</strong> at the end of each month, itemised by client or matter reference so your bookkeeper can rebill each case, payable <strong>net ${FIRM_PAYMENT_DAYS}</strong>.`,
      "You pay in US dollars, by <strong>card through Stripe</strong> or by transfer to my <strong>Wise USD account</strong>, which works like a domestic transfer from a US bank. The dollar amount on the invoice is the amount you pay.",
    ],
  },

  trial: {
    title: "Free trial: one document at no charge",
    text: "Send me one document from a live case. I translate it, certify it and deliver the signed PDF exactly as I would for a paying client, and I do not invoice it. If the result is not what your firm needs, you owe me nothing.",
  },

  order: {
    title: "Order form for law firms",
  },

  faq: [
    {
      q: "Do the translations need to be notarised?",
      a: "No. USCIS requires the translator's signed certification of completeness, accuracy and competence, not a notary. If a state court or another agency asks your client for a notarised translation, tell me before I start and we will look at the options.",
    },
    {
      q: "What is the turnaround?",
      a: "Documents of up to 10 pages are translated, certified and delivered the same working day, Spain time. Larger files get a written deadline before I start, normally 24-72 hours. An order sent from the US in the afternoon is under way first thing the next morning in Spain.",
    },
    {
      q: "Who signs the certification?",
      a: `I do, on every document. I am sworn translator no. ${MAEC_NUMBER}, appointed by Spain's Ministry of Foreign Affairs in ${SINCE}, and I do not subcontract: the person who translates is the person who signs and the person who answers if an officer has a question.`,
    },
    {
      q: "How do you handle confidentiality, and where are client documents stored?",
      a: "I work from Spain under the EU's GDPR and I sign a confidentiality agreement before seeing any document if your firm needs one. Files sent through the order form go to private storage, are forwarded to my inbox and are then deleted from that storage. Some of the providers behind the website (hosting, payments) are based in the United States and operate under the EU-US Data Privacy Framework, as set out in the privacy policy.",
    },
    {
      q: "How do we open an account?",
      a: "There is nothing to sign. Send the first document through the order form with your firm name: that one is free. From then on, every order carrying the same firm name goes on the monthly invoice.",
    },
    {
      q: "Do the Spanish documents need an apostille?",
      a: "Usually not for USCIS, which asks for the document and its certified translation, not for legalisation. If a document already carries a Hague apostille, I translate it too, because the translation must be complete.",
    },
  ],

  cta: {
    title: "Try it with one document",
    text: "Send a document from a case you are working on now. The first one is free, and you will know by the end of the day whether this works for your firm.",
  },
  related: [
    { href: USCIS.en, label: "What USCIS requires in a translation" },
    ...US_DOCS.slice(0, 3).map((d) => ({ href: d.path, label: d.short })),
    { href: "/en/about", label: "About me" },
  ],
};
