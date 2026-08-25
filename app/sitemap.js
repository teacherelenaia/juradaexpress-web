// app/sitemap.js
import { getAllPosts } from "../content/posts";

const BASE_URL = "https://juradaexpress.es";

export default function sitemap() {
  const staticRoutes = [
    { url: `${BASE_URL}/`, priority: 1.0 },
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
    { url: `${BASE_URL}/politica-cookies`, lastModified: "2026-08-25", priority: 0.3 },
    { url: `${BASE_URL}/en`, priority: 0.9 },
    { url: `${BASE_URL}/en/precios`, priority: 0.7 },
    { url: `${BASE_URL}/en/documentos`, priority: 0.7 },
    { url: `${BASE_URL}/en/contacto`, priority: 0.7 },
    { url: `${BASE_URL}/en/preguntas-frecuentes`, priority: 0.6 },
    { url: `${BASE_URL}/en/cookie-policy`, lastModified: "2026-08-25", priority: 0.3 },
  ];

  const postRoutes = getAllPosts().map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.date,
    priority: 0.5,
  }));

  return [...staticRoutes, ...postRoutes];
}
