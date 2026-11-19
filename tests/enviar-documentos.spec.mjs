// tests/enviar-documentos.spec.mjs
//
// «Enviar documentos» (19/11/2026).
//
// 1. Textos de los avisos (sin servidor): siempre.
// 2. De punta a punta contra un Google Drive SIMULADO (tests/mock-drive.mjs):
//    solo con DOCS_E2E=1 y un `next dev` que apunte al simulador:
//
//   node tests/mock-drive.mjs &
//   DRIVE_MOCK_URL=http://127.0.0.1:3399 GOOGLE_CLIENT_ID=x GOOGLE_CLIENT_SECRET=x \
//     GOOGLE_REFRESH_TOKEN=x npx next dev -p 3313 &
//   DOCS_E2E=1 PLAYWRIGHT_BASE_URL=http://127.0.0.1:3313 \
//     npx playwright test tests/enviar-documentos.spec.mjs
//
// Casos del diagnóstico: un PDF de 8 MB, diez fotos de móvil y un HEIC, más
// cortes de red, errores 503, recarga de la página y la calculadora.
import { test, expect } from "@playwright/test";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { randomBytes } from "node:crypto";
import {
  receivedSubject,
  failedSubject,
  receivedText,
  clientText,
  noteText,
  dataLines,
  isExpediente,
} from "../app/lib/docNotice.js";
import { limitReason } from "../app/lib/docLimits.js";

const MOCK = process.env.MOCK_DRIVE_URL || "http://127.0.0.1:3399";
const MB = 1024 * 1024;

// ─── 1. Textos ──────────────────────────────────────────────────────────

const ADS = {
  gclid: "TEST",
  utm: { source: "", medium: "", campaign: "", term: "", content: "" },
  ads: { campaignid: "", kw: "", mt: "", ag: "" },
  landing: "/?gad_campaignid=24339671482&kw=sworn%20translator%20spain&mt=p&gclid=TEST",
  referrer: "www.google.com",
};

test("asunto: «expediente» desde 3 archivos y formato pedido", () => {
  expect(receivedSubject({ name: "Ana Pérez", count: 2, ref: "JX-ABC234" })).toBe(
    "Documentos recibidos · Ana Pérez · 2 archivos · JX-ABC234"
  );
  expect(receivedSubject({ name: "Ana Pérez", count: 3, ref: "JX-ABC234" })).toBe(
    "Documentos recibidos · expediente · Ana Pérez · 3 archivos · JX-ABC234"
  );
  expect(receivedSubject({ name: "Ana", count: 1, ref: "JX-TEST", test: true })).toBe(
    "[PRUEBA] Documentos recibidos · Ana · 1 archivo · JX-TEST"
  );
  expect(failedSubject({ name: "Ana", email: "ana@example.com", phone: "+34 600" })).toBe(
    "Subida fallida · Ana · ana@example.com · +34 600"
  );
});

test("cuerpo del aviso: carpeta, archivos con tamaño y páginas, contacto y origen", () => {
  const text = receivedText({
    ref: "JX-ABC234",
    name: "Ana",
    email: "ana@example.com",
    phone: "",
    tramite: "Visado no lucrativo",
    comment: "Para el consulado",
    attribution: ADS,
    folderUrl: "https://drive.google.com/drive/folders/abc",
    received: [{ name: "pasaporte.pdf", size: 8 * MB, pages: 3 }],
    failed: [{ name: "foto.heic", reason: "network" }],
    locale: "es",
    page: "/enviar-documentos",
  });
  expect(text).toContain("Carpeta de Drive: https://drive.google.com/drive/folders/abc");
  expect(text).toContain("Adjuntos: ninguno (no se pudieron adjuntar");
  expect(text).toContain("• pasaporte.pdf (8 MB, 3 pág.)");
  expect(text).toContain("foto.heic — se cortó la conexión");
  expect(text).toContain("Origen: Google Ads");
  expect(text).toContain("Campaña: EN");
  expect(text).toContain("Palabra clave: sworn translator spain (frase)");
  expect(text).toContain("Trámite: Visado no lucrativo");
});

test("datos en líneas fijas y en el mismo orden, con o sin datos", () => {
  const full = dataLines({
    name: "Ana Pérez",
    email: "ana@example.com",
    phone: "+34 600 000 000",
    tramite: "Visado no lucrativo",
    ref: "JX-ABC234",
    received: [
      { name: "pasaporte.pdf", size: 1000, pages: 3 },
      { name: "foto.jpg", size: 1000 },
    ],
  });
  expect(full).toEqual([
    "Nombre: Ana Pérez",
    "Correo: ana@example.com",
    "Teléfono: +34 600 000 000",
    "Trámite: Visado no lucrativo",
    "Número de archivos: 2",
    "Páginas: 4",
    "Referencia JX: JX-ABC234",
  ]);
  const empty = dataLines({ name: "", email: "", phone: "", tramite: "", ref: "JX-ABC234", received: [{ name: "a.zip", size: 5 }] });
  expect(empty.map((l) => l.split(":")[0])).toEqual(full.map((l) => l.split(":")[0]));
  expect(empty[5]).toBe("Páginas: no disponible");
  // El cuerpo del aviso EMPIEZA por ese bloque.
  const body = receivedText({ name: "Ana", email: "", phone: "", tramite: "", ref: "JX-ABC234", received: [], failed: [], attribution: null });
  expect(body.split("\n").slice(0, 7).map((l) => l.split(":")[0])).toEqual(full.map((l) => l.split(":")[0]));
});

test("expediente: tres archivos o más, o más de 15 MB", () => {
  const f = (mb) => ({ name: "a.pdf", size: mb * MB });
  expect(isExpediente([f(1)])).toBe(false);
  expect(isExpediente([f(7), f(8)])).toBe(false); // 15 MB justos: con adjuntos
  expect(isExpediente([f(8), f(8)])).toBe(true);
  expect(isExpediente([f(16)])).toBe(true);
  expect(isExpediente([f(1), f(1), f(1)])).toBe(true);
  expect(receivedSubject({ name: "Ana", count: 1, ref: "JX-ABC234", expediente: true })).toBe(
    "Documentos recibidos · expediente · Ana · 1 archivo · JX-ABC234"
  );
});

test("límite de envíos: 15 por visitante y 300 al día en total", () => {
  const of = (v, n) => Array.from({ length: n }, (_, i) => `limites/2026-11-20/envios/${v}-${i}.json`);
  expect(limitReason(of("aaaa", 14), "aaaa").reason).toBe("");
  expect(limitReason(of("aaaa", 15), "aaaa").reason).toBe("visitor");
  expect(limitReason(of("aaaa", 15), "bbbb").reason).toBe(""); // otro visitante no se ve afectado
  expect(limitReason(of("cccc", 300), "bbbb").reason).toBe("global");
});

test("confirmación al cliente sin enlace a la carpeta y con el plazo", () => {
  const d = {
    ref: "JX-ABC234",
    name: "Ana",
    locale: "en",
    received: [{ name: "a.pdf", size: 1000 }],
    failed: [],
    folderUrl: "https://drive.google.com/drive/folders/abc",
  };
  const text = clientText(d);
  expect(text).not.toContain("drive.google.com");
  expect(text).toContain("less than two hours between 9:00 and 23:00 (Madrid time), weekends included");
  expect(noteText({ ...d, when: "19/11/2026 10:00", attribution: null })).toContain("Origen: Web");
});

// ─── 2. De punta a punta ────────────────────────────────────────────────

const E2E = process.env.DOCS_E2E === "1";
let dir;

function writeFile(name, bytes, head = "") {
  const p = path.join(dir, name);
  const buf = Buffer.concat([Buffer.from(head, "latin1"), randomBytes(Math.max(0, bytes - head.length))]);
  fs.writeFileSync(p, buf);
  return p;
}

async function control(body) {
  await fetch(`${MOCK}/__control`, { method: "POST", body: JSON.stringify(body) });
}
async function state() {
  return (await fetch(`${MOCK}/__state`)).json();
}

test.describe("de punta a punta con Drive simulado", () => {
  test.skip(!E2E, "DOCS_E2E=1 y next dev con DRIVE_MOCK_URL");
  test.describe.configure({ mode: "serial" });

  test.beforeAll(() => {
    dir = fs.mkdtempSync(path.join(os.tmpdir(), "jx-docs-"));
    const pdfHead = "%PDF-1.4\n1 0 obj <</Type /Page>>\n2 0 obj <</Type /Page>>\n3 0 obj <</Type /Page>>\n4 0 obj <</Type /Pages /Count 3>>\n";
    writeFile("antecedentes-8MB.pdf", 8 * MB, pdfHead);
    for (let i = 1; i <= 10; i++) writeFile(`IMG_${1000 + i}.jpg`, Math.round(3.4 * MB), "\xff\xd8\xff\xe0");
    writeFile("IMG_2000.HEIC", Math.round(2.2 * MB), "\x00\x00\x00\x18ftypheic");
    writeFile("viejo.doc", 50_000);
    writeFile("enorme.pdf", 51 * MB, "%PDF-1.4\n");
  });
  test.beforeEach(async () => {
    await control({ reset: true });
  });

  async function fill(page) {
    await page.getByLabel("Nombre").fill("Prueba Claude");
    await page.getByLabel("Correo electrónico").fill("prueba@example.com");
    await page.getByTestId("doc-privacy").check();
  }

  test("botón en la cabecera y página en los dos idiomas", async ({ page }) => {
    await page.goto("/");
    await page.locator("header a[data-cta='enviar_documentos_cabecera']").click();
    await expect(page).toHaveURL(/\/enviar-documentos$/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Enviar documentos");
    await page.goto("/en/send-documents");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Send documents");
    await expect(page.locator("header a[data-cta='enviar_documentos_cabecera']")).toBeVisible();
  });

  test("PDF de 8 MB, diez fotos y un HEIC llegan completos a la carpeta", async ({ page }) => {
    test.setTimeout(180_000);
    await page.goto("/enviar-documentos");
    await fill(page);
    const names = ["antecedentes-8MB.pdf", ...Array.from({ length: 10 }, (_, i) => `IMG_${1001 + i}.jpg`), "IMG_2000.HEIC"];
    await page.getByTestId("doc-files").setInputFiles(names.map((n) => path.join(dir, n)));
    await expect(page.getByTestId("doc-list").locator("li")).toHaveCount(12);
    await expect(page.getByText("3 pág.")).toBeVisible();
    await page.getByTestId("doc-submit").click();
    await expect(page.getByTestId("doc-result")).toContainText("Documentos recibidos", { timeout: 150_000 });
    await expect(page.getByTestId("doc-result")).toContainText("JX-TEST");
    const files = await state();
    const folder = files.find((f) => f.mimeType === "application/vnd.google-apps.folder" && f.appProperties.jxRef);
    expect(folder.name).toMatch(/^\d{4}-\d{2}-\d{2} Prueba Claude – JX-TEST$/);
    for (const n of names) {
      const f = files.find((x) => x.name === n);
      expect(f, n).toBeTruthy();
      expect(f.parents).toContain(folder.id);
      expect(Number(f.size)).toBe(fs.statSync(path.join(dir, n)).size);
    }
    expect(files.find((f) => f.name === "Datos del envío.txt")).toBeTruthy();
  });

  test("cortes de red y errores 503: reintenta y reanuda sin perder bytes", async ({ page }) => {
    test.setTimeout(180_000);
    await control({ cut: 2, fail503: 2 });
    await page.goto("/enviar-documentos");
    await fill(page);
    await page.getByTestId("doc-files").setInputFiles(path.join(dir, "antecedentes-8MB.pdf"));
    await page.getByTestId("doc-submit").click();
    await expect(page.getByTestId("doc-result")).toContainText("Documentos recibidos", { timeout: 150_000 });
    const f = (await state()).find((x) => x.name === "antecedentes-8MB.pdf");
    expect(Number(f.size)).toBe(8 * MB);
  });

  test("mensajes concretos: formato y tamaño", async ({ page }) => {
    await page.goto("/enviar-documentos");
    await page.getByTestId("doc-files").setInputFiles([path.join(dir, "viejo.doc"), path.join(dir, "enorme.pdf")]);
    await expect(page.getByText("«viejo.doc»: formato no admitido")).toBeVisible();
    await expect(page.getByText("«enorme.pdf» pesa 51 MB y el máximo es 50 MB")).toBeVisible();
    await page.getByTestId("doc-submit").click();
    await expect(page.getByText("Escribe tu nombre.")).toBeVisible();
    await expect(page.getByText("Deja tu correo o tu WhatsApp")).toBeVisible();
  });

  test("tras recargar se recuperan los datos escritos y lo ya subido", async ({ page }) => {
    test.setTimeout(120_000);
    await page.goto("/enviar-documentos");
    await fill(page);
    await page.getByLabel("Comentario").fill("Lo necesito el lunes");
    await page.reload();
    await expect(page.getByLabel("Nombre")).toHaveValue("Prueba Claude");
    await expect(page.getByLabel("Comentario")).toHaveValue("Lo necesito el lunes");
    await expect(page.getByText("He recuperado lo que habías escrito")).toBeVisible();
  });

  const mails = async () => (await fetch(`${MOCK}/__mails`)).json();

  test("uno o dos archivos pequeños: el aviso lleva los adjuntos, el enlace y Reply-To del cliente", async ({ page }) => {
    test.setTimeout(120_000);
    await page.goto("/enviar-documentos");
    await fill(page);
    await page.getByLabel("WhatsApp o teléfono").fill("+34 600 000 000");
    await page.getByLabel("¿Para qué trámite es?").selectOption("Visado no lucrativo");
    await page.getByTestId("doc-files").setInputFiles([path.join(dir, "IMG_1001.jpg"), path.join(dir, "antecedentes-8MB.pdf")]);
    await page.getByTestId("doc-submit").click();
    await expect(page.getByTestId("doc-result")).toContainText("Documentos recibidos", { timeout: 90_000 });
    // Botón de WhatsApp con el mensaje ya escrito.
    const href = await page.getByTestId("doc-wa").getAttribute("href");
    expect(decodeURIComponent(href)).toContain("Acabo de subir 2 documentos, referencia JX-TEST");
    const all = await mails();
    const m = all.find((x) => x.subject.includes("Documentos recibidos"));
    expect(m.subject).toBe("[PRUEBA] Documentos recibidos · Prueba Claude · 2 archivos · JX-TEST");
    expect(m.reply_to).toBe("prueba@example.com");
    expect(m.attachments.map((a) => a.filename).sort()).toEqual(["IMG_1001.jpg", "antecedentes-8MB.pdf"]);
    expect(m.attachments.find((a) => a.filename === "antecedentes-8MB.pdf").bytes).toBe(8 * MB);
    expect(m.text.split("\n").slice(0, 7)).toEqual([
      "Nombre: Prueba Claude",
      "Correo: prueba@example.com",
      "Teléfono: +34 600 000 000",
      "Trámite: Visado no lucrativo",
      "Número de archivos: 2",
      "Páginas: 4",
      "Referencia JX: JX-TEST",
    ]);
    expect(m.text).toContain("Carpeta de Drive: https://drive.google.com/drive/folders/");
    expect(m.text).toContain("Adjuntos: 2 en este correo");
    // Confirmación al cliente, sin adjuntos ni enlace a la carpeta.
    const c = all.find((x) => x.subject.startsWith("Hemos recibido"));
    expect(c.to).toEqual(["prueba@example.com"]);
    expect(c.attachments).toEqual([]);
  });

  test("tres archivos: «expediente» en el asunto y solo el enlace, sin adjuntos", async ({ page }) => {
    test.setTimeout(120_000);
    await page.goto("/en/send-documents");
    await page.getByLabel("Name").fill("Prueba Claude");
    await page.getByLabel("Email").fill("prueba@example.com");
    await page.getByTestId("doc-privacy").check();
    await page.getByTestId("doc-files").setInputFiles(["IMG_1001.jpg", "IMG_1002.jpg", "IMG_2000.HEIC"].map((n) => path.join(dir, n)));
    await page.getByTestId("doc-submit").click();
    await expect(page.getByTestId("doc-result")).toContainText("Documents received", { timeout: 90_000 });
    expect(decodeURIComponent(await page.getByTestId("doc-wa").getAttribute("href"))).toContain(
      "I have just uploaded 3 documents, reference JX-TEST"
    );
    const m = (await mails()).find((x) => x.subject.includes("Documentos recibidos"));
    expect(m.subject).toBe("[PRUEBA] Documentos recibidos · expediente · Prueba Claude · 3 archivos · JX-TEST");
    expect(m.attachments).toEqual([]);
    expect(m.text).toContain("Adjuntos: ninguno (expediente: están en la carpeta de Drive)");
    expect(m.text).toContain("Páginas: 3");
  });

  test("dos archivos que pasan de 15 MB: expediente sin adjuntos", async ({ page }) => {
    test.setTimeout(120_000);
    writeFile("grande-9MB.pdf", 9 * MB, "%PDF-1.4\n");
    await page.goto("/enviar-documentos");
    await fill(page);
    await page.getByTestId("doc-files").setInputFiles([path.join(dir, "grande-9MB.pdf"), path.join(dir, "antecedentes-8MB.pdf")]);
    await page.getByTestId("doc-submit").click();
    await expect(page.getByTestId("doc-result")).toContainText("Documentos recibidos", { timeout: 90_000 });
    const m = (await mails()).find((x) => x.subject.includes("Documentos recibidos"));
    expect(m.subject).toContain("· expediente ·");
    expect(m.attachments).toEqual([]);
  });

  test("tope total por envío: el servidor rechaza más de 300 MB y archivos no declarados", async ({ request }) => {
    const base = { name: "Prueba", email: "prueba@example.com", privacy: true, locale: "es" };
    const big = await request.post("/api/documentos/start", {
      data: { ...base, files: Array.from({ length: 7 }, (_, i) => ({ name: `f${i}.pdf`, size: 49 * MB })) },
    });
    expect(big.status()).toBe(413);
    expect((await big.json()).error).toBe("total");
    const ok = await request.post("/api/documentos/start", { data: { ...base, files: [{ name: "a.pdf", size: 1000 }] } });
    const { token } = await ok.json();
    const other = await request.post("/api/documentos/file", { data: { token, name: "otro.pdf", size: 49 * MB, type: "application/pdf", idx: 0 } });
    expect(other.status()).toBe(403);
    const good = await request.post("/api/documentos/file", { data: { token, name: "a.pdf", size: 1000, type: "application/pdf", idx: 0 } });
    expect(good.status()).toBe(200);
  });

  test("la calculadora sube por el mismo sistema y manda la carpeta a /api/quote", async ({ page }) => {
    test.setTimeout(120_000);
    let quoteBody = "";
    page.on("request", (r) => {
      if (r.url().endsWith("/api/quote") && r.method() === "POST") quoteBody = r.postData() || "";
    });
    await page.goto("/");
    const calc = page.locator("#calculadora");
    await calc.getByTestId("doc-files").setInputFiles([path.join(dir, "IMG_1001.jpg"), path.join(dir, "antecedentes-8MB.pdf")]);
    await calc.getByLabel("Email").fill("prueba@example.com");
    await calc.locator("input[id$='-privacy']").check();
    await calc.getByRole("button", { name: /Enviar/ }).click();
    await expect.poll(() => quoteBody.includes('name="docs"'), { timeout: 90_000 }).toBe(true);
    // `docs` es el justificante firmado de lo comprobado en Drive.
    const token = /name="docs"\r\n\r\n([^\r\n]+)/.exec(quoteBody)[1];
    const receipt = JSON.parse(Buffer.from(token.split(".")[0], "base64url").toString("utf8"));
    expect(receipt.k).toBe("r");
    expect(receipt.files.map((f) => f.name).sort()).toEqual(["IMG_1001.jpg", "antecedentes-8MB.pdf"]);
    const files = await state();
    expect(files.find((f) => f.name === "antecedentes-8MB.pdf")).toBeTruthy();
    expect(files.find((f) => f.name === "IMG_1001.jpg")).toBeTruthy();
  });
});
