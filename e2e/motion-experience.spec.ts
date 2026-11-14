import { expect, test } from "@playwright/test";

test.use({ serviceWorkers: "block" });

test.beforeEach(async ({ page }) => {
  await page.route("**/*", (route) => {
    const url = new URL(route.request().url());
    return ["127.0.0.1", "localhost"].includes(url.hostname) ? route.continue() : route.abort();
  });
});

test("hero remains readable and navigation works with reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const hero = page.locator("#cea-home-hero");
  await expect(hero.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(
    hero.getByRole("img", { name: /Class in session at Cyber Elias Academy/ }),
  ).toHaveAttribute("src", "/images/campus/lab-1.jpg");
  await expect(hero.getByRole("link", { name: "Explore courses" })).toBeVisible();
  await expect(page.locator("html")).not.toHaveClass(/lenis/);
  await expect(hero.locator(".cea-shiny-text")).toHaveCSS("animation-name", "none");
  await hero.getByRole("link", { name: "Discover CEA" }).click();
  await expect(page).toHaveURL(/\/about/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("mobile hero does not overflow and its menu remains usable", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  await expect(page.locator("#cea-home-hero h1")).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(375);
  await page.getByRole("button", { name: "Menu", exact: true }).click();
  await expect(page.getByRole("dialog", { name: "Site menu" })).toBeVisible();
  await page.getByRole("button", { name: "Close menu" }).click();
  await expect(page.getByRole("dialog", { name: "Site menu" })).toHaveCount(0);
});

test("hero and course links remain available without JavaScript", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ baseURL, javaScriptEnabled: false });
  try {
    const page = await context.newPage();
    await page.goto("/");
    await expect(page.locator("#cea-home-hero h1")).toBeVisible();
    await expect(
      page.locator("#cea-home-hero").getByRole("link", { name: "Explore courses" }),
    ).toHaveAttribute("href", "/classes");
    await expect(page.locator("#home-course-finder")).toContainText("needs JavaScript");
    await page.goto("/classes");
    await expect(page.locator("#cea-courses-hero h1")).toBeVisible();
    await expect(
      page.locator("#cea-courses-hero").getByRole("link", { name: "Explore courses" }),
    ).toHaveAttribute("href", "#browse-areas");
  } finally {
    await context.close();
  }
});

test("desktop scroll enhancement turns off when motion preference changes and on private pages", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await expect(page.locator("html")).toHaveClass(/lenis/);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator("html")).not.toHaveClass(/lenis/);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(page.locator("html")).toHaveClass(/lenis/);
  await page.getByRole("link", { name: "Portal", exact: true }).click();
  await expect(page).toHaveURL(/\/auth\/sign-in/);
  await expect(page.locator("html")).not.toHaveClass(/lenis/);
});

test("course hero supports discovery without hiding the destination under navigation", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/classes");
  const hero = page.locator("#cea-courses-hero");
  await expect(hero.getByRole("heading", { level: 1 })).toBeVisible();
  await hero.getByRole("link", { name: "Explore courses" }).click();
  await expect(page).toHaveURL(/#browse-areas$/);
  const headingTop = await page
    .locator("#browse-areas")
    .evaluate((el) => el.getBoundingClientRect().top);
  const headerBottom = await page
    .locator("header")
    .first()
    .evaluate((el) => el.getBoundingClientRect().bottom);
  expect(headingTop).toBeGreaterThanOrEqual(headerBottom);
});

test("course hero and sign-in remain usable on small screens", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/classes");
  await expect(page.locator("#cea-courses-hero h1")).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(375);
  await page.goto("/auth/sign-in");
  await expect(page.getByRole("heading", { name: "Sign in", exact: true })).toBeVisible();
  await expect(page.getByLabel("Email address")).toBeVisible();
  await expect(page.getByLabel("Password", { exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign in", exact: true })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(375);
});
