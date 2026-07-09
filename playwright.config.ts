import { defineConfig, devices } from "@playwright/test";

const isDemo = !!process.env.DEMO;

export default defineConfig({
  testDir: "./e2e",
  timeout: 30_000,
  expect: { timeout: 8_000 },
  // A single shared dev server + backend + database backs every run here
  // (no per-test isolation), so tests run serially rather than in parallel
  // to avoid cross-test contention and flaky timeouts.
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: isDemo ? "list" : [["list"], ["html", { open: "never" }]],

  use: {
    baseURL: "http://localhost:5173",
    headless: !isDemo,
    launchOptions: {
      slowMo: isDemo ? 350 : 0,
    },
    video: isDemo ? "on" : "retain-on-failure",
    screenshot: isDemo ? "on" : "only-on-failure",
    trace: isDemo ? "off" : "retain-on-failure",
    viewport: { width: 1440, height: 900 },
  },

  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],

  webServer: {
    command: "npm run dev",
    url: "http://localhost:5173",
    reuseExistingServer: true,
    timeout: 30_000,
  },
});
