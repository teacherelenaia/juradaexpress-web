// content/servicios/visados.js
//
// Página de servicio: traducción jurada para los visados de España
// (no lucrativo, estudiantes, nómada digital, familiares). Es la página de
// destino de la campaña 1 de Google Ads (estadounidenses que piden visado
// español), así que la versión inglesa es la principal y la española es su
// traducción adaptada a quien ya está en España o prepara el expediente
// desde aquí. Fuente de la verdad: docs/BRIEF-VISADOS (08/10/2026).
//
// La web NO afirma umbrales económicos, tasas ni plazos administrativos:
// para eso remite al consulado o a un abogado de extranjería. Los precios
// salen de content/packs.js (packs visa, visa-family y nomad, más
// EXTRA_PAGE_PRICE) y de content/documents.js (MIN_PRICE, "desde 35 €").
import { EXTRA_PAGE_PRICE } from "../packs";
import { MIN_PRICE } from "../documents";
import {
  GOOGLE_BUSINESS_URL,
  GOOGLE_RATING,
  GOOGLE_REVIEW_COUNT,
  MAEC_LIST_URL,
} from "../site";

const PATH_ES = "/traduccion-jurada-visados-espana";
const PATH_EN = "/en/sworn-translations-spanish-visas";

// Packs que se muestran en la página (ids de content/packs.js).
const PACK_IDS = ["visa", "visa-family", "nomad"];

// "24 five-star Google reviews": solo si la nota es 5,0; si baja, el texto
// pasa a "5,0 en Google · 24 reseñas" sin tocar la página.
const fiveStar = GOOGLE_RATING >= 5;
const reviewsEn = fiveStar
  ? `${GOOGLE_REVIEW_COUNT} five-star Google reviews`
  : `${GOOGLE_RATING.toLocaleString("en-GB", { minimumFractionDigits: 1 })} on Google · ${GOOGLE_REVIEW_COUNT} reviews`;
const reviewsEs = fiveStar
  ? `${GOOGLE_REVIEW_COUNT} reseñas de cinco estrellas en Google`
  : `${GOOGLE_RATING.toLocaleString("es-ES", { minimumFractionDigits: 1 })} en Google · ${GOOGLE_REVIEW_COUNT} reseñas`;

const CONSULADOS_URL = "https://www.exteriores.gob.es/Consulados/";

export const es = {
  id: "visados",
  locale: "es",
  path: PATH_ES,
  alternates: { es: PATH_ES, en: PATH_EN },
  landing: true,
  crumb: "Visados de España",
  metaTitle: `Traducción jurada para visados de España desde ${MIN_PRICE} € | Jurada Express`,
  metaDescription:
    "Traductora jurada nº 7310 del MAEC. Antecedentes del FBI, certificado médico y partidas traducidos para tu visado de España. PDF en el día, desde 129 €.",
  h1: "Traducción jurada para tu visado de España",
  lead:
    "La traducción jurada es la versión en español de tus documentos, firmada y certificada por una traductora nombrada por el Ministerio de Asuntos Exteriores de España, y es lo que los consulados españoles piden con cada documento extranjero del expediente de visado: el certificado de antecedentes del FBI, el certificado médico, la prueba de ingresos y las partidas de nacimiento y el certificado de matrimonio de tu familia. Soy Elena Peñaranda Ortega, traductora jurada nº 7310 desde 2009, y traduzco expedientes de visado completos procedentes de Estados Unidos, Reino Unido, Canadá y Australia con un único precio cerrado y un único plazo por escrito. Los documentos de hasta 10 páginas se entregan el mismo día en PDF firmado digitalmente.",
  image: {
    src: "/fotos/expediente-documentos.jpg",
    alt: "Manos revisando un formulario oficial sobre una carpeta de documentos, como los que componen un expediente de visado de España",
  },
  trust: [
    {
      text: "Nombrada por el Ministerio de Asuntos Exteriores, nº 7310",
      href: MAEC_LIST_URL,
      label: "Comprobar el nombramiento en el listado oficial del MAEC",
    },
    {
      text: reviewsEs,
      href: GOOGLE_BUSINESS_URL,
      label: "Ver las reseñas en la ficha de Google Business",
    },
    { text: "Entrega en el día hasta 10 páginas" },
    { text: "Presupuestos antes de las 9:00, hora española" },
    { text: "Pago seguro con tarjeta en tu moneda" },
  ],
  primaryCta: {
    label: "Sube tus documentos y recibe un presupuesto cerrado",
    href: "/documentos",
  },
  whatsapp:
    "https://wa.me/34685891214?text=Hola%20Elena%2C%20estoy%20solicitando%20un%20visado%20para%20Espa%C3%B1a%20y%20quiero%20un%20presupuesto%20para%20mis%20documentos",
  whatsappLabel: "WhatsApp",
  serviceName: "Traducción jurada de documentos para visados de España",
  serviceType: "Traducción jurada inglés-español",
  priceFrom: MIN_PRICE,
  sections: [
    {
      id: "documentos",
      title: "¿Qué documentos necesitan traducción jurada para un visado de España?",
      body: [
        `Los consulados españoles exigen que cualquier documento que no esté redactado en español se presente con traducción jurada. La lista exacta depende del visado, pero los documentos de abajo aparecen en casi todos los expedientes. Donde la tabla dice «apostilla», la apostilla va en el original antes de traducirlo; que la propia apostilla tenga que traducirse o no varía según el consulado (el de Miami, por ejemplo, indica que no), así que consulta la página de tu consulado y dime qué dice.`,
        {
          table: {
            caption:
              "Documentos del expediente de visado de España: visado, apostilla, traducción jurada y paquete",
            head: ["Documento", "Visado", "¿Apostilla?", "¿Traducción jurada?", "Paquete"],
            rows: [
              [
                "Identity History Summary del FBI (antecedentes penales) o certificado de la policía estatal",
                "No lucrativo, estudiantes (más de 6 meses), nómada digital, residencia",
                "Sí (apostilla federal del Departamento de Estado de EE. UU.)",
                "Sí",
                "Spain Visa Pack",
              ],
              [
                "Certificado médico (carta del médico que indica que no padeces ninguna enfermedad con repercusiones graves para la salud pública)",
                "No lucrativo, estudiantes, residencia",
                "Normalmente no",
                "Sí",
                "Spain Visa Pack",
              ],
              [
                "Prueba de fondos: extractos bancarios, cartas de concesión de pensión o de la Seguridad Social, extractos de inversiones",
                "No lucrativo, estudiantes",
                "No",
                "Sí, cuando el consulado lo exige",
                `Páginas adicionales a ${EXTRA_PAGE_PRICE} € por página`,
              ],
              [
                "Certificado del seguro médico privado",
                "No lucrativo, estudiantes, nómada digital",
                "No",
                "Sí, si no está emitido en español",
                "Spain Visa Pack",
              ],
              [
                "Partidas de nacimiento de los hijos, certificado de matrimonio",
                "Familiares en cualquier visado, reagrupación familiar",
                "Sí",
                "Sí",
                "Spain Visa Family Pack",
              ],
              [
                "Carta del empleador, contratos, registro de la empresa, título",
                "Nómada digital",
                "Según el documento",
                "Sí",
                "Digital Nomad Visa Pack",
              ],
              [
                "Carta de admisión de la universidad, confirmación de matrícula",
                "Estudiantes",
                "No",
                "Sí, si no está en español",
                "Spain Visa Pack",
              ],
              ["Pasaporte", "Todos", "No", "No (basta con una copia)", "—"],
            ],
          },
        },
        `Los requisitos cambian y cada consulado los aplica de forma ligeramente distinta. En esta página me limito a los documentos y a la traducción; para los umbrales económicos, las tasas y los plazos de tramitación, acude a la <a href="${CONSULADOS_URL}" target="_blank" rel="noopener noreferrer">página oficial de tu consulado</a> o a un abogado de extranjería. Si me envías la lista de requisitos de tu consulado, te digo en menos de dos horas qué documentos necesitan apostilla y cuáles necesitan traducción.`,
      ],
    },
    {
      id: "por-que-espana",
      title: "¿Por qué una traducción jurada de España y no una certificada de Estados Unidos?",
      body: [
        "Los consulados de España en Estados Unidos aceptan traducciones de traductores jurados nombrados por el Ministerio español y, en algunos casos, de traductores certificados en Estados Unidos. La diferencia aparece después. Una traducción jurada hecha en España sigue siendo válida para todo lo que viene tras el visado: la tarjeta de residencia (TIE) en la Oficina de Extranjería, el empadronamiento en el ayuntamiento, el Registro Civil si te casas o tienes un hijo aquí, los trámites con la Agencia Tributaria. Una traducción certificada estadounidense puede aceptarse en el consulado y rechazarse en España, lo que supone pagar dos veces.",
        "Mis traducciones llevan mi firma, mi sello y mi certificación en cada documento, incluida la apostilla y cualquier sello o anotación manuscrita del original, y van firmadas digitalmente conforme a la Orden AUC/213/2025, así que el PDF es válido sin papel. Si tu consulado pide una copia en papel, te la envío por mensajería.",
      ],
    },
    {
      id: "paquetes",
      title: "Paquetes de visado: un precio para todo el expediente",
      body: [
        "La mayoría de los solicitantes necesitan entre tres y ocho documentos, y traducirlos juntos sale más barato y evita incoherencias en nombres y fechas entre un documento y otro. Elige el paquete que corresponde a tu situación; todo lo que se salga de él se presupuesta por documento a la tarifa normal.",
        { packs: PACK_IDS },
        `Las apostillas solo cuentan como documento cuando tu consulado exige traducirlas. Los extractos bancarios, las pólizas de seguro y los contratos largos se presupuestan a ${EXTRA_PAGE_PRICE} € por página adicional dentro del mismo plazo. La entrega urgente de más de 10 páginas en el mismo día lleva un recargo del 30 %, como en todas mis traducciones.`,
      ],
    },
    {
      id: "ya-en-espana",
      title: "Si ya estás en España: TIE, empadronamiento y Registro Civil",
      body: [
        "Si has llegado con el visado o preparas el expediente de un familiar desde aquí, la misma traducción jurada te sirve para todo lo que sigue. La Oficina de Extranjería la acepta para la tarjeta de identidad de extranjero (TIE) y para las renovaciones y modificaciones de la autorización; el ayuntamiento, para el empadronamiento; y el Registro Civil, para inscribir un matrimonio o el nacimiento de un hijo y para los expedientes de nacionalidad. No hay que volver a traducir nada: una traducción jurada no caduca, aunque el organismo puede pedir que el documento original sea reciente.",
        `Trabajo desde Murcia, de forma totalmente online y con clientes en toda España y en el extranjero. El pago es con tarjeta a través de Stripe, por transferencia o por Wise, y la entrega es un PDF firmado digitalmente, válido ante cualquier organismo español. Si necesitas la copia en papel con firma manuscrita y sello, la envío por mensajería a cualquier dirección de España o del extranjero. <a href="/traduccion-jurada-estados-unidos">Más sobre los trámites desde Estados Unidos</a>.`,
      ],
    },
  ],
  howTitle: "Cómo funciona",
  steps: [
    {
      t: "Envíame tus documentos",
      d: "Súbelos a través del formulario de presupuesto o mándame un WhatsApp con fotos o PDF. Escanea cada documento completo, con la apostilla y el reverso si tiene sellos. Las fotos de móvil valen si se leen bien.",
    },
    {
      t: "Presupuesto cerrado en menos de 2 horas",
      d: "Recibes el precio de todo el expediente, el plazo por escrito y una nota de lo que aún necesita apostilla. Los presupuestos que llegan de noche se contestan antes de las 9:00, hora española.",
    },
    {
      t: "Paga con tarjeta en tu moneda",
      d: "Pago seguro a través de Stripe en dólares, libras o euros; también por transferencia bancaria.",
    },
    {
      t: "Recibe tus PDF firmados",
      d: "Un PDF firmado digitalmente por documento, en el mismo día para documentos de hasta 10 páginas. Copias en papel por mensajería a cualquier parte del mundo si tu consulado las pide.",
    },
  ],
  faq: [
    {
      q: "¿El consulado español acepta una traducción firmada digitalmente?",
      a: "Sí. Desde el 8 de marzo de 2025, la Orden AUC/213/2025 regula las traducciones juradas con firma electrónica cualificada; el PDF firmado tiene la misma validez que una copia en papel sellada. Algunos consulados siguen pidiendo papel para las citas presenciales, así que revisa las instrucciones de tu cita; si hace falta, te envío la copia en papel por mensajería.",
    },
    {
      q: "¿El certificado de antecedentes del FBI necesita apostilla antes de traducirlo?",
      a: "Sí. El Identity History Summary del FBI debe apostillarse en el Departamento de Estado de EE. UU., en Washington, antes de presentarlo, y yo traduzco la versión apostillada. Que la página de la apostilla se traduzca o no depende de tu consulado.",
    },
    {
      q: "¿Cuánto tiempo es válida una traducción jurada?",
      a: "La traducción en sí no caduca, pero los consulados suelen exigir que el documento de base (certificado del FBI, certificado médico) tenga menos de 90 días en el momento de la solicitud, así que pide primero los originales y deja la traducción para el final.",
    },
    {
      q: "¿Puedes traducir mis extractos bancarios?",
      a: "Sí. Los extractos se presupuestan por página porque son largos; muchos consulados aceptan los de los últimos tres a seis meses, y puedo traducir solo las páginas que necesitas, con una nota de lo que se ha omitido.",
    },
    {
      q: "¿Traduces documentos para los consulados de España en todas las ciudades de Estados Unidos?",
      a: "Sí: Miami, Nueva York, Washington, Chicago, Houston, Los Ángeles, San Francisco y Boston aplican las mismas normas nacionales sobre traducciones juradas, con pequeñas diferencias en sus listas de requisitos.",
    },
    {
      q: "¿Y si el consulado pide una corrección?",
      a: "Las correcciones de mi traducción son gratuitas. Si cambia un documento (un certificado nuevo, por ejemplo), la nueva versión se traduce a la tarifa normal.",
    },
    {
      q: "¿Te ocupas también de la apostilla?",
      a: "No. La apostilla la emiten las autoridades estadounidenses (el Departamento de Estado para los documentos federales, el Secretary of State para los documentos estatales). Puedo decirte qué documentos la necesitan e indicarte la página oficial.",
    },
    {
      q: "¿La traducción sigue siendo válida cuando llegue a España?",
      a: "Sí. Esa es la principal ventaja de una traducción jurada de España: sirve para el visado y, después, para la tarjeta de residencia, el ayuntamiento, el Registro Civil y cualquier organismo español.",
    },
  ],
  cta: {
    title: "Envíame la lista de requisitos de tu consulado",
    text: "Sube tus documentos o mándame la lista por WhatsApp y tendrás un presupuesto cerrado de todo el expediente en menos de dos horas; antes de las 9:00, hora española, si escribes de noche.",
    primaryLabel: "Subir documentos",
  },
  related: [
    { href: "/traduccion-jurada-estados-unidos", label: "Vienes de Estados Unidos" },
    { href: "/traduccion-jurada-visado-nomada-digital", label: "Visado de nómada digital" },
    { href: "/traduccion-jurada-certificado-penales", label: "Certificado de antecedentes penales" },
    { href: "/traduccion-jurada-certificado-medico", label: "Certificado médico" },
    { href: "/traduccion-jurada-partida-nacimiento", label: "Partida de nacimiento" },
    { href: "/precios#packs", label: "Paquetes por trámite" },
  ],
  otherLangLabel: "Sworn translations for your Spanish visa application",
};

export const en = {
  id: "visados",
  locale: "en",
  path: PATH_EN,
  alternates: { es: PATH_ES, en: PATH_EN },
  landing: true,
  crumb: "Spanish visas",
  metaTitle: `Sworn Translations for Spanish Visas from €${MIN_PRICE} | Jurada Express`,
  metaDescription:
    "Sworn translator No. 7310 (Spain's Foreign Ministry). FBI check, medical and birth certificates translated for your Spanish visa. Same-day PDF, from €129.",
  h1: "Sworn translations for your Spanish visa application",
  lead:
    "A sworn translation is the Spanish-language version of your documents, signed and certified by a translator appointed by Spain's Ministry of Foreign Affairs, and it is what Spanish consulates ask for with every foreign document in a visa file: the FBI background check, the medical certificate, proof of income, and your family's birth and marriage certificates. I am Elena Peñaranda Ortega, sworn translator No. 7310 since 2009, and I translate complete visa files from the United States, the UK, Canada and Australia with one fixed price and one written deadline. Documents of up to 10 pages are delivered the same day as a digitally signed PDF.",
  image: {
    src: "/fotos/expediente-documentos.jpg",
    alt: "Hands checking an official form on a folder of documents, like those in a Spanish visa application file",
  },
  trust: [
    {
      text: "Appointed by Spain's Foreign Ministry, No. 7310",
      href: MAEC_LIST_URL,
      label: "Check the appointment on the Ministry's official register",
    },
    {
      text: reviewsEn,
      href: GOOGLE_BUSINESS_URL,
      label: "See the reviews on the Google Business profile",
    },
    { text: "Same-day delivery up to 10 pages" },
    { text: "Quotes before 9 am Spanish time" },
    { text: "Secure card payment in your currency" },
  ],
  primaryCta: {
    label: "Upload your documents for a fixed quote",
    href: "/en/documentos",
  },
  whatsapp:
    "https://wa.me/34685891214?text=Hi%20Elena%2C%20I%27m%20applying%20for%20a%20Spanish%20visa%20and%20I%27d%20like%20a%20quote%20for%20my%20documents",
  whatsappLabel: "WhatsApp",
  serviceName: "Sworn translation of documents for Spanish visas",
  serviceType: "Sworn English-Spanish translation",
  priceFrom: MIN_PRICE,
  sections: [
    {
      id: "documents",
      title: "Which documents need a sworn translation for a Spanish visa?",
      body: [
        "Spanish consulates require that any document not written in Spanish be submitted with a sworn translation. The exact list depends on the visa, but the documents below come up in almost every file. Where the table says \"apostille\", the apostille goes on the original before translation; whether the apostille itself must be translated varies by consulate (Miami, for example, states that it does not), so check your consulate's page and tell me what it says.",
        {
          table: {
            caption:
              "Spanish visa file documents: visa, apostille, sworn translation and pack",
            head: ["Document", "Visa", "Apostille?", "Sworn translation?", "Pack"],
            rows: [
              [
                "FBI Identity History Summary (background check), or state police certificate",
                "Non-lucrative, student (over 6 months), digital nomad, residence",
                "Yes (federal apostille from the US Department of State)",
                "Yes",
                "Spain Visa Pack",
              ],
              [
                "Medical certificate (doctor's letter stating you have no disease with serious public-health implications)",
                "Non-lucrative, student, residence",
                "Usually no",
                "Yes",
                "Spain Visa Pack",
              ],
              [
                "Proof of funds: bank statements, pension or Social Security award letters, investment statements",
                "Non-lucrative, student",
                "No",
                "Yes, where the consulate requires it",
                `Extra pages at €${EXTRA_PAGE_PRICE} per page`,
              ],
              [
                "Private health insurance certificate",
                "Non-lucrative, student, digital nomad",
                "No",
                "Yes, if not issued in Spanish",
                "Spain Visa Pack",
              ],
              [
                "Birth certificates of children, marriage certificate",
                "Family members on any visa, family reunification",
                "Yes",
                "Yes",
                "Spain Visa Family Pack",
              ],
              [
                "Employer letter, contracts, company registration, degree",
                "Digital nomad",
                "Depends on document",
                "Yes",
                "Digital Nomad Visa Pack",
              ],
              [
                "University acceptance letter, enrolment confirmation",
                "Student",
                "No",
                "Yes, if not in Spanish",
                "Spain Visa Pack",
              ],
              ["Passport", "All", "No", "No (a copy is enough)", "—"],
            ],
          },
        },
        `Requirements change and each consulate applies them slightly differently. I keep this page to the documents and the translation; for financial thresholds, fees and processing times, go to <a href="${CONSULADOS_URL}" target="_blank" rel="noopener noreferrer">your consulate's official page</a> or to an immigration lawyer. If you send me your consulate's checklist, I will tell you in under two hours which items need an apostille and which need translation.`,
      ],
    },
    {
      id: "why-spain",
      title: "Why a sworn translation from Spain, and not a certified one from the US?",
      body: [
        "US consulates of Spain accept translations by sworn translators appointed by Spain's Ministry and, in some cases, by certified translators in the United States. The difference appears later. A sworn translation made in Spain stays valid for everything that comes after the visa: your residence card (TIE) at the immigration office, registering at the town hall, the civil registry if you marry or have a child here, exchanging documents with the tax office. A US certified translation may be accepted at the consulate and refused in Spain, which means paying twice.",
        "My translations carry my signature, stamp and certification on every document, including the apostille and any seal or handwritten note on the original, and are digitally signed under Spain's Order AUC/213/2025, so the PDF is valid without paper. If your consulate asks for a paper copy, I send it by courier.",
      ],
    },
    {
      id: "packs",
      title: "Visa packs: one price for the whole file",
      body: [
        "Most applicants need between three and eight documents, and translating them together is cheaper and avoids inconsistencies in names and dates between documents. Choose the pack that matches your situation; anything extra is priced per document at the normal rate.",
        { packs: PACK_IDS },
        `Apostilles only count as a document when your consulate requires them translated. Bank statements, insurance policies and long contracts are priced at €${EXTRA_PAGE_PRICE} per extra page within the same deadline. Urgent delivery of more than 10 pages on the same day carries a 30 % surcharge, as with all my translations.`,
      ],
    },
    {
      id: "us-clients",
      title: "Working with US clients: time zones, payment and delivery",
      body: [
        `I am in Murcia, Spain, six hours ahead of New York and nine ahead of Los Angeles. In practice, what you send in the evening is in your inbox when you wake up. Payment is by card through Stripe (you pay in your own currency; your bank does the exchange), by transfer or through Wise. Delivery is a digitally signed PDF, valid in Spain. Paper copies with handwritten signature and stamp go by international courier, usually within three to five working days to the United States. <a href="/en/sworn-translation-usa-spain">More on working from the United States</a>.`,
      ],
    },
  ],
  howTitle: "How it works",
  steps: [
    {
      t: "Send your documents",
      d: "Upload them through the quote form or send a WhatsApp with photos or PDFs. Scan each document complete, with the apostille and the back if it has stamps. Phone photos are fine if they are readable.",
    },
    {
      t: "Fixed quote in under 2 hours",
      d: "You get the price for the whole file, the deadline in writing and a note of anything that still needs an apostille. Quotes sent overnight are answered before 9 am Spanish time.",
    },
    {
      t: "Pay by card in your currency",
      d: "Secure payment through Stripe in dollars, pounds or euros; bank transfer is also available.",
    },
    {
      t: "Receive your signed PDFs",
      d: "One digitally signed PDF per document, same-day for documents up to 10 pages. Paper copies by courier anywhere in the world if your consulate asks for them.",
    },
  ],
  faq: [
    {
      q: "Does the Spanish consulate accept a digitally signed translation?",
      a: "Yes. Since 8 March 2025, Spain's Order AUC/213/2025 regulates sworn translations with a qualified electronic signature; the signed PDF has the same validity as a stamped paper copy. Some consulates still ask for paper for in-person appointments, so check your appointment instructions; if needed, I send the paper copy by courier.",
    },
    {
      q: "Does the FBI background check need an apostille before translation?",
      a: "Yes. The FBI Identity History Summary must be apostilled by the US Department of State in Washington before you submit it, and I translate the apostilled version. Whether the apostille page itself is translated depends on your consulate.",
    },
    {
      q: "How long is a sworn translation valid?",
      a: "The translation itself does not expire, but consulates usually require the underlying document (FBI check, medical certificate) to be less than 90 days old at the time of application, so order the originals first and the translation last.",
    },
    {
      q: "Can you translate my bank statements?",
      a: "Yes. Statements are priced per page because they are long; many consulates accept the last three to six months, and I can translate only the pages you need, with a note of what was omitted.",
    },
    {
      q: "Do you translate documents for the Spanish consulates in all US cities?",
      a: "Yes: Miami, New York, Washington, Chicago, Houston, Los Angeles, San Francisco and Boston apply the same national rules on sworn translations, with small differences in their checklists.",
    },
    {
      q: "What if the consulate asks for a correction?",
      a: "Corrections to my translation are free. If a document changes (a new certificate, for example), the new version is translated at the normal rate.",
    },
    {
      q: "Do you also handle the apostille?",
      a: "No. The apostille is issued by the US authorities (the Department of State for federal documents, the Secretary of State for state documents). I can tell you which documents need it and point you to the official page.",
    },
    {
      q: "Is the translation valid after I arrive in Spain?",
      a: "Yes. That is the main advantage of a sworn translation from Spain: it works for the visa and later for your residence card, the town hall, the civil registry and any Spanish authority.",
    },
  ],
  cta: {
    title: "Send me your consulate's checklist",
    text: "Upload your documents or send the list by WhatsApp and you will have a fixed quote for the whole file in under two hours, before 9 am Spanish time if you write overnight.",
    primaryLabel: "Upload documents",
  },
  related: [
    { href: "/en/sworn-translation-usa-spain", label: "Coming from the United States" },
    { href: "/en/sworn-translation-spain-digital-nomad-visa", label: "Digital nomad visa" },
    { href: "/en/sworn-translation-canada-spain", label: "Coming from Canada" },
    { href: "/en/sworn-translation-australia-spain", label: "Coming from Australia" },
    { href: "/en/how-it-works", label: "How it works" },
    { href: "/en/precios#packs", label: "Packs by procedure" },
  ],
  otherLangLabel: "Traducción jurada para tu visado de España",
};
