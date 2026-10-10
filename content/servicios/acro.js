// content/servicios/acro.js
//
// Landing del ACRO Police Certificate (certificado de antecedentes penales
// del Reino Unido) para los visados y trámites de residencia en España
// (10/10/2026). Misma plantilla y mismos motivos que fbi.js: los motores de
// respuesta recomiendan páginas dedicadas a un solo documento, con precio y
// plazo. La versión inglesa es la principal (británicos y residentes en el
// Reino Unido que piden visado de España); la española es para
// hispanohablantes que han vivido en el Reino Unido y tramitan visado,
// extranjería o nacionalidad en España.
//
// Datos: precio del documento `antecedentes-penales` de content/documents.js.
// El envío en papel fuera de España no tiene tarifa publicada
// (content/site.js → INTERNATIONAL_SHIPPING): se indica en el presupuesto.
import { DOCUMENTS } from "../documents";
import { MAEC_NUMBER, SINCE } from "../persona";
import {
  GOOGLE_BUSINESS_URL,
  GOOGLE_RATING,
  GOOGLE_REVIEW_COUNT,
  MAEC_LIST_URL,
} from "../site";

const PATH_ES = "/traduccion-jurada-acro-reino-unido";
const PATH_EN = "/en/acro-police-certificate-translation-spain";

const PRICE = DOCUMENTS.find((d) => d.id === "antecedentes-penales").price;

const fiveStar = GOOGLE_RATING >= 5;
const reviewsEn = fiveStar
  ? `${GOOGLE_REVIEW_COUNT} five-star Google reviews`
  : `${GOOGLE_RATING.toLocaleString("en-GB", { minimumFractionDigits: 1 })} on Google · ${GOOGLE_REVIEW_COUNT} reviews`;
const reviewsEs = fiveStar
  ? `${GOOGLE_REVIEW_COUNT} reseñas de cinco estrellas en Google`
  : `${GOOGLE_RATING.toLocaleString("es-ES", { minimumFractionDigits: 1 })} en Google · ${GOOGLE_REVIEW_COUNT} reseñas`;

const CONSULADOS_URL = "https://www.exteriores.gob.es/Consulados/";
const ACRO_URL = "https://www.acro.police.uk/police-certificates";
const FCDO_URL = "https://www.gov.uk/get-document-legalised";

const wa = (text) =>
  `https://wa.me/34685891214?text=${encodeURIComponent(text)}`;

const maecLink = (label) =>
  `<a href="${MAEC_LIST_URL}" target="_blank" rel="noopener noreferrer">${label}</a>`;

export const es = {
  id: "acro",
  locale: "es",
  path: PATH_ES,
  alternates: { es: PATH_ES, en: PATH_EN },
  landing: true,
  crumb: "Certificado ACRO",
  metaTitle: `Traducción jurada del certificado ACRO del Reino Unido para visado de España | ${PRICE} €`,
  metaDescription: `Traducción jurada del certificado ACRO del Reino Unido para tu visado de España: ${PRICE} €, PDF firmado en el día, traductora jurada nº ${MAEC_NUMBER} del MAEC.`,
  h1: "Traducción jurada del ACRO Police Certificate del Reino Unido para tu visado de España",
  lead: `Si has vivido en el Reino Unido y pides un visado de España, una autorización de residencia o la nacionalidad española, te piden el certificado de antecedentes penales británico, el <em>ACRO Police Certificate</em>, con apostilla del FCDO y traducción jurada al español. Soy Elena Peñaranda Ortega, traductora jurada nº ${MAEC_NUMBER} nombrada por el Ministerio de Asuntos Exteriores de España, y traduzco el certificado ACRO por ${PRICE} €, en PDF firmado digitalmente el mismo día si me llega antes de las 15:00, hora de Madrid (14:00 en el Reino Unido), y en 24 horas en cualquier caso. El PDF vale en el consulado y después ante extranjería; si necesitas papel, lo envío por mensajería al Reino Unido o a España.`,
  image: {
    src: "/fotos/escritorio-documentos.jpg",
    alt: "Escritorio con documentos oficiales y un pasaporte, como los de un expediente de visado de España preparado desde el Reino Unido",
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
    { text: `${PRICE} € por certificado` },
    { text: "PDF firmado en el día" },
    { text: "Pago con tarjeta en libras o euros" },
  ],
  whatsapp: wa(
    "Hola Elena, necesito traducir mi certificado ACRO del Reino Unido para un visado de España"
  ),
  whatsappLabel: "Mándame el certificado por WhatsApp",
  quoteCta: { label: "Calcular el precio", href: "/#calculadora" },
  serviceName: "Traducción jurada del ACRO Police Certificate del Reino Unido para visados de España",
  serviceType: "Traducción jurada inglés-español",
  price: PRICE,
  areaServed: [
    { "@type": "Country", name: "GB" },
    { "@type": "Country", name: "ES" },
  ],
  sections: [
    {
      id: "precio",
      title: "Precio, plazo y formato de la traducción del certificado ACRO",
      body: [
        {
          table: {
            caption:
              "Traducción jurada del ACRO Police Certificate: precio, plazo, formato y traductora",
            head: ["Dato", "Detalle"],
            rows: [
              [
                "Precio",
                `${PRICE} € por el ACRO Police Certificate de hasta 2 páginas. Si tu consulado o la Oficina de Extranjería exigen traducir también la apostilla, cuenta como una página más al mismo precio por página; ves el total antes de pagar.`,
              ],
              [
                "Plazo",
                "PDF firmado el mismo día si recibo el documento antes de las 15:00, hora de Madrid (14:00 en el Reino Unido); en 24 horas en cualquier caso.",
              ],
              [
                "Formato",
                "PDF con firma electrónica cualificada conforme a la Orden AUC/213/2025, válido ante los consulados de España y ante extranjería. Copia en papel con firma manuscrita y sello por mensajería al Reino Unido o a cualquier dirección de España; el coste del transportista va en el presupuesto.",
              ],
              [
                "Traductora",
                `Elena Peñaranda Ortega, traductora jurada de inglés nº ${MAEC_NUMBER}, nombrada por el Ministerio de Asuntos Exteriores en ${SINCE}. ${maecLink("Comprueba el nombramiento en el buscador oficial del Ministerio")}.`,
              ],
            ],
          },
        },
        "Es el precio de catálogo del certificado de antecedentes penales: no hay recargo por el Reino Unido ni por la entrega en el día. El pago es con tarjeta en libras o en euros a través de Stripe, o por Wise, cuando apruebas el presupuesto por escrito.",
      ],
    },
    {
      id: "certificado-acro",
      title: "Qué es el ACRO Police Certificate y qué pide el consulado",
      body: [
        `El ACRO Police Certificate es el certificado de antecedentes penales del Reino Unido para trámites de visado e inmigración; lo emite la <a href="${ACRO_URL}" target="_blank" rel="noopener noreferrer">ACRO Criminal Records Office</a> con los datos del Police National Computer y, en la mayoría de los casos, el resultado «no trace» (sin antecedentes). No vale el DBS, que es el certificado para empleadores. Se solicita en línea y llega por correo postal; escanéalo entero, con todas las páginas.`,
        `Antes de traducirlo, el certificado necesita la apostilla de la <a href="${FCDO_URL}" target="_blank" rel="noopener noreferrer">Legalisation Office del FCDO</a> (el Ministerio de Exteriores británico). La apostilla certifica la firma del certificado para que valga en España; la traducción jurada es el paso siguiente y se hace sobre el documento ya apostillado.`,
        "La mayoría de los consulados y oficinas de extranjería piden que el certificado tenga menos de tres meses en la fecha de la solicitud, así que pide el ACRO cuando la cita esté cerca y deja la traducción para el final. La traducción jurada no caduca.",
        `Que la página de la apostilla se traduzca o no depende del organismo: algunos consulados piden todo en español y otros solo el certificado. Mira la lista de requisitos de tu consulado (Londres, Edimburgo o Mánchester) o de tu Oficina de Extranjería, o mándamela y te lo digo. Para umbrales económicos, tasas y plazos de tramitación, acude a la <a href="${CONSULADOS_URL}" target="_blank" rel="noopener noreferrer">página oficial de tu consulado</a> o a un abogado de extranjería: en esta página me limito al documento y a la traducción.`,
      ],
    },
    {
      id: "visados",
      title: "Para qué visados y trámites se pide el certificado ACRO",
      body: [
        "Desde que el Reino Unido salió de la Unión Europea, los ciudadanos británicos piden los mismos visados de larga estancia que el resto de nacionales de fuera de la UE, y a cualquier persona que haya vivido en el Reino Unido en los últimos años se le pide el certificado ACRO. Aparece en estos expedientes:",
        {
          list: [
            `<a href="/traduccion-jurada-visados-espana">Visado no lucrativo</a>: junto con el certificado médico, la prueba de fondos y el seguro médico.`,
            `<a href="/traduccion-jurada-visado-nomada-digital">Visado de nómada digital</a>: con la carta del empleador o los contratos y el certificado de la empresa.`,
            `<a href="/traduccion-jurada-visados-espana">Visado de estudios</a> de más de seis meses y <a href="/traduccion-jurada-visados-espana">visado de trabajo</a>.`,
            `<a href="/traduccion-jurada-britanicos-espana">Residencia y nacionalidad desde España</a>: la Oficina de Extranjería y el Registro Civil piden el ACRO apostillado y traducido a quien ha residido en el Reino Unido.`,
          ],
        },
        "Si traduces varios documentos a la vez, el <a href=\"/traduccion-jurada-visados-espana#paquetes\">Spain Visa Pack</a> incluye el certificado ACRO con el certificado médico y una partida por un precio cerrado para todo el expediente.",
      ],
    },
    {
      id: "jurada-o-certificada",
      title: "¿Traducción jurada o «certified translation»?",
      body: [
        "En el Reino Unido una <em>certified translation</em> es una traducción con una declaración firmada de exactitud, y la puede emitir cualquier traductor o agencia. En España la traducción jurada la firma y sella una traductora nombrada por el Ministerio de Asuntos Exteriores, y es lo que la ley exige para presentar documentos extranjeros ante una administración española. Los consulados aceptan la traducción jurada sin discusión, y cuando llegues a España, la Oficina de Extranjería que expide la tarjeta de residencia (TIE), el ayuntamiento y el Registro Civil solo aceptan traducción jurada, así que con una sola traducción cubres el visado y todo lo que viene después.",
        "Mi traducción reproduce el documento completo: el membrete de ACRO, los datos del titular, el resultado, el sello, el bloque de firma y, si el organismo lo exige, la apostilla, cada elemento identificado para que el funcionario pueda cotejarlo con el original. Lleva mi certificación, firma y sello en cada página y la firma electrónica cualificada en el PDF.",
      ],
    },
  ],
  howTitle: "Cómo se pide la traducción",
  steps: [
    {
      t: "Envías el certificado ACRO apostillado",
      d: "Por WhatsApp o desde la calculadora de precio. Manda el documento completo, apostilla incluida, en PDF o en fotos nítidas. Si aún no lo has apostillado, mándalo igualmente y te digo qué espera el consulado.",
    },
    {
      t: "Presupuesto y pago",
      d: "En menos de dos horas tienes el precio cerrado en libras o euros y el plazo por escrito; los mensajes de noche se contestan antes de las 9:00, hora de Madrid. Pagas con tarjeta a través de Stripe o por Wise.",
    },
    {
      t: "Traducción firmada",
      d: "Traduzco el certificado y, si hace falta, la apostilla; certifico, firmo y sello la traducción.",
    },
    {
      t: "PDF por email, papel opcional",
      d: "PDF firmado el mismo día si llega antes de las 15:00, hora de Madrid, y en 24 horas en cualquier caso. Copia en papel por mensajería al Reino Unido o a España si la pides.",
    },
  ],
  faq: [
    {
      q: "¿Necesito traducción jurada o «certified translation» del certificado ACRO?",
      a: "Para un visado de España, traducción jurada hecha por una traductora nombrada por el Ministerio de Asuntos Exteriores. Es la que sigue valiendo en España para la tarjeta de residencia, el empadronamiento y la nacionalidad, así que es la opción segura.",
    },
    {
      q: "¿Sirve una «certified translation» hecha en el Reino Unido?",
      a: "Puede aceptarse en algún consulado para la solicitud del visado; las administraciones españolas no la aceptan cuando llegues. Si solo vas a traducir el certificado una vez, que sea una traducción jurada.",
    },
    {
      q: "¿Se traduce también la apostilla del FCDO?",
      a: "Depende del organismo: algunos consulados y oficinas de extranjería piden todas las páginas en español y otros solo el certificado. Si el tuyo lo exige, traduzco la apostilla como una página más y va en el mismo PDF.",
    },
    {
      q: "¿Cuánto tarda la traducción?",
      a: "El certificado ACRO tiene una o dos páginas, más la apostilla. Si me llega antes de las 15:00, hora de Madrid (14:00 en el Reino Unido), tienes el PDF firmado el mismo día; si no, en 24 horas. El plazo queda confirmado por escrito con el presupuesto.",
    },
    {
      q: "¿Cómo pago desde el Reino Unido?",
      a: "Con tarjeta a través de Stripe, en libras o en euros, o por Wise. El precio que apruebas es el que pagas; no hace falta cuenta bancaria en España.",
    },
    {
      q: "¿Necesito la copia en papel o basta con el PDF?",
      a: "El PDF lleva firma electrónica cualificada y equivale legalmente al original en papel sellado. La mayoría de los consulados y la sede electrónica de extranjería lo aceptan; algunos consulados siguen pidiendo papel en las citas presenciales, así que revisa las instrucciones de tu cita. Si necesitas papel, lo envío por mensajería al Reino Unido o a cualquier dirección de España; el coste del transportista va en el presupuesto.",
    },
    {
      q: "¿Vale para el consulado de España en Londres, Edimburgo o Mánchester?",
      a: "Los tres aceptan las traducciones juradas de traductores nombrados por el Ministerio: el nombramiento es nacional y no depende de ningún consulado. El PDF firmado digitalmente lo aceptan los consulados que lo indican en su web; si el tuyo no lo menciona, pregúntalo antes de la cita o pide la copia en papel para ir sobre seguro.",
    },
    {
      q: "¿Cuánto tiempo es válido el certificado ACRO?",
      a: "La mayoría de los consulados y oficinas de extranjería piden que tenga menos de tres meses en la fecha de la solicitud. La traducción jurada no caduca, así que pide primero el certificado, apostíllalo y mándamelo al final.",
    },
  ],
  cta: {
    title: "Mándame el certificado ACRO apostillado",
    text: "Por WhatsApp o desde la calculadora: en menos de dos horas tienes el precio cerrado y el plazo por escrito, y el PDF firmado el mismo día si llega antes de las 15:00, hora de Madrid.",
  },
  related: [
    { href: "/traduccion-jurada-visados-espana", label: "Visados de España" },
    { href: "/traduccion-jurada-britanicos-espana", label: "Británicos en España" },
    { href: "/traduccion-jurada-visado-nomada-digital", label: "Visado de nómada digital" },
    { href: "/traduccion-jurada-antecedentes-fbi", label: "Certificado del FBI (Estados Unidos)" },
    { href: "/traduccion-jurada-certificado-penales", label: "Certificado de antecedentes penales" },
    { href: "/precios", label: "Precios" },
  ],
  otherLangLabel: "ACRO police certificate: sworn translation for your Spanish visa",
};

export const en = {
  id: "acro",
  locale: "en",
  path: PATH_EN,
  alternates: { es: PATH_ES, en: PATH_EN },
  landing: true,
  crumb: "ACRO police certificate",
  metaTitle: "ACRO Police Certificate Translation for Spain Visa | Sworn, Same-Day PDF",
  metaDescription: `Sworn translation of your UK ACRO police certificate for a Spanish visa: €${PRICE}, signed PDF the same day, apostille included if required. MAEC No. ${MAEC_NUMBER}.`,
  h1: "ACRO police certificate: sworn translation for your Spanish visa",
  lead: `Spanish consulates in the UK ask for your ACRO Police Certificate with an FCDO apostille and a sworn translation into Spanish for most long-stay visas: non-lucrative, digital nomad, student and work. The same certificate comes up later for residence and citizenship applications in Spain. I am Elena Peñaranda Ortega, sworn translator No. ${MAEC_NUMBER} appointed by Spain's Ministry of Foreign Affairs, and I translate the ACRO certificate for €${PRICE}, delivered as a digitally signed PDF the same day if it reaches me before 3 pm Madrid time (2 pm in the UK), and within 24 hours in any case. The PDF is valid at the consulate and later in Spain; a paper copy can be couriered to the UK or to any Spanish address.`,
  image: {
    src: "/fotos/escritorio-documentos.jpg",
    alt: "Desk with official documents and a passport, as in a Spanish visa application prepared from the UK",
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
    { text: `€${PRICE} per certificate` },
    { text: "Same-day signed PDF" },
    { text: "Card payment in pounds or euros" },
  ],
  whatsapp: wa("Hi Elena, I need my ACRO police certificate translated for a Spanish visa"),
  whatsappLabel: "Send me your ACRO certificate on WhatsApp",
  quoteCta: { label: "Price calculator", href: "/en#calculadora" },
  serviceName: "Sworn translation of the UK ACRO police certificate for Spanish visas",
  serviceType: "Sworn English-Spanish translation",
  price: PRICE,
  areaServed: [
    { "@type": "Country", name: "GB" },
    { "@type": "Country", name: "ES" },
  ],
  sections: [
    {
      id: "price",
      title: "Price, turnaround and format for the ACRO certificate translation",
      body: [
        {
          table: {
            caption:
              "ACRO police certificate sworn translation: price, turnaround, format and translator",
            head: ["Item", "Details"],
            rows: [
              [
                "Price",
                `€${PRICE} for the ACRO Police Certificate of up to 2 pages. If your consulate or the immigration office requires the apostille page translated too, it counts as one extra page at the same per-page rate; you see the total before you pay.`,
              ],
              [
                "Turnaround",
                "Signed PDF the same day if I receive the document before 3 pm Madrid time (2 pm in the UK); within 24 hours in any case.",
              ],
              [
                "Format",
                "PDF with a qualified electronic signature under Spain's Order AUC/213/2025, valid at Spanish consulates and immigration offices. Paper copy with handwritten signature and stamp couriered to the UK or to any Spanish address; the courier cost is stated in the quote.",
              ],
              [
                "Translator",
                `Elena Peñaranda Ortega, sworn English-Spanish translator No. ${MAEC_NUMBER}, appointed by Spain's Ministry of Foreign Affairs in ${SINCE}. ${maecLink("Check the appointment on the Ministry's official register")}.`,
              ],
            ],
          },
        },
        "This is the catalogue price for a criminal record certificate: there is no surcharge for the UK or for same-day delivery. Payment is by card in pounds or euros through Stripe, or through Wise, once you approve the quote in writing.",
      ],
    },
    {
      id: "acro-certificate",
      title: "What the ACRO Police Certificate is and what the consulate asks for",
      body: [
        `The ACRO Police Certificate is the UK criminal record check issued for visa and immigration purposes by the <a href="${ACRO_URL}" target="_blank" rel="noopener noreferrer">ACRO Criminal Records Office</a>, from the data held on the Police National Computer; for most applicants the result reads "no trace". It is not the same as a DBS check, which is for employers. You apply online and the certificate arrives by post; scan every page.`,
        `Before translation, the certificate needs an apostille from the <a href="${FCDO_URL}" target="_blank" rel="noopener noreferrer">FCDO Legalisation Office</a>. The apostille certifies the signature on the certificate so the document is valid in Spain; the sworn translation is the next step and is done on the apostilled document.`,
        "Most consulates and immigration offices want the certificate to be less than three months old on the application date, so order the ACRO once your appointment is close and leave the translation for last. The sworn translation itself does not expire.",
        `Whether the apostille page must be translated depends on the authority: some consulates want every page in Spanish, others only the certificate. Check the checklist of your consulate (London, Edinburgh or Manchester) or of your immigration office in Spain, or send it to me and I will tell you. For financial thresholds, fees and processing times, go to <a href="${CONSULADOS_URL}" target="_blank" rel="noopener noreferrer">your consulate's official page</a> or to an immigration lawyer: on this page I keep to the document and the translation.`,
      ],
    },
    {
      id: "visas",
      title: "Which Spanish visas and procedures ask for the ACRO certificate",
      body: [
        "Since the UK left the European Union, British citizens apply for the same long-stay visas as other non-EU nationals, and anyone who has lived in the UK in recent years is asked for the ACRO certificate. It appears in these files:",
        {
          list: [
            `<a href="/en/sworn-translations-spanish-visas">Non-lucrative visa</a>: together with the medical certificate, proof of funds and health insurance.`,
            `<a href="/en/sworn-translation-spain-digital-nomad-visa">Digital nomad visa</a>: with the employer letter or contracts and the company certificate.`,
            `<a href="/en/sworn-translations-spanish-visas">Student visa</a> for stays over six months, and <a href="/en/sworn-translations-spanish-visas">work visas</a>.`,
            `<a href="/en/sworn-translation-british-residents-spain">Residence and citizenship from within Spain</a>: the immigration office and the civil registry ask anyone who has lived in the UK for the apostilled, translated ACRO.`,
          ],
        },
        "If you are translating several documents at once, the <a href=\"/en/sworn-translations-spanish-visas#packs\">Spain Visa Pack</a> covers the ACRO certificate with the medical certificate and a birth or marriage certificate for one fixed price.",
      ],
    },
    {
      id: "sworn-or-certified",
      title: "Sworn translation or certified translation?",
      body: [
        "In the UK a certified translation is a translation with a signed statement of accuracy, and any translator or agency can issue one. In Spain a sworn translation (<em>traducción jurada</em>) is signed and stamped by a translator appointed by the Ministry of Foreign Affairs, and that is what Spanish law requires for foreign documents before a Spanish authority. Consulates accept sworn translations without question, and once you are in Spain, the immigration office that issues your residence card (TIE), the town hall and the civil registry accept nothing else, so one translation covers the visa and everything after it.",
        "My translation reproduces the whole document: the ACRO letterhead, the holder's details, the result, the seal, the signature block and, if the authority requires it, the apostille, each element labelled so the officer can match it to the original. It carries my certification, signature and stamp on every page and the qualified electronic signature on the PDF.",
      ],
    },
  ],
  howTitle: "How to order the translation",
  steps: [
    {
      t: "Send the apostilled ACRO certificate",
      d: "On WhatsApp or through the price calculator. Send the whole document, apostille included, as a PDF or clear photos. If you have not apostilled it yet, send it anyway and I will tell you what the consulate expects.",
    },
    {
      t: "Quote and payment",
      d: "Within two hours you have the fixed price in pounds or euros and the delivery time in writing; overnight messages are answered before 9 am Madrid time. Pay by card through Stripe or through Wise.",
    },
    {
      t: "Signed translation",
      d: "I translate the certificate and, if required, the apostille, then certify, sign and stamp the translation.",
    },
    {
      t: "PDF by email, paper optional",
      d: "Signed PDF the same day if it arrives before 3 pm Madrid time, within 24 hours in any case. Paper copy couriered to the UK or to Spain on request.",
    },
  ],
  faq: [
    {
      q: "Do I need a sworn translation or a certified translation of my ACRO certificate?",
      a: "For a Spanish visa, a sworn translation by a translator appointed by Spain's Ministry of Foreign Affairs. It is the one that remains valid in Spain for your residence card, town hall registration and citizenship, so it is the safe choice.",
    },
    {
      q: "Is a certified translation made in the UK enough?",
      a: "It may be accepted at some consulates for the visa application; Spanish authorities do not accept it once you arrive. If you are only going to translate the certificate once, make it a sworn translation.",
    },
    {
      q: "Does the FCDO apostille need to be translated?",
      a: "It depends on the authority: some consulates and immigration offices ask for every page in Spanish, others only for the certificate. If yours requires it, I translate the apostille as one extra page and it goes in the same PDF.",
    },
    {
      q: "How long does the translation take?",
      a: "An ACRO certificate runs to one or two pages plus the apostille. If it reaches me before 3 pm Madrid time (2 pm in the UK) you have the signed PDF the same day; otherwise within 24 hours. The deadline is confirmed in writing with the quote.",
    },
    {
      q: "How do I pay from the UK?",
      a: "By card through Stripe, in pounds or euros, or through Wise. The price you approve is the price you pay; no Spanish bank account is needed.",
    },
    {
      q: "Do I need the paper copy, or is the PDF enough?",
      a: "The PDF carries a qualified electronic signature and is legally equivalent to the stamped paper original in Spain. Most consulates and the immigration office's online portal accept it; some consulates still ask for paper at in-person appointments, so check your appointment instructions. If you need paper, I courier it to the UK or to any Spanish address; the courier cost is stated in the quote.",
    },
    {
      q: "Is the translation accepted at the Spanish consulate in London, Edinburgh or Manchester?",
      a: "All three accept sworn translations by translators appointed by the Ministry: the appointment is national and not tied to any consulate. The digitally signed PDF is accepted by the consulates that say so on their website; if yours does not mention it, ask before your appointment or order the paper copy to be safe.",
    },
    {
      q: "How long is the ACRO certificate valid?",
      a: "Most consulates and immigration offices want it to be under three months old on the application date. The sworn translation itself does not expire, so order the certificate first, apostille it, and send it to me last.",
    },
  ],
  cta: {
    title: "Send me your apostilled ACRO certificate",
    text: "On WhatsApp or through the calculator: you get the fixed price and the delivery time in writing within two hours, and the signed PDF the same day if it arrives before 3 pm Madrid time.",
  },
  related: [
    { href: "/en/sworn-translations-spanish-visas", label: "Spanish visas" },
    { href: "/en/sworn-translation-british-residents-spain", label: "British residents in Spain" },
    { href: "/en/sworn-translation-spain-digital-nomad-visa", label: "Digital nomad visa" },
    { href: "/en/fbi-background-check-translation-spain", label: "FBI background check (United States)" },
    { href: "/en/how-it-works", label: "How it works" },
    { href: "/en/precios", label: "Pricing" },
  ],
  otherLangLabel: "Traducción jurada del ACRO Police Certificate del Reino Unido para tu visado de España",
};
