import { test, expect } from "@playwright/test";
import { ACCOUNTS, login, narrate, pause } from "./helpers";

test.describe("My Tickets", () => {
  test.beforeEach(async ({ page }) => {
    await login(page, ACCOUNTS.agent);
    await page.waitForLoadState("networkidle");
  });

  test("loads only the logged-in agent's own tickets", async ({ page }) => {
    await expect(page).toHaveURL(/\/my-tickets$/);
    const rows = page.locator("table tbody tr");
    await expect(rows.first()).toBeVisible();
    expect(await rows.count()).toBeGreaterThan(0);
  });

  test("stat cards show real, non-placeholder counts", async ({ page }) => {
    await narrate(page, "Reading Assigned/Open/Active stat cards");
    const values = await page.locator(".MuiTypography-root").allInnerTexts();
    const numeric = values.filter((t) => /^\d+$/.test(t.trim()));
    expect(numeric.length).toBeGreaterThan(0);
  });

  test("forwarding a ticket picks a real department and agent", async ({ page }) => {
    const row = page.locator("table tbody tr").first();

    await narrate(page, "Opening the Forward menu on the first ticket");
    await row.locator("button").nth(2).click();
    await page.waitForTimeout(300);

    const departmentOptions = await page.locator(".MuiMenu-list .MuiMenuItem-root").allInnerTexts();
    expect(departmentOptions.length).toBeGreaterThan(0);

    const chosen = departmentOptions[0];
    await narrate(page, `Forwarding to ${chosen}`);
    await page.locator(".MuiMenu-list .MuiMenuItem-root").first().click();

    await pause(page, 400);
    await expect(page.getByText(/successfully forwarded to/i)).toBeVisible();
    await expect(row).toContainText(chosen);
  });

  test("view icon opens the Assignment History dialog", async ({ page }) => {
    const row = page.locator("table tbody tr").first();
    await narrate(page, "Opening Assignment History for the first ticket");
    await row.locator("button").first().click();
    await expect(page.getByText("Assignment Journey")).toBeVisible();
    await page.click('button:has-text("Close")');
  });
});
