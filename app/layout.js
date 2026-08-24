// app/layout.js
import "./globals.css";
import CookieConsent from "./components/CookieConsent";
import MobileNav from "./components/MobileNav";
import LanguageSwitcher from "./components/LanguageSwitcher";

export const metadata = {
  metadataBase: new URL("https://juradaexpress.es"),
  title: {
    default: "JuradaExpress — Traductor Jurado Español-Inglés | España y Reino Unido",
    template: "%s | JuradaExpress",
  },
  description:
    "Traductor jurado Español ⇆ Inglés. Trabajo con clientes de toda España, Reino Unido y el extranjero. Envío 100% digital, entrega 24/48 h. Presupuesto inmediato por email o WhatsApp.",
  alternates: { canonical: "https://juradaexpress.es/" },
  openGraph: {
    title: "JuradaExpress — Traductor Jurado Español-Inglés | España y Reino Unido",
    description:
      "Traducción jurada válida ante organismos oficiales. Entrega 24/48 h. Trabajo con clientes de toda España, Reino Unido y el extranjero.",
    url: "https://juradaexpress.es/",
    siteName: "JuradaExpress",
    type: "website",
    locale: "es_ES",
    images: [
      {
        url: "https://juradaexpress.es/hero-internacional.jpg",
        width: 1920,
        height: 1080,
        alt: "JuradaExpress — Traducción jurada Español ⇆ Inglés, envío digital a toda España y al extranjero",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JuradaExpress — Traductor Jurado Español-Inglés | España y Reino Unido",
    description:
      "Traducción jurada (Español ⇆ Inglés). Entrega 24/48 h. Trabajo con clientes de toda España, Reino Unido y el extranjero.",
    images: ["https://juradaexpress.es/hero-internacional.jpg"],
  },
  verification: {
    google: "7qUSXNkOvWn5YeesrooO2YBAmzwRRrPLKU7GWXxEi9c",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-white text-slate-900 antialiased">
        {/* Cookies + GA4 (GA4 solo se carga tras aceptar) */}
        <CookieConsent />

        {/* Header */}
        <header className="sticky top-0 z-40 bg-brand-navy text-slate-100 shadow-sm relative">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            {/* Logo */}
            <a
              href="/"
              className="inline-flex items-center gap-2 font-semibold tracking-tight text-white"
              aria-label="JuradaExpress — Inicio"
            >
              <img
                src="/logo.svg"
                alt=""
                width="26"
                height="26"
                className="rounded opacity-90"
              />
              <span>JuradaExpress</span>
            </a>

            {/* Nav */}
            <nav className="hidden items-center gap-6 md:flex">
              <a href="/" className="text-slate-200 hover:text-brand-gold-300">
                Inicio
              </a>
              <a href="/precios" className="text-slate-200 hover:text-brand-gold-300">
                Precios
              </a>
              <a href="/documentos" className="text-slate-200 hover:text-brand-gold-300">
                Documentos
              </a>
              <a href="/blog" className="text-slate-200 hover:text-brand-gold-300">
                Blog
              </a>
              <a href="/preguntas-frecuentes" className="text-slate-200 hover:text-brand-gold-300">
                Preguntas Frecuentes
              </a>
              <a href="/contacto" className="text-slate-200 hover:text-brand-gold-300">
                Contacto
              </a>
            </nav>

            {/* Acciones rápidas */}
            <div className="flex items-center gap-2">
              <LanguageSwitcher className="hidden md:inline-flex" />
              <a
                href="tel:+34685891214"
                className="hidden rounded-full border border-white/20 px-3 py-1 text-sm text-slate-100 hover:border-brand-gold-300 hover:text-brand-gold-300 md:inline-block"
                aria-label="Llamar 685 891 214"
              >
                685 891 214
              </a>
              <a
                href="mailto:info@juradaexpress.es?subject=Presupuesto%20traducci%C3%B3n%20jurada"
                className="rounded-full bg-brand-gold px-3 py-1 text-sm font-medium text-brand-navy-900 hover:bg-brand-gold-400"
              >
                Pedir presupuesto
              </a>
              <MobileNav />
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
                Traducciones juradas Español ⇆ Inglés. Con sede en Murcia,
                trabajo con clientes de toda España y de cualquier país —
                proceso 100% digital. Entrega 24/48 h.
              </p>
            </div>

            <div>
              <h3 className="font-medium">Enlaces</h3>
              <ul className="mt-2 space-y-1 text-sm">
                <li>
                  <a href="/" className="hover:text-brand-gold-700">
                    Inicio
                  </a>
                </li>
                <li>
                  <a href="/precios" className="hover:text-brand-gold-700">
                    Precios
                  </a>
                </li>
                <li>
                  <a href="/documentos" className="hover:text-brand-gold-700">
                    Documentos
                  </a>
                </li>
                <li>
                  <a href="/blog" className="hover:text-brand-gold-700">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="/contacto" className="hover:text-brand-gold-700">
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
                    className="hover:text-brand-gold-700"
                  >
                    info@juradaexpress.es
                  </a>
                </li>
                <li>
                  <a href="tel:+34685891214" className="hover:text-brand-gold-700">
                    685 891 214
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/34685891214?text=Hola%20JuradaExpress,%20quisiera%20un%20presupuesto"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-brand-gold-700"
                  >
                    WhatsApp directo
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t py-4 text-center text-xs text-slate-500">
            <p>
              © {new Date().getFullYear()} JuradaExpress · Todos los derechos
              reservados
            </p>
            <p className="mt-1">
              Elena Peñaranda Ortega · Traductora-Intérprete Jurada de Inglés
              nombrada por el Ministerio de Asuntos Exteriores, Unión Europea
              y Cooperación · Nº de acreditación: 7310
            </p>
          </div>

          {/* JSON-LD ProfessionalService (SEO) */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "ProfessionalService",
                name: "JuradaExpress",
                url: "https://juradaexpress.es/",
                email: "info@juradaexpress.es",
                telephone: "+34685891214",
                logo: "https://juradaexpress.es/logo.svg",
                image: "https://juradaexpress.es/logo.svg",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "Carril de los Leales",
                  postalCode: "30009",
                  addressLocality: "Murcia",
                  addressRegion: "Región de Murcia",
                  addressCountry: "ES",
                },
                areaServed: ["Murcia", "España"],
                priceRange: "€€",
                sameAs: ["https://wa.me/34685891214"],
              }),
            }}
          />
        </footer>
      </body>
    </html>
  );
}
