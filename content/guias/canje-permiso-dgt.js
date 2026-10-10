// content/guias/canje-permiso-dgt.js
//
// Guía 1 (10/10/2026): canje del permiso de conducir en la DGT por países,
// para quien tiene un permiso de un país de habla inglesa. Responde a
// «¿Puedo canjear mi permiso de conducir en España y qué necesito?».
// Nace de la medición en ChatGPT del 10/10: a esa pregunta el motor de
// respuestas citó solo al MAEC y a la DGT, a ningún traductor; aquí la
// tabla dice país a país si hay canje, con qué base, qué pide la DGT y si
// hace falta traducción jurada.
//
// REGLA: cada dato sale de una fuente oficial consultada el 10/10/2026
// (DGT, sede de la DGT, BOE); las fuentes van al final de la guía con su
// URL. Lo que la DGT no dice, no se escribe. La lista de documentos del
// canje es la que publica la sede de la DGT en las páginas del Reino
// Unido, de Nueva Zelanda y del grupo de países con verificación previa
// (Filipinas). La tabla de convenios de la DGT estaba actualizada a
// 26/06/2026. Precios de la oferta: content/documents.js y content/packs.js.
import { DOCUMENTS } from "../documents";
import { PACKS } from "../packs";
import { SAME_DAY_MAX_PAGES } from "../site";
import { guideById } from "./routes";

const ROUTE = guideById("canje-permiso-dgt");
const PATH_ES = ROUTE.es;
const PATH_EN = ROUTE.en;

const LICENCE_PRICE = DOCUMENTS.find((d) => d.id === "permiso-conducir").price;
const PACK = PACKS.find((p) => p.id === "driving");

// Fuentes oficiales (consultadas el 10/10/2026).
const SRC = {
  dgtCanje:
    "https://sede.dgt.gob.es/es/permisos-de-conducir/canjes-de-permisos/canjes-de-permisos-extranjeros/index.html",
  dgtConvenios:
    "https://www.dgt.es/nuestros-servicios/permisos-de-conducir/permisos-extranjeros-y-de-fuerzas-y-cuerpos-de-seguridad/canjes-de-permisos/paises-con-convenio-de-canjes/",
  dgtUk:
    "https://sede.dgt.gob.es/es/permisos-de-conducir/canjes-de-permisos/canjes-de-permisos-extranjeros/extracomunitarios/canje-paises-G1-SL-SP-UK/?pais=gb",
  dgtNz:
    "https://sede.dgt.gob.es/es/permisos-de-conducir/canjes-de-permisos/canjes-de-permisos-extranjeros/extracomunitarios/Canje-paises-G2-CL-SP/?pais=nz",
  dgtPh:
    "https://sede.dgt.gob.es/es/permisos-de-conducir/canjes-de-permisos/canjes-de-permisos-extranjeros/extracomunitarios/canje-paises-G4-CL-CP/?pais=ph",
  dgtUe:
    "https://sede.dgt.gob.es/es/permisos-de-conducir/canjes-de-permisos/canjes-de-permisos-extranjeros/canjes-inscripcion-renovacion-y-sustitucion-de-permisos-de-la-ue-y-eee/canje-de-permisos-de-la-ue-y-eee/",
  dgtSinConvenio:
    "https://sede.dgt.gob.es/es/permisos-de-conducir/canjes-de-permisos/canjes-de-permisos-extranjeros/canjes-de-paises-sin-convenio/index.html",
  dgtConducir:
    "https://www.dgt.es/nuestros-servicios/permisos-de-conducir/permisos-extranjeros-y-de-fuerzas-y-cuerpos-de-seguridad/conducir-con-un-permiso-extranjero/",
  dgtNuevo:
    "https://www.dgt.es/nuestros-servicios/permisos-de-conducir/obtener-un-nuevo-permiso-de-conducir/requisitos-preparacion-y-presentacion-a-examen/",
  boeUk: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-8050",
  boeRgc: "https://www.boe.es/buscar/act.php?id=BOE-A-2009-9481",
  checkCodeUk: "https://www.gov.uk/view-driving-licence",
  checkCodeNi:
    "https://www.nidirect.gov.uk/services/view-or-share-your-driving-licence-information",
};

const ext = (href, label) =>
  `<a href="${href}" target="_blank" rel="noopener noreferrer">${label}</a>`;
const wa = (text) => `https://wa.me/34685891214?text=${encodeURIComponent(text)}`;

const IMAGE = {
  src: "/fotos/escritorio-documentos.jpg",
  alt: {
    es: "Documentos sobre un escritorio, listos para un trámite en la DGT",
    en: "Documents on a desk, ready for a DGT procedure",
  },
};

// ---------------------------------------------------------------------------
// Español
// ---------------------------------------------------------------------------

// Celdas que se repiten en los países sin convenio.
const NO_ES = {
  canje:
    "No. No hay convenio: para seguir conduciendo después de seis meses de residencia hay que obtener un permiso español con examen teórico y práctico.",
  base: "Sin convenio (el país no está en la lista de la DGT). Artículos 21 y 22 del Reglamento General de Conductores.",
  docs: "Los de un permiso nuevo: residir en España, informe de aptitud psicofísica, tasa de examen y superar las pruebas.",
  trad: 'No para la DGT, porque no hay canje. Para conducir con tu permiso los seis primeros meses: permiso internacional (IDP) o traducción oficial del permiso (ver <a href="#traduccion">cuándo hace falta traducción jurada</a>).',
  notas:
    "Excepción: conductores profesionales contratados al menos seis meses por una empresa establecida en España, con una prueba de circulación.",
};

const COMMON_DOCS_ES =
  'La <a href="#documentos">lista común de la DGT</a> (solicitud, identidad, residencia, prueba de que no residías en España al obtener el permiso, permiso original, informe de aptitud psicofísica y tasa)';

export const es = {
  id: "canje-permiso-dgt",
  locale: "es",
  path: PATH_ES,
  alternates: { es: PATH_ES, en: PATH_EN },
  crumb: "Canje del permiso de conducir en la DGT",
  datePublished: ROUTE.datePublished,
  dateModified: ROUTE.lastModified,
  metaTitle: "Canje del permiso de conducir en la DGT por países: Reino Unido, EE. UU., Irlanda y más",
  metaDescription:
    "Qué países pueden canjear su permiso de conducir en la DGT sin examen, qué documentos pide, plazos y cuándo hace falta traducción jurada. Según DGT y BOE.",
  h1: "Puedo canjear mi permiso de conducir en España: qué dice la DGT país por país",
  image: { src: IMAGE.src, alt: IMAGE.alt.es },
  lead: [
    "Depende del país que expidió tu permiso. Si es del Reino Unido, de Gibraltar, de Nueva Zelanda o de Filipinas, la DGT lo canjea por uno español sin examen para coche y moto, porque hay convenio. Si es de Irlanda o de otro país de la Unión Europea, no hace falta canjearlo: vale en España mientras esté en vigor, y el canje es voluntario. Si es de Estados Unidos, Canadá, Australia, Sudáfrica, India, Pakistán o Nigeria, hoy no hay convenio: tu permiso sirve seis meses desde que te haces residente y después tienes que sacarte el permiso español con examen teórico y práctico.",
    "La DGT no incluye la traducción del permiso entre los documentos del canje con convenio; lo que pide es el permiso original, tu identificación y residencia, un informe médico y la tasa, y en el caso británico un código de verificación de la DVLA. La traducción jurada entra en juego cuando tu jefatura te pide un documento en inglés que no sea el propio permiso, o cuando quieres conducir con un permiso de fuera de la UE durante los seis primeros meses y no llevas permiso internacional. Toda la tabla sale de las páginas de la DGT y del BOE consultadas el 10 de octubre de 2026, enlazadas al final.",
  ],
  table: {
    id: "tabla",
    title: "Canje del permiso de conducir por países: qué dice la DGT",
    intro:
      "Doce países o territorios de habla inglesa. «Sin examen» quiere decir que la DGT canjea el permiso de coche y moto sin pruebas; los permisos de camión y autobús tienen su propia regla en cada fila. Las tasas son las que publica la DGT: 28,87 € sin pruebas y 94,05 € con pruebas.",
    caption:
      "Canje del permiso de conducir en la DGT por país emisor: si se puede canjear sin examen, base legal, documentos, traducción jurada y notas",
    head: [
      "País o territorio emisor",
      "¿Canje sin examen?",
      "Base",
      "Documentos que pide la DGT",
      "¿Traducción jurada del permiso?",
      "Notas",
    ],
    rows: [
      [
        "Reino Unido (Inglaterra, Escocia, Gales e Irlanda del Norte)",
        "Sí. Coche y moto sin pruebas. Camión y autobús también se canjean: el acuerdo dice que el canje no lleva prueba práctica ni teórica adicional, y la DGT pide el reconocimiento médico del grupo 2.",
        `Acuerdo bilateral España-Reino Unido, aplicado desde el 16 de marzo de 2023 (${ext(SRC.boeUk, "BOE de 30/03/2023")}).`,
        `${COMMON_DOCS_ES}, más el <strong>Check Code</strong> del permiso: de la ${ext(SRC.checkCodeUk, "DVLA")} si es de Gran Bretaña o de la ${ext(SRC.checkCodeNi, "DVA")} si es de Irlanda del Norte.`,
        "No figura en la lista de la DGT para el canje. Solo si tu jefatura te pide un documento adicional en inglés (un historial o un certificado de la DVLA, por ejemplo).",
        "Se canjea aunque haya caducado después de tu llegada a España. No se canjea si lo obtuviste siendo ya residente en España. Un permiso expedido después del 16/03/2023 tiene que haberse obtenido en el país donde residías legalmente.",
      ],
      [
        "Gibraltar",
        "Sí, igual que el Reino Unido: coche y moto sin pruebas.",
        `El acuerdo con el Reino Unido se aplica expresamente al territorio de Gibraltar (anexo III del ${ext(SRC.boeUk, "acuerdo")}).`,
        `${COMMON_DOCS_ES}. Para los permisos de la DVDL de Gibraltar la DGT indica que no hace falta Check Code.`,
        "No figura en la lista de la DGT para el canje.",
        "Se tramita por la misma vía que el Reino Unido en la sede de la DGT.",
      ],
      [
        "Irlanda",
        "No hace falta canjearlo: el permiso de un país de la UE vale en España mientras esté en vigor. El canje es voluntario y no lleva examen.",
        `Permisos de la Unión Europea y del Espacio Económico Europeo (${ext(SRC.dgtUe, "sede de la DGT")}).`,
        "Solicitud, identificación, certificado de registro de ciudadano de la UE o tarjeta de residencia, permiso en vigor, tasa 2.3 (28,87 €) y una fotografía en color de 32 × 26 mm.",
        "No.",
        "La edad mínima para conducir es la del permiso español equivalente. Al canjear entregas el original y recibes un permiso provisional; el definitivo llega por correo en mes y medio aproximadamente.",
      ],
      [
        "Estados Unidos",
        NO_ES.canje,
        NO_ES.base,
        NO_ES.docs,
        NO_ES.trad,
        `${NO_ES.notas} La lista de la DGT no incluye a Estados Unidos ni a ninguno de sus estados.`,
      ],
      [
        "Canadá",
        NO_ES.canje,
        NO_ES.base,
        NO_ES.docs,
        NO_ES.trad,
        `${NO_ES.notas} La lista de la DGT no incluye a Canadá ni a sus provincias.`,
      ],
      [
        "Australia",
        NO_ES.canje,
        NO_ES.base,
        NO_ES.docs,
        NO_ES.trad,
        `${NO_ES.notas} Australia no aparece en la lista de convenios de la DGT.`,
      ],
      [
        "Nueva Zelanda",
        "Sí para coche y moto (clases A y B), sin pruebas. Camión y autobús (C y D): no, el convenio no los incluye.",
        `Convenio bilateral en vigor desde el 2 de junio de 2023 (${ext(SRC.dgtConvenios, "tabla de convenios de la DGT")}).`,
        `${COMMON_DOCS_ES}. El canje va en dos fases: primero la DGT verifica el permiso con Nueva Zelanda y te envía un localizador por correo electrónico (puede tardar días o semanas); después presentas la solicitud de canje.`,
        "No figura en la lista de la DGT para el canje.",
        "Solo puedes reservar una cita de canje; si la anulas, la verificación con Nueva Zelanda se vuelve a pedir.",
      ],
      [
        "Sudáfrica",
        NO_ES.canje,
        NO_ES.base,
        NO_ES.docs,
        NO_ES.trad,
        `${NO_ES.notas} Sudáfrica no aparece en la lista de convenios de la DGT.`,
      ],
      [
        "India",
        NO_ES.canje,
        NO_ES.base,
        NO_ES.docs,
        NO_ES.trad,
        `${NO_ES.notas} India no aparece en la lista de convenios de la DGT.`,
      ],
      [
        "Filipinas",
        "Sí para coche y moto, sin pruebas. Camión y autobús: con prueba específica y de circulación (tasa 2.1, 94,05 €).",
        `Convenio bilateral en vigor desde el 21 de septiembre de 2008 (${ext(SRC.dgtConvenios, "tabla de convenios de la DGT")}).`,
        `${COMMON_DOCS_ES}. Dos fases, como Nueva Zelanda: verificación del permiso con Filipinas y después la solicitud de canje.`,
        "No figura en la lista de la DGT para el canje.",
        "Si canjeas un permiso de camión o autobús, el informe de aptitud es el del grupo 2.",
      ],
      [
        "Pakistán",
        NO_ES.canje,
        NO_ES.base,
        NO_ES.docs,
        NO_ES.trad,
        `${NO_ES.notas} Pakistán no aparece en la lista de convenios de la DGT.`,
      ],
      [
        "Nigeria",
        NO_ES.canje,
        NO_ES.base,
        NO_ES.docs,
        NO_ES.trad,
        `${NO_ES.notas} Nigeria no aparece en la lista de convenios de la DGT.`,
      ],
    ],
    after:
      "En todos los casos la DGT advierte de que no se canjea un permiso obtenido en el país de origen cuando ya eras residente legal en España. La tabla de convenios de la DGT estaba actualizada a 26 de junio de 2026; si tu país no está aquí, búscalo en esa tabla o llama al 060.",
  },
  sections: [
    {
      id: "documentos",
      title: "Qué documentos pide la DGT para el canje con convenio",
      body: [
        "Es la lista que publica la sede de la DGT para el Reino Unido, Nueva Zelanda y los demás países con convenio. Si haces el trámite por internet, la solicitud se rellena en el propio formulario y los documentos se adjuntan escaneados; si lo haces en la jefatura, con cita previa y originales.",
        {
          list: [
            "<strong>Solicitud de canje</strong> en el impreso oficial o en el formulario en línea, con la declaración de no estar privado del derecho a conducir y de no tener otro permiso de la UE o del EEE de la misma clase.",
            "<strong>Identificación</strong>: DNI, pasaporte en vigor o autorización de residencia si no eres comunitario.",
            "<strong>Acreditación de la residencia</strong>: DNI, tarjeta de identidad de extranjero (TIE) o certificado de registro de ciudadano de la UE, y cualquier otro documento que te pida la jefatura.",
            "<strong>Prueba de que no residías en España cuando obtuviste el permiso</strong>: la TIE, la tarjeta de residencia o de estudiante, o el certificado de registro de extranjeros. Si tienes DNI porque te nacionalizaste antes de venir, el certificado de inscripción y baja consular de la embajada de España en el país del permiso.",
            "<strong>Permiso de conducir original</strong>, válido y en vigor, escaneado por las dos caras si lo presentas en línea; el original se entrega en la jefatura al final del trámite.",
            "<strong>Informe de aptitud psicofísica</strong> de un Centro de Reconocimiento de Conductores: del grupo 1 si el canje no lleva pruebas (coche y moto), del grupo 2 si las lleva (camión y autobús).",
            "<strong>Tasa</strong>: 2.3 de 28,87 € sin pruebas, 2.1 de 94,05 € con pruebas. Se paga en el formulario, en la jefatura con tarjeta (nunca en metálico) o con un número de tasa comprado antes.",
            `<strong>Reino Unido</strong>: además, el Check Code de la ${ext(SRC.checkCodeUk, "DVLA")} o de la ${ext(SRC.checkCodeNi, "DVA")}, que se obtiene en línea antes de la cita. Gibraltar no lo necesita.`,
            "<strong>Nueva Zelanda y Filipinas</strong>: además, el localizador de la verificación previa del permiso con el país emisor.",
          ],
        },
      ],
    },
    {
      id: "traduccion",
      title: "Cuándo hace falta traducción jurada y cuándo no",
      body: [
        "<strong>Para el canje con convenio, la DGT no pide traducción del permiso.</strong> Ni en la página del Reino Unido, ni en la de Nueva Zelanda, ni en la del grupo de Filipinas aparece la traducción entre los documentos; lo que verifica la validez del permiso es el Check Code británico o la consulta al país emisor. Lo mismo ocurre con los permisos de la UE: Irlanda no necesita canje ni traducción.",
        "<strong>Cuando sí hace falta.</strong> La lista de la DGT termina con «cualquier otro documento que se le solicite por la Jefatura». Si tu jefatura te pide un documento en inglés que no sea el permiso (un historial de conducción, un certificado de la autoridad emisora, una carta de la DVLA), ese documento se presenta con traducción jurada. Y si tu permiso es de fuera de la UE y sin convenio (Estados Unidos, Canadá, Australia, Sudáfrica, India, Pakistán, Nigeria) y quieres conducir con él durante los seis primeros meses de residencia, el Reglamento General de Conductores exige que el permiso esté en castellano, vaya acompañado de una traducción oficial o siga los modelos de las convenciones de Ginebra o Viena. La DGT recomienda traer el permiso internacional desde tu país; si no lo tienes, la traducción jurada cumple el requisito de traducción oficial.",
        "<strong>Reino Unido durante los seis primeros meses.</strong> El acuerdo con el Reino Unido permite conducir temporalmente con el permiso británico sin permiso internacional ni traducción oficial.",
      ],
    },
    {
      id: "plazos",
      title: "Plazos: seis meses desde que eres residente",
      body: [
        "Un permiso de fuera de la UE y del EEE solo vale para conducir en España durante seis meses como máximo desde que adquieres la residencia normal. La DGT entiende por residencia normal vivir en España al menos 185 días por año natural, en situación regular. Pasado ese plazo, el permiso deja de ser válido para conducir y tienes que haberlo canjeado o, si no hay convenio, haber obtenido el permiso español.",
        "El Reglamento General de Conductores permite pedir el canje desde el momento en que tienes la residencia, sin esperar a que pasen los seis meses. Conviene empezar pronto: en los países con verificación previa (Nueva Zelanda, Filipinas) la respuesta del país emisor puede tardar semanas, y la DGT no garantiza un plazo de tramitación para las solicitudes por registro.",
        "Los permisos de la UE y del EEE no tienen este plazo: valen mientras estén en vigor.",
      ],
    },
    {
      id: "mientras-tanto",
      title: "Qué pasa con tu permiso mientras se tramita el canje",
      body: [
        "Al terminar el trámite en la jefatura entregas el permiso original y recibes un <strong>permiso provisional</strong>, válido durante seis meses y solo dentro de España; para conducir fuera necesitas el permiso internacional. El permiso definitivo llega por correo postal a tu domicilio en un mes y medio aproximadamente, y puedes consultar el estado de la tramitación en la sede de la DGT.",
        `Si haces la solicitud por internet, la DGT te avisa por correo electrónico cuando está tramitada para que vayas a la jefatura que elegiste a entregar el permiso extranjero y recoger el provisional. La DGT recomienda revisar también la carpeta de correo no deseado. Para la situación concreta de tu permiso mientras esperas, la referencia es la propia ${ext(SRC.dgtConducir, "página de la DGT sobre conducir con un permiso extranjero")}.`,
      ],
    },
    {
      id: "pasos",
      title: "Pasos del canje con cita previa",
      body: [
        {
          list: [
            "<strong>Informe de aptitud psicofísica.</strong> Pide cita en un Centro de Reconocimiento de Conductores autorizado y obtén el informe del grupo que corresponda a tu permiso.",
            "<strong>Verificación previa, si tu país la exige.</strong> Reino Unido e Irlanda del Norte: obtén el Check Code en línea. Nueva Zelanda y Filipinas: solicita en la sede de la DGT la verificación del permiso con el país emisor y espera el localizador.",
            "<strong>Solicitud.</strong> Por internet, en la sede de la DGT con certificado digital o Cl@ve, eligiendo el país emisor y la jefatura donde terminarás el trámite; o presencialmente, con cita previa pedida en línea o en el 060 (área «Canjes»). Adjunta la documentación escaneada y legible, paga la tasa y conserva el justificante.",
            "<strong>Jefatura.</strong> Cuando la DGT te avise, acude a entregar el permiso original y a recoger el provisional. Si fuiste presencialmente y todo está correcto, el canje se hace en la misma cita.",
            "<strong>Permiso definitivo.</strong> Llega por correo a casa en mes y medio aproximadamente.",
          ],
        },
        "Si otra persona lo tramita por ti, tienes que autorizarla antes en el Registro de apoderamientos de la DGT, o darle el modelo de otorgamiento de representación firmado si va en persona, y al pedir la cita hay que indicar el DNI de los dos.",
      ],
    },
    {
      id: "sin-convenio",
      title: "Sin convenio: cómo se obtiene el permiso español",
      body: [
        "Si tu permiso es de Estados Unidos, Canadá, Australia, Sudáfrica, India, Pakistán, Nigeria o de cualquier otro país que no esté en la lista de la DGT, no hay canje. Para conducir en España después de los seis meses tienes que obtener un permiso nuevo: residir en España, tener la edad exigida, no estar privado del derecho a conducir, obtener el informe de aptitud psicofísica, pagar la tasa de examen (que da derecho a dos convocatorias) y superar el examen teórico y el práctico de la clase que pidas. Lo habitual es prepararlo en una autoescuela, aunque la DGT admite presentarse por libre al teórico.",
        "Hay una excepción para conductores profesionales: si llevas al menos seis meses contratado como conductor por una empresa establecida en España, la DGT permite canjear el permiso de un país sin convenio superando una prueba de circulación en vías abiertas.",
      ],
    },
  ],
  faq: [
    {
      q: "¿Puedo conducir en España con mi permiso de Estados Unidos, Canadá o Australia?",
      a: "Durante seis meses como máximo desde que adquieres la residencia normal, siempre que el permiso esté en vigor, tengas la edad exigida en España y el permiso esté en castellano, vaya con una traducción oficial o siga los modelos de Ginebra o Viena; la DGT aconseja traer el permiso internacional desde tu país. Pasado ese plazo, como no hay convenio, tienes que obtener el permiso español con examen.",
    },
    {
      q: "¿Tengo que traducir mi permiso del Reino Unido para canjearlo?",
      a: "La lista de documentos que publica la DGT para el canje de permisos británicos no incluye la traducción del permiso: pide el original, tu identificación y residencia, la prueba de que no vivías en España al obtenerlo, el informe médico, la tasa y el Check Code de la DVLA o de la DVA. Solo necesitarás traducción jurada si tu jefatura te pide algún documento adicional en inglés.",
    },
    {
      q: "¿Qué es el Check Code y dónde lo consigo?",
      a: "Es el código con el que la DGT comprueba la validez de un permiso británico. Se obtiene en línea antes de la cita, en el servicio «View your driving licence» de la DVLA para Gran Bretaña o en el de la DVA de nidirect para Irlanda del Norte. Los permisos de la DVDL de Gibraltar no lo necesitan.",
    },
    {
      q: "¿Cuánto cuesta canjear el permiso en la DGT?",
      a: "La tasa 2.3 es de 28,87 € cuando el canje no lleva pruebas (coche y moto). La tasa 2.1, de 94,05 €, se aplica cuando hay pruebas (camión y autobús en los países que las exigen). A eso se suma el informe de aptitud psicofísica, que cobra el centro de reconocimiento.",
    },
    {
      q: "¿Cuánto tarda el canje?",
      a: "La DGT no garantiza un plazo para las solicitudes por registro. Cuando la tramita te avisa para ir a la jefatura, donde recibes el permiso provisional al momento; el definitivo llega por correo en mes y medio aproximadamente. En Nueva Zelanda y Filipinas hay que sumar la verificación con el país emisor, que puede tardar semanas.",
    },
    {
      q: "Mi permiso británico ha caducado. ¿Puedo canjearlo?",
      a: "Sí, si caducó después de tu entrada en España, según la página de la DGT para el Reino Unido. Lo que no se canjea es un permiso obtenido cuando ya eras residente legal en España.",
    },
    {
      q: "¿Puedo conducir fuera de España con el permiso provisional?",
      a: "No. El permiso provisional solo vale dentro de España. Si vas a conducir en el extranjero antes de recibir el definitivo, pide el permiso internacional en una jefatura con cita previa.",
    },
    {
      q: "Mi país no está en la tabla. ¿Dónde lo compruebo?",
      a: "En la tabla de países con convenio de canjes de la DGT, enlazada en las fuentes de esta guía, o llamando al 060. Si tu país no está en esa tabla, no hay canje y tendrás que obtener el permiso español con examen.",
    },
  ],
  offer: {
    id: "traduccion-jurada",
    title: "Si necesitas traducción jurada para el canje",
    body: [
      `Soy Elena Peñaranda Ortega, traductora jurada de inglés nombrada por el Ministerio de Asuntos Exteriores (nº 7310). Si tu jefatura te pide la traducción del permiso o de un certificado de la autoridad emisora, te la entrego en PDF con firma electrónica cualificada el mismo día (hasta ${SAME_DAY_MAX_PAGES} páginas), válida ante la DGT. Me envías una foto nítida del permiso por las dos caras o el PDF del certificado y te doy precio cerrado en menos de 2 horas laborables.`,
    ],
    facts: [
      `Permiso de conducir: ${LICENCE_PRICE} €, IVA incluido`,
      `${PACK.name.es}: ${PACK.price} € (${PACK.includes.es.toLowerCase().replace(/\.$/, "")})`,
      "PDF firmado en el día",
    ],
    whatsapp: wa("Hola Elena, necesito traducir mi permiso de conducir para canjearlo en la DGT"),
    whatsappLabel: "Enviar el permiso por WhatsApp",
    landing: {
      href: "/traduccion-jurada-permiso-conducir",
      label: "Traducción jurada del permiso de conducir",
    },
  },
  sources: {
    date: "2026-10-10",
    items: [
      { label: "DGT, sede electrónica: Canje de permisos extranjeros", href: SRC.dgtCanje },
      {
        label: "DGT: Países con los que existe tratado o convenio de canjes",
        href: SRC.dgtConvenios,
        note: "tabla actualizada por la DGT el 26/06/2026",
      },
      {
        label: "DGT, sede electrónica: Canje de permisos de países extracomunitarios: Reino Unido e Irlanda del Norte",
        href: SRC.dgtUk,
      },
      { label: "DGT, sede electrónica: Canje de permisos de países extracomunitarios: Nueva Zelanda", href: SRC.dgtNz },
      {
        label: "DGT, sede electrónica: Canje de permisos de países extracomunitarios (Filipinas y otros países con verificación previa)",
        href: SRC.dgtPh,
      },
      { label: "DGT, sede electrónica: Canje voluntario de permisos de la UE y EEE", href: SRC.dgtUe },
      { label: "DGT, sede electrónica: Canje de permisos profesionales para países sin convenio", href: SRC.dgtSinConvenio },
      {
        label: "DGT: Conducir con un permiso extranjero",
        href: SRC.dgtConducir,
        note: "página actualizada por la DGT el 13/11/2020",
      },
      {
        label: "DGT: Requisitos, preparación y presentación a examen",
        href: SRC.dgtNuevo,
        note: "página actualizada por la DGT el 09/07/2026",
      },
      {
        label: "BOE: Acuerdo en forma de Canje de Notas Verbales entre el Reino de España y el Reino Unido sobre reconocimiento recíproco y canje de permisos de conducir (BOE núm. 76, 30/03/2023)",
        href: SRC.boeUk,
      },
      {
        label: "BOE: Real Decreto 818/2009, Reglamento General de Conductores, artículos 21 y 22 (texto consolidado)",
        href: SRC.boeRgc,
      },
      { label: "DVLA: View or share your driving licence information (Check Code)", href: SRC.checkCodeUk },
      { label: "nidirect (DVA): View or share your driving licence information", href: SRC.checkCodeNi },
    ],
  },
  related: [
    { href: "/traduccion-jurada-permiso-conducir", label: "Traducción jurada del permiso de conducir" },
    { href: "/traduccion-jurada-britanicos-espana", label: "Guía para británicos en España" },
    { href: "/traduccion-jurada-por-paises", label: "Traducción jurada por países" },
    { href: "/precios", label: "Precios y packs" },
  ],
  otherLangLabel: "Exchanging a foreign driving licence in Spain, by country",
};

// ---------------------------------------------------------------------------
// English
// ---------------------------------------------------------------------------

const NO_EN = {
  exchange:
    "No. There is no agreement: to keep driving after six months of residence you must obtain a Spanish licence by passing the theory and practical tests.",
  base: "No agreement (the country is not on the DGT list). Articles 21 and 22 of Spain's General Drivers Regulation.",
  docs: "Those of a new licence: residence in Spain, a medical fitness report, the exam fee and passing the tests.",
  trad: 'Not for the DGT, because there is no exchange. To drive on your licence during the first six months: an International Driving Permit (IDP) or an official translation of the licence (see <a href="#translation">when you need a sworn translation</a>).',
  notes:
    "Exception: professional drivers employed for at least six months by a company established in Spain, after a road test.",
};

const COMMON_DOCS_EN =
  'The <a href="#documents">DGT\'s common list</a> (application, ID, proof of residence, proof that you did not live in Spain when the licence was issued, original licence, medical fitness report and fee)';

export const en = {
  id: "canje-permiso-dgt",
  locale: "en",
  path: PATH_EN,
  alternates: { es: PATH_ES, en: PATH_EN },
  crumb: "Exchanging a driving licence in Spain",
  datePublished: ROUTE.datePublished,
  dateModified: ROUTE.lastModified,
  metaTitle: "Exchange your driving licence in Spain (DGT) by country: UK, US, Ireland and more",
  metaDescription:
    "Which countries can exchange a driving licence at Spain's DGT without a test, what documents it asks for, deadlines and when a sworn translation is needed.",
  h1: "Can I exchange my driving licence in Spain? What the DGT says, country by country",
  image: { src: IMAGE.src, alt: IMAGE.alt.en },
  lead: [
    "It depends on where your licence was issued. If it is from the United Kingdom, Gibraltar, New Zealand or the Philippines, the DGT exchanges it for a Spanish one without a test for cars and motorbikes, because there is an agreement. If it is from Ireland or another EU country, you do not need to exchange it: it is valid in Spain for as long as it is in force, and the exchange is voluntary. If it is from the United States, Canada, Australia, South Africa, India, Pakistan or Nigeria, there is currently no agreement: your licence is valid for six months from the day you become a resident, and after that you must obtain a Spanish licence by passing the theory and practical tests.",
    "The DGT does not list a translation of the licence among the documents for an exchange under an agreement; it asks for the original licence, your ID and proof of residence, a medical report and the fee, and in the British case a DVLA check code. A sworn translation comes into play when your traffic office asks for a document in English other than the licence itself, or when you want to drive on a non-EU licence during the first six months and you do not carry an International Driving Permit. The whole table comes from the DGT and Official State Gazette (BOE) pages consulted on 10 October 2026, linked at the end.",
  ],
  table: {
    id: "table",
    title: "Driving licence exchange by country: what the DGT says",
    intro:
      "Twelve English-speaking countries or territories. \"Without a test\" means the DGT exchanges the car and motorbike licence with no additional tests; lorry and bus licences have their own rule in each row. Fees are the ones published by the DGT: €28.87 without tests and €94.05 with tests.",
    caption:
      "Driving licence exchange at Spain's DGT by issuing country: whether it can be exchanged without a test, legal basis, documents, sworn translation and notes",
    head: [
      "Issuing country or territory",
      "Exchange without a test?",
      "Basis",
      "Documents the DGT asks for",
      "Sworn translation of the licence?",
      "Notes",
    ],
    rows: [
      [
        "United Kingdom (England, Scotland, Wales and Northern Ireland)",
        "Yes. Cars and motorbikes with no tests. Lorry and bus licences are exchanged too: the agreement says the exchange carries no additional practical or theory test, and the DGT asks for the group 2 medical report.",
        `Bilateral Spain-UK agreement, applied since 16 March 2023 (${ext(SRC.boeUk, "BOE of 30/03/2023")}).`,
        `${COMMON_DOCS_EN}, plus the licence <strong>check code</strong>: from the ${ext(SRC.checkCodeUk, "DVLA")} for Great Britain or the ${ext(SRC.checkCodeNi, "DVA")} for Northern Ireland.`,
        "Not on the DGT's list for the exchange. Only if your traffic office asks for an additional document in English (a driving record or a DVLA certificate, for example).",
        "It can be exchanged even if it expired after you arrived in Spain. It cannot be exchanged if you obtained it while already resident in Spain. A licence issued after 16/03/2023 must have been obtained in the country where you were legally resident.",
      ],
      [
        "Gibraltar",
        "Yes, the same as the United Kingdom: cars and motorbikes with no tests.",
        `The UK agreement expressly applies to the territory of Gibraltar (Annex III of the ${ext(SRC.boeUk, "agreement")}).`,
        `${COMMON_DOCS_EN}. For licences issued by Gibraltar's DVDL the DGT states that no check code is needed.`,
        "Not on the DGT's list for the exchange.",
        "Processed through the United Kingdom route on the DGT's website.",
      ],
      [
        "Ireland",
        "No exchange needed: an EU licence is valid in Spain for as long as it is in force. The exchange is voluntary and carries no test.",
        `Licences from the European Union and the European Economic Area (${ext(SRC.dgtUe, "DGT website")}).`,
        "Application, ID, EU citizen registration certificate or residence card, licence in force, fee 2.3 (€28.87) and one colour photograph, 32 × 26 mm.",
        "No.",
        "The minimum driving age is that of the equivalent Spanish licence. You hand in the original and receive a provisional licence; the definitive one arrives by post in about a month and a half.",
      ],
      [
        "United States",
        NO_EN.exchange,
        NO_EN.base,
        NO_EN.docs,
        NO_EN.trad,
        `${NO_EN.notes} The DGT list includes neither the United States nor any of its states.`,
      ],
      [
        "Canada",
        NO_EN.exchange,
        NO_EN.base,
        NO_EN.docs,
        NO_EN.trad,
        `${NO_EN.notes} The DGT list includes neither Canada nor its provinces.`,
      ],
      [
        "Australia",
        NO_EN.exchange,
        NO_EN.base,
        NO_EN.docs,
        NO_EN.trad,
        `${NO_EN.notes} Australia is not on the DGT's list of agreements.`,
      ],
      [
        "New Zealand",
        "Yes for cars and motorbikes (classes A and B), with no tests. Lorries and buses (C and D): no, the agreement does not cover them.",
        `Bilateral agreement in force since 2 June 2023 (${ext(SRC.dgtConvenios, "DGT table of agreements")}).`,
        `${COMMON_DOCS_EN}. The exchange runs in two stages: first the DGT verifies the licence with New Zealand and emails you a reference number (this can take days or weeks); then you file the exchange application.`,
        "Not on the DGT's list for the exchange.",
        "You can book only one exchange appointment; if you cancel it, the verification with New Zealand is requested again.",
      ],
      [
        "South Africa",
        NO_EN.exchange,
        NO_EN.base,
        NO_EN.docs,
        NO_EN.trad,
        `${NO_EN.notes} South Africa is not on the DGT's list of agreements.`,
      ],
      [
        "India",
        NO_EN.exchange,
        NO_EN.base,
        NO_EN.docs,
        NO_EN.trad,
        `${NO_EN.notes} India is not on the DGT's list of agreements.`,
      ],
      [
        "Philippines",
        "Yes for cars and motorbikes, with no tests. Lorries and buses: with a specific test plus a road test (fee 2.1, €94.05).",
        `Bilateral agreement in force since 21 September 2008 (${ext(SRC.dgtConvenios, "DGT table of agreements")}).`,
        `${COMMON_DOCS_EN}. Two stages, as for New Zealand: verification of the licence with the Philippines and then the exchange application.`,
        "Not on the DGT's list for the exchange.",
        "If you exchange a lorry or bus licence, the medical report is the group 2 one.",
      ],
      [
        "Pakistan",
        NO_EN.exchange,
        NO_EN.base,
        NO_EN.docs,
        NO_EN.trad,
        `${NO_EN.notes} Pakistan is not on the DGT's list of agreements.`,
      ],
      [
        "Nigeria",
        NO_EN.exchange,
        NO_EN.base,
        NO_EN.docs,
        NO_EN.trad,
        `${NO_EN.notes} Nigeria is not on the DGT's list of agreements.`,
      ],
    ],
    after:
      "In every case the DGT warns that a licence obtained in your home country while you were already a legal resident of Spain cannot be exchanged. The DGT's table of agreements was last updated on 26 June 2026; if your country is not here, look it up in that table or call 060.",
  },
  sections: [
    {
      id: "documents",
      title: "What documents the DGT asks for in an exchange under an agreement",
      body: [
        "This is the list published on the DGT's website for the United Kingdom, New Zealand and the other countries with an agreement. If you apply online, the application is completed in the form itself and the documents are attached as scans; if you apply at a traffic office, with a prior appointment and originals.",
        {
          list: [
            "<strong>Exchange application</strong> on the official form or online, including a declaration that you are not banned from driving and do not hold another EU or EEA licence of the same class.",
            "<strong>ID</strong>: Spanish ID card, a valid passport or, for non-EU citizens, a residence permit.",
            "<strong>Proof of residence</strong>: Spanish ID card, foreigner identity card (TIE) or EU citizen registration certificate, and any other document the traffic office asks for.",
            "<strong>Proof that you did not live in Spain when the licence was issued</strong>: the TIE, the residence or student card, or the foreigners' register certificate. If you hold a Spanish ID card because you took Spanish nationality before moving, the consular registration and deregistration certificate from the Spanish embassy in the licence country.",
            "<strong>Original driving licence</strong>, valid and in force, scanned on both sides if you apply online; the original is handed in at the traffic office at the end of the procedure.",
            "<strong>Medical fitness report</strong> (informe de aptitud psicofísica) from an authorised driver assessment centre: group 1 if the exchange carries no tests (cars and motorbikes), group 2 if it does (lorries and buses).",
            "<strong>Fee</strong>: 2.3, €28.87, with no tests; 2.1, €94.05, with tests. Paid in the online form, at the traffic office by card (never cash) or with a fee number bought beforehand.",
            `<strong>United Kingdom</strong>: in addition, the check code from the ${ext(SRC.checkCodeUk, "DVLA")} or the ${ext(SRC.checkCodeNi, "DVA")}, obtained online before the appointment. Gibraltar does not need it.`,
            "<strong>New Zealand and the Philippines</strong>: in addition, the reference number from the prior verification of the licence with the issuing country.",
          ],
        },
      ],
    },
    {
      id: "translation",
      title: "When you need a sworn translation and when you do not",
      body: [
        "<strong>For an exchange under an agreement, the DGT does not ask for a translation of the licence.</strong> Neither the United Kingdom page, nor the New Zealand page, nor the page for the Philippines group lists a translation among the documents; what verifies the licence is the British check code or the query to the issuing country. The same goes for EU licences: Ireland needs neither an exchange nor a translation.",
        "<strong>When you do need one.</strong> The DGT's list ends with \"any other document requested by the traffic office\". If your office asks for a document in English other than the licence (a driving record, a certificate from the issuing authority, a DVLA letter), that document is filed with a sworn translation. And if your licence is from a non-EU country without an agreement (United States, Canada, Australia, South Africa, India, Pakistan, Nigeria) and you want to drive on it during the first six months of residence, the General Drivers Regulation requires the licence to be in Spanish, to be accompanied by an official translation, or to follow the Geneva or Vienna Convention formats. The DGT recommends bringing an International Driving Permit from your country; if you do not have one, a sworn translation meets the official translation requirement.",
        "<strong>United Kingdom during the first six months.</strong> The agreement with the UK allows you to drive temporarily on your British licence without an International Driving Permit or an official translation.",
      ],
    },
    {
      id: "deadlines",
      title: "Deadlines: six months from the day you become a resident",
      body: [
        "A licence from outside the EU and the EEA is valid for driving in Spain for a maximum of six months from the day you acquire normal residence. The DGT defines normal residence as living in Spain for at least 185 days per calendar year, with legal status. After that period the licence is no longer valid for driving, and you must have exchanged it or, where there is no agreement, obtained a Spanish licence.",
        "The General Drivers Regulation lets you apply for the exchange as soon as you have residence, without waiting for the six months to pass. It pays to start early: in countries with prior verification (New Zealand, the Philippines) the issuing country's reply can take weeks, and the DGT does not guarantee a processing time for applications filed online.",
        "EU and EEA licences have no such deadline: they are valid for as long as they are in force.",
      ],
    },
    {
      id: "meanwhile",
      title: "What happens to your licence while the exchange is processed",
      body: [
        "When you complete the procedure at the traffic office you hand in your original licence and receive a <strong>provisional licence</strong>, valid for six months and only within Spain; to drive abroad you need an International Driving Permit. The definitive licence arrives by post at your home in about a month and a half, and you can check the status of the procedure on the DGT's website.",
        `If you apply online, the DGT emails you when the application has been processed so that you go to the traffic office you chose to hand in the foreign licence and collect the provisional one. The DGT recommends checking your spam folder too. For the specific situation of your licence while you wait, the reference is the DGT's own ${ext(SRC.dgtConducir, "page on driving with a foreign licence")} (in Spanish).`,
      ],
    },
    {
      id: "steps",
      title: "Steps of the exchange with a prior appointment",
      body: [
        {
          list: [
            "<strong>Medical fitness report.</strong> Book an authorised driver assessment centre and obtain the report for the group that matches your licence.",
            "<strong>Prior verification, if your country requires it.</strong> United Kingdom and Northern Ireland: get the check code online. New Zealand and the Philippines: request the verification of the licence with the issuing country on the DGT's website and wait for the reference number.",
            "<strong>Application.</strong> Online, on the DGT's website with a digital certificate or Cl@ve, choosing the issuing country and the traffic office where you will finish the procedure; or in person, with an appointment booked online or on 060 (\"Canjes\" area). Attach legible scans, pay the fee and keep the receipt.",
            "<strong>Traffic office.</strong> When the DGT notifies you, go to hand in the original licence and collect the provisional one. If you applied in person and everything is in order, the exchange is done at the same appointment.",
            "<strong>Definitive licence.</strong> It arrives by post at home in about a month and a half.",
          ],
        },
        "If someone else files the application for you, you must authorise them first in the DGT's representatives register, or give them the signed representation form if they go in person, and when booking the appointment both ID numbers have to be given.",
      ],
    },
    {
      id: "no-agreement",
      title: "No agreement: how to obtain a Spanish licence",
      body: [
        "If your licence is from the United States, Canada, Australia, South Africa, India, Pakistan, Nigeria or any other country not on the DGT's list, there is no exchange. To drive in Spain after the six months you must obtain a new licence: be resident in Spain, meet the age requirement, not be banned from driving, obtain the medical fitness report, pay the exam fee (which covers two attempts) and pass the theory and practical tests for the class you apply for. Most people prepare at a driving school, although the DGT lets you sit the theory test independently.",
        "There is an exception for professional drivers: if you have been employed as a driver for at least six months by a company established in Spain, the DGT allows you to exchange a licence from a country without an agreement after passing a road test on open roads.",
      ],
    },
  ],
  faq: [
    {
      q: "Can I drive in Spain on my US, Canadian or Australian licence?",
      a: "For a maximum of six months from the day you acquire normal residence, provided the licence is in force, you meet the age required in Spain, and the licence is in Spanish, comes with an official translation or follows the Geneva or Vienna formats; the DGT advises bringing an International Driving Permit from your country. After that, as there is no agreement, you must obtain a Spanish licence by passing the tests.",
    },
    {
      q: "Do I have to translate my UK licence to exchange it?",
      a: "The list of documents the DGT publishes for exchanging British licences does not include a translation of the licence: it asks for the original, your ID and proof of residence, proof that you did not live in Spain when you obtained it, the medical report, the fee and the DVLA or DVA check code. You will only need a sworn translation if your traffic office asks for an additional document in English.",
    },
    {
      q: "What is the check code and where do I get it?",
      a: "It is the code the DGT uses to verify a British licence. You get it online before the appointment, from the DVLA's \"View your driving licence\" service for Great Britain or from the DVA service on nidirect for Northern Ireland. Licences issued by Gibraltar's DVDL do not need it.",
    },
    {
      q: "How much does the exchange cost at the DGT?",
      a: "Fee 2.3 is €28.87 when the exchange carries no tests (cars and motorbikes). Fee 2.1, €94.05, applies when there are tests (lorries and buses in the countries that require them). On top of that comes the medical fitness report, charged by the assessment centre.",
    },
    {
      q: "How long does the exchange take?",
      a: "The DGT does not guarantee a processing time for online applications. When it processes yours it notifies you to go to the traffic office, where you receive the provisional licence on the spot; the definitive one arrives by post in about a month and a half. For New Zealand and the Philippines, add the verification with the issuing country, which can take weeks.",
    },
    {
      q: "My British licence has expired. Can I still exchange it?",
      a: "Yes, if it expired after you entered Spain, according to the DGT's United Kingdom page. What cannot be exchanged is a licence obtained when you were already a legal resident of Spain.",
    },
    {
      q: "Can I drive outside Spain on the provisional licence?",
      a: "No. The provisional licence is valid only within Spain. If you are going to drive abroad before receiving the definitive one, apply for an International Driving Permit at a traffic office with a prior appointment.",
    },
    {
      q: "My country is not in the table. Where do I check?",
      a: "In the DGT's table of countries with exchange agreements, linked in the sources of this guide, or by calling 060. If your country is not in that table, there is no exchange and you will have to obtain a Spanish licence by passing the tests.",
    },
  ],
  offer: {
    id: "sworn-translation",
    title: "If you need a sworn translation for the exchange",
    body: [
      `I am Elena Peñaranda Ortega, sworn translator of English appointed by Spain's Ministry of Foreign Affairs (no. 7310). If your traffic office asks for a translation of the licence or of a certificate from the issuing authority, I deliver it as a PDF with a qualified electronic signature the same day (up to ${SAME_DAY_MAX_PAGES} pages), valid before the DGT. Send me a clear photo of both sides of the licence or the certificate PDF and you get a fixed price within 2 working hours.`,
    ],
    facts: [
      `Driving licence: €${LICENCE_PRICE}, VAT included`,
      `${PACK.name.en}: €${PACK.price} (${PACK.includes.en.toLowerCase().replace(/\.$/, "")})`,
      "Signed PDF the same day",
    ],
    whatsapp: wa("Hi Elena, I need my driving licence translated to exchange it at the DGT"),
    whatsappLabel: "Send my licence on WhatsApp",
    landing: {
      href: "/traduccion-jurada-permiso-conducir",
      label: "Sworn translation of a driving licence (in Spanish)",
    },
  },
  sources: {
    date: "2026-10-10",
    items: [
      { label: "DGT, e-office: Exchange of foreign licences (Canje de permisos extranjeros)", href: SRC.dgtCanje },
      {
        label: "DGT: Countries with a licence exchange treaty or agreement (Países con convenio de canjes)",
        href: SRC.dgtConvenios,
        note: "table updated by the DGT on 26/06/2026",
      },
      {
        label: "DGT, e-office: Exchange of non-EU licences: United Kingdom and Northern Ireland",
        href: SRC.dgtUk,
      },
      { label: "DGT, e-office: Exchange of non-EU licences: New Zealand", href: SRC.dgtNz },
      {
        label: "DGT, e-office: Exchange of non-EU licences (Philippines and other countries with prior verification)",
        href: SRC.dgtPh,
      },
      { label: "DGT, e-office: Voluntary exchange of EU and EEA licences", href: SRC.dgtUe },
      { label: "DGT, e-office: Exchange of professional licences from countries without an agreement", href: SRC.dgtSinConvenio },
      {
        label: "DGT: Driving with a foreign licence (Conducir con un permiso extranjero)",
        href: SRC.dgtConducir,
        note: "page updated by the DGT on 13/11/2020",
      },
      {
        label: "DGT: Requirements, preparation and sitting the driving tests",
        href: SRC.dgtNuevo,
        note: "page updated by the DGT on 09/07/2026",
      },
      {
        label: "BOE: Agreement by exchange of notes verbales between Spain and the United Kingdom on the mutual recognition and exchange of driving licences (BOE no. 76, 30/03/2023)",
        href: SRC.boeUk,
      },
      {
        label: "BOE: Royal Decree 818/2009, General Drivers Regulation, articles 21 and 22 (consolidated text)",
        href: SRC.boeRgc,
      },
      { label: "DVLA: View or share your driving licence information (check code)", href: SRC.checkCodeUk },
      { label: "nidirect (DVA): View or share your driving licence information", href: SRC.checkCodeNi },
    ],
  },
  related: [
    { href: "/en/sworn-translation-british-residents-spain", label: "British residents in Spain" },
    { href: "/en/sworn-translation-spain-by-country", label: "Sworn translation by country" },
    { href: "/en/precios", label: "Prices and packs" },
    { href: "/en/documentos", label: "Document catalogue" },
  ],
  otherLangLabel: "Canje del permiso de conducir en la DGT por países",
};
