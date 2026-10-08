// app/en/layout.js
//
// Root layout de la versión en inglés (/en/*): <html lang="en"> servido
// estáticamente, mismo SiteShell (cabecera, footer y JSON-LD) localizado.
import "../globals.css";
import { Analytics } from "@vercel/analytics/next";
import SiteShell from "../components/SiteShell";
import { fontClassName } from "../fonts";

export const metadata = {
  metadataBase: new URL("https://juradaexpress.es"),
  title: {
    default: "Sworn Spanish-English Translation Online from €35 | Jurada Express",
    template: "%s | Jurada Express",
  },
  description:
    "Sworn Spanish-English translation from €35 per document, signed PDF the same day (up to 10 pages). Foreign Ministry appointee no. 7310. 100% online.",
  alternates: { canonical: "https://juradaexpress.es/en" },
  openGraph: {
    siteName: "Jurada Express",
    type: "website",
    locale: "en_GB",
    images: [
      {
        url: "https://juradaexpress.es/fotos/hero-firma.jpg",
        width: 1200,
        height: 900,
        alt: "Signing a sworn Spanish-English translation at Jurada Express",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://juradaexpress.es/fotos/hero-firma.jpg"],
  },
  verification: {
    google: "7qUSXNkOvWn5YeesrooO2YBAmzwRRrPLKU7GWXxEi9c",
  },
};

// Valores por defecto del modo de consentimiento v2 (Google Ads / GA4).
const CONSENT_DEFAULT =
  "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500});";

export default function RootLayoutEn({ children }) {
  return (
    <html lang="en" className={fontClassName}>
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
        <SiteShell locale="en">{children}</SiteShell>
        <Analytics />
      </body>
    </html>
  );
}
