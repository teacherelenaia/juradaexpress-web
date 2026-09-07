// content/servicios/routes.js
//
// Pares de rutas ES ⇄ EN de las páginas de audiencia/servicio del encargo
// internacional. Archivo ligero, SIN contenido, para que los componentes
// cliente (LanguageSwitcher, MainNav, MobileNav) no arrastren el texto de
// las páginas al bundle del navegador. Si se añade una página nueva en
// content/servicios/, añádela también aquí.
export const SERVICE_ROUTES = [
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

// Menú "Internacional" en dos columnas (FASE 2B.3).
export const INTERNATIONAL_MENU_GROUPS = [
  {
    id: "servicios",
    labelEs: "Servicios",
    labelEn: "Services",
    items: [byId("dnv"), byId("uscis"), byId("urgente")],
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
