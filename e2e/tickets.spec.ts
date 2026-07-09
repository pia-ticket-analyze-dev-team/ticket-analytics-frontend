import { test, expect } from "@playwright/test";
import {
  ACCOUNTS,
  fillFieldByLabel,
  login,
  narrate,
  selectFirstOption,
  selectMuiOption,
  spaGoto,
} from "./helpers";

test.describe("Ticket list", () => {
  test.beforeEach(async ({ page }) => {
    await login(page, ACCOUNTS.admin);
    await spaGoto(page, "/tickets");
    await page.waitForLoadState("networkidle");
  });

  test("loads real paginated tickets", async ({ page }) => {
    const rows = page.locator("table tbody tr");
    await expect(rows.first()).toBeVisible();
    expect(await rows.count()).toBeGreaterThan(0);
  });

  test("status filter narrows results server-side", async ({ page }) => {
    const requests: string[] = [];
    page.on("request", (req) => {
      if (req.url().includes("/api/tickets?")) requests.push(req.url());
    });

    await selectMuiOption(page, "Status", "Resolved");
    await page.waitForLoadState("networkidle");

    expect(requests.some((u) => u.includes("status=RESOLVED"))).toBeTruthy();
  });

  test("SLA Breached filter narrows results server-side", async ({ page }) => {
    const requests: string[] = [];
    page.on("request", (req) => {
      if (req.url().includes("/api/tickets?")) requests.push(req.url());
    });

    await selectMuiOption(page, "SLA Breached", "Yes");
    await page.waitForLoadState("networkidle");

    expect(requests.some((u) => u.includes("slaBreached=true"))).toBeTruthy();
  });

  test("add a ticket for an existing customer end-to-end", async ({ page }) => {
    await narrate(page, "Opening Add Ticket");
    await page.click('button:has-text("Add Ticket")');

    await narrate(page, "Searching for an existing customer");
    await page.getByPlaceholder("Search customer name").fill("a");
    await page.waitForTimeout(600);
    const option = page.locator('[role="option"]').first();
    await expect(option).toBeVisible();
    const chosenName = await option.innerText();
    await option.click();

    await expect(page.getByText("No matching customer")).toHaveCount(0);

    await selectFirstOption(page, "Issue Topic");
    await selectFirstOption(page, "Department");
    await selectFirstOption(page, "City");
    await selectFirstOption(page, "Service Type");
    await selectFirstOption(page, "Infrastructure Type");
    await selectFirstOption(page, "Assigned Agent");

    await expect(page.getByText(/still needed/i)).toHaveCount(0);

    await narrate(page, `Submitting ticket for ${chosenName}`);
    await page.locator('[role="dialog"]').getByRole("button", { name: "Add Ticket" }).click();
    await page.waitForLoadState("networkidle");

    await expect(page.locator('[role="dialog"]')).toHaveCount(0);
  });

  test("add a ticket for a brand-new customer reveals the sub-form", async ({ page }) => {
    const unique = Date.now();

    await page.click('button:has-text("Add Ticket")');
    await narrate(page, "Typing a name that matches no existing customer");
    await page.getByPlaceholder("Search customer name").fill(`Zzyx Nomatch ${unique}`);
    await page.waitForTimeout(600);

    await expect(page.getByText("No matching customer")).toBeVisible();

    await fillFieldByLabel(page, "First Name", "Zzyx");
    await fillFieldByLabel(page, "Last Name", `Nomatch${unique}`);
    await fillFieldByLabel(page, "Email", `zzyx.nomatch.${unique}@example.com`);
    await fillFieldByLabel(page, "Address", "Yeni Mahalle, Deneme Sokak No:2, Bursa");
    await selectMuiOption(page, "Segment", "Individual");

    await selectFirstOption(page, "Issue Topic");
    await selectFirstOption(page, "Department");
    await selectFirstOption(page, "City");
    await selectFirstOption(page, "Service Type");
    await selectFirstOption(page, "Infrastructure Type");
    await selectFirstOption(page, "Assigned Agent");

    await narrate(page, "Submitting — this creates the customer and ticket together");
    await page.locator('[role="dialog"]').getByRole("button", { name: "Add Ticket" }).click();
    await page.waitForLoadState("networkidle");
    await expect(page.locator('[role="dialog"]')).toHaveCount(0);
  });

  test("edit a ticket's priority and status", async ({ page }) => {
    const row = page.locator("table tbody tr").first();
    await narrate(page, "Entering edit mode on the first ticket");
    await row.locator("button").nth(1).click();

    // In edit mode this row has 5 <Select>s in column order: Issue Topic,
    // Department, City, Priority, Status — target by position since the
    // column header text lives in a disconnected <thead>, not next to the
    // row's own control.
    const rowSelects = row.locator(".MuiSelect-select");

    await narrate(page, "Setting Priority to Low");
    await rowSelects.nth(3).click();
    await page.waitForTimeout(150);
    await page.locator('ul[role="listbox"] li', { hasText: "Low" }).first().click();

    await narrate(page, "Setting Status to In Progress");
    await rowSelects.nth(4).click();
    await page.waitForTimeout(150);
    await page.locator('ul[role="listbox"] li', { hasText: "In Progress" }).first().click();

    await narrate(page, "Saving the edit");
    await row.locator("button").first().click();
    await page.waitForLoadState("networkidle");

    await expect(row).toContainText("In Progress");
  });
});
