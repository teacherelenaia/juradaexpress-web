// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}" // donde tienes posts.js
  ],
  theme: {
    extend: {}
  },
  plugins: [require("@tailwindcss/typography")]
};
