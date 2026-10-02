// app/sitemap.js
import { getAllPosts, getPostBySlug } from "../content/posts";
import { getAllPostsEn, getPostEnBySlug } from "../content/posts.en";
import { SERVICE_ROUTES } from "../content/servicios/routes";
import { CIUDADES } from "../content/ciudades";
import { FICHAS } from "../content/fichas";
import { US_DOC_ROUTES } from "../content/servicios/routes";

const BASE_URL = "https://juradaexpress.es";

// Páginas de audiencia/servicio del encargo internacional (2026-09), con
// hreflang ES ⇄ EN. Fecha real de publicación en la rama.
const SERVICE_LAST_MODIFIED = "2026-09-06";
const serviceRoutes = SERVICE_ROUTES.flatMap((r) => {
  const languages = {
    es: `${BASE_URL}${r.es}`,
    en: `${BASE_URL}${r.en}`,
    "x-default": `${BASE_URL}${r.es}`,
  };
  const lastModified = r.lastModified || SERVICE_LAST_MODIFIED;
  return [
    {
      url: `${BASE_URL}${r.es}`,
      lastModified,
      priority: r.id === "traductor-ingles" ? 0.9 : 0.8,
      alternates: { languages },
    },
    {
      url: `${BASE_URL}${r.en}`,
      lastModified,
      priority: 0.8,
      alternates: { languages },
    },
  ];
});

// Landings de ciudad (solo ES), FASE 1 SEO 26/09/2026.
const CITY_LAST_MODIFIED = "2026-09-26";
const cityRoutes = CIUDADES.map((c) => ({
  url: `${BASE_URL}/${c.slug}`,
  lastModified: CITY_LAST_MODIFIED,
  priority: 0.7,
}));

// Fichas de documento (/traduccion-jurada-*): lastModified = campo `updated`
// de cada ficha en content/fichas.js.
const fichaRoutes = FICHAS.map((f) => ({
  url: `${BASE_URL}/${f.slug}`,
  lastModified: f.updated,
  priority: 0.7,
}));

// Landings de documento para EE. UU. (solo EN, sin par ES), 2026-10:
// hreflang únicamente "en", autorreferente.
const US_DOC_LAST_MODIFIED = "2026-10-02";
const usDocRoutes = US_DOC_ROUTES.map((r) => ({
  url: `${BASE_URL}${r.en}`,
  lastModified: US_DOC_LAST_MODIFIED,
  priority: 0.7,
  alternates: { languages: { en: `${BASE_URL}${r.en}` } },
}));

export default function sitemap() {
  const staticRoutes = [
    {
      url: `${BASE_URL}/`,
      lastModified: SERVICE_LAST_MODIFIED,
      priority: 1.0,
      alternates: {
        languages: {
          es: `${BASE_URL}/`,
          en: `${BASE_URL}/en`,
          "x-default": `${BASE_URL}/`,
        },
      },
    },
    { url: `${BASE_URL}/precios`, priority: 0.8 },
    { url: `${BASE_URL}/documentos`, priority: 0.8 },
    { url: `${BASE_URL}/contacto`, priority: 0.8 },
    { url: `${BASE_URL}/blog`, priority: 0.6 },
    { url: `${BASE_URL}/preguntas-frecuentes`, priority: 0.6 },
    { url: `${BASE_URL}/traductor-jurado-murcia`, lastModified: CITY_LAST_MODIFIED, priority: 0.8 },
    { url: `${BASE_URL}/como-funciona`, lastModified: "2026-08-25", priority: 0.8 },
    { url: `${BASE_URL}/sobre-mi`, lastModified: SERVICE_LAST_MODIFIED, priority: 0.8 },
    { url: `${BASE_URL}/traduccion-jurada-britanicos-espana`, lastModified: "2026-08-25", priority: 0.8 },
    { url: `${BASE_URL}/aviso-legal`, lastModified: "2026-08-25", priority: 0.3 },
    { url: `${BASE_URL}/politica-privacidad`, lastModified: "2026-08-25", priority: 0.3 },
    { url: `${BASE_URL}/politica-cookies`, lastModified: "2026-08-25", priority: 0.3 },
    {
      url: `${BASE_URL}/en`,
      lastModified: SERVICE_LAST_MODIFIED,
      priority: 0.9,
      alternates: {
        languages: {
          es: `${BASE_URL}/`,
          en: `${BASE_URL}/en`,
          "x-default": `${BASE_URL}/`,
        },
      },
    },
    { url: `${BASE_URL}/en/precios`, priority: 0.7 },
    { url: `${BASE_URL}/en/documentos`, priority: 0.7 },
    { url: `${BASE_URL}/en/contacto`, priority: 0.7 },
    { url: `${BASE_URL}/en/preguntas-frecuentes`, priority: 0.6 },
    { url: `${BASE_URL}/en/about`, lastModified: SERVICE_LAST_MODIFIED, priority: 0.7 },
    { url: `${BASE_URL}/en/how-it-works`, lastModified: "2026-08-25", priority: 0.7 },
    { url: `${BASE_URL}/en/blog`, lastModified: "2026-08-25", priority: 0.6 },
    { url: `${BASE_URL}/en/sworn-translation-british-residents-spain`, lastModified: "2026-08-25", priority: 0.7 },
    { url: `${BASE_URL}/en/legal-notice`, lastModified: "2026-08-25", priority: 0.3 },
    { url: `${BASE_URL}/en/privacy-policy`, lastModified: "2026-08-25", priority: 0.3 },
    { url: `${BASE_URL}/en/cookie-policy`, lastModified: "2026-08-25", priority: 0.3 },
  ];

  // Artículos: si un post tiene pareja en el otro idioma (`translationOf`
  // y la pareja existe), se emiten las alternates es/en/x-default (x-default
  // = versión española, como en el resto del sitio).
  const blogLanguages = (esSlug, enSlug) => ({
    es: `${BASE_URL}/blog/${esSlug}`,
    en: `${BASE_URL}/en/blog/${enSlug}`,
    "x-default": `${BASE_URL}/blog/${esSlug}`,
  });

  const postRoutes = getAllPosts().map((post) => {
    const en = post.translationOf ? getPostEnBySlug(post.translationOf) : null;
    return {
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: post.updated || post.date,
      priority: 0.5,
      ...(en ? { alternates: { languages: blogLanguages(post.slug, en.slug) } } : {}),
    };
  });

  const postRoutesEn = getAllPostsEn().map((post) => {
    const es = post.translationOf ? getPostBySlug(post.translationOf) : null;
    return {
      url: `${BASE_URL}/en/blog/${post.slug}`,
      lastModified: post.updated || post.date,
      priority: 0.5,
      ...(es ? { alternates: { languages: blogLanguages(es.slug, post.slug) } } : {}),
    };
  });

  return [
    ...staticRoutes,
    ...fichaRoutes,
    ...serviceRoutes,
    ...cityRoutes,
    ...usDocRoutes,
    ...postRoutes,
    ...postRoutesEn,
  ];
}
