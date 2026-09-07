// content/servicios/australia.js
//
// Página de país: Australia ⇄ España (FASE 2B.2). Regla del Department of
// Home Affairs (fuentes enlazadas en la página): las traducciones hechas en
// Australia deben ser de traductor acreditado por NAATI; las hechas fuera
// de Australia no necesitan NAATI, pero el traductor debe indicar nombre
// completo, dirección, teléfono y sus cualificaciones y experiencia en el
// idioma. Contrastado a través de los resultados de búsqueda de las páginas
// oficiales de immi.homeaffairs.gov.au (no accesibles directamente desde el
// entorno de trabajo): ver docs/CHANGELOG-2026-09.md, FASE 2B. Apostilla
// australiana: DFAT, a través de la Australian Passport Office.
import { TIMEZONE_NOTE, INTERNATIONAL_SHIPPING } from "../site";

const PATH_ES = "/traduccion-jurada-australia";
const PATH_EN = "/en/sworn-translation-australia-spain";

const SRC_HA =
  "https://immi.homeaffairs.gov.au/help-text/evidence/Pages/et-h0012.aspx";
const SRC_HA_VISITOR =
  "https://immi.homeaffairs.gov.au/check-twice-submit-once/visitor-visa";
const SRC_DFAT =
  "https://www.smartraveller.gov.au/consular-services/notarial-services/documents-in-australia";

export const es = {
  id: "australia",
  locale: "es",
  path: PATH_ES,
  alternates: { es: PATH_ES, en: PATH_EN },
  crumb: "Clientes de Australia",
  metaTitle: "Traducción jurada para clientes de Australia",
  metaDescription:
    "Traductora jurada nº 7310 para australianos en España y españoles con trámites en Australia: qué pide Home Affairs, apostilla del DFAT, PDF 24/48 h.",
  h1: "Traducción jurada entre Australia y España",
  lead:
    "Si vives en Australia y vas a pedir un visado para España (nómada digital, no lucrativo, estudios, working holiday), casarte, comprar una vivienda o solicitar la nacionalidad, tus documentos australianos necesitan apostilla del DFAT y traducción jurada al español firmada por un traductor nombrado por el Ministerio de Asuntos Exteriores de España. Y si eres español con un trámite ante el Department of Home Affairs, una universidad o un empleador australiano, las traducciones hechas fuera de Australia no necesitan traductor NAATI, pero deben llevar el nombre, la dirección, el teléfono y las cualificaciones del traductor. Soy Elena Peñaranda Ortega, traductora jurada nº 7310, y hago las dos 100 % online: presupuesto en menos de 2 horas, pago con tarjeta australiana y PDF firmado en 24/48 h.",
  image: {
    src: "/fotos/australia-viaje.jpg",
    alt: "Tarjetas de embarque y pasaporte sobre un portátil, documentos de un viaje internacional",
  },
  whatsapp:
    "https://wa.me/34685891214?text=Hola%20Elena%2C%20escribo%20desde%20Australia%3A%20necesito%20traducci%C3%B3n%20de%20mis%20documentos%20para%20un%20tr%C3%A1mite%20en%20Espa%C3%B1a%20o%20ante%20Home%20Affairs%20%28dime%20cu%C3%A1l%29",
  whatsappLabel: "Escribir desde Australia",
  serviceName: "Traducción jurada para clientes de Australia",
  serviceType: "Traducción jurada inglés-español y certificada español-inglés",
  price: null,
  areaServed: [{ "@type": "Country", name: "AU" }, { "@type": "Country", name: "ES" }],
  sections: [
    {
      id: "sentidos",
      title: "¿En qué sentido necesitas la traducción?",
      body: [
        {
          table: {
            caption: "Dos sentidos de traducción entre Australia y España",
            head: ["Tu situación", "Qué necesitas", "Quién lo pide"],
            rows: [
              [
                "Te instalas en España con documentos australianos",
                "Traducción jurada inglés → español (firma y sello del MAEC)",
                "Embajada de España en Canberra y consulados (Sídney, Melbourne), extranjería, registro civil, notaría, universidad",
              ],
              [
                "Eres español con un trámite en Australia",
                "Traducción español → inglés con los datos y cualificaciones del traductor",
                "Department of Home Affairs, universidades, AHPRA y colegios profesionales, empleadores",
              ],
            ],
          },
        },
        "Hago las dos con el mismo proceso digital. Si presentas el mismo documento en los dos países, te preparo las dos versiones a la vez, con los mismos nombres, fechas y términos.",
      ],
    },
    {
      id: "australia-espana",
      title: "¿Qué documentos australianos se traducen para España?",
      body: [
        {
          list: [
            '<strong>Visado de nómada digital</strong>: <a href="/traduccion-jurada-certificado-penales">National Police Check</a> de la AFP, contrato o carta del empleador, extracto de ASIC de la empresa, <a href="/traduccion-jurada-titulo-universitario">título</a>, justificantes de ingresos (payslips, Notice of Assessment de la ATO) y certificate of coverage del acuerdo de Seguridad Social entre Australia y España. Tiene <a href="/traduccion-jurada-visado-nomada-digital">su propia guía</a>.',
            '<strong>Visado no lucrativo, de estudios y working holiday</strong>: antecedentes de la AFP, certificado médico, justificantes de medios, carta de admisión y seguro médico.',
            '<strong>Matrimonio, nacionalidad y residencia</strong>: <a href="/traduccion-jurada-partida-nacimiento">certificados de nacimiento</a> y <a href="/traduccion-jurada-certificado-matrimonio">matrimonio</a> del registro de cada estado (Births, Deaths and Marriages), Certificate of No Impediment, sentencias de divorcio.',
            '<strong>Compra de vivienda y empresa</strong>: poderes notariales, extractos bancarios y <a href="/traduccion-jurada-contrato-escritura">contratos</a> para la notaría.',
          ],
        },
      ],
    },
    {
      id: "home-affairs",
      title: "¿Qué exige Home Affairs a una traducción hecha fuera de Australia?",
      body: [
        `El Department of Home Affairs pide traducciones al inglés de todos los documentos que estén en otro idioma. Para las traducciones hechas <strong>en Australia</strong>, el traductor debe estar acreditado por NAATI (National Accreditation Authority for Translators and Interpreters). Para las traducciones hechas <strong>fuera de Australia</strong>, el traductor no necesita acreditación NAATI, pero la traducción debe indicar su nombre completo, dirección, teléfono y sus cualificaciones y experiencia en el idioma del que traduce (<a href="${SRC_HA}" target="_blank" rel="noopener noreferrer">Home Affairs: evidencia y traducciones</a> · <a href="${SRC_HA_VISITOR}" target="_blank" rel="noopener noreferrer">Home Affairs: comprobaciones antes de solicitar un visado</a>).`,
        "Eso es lo que entrego: la traducción íntegra al inglés con una certificación firmada y fechada que incluye mi nombre completo, dirección, teléfono, mi nombramiento como Traductora-Intérprete Jurada de Inglés por el Ministerio de Asuntos Exteriores de España (nº 7310, comprobable en el listado oficial) y mi experiencia. Documentos habituales: certificados de nacimiento y matrimonio, antecedentes penales del Ministerio de Justicia, títulos y expedientes para AHPRA y evaluaciones de cualificaciones, certificados de empresa y nóminas, escrituras.",
        {
          note: "Los programas de visado y los organismos australianos cambian sus requisitos con frecuencia. Si Home Affairs, tu universidad o AHPRA te dan instrucciones concretas sobre la traducción, envíamelas y las cumplo tal cual; ante la duda, consulta con el organismo de destino antes de encargar la traducción.",
        },
      ],
    },
    {
      id: "apostilla",
      title: "¿Dónde se apostillan los documentos de Australia?",
      body: [
        `Australia y España son parte del Convenio de La Haya, así que los documentos públicos australianos se legalizan con apostilla. La emite el <strong>Department of Foreign Affairs and Trade (DFAT)</strong> a través de la Australian Passport Office de cada capital estatal, con cita previa, y se puede verificar en línea (<a href="${SRC_DFAT}" target="_blank" rel="noopener noreferrer">fuente oficial: Smartraveller, servicios notariales en Australia</a>).`,
        "El orden importa: primero la apostilla, después la traducción, porque la apostilla también se traduce. Si me envías un documento sin apostillar y el consulado la exige, te aviso antes de empezar. Un documento español para usarlo en Australia se apostilla en España (Ministerio de Justicia, notarios o Colegios Notariales, según el tipo).",
      ],
    },
    {
      id: "horario",
      title: "¿Cómo funciona el huso horario y el pago desde Australia?",
      body: [
        `${TIMEZONE_NOTE.es}. Australia va entre 6 y 9 horas por delante de España según el estado y la época del año: un encargo que me envías por la tarde en Sídney o Melbourne está en mi mesa a primera hora de mi jornada, y un documento habitual te llega en 24/48 h, a menudo mientras duermes.`,
        `El presupuesto es cerrado y en euros; pagas con tu tarjeta australiana a través de Stripe y tu banco aplica el cambio a dólares australianos. La entrega es un PDF firmado digitalmente. ${INTERNATIONAL_SHIPPING.note.es}.`,
      ],
    },
  ],
  steps: [
    {
      t: "Envío",
      d: "Escaneo completo del documento (con apostilla) por WhatsApp o email, a cualquier hora.",
    },
    {
      t: "Presupuesto",
      d: "Precio cerrado y plazo en menos de 2 horas laborables de España; pago con tarjeta australiana.",
    },
    {
      t: "Traducción",
      d: "Jurada al español o al inglés con mis datos y cualificaciones, según el organismo.",
    },
    {
      t: "Entrega",
      d: "PDF firmado en 24/48 h y, si lo necesitas, papel por mensajería a España o a Australia.",
    },
  ],
  faq: [
    {
      q: "¿Acepta Home Affairs una traducción hecha en España sin traductor NAATI?",
      a: "Según Home Affairs, las traducciones hechas fuera de Australia no necesitan traductor NAATI, pero deben incluir el nombre completo, la dirección, el teléfono y las cualificaciones y experiencia del traductor. Mi certificación lleva todos esos datos. Ante la duda, confírmalo con el organismo que te pide el documento.",
    },
    {
      q: "¿Necesito apostillar el National Police Check de la AFP para España?",
      a: "Sí. Para presentarlo en España necesita la apostilla del DFAT, que se pide en la Australian Passport Office con cita previa. Primero la apostilla y después la traducción.",
    },
    {
      q: "¿Puedo pagar en dólares australianos?",
      a: "El cobro se hace en euros con tarjeta internacional a través de Stripe; tu banco convierte el importe a dólares australianos automáticamente. No necesitas cuenta en España.",
    },
    {
      q: "¿Cuánto tarda con la diferencia horaria?",
      a: "Un documento habitual sale en 24/48 h desde que confirmas el presupuesto. Como Australia va varias horas por delante, lo normal es que lo envíes por la tarde y lo tengas al día siguiente por la mañana, hora australiana.",
    },
    {
      q: "¿Vale tu traducción jurada en la Embajada de España en Canberra?",
      a: "Sí. La traducción jurada firmada por un traductor nombrado por el Ministerio de Asuntos Exteriores de España es válida en la embajada, en los consulados de Sídney y Melbourne y ante cualquier organismo español.",
    },
  ],
  cta: {
    title: "Escríbeme desde Australia",
    text: "Mándame el documento escaneado y dime si es para España o para un organismo australiano. Te respondo en horario de España con precio cerrado y plazo; el pago es con tu tarjeta habitual.",
  },
  related: [
    { href: "/traduccion-jurada-por-paises", label: "Todos los países" },
    { href: "/traduccion-jurada-visado-nomada-digital", label: "Visado de nómada digital" },
    { href: "/traduccion-jurada-certificado-penales", label: "Antecedentes penales" },
    { href: "/traduccion-jurada-titulo-universitario", label: "Título universitario" },
    { href: "/traduccion-jurada-certificado-matrimonio", label: "Certificado de matrimonio" },
  ],
  otherLangLabel: "Sworn translation between Australia and Spain",
};

export const en = {
  id: "australia",
  locale: "en",
  path: PATH_EN,
  alternates: { es: PATH_ES, en: PATH_EN },
  crumb: "Clients in Australia",
  metaTitle: "Sworn translation between Australia and Spain",
  metaDescription:
    "Sworn translator no. 7310 for Australians moving to Spain and Spaniards with Home Affairs paperwork: translated from abroad, DFAT apostille, PDF in 24/48h.",
  h1: "Sworn translation between Australia and Spain",
  lead:
    "If you live in Australia and are applying for a Spanish visa (digital nomad, non-lucrative, student, working holiday), getting married in Spain, buying a property or applying for Spanish citizenship, your Australian documents need a DFAT apostille and a sworn translation into Spanish signed by a translator appointed by Spain's Ministry of Foreign Affairs. If you are Spanish with paperwork for the Department of Home Affairs, an Australian university or an employer, translations done outside Australia do not need a NAATI translator, but they must carry the translator's full name, address, phone number and qualifications. I am Elena Peñaranda Ortega, sworn translator no. 7310, and I do both fully online: a quote within 2 hours, payment with your Australian card and a signed PDF in 24/48 hours.",
  image: {
    src: "/fotos/australia-viaje.jpg",
    alt: "Boarding passes and a passport on a laptop, documents for an international trip",
  },
  whatsapp:
    "https://wa.me/34685891214?text=Hi%20Elena%2C%20I%27m%20writing%20from%20Australia%3A%20I%20need%20my%20documents%20translated%20for%20a%20procedure%20in%20Spain%20or%20for%20Home%20Affairs%20%28tell%20me%20which%29",
  whatsappLabel: "Message me from Australia",
  serviceName: "Sworn translation for clients in Australia",
  serviceType: "Sworn English-Spanish translation and certified Spanish-English translation",
  price: null,
  areaServed: [{ "@type": "Country", name: "AU" }, { "@type": "Country", name: "ES" }],
  sections: [
    {
      id: "direction",
      title: "Which direction do you need?",
      body: [
        {
          table: {
            caption: "Two directions of translation between Australia and Spain",
            head: ["Your situation", "What you need", "Who asks for it"],
            rows: [
              [
                "You are moving to Spain with Australian documents",
                "Sworn translation English → Spanish (Ministry stamp and signature)",
                "Spanish embassy in Canberra and consulates (Sydney, Melbourne), immigration office, civil registry, notary, university",
              ],
              [
                "You are Spanish with a procedure in Australia",
                "Spanish → English translation with the translator's details and qualifications",
                "Department of Home Affairs, universities, AHPRA and professional bodies, employers",
              ],
            ],
          },
        },
        "I provide both through the same digital process. If you are submitting the same document in both countries, I prepare both versions at once, with the same names, dates and terms.",
      ],
    },
    {
      id: "australia-spain",
      title: "Which Australian documents are translated for Spain?",
      body: [
        {
          list: [
            '<strong>Digital nomad visa</strong>: AFP <a href="/traduccion-jurada-certificado-penales">National Police Check</a>, employment contract or employer letter, ASIC company extract, <a href="/traduccion-jurada-titulo-universitario">degree</a>, proof of income (payslips, ATO Notice of Assessment) and certificate of coverage under the Australia-Spain social security agreement. It has <a href="/en/sworn-translation-spain-digital-nomad-visa">its own guide</a>.',
            '<strong>Non-lucrative, student and working holiday visas</strong>: AFP police check, medical certificate, proof of means, admission letter and health insurance.',
            '<strong>Marriage, citizenship and residency</strong>: <a href="/traduccion-jurada-partida-nacimiento">birth</a> and <a href="/traduccion-jurada-certificado-matrimonio">marriage certificates</a> from each state\'s Births, Deaths and Marriages registry, Certificate of No Impediment, divorce orders.',
            '<strong>Property and business</strong>: powers of attorney, bank statements and <a href="/traduccion-jurada-contrato-escritura">contracts</a> for the notary.',
          ],
        },
      ],
    },
    {
      id: "home-affairs",
      title: "What does Home Affairs require of a translation done outside Australia?",
      body: [
        `The Department of Home Affairs requires English translations of all documents that are in another language. For translations done <strong>in Australia</strong>, the translator must be accredited by NAATI (National Accreditation Authority for Translators and Interpreters). For translations done <strong>outside Australia</strong>, the translator does not need NAATI accreditation, but the translation must show their full name, address, phone number and their qualifications and experience in the language they are translating from (<a href="${SRC_HA}" target="_blank" rel="noopener noreferrer">Home Affairs: evidence and translations</a> · <a href="${SRC_HA_VISITOR}" target="_blank" rel="noopener noreferrer">Home Affairs: check twice before applying for a visa</a>).`,
        "That is what I deliver: the complete English translation with a signed and dated certification that includes my full name, address, phone number, my appointment as Sworn Translator-Interpreter of English by Spain's Ministry of Foreign Affairs (no. 7310, verifiable on the official register) and my experience. Typical documents: birth and marriage certificates, criminal record certificates from the Spanish Ministry of Justice, degrees and transcripts for AHPRA and skills assessments, employer certificates and payslips, deeds.",
        {
          note: "Australian visa programmes and bodies change their requirements often. If Home Affairs, your university or AHPRA give you specific instructions about the translation, send them to me and I follow them exactly; if in doubt, check with the receiving body before ordering the translation.",
        },
      ],
    },
    {
      id: "apostille",
      title: "Where are Australian documents apostilled?",
      body: [
        `Australia and Spain are both party to the Hague Convention, so Australian public documents are legalised with an apostille. It is issued by the <strong>Department of Foreign Affairs and Trade (DFAT)</strong> through the Australian Passport Office in each state capital, by appointment, and it can be verified online (<a href="${SRC_DFAT}" target="_blank" rel="noopener noreferrer">official source: Smartraveller, notarial services in Australia</a>).`,
        "The order matters: apostille first, translation second, because the apostille is translated too. If you send me a document without an apostille and the consulate requires one, I tell you before I start. A Spanish document for use in Australia is apostilled in Spain (Ministry of Justice, notaries or notarial colleges, depending on the type).",
      ],
    },
    {
      id: "timezone",
      title: "How do time zones and payment from Australia work?",
      body: [
        `${TIMEZONE_NOTE.en}. Australia is between 6 and 9 hours ahead of Spain depending on the state and the time of year: an order you send me in the afternoon in Sydney or Melbourne is on my desk at the start of my working day, and a standard document reaches you within 24/48 hours, often while you sleep.`,
        `The quote is fixed and in euros; you pay with your Australian card through Stripe and your bank converts the amount to Australian dollars. Delivery is a digitally signed PDF. ${INTERNATIONAL_SHIPPING.note.en}.`,
      ],
    },
  ],
  steps: [
    {
      t: "Send",
      d: "A complete scan of the document (with apostille) on WhatsApp or by email, at any hour.",
    },
    {
      t: "Quote",
      d: "Fixed price and deadline within 2 working hours in Spain; payment with your Australian card.",
    },
    {
      t: "Translation",
      d: "Sworn into Spanish, or into English with my details and qualifications, depending on the body.",
    },
    {
      t: "Delivery",
      d: "Signed PDF in 24/48 hours and, if you need it, paper by courier to Spain or to Australia.",
    },
  ],
  faq: [
    {
      q: "Does Home Affairs accept a translation done in Spain without a NAATI translator?",
      a: "According to Home Affairs, translations done outside Australia do not need a NAATI translator, but they must include the translator's full name, address, phone number and qualifications and experience. My certification carries all of those details. If in doubt, confirm with the body asking for the document.",
    },
    {
      q: "Do I need to apostille my AFP National Police Check for Spain?",
      a: "Yes. To submit it in Spain it needs the DFAT apostille, requested at the Australian Passport Office by appointment. Apostille first, then translation.",
    },
    {
      q: "Can I pay in Australian dollars?",
      a: "Payment is charged in euros to your international card through Stripe; your bank converts the amount to Australian dollars automatically. You do not need a Spanish bank account.",
    },
    {
      q: "How long does it take with the time difference?",
      a: "A standard document takes 24/48 hours from confirmation of the quote. As Australia is several hours ahead, you would typically send it in the afternoon and have it the next morning, Australian time.",
    },
    {
      q: "Is your sworn translation valid at the Spanish embassy in Canberra?",
      a: "Yes. A sworn translation signed by a translator appointed by Spain's Ministry of Foreign Affairs is valid at the embassy, at the consulates in Sydney and Melbourne and before any Spanish body.",
    },
  ],
  cta: {
    title: "Message me from Australia",
    text: "Send me the scanned document and tell me whether it is for Spain or for an Australian body. I reply during Spanish office hours with a fixed price and deadline; you pay with your usual card.",
  },
  related: [
    { href: "/en/sworn-translation-spain-by-country", label: "All countries" },
    { href: "/en/sworn-translation-spain-digital-nomad-visa", label: "Digital nomad visa" },
    { href: "/traduccion-jurada-certificado-penales", label: "Criminal record certificate (guide in Spanish)" },
    { href: "/traduccion-jurada-titulo-universitario", label: "University degree (guide in Spanish)" },
    { href: "/traduccion-jurada-certificado-matrimonio", label: "Marriage certificate (guide in Spanish)" },
  ],
  otherLangLabel: "Traducción jurada entre Australia y España",
};
