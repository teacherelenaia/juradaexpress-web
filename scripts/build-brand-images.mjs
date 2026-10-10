// scripts/build-brand-images.mjs
//
// Genera las imágenes de marca en PNG a partir de public/logo.svg
// (10/10/2026). Los motores de respuesta (ChatGPT, Perplexity, Bing) no
// leen el logo SVG y acababan poniendo el logotipo de un competidor junto a
// «Jurada Express»; el JSON-LD de la organización (SiteShell.js) y las
// tarjetas og:image de la portada apuntan a estos archivos.
//
//   public/jurada-express-logo.png   1200×1200  logo + «Jurada Express»
//   public/og-home.png               1200×630   logo + nombre + credencial (ES)
//   public/og-home-en.png            1200×630   idem en inglés
//
//   npm run brand-images
//
// El texto se dibuja con la tipografía de la web (Manrope, la del logotipo
// de la cabecera) convertida a trazados con opentype.js, para que el
// resultado no dependa de las fuentes instaladas en el sistema. Las fuentes
// estáticas (Manrope 500 y 700) se descargan de Google Fonts la primera vez
// y se guardan en node_modules/.cache/brand-fonts/. Se puede volver a
// ejecutar cuando cambie el logo o el texto. opentype.js va fijado en la
// 1.3.x: la 2.0 devuelve coordenadas NaN en algunas secuencias de glifos de
// Manrope ("or", "gl") y el texto salía cortado.
import { mkdir, readFile, writeFile, access } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import opentype from "opentype.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC = path.join(ROOT, "public");
const CACHE = path.join(ROOT, "node_modules", ".cache", "brand-fonts");

const NAVY = "#0B2545";
const SLATE = "#475569";
const GOLD = "#C9A24B";
const WHITE = { r: 255, g: 255, b: 255, alpha: 1 };

const BRAND = "Jurada Express";
const TAGLINE = {
  es: "Traductora jurada de inglés · MAEC nº 7310",
  en: "Sworn English–Spanish translator · MAEC No. 7310",
};

// --- Fuentes ---------------------------------------------------------------

async function exists(file) {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}

// Descarga la instancia estática de Manrope del peso pedido (la API de
// Google Fonts devuelve un TTF por peso cuando el cliente no es un navegador
// moderno) y la guarda en la caché.
async function fontFile(weight) {
  const file = path.join(CACHE, `manrope-${weight}.ttf`);
  if (await exists(file)) return file;
  await mkdir(CACHE, { recursive: true });
  const css = await (
    await fetch(
      `https://fonts.googleapis.com/css2?family=Manrope:wght@${weight}&display=swap`,
      { headers: { "User-Agent": "curl/8" } }
    )
  ).text();
  const url = css.match(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+\.ttf)\)/)?.[1];
  if (!url) throw new Error(`No encuentro el TTF de Manrope ${weight} en la respuesta de Google Fonts`);
  const buf = Buffer.from(await (await fetch(url)).arrayBuffer());
  await writeFile(file, buf);
  return file;
}

async function loadFont(weight) {
  const buf = await readFile(await fontFile(weight));
  return opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
}

// --- Texto como trazado SVG ------------------------------------------------

// Devuelve { svg, width, height } con el texto dibujado como <path>, listo
// para componer con sharp. `x`/`y` del trazado se normalizan al origen.
function textSvg(font, text, { size, fill, letterSpacing = 0 }) {
  const p = font.getPath(text, 0, 0, size, { letterSpacing: letterSpacing / size });
  const box = p.getBoundingBox();
  const pad = 2;
  const width = Math.ceil(box.x2 - box.x1) + pad * 2;
  const height = Math.ceil(box.y2 - box.y1) + pad * 2;
  const moved = font.getPath(text, pad - box.x1, pad - box.y1, size, {
    letterSpacing: letterSpacing / size,
  });
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><path d="${moved.toPathData(2)}" fill="${fill}"/></svg>`;
  return { svg: Buffer.from(svg), width, height };
}

async function logoPng(size) {
  const svg = await readFile(path.join(PUBLIC, "logo.svg"));
  return sharp(svg, { density: 300 }).resize(size, size).png().toBuffer();
}

const canvas = (width, height) =>
  sharp({ create: { width, height, channels: 4, background: WHITE } });

// --- Imágenes --------------------------------------------------------------

// 1200×1200: logo centrado y el nombre debajo (legible a 200 px).
async function buildLogo(bold) {
  const W = 1200;
  const logoSize = 540;
  const name = textSvg(bold, BRAND, { size: 132, fill: NAVY, letterSpacing: -2 });
  const gap = 72;
  const total = logoSize + gap + name.height;
  const top = Math.round((W - total) / 2);
  const png = await canvas(W, W)
    .composite([
      { input: await logoPng(logoSize), left: Math.round((W - logoSize) / 2), top },
      {
        input: name.svg,
        left: Math.round((W - name.width) / 2),
        top: top + logoSize + gap,
      },
    ])
    .png({ compressionLevel: 9 })
    .toBuffer();
  await writeFile(path.join(PUBLIC, "jurada-express-logo.png"), png);
  return png.length;
}

// 1200×630: logo a la izquierda, nombre y credencial a la derecha.
async function buildOg(bold, medium, lang, file) {
  const W = 1200;
  const H = 630;
  const logoSize = 260;
  const name = textSvg(bold, BRAND, { size: 96, fill: NAVY, letterSpacing: -1.5 });
  const tag = textSvg(medium, TAGLINE[lang], { size: 36, fill: SLATE });
  const ruleH = 5;
  const gap1 = 26;
  const gap2 = 30;
  const textH = name.height + gap1 + ruleH + gap2 + tag.height;
  const textW = Math.max(name.width, tag.width);
  const gapLogo = 64;
  const blockW = logoSize + gapLogo + textW;
  const left = Math.round((W - blockW) / 2);
  const textLeft = left + logoSize + gapLogo;
  const textTop = Math.round((H - textH) / 2);
  const rule = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="${ruleH}"><rect width="96" height="${ruleH}" rx="2.5" fill="${GOLD}"/></svg>`
  );
  const png = await canvas(W, H)
    .composite([
      { input: await logoPng(logoSize), left, top: Math.round((H - logoSize) / 2) },
      { input: name.svg, left: textLeft, top: textTop },
      { input: rule, left: textLeft + 4, top: textTop + name.height + gap1 },
      { input: tag.svg, left: textLeft + 2, top: textTop + name.height + gap1 + ruleH + gap2 },
    ])
    .png({ compressionLevel: 9 })
    .toBuffer();
  await writeFile(path.join(PUBLIC, file), png);
  return png.length;
}

async function main() {
  const [bold, medium] = await Promise.all([loadFont(700), loadFont(500)]);
  const kb = (n) => `${Math.round(n / 1024)} KB`;
  console.log(`jurada-express-logo.png  ${kb(await buildLogo(bold))}`);
  console.log(`og-home.png              ${kb(await buildOg(bold, medium, "es", "og-home.png"))}`);
  console.log(`og-home-en.png           ${kb(await buildOg(bold, medium, "en", "og-home-en.png"))}`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
