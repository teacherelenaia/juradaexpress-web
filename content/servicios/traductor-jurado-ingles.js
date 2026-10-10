// content/servicios/traductor-jurado-ingles.js
//
// Landing principal de servicio (FASE 1 SEO, 26/09/2026):
// /traductor-jurado-ingles y /en/sworn-english-translator. Es la página que
// responde a la búsqueda genérica "traductor jurado de inglés": qué es la
// traducción jurada, quién puede firmarla (nombramiento del MAEC y cómo
// comprobarlo), qué documentos, precios reales de content/documents.js,
// plazos, validez de la firma digital frente al papel, apostilla y
// organismos que la aceptan. Se pinta con app/components/ServicePage.js.
//
// Revisión GEO (10/10/2026): la medición en Perplexity con «traductor
// jurado de inglés online en España» no mostraba a Jurada Express; de la
// competencia extraía cuatro datos: precio por página con IVA, tipo de
// firma, plazo en horas y si el proceso es online de principio a fin. Esta
// página publica ahora esos mismos datos en texto plano y en el JSON-LD:
// precio por documento y por página (PRICE_PER_PAGE) con IVA incluido,
// firma electrónica cualificada (Orden AUC/213/2025) y cómo comprobarla,
// regla de las 15:00 (SAME_DAY_CUTOFF), pasos con tiempos, qué incluye el
// precio, ficha de la traductora y OfferCatalog con un Offer por fila.
import { DOCUMENTS, MIN_PRICE } from "../documents";
import {
  MAEC_URL,
  MAEC_NUMBER,
  PERSON_NAME,
  SINCE,
  yearsOfExperience,
} from "../persona";
import {
  EMAIL,
  GOOGLE_BUSINESS_URL,
  GOOGLE_RATING,
  GOOGLE_REVIEW_COUNT,
  INTERNATIONAL_SHIPPING,
  LARGE_PROJECT_CAPACITY,
  PHONE_DISPLAY,
  PHONE_TEL,
  PRICE_PER_PAGE,
  SAME_DAY_CUTOFF,
  SAME_DAY_MAX_PAGES,
  TIMEZONE_NOTE,
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

// Documentos cuyo precio depende de la extensión: en la tabla remiten al
// precio por página en lugar de a un plazo fijo.
const BY_PAGE = ["contrato-escritura", "testamento-herencia", "expediente-academico"];

const priceOf = (id) => DOCUMENTS.find((d) => d.id === id).price;
const nameOf = (d, locale) =>
  locale === "en" ? NAME_EN[d.id] || d.nameEn || d.name : d.name;

const eur = (n, locale) => (locale === "en" ? `€${n}` : `${n} €`);

// Tabla 1: precio por documento (los estándar de una página).
function priceTable(locale) {
  const en = locale === "en";
  return {
    table: {
      title: en
        ? "Standard documents: price per document"
        : "Documentos estándar: precio por documento",
      caption: en
        ? "Sworn translation prices per document, in euros, VAT included"
        : "Precios de traducción jurada por documento, en euros, IVA incluido",
      head: en
        ? ["Document", "Price (VAT included)", "Usual turnaround"]
        : ["Documento", "Precio (IVA incluido)", "Plazo habitual"],
      rows: DOCUMENTS.map((d) => [
        `<a href="${FICHA_OF[d.id] || "/documentos"}">${nameOf(d, locale)}</a>`,
        d.price != null
          ? eur(d.price, locale)
          : BY_PAGE.includes(d.id)
            ? en
              ? `${eur(PRICE_PER_PAGE, locale)} per page`
              : `${eur(PRICE_PER_PAGE, locale)} por página`
            : en
              ? "Fixed quote within 2 working hours"
              : "Presupuesto cerrado en menos de 2 h laborables",
        BY_PAGE.includes(d.id)
          ? en
            ? "Depends on length (see price per page)"
            : "Según extensión (ver precio por página)"
          : en
            ? `Same day (up to ${SAME_DAY_MAX_PAGES} pages)`
            : `En el día (hasta ${SAME_DAY_MAX_PAGES} págs.)`,
      ]),
    },
  };
}

// Tabla 2: precio por página de los documentos largos (content/site.js).
function pagePriceTable(locale) {
  const en = locale === "en";
  return {
    table: {
      title: en
        ? "Long documents: price per page"
        : "Documentos largos: precio por página",
      caption: en
        ? "Price per page for long documents, in euros, VAT included"
        : "Precio por página de los documentos largos, en euros, IVA incluido",
      head: en
        ? ["Type of document", "Price (VAT included)", "Turnaround"]
        : ["Tipo de documento", "Precio (IVA incluido)", "Plazo"],
      rows: [
        [
          en
            ? "Contracts, deeds, multi-page academic transcripts, insurance policies, bank statements"
            : "Contratos, escrituras, expedientes académicos de varias páginas, pólizas, extractos bancarios",
          en
            ? `${eur(PRICE_PER_PAGE, locale)} per page`
            : `${eur(PRICE_PER_PAGE, locale)} por página`,
          en
            ? `Same day up to ${SAME_DAY_MAX_PAGES} pages; longer files get a written deadline before work starts`
            : `En el día hasta ${SAME_DAY_MAX_PAGES} páginas; más páginas, plazo cerrado por escrito antes de empezar`,
        ],
      ],
    },
  };
}

// OfferCatalog del JSON-LD: un Offer por documento con precio de catálogo y
// otro por página para los documentos largos. Las cifras salen de
// content/documents.js y content/site.js.
function offerCatalog(locale) {
  const en = locale === "en";
  return {
    name: en
      ? "Sworn English translation prices (VAT included)"
      : "Precios de traducción jurada de inglés (IVA incluido)",
    offers: [
      ...DOCUMENTS.filter((d) => d.price != null).map((d) => ({
        name: en
          ? `Sworn translation: ${nameOf(d, "en").toLowerCase()}`
          : `Traducción jurada: ${d.name.toLowerCase()}`,
        price: d.price,
      })),
      {
        name: en
          ? "Sworn translation of long documents (contracts, deeds, transcripts, policies, statements), per page"
          : "Traducción jurada de documentos largos (contratos, escrituras, expedientes, pólizas, extractos), por página",
        price: PRICE_PER_PAGE,
        unitText: en ? "page" : "página",
      },
    ],
  };
}

// Nota y número de reseñas de la ficha de Google (content/site.js), con
// enlace a Maps. Sin reseñas publicables, no se muestra nada.
function reviews(locale) {
  if (!(GOOGLE_RATING > 0 && GOOGLE_REVIEW_COUNT > 0)) return undefined;
  const en = locale === "en";
  const rating = GOOGLE_RATING.toLocaleString(en ? "en-GB" : "es-ES", {
    minimumFractionDigits: 1,
  });
  return {
    text: en
      ? `${rating} on Google · ${GOOGLE_REVIEW_COUNT} reviews`
      : `${rating} en Google · ${GOOGLE_REVIEW_COUNT} reseñas`,
    href: GOOGLE_BUSINESS_URL,
    label: en
      ? "See the reviews on the Google Business profile (opens in a new tab)"
      : "Ver las reseñas en la ficha de Google Business (se abre en una pestaña nueva)",
  };
}

const maecLink = (label) =>
  `<a href="${MAEC_URL}" target="_blank" rel="noopener noreferrer">${label}</a>`;
const mapsLink = (label) =>
  `<a href="${GOOGLE_BUSINESS_URL}" target="_blank" rel="noopener noreferrer">${label}</a>`;
const contactLine = `<a href="tel:${PHONE_TEL}">${PHONE_DISPLAY}</a> · <a href="mailto:${EMAIL}">${EMAIL}</a>`;

// Ficha de la traductora en texto plano: los datos que un organismo (o un
// motor de respuestas) necesita para identificarla, juntos y sin repartir.
function translatorSheet(locale) {
  const en = locale === "en";
  const r = reviews(locale);
  const rows = en
    ? [
        ["Translator", PERSON_NAME],
        [
          "Title",
          `Sworn Translator-Interpreter of English, appointed by Spain's Ministry of Foreign Affairs, European Union and Cooperation (MAEC) in ${SINCE}`,
        ],
        [
          "Appointment no.",
          `${MAEC_NUMBER} · ${maecLink("check it on the Ministry's STIJ register")}`,
        ],
        ["Language pair", "Spanish ⇆ English, both directions"],
        [
          "Service",
          "100% online from Murcia, Spain: you send a scan, you receive the PDF with a qualified electronic signature by email, and a paper copy by courier if you need one",
        ],
        ["Office hours", "Monday to Friday, 9:00 to 20:00, mainland Spain time (CET/CEST)"],
        ["Contact", `WhatsApp and phone ${contactLine}`],
      ]
    : [
        ["Traductora", PERSON_NAME],
        [
          "Título",
          `Traductora-Intérprete Jurada de Inglés, nombrada por el Ministerio de Asuntos Exteriores, Unión Europea y Cooperación (MAEC) en ${SINCE}`,
        ],
        [
          "Nº de nombramiento",
          `${MAEC_NUMBER} · ${maecLink("comprobar en el buscador STIJ del MAEC")}`,
        ],
        ["Combinación", "español ⇆ inglés, en los dos sentidos"],
        [
          "Servicio",
          "100 % online desde Murcia (España): me envías el documento escaneado, recibes el PDF con firma electrónica cualificada por email y, si lo necesitas, papel por mensajería",
        ],
        ["Horario", "lunes a viernes, de 9:00 a 20:00, hora peninsular española (CET/CEST)"],
        ["Contacto", `WhatsApp y teléfono ${contactLine}`],
      ];
  if (r) {
    rows.push(
      en
        ? ["Reviews", `${r.text} · ${mapsLink("see the Google profile")}`]
        : ["Reseñas", `${r.text} · ${mapsLink("ver la ficha de Google")}`]
    );
  }
  return { dl: rows };
}

export const es = {
  id: "traductor-ingles",
  locale: "es",
  path: PATH_ES,
  alternates: { es: PATH_ES, en: PATH_EN },
  crumb: "Traductor jurado de inglés",
  guarantees: true,
  quoteCalculator: true,
  reviews: reviews("es"),
  providerPerson: true,
  offerCatalog: offerCatalog("es"),
  howTo: { totalTime: "PT24H" },
  metaTitle: `Traductor jurado de inglés online | Desde ${MIN_PRICE} €, IVA incl., PDF firmado en el día`,
  metaDescription: `Traducción jurada español-inglés desde ${MIN_PRICE} € por documento o ${PRICE_PER_PAGE} € por página, IVA incluido. PDF con firma cualificada en el día. Traductora MAEC nº ${MAEC_NUMBER}.`,
  h1: "Traductor jurado de inglés online: traducción jurada español-inglés con validez oficial",
  lead: `Soy ${PERSON_NAME}, Traductora-Intérprete Jurada de Inglés nombrada por el Ministerio de Asuntos Exteriores en ${SINCE} con el nº ${MAEC_NUMBER}: ${yearsOfExperience()} años de nombramiento vigente. Traduzco, firmo y sello personalmente documentos del español al inglés y del inglés al español para que tengan validez ante cualquier organismo oficial: Extranjería, Registro Civil, universidades, notarías, Home Office, USCIS o IRCC. Todo el proceso es online: me envías el documento escaneado, te doy precio cerrado en menos de 2 horas laborables y recibes el PDF con firma electrónica cualificada, conforme a la Orden AUC/213/2025, el mismo día si el documento llega antes de las ${SAME_DAY_CUTOFF}, hora de Madrid (hasta ${SAME_DAY_MAX_PAGES} páginas). Los documentos habituales cuestan desde ${MIN_PRICE} €, IVA incluido; los largos, ${PRICE_PER_PAGE} € por página.`,
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
        `Mi nombramiento es el <strong>nº ${MAEC_NUMBER}</strong>, para inglés. Puedes comprobarlo tú mismo, sin pedirme nada, en el ${maecLink("buscador oficial de Traductores/as-Intérpretes Jurados/as del MAEC")}: busca mi nombre o mi número en la lista de inglés. Es la única comprobación que necesita un organismo para saber que la firma es válida, y es la que yo te recomiendo hacer con cualquier traductor jurado antes de encargarle un documento.`,
        {
          note: "Una traducción jurada de inglés hecha en España es válida para presentarla en cualquier organismo español, con independencia de en qué provincia esté el traductor o el organismo. No existen traductores jurados \"de Murcia\" o \"de Madrid\": el nombramiento es estatal y la traducción vale en todo el territorio.",
        },
      ],
    },
    {
      id: "traductora",
      title: "Datos de la traductora jurada",
      body: [
        "Todo lo que necesita un organismo, o tú, para identificarme y comprobar el nombramiento, en un solo bloque:",
        translatorSheet("es"),
      ],
    },
    {
      id: "documentos",
      title: "¿Qué documentos traduzco con más frecuencia?",
      body: [
        "Estos son los documentos que más traduzco, cada uno con su ficha, donde explico para qué trámites se pide, si lleva apostilla y cómo enviármelo:",
        {
          list: [
            '<a href="/traduccion-jurada-partida-nacimiento">Partida o certificado de nacimiento</a>: nacionalidad, matrimonio, NIE de hijos, Registro Civil.',
            '<a href="/traduccion-jurada-certificado-matrimonio">Certificado de matrimonio</a>: residencia por reagrupación, pensiones, inscripción del matrimonio.',
            '<a href="/traduccion-jurada-certificado-penales">Certificado de antecedentes penales</a>: visados, residencia, nacionalidad, ofertas de empleo.',
            '<a href="/traduccion-jurada-titulo-universitario">Título universitario y expediente académico</a>: homologación, equivalencia, UCAS, colegiación, másteres.',
            '<a href="/traduccion-jurada-permiso-conducir">Permiso de conducir</a>: canje o reconocimiento en la DGT y en la DVLA.',
            '<a href="/traduccion-jurada-certificado-empresa">Certificado de empresa y nóminas</a>: visados de trabajo, nómada digital, hipotecas, alquileres.',
            '<a href="/traduccion-jurada-dni-pasaporte">DNI o pasaporte</a>: expedientes en los que se exige traducción del documento de identidad.',
            '<a href="/traduccion-jurada-contrato-escritura">Contratos y escrituras</a>: compraventa de vivienda, poderes, constitución de sociedades.',
            '<a href="/traduccion-jurada-testamento-herencia">Testamentos y documentos de herencia</a>: herencias con bienes en España y en el Reino Unido (grant of probate).',
            '<a href="/traduccion-jurada-certificado-medico">Certificado médico</a>: visados, bajas, seguros y pruebas ante la Administración.',
            '<a href="/traduccion-jurada-espanol-ingles">Traducción jurada español-inglés</a>: la ficha general de la combinación, con ejemplos de ambos sentidos.',
            '<a href="/traduccion-jurada-validez-oficial">Validez oficial de la traducción jurada</a>: qué lleva, cómo se verifica y quién la acepta.',
          ],
        },
        'Si tu documento no está en la lista, elige "otro documento" en el <a href="/documentos">catálogo</a> y te doy presupuesto igual. Para expedientes completos (visado de nómada digital, nacionalidad, homologación con varios documentos) trabajo con un solo plazo y un solo precio para todo el lote; lo explico en <a href="/traduccion-jurada-urgente-grandes-volumenes">urgentes y grandes volúmenes</a>.',
      ],
    },
    {
      id: "precios",
      title: `Precios de traducción jurada de inglés: desde ${MIN_PRICE} € por documento, IVA incluido`,
      body: [
        `Los precios de la primera tabla son los que aplico a los documentos estándar de una página (certificados, títulos, permisos) y son los mismos que verás en el catálogo. Los documentos largos (contratos, escrituras, expedientes de varias páginas, pólizas, extractos) van por página, en la segunda tabla. Todos los precios llevan el <strong>IVA incluido</strong>. <strong>No cobro por palabra</strong>: el precio es por documento o por página, cerrado por escrito antes de empezar, y nunca añado recargos que no hayas visto antes de aceptar.`,
        priceTable("es"),
        pagePriceTable("es"),
        `Una <strong>página</strong> es una cara del documento original; si el documento lleva apostilla y hay que traducirla, la apostilla cuenta como una página más. Para los documentos largos te confirmo el número de páginas y el total cerrado, por escrito, en menos de 2 horas laborables al ver el documento.`,
        `El pago es con tarjeta a través de Stripe o por transferencia, y te envío factura. ${INTERNATIONAL_SHIPPING.note.es}. Consulta la <a href="/precios">página de precios</a> completa, que incluye los paquetes por trámite, la traducción certificada para USCIS y los expedientes de nómada digital.`,
      ],
    },
    {
      id: "incluye",
      title: "Qué incluye el precio y qué no",
      body: [
        {
          columns: [
            {
              title: "El precio incluye",
              list: [
                "La traducción completa del documento, con sellos, apostilla y anotaciones.",
                "La certificación con mi firma y mi sello en cada página.",
                "El PDF con firma cualificada, listo para presentarlo por sede electrónica o reenviarlo por email.",
                "La copia sellada y fechada del documento original, unida a la traducción.",
                "La factura.",
                "La corrección gratis si un organismo rechaza la traducción por un error mío.",
              ],
            },
            {
              title: "No incluye",
              list: [
                'La apostilla: se tramita antes de traducir, en el país que emitió el documento. Te lo explico en <a href="/blog/que-es-la-apostilla-de-la-haya">qué es la apostilla y cuándo la necesitas</a>.',
                "El envío en papel: el precio del transportista se indica en el presupuesto (1-2 días laborables en España).",
                "La legalización consular del documento o de la traducción, cuando el país de destino la exige.",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "plazos",
      title: `Plazos: PDF firmado en el día hasta ${SAME_DAY_MAX_PAGES} páginas`,
      body: [
        `<strong>Presupuesto en menos de 2 horas laborables.</strong> ${TIMEZONE_NOTE.es}: dentro de ese horario, te respondo con precio cerrado y plazo por escrito en menos de dos horas; si escribes fuera de él, a primera hora del día siguiente.`,
        `<strong>Traducción firmada el mismo día.</strong> Un documento de hasta ${SAME_DAY_MAX_PAGES} páginas (un certificado, un título, un permiso de conducir, un contrato breve) que me llega antes de las <strong>${SAME_DAY_CUTOFF}, hora de Madrid</strong>, lo tienes en PDF firmado ese mismo día, sin recargo; si llega después de esa hora, en 24 horas. Si tiene más de ${SAME_DAY_MAX_PAGES} páginas, te doy un plazo cerrado por escrito antes de empezar, normalmente de 24 a 72 horas, y ese plazo es el que cumplo. Si necesitas más de ${SAME_DAY_MAX_PAGES} páginas en el día, lo hago con un recargo del 30 %: dímelo al pedir presupuesto y te confirmo si llego.`,
        "<strong>Si tienes cita con fecha</strong> (Extranjería, consulado, notaría, universidad), dime la fecha al pedir presupuesto y te confirmo por escrito que llegas.",
        `Para lotes grandes y expedientes de varios documentos, acordamos un calendario por escrito${LARGE_PROJECT_CAPACITY ? `; puedo asumir ${LARGE_PROJECT_CAPACITY.es}` : ""}. Si me escribes desde el Reino Unido, Irlanda o América, ten en cuenta el horario de Madrid para calcular cuándo recibirás la respuesta.`,
      ],
    },
    {
      id: "validez",
      title: "Validez: firma cualificada o papel, y cuándo hace falta apostilla",
      body: [
        "<strong>PDF con firma electrónica cualificada, conforme a la Orden AUC/213/2025.</strong> Es lo que entrego por defecto. La Oficina de Interpretación de Lenguas del MAEC admitió en 2020 que las traducciones juradas se firmen electrónicamente, y la Administración española (Extranjería, Registros Civiles, universidades, Seguridad Social, Hacienda) acepta el PDF con firma cualificada de forma generalizada, sobre todo en los trámites que se presentan por sede electrónica. El documento se puede reenviar tantas veces como haga falta sin perder validez.",
        "<strong>Cómo comprobar la firma del PDF.</strong> Abre el PDF en Adobe Acrobat Reader o en el visor de tu navegador y pulsa en el panel de firmas. Verás que el certificado está emitido por un prestador cualificado de servicios de confianza y que el documento no se ha modificado desde que lo firmé. Es la misma comprobación que hace el funcionario que recibe la traducción, y puedes hacerla tú antes de presentarla.",
        "<strong>Papel con firma manuscrita y sello.</strong> Algunos organismos, notarías o registros siguen pidiendo el original en papel, y fuera de la Unión Europea es más frecuente. En ese caso imprimo la traducción, la firmo y sello a mano y te la envío por mensajería: al día siguiente de la entrega digital en Murcia y en uno o dos días laborables en el resto de España. Puedes pedir las dos versiones a la vez; la traducción es la misma.",
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
      d: "Me mandas el documento escaneado o fotografiado (nítido, completo, con anverso y reverso) por WhatsApp, email o la calculadora de esta página.",
      time: "En cualquier momento, también fuera de horario.",
    },
    {
      t: "Presupuesto",
      d: "Te respondo con precio cerrado, plazo y, si procede, aviso de apostilla o de documento plurilingüe.",
      time: "En menos de 2 horas laborables (9:00 a 20:00, hora de Madrid).",
    },
    {
      t: "Traducción jurada",
      d: "Traduzco, certifico, firmo y sello personalmente. Ningún texto pasa por terceros.",
      time: `Firmada el mismo día hasta ${SAME_DAY_MAX_PAGES} páginas si llega antes de las ${SAME_DAY_CUTOFF}; si no, en 24 horas.`,
    },
    {
      t: "Entrega",
      d: "PDF con firma cualificada por email y, si lo necesitas, papel con firma manuscrita y sello por mensajería a cualquier dirección.",
      time: "PDF al momento; papel en 1-2 días laborables en España.",
    },
  ],
  faq: [
    {
      q: "¿La traducción jurada de inglés es válida en toda España?",
      a: "Sí. El nombramiento del MAEC es estatal: una traducción jurada firmada por un traductor jurado de inglés vale ante cualquier organismo de cualquier comunidad autónoma, sin necesidad de legalización adicional.",
    },
    {
      q: "¿Cómo compruebo que un traductor jurado está realmente nombrado?",
      a: "Buscando su nombre o su número en el buscador oficial de Traductores/as-Intérpretes Jurados/as que publica el Ministerio de Asuntos Exteriores en su web. Mi número es el 7310, para inglés. Si un traductor no aparece en ese listado, su traducción no es jurada en España.",
    },
    {
      q: "¿Tengo que enviarte el documento original?",
      a: "No. Trabajo con un escaneo o una foto nítida. La normativa exige que a la traducción se adjunte una copia del documento tal y como me lo entregaste, sellada y fechada, no el original.",
    },
    {
      q: "¿La versión PDF con firma electrónica la aceptan igual que el papel?",
      a: "En la mayoría de trámites, sí. El PDF lleva firma electrónica cualificada conforme a la Orden AUC/213/2025, el MAEC admite la firma electrónica del traductor jurado y la Administración la acepta, sobre todo por sede electrónica. Si un organismo concreto te pide papel, te lo envío por mensajería con firma manuscrita y sello; es la misma traducción.",
    },
    {
      q: "¿Necesito apostillar el documento antes de traducirlo?",
      a: "Depende del documento y del organismo. La apostilla legaliza el original y se tramita en el país que lo emitió antes de traducir; si el documento la lleva, la traduzco también. Un certificado británico o estadounidense para un trámite en España normalmente sí la necesita; entre países de la UE muchos documentos públicos están exentos. Pregúntame antes de tramitarla.",
    },
    {
      q: "¿Cuánto cuesta una traducción jurada de inglés?",
      a: `Los documentos habituales de una página (partida de nacimiento, certificado de matrimonio, antecedentes penales) cuestan ${MIN_PRICE} €, IVA incluido; el permiso de conducir, ${priceOf("permiso-conducir")} €; el certificado de empresa, ${priceOf("certificado-empresa")} €; el título universitario, ${priceOf("titulo-universitario")} €. Los documentos largos (contratos, escrituras, expedientes) van a ${PRICE_PER_PAGE} € por página, IVA incluido, con el total cerrado por escrito en menos de 2 horas laborables al ver el documento.`,
    },
    {
      q: "¿Cobras por palabra?",
      a: `No. El precio es por documento, para los habituales de una página, o por página (${PRICE_PER_PAGE} €, IVA incluido) para los largos; una página es una cara del documento original, y la apostilla cuenta como página si hay que traducirla. Lo cierro por escrito antes de empezar y no hay recargos que no hayas visto.`,
    },
    {
      q: "¿Cuánto tarda?",
      a: `Hasta ${SAME_DAY_MAX_PAGES} páginas, PDF firmado el mismo día si el documento llega antes de las ${SAME_DAY_CUTOFF}, hora de Madrid, y en 24 horas si llega después; más de ${SAME_DAY_MAX_PAGES} páginas, plazo cerrado por escrito antes de empezar (normalmente 24-72 h). Si tienes una cita con fecha, dímelo al pedir presupuesto y te confirmo por escrito que llegas. Los lotes grandes tienen su propio calendario.`,
    },
    {
      q: "¿Traduces también del inglés al español?",
      a: "Sí, en los dos sentidos: documentos británicos, irlandeses, estadounidenses, canadienses, australianos o indios para trámites en España, y documentos españoles al inglés para el Home Office, USCIS, IRCC, universidades o empleadores en el extranjero.",
    },
  ],
  cta: {
    title: "¿Te traduzco tu documento?",
    text: "Envíamelo escaneado por WhatsApp o email y en menos de 2 horas laborables tendrás precio cerrado, IVA incluido, y plazo real. Sin compromiso: si no necesita traducción jurada, te lo diré.",
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
  guarantees: true,
  quoteCalculator: true,
  reviews: reviews("en"),
  providerPerson: true,
  offerCatalog: offerCatalog("en"),
  howTo: { totalTime: "PT24H" },
  metaTitle: `Sworn English translator online | From €${MIN_PRICE}, same-day signed PDF`,
  metaDescription: `Sworn Spanish-English translation from €${MIN_PRICE} per document or €${PRICE_PER_PAGE} per page, VAT included. Qualified e-signature, same-day PDF. MAEC translator no. ${MAEC_NUMBER}.`,
  h1: "Sworn English translator online: officially valid Spanish-English sworn translation",
  lead: `I'm ${PERSON_NAME}, Sworn Translator-Interpreter of English appointed by Spain's Ministry of Foreign Affairs in ${SINCE} under no. ${MAEC_NUMBER}, an appointment in force for ${yearsOfExperience()} years. I translate, sign and stamp documents from English into Spanish and from Spanish into English so that they are accepted by any official body: Spanish immigration offices, the Civil Registry, universities, notaries, the Home Office, USCIS or IRCC. Everything happens online: you send me a scan, I send you a fixed quote within 2 working hours, and you receive the PDF with a qualified electronic signature under Spain's Order AUC/213/2025 the same day if the document reaches me before ${SAME_DAY_CUTOFF} Madrid time (up to ${SAME_DAY_MAX_PAGES} pages). The most common documents cost from €${MIN_PRICE}, VAT included; long documents are €${PRICE_PER_PAGE} per page.`,
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
        `My appointment number is <strong>${MAEC_NUMBER}</strong>, for English. You can check it yourself, without asking me, on the ${maecLink("MAEC's official register of sworn translators and interpreters")}: look for my name or number in the English list. It is the only check an official body needs to know the signature is valid, and it is the check I recommend you make with any sworn translator before sending them a document.`,
        {
          note: "A sworn English translation produced in Spain is valid before any Spanish body, whatever province the translator or the office is in. There is no such thing as a sworn translator \"for Murcia\" or \"for Madrid\": the appointment is national and the translation is valid throughout Spain.",
        },
      ],
    },
    {
      id: "translator",
      title: "About the sworn translator",
      body: [
        "Everything an official body, or you, needs to identify me and verify the appointment, in one place:",
        translatorSheet("en"),
      ],
    },
    {
      id: "documents",
      title: "Which documents do I translate most often?",
      body: [
        "These are the documents I translate most, each with its own page (in Spanish) explaining which procedures ask for it, whether it needs an apostille and how to send it:",
        {
          list: [
            '<a href="/traduccion-jurada-partida-nacimiento">Birth certificate</a>: citizenship, marriage, children\'s NIE, Civil Registry.',
            '<a href="/traduccion-jurada-certificado-matrimonio">Marriage certificate</a>: family reunification residency, pensions, registering the marriage.',
            '<a href="/traduccion-jurada-certificado-penales">Criminal record certificate</a> (ACRO, DBS, FBI, Garda): visas, residency, citizenship, job offers.',
            '<a href="/traduccion-jurada-titulo-universitario">University degree and transcript</a>: recognition of qualifications, UCAS, professional bodies, master\'s admissions.',
            '<a href="/traduccion-jurada-permiso-conducir">Driving licence</a>: exchange or recognition with the DGT or the DVLA.',
            '<a href="/traduccion-jurada-certificado-empresa">Employment certificate and payslips</a>: work visas, digital nomad visa, mortgages, rentals.',
            '<a href="/traduccion-jurada-dni-pasaporte">ID card or passport</a>: files where a translation of the identity document is required.',
            '<a href="/traduccion-jurada-contrato-escritura">Contracts and deeds</a>: property purchases, powers of attorney, company formation.',
            '<a href="/traduccion-jurada-testamento-herencia">Wills and inheritance documents</a>: estates with assets in Spain and the UK (grant of probate).',
            '<a href="/traduccion-jurada-certificado-medico">Medical certificate</a>: visas, sick leave, insurance and evidence before the authorities.',
            '<a href="/traduccion-jurada-espanol-ingles">Sworn Spanish-English translation</a>: the general page for the language pair.',
            '<a href="/traduccion-jurada-validez-oficial">Official validity</a>: what a sworn translation contains, how it is verified and who accepts it.',
          ],
        },
        'If your document is not listed, choose "other document" in the <a href="/en/documentos">catalogue</a> and I will quote for it all the same. For complete files (digital nomad visa, citizenship, recognition of qualifications with several documents) I work with a single deadline and a single price for the whole batch; see <a href="/en/urgent-sworn-translation-large-projects">urgent and large projects</a>.',
      ],
    },
    {
      id: "prices",
      title: `Sworn English translation prices: from €${MIN_PRICE} per document, VAT included`,
      body: [
        "The prices in the first table apply to standard one-page documents (certificates, degrees, licences) and are the same ones you will see in the catalogue. Long documents (contracts, deeds, multi-page transcripts, insurance policies, bank statements) are priced per page, in the second table. All prices are <strong>VAT included</strong>. <strong>I do not charge per word</strong>: the price is per document or per page, fixed in writing before work starts, and I never add surcharges you have not seen before accepting.",
        priceTable("en"),
        pagePriceTable("en"),
        "A <strong>page</strong> is one side of the original document; if the document carries an apostille that needs translating, the apostille counts as one more page. For long documents I confirm the page count and the fixed total in writing, within 2 working hours of seeing the document.",
        `Payment is by card through Stripe (any international card, charged in euros) or by bank transfer, and you receive an invoice. ${INTERNATIONAL_SHIPPING.note.en}. See the full <a href="/en/precios">pricing page</a>, including the packs by procedure, certified translation for USCIS and digital nomad visa files.`,
      ],
    },
    {
      id: "included",
      title: "What the price includes and what it does not",
      body: [
        {
          columns: [
            {
              title: "The price includes",
              list: [
                "The complete translation of the document, including stamps, apostille and annotations.",
                "The certification with my signature and stamp on every page.",
                "The PDF with a qualified electronic signature, ready to file online or forward by email.",
                "A stamped, dated copy of the source document attached to the translation.",
                "An invoice.",
                "A free correction if an official body rejects the translation because of my mistake.",
              ],
            },
            {
              title: "Not included",
              list: [
                'The apostille: it is obtained before translating, in the country that issued the document. See <a href="/blog/que-es-la-apostilla-de-la-haya">what the apostille is and when you need it</a> (in Spanish).',
                "Paper delivery: the courier cost is stated in the quote (1-2 working days within Spain).",
                "Consular legalisation of the document or the translation, where the destination country requires it.",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "turnaround",
      title: `Turnaround: signed PDF the same day for up to ${SAME_DAY_MAX_PAGES} pages`,
      body: [
        `<strong>Quote within 2 working hours.</strong> ${TIMEZONE_NOTE.en}: within those hours you get a fixed price and a written deadline in under two hours; if you write outside them, first thing the next working day.`,
        `<strong>Translation signed the same day.</strong> A document of up to ${SAME_DAY_MAX_PAGES} pages (a certificate, a degree, a driving licence, a short contract) that reaches me before <strong>${SAME_DAY_CUTOFF} Madrid time</strong> (3 pm) is delivered as a signed PDF that same day, with no surcharge; if it arrives after that time, within 24 hours. If it runs to more than ${SAME_DAY_MAX_PAGES} pages, you get a written deadline before work starts, normally 24 to 72 hours, and that is the deadline I keep. If you need more than ${SAME_DAY_MAX_PAGES} pages the same day, I can do it with a 30% surcharge: tell me when you ask for the quote and I will confirm whether I can make it.`,
        "<strong>If you have a dated appointment</strong> (immigration office, consulate, notary, university), tell me the date when you ask for the quote and I will confirm in writing that you will make it.",
        `For large batches and multi-document files we agree a schedule in writing${LARGE_PROJECT_CAPACITY ? `; I can take on ${LARGE_PROJECT_CAPACITY.en}` : ""}. If you are writing from the UK, Ireland or the Americas, bear Madrid time in mind when working out when you will hear back.`,
      ],
    },
    {
      id: "validity",
      title: "Validity: qualified signature or paper, and when you need an apostille",
      body: [
        "<strong>PDF with a qualified electronic signature under Spain's Order AUC/213/2025.</strong> This is what I deliver by default. In 2020 the MAEC's Office of Language Interpretation confirmed that sworn translations may be signed electronically, and the Spanish authorities (immigration, civil registries, universities, social security, tax office) accept the PDF with a qualified signature as a matter of course, especially for procedures filed online. The document can be forwarded as many times as needed without losing validity.",
        "<strong>How to check the signature on the PDF.</strong> Open the PDF in Adobe Acrobat Reader or in your browser's viewer and click on the signature panel. You will see that the certificate was issued by a qualified trust service provider and that the document has not been modified since I signed it. It is the same check the official receiving the translation makes, and you can make it yourself before filing.",
        "<strong>Paper with handwritten signature and stamp.</strong> Some bodies, notaries or registries still ask for a paper original, and this is more common outside the EU. In that case I print the translation, sign and stamp it by hand and courier it to you: the day after digital delivery in Murcia and within one or two working days elsewhere in Spain; abroad, the courier cost is stated in the quote. You can ask for both versions at once; the translation is the same.",
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
      d: "Send me a clear, complete scan or photo (front and back) by WhatsApp, email or the calculator on this page.",
      time: "Any time, including outside office hours.",
    },
    {
      t: "Quote",
      d: "You get a fixed price, a deadline and, where relevant, a note about apostilles or multilingual forms.",
      time: "Within 2 working hours (9:00 to 20:00 Madrid time).",
    },
    {
      t: "Sworn translation",
      d: "I translate, certify, sign and stamp it personally. No text is passed on to third parties.",
      time: `Signed the same day for up to ${SAME_DAY_MAX_PAGES} pages if it arrives before ${SAME_DAY_CUTOFF} Madrid time; otherwise within 24 hours.`,
    },
    {
      t: "Delivery",
      d: "PDF with a qualified electronic signature by email and, if you need it, a paper copy with handwritten signature and stamp couriered to any address.",
      time: "PDF straight away; paper in 1-2 working days within Spain.",
    },
  ],
  faq: [
    {
      q: "Is a sworn English translation valid throughout Spain?",
      a: "Yes. The MAEC appointment is national: a sworn translation signed by a sworn translator of English is valid before any body in any region of Spain, with no further legalisation.",
    },
    {
      q: "How do I check that a sworn translator is really appointed?",
      a: "Look up their name or number on the official register of sworn translators and interpreters published by Spain's Ministry of Foreign Affairs on its website. My number is 7310, for English. If a translator is not on that list, their translation is not a sworn translation in Spain.",
    },
    {
      q: "Do I need to send you the original document?",
      a: "No. I work from a scan or a clear photo. The rules require a stamped, dated copy of the document as you sent it to me to be attached to the translation, not the original.",
    },
    {
      q: "Is the electronically signed PDF accepted the same as paper?",
      a: "For most procedures, yes. The PDF carries a qualified electronic signature under Spain's Order AUC/213/2025, the MAEC allows the sworn translator's electronic signature and the Spanish authorities accept it, especially when filing online. If a particular body asks for paper, I courier it to you with a handwritten signature and stamp; it is the same translation.",
    },
    {
      q: "Do I need to apostille the document before translating it?",
      a: "It depends on the document and the body. The apostille legalises the original and is obtained in the issuing country before translation; if the document carries one, I translate it too. A British or American certificate for a procedure in Spain normally needs it; between EU countries many public documents are exempt. Ask me before applying for it.",
    },
    {
      q: "How much does a sworn English translation cost?",
      a: `Common one-page documents (birth certificate, marriage certificate, criminal record certificate) cost €${MIN_PRICE}, VAT included; a driving licence €${priceOf("permiso-conducir")}; an employment certificate €${priceOf("certificado-empresa")}; a university degree €${priceOf("titulo-universitario")}. Long documents (contracts, deeds, transcripts) are €${PRICE_PER_PAGE} per page, VAT included, with the total fixed in writing within 2 working hours of seeing the document.`,
    },
    {
      q: "Do you charge per word?",
      a: `No. The price is per document for the common one-page documents, or per page (€${PRICE_PER_PAGE}, VAT included) for long ones; a page is one side of the original, and the apostille counts as a page if it needs translating. I fix it in writing before starting and there are no surcharges you have not seen.`,
    },
    {
      q: "How long does it take?",
      a: `Up to ${SAME_DAY_MAX_PAGES} pages, signed PDF the same day if the document reaches me before ${SAME_DAY_CUTOFF} Madrid time, and within 24 hours if it arrives later; more than ${SAME_DAY_MAX_PAGES} pages, written deadline before work starts (normally 24-72 hours). If you have a dated appointment, tell me when asking for the quote and I will confirm in writing that you will make it. Large batches get their own schedule.`,
    },
    {
      q: "Do you also translate from English into Spanish?",
      a: "Yes, both ways: British, Irish, American, Canadian, Australian or Indian documents for procedures in Spain, and Spanish documents into English for the Home Office, USCIS, IRCC, universities or employers abroad.",
    },
  ],
  cta: {
    title: "Shall I translate your document?",
    text: "Send me a scan by WhatsApp or email and within 2 working hours you will have a fixed price, VAT included, and a real deadline. No obligation: if it does not need a sworn translation, I will tell you.",
  },
  related: [
    { href: "/en/how-it-works", label: "How it works" },
    { href: "/en/about", label: "About me" },
    { href: "/en/sworn-translation-british-residents-spain", label: "British residents in Spain" },
    { href: "/en/sworn-translation-spain-by-country", label: "By country" },
  ],
  otherLangLabel: "Traductor jurado de inglés online",
};
