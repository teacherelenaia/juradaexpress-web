// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}" // donde tienes posts.js
  ],
  theme: {
    extend: {
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
