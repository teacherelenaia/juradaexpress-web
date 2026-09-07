// content/servicios/irlanda.js
//
// Página de país: Irlanda ⇄ España (FASE 2B.2). Irlanda no tiene sistema de
// traductores jurados: Immigration Service Delivery pide "full and certified
// translation" con la confirmación de exactitud y los datos de contacto del
// traductor (fuente enlazada en la página). La apostilla irlandesa la emite
// el Department of Foreign Affairs. Irlanda y España son Estados de la UE:
// para muchos documentos públicos rige el Reglamento (UE) 2016/1191 y no
// hace falta apostilla; siempre se remite al organismo de destino.
import { TIMEZONE_NOTE, INTERNATIONAL_SHIPPING } from "../site";

const PATH_ES = "/traduccion-jurada-irlanda";
const PATH_EN = "/en/sworn-translation-ireland-spain";

const SRC_ISD =
  "https://www.irishimmigration.ie/how-to-make-a-certified-translation-of-a-document/";
const SRC_DFA = "https://authentications.dfa.ie/";

export const es = {
  id: "irlanda",
  locale: "es",
  path: PATH_ES,
  alternates: { es: PATH_ES, en: PATH_EN },
  crumb: "Clientes de Irlanda",
  metaTitle: "Traducción jurada para clientes de Irlanda",
  metaDescription:
    "Traductora jurada nº 7310 para irlandeses en España y españoles con trámites en Irlanda: certificada para Irish Immigration, apostilla DFA, PDF 24/48 h.",
  h1: "Traducción jurada entre Irlanda y España",
  lead:
    "Si vives en Irlanda y vas a instalarte en España (estudios, nómada digital, nacionalidad, matrimonio, compra de vivienda), tus documentos irlandeses necesitan traducción jurada al español firmada por un traductor nombrado por el Ministerio de Asuntos Exteriores de España. Y si eres español con un trámite en Irlanda, Irish Immigration, las universidades o el HSE aceptan una traducción certificada al inglés con la declaración firmada del traductor. Soy Elena Peñaranda Ortega, traductora jurada nº 7310, y hago las dos 100 % online: presupuesto en menos de 2 horas, pago con tarjeta y PDF firmado en 24/48 h.",
  image: {
    src: "/fotos/irlanda-despacho.jpg",
    alt: "Traductora firmando un documento con pluma en su despacho",
  },
  whatsapp:
    "https://wa.me/34685891214?text=Hola%20Elena%2C%20escribo%20desde%20Irlanda%3A%20necesito%20traducci%C3%B3n%20jurada%20o%20certificada%20de%20mis%20documentos%20%28dime%20para%20qu%C3%A9%20tr%C3%A1mite%29",
  whatsappLabel: "Escribir desde Irlanda",
  serviceName: "Traducción jurada para clientes de Irlanda",
  serviceType: "Traducción jurada inglés-español y certificada español-inglés",
  price: null,
  areaServed: [{ "@type": "Country", name: "IE" }, { "@type": "Country", name: "ES" }],
  sections: [
    {
      id: "sentidos",
      title: "¿En qué sentido necesitas la traducción?",
      body: [
        {
          table: {
            caption: "Dos sentidos de traducción entre Irlanda y España",
            head: ["Tu situación", "Qué necesitas", "Quién lo pide"],
            rows: [
              [
                "Te instalas en España con documentos irlandeses",
                "Traducción jurada inglés → español (firma y sello del MAEC)",
                "Consulado de España en Dublín, extranjería, registro civil, notaría, universidad",
              ],
              [
                "Eres español con un trámite en Irlanda",
                "Traducción certificada español → inglés con declaración firmada del traductor",
                "Immigration Service Delivery, universidades, HSE, empleadores, Revenue",
              ],
            ],
          },
        },
        "Hago las dos con el mismo proceso digital. Si presentas el mismo documento en los dos países, te preparo las dos versiones a la vez, con los mismos nombres, fechas y términos.",
      ],
    },
    {
      id: "irlanda-espana",
      title: "¿Qué documentos irlandeses se traducen para España?",
      body: [
        {
          list: [
            '<strong>Visado de nómada digital</strong>: contrato o carta del empleador, certificado de la empresa (Companies Registration Office), <a href="/traduccion-jurada-titulo-universitario">título</a>, justificantes de ingresos y certificado A1 (Department of Social Protection). Tiene <a href="/traduccion-jurada-visado-nomada-digital">su propia guía</a>.',
            '<strong>Estudios y homologación</strong>: títulos, transcripts y cartas de universidades irlandesas.',
            '<strong>Nacionalidad, matrimonio y residencia</strong>: <a href="/traduccion-jurada-partida-nacimiento">certificado de nacimiento</a> del General Register Office, <a href="/traduccion-jurada-certificado-matrimonio">certificado de matrimonio</a>, certificado de soltería (Certificate of Freedom to Marry) y <a href="/traduccion-jurada-certificado-penales">Police Certificate</a> de An Garda Síochána.',
            '<strong>Compra de vivienda y empresa</strong>: poderes, extractos bancarios, cartas de empleador, P60 y statements de Revenue, <a href="/traduccion-jurada-contrato-escritura">contratos</a>.',
          ],
        },
      ],
    },
    {
      id: "espana-irlanda",
      title: "¿Qué piden en Irlanda a un documento español?",
      body: [
        `Irlanda no tiene un sistema de traductores jurados como el español. Lo que exige Immigration Service Delivery (el servicio de inmigración irlandés) es una <strong>traducción completa y certificada</strong> al inglés o al irlandés, en la que el traductor confirma que la traducción es fiel al original e indica sus datos de contacto (<a href="${SRC_ISD}" target="_blank" rel="noopener noreferrer">fuente oficial: irishimmigration.ie</a>). Universidades, colegios profesionales, el HSE y los empleadores aplican el mismo criterio.`,
        "Eso es exactamente lo que entrego: la traducción íntegra al inglés, con una declaración firmada y fechada de exactitud y competencia, mis datos de contacto y mi sello de traductora jurada nº 7310, que cualquier organismo puede comprobar en el listado oficial del Ministerio de Asuntos Exteriores de España. Documentos habituales: certificados de nacimiento y matrimonio, antecedentes penales del Ministerio de Justicia, títulos y expedientes, vida laboral, certificados de empresa y nóminas, escrituras.",
        {
          note: "Cada organismo irlandés puede tener requisitos propios de formato (copia certificada del original, documento por documento). Si te lo indican por escrito, envíamelo y lo cumplo tal cual; ante la duda, consulta con el organismo de destino antes de encargar la traducción.",
        },
      ],
    },
    {
      id: "apostilla",
      title: "¿Necesitas apostilla entre Irlanda y España?",
      body: [
        "Irlanda y España son Estados miembros de la Unión Europea. Para muchos documentos públicos (nacimiento, matrimonio, defunción, antecedentes penales, residencia) el Reglamento (UE) 2016/1191 elimina la apostilla entre países de la UE, y a menudo el organismo emisor puede añadir un formulario multilingüe. Aun así, hay administraciones y notarías que la siguen pidiendo, sobre todo para documentos notariales o privados: confírmalo con el organismo de destino antes de reunir el expediente.",
        `Cuando la piden, la apostilla de un documento irlandés la emite el <strong>Department of Foreign Affairs</strong> a través de su servicio de autenticaciones (<a href="${SRC_DFA}" target="_blank" rel="noopener noreferrer">authentications.dfa.ie</a>). La de un documento español se tramita en España (Ministerio de Justicia o Colegios Notariales, según el tipo). Primero la apostilla, después la traducción: la apostilla también se traduce.`,
      ],
    },
    {
      id: "horario",
      title: "¿Cómo funciona el envío y el pago desde Irlanda?",
      body: [
        `${TIMEZONE_NOTE.es}, una hora más que en Irlanda. Me envías el escaneo completo de cada documento por WhatsApp o email, te doy precio cerrado en euros en menos de 2 horas laborables y pagas con tarjeta a través de Stripe, sin cambio de divisa. Recibes un PDF firmado digitalmente, válido para presentación telemática. ${INTERNATIONAL_SHIPPING.note.es}.`,
      ],
    },
  ],
  steps: [
    {
      t: "Envío",
      d: "Escaneo completo del documento por WhatsApp o email, con la apostilla si la tiene.",
    },
    {
      t: "Presupuesto",
      d: "Precio cerrado en euros y plazo en menos de 2 horas laborables; pago con tarjeta.",
    },
    {
      t: "Traducción",
      d: "Jurada al español o certificada al inglés según el organismo; firmo y sello personalmente.",
    },
    {
      t: "Entrega",
      d: "PDF firmado en 24/48 h y, si lo necesitas, papel por mensajería a España o a Irlanda.",
    },
  ],
  faq: [
    {
      q: "¿Acepta Immigration Service Delivery una traducción hecha en España?",
      a: "Lo que pide es una traducción completa y certificada con la confirmación de exactitud y los datos de contacto del traductor, y eso es lo que entrego. El lugar donde se hace no es un requisito; ante la duda, confírmalo con el organismo que te pide el documento.",
    },
    {
      q: "¿Necesito apostillar mi certificado de nacimiento irlandés para España?",
      a: "Entre países de la UE el Reglamento 2016/1191 suele eximir de apostilla a los certificados del registro civil, pero algunas oficinas la siguen pidiendo. Pregunta a la oficina española que tramita tu expediente; si la exigen, la emite el Department of Foreign Affairs.",
    },
    {
      q: "¿Traduces documentos en irlandés (gaélico)?",
      a: "No. Traduzco del inglés al español y del español al inglés. Los documentos oficiales irlandeses se emiten en inglés o en versión bilingüe, y con esos trabajo directamente.",
    },
    {
      q: "¿Puedo pagar con una tarjeta irlandesa?",
      a: "Sí. El pago es con tarjeta a través de Stripe, en euros, así que no hay cambio de divisa. No necesitas cuenta bancaria en España.",
    },
    {
      q: "¿Cuánto tarda un documento habitual?",
      a: "Certificados, cartas y contratos breves: 24/48 h desde la confirmación del presupuesto. Expedientes completos: un plazo único cerrado por escrito antes de empezar.",
    },
  ],
  cta: {
    title: "Escríbeme desde Irlanda",
    text: "Mándame el documento escaneado y dime para qué organismo es. Te respondo con precio cerrado y plazo; el pago es en euros con tu tarjeta habitual.",
  },
  related: [
    { href: "/traduccion-jurada-por-paises", label: "Todos los países" },
    { href: "/traduccion-jurada-visado-nomada-digital", label: "Visado de nómada digital" },
    { href: "/traduccion-jurada-partida-nacimiento", label: "Certificado de nacimiento" },
    { href: "/traduccion-jurada-certificado-penales", label: "Antecedentes penales" },
    { href: "/traduccion-jurada-titulo-universitario", label: "Título universitario" },
  ],
  otherLangLabel: "Sworn translation between Ireland and Spain",
};

export const en = {
  id: "irlanda",
  locale: "en",
  path: PATH_EN,
  alternates: { es: PATH_ES, en: PATH_EN },
  crumb: "Clients in Ireland",
  metaTitle: "Sworn translation between Ireland and Spain",
  metaDescription:
    "Sworn translator no. 7310 for Irish residents moving to Spain and Spaniards with paperwork in Ireland: Irish Immigration, DFA apostille, PDF in 24/48h.",
  h1: "Sworn translation between Ireland and Spain",
  lead:
    "If you live in Ireland and are moving to Spain (studies, digital nomad visa, citizenship, marriage, buying a property), your Irish documents need a sworn translation into Spanish signed by a translator appointed by Spain's Ministry of Foreign Affairs. If you are Spanish with paperwork in Ireland, Irish Immigration, universities and the HSE accept a certified English translation with the translator's signed declaration. I am Elena Peñaranda Ortega, sworn translator no. 7310, and I do both fully online: a quote within 2 hours, card payment and a signed PDF in 24/48 hours.",
  image: {
    src: "/fotos/irlanda-despacho.jpg",
    alt: "Translator signing a document with a pen at her desk",
  },
  whatsapp:
    "https://wa.me/34685891214?text=Hi%20Elena%2C%20I%27m%20writing%20from%20Ireland%3A%20I%20need%20a%20sworn%20or%20certified%20translation%20of%20my%20documents%20%28tell%20me%20which%20procedure%29",
  whatsappLabel: "Message me from Ireland",
  serviceName: "Sworn translation for clients in Ireland",
  serviceType: "Sworn English-Spanish translation and certified Spanish-English translation",
  price: null,
  areaServed: [{ "@type": "Country", name: "IE" }, { "@type": "Country", name: "ES" }],
  sections: [
    {
      id: "direction",
      title: "Which direction do you need?",
      body: [
        {
          table: {
            caption: "Two directions of translation between Ireland and Spain",
            head: ["Your situation", "What you need", "Who asks for it"],
            rows: [
              [
                "You are moving to Spain with Irish documents",
                "Sworn translation English → Spanish (Ministry stamp and signature)",
                "Spanish consulate in Dublin, immigration office, civil registry, notary, university",
              ],
              [
                "You are Spanish with a procedure in Ireland",
                "Certified translation Spanish → English with the translator's signed declaration",
                "Immigration Service Delivery, universities, the HSE, employers, Revenue",
              ],
            ],
          },
        },
        "I provide both through the same digital process. If you are submitting the same document in both countries, I prepare both versions at once, with the same names, dates and terms.",
      ],
    },
    {
      id: "ireland-spain",
      title: "Which Irish documents are translated for Spain?",
      body: [
        {
          list: [
            '<strong>Digital nomad visa</strong>: employment contract or employer letter, company certificate (Companies Registration Office), <a href="/traduccion-jurada-titulo-universitario">degree</a>, proof of income and A1 certificate (Department of Social Protection). It has <a href="/en/sworn-translation-spain-digital-nomad-visa">its own guide</a>.',
            '<strong>Studies and recognition of qualifications</strong>: degrees, transcripts and letters from Irish universities.',
            '<strong>Citizenship, marriage and residency</strong>: <a href="/traduccion-jurada-partida-nacimiento">birth certificate</a> from the General Register Office, <a href="/traduccion-jurada-certificado-matrimonio">marriage certificate</a>, Certificate of Freedom to Marry and <a href="/traduccion-jurada-certificado-penales">Police Certificate</a> from An Garda Síochána.',
            '<strong>Property and business</strong>: powers of attorney, bank statements, employer letters, P60s and Revenue statements, <a href="/traduccion-jurada-contrato-escritura">contracts</a>.',
          ],
        },
      ],
    },
    {
      id: "spain-ireland",
      title: "What does Ireland require of a Spanish document?",
      body: [
        `Ireland has no system of sworn translators like Spain's. What Immigration Service Delivery requires is a <strong>full and certified translation</strong> into English or Irish, in which the translator confirms that the translation is accurate and gives their contact details (<a href="${SRC_ISD}" target="_blank" rel="noopener noreferrer">official source: irishimmigration.ie</a>). Universities, professional bodies, the HSE and employers apply the same criterion.`,
        "That is exactly what I deliver: the complete English translation with a signed and dated declaration of accuracy and competence, my contact details and my stamp as sworn translator no. 7310, which any body can check on the official register of Spain's Ministry of Foreign Affairs. Typical documents: birth and marriage certificates, criminal record certificates from the Spanish Ministry of Justice, degrees and transcripts, employment history, employer certificates and payslips, deeds.",
        {
          note: "Each Irish body may have its own formatting requirements (certified copy of the original, one document at a time). If they give you written instructions, send them to me and I follow them exactly; if in doubt, check with the receiving body before ordering the translation.",
        },
      ],
    },
    {
      id: "apostille",
      title: "Do you need an apostille between Ireland and Spain?",
      body: [
        "Ireland and Spain are both EU Member States. For many public documents (birth, marriage, death, criminal record, residence) Regulation (EU) 2016/1191 removes the apostille between EU countries, and the issuing body can often attach a multilingual standard form. Even so, some offices and notaries still ask for it, especially for notarial or private documents: confirm with the receiving body before you assemble your file.",
        `When it is required, the apostille on an Irish document is issued by the <strong>Department of Foreign Affairs</strong> through its authentication service (<a href="${SRC_DFA}" target="_blank" rel="noopener noreferrer">authentications.dfa.ie</a>). The apostille on a Spanish document is obtained in Spain (Ministry of Justice or notarial colleges, depending on the type). Apostille first, translation second: the apostille is translated too.`,
      ],
    },
    {
      id: "timezone",
      title: "How do sending and payment work from Ireland?",
      body: [
        `${TIMEZONE_NOTE.en}, one hour ahead of Ireland. You send me a complete scan of each document on WhatsApp or by email, I give you a fixed price in euros within 2 working hours and you pay by card through Stripe, with no currency conversion. You receive a digitally signed PDF, valid for online submission. ${INTERNATIONAL_SHIPPING.note.en}.`,
      ],
    },
  ],
  steps: [
    {
      t: "Send",
      d: "A complete scan of the document on WhatsApp or by email, apostille included if it has one.",
    },
    {
      t: "Quote",
      d: "Fixed price in euros and deadline within 2 working hours; card payment.",
    },
    {
      t: "Translation",
      d: "Sworn into Spanish or certified into English, depending on the receiving body; I sign and stamp personally.",
    },
    {
      t: "Delivery",
      d: "Signed PDF in 24/48 hours and, if you need it, paper by courier to Spain or to Ireland.",
    },
  ],
  faq: [
    {
      q: "Does Immigration Service Delivery accept a translation made in Spain?",
      a: "It requires a full and certified translation with the translator's confirmation of accuracy and contact details, and that is what I deliver. Where it is made is not a requirement; if in doubt, confirm with the body asking for the document.",
    },
    {
      q: "Do I need to apostille my Irish birth certificate for Spain?",
      a: "Between EU countries Regulation 2016/1191 usually exempts civil registry certificates from the apostille, but some offices still ask for it. Ask the Spanish office handling your file; if they require it, it is issued by the Department of Foreign Affairs.",
    },
    {
      q: "Do you translate documents in Irish (Gaelic)?",
      a: "No. I translate from English into Spanish and from Spanish into English. Official Irish documents are issued in English or in a bilingual version, and I work with those directly.",
    },
    {
      q: "Can I pay with an Irish card?",
      a: "Yes. Payment is by card through Stripe, in euros, so there is no currency conversion. You do not need a Spanish bank account.",
    },
    {
      q: "How long does a standard document take?",
      a: "Certificates, letters and short contracts: 24/48 hours from confirmation of the quote. Complete files: a single deadline confirmed in writing before I start.",
    },
  ],
  cta: {
    title: "Message me from Ireland",
    text: "Send me the scanned document and tell me which body it is for. I reply with a fixed price and deadline; payment is in euros with your usual card.",
  },
  related: [
    { href: "/en/sworn-translation-spain-by-country", label: "All countries" },
    { href: "/en/sworn-translation-spain-digital-nomad-visa", label: "Digital nomad visa" },
    { href: "/traduccion-jurada-partida-nacimiento", label: "Birth certificate (guide in Spanish)" },
    { href: "/traduccion-jurada-certificado-penales", label: "Criminal record certificate (guide in Spanish)" },
    { href: "/traduccion-jurada-titulo-universitario", label: "University degree (guide in Spanish)" },
  ],
  otherLangLabel: "Traducción jurada entre Irlanda y España",
};
