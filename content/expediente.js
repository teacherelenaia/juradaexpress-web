// content/expediente.js
//
// Expedientes completos de visado (19/11/2026): ÚNICO sitio con los tramos
// de precio, los ejemplos y los textos de «expediente largo». Lo leen la
// página /en/full-visa-file-sworn-translation-spain y su par en español
// (content/servicios/expediente.js), las páginas de visados, nómada digital,
// estudiante, alta cualificación y grandes volúmenes, /precios, las portadas,
// /llms.txt y content/site.js → packLimits().
//
// Precios confirmados por Elena el 19/11/2026. Son los únicos que se
// publican: no añadir cifras, descuentos ni mínimos.
//
//   Hasta 4 documentos y 8 páginas            149 € (Spain Visa Pack)
//   Hasta 5 documentos y 10 páginas           249 € (Digital Nomad Visa Pack)
//   Hasta 8 documentos y 16 páginas, 2 adultos 299 € (Family Pack)
//   De 11 a 19 páginas                         precio cerrado, nunca más de 300 €
//   De 20 a 30 páginas                         15 € por página
//   Más de 30 páginas                          precio cerrado, sin cifra publicada
//
// Los 15 € por página valen para cualquier tipo de documento y en los dos
// sentidos. Regla de los packs: si los documentos sueltos cuestan menos, se
// paga lo menor. La tarifa de 20 € por página (PRICE_PER_PAGE) queda como
// tarifa de documento suelto largo y sirve para enseñar el ahorro.
//
// Sin dependencias de React: lo importan también /llms.txt y content/site.js
// (este archivo NO importa de site.js para no crear un ciclo).
import { PRICE_PER_PAGE, URGENCY_SURCHARGE } from "./pricing.js";

export const FILE_PER_PAGE = 15;
export const FILE_MID_MIN_PAGES = 11;
export const FILE_MID_MAX_PAGES = 19;
export const FILE_MID_CAP = 300;
export const FILE_PER_PAGE_MIN = 20;
export const FILE_PER_PAGE_MAX = 30;
const URGENCY_PCT = Math.round(URGENCY_SURCHARGE * 100);

/** Precio publicado de un expediente de `pages` páginas entre 20 y 30 (o null). */
export function filePrice(pages) {
  const n = Math.floor(Number(pages) || 0);
  if (n < FILE_PER_PAGE_MIN || n > FILE_PER_PAGE_MAX) return null;
  return n * FILE_PER_PAGE;
}
/** Lo mismo a tarifa de documento suelto largo (20 € por página). */
export const singleDocPrice = (pages) => pages * PRICE_PER_PAGE;

// Extractos bancarios (brief de Elena, 19/11/2026): la web dice lo mismo en
// todas partes. Depende de dónde se presente la solicitud: los consulados de
// Washington y Los Ángeles indican que no hace falta traducirlos; Londres no
// lo aclara; ante la UGE, en España, los documentos extranjeros van con
// traducción jurada. Se enlaza siempre el artículo 2 del blog
// (content/posts-expedientes.js usa este mismo slug).
export const STATEMENTS_SLUG = {
  es: "hay-que-traducir-extractos-bancarios-visado-espana",
  en: "do-bank-statements-need-sworn-translation-spain-visa",
};
export const STATEMENTS_POST = {
  es: `/blog/${STATEMENTS_SLUG.es}`,
  en: `/en/blog/${STATEMENTS_SLUG.en}`,
};
const STATEMENTS_LINK = {
  es: `<a href="${STATEMENTS_POST.es}">¿Hay que traducir los extractos bancarios?</a>`,
  en: `<a href="${STATEMENTS_POST.en}">Do bank statements need a sworn translation?</a>`,
};
/** Regla completa, texto plano (FAQ y llms.txt). */
export const STATEMENTS_RULE = {
  es: "Los extractos bancarios no siempre se traducen: depende de dónde presentes la solicitud. Los consulados de España en Washington y Los Ángeles indican que no hace falta traducirlos; el de Londres no lo aclara y conviene preguntar; ante la UGE, en España, los documentos extranjeros van traducidos por traductor jurado.",
  en: "Bank statements are not always translated: it depends on where you apply. Spain's consulates in Washington and Los Angeles state that they don't need translating; the London consulate doesn't say, so ask; with the UGE in Spain, foreign documents go in with a sworn translation.",
};
/** Regla completa con enlace al artículo (bloques HTML). */
export const STATEMENTS_RULE_HTML = {
  es: `${STATEMENTS_RULE.es} ${STATEMENTS_LINK.es}`,
  en: `${STATEMENTS_RULE.en} ${STATEMENTS_LINK.en}`,
};
/** Nota corta para tablas de páginas y ejemplos que cuentan extractos. */
export const STATEMENTS_NOTE = {
  es: "Los extractos no siempre se traducen: depende de dónde presentes la solicitud.",
  en: "Bank statements are not always translated: it depends on where you apply.",
};
export const STATEMENTS_NOTE_HTML = {
  es: `${STATEMENTS_NOTE.es} ${STATEMENTS_LINK.es}`,
  en: `${STATEMENTS_NOTE.en} ${STATEMENTS_LINK.en}`,
};

export const FILE_ROUTE = {
  es: "/traduccion-jurada-expediente-completo-visado",
  en: "/en/full-visa-file-sworn-translation-spain",
};

// WhatsApp de expediente (punto 8 del brief): texto distinto del de
// documento suelto para que el agente de WhatsApp reconozca el expediente
// desde la primera línea. La referencia JX la añade app/lib/waOrigin.js al
// final del mensaje, como en el resto de enlaces.
export const FILE_WHATSAPP_TEXT = {
  es: "Hola, quiero un precio cerrado para mi expediente completo de visado",
  en: "Hi, I'd like a closed price for my full visa file",
};
export const FILE_WHATSAPP_URL = {
  es: `https://wa.me/34685891214?text=${encodeURIComponent(FILE_WHATSAPP_TEXT.es)}`,
  en: `https://wa.me/34685891214?text=${encodeURIComponent(FILE_WHATSAPP_TEXT.en)}`,
};
export const FILE_WHATSAPP_LABEL = {
  es: "Pedir precio del expediente por WhatsApp",
  en: "Get my file price on WhatsApp",
};
// Segundo botón: enviar los documentos por email (admite muchos adjuntos o
// un enlace de Drive/WeTransfer). La calculadora de la web solo calcula
// documentos sueltos y admite 5 archivos; la opción «expediente completo»
// de la calculadora queda para un segundo PR (punto 9 del brief).
const mail = (subject, body) =>
  `mailto:info@juradaexpress.es?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
export const FILE_UPLOAD = {
  es: {
    label: "Enviar mis documentos por email",
    href: mail(
      "Expediente completo de visado",
      "Hola Elena,\n\nTe envío mi expediente completo para que me des un precio cerrado.\nTrámite (nómada digital, no lucrativo, estudiante, alta cualificación, reagrupación…):\nConsulado o UGE:\nFecha de la cita, si la tengo:\n\nAdjunto los documentos o un enlace de Drive/WeTransfer.\n"
    ),
  },
  en: {
    label: "Email my documents",
    href: mail(
      "Full visa file",
      "Hi Elena,\n\nHere is my full visa file for a closed price.\nProcedure (digital nomad, non-lucrative, student, highly qualified, family reunification…):\nConsulate or UGE:\nAppointment date, if I have one:\n\nThe documents are attached, or here is a Drive/WeTransfer link.\n"
    ),
  },
};

// Frase de «expediente más largo» que sustituye a «cada página adicional,
// 20 €» en los packs de visado (punto 2 del brief).
export const LONGER_FILES = {
  es: `Expedientes más largos: precio cerrado por el expediente completo, nunca más de ${FILE_MID_CAP} € hasta ${FILE_MID_MAX_PAGES} páginas, y ${FILE_PER_PAGE} € por página de ${FILE_PER_PAGE_MIN} a ${FILE_PER_PAGE_MAX} páginas`,
  en: `Longer files: closed price for the whole file, never more than €${FILE_MID_CAP} up to ${FILE_MID_MAX_PAGES} pages, and €${FILE_PER_PAGE} per page from ${FILE_PER_PAGE_MIN} to ${FILE_PER_PAGE_MAX} pages`,
};
// Versión corta para dentro de una frase (límites de pack).
export const LONGER_FILES_SHORT = {
  es: `expediente más largo, precio cerrado: nunca más de ${FILE_MID_CAP} € hasta ${FILE_MID_MAX_PAGES} páginas y ${FILE_PER_PAGE} € por página de ${FILE_PER_PAGE_MIN} a ${FILE_PER_PAGE_MAX}`,
  en: `longer file, closed price: never more than €${FILE_MID_CAP} up to ${FILE_MID_MAX_PAGES} pages and €${FILE_PER_PAGE} per page from ${FILE_PER_PAGE_MIN} to ${FILE_PER_PAGE_MAX}`,
};
// Con enlace a la página de expedientes (HTML para los bloques de texto).
export const LONGER_FILES_HTML = {
  es: `${LONGER_FILES.es}. <a href="${FILE_ROUTE.es}">Precios y ejemplos de expediente completo</a>.`,
  en: `${LONGER_FILES.en}. <a href="${FILE_ROUTE.en}">Full visa file prices and examples</a>.`,
};

// Tramos de la tabla. `price` (número) solo en los tramos con cifra; los
// que la tienen generan un Offer en el JSON-LD. `save` = ahorro frente a la
// tarifa de documento suelto largo (solo en el tramo de 20 a 30 páginas).
export const FILE_TIERS = [
  {
    id: "visa",
    size: { es: "Hasta 4 documentos y 8 páginas", en: "Up to 4 documents and 8 pages" },
    price: 149,
    priceText: { es: "149 €", en: "€149" },
    note: { es: "Spain Visa Pack", en: "Spain Visa Pack" },
  },
  {
    id: "nomad",
    size: { es: "Hasta 5 documentos y 10 páginas", en: "Up to 5 documents and 10 pages" },
    price: 249,
    priceText: { es: "249 €", en: "€249" },
    note: { es: "Digital Nomad Visa Pack", en: "Digital Nomad Visa Pack" },
  },
  {
    id: "visa-family",
    size: {
      es: "Hasta 8 documentos y 16 páginas, dos adultos",
      en: "Up to 8 documents and 16 pages, two adults",
    },
    price: 299,
    priceText: { es: "299 €", en: "€299" },
    note: { es: "Spain Visa Family Pack", en: "Spain Visa Family Pack" },
  },
  {
    id: "mid",
    size: {
      es: `De ${FILE_MID_MIN_PAGES} a ${FILE_MID_MAX_PAGES} páginas`,
      en: `${FILE_MID_MIN_PAGES} to ${FILE_MID_MAX_PAGES} pages`,
    },
    price: null,
    maxPrice: FILE_MID_CAP,
    priceText: {
      es: `Precio cerrado, nunca más de ${FILE_MID_CAP} €`,
      en: `Closed price, never more than €${FILE_MID_CAP}`,
    },
    note: { es: "Expediente completo", en: "Full file" },
  },
  {
    id: "per-page",
    size: {
      es: `De ${FILE_PER_PAGE_MIN} a ${FILE_PER_PAGE_MAX} páginas`,
      en: `${FILE_PER_PAGE_MIN} to ${FILE_PER_PAGE_MAX} pages`,
    },
    price: FILE_PER_PAGE,
    perPage: true,
    priceText: {
      es: `${FILE_PER_PAGE} € por página: ${filePrice(20)} € por 20, ${filePrice(25)} € por 25, ${filePrice(30)} € por 30`,
      en: `€${FILE_PER_PAGE} per page: €${filePrice(20)} for 20, €${filePrice(25)} for 25, €${filePrice(30)} for 30`,
    },
    save: {
      es: [20, 25, 30]
        .map((n) => `${n} págs.: ahorras ${singleDocPrice(n) - filePrice(n)} € (${singleDocPrice(n)} € a ${PRICE_PER_PAGE} €/pág.)`)
        .join("; "),
      en: [20, 25, 30]
        .map((n) => `${n} pages: you save €${singleDocPrice(n) - filePrice(n)} (€${singleDocPrice(n)} at €${PRICE_PER_PAGE}/page)`)
        .join("; "),
    },
    note: { es: "Expediente completo", en: "Full file" },
  },
  {
    id: "over",
    size: {
      es: `Más de ${FILE_PER_PAGE_MAX} páginas`,
      en: `Over ${FILE_PER_PAGE_MAX} pages`,
    },
    price: null,
    priceText: {
      es: "Precio cerrado por el expediente completo",
      en: "Closed price for the whole file",
    },
    note: { es: "Te lo doy en menos de 2 horas", en: "Quoted in under 2 hours" },
  },
];

export const FILE_TABLE_COPY = {
  es: {
    caption: "Precio de la traducción jurada de un expediente completo de visado según su tamaño",
    head: ["Tamaño del expediente", "Precio, IVA incluido", "Qué es", `Ahorro frente a documento suelto (${PRICE_PER_PAGE} €/pág.)`],
    noSave: "—",
    rules: [
      `Los ${FILE_PER_PAGE} € por página valen para cualquier documento (contratos, nóminas, extractos, títulos) y en los dos sentidos: inglés a español y español a inglés.`,
      "Si tus documentos sueltos cuestan menos que el pack o que el expediente, pagas lo menor.",
      `Documento suelto largo: ${PRICE_PER_PAGE} € por página. Con el expediente completo, 30 páginas son ${filePrice(30)} € en vez de ${singleDocPrice(30)} €.`,
      `¿Lo necesitas antes del plazo normal? Recargo de urgencia de hasta el ${URGENCY_PCT} %; te lo digo antes de confirmar.`,
    ],
  },
  en: {
    caption: "Price of a sworn translation of a full Spanish visa file by size",
    head: ["File size", "Price, VAT included", "What it is", `Saving vs single long documents (€${PRICE_PER_PAGE}/page)`],
    noSave: "—",
    rules: [
      `The €${FILE_PER_PAGE} per page applies to any document (contracts, payslips, bank statements, degrees) and in both directions: English to Spanish and Spanish to English.`,
      "If your documents cost less one by one than the pack or the file price, you pay the lower amount.",
      `Single long document: €${PRICE_PER_PAGE} per page. As a full file, 30 pages cost €${filePrice(30)} instead of €${singleDocPrice(30)}.`,
      `Need it faster than standard? Urgency surcharge of up to ${URGENCY_PCT}%; I tell you before you confirm.`,
    ],
  },
};

// Filas de la tabla en HTML (para el bloque { table } de ServicePage).
export function fileTableRows(locale = "es") {
  const t = FILE_TABLE_COPY[locale] || FILE_TABLE_COPY.es;
  return FILE_TIERS.map((tier) => [
    tier.size[locale],
    `<strong>${tier.priceText[locale]}</strong>`,
    tier.note[locale],
    tier.save ? tier.save[locale] : t.noSave,
  ]);
}

// Offers del JSON-LD: solo los tramos con cifra publicada.
export function fileOffers(locale = "es") {
  const en = locale === "en";
  return FILE_TIERS.filter((t) => t.price != null || t.maxPrice != null).map((t) =>
    t.maxPrice != null
      ? {
          name: en
            ? `Full visa file, ${FILE_MID_MIN_PAGES} to ${FILE_MID_MAX_PAGES} pages`
            : `Expediente completo de ${FILE_MID_MIN_PAGES} a ${FILE_MID_MAX_PAGES} páginas`,
          description: t.priceText[locale],
          maxPrice: t.maxPrice,
        }
      :
    t.perPage
      ? {
          name: en
            ? `Full visa file, ${FILE_PER_PAGE_MIN} to ${FILE_PER_PAGE_MAX} pages`
            : `Expediente completo de ${FILE_PER_PAGE_MIN} a ${FILE_PER_PAGE_MAX} páginas`,
          description: t.priceText[locale],
          price: t.price,
          unitText: en ? "page" : "página",
        }
      : {
          name: `${t.note[locale]}: ${t.size[locale].toLowerCase()}`,
          description: t.size[locale],
          price: t.price,
        }
  );
}

// Tres ejemplos de expediente (sin nombres de clientes). Páginas
// orientativas de un expediente típico; precio según la tabla.
export const FILE_EXAMPLES = [
  {
    id: "nomad",
    title: { es: "Visado de nómada digital", en: "Digital nomad visa" },
    docs: [
      { es: "Contrato de trabajo", en: "Employment contract", pages: 8 },
      { es: "Carta de la empresa que autoriza el teletrabajo", en: "Employer letter authorising remote work", pages: 2 },
      { es: "Nóminas de 3 meses", en: "Payslips, 3 months", pages: 3 },
      { es: "Extractos bancarios de 3 meses", en: "Bank statements, 3 months", pages: 14 },
      { es: "Antecedentes penales (FBI o ACRO) con apostilla", en: "Criminal record (FBI or ACRO) with apostille", pages: 3 },
    ],
  },
  {
    id: "non-lucrative",
    title: { es: "Visado no lucrativo (pareja)", en: "Non-lucrative visa (couple)" },
    docs: [
      { es: "Extractos bancarios y de inversiones de 6 meses", en: "Bank and investment statements, 6 months", pages: 16 },
      { es: "Antecedentes penales con apostilla, dos adultos", en: "Criminal records with apostille, two adults", pages: 4 },
      { es: "Certificados médicos, dos adultos", en: "Medical certificates, two adults", pages: 2 },
      { es: "Certificado de matrimonio con apostilla", en: "Marriage certificate with apostille", pages: 2 },
    ],
  },
  {
    id: "student",
    title: { es: "Visado de estudiante", en: "Student visa" },
    docs: [
      { es: "Carta de admisión y matrícula", en: "Admission and enrolment letter", pages: 2 },
      { es: "Medios económicos: extractos y carta de quien te mantiene", en: "Proof of funds: bank statements and sponsor letter", pages: 10 },
      { es: "Antecedentes penales con apostilla", en: "Criminal record with apostille", pages: 3 },
      { es: "Título y expediente académico", en: "Degree and academic transcript", pages: 5 },
    ],
  },
].map((ex) => {
  const pages = ex.docs.reduce((n, d) => n + d.pages, 0);
  return { ...ex, pages, price: filePrice(pages), single: singleDocPrice(pages) };
});

/** Ejemplo en una línea: «Nómada digital: 30 páginas, 450 € (600 € suelto), en 24 horas». */
export function exampleLine(ex, locale = "es") {
  return locale === "en"
    ? `${ex.title.en}: ${ex.pages} pages, €${ex.price} (€${ex.single} at the single-document rate of €${PRICE_PER_PAGE}/page), delivered within 24 hours`
    : `${ex.title.es}: ${ex.pages} páginas, ${ex.price} € (${ex.single} € a la tarifa de documento suelto, ${PRICE_PER_PAGE} €/pág.), entrega en 24 horas`;
}

// ---------------------------------------------------------------------------
// Tabla por trámite (punto 1 del brief). Requisitos contrastados con la
// fuente oficial el 19/11/2026 (hojas informativas de inclusion.gob.es y
// páginas de visado de los consulados de España). Regla común de las hojas
// 1, 8 y 66: «cuando se aporten documentos de otros países deberán estar
// traducidos al castellano […] por un traductor jurado» y legalizados o
// apostillados. Las páginas son orientativas (expedientes que recibe Elena).
// La web NO publica umbrales económicos ni tasas.
// ---------------------------------------------------------------------------
export const PROCEDURES_CHECKED = { es: "19/11/2026", en: "19 November 2026" };

const NEW_TAB = { es: "se abre en una pestaña nueva", en: "opens in a new tab" };
const src = (href, label) => ({ href, label });
const renderSources = (list, locale) =>
  (Array.isArray(list) ? list : [list])
    .map(
      (x) =>
        `<a href="${x.href}" target="_blank" rel="noopener noreferrer">${x.label[locale]}<span class="sr-only"> (${NEW_TAB[locale]})</span></a>`
    )
    .join(" · ");

export const FILE_PROCEDURES = [
  {
    id: "nomad",
    name: { es: "Nómada digital (teletrabajo internacional)", en: "Digital nomad (international remote work)" },
    href: { es: "/traduccion-jurada-visado-nomada-digital", en: "/en/sworn-translation-spain-digital-nomad-visa" },
    docs: {
      es: "Contrato o carta de la empresa, certificado de actividad de la empresa, título o experiencia, nóminas y extractos, antecedentes penales, seguro, certificados de familiares",
      en: "Employment contract or employer letter, company activity certificate, degree or experience, payslips and statements, criminal record, insurance, family certificates",
    },
    sworn: {
      es: "Todos los documentos extranjeros que no estén en español; los públicos, además, apostillados. Los extractos, según dónde presentes la solicitud",
      en: "Every foreign document not in Spanish; public documents also apostilled. Bank statements depend on where you apply",
    },
    pages: { es: "20–30", en: "20–30" },
    source: src(
      "https://www.exteriores.gob.es/Consulados/houston/en/ServiciosConsulares/Paginas/Consular/TELEWORK-Visa-(Digital-Nomad-Visa)-.aspx",
      { es: "Consulado de España en Houston", en: "Spanish consulate in Houston" }
    ),
  },
  {
    id: "non-lucrative",
    name: { es: "Residencia no lucrativa", en: "Non-lucrative residence" },
    href: { es: "/documentos-visado-no-lucrativo-espana", en: "/en/spain-non-lucrative-visa-documents-checklist" },
    docs: {
      es: "Medios económicos (extractos, pensiones, inversiones), antecedentes penales de los últimos 5 años, certificado médico, seguro, matrimonio o nacimiento de familiares",
      en: "Proof of means (statements, pensions, investments), criminal record for the last 5 years, medical certificate, insurance, family marriage or birth certificates",
    },
    sworn: {
      es: "Antecedentes penales y certificado médico (traducción jurada expresa) y certificados familiares. Los extractos, según dónde presentes la solicitud (Washington no los pide traducidos)",
      en: "Criminal record and medical certificate (sworn translation stated explicitly) and family certificates. Bank statements depend on where you apply (Washington doesn't ask for them translated)",
    },
    pages: { es: "15–30", en: "15–30" },
    source: src(
      "https://www.exteriores.gob.es/Consulados/londres/en/ServiciosConsulares/Paginas/Consular/Visado-de-residencia-no-lucrativa.aspx",
      { es: "Consulado de España en Londres", en: "Spanish consulate in London" }
    ),
  },
  {
    id: "student",
    name: { es: "Estancia por estudios", en: "Student stay" },
    href: { es: "/traduccion-jurada-visado-estudiante", en: "/en/sworn-translation-spain-student-visa" },
    docs: {
      es: "Admisión y pago de la matrícula, medios económicos, seguro, certificado médico, antecedentes penales (estancias de más de 6 meses, mayores de edad), autorización de los padres si eres menor",
      en: "Admission and proof of fees paid, proof of means, insurance, medical certificate, criminal record (stays over 6 months, adults), parental authorisation for minors",
    },
    sworn: {
      es: "Antecedentes penales, certificado médico y carta y partida de nacimiento de quien te patrocina; el resto, si no está en español. Los extractos, según dónde presentes la solicitud (Los Ángeles no los pide traducidos)",
      en: "Criminal record, medical certificate, sponsor letter and birth certificate; the rest, if not in Spanish. Bank statements depend on where you apply (Los Angeles doesn't ask for them translated)",
    },
    pages: { es: "15–25", en: "15–25" },
    source: [
      src("https://www.inclusion.gob.es/web/migraciones/w/estancia-por-estudios", { es: "Hoja informativa 1 (Inclusión)", en: "Ministry of Inclusion information sheet 1" }),
      src(
        "https://www.exteriores.gob.es/Consulados/londres/en/ServiciosConsulares/Paginas/Consular/Visado-de-estudios.aspx",
        { es: "Consulado en Londres", en: "London consulate" }
      ),
    ],
  },
  {
    id: "highly-qualified",
    name: { es: "Profesional altamente cualificado (UGE-CE)", en: "Highly qualified professional (UGE-CE)" },
    href: { es: "/traduccion-jurada-visado-alta-cualificacion", en: "/en/sworn-translation-spain-highly-qualified-visa" },
    docs: {
      es: "Título de educación superior (o cartas de experiencia), contrato, documentos de la empresa, antecedentes penales, seguro; en el visado, certificado médico según el consulado",
      en: "Higher-education degree (or experience letters), employment contract, company documents, criminal record, insurance; at visa stage, a medical certificate depending on the consulate",
    },
    sworn: {
      es: "Título (legalizado o apostillado), cartas de experiencia, antecedentes penales y certificados familiares",
      en: "Degree (legalised or apostilled), experience letters, criminal record and family certificates",
    },
    pages: { es: "8–20", en: "8–20" },
    source: src(
      "https://www.inclusion.gob.es/web/migraciones/w/66.-autorizacion-inicial-de-residencia-y-trabajo-de-profesionales-altamente-cualificados",
      { es: "Hoja informativa 66 (Inclusión)", en: "Ministry of Inclusion information sheet 66" }
    ),
  },
  {
    id: "family",
    name: { es: "Reagrupación familiar (régimen general)", en: "Family reunification (general scheme)" },
    href: { es: "/traduccion-jurada-visados-espana", en: "/en/sworn-translations-spanish-visas" },
    docs: {
      es: "Certificado de matrimonio o pareja, partidas de nacimiento, sentencias de divorcio o custodia, antecedentes penales de los adultos, certificado médico",
      en: "Marriage or partnership certificate, birth certificates, divorce or custody rulings, adults' criminal records, medical certificate",
    },
    sworn: {
      es: "Todos los documentos familiares, antecedentes penales y certificado médico, legalizados o apostillados",
      en: "All family documents, criminal records and medical certificate, legalised or apostilled",
    },
    pages: { es: "6–16", en: "6–16" },
    source: [
      src("https://www.inclusion.gob.es/web/migraciones/w/autorizacion-de-residencia-temporal-por-reagrupacion-familiar", { es: "Hoja informativa 8 (Inclusión)", en: "Ministry of Inclusion information sheet 8" }),
      src(
        "https://www.exteriores.gob.es/Consulados/washington/en/ServiciosConsulares/Paginas/Consular/Visado-de-reagrupacion-familiar-en-regimen-general.aspx",
        { es: "Consulado en Washington", en: "Washington consulate" }
      ),
    ],
  },
];

/** Bloque { table } de ServicePage con la tabla por trámite. */
export function procedureTable(locale = "es") {
  const en = locale === "en";
  return {
    caption: en
      ? "Documents, sworn translation and usual pages by Spanish visa procedure"
      : "Documentos, traducción jurada y páginas habituales por trámite de visado",
    head: en
      ? ["Procedure", "Usual documents", "Need a sworn translation", "Usual pages", "Official source"]
      : ["Trámite", "Documentos habituales", "Llevan traducción jurada", "Páginas habituales", "Fuente oficial"],
    rows: FILE_PROCEDURES.map((p) => [
      `<a href="${p.href[locale]}">${p.name[locale]}</a>`,
      p.docs[locale],
      p.sworn[locale],
      p.pages[locale],
      renderSources(p.source, locale),
    ]),
  };
}

// Bloques de precio para las páginas por trámite y de grandes volúmenes:
// la tabla de tramos, las reglas y el enlace a la página de expedientes.
export function filePriceBlocks(locale = "es") {
  const t = FILE_TABLE_COPY[locale] || FILE_TABLE_COPY.es;
  return [
    { table: { caption: t.caption, head: t.head, rows: fileTableRows(locale) } },
    { list: t.rules },
    locale === "en"
      ? `Three worked examples (digital nomad, non-lucrative, student) are on the <a href="${FILE_ROUTE.en}">full visa file page</a>.`
      : `Tienes tres ejemplos completos (nómada digital, no lucrativo, estudiante) en la <a href="${FILE_ROUTE.es}">página de expediente completo</a>.`,
  ];
}

/** WhatsApp de expediente de un trámite concreto («…my full student visa file»). */
export function fileWhatsAppFor(procedure) {
  return {
    es: `https://wa.me/34685891214?text=${encodeURIComponent(`Hola, quiero un precio cerrado para mi expediente completo de ${procedure.es}`)}`,
    en: `https://wa.me/34685891214?text=${encodeURIComponent(`Hi, I'd like a closed price for my full ${procedure.en} file`)}`,
  };
}

/** Offer de schema.org del tramo de 20 a 30 páginas (para /precios). */
export function filePerPageOffer(locale = "es") {
  const o = fileOffers(locale).find((x) => x.unitText);
  const url = `https://juradaexpress.es${FILE_ROUTE[locale] || FILE_ROUTE.es}`;
  return {
    "@type": "Offer",
    "@id": `${url}#por-pagina`,
    name: o.name,
    description: o.description,
    price: o.price,
    priceCurrency: "EUR",
    url,
    availability: "https://schema.org/InStock",
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: o.price,
      priceCurrency: "EUR",
      unitText: o.unitText,
      valueAddedTaxIncluded: true,
    },
  };
}

// Enlace interno a la página de expedientes (punto 7 del brief): lo añaden
// al principio de «Páginas relacionadas» ServicePage, GuidePage,
// CountryHubPage y LawFirmPage, salvo en la propia página.
export const FILE_RELATED = {
  es: { href: FILE_ROUTE.es, label: "Expediente completo de visado: un solo precio cerrado" },
  en: { href: FILE_ROUTE.en, label: "Full visa file: one closed price" },
};
export function withFileLink(related = [], locale = "es", path = "") {
  const link = FILE_RELATED[locale] || FILE_RELATED.es;
  if (path === link.href || related.some((r) => r.href === link.href)) return related;
  return [link, ...related];
}
