// app/en/layout.js
//
// Root layout de la versión en inglés (/en/*): <html lang="en"> servido
// estáticamente, mismo SiteShell (cabecera, footer y JSON-LD) localizado.
import "../globals.css";
import SiteShell from "../components/SiteShell";
import { fontClassName } from "../fonts";

export const metadata = {
  metadataBase: new URL("https://juradaexpress.es"),
  title: {
    default: "Sworn Spanish-English Translator Online | Jurada Express",
    template: "%s | Jurada Express",
  },
  description:
    "Sworn translation for Spain, certified translation for USCIS and digital nomad visa documents. Sworn translator appointed by Spain's Ministry of Foreign Affairs (no. 7310). Delivered in 24/48h.",
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

export default function RootLayoutEn({ children }) {
  return (
    <html lang="en" className={fontClassName}>
      <body className="min-h-screen bg-white text-slate-900 antialiased">
        <SiteShell locale="en">{children}</SiteShell>
      </body>
    </html>
  );
}
