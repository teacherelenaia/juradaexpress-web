// content/servicios/traductor-jurado-ingles.js
//
// Landing principal de servicio (FASE 1 SEO, 26/09/2026):
// /traductor-jurado-ingles y /en/sworn-english-translator. Es la página que
// responde a la búsqueda genérica "traductor jurado de inglés": qué es la
// traducción jurada, quién puede firmarla (nombramiento del MAEC y cómo
// comprobarlo), qué documentos, precios reales de content/documents.js,
// plazos, validez de la firma digital frente al papel, apostilla y
// organismos que la aceptan. Se pinta con app/components/ServicePage.js.
import { DOCUMENTS, MIN_PRICE } from "../documents";
import { MAEC_URL, MAEC_NUMBER } from "../persona";
import {
  TIMEZONE_NOTE,
  INTERNATIONAL_SHIPPING,
  LARGE_PROJECT_CAPACITY,
} from "../site";

const PATH_ES = "/traductor-jurado-ingles";
const PATH_EN = "/en/sworn-english-translator";

// Ficha de documento que corresponde a cada línea del catálogo (para
// enlazar la tabla de precios con las fichas existentes).
const FICHA_OF = {
  "partida-nacimiento": "/traduccion-jurada-partida-nacimiento",
  "certificado-matrimonio": "/traduccion-jurada-certificado-matrimonio",
  "antecedentes-penales": "/traduccion-jurada-certificado-penales",
  "permiso-conducir": "/traduccion-jurada-permiso-conducir",
  "titulo-universitario": "/traduccion-jurada-titulo-universitario",
  "expediente-academico": "/traduccion-jurada-titulo-universitario",
  "certificado-empresa": "/traduccion-jurada-certificado-empresa",
  "contrato-escritura": "/traduccion-jurada-contrato-escritura",
  "dni-pasaporte": "/traduccion-jurada-dni-pasaporte",
  "testamento-herencia": "/traduccion-jurada-testamento-herencia",
  "certificado-medico": "/traduccion-jurada-certificado-medico",
  "otro-documento": "/documentos",
};

const NAME_EN = {
  "partida-nacimiento": "Birth certificate",
  "certificado-matrimonio": "Marriage certificate",
  "antecedentes-penales": "Criminal record certificate",
  "permiso-conducir": "Driving licence",
  "titulo-universitario": "University degree (1 page)",
  "expediente-academico": "Academic transcript",
  "certificado-empresa": "Employment certificate / payslip",
  "contrato-escritura": "Contract or deed",
  "dni-pasaporte": "ID card or passport",
  "testamento-herencia": "Will and inheritance documents",
  "certificado-medico": "Medical certificate",
  "otro-documento": "Any other document",
};

function priceTable(locale) {
  const en = locale === "en";
  return {
    table: {
      caption: en
        ? "Sworn translation prices per document, in euros"
        : "Precios de traducción jurada por documento, en euros",
      head: en
        ? ["Document", "Price", "Usual turnaround"]
        : ["Documento", "Precio", "Plazo habitual"],
      rows: DOCUMENTS.map((d) => [
        `<a href="${FICHA_OF[d.id] || "/documentos"}">${en ? NAME_EN[d.id] || d.name : d.name}</a>`,
        d.price != null
          ? en
            ? `€${d.price}`
            : `${d.price} €`
          : en
            ? "Fixed quote in under 2 hours"
            : "Presupuesto cerrado en menos de 2 h",
        d.id === "contrato-escritura" || d.id === "testamento-herencia"
          ? en
            ? "Depends on length"
            : "Según extensión"
          : en
            ? "24/48h"
            : "24/48 h",
      ]),
    },
  };
}

export const es = {
  id: "traductor-ingles",
  locale: "es",
  path: PATH_ES,
  alternates: { es: PATH_ES, en: PATH_EN },
  crumb: "Traductor jurado de inglés",
  metaTitle: `Traductor jurado de inglés online desde ${MIN_PRICE} € | MAEC 7310`,
  metaDescription: `Traducción jurada español-inglés con validez oficial, firmada por traductora nombrada por el MAEC (nº 7310). Desde ${MIN_PRICE} € por documento, PDF firmado en 24/48 h.`,
  h1: "Traductor jurado de inglés online: traducción jurada español-inglés con validez oficial",
  lead: `Soy Elena Peñaranda Ortega, Traductora-Intérprete Jurada de Inglés nombrada por el Ministerio de Asuntos Exteriores con el nº 7310. Traduzco, firmo y sello personalmente documentos del español al inglés y del inglés al español para que tengan validez ante cualquier organismo oficial: Extranjería, Registro Civil, universidades, notarías, Home Office, USCIS o IRCC. Todo el proceso es online: me envías el documento escaneado, te doy precio cerrado en menos de 2 horas y recibes el PDF firmado electrónicamente en 24/48 h. Los documentos más habituales cuestan desde ${MIN_PRICE} €.`,
  image: {
    src: "/fotos/certificacion-firma.jpg",
    alt: "Traductora jurada firmando y sellando una traducción jurada de inglés",
  },
  whatsapp:
    "https://wa.me/34685891214?text=Hola%20Elena%2C%20necesito%20una%20traducci%C3%B3n%20jurada%20de%20ingl%C3%A9s%20%28te%20env%C3%ADo%20el%20documento%20y%20me%20dices%20precio%20y%20plazo%29",
  whatsappLabel: "Enviar documento por WhatsApp",
  serviceName: "Traducción jurada de inglés online",
  serviceType: "Traducción jurada Español ⇆ Inglés",
  priceFrom: MIN_PRICE,
  areaServed: [{ "@type": "Country", name: "ES" }, "Worldwide"],
  sections: [
    {
      id: "que-es",
      title: "¿Qué es una traducción jurada?",
      body: [
        "Una <strong>traducción jurada</strong> es la traducción de un documento hecha y certificada por un traductor jurado nombrado por el Ministerio de Asuntos Exteriores, Unión Europea y Cooperación (MAEC). Lleva la certificación con la fórmula oficial, la firma y el sello del traductor, y va acompañada de una copia del documento original, fechada y sellada. Con eso, la traducción tiene <strong>carácter oficial</strong> ante la Administración española y ante los juzgados, notarías, universidades y empresas que exigen que un documento extranjero llegue en español, o que un documento español salga en inglés con las garantías de un profesional habilitado.",
        "La diferencia con una traducción \"normal\" no está en el idioma ni en la calidad del texto, sino en la <strong>responsabilidad</strong>: cuando firmo una traducción jurada respondo personalmente de que es fiel y completa respecto al original. Por eso no puedo omitir sellos, anotaciones manuscritas, apostillas ni notas al margen; todo lo que aparece en el documento aparece en la traducción, y lo que no se puede leer se indica como ilegible. Si necesitas presentar un documento ante un organismo oficial, lo que te van a pedir es esto.",
        'Si tienes dudas sobre si tu trámite exige jurada o basta una traducción simple, te lo digo antes de cobrarte nada. En la ficha de <a href="/traduccion-jurada-validez-oficial">validez oficial de la traducción jurada</a> explico con más detalle cómo se comprueba y qué debe llevar.',
      ],
    },
    {
      id: "quien",
      title: "¿Quién puede hacer una traducción jurada de inglés?",
      body: [
        "Solo un <strong>Traductor-Intérprete Jurado</strong> nombrado por el MAEC para la combinación inglés-español, bien por examen de la Oficina de Interpretación de Lenguas, bien por reconocimiento de una cualificación profesional obtenida en otro Estado de la Unión Europea. El nombramiento es personal e intransferible: la traducción la firma la persona nombrada, no una agencia, y el número que aparece en el sello identifica a esa persona en el registro público del Ministerio.",
        `Mi nombramiento es el <strong>nº ${MAEC_NUMBER}</strong>, para inglés. Puedes comprobarlo tú mismo, sin pedirme nada, en el <a href="${MAEC_URL}" target="_blank" rel="noopener noreferrer">listado oficial de Traductores/as-Intérpretes Jurados/as del MAEC</a>: descarga el listado de inglés y busca mi nombre o mi número. Es la única comprobación que necesita un organismo para saber que la firma es válida, y es la que yo te recomiendo hacer con cualquier traductor jurado antes de encargarle un documento.`,
        {
          note: "Una traducción jurada de inglés hecha en España es válida para presentarla en cualquier organismo español, con independencia de en qué provincia esté el traductor o el organismo. No existen traductores jurados \"de Murcia\" o \"de Madrid\": el nombramiento es estatal y la traducción vale en todo el territorio.",
        },
      ],
    },
    {
      id: "documentos",
      title: "¿Qué documentos traduzco con más frecuencia?",
      body: [
        "Estos son los documentos que más traduzco, cada uno con su ficha, donde explico para qué trámites se pide, si lleva apostilla y cómo enviármelo:",
        {
          list: [
            '<a href="/traduccion-jurada-partida-nacimiento">Partida o certificado de nacimiento</a> — nacionalidad, matrimonio, NIE de hijos, Registro Civil.',
            '<a href="/traduccion-jurada-certificado-matrimonio">Certificado de matrimonio</a> — residencia por reagrupación, pensiones, inscripción del matrimonio.',
            '<a href="/traduccion-jurada-certificado-penales">Certificado de antecedentes penales</a> — visados, residencia, nacionalidad, ofertas de empleo.',
            '<a href="/traduccion-jurada-titulo-universitario">Título universitario y expediente académico</a> — homologación, equivalencia, UCAS, colegiación, másteres.',
            '<a href="/traduccion-jurada-permiso-conducir">Permiso de conducir</a> — canje o reconocimiento en la DGT y en la DVLA.',
            '<a href="/traduccion-jurada-certificado-empresa">Certificado de empresa y nóminas</a> — visados de trabajo, nómada digital, hipotecas, alquileres.',
            '<a href="/traduccion-jurada-dni-pasaporte">DNI o pasaporte</a> — expedientes en los que se exige traducción del documento de identidad.',
            '<a href="/traduccion-jurada-contrato-escritura">Contratos y escrituras</a> — compraventa de vivienda, poderes, constitución de sociedades.',
            '<a href="/traduccion-jurada-testamento-herencia">Testamentos y documentos de herencia</a> — herencias con bienes en España y en el Reino Unido (grant of probate).',
            '<a href="/traduccion-jurada-certificado-medico">Certificado médico</a> — visados, bajas, seguros y pruebas ante la Administración.',
            '<a href="/traduccion-jurada-espanol-ingles">Traducción jurada español-inglés</a> — la ficha general de la combinación, con ejemplos de ambos sentidos.',
            '<a href="/traduccion-jurada-validez-oficial">Validez oficial de la traducción jurada</a> — qué lleva, cómo se verifica y quién la acepta.',
          ],
        },
        'Si tu documento no está en la lista, elige "otro documento" en el <a href="/documentos">catálogo</a> y te doy presupuesto igual. Para expedientes completos (visado de nómada digital, nacionalidad, homologación con varios documentos) trabajo con un solo plazo y un solo precio para todo el lote; lo explico en <a href="/traduccion-jurada-urgente-grandes-volumenes">urgentes y grandes volúmenes</a>.',
      ],
    },
    {
      id: "precios",
      title: `Precios de traducción jurada de inglés: desde ${MIN_PRICE} € por documento`,
      body: [
        `Los precios de esta tabla son los que aplico a los documentos estándar de una página (certificados, títulos, permisos) y son los mismos que verás en el catálogo. Para documentos largos o con formato complejo (contratos, escrituras, expedientes académicos de varias páginas) el precio depende de la extensión, y te lo doy <strong>cerrado, por escrito y en menos de 2 horas</strong> al ver el documento; nunca cobro por palabra a ciegas ni añado recargos que no hayas visto antes de aceptar.`,
        priceTable("es"),
        `El precio incluye la traducción completa, la certificación con firma y sello, el PDF firmado electrónicamente y la copia sellada del original. No tiene recargo por urgencia ordinaria (24/48 h). ${INTERNATIONAL_SHIPPING.note.es}. El pago es con tarjeta a través de Stripe o por transferencia, y te envío factura. Consulta la <a href="/precios">página de precios</a> completa, que incluye la traducción certificada para USCIS y los expedientes de nómada digital.`,
      ],
    },
    {
      id: "plazos",
      title: "Plazos: 24/48 h para documentos habituales",
      body: [
        "Un certificado, un título o un permiso de conducir lo tienes normalmente en <strong>24 horas</strong> desde que confirmas el presupuesto, y en 48 horas como máximo si me llegan varios a la vez. Cuando me escribes te digo el plazo real antes de que pagues, y ese plazo es el que cumplo: no prometo \"el mismo día\" de forma genérica porque depende de la carga de trabajo, pero si lo necesitas para una cita concreta, dímelo y te confirmo si llego.",
        `Para lotes grandes y expedientes de varios documentos, acordamos un calendario por escrito${LARGE_PROJECT_CAPACITY ? `; puedo asumir ${LARGE_PROJECT_CAPACITY.es}` : ""}. ${TIMEZONE_NOTE.es}; si me escribes desde el Reino Unido, Irlanda o América, tenlo en cuenta para calcular cuándo recibirás la respuesta.`,
      ],
    },
    {
      id: "validez",
      title: "Validez: firma digital o papel, y cuándo hace falta apostilla",
      body: [
        "<strong>PDF con firma electrónica.</strong> Es lo que entrego por defecto. La Oficina de Interpretación de Lenguas del MAEC admitió en 2020 que las traducciones juradas se firmen electrónicamente, y la Administración española (Extranjería, Registros Civiles, universidades, Seguridad Social, Hacienda) las acepta de forma generalizada, sobre todo en los trámites que se presentan por sede electrónica. La firma se verifica con un clic en el propio PDF y el documento se puede reenviar tantas veces como haga falta sin perder validez.",
        "<strong>Papel con firma manuscrita y sello.</strong> Algunos organismos, notarías o registros siguen pidiendo el original en papel, y fuera de la Unión Europea es más frecuente. En ese caso imprimo la traducción, la firmo y sello a mano y te la envío por mensajería: al día siguiente de la entrega digital en Murcia y en 24/48 h en el resto de España. Puedes pedir las dos versiones a la vez; la traducción es la misma.",
        '<strong>Apostilla.</strong> La apostilla de La Haya no es parte de la traducción: es un sello que legaliza el <em>documento original</em> para que surta efecto en otro país, y se tramita antes de traducir, en el país que emitió el documento (en el Reino Unido, la Legalisation Office del FCDO; en España, notarios, colegios notariales, Ministerio de Justicia o Tribunales Superiores de Justicia según el documento). Si el documento la lleva, la traduzco también. Entre Estados de la UE, el Reglamento (UE) 2016/1191 exime de apostilla a muchos documentos públicos (nacimiento, matrimonio, penales…), pero un documento británico o estadounidense normalmente sí la necesita para España. Lo explico documento a documento en <a href="/blog/que-es-la-apostilla-de-la-haya">qué es la apostilla y cuándo la necesitas</a>, y si no estás seguro, me lo preguntas antes de tramitarla.',
      ],
    },
    {
      id: "organismos",
      title: "Organismos que aceptan mis traducciones juradas",
      body: [
        "En España, cualquier organismo público o privado acepta una traducción jurada firmada por traductor nombrado por el MAEC; es lo que la ley exige cuando un documento extranjero se presenta ante la Administración. Fuera de España no existe la figura del traductor jurado con el mismo nombre, pero los organismos anglosajones piden una <em>certified translation</em> con requisitos concretos que mi traducción cumple o que adapto cuando hace falta:",
        {
          list: [
            "<strong>Extranjería y Policía Nacional</strong>: NIE, TIE, arraigo, reagrupación familiar, nacionalidad por residencia, visados de nómada digital y no lucrativo.",
            "<strong>Registro Civil</strong>: inscripción de nacimientos y matrimonios celebrados fuera, expedientes de nacionalidad y de matrimonio.",
            "<strong>Universidades y Ministerio de Educación</strong>: homologación y equivalencia de títulos, admisión a grados y másteres, Erasmus, becas.",
            "<strong>Notarías, registros y juzgados</strong>: compraventas, poderes, herencias, procedimientos judiciales con documentación en inglés.",
            '<strong>Home Office / UKVI</strong> (Reino Unido): visados, residencia y ciudadanía; pide una traducción completa con la confirmación del traductor, la fecha, su nombre y sus datos de contacto, que mi certificación incluye. Ver la <a href="/traduccion-jurada-britanicos-espana">guía para británicos en España</a>.',
            '<strong>USCIS</strong> (Estados Unidos): exige una certificación de exactitud y competencia conforme a 8 CFR § 103.2(b)(3), que entrego con cada documento; no hace falta notario. Ver <a href="/traduccion-certificada-uscis">traducción certificada para USCIS</a>.',
            '<strong>IRCC</strong> (Canadá): pide traducción de traductor certificado o, si no lo es en Canadá, acompañada de un affidavit del traductor; te explico qué opción encaja con tu caso en la <a href="/traduccion-jurada-canada">página de Canadá</a>.',
            '<strong>Irish Immigration, Home Affairs (Australia), universidades y empleadores</strong> de países de habla inglesa: traducción certificada con los datos del traductor. Guías en <a href="/traduccion-jurada-por-paises">traducción jurada por países</a>.',
          ],
        },
        "Si tu organismo tiene un requisito concreto (un formato, una declaración, una copia compulsada), mándamelo junto al documento y lo incorporo. Prefiero decirte que algo no lo puedo hacer a entregarte una traducción que luego te rechacen.",
      ],
    },
  ],
  steps: [
    {
      t: "Envío",
      d: "Me mandas el documento escaneado o fotografiado (nítido, completo, con anverso y reverso) por WhatsApp, email o el catálogo.",
    },
    {
      t: "Presupuesto",
      d: "En menos de 2 horas te respondo con precio cerrado, plazo y, si procede, aviso de apostilla o de documento plurilingüe.",
    },
    {
      t: "Traducción jurada",
      d: "Traduzco, certifico, firmo y sello personalmente. Ningún texto pasa por terceros.",
    },
    {
      t: "Entrega",
      d: "PDF firmado electrónicamente en 24/48 h y, si lo necesitas, papel por mensajería a cualquier dirección.",
    },
  ],
  faq: [
    {
      q: "¿La traducción jurada de inglés es válida en toda España?",
      a: "Sí. El nombramiento del MAEC es estatal: una traducción jurada firmada por un traductor jurado de inglés vale ante cualquier organismo de cualquier comunidad autónoma, sin necesidad de legalización adicional.",
    },
    {
      q: "¿Cómo compruebo que un traductor jurado está realmente nombrado?",
      a: "Buscando su nombre o su número en el listado oficial de Traductores/as-Intérpretes Jurados/as que publica el Ministerio de Asuntos Exteriores en su web. Mi número es el 7310, para inglés. Si un traductor no aparece en ese listado, su traducción no es jurada en España.",
    },
    {
      q: "¿Tengo que enviarte el documento original?",
      a: "No. Trabajo con un escaneo o una foto nítida. La normativa exige que a la traducción se adjunte una copia del documento tal y como me lo entregaste, sellada y fechada, no el original.",
    },
    {
      q: "¿La versión PDF con firma electrónica la aceptan igual que el papel?",
      a: "En la mayoría de trámites, sí: el MAEC admite la firma electrónica del traductor jurado y la Administración la acepta, sobre todo por sede electrónica. Si un organismo concreto te pide papel, te lo envío por mensajería con firma manuscrita y sello; es la misma traducción.",
    },
    {
      q: "¿Necesito apostillar el documento antes de traducirlo?",
      a: "Depende del documento y del organismo. La apostilla legaliza el original y se tramita en el país que lo emitió antes de traducir; si el documento la lleva, la traduzco también. Un certificado británico o estadounidense para un trámite en España normalmente sí la necesita; entre países de la UE muchos documentos públicos están exentos. Pregúntame antes de tramitarla.",
    },
    {
      q: "¿Cuánto cuesta una traducción jurada de inglés?",
      a: `Los documentos habituales de una página (partida de nacimiento, certificado de matrimonio, antecedentes penales) cuestan ${MIN_PRICE} €; el permiso de conducir, 40 €; el certificado de empresa, 45 €; el título universitario, 50 €. Los documentos largos se presupuestan al ver el documento, con precio cerrado en menos de 2 horas.`,
    },
    {
      q: "¿Cuánto tarda?",
      a: "Los documentos habituales, 24/48 h desde que confirmas el presupuesto. Si tienes una cita con fecha, dímelo al pedir presupuesto y te confirmo por escrito si llego. Los lotes grandes tienen su propio calendario.",
    },
    {
      q: "¿Traduces también del inglés al español?",
      a: "Sí, en los dos sentidos: documentos británicos, irlandeses, estadounidenses, canadienses, australianos o indios para trámites en España, y documentos españoles al inglés para el Home Office, USCIS, IRCC, universidades o empleadores en el extranjero.",
    },
  ],
  cta: {
    title: "¿Te traduzco tu documento?",
    text: "Envíamelo escaneado por WhatsApp o email y en menos de 2 horas tendrás precio cerrado y plazo real. Sin compromiso: si no necesita traducción jurada, te lo diré.",
  },
  related: [
    { href: "/traduccion-jurada-espanol-ingles", label: "Traducción jurada español-inglés" },
    { href: "/traduccion-jurada-validez-oficial", label: "Validez oficial" },
    { href: "/traductor-jurado-murcia", label: "Traductor jurado en Murcia" },
    { href: "/como-funciona", label: "Cómo funciona" },
    { href: "/sobre-mi", label: "Sobre mí" },
  ],
  otherLangLabel: "Sworn English translator online",
};

export const en = {
  id: "traductor-ingles",
  locale: "en",
  path: PATH_EN,
  alternates: { es: PATH_ES, en: PATH_EN },
  crumb: "Sworn English translator",
  metaTitle: `Sworn English translator online from €${MIN_PRICE} | MAEC no. 7310`,
  metaDescription: `Officially valid sworn Spanish-English translation signed by a translator appointed by Spain's Foreign Ministry (no. 7310). From €${MIN_PRICE} per document, signed PDF in 24/48h.`,
  h1: "Sworn English translator online: officially valid Spanish-English sworn translation",
  lead: `I'm Elena Peñaranda Ortega, Sworn Translator-Interpreter of English appointed by Spain's Ministry of Foreign Affairs under no. 7310. I translate, sign and stamp documents from English into Spanish and from Spanish into English so that they are accepted by any official body: Spanish immigration offices, the Civil Registry, universities, notaries, the Home Office, USCIS or IRCC. Everything happens online: you send me a scan, I send you a fixed quote within 2 hours and you receive the electronically signed PDF in 24/48h. The most common documents start at €${MIN_PRICE}.`,
  image: {
    src: "/fotos/certificacion-firma.jpg",
    alt: "Sworn translator signing and stamping a sworn English translation",
  },
  whatsapp:
    "https://wa.me/34685891214?text=Hi%20Elena%2C%20I%20need%20a%20sworn%20English-Spanish%20translation%20%28I%27ll%20send%20the%20document%20for%20a%20quote%29",
  whatsappLabel: "Send my document on WhatsApp",
  serviceName: "Sworn English translation online",
  serviceType: "Sworn Spanish ⇆ English translation",
  priceFrom: MIN_PRICE,
  areaServed: [{ "@type": "Country", name: "ES" }, "Worldwide"],
  sections: [
    {
      id: "what",
      title: "What is a sworn translation?",
      body: [
        "A <strong>sworn translation</strong> (<em>traducción jurada</em>) is a translation made and certified by a sworn translator appointed by Spain's Ministry of Foreign Affairs, European Union and Cooperation (MAEC). It carries the official certification wording, the translator's signature and stamp, and is attached to a dated, stamped copy of the source document. That is what gives it <strong>official status</strong> before the Spanish authorities, courts, notaries, universities and companies that require a foreign document to be filed in Spanish, or a Spanish document to be issued in English with the guarantees of a licensed professional.",
        "The difference from an ordinary translation is not the language or the quality of the text but the <strong>liability</strong>: when I sign a sworn translation I am personally vouching that it is faithful and complete. That is why I cannot leave out stamps, handwritten notes, apostilles or margin annotations: everything on the document appears in the translation, and anything unreadable is marked as illegible. If you need to file a document with an official body in Spain, this is what they will ask for.",
        'If you are not sure whether your procedure requires a sworn translation or a plain one, I will tell you before charging you anything. The page on the <a href="/traduccion-jurada-validez-oficial">official validity of sworn translations</a> (in Spanish) explains what it must contain and how it is checked.',
      ],
    },
    {
      id: "who",
      title: "Who can produce a sworn English translation?",
      body: [
        "Only a <strong>Sworn Translator-Interpreter</strong> appointed by the MAEC for the English-Spanish pair, either by passing the exam set by the Ministry's Office of Language Interpretation or through recognition of a professional qualification obtained in another EU Member State. The appointment is personal and non-transferable: the translation is signed by the appointed individual, not by an agency, and the number on the stamp identifies that person in the Ministry's public register.",
        `My appointment number is <strong>${MAEC_NUMBER}</strong>, for English. You can check it yourself, without asking me, on the <a href="${MAEC_URL}" target="_blank" rel="noopener noreferrer">MAEC's official list of sworn translators and interpreters</a>: download the English list and look for my name or number. It is the only check an official body needs to know the signature is valid, and it is the check I recommend you make with any sworn translator before sending them a document.`,
        {
          note: "A sworn English translation produced in Spain is valid before any Spanish body, whatever province the translator or the office is in. There is no such thing as a sworn translator \"for Murcia\" or \"for Madrid\": the appointment is national and the translation is valid throughout Spain.",
        },
      ],
    },
    {
      id: "documents",
      title: "Which documents do I translate most often?",
      body: [
        "These are the documents I translate most, each with its own page (in Spanish) explaining which procedures ask for it, whether it needs an apostille and how to send it:",
        {
          list: [
            '<a href="/traduccion-jurada-partida-nacimiento">Birth certificate</a> — citizenship, marriage, children\'s NIE, Civil Registry.',
            '<a href="/traduccion-jurada-certificado-matrimonio">Marriage certificate</a> — family reunification residency, pensions, registering the marriage.',
            '<a href="/traduccion-jurada-certificado-penales">Criminal record certificate</a> (ACRO, DBS, FBI, Garda) — visas, residency, citizenship, job offers.',
            '<a href="/traduccion-jurada-titulo-universitario">University degree and transcript</a> — recognition of qualifications, UCAS, professional bodies, master\'s admissions.',
            '<a href="/traduccion-jurada-permiso-conducir">Driving licence</a> — exchange or recognition with the DGT or the DVLA.',
            '<a href="/traduccion-jurada-certificado-empresa">Employment certificate and payslips</a> — work visas, digital nomad visa, mortgages, rentals.',
            '<a href="/traduccion-jurada-dni-pasaporte">ID card or passport</a> — files where a translation of the identity document is required.',
            '<a href="/traduccion-jurada-contrato-escritura">Contracts and deeds</a> — property purchases, powers of attorney, company formation.',
            '<a href="/traduccion-jurada-testamento-herencia">Wills and inheritance documents</a> — estates with assets in Spain and the UK (grant of probate).',
            '<a href="/traduccion-jurada-certificado-medico">Medical certificate</a> — visas, sick leave, insurance and evidence before the authorities.',
            '<a href="/traduccion-jurada-espanol-ingles">Sworn Spanish-English translation</a> — the general page for the language pair.',
            '<a href="/traduccion-jurada-validez-oficial">Official validity</a> — what a sworn translation contains, how it is verified and who accepts it.',
          ],
        },
        'If your document is not listed, choose "other document" in the <a href="/en/documentos">catalogue</a> and I will quote for it all the same. For complete files (digital nomad visa, citizenship, recognition of qualifications with several documents) I work with a single deadline and a single price for the whole batch; see <a href="/en/urgent-sworn-translation-large-projects">urgent and large projects</a>.',
      ],
    },
    {
      id: "prices",
      title: `Sworn English translation prices: from €${MIN_PRICE} per document`,
      body: [
        "The prices in this table apply to standard one-page documents (certificates, degrees, licences) and are the same ones you will see in the catalogue. For long or complex documents (contracts, deeds, multi-page transcripts) the price depends on length, and you get it <strong>fixed, in writing and within 2 hours</strong> once I have seen the document; I never quote per word blind or add surcharges you have not seen before accepting.",
        priceTable("en"),
        `The price includes the complete translation, the certification with signature and stamp, the electronically signed PDF and the stamped copy of the source document. There is no surcharge for the ordinary 24/48h turnaround. ${INTERNATIONAL_SHIPPING.note.en}. Payment is by card through Stripe (any international card, charged in euros) or by bank transfer, and you receive an invoice. See the full <a href="/en/precios">pricing page</a>, including certified translation for USCIS and digital nomad visa files.`,
      ],
    },
    {
      id: "turnaround",
      title: "Turnaround: 24/48h for common documents",
      body: [
        "A certificate, a degree or a driving licence is normally ready within <strong>24 hours</strong> of confirming the quote, and within 48 hours at most if several arrive at once. When you write to me I tell you the real deadline before you pay, and that is the deadline I keep: I do not promise \"same day\" as a blanket rule because it depends on workload, but if you need it for a specific appointment, tell me and I will confirm whether I can make it.",
        `For large batches and multi-document files we agree a schedule in writing${LARGE_PROJECT_CAPACITY ? `; I can take on ${LARGE_PROJECT_CAPACITY.en}` : ""}. ${TIMEZONE_NOTE.en}; if you are writing from the UK, Ireland or the Americas, bear that in mind when working out when you will hear back.`,
      ],
    },
    {
      id: "validity",
      title: "Validity: digital signature or paper, and when you need an apostille",
      body: [
        "<strong>PDF with electronic signature.</strong> This is what I deliver by default. In 2020 the MAEC's Office of Language Interpretation confirmed that sworn translations may be signed electronically, and the Spanish authorities (immigration, civil registries, universities, social security, tax office) accept them as a matter of course, especially for procedures filed online. The signature is verified with one click inside the PDF and the document can be forwarded as many times as needed without losing validity.",
        "<strong>Paper with handwritten signature and stamp.</strong> Some bodies, notaries or registries still ask for a paper original, and this is more common outside the EU. In that case I print the translation, sign and stamp it by hand and courier it to you: the day after digital delivery in Murcia and within 24/48h elsewhere in Spain; abroad, the courier cost is stated in the quote. You can ask for both versions at once; the translation is the same.",
        '<strong>Apostille.</strong> The Hague apostille is not part of the translation: it is a stamp that legalises the <em>original document</em> so that it takes effect in another country, and it is obtained before translating, in the country that issued the document (in the UK, the FCDO Legalisation Office; in the US, the Secretary of State of the issuing state or the US Department of State). If the document carries one, I translate it too. Between EU Member States, Regulation (EU) 2016/1191 exempts many public documents (birth, marriage, criminal records…) from the apostille, but a British or American document normally does need one for Spain. If in doubt, ask me before applying for it.',
      ],
    },
    {
      id: "bodies",
      title: "Bodies that accept my sworn translations",
      body: [
        "In Spain, any public or private body accepts a sworn translation signed by a MAEC-appointed translator; it is what the law requires when a foreign document is filed with the authorities. Outside Spain there is no sworn translator by that name, but English-speaking bodies ask for a <em>certified translation</em> with specific requirements that my translation meets or that I adapt when needed:",
        {
          list: [
            "<strong>Spanish immigration offices and National Police</strong>: NIE, TIE, arraigo, family reunification, citizenship by residence, digital nomad and non-lucrative visas.",
            "<strong>Civil Registry</strong>: registering births and marriages that took place abroad, citizenship and marriage files.",
            "<strong>Universities and the Ministry of Education</strong>: recognition and equivalence of degrees, admission to undergraduate and master's programmes, Erasmus, scholarships.",
            "<strong>Notaries, registries and courts</strong>: property purchases, powers of attorney, estates, court proceedings with documents in English.",
            '<strong>Home Office / UKVI</strong>: visas, settlement and citizenship; it asks for a full translation with the translator\'s confirmation, the date, their full name and contact details, all of which my certification includes. See the <a href="/en/sworn-translation-british-residents-spain">guide for British residents in Spain</a>.',
            '<strong>USCIS</strong>: requires a certification of accuracy and competence under 8 CFR § 103.2(b)(3), which I provide with every document; no notary is needed. See <a href="/en/certified-translation-uscis">certified translation for USCIS</a>.',
            '<strong>IRCC</strong> (Canada): asks for a translation by a certified translator or, if the translator is not certified in Canada, accompanied by a translator\'s affidavit; I explain which option fits your case on the <a href="/en/sworn-translation-canada-spain">Canada page</a>.',
            '<strong>Irish Immigration, Home Affairs (Australia), universities and employers</strong> in English-speaking countries: certified translation with the translator\'s details. Guides under <a href="/en/sworn-translation-spain-by-country">sworn translation by country</a>.',
          ],
        },
        "If your body has a specific requirement (a format, a declaration, a certified copy), send it to me with the document and I will build it in. I would rather tell you I cannot do something than hand you a translation that gets rejected.",
      ],
    },
  ],
  steps: [
    {
      t: "Send",
      d: "Send me a clear, complete scan or photo (front and back) by WhatsApp, email or through the catalogue.",
    },
    {
      t: "Quote",
      d: "Within 2 hours you get a fixed price, a deadline and, where relevant, a note about apostilles or multilingual forms.",
    },
    {
      t: "Sworn translation",
      d: "I translate, certify, sign and stamp it personally. No text is passed on to third parties.",
    },
    {
      t: "Delivery",
      d: "Electronically signed PDF in 24/48h and, if you need it, a paper copy couriered to any address.",
    },
  ],
  faq: [
    {
      q: "Is a sworn English translation valid throughout Spain?",
      a: "Yes. The MAEC appointment is national: a sworn translation signed by a sworn translator of English is valid before any body in any region of Spain, with no further legalisation.",
    },
    {
      q: "How do I check that a sworn translator is really appointed?",
      a: "Look up their name or number on the official list of sworn translators and interpreters published by Spain's Ministry of Foreign Affairs on its website. My number is 7310, for English. If a translator is not on that list, their translation is not a sworn translation in Spain.",
    },
    {
      q: "Do I need to send you the original document?",
      a: "No. I work from a scan or a clear photo. The rules require a stamped, dated copy of the document as you sent it to me to be attached to the translation, not the original.",
    },
    {
      q: "Is the electronically signed PDF accepted the same as paper?",
      a: "For most procedures, yes: the MAEC allows the sworn translator's electronic signature and the Spanish authorities accept it, especially when filing online. If a particular body asks for paper, I courier it to you with a handwritten signature and stamp; it is the same translation.",
    },
    {
      q: "Do I need to apostille the document before translating it?",
      a: "It depends on the document and the body. The apostille legalises the original and is obtained in the issuing country before translation; if the document carries one, I translate it too. A British or American certificate for a procedure in Spain normally needs it; between EU countries many public documents are exempt. Ask me before applying for it.",
    },
    {
      q: "How much does a sworn English translation cost?",
      a: `Common one-page documents (birth certificate, marriage certificate, criminal record certificate) cost €${MIN_PRICE}; a driving licence €40; an employment certificate €45; a university degree €50. Long documents are quoted once I see them, with a fixed price within 2 hours.`,
    },
    {
      q: "How long does it take?",
      a: "Common documents, 24/48h from confirming the quote. If you have a dated appointment, tell me when asking for the quote and I will confirm in writing whether I can make it. Large batches get their own schedule.",
    },
    {
      q: "Do you also translate from English into Spanish?",
      a: "Yes, both ways: British, Irish, American, Canadian, Australian or Indian documents for procedures in Spain, and Spanish documents into English for the Home Office, USCIS, IRCC, universities or employers abroad.",
    },
  ],
  cta: {
    title: "Shall I translate your document?",
    text: "Send me a scan by WhatsApp or email and within 2 hours you will have a fixed price and a real deadline. No obligation: if it does not need a sworn translation, I will tell you.",
  },
  related: [
    { href: "/en/how-it-works", label: "How it works" },
    { href: "/en/about", label: "About me" },
    { href: "/en/sworn-translation-british-residents-spain", label: "British residents in Spain" },
    { href: "/en/sworn-translation-spain-by-country", label: "By country" },
  ],
  otherLangLabel: "Traductor jurado de inglés online",
};
