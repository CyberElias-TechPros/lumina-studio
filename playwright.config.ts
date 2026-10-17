import { defineConfig } from "@playwright/test";
import { assertIsolatedTestUrl } from "./e2e/safety";

const baseURL = assertIsolatedTestUrl(process.env.E2E_BASE_URL ?? "http://127.0.0.1:3000");
assertIsolatedTestUrl(process.env.E2E_API_BASE ?? "http://127.0.0.1:8787");

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: false,
  workers: 1,
  timeout: 180_000,
  expect: { timeout: 20_000 },
  retries: process.env.CI ? 1 : 0,
  reporter: [["list"]],
  use: {
    baseURL,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    launchOptions: process.env.E2E_CHROMIUM_PATH
      ? {
          executablePath: process.env.E2E_CHROMIUM_PATH,
          args: [
            "--no-sandbox",
            "--disable-dev-shm-usage",
            "--no-zygote",
            "--use-angle=swiftshader",
            "--enable-unsafe-swiftshader",
          ],
        }
      : undefined,
  },
  projects: [{ name: "chromium", use: { browserName: "chromium" } }],
  webServer:
    process.env.E2E_START_SERVER === "true"
      ? {
          command: "npm run start -- --hostname 0.0.0.0 --port 3000",
          url: "http://127.0.0.1:3000",
          reuseExistingServer: false,
          timeout: 60_000,
        }
      : undefined,
});
