// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}" // donde tienes posts.js
  ],
  theme: {
    // Sombras tintadas con el azul marino de marca en lugar del negro puro.
    boxShadow: {
      sm: "0 1px 2px 0 rgb(11 37 69 / 0.08)",
      DEFAULT: "0 2px 8px -2px rgb(11 37 69 / 0.12)",
      md: "0 4px 12px -4px rgb(11 37 69 / 0.16)",
      lg: "0 8px 24px -12px rgb(11 37 69 / 0.25)",
      card: "0 8px 24px -12px rgb(11 37 69 / 0.25)",
      none: "none",
    },
    extend: {
      fontFamily: {
        // Manrope para cuerpo y UI, Newsreader para display (titulares).
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
        display: ["var(--font-newsreader)", "Georgia", "serif"],
      },
      fontSize: {
        // Cuerpo base del sitio: 17 px (1.0625 rem).
        body: ["1.0625rem", { lineHeight: "1.65" }],
        // Display del hero: fluido hasta 4.5 rem (3.5–4.5 rem de tablet en
        // adelante; algo menor en móvil para que el titular no desborde).
        display: [
          "clamp(2.75rem, 2rem + 3vw, 4.5rem)",
          { lineHeight: "1.05", letterSpacing: "-0.02em" },
        ],
      },
      borderRadius: {
        // Contenedores 0.75rem (rounded-xl de serie) · controles 0.5rem
        // (rounded-lg de serie) · botones 0.625rem:
        btn: "0.625rem",
      },
      colors: {
        "brand-navy": {
          DEFAULT: "#0B2545",
          50: "#EEF2F7",
          100: "#D6DEEA",
          200: "#AEBED6",
          300: "#7E97B8",
          400: "#4C6D94",
          500: "#254876",
          600: "#0B2545",
          700: "#091D38",
          800: "#06152A",
          900: "#040D1C",
        },
        "brand-gold": {
          DEFAULT: "#C9A24B",
          50: "#FBF6EC",
          100: "#F5E9CE",
          200: "#EAD29D",
          300: "#DEBB6E",
          400: "#D3AC5A",
          500: "#C9A24B",
          600: "#B08935",
          700: "#8C6D2A",
          900: "#5C481B",
        },
      },
    }
  },
  plugins: [require("@tailwindcss/typography")]
};
