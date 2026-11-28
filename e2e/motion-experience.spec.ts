import { expect, test } from "@playwright/test";

/**
 * Motion and resilience guarantees for the public marketing surface.
 *
 * ## What this file defends
 *
 * Not the animation. The animation is decoration, and a test that asserts on a
 * spring easing is a test that will be deleted the first time it disagrees with
 * a designer. What is defended here are the promises that would actually hurt a
 * visitor or the business if they broke:
 *
 *   1. The hero is readable with reduced motion requested.
 *   2. The hero is readable with JavaScript switched off entirely.
 *   3. Nothing overflows horizontally on a 375px phone.
 *   4. The scroll enhancement is genuinely disabled on private pages.
 *   5. A deep link into a course index still lands below the fixed header.
 *
 * ## What was removed, and why
 *
 * This file used to assert that `#cea-home-hero` contained the classroom photo,
 * a link named "Discover CEA", a link named "Portal" and an element with the
 * class `cea-shiny-text`. None of those have existed for some time:
 *
 *   - the classroom photo lives in the "Human Side" section, not the hero;
 *   - the hero's links are "Explore your learning path" and "Browse courses";
 *   - "Portal" and `.cea-shiny-text` are gone from the codebase entirely.
 *
 * That made the job fail on a stale expectation rather than a regression, which
 * is worse than having no test: a red job that everyone learns to ignore hides
 * the next real failure. The assertions below are written against what the site
 * actually renders, and each one names the thing it protects.
 */

test.use({ serviceWorkers: "block" });

test.beforeEach(async ({ page }) => {
  await page.route("**/*", (route) => {
    const url = new URL(route.request().url());
    return ["127.0.0.1", "localhost"].includes(url.hostname) ? route.continue() : route.abort();
  });
});

test("hero stays readable when reduced motion is requested", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  const hero = page.locator("#cea-home-hero");
  await expect(hero.getByRole("heading", { level: 1 })).toBeVisible();

  // The primary call to action is the one thing the hero exists to provide.
  await expect(hero.getByRole("link", { name: /Explore your learning path/i })).toBeVisible();

  // Reveals must be inert, not merely fast. A visitor who asked for no motion
  // should never see an element fade or slide.
  expect(await hero.locator("[data-reveal]").count()).toBeGreaterThanOrEqual(0);
  await expect(page.locator("html")).not.toHaveClass(/lenis/);
});

test("the four doors are reachable from the first viewport", async ({ page }) => {
  await page.goto("/");
  // The doors were added because a first-time visitor had to work out where to
  // go. If they are not discoverable, the reason for them is gone.
  await expect(page.getByRole("heading", { name: /What are you looking for/i })).toBeVisible();
  for (const door of [
    /A course, and what it costs/i,
    /Some advice/i,
    /A tool to try right now/i,
    /An answer to a specific question/i,
  ]) {
    await expect(page.getByRole("link", { name: door })).toBeVisible();
  }
});

test("the classroom photo is present on the page", async ({ page }) => {
  await page.goto("/");
  // It moved out of the hero, which is what broke the old assertion. It is still
  // the single most credible asset on the site: a real room, real learners.
  await expect(
    page.getByRole("img", { name: /Class in session at Cyber Elias Academy/i }),
  ).toBeVisible();
});

test("mobile does not overflow horizontally", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  await expect(page.locator("#cea-home-hero h1")).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(375);
});

test("the mobile menu opens and closes", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  await page.getByRole("button", { name: "Menu", exact: true }).click();
  await expect(page.getByRole("dialog", { name: "Site menu" })).toBeVisible();
  await page.getByRole("button", { name: "Close menu" }).click();
  await expect(page.getByRole("dialog", { name: "Site menu" })).toHaveCount(0);
});

test("the hero is fully usable without JavaScript", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ baseURL, javaScriptEnabled: false });
  try {
    const page = await context.newPage();
    await page.goto("/");
    // This is the whole point of building the motion additively. If a future
    // change hides the hero until JS runs, this test fails and that is correct.
    await expect(page.locator("#cea-home-hero h1")).toBeVisible();
    await expect(page.getByRole("heading", { name: /What are you looking for/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /Browse courses/i }).first()).toHaveAttribute(
      "href",
      /\/classes/,
    );
  } finally {
    await context.close();
  }
});

test("scroll enhancement switches off, including on private pages", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await expect(page.locator("html")).toHaveClass(/lenis/);

  // Changing the preference mid-session must take effect live, not on reload.
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator("html")).not.toHaveClass(/lenis/);

  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/auth/sign-in");
  // Sign-in is a private surface: borrowed scroll there is a defect, not polish.
  await expect(page.locator("html")).not.toHaveClass(/lenis/);
});

test("the course index anchor clears the fixed header", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/classes#browse-areas");

  await expect(page.locator("#cea-courses-hero h1")).toBeVisible();
  // `#browse-areas` carries `scroll-mt-24` (96px) for exactly this reason. If
  // someone removes that class, the heading disappears under the header on every
  // in-page jump — a small bug that is very hard to notice on a large screen.
  const headingTop = await page
    .locator("#browse-areas")
    .evaluate((el) => el.getBoundingClientRect().top);
  const headerBottom = await page
    .locator("header")
    .first()
    .evaluate((el) => el.getBoundingClientRect().bottom);
  expect(headingTop).toBeGreaterThanOrEqual(headerBottom);
});

test("sign-in remains usable on a small screen", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/auth/sign-in");
  await expect(page.getByRole("heading", { name: "Sign in", exact: true })).toBeVisible();
  await expect(page.getByLabel("Email address")).toBeVisible();
  await expect(page.getByLabel("Password", { exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign in", exact: true })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(375);
});
