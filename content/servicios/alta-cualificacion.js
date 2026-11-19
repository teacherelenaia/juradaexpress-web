// content/servicios/alta-cualificacion.js
//
// Página por trámite (19/11/2026): traducción jurada para la autorización y
// el visado de profesional altamente cualificado (UGE-CE, Ley 14/2013,
// art. 71). Estructura de la de nómada digital y tabla de precios de
// content/expediente.js. Requisitos contrastados el 19/11/2026 con la Hoja
// informativa 66 (inclusion.gob.es) y la página de visado del Consulado de
// España en Boston. La web NO publica umbrales salariales ni tasas.
import {
  FILE_UPLOAD,
  FILE_PER_PAGE,
  FILE_ROUTE,
  PROCEDURES_CHECKED,
  filePriceBlocks,
  fileOffers,
  fileWhatsAppFor,
} from "../expediente";
import { MAEC_LIST_URL, GUARANTEE_SHORT, URGENCY_TEXT } from "../site";
import { packPrice } from "../packs";
import { REVIEW_TEXT } from "../reviews";
import { blogPath } from "../posts-expedientes";

const PATH_ES = "/traduccion-jurada-visado-alta-cualificacion";
const PATH_EN = "/en/sworn-translation-spain-highly-qualified-visa";
const WA = fileWhatsAppFor({
  es: "profesional altamente cualificado (UGE)",
  en: "highly qualified professional (UGE) visa",
});
const HOJA66 =
  "https://www.inclusion.gob.es/web/migraciones/w/66.-autorizacion-inicial-de-residencia-y-trabajo-de-profesionales-altamente-cualificados";
const BOSTON =
  "https://www.exteriores.gob.es/Consulados/boston/en/ServiciosConsulares/Paginas/Consular/Visado-para-trabajador-altamente-cualificado-y-para-traslado-intraempresarial.aspx";
const ext = 'target="_blank" rel="noopener noreferrer"';

export const es = {
  id: "alta-cualificacion",
  locale: "es",
  path: PATH_ES,
  alternates: { es: PATH_ES, en: PATH_EN },
  crumb: "Profesionales altamente cualificados",
  metaTitle: "Traducción jurada: profesional altamente cualificado (UGE)",
  metaDescription: `Traductora jurada nº 7310. Título, experiencia y antecedentes traducidos para la autorización de alta cualificación (UGE-CE), desde ${FILE_PER_PAGE} €/pág.`,
  h1: "Traducción jurada para la autorización de profesional altamente cualificado (UGE-CE)",
  lead: "Para la autorización de residencia y trabajo de profesional altamente cualificado (Ley 14/2013) y su visado, los documentos extranjeros se presentan legalizados o apostillados y con traducción jurada al español: el título de educación superior o las cartas de experiencia, los antecedentes penales y los certificados de la familia. Soy Elena Peñaranda Ortega, traductora jurada nº 7310, y traduzco el expediente entero con un solo precio cerrado y entrega en 24 horas.",
  image: {
    src: "/fotos/acuerdo-empresa.jpg",
    alt: "Apretón de manos al cerrar un contrato de trabajo en España",
  },
  trust: [
    { text: "Traductora jurada nº 7310 del MAEC", href: MAEC_LIST_URL, label: "Comprobar el nombramiento en el listado oficial del MAEC (se abre en una pestaña nueva)" },
    { text: REVIEW_TEXT.es.total, href: REVIEW_TEXT.es.href },
    { text: GUARANTEE_SHORT.es },
  ],
  whatsapp: WA.es,
  whatsappLabel: "Pedir precio del expediente por WhatsApp",
  quoteCta: FILE_UPLOAD.es,
  serviceName: "Traducción jurada para la autorización de profesional altamente cualificado",
  serviceType: "Traducción jurada inglés-español",
  providerPerson: true,
  priceFrom: packPrice("visa"),
  offerCatalog: { name: "Precios de expediente completo", offers: fileOffers("es") },
  sections: [
    {
      id: "documentos",
      title: "¿Qué documentos necesitan traducción jurada?",
      body: [
        `La empresa presenta la autorización ante la Unidad de Grandes Empresas y Colectivos Estratégicos (UGE-CE); después pides el visado en el consulado. En las dos fases rige la misma regla: «cuando se aporten documentos de otros países deberán estar traducidos al castellano […] por un traductor jurado» (<a href="${HOJA66}" ${ext}>Hoja informativa 66</a>, comprobada el ${PROCEDURES_CHECKED.es}).`,
        {
          table: {
            caption: "Documentos de profesional altamente cualificado: apostilla y traducción jurada",
            head: ["Documento", "¿Apostilla?", "¿Traducción jurada?", "Páginas habituales"],
            rows: [
              ['<a href="/traduccion-jurada-titulo-universitario">Título de educación superior</a> (homologado si la profesión es regulada)', "Sí (legalizado o apostillado)", "Sí", "1–4"],
              ["O cartas de empleadores que acrediten la experiencia (3 años; 5 para la Tarjeta Azul UE)", "Según el consulado", "Sí", "2–6"],
              ['<a href="/traduccion-jurada-certificado-penales">Antecedentes penales</a> de los países donde has vivido (2 o 5 años, según la fase y el consulado)', "Sí", "Sí", "1–3"],
              ['<a href="/traduccion-jurada-certificado-medico">Certificado médico</a>, en la fase de visado si tu consulado lo pide', "Según el consulado", "Sí", "1–2"],
              ['<a href="/traduccion-jurada-certificado-matrimonio">Matrimonio</a> y <a href="/traduccion-jurada-partida-nacimiento">partidas de nacimiento</a> de los familiares', "Sí", "Sí", "2–6"],
              ["Contrato de trabajo con la empresa en España", "No", "Solo si no está en español", "2–10"],
              ["Pasaporte", "No", "No (se aporta copia)", "—"],
            ],
          },
        },
        `Requisitos contrastados el ${PROCEDURES_CHECKED.es} con la <a href="${HOJA66}" ${ext}>Hoja 66 del Ministerio de Inclusión</a> y la <a href="${BOSTON}" ${ext}>página de visado del consulado en Boston</a>, que piden periodos distintos de antecedentes penales. Mándame la lista de tu consulado y te digo qué se traduce.`,
        { note: "Los umbrales salariales y las tasas los fija la administración y cambian. No los publico aquí: confírmalos con la UGE-CE, tu empresa o un abogado de extranjería." },
      ],
    },
    {
      id: "precios",
      title: "¿Cuánto cuesta traducir el expediente?",
      body: [...filePriceBlocks("es"), { cta: { id: "precios" } }],
    },
    {
      id: "empresas",
      title: "Si eres la empresa o el despacho que tramita",
      body: [
        "Te traduzco el expediente de cada profesional con un solo precio y una sola fecha, y te emito la factura a nombre de la empresa o del despacho. Si mandas varios expedientes a la vez, te cierro el plazo de todos por escrito.",
        `Recibes un PDF con firma electrónica cualificada por documento, válido para la presentación telemática ante la UGE-CE. ${URGENCY_TEXT.es.sooner}`,
      ],
    },
  ],
  howTitle: "Cómo enviarlo, en tres pasos",
  steps: [
    { t: "Me mandas la carpeta", d: "Todos los documentos escaneados, por WhatsApp, email o un enlace de Drive." },
    { t: "Precio y fecha por escrito", d: "Reviso la lista, te aviso de lo que falta y te doy un solo precio.", time: "En menos de 2 horas" },
    { t: "Pagas y recibes los PDF", d: "Un PDF firmado por documento, numerado como tu carpeta.", time: "En 24 horas" },
  ],
  faq: [
    {
      q: "¿El título tiene que ir apostillado antes de traducirlo?",
      a: "Sí. La Hoja 66 pide el título «debidamente legalizado o apostillado». La apostilla va en el original y se traduce con él.",
    },
    {
      q: "¿La UGE-CE acepta la traducción en PDF firmado?",
      a: "Sí. La autorización se presenta por vía telemática y el PDF lleva firma electrónica cualificada conforme a la Orden AUC/213/2025.",
    },
    {
      q: "¿Cuánto cuesta el expediente?",
      a: `Hasta 4 documentos y 8 páginas, ${packPrice("visa")} €. De 11 a 19 páginas, nunca más de 300 €. De 20 a 30 páginas, ${FILE_PER_PAGE} € por página. Te doy el precio cerrado en menos de dos horas.`,
    },
    {
      q: "¿Trabajas con empresas y despachos?",
      a: "Sí. Factura a nombre de la empresa, un solo interlocutor y plazo por escrito para cada expediente.",
    },
  ],
  cta: {
    title: "Mándame el expediente",
    text: "Por WhatsApp o por email. En menos de dos horas tienes un solo precio y una sola fecha por escrito.",
  },
  related: [
    { href: FILE_ROUTE.es, label: "Expediente completo de visado: precios y ejemplos" },
    { href: blogPath("altaCualificacion", "es"), label: "Blog: documentos y traducción jurada para la UGE-CE" },
    { href: "/traduccion-jurada-visados-espana", label: "Traducción jurada para visados de España" },
    { href: "/traduccion-jurada-urgente-grandes-volumenes", label: "Urgentes y grandes volúmenes" },
    { href: "/traduccion-jurada-titulo-universitario", label: "Título universitario" },
  ],
  otherLangLabel: "Sworn translation for Spain's highly qualified professional visa",
};

export const en = {
  id: "alta-cualificacion",
  locale: "en",
  path: PATH_EN,
  alternates: { es: PATH_ES, en: PATH_EN },
  crumb: "Highly qualified professionals",
  metaTitle: "Sworn translation: Spain highly qualified visa (UGE)",
  metaDescription: `Sworn translator no. 7310. Degree, experience letters and criminal record translated for Spain's highly qualified permit (UGE-CE), from €${FILE_PER_PAGE}/page.`,
  h1: "Sworn translation for Spain's highly qualified professional permit (UGE-CE)",
  lead: "For Spain's residence and work permit for highly qualified professionals (Law 14/2013) and its visa, foreign documents are submitted legalised or apostilled and with a sworn translation into Spanish: your higher-education degree or experience letters, criminal record and family certificates. I'm Elena Peñaranda Ortega, sworn translator no. 7310, and I translate the whole file at one closed price, delivered within 24 hours.",
  image: {
    src: "/fotos/acuerdo-empresa.jpg",
    alt: "Handshake closing an employment contract in Spain",
  },
  trust: [
    { text: "Sworn translator no. 7310, Spain's Foreign Ministry", href: MAEC_LIST_URL, label: "Check the appointment on the Ministry's official register (opens in a new tab)" },
    { text: REVIEW_TEXT.en.total, href: REVIEW_TEXT.en.href },
    { text: GUARANTEE_SHORT.en },
  ],
  whatsapp: WA.en,
  whatsappLabel: "Get my file price on WhatsApp",
  quoteCta: FILE_UPLOAD.en,
  serviceName: "Sworn translation for Spain's highly qualified professional permit",
  serviceType: "Sworn English-Spanish translation",
  providerPerson: true,
  priceFrom: packPrice("visa"),
  offerCatalog: { name: "Full visa file prices", offers: fileOffers("en") },
  sections: [
    {
      id: "documents",
      title: "Which documents need a sworn translation?",
      body: [
        `The employer files the permit with the Unit for Large Companies and Strategic Groups (UGE-CE); you then apply for the visa at the consulate. The same rule applies at both stages: documents from other countries "must be translated into Spanish […] by a sworn translator" (<a href="${HOJA66}" ${ext}>Information sheet 66</a>, checked on ${PROCEDURES_CHECKED.en}).`,
        {
          table: {
            caption: "Highly qualified professional documents: apostille and sworn translation",
            head: ["Document", "Apostille?", "Sworn translation?", "Usual pages"],
            rows: [
              ["Higher-education degree (recognised in Spain if the profession is regulated)", "Yes (legalised or apostilled)", "Yes", "1–4"],
              ["Or employer letters proving experience (3 years; 5 for the EU Blue Card)", "Depends on the consulate", "Yes", "2–6"],
              ['<a href="/en/fbi-background-check-translation-spain">Criminal record</a> from the countries where you have lived (2 or 5 years, depending on the stage and the consulate)', "Yes", "Yes", "1–3"],
              ["Medical certificate, at the visa stage if your consulate asks for it", "Depends on the consulate", "Yes", "1–2"],
              ["Family members' marriage and birth certificates", "Yes", "Yes", "2–6"],
              ["Employment contract with the Spanish company", "No", "Only if not in Spanish", "2–10"],
              ["Passport", "No", "No (a copy is submitted)", "—"],
            ],
          },
        },
        `Requirements checked on ${PROCEDURES_CHECKED.en} against <a href="${HOJA66}" ${ext}>Information sheet 66 of Spain's Ministry of Inclusion</a> and the <a href="${BOSTON}" ${ext}>Boston consulate's visa page</a>, which ask for different criminal record periods. Send me your consulate's checklist and I'll tell you what gets translated.`,
        { note: "Salary thresholds and fees are set by the Spanish administration and change. I don't publish them here: confirm them with the UGE-CE, your employer or an immigration lawyer." },
      ],
    },
    {
      id: "prices",
      title: "How much does the file cost?",
      body: [...filePriceBlocks("en"), { cta: { id: "prices" } }],
    },
    {
      id: "employers",
      title: "If you are the employer or the law firm filing it",
      body: [
        "I translate each professional's file at one price and one delivery date, invoiced to the company or the firm. If you send several files at once, I confirm the deadline for all of them in writing.",
        `You get one PDF per document with a qualified electronic signature, valid for online submission to the UGE-CE. ${URGENCY_TEXT.en.sooner}`,
      ],
    },
  ],
  howTitle: "How to send it, in three steps",
  steps: [
    { t: "Send me the folder", d: "Every document scanned, on WhatsApp, by email or as a Drive link." },
    { t: "Price and date in writing", d: "I check the list, flag anything missing and give you one price.", time: "In under 2 hours" },
    { t: "Pay and get the PDFs", d: "One signed PDF per document, numbered like your folder.", time: "Within 24 hours" },
  ],
  faq: [
    {
      q: "Does the degree need an apostille before translation?",
      a: "Yes. Information sheet 66 asks for the degree to be \"duly legalised or apostilled\". The apostille goes on the original and is translated with it.",
    },
    {
      q: "Does the UGE-CE accept the signed PDF translation?",
      a: "Yes. The permit is filed online and the PDF carries a qualified electronic signature under Spain's Order AUC/213/2025.",
    },
    {
      q: "How much does the file cost?",
      a: `Up to 4 documents and 8 pages, €${packPrice("visa")}. 11 to 19 pages, never more than €300. 20 to 30 pages, €${FILE_PER_PAGE} per page. You get the closed price in under two hours.`,
    },
    {
      q: "Do you work with employers and law firms?",
      a: "Yes. Invoice in the company's name, one point of contact and a written deadline for each file.",
    },
  ],
  cta: {
    title: "Send me the file",
    text: "On WhatsApp or by email. In under two hours you have one price and one delivery date in writing.",
  },
  related: [
    { href: FILE_ROUTE.en, label: "Full visa file: prices and examples" },
    { href: blogPath("altaCualificacion", "en"), label: "Blog: UGE-CE documents and sworn translation" },
    { href: "/en/sworn-translations-spanish-visas", label: "Sworn translations for Spanish visas" },
    { href: "/en/urgent-sworn-translation-large-projects", label: "Urgent and large projects" },
    { href: "/en/for-immigration-law-firms", label: "For immigration law firms" },
  ],
  otherLangLabel: "Traducción jurada para profesionales altamente cualificados",
};
