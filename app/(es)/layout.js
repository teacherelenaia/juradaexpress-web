// app/(es)/layout.js
//
// Root layout de la versión en español. Route group "(es)": no cambia
// ninguna URL. La versión en inglés tiene su propio root layout en
// app/en/layout.js con <html lang="en"> (antes todo el sitio se servía con
// lang="es", incluidas las páginas /en/*).
import "../globals.css";
import { Analytics } from "@vercel/analytics/next";
import SiteShell from "../components/SiteShell";
import { fontClassName } from "../fonts";

export const metadata = {
  metadataBase: new URL("https://juradaexpress.es"),
  // Posicionamiento internacional (encargo 2026-09): title ≤ 60 caracteres,
  // description ≤ 155. "Jurada Express" (con espacio) es el nombre de la
  // entidad; "JuradaExpress" se conserva solo como logotipo.
  title: {
    default: "Traducción Jurada de Inglés Online desde 35 € | Jurada Express",
    template: "%s | Jurada Express",
  },
  description:
    "Traductora jurada de inglés desde 2009 (MAEC nº 7310). Traducción jurada español-inglés desde 35 € por documento, PDF firmado en 24/48 h, 100 % online.",
  alternates: { canonical: "https://juradaexpress.es/" },
  openGraph: {
    title: "Traducción Jurada de Inglés Online desde 35 € | Jurada Express",
    description:
      "Traductora jurada de inglés desde 2009 (MAEC nº 7310). Traducción jurada español-inglés desde 35 € por documento, PDF firmado en 24/48 h, 100 % online.",
    url: "https://juradaexpress.es/",
    siteName: "Jurada Express",
    type: "website",
    locale: "es_ES",
    images: [
      {
        url: "https://juradaexpress.es/fotos/hero-firma.jpg",
        width: 1200,
        height: 900,
        alt: "Firma de una traducción jurada español-inglés de Jurada Express",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Traducción Jurada de Inglés Online desde 35 € | Jurada Express",
    description:
      "Traductora jurada de inglés desde 2009 (MAEC nº 7310). Traducción jurada español-inglés desde 35 € por documento, PDF firmado en 24/48 h, 100 % online.",
    images: ["https://juradaexpress.es/fotos/hero-firma.jpg"],
  },
  verification: {
    google: "7qUSXNkOvWn5YeesrooO2YBAmzwRRrPLKU7GWXxEi9c",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={fontClassName}>
      <body className="min-h-screen bg-white text-slate-900 antialiased">
        <SiteShell locale="es">{children}</SiteShell>
        <Analytics />
      </body>
    </html>
  );
}
