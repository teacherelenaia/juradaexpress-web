// app/layout.js
import "./globals.css";

// —————————————————————————————————————
// SEO / METADATA
// —————————————————————————————————————
export const metadata = {
  metadataBase: new URL("https://juradaexpress.es"),
  title: {
    default: "JuradaExpress – Traducción Jurada en Murcia",
    template: "%s | JuradaExpress",
  },
  description:
    "Traducciones juradas de Español ↔ Inglés en Murcia, con envíos a toda España y al extranjero. Entrega 24/48 h (orientativo) y presupuesto rápido. Digital o papel.",
  alternates: { canonical: "https://juradaexpress.es" },
  openGraph: {
    title: "JuradaExpress – Traducción Jurada en Murcia",
    description:
      "Traducciones juradas Español ↔ Inglés en Murcia. Envíos a toda España y extranjero. Entrega 24/48 h (orientativo).",
    url: "https://juradaexpress.es/",
    siteName: "JuradaExpress",
    locale: "es_ES",
    type: "website",
    images: [
      { url: "/og.jpg", width: 1200, height: 630, alt: "JuradaExpress" },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

// —————————————————————————————————————
// LAYOUT
// —————————————————————————————————————
export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        {/* JSON-LD para negocio local (ayuda SEO) */}
        <script
          type="application/ld+json"
          // Nota: si cambias datos de contacto, actualiza aquí también
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "JuradaExpress",
              url: "https://juradaexpress.es",
              image: "https://juradaexpress.es/og.jpg",
              description:
                "Traducciones juradas Español ↔ Inglés en Murcia. Envíos a toda España y extranjero.",
              email: "info@juradaexpress.es",
              telephone: "+34 685 891 214",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Murcia",
                addressCountry: "ES",
              },
              areaServed: "ES",
              sameAs: [
                "https://juradaexpress.es",
                "https://juradaexpress.es/precios",
                "https://juradaexpress.es/blog",
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        {/* ====== CABECERA / MENÚ ====== */}
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
          <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
            <a href="/" className="flex items-center gap-2">
              <img src="/logo.svg" alt="JuradaExpress" className="h-7 w-7" />
              <span className="text-lg font-semibold">JuradaExpress</span>
            </a>

            <nav className="hidden gap-6 md:flex text-sm text-slate-700">
              <a href="/" className="hover:text-black">Inicio</a>
              <a href="/precios" className="hover:text-black">Precios</a>
              <a href="/blog" className="hover:text-black">Blog</a>
              <a href="#contacto" className="hover:text-black">Contacto</a>
            </nav>

            <div className="hidden md:flex items-center gap-3">
              <a
                href="https://wa.me/34685891214"
                className="rounded-full border px-3 py-1.5 text-sm hover:bg-slate-50"
                aria-label="WhatsApp 685 891 214"
              >
                685&nbsp;891&nbsp;214
              </a>
              <a
                href="mailto:info@juradaexpress.es"
                className="rounded-full bg-black px-4 py-1.5 text-sm font-medium text-white hover:bg-black/90"
              >
                Pedir presupuesto
              </a>
            </div>
          </div>
        </header>

        {/* ====== CONTENIDO DE CADA PÁGINA ====== */}
        <main>{children}</main>

        {/* ====== PIE DE PÁGINA / CONTACTO ====== */}
        <footer id="contacto" className="mt-16 border-t bg-white">
          <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 md:grid-cols-3">
            <div>
              <div className="flex items-center gap-2">
                <img src="/logo.svg" alt="JuradaExpress" className="h-7 w-7" />
                <span className="text-lg font-semibold">JuradaExpress</span>
              </div>
              <p className="mt-2 text-sm text-slate-600">
                Traducciones juradas Español ↔ Inglés en Murcia. Envíos a toda España y extranjero.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold">Enlaces</h3>
              <ul className="mt-2 space-y-1 text-sm text-slate-600">
                <li><a href="/" className="hover:text-black">Inicio</a></li>
                <li><a href="/precios" className="hover:text-black">Precios</a></li>
                <li><a href="/blog" className="hover:text-black">Blog</a></li>
                <li><a href="#contacto" className="hover:text-black">Contacto</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold">Contacto</h3>
              <ul className="mt-2 space-y-1 text-sm text-slate-600">
                <li>
                  <a href="mailto:info@juradaexpress.es" className="hover:text-black">
                    info@juradaexpress.es
                  </a>
                </li>
                <li>
                  <a href="tel:+34685891214" className="hover:text-black">
                    685 891 214
                  </a>
                </li>
                <li>
                  <a href="https://wa.me/34685891214" className="hover:text-black">
                    WhatsApp directo
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t py-4 text-center text-xs text-slate-500">
            © {new Date().getFullYear()} JuradaExpress. Todos los derechos reservados.
          </div>
        </footer>
      </body>
    </html>
  );
}
