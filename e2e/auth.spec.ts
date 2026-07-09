import { test, expect } from "@playwright/test";
import { ACCOUNTS, login, logout, narrate, spaGoto } from "./helpers";

test.describe("Authentication", () => {
  test("admin login lands on the dashboard", async ({ page }) => {
    await login(page, ACCOUNTS.admin);
    await expect(page).toHaveURL(/\/dashboard$/);
    await narrate(page, "Admin sees the full sidebar");
    await expect(page.getByText("Customer Churn Risk")).toBeVisible();
  });

  test("front office login lands on customers", async ({ page }) => {
    await login(page, ACCOUNTS.frontOffice);
    await expect(page).toHaveURL(/\/customers$/);
  });

  test("technical support agent login lands on my tickets", async ({ page }) => {
    await login(page, ACCOUNTS.agent);
    await expect(page).toHaveURL(/\/my-tickets$/);
  });

  test("invalid password is rejected with a generic error", async ({ page }) => {
    await page.goto("/login");
    await page.locator("input").first().fill(ACCOUNTS.admin.email);
    await page.locator('input[type="password"]').fill("wrong-password");
    await page.click('button:has-text("Sign In")');
    await expect(page.getByText(/invalid email or password/i)).toBeVisible();
    await expect(page).toHaveURL(/\/login$/);
  });

  test("logout returns to login and blocks protected routes", async ({ page }) => {
    await login(page, ACCOUNTS.admin);
    await logout(page);
    await expect(page).toHaveURL(/\/login$/);

    await narrate(page, "Confirming /dashboard is no longer reachable");
    await page.goto("/dashboard");
    await expect(page).toHaveURL(/\/login$/);
  });
});

test.describe("Role-based access", () => {
  test("front office is redirected away from admin-only pages", async ({ page }) => {
    await login(page, ACCOUNTS.frontOffice);

    const items = await page.locator(".MuiListItemText-primary").allInnerTexts();
    expect(items).toContain("Customers");
    expect(items).toContain("Tickets");
    expect(items).toContain("My Tickets");
    expect(items).not.toContain("Dashboard");
    expect(items).not.toContain("Agent Analytics");
    expect(items).not.toContain("Regional Insights");
    expect(items).not.toContain("Customer Churn Risk");

    for (const path of ["/dashboard", "/analytics", "/regional-insights", "/customer-churn-risk"]) {
      await narrate(page, `Attempting direct navigation to ${path}`);
      await spaGoto(page, path);
      await expect(page).toHaveURL(/\/customers$/);
    }
  });

  test("a non-front-office agent is restricted to My Tickets only", async ({ page }) => {
    await login(page, ACCOUNTS.agent);

    const items = await page.locator(".MuiListItemText-primary").allInnerTexts();
    expect(items.filter((t) => t !== "Collapse")).toEqual(["My Tickets"]);

    for (const path of ["/dashboard", "/customers", "/tickets", "/analytics", "/regional-insights", "/customer-churn-risk"]) {
      await narrate(page, `Attempting direct navigation to ${path}`);
      await spaGoto(page, path);
      await expect(page).toHaveURL(/\/my-tickets$/);
    }
  });
});
