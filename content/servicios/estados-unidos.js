// content/servicios/estados-unidos.js
//
// Página de audiencia: personas de Estados Unidos que se instalan en España
// (nómada digital, no lucrativa, estudios, nacionalidad, matrimonio, compra
// de vivienda) y españoles con trámites en EEUU. Fuente:
// docs/BRIEF-INTERNACIONAL-2026-09.md, punto 2.3.
import { TIMEZONE_NOTE, INTERNATIONAL_SHIPPING } from "../site";

const PATH_ES = "/traduccion-jurada-estados-unidos";
const PATH_EN = "/en/sworn-translation-usa-spain";

export const es = {
  id: "usa",
  locale: "es",
  path: PATH_ES,
  alternates: { es: PATH_ES, en: PATH_EN },
  crumb: "Clientes de Estados Unidos",
  metaTitle: "Traducción jurada para clientes de Estados Unidos",
  metaDescription:
    "Traductora jurada del MAEC (nº 7310) para estadounidenses que se instalan en España y para españoles con trámites en EEUU: apostilla, certificate of coverage, huso horario, pago con tarjeta estadounidense y entrega en PDF en 24/48 h.",
  h1: "Traducción jurada entre Estados Unidos y España",
  lead:
    "Si vives en Estados Unidos y vas a pedir un visado para España (nómada digital, no lucrativo, estudios), casarte, comprar una vivienda o solicitar la nacionalidad, tus documentos estadounidenses necesitan apostilla y traducción jurada al español firmada por un traductor nombrado por el Ministerio de Asuntos Exteriores de España. Y si eres español con un trámite en Estados Unidos, tus documentos necesitan una traducción certificada al inglés para USCIS. Soy Elena Peñaranda Ortega, traductora jurada nº 7310, y hago las dos cosas 100 % online: presupuesto en menos de 2 horas, pago con tarjeta estadounidense y PDF firmado en 24/48 h.",
  image: {
    src: "/fotos/pasaporte-eeuu.jpg",
    alt: "Pasaporte de Estados Unidos y tarjetas de embarque sobre un portátil",
  },
  whatsapp:
    "https://wa.me/34685891214?text=Hola%20Jurada%20Express,%20escribo%20desde%20Estados%20Unidos%20y%20necesito%20traducci%C3%B3n%20jurada%20para%20un%20tr%C3%A1mite%20en%20Espa%C3%B1a",
  whatsappLabel: "Escribir desde Estados Unidos",
  serviceName: "Traducción jurada para clientes de Estados Unidos",
  serviceType: "Traducción jurada inglés-español y certificada español-inglés",
  price: null,
  areaServed: [{ "@type": "Country", name: "US" }, { "@type": "Country", name: "ES" }],
  sections: [
    {
      id: "sentidos",
      title: "¿En qué sentido necesitas la traducción?",
      body: [
        {
          table: {
            caption: "Dos sentidos de traducción entre Estados Unidos y España",
            head: ["Tu situación", "Qué necesitas", "Quién lo pide"],
            rows: [
              [
                "Te instalas en España con documentos de EEUU",
                "Traducción jurada inglés → español (firma y sello del MAEC)",
                "Consulado de España, extranjería, registro civil, notaría, universidad",
              ],
              [
                "Eres español con un trámite en EEUU",
                'Traducción certificada español → inglés (<a href="/traduccion-certificada-uscis">certified translation para USCIS</a>)',
                "USCIS, tribunales, universidades y empleadores de EEUU",
              ],
            ],
          },
        },
        'Hago las dos, con los mismos criterios y en el mismo proceso digital. Si presentas el mismo documento en los dos países, te preparo las dos versiones a la vez.',
      ],
    },
    {
      id: "tramites",
      title: "¿Para qué trámites en España te van a pedir traducción jurada?",
      body: [
        {
          list: [
            '<strong>Visado de nómada digital</strong>: antecedentes penales del FBI o del estado, contrato o carta del empleador, certificado de la empresa, título, justificantes de ingresos y certificate of coverage. Tiene <a href="/traduccion-jurada-visado-nomada-digital">su propia guía con la lista completa</a>.',
            '<strong>Visado no lucrativo y de estudios</strong>: antecedentes penales, certificado médico, justificantes de medios económicos, carta de admisión y seguro médico.',
            '<strong>Matrimonio en España</strong>: <a href="/traduccion-jurada-partida-nacimiento">certificado de nacimiento</a>, certificado de soltería o de no impedimento y, si lo hay, sentencia de divorcio.',
            '<strong>Nacionalidad española</strong> (por residencia o por origen): certificados de nacimiento y matrimonio de EEUU y antecedentes penales del FBI.',
            '<strong>Compra de vivienda</strong>: poderes notariales otorgados en EEUU, extractos bancarios y <a href="/traduccion-jurada-contrato-escritura">contratos</a> para la notaría.',
            '<strong>Universidad y homologación</strong>: <a href="/traduccion-jurada-titulo-universitario">títulos</a>, transcripts y diplomas de high school.',
          ],
        },
      ],
    },
    {
      id: "apostilla",
      title: "¿Dónde se apostillan los documentos de Estados Unidos?",
      body: [
        "Estados Unidos y España son parte del Convenio de La Haya, así que los documentos públicos estadounidenses se legalizan con apostilla, no en el consulado. Quién la emite depende del documento:",
        {
          list: [
            "<strong>Documentos estatales</strong> (certificados de nacimiento, matrimonio y defunción, antecedentes del estado, títulos notarizados, poderes ante notario): la apostilla la pone el <strong>Secretary of State</strong> del estado que emitió el documento o donde actuó el notario.",
            "<strong>Documentos federales</strong> (antecedentes penales del FBI, certificate of coverage de la SSA, documentos de tribunales federales): la apostilla la pone el <strong>U.S. Department of State</strong>, Office of Authentications, en Washington.",
          ],
        },
        "El orden importa: primero la apostilla, después la traducción, porque la apostilla también se traduce. Si me envías el documento sin apostillar, te aviso antes de empezar.",
      ],
    },
    {
      id: "coverage",
      title: "¿Qué es el certificate of coverage de la SSA y por qué lo piden?",
      body: [
        "Si vas a teletrabajar desde España para tu empresa estadounidense, el consulado suele pedir un <strong>certificate of coverage</strong> emitido por la Social Security Administration (SSA) al amparo del acuerdo de Seguridad Social entre Estados Unidos y España. Acredita que sigues cotizando en EEUU y que no tienes que darte de alta en la Seguridad Social española. Es un documento federal (apostilla del U.S. Department of State) y se traduce completo, con sus sellos.",
        "Si eres autónomo o tu empresa no lo tramita, la alternativa es el compromiso de alta en la Seguridad Social española; te conviene confirmarlo con el consulado o con un abogado de extranjería antes de reunir el expediente.",
      ],
    },
    {
      id: "horario",
      title: "¿Cómo funciona el huso horario y el pago desde Estados Unidos?",
      body: [
        `${TIMEZONE_NOTE.es}: son 6 horas más que en la costa este y 9 más que en la costa oeste. En la práctica, un encargo que me envías por la noche en Estados Unidos está en marcha a primera hora de la mañana en España, y los documentos habituales te llegan en 24/48 h, a menudo antes de que empiece tu jornada.`,
        `El presupuesto es cerrado y en euros; pagas con tu tarjeta estadounidense a través de Stripe y tu banco aplica el cambio a dólares. La entrega es un PDF firmado digitalmente, válido para la presentación telemática. ${INTERNATIONAL_SHIPPING.note.es}.`,
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
      d: "Precio cerrado y plazo en menos de 2 horas laborables de España; pago con tarjeta de EEUU.",
    },
    {
      t: "Traducción",
      d: "Jurada al español o certificada al inglés, según el organismo; firmo y sello personalmente.",
    },
    {
      t: "Entrega",
      d: "PDF firmado en 24/48 h y, si lo necesitas, papel por mensajería a España o a Estados Unidos.",
    },
  ],
  faq: [
    {
      q: "¿Vale mi traducción jurada española en cualquier consulado de España en EEUU?",
      a: "Sí. La traducción jurada firmada por un traductor nombrado por el Ministerio de Asuntos Exteriores de España es válida en todos los consulados de España (Nueva York, Miami, Los Ángeles, Houston, Chicago, Washington, Boston, San Francisco) y ante cualquier organismo español.",
    },
    {
      q: "¿Necesito apostillar el certificado de antecedentes del FBI?",
      a: "Sí, para presentarlo en España necesita la apostilla del U.S. Department of State. Los certificados de antecedentes estatales se apostillan en el Secretary of State de ese estado.",
    },
    {
      q: "¿Puedo pagar en dólares?",
      a: "El cobro se hace en euros con tarjeta internacional a través de Stripe; tu banco convierte el importe a dólares automáticamente. No necesitas cuenta en España.",
    },
    {
      q: "¿Trabajas con abogados de inmigración y gestorías?",
      a: "Sí. Preparo lotes completos para despachos de inmigración y relocation, con un único plazo por escrito y factura a nombre del despacho.",
    },
    {
      q: "¿Cuánto tarda un documento habitual?",
      a: "Certificados, contratos breves y cartas: 24/48 h desde la confirmación del presupuesto. Expedientes completos: un plazo único cerrado por escrito antes de empezar.",
    },
  ],
  cta: {
    title: "Escríbeme desde Estados Unidos",
    text: "Mándame el documento escaneado y dime para qué consulado u organismo es. Te respondo en horario de España con precio cerrado y plazo; el pago es con tu tarjeta habitual.",
  },
  related: [
    { href: "/traduccion-jurada-visado-nomada-digital", label: "Visado de nómada digital" },
    { href: "/traduccion-certificada-uscis", label: "Traducción certificada para USCIS" },
    { href: "/traduccion-jurada-certificado-penales", label: "Antecedentes penales" },
    { href: "/traduccion-jurada-partida-nacimiento", label: "Certificado de nacimiento" },
    { href: "/traduccion-jurada-urgente-grandes-volumenes", label: "Proyectos urgentes y grandes volúmenes" },
  ],
  otherLangLabel: "Sworn translator in Spain for Americans",
};

export const en = {
  id: "usa",
  locale: "en",
  path: PATH_EN,
  alternates: { es: PATH_ES, en: PATH_EN },
  crumb: "Clients in the United States",
  metaTitle: "Sworn translator in Spain for Americans",
  metaDescription:
    "Sworn translator appointed by Spain's Ministry of Foreign Affairs (no. 7310) for US citizens moving to Spain and Spaniards with US paperwork: apostilles, SSA certificate of coverage, time zones, US card payments and signed PDF in 24/48 hours.",
  h1: "Sworn translation between the United States and Spain",
  lead:
    "If you live in the United States and are applying for a Spanish visa (digital nomad, non-lucrative, student), getting married in Spain, buying a property or applying for Spanish citizenship, your American documents need an apostille and a sworn translation into Spanish signed by a translator appointed by Spain's Ministry of Foreign Affairs. If you are Spanish with paperwork in the United States, your documents need a certified English translation for USCIS. I am Elena Peñaranda Ortega, sworn translator no. 7310, and I do both fully online: a quote within 2 hours, payment with your US card and a signed PDF in 24/48 hours.",
  image: {
    src: "/fotos/pasaporte-eeuu.jpg",
    alt: "United States passport and boarding passes on a laptop",
  },
  whatsapp:
    "https://wa.me/34685891214?text=Hi%20Jurada%20Express,%20I%27m%20writing%20from%20the%20United%20States%20and%20need%20a%20sworn%20translation%20for%20a%20procedure%20in%20Spain",
  whatsappLabel: "Message me from the US",
  serviceName: "Sworn translation for clients in the United States",
  serviceType: "Sworn English-Spanish translation and certified Spanish-English translation",
  price: null,
  areaServed: [{ "@type": "Country", name: "US" }, { "@type": "Country", name: "ES" }],
  sections: [
    {
      id: "direction",
      title: "Which direction do you need?",
      body: [
        {
          table: {
            caption: "Two directions of translation between the United States and Spain",
            head: ["Your situation", "What you need", "Who asks for it"],
            rows: [
              [
                "You are moving to Spain with US documents",
                "Sworn translation English → Spanish (Ministry stamp and signature)",
                "Spanish consulate, immigration office, civil registry, notary, university",
              ],
              [
                "You are Spanish with a procedure in the US",
                'Certified translation Spanish → English (<a href="/en/certified-translation-uscis">certified translation for USCIS</a>)',
                "USCIS, courts, universities and employers in the US",
              ],
            ],
          },
        },
        "I provide both, with the same criteria and the same digital process. If you are submitting the same document in both countries, I prepare both versions at once.",
      ],
    },
    {
      id: "procedures",
      title: "Which Spanish procedures require a sworn translation?",
      body: [
        {
          list: [
            '<strong>Digital nomad visa</strong>: FBI or state criminal record, employment contract or employer letter, company certificate, degree, proof of income and SSA certificate of coverage. It has <a href="/en/sworn-translation-spain-digital-nomad-visa">its own guide with the full list</a>.',
            '<strong>Non-lucrative and student visas</strong>: criminal record, medical certificate, proof of financial means, admission letter and health insurance.',
            '<strong>Getting married in Spain</strong>: <a href="/traduccion-jurada-partida-nacimiento">birth certificate</a>, single status or no-impediment certificate and, where applicable, divorce decree.',
            '<strong>Spanish citizenship</strong> (by residence or by descent): US birth and marriage certificates and FBI criminal record.',
            '<strong>Buying a property</strong>: powers of attorney granted in the US, bank statements and <a href="/traduccion-jurada-contrato-escritura">contracts</a> for the notary.',
            '<strong>University and recognition of qualifications</strong>: <a href="/traduccion-jurada-titulo-universitario">degrees</a>, transcripts and high school diplomas.',
          ],
        },
      ],
    },
    {
      id: "apostille",
      title: "Where are US documents apostilled?",
      body: [
        "The United States and Spain are both party to the Hague Convention, so US public documents are legalised with an apostille, not at the consulate. Who issues it depends on the document:",
        {
          list: [
            "<strong>State documents</strong> (birth, marriage and death certificates, state criminal records, notarised degrees, notarised powers of attorney): the apostille is issued by the <strong>Secretary of State</strong> of the state that issued the document or where the notary acted.",
            "<strong>Federal documents</strong> (FBI criminal record, SSA certificate of coverage, federal court documents): the apostille is issued by the <strong>U.S. Department of State</strong>, Office of Authentications, in Washington.",
          ],
        },
        "The order matters: apostille first, translation second, because the apostille is translated too. If you send me a document without an apostille, I will tell you before I start.",
      ],
    },
    {
      id: "coverage",
      title: "What is the SSA certificate of coverage, and why is it requested?",
      body: [
        "If you will be working remotely from Spain for your US employer, the consulate usually asks for a <strong>certificate of coverage</strong> issued by the Social Security Administration (SSA) under the US-Spain social security agreement. It proves that you remain covered in the US and do not need to register with Spanish social security. It is a federal document (apostille from the U.S. Department of State) and it is translated in full, stamps included.",
        "If you are self-employed or your employer does not apply for it, the alternative is a commitment to register with Spanish social security; confirm this with the consulate or an immigration lawyer before you assemble the file.",
      ],
    },
    {
      id: "timezone",
      title: "How do time zones and payment from the US work?",
      body: [
        `${TIMEZONE_NOTE.en}: that is 6 hours ahead of the East Coast and 9 hours ahead of the West Coast. In practice, an order you send me in the evening in the US is under way first thing in the morning in Spain, and standard documents reach you within 24/48 hours, often before your working day starts.`,
        `The quote is fixed and in euros; you pay with your US card through Stripe and your bank converts the amount to dollars. Delivery is a digitally signed PDF, valid for online submission. ${INTERNATIONAL_SHIPPING.note.en}.`,
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
      d: "Fixed price and deadline within 2 working hours in Spain; payment with your US card.",
    },
    {
      t: "Translation",
      d: "Sworn into Spanish or certified into English, depending on the receiving body; I sign and stamp personally.",
    },
    {
      t: "Delivery",
      d: "Signed PDF in 24/48 hours and, if you need it, paper by courier to Spain or to the United States.",
    },
  ],
  faq: [
    {
      q: "Is a Spanish sworn translation valid at every Spanish consulate in the US?",
      a: "Yes. A sworn translation signed by a translator appointed by Spain's Ministry of Foreign Affairs is valid at every Spanish consulate (New York, Miami, Los Angeles, Houston, Chicago, Washington, Boston, San Francisco) and before any Spanish body.",
    },
    {
      q: "Do I need to apostille my FBI background check?",
      a: "Yes. To submit it in Spain it needs an apostille from the U.S. Department of State. State-level criminal records are apostilled by the Secretary of State of that state.",
    },
    {
      q: "Can I pay in dollars?",
      a: "Payment is charged in euros to your international card through Stripe; your bank converts the amount to dollars automatically. You do not need a Spanish bank account.",
    },
    {
      q: "Do you work with immigration attorneys and relocation agencies?",
      a: "Yes. I prepare complete batches for immigration and relocation firms, with a single deadline in writing and an invoice in the firm's name.",
    },
    {
      q: "How long does a standard document take?",
      a: "Certificates, short contracts and letters: 24/48 hours from confirmation of the quote. Complete files: a single deadline confirmed in writing before I start.",
    },
  ],
  cta: {
    title: "Message me from the United States",
    text: "Send me the scanned document and tell me which consulate or body it is for. I reply during Spanish office hours with a fixed price and deadline; you pay with your usual card.",
  },
  related: [
    { href: "/en/sworn-translation-spain-digital-nomad-visa", label: "Digital nomad visa" },
    { href: "/en/certified-translation-uscis", label: "Certified translation for USCIS" },
    { href: "/traduccion-jurada-certificado-penales", label: "Criminal record certificate (guide in Spanish)" },
    { href: "/en/urgent-sworn-translation-large-projects", label: "Urgent and large projects" },
    { href: "/en/how-it-works", label: "How it works" },
  ],
  otherLangLabel: "Traducción jurada para clientes de Estados Unidos",
};
