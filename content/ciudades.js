// content/ciudades.js
//
// Landings de ciudad (FASE 1 SEO, 26/09/2026): /traductor-jurado-<ciudad>.
// Solo en español y sin equivalente /en. Se pintan con
// app/components/CityPage.js, que compone la página a partir de estos
// datos y de los bloques comunes (cómo funciona el envío, documentos,
// pasos). Tono honesto: Elena es traductora jurada de inglés ONLINE con
// sede en Murcia; no tiene oficina en estas ciudades ni promete visitas.
// La entrega es en PDF firmado (24/48 h) y, si hace falta, papel por
// mensajería. No se inventan direcciones ni horarios de organismos: se
// citan por su nombre y se remite a lo que pida cada uno.
//
// Campos: slug (ruta sin barra), nombre, provincia (para areaServed y
// breadcrumb), lead (párrafo citable: 2-4 frases), tramites (lista de
// trámites locales con el organismo por su nombre), notas (párrafos
// adicionales con contexto local), documentos (ids de content/documents.js
// que se destacan), faq (4 preguntas locales), whatsapp (texto prellenado).
import { DOCUMENTS, MIN_PRICE } from "./documents";

const priceOf = (id) => DOCUMENTS.find((d) => d.id === id)?.price ?? null;
const eur = (id) => (priceOf(id) != null ? `${priceOf(id)} €` : "presupuesto");

export const CIUDADES = [
  {
    slug: "traductor-jurado-cartagena",
    id: "cartagena",
    nombre: "Cartagena",
    provincia: "Región de Murcia",
    metaTitle: `Traductor jurado de inglés para Cartagena · desde ${MIN_PRICE} €`,
    metaDescription:
      "Traductora jurada de inglés online para Cartagena y el Mar Menor (MAEC nº 7310). PDF firmado en 24/48 h, papel por mensajería desde Murcia. Desde 35 €.",
    h1: "Traductor jurado de inglés para clientes de Cartagena",
    lead:
      "Soy Elena Peñaranda Ortega, traductora jurada de inglés nombrada por el MAEC (nº 7310) con sede en Murcia. Atiendo a clientes de Cartagena, La Manga, el Mar Menor y toda la comarca sin que tengan que desplazarse: me envías el documento escaneado, te doy precio cerrado en menos de 2 horas y recibes el PDF firmado en 24/48 h. Si tu trámite exige papel, te lo envío por mensajería desde Murcia y lo tienes normalmente al día siguiente.",
    tramites: [
      "<strong>Oficina de Extranjería de Cartagena</strong>: NIE, TIE, residencia de familiares de ciudadanos de la UE, arraigo y nacionalidad por residencia. Piden traducción jurada de certificados de nacimiento, matrimonio y antecedentes penales extranjeros.",
      "<strong>Registro Civil de Cartagena</strong>: inscripción de matrimonios y nacimientos celebrados en el Reino Unido, Irlanda o Estados Unidos, expedientes matrimoniales con un cónyuge extranjero.",
      "<strong>Universidad Politécnica de Cartagena (UPCT)</strong>: admisión de alumnos internacionales, Erasmus y convenios, homologación y equivalencia de títulos extranjeros, expedientes en inglés para másteres en el extranjero.",
      "<strong>Notarías de Cartagena y del Mar Menor</strong>: compraventas de vivienda con compradores británicos, poderes otorgados en el extranjero, herencias con bienes en la comarca (grant of probate, testamentos ingleses).",
      "<strong>Empresas del puerto, Navantia, el sector químico y la Armada</strong>: certificados de empresa, contratos laborales, títulos y certificaciones técnicas en inglés para procesos de selección y visados de trabajo.",
      "<strong>Ayuntamiento de Cartagena y pedanías</strong>: empadronamiento, parejas de hecho y trámites municipales con documentación extranjera.",
    ],
    notas: [
      "Cartagena y el Mar Menor tienen una de las comunidades británicas e irlandesas más grandes de la Región: Los Belones, La Manga, Cabo de Palos, Los Urrutias o La Azohía. Buena parte de mis encargos desde la comarca son de residentes que necesitan sus documentos del Reino Unido en español para Extranjería tras el Brexit, o sus documentos españoles en inglés para el Home Office, la DVLA o un banco británico. Los dos sentidos los hago con el mismo proceso.",
      "También trabajo con gestorías y despachos de Cartagena que tramitan expedientes de sus clientes extranjeros: si tenéis varios documentos a la vez, os doy un precio y un plazo únicos para todo el lote y entrego cada archivo nombrado para subirlo directamente a la plataforma correspondiente.",
    ],
    documentos: [
      "partida-nacimiento",
      "certificado-matrimonio",
      "antecedentes-penales",
      "titulo-universitario",
      "contrato-escritura",
      "permiso-conducir",
    ],
    faq: [
      {
        q: "¿Tienes oficina en Cartagena?",
        a: "No. Trabajo online desde Murcia y no necesitas venir a ninguna oficina: el envío del documento, el presupuesto, el pago y la entrega son digitales. Si tu trámite exige la traducción en papel, te la envío por mensajería a Cartagena o a cualquier punto del Mar Menor.",
      },
      {
        q: "¿La traducción jurada vale en la Oficina de Extranjería de Cartagena?",
        a: "Sí. El nombramiento del MAEC es estatal y la traducción jurada se acepta en cualquier Oficina de Extranjería de España. Entrego el PDF firmado electrónicamente, que sirve para la presentación telemática, y el papel si te lo piden en cita presencial.",
      },
      {
        q: "¿Cuánto tarda en llegar el papel a Cartagena?",
        a: "Normalmente al día siguiente de la entrega digital. Primero recibes el PDF firmado en 24/48 h y, si has pedido papel, sale ese mismo día por mensajería desde Murcia.",
      },
      {
        q: "Soy británico y vivo en La Manga, ¿me traduces documentos al inglés para el Reino Unido?",
        a: "Sí. Traduzco documentos españoles al inglés con la certificación que piden el Home Office, la DVLA, HMRC o los bancos británicos, y documentos británicos al español para Extranjería, el Registro Civil o el notario. Tienes una guía completa en la página para británicos en España.",
      },
    ],
    whatsapp:
      "https://wa.me/34685891214?text=Hola%20Elena%2C%20escribo%20desde%20Cartagena%3A%20necesito%20una%20traducci%C3%B3n%20jurada%20de%20ingl%C3%A9s%20%28te%20env%C3%ADo%20el%20documento%29",
  },
  {
    slug: "traductor-jurado-alicante",
    id: "alicante",
    nombre: "Alicante",
    provincia: "Provincia de Alicante",
    metaTitle: `Traductor jurado de inglés para Alicante · desde ${MIN_PRICE} €`,
    metaDescription:
      "Traductora jurada de inglés online para Alicante y la Costa Blanca (MAEC nº 7310). PDF firmado en 24/48 h, papel por mensajería en 24/48 h. Desde 35 €.",
    h1: "Traductor jurado de inglés para clientes de Alicante",
    lead:
      "Soy Elena Peñaranda Ortega, traductora jurada de inglés nombrada por el MAEC (nº 7310) con sede en Murcia, a una hora de Alicante. Atiendo a clientes de Alicante capital, Elche, Torrevieja, Orihuela Costa, Benidorm, Jávea y Dénia de forma 100 % online: me envías el documento escaneado, te doy precio cerrado en menos de 2 horas y recibes el PDF firmado en 24/48 h. El papel, si tu organismo lo exige, llega por mensajería en 24/48 h a cualquier punto de la provincia.",
    tramites: [
      "<strong>Oficina de Extranjería de Alicante</strong>: NIE y TIE, residencia de familiares de ciudadanos de la UE, arraigo, nacionalidad por residencia y visados de nómada digital y no lucrativo iniciados desde España.",
      "<strong>Registro Civil de Alicante y de las localidades de la costa</strong>: inscripción de matrimonios y nacimientos ocurridos en el extranjero, expedientes de matrimonio con cónyuge británico, irlandés o estadounidense.",
      "<strong>Universidad de Alicante y Universidad Miguel Hernández (Elche)</strong>: admisión de alumnos internacionales, Erasmus, homologación y equivalencia de títulos, expedientes en inglés para estudiar o colegiarse fuera.",
      "<strong>Notarías de la Costa Blanca</strong>: compraventas con compradores y vendedores extranjeros, poderes otorgados en el Reino Unido, herencias con bienes en Alicante (grant of probate, testamentos ingleses e irlandeses).",
      "<strong>Consulado británico en Alicante y gestiones con el Reino Unido</strong>: documentos españoles al inglés con certificación para el Home Office, la DVLA, HMRC, pensiones (DWP) y bancos británicos.",
      "<strong>Ayuntamientos, colegios y empresas</strong>: empadronamiento, parejas de hecho, escolarización de menores con documentación extranjera, certificados de empresa y contratos para procesos de selección.",
    ],
    notas: [
      "La provincia de Alicante concentra la mayor comunidad británica de España y una comunidad irlandesa muy numerosa, sobre todo en la Vega Baja y la Marina Alta. Por eso una parte importante de mis encargos desde Alicante son en los dos sentidos: documentos británicos al español para Extranjería, el Registro Civil o el notario, y documentos españoles al inglés para trámites en el Reino Unido o Irlanda. Los hago con el mismo proceso, y si el mismo documento tiene que presentarse en los dos países, preparo las dos versiones a la vez.",
      "Trabajo también con abogados, gestorías y agencias inmobiliarias de la costa que tramitan expedientes de clientes extranjeros. Para lotes de varios documentos doy un precio y un plazo únicos por escrito, y entrego cada archivo nombrado para que sepáis qué es cada uno sin abrirlo.",
    ],
    documentos: [
      "partida-nacimiento",
      "certificado-matrimonio",
      "antecedentes-penales",
      "contrato-escritura",
      "testamento-herencia",
      "permiso-conducir",
    ],
    faq: [
      {
        q: "¿Tienes oficina en Alicante?",
        a: "No. Trabajo online desde Murcia y no hace falta que vengas a ninguna oficina: todo el proceso es digital. Si necesitas la traducción en papel, te la envío por mensajería a Alicante, Elche, Torrevieja, Benidorm o donde estés, normalmente en 24/48 h.",
      },
      {
        q: "¿Vale tu traducción jurada en la Oficina de Extranjería de Alicante?",
        a: "Sí. El nombramiento del MAEC es estatal: una traducción jurada de inglés vale ante cualquier organismo de la provincia de Alicante y del resto de España. El PDF firmado electrónicamente sirve para la presentación telemática; el papel, para las citas presenciales que lo pidan.",
      },
      {
        q: "¿Puedes traducir un certificado de nacimiento del Reino Unido para casarme en Alicante?",
        a: "Sí. Traduzco certificados del GRO (Inglaterra y Gales), de Escocia e Irlanda del Norte, con su apostilla si la lleva, para expedientes matrimoniales, nacionalidad e inscripciones en el Registro Civil. Si tu certificado es plurilingüe te lo diré antes de cobrarte: quizá no necesites traducción.",
      },
      {
        q: "¿Traduces documentos españoles al inglés para el Home Office o la DVLA?",
        a: "Sí. Entrego la traducción completa al inglés con la certificación que exigen (confirmación de exactitud, fecha, nombre y datos de contacto de la traductora). Es el mismo proceso digital, y te lo explico en la guía para británicos en España.",
      },
    ],
    whatsapp:
      "https://wa.me/34685891214?text=Hola%20Elena%2C%20escribo%20desde%20Alicante%3A%20necesito%20una%20traducci%C3%B3n%20jurada%20de%20ingl%C3%A9s%20%28te%20env%C3%ADo%20el%20documento%29",
  },
  {
    slug: "traductor-jurado-madrid",
    id: "madrid",
    nombre: "Madrid",
    provincia: "Comunidad de Madrid",
    metaTitle: `Traductor jurado de inglés para Madrid · online desde ${MIN_PRICE} €`,
    metaDescription:
      "Traductora jurada de inglés online para Madrid (MAEC nº 7310): Extranjería, Registro Civil Central, Educación, UGE y embajadas. PDF en 24/48 h. Desde 35 €.",
    h1: "Traductor jurado de inglés para clientes de Madrid",
    lead:
      "Soy Elena Peñaranda Ortega, traductora jurada de inglés nombrada por el MAEC (nº 7310). Trabajo online desde Murcia con clientes de Madrid que necesitan una traducción jurada válida para Extranjería, el Registro Civil, el Ministerio de Educación, la UGE, una universidad o una embajada: me envías el documento escaneado, te doy precio cerrado en menos de 2 horas y recibes el PDF firmado en 24/48 h. Si te exigen papel, lo envío por mensajería y en Madrid capital suele llegar al día siguiente.",
    tramites: [
      "<strong>Oficinas de Extranjería de Madrid</strong>: NIE y TIE, arraigo, reagrupación familiar, nacionalidad por residencia y renovaciones; la ciudad concentra la mayor parte de los expedientes de extranjería del país.",
      "<strong>Registro Civil Central y Registro Civil de Madrid</strong>: nacionalidad por opción y por residencia, inscripción de matrimonios y nacimientos ocurridos en el extranjero, expedientes de matrimonio.",
      "<strong>Ministerio de Educación, Formación Profesional y Deportes</strong>: homologación y equivalencia de títulos universitarios y no universitarios extranjeros, con traducción jurada del título y del expediente.",
      "<strong>Unidad de Grandes Empresas y Colectivos Estratégicos (UGE)</strong>: autorizaciones de residencia para teletrabajadores internacionales (nómada digital), profesionales altamente cualificados e inversores; traduzco el expediente completo con un solo plazo.",
      "<strong>Embajadas y consulados en Madrid</strong> (Reino Unido, Estados Unidos, Irlanda, Canadá, Australia, India): documentos españoles al inglés con la certificación que pide cada país, y documentos extranjeros al español con su apostilla.",
      "<strong>Universidades madrileñas</strong> (Complutense, Autónoma, Politécnica, Carlos III, Rey Juan Carlos y privadas): admisión internacional, Erasmus, becas y expedientes en inglés para másteres en el extranjero.",
      "<strong>Notarías, despachos y empresas</strong>: escrituras, poderes, contratos, certificados de empresa, cuentas anuales y documentación societaria en inglés.",
    ],
    notas: [
      "Madrid es la ciudad desde la que más encargos recibo fuera de la Región de Murcia, y la razón es sencilla: para una traducción jurada no importa dónde esté el traductor. El nombramiento del MAEC es estatal, la firma electrónica se verifica en el PDF y los organismos madrileños aceptan la traducción exactamente igual que si la hubiera firmado un traductor con despacho en la Castellana. Lo que sí importa es que la traducción sea correcta, que esté a tiempo y que cumpla el formato que pide cada organismo, y en eso puedo ayudarte con más flexibilidad que una agencia.",
      "Trabajo con particulares, con despachos de abogados de extranjería, con gestorías y con departamentos de recursos humanos que traen personal internacional. Para expedientes de nómada digital ante la UGE o de homologación ante el Ministerio de Educación reviso la lista completa de documentos, te aviso de qué apostillas faltan y entrego todo el lote ordenado y nombrado para subirlo a la plataforma.",
    ],
    documentos: [
      "partida-nacimiento",
      "antecedentes-penales",
      "titulo-universitario",
      "certificado-empresa",
      "contrato-escritura",
      "certificado-matrimonio",
    ],
    faq: [
      {
        q: "¿Tienes oficina en Madrid?",
        a: "No. Trabajo online desde Murcia y todo el proceso es digital: envío del documento, presupuesto, pago con tarjeta y entrega del PDF firmado. Si el organismo exige papel, te lo envío por mensajería a cualquier dirección de Madrid, normalmente con entrega al día siguiente.",
      },
      {
        q: "¿Aceptan en Madrid una traducción jurada firmada por una traductora de Murcia?",
        a: "Sí, sin ninguna diferencia. El nombramiento del MAEC es único para toda España y no existen traductores jurados \"de Madrid\": cualquier organismo madrileño, del Registro Civil Central al Ministerio de Educación, acepta una traducción jurada firmada por un traductor jurado de inglés esté donde esté.",
      },
      {
        q: "¿Traduces el expediente completo del visado de nómada digital para la UGE?",
        a: "Sí. Reviso tu lista (contrato o carta del empleador, certificado de la empresa, antecedentes penales apostillados, título, certificado de cobertura de Seguridad Social), te digo qué necesita apostilla y traduzco todo el lote con un único precio y plazo por escrito.",
      },
      {
        q: "Necesito la traducción para una cita en Extranjería esta semana, ¿llegas?",
        a: "Dímelo al pedir presupuesto con la fecha de la cita. Los documentos habituales salen en 24/48 h; si es más urgente te confirmo por escrito si puedo, y solo acepto el encargo si llego.",
      },
    ],
    whatsapp:
      "https://wa.me/34685891214?text=Hola%20Elena%2C%20escribo%20desde%20Madrid%3A%20necesito%20una%20traducci%C3%B3n%20jurada%20de%20ingl%C3%A9s%20%28te%20env%C3%ADo%20el%20documento%29",
  },
  {
    slug: "traductor-jurado-barcelona",
    id: "barcelona",
    nombre: "Barcelona",
    provincia: "Provincia de Barcelona",
    metaTitle: `Traductor jurado de inglés para Barcelona · online desde ${MIN_PRICE} €`,
    metaDescription:
      "Traductora jurada de inglés online para Barcelona (MAEC nº 7310): Extranjería, Registro Civil, universidades y consulados. PDF en 24/48 h. Desde 35 €.",
    h1: "Traductor jurado de inglés para clientes de Barcelona",
    lead:
      "Soy Elena Peñaranda Ortega, traductora jurada de inglés nombrada por el MAEC (nº 7310). Atiendo online, desde Murcia, a clientes de Barcelona y su área metropolitana que necesitan una traducción jurada español-inglés con validez oficial: me envías el documento escaneado, te doy precio cerrado en menos de 2 horas y recibes el PDF firmado en 24/48 h. El papel, si tu organismo lo pide, llega por mensajería en 24/48 h.",
    tramites: [
      "<strong>Oficina de Extranjería de Barcelona</strong>: NIE y TIE, arraigo, reagrupación familiar, nacionalidad por residencia, autorizaciones de residencia de nómadas digitales y profesionales cualificados.",
      "<strong>Registro Civil de Barcelona</strong>: expedientes de nacionalidad, inscripción de matrimonios y nacimientos ocurridos en el extranjero, expedientes matrimoniales con cónyuge de habla inglesa.",
      "<strong>Universidades y escuelas de negocio</strong> (UB, UAB, UPC, UPF, ESADE, IESE): admisión internacional, Erasmus, homologación y equivalencia de títulos, expedientes en inglés para estudiar o trabajar fuera.",
      "<strong>Consulados en Barcelona</strong> (Reino Unido, Estados Unidos, Canadá y otros): documentos españoles al inglés con certificación para visados, pasaportes, matrimonios y registros de nacimiento en el extranjero.",
      "<strong>Notarías, startups y empresas internacionales</strong>: contratos, poderes, escrituras de constitución, certificados de empresa y nóminas para visados de trabajo, hipotecas y alquileres.",
      "<strong>Generalitat y ayuntamientos</strong>: homologación de títulos no universitarios, empadronamiento, parejas de hecho y trámites municipales con documentación extranjera.",
    ],
    notas: [
      "Barcelona recibe cada año miles de profesionales, estudiantes y nómadas digitales de países de habla inglesa, y muchos de los encargos que me llegan desde la ciudad son expedientes completos: el contrato, el certificado de la empresa, los antecedentes penales apostillados y el título para una autorización de residencia; o el expediente académico y el título para un máster. Trabajo esos lotes con un único precio y plazo por escrito y entrego cada archivo nombrado.",
      "Una aclaración honesta: mi nombramiento es para inglés-español. Una traducción jurada al español es válida ante cualquier organismo de Cataluña, incluidos la Generalitat y los ayuntamientos, porque el castellano es lengua oficial. Si un organismo te exigiera expresamente la versión en catalán, necesitarías un traductor jurado de catalán habilitado por la Generalitat; en la práctica, para trámites de extranjería, nacionalidad, universidad y notaría, la traducción jurada al español es lo que se pide y se acepta.",
    ],
    documentos: [
      "antecedentes-penales",
      "titulo-universitario",
      "certificado-empresa",
      "partida-nacimiento",
      "contrato-escritura",
      "certificado-matrimonio",
    ],
    faq: [
      {
        q: "¿Tienes oficina en Barcelona?",
        a: "No. Trabajo online desde Murcia: envío del documento, presupuesto, pago con tarjeta y entrega del PDF firmado son digitales. Si necesitas el papel, te lo envío por mensajería a Barcelona o a cualquier localidad de la provincia en 24/48 h.",
      },
      {
        q: "¿Vale en Cataluña una traducción jurada al español?",
        a: "Sí. El castellano es lengua oficial en Cataluña y la traducción jurada firmada por traductor nombrado por el MAEC se acepta en Extranjería, Registro Civil, universidades, notarías y Generalitat. Solo si un organismo exigiera expresamente catalán necesitarías un traductor jurado de catalán, que no soy.",
      },
      {
        q: "Vengo con visado de nómada digital, ¿qué documentos necesito traducir?",
        a: "Normalmente el contrato o la carta del empleador, el certificado de registro de la empresa, el certificado de antecedentes penales apostillado, el título o cartas de experiencia y el certificado de cobertura de Seguridad Social. Reviso tu lista y traduzco todo con un solo plazo; tienes la guía completa en la página del visado de nómada digital.",
      },
      {
        q: "¿Cuánto cuesta traducir mi título y mi expediente para la UB o la UPC?",
        a: `El título universitario de una página cuesta ${eur("titulo-universitario")}; el expediente académico se presupuesta al verlo, según el número de páginas, con precio cerrado en menos de 2 horas. Ambos se entregan en 24/48 h en PDF firmado.`,
      },
    ],
    whatsapp:
      "https://wa.me/34685891214?text=Hola%20Elena%2C%20escribo%20desde%20Barcelona%3A%20necesito%20una%20traducci%C3%B3n%20jurada%20de%20ingl%C3%A9s%20%28te%20env%C3%ADo%20el%20documento%29",
  },
  {
    slug: "traductor-jurado-valencia",
    id: "valencia",
    nombre: "Valencia",
    provincia: "Provincia de Valencia",
    metaTitle: `Traductor jurado de inglés para Valencia · online desde ${MIN_PRICE} €`,
    metaDescription:
      "Traductora jurada de inglés online para Valencia (MAEC nº 7310): Extranjería, Registro Civil, UV y UPV, notarías. PDF en 24/48 h. Desde 35 €.",
    h1: "Traductor jurado de inglés para clientes de Valencia",
    lead:
      "Soy Elena Peñaranda Ortega, traductora jurada de inglés nombrada por el MAEC (nº 7310). Trabajo online desde Murcia con clientes de Valencia capital, l'Horta, la Safor y el resto de la provincia: me envías el documento escaneado, te doy precio cerrado en menos de 2 horas y recibes el PDF firmado en 24/48 h. Si tu organismo exige papel, te lo envío por mensajería y suele llegar en 24/48 h.",
    tramites: [
      "<strong>Oficina de Extranjería de Valencia</strong>: NIE y TIE, arraigo, reagrupación familiar, nacionalidad por residencia y autorizaciones de residencia para nómadas digitales que ya están en España.",
      "<strong>Registro Civil de Valencia</strong>: expedientes de nacionalidad, inscripción de matrimonios y nacimientos ocurridos en el extranjero, expedientes matrimoniales con cónyuge británico, irlandés o estadounidense.",
      "<strong>Universitat de València y Universitat Politècnica de València</strong>: admisión de alumnos internacionales, Erasmus, homologación y equivalencia de títulos, expedientes en inglés para másteres y doctorados en el extranjero.",
      "<strong>Notarías de Valencia y de la costa</strong>: compraventas con compradores extranjeros, poderes otorgados en el Reino Unido o Estados Unidos, herencias con bienes en la provincia.",
      "<strong>Empresas, puerto y sector tecnológico</strong>: certificados de empresa, contratos laborales, títulos y certificaciones profesionales en inglés para procesos de selección y visados de trabajo.",
      "<strong>Ayuntamientos y Generalitat Valenciana</strong>: empadronamiento, parejas de hecho, escolarización y homologación de títulos no universitarios con documentación extranjera.",
    ],
    notas: [
      "Valencia se ha convertido en uno de los destinos preferidos de nómadas digitales, jubilados y familias de habla inglesa que se instalan en España, y eso se nota en los encargos: expedientes de residencia con documentos de varios países, certificados de nacimiento y matrimonio para el Registro Civil, títulos para la universidad. Todos se resuelven igual, sin desplazamientos: la traducción jurada es válida en toda España y la firma electrónica se verifica en el propio PDF.",
      "Mi nombramiento es para inglés-español. La traducción jurada al español es válida ante cualquier organismo de la Comunidad Valenciana, incluidos la Generalitat y los ayuntamientos; solo si un organismo te exigiera la versión en valenciano necesitarías un traductor jurado de valenciano, algo poco habitual en trámites de extranjería, registro civil, universidad o notaría.",
    ],
    documentos: [
      "partida-nacimiento",
      "certificado-matrimonio",
      "antecedentes-penales",
      "titulo-universitario",
      "contrato-escritura",
      "certificado-empresa",
    ],
    faq: [
      {
        q: "¿Tienes oficina en Valencia?",
        a: "No. Trabajo online desde Murcia y todo el proceso es digital. Si necesitas la traducción en papel, la envío por mensajería a Valencia o a cualquier localidad de la provincia, normalmente en 24/48 h.",
      },
      {
        q: "¿Aceptan en la Oficina de Extranjería de Valencia una traducción jurada firmada en Murcia?",
        a: "Sí, exactamente igual. El nombramiento del MAEC es estatal y la traducción jurada de inglés vale ante cualquier organismo de España. El PDF firmado sirve para la presentación telemática y el papel para las citas presenciales que lo pidan.",
      },
      {
        q: "¿Puedes traducir mi certificado de antecedentes penales apostillado del Reino Unido o Estados Unidos?",
        a: "Sí. Traduzco el certificado (ACRO, DBS o FBI) con su apostilla, que forma parte del documento, y te lo entrego en 24/48 h. Si aún no lo has apostillado, te digo antes de traducir si tu trámite lo necesita.",
      },
      {
        q: "¿Cuánto cuesta una traducción jurada para Valencia?",
        a: `Lo mismo que para cualquier otra ciudad: los certificados habituales (nacimiento, matrimonio, penales) cuestan ${MIN_PRICE} €; el permiso de conducir, ${eur("permiso-conducir")}; el certificado de empresa, ${eur("certificado-empresa")}; el título universitario, ${eur("titulo-universitario")}. Los documentos largos se presupuestan al verlos, con precio cerrado en menos de 2 horas.`,
      },
    ],
    whatsapp:
      "https://wa.me/34685891214?text=Hola%20Elena%2C%20escribo%20desde%20Valencia%3A%20necesito%20una%20traducci%C3%B3n%20jurada%20de%20ingl%C3%A9s%20%28te%20env%C3%ADo%20el%20documento%29",
  },
];

export function getCiudadBySlug(slug) {
  return CIUDADES.find((c) => c.slug === slug);
}
