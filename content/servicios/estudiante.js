// content/servicios/estudiante.js
//
// Página por trámite (19/11/2026): traducción jurada para el visado de
// estudiante (estancia por estudios). Estructura de la de nómada digital y
// tabla de precios de content/expediente.js. Requisitos contrastados el
// 19/11/2026 con la Hoja informativa 1 (inclusion.gob.es) y la página de
// visado de estudios del Consulado de España en Londres. La web NO publica
// umbrales económicos, tasas ni plazos administrativos.
import {
  FILE_UPLOAD,
  FILE_PER_PAGE,
  FILE_ROUTE,
  FILE_EXAMPLES,
  PROCEDURES_CHECKED,
  filePriceBlocks,
  fileOffers,
  fileWhatsAppFor,
} from "../expediente";
import { MAEC_LIST_URL, GUARANTEE_SHORT, URGENCY_TEXT } from "../site";
import { packPrice } from "../packs";
import { REVIEW_TEXT } from "../reviews";
import { blogPath } from "../posts-expedientes";

const PATH_ES = "/traduccion-jurada-visado-estudiante";
const PATH_EN = "/en/sworn-translation-spain-student-visa";
const WA = fileWhatsAppFor({ es: "visado de estudiante", en: "student visa" });
const EX = FILE_EXAMPLES.find((e) => e.id === "student");
const HOJA1 = "https://www.inclusion.gob.es/web/migraciones/w/estancia-por-estudios";
const LONDON =
  "https://www.exteriores.gob.es/Consulados/londres/en/ServiciosConsulares/Paginas/Consular/Visado-de-estudios.aspx";
const ext = 'target="_blank" rel="noopener noreferrer"';

export const es = {
  id: "estudiante",
  locale: "es",
  path: PATH_ES,
  alternates: { es: PATH_ES, en: PATH_EN },
  crumb: "Visado de estudiante",
  metaTitle: "Traducción jurada para el visado de estudiante en España",
  metaDescription: `Traductora jurada nº 7310. Qué documentos del visado de estudiante llevan traducción jurada y precio del expediente: ${FILE_PER_PAGE} €/pág. de 20 a 30 páginas.`,
  h1: "Traducción jurada para el visado de estudiante en España",
  lead: `Para el visado de estudiante (estancia por estudios), todo documento extranjero que no esté en español se presenta con traducción jurada: antecedentes penales, certificado médico, medios económicos y la carta de quien te mantiene. Soy Elena Peñaranda Ortega, traductora jurada nº 7310, y traduzco tu expediente entero con un solo precio cerrado: un expediente típico de ${EX.pages} páginas cuesta ${EX.price} €, con entrega en 24 horas.`,
  image: {
    src: "/fotos/expediente-documentos.jpg",
    alt: "Carpeta con los documentos de un expediente de visado de estudiante sobre una mesa",
  },
  trust: [
    { text: "Traductora jurada nº 7310 del MAEC", href: MAEC_LIST_URL, label: "Comprobar el nombramiento en el listado oficial del MAEC (se abre en una pestaña nueva)" },
    { text: REVIEW_TEXT.es.total, href: REVIEW_TEXT.es.href },
    { text: GUARANTEE_SHORT.es },
  ],
  whatsapp: WA.es,
  whatsappLabel: "Pedir precio del expediente por WhatsApp",
  quoteCta: FILE_UPLOAD.es,
  serviceName: "Traducción jurada del expediente de visado de estudiante para España",
  serviceType: "Traducción jurada inglés-español",
  providerPerson: true,
  priceFrom: packPrice("visa"),
  offerCatalog: { name: "Precios de expediente completo", offers: fileOffers("es") },
  sections: [
    {
      id: "documentos",
      title: "¿Qué documentos del visado de estudiante necesitan traducción jurada?",
      body: [
        `La regla oficial es la misma para todo el expediente: «cuando se aporten documentos de otros países deberán estar traducidos al castellano […] por un traductor jurado», y los documentos públicos, legalizados o apostillados (<a href="${HOJA1}" ${ext}>Hoja informativa 1</a>, comprobada el ${PROCEDURES_CHECKED.es}). Esta es la lista habitual:`,
        {
          table: {
            caption: "Documentos del visado de estudiante: apostilla y traducción jurada",
            head: ["Documento", "¿Apostilla?", "¿Traducción jurada?", "Páginas habituales"],
            rows: [
              ["Carta de admisión del centro y justificante del pago de la matrícula", "No", "Sí, si no está en español", "1–3"],
              ["Medios económicos: extractos bancarios (el consulado de Londres pide 6 meses) o becas", "No", "Sí", "6–18"],
              ["Carta de quien te mantiene, ante notario, y su partida de nacimiento", "Sí", "Sí", "2–4"],
              ['<a href="/traduccion-jurada-certificado-penales">Antecedentes penales</a> de los últimos 5 años (estancias de más de 6 meses, mayores de edad)', "Sí", "Sí", "1–3"],
              ['<a href="/traduccion-jurada-certificado-medico">Certificado médico</a> (Reglamento Sanitario Internacional de 2005), si pides el visado desde fuera de España', "Según el consulado", "Sí", "1–2"],
              ["Seguro médico", "No", "Sí, si no está en español", "1–4"],
              ["Autorización de los padres, si tienes 17 años", "Sí", "Sí", "1–2"],
              ['<a href="/traduccion-jurada-titulo-universitario">Título y expediente académico</a>, si el centro o el consulado los piden', "Sí", "Sí", "2–6"],
              ["Pasaporte", "No", "No (se aporta copia)", "—"],
            ],
          },
        },
        `Requisitos contrastados el ${PROCEDURES_CHECKED.es} con la <a href="${HOJA1}" ${ext}>Hoja 1 del Ministerio de Inclusión</a> y la <a href="${LONDON}" ${ext}>página de visado de estudios del consulado en Londres</a>. Tu consulado puede pedir algo más: mándame su lista.`,
        { note: "Los importes de medios económicos y las tasas los fija la administración y cambian. No los publico aquí: confírmalos con tu consulado. Yo me ocupo de los documentos y la traducción." },
      ],
    },
    {
      id: "precios",
      title: "¿Cuánto cuesta traducir el expediente de estudiante?",
      body: [
        `Un expediente típico (admisión, medios económicos, antecedentes penales, título) suma ${EX.pages} páginas: ${EX.price} € en vez de ${EX.single} € como documentos sueltos, entrega en 24 horas.`,
        ...filePriceBlocks("es"),
        { cta: { id: "precios" } },
      ],
    },
    {
      id: "envio",
      title: "¿Cómo me envías los documentos?",
      body: [
        {
          list: [
            "Una sola carpeta con todo escaneado, apostillas y reversos incluidos. Las fotos de móvil valen si se leen bien.",
            "Dime en qué consulado pides el visado y la fecha de la cita, si la tienes.",
            "En menos de dos horas tienes un solo precio cerrado y una sola fecha por escrito, todos los días, sábados y domingos incluidos.",
          ],
        },
        `Recibes un PDF con firma electrónica cualificada por cada documento; si el consulado pide papel, te lo envío por mensajería. ${URGENCY_TEXT.es.sooner}`,
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
      q: "¿Cuánto cuesta traducir el expediente del visado de estudiante?",
      a: `Hasta 4 documentos y 8 páginas, ${packPrice("visa")} € (Spain Visa Pack). De 11 a 19 páginas, nunca más de 300 €. De 20 a 30 páginas, ${FILE_PER_PAGE} € por página: un expediente de ${EX.pages} páginas, ${EX.price} €.`,
    },
    {
      q: "¿El certificado de antecedentes penales necesita traducción jurada?",
      a: "Sí, si la estancia es de más de 6 meses y eres mayor de edad. Va apostillado y traducido por un traductor jurado; el consulado de Londres indica que no puede tener más de 6 meses.",
    },
    {
      q: "¿Hay que traducir los extractos bancarios?",
      a: "Sí, si no están en español. Cada página cuenta para el total del expediente; si tu consulado no pide el extracto completo, traduzco solo las páginas necesarias con una nota de lo omitido.",
    },
    {
      q: "¿Vale la traducción después, ya en España?",
      a: "Sí. Una traducción jurada de España vale ante la Oficina de Extranjería para la TIE, ante la universidad y ante cualquier organismo español.",
    },
  ],
  cta: {
    title: "Mándame tu expediente de estudiante",
    text: "Por WhatsApp o por email, con el consulado. En menos de dos horas tienes un solo precio y una sola fecha por escrito.",
  },
  related: [
    { href: FILE_ROUTE.es, label: "Expediente completo de visado: precios y ejemplos" },
    { href: blogPath("estudiante", "es"), label: "Blog: qué documentos del visado de estudiante llevan traducción jurada" },
    { href: "/traduccion-jurada-visados-espana", label: "Traducción jurada para visados de España" },
    { href: "/traduccion-jurada-antecedentes-fbi", label: "Certificado del FBI" },
    { href: "/traduccion-jurada-acro-reino-unido", label: "Certificado ACRO" },
    { href: "/traduccion-jurada-titulo-universitario", label: "Título universitario" },
  ],
  otherLangLabel: "Sworn translation for a Spanish student visa",
};

export const en = {
  id: "estudiante",
  locale: "en",
  path: PATH_EN,
  alternates: { es: PATH_ES, en: PATH_EN },
  crumb: "Student visa",
  metaTitle: "Sworn translation for a Spanish student visa",
  metaDescription: `Sworn translator no. 7310. Which Spanish student visa documents need a sworn translation, and the full file price: €${FILE_PER_PAGE}/page for 20–30 pages.`,
  h1: "Sworn translation for a Spanish student visa",
  lead: `For a Spanish student visa (student stay), every foreign document not in Spanish is submitted with a sworn translation: criminal record, medical certificate, proof of means and your sponsor's letter. I'm Elena Peñaranda Ortega, sworn translator no. 7310, and I translate your whole file at one closed price: a typical ${EX.pages}-page file costs €${EX.price}, delivered within 24 hours.`,
  image: {
    src: "/fotos/expediente-documentos.jpg",
    alt: "Folder with the documents of a student visa file on a desk",
  },
  trust: [
    { text: "Sworn translator no. 7310, Spain's Foreign Ministry", href: MAEC_LIST_URL, label: "Check the appointment on the Ministry's official register (opens in a new tab)" },
    { text: REVIEW_TEXT.en.total, href: REVIEW_TEXT.en.href },
    { text: GUARANTEE_SHORT.en },
  ],
  whatsapp: WA.en,
  whatsappLabel: "Get my file price on WhatsApp",
  quoteCta: FILE_UPLOAD.en,
  serviceName: "Sworn translation of Spanish student visa files",
  serviceType: "Sworn English-Spanish translation",
  providerPerson: true,
  priceFrom: packPrice("visa"),
  offerCatalog: { name: "Full visa file prices", offers: fileOffers("en") },
  sections: [
    {
      id: "documents",
      title: "Which student visa documents need a sworn translation?",
      body: [
        `The official rule covers the whole file: documents from other countries "must be translated into Spanish […] by a sworn translator", and public documents must be legalised or apostilled (<a href="${HOJA1}" ${ext}>Information sheet 1</a>, checked on ${PROCEDURES_CHECKED.en}). This is the usual list:`,
        {
          table: {
            caption: "Spanish student visa documents: apostille and sworn translation",
            head: ["Document", "Apostille?", "Sworn translation?", "Usual pages"],
            rows: [
              ["Admission letter and proof that enrolment fees are paid", "No", "Yes, if not in Spanish", "1–3"],
              ["Proof of means: bank statements (the London consulate asks for 6 months) or scholarships", "No", "Yes", "6–18"],
              ["Notarised sponsor letter and the sponsor's birth certificate", "Yes", "Yes", "2–4"],
              ['<a href="/en/fbi-background-check-translation-spain">Criminal record</a> for the last 5 years (stays over 6 months, adults)', "Yes", "Yes", "1–3"],
              ["Medical certificate (2005 International Health Regulations), if you apply from outside Spain", "Depends on the consulate", "Yes", "1–2"],
              ["Health insurance", "No", "Yes, if not in Spanish", "1–4"],
              ["Parental authorisation, if you are 17", "Yes", "Yes", "1–2"],
              ["Degree and academic transcript, if the school or consulate asks for them", "Yes", "Yes", "2–6"],
              ["Passport", "No", "No (a copy is submitted)", "—"],
            ],
          },
        },
        `Requirements checked on ${PROCEDURES_CHECKED.en} against <a href="${HOJA1}" ${ext}>Information sheet 1 of Spain's Ministry of Inclusion</a> and the <a href="${LONDON}" ${ext}>London consulate's student visa page</a>. Your consulate may ask for more: send me its checklist.`,
        { note: "Financial thresholds and fees are set by the Spanish administration and change. I don't publish them here: confirm them with your consulate. I take care of the documents and the translation." },
      ],
    },
    {
      id: "prices",
      title: "How much does a student visa file cost?",
      body: [
        `A typical file (admission, proof of means, criminal record, degree) comes to ${EX.pages} pages: €${EX.price} instead of €${EX.single} as single documents, delivered within 24 hours.`,
        ...filePriceBlocks("en"),
        { cta: { id: "prices" } },
      ],
    },
    {
      id: "sending",
      title: "How do you send me the documents?",
      body: [
        {
          list: [
            "One folder with everything scanned, apostilles and backs included. Phone photos are fine if they are legible.",
            "Tell me which consulate you're applying at and your appointment date, if you have one.",
            "Within two hours you get one closed price and one delivery date in writing, every day, weekends included.",
          ],
        },
        `You get one PDF per document with a qualified electronic signature; if the consulate asks for paper, I courier it to you. ${URGENCY_TEXT.en.sooner}`,
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
      q: "How much does it cost to translate a student visa file?",
      a: `Up to 4 documents and 8 pages, €${packPrice("visa")} (Spain Visa Pack). 11 to 19 pages, never more than €300. 20 to 30 pages, €${FILE_PER_PAGE} per page: a ${EX.pages}-page file, €${EX.price}.`,
    },
    {
      q: "Does the criminal record check need a sworn translation?",
      a: "Yes, if the stay is over 6 months and you are an adult. It is apostilled and translated by a sworn translator; the London consulate says it must be no older than 6 months.",
    },
    {
      q: "Do bank statements have to be translated?",
      a: "Yes, if they are not in Spanish. Every page counts towards the file total; if your consulate doesn't need the full statement, I translate only the pages required, with a note of what was left out.",
    },
    {
      q: "Is the translation still valid once I'm in Spain?",
      a: "Yes. A sworn translation from Spain is valid at the immigration office for your TIE, at the university and before any Spanish authority.",
    },
  ],
  cta: {
    title: "Send me your student visa file",
    text: "On WhatsApp or by email, with your consulate. In under two hours you have one price and one delivery date in writing.",
  },
  related: [
    { href: FILE_ROUTE.en, label: "Full visa file: prices and examples" },
    { href: blogPath("estudiante", "en"), label: "Blog: which student visa documents need a sworn translation" },
    { href: "/en/sworn-translations-spanish-visas", label: "Sworn translations for Spanish visas" },
    { href: "/en/fbi-background-check-translation-spain", label: "FBI background check" },
    { href: "/en/acro-police-certificate-translation-spain", label: "ACRO police certificate" },
  ],
  otherLangLabel: "Traducción jurada para el visado de estudiante",
};
