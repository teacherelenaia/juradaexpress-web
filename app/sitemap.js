// app/sitemap.js
import { getAllPosts } from "../content/posts";
import { getAllPostsEn } from "../content/posts.en";
import { SERVICE_ROUTES } from "../content/servicios/routes";

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
  return [
    {
      url: `${BASE_URL}${r.es}`,
      lastModified: SERVICE_LAST_MODIFIED,
      priority: 0.8,
      alternates: { languages },
    },
    {
      url: `${BASE_URL}${r.en}`,
      lastModified: SERVICE_LAST_MODIFIED,
      priority: 0.8,
      alternates: { languages },
    },
  ];
});

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
    { url: `${BASE_URL}/traduccion-jurada-partida-nacimiento`, priority: 0.7 },
    { url: `${BASE_URL}/traduccion-jurada-titulo-universitario`, priority: 0.7 },
    { url: `${BASE_URL}/traduccion-jurada-certificado-penales`, priority: 0.7 },
    { url: `${BASE_URL}/traduccion-jurada-espanol-ingles`, priority: 0.7 },
    { url: `${BASE_URL}/traduccion-jurada-validez-oficial`, priority: 0.7 },
    { url: `${BASE_URL}/traduccion-jurada-certificado-matrimonio`, priority: 0.7 },
    { url: `${BASE_URL}/traduccion-jurada-contrato-escritura`, priority: 0.7 },
    { url: `${BASE_URL}/traduccion-jurada-permiso-conducir`, lastModified: "2026-08-25", priority: 0.7 },
    { url: `${BASE_URL}/traduccion-jurada-certificado-empresa`, lastModified: "2026-08-25", priority: 0.7 },
    { url: `${BASE_URL}/traduccion-jurada-dni-pasaporte`, lastModified: "2026-08-25", priority: 0.7 },
    { url: `${BASE_URL}/traduccion-jurada-testamento-herencia`, lastModified: "2026-08-25", priority: 0.7 },
    { url: `${BASE_URL}/traduccion-jurada-certificado-medico`, lastModified: "2026-08-25", priority: 0.7 },
    { url: `${BASE_URL}/traductor-jurado-murcia`, lastModified: "2026-08-25", priority: 0.8 },
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

  const postRoutes = getAllPosts().map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.updated || post.date,
    priority: 0.5,
  }));

  const postRoutesEn = getAllPostsEn().map((post) => ({
    url: `${BASE_URL}/en/blog/${post.slug}`,
    lastModified: post.updated || post.date,
    priority: 0.5,
  }));

  return [...staticRoutes, ...serviceRoutes, ...postRoutes, ...postRoutesEn];
}
