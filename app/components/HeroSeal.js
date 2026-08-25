// app/components/HeroSeal.js
// Sello circular de traductora jurada (SVG, dorado de marca) que entra con
// scale(0.95) → 1 + opacidad en 200 ms (clase .hero-seal en globals.css).
// El texto del sello se mantiene en español en ambos idiomas: es la
// identidad del sello oficial real.
export default function HeroSeal({ className = "" }) {
  return (
    <div className={`hero-seal ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 160 160"
        className="h-full w-full drop-shadow-md"
        role="img"
      >
        <defs>
          <path
            id="seal-arc-top"
            d="M 80 80 m -56 0 a 56 56 0 1 1 112 0"
          />
          <path
            id="seal-arc-bottom"
            d="M 80 80 m -56 0 a 56 56 0 1 0 112 0"
          />
        </defs>
        {/* Fondo papel translúcido para que funcione sobre la foto */}
        <circle cx="80" cy="80" r="76" fill="#FFFFFF" fillOpacity="0.92" />
        {/* Anillos del sello */}
        <circle
          cx="80"
          cy="80"
          r="72"
          fill="none"
          stroke="#8C6D2A"
          strokeWidth="3"
        />
        <circle
          cx="80"
          cy="80"
          r="64"
          fill="none"
          stroke="#8C6D2A"
          strokeWidth="1.5"
        />
        {/* Texto circular */}
        <text
          fill="#8C6D2A"
          fontSize="12.5"
          fontWeight="600"
          letterSpacing="2.5"
          fontFamily="var(--font-manrope), system-ui, sans-serif"
        >
          <textPath href="#seal-arc-top" startOffset="50%" textAnchor="middle">
            TRADUCTORA JURADA
          </textPath>
        </text>
        <text
          fill="#8C6D2A"
          fontSize="12.5"
          fontWeight="600"
          letterSpacing="2.5"
          fontFamily="var(--font-manrope), system-ui, sans-serif"
        >
          <textPath
            href="#seal-arc-bottom"
            startOffset="50%"
            textAnchor="middle"
          >
            ESPAÑOL ⇆ INGLÉS
          </textPath>
        </text>
        {/* Centro */}
        <text
          x="80"
          y="74"
          textAnchor="middle"
          fill="#0B2545"
          fontSize="15"
          fontWeight="700"
          fontFamily="var(--font-newsreader), Georgia, serif"
        >
          Nº 7310
        </text>
        <line
          x1="52"
          y1="82"
          x2="108"
          y2="82"
          stroke="#8C6D2A"
          strokeWidth="1"
        />
        <text
          x="80"
          y="98"
          textAnchor="middle"
          fill="#0B2545"
          fontSize="10.5"
          fontWeight="600"
          letterSpacing="1"
          fontFamily="var(--font-manrope), system-ui, sans-serif"
        >
          MAEC · ESPAÑA
        </text>
      </svg>
    </div>
  );
}
