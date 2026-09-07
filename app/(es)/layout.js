// app/(es)/layout.js
//
// Root layout de la versión en español. Route group "(es)": no cambia
// ninguna URL. La versión en inglés tiene su propio root layout en
// app/en/layout.js con <html lang="en"> (antes todo el sitio se servía con
// lang="es", incluidas las páginas /en/*).
import "../globals.css";
import SiteShell from "../components/SiteShell";
import { fontClassName } from "../fonts";

export const metadata = {
  metadataBase: new URL("https://juradaexpress.es"),
  // Posicionamiento internacional (encargo 2026-09): title ≤ 60 caracteres,
  // description ≤ 155. "Jurada Express" (con espacio) es el nombre de la
  // entidad; "JuradaExpress" se conserva solo como logotipo.
  title: {
    default: "Traductor Jurado Español-Inglés Online | Jurada Express",
    template: "%s | Jurada Express",
  },
  description:
    "Traducción jurada español-inglés con validez oficial y traducción certificada para USCIS. Clientes en España, Reino Unido, EE. UU., India y todo el mundo. Entrega 24/48 h.",
  alternates: { canonical: "https://juradaexpress.es/" },
  openGraph: {
    title: "Traductor Jurado Español-Inglés Online | Jurada Express",
    description:
      "Traducción jurada español-inglés con validez oficial y traducción certificada para USCIS. Clientes en España, Reino Unido, EE. UU., India y todo el mundo. Entrega 24/48 h.",
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
    title: "Traductor Jurado Español-Inglés Online | Jurada Express",
    description:
      "Traducción jurada español-inglés con validez oficial y traducción certificada para USCIS. Clientes en España, Reino Unido, EE. UU., India y todo el mundo. Entrega 24/48 h.",
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
      </body>
    </html>
  );
}
