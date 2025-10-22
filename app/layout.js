// app/layout.js
import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://juradaexpress.es"),
  title: {
    default: "JuradaExpress — Traducción Jurada en Murcia",
    template: "%s | JuradaExpress",
  },
  description:
    "Traducciones juradas Español ⇆ Inglés en Murcia. Envíos a toda España y al extranjero. Entrega 24/48 h. Presupuesto inmediato.",
  alternates: { canonical: "https://juradaexpress.es" },
  openGraph: {
    title: "JuradaExpress — Traducción Jurada en Murcia",
    description:
      "Traducciones juradas Español ⇆ Inglés en Murcia. Envíos a toda España y al extranjero. Entrega 24/48 h.",
    url: "https://juradaexpress.es/",
    siteName: "JuradaExpress",
    locale: "es_ES",
    type: "website",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "JuradaExpress — Traducción Jurada" }],
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="min-h-screen bg-white text-slate-900 antialiased">
        {/* Header / Navbar */}
        <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <a href="/" className="flex items-center gap-2">
              <img src="/logo.svg" alt="JuradaExpress" className="h-8 w-8" />
              <span className="font-semibold">JuradaExpress</span>
            </a>
            <div className="hidden gap-6 sm:flex">
              <a href="/" className="hover:text-emerald-700">Inicio</a>
              <a href="/precios" className="hover:text-emerald-700">Precios</a>
              <a href="#contacto" className="hover:text-emerald-700">Contacto</a>
            </div>
            <div className="sm:hidden">
              <a href="tel:+34685891214" className="rounded-lg bg-emerald-600 px-3 py-2 text-white">
                Llamar
              </a>
            </div>
          </nav>
        </header>

        {/* AQUI ES DONDE SE RENDERIZA CADA PÁGINA */}
        <main>{children}</main>

        {/* Footer */}
        <footer id="contacto" className="mt-20 border-t">
          <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:grid-cols-3">
            <div>
              <h3 className="font-semibold">JuradaExpress</h3>
              <p className="mt-2 text-sm text-slate-600">
                Traducciones juradas Español ⇆ Inglés · Murcia · Envíos a toda España y extranjero · Entrega 24/48 h*
              </p>
            </div>
            <div>
              <h4 className="font-semibold">Contacto</h4>
              <ul className="mt-2 space-y-1 text-sm">
                <li><a className="hover:text-emerald-700" href="tel:+34685891214">Tel: 685 891 214</a></li>
                <li><a className="hover:text-emerald-700" href="mailto:info@juradaexpress.es">info@juradaexpress.es</a></li>
              </ul>
            </div>
            <div className="text-sm text-slate-600">
              * Plazo orientativo para encargos habituales. Proyectos &gt;20 folios: acordamos calendario específico.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
