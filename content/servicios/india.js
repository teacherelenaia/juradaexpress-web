// content/servicios/india.js
//
// Página de audiencia: personas de India con trámites en el Consulado de
// España (estudios, trabajo, nómada digital, reagrupación, homologación).
// Fuente: docs/BRIEF-INTERNACIONAL-2026-09.md, punto 0.6. Elena traduce
// del inglés: los documentos en hindi u otra lengua india deben llegar en
// versión inglesa oficial. La apostilla la emite el MEA.
import { TIMEZONE_NOTE, INTERNATIONAL_SHIPPING } from "../site";

const PATH_ES = "/traduccion-jurada-india";
const PATH_EN = "/en/sworn-translation-india-spain";

export const es = {
  id: "india",
  locale: "es",
  path: PATH_ES,
  alternates: { es: PATH_ES, en: PATH_EN },
  crumb: "Clientes de India",
  metaTitle: "Traducción jurada de documentos de India para España",
  metaDescription: "Traducción jurada al español de documentos indios en inglés (nacimiento, matrimonio, PCC, títulos) para visados en el Consulado de España. Apostilla MEA.",
  h1: "Traducción jurada de documentos de India para trámites en España",
  lead:
    "La traducción jurada de documentos indios para España es la traducción al español, firmada y sellada por una traductora nombrada por el Ministerio de Asuntos Exteriores de España, de los documentos emitidos en inglés en India que pide el Consulado de España (Nueva Delhi o Bombay) o la administración española: certificado de nacimiento y matrimonio, police clearance certificate, títulos y transcripts, cartas de empleador y extractos bancarios, todos con la apostilla del Ministry of External Affairs (MEA). Soy Elena Peñaranda Ortega, traductora jurada nº 7310, y los traduzco 100 % online con entrega en PDF firmado en 24/48 h y pago con tarjeta india.",
  image: {
    src: "/fotos/estudiante-portatil.jpg",
    alt: "Estudiante trabajando con un portátil en una biblioteca universitaria",
  },
  whatsapp:
    "https://wa.me/34685891214?text=Hola%20Elena%2C%20escribo%20desde%20India%3A%20necesito%20traducci%C3%B3n%20jurada%20al%20espa%C3%B1ol%20de%20mis%20documentos%20%28en%20ingl%C3%A9s%2C%20con%20apostilla%20del%20MEA%29%20para%20el%20Consulado%20de%20Espa%C3%B1a",
  whatsappLabel: "Escribir desde India",
  serviceName: "Traducción jurada de documentos de India para España",
  serviceType: "Traducción jurada inglés-español",
  price: null,
  areaServed: [{ "@type": "Country", name: "IN" }, { "@type": "Country", name: "ES" }],
  sections: [
    {
      id: "tramites",
      title: "¿Para qué trámites en España se traducen documentos indios?",
      body: [
        {
          list: [
            '<strong>Visado de estudios</strong>: carta de admisión de la universidad española, <a href="/traduccion-jurada-titulo-universitario">títulos y transcripts</a>, police clearance certificate, justificantes económicos y seguro médico.',
            '<strong>Visado de trabajo y tarjeta azul</strong>: contrato, títulos, cartas de experiencia de empleadores anteriores y police clearance certificate.',
            '<strong>Visado de nómada digital</strong>: contrato o carta del empleador con autorización para teletrabajar, certificado de la empresa, títulos y extractos bancarios. Tiene <a href="/traduccion-jurada-visado-nomada-digital">su propia guía</a>.',
            '<strong>Reagrupación familiar y matrimonio</strong>: <a href="/traduccion-jurada-certificado-matrimonio">certificado de matrimonio</a>, <a href="/traduccion-jurada-partida-nacimiento">certificados de nacimiento</a> de los hijos y, si procede, sentencia de divorcio.',
            '<strong>Homologación y equivalencia de títulos</strong> ante el Ministerio de Educación o Universidades: título, transcripts, plan de estudios y certificados de la universidad.',
            '<strong>Colegiación de médicos, ingenieros y otros profesionales</strong>: títulos, registros profesionales y certificados de experiencia.',
          ],
        },
      ],
    },
    {
      id: "documentos",
      title: "¿Qué documentos indios se traducen y qué necesita cada uno?",
      body: [
        {
          table: {
            caption: "Documentos indios habituales: apostilla del MEA y traducción jurada",
            head: ["Documento", "Apostilla del MEA", "Traducción jurada", "Observaciones"],
            rows: [
              [
                "Birth certificate (municipalidad / registrar)",
                "Sí",
                "Sí",
                "Si está en lengua regional, hace falta versión inglesa oficial antes de traducir",
              ],
              [
                "Marriage certificate",
                "Sí",
                "Sí",
                "Incluye el registro y los sellos del registrar",
              ],
              [
                "Police clearance certificate (PCC) de la comisaría de pasaportes o de la policía estatal",
                "Sí",
                "Sí",
                "Suele tener validez limitada: pide la cita antes de solicitarlo",
              ],
              [
                "Títulos, mark sheets y transcripts",
                "Sí (la universidad debe verificarlos primero)",
                "Sí",
                "Los transcripts largos se presupuestan por página",
              ],
              [
                "Cartas de empleador y de experiencia",
                "Según consulado",
                "Sí",
                "Con membrete, firma y cargo del firmante",
              ],
              [
                "Extractos bancarios, ITR y form 16",
                "No",
                "Sí (a veces basta con los últimos meses)",
                "Se traducen íntegros, incluidos los sellos del banco",
              ],
              [
                "Affidavits y declaraciones ante notario",
                "Sí",
                "Sí",
                "Incluye el sello del notario y el papel timbrado",
              ],
            ],
          },
        },
      ],
    },
    {
      id: "apostilla",
      title: "¿Dónde se apostillan los documentos en India?",
      body: [
        "India es firmante del Convenio de La Haya, así que los documentos públicos indios se legalizan con <strong>apostilla</strong>, y quien la emite es el <strong>Ministry of External Affairs (MEA)</strong> del Gobierno de India, a través de sus centros de recogida o de agencias autorizadas. Antes de la apostilla, muchos documentos pasan por una atestación previa: la del departamento de educación del estado para títulos, la del Home Department para certificados personales, o la de la cámara de comercio para documentos comerciales.",
        "Primero la apostilla, después la traducción: la apostilla del MEA es una pegatina con código QR que también se traduce. Si me envías un documento sin apostilla y el consulado la exige, te lo indico antes de empezar.",
      ],
    },
    {
      id: "idioma",
      title: "¿Traduces documentos en hindi u otras lenguas de India?",
      body: [
        "No. Traduzco del inglés al español y del español al inglés. La mayoría de los documentos indios se emiten en inglés o en versión bilingüe, y con esos trabajo directamente. Si un certificado está solo en hindi, marathi, tamil, gujarati, bengalí o cualquier otra lengua, necesitas primero una <strong>versión inglesa oficial</strong> (del propio organismo emisor o de un traductor reconocido en India, con su sello); esa versión, apostillada, es la que yo traduzco al español para el consulado.",
      ],
    },
    {
      id: "inverso",
      title: "¿Y en sentido contrario: documentos españoles para usarlos en India?",
      body: [
        "También. Certificados de nacimiento o matrimonio, títulos españoles, certificados de antecedentes penales o documentos de empresa que tengas que presentar ante una administración, universidad o empleador en India se traducen al inglés con mi firma y sello. Cuando el organismo indio lo pida, el documento español se apostilla antes en España (Ministerio de Justicia, notarios o Colegios Notariales, según el tipo).",
      ],
    },
    {
      id: "horario",
      title: "¿Cómo funciona el envío, el pago y el huso horario desde India?",
      body: [
        `${TIMEZONE_NOTE.es}. India va entre 3 horas y media y 4 horas y media por delante de España, así que si me escribes a media mañana en India te contesto a primera hora de mi jornada y un documento habitual te llega en 24/48 h.`,
        `Me envías el escaneo completo de cada documento (con la apostilla) por WhatsApp o email; te doy precio cerrado en euros en menos de 2 horas laborables y pagas con tarjeta india (Visa, Mastercard o RuPay internacional) a través de Stripe. Recibes un PDF firmado digitalmente, válido para la presentación en el consulado y en la plataforma de visados. ${INTERNATIONAL_SHIPPING.note.es}.`,
      ],
    },
  ],
  steps: [
    {
      t: "Envío",
      d: "Escaneo completo de cada documento en inglés, con la apostilla del MEA, por WhatsApp o email.",
    },
    {
      t: "Presupuesto",
      d: "Precio cerrado en euros y plazo en menos de 2 horas laborables; pago con tarjeta india.",
    },
    {
      t: "Traducción jurada",
      d: "Traducción al español de cada documento, sellos y apostilla incluidos; firmo y sello personalmente.",
    },
    {
      t: "Entrega",
      d: "PDF firmado en 24/48 h para el consulado o la plataforma; papel por mensajería si te lo exigen.",
    },
  ],
  faq: [
    {
      q: "¿El Consulado de España en India acepta traducciones juradas hechas en España?",
      a: "Sí. Lo que exige el consulado es que la traducción la firme un traductor jurado nombrado por el Ministerio de Asuntos Exteriores de España. Mi nombramiento (nº 7310) figura en el listado oficial del Ministerio, que es lo que comprueba el consulado.",
    },
    {
      q: "¿Traduces también la apostilla del MEA?",
      a: "Sí. La apostilla forma parte del documento y se traduce entera, incluidos el número, la fecha y el código QR indicado en la traducción.",
    },
    {
      q: "¿Puedo pagar con una tarjeta india?",
      a: "Sí. El pago es con tarjeta internacional a través de Stripe, en euros; tu banco convierte el importe a rupias. Si tu tarjeta tiene bloqueados los pagos internacionales, actívalos desde la app del banco antes de pagar.",
    },
    {
      q: "¿Cuánto cuesta traducir un expediente de visado de estudios completo?",
      a: "Depende del número de páginas (los transcripts suelen ser lo más largo). Envíame todo el lote en una carpeta y te doy un precio cerrado y un único plazo por escrito en menos de 2 horas.",
    },
    {
      q: "¿Necesito enviar el papel original a España?",
      a: "No. Trabajo con el escaneo. Si el consulado te pide la traducción en papel, te envío los originales sellados por mensajería a la dirección que me indiques en India.",
    },
  ],
  cta: {
    title: "Escríbeme desde India",
    text: "Mándame los documentos escaneados en inglés y dime en qué consulado presentas la solicitud. Te respondo en horario de España con precio cerrado en euros y plazo único por escrito.",
  },
  related: [
    { href: "/traduccion-jurada-visado-nomada-digital", label: "Visado de nómada digital" },
    { href: "/traduccion-jurada-titulo-universitario", label: "Título universitario" },
    { href: "/traduccion-jurada-certificado-penales", label: "Antecedentes penales" },
    { href: "/traduccion-jurada-partida-nacimiento", label: "Certificado de nacimiento" },
    { href: "/traduccion-jurada-urgente-grandes-volumenes", label: "Proyectos urgentes y grandes volúmenes" },
  ],
  otherLangLabel: "Sworn translation of Indian documents for Spain",
};

export const en = {
  id: "india",
  locale: "en",
  path: PATH_EN,
  alternates: { es: PATH_ES, en: PATH_EN },
  crumb: "Clients in India",
  metaTitle: "Sworn translation of Indian documents for Spain",
  metaDescription: "Sworn Spanish translation of Indian documents (birth, marriage, PCC, degrees) for student, work and family visas at the Spanish consulate. MEA apostille.",
  h1: "Sworn translation of Indian documents for procedures in Spain",
  lead:
    "A sworn translation of Indian documents for Spain is the Spanish translation, signed and stamped by a translator appointed by Spain's Ministry of Foreign Affairs, of the English-language documents issued in India that the Spanish consulate (New Delhi or Mumbai) or the Spanish administration ask for: birth and marriage certificates, police clearance certificate, degrees and transcripts, employer letters and bank statements, all apostilled by the Ministry of External Affairs (MEA). I am Elena Peñaranda Ortega, sworn translator no. 7310, and I translate them fully online, delivered as a signed PDF in 24/48 hours and paid with your Indian card.",
  image: {
    src: "/fotos/estudiante-portatil.jpg",
    alt: "Student working on a laptop in a university library",
  },
  whatsapp:
    "https://wa.me/34685891214?text=Hi%20Elena%2C%20I%27m%20writing%20from%20India%3A%20I%20need%20sworn%20Spanish%20translations%20of%20my%20documents%20%28in%20English%2C%20with%20MEA%20apostille%29%20for%20the%20Spanish%20consulate",
  whatsappLabel: "Message me from India",
  serviceName: "Sworn translation of Indian documents for Spain",
  serviceType: "Sworn English-Spanish translation",
  price: null,
  areaServed: [{ "@type": "Country", name: "IN" }, { "@type": "Country", name: "ES" }],
  sections: [
    {
      id: "procedures",
      title: "Which Spanish procedures require translated Indian documents?",
      body: [
        {
          list: [
            '<strong>Student visa</strong>: admission letter from the Spanish university, <a href="/traduccion-jurada-titulo-universitario">degrees and transcripts</a>, police clearance certificate, proof of funds and health insurance.',
            '<strong>Work visa and EU Blue Card</strong>: contract, degrees, experience letters from previous employers and police clearance certificate.',
            '<strong>Digital nomad visa</strong>: contract or employer letter authorising remote work, company certificate, degrees and bank statements. It has <a href="/en/sworn-translation-spain-digital-nomad-visa">its own guide</a>.',
            '<strong>Family reunification and marriage</strong>: <a href="/traduccion-jurada-certificado-matrimonio">marriage certificate</a>, children\'s <a href="/traduccion-jurada-partida-nacimiento">birth certificates</a> and, where applicable, divorce decree.',
            '<strong>Recognition of qualifications</strong> (homologación or equivalencia) with the Spanish Ministry of Education or Universities: degree, transcripts, syllabus and university certificates.',
            '<strong>Professional registration</strong> for doctors, engineers and other professionals: degrees, professional registrations and experience certificates.',
          ],
        },
      ],
    },
    {
      id: "documents",
      title: "Which Indian documents are translated, and what does each one need?",
      body: [
        {
          table: {
            caption: "Common Indian documents: MEA apostille and sworn translation",
            head: ["Document", "MEA apostille", "Sworn translation", "Notes"],
            rows: [
              [
                "Birth certificate (municipal corporation / registrar)",
                "Yes",
                "Yes",
                "If it is in a regional language, an official English version is needed first",
              ],
              ["Marriage certificate", "Yes", "Yes", "Includes the registration and the registrar's stamps"],
              [
                "Police clearance certificate (PCC) from the passport office or state police",
                "Yes",
                "Yes",
                "Usually valid for a limited time: book your appointment before applying for it",
              ],
              [
                "Degrees, mark sheets and transcripts",
                "Yes (the university must verify them first)",
                "Yes",
                "Long transcripts are quoted per page",
              ],
              [
                "Employer and experience letters",
                "Depends on the consulate",
                "Yes",
                "On letterhead, with signature and position of the signatory",
              ],
              [
                "Bank statements, ITR and Form 16",
                "No",
                "Yes (recent months are often enough)",
                "Translated in full, bank stamps included",
              ],
              [
                "Affidavits and notarised declarations",
                "Yes",
                "Yes",
                "Includes the notary's seal and the stamp paper",
              ],
            ],
          },
        },
      ],
    },
    {
      id: "apostille",
      title: "Where are documents apostilled in India?",
      body: [
        "India is party to the Hague Convention, so Indian public documents are legalised with an <strong>apostille</strong>, issued by the <strong>Ministry of External Affairs (MEA)</strong> of the Government of India through its collection centres or authorised outsourcing agencies. Before the apostille, many documents go through prior attestation: the state education department for degrees, the Home Department for personal certificates, or the chamber of commerce for commercial documents.",
        "Apostille first, translation second: the MEA apostille is a sticker with a QR code and it is translated too. If you send me a document without an apostille and the consulate requires one, I will tell you before I start.",
      ],
    },
    {
      id: "language",
      title: "Do you translate documents in Hindi or other Indian languages?",
      body: [
        "No. I translate from English into Spanish and from Spanish into English. Most Indian documents are issued in English or in a bilingual version, and I work with those directly. If a certificate is only in Hindi, Marathi, Tamil, Gujarati, Bengali or any other language, you first need an <strong>official English version</strong> (from the issuing body itself or from a recognised translator in India, with their seal); that apostilled version is what I translate into Spanish for the consulate.",
      ],
    },
    {
      id: "reverse",
      title: "And the other way round: Spanish documents for use in India?",
      body: [
        "Yes. Birth or marriage certificates, Spanish degrees, criminal record certificates or company documents that you need to present to an authority, university or employer in India are translated into English with my signature and stamp. Where the Indian body requires it, the Spanish document is apostilled first in Spain (Ministry of Justice, notaries or notarial colleges, depending on the type).",
      ],
    },
    {
      id: "timezone",
      title: "How do sending, payment and time zones work from India?",
      body: [
        `${TIMEZONE_NOTE.en}. India is three and a half to four and a half hours ahead of Spain, so if you message me mid-morning in India I reply at the start of my working day, and a standard document reaches you within 24/48 hours.`,
        `You send me a complete scan of each document (with the apostille) on WhatsApp or by email; I give you a fixed price in euros within 2 working hours and you pay with your Indian card (Visa, Mastercard or international RuPay) through Stripe. You receive a digitally signed PDF, valid for submission at the consulate and on the visa platform. ${INTERNATIONAL_SHIPPING.note.en}.`,
      ],
    },
  ],
  steps: [
    {
      t: "Send",
      d: "A complete scan of each document in English, with the MEA apostille, on WhatsApp or by email.",
    },
    {
      t: "Quote",
      d: "Fixed price in euros and deadline within 2 working hours; payment with your Indian card.",
    },
    {
      t: "Sworn translation",
      d: "Spanish translation of every document, stamps and apostille included; I sign and stamp personally.",
    },
    {
      t: "Delivery",
      d: "Signed PDF in 24/48 hours for the consulate or the platform; paper by courier if required.",
    },
  ],
  faq: [
    {
      q: "Does the Spanish consulate in India accept sworn translations made in Spain?",
      a: "Yes. The consulate requires the translation to be signed by a sworn translator appointed by Spain's Ministry of Foreign Affairs. My appointment (no. 7310) is on the Ministry's official register, which is what the consulate checks.",
    },
    {
      q: "Do you also translate the MEA apostille?",
      a: "Yes. The apostille is part of the document and is translated in full, including the number, the date and a reference to the QR code.",
    },
    {
      q: "Can I pay with an Indian card?",
      a: "Yes. Payment is by international card through Stripe, in euros; your bank converts the amount to rupees. If international payments are blocked on your card, enable them in your banking app before paying.",
    },
    {
      q: "How much does a complete student visa file cost to translate?",
      a: "It depends on the number of pages (transcripts are usually the longest part). Send me the whole batch in one folder and you get a fixed price and a single deadline in writing within 2 hours.",
    },
    {
      q: "Do I need to send the paper originals to Spain?",
      a: "No. I work from the scan. If the consulate asks for the translation on paper, I courier the stamped originals to the address you give me in India.",
    },
  ],
  cta: {
    title: "Message me from India",
    text: "Send me your scanned documents in English and tell me which consulate you are applying at. I reply during Spanish office hours with a fixed price in euros and a single deadline in writing.",
  },
  related: [
    { href: "/en/sworn-translation-spain-digital-nomad-visa", label: "Digital nomad visa" },
    { href: "/traduccion-jurada-titulo-universitario", label: "University degree (guide in Spanish)" },
    { href: "/en/urgent-sworn-translation-large-projects", label: "Urgent and large projects" },
    { href: "/en/how-it-works", label: "How it works" },
    { href: "/en/blog", label: "Blog guides" },
  ],
  otherLangLabel: "Traducción jurada de documentos de India",
};
