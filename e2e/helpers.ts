import type { Locator, Page } from "@playwright/test";

export const isDemo = !!process.env.DEMO;

// These are real seeded accounts with their password reset to a known value
// for test purposes (see project notes) — not fabricated test-only rows.
export const ACCOUNTS = {
  admin: { email: "eser.cetin70@telekom.com.tr", password: "123456", label: "Admin" },
  frontOffice: {
    email: "zeynep.aydin0@telekom.com.tr",
    password: "123456",
    label: "Front Office Agent",
  },
  agent: {
    email: "burak.gunes62@telekom.com.tr",
    password: "123456",
    label: "Technical Support Agent",
  },
};

/**
 * Prints a caption overlay in the browser and logs to the console.
 * A no-op in test mode so it never slows down CI.
 */
export async function narrate(page: Page, text: string) {
  if (!isDemo) return;

  console.log(`  -> ${text}`);

  await page.evaluate((msg) => {
    let el = document.getElementById("__demo_caption__");
    if (!el) {
      el = document.createElement("div");
      el.id = "__demo_caption__";
      Object.assign(el.style, {
        position: "fixed",
        bottom: "20px",
        left: "20px",
        right: "20px",
        background: "rgba(11,23,48,0.92)",
        color: "#fff",
        padding: "12px 18px",
        borderRadius: "10px",
        font: "600 15px system-ui, sans-serif",
        zIndex: "999999",
        boxShadow: "0 10px 30px rgba(0,0,0,.35)",
        pointerEvents: "none",
      });
      document.body.appendChild(el);
    }
    el.textContent = msg;
  }, text);

  await page.waitForTimeout(700);
}

/**
 * Draws a temporary highlight ring around an element before it's used.
 * Takes a Locator (not a raw selector string) so it works for
 * Playwright-only selector syntax like :has-text(), which isn't valid CSS
 * for a plain document.querySelector.
 */
export async function highlight(locator: Locator) {
  if (!isDemo) return;

  await locator.first().evaluate((el) => {
    const node = el as HTMLElement;
    node.scrollIntoView({ block: "center" });
    node.style.outline = "3px solid #2463FF";
    node.style.outlineOffset = "2px";
    node.style.transition = "outline-color .2s";
    setTimeout(() => {
      node.style.outline = "";
    }, 900);
  });

  await new Promise((resolve) => setTimeout(resolve, 350));
}

/** A pause that only exists in demo mode; a no-op during automated test runs. */
export async function pause(page: Page, ms = 500) {
  if (isDemo) await page.waitForTimeout(ms);
}

/**
 * Navigates client-side (pushState + popstate) instead of a full page load.
 * The app holds its logged-in user only in React memory with no persisted
 * session/token, so a real page.goto() after login silently logs you back
 * out. Use this for any in-app navigation once a test is already logged in;
 * page.goto() is still correct for the first, pre-login visit.
 */
export async function spaGoto(page: Page, path: string) {
  await page.evaluate((p) => {
    window.history.pushState({}, "", p);
    window.dispatchEvent(new PopStateEvent("popstate"));
  }, path);
  await page.waitForTimeout(300);
}

export async function login(
  page: Page,
  account: { email: string; password: string; label?: string }
) {
  await page.goto("/login");
  await narrate(page, `Logging in as ${account.label ?? account.email}`);

  await page.locator("input").first().fill(account.email);
  await page.locator('input[type="password"]').fill(account.password);

  await highlight(page.locator('button:has-text("Sign In")'));
  await page.click('button:has-text("Sign In")');
  await page.waitForLoadState("networkidle");
}

export async function logout(page: Page) {
  await narrate(page, "Logging out");
  await highlight(page.locator(".MuiAvatar-root"));
  await page.locator(".MuiAvatar-root").click();
  await pause(page, 300);
  await page.click("text=Logout");
  await page.waitForURL("**/login");
}

/**
 * Selects an option from a MUI <Select>, found by its nearby label text —
 * works whether the label is a real <InputLabel> or a plain <Typography>,
 * since it just looks for the closest container div holding both.
 */
export async function selectMuiOption(page: Page, labelText: string, optionText: string) {
  await narrate(page, `Setting "${labelText}" to "${optionText}"`);

  const field = page
    .locator("div")
    .filter({ has: page.getByText(labelText, { exact: true }) })
    .filter({ has: page.locator(".MuiSelect-select") })
    .last();

  const select = field.locator(".MuiSelect-select").first();

  await highlight(select);
  await select.click();
  await page.waitForTimeout(150);
  await page.locator('ul[role="listbox"] li', { hasText: optionText }).first().click();
  await pause(page, 300);
}

/**
 * Opens a MUI <Select> by its nearby label text and picks the first real
 * option, skipping a leading placeholder item (e.g. "Select a topic") when
 * one is present. Use this when the exact option text isn't known ahead of
 * time (topic/service-type/agent names come from live backend data).
 */
export async function selectFirstOption(page: Page, labelText: string) {
  await narrate(page, `Setting "${labelText}" to the first available option`);

  const field = page
    .locator("div")
    .filter({ has: page.getByText(labelText, { exact: true }) })
    .filter({ has: page.locator(".MuiSelect-select") })
    .last();

  const select = field.locator(".MuiSelect-select").first();

  await highlight(select);
  await select.click();
  await page.waitForTimeout(150);

  const options = page.locator('ul[role="listbox"] li');
  const count = await options.count();
  const hasPlaceholder = count > 0 && (await options.first().innerText()).toLowerCase().startsWith("select");
  await options.nth(hasPlaceholder ? 1 : 0).click();
  await pause(page, 300);
}

/**
 * Fills a text/date input found by its nearby label text, for fields built
 * as plain <Typography>+<TextField> pairs rather than a real <label>.
 */
export async function fillFieldByLabel(page: Page, labelText: string, value: string) {
  await narrate(page, `Filling "${labelText}"`);

  const field = page
    .locator("div")
    .filter({ has: page.getByText(labelText, { exact: true }) })
    .filter({ has: page.locator("input") })
    .last();

  const input = field.locator("input").first();

  await highlight(input);
  await input.fill(value);
  await pause(page, 200);
}
