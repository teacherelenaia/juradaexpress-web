// playwright.config.mjs
//
// Pruebas de navegador (tests/*.spec.mjs). `npm test` levanta `next dev`
// en el puerto 3311 (o reutiliza un servidor que ya esté ahí) y ejecuta
// las pruebas en Chromium. Primera vez: `npx playwright install chromium`.
//
// Proyecto «produccion» (11/10/2026): tests/eventos-vercel.spec.mjs solo
// tiene sentido contra un build de producción, porque los eventos de Vercel
// Analytics (app/lib/engagement.js) no se envían en `next dev`. Ese
// proyecto levanta `next build && next start` en el puerto 3312 con la
// carpeta de salida .next-test (NEXT_DIST_DIR, ver next.config.mjs) para
// no pisar la .next del servidor de desarrollo. Con PLAYWRIGHT_PROD_URL se
// usa un `npm start` ya levantado y se ahorra el build.
import { defineConfig, devices } from "@playwright/test";

const PORT = 3311;
const BASE_URL = process.env.PLAYWRIGHT_BASE_URL || `http://127.0.0.1:${PORT}`;

const PROD_PORT = 3312;
const PROD_URL = process.env.PLAYWRIGHT_PROD_URL || `http://127.0.0.1:${PROD_PORT}`;
const PROD_TESTS = /eventos-vercel\.spec\.mjs$/;

export default defineConfig({
  testDir: "./tests",
  timeout: 60_000,
  expect: { timeout: 10_000 },
  fullyParallel: false,
  retries: 0,
  reporter: [["list"]],
  use: {
    baseURL: BASE_URL,
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
      testIgnore: PROD_TESTS,
    },
    {
      name: "produccion",
      use: { ...devices["Desktop Chrome"], baseURL: PROD_URL },
      testMatch: PROD_TESTS,
    },
  ],
  webServer: [
    process.env.PLAYWRIGHT_BASE_URL
      ? null
      : {
          command: `npx next dev -p ${PORT}`,
          url: BASE_URL,
          reuseExistingServer: true,
          timeout: 120_000,
        },
    process.env.PLAYWRIGHT_PROD_URL
      ? null
      : {
          command: `npx next build && npx next start -p ${PROD_PORT}`,
          url: PROD_URL,
          reuseExistingServer: true,
          timeout: 300_000,
          env: { NEXT_DIST_DIR: ".next-test" },
        },
  ].filter(Boolean),
});
