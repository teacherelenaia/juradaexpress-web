// content/servicios/canada.js
//
// Página de país: Canadá ⇄ España (FASE 2B.2). Regla de IRCC (Help Centre,
// fuentes enlazadas en la página): los documentos que no estén en inglés o
// francés se presentan con traducción y, si el traductor no es un
// "certified translator" (miembro en activo de una asociación profesional
// de traductores), con un affidavit del traductor sobre su competencia y la
// exactitud de la traducción, más copia certificada del original. Ni
// familiares ni representantes pueden traducir. Esta regla se ha
// contrastado a través de los resultados de búsqueda de las páginas
// oficiales de ircc.canada.ca (las páginas no eran accesibles directamente
// desde el entorno de trabajo): ver docs/CHANGELOG-2026-09.md, FASE 2B.
// Apostilla: Canadá forma parte del Convenio de La Haya desde el 11 de
// enero de 2024 (Global Affairs Canada y autoridades provinciales).
import { TIMEZONE_NOTE, INTERNATIONAL_SHIPPING } from "../site";

const PATH_ES = "/traduccion-jurada-canada";
const PATH_EN = "/en/sworn-translation-canada-spain";

const SRC_IRCC_LANG =
  "https://ircc.canada.ca/english/helpcentre/answer.asp?qnum=018&top=4";
const SRC_IRCC_AFFIDAVIT =
  "https://ircc.canada.ca/english/helpcentre/answer.asp?qnum=040&top=4";
const SRC_GAC =
  "https://www.international.gc.ca/gac-amc/about-a_propos/services/authentication-authentification/index.aspx?lang=eng";

export const es = {
  id: "canada",
  locale: "es",
  path: PATH_ES,
  alternates: { es: PATH_ES, en: PATH_EN },
  crumb: "Clientes de Canadá",
  metaTitle: "Traducción jurada para clientes de Canadá",
  metaDescription:
    "Traductora jurada nº 7310 para canadienses en España y españoles con trámites en Canadá: qué pide IRCC (certificación o affidavit), apostilla, PDF 24/48 h.",
  h1: "Traducción jurada entre Canadá y España",
  lead:
    "Si vives en Canadá y vas a pedir un visado para España (nómada digital, no lucrativo, estudios), casarte, comprar una vivienda o solicitar la nacionalidad, tus documentos canadienses necesitan apostilla y traducción jurada al español firmada por un traductor nombrado por el Ministerio de Asuntos Exteriores de España. Y si eres español con un trámite en Canadá, IRCC exige que la traducción al inglés o al francés la haga un traductor certificado o que vaya acompañada de un affidavit del traductor. Soy Elena Peñaranda Ortega, traductora jurada nº 7310, y te explico con honestidad qué entrego y cuándo necesitas algo más: presupuesto en menos de 2 horas, pago con tarjeta canadiense y PDF firmado en 24/48 h.",
  image: {
    src: "/fotos/canada-firma.jpg",
    alt: "Persona con traje y reloj firmando un documento sobre la mesa de un despacho",
  },
  whatsapp:
    "https://wa.me/34685891214?text=Hola%20Elena%2C%20escribo%20desde%20Canad%C3%A1%3A%20necesito%20traducci%C3%B3n%20de%20mis%20documentos%20para%20un%20tr%C3%A1mite%20en%20Espa%C3%B1a%20o%20ante%20IRCC%20%28dime%20cu%C3%A1l%29",
  whatsappLabel: "Escribir desde Canadá",
  serviceName: "Traducción jurada para clientes de Canadá",
  serviceType: "Traducción jurada inglés-español y certificada español-inglés",
  price: null,
  areaServed: [{ "@type": "Country", name: "CA" }, { "@type": "Country", name: "ES" }],
  sections: [
    {
      id: "sentidos",
      title: "¿En qué sentido necesitas la traducción?",
      body: [
        {
          table: {
            caption: "Dos sentidos de traducción entre Canadá y España",
            head: ["Tu situación", "Qué necesitas", "Quién lo pide"],
            rows: [
              [
                "Te instalas en España con documentos canadienses",
                "Traducción jurada inglés → español (firma y sello del MAEC)",
                "Consulados de España en Ottawa, Toronto y Montreal, extranjería, registro civil, notaría, universidad",
              ],
              [
                "Eres español con un trámite en Canadá",
                "Traducción español → inglés con certificación del traductor y, si IRCC lo exige, affidavit",
                "IRCC (inmigración y ciudadanía), universidades, colegios profesionales, empleadores",
              ],
            ],
          },
        },
        "Documentos de Quebec redactados en francés: no los traduzco (trabajo solo entre inglés y español). Si tu documento canadiense está en francés, necesitas un traductor jurado de francés en España.",
      ],
    },
    {
      id: "canada-espana",
      title: "¿Qué documentos canadienses se traducen para España?",
      body: [
        {
          list: [
            '<strong>Visado de nómada digital</strong>: <a href="/traduccion-jurada-certificado-penales">certificado de antecedentes penales</a> de la RCMP (certified criminal record check), contrato o carta del empleador, certificado de la empresa (federal o provincial), <a href="/traduccion-jurada-titulo-universitario">título</a>, justificantes de ingresos (T4, Notice of Assessment) y certificate of coverage del acuerdo de Seguridad Social entre Canadá y España. Tiene <a href="/traduccion-jurada-visado-nomada-digital">su propia guía</a>.',
            '<strong>Visado no lucrativo y de estudios</strong>: antecedentes de la RCMP, certificado médico, justificantes de medios, carta de admisión y seguro médico.',
            '<strong>Matrimonio, nacionalidad y residencia</strong>: <a href="/traduccion-jurada-partida-nacimiento">certificados de nacimiento</a> y <a href="/traduccion-jurada-certificado-matrimonio">matrimonio</a> del registro provincial (Service Ontario, Vital Statistics de cada provincia), sentencias de divorcio.',
            '<strong>Compra de vivienda y empresa</strong>: poderes notariales, extractos bancarios y <a href="/traduccion-jurada-contrato-escritura">contratos</a> para la notaría.',
          ],
        },
      ],
    },
    {
      id: "ircc",
      title: "¿Qué exige IRCC a una traducción, y qué entrego yo?",
      body: [
        `Según el Centro de ayuda de IRCC, todo documento que no esté en inglés o en francés se presenta con su traducción y, si la traducción <strong>no la ha hecho un traductor certificado</strong> (miembro en activo de una asociación profesional de traductores), con un <strong>affidavit</strong> en el que el traductor jura que domina los dos idiomas y que la traducción es exacta, además de una copia certificada del documento original. Ni familiares ni representantes del solicitante pueden traducir (<a href="${SRC_IRCC_LANG}" target="_blank" rel="noopener noreferrer">IRCC: idioma de los documentos</a> · <a href="${SRC_IRCC_AFFIDAVIT}" target="_blank" rel="noopener noreferrer">IRCC: qué es un affidavit de traducción</a>).`,
        "Lo que yo entrego es una <strong>traducción jurada del MAEC más una certificación firmada</strong>: la traducción íntegra al inglés, mi declaración de exactitud y competencia con nombre, fecha y datos de contacto, y mi sello de traductora jurada nº 7310, comprobable en el listado oficial del Ministerio de Asuntos Exteriores de España. Mi nombramiento es un nombramiento oficial del Estado español, no la afiliación a una asociación de traductores, así que <strong>no puedo garantizar que tu oficina de IRCC lo equipare a un certified translator canadiense</strong>.",
        {
          // [[COMPLETAR: si Elena ofrece el affidavit notarial y su coste; si lo
          // ofrece, sustituir "vemos cómo obtenerlo" por el precio y el plazo]]
          note: "Si tu oficina de IRCC exige el affidavit, dímelo en el primer mensaje: vemos cómo obtenerlo (una declaración jurada del traductor ante notario en España) y su coste antes de empezar. Ante la duda, consulta con IRCC o con tu asesor de inmigración qué formato aceptan en tu programa concreto.",
        },
      ],
    },
    {
      id: "apostilla",
      title: "¿Dónde se apostillan los documentos de Canadá?",
      body: [
        `Canadá forma parte del Convenio de La Haya desde el <strong>11 de enero de 2024</strong>: desde entonces los documentos públicos canadienses se legalizan con apostilla, no con la antigua cadena de autenticación y legalización consular. La emiten <strong>Global Affairs Canada</strong> para los documentos federales y los de la mayoría de provincias y territorios, y las propias autoridades provinciales en Alberta, Columbia Británica, Ontario, Quebec y Saskatchewan para los documentos emitidos o notarizados allí (<a href="${SRC_GAC}" target="_blank" rel="noopener noreferrer">fuente oficial: Global Affairs Canada</a>).`,
        "El orden importa: primero la apostilla, después la traducción, porque la apostilla también se traduce. Si me envías un documento sin apostillar y el consulado la exige, te aviso antes de empezar. Un documento español para usarlo en Canadá se apostilla en España (Ministerio de Justicia, notarios o Colegios Notariales, según el tipo).",
      ],
    },
    {
      id: "horario",
      title: "¿Cómo funciona el huso horario y el pago desde Canadá?",
      body: [
        `${TIMEZONE_NOTE.es}: son 6 horas más que en Toronto y Montreal y 9 más que en Vancouver. Un encargo que me envías por la tarde en Canadá está en marcha a primera hora de la mañana en España y, si es un documento habitual, te llega en 24/48 h.`,
        `El presupuesto es cerrado y en euros; pagas con tu tarjeta canadiense a través de Stripe y tu banco aplica el cambio a dólares canadienses. La entrega es un PDF firmado digitalmente. ${INTERNATIONAL_SHIPPING.note.es}.`,
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
      d: "Precio cerrado y plazo en menos de 2 horas laborables de España; pago con tarjeta canadiense.",
    },
    {
      t: "Traducción",
      d: "Jurada al español o certificada al inglés, según el organismo; te aviso si IRCC pide affidavit.",
    },
    {
      t: "Entrega",
      d: "PDF firmado en 24/48 h y, si lo necesitas, papel por mensajería a España o a Canadá.",
    },
  ],
  faq: [
    {
      q: "¿Vale tu traducción jurada española en los consulados de España en Canadá?",
      a: "Sí. La traducción jurada firmada por un traductor nombrado por el Ministerio de Asuntos Exteriores de España es válida en los consulados de Ottawa, Toronto y Montreal y ante cualquier organismo español.",
    },
    {
      q: "¿Acepta IRCC tu traducción sin affidavit?",
      a: "IRCC acepta sin affidavit las traducciones de traductores certificados (miembros de una asociación profesional de traductores). Mi nombramiento es oficial del Estado español, no una afiliación, así que no puedo garantizar la equivalencia: si tu oficina exige affidavit, lo tramitamos antes de empezar. Consulta el formato aceptado con IRCC.",
    },
    {
      q: "¿Necesito apostillar el certificado de antecedentes de la RCMP?",
      a: "Para presentarlo en España, sí: desde enero de 2024 la apostilla de los documentos federales la emite Global Affairs Canada. Los certificados provinciales se apostillan en la provincia o en Global Affairs Canada, según cuál sea.",
    },
    {
      q: "¿Puedo pagar en dólares canadienses?",
      a: "El cobro se hace en euros con tarjeta internacional a través de Stripe; tu banco convierte el importe a dólares canadienses automáticamente. No necesitas cuenta en España.",
    },
    {
      q: "¿Traduces documentos de Quebec en francés?",
      a: "No. Solo traduzco entre inglés y español. Si tu documento está en francés, necesitas un traductor jurado de francés; si está en versión bilingüe inglés-francés, trabajo con la parte en inglés.",
    },
  ],
  cta: {
    title: "Escríbeme desde Canadá",
    text: "Mándame el documento escaneado y dime si es para España o para IRCC. Te respondo en horario de España con precio cerrado, plazo y, si hace falta affidavit, cómo obtenerlo.",
  },
  related: [
    { href: "/traduccion-jurada-por-paises", label: "Todos los países" },
    { href: "/traduccion-jurada-visado-nomada-digital", label: "Visado de nómada digital" },
    { href: "/traduccion-jurada-certificado-penales", label: "Antecedentes penales" },
    { href: "/traduccion-jurada-partida-nacimiento", label: "Certificado de nacimiento" },
    { href: "/traduccion-jurada-titulo-universitario", label: "Título universitario" },
  ],
  otherLangLabel: "Sworn translation between Canada and Spain",
};

export const en = {
  id: "canada",
  locale: "en",
  path: PATH_EN,
  alternates: { es: PATH_ES, en: PATH_EN },
  crumb: "Clients in Canada",
  metaTitle: "Sworn translation between Canada and Spain",
  metaDescription:
    "Sworn translator no. 7310 for Canadians moving to Spain and Spaniards with IRCC paperwork: certification or affidavit, apostille, PDF in 24/48h.",
  h1: "Sworn translation between Canada and Spain",
  lead:
    "If you live in Canada and are applying for a Spanish visa (digital nomad, non-lucrative, student), getting married in Spain, buying a property or applying for Spanish citizenship, your Canadian documents need an apostille and a sworn translation into Spanish signed by a translator appointed by Spain's Ministry of Foreign Affairs. If you are Spanish with paperwork in Canada, IRCC requires the English or French translation to be done by a certified translator or to be accompanied by the translator's affidavit. I am Elena Peñaranda Ortega, sworn translator no. 7310, and I explain honestly what I deliver and when you need something more: a quote within 2 hours, payment with your Canadian card and a signed PDF in 24/48 hours.",
  image: {
    src: "/fotos/canada-firma.jpg",
    alt: "Person in a suit with a watch signing a document at an office desk",
  },
  whatsapp:
    "https://wa.me/34685891214?text=Hi%20Elena%2C%20I%27m%20writing%20from%20Canada%3A%20I%20need%20my%20documents%20translated%20for%20a%20procedure%20in%20Spain%20or%20for%20IRCC%20%28tell%20me%20which%29",
  whatsappLabel: "Message me from Canada",
  serviceName: "Sworn translation for clients in Canada",
  serviceType: "Sworn English-Spanish translation and certified Spanish-English translation",
  price: null,
  areaServed: [{ "@type": "Country", name: "CA" }, { "@type": "Country", name: "ES" }],
  sections: [
    {
      id: "direction",
      title: "Which direction do you need?",
      body: [
        {
          table: {
            caption: "Two directions of translation between Canada and Spain",
            head: ["Your situation", "What you need", "Who asks for it"],
            rows: [
              [
                "You are moving to Spain with Canadian documents",
                "Sworn translation English → Spanish (Ministry stamp and signature)",
                "Spanish consulates in Ottawa, Toronto and Montreal, immigration office, civil registry, notary, university",
              ],
              [
                "You are Spanish with a procedure in Canada",
                "Spanish → English translation with the translator's certification and, if IRCC requires it, an affidavit",
                "IRCC (immigration and citizenship), universities, professional bodies, employers",
              ],
            ],
          },
        },
        "Quebec documents written in French: I do not translate them (I work only between English and Spanish). If your Canadian document is in French, you need a sworn translator of French in Spain.",
      ],
    },
    {
      id: "canada-spain",
      title: "Which Canadian documents are translated for Spain?",
      body: [
        {
          list: [
            '<strong>Digital nomad visa</strong>: RCMP <a href="/traduccion-jurada-certificado-penales">certified criminal record check</a>, employment contract or employer letter, company certificate (federal or provincial), <a href="/traduccion-jurada-titulo-universitario">degree</a>, proof of income (T4, Notice of Assessment) and certificate of coverage under the Canada-Spain social security agreement. It has <a href="/en/sworn-translation-spain-digital-nomad-visa">its own guide</a>.',
            '<strong>Non-lucrative and student visas</strong>: RCMP record check, medical certificate, proof of means, admission letter and health insurance.',
            '<strong>Marriage, citizenship and residency</strong>: <a href="/traduccion-jurada-partida-nacimiento">birth</a> and <a href="/traduccion-jurada-certificado-matrimonio">marriage certificates</a> from the provincial registry (Service Ontario, each province\'s Vital Statistics), divorce orders.',
            '<strong>Property and business</strong>: powers of attorney, bank statements and <a href="/traduccion-jurada-contrato-escritura">contracts</a> for the notary.',
          ],
        },
      ],
    },
    {
      id: "ircc",
      title: "What does IRCC require of a translation, and what do I deliver?",
      body: [
        `According to the IRCC Help Centre, any document that is not in English or French must be submitted with its translation and, if the translation <strong>was not done by a certified translator</strong> (a member in good standing of a professional translators' association), with an <strong>affidavit</strong> in which the translator swears to their proficiency in both languages and the accuracy of the translation, plus a certified copy of the original document. Neither family members nor the applicant's representatives may translate (<a href="${SRC_IRCC_LANG}" target="_blank" rel="noopener noreferrer">IRCC: language of documents</a> · <a href="${SRC_IRCC_AFFIDAVIT}" target="_blank" rel="noopener noreferrer">IRCC: what is an affidavit for a translation</a>).`,
        "What I deliver is a <strong>Spanish Ministry sworn translation plus a signed certification</strong>: the complete English translation, my declaration of accuracy and competence with name, date and contact details, and my stamp as sworn translator no. 7310, verifiable on the official register of Spain's Ministry of Foreign Affairs. My appointment is an official appointment by the Spanish State, not membership of a translators' association, so <strong>I cannot guarantee that your IRCC office will treat it as equivalent to a Canadian certified translator</strong>.",
        {
          note: "If your IRCC office requires the affidavit, tell me in your first message: we look at how to obtain it (a sworn statement by the translator before a notary in Spain) and its cost before I start. If in doubt, check with IRCC or your immigration adviser which format is accepted for your specific programme.",
        },
      ],
    },
    {
      id: "apostille",
      title: "Where are Canadian documents apostilled?",
      body: [
        `Canada has been party to the Hague Apostille Convention since <strong>11 January 2024</strong>: since then Canadian public documents are legalised with an apostille rather than the old chain of authentication and consular legalisation. Apostilles are issued by <strong>Global Affairs Canada</strong> for federal documents and for most provinces and territories, and by the provincial authorities themselves in Alberta, British Columbia, Ontario, Quebec and Saskatchewan for documents issued or notarised there (<a href="${SRC_GAC}" target="_blank" rel="noopener noreferrer">official source: Global Affairs Canada</a>).`,
        "The order matters: apostille first, translation second, because the apostille is translated too. If you send me a document without an apostille and the consulate requires one, I tell you before I start. A Spanish document for use in Canada is apostilled in Spain (Ministry of Justice, notaries or notarial colleges, depending on the type).",
      ],
    },
    {
      id: "timezone",
      title: "How do time zones and payment from Canada work?",
      body: [
        `${TIMEZONE_NOTE.en}: that is 6 hours ahead of Toronto and Montreal and 9 hours ahead of Vancouver. An order you send me in the afternoon in Canada is under way first thing in the morning in Spain and, for a standard document, reaches you within 24/48 hours.`,
        `The quote is fixed and in euros; you pay with your Canadian card through Stripe and your bank converts the amount to Canadian dollars. Delivery is a digitally signed PDF. ${INTERNATIONAL_SHIPPING.note.en}.`,
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
      d: "Fixed price and deadline within 2 working hours in Spain; payment with your Canadian card.",
    },
    {
      t: "Translation",
      d: "Sworn into Spanish or certified into English, depending on the body; I tell you if IRCC requires an affidavit.",
    },
    {
      t: "Delivery",
      d: "Signed PDF in 24/48 hours and, if you need it, paper by courier to Spain or to Canada.",
    },
  ],
  faq: [
    {
      q: "Is your Spanish sworn translation valid at the Spanish consulates in Canada?",
      a: "Yes. A sworn translation signed by a translator appointed by Spain's Ministry of Foreign Affairs is valid at the consulates in Ottawa, Toronto and Montreal and before any Spanish body.",
    },
    {
      q: "Does IRCC accept your translation without an affidavit?",
      a: "IRCC accepts translations by certified translators (members of a professional translators' association) without an affidavit. My appointment is an official appointment by the Spanish State, not a membership, so I cannot guarantee equivalence: if your office requires an affidavit, we arrange it before I start. Check the accepted format with IRCC.",
    },
    {
      q: "Do I need to apostille my RCMP criminal record check?",
      a: "To submit it in Spain, yes: since January 2024 apostilles on federal documents are issued by Global Affairs Canada. Provincial certificates are apostilled by the province or by Global Affairs Canada, depending on which one.",
    },
    {
      q: "Can I pay in Canadian dollars?",
      a: "Payment is charged in euros to your international card through Stripe; your bank converts the amount to Canadian dollars automatically. You do not need a Spanish bank account.",
    },
    {
      q: "Do you translate Quebec documents in French?",
      a: "No. I translate only between English and Spanish. If your document is in French, you need a sworn translator of French; if it is a bilingual English-French version, I work with the English part.",
    },
  ],
  cta: {
    title: "Message me from Canada",
    text: "Send me the scanned document and tell me whether it is for Spain or for IRCC. I reply during Spanish office hours with a fixed price, a deadline and, if an affidavit is needed, how to obtain it.",
  },
  related: [
    { href: "/en/sworn-translation-spain-by-country", label: "All countries" },
    { href: "/en/sworn-translation-spain-digital-nomad-visa", label: "Digital nomad visa" },
    { href: "/traduccion-jurada-certificado-penales", label: "Criminal record certificate (guide in Spanish)" },
    { href: "/traduccion-jurada-partida-nacimiento", label: "Birth certificate (guide in Spanish)" },
    { href: "/traduccion-jurada-titulo-universitario", label: "University degree (guide in Spanish)" },
  ],
  otherLangLabel: "Traducción jurada entre Canadá y España",
};
