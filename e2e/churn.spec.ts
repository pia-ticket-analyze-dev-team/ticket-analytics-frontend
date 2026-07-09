import { test, expect } from "@playwright/test";
import { ACCOUNTS, login, selectMuiOption, spaGoto } from "./helpers";

test.describe("Customer Churn Risk", () => {
  test.beforeEach(async ({ page }) => {
    await login(page, ACCOUNTS.admin);
    await spaGoto(page, "/customer-churn-risk");
    await page.waitForLoadState("networkidle");
  });

  test("loads real paginated churn data", async ({ page }) => {
    const rows = page.locator("table tbody tr");
    await expect(rows.first()).toBeVisible();
    expect(await rows.count()).toBeGreaterThan(0);
  });

  test("segment and risk level filters apply server-side", async ({ page }) => {
    const requests: string[] = [];
    page.on("request", (req) => {
      if (req.url().includes("/api/analytics/customer-churn-risk")) requests.push(req.url());
    });

    await selectMuiOption(page, "Segment", "Corporate");
    await page.waitForLoadState("networkidle");
    expect(requests.some((u) => u.includes("segment=Corporate"))).toBeTruthy();

    await selectMuiOption(page, "Risk Level", "HIGH");
    await page.waitForLoadState("networkidle");
    expect(requests.some((u) => u.includes("segment=Corporate") && u.includes("riskLevel=HIGH"))).toBeTruthy();
  });
});
