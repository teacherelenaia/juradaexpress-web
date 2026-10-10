// content/guias/routes.js
//
// Pares de rutas ES ⇄ EN de las guías con tabla por trámite (10/10/2026).
// Archivo ligero, SIN contenido, para que LanguageSwitcher no arrastre el
// texto de las guías al bundle del navegador. Lo leen también el sitemap y
// las páginas que enlazan a cada guía. Ninguna guía va en el menú
// principal. Si se añade una guía en content/guias/, añádela también aquí.
export const GUIDE_ROUTES = [
  {
    id: "canje-permiso-dgt",
    es: "/canje-permiso-conducir-dgt-por-paises",
    en: "/en/exchange-driving-licence-spain-dgt-by-country",
    labelEs: "Canje del permiso de conducir en la DGT por países",
    labelEn: "Exchanging a foreign driving licence in Spain, by country",
    datePublished: "2026-10-10",
    lastModified: "2026-10-10",
  },
  {
    id: "nomada-digital-documentos",
    es: "/documentos-visado-nomada-digital-espana",
    en: "/en/spain-digital-nomad-visa-documents-checklist",
    labelEs: "Documentos para el visado de nómada digital",
    labelEn: "Spain digital nomad visa documents checklist",
    datePublished: "2026-10-10",
    lastModified: "2026-10-10",
  },
  {
    id: "no-lucrativo-documentos",
    es: "/documentos-visado-no-lucrativo-espana",
    en: "/en/spain-non-lucrative-visa-documents-checklist",
    labelEs: "Documentos para el visado no lucrativo",
    labelEn: "Spain non-lucrative visa documents checklist",
    datePublished: "2026-10-10",
    lastModified: "2026-10-10",
  },
];

export const guideById = (id) => GUIDE_ROUTES.find((r) => r.id === id);
