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
    id: "usa",
    es: "/traduccion-jurada-estados-unidos",
    en: "/en/sworn-translation-usa-spain",
    labelEs: "Clientes de Estados Unidos",
    labelEn: "Clients in the United States",
  },
  {
    id: "india",
    es: "/traduccion-jurada-india",
    en: "/en/sworn-translation-india-spain",
    labelEs: "Clientes de India",
    labelEn: "Clients in India",
  },
  {
    id: "urgente",
    es: "/traduccion-jurada-urgente-grandes-volumenes",
    en: "/en/urgent-sworn-translation-large-projects",
    labelEs: "Urgentes y grandes volúmenes",
    labelEn: "Urgent and large projects",
  },
];

// Grupo "Internacional" del menú (FASE 2.6): nómada digital, USCIS,
// Estados Unidos, India y Reino Unido.
export const INTERNATIONAL_MENU = [
  ...SERVICE_ROUTES.filter((r) => r.id !== "urgente"),
  {
    id: "uk",
    es: "/traduccion-jurada-britanicos-espana",
    en: "/en/sworn-translation-british-residents-spain",
    labelEs: "Británicos en España",
    labelEn: "British residents in Spain",
  },
];
