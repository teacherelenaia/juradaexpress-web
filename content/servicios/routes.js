// content/servicios/routes.js
//
// Pares de rutas ES ⇄ EN de las páginas de audiencia/servicio del encargo
// internacional. Archivo ligero, SIN contenido, para que los componentes
// cliente (LanguageSwitcher, MainNav, MobileNav) no arrastren el texto de
// las páginas al bundle del navegador. Si se añade una página nueva en
// content/servicios/, añádela también aquí.
export const SERVICE_ROUTES = [
  {
    id: "traductor-ingles",
    es: "/traductor-jurado-ingles",
    en: "/en/sworn-english-translator",
    labelEs: "Traductor jurado de inglés",
    labelEn: "Sworn English translator",
    lastModified: "2026-09-26",
  },
  {
    // Landing de la campaña 1 de Google Ads (08/10/2026): cabecera reducida
    // (`landing: true` → MainNav/MobileNav muestran solo precios y contacto).
    id: "visados",
    es: "/traduccion-jurada-visados-espana",
    en: "/en/sworn-translations-spanish-visas",
    labelEs: "Visados de España",
    labelEn: "Spanish visas",
    lastModified: "2026-10-08",
    landing: true,
  },
  {
    id: "dnv",
    es: "/traduccion-jurada-visado-nomada-digital",
    en: "/en/sworn-translation-spain-digital-nomad-visa",
    labelEs: "Visado de nómada digital",
    labelEn: "Digital nomad visa",
  },
  {
    id: "uscis",
    es: "/traduccion-certificada-uscis",
    en: "/en/certified-translation-uscis",
    labelEs: "Traducción certificada para USCIS",
    labelEn: "Certified translation for USCIS",
  },
  {
    id: "urgente",
    es: "/traduccion-jurada-urgente-grandes-volumenes",
    en: "/en/urgent-sworn-translation-large-projects",
    labelEs: "Urgentes y grandes volúmenes",
    labelEn: "Urgent and large projects",
  },
  {
    id: "usa",
    es: "/traduccion-jurada-estados-unidos",
    en: "/en/sworn-translation-usa-spain",
    labelEs: "Estados Unidos",
    labelEn: "United States",
  },
  {
    id: "india",
    es: "/traduccion-jurada-india",
    en: "/en/sworn-translation-india-spain",
    labelEs: "India",
    labelEn: "India",
  },
  {
    id: "irlanda",
    es: "/traduccion-jurada-irlanda",
    en: "/en/sworn-translation-ireland-spain",
    labelEs: "Irlanda",
    labelEn: "Ireland",
  },
  {
    id: "canada",
    es: "/traduccion-jurada-canada",
    en: "/en/sworn-translation-canada-spain",
    labelEs: "Canadá",
    labelEn: "Canada",
  },
  {
    id: "australia",
    es: "/traduccion-jurada-australia",
    en: "/en/sworn-translation-australia-spain",
    labelEs: "Australia",
    labelEn: "Australia",
  },
  {
    id: "paises",
    es: "/traduccion-jurada-por-paises",
    en: "/en/sworn-translation-spain-by-country",
    labelEs: "Todos los países",
    labelEn: "All countries",
  },
];

// Página de Reino Unido (existe desde agosto de 2026; no usa ServicePage).
export const UK_ROUTE = {
  id: "uk",
  es: "/traduccion-jurada-britanicos-espana",
  en: "/en/sworn-translation-british-residents-spain",
  labelEs: "Reino Unido",
  labelEn: "United Kingdom",
};

const byId = (id) => SERVICE_ROUTES.find((r) => r.id === id);

// Rutas con cabecera reducida (landings de campaña): el menú principal se
// limita a precios y contacto y no muestra el desplegable "Internacional".
export const LANDING_PATHS = SERVICE_ROUTES.filter((r) => r.landing).flatMap(
  (r) => [r.es, r.en].filter(Boolean)
);
export const isLandingPath = (pathname) => LANDING_PATHS.includes(pathname);

// Landings de documento para el mercado de EE. UU. (2026-10), solo en
// inglés (sin par ES, sin hreflang es). Generadas con
// app/components/UsDocPage.js a partir de content/us-docs.js, que importa
// de aquí los slugs. `docId` enlaza con content/documents.js para el precio.
// `labelEs` es el texto del enlace en el menú ES, que apunta a la página en
// inglés (no hay `es`): MainNav/MobileNav le ponen hreflang="en".
const US_DOC_BASE = "/en/certified-translation-";
export const US_DOC_ROUTES = [
  {
    id: "us-birth",
    docId: "partida-nacimiento",
    en: `${US_DOC_BASE}spanish-birth-certificate-uscis`,
    labelEs: "Partida de nacimiento española",
    labelEn: "Spanish birth certificate (USCIS)",
  },
  {
    id: "us-marriage",
    docId: "certificado-matrimonio",
    en: `${US_DOC_BASE}spanish-marriage-certificate-uscis`,
    labelEs: "Certificado de matrimonio español",
    labelEn: "Spanish marriage certificate (USCIS)",
  },
  {
    id: "us-divorce",
    docId: null,
    en: `${US_DOC_BASE}spanish-divorce-decree-uscis`,
    labelEs: "Sentencia de divorcio española",
    labelEn: "Spanish divorce decree (USCIS)",
  },
  {
    id: "us-criminal",
    docId: "antecedentes-penales",
    en: `${US_DOC_BASE}spanish-criminal-record-certificate-uscis`,
    labelEs: "Antecedentes penales españoles",
    labelEn: "Spanish criminal record certificate (USCIS)",
  },
  {
    id: "us-degree",
    docId: "titulo-universitario",
    en: `${US_DOC_BASE}spanish-degree-evaluation-wes`,
    labelEs: "Título español para evaluación WES",
    labelEn: "Spanish degree for WES evaluation",
  },
  {
    id: "us-passport",
    docId: "dni-pasaporte",
    en: `${US_DOC_BASE}spanish-passport-dni-uscis`,
    labelEs: "Pasaporte o DNI español",
    labelEn: "Spanish passport or DNI (USCIS)",
  },
];

// Landing para despachos de inmigración de EE. UU. (2026-10), solo en inglés
// (sin par ES). Contenido en content/law-firms.js, plantilla en
// app/components/LawFirmPage.js.
export const LAW_FIRMS_ROUTE = {
  id: "law-firms",
  en: "/en/for-immigration-law-firms",
  labelEs: "Despachos de inmigración EE. UU. (EN)",
  labelEn: "For immigration law firms",
};

// Menú "Internacional" (FASE 2B.3). Las páginas del tercer grupo
// (documentos para USCIS y despachos de inmigración) solo existen en inglés:
// en el menú ES se muestran igualmente, con etiqueta en español, enlace a la
// página /en y hreflang="en" (04/10/2026).
export const INTERNATIONAL_MENU_GROUPS = [
  {
    id: "servicios",
    labelEs: "Servicios",
    labelEn: "Services",
    items: [
      byId("traductor-ingles"),
      byId("visados"),
      byId("dnv"),
      byId("uscis"),
      byId("urgente"),
    ],
  },
  {
    id: "paises",
    labelEs: "Por país",
    labelEn: "By country",
    items: [
      UK_ROUTE,
      byId("usa"),
      byId("india"),
      byId("irlanda"),
      byId("canada"),
      byId("australia"),
      byId("paises"),
    ],
  },
  {
    id: "uscis-docs",
    labelEs: "Documentos para USCIS (en inglés)",
    labelEn: "Spanish documents for USCIS",
    items: [...US_DOC_ROUTES, LAW_FIRMS_ROUTE],
  },
];

// Lista plana (para el footer "Clientes internacionales": seis países + hub).
export const INTERNATIONAL_MENU = INTERNATIONAL_MENU_GROUPS[1].items;

// Páginas de país con plantilla ServicePage (para el hub y el enlazado).
export const COUNTRY_PAGES = [
  UK_ROUTE,
  byId("usa"),
  byId("india"),
  byId("irlanda"),
  byId("canada"),
  byId("australia"),
];
