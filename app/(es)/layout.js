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
    "Traductora jurada de inglés desde 2009 (MAEC nº 7310). Traducción jurada español-inglés desde 35 €, PDF firmado en el día (hasta 10 páginas), 100 % online.",
  alternates: { canonical: "https://juradaexpress.es/" },
  openGraph: {
    title: "Traducción Jurada de Inglés Online desde 35 € | Jurada Express",
    description:
      "Traductora jurada de inglés desde 2009 (MAEC nº 7310). Traducción jurada español-inglés desde 35 €, PDF firmado en el día (hasta 10 páginas), 100 % online.",
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
      "Traductora jurada de inglés desde 2009 (MAEC nº 7310). Traducción jurada español-inglés desde 35 €, PDF firmado en el día (hasta 10 páginas), 100 % online.",
    images: ["https://juradaexpress.es/fotos/hero-firma.jpg"],
  },
  verification: {
    google: "7qUSXNkOvWn5YeesrooO2YBAmzwRRrPLKU7GWXxEi9c",
  },
};

// Valores por defecto del modo de consentimiento v2 (Google Ads / GA4).
const CONSENT_DEFAULT =
  "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500});";

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={fontClassName}>
      <head>
        {/* Modo de consentimiento v2 de Google: todo denegado por defecto.
            Script inline síncrono en <head>, antes de cualquier otro script
            (next/script con beforeInteractive fuera de <head> rompe la
            hidratación en Next 14); CookieConsent.js envía el `update`. */}
        <script
          id="consent-default"
          dangerouslySetInnerHTML={{ __html: CONSENT_DEFAULT }}
        />
      </head>
      <body className="min-h-screen bg-white text-slate-900 antialiased">
        <SiteShell locale="es">{children}</SiteShell>
        <Analytics />
      </body>
    </html>
  );
}
