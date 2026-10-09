// playwright.config.mjs
//
// Pruebas de navegador (tests/*.spec.mjs). `npm test` levanta `next dev`
// en el puerto 3311 (o reutiliza un servidor que ya esté ahí) y ejecuta
// las pruebas en Chromium. Primera vez: `npx playwright install chromium`.
import { defineConfig, devices } from "@playwright/test";

const PORT = 3311;
const BASE_URL = process.env.PLAYWRIGHT_BASE_URL || `http://127.0.0.1:${PORT}`;

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
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: process.env.PLAYWRIGHT_BASE_URL
    ? undefined
    : {
        command: `npx next dev -p ${PORT}`,
        url: BASE_URL,
        reuseExistingServer: true,
        timeout: 120_000,
      },
});
