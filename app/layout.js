import "./globals.css";

export const metadata = {
  title: "JuradaExpress – Traducción Jurada en Murcia (Español ⇆ Inglés)",
  description: "Traducciones juradas de Español ⇆ Inglés en Murcia con envíos a toda España y al extranjero. Entrega 24–48 h (orientativo) y presupuesto rápido. Digital o papel.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900">
        {children}
      </body>
    </html>
  );
}
