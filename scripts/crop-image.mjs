// scripts/crop-image.mjs
//
// Recorta y redimensiona una imagen con Chromium (Playwright) cuando no hay
// sharp/ImageMagick disponibles. Uso:
//   node scripts/crop-image.mjs <entrada> <salida.jpg> <x> <y> <w> <h> <anchoSalida> [calidad 0-1]
import { chromium } from "@playwright/test";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const [,, input, output, x, y, w, h, outW, quality = "0.82"] = process.argv;
const buf = await readFile(input);
const ext = path.extname(input).toLowerCase();
const mime = buf.slice(0, 4).toString() === "RIFF" ? "image/webp" : ext === ".png" ? "image/png" : "image/jpeg";
const dataUrl = `data:${mime};base64,${buf.toString("base64")}`;

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
});
const page = await browser.newPage();
const result = await page.evaluate(
  async ({ dataUrl, x, y, w, h, outW, quality }) => {
    const img = new Image();
    img.src = dataUrl;
    await img.decode();
    const scale = outW / w;
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(w * scale);
    canvas.height = Math.round(h * scale);
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, x, y, w, h, 0, 0, canvas.width, canvas.height);
    return { data: canvas.toDataURL("image/jpeg", quality), src: `${img.naturalWidth}x${img.naturalHeight}` };
  },
  { dataUrl, x: +x, y: +y, w: +w, h: +h, outW: +outW, quality: +quality }
);
await browser.close();
const out = Buffer.from(result.data.split(",")[1], "base64");
await writeFile(output, out);
console.log(`${input} (${result.src}) → ${output} ${(out.length / 1024).toFixed(0)} KB`);
