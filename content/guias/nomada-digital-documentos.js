// content/guias/nomada-digital-documentos.js
//
// Guía 2 (10/10/2026): documentos del visado de nómada digital de España,
// con tabla documento a documento: quién lo emite, si lleva apostilla, si
// lleva traducción jurada, dónde se presenta (consulado o UGE-CE) y notas.
// Responde a «¿Qué documentos necesito para el visado de nómada digital y
// cuáles llevan apostilla y traducción jurada?». Nace de la medición en
// ChatGPT del 10/10: a esa pregunta el motor citó a Exteriores, a los
// consulados de Nueva York y Washington y a un notario de Filadelfia; no a
// Jurada Express.
//
// REGLA: cada dato sale de una fuente oficial consultada el 10/10/2026:
// las páginas «Visado de residencia para teletrabajo (nómada digital)» de
// los consulados de España en Londres, Nueva York, Washington y Los
// Ángeles (exteriores.gob.es), la página de teletrabajadores de la UGE-CE
// y sus dos documentos de requisitos (titulares y familiares,
// inclusion.gob.es) y la Ley 14/2013 (BOE). Cuando los consulados dicen
// cosas distintas, la tabla lo dice («Washington exige X; Londres no lo
// menciona»). Lo que ninguna fuente dice, no se escribe: por eso la fila
// del certificado médico dice que no aparece en las listas.
import { PACKS } from "../packs";
import { SAME_DAY_MAX_PAGES } from "../site";
import { guideById } from "./routes";

const ROUTE = guideById("nomada-digital-documentos");
const PATH_ES = ROUTE.es;
const PATH_EN = ROUTE.en;

const PACK = PACKS.find((p) => p.id === "nomad");

const CONSUL = (slug, scco, scd) =>
  `https://www.exteriores.gob.es/Consulados/${slug}/es/ServiciosConsulares/Paginas/index.aspx?scco=${scco}&scd=${scd}&scca=Visados&scs=Visados+Nacionales+-+Visado+de+residencia+para+teletrabajo+(n%c3%b3mada+digital)`;

// Fuentes oficiales (consultadas el 10/10/2026).
const SRC = {
  londres: CONSUL("londres", "Reino+Unido", 179),
  nuevayork: CONSUL("nuevayork", "Estados+Unidos", 215),
  washington: CONSUL("washington", "Estados+Unidos", 288),
  losangeles: CONSUL("losangeles", "Estados+Unidos", 180),
  uge: "https://www.inclusion.gob.es/web/unidadgrandesempresas/teletrabajadores",
  ugeTitular:
    "https://www.inclusion.gob.es/documents/d/unidadgrandesempresas/informacion-documentacion-pagina-web-titular-v2",
  ugeFamiliares:
    "https://www.inclusion.gob.es/documents/d/unidadgrandesempresas/informacion-documentacion-pagina-web-familiares-v2",
  ley: "https://www.boe.es/buscar/act.php?id=BOE-A-2013-10074",
  maecLegalizacion:
    "https://www.exteriores.gob.es/es/ServiciosAlCiudadano/Paginas/Legalizacion-y-apostilla.aspx",
};

const ext = (href, label) =>
  `<a href="${href}" target="_blank" rel="noopener noreferrer">${label}</a>`;
const wa = (text) => `https://wa.me/34685891214?text=${encodeURIComponent(text)}`;

const IMAGE = {
  src: "/fotos/expediente-nomada.jpg",
  alt: {
    es: "Expediente de visado de nómada digital con documentos, pasaporte y portátil",
    en: "Digital nomad visa file with documents, a passport and a laptop",
  },
};

// ---------------------------------------------------------------------------
// Español
// ---------------------------------------------------------------------------

const NO_INDICAN_ES = "Los consulados no lo indican en su página.";
const UGE_JURADO_ES = "UGE-CE: traducción de traductor jurado nombrado por el MAEC si no está en castellano.";

export const es = {
  id: "nomada-digital-documentos",
  locale: "es",
  path: PATH_ES,
  alternates: { es: PATH_ES, en: PATH_EN },
  crumb: "Documentos del visado de nómada digital",
  datePublished: ROUTE.datePublished,
  dateModified: ROUTE.lastModified,
  metaTitle: "Documentos para el visado de nómada digital de España: apostilla y traducción jurada",
  metaDescription:
    "Lista de documentos del visado de nómada digital, documento a documento: quién lo emite, si lleva apostilla y traducción jurada, consulado o UGE-CE.",
  h1: "Qué documentos necesito para el visado de nómada digital de España, y cuáles llevan apostilla y traducción jurada",
  image: { src: IMAGE.src, alt: IMAGE.alt.es },
  lead: [
    "Necesitas el formulario de visado, una foto, el pasaporte, el certificado de antecedentes penales de los países donde has vivido los últimos dos años (el del FBI si vives en Estados Unidos, el ACRO si vives en el Reino Unido), la prueba de tu relación laboral o profesional de al menos tres meses con una empresa de fuera de España, el certificado del registro mercantil que acredite que esa empresa lleva al menos un año en activo, tu título o tres años de experiencia, la prueba de ingresos del 200 % del salario mínimo, un seguro de enfermedad o la cobertura de la Seguridad Social, la declaración responsable de Seguridad Social y el justificante de la tasa. Si vienen familiares, sus certificados de matrimonio, pareja o nacimiento.",
    "Los documentos públicos extranjeros (antecedentes penales, certificados del registro civil, certificado del registro mercantil, título) van apostillados y, si no están en español, con traducción jurada de un traductor nombrado por el Ministerio de Asuntos Exteriores de España: es la regla que publica la UGE-CE para quien lo pide desde España, y la que los consulados de Washington y Nueva York aplican a los antecedentes penales y a los certificados de familiares. Londres y Los Ángeles no mencionan la traducción en su página, así que lee la de tu consulado. La tabla sale de esas cinco fuentes oficiales, consultadas el 10 de octubre de 2026 y enlazadas al final.",
  ],
  table: {
    id: "tabla",
    title: "Documentos del visado de nómada digital, uno a uno",
    intro:
      "Catorce filas: las trece que piden los consulados y la UGE-CE, más el certificado médico, que mucha gente busca y que no está en las listas de este visado. «Consulado» es la vía del visado desde tu país de residencia; «UGE-CE» es la Unidad de Grandes Empresas y Colectivos Estratégicos, la vía de la autorización de residencia desde España.",
    caption:
      "Documentos del visado de nómada digital de España: quién los emite, apostilla, traducción jurada, dónde se presentan y notas",
    head: [
      "Documento",
      "Quién lo emite",
      "¿Apostilla?",
      "¿Traducción jurada?",
      "Dónde se presenta",
      "Notas",
    ],
    rows: [
      [
        "Pasaporte",
        "Tu país",
        "No",
        "No: se aporta copia",
        "Consulado: original y copia de la página biométrica. UGE-CE: copia legible de todas las páginas.",
        "Consulado: validez mínima de 1 año, dos páginas en blanco y expedido hace menos de 10 años.",
      ],
      [
        "Formulario de solicitud",
        "Tú: formulario de visado nacional (consulado) o formulario MIT (UGE-CE)",
        "No",
        "No: está en español",
        "Consulado y UGE-CE",
        "Una solicitud firmada por persona; en el consulado, también una por cada familiar. Si la presenta un representante, con el poder o documento que lo acredite.",
      ],
      [
        "Fotografía",
        "Tú",
        "No",
        "No",
        "Consulado",
        "Reciente, tamaño carné, a color, fondo claro, de frente, sin gafas oscuras. La UGE-CE no la incluye en su lista.",
      ],
      [
        `Certificado de antecedentes penales de los países donde has vivido los últimos 2 años: <a href="/traduccion-jurada-antecedentes-fbi">certificado del FBI</a> en Estados Unidos, <a href="/traduccion-jurada-acro-reino-unido">certificado ACRO</a> en el Reino Unido`,
        "FBI (Estados Unidos), ACRO (Reino Unido), policía o ministerio de justicia en otros países",
        "Sí. Washington: apostilla federal del Departamento de Estado. Nueva York: apostilla de La Haya, o legalización del ministerio de exteriores del país si no es del Convenio. UGE-CE: todo documento público extranjero, legalizado o apostillado. Londres y Los Ángeles no lo mencionan en su página.",
        "Sí. Washington: traducción jurada al español. Nueva York: traducción al español (lo indica para los certificados legalizados). UGE-CE: traducción de traductor jurado nombrado por el MAEC. Londres y Los Ángeles no lo mencionan.",
        "Consulado y UGE-CE",
        "Solo mayores de edad. Va acompañado de una declaración responsable de no tener antecedentes en los últimos 5 años. Antigüedad máxima de 6 meses (Londres y Washington). Nueva York solo acepta el certificado del FBI, no los de policía local o estatal. UGE-CE: no hace falta si ya lo aportaste para una autorización en España de más de 6 meses.",
      ],
      [
        "Certificado médico",
        "No aplica",
        "No aplica",
        "No aplica",
        "No está en las listas de este visado",
        "Ninguna de las cuatro páginas consulares ni la UGE-CE lo incluye entre los documentos del visado de nómada digital. Es un requisito del visado no lucrativo, no de este.",
      ],
      [
        "Prueba de la relación laboral o profesional: certificado o carta de la empresa (cuenta ajena) o contrato con tus clientes (cuenta propia)",
        "Tu empresa o tus clientes",
        `${NO_INDICAN_ES} UGE-CE: no es documento público, así que no lleva apostilla.`,
        `${NO_INDICAN_ES} UGE-CE: basta con que lo traduzca un traductor jurado.`,
        "Consulado y UGE-CE",
        "Relación de al menos 3 meses en la fecha de la solicitud. Consulado: certificado de la empresa con la antigüedad y la autorización expresa para trabajar en remoto (o, si eres autónomo, la antigüedad de la relación y sus condiciones). UGE-CE: el contrato laboral o profesional, más una carta de la empresa con el puesto, las funciones, la declaración de que puede hacerse a distancia, el sueldo en euros y las condiciones.",
      ],
      [
        "Antigüedad de la empresa: certificado del registro mercantil u organismo equivalente",
        "Registro mercantil o secretaría de estado del país de la empresa",
        `${NO_INDICAN_ES} UGE-CE: es documento público extranjero, legalizado o apostillado.`,
        `${NO_INDICAN_ES} ${UGE_JURADO_ES}`,
        "Consulado y UGE-CE",
        "Debe reflejar al menos un año de actividad real y continuada de la empresa y el tipo de actividad. Si eres autónomo societario y propietario de tu empresa, la UGE-CE pide además la prueba de la propiedad, el último impuesto de sociedades, inversiones y el histórico de empleados.",
      ],
      [
        "Título universitario, de formación profesional o de escuela de negocios, o prueba de tres años de experiencia",
        "Universidad o centro; empleadores anteriores; Seguridad Social de tu país (vida laboral)",
        `${NO_INDICAN_ES} UGE-CE: el título es documento público, legalizado o apostillado; las cartas de empresa no.`,
        `${NO_INDICAN_ES} ${UGE_JURADO_ES}`,
        "Consulado y UGE-CE",
        "Profesión regulada: homologación del título (la UGE-CE admite, en su lugar, una declaración ante notario de que no vas a ejercerla en España). Experiencia en la UGE-CE: vida laboral del país con certificados de las empresas (fechas y funciones) o certificado de profesionalidad.",
      ],
      [
        "Prueba de ingresos: 200 % del salario mínimo interprofesional al mes para el titular, más 75 % por el primer familiar y 25 % por cada uno más",
        "Tu empresa, tus clientes y tu banco",
        "No: son documentos privados",
        `${NO_INDICAN_ES} ${UGE_JURADO_ES}`,
        "Consulado y UGE-CE",
        "Cuantías brutas; el SMI lo actualiza el Gobierno cada año. Consulado: cualquier medio de prueba (contrato, oferta firme, contrato mercantil), acreditando la titularidad y licitud de los fondos. UGE-CE: nóminas o facturas de los 3 últimos meses y certificado bancario sellado del mismo periodo con los cobros marcados; si no llegas, certificado bancario de ahorros que cubra la diferencia durante toda la autorización.",
      ],
      [
        "Seguro de enfermedad",
        "Aseguradora autorizada en España (inscrita en la Dirección General de Seguros)",
        "No",
        `${NO_INDICAN_ES} UGE-CE: traductor jurado si no está en español.`,
        "Consulado y UGE-CE",
        "Cobertura equiparable a la del sistema público. UGE-CE: no acepta seguros de viaje, de solo reembolso, con copagos ni con carencias. No hace falta si vas a afiliarte a la Seguridad Social española o si un convenio te da cobertura sanitaria (certificado de derecho de tu país).",
      ],
      [
        "Seguridad Social: certificado de legislación aplicable de tu país (si hay convenio con España) o alta en España",
        "Seguridad Social de tu país; o tu empresa (inscripción en la Seguridad Social española) y tú (afiliación o RETA)",
        "No",
        `${NO_INDICAN_ES} UGE-CE: traductor jurado.`,
        "Consulado y UGE-CE",
        "Cuenta ajena: consulado, justificante de inscripción de la empresa en la Seguridad Social española y de tu afiliación; UGE-CE, inscripción de la empresa y compromiso de alta antes de empezar. Cuenta propia: RETA. Con convenio: certificado de legislación aplicable que diga expresamente que cubre el teletrabajo desde España; la UGE-CE no acepta meras solicitudes. Consulado: además, declaración responsable de cumplir las obligaciones de Seguridad Social.",
      ],
      [
        `Familiares: <a href="/traduccion-jurada-certificado-matrimonio">certificado de matrimonio</a> o de pareja registrada y <a href="/traduccion-jurada-partida-nacimiento">certificados de nacimiento</a>`,
        "Registro civil del país",
        "Sí. Nueva York y Washington: apostilla de La Haya (o legalización si el país no es del Convenio). UGE-CE: documento público, legalizado o apostillado. Londres y Los Ángeles no lo indican.",
        "Sí. Nueva York: «traducción oficial al español». Washington: traducción jurada al español. UGE-CE: traductor jurado del MAEC. Londres y Los Ángeles no lo indican.",
        "Consulado y UGE-CE",
        "Hijos mayores de edad: prueba de dependencia económica y de estado civil. Ascendientes: prueba de estar a tu cargo. Pareja no inscrita: pruebas de un año de convivencia (UGE-CE). Cada familiar presenta también pasaporte, penales si es mayor de edad y seguro.",
      ],
      [
        "Justificante de la tasa",
        "Tú",
        "No",
        "No",
        "Consulado: tasa de visado. UGE-CE: modelo 790 038 con el justificante del pago.",
        "Washington: 190 $ en 2024, en efectivo o money order. Los Ángeles: money order. Nueva York: tabla de tasas consulares. Londres: a través de BLS.",
      ],
      [
        "Currículum",
        "Tú",
        "No",
        "No: la UGE-CE acepta traducción simple",
        "UGE-CE",
        "Es el único documento del expediente del que la UGE-CE acepta una traducción simple. Los consulados no lo piden.",
      ],
    ],
    after:
      "Para los familiares, el consulado pide además una solicitud, foto, pasaporte, penales (mayores de edad), seguro y la prueba de ingresos ampliada. La UGE-CE puede pedir en cualquier momento documentos adicionales si los presentados no bastan.",
  },
  sections: [
    {
      id: "vias",
      title: "Consulado o UGE-CE: dos vías para el mismo expediente",
      body: [
        "<strong>Desde tu país: el visado en el consulado.</strong> Lo pides en el consulado de España de la demarcación donde resides legalmente, en persona o por representante acreditado, y al mismo tiempo solicitas el NIE. El visado vale un año como máximo y acredita la residencia durante ese tiempo sin necesidad de tarjeta de identidad de extranjero. El plazo legal para resolver es de 10 días desde el día siguiente a la presentación, ampliable si piden más documentos o una entrevista; el visado se recoge en el plazo de un mes desde la notificación. Cada consulado tiene su forma de dar cita: Londres a través del centro de BLS, Nueva York por correo electrónico con los datos de cada solicitante, Los Ángeles por su sistema de citas, Washington para los residentes de Virginia, Virginia Occidental, Carolina del Norte, Maryland y el Distrito de Columbia.",
        `<strong>Desde España: la autorización de residencia en la UGE-CE.</strong> Si estás en España en situación regular, o has entrado con el visado y quieres continuar, pides la autorización de residencia para teletrabajador de carácter internacional ante la ${ext(SRC.uge, "Unidad de Grandes Empresas y Colectivos Estratégicos")} del Ministerio de Inclusión, con el formulario MIT y la tasa 790 038. La autorización tiene una vigencia máxima de tres años y se renueva por periodos de dos. Quien tiene el visado y quiere seguir en España la pide en los sesenta días naturales anteriores a que expire.`,
        "Los documentos son casi los mismos por las dos vías. Cambian el formulario, la tasa, que la UGE-CE pide el currículum y no pide foto, y que la UGE-CE publica por escrito su regla de traducción y legalización, mientras que cada consulado la aplica con su propia lista.",
      ],
    },
    {
      id: "orden",
      title: "El orden lógico: pedir los originales, apostillar, traducir",
      body: [
        {
          list: [
            "<strong>Primero los certificados con caducidad.</strong> El de antecedentes penales no puede tener más de seis meses en Londres y Washington; pídelo cuando tengas el resto del expediente encaminado. La relación con la empresa debe tener al menos tres meses y la empresa, al menos un año de actividad en la fecha de la solicitud; los ingresos de la UGE-CE son los de los tres últimos meses.",
            "<strong>Después la apostilla, sobre el original.</strong> La apostilla de La Haya (o la legalización, en países que no están en el Convenio) se pone en el país que emitió el documento: en Estados Unidos, la federal del Departamento de Estado para el certificado del FBI; en el Reino Unido, la Legalisation Office para el ACRO y los certificados del registro civil.",
            "<strong>Por último la traducción jurada, con la apostilla incluida.</strong> La traducción reproduce el documento completo, apostilla incluida, así que se hace sobre el documento ya apostillado. Para la UGE-CE tiene que firmarla un traductor jurado nombrado por el Ministerio de Asuntos Exteriores de España o, en su defecto, hacerla o revisarla una oficina consular española (con legalización posterior del Ministerio) o la del país de origen en España (apostillada o legalizada).",
            "<strong>Los documentos privados no se apostillan.</strong> Cartas y certificados de la empresa, contratos, nóminas, facturas, certificados bancarios y pólizas: para la UGE-CE basta con que los traduzca un traductor jurado; los consulados no lo mencionan.",
          ],
        },
      ],
    },
    {
      id: "consulados",
      title: "Qué dice cada consulado sobre apostilla y traducción",
      body: [
        {
          list: [
            `<strong>${ext(SRC.washington, "Washington")}</strong>: el certificado del FBI «deberá ir acompañado de Apostilla de La Haya federal (expedida por el Department of State) y una traducción jurada al español», expedido en los últimos 6 meses; los certificados de familiares, con apostilla y traducción jurada. Tasa de 190 $ en 2024.`,
            `<strong>${ext(SRC.nuevayork, "Nueva York")}</strong>: el certificado de antecedentes debe estar certificado con la apostilla de La Haya o, si el país no es del Convenio, legalizado «más traducción al español»; solo acepta certificados del FBI. Los certificados de nacimiento y matrimonio, apostillados y «con una traducción oficial al español». Cita por correo electrónico.`,
            `<strong>${ext(SRC.londres, "Londres")}</strong>: pide el certificado ACRO para los antecedentes del Reino Unido y no menciona apostilla ni traducción en la página del visado; presentación en el centro de BLS.`,
            `<strong>${ext(SRC.losangeles, "Los Ángeles")}</strong>: publica la lista de documentos sin mencionar apostilla ni traducción; cita previa por su sistema y pago con money order. Atiende el sur de California, Arizona, Colorado y Utah.`,
            `<strong>${ext(SRC.ugeTitular, "UGE-CE")}</strong>: «los documentos públicos emitidos por una autoridad extranjera deben de presentarse debidamente legalizados o apostillados» y, si no están en castellano, con «traducción realizada por traductor intérprete jurado autorizado por el Ministerio de Asuntos Exteriores». El resto de la documentación, traducida por un traductor jurado; el currículum, con traducción simple.`,
          ],
        },
        `Que una página consular no mencione la traducción no significa que no la vayan a pedir: el consulado puede requerir documentos adicionales durante la tramitación. Si tienes dudas con un documento concreto, la referencia general del Ministerio es su página de ${ext(SRC.maecLegalizacion, "legalización y apostilla")}.`,
      ],
    },
    {
      id: "errores",
      title: "Errores que retrasan el expediente",
      body: [
        {
          list: [
            "<strong>Traducir antes de apostillar.</strong> La apostilla también se traduce; si la pones después, la traducción queda incompleta.",
            "<strong>Un certificado de antecedentes caducado.</strong> Más de seis meses en Londres y Washington. Pide primero los documentos sin caducidad y deja los penales para el final.",
            "<strong>Un certificado de policía local o estatal en lugar del FBI.</strong> Nueva York lo dice expresamente: solo acepta el del FBI.",
            "<strong>Una traducción no jurada.</strong> La UGE-CE solo acepta traducciones de traductor jurado del MAEC o las vías consulares que describe; una traducción simple solo vale para el currículum.",
            "<strong>Una solicitud del certificado de cobertura en lugar del certificado.</strong> La UGE-CE no acepta «meras solicitudes» del certificado de legislación aplicable.",
            "<strong>Un seguro con copagos, carencias o de viaje.</strong> La UGE-CE los rechaza; el consulado exige una aseguradora autorizada en España con cobertura equiparable a la pública.",
            "<strong>Un pasaporte expedido hace más de diez años o con menos de un año de validez.</strong> Los consulados no lo admiten.",
          ],
        },
      ],
    },
  ],
  faq: [
    {
      q: "¿Qué documentos del visado de nómada digital llevan apostilla?",
      a: "Los documentos públicos extranjeros: el certificado de antecedentes penales (FBI, ACRO u otro), los certificados de matrimonio, pareja y nacimiento de los familiares, el certificado del registro mercantil y el título. Es la regla escrita de la UGE-CE; Washington y Nueva York la exigen expresamente para los penales y los certificados de familiares. Los documentos privados (cartas de empresa, contratos, nóminas, extractos, pólizas) no se apostillan.",
    },
    {
      q: "¿Qué documentos llevan traducción jurada?",
      a: "Para la UGE-CE, todo documento que no esté en castellano: los públicos con traducción de traductor jurado nombrado por el MAEC (o las vías consulares que describe) y el resto traducidos por un traductor jurado; solo el currículum admite traducción simple. Washington pide traducción jurada del certificado del FBI y de los certificados de familiares; Nueva York, traducción al español de los penales legalizados y traducción oficial de los certificados de familiares; Londres y Los Ángeles no lo mencionan en su página.",
    },
    {
      q: "¿Hace falta certificado médico para el visado de nómada digital?",
      a: "No aparece en las listas de documentos de los consulados de Londres, Nueva York, Washington y Los Ángeles ni en las de la UGE-CE. Es un requisito del visado no lucrativo, no de este.",
    },
    {
      q: "¿Cuánto tiempo de validez tienen los certificados?",
      a: "El de antecedentes penales, seis meses como máximo en Londres y Washington, salvo que el propio certificado indique otra caducidad. La relación con la empresa debe tener al menos tres meses y la empresa al menos un año de actividad en la fecha de la solicitud. La UGE-CE pide nóminas o facturas y certificado bancario de los tres meses anteriores.",
    },
    {
      q: "¿Es mejor pedirlo en el consulado o desde España en la UGE-CE?",
      a: "Depende de dónde estés. El consulado solo admite solicitudes de quien reside legalmente en su demarcación y concede un visado de un año como máximo. La UGE-CE atiende a quien ya está en España en situación regular y concede una autorización de residencia de hasta tres años, renovable por dos. Los documentos son casi los mismos.",
    },
    {
      q: "¿Cuánto tarda el consulado en resolver?",
      a: "El plazo legal es de 10 días desde el día siguiente a la presentación, ampliable si el consulado pide documentos adicionales o una entrevista. Una vez concedido, el visado se recoge en el plazo de un mes desde la notificación.",
    },
    {
      q: "¿Cuánto dinero tengo que acreditar?",
      a: "El 200 % del salario mínimo interprofesional al mes para el titular, más el 75 % del SMI por el primer familiar y el 25 % por cada familiar adicional, en cantidades brutas. El SMI lo fija el Gobierno cada año; comprueba la cifra vigente en la fecha de tu solicitud.",
    },
    {
      q: "¿Puedo trabajar para clientes en España?",
      a: "Si trabajas por cuenta ajena, solo para empresas situadas fuera de España. Si trabajas por cuenta propia, también para empresas en España, siempre que ese trabajo no supere el 20 % de tu actividad.",
    },
  ],
  offer: {
    id: "traduccion-jurada",
    title: "Si necesitas traducción jurada para el expediente",
    body: [
      `Soy Elena Peñaranda Ortega, traductora jurada de inglés nombrada por el Ministerio de Asuntos Exteriores (nº 7310): mis traducciones cumplen la regla de la UGE-CE y las de los consulados. Traduzco el lote completo con un solo precio cerrado y un solo plazo por escrito, apostillas incluidas, y te digo antes de empezar qué documento necesita apostilla. Cada documento llega en PDF con firma electrónica cualificada, el mismo día hasta ${SAME_DAY_MAX_PAGES} páginas.`,
    ],
    facts: [
      `${PACK.name.es}: ${PACK.price} €, IVA incluido (${PACK.includes.es.toLowerCase().replace(/\.$/, "")})`,
      "Precio cerrado en menos de 2 horas laborables",
      "PDF firmado en el día",
    ],
    whatsapp: wa("Hola Elena, estoy preparando el visado de nómada digital y necesito traducir mis documentos"),
    whatsappLabel: "Enviar los documentos por WhatsApp",
    landing: {
      href: "/traduccion-jurada-visado-nomada-digital",
      label: "Traducción jurada para el visado de nómada digital",
    },
    more: [{ href: "/traduccion-jurada-visados-espana", label: "Otros visados de España" }],
  },
  sources: {
    date: "2026-10-10",
    items: [
      { label: "Consulado General de España en Londres: Visado de residencia para teletrabajo (nómada digital)", href: SRC.londres },
      { label: "Consulado General de España en Nueva York: Visado de residencia para teletrabajo (nómada digital)", href: SRC.nuevayork },
      { label: "Embajada de España en Washington, sección consular: Visado de residencia para teletrabajo (nómada digital)", href: SRC.washington },
      { label: "Consulado General de España en Los Ángeles: Visado de residencia para teletrabajo (nómada digital)", href: SRC.losangeles },
      { label: "Ministerio de Inclusión, UGE-CE: Teletrabajadores de carácter internacional", href: SRC.uge },
      { label: "UGE-CE: Solicitudes iniciales de autorización para teletrabajadores de carácter internacional (documentación del titular)", href: SRC.ugeTitular },
      { label: "UGE-CE: Solicitudes iniciales de autorización para familiares de teletrabajadores de carácter internacional", href: SRC.ugeFamiliares },
      { label: "BOE: Ley 14/2013, de apoyo a los emprendedores y su internacionalización, artículos 74 bis a 74 quinquies (texto consolidado)", href: SRC.ley },
      { label: "Ministerio de Asuntos Exteriores: Legalización y apostilla", href: SRC.maecLegalizacion },
    ],
  },
  related: [
    { href: "/traduccion-jurada-visado-nomada-digital", label: "Traducción jurada para el visado de nómada digital" },
    { href: "/traduccion-jurada-visados-espana", label: "Visados de España" },
    { href: "/traduccion-jurada-antecedentes-fbi", label: "Certificado del FBI" },
    { href: "/traduccion-jurada-acro-reino-unido", label: "Certificado ACRO" },
    { href: "/blog/que-es-la-apostilla-de-la-haya", label: "Qué es la apostilla" },
  ],
  otherLangLabel: "Spain digital nomad visa documents checklist",
};

// ---------------------------------------------------------------------------
// English
// ---------------------------------------------------------------------------

const NOT_STATED_EN = "The consulates do not state it on their page.";
const UGE_SWORN_EN = "UGE-CE: translation by a sworn translator appointed by the Spanish Foreign Ministry if it is not in Spanish.";

export const en = {
  id: "nomada-digital-documentos",
  locale: "en",
  path: PATH_EN,
  alternates: { es: PATH_ES, en: PATH_EN },
  crumb: "Digital nomad visa documents",
  datePublished: ROUTE.datePublished,
  dateModified: ROUTE.lastModified,
  metaTitle: "Spain digital nomad visa documents checklist: apostille and sworn translation",
  metaDescription:
    "Document-by-document checklist for Spain's digital nomad visa: who issues it, whether it needs an apostille and a sworn translation, consulate or UGE-CE.",
  h1: "What documents I need for Spain's digital nomad visa, and which ones need an apostille and a sworn translation",
  image: { src: IMAGE.src, alt: IMAGE.alt.en },
  lead: [
    "You need the visa application form, a photo, your passport, the criminal record certificate from the countries where you have lived in the last two years (the FBI check if you live in the United States, the ACRO certificate if you live in the UK), proof of at least three months' employment or contractual relationship with a company outside Spain, the company registry certificate showing that the company has been active for at least a year, your degree or three years' experience, proof of income of 200% of the Spanish minimum wage, health insurance or social security cover, the social security declaration and the fee receipt. If family members come with you, their marriage, partnership or birth certificates.",
    "Foreign public documents (criminal records, civil registry certificates, the company registry certificate, the degree) need an apostille and, if they are not in Spanish, a sworn translation by a translator appointed by Spain's Ministry of Foreign Affairs: that is the written rule of the UGE-CE for applications from inside Spain, and the one the Washington and New York consulates apply to criminal records and family certificates. London and Los Angeles do not mention translation on their page, so read your consulate's. The table comes from those five official sources, consulted on 10 October 2026 and linked at the end.",
  ],
  table: {
    id: "table",
    title: "Digital nomad visa documents, one by one",
    intro:
      "Fourteen rows: the thirteen the consulates and the UGE-CE ask for, plus the medical certificate, which many people look for and which is not on the lists for this visa. \"Consulate\" is the visa route from your country of residence; \"UGE-CE\" is the Large Companies and Strategic Groups Unit, the residence authorisation route from inside Spain.",
    caption:
      "Spain digital nomad visa documents: issuer, apostille, sworn translation, where to file and notes",
    head: ["Document", "Issued by", "Apostille?", "Sworn translation?", "Where to file", "Notes"],
    rows: [
      [
        "Passport",
        "Your country",
        "No",
        "No: a copy is filed",
        "Consulate: original and a copy of the biometric page. UGE-CE: a legible copy of every page.",
        "Consulate: at least 1 year of validity, two blank pages and issued less than 10 years ago.",
      ],
      [
        "Application form",
        "You: national visa form (consulate) or MIT form (UGE-CE)",
        "No",
        "No: it is in Spanish",
        "Consulate and UGE-CE",
        "One signed application per person; at the consulate, one per family member too. If a representative files it, with the power of attorney or document proving the representation.",
      ],
      [
        "Photograph",
        "You",
        "No",
        "No",
        "Consulate",
        "Recent, passport size, in colour, light background, facing forward, no dark glasses. The UGE-CE does not include it on its list.",
      ],
      [
        `Criminal record certificate from the countries where you have lived in the last 2 years: <a href="/en/fbi-background-check-translation-spain">FBI background check</a> in the United States, <a href="/en/acro-police-certificate-translation-spain">ACRO certificate</a> in the UK`,
        "FBI (United States), ACRO (UK), police or ministry of justice in other countries",
        "Yes. Washington: federal apostille from the Department of State. New York: Hague apostille, or legalisation by the country's foreign ministry if it is not a Convention country. UGE-CE: every foreign public document, legalised or apostilled. London and Los Angeles do not mention it on their page.",
        "Yes. Washington: sworn translation into Spanish. New York: translation into Spanish (stated for legalised certificates). UGE-CE: translation by a sworn translator appointed by the Foreign Ministry. London and Los Angeles do not mention it.",
        "Consulate and UGE-CE",
        "Adults only. It comes with a sworn statement that you have no criminal record in the last 5 years. Maximum age of 6 months (London and Washington). New York accepts only the FBI check, not local or state police certificates. UGE-CE: not needed if you already filed it for a Spanish permit of more than 6 months.",
      ],
      [
        "Medical certificate",
        "Not applicable",
        "Not applicable",
        "Not applicable",
        "Not on the lists for this visa",
        "None of the four consulate pages nor the UGE-CE includes it among the digital nomad visa documents. It is a requirement of the non-lucrative visa, not of this one.",
      ],
      [
        "Proof of the employment or professional relationship: company certificate or letter (employees) or contracts with your clients (self-employed)",
        "Your company or your clients",
        `${NOT_STATED_EN} UGE-CE: it is not a public document, so no apostille.`,
        `${NOT_STATED_EN} UGE-CE: a translation by a sworn translator is enough.`,
        "Consulate and UGE-CE",
        "Relationship of at least 3 months on the application date. Consulate: company certificate with your length of service and express authorisation to work remotely (or, if self-employed, the length and terms of the relationship). UGE-CE: the employment or professional contract, plus a company letter with the position, duties, a statement that it can be done remotely, the salary in euros and the conditions.",
      ],
      [
        "Company's age: certificate from the companies registry or equivalent body",
        "Companies registry or secretary of state of the company's country",
        `${NOT_STATED_EN} UGE-CE: it is a foreign public document, legalised or apostilled.`,
        `${NOT_STATED_EN} ${UGE_SWORN_EN}`,
        "Consulate and UGE-CE",
        "It must show at least one year of real, continuous activity and the type of business. If you are a company-owning freelancer, the UGE-CE also asks for proof of ownership, the latest corporate tax return, investments and the employee history.",
      ],
      [
        "University, vocational or business school degree, or proof of three years' experience",
        "University or college; previous employers; your country's social security (employment record)",
        `${NOT_STATED_EN} UGE-CE: the degree is a public document, legalised or apostilled; employer letters are not.`,
        `${NOT_STATED_EN} ${UGE_SWORN_EN}`,
        "Consulate and UGE-CE",
        "Regulated profession: recognition of the degree (the UGE-CE accepts instead a notarised statement that you will not practise it in Spain). Experience at the UGE-CE: your country's employment record with employer certificates (dates and duties) or a certificate of professional competence.",
      ],
      [
        "Proof of income: 200% of the Spanish minimum wage per month for the applicant, plus 75% for the first family member and 25% for each additional one",
        "Your company, your clients and your bank",
        "No: private documents",
        `${NOT_STATED_EN} ${UGE_SWORN_EN}`,
        "Consulate and UGE-CE",
        "Gross amounts; the minimum wage (SMI) is updated by the Spanish government every year. Consulate: any means of proof (contract, firm job offer, commercial contract), proving the ownership and lawful origin of the funds. UGE-CE: payslips or invoices for the last 3 months and a stamped bank certificate for the same period with the payments marked; if you fall short, a bank certificate of savings covering the difference for the whole authorisation.",
      ],
      [
        "Health insurance",
        "Insurer authorised in Spain (registered with the Directorate General of Insurance)",
        "No",
        `${NOT_STATED_EN} UGE-CE: sworn translator if it is not in Spanish.`,
        "Consulate and UGE-CE",
        "Cover equivalent to the public system. UGE-CE: no travel insurance, reimbursement-only policies, co-payments or waiting periods. Not needed if you will register with Spanish social security or if a treaty gives you health cover (certificate of entitlement from your country).",
      ],
      [
        "Social security: certificate of applicable legislation from your country (if it has a treaty with Spain) or registration in Spain",
        "Your country's social security; or your company (registration with Spanish social security) and you (affiliation or RETA)",
        "No",
        `${NOT_STATED_EN} UGE-CE: sworn translator.`,
        "Consulate and UGE-CE",
        "Employees: consulate, proof of the company's registration with Spanish social security and of your affiliation; UGE-CE, company registration and a commitment to register before starting. Self-employed: RETA. With a treaty: a certificate of applicable legislation stating expressly that it covers teleworking from Spain; the UGE-CE does not accept mere applications for it. Consulate: also a sworn statement of compliance with social security obligations.",
      ],
      [
        `Family members: <a href="/traduccion-jurada-certificado-matrimonio">marriage certificate</a> or registered partnership certificate and <a href="/traduccion-jurada-partida-nacimiento">birth certificates</a> (pages in Spanish)`,
        "Civil registry of the country",
        "Yes. New York and Washington: Hague apostille (or legalisation if the country is not in the Convention). UGE-CE: public document, legalised or apostilled. London and Los Angeles do not state it.",
        "Yes. New York: \"official translation into Spanish\". Washington: sworn translation into Spanish. UGE-CE: sworn translator appointed by the Foreign Ministry. London and Los Angeles do not state it.",
        "Consulate and UGE-CE",
        "Adult children: proof of financial dependence and marital status. Parents: proof that they are your dependants. Unregistered partner: proof of one year of cohabitation (UGE-CE). Each family member also files a passport, a criminal record certificate if an adult, and insurance.",
      ],
      [
        "Fee receipt",
        "You",
        "No",
        "No",
        "Consulate: visa fee. UGE-CE: form 790 038 with the payment receipt.",
        "Washington: $190 in 2024, in cash or money order. Los Angeles: money order. New York: consular fee table. London: through BLS.",
      ],
      [
        "CV",
        "You",
        "No",
        "No: the UGE-CE accepts a plain translation",
        "UGE-CE",
        "The only document in the file for which the UGE-CE accepts a plain translation. The consulates do not ask for it.",
      ],
    ],
    after:
      "For family members the consulate also asks for an application, photo, passport, criminal record certificate (adults), insurance and the extended proof of income. The UGE-CE may ask for additional documents at any time if those filed are not enough.",
  },
  sections: [
    {
      id: "routes",
      title: "Consulate or UGE-CE: two routes for the same file",
      body: [
        "<strong>From your country: the visa at the consulate.</strong> You apply at the Spanish consulate for the district where you legally reside, in person or through an accredited representative, and you apply for the NIE at the same time. The visa is valid for one year at most and proves residence for that time without needing a foreigner identity card. The legal deadline to decide is 10 days from the day after filing, extendable if more documents or an interview are requested; the visa is collected within one month of notification. Each consulate books appointments its own way: London through the BLS centre, New York by email with each applicant's details, Los Angeles through its appointment system, Washington for residents of Virginia, West Virginia, North Carolina, Maryland and the District of Columbia.",
        `<strong>From inside Spain: the residence authorisation at the UGE-CE.</strong> If you are legally in Spain, or you entered on the visa and want to stay, you apply for the international teleworker residence authorisation at the ${ext(SRC.uge, "Large Companies and Strategic Groups Unit")} of the Ministry of Inclusion, with the MIT form and fee 790 038. The authorisation is valid for up to three years and is renewed for two-year periods. Visa holders who want to stay apply within the sixty calendar days before the visa expires.`,
        "The documents are almost the same on both routes. What changes is the form, the fee, the fact that the UGE-CE asks for a CV and not for a photo, and that the UGE-CE publishes its translation and legalisation rule in writing, while each consulate applies it with its own list.",
      ],
    },
    {
      id: "order",
      title: "The logical order: get the originals, apostille, translate",
      body: [
        {
          list: [
            "<strong>Certificates with an expiry first.</strong> The criminal record certificate cannot be older than six months in London and Washington; request it once the rest of the file is on track. The relationship with the company must be at least three months old and the company at least one year active on the application date; the UGE-CE's income proof covers the last three months.",
            "<strong>Then the apostille, on the original.</strong> The Hague apostille (or legalisation, in countries outside the Convention) is issued in the country that issued the document: in the United States, the federal one from the Department of State for the FBI check; in the UK, the Legalisation Office for the ACRO certificate and civil registry certificates.",
            "<strong>Last, the sworn translation, apostille included.</strong> The translation reproduces the whole document, apostille included, so it is made on the already apostilled document. For the UGE-CE it must be signed by a sworn translator appointed by Spain's Ministry of Foreign Affairs or, failing that, made or checked by a Spanish consular office (with later legalisation by the Ministry) or by the issuing country's consulate in Spain (apostilled or legalised).",
            "<strong>Private documents are not apostilled.</strong> Company letters and certificates, contracts, payslips, invoices, bank certificates and insurance policies: for the UGE-CE a translation by a sworn translator is enough; the consulates do not mention it.",
          ],
        },
      ],
    },
    {
      id: "consulates",
      title: "What each consulate says about apostille and translation",
      body: [
        {
          list: [
            `<strong>${ext(SRC.washington, "Washington")}</strong>: the FBI check \"must be accompanied by a federal Hague apostille (issued by the Department of State) and a sworn translation into Spanish\", issued in the last 6 months; family certificates with apostille and sworn translation. Fee $190 in 2024.`,
            `<strong>${ext(SRC.nuevayork, "New York")}</strong>: the criminal record certificate must carry the Hague apostille or, if the country is not in the Convention, be legalised \"plus a translation into Spanish\"; it accepts FBI certificates only. Birth and marriage certificates, apostilled and \"with an official translation into Spanish\". Appointments by email.`,
            `<strong>${ext(SRC.londres, "London")}</strong>: asks for the ACRO certificate for UK criminal records and does not mention apostille or translation on the visa page; filing at the BLS centre.`,
            `<strong>${ext(SRC.losangeles, "Los Angeles")}</strong>: publishes the document list without mentioning apostille or translation; appointments through its system and payment by money order. It covers southern California, Arizona, Colorado and Utah.`,
            `<strong>${ext(SRC.ugeTitular, "UGE-CE")}</strong>: \"public documents issued by a foreign authority must be filed duly legalised or apostilled\" and, if not in Spanish, with a \"translation made by a sworn translator-interpreter authorised by the Ministry of Foreign Affairs\". The rest of the documentation, translated by a sworn translator; the CV, with a plain translation.`,
          ],
        },
        `That a consulate page does not mention translation does not mean it will not be asked for: the consulate may request additional documents during processing. If in doubt about a specific document, the Ministry's general reference is its page on ${ext(SRC.maecLegalizacion, "legalisation and apostille")} (in Spanish).`,
      ],
    },
    {
      id: "mistakes",
      title: "Mistakes that delay the file",
      body: [
        {
          list: [
            "<strong>Translating before apostilling.</strong> The apostille is translated too; if you add it afterwards, the translation is incomplete.",
            "<strong>An expired criminal record certificate.</strong> Older than six months in London and Washington. Get the documents without an expiry first and leave the criminal record for last.",
            "<strong>A local or state police certificate instead of the FBI check.</strong> New York says so expressly: it accepts the FBI's only.",
            "<strong>A translation that is not sworn.</strong> The UGE-CE accepts only translations by a sworn translator appointed by the Foreign Ministry or the consular routes it describes; a plain translation is valid only for the CV.",
            "<strong>An application for the coverage certificate instead of the certificate itself.</strong> The UGE-CE does not accept \"mere applications\" for the certificate of applicable legislation.",
            "<strong>Insurance with co-payments, waiting periods or travel cover.</strong> The UGE-CE rejects them; the consulate requires an insurer authorised in Spain with cover equivalent to the public system.",
            "<strong>A passport issued more than ten years ago or with less than a year's validity.</strong> The consulates do not accept it.",
          ],
        },
      ],
    },
  ],
  faq: [
    {
      q: "Which digital nomad visa documents need an apostille?",
      a: "Foreign public documents: the criminal record certificate (FBI, ACRO or other), the family members' marriage, partnership and birth certificates, the companies registry certificate and the degree. That is the UGE-CE's written rule; Washington and New York require it expressly for criminal records and family certificates. Private documents (company letters, contracts, payslips, statements, policies) are not apostilled.",
    },
    {
      q: "Which documents need a sworn translation?",
      a: "For the UGE-CE, every document that is not in Spanish: public documents translated by a sworn translator appointed by the Foreign Ministry (or the consular routes it describes) and the rest translated by a sworn translator; only the CV may have a plain translation. Washington asks for a sworn translation of the FBI check and of family certificates; New York, a translation into Spanish of legalised criminal records and an official translation of family certificates; London and Los Angeles do not mention it on their page.",
    },
    {
      q: "Do I need a medical certificate for the digital nomad visa?",
      a: "It does not appear on the document lists of the London, New York, Washington and Los Angeles consulates or of the UGE-CE. It is a requirement of the non-lucrative visa, not of this one.",
    },
    {
      q: "How long are the certificates valid for?",
      a: "The criminal record certificate, six months at most in London and Washington, unless the certificate itself states a different expiry. The relationship with the company must be at least three months old and the company at least one year active on the application date. The UGE-CE asks for payslips or invoices and a bank certificate for the previous three months.",
    },
    {
      q: "Is it better to apply at the consulate or from Spain at the UGE-CE?",
      a: "It depends on where you are. The consulate only accepts applications from people legally resident in its district and issues a visa of one year at most. The UGE-CE serves people already legally in Spain and issues a residence authorisation of up to three years, renewable for two. The documents are almost the same.",
    },
    {
      q: "How long does the consulate take to decide?",
      a: "The legal deadline is 10 days from the day after filing, extendable if the consulate asks for additional documents or an interview. Once granted, the visa is collected within one month of notification.",
    },
    {
      q: "How much income do I have to prove?",
      a: "200% of the Spanish minimum wage (SMI) per month for the applicant, plus 75% of the SMI for the first family member and 25% for each additional one, in gross amounts. The SMI is set by the government every year; check the figure in force on your application date.",
    },
    {
      q: "Can I work for clients in Spain?",
      a: "If you are an employee, only for companies located outside Spain. If you are self-employed, also for companies in Spain, as long as that work does not exceed 20% of your activity.",
    },
  ],
  offer: {
    id: "sworn-translation",
    title: "If you need sworn translations for the file",
    body: [
      `I am Elena Peñaranda Ortega, sworn translator of English appointed by Spain's Ministry of Foreign Affairs (no. 7310): my translations meet the UGE-CE rule and the consulates'. I translate the whole batch with a single fixed price and a single written deadline, apostilles included, and I tell you before starting which document needs an apostille. Each document arrives as a PDF with a qualified electronic signature, the same day for up to ${SAME_DAY_MAX_PAGES} pages.`,
    ],
    facts: [
      `${PACK.name.en}: €${PACK.price}, VAT included (${PACK.includes.en.toLowerCase().replace(/\.$/, "")})`,
      "Fixed price within 2 working hours",
      "Signed PDF the same day",
    ],
    whatsapp: wa("Hi Elena, I am preparing my digital nomad visa and need my documents translated"),
    whatsappLabel: "Send my documents on WhatsApp",
    landing: {
      href: "/en/sworn-translation-spain-digital-nomad-visa",
      label: "Sworn translation for the digital nomad visa",
    },
    more: [{ href: "/en/sworn-translations-spanish-visas", label: "Other Spanish visas" }],
  },
  sources: {
    date: "2026-10-10",
    items: [
      { label: "Consulate General of Spain in London: Residence visa for international teleworking (digital nomad)", href: SRC.londres },
      { label: "Consulate General of Spain in New York: Residence visa for international teleworking (digital nomad)", href: SRC.nuevayork },
      { label: "Embassy of Spain in Washington, consular section: Residence visa for international teleworking (digital nomad)", href: SRC.washington },
      { label: "Consulate General of Spain in Los Angeles: Residence visa for international teleworking (digital nomad)", href: SRC.losangeles },
      { label: "Ministry of Inclusion, UGE-CE: International teleworkers", href: SRC.uge },
      { label: "UGE-CE: Initial applications for international teleworker authorisation (applicant's documentation)", href: SRC.ugeTitular },
      { label: "UGE-CE: Initial applications for family members of international teleworkers", href: SRC.ugeFamiliares },
      { label: "BOE: Law 14/2013 on support for entrepreneurs, articles 74 bis to 74 quinquies (consolidated text)", href: SRC.ley },
      { label: "Ministry of Foreign Affairs: Legalisation and apostille", href: SRC.maecLegalizacion },
    ],
  },
  related: [
    { href: "/en/sworn-translation-spain-digital-nomad-visa", label: "Sworn translation for the digital nomad visa" },
    { href: "/en/sworn-translations-spanish-visas", label: "Spanish visas" },
    { href: "/en/fbi-background-check-translation-spain", label: "FBI background check" },
    { href: "/en/acro-police-certificate-translation-spain", label: "ACRO police certificate" },
    { href: "/en/sworn-translation-usa-spain", label: "Coming from the United States" },
  ],
  otherLangLabel: "Documentos para el visado de nómada digital de España",
};
