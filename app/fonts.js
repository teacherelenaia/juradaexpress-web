// app/fonts.js
// Tipografía del sistema visual: Manrope (cuerpo/UI) + Newsreader (display),
// servidas con next/font para evitar CLS y peticiones a terceros. Se
// comparte entre los dos root layouts (app/(es) y app/en).
//
// Desde el 10/10/2026 las fuentes viven en el repo (app/fonts/*.woff2,
// subconjunto latino de las versiones variables que sirve Google Fonts) y
// se cargan con next/font/local. Antes se usaba next/font/google, que
// descarga la CSS y los archivos de Google en cada build: en GitHub
// Actions la descarga de Newsreader devolvía una URL sin extensión y el
// build fallaba («Cannot read properties of null (reading '1')» en el
// cargador de next/font), mientras que en local y en Vercel funcionaba.
// Con los archivos en el repo el build es reproducible en cualquier sitio.
// Los @font-face resultantes son los mismos: Manrope 400-700 normal y
// Newsreader 600-700 normal e itálica, con display swap y la métrica de
// respaldo ajustada (Arial y Times New Roman) para evitar saltos.
import localFont from "next/font/local";

const manrope = localFont({
  src: [{ path: "./fonts/manrope-latin.woff2", weight: "400 700", style: "normal" }],
  variable: "--font-manrope",
  display: "swap",
  adjustFontFallback: "Arial",
});

const newsreader = localFont({
  src: [
    { path: "./fonts/newsreader-latin.woff2", weight: "600 700", style: "normal" },
    { path: "./fonts/newsreader-latin-italic.woff2", weight: "600 700", style: "italic" },
  ],
  variable: "--font-newsreader",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

export const fontClassName = `${manrope.variable} ${newsreader.variable}`;
