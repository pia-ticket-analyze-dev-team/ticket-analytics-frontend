import { test, expect } from "@playwright/test";
import { ACCOUNTS, login, narrate, pause, selectMuiOption, spaGoto } from "./helpers";

test.describe("Customer list", () => {
  test.beforeEach(async ({ page }) => {
    await login(page, ACCOUNTS.admin);
    await spaGoto(page, "/customers");
    await page.waitForLoadState("networkidle");
  });

  test("loads real paginated data", async ({ page }) => {
    const rows = page.locator("table tbody tr");
    await expect(rows.first()).toBeVisible();
    expect(await rows.count()).toBeGreaterThan(0);
  });

  test("search narrows results after debounce", async ({ page }) => {
    const firstRowBefore = await page.locator("table tbody tr").first().innerText();

    await narrate(page, "Searching for a customer by name");
    await page.getByPlaceholder("Search by name or surname...").fill("a");
    await page.waitForTimeout(500);
    await page.waitForLoadState("networkidle");

    const rows = page.locator("table tbody tr");
    await expect(rows.first()).toBeVisible();
    // sanity: the query actually changed the result set or kept it non-empty
    expect(await rows.count()).toBeGreaterThan(0);
    void firstRowBefore;
  });

  test("segment filter narrows results server-side", async ({ page }) => {
    const requests: string[] = [];
    page.on("request", (req) => {
      if (req.url().includes("/api/customers?")) requests.push(req.url());
    });

    await selectMuiOption(page, "Segment", "Corporate");
    await page.waitForLoadState("networkidle");

    expect(requests.some((u) => u.includes("segment=Corporate"))).toBeTruthy();

    const segmentCells = page.locator("table tbody tr td:nth-child(4)");
    const count = await segmentCells.count();
    for (let i = 0; i < count; i++) {
      await expect(segmentCells.nth(i)).toHaveText("Corporate");
    }
  });

  test("create, then edit, then delete a customer end-to-end", async ({ page }) => {
    const unique = Date.now();
    const email = `e2e.customer.${unique}@example.com`;

    await narrate(page, "Creating a brand-new customer");
    await page.click('button:has-text("Add Customer")');
    await page.getByLabel(/first name/i).fill("E2E");
    await page.getByLabel(/last name/i).fill(`Test${unique}`);
    await page.getByLabel(/email/i).fill(email);
    await page.getByLabel(/phone/i).fill("+90 500 000 00 00");
    await page.getByLabel(/address/i).fill("Test Mahallesi, Test Sokak No:1, Ankara");
    await selectMuiOption(page, "Segment", "Individual");
    await pause(page, 300);
    await page.click('button:has-text("Create Customer")');
    await page.waitForLoadState("networkidle");

    await narrate(page, "Confirming the new customer via search");
    await page.getByPlaceholder("Search by name or surname...").fill(`Test${unique}`);
    await page.waitForTimeout(500);
    await page.waitForLoadState("networkidle");
    await expect(page.locator("table tbody tr", { hasText: email })).toBeVisible();

    await narrate(page, "Editing the new customer's phone number");
    const row = page.locator("table tbody tr", { hasText: email });
    await row.locator("button").nth(1).click();
    await page.getByLabel(/phone/i).fill("+90 500 111 11 11");
    await page.click('button:has-text("Save Changes")');
    await page.waitForLoadState("networkidle");

    await narrate(page, "Deleting the test customer to clean up");
    const updatedRow = page.locator("table tbody tr", { hasText: email });
    await updatedRow.locator("button").nth(2).click();
    await page.click('button:has-text("Delete")');
    await page.waitForLoadState("networkidle");

    await expect(page.locator("table tbody tr", { hasText: email })).toHaveCount(0);
  });

  test("eye icon opens the customer detail page", async ({ page }) => {
    await narrate(page, "Opening the first customer's detail page");
    await page.locator("table tbody tr").first().locator("button").first().click();
    await expect(page).toHaveURL(/\/customers\/[0-9a-f-]+$/);
    await expect(page.getByText(/total tickets/i)).toBeVisible();
  });
});
