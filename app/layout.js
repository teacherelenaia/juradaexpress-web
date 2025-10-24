// app/layout.js
import "./globals.css";
import Script from "next/script";

const GA4_ID = "G-4Q24BN11PX";

export const metadata = {
  metadataBase: new URL("https://juradaexpress.es"),
  title: {
    default: "JuradaExpress — Traducción Jurada en Murcia",
    template: "%s | JuradaExpress",
  },
  description:
    "Traductor jurado en Murcia (Español ⇆ Inglés). Envíos a toda España y al extranjero. Entrega 24/48 h. Presupuesto inmediato por email o WhatsApp.",
  alternates: { canonical: "https://juradaexpress.es/" },
  openGraph: {
    title: "JuradaExpress — Traducción Jurada en Murcia",
    description:
      "Traducción jurada válida ante organismos oficiales. Entrega 24/48 h. Envíos a toda España y extranjero.",
    url: "https://juradaexpress.es/",
    siteName: "JuradaExpress",
    type: "website",
    locale: "es_ES",
    images: [
      {
        url: "https://juradaexpress.es/hero-murcia.jpg",
        width: 1200,
        height: 800,
        alt: "Catedral de Murcia — JuradaExpress",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JuradaExpress — Traducción Jurada en Murcia",
    description:
      "Traducción jurada (Español ⇆ Inglés). Entrega 24/48 h. Envíos a toda España y extranjero.",
    images: ["https://juradaexpress.es/hero-murcia.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-white text-slate-900 antialiased">
        {/* GA4 */}
        {GA4_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = window.gtag || gtag;
                gtag('js', new Date());
                gtag('config', '${GA4_ID}', {
                  anonymize_ip: true,
                  allow_google_signals: false
                });
              `}
            </Script>
          </>
        )}

        {/* Header */}
        <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            {/* Logo */}
            <a
              href="/"
              className="inline-flex items-center gap-2 font-semibold tracking-tight"
              aria-label="JuradaExpress — Inicio"
            >
              <img
                src="/logo.svg"
                alt=""
                width="26"
                height="26"
                className="opacity-90"
              />
              <span>JuradaExpress</span>
            </a>

            {/* Nav */}
            <nav className="hidden items-center gap-6 md:flex">
              <a href="/" className="hover:text-emerald-700">
                Inicio
              </a>
              <a href="/precios" className="hover:text-emerald-700">
                Precios
              </a>
              <a href="/blog" className="hover:text-emerald-700">
                Blog
              </a>
              <a href="/contacto" className="hover:text-emerald-700">
                Contacto
              </a>
            </nav>

            {/* Acciones rápidas */}
            <div className="flex items-center gap-2">
              <a
                href="tel:+34685891214"
                className="hidden rounded-full border border-emerald-200 px-3 py-1 text-sm text-emerald-900 hover:bg-emerald-50 md:inline-block"
                aria-label="Llamar 685 891 214"
              >
                685 891 214
              </a>
              <a
                href="mailto:info@juradaexpress.es?subject=Presupuesto%20traducci%C3%B3n%20jurada"
                className="rounded-full bg-black px-3 py-1 text-sm text-white hover:bg-slate-800"
              >
                Pedir presupuesto
              </a>
            </div>
          </div>
        </header>

        {/* Contenido */}
        {children}

        {/* Footer */}
        <footer className="mt-14 border-t bg-white">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-3">
            <div>
              <div className="mb-2 inline-flex items-center gap-2 font-semibold">
                <img
                  src="/logo.svg"
                  width="24"
                  height="24"
                  alt=""
                  className="opacity-90"
                />
                <span>JuradaExpress</span>
              </div>
              <p className="max-w-sm text-sm text-slate-600">
                Traducciones juradas Español ⇆ Inglés en Murcia. Envíos a toda
                España y al extranjero. Entrega 24/48 h.
              </p>
            </div>

            <div>
              <h3 className="font-medium">Enlaces</h3>
              <ul className="mt-2 space-y-1 text-sm">
                <li>
                  <a href="/" className="hover:text-emerald-700">
                    Inicio
                  </a>
                </li>
                <li>
                  <a href="/precios" className="hover:text-emerald-700">
                    Precios
                  </a>
                </li>
                <li>
                  <a href="/blog" className="hover:text-emerald-700">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="/contacto" className="hover:text-emerald-700">
                    Contacto
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium">Contacto</h3>
              <ul className="mt-2 space-y-1 text-sm">
                <li>
                  <a
                    href="mailto:info@juradaexpress.es"
                    className="hover:text-emerald-700"
                  >
                    info@juradaexpress.es
                  </a>
                </li>
                <li>
                  <a href="tel:+34685891214" className="hover:text-emerald-700">
                    685 891 214
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/34685891214?text=Hola%20JuradaExpress,%20quisiera%20un%20presupuesto"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-emerald-700"
                  >
                    WhatsApp directo
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t py-4 text-center text-xs text-slate-500">
            © {new Date().getFullYear()} JuradaExpress · Todos los derechos
            reservados
          </div>

          {/* JSON-LD Organization (SEO) */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "JuradaExpress",
                url: "https://juradaexpress.es/",
                email: "info@juradaexpress.es",
                telephone: "+34 685 891 214",
                logo: "https://juradaexpress.es/logo.svg",
                sameAs: ["https://wa.me/34685891214"],
              }),
            }}
          />
        </footer>
      </body>
    </html>
  );
}
