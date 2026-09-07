// app/fonts.js
// Tipografía del sistema visual: Manrope (cuerpo/UI) + Newsreader (display),
// servidas con next/font para evitar CLS y peticiones a terceros. Se
// comparte entre los dos root layouts (app/(es) y app/en).
import { Manrope, Newsreader } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["600", "700"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

export const fontClassName = `${manrope.variable} ${newsreader.variable}`;
