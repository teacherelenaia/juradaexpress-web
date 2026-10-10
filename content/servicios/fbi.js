// content/servicios/fbi.js
//
// Landing del certificado de antecedentes del FBI (Identity History
// Summary) para los visados de España (10/10/2026). Nace de la medición en
// ChatGPT del 10/10: a «where can I get my FBI background check translated
// for a Spanish visa?» los motores de respuesta recomiendan a quien tiene
// una página dedicada solo a ese documento, con precio y plazo. La versión
// inglesa es la principal (estadounidenses que piden visado); la española
// es para hispanohablantes en EE. UU. que tramitan visado o nacionalidad.
//
// Misma forma que visados.js (ServicePage con `landing: true`). Datos:
// precio del documento `antecedentes-penales` de content/documents.js,
// dólares con toUsd (content/usd.js), envío en papel a EE. UU. con
// US_SHIPPING_USD. La web no afirma requisitos que dependan de cada
// consulado: cuando varían, se dice «depende de tu consulado».
import { DOCUMENTS } from "../documents";
import { toUsd, US_SHIPPING_USD } from "../usd";
import { MAEC_NUMBER, SINCE } from "../persona";
import {
  GOOGLE_BUSINESS_URL,
  GOOGLE_RATING,
  GOOGLE_REVIEW_COUNT,
  MAEC_LIST_URL,
} from "../site";

const PATH_ES = "/traduccion-jurada-antecedentes-fbi";
const PATH_EN = "/en/fbi-background-check-translation-spain";

// Precio de catálogo del certificado de antecedentes penales (hasta 2 páginas).
const PRICE = DOCUMENTS.find((d) => d.id === "antecedentes-penales").price;
const PRICE_USD = toUsd(PRICE);

const fiveStar = GOOGLE_RATING >= 5;
const reviewsEn = fiveStar
  ? `${GOOGLE_REVIEW_COUNT} five-star Google reviews`
  : `${GOOGLE_RATING.toLocaleString("en-GB", { minimumFractionDigits: 1 })} on Google · ${GOOGLE_REVIEW_COUNT} reviews`;
const reviewsEs = fiveStar
  ? `${GOOGLE_REVIEW_COUNT} reseñas de cinco estrellas en Google`
  : `${GOOGLE_RATING.toLocaleString("es-ES", { minimumFractionDigits: 1 })} en Google · ${GOOGLE_REVIEW_COUNT} reseñas`;

const CONSULADOS_URL = "https://www.exteriores.gob.es/Consulados/";
const FBI_URL = "https://www.fbi.gov/how-we-can-help-you/more-fbi-services-and-information/identity-history-summary-checks";
const STATE_APOSTILLE_URL = "https://travel.state.gov/content/travel/en/records-and-authentications/authenticate-your-document/office-of-authentications.html";

const wa = (text) =>
  `https://wa.me/34685891214?text=${encodeURIComponent(text)}`;

const maecLink = (label) =>
  `<a href="${MAEC_LIST_URL}" target="_blank" rel="noopener noreferrer">${label}</a>`;

export const es = {
  id: "fbi",
  locale: "es",
  path: PATH_ES,
  alternates: { es: PATH_ES, en: PATH_EN },
  landing: true,
  crumb: "Certificado del FBI",
  metaTitle: `Traducción jurada del certificado del FBI para visado de España | ${PRICE} €, PDF en el día`,
  metaDescription: `Traducción jurada del certificado del FBI para tu visado de España: ${PRICE} € (unos ${PRICE_USD} $), PDF firmado en el día, traductora jurada nº ${MAEC_NUMBER} del MAEC.`,
  h1: "Traducción jurada del certificado de antecedentes del FBI para tu visado de España",
  lead: `Si vives en Estados Unidos y pides un visado de España (no lucrativo, nómada digital, estudios, trabajo) o la nacionalidad española, el consulado te pide el certificado de antecedentes del FBI, el <em>Identity History Summary</em>, con apostilla federal y traducción jurada al español. Soy Elena Peñaranda Ortega, traductora jurada nº ${MAEC_NUMBER} nombrada por el Ministerio de Asuntos Exteriores de España, y traduzco el certificado del FBI por ${PRICE} € (unos ${PRICE_USD} $), en PDF firmado digitalmente el mismo día si me llega antes de las 15:00, hora de Madrid, y en 24 horas en cualquier caso. El PDF vale en el consulado y después en España; si necesitas papel, lo envío por mensajería a cualquier dirección de Estados Unidos por ${US_SHIPPING_USD} $.`,
  image: {
    src: "/fotos/pasaporte-eeuu.jpg",
    alt: "Pasaporte de Estados Unidos sobre una mesa junto a documentos oficiales, como los del expediente de visado de España",
  },
  trust: [
    {
      text: `Nombrada por el Ministerio de Asuntos Exteriores, nº ${MAEC_NUMBER}`,
      href: MAEC_LIST_URL,
      label: "Comprobar el nombramiento en el listado oficial del MAEC",
    },
    {
      text: reviewsEs,
      href: GOOGLE_BUSINESS_URL,
      label: "Ver las reseñas en la ficha de Google Business",
    },
    { text: `${PRICE} € (unos ${PRICE_USD} $) por certificado` },
    { text: "PDF firmado en el día" },
    { text: "Pago con tarjeta en dólares o euros" },
  ],
  whatsapp: wa(
    "Hola Elena, necesito traducir mi certificado de antecedentes del FBI para un visado de España"
  ),
  whatsappLabel: "Mándame el certificado por WhatsApp",
  quoteCta: { label: "Calcular el precio", href: "/#calculadora" },
  serviceName: "Traducción jurada del certificado de antecedentes del FBI para visados de España",
  serviceType: "Traducción jurada inglés-español",
  price: PRICE,
  areaServed: [
    { "@type": "Country", name: "US" },
    { "@type": "Country", name: "ES" },
  ],
  sections: [
    {
      id: "precio",
      title: "Precio, plazo y formato de la traducción del certificado del FBI",
      body: [
        {
          table: {
            caption:
              "Traducción jurada del certificado del FBI: precio, plazo, formato y traductora",
            head: ["Dato", "Detalle"],
            rows: [
              [
                "Precio",
                `${PRICE} € (unos ${PRICE_USD} $) por el Identity History Summary de hasta 2 páginas. Si tu consulado exige traducir también la apostilla, cuenta como una página más al mismo precio por página; ves el total antes de pagar.`,
              ],
              [
                "Plazo",
                "PDF firmado el mismo día si recibo el documento antes de las 15:00, hora de Madrid (9:00 en Nueva York, 6:00 en Los Ángeles); en 24 horas en cualquier caso.",
              ],
              [
                "Formato",
                `PDF con firma electrónica cualificada conforme a la Orden AUC/213/2025, válido ante los consulados de España y ante extranjería. Copia en papel con firma manuscrita y sello por mensajería a Estados Unidos por ${US_SHIPPING_USD} $.`,
              ],
              [
                "Traductora",
                `Elena Peñaranda Ortega, traductora jurada de inglés nº ${MAEC_NUMBER}, nombrada por el Ministerio de Asuntos Exteriores en ${SINCE}. ${maecLink("Comprueba el nombramiento en el buscador oficial del Ministerio")}.`,
              ],
            ],
          },
        },
        "Es el precio de catálogo del certificado de antecedentes penales: no hay recargo por Estados Unidos ni por la entrega en el día. El pago es con tarjeta en dólares o en euros a través de Stripe, o por Wise, cuando apruebas el presupuesto por escrito.",
      ],
    },
    {
      id: "identity-history-summary",
      title: "Qué es el Identity History Summary y qué pide el consulado",
      body: [
        `El Identity History Summary es el certificado del FBI con los arrestos y condenas que constan a tu nombre en Estados Unidos o, lo más habitual, la constancia de que no hay ningún registro. Se pide directamente al <a href="${FBI_URL}" target="_blank" rel="noopener noreferrer">FBI</a> o a través de un <em>channeler</em> autorizado y llega en PDF o en papel. Los consulados de España lo llaman certificado de antecedentes penales del FBI o <em>FBI background check</em>, y piden el federal, no el de un estado o condado, porque cubre todo el tiempo que has vivido en el país.`,
        `Antes de traducirlo, el certificado necesita la apostilla federal del <a href="${STATE_APOSTILLE_URL}" target="_blank" rel="noopener noreferrer">Departamento de Estado de Estados Unidos</a> en Washington (Office of Authentications). La apostilla certifica la firma del FBI para que el documento valga en España; la traducción jurada es el paso siguiente y se hace sobre el documento ya apostillado, para que el consulado lea en español todo lo que presentas.`,
        "La mayoría de los consulados exigen que el certificado tenga menos de 90 días en la fecha de la solicitud (unos cuentan desde la emisión, otros desde la apostilla), así que pide el certificado cuando la cita esté cerca y deja la traducción para el final. La traducción jurada no caduca.",
        `Que la página de la apostilla se traduzca o no depende del consulado: el de Miami indica en su web que no hace falta; otros piden todo en español. Mira la lista de requisitos de tu consulado o mándamela y te lo digo. Para umbrales económicos, tasas y plazos de tramitación, acude a la <a href="${CONSULADOS_URL}" target="_blank" rel="noopener noreferrer">página oficial de tu consulado</a> o a un abogado de extranjería: en esta página me limito al documento y a la traducción.`,
      ],
    },
    {
      id: "visados",
      title: "Para qué visados y trámites se pide el certificado del FBI",
      body: [
        "El certificado de antecedentes penales se pide a cada solicitante mayor de edad que haya vivido en Estados Unidos en los últimos años. Aparece en estos expedientes:",
        {
          list: [
            `<a href="/traduccion-jurada-visados-espana">Visado no lucrativo</a>: junto con el certificado médico, la prueba de fondos y el seguro médico.`,
            `<a href="/traduccion-jurada-visado-nomada-digital">Visado de nómada digital</a>: con la carta del empleador o los contratos, el certificado de la empresa y el certificate of coverage.`,
            `<a href="/traduccion-jurada-visados-espana">Visado de estudios</a> de más de seis meses: con la carta de admisión y el seguro.`,
            `<a href="/traduccion-jurada-visados-espana">Visado de trabajo y reagrupación familiar</a>: el certificado lo aporta el solicitante adulto; las partidas de nacimiento y el certificado de matrimonio de la familia llevan también apostilla y traducción jurada.`,
            `<a href="/traduccion-jurada-estados-unidos">Nacionalidad española</a> desde Estados Unidos: el certificado del FBI acompaña a las partidas de nacimiento y matrimonio estadounidenses.`,
          ],
        },
        "Si traduces varios documentos a la vez, el <a href=\"/traduccion-jurada-visados-espana#paquetes\">Spain Visa Pack</a> incluye el certificado del FBI con el certificado médico y una partida por un precio cerrado para todo el expediente.",
      ],
    },
    {
      id: "jurada-o-certificada",
      title: "¿Traducción jurada o «certified translation»?",
      body: [
        "En Estados Unidos una <em>certified translation</em> es cualquier traducción con una declaración firmada de exactitud; puede emitirla cualquiera. En España la traducción jurada la firma y sella una traductora nombrada por el Ministerio de Asuntos Exteriores, y es lo que la ley exige para presentar documentos extranjeros ante una administración española. Los consulados aceptan la traducción jurada sin discusión; algunos admiten también una traducción certificada estadounidense para el visado, pero cuando llegues a España, la Oficina de Extranjería que expide la tarjeta de residencia (TIE), el ayuntamiento y el Registro Civil te pedirán traducción jurada, y el certificado del FBI se traduciría dos veces.",
        "Mi traducción reproduce el documento completo: el membrete del FBI, el resultado, el sello, el bloque de firma y, si tu consulado lo exige, la apostilla, cada elemento identificado para que el funcionario pueda cotejarlo con el original. Lleva mi certificación, firma y sello en cada página y la firma electrónica cualificada en el PDF.",
      ],
    },
  ],
  howTitle: "Cómo se pide la traducción",
  steps: [
    {
      t: "Envías el PDF del FBI apostillado",
      d: "Por WhatsApp o desde la calculadora de precio. Manda el documento completo, apostilla incluida, en PDF o en fotos nítidas. Si aún no lo has apostillado, mándalo igualmente y te digo qué espera el consulado.",
    },
    {
      t: "Presupuesto y pago",
      d: "En menos de dos horas tienes el precio cerrado en dólares o euros y el plazo por escrito; los mensajes de noche se contestan antes de las 9:00, hora de Madrid. Pagas con tarjeta a través de Stripe o por Wise.",
    },
    {
      t: "Traducción firmada",
      d: "Traduzco el certificado y, si hace falta, la apostilla; certifico, firmo y sello la traducción.",
    },
    {
      t: "PDF por email, papel opcional",
      d: `PDF firmado el mismo día si llega antes de las 15:00, hora de Madrid, y en 24 horas en cualquier caso. Copia en papel por mensajería a Estados Unidos por ${US_SHIPPING_USD} $ si la pides.`,
    },
  ],
  faq: [
    {
      q: "¿Necesito traducción jurada o «certified translation» del certificado del FBI?",
      a: "Para un visado de España, traducción jurada hecha por una traductora nombrada por el Ministerio de Asuntos Exteriores. Algunos consulados mencionan también las traducciones certificadas de Estados Unidos, pero la jurada es la que sigue valiendo en España para la tarjeta de residencia y los trámites posteriores, así que es la opción segura.",
    },
    {
      q: "¿Sirve una «certified translation» hecha en Estados Unidos?",
      a: "Puede aceptarse en algunos consulados para la solicitud del visado; las administraciones españolas no la aceptan cuando llegues. Si solo vas a traducir el certificado una vez, que sea una traducción jurada.",
    },
    {
      q: "¿Se traduce también la apostilla?",
      a: "Depende del consulado. El de Miami, por ejemplo, indica que las apostillas no se traducen; otros piden todas las páginas en español. Si el tuyo lo exige, traduzco la apostilla como una página más y va en el mismo PDF.",
    },
    {
      q: "¿Cuánto tarda la traducción?",
      a: "El certificado del FBI tiene entre una y tres páginas. Si me llega antes de las 15:00, hora de Madrid (9:00 en Nueva York), tienes el PDF firmado el mismo día; si no, en 24 horas. El plazo queda confirmado por escrito con el presupuesto.",
    },
    {
      q: "¿Cómo pago desde Estados Unidos?",
      a: "Con tarjeta a través de Stripe, en dólares o en euros, o por Wise. El precio que apruebas es el que pagas; no hace falta cuenta bancaria en España ni transferencia internacional.",
    },
    {
      q: "¿Necesito la copia en papel o basta con el PDF?",
      a: `El PDF lleva firma electrónica cualificada y equivale legalmente al original en papel sellado. La mayoría de los consulados lo aceptan; algunos siguen pidiendo papel en las citas presenciales, así que revisa las instrucciones de tu cita. Si necesitas papel, lo envío por mensajería a cualquier dirección de Estados Unidos por ${US_SHIPPING_USD} $, normalmente en tres a cinco días laborables.`,
    },
    {
      q: "¿Vale para el consulado de Nueva York, Los Ángeles, Miami, Chicago, Houston, Washington, San Francisco o Boston?",
      a: "Todos aceptan las traducciones juradas de traductores nombrados por el Ministerio: el nombramiento es nacional y no depende de ningún consulado. El PDF firmado digitalmente lo aceptan los consulados que lo indican en su web; si el tuyo no lo menciona, pregúntalo antes de la cita o pide la copia en papel para ir sobre seguro.",
    },
    {
      q: "¿Cuánto tiempo es válido el certificado del FBI?",
      a: "La mayoría de los consulados piden que el Identity History Summary tenga menos de 90 días en la fecha de la solicitud, contados desde la emisión (algunos, desde la apostilla). La traducción jurada no caduca, así que pide primero el certificado, apostíllalo y mándamelo al final.",
    },
  ],
  cta: {
    title: "Mándame el certificado del FBI apostillado",
    text: "Por WhatsApp o desde la calculadora: en menos de dos horas tienes el precio cerrado y el plazo por escrito, y el PDF firmado el mismo día si llega antes de las 15:00, hora de Madrid.",
  },
  related: [
    { href: "/documentos-visado-no-lucrativo-espana", label: "Guía: documentos del visado no lucrativo" },
    { href: "/documentos-visado-nomada-digital-espana", label: "Guía: documentos del visado de nómada digital" },
    { href: "/traduccion-jurada-visados-espana", label: "Visados de España" },
    { href: "/traduccion-jurada-visado-nomada-digital", label: "Visado de nómada digital" },
    { href: "/traduccion-jurada-estados-unidos", label: "Vienes de Estados Unidos" },
    { href: "/traduccion-jurada-acro-reino-unido", label: "ACRO Police Certificate del Reino Unido" },
    { href: "/traduccion-jurada-certificado-penales", label: "Certificado de antecedentes penales" },
    { href: "/precios", label: "Precios" },
  ],
  otherLangLabel: "FBI background check: sworn translation for your Spanish visa",
};

export const en = {
  id: "fbi",
  locale: "en",
  path: PATH_EN,
  alternates: { es: PATH_ES, en: PATH_EN },
  landing: true,
  crumb: "FBI background check",
  metaTitle: "FBI Background Check Translation for Spain Visa | Sworn, Same-Day PDF",
  metaDescription: `Sworn translation of your FBI background check for a Spanish visa: €${PRICE} (about $${PRICE_USD}), signed PDF the same day, by MAEC sworn translator No. ${MAEC_NUMBER}.`,
  h1: "FBI background check: sworn translation for your Spanish visa",
  lead: `Spanish consulates in the United States ask for your FBI Identity History Summary (the FBI background check) with a federal apostille and a sworn translation into Spanish for most long-stay visas: non-lucrative, digital nomad, student and work. I am Elena Peñaranda Ortega, sworn translator No. ${MAEC_NUMBER} appointed by Spain's Ministry of Foreign Affairs, and I translate the FBI check for €${PRICE} (about $${PRICE_USD}), delivered as a digitally signed PDF the same day if it reaches me before 3 pm Madrid time, and within 24 hours in any case. The PDF is valid at the consulate and later in Spain; a paper copy can be couriered to any US address for $${US_SHIPPING_USD}.`,
  image: {
    src: "/fotos/pasaporte-eeuu.jpg",
    alt: "US passport on a desk next to official documents, as in a Spanish visa application from the United States",
  },
  trust: [
    {
      text: `Appointed by Spain's Foreign Ministry, No. ${MAEC_NUMBER}`,
      href: MAEC_LIST_URL,
      label: "Check the appointment on the Ministry's official register",
    },
    {
      text: reviewsEn,
      href: GOOGLE_BUSINESS_URL,
      label: "See the reviews on the Google Business profile",
    },
    { text: `€${PRICE} (about $${PRICE_USD}) per certificate` },
    { text: "Same-day signed PDF" },
    { text: "Card payment in US dollars" },
  ],
  whatsapp: wa("Hi Elena, I need my FBI background check translated for a Spanish visa"),
  whatsappLabel: "Send me your FBI check on WhatsApp",
  quoteCta: { label: "Price calculator", href: "/en#calculadora" },
  serviceName: "Sworn translation of the FBI background check for Spanish visas",
  serviceType: "Sworn English-Spanish translation",
  price: PRICE,
  areaServed: [
    { "@type": "Country", name: "US" },
    { "@type": "Country", name: "ES" },
  ],
  sections: [
    {
      id: "price",
      title: "Price, turnaround and format for the FBI check translation",
      body: [
        {
          table: {
            caption:
              "FBI background check sworn translation: price, turnaround, format and translator",
            head: ["Item", "Details"],
            rows: [
              [
                "Price",
                `€${PRICE} (about $${PRICE_USD}) for the FBI Identity History Summary of up to 2 pages. If your consulate requires the apostille page translated too, it counts as one extra page at the same per-page rate; you see the total before you pay.`,
              ],
              [
                "Turnaround",
                "Signed PDF the same day if I receive the document before 3 pm Madrid time (9 am in New York, 6 am in Los Angeles); within 24 hours in any case.",
              ],
              [
                "Format",
                `PDF with a qualified electronic signature under Spain's Order AUC/213/2025, valid at Spanish consulates and immigration offices. Paper copy with handwritten signature and stamp couriered to the US for $${US_SHIPPING_USD}.`,
              ],
              [
                "Translator",
                `Elena Peñaranda Ortega, sworn English-Spanish translator No. ${MAEC_NUMBER}, appointed by Spain's Ministry of Foreign Affairs in ${SINCE}. ${maecLink("Check the appointment on the Ministry's official register")}.`,
              ],
            ],
          },
        },
        "This is the catalogue price for a criminal record certificate: there is no surcharge for the United States or for same-day delivery. Payment is by card in US dollars or euros through Stripe, or through Wise, once you approve the quote in writing.",
      ],
    },
    {
      id: "identity-history-summary",
      title: "What the Identity History Summary is and what the consulate asks for",
      body: [
        `The Identity History Summary is the FBI's record of the arrests and convictions on file under your name in the United States or, more often, a statement that there is no record. You request it from the <a href="${FBI_URL}" target="_blank" rel="noopener noreferrer">FBI</a> directly or through an approved channeler, and it arrives as a PDF or on paper. Spanish consulates call it the FBI background check or <em>certificado de antecedentes penales</em>, and they want the federal certificate rather than a state or county check, because it covers your whole time in the country.`,
        `Before translation, the certificate needs a federal apostille from the <a href="${STATE_APOSTILLE_URL}" target="_blank" rel="noopener noreferrer">US Department of State</a> in Washington (Office of Authentications). The apostille certifies the FBI signature so the document is valid in Spain; the sworn translation is the next step and is done on the apostilled document, so the consulate reads everything you submit in Spanish.`,
        "Most consulates require the certificate to be less than 90 days old on the application date (some count from issue, others from the apostille), so order the FBI check once your appointment is close and leave the translation for last. The sworn translation itself does not expire.",
        `Whether the apostille page must be translated depends on the consulate: Miami states on its website that it is not needed; others want every page in Spanish. Check your consulate's checklist or send it to me and I will tell you. For financial thresholds, fees and processing times, go to <a href="${CONSULADOS_URL}" target="_blank" rel="noopener noreferrer">your consulate's official page</a> or to an immigration lawyer: on this page I keep to the document and the translation.`,
      ],
    },
    {
      id: "visas",
      title: "Which Spanish visas and procedures ask for the FBI check",
      body: [
        "The police certificate is requested from every adult applicant who has lived in the United States in recent years. It appears in these files:",
        {
          list: [
            `<a href="/en/sworn-translations-spanish-visas">Non-lucrative visa</a>: together with the medical certificate, proof of funds and health insurance.`,
            `<a href="/en/sworn-translation-spain-digital-nomad-visa">Digital nomad visa</a>: with the employer letter or contracts, the company certificate and the certificate of coverage.`,
            `<a href="/en/sworn-translations-spanish-visas">Student visa</a> for stays over six months: with the admission letter and insurance.`,
            `<a href="/en/sworn-translations-spanish-visas">Work visa and family reunification</a>: the certificate comes from the adult applicant; the family's birth and marriage certificates also need an apostille and a sworn translation.`,
            `<a href="/en/sworn-translation-usa-spain">Spanish citizenship</a> applied for from the United States: the FBI check goes with the US birth and marriage certificates.`,
          ],
        },
        "If you are translating several documents at once, the <a href=\"/en/sworn-translations-spanish-visas#packs\">Spain Visa Pack</a> covers the FBI check with the medical certificate and a birth or marriage certificate for one fixed price.",
      ],
    },
    {
      id: "sworn-or-certified",
      title: "Sworn translation or certified translation?",
      body: [
        "In the United States a certified translation is any translation with a signed statement of accuracy; anyone can issue one. In Spain a sworn translation (<em>traducción jurada</em>) is signed and stamped by a translator appointed by the Ministry of Foreign Affairs, and that is what Spanish law requires for foreign documents before a Spanish authority. Consulates accept sworn translations without question; some also accept a US certified translation for the visa itself, but once you are in Spain, the immigration office that issues your residence card (TIE), the town hall and the civil registry will ask for a sworn translation, and the FBI check would be translated twice.",
        "My translation reproduces the whole document: the FBI letterhead, the result, the seal, the signature block and, if your consulate requires it, the apostille, each element labelled so the officer can match it to the original. It carries my certification, signature and stamp on every page and the qualified electronic signature on the PDF.",
      ],
    },
  ],
  howTitle: "How to order the translation",
  steps: [
    {
      t: "Send the apostilled FBI PDF",
      d: "On WhatsApp or through the price calculator. Send the whole document, apostille included, as a PDF or clear photos. If you have not apostilled it yet, send it anyway and I will tell you what the consulate expects.",
    },
    {
      t: "Quote and payment",
      d: "Within two hours you have the fixed price in dollars or euros and the delivery time in writing; overnight messages are answered before 9 am Madrid time. Pay by card through Stripe or through Wise.",
    },
    {
      t: "Signed translation",
      d: "I translate the certificate and, if required, the apostille, then certify, sign and stamp the translation.",
    },
    {
      t: "PDF by email, paper optional",
      d: `Signed PDF the same day if it arrives before 3 pm Madrid time, within 24 hours in any case. Paper copy couriered to the US for $${US_SHIPPING_USD} on request.`,
    },
  ],
  faq: [
    {
      q: "Do I need a sworn translation or a certified translation of my FBI check?",
      a: "For a Spanish visa, a sworn translation by a translator appointed by Spain's Ministry of Foreign Affairs. Some consulates also mention US certified translations, but the sworn translation is the one that remains valid in Spain for your residence card and later procedures, so it is the safe choice.",
    },
    {
      q: "Is a certified translation from a US agency enough?",
      a: "It may be accepted at some consulates for the visa application; Spanish authorities do not accept it once you arrive. If you are only going to translate the certificate once, make it a sworn translation.",
    },
    {
      q: "Does the apostille page need to be translated?",
      a: "It depends on the consulate. Miami, for example, states that apostilles are not translated; others ask for every page in Spanish. If yours requires it, I translate the apostille as one extra page and it goes in the same PDF.",
    },
    {
      q: "How long does the translation take?",
      a: "An FBI check runs to one to three pages. If it reaches me before 3 pm Madrid time (9 am in New York) you have the signed PDF the same day; otherwise within 24 hours. The deadline is confirmed in writing with the quote.",
    },
    {
      q: "How do I pay from the United States?",
      a: "By card through Stripe, in US dollars or euros, or through Wise. The price you approve is the price you pay; no Spanish bank account or international transfer is needed.",
    },
    {
      q: "Do I need the paper copy, or is the PDF enough?",
      a: `The PDF carries a qualified electronic signature and is legally equivalent to the stamped paper original in Spain. Most consulates accept it; some still ask for paper at in-person appointments, so check your appointment instructions. If you need paper, I courier it to any US address for $${US_SHIPPING_USD}, usually within three to five working days.`,
    },
    {
      q: "Is the translation accepted at the Spanish consulate in New York, Los Angeles, Miami, Chicago, Houston, Washington, San Francisco or Boston?",
      a: "All of them accept sworn translations by translators appointed by the Ministry: the appointment is national and not tied to any consulate. The digitally signed PDF is accepted by the consulates that say so on their website; if yours does not mention it, ask before your appointment or order the paper copy to be safe.",
    },
    {
      q: "How long is the FBI check valid?",
      a: "Most consulates want the Identity History Summary to be under 90 days old on the application date, counted from issue (some count from the apostille date). The sworn translation itself does not expire, so order the FBI check first, apostille it, and send it to me last.",
    },
  ],
  cta: {
    title: "Send me your apostilled FBI check",
    text: "On WhatsApp or through the calculator: you get the fixed price and the delivery time in writing within two hours, and the signed PDF the same day if it arrives before 3 pm Madrid time.",
  },
  related: [
    { href: "/en/spain-non-lucrative-visa-documents-checklist", label: "Guide: non-lucrative visa documents checklist" },
    { href: "/en/spain-digital-nomad-visa-documents-checklist", label: "Guide: digital nomad visa documents checklist" },
    { href: "/en/sworn-translations-spanish-visas", label: "Spanish visas" },
    { href: "/en/sworn-translation-spain-digital-nomad-visa", label: "Digital nomad visa" },
    { href: "/en/sworn-translation-usa-spain", label: "Coming from the United States" },
    { href: "/en/acro-police-certificate-translation-spain", label: "UK ACRO police certificate" },
    { href: "/en/how-it-works", label: "How it works" },
    { href: "/en/precios", label: "Pricing" },
  ],
  otherLangLabel: "Traducción jurada del certificado de antecedentes del FBI para tu visado de España",
};
