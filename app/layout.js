// app/layout.js

import "./globals.css";

export const metadata = {
  title: "JuradaExpress – Traducciones juradas en Murcia (Español ⇆ Inglés)",
  description:
    "Traducciones juradas de Español ⇆ Inglés en Murcia con envíos a toda España y al extranjero. Entrega 24–48 h (orientativa) y presupuesto rápido. Digital o papel.",
  metadataBase: new URL("https://juradaexpress.es"),
  alternates: {
    canonical: "https://juradaexpress.es",
  },
  openGraph: {
    title: "JuradaExpress – Traducciones juradas en Murcia",
    description:
      "Traducciones juradas de Español ⇆ Inglés en Murcia y online. Envíos a toda España y extranjero. Entrega 24–48 h (orientativa).",
    url: "https://juradaexpress.es",
    siteName: "JuradaExpress",
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: "/og.jpg", // súbelo a /public/og.jpg (1200x630 recomendado)
        width: 1200,
        height: 630,
        alt: "JuradaExpress – Traducciones juradas Español ⇆ Inglés",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JuradaExpress – Traducciones juradas en Murcia",
    description:
      "Español ⇆ Inglés. Envíos a toda España y extranjero. Entrega 24–48 h.",
    images: ["/og.jpg"],
  },
  icons: {
    icon: "/favicon.ico", // súbelo a /public/favicon.ico
    apple: "/apple-touch-icon.png", // opcional: /public/apple-touch-icon.png (180x180)
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900 antialiased">
        <main className="mx-auto max-w-6xl px-4 py-10">{children}</main>
      </body>
    </html>
  );
}
