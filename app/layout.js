import "./globals.css";

export const metadata = {
  title: "JuradaExpress – Traducción Jurada en Murcia (Español ⇆ Inglés)",
  description:
    "Traducciones juradas de Español ⇆ Inglés en Murcia con envíos a toda España y al extranjero. Entrega 24–48 h (orientativo) y presupuesto rápido. Digital o papel.",
  metadataBase: new URL("https://tu-dominio-final.es"),
  openGraph: {
    title: "JuradaExpress – Traducción Jurada",
    description:
      "Español ⇆ Inglés. Murcia y online. Entrega 24–48 h. Envíos a toda España y extranjero.",
    url: "https://tu-dominio-final.es",
    siteName: "JuradaExpress",
    type: "website",
    locale: "es_ES",
  },
  alternates: { canonical: "https://tu-dominio-final.es" },
};
icons: { icon: "/favicon.ico" },
  openGraph: { images: ["/og.jpg"] },
export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900">
        {children}
      </body>
    </html>
  );
}
