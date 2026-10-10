// content/guias/no-lucrativo-documentos.js
//
// Guía 3 (10/10/2026): documentos del visado de residencia no lucrativa
// de España, con tabla documento a documento: quién lo emite, apostilla,
// traducción jurada, páginas habituales (para que el lector calcule el
// coste de la traducción) y notas. Misma estructura que la guía del
// visado de nómada digital.
//
// REGLA: cada dato sale de una fuente oficial consultada el 10/10/2026:
// las páginas «Visado de residencia no lucrativa» de los consulados de
// España en Londres, Nueva York, Washington y Los Ángeles
// (exteriores.gob.es), que comparten el mismo texto base («Todos los
// documentos extranjeros deben presentarse legalizados o apostillados, y
// en caso de estar confeccionados en idioma distinto al español,
// acompañados de la correspondiente traducción»), y el Real Decreto-ley
// 3/2004 (BOE), que define el IPREM. La cuantía de medios económicos se
// expresa como «400 % del IPREM» sin cifra en euros: el IPREM lo fija
// cada año la Ley de Presupuestos y no se ha encontrado la cifra de 2026
// en una página oficial. Las páginas habituales de cada documento salen
// de las landings del FBI y del ACRO y de los packs de content/packs.js.
import { PACKS } from "../packs";
import { SAME_DAY_MAX_PAGES, PRICE_PER_PAGE } from "../site";
import { guideById } from "./routes";

const ROUTE = guideById("no-lucrativo-documentos");
const PATH_ES = ROUTE.es;
const PATH_EN = ROUTE.en;

const PACK = PACKS.find((p) => p.id === "visa");
const PACK_FAMILY = PACKS.find((p) => p.id === "visa-family");

const CONSUL = (slug, scco, scd) =>
  `https://www.exteriores.gob.es/Consulados/${slug}/es/ServiciosConsulares/Paginas/index.aspx?scco=${scco}&scd=${scd}&scca=Visados&scs=Visados+Nacionales+-+Visado+de+residencia+no+lucrativa`;

// Fuentes oficiales (consultadas el 10/10/2026).
const SRC = {
  londres: CONSUL("londres", "Reino+Unido", 179),
  nuevayork: CONSUL("nuevayork", "Estados+Unidos", 215),
  washington: CONSUL("washington", "Estados+Unidos", 288),
  losangeles: CONSUL("losangeles", "Estados+Unidos", 180),
  iprem: "https://www.boe.es/buscar/act.php?id=BOE-A-2004-12010",
  maecLegalizacion:
    "https://www.exteriores.gob.es/es/ServiciosAlCiudadano/Paginas/Legalizacion-y-apostilla.aspx",
};

const ext = (href, label) =>
  `<a href="${href}" target="_blank" rel="noopener noreferrer">${label}</a>`;
const wa = (text) => `https://wa.me/34685891214?text=${encodeURIComponent(text)}`;

const IMAGE = {
  src: "/fotos/expediente-documentos.jpg",
  alt: {
    es: "Expediente de visado con documentos ordenados sobre una mesa",
    en: "Visa file with documents laid out on a table",
  },
};

// ---------------------------------------------------------------------------
// Español
// ---------------------------------------------------------------------------

const REGLA_ES =
  "Sí, según la regla general de los cuatro consulados: «todos los documentos extranjeros deben presentarse legalizados o apostillados».";
const TRAD_ES =
  "Sí, si no está en español: «acompañados de la correspondiente traducción» (Nueva York precisa «traducción oficial al español»).";

export const es = {
  id: "no-lucrativo-documentos",
  locale: "es",
  path: PATH_ES,
  alternates: { es: PATH_ES, en: PATH_EN },
  crumb: "Documentos del visado no lucrativo",
  datePublished: ROUTE.datePublished,
  dateModified: ROUTE.lastModified,
  metaTitle: "Documentos para el visado no lucrativo de España: apostilla, traducción jurada y páginas",
  metaDescription:
    "Lista de documentos del visado no lucrativo, documento a documento: quién lo emite, apostilla, traducción jurada y cuántas páginas suele tener cada uno.",
  h1: "Qué documentos necesito para el visado no lucrativo de España, y cuáles llevan apostilla y traducción jurada",
  image: { src: IMAGE.src, alt: IMAGE.alt.es },
  lead: [
    "Necesitas el formulario de visado nacional y el impreso EX-01 de autorización de residencia, una foto, el pasaporte, la prueba de medios económicos (el 400 % del IPREM para ti y el 100 % más por cada familiar a tu cargo, durante el primer año), un seguro de enfermedad con una aseguradora autorizada en España, el certificado de antecedentes penales de los países donde has vivido los últimos cinco años (el del FBI si vives en Estados Unidos, el ACRO si vives en el Reino Unido), un certificado médico conforme al Reglamento Sanitario Internacional de 2005, la prueba de que resides en la demarcación del consulado y el justificante de la tasa. Si vienen familiares, sus certificados de matrimonio, pareja o nacimiento.",
    "La regla de los consulados de Londres, Nueva York, Washington y Los Ángeles es la misma y está escrita en su página: todos los documentos extranjeros se presentan legalizados o apostillados y, si no están en español, con su traducción; Nueva York concreta que debe ser una traducción oficial. Eso afecta al certificado de antecedentes, al certificado médico, a los certificados del registro civil y a los documentos económicos que no estén en español. La tabla sale de esas cuatro páginas oficiales, consultadas el 10 de octubre de 2026 y enlazadas al final, y añade cuántas páginas suele tener cada documento para que calcules el coste de la traducción.",
  ],
  table: {
    id: "tabla",
    title: "Documentos del visado no lucrativo, uno a uno",
    intro:
      "Diez filas, las de la lista oficial. La columna de páginas es orientativa, a partir de los documentos que traduzco cada semana: sirve para calcular el precio de la traducción, que es por documento o por página.",
    caption:
      "Documentos del visado de residencia no lucrativa de España: quién los emite, apostilla, traducción jurada, páginas habituales y notas",
    head: [
      "Documento",
      "Quién lo emite",
      "¿Apostilla?",
      "¿Traducción jurada?",
      "¿Cuántas páginas suele tener?",
      "Notas",
    ],
    rows: [
      [
        "Pasaporte",
        "Tu país",
        "No",
        "No: se presenta el original y una copia de la página biométrica",
        "1 (la página de datos)",
        "Validez mínima de 1 año, dos páginas en blanco y expedido hace menos de 10 años.",
      ],
      [
        "Formulario de solicitud de visado nacional e impreso EX-01 de autorización de residencia",
        "Tú: los dos modelos oficiales, uno por solicitante",
        "No",
        "No: están en español",
        "2 formularios",
        "Cada solicitante firma los dos; por los menores firma un progenitor o tutor. La autorización de residencia inicial se tramita a la vez que el visado.",
      ],
      [
        "Fotografía",
        "Tú",
        "No",
        "No",
        "1",
        "Reciente, tamaño carné, a color, fondo claro, de frente, sin gafas oscuras.",
      ],
      [
        "Prueba de medios económicos: extractos o certificados bancarios, pensiones, rentas de alquiler, inversiones",
        "Tu banco, la administración que paga la pensión, tus inquilinos o gestores",
        "La regla general dice «todos los documentos extranjeros». Un extracto bancario no es documento público: pregunta a tu consulado si lo quiere apostillado o notarizado.",
        TRAD_ES,
        "Varias páginas por mes de extracto; una carta de pensión, 1 o 2. Se traducen por página, y se puede traducir solo lo necesario",
        "Mínimo: 400 % del IPREM para el titular más 100 % del IPREM por cada familiar a cargo, para el primer año, o una fuente periódica de ingresos. Nueva York pide, para cuentas en el extranjero, el nombre y domicilio del banco, la identificación de la cuenta, la fecha de apertura, el saldo a 31 de diciembre del año anterior y el saldo medio del último año.",
      ],
      [
        "Seguro de enfermedad",
        "Aseguradora autorizada a operar en España",
        "No",
        "Solo si el certificado no está en español",
        "1 o 2 (el certificado de la aseguradora)",
        "Público o privado, con cobertura de todos los riesgos del sistema público de salud en España. Original y copia del certificado.",
      ],
      [
        `Certificado de antecedentes penales de los países donde has vivido los últimos 5 años: <a href="/traduccion-jurada-antecedentes-fbi">certificado del FBI</a> en Estados Unidos, <a href="/traduccion-jurada-acro-reino-unido">certificado ACRO</a> en el Reino Unido`,
        "FBI (Estados Unidos), ACRO (Reino Unido), policía o ministerio de justicia en otros países",
        `${REGLA_ES} Nueva York lo repite para este documento y solo acepta el del FBI, no los de policía local o estatal.`,
        `${TRAD_ES} En Nueva York: «traducción oficial al español».`,
        "FBI: de 1 a 3. ACRO: hasta 2. La apostilla, 1 página más si tu consulado la quiere traducida",
        "Solo mayores de edad penal. Original y copia.",
      ],
      [
        "Certificado médico",
        "Tu médico",
        REGLA_ES,
        TRAD_ES,
        "1",
        "Debe acreditar que no padeces enfermedades con repercusiones graves para la salud pública según el Reglamento Sanitario Internacional de 2005. Original y copia.",
      ],
      [
        "Prueba de residencia en la demarcación consular",
        "Tu estado o tu país: carné de conducir, identificación, visado o Green Card",
        "No lo indican",
        "No lo indican",
        "1",
        "Original y copia. Nueva York: carné de conducir o identificación no provisional y, si no eres estadounidense, Green Card o visado de Estados Unidos (no B-1/B-2).",
      ],
      [
        `Familiares: <a href="/traduccion-jurada-certificado-matrimonio">certificado de matrimonio</a> o de pareja registrada y <a href="/traduccion-jurada-partida-nacimiento">certificados de nacimiento</a>`,
        "Registro civil del país",
        REGLA_ES,
        TRAD_ES,
        "1 o 2 cada uno, más la apostilla",
        "Cada familiar presenta además su propio formulario, EX-01, foto, pasaporte, seguro, penales (mayores de edad penal), certificado médico, prueba de residencia y tasa. Pareja no registrada: cualquier documento que pruebe la relación.",
      ],
      [
        "Justificante de la tasa",
        "Tú",
        "No",
        "No",
        "1 o 2",
        "Tasa de la autorización de residencia: modelo 790 código 052, epígrafe 2.1, dos ejemplares firmados o pago por internet con justificante. Más la tasa de visado del consulado (Nueva York publica su tabla de tasas).",
      ],
    ],
    after:
      "El consulado puede pedir documentos o datos adicionales y convocarte a una entrevista. Con los packs de visado el precio es cerrado por lote; los extractos y pólizas largos van por página.",
  },
  sections: [
    {
      id: "como-funciona",
      title: "Cómo funciona el visado no lucrativo: visado y autorización a la vez",
      body: [
        "Es el visado para residir en España sin trabajar ni ejercer una actividad profesional, con medios de subsistencia garantizados; no autoriza a trabajar. Se pide en el consulado de España de la demarcación donde resides legalmente, en persona (por representante solo de forma excepcional y justificada), y la solicitud de visado lleva dentro la solicitud de la autorización de residencia inicial: se tramitan a la vez.",
        "El plazo legal para decidir sobre el visado es de un mes desde el día siguiente a la recepción de la resolución favorable sobre la autorización de residencia. El visado vale 365 días y, una vez en España, tienes un mes desde la entrada para pedir la tarjeta de identidad de extranjero en la Oficina de Extranjeros o la comisaría. Pueden venir contigo el cónyuge, la pareja registrada o estable, los hijos menores o que no hayan formado su propia familia y los hijos mayores con una discapacidad que requiera apoyo.",
        "Cada consulado tiene su forma de dar cita: Londres en el centro de BLS, Nueva York por correo electrónico con los datos de cada solicitante; Washington atiende a los residentes de Virginia, Virginia Occidental, Carolina del Norte, Maryland y el Distrito de Columbia, y Los Ángeles al sur de California, Arizona, Colorado y Utah.",
      ],
    },
    {
      id: "medios",
      title: "Cuánto dinero hay que acreditar: el 400 % del IPREM",
      body: [
        `Los cuatro consulados piden medios suficientes para el año inicial de residencia, o una fuente periódica de ingresos, por una cantidad mínima equivalente al <strong>400 % del IPREM</strong> para el titular, más el <strong>100 % del IPREM</strong> por cada familiar a cargo. El IPREM es el Indicador Público de Renta de Efectos Múltiples, creado por el ${ext(SRC.iprem, "Real Decreto-ley 3/2004")}; su cuantía la fija cada año la Ley de Presupuestos Generales del Estado, así que comprueba la cifra vigente en la fecha de tu solicitud en lugar de fiarte de una cantidad en euros publicada en una web.`,
        "Vale cualquier documento que pruebe los medios: extractos y certificados bancarios, cartas de pensión, rentas, inversiones. Nueva York detalla lo que debe constar en la información de cuentas en el extranjero: nombre y domicilio del banco, identificación de la cuenta, fecha de apertura, saldo a 31 de diciembre del año anterior y saldo medio del último año. Los extractos son los documentos más largos del expediente: se traducen por página y puedes traducir solo las páginas necesarias.",
      ],
    },
    {
      id: "orden",
      title: "El orden lógico: pedir los certificados, apostillar, traducir",
      body: [
        {
          list: [
            "<strong>Primero los certificados con fecha.</strong> El de antecedentes penales cubre los países donde has vivido los últimos cinco años; el certificado médico tiene que referirse al Reglamento Sanitario Internacional de 2005. Pídelos con tiempo, pero no tan pronto que caduquen antes de la cita: la página del consulado no fija una antigüedad máxima, así que pregúntalo al pedir cita.",
            "<strong>Después la apostilla, sobre el original.</strong> En Estados Unidos, la federal del Departamento de Estado para el certificado del FBI; en el Reino Unido, la Legalisation Office para el ACRO y los certificados del registro civil. Si el país no está en el Convenio de La Haya, legalización.",
            "<strong>Por último la traducción, con la apostilla incluida.</strong> La traducción reproduce el documento completo, apostilla incluida, así que se hace sobre el documento ya apostillado. La hace un traductor jurado nombrado por el Ministerio de Asuntos Exteriores de España; Nueva York la llama «traducción oficial».",
            "<strong>El seguro y los formularios no se traducen</strong> si ya están en español: la aseguradora autorizada en España suele emitir el certificado en español, y los formularios de visado y EX-01 son modelos oficiales.",
          ],
        },
      ],
    },
    {
      id: "errores",
      title: "Errores que retrasan el expediente",
      body: [
        {
          list: [
            "<strong>Traducir antes de apostillar.</strong> La apostilla también se traduce; si la pones después, la traducción queda incompleta.",
            "<strong>Un certificado de policía local o estatal en lugar del FBI.</strong> Nueva York lo dice expresamente: solo acepta el del FBI.",
            "<strong>Un certificado médico sin la fórmula del Reglamento Sanitario Internacional de 2005.</strong> El consulado pide esa referencia concreta.",
            "<strong>Un seguro de una aseguradora no autorizada en España</strong> o que no cubra todos los riesgos del sistema público.",
            "<strong>Medios económicos sin detallar.</strong> Nueva York pide datos concretos de cada cuenta (banco, domicilio, identificación, apertura, saldos).",
            "<strong>Un pasaporte expedido hace más de diez años o con menos de un año de validez.</strong> Los consulados no lo admiten.",
            "<strong>Olvidar los documentos de cada familiar.</strong> Cada uno presenta su formulario, EX-01, foto, pasaporte, seguro, penales, certificado médico, prueba de residencia y tasa, además del certificado que prueba el parentesco.",
          ],
        },
      ],
    },
  ],
  faq: [
    {
      q: "¿Qué documentos del visado no lucrativo llevan apostilla?",
      a: "Según la regla general de los consulados, todos los documentos extranjeros: el certificado de antecedentes penales (FBI, ACRO u otro), el certificado médico y los certificados de matrimonio, pareja y nacimiento de los familiares. Los extractos bancarios no son documentos públicos; pregunta a tu consulado si los quiere apostillados o notarizados.",
    },
    {
      q: "¿Qué documentos llevan traducción jurada?",
      a: "Todos los documentos extranjeros que no estén en español, según la página de los cuatro consulados; Nueva York concreta «traducción oficial al español». En la práctica: el certificado de antecedentes, el certificado médico, los certificados del registro civil de los familiares y los extractos, cartas de pensión o certificados bancarios en inglés.",
    },
    {
      q: "¿Cuánto dinero tengo que acreditar?",
      a: "El 400 % del IPREM para el titular, más el 100 % del IPREM por cada familiar a cargo, para el primer año de residencia, o una fuente periódica de ingresos equivalente. El IPREM lo fija cada año la Ley de Presupuestos; comprueba la cifra vigente en la fecha de tu solicitud.",
    },
    {
      q: "¿Puedo trabajar con el visado no lucrativo?",
      a: "No. Los consulados lo dicen en la primera línea: es un visado para residir sin realizar una actividad lucrativa, laboral o profesional, y no autoriza a trabajar.",
    },
    {
      q: "¿Cuántas páginas tendré que traducir?",
      a: "Lo habitual: el certificado del FBI, de una a tres páginas; el ACRO, hasta dos; el certificado médico, una; cada certificado de matrimonio o nacimiento, una o dos; la apostilla, una página más si tu consulado la quiere traducida. Los extractos bancarios son lo más largo: varias páginas por mes, y se pueden traducir solo las necesarias.",
    },
    {
      q: "¿Cuánto tarda el consulado?",
      a: "El plazo legal para decidir sobre el visado es de un mes desde el día siguiente a la recepción de la resolución favorable sobre la autorización de residencia, que se tramita a la vez. El consulado puede pedir documentos adicionales o una entrevista.",
    },
    {
      q: "¿Qué hago al llegar a España?",
      a: "El visado vale 365 días. Tienes un mes desde la entrada para pedir la tarjeta de identidad de extranjero (TIE) en la Oficina de Extranjeros o la comisaría de policía que te corresponda.",
    },
  ],
  offer: {
    id: "traduccion-jurada",
    title: "Si necesitas traducción jurada para el expediente",
    body: [
      `Soy Elena Peñaranda Ortega, traductora jurada de inglés nombrada por el Ministerio de Asuntos Exteriores (nº 7310). Traduzco el expediente completo con un solo precio cerrado y un solo plazo por escrito, apostillas incluidas: los documentos habituales con un pack cerrado y los extractos largos a ${PRICE_PER_PAGE} € por página, IVA incluido. Cada documento llega en PDF con firma electrónica cualificada, el mismo día hasta ${SAME_DAY_MAX_PAGES} páginas.`,
    ],
    facts: [
      `${PACK.name.es}: ${PACK.price} € (${PACK.includes.es.toLowerCase().replace(/\.$/, "")})`,
      `${PACK_FAMILY.name.es}: ${PACK_FAMILY.price} € (${PACK_FAMILY.includes.es.toLowerCase().replace(/\.$/, "")})`,
      "PDF firmado en el día",
    ],
    whatsapp: wa("Hola Elena, estoy preparando el visado no lucrativo y necesito traducir mis documentos"),
    whatsappLabel: "Enviar los documentos por WhatsApp",
    landing: {
      href: "/traduccion-jurada-visados-espana",
      label: "Traducción jurada para visados de España",
    },
  },
  sources: {
    date: "2026-10-10",
    items: [
      { label: "Consulado General de España en Londres: Visado de residencia no lucrativa", href: SRC.londres },
      { label: "Consulado General de España en Nueva York: Visado de residencia no lucrativa", href: SRC.nuevayork },
      { label: "Embajada de España en Washington, sección consular: Visado de residencia no lucrativa", href: SRC.washington },
      { label: "Consulado General de España en Los Ángeles: Visado de residencia no lucrativa", href: SRC.losangeles },
      {
        label: "BOE: Real Decreto-ley 3/2004, que crea el Indicador Público de Renta de Efectos Múltiples (IPREM); la cuantía anual la fija la Ley de Presupuestos Generales del Estado",
        href: SRC.iprem,
      },
      { label: "Ministerio de Asuntos Exteriores: Legalización y apostilla", href: SRC.maecLegalizacion },
    ],
  },
  related: [
    { href: "/traduccion-jurada-visados-espana", label: "Traducción jurada para visados de España" },
    { href: "/traduccion-jurada-antecedentes-fbi", label: "Certificado del FBI" },
    { href: "/traduccion-jurada-acro-reino-unido", label: "Certificado ACRO" },
    { href: "/documentos-visado-nomada-digital-espana", label: "Guía: documentos del visado de nómada digital" },
    { href: "/blog/que-es-la-apostilla-de-la-haya", label: "Qué es la apostilla" },
  ],
  otherLangLabel: "Spain non-lucrative visa documents checklist",
};

// ---------------------------------------------------------------------------
// English
// ---------------------------------------------------------------------------

const RULE_EN =
  "Yes, under the general rule of all four consulates: \"all foreign documents must be filed legalised or apostilled\".";
const TRANS_EN =
  "Yes, if it is not in Spanish: \"accompanied by the corresponding translation\" (New York specifies an \"official translation into Spanish\").";

export const en = {
  id: "no-lucrativo-documentos",
  locale: "en",
  path: PATH_EN,
  alternates: { es: PATH_ES, en: PATH_EN },
  crumb: "Non-lucrative visa documents",
  datePublished: ROUTE.datePublished,
  dateModified: ROUTE.lastModified,
  metaTitle: "Spain non-lucrative visa documents checklist: apostille, sworn translation and pages",
  metaDescription:
    "Document-by-document checklist for Spain's non-lucrative visa: who issues it, apostille, sworn translation and how many pages each document usually has.",
  h1: "What documents I need for Spain's non-lucrative visa, and which ones need an apostille and a sworn translation",
  image: { src: IMAGE.src, alt: IMAGE.alt.en },
  lead: [
    "You need the national visa application form and the EX-01 residence authorisation form, a photo, your passport, proof of financial means (400% of the IPREM for you and a further 100% for each dependent family member, for the first year), health insurance with an insurer authorised in Spain, the criminal record certificate from the countries where you have lived in the last five years (the FBI check if you live in the United States, the ACRO certificate if you live in the UK), a medical certificate under the 2005 International Health Regulations, proof that you live in the consulate's district and the fee receipt. If family members come with you, their marriage, partnership or birth certificates.",
    "The rule of the London, New York, Washington and Los Angeles consulates is the same and is written on their page: all foreign documents are filed legalised or apostilled and, if they are not in Spanish, with their translation; New York specifies that it must be an official translation. That covers the criminal record certificate, the medical certificate, the civil registry certificates and any financial documents that are not in Spanish. The table comes from those four official pages, consulted on 10 October 2026 and linked at the end, and adds how many pages each document usually has so that you can work out the cost of the translation.",
  ],
  table: {
    id: "table",
    title: "Non-lucrative visa documents, one by one",
    intro:
      "Ten rows, those on the official list. The pages column is indicative, based on the documents I translate every week: it helps you work out the price of the translation, which is per document or per page.",
    caption:
      "Spain non-lucrative residence visa documents: issuer, apostille, sworn translation, usual number of pages and notes",
    head: ["Document", "Issued by", "Apostille?", "Sworn translation?", "How many pages?", "Notes"],
    rows: [
      [
        "Passport",
        "Your country",
        "No",
        "No: the original and a copy of the biometric page are filed",
        "1 (the data page)",
        "At least 1 year of validity, two blank pages and issued less than 10 years ago.",
      ],
      [
        "National visa application form and EX-01 residence authorisation form",
        "You: the two official forms, one per applicant",
        "No",
        "No: they are in Spanish",
        "2 forms",
        "Each applicant signs both; a parent or guardian signs for minors. The initial residence authorisation is processed together with the visa.",
      ],
      [
        "Photograph",
        "You",
        "No",
        "No",
        "1",
        "Recent, passport size, in colour, light background, facing forward, no dark glasses.",
      ],
      [
        "Proof of financial means: bank statements or certificates, pensions, rental income, investments",
        "Your bank, the body paying the pension, your tenants or managers",
        "The general rule says \"all foreign documents\". A bank statement is not a public document: ask your consulate whether it wants it apostilled or notarised.",
        TRANS_EN,
        "Several pages per month of statements; a pension letter, 1 or 2. Translated per page, and only what is needed",
        "Minimum: 400% of the IPREM for the applicant plus 100% of the IPREM for each dependent family member, for the first year, or a regular source of income. New York asks, for accounts abroad, for the bank's name and address, the account identification, the opening date, the balance at 31 December of the previous year and the average balance over the last year.",
      ],
      [
        "Health insurance",
        "Insurer authorised to operate in Spain",
        "No",
        "Only if the certificate is not in Spanish",
        "1 or 2 (the insurer's certificate)",
        "Public or private, covering all the risks covered by Spain's public health system. Original and copy of the certificate.",
      ],
      [
        `Criminal record certificate from the countries where you have lived in the last 5 years: <a href="/en/fbi-background-check-translation-spain">FBI background check</a> in the United States, <a href="/en/acro-police-certificate-translation-spain">ACRO certificate</a> in the UK`,
        "FBI (United States), ACRO (UK), police or ministry of justice in other countries",
        `${RULE_EN} New York repeats it for this document and accepts the FBI's only, not local or state police checks.`,
        `${TRANS_EN} In New York: \"official translation into Spanish\".`,
        "FBI: 1 to 3. ACRO: up to 2. The apostille, 1 more page if your consulate wants it translated",
        "Adults of criminal age only. Original and copy.",
      ],
      [
        "Medical certificate",
        "Your doctor",
        RULE_EN,
        TRANS_EN,
        "1",
        "It must certify that you do not suffer from any disease that could have serious public health repercussions under the 2005 International Health Regulations. Original and copy.",
      ],
      [
        "Proof of residence in the consular district",
        "Your state or country: driving licence, ID, visa or Green Card",
        "Not stated",
        "Not stated",
        "1",
        "Original and copy. New York: a non-provisional driving licence or ID and, if you are not a US citizen, a Green Card or US visa (not B-1/B-2).",
      ],
      [
        `Family members: <a href="/traduccion-jurada-certificado-matrimonio">marriage certificate</a> or registered partnership certificate and <a href="/traduccion-jurada-partida-nacimiento">birth certificates</a> (pages in Spanish)`,
        "Civil registry of the country",
        RULE_EN,
        TRANS_EN,
        "1 or 2 each, plus the apostille",
        "Each family member also files their own form, EX-01, photo, passport, insurance, criminal record certificate (adults of criminal age), medical certificate, proof of residence and fee. Unregistered partner: any document proving the relationship.",
      ],
      [
        "Fee receipt",
        "You",
        "No",
        "No",
        "1 or 2",
        "Residence authorisation fee: form 790 code 052, heading 2.1, two signed copies or online payment with receipt. Plus the consulate's visa fee (New York publishes its fee table).",
      ],
    ],
    after:
      "The consulate may ask for additional documents or information and call you to an interview. With the visa packs the price is fixed per batch; long statements and policies are priced per page.",
  },
  sections: [
    {
      id: "how-it-works",
      title: "How the non-lucrative visa works: visa and authorisation together",
      body: [
        "It is the visa for living in Spain without working or carrying on a professional activity, with guaranteed means of subsistence; it does not authorise you to work. You apply at the Spanish consulate for the district where you legally reside, in person (through a representative only exceptionally and with justification), and the visa application includes the application for the initial residence authorisation: they are processed together.",
        "The legal deadline to decide on the visa is one month from the day after the favourable decision on the residence authorisation is received. The visa is valid for 365 days and, once in Spain, you have one month from entry to apply for the foreigner identity card at the immigration office or police station. Your spouse, registered or proven stable partner, minor children or children who have not formed their own family, and adult children with a disability requiring support may come with you.",
        "Each consulate books appointments its own way: London at the BLS centre, New York by email with each applicant's details; Washington covers residents of Virginia, West Virginia, North Carolina, Maryland and the District of Columbia, and Los Angeles southern California, Arizona, Colorado and Utah.",
      ],
    },
    {
      id: "means",
      title: "How much money you have to prove: 400% of the IPREM",
      body: [
        `All four consulates ask for sufficient means for the initial year of residence, or a regular source of income, of a minimum amount equivalent to <strong>400% of the IPREM</strong> for the applicant, plus <strong>100% of the IPREM</strong> for each dependent family member. The IPREM is Spain's Public Multiple-Effect Income Indicator, created by ${ext(SRC.iprem, "Royal Decree-Law 3/2004")}; its amount is set every year by the General State Budget Act, so check the figure in force on your application date rather than relying on a euro amount published on a website.`,
        "Any document proving the means is valid: bank statements and certificates, pension letters, rental income, investments. New York details what the information on accounts abroad must include: the bank's name and address, the account identification, the opening date, the balance at 31 December of the previous year and the average balance over the last year. Statements are the longest documents in the file: they are translated per page and you can translate only the pages you need.",
      ],
    },
    {
      id: "order",
      title: "The logical order: get the certificates, apostille, translate",
      body: [
        {
          list: [
            "<strong>Dated certificates first.</strong> The criminal record certificate covers the countries where you have lived in the last five years; the medical certificate must refer to the 2005 International Health Regulations. Request them in good time, but not so early that they expire before the appointment: the consulate page does not set a maximum age, so ask when booking.",
            "<strong>Then the apostille, on the original.</strong> In the United States, the federal one from the Department of State for the FBI check; in the UK, the Legalisation Office for the ACRO certificate and civil registry certificates. If the country is not in the Hague Convention, legalisation.",
            "<strong>Last, the translation, apostille included.</strong> The translation reproduces the whole document, apostille included, so it is made on the already apostilled document. It is made by a sworn translator appointed by Spain's Ministry of Foreign Affairs; New York calls it an \"official translation\".",
            "<strong>Insurance and forms are not translated</strong> if they are already in Spanish: an insurer authorised in Spain usually issues the certificate in Spanish, and the visa and EX-01 forms are official templates.",
          ],
        },
      ],
    },
    {
      id: "mistakes",
      title: "Mistakes that delay the file",
      body: [
        {
          list: [
            "<strong>Translating before apostilling.</strong> The apostille is translated too; if you add it afterwards, the translation is incomplete.",
            "<strong>A local or state police certificate instead of the FBI check.</strong> New York says so expressly: it accepts the FBI's only.",
            "<strong>A medical certificate without the 2005 International Health Regulations wording.</strong> The consulate asks for that specific reference.",
            "<strong>Insurance from an insurer not authorised in Spain</strong> or that does not cover all the risks of the public system.",
            "<strong>Financial means without details.</strong> New York asks for specific data on each account (bank, address, identification, opening date, balances).",
            "<strong>A passport issued more than ten years ago or with less than a year's validity.</strong> The consulates do not accept it.",
            "<strong>Forgetting each family member's documents.</strong> Each one files their form, EX-01, photo, passport, insurance, criminal record, medical certificate, proof of residence and fee, as well as the certificate proving the relationship.",
          ],
        },
      ],
    },
  ],
  faq: [
    {
      q: "Which non-lucrative visa documents need an apostille?",
      a: "Under the consulates' general rule, all foreign documents: the criminal record certificate (FBI, ACRO or other), the medical certificate and the family members' marriage, partnership and birth certificates. Bank statements are not public documents; ask your consulate whether it wants them apostilled or notarised.",
    },
    {
      q: "Which documents need a sworn translation?",
      a: "Every foreign document that is not in Spanish, according to the page of all four consulates; New York specifies an \"official translation into Spanish\". In practice: the criminal record certificate, the medical certificate, the family members' civil registry certificates and any statements, pension letters or bank certificates in English.",
    },
    {
      q: "How much money do I have to prove?",
      a: "400% of the IPREM for the applicant, plus 100% of the IPREM for each dependent family member, for the first year of residence, or an equivalent regular source of income. The IPREM is set every year by the General State Budget Act; check the figure in force on your application date.",
    },
    {
      q: "Can I work on the non-lucrative visa?",
      a: "No. The consulates say so in the first line: it is a visa for residing without carrying on a gainful activity, whether employed or professional, and it does not authorise you to work.",
    },
    {
      q: "How many pages will I have to translate?",
      a: "Usually: the FBI check, one to three pages; the ACRO certificate, up to two; the medical certificate, one; each marriage or birth certificate, one or two; the apostille, one more page if your consulate wants it translated. Bank statements are the longest: several pages per month, and only the necessary ones need translating.",
    },
    {
      q: "How long does the consulate take?",
      a: "The legal deadline to decide on the visa is one month from the day after the favourable decision on the residence authorisation, which is processed at the same time, is received. The consulate may ask for additional documents or an interview.",
    },
    {
      q: "What do I do when I arrive in Spain?",
      a: "The visa is valid for 365 days. You have one month from entry to apply for the foreigner identity card (TIE) at the immigration office or police station for your area.",
    },
  ],
  offer: {
    id: "sworn-translation",
    title: "If you need sworn translations for the file",
    body: [
      `I am Elena Peñaranda Ortega, sworn translator of English appointed by Spain's Ministry of Foreign Affairs (no. 7310). I translate the whole file with a single fixed price and a single written deadline, apostilles included: the usual documents with a fixed pack and long statements at €${PRICE_PER_PAGE} per page, VAT included. Each document arrives as a PDF with a qualified electronic signature, the same day for up to ${SAME_DAY_MAX_PAGES} pages.`,
    ],
    facts: [
      `${PACK.name.en}: €${PACK.price} (${PACK.includes.en.toLowerCase().replace(/\.$/, "")})`,
      `${PACK_FAMILY.name.en}: €${PACK_FAMILY.price} (${PACK_FAMILY.includes.en.toLowerCase().replace(/\.$/, "")})`,
      "Signed PDF the same day",
    ],
    whatsapp: wa("Hi Elena, I am preparing my non-lucrative visa and need my documents translated"),
    whatsappLabel: "Send my documents on WhatsApp",
    landing: {
      href: "/en/sworn-translations-spanish-visas",
      label: "Sworn translations for Spanish visas",
    },
  },
  sources: {
    date: "2026-10-10",
    items: [
      { label: "Consulate General of Spain in London: Non-lucrative residence visa", href: SRC.londres },
      { label: "Consulate General of Spain in New York: Non-lucrative residence visa", href: SRC.nuevayork },
      { label: "Embassy of Spain in Washington, consular section: Non-lucrative residence visa", href: SRC.washington },
      { label: "Consulate General of Spain in Los Angeles: Non-lucrative residence visa", href: SRC.losangeles },
      {
        label: "BOE: Royal Decree-Law 3/2004, which creates the Public Multiple-Effect Income Indicator (IPREM); the annual amount is set by the General State Budget Act",
        href: SRC.iprem,
      },
      { label: "Ministry of Foreign Affairs: Legalisation and apostille", href: SRC.maecLegalizacion },
    ],
  },
  related: [
    { href: "/en/sworn-translations-spanish-visas", label: "Sworn translations for Spanish visas" },
    { href: "/en/fbi-background-check-translation-spain", label: "FBI background check" },
    { href: "/en/acro-police-certificate-translation-spain", label: "ACRO police certificate" },
    { href: "/en/spain-digital-nomad-visa-documents-checklist", label: "Guide: digital nomad visa documents" },
    { href: "/en/sworn-translation-usa-spain", label: "Coming from the United States" },
  ],
  otherLangLabel: "Documentos para el visado no lucrativo de España",
};
