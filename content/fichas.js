// content/fichas.js
//
// Datos de las fichas de documento (/traduccion-jurada-*). Cada ficha sigue
// el patrón de la auditoría (5.2): para qué trámites, apostilla sí/no,
// precio desde (de content/documents.js), plazo, cómo enviarlo y FAQ propia
// de 3 preguntas. La plantilla que las pinta es
// app/components/DocumentPage.js.
import { DOCUMENTS } from "./documents";

const priceOf = (id) => DOCUMENTS.find((d) => d.id === id)?.price ?? null;

export const FICHAS = [
  {
    slug: "traduccion-jurada-partida-nacimiento",
    name: "Traducción jurada de partida de nacimiento",
    title: "Traducción Jurada de Partida de Nacimiento – Español-Inglés",
    description:
      "Traducción jurada de partida o certificado de nacimiento Español ⇆ Inglés, válida ante Registro Civil, Extranjería y consulados. Desde 35 €, entrega en 24/48 h.",
    intro:
      "La partida de nacimiento es el documento que más veces he traducido: la piden para la nacionalidad, para casarse, para el NIE de un hijo o para inscribir en España un nacimiento ocurrido fuera. La traduzco en ambos sentidos, con mi firma y sello, y te la entrego lista para presentar.",
    price: priceOf("partida-nacimiento"),
    time: "24/48 h",
    tramites: [
      "Nacionalidad española por residencia u opción",
      "Matrimonio civil y parejas de hecho",
      "NIE, TIE y reagrupación familiar",
      "Inscripción de nacimientos en el Registro Civil",
      "Visados y trámites consulares en Reino Unido",
    ],
    apostilla: {
      verdict: "Depende del organismo",
      text: "Para nacionalidad y Registro Civil, sí: apostilla primero el certificado en el país de origen y después lo traduzco todo, apostilla incluida. Para otros trámites basta el certificado; confírmalo con tu oficina o pregúntame y lo miro contigo.",
    },
    envio:
      "Mándame un escaneo o una foto nítida por WhatsApp o email — se tiene que leer bien el texto y los sellos. Si el certificado es plurilingüe (formato internacional), dímelo: quizá ni siquiera necesites traducción y te lo diré antes de cobrarte nada.",
    faq: [
      {
        q: "¿Sirve la traducción para el Registro Civil?",
        a: "Sí. Las traducciones juradas firmadas y selladas por traductor jurado nombrado por el MAEC se aceptan en cualquier Registro Civil de España.",
      },
      {
        q: "¿Tengo que enviarte el documento original?",
        a: "No. Trabajo sobre el escaneo; la normativa exige adjuntar a la traducción una copia del documento tal y como me lo entregas, no el original.",
      },
      {
        q: "Mi partida es del Reino Unido, ¿me la traduces igual?",
        a: "Sí, traduzco certificados del GRO (Inglaterra y Gales), de Escocia e Irlanda del Norte a diario, con su apostilla si la lleva.",
      },
    ],
    related: [
      {
        href: "/traduccion-jurada-certificado-penales",
        label: "Certificado de antecedentes penales",
      },
      {
        href: "/traduccion-jurada-certificado-matrimonio",
        label: "Certificado de matrimonio",
      },
    ],
  },
  {
    slug: "traduccion-jurada-certificado-matrimonio",
    name: "Traducción jurada de certificado de matrimonio",
    title: "Traducción Jurada de Certificado de Matrimonio – Español-Inglés",
    description:
      "Traducción jurada del certificado de matrimonio Español ⇆ Inglés para Registro Civil, residencia, pensiones y trámites en Reino Unido. Desde 35 €, entrega en 24/48 h.",
    intro:
      "El certificado de matrimonio aparece en más trámites de los que parece: inscribir en España un matrimonio celebrado fuera, pedir la residencia como cónyuge, cambiar el estado civil ante el HMRC británico o reclamar una pensión de viudedad. Lo traduzco con firma y sello para que lo presentes sin vueltas.",
    price: priceOf("certificado-matrimonio"),
    time: "24/48 h",
    tramites: [
      "Inscripción del matrimonio en el Registro Civil",
      "Residencia y tarjeta de familiar de ciudadano de la UE",
      "Pensiones de viudedad y seguros",
      "Cambios de estado civil ante organismos británicos",
      "Divorcios y separaciones con elemento internacional",
    ],
    apostilla: {
      verdict: "Sí, en la mayoría de los casos",
      text: "El Registro Civil y Extranjería suelen pedir el certificado apostillado. Apostíllalo en el país donde se celebró el matrimonio y después me lo envías: la traducción incluye la apostilla sin coste adicional si viene en la misma página.",
    },
    envio:
      "Escaneo o foto nítida por WhatsApp o email, con los sellos y la apostilla visibles. Si tu certificado es el formulario plurilingüe del Convenio de Viena, consúltame antes: puede que no necesite traducción.",
    faq: [
      {
        q: "Nos casamos en Gibraltar / Reino Unido, ¿qué necesito?",
        a: "El certificado apostillado y su traducción jurada. Con eso el Registro Civil español puede inscribir el matrimonio.",
      },
      {
        q: "¿La traducción caduca?",
        a: "La traducción en sí no caduca, pero muchos organismos piden que el certificado tenga menos de 3-6 meses. Pide el certificado reciente y tradúcelo después.",
      },
      {
        q: "¿Podéis traducir también la sentencia de divorcio?",
        a: "Sí. Las sentencias se presupuestan por extensión: envíamela y te doy precio cerrado en menos de 2 horas.",
      },
    ],
    related: [
      {
        href: "/traduccion-jurada-partida-nacimiento",
        label: "Partida de nacimiento",
      },
      {
        href: "/traduccion-jurada-britanicos-espana",
        label: "Guía para británicos en España",
      },
    ],
  },
  {
    slug: "traduccion-jurada-certificado-penales",
    name: "Traducción jurada de certificado de antecedentes penales",
    title: "Traducción Jurada de Antecedentes Penales – Español-Inglés",
    description:
      "Traducción jurada del certificado de antecedentes penales (ACRO, DBS o Ministerio de Justicia) para extranjería, nacionalidad, visados y empleo. Desde 35 €, entrega en 24/48 h.",
    intro:
      "El certificado de penales es imprescindible en casi cualquier expediente de extranjería o nacionalidad, y también te lo pedirán para trabajar con menores o solicitar un visado. Traduzco tanto el certificado español del Ministerio de Justicia como los británicos (ACRO Police Certificate, DBS check), siempre con firma y sello.",
    price: priceOf("antecedentes-penales"),
    time: "24/48 h",
    tramites: [
      "Residencia, arraigo y nacionalidad en España",
      "Visados de trabajo y estudios (España y Reino Unido)",
      "Ofertas de empleo y trabajo con menores",
      "Adopciones y acogimientos",
      "Licencias de armas y oposiciones",
    ],
    apostilla: {
      verdict: "Sí",
      text: "Extranjería y nacionalidad exigen el certificado apostillado. El ACRO británico se apostilla en la Legalisation Office del FCDO; el español, en el Ministerio de Justicia. Después me lo envías y traduzco certificado y apostilla juntos.",
    },
    envio:
      "PDF oficial o escaneo nítido por WhatsApp o email. El ACRO llega por correo en papel: escanéalo entero, incluida la página de la apostilla. Estos certificados suelen tener vigencia de 3 meses, así que pídelo cuando ya tengas fecha para tu trámite.",
    faq: [
      {
        q: "¿Traduces el ACRO Police Certificate?",
        a: "Sí, es de los documentos que más traduzco para expedientes de residencia de británicos. En 24 h lo tienes firmado y sellado.",
      },
      {
        q: "¿Cuánto tarda en caducar?",
        a: "La mayoría de las oficinas de Extranjería aceptan certificados con menos de 3 meses desde su expedición. Calcula los plazos antes de pedirlo.",
      },
      {
        q: "¿Me sirve el certificado digital con CSV?",
        a: "Sí. El certificado español descargado con certificado digital es válido; lo traduzco con su código seguro de verificación incluido.",
      },
    ],
    related: [
      {
        href: "/traduccion-jurada-partida-nacimiento",
        label: "Partida de nacimiento",
      },
      {
        href: "/traduccion-jurada-britanicos-espana",
        label: "Guía para británicos en España",
      },
    ],
  },
  {
    slug: "traduccion-jurada-titulo-universitario",
    name: "Traducción jurada de título universitario",
    title: "Traducción Jurada de Título Universitario – Español-Inglés",
    description:
      "Traducción jurada del título universitario y del expediente académico para UCAS, universidades británicas, homologación y colegiación. Título desde 50 €, entrega en 24/48 h.",
    intro:
      "Traduzco títulos y expedientes en los dos sentidos: el título español para estudiar o trabajar en Reino Unido, y el degree británico para homologarlo o colegiarte en España. El formato importa: respeto la estructura del original para que el evaluador encuentre cada dato donde lo espera.",
    price: priceOf("titulo-universitario"),
    time: "24/48 h",
    tramites: [
      "Admisión en universidades británicas (UCAS y másteres)",
      "Homologación y equivalencia de títulos extranjeros en España",
      "Colegiación profesional (medicina, enfermería, arquitectura…)",
      "Oposiciones y bolsas de trabajo",
      "Becas y programas de intercambio",
    ],
    apostilla: {
      verdict: "Depende del destino",
      text: "Para homologar un título extranjero en España, sí: apostíllalo en su país de origen. Para enviar tu título español a una universidad británica, normalmente basta la traducción jurada sin apostilla — cada universidad lo indica en sus requisitos.",
    },
    envio:
      "Escaneo del título por ambas caras y, si lo necesitas, el expediente completo en PDF. El título tiene precio fijo por página; el expediente se presupuesta por extensión: mándamelo y en menos de 2 horas tienes precio cerrado.",
    faq: [
      {
        q: "¿Cuánto cuesta traducir el expediente académico?",
        a: "Depende del número de páginas y asignaturas. Envíamelo escaneado y te paso presupuesto cerrado en menos de 2 horas.",
      },
      {
        q: "¿Las universidades británicas aceptan tu traducción?",
        a: "Sí. Piden una 'certified translation' con los datos del traductor, y la traducción jurada española los incluye con firma y sello.",
      },
      {
        q: "¿Necesito traducir también el suplemento europeo al título?",
        a: "Solo si el organismo lo pide expresamente. Muchos trámites se resuelven con título y expediente; confírmalo antes para no pagar de más.",
      },
    ],
    related: [
      {
        href: "/traduccion-jurada-espanol-ingles",
        label: "Traducción jurada español-inglés",
      },
      {
        href: "/precios",
        label: "Precios orientativos",
      },
    ],
  },
  {
    slug: "traduccion-jurada-contrato-escritura",
    name: "Traducción jurada de contrato o escritura",
    title: "Traducción Jurada de Contratos y Escrituras – Español-Inglés",
    description:
      "Traducción jurada de contratos, escrituras, poderes notariales y estatutos Español ⇆ Inglés para notarías, empresas y compraventas. Presupuesto cerrado en menos de 2 h.",
    intro:
      "Contratos de compraventa, poderes notariales, escrituras de constitución, estatutos: son documentos largos y técnicos donde un matiz mal traducido puede costar caro. Los traduzco con terminología jurídica precisa y te entrego un documento con la misma estructura que el original, firmado y sellado.",
    price: null,
    priceNote: "presupuesto cerrado en menos de 2 h",
    time: "Según extensión (te doy fecha exacta con el presupuesto)",
    tramites: [
      "Compraventa de vivienda ante notario",
      "Poderes notariales otorgados en Reino Unido o España",
      "Constitución de sociedades y estatutos",
      "Contratos mercantiles y laborales",
      "Herencias con bienes en los dos países",
    ],
    apostilla: {
      verdict: "Sí en documentos notariales",
      text: "Los poderes y escrituras otorgados ante notario extranjero necesitan apostilla para surtir efecto en España (y viceversa). Los contratos privados entre particulares o empresas, no.",
    },
    envio:
      "PDF completo del documento, incluidas las páginas de firmas y la apostilla si la lleva. Cuento las palabras, te paso presupuesto cerrado y fecha exacta de entrega en menos de 2 horas — sin sorpresas al final.",
    faq: [
      {
        q: "¿Cómo se calcula el precio?",
        a: "Por extensión y complejidad del documento. Siempre es un precio cerrado que conoces antes de encargar, nunca una tarifa abierta por palabra que crece sola.",
      },
      {
        q: "¿Puedes traducir solo una parte de la escritura?",
        a: "Sí, si el organismo lo acepta: se hace una traducción parcial indicando qué páginas comprende. Confírmalo antes con quien te la pide.",
      },
      {
        q: "¿Trabajáis con notarías y despachos?",
        a: "Sí, colaboro con notarías, gestorías y despachos que necesitan traducciones juradas recurrentes, con facturación mensual si os resulta más cómodo.",
      },
    ],
    related: [
      {
        href: "/traduccion-jurada-testamento-herencia",
        label: "Testamento y herencia",
      },
      {
        href: "/traduccion-jurada-britanicos-espana",
        label: "Guía para británicos en España",
      },
    ],
  },
  {
    slug: "traduccion-jurada-espanol-ingles",
    name: "Traducción jurada español-inglés e inglés-español",
    title: "Traducción Jurada Español-Inglés e Inglés-Español",
    description:
      "Traducción jurada en ambos sentidos, español-inglés e inglés-español, por traductora jurada del MAEC (nº 7310). Validez oficial, entrega en 24/48 h y presupuesto en minutos.",
    intro:
      "Estoy habilitada por el MAEC para traducir en los dos sentidos: del español al inglés y del inglés al español. Es la misma acreditación, el mismo sello y la misma validez oficial, así que puedes resolver con una sola traductora el expediente completo aunque mezcle documentos de los dos países.",
    price: priceOf("partida-nacimiento"),
    priceLabel: "certificados desde",
    time: "24/48 h en documentos habituales",
    tramites: [
      "Expedientes de nacionalidad y extranjería en España",
      "Visados y trámites ante autoridades británicas (UKVI, HMRC…)",
      "Estudios: títulos y expedientes en ambos sentidos",
      "Empresas con actividad en España y Reino Unido",
      "Cualquier documento oficial entre ambos idiomas",
    ],
    apostilla: {
      verdict: "Depende del documento",
      text: "La apostilla no depende del idioma sino del tipo de documento y del organismo de destino. En cada ficha de documento de esta web te digo si la lleva; si dudas, pregúntame con el documento delante.",
    },
    envio:
      "Escaneo o foto nítida por WhatsApp o email, indicando el sentido de la traducción y para qué trámite la necesitas. Con eso te confirmo precio cerrado y plazo en menos de 2 horas.",
    faq: [
      {
        q: "¿Vale el mismo sello para los dos sentidos?",
        a: "Sí. El nombramiento del MAEC habilita para traducir del inglés al español y del español al inglés con idéntica validez oficial.",
      },
      {
        q: "¿Los organismos británicos aceptan la traducción jurada española?",
        a: "Sí. El UKVI y las universidades piden una 'certified translation' con los datos del traductor, y la traducción jurada los incluye de serie.",
      },
      {
        q: "¿Puedes jurar una traducción que ya tengo hecha?",
        a: "No exactamente: la responsabilidad es del traductor jurado, así que reviso el texto completo contra el original y lo certifico solo si respondo de cada frase. El precio es algo menor que traducir de cero.",
      },
    ],
    related: [
      {
        href: "/traduccion-jurada-validez-oficial",
        label: "Validez ante organismos oficiales",
      },
      { href: "/documentos", label: "Catálogo de documentos" },
    ],
  },
  {
    slug: "traduccion-jurada-validez-oficial",
    name: "Validez oficial de la traducción jurada",
    title: "Traducción Jurada Válida ante Organismos Oficiales y Consulados",
    description:
      "Por qué la traducción jurada tiene validez oficial ante ministerios, universidades, registros y consulados, cómo se verifica y cuándo vale el PDF firmado digitalmente.",
    intro:
      "Una traducción jurada no es una traducción 'muy buena': es un documento oficial. Mi firma y mi sello, con el nº 7310 del MAEC, certifican que la traducción es fiel y completa, y eso es lo que la hace válida ante cualquier organismo. Aquí te explico cómo funciona esa validez y cómo se comprueba.",
    price: priceOf("partida-nacimiento"),
    priceLabel: "certificados desde",
    time: "24/48 h en documentos habituales",
    tramites: [
      "Ministerios, ayuntamientos y comunidades autónomas",
      "Universidades y homologación de títulos",
      "Registros civiles, mercantiles y de la propiedad",
      "Notarías y juzgados",
      "Consulados y embajadas",
    ],
    apostilla: {
      verdict: "No la lleva la traducción",
      text: "La apostilla se pone en el documento original, nunca en la traducción jurada: la traducción ya es oficial por sí misma gracias a la firma y el sello del traductor. Lo que sí hago es traducir la apostilla junto con tu documento.",
    },
    envio:
      "Como con cualquier encargo: escaneo nítido por WhatsApp o email, y te digo precio y plazo en menos de 2 horas. Si el organismo te ha dado requisitos por escrito, reenvíamelos y los reviso contigo.",
    faq: [
      {
        q: "¿Cómo comprueba un funcionario que mi traducción es válida?",
        a: "Buscando mi número (7310) en el listado público de traductores jurados del MAEC y, en el PDF, verificando la firma electrónica con un clic.",
      },
      {
        q: "¿El PDF firmado digitalmente vale igual que el papel?",
        a: "Sí. El Ministerio avaló la firma electrónica del traductor jurado y la administración lo acepta de forma generalizada. Si un organismo concreto pide papel, te envío el original por mensajería.",
      },
      {
        q: "¿Caduca la validez de una traducción jurada?",
        a: "No, la traducción no caduca. Lo que puede caducar es el documento original (penales, empadronamiento…): revisa su vigencia antes de presentarlo.",
      },
    ],
    related: [
      {
        href: "/traduccion-jurada-espanol-ingles",
        label: "Traducción jurada español-inglés",
      },
      { href: "/como-funciona", label: "Cómo funciona el proceso" },
    ],
  },
  {
    slug: "traduccion-jurada-permiso-conducir",
    name: "Traducción jurada del permiso de conducir",
    title: "Traducción Jurada del Permiso de Conducir – Español-Inglés",
    description:
      "Traducción jurada del permiso de conducir británico o español para el canje en la DGT o la DVLA. Desde 40 €, entrega en 24 h, normalmente sin apostilla.",
    intro:
      "Desde el acuerdo posterior al Brexit, los residentes británicos pueden canjear su permiso en la DGT — y en ese expediente aparece a menudo la traducción jurada del permiso o de los certificados de la DVLA. Es un documento corto: lo tienes traducido, firmado y sellado en 24 horas.",
    price: priceOf("permiso-conducir"),
    time: "24 h",
    tramites: [
      "Canje del permiso británico en la DGT",
      "Certificados de la DVLA (entitlement, check codes)",
      "Canje de permisos de otros países anglófonos",
      "Seguros y partes de accidente internacionales",
      "Alquiler de vehículos y gestiones con ayuntamientos",
    ],
    apostilla: {
      verdict: "Normalmente no",
      text: "La DGT no suele pedir apostilla para el permiso ni para los certificados de la DVLA. Si tu oficina la exigiera, la traducción la incluiría sin coste extra al venir en el mismo documento.",
    },
    envio:
      "Foto nítida del permiso por las dos caras, o el PDF del certificado de la DVLA. Al ser un documento breve, suelo entregarlo el mismo día si me llega por la mañana.",
    faq: [
      {
        q: "¿Necesito cita en la DGT antes de traducir?",
        a: "No hace falta: la traducción no caduca. Pero como el resto del expediente sí tiene plazos, muchos clientes la piden cuando ya tienen la cita.",
      },
      {
        q: "¿Traduces también el certificado de la DVLA?",
        a: "Sí, tanto el 'check code' impreso como las cartas de la DVLA sobre tu entitlement. Cuentan como documento aparte del permiso.",
      },
      {
        q: "¿Sirve para conducir mientras tanto?",
        a: "La traducción acompaña al expediente de canje; los periodos en los que puedes conducir con tu permiso extranjero los fija la DGT, no la traducción.",
      },
    ],
    related: [
      {
        href: "/traduccion-jurada-britanicos-espana",
        label: "Guía para británicos en España",
      },
      { href: "/documentos", label: "Catálogo de documentos" },
    ],
  },
  {
    slug: "traduccion-jurada-certificado-empresa",
    name: "Traducción jurada de certificado de empresa o nómina",
    title: "Traducción Jurada de Certificado de Empresa y Nóminas – Español-Inglés",
    description:
      "Traducción jurada de certificados de empresa, nóminas, contratos laborales y vidas laborales para visados, hipotecas y pensiones. Desde 45 €, entrega en 24/48 h.",
    intro:
      "Los documentos laborales se piden para más cosas de las que imaginas: un visado de trabajo, una hipoteca con ingresos en otro país, una pensión con años cotizados en Reino Unido. Traduzco certificados de empresa, nóminas, vidas laborales y cartas del HMRC o del DWP con firma y sello.",
    price: priceOf("certificado-empresa"),
    time: "24/48 h",
    tramites: [
      "Visados de trabajo (España y Reino Unido)",
      "Hipotecas y alquileres con ingresos extranjeros",
      "Pensiones con cotizaciones en los dos países",
      "Prestaciones y vida laboral internacional",
      "Justificación de ingresos ante Extranjería",
    ],
    apostilla: {
      verdict: "Normalmente no",
      text: "Los documentos laborales privados (nóminas, certificados de empresa) no llevan apostilla. Las cartas oficiales del HMRC o del DWP, según el organismo español de destino — pregúntame con la carta delante y te lo confirmo.",
    },
    envio:
      "PDF o foto nítida de cada documento. Si son varias nóminas, envíalas juntas: agrupo el encargo y el precio por documento baja. Presupuesto cerrado en menos de 2 horas.",
    faq: [
      {
        q: "¿Cuentan tres nóminas como tres documentos?",
        a: "Sí, pero al ir juntas el precio total es menor que por separado. Envíame el lote completo y te paso un único presupuesto cerrado.",
      },
      {
        q: "¿Traduces la vida laboral española al inglés?",
        a: "Sí, es habitual para hipotecas y pensiones en Reino Unido. El informe de la Seguridad Social con CSV es perfectamente válido.",
      },
      {
        q: "¿El banco aceptará la traducción?",
        a: "Sí. Los bancos piden traducción oficial de los justificantes de ingresos extranjeros, y la traducción jurada lo es.",
      },
    ],
    related: [
      {
        href: "/traduccion-jurada-contrato-escritura",
        label: "Contratos y escrituras",
      },
      { href: "/precios", label: "Precios orientativos" },
    ],
  },
  {
    slug: "traduccion-jurada-dni-pasaporte",
    name: "Traducción jurada de DNI o pasaporte",
    title: "Traducción Jurada de DNI y Pasaporte – Español-Inglés",
    description:
      "Traducción jurada del DNI, NIE o pasaporte para notarías, bancos, herencias y trámites en el extranjero. Presupuesto cerrado en menos de 2 h, entrega en 24 h.",
    intro:
      "El DNI o el pasaporte se traducen menos veces de las que se piden: muchos organismos aceptan el documento tal cual. Pero cuando una notaría, un banco extranjero o un expediente de herencia exige la traducción jurada del documento de identidad, la resuelvo en 24 horas — y si veo que en tu caso no hace falta, te lo digo antes de cobrar.",
    price: null,
    priceNote: "presupuesto cerrado en menos de 2 h",
    time: "24 h",
    tramites: [
      "Poderes y escrituras ante notario extranjero",
      "Apertura de cuentas bancarias fuera de España",
      "Herencias con herederos en los dos países",
      "Expedientes académicos y becas en el extranjero",
      "Matrimonios y parejas de hecho",
    ],
    apostilla: {
      verdict: "No",
      text: "El DNI y el pasaporte no se apostillan. Si el organismo pide una copia compulsada o notarial del documento, esa compulsa se hace antes y se traduce junto con el documento.",
    },
    envio:
      "Foto nítida por las dos caras (DNI/NIE) o de la página de datos del pasaporte. Es un documento breve: si me llega por la mañana, suele salir el mismo día.",
    faq: [
      {
        q: "¿Seguro que necesito traducir el pasaporte?",
        a: "No siempre. Dime qué organismo te lo pide y reviso el requisito contigo: si el documento vale sin traducción, te lo digo y no pagas nada.",
      },
      {
        q: "¿Traduces también el NIE o el TIE?",
        a: "Sí, tanto el certificado de NIE en papel como la tarjeta TIE, con el mismo formato de entrega en 24 horas.",
      },
      {
        q: "¿Es seguro enviarte mi documento de identidad?",
        a: "Sí. Los documentos se usan solo para la traducción, se tratan con confidencialidad profesional y se eliminan según la política de privacidad.",
      },
    ],
    related: [
      {
        href: "/traduccion-jurada-contrato-escritura",
        label: "Contratos y escrituras",
      },
      { href: "/documentos", label: "Catálogo de documentos" },
    ],
  },
  {
    slug: "traduccion-jurada-testamento-herencia",
    name: "Traducción jurada de testamento y documentos de herencia",
    title: "Traducción Jurada de Testamentos y Herencias – Español-Inglés",
    description:
      "Traducción jurada de testamentos, grants of probate, certificados de últimas voluntades y escrituras de herencia entre España y Reino Unido. Presupuesto cerrado en menos de 2 h.",
    intro:
      "Las herencias con bienes o familiares en los dos países generan un expediente completo: testamento, certificado de defunción, últimas voluntades, el grant of probate británico, poderes… Traduzco el conjunto con terminología sucesoria precisa y coherente entre documentos, que es lo que la notaría necesita para no devolverte nada.",
    price: null,
    priceNote: "presupuesto cerrado en menos de 2 h",
    time: "Según extensión (fecha exacta con el presupuesto)",
    tramites: [
      "Aceptación y adjudicación de herencias ante notario",
      "Grant of probate y letters of administration británicos",
      "Certificados de defunción y de últimas voluntades",
      "Testamentos otorgados en el otro país",
      "Liquidación del impuesto de sucesiones",
    ],
    apostilla: {
      verdict: "Sí en documentos oficiales",
      text: "El grant of probate, los certificados de defunción extranjeros y los testamentos notariales necesitan apostilla para usarse en España. Los documentos españoles que viajen a Reino Unido, igual pero a la inversa.",
    },
    envio:
      "PDF de cada documento del expediente, con apostillas incluidas. Al ser varios documentos, te preparo un presupuesto conjunto cerrado con la fecha de entrega de todo el lote.",
    faq: [
      {
        q: "¿Puedes traducir el expediente completo de la herencia?",
        a: "Sí, y conviene que lo haga la misma traductora: los nombres, fechas y términos sucesorios quedan idénticos en todos los documentos.",
      },
      {
        q: "¿Qué es un grant of probate y por qué me lo piden?",
        a: "Es la resolución británica que autoriza a administrar la herencia. La notaría española lo pide apostillado y con traducción jurada para acreditar quién puede firmar.",
      },
      {
        q: "¿Cuánto se tarda con un expediente completo?",
        a: "Depende del volumen. Con el lote delante te doy fecha exacta; si la notaría te ha dado plazo, dímelo y lo organizo para llegar.",
      },
    ],
    related: [
      {
        href: "/traduccion-jurada-contrato-escritura",
        label: "Contratos y escrituras",
      },
      {
        href: "/traduccion-jurada-dni-pasaporte",
        label: "DNI y pasaporte",
      },
    ],
  },
  {
    slug: "traduccion-jurada-certificado-medico",
    name: "Traducción jurada de certificado médico",
    title: "Traducción Jurada de Certificado Médico – Español-Inglés",
    description:
      "Traducción jurada de certificados médicos, informes clínicos y certificados de aptitud para visados, oposiciones, seguros y tratamientos. Presupuesto cerrado en menos de 2 h.",
    intro:
      "Los certificados médicos aparecen en visados, oposiciones, seguros, adopciones o cuando continúas un tratamiento en otro país. Traduzco desde el certificado médico oficial de una página hasta informes clínicos completos, con el cuidado terminológico que exige un documento del que puede depender una decisión médica o administrativa.",
    price: null,
    priceNote: "presupuesto cerrado en menos de 2 h",
    time: "24/48 h en certificados breves",
    tramites: [
      "Visados que exigen certificado médico",
      "Oposiciones y pruebas físicas",
      "Seguros de vida y reclamaciones",
      "Continuidad de tratamientos en otro país",
      "Adopciones internacionales",
    ],
    apostilla: {
      verdict: "Depende del organismo",
      text: "Los certificados médicos oficiales para visados o adopciones suelen apostillarse (vía notarial o colegial); los informes clínicos para médicos o seguros, normalmente no. Dímelo con el requisito delante y te lo confirmo.",
    },
    envio:
      "PDF o foto nítida donde se lea bien el texto, el membrete y la firma del médico. Si el informe es largo, envíalo completo: te paso presupuesto cerrado por el conjunto en menos de 2 horas.",
    faq: [
      {
        q: "¿Tratas mis datos médicos con confidencialidad?",
        a: "Absolutamente. Solo yo trabajo con tu documento, se usa únicamente para la traducción y se elimina conforme a la política de privacidad.",
      },
      {
        q: "¿Puedes traducir un informe clínico largo?",
        a: "Sí. Los informes se presupuestan por extensión, con precio cerrado y fecha exacta antes de empezar.",
      },
      {
        q: "¿La traducción la firma un médico?",
        a: "No: la firma y sella una traductora jurada, que es lo que exige la administración. Si tu organismo pide además validación médica, esa se hace sobre el original, no sobre la traducción.",
      },
    ],
    related: [
      {
        href: "/traduccion-jurada-dni-pasaporte",
        label: "DNI y pasaporte",
      },
      { href: "/documentos", label: "Catálogo de documentos" },
    ],
  },
];

export function getFichaBySlug(slug) {
  return FICHAS.find((f) => f.slug === slug);
}
