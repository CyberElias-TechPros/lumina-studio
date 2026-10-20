import { expect } from "@playwright/test";
import { test } from "./helpers";

test.describe("Public marketing + application journey", () => {
  test("home page loads with core navigation", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: /learn digital skills by doing real work/i }),
    ).toBeVisible();
    await expect(page.getByRole("link", { name: /^courses$/i }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: /^apply$/i }).first()).toBeVisible();
  });

  for (const path of ["/contact", "/visit", "/visit/info"]) {
    test(`official address is consistent in ${path} copy and metadata`, async ({ page }) => {
      await page.goto(path);
      await expect(page.locator("main")).toContainText("24 Ebony Road");
      await expect(page.locator("footer")).toContainText("24 Ebony Road, Off Rumuola Road");
      await expect(page.locator("body")).not.toContainText(/(?:24\/26|26) Ebony Road/);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute(
        "content",
        /24 Ebony Road/,
      );

      const entities = (
        await page.locator('script[type="application/ld+json"]').allTextContents()
      ).flatMap((text) => JSON.parse(text));
      for (const type of ["EducationalOrganization", "LocalBusiness"]) {
        expect(entities.find((entity) => entity["@type"] === type)?.address).toMatchObject({
          streetAddress: "24 Ebony Road, Off Rumuola Road",
          addressLocality: "Port Harcourt",
          addressRegion: "Rivers State",
          addressCountry: "NG",
        });
      }
    });
  }

  test("classes list + detail pages load", async ({ page }) => {
    await page.goto("/classes");
    await expect(page).toHaveTitle(/Practical Digital Skills/);

    await page.goto("/classes/web-development");
    await expect(page).toHaveTitle(/Web Development/);
    await expect(page.getByText(/html|css|javascript/i).first()).toBeVisible();
  });

  test("course finder gives a catalogue-backed beginner path and resets cleanly", async ({
    page,
  }) => {
    await page.goto("/classes");
    await expect(page.locator('input[name="course-finder-task"]')).toHaveCount(13);

    const recommendation = page.getByLabel("Course recommendation");
    await page.locator('input[name="course-finder-task"][value="web-development"]').check();
    await page.locator('input[name="course-finder-starting-point"][value="new"]').check();
    await expect(
      recommendation.getByRole("heading", { name: "Typing & Computer Basics" }),
    ).toBeVisible();
    await expect(recommendation.getByRole("heading", { name: "Web Development" })).toBeVisible();

    await page.locator('input[name="course-finder-starting-point"][value="comfortable"]').check();
    await expect(recommendation.getByRole("heading", { name: "Web Development" })).toBeVisible();
    await expect(
      recommendation.getByRole("heading", { name: "Typing & Computer Basics" }),
    ).toHaveCount(0);

    await recommendation.getByRole("button", { name: /start over/i }).click();
    await expect(
      recommendation.getByRole("heading", { name: "Your guide is ready" }),
    ).toBeVisible();
  });

  test("visitor fills the full application form end-to-end", async ({ page }) => {
    const email = `e2e.apply.${Date.now()}@example.com`;

    await page.goto("/apply");
    await expect(page).toHaveTitle(/Apply/);

    // Programme, schedule preference and plan preference; no money is collected.
    await page.getByRole("button", { name: /microsoft office/i }).click();
    await page.getByRole("button", { name: /continue/i }).click();
    await page.getByRole("button", { name: /^continue/i }).click();
    await page.getByRole("button", { name: /^continue/i }).click();
    await expect(page.locator("#firstName")).toBeVisible();

    // Applicant details
    await page.locator("#firstName").fill("E2E");
    await page.locator("#lastName").fill("Tester");
    await page.locator("#email").fill(email);
    await page.locator("#phone").fill("+2349058628386");

    await page.locator("#city").click();
    await page.getByRole("option", { name: /lagos/i }).click();

    await page.locator("#experienceLevel").click();
    await page.getByRole("option", { name: /beginner|no experience/i }).click();

    await page.getByRole("button", { name: /^continue/i }).click();
    for (const consent of await page.getByRole("checkbox").all()) await consent.check();
    await page.getByRole("button", { name: /submit registration/i }).click();

    await expect(page.getByRole("heading", { name: /application received/i })).toBeVisible({
      timeout: 30_000,
    });
    const ref = await page
      .getByText(/CEA-\d{4}-[A-Z0-9]+/i)
      .first()
      .textContent();
    if (!ref) throw new Error("no application reference shown after submit");
  });

  test("contact form submits", async ({ page }) => {
    const email = `e2e.contact.${Date.now()}@example.com`;
    await page.goto("/contact");
    await expect(page).toHaveTitle(/Contact/);
    await page.locator("#name").fill("E2E Visitor");
    await page.locator("#email").fill(email);
    await page.locator("#message").fill("E2E smoke test message.");
    await page
      .getByRole("button", { name: /send|submit/i })
      .first()
      .click();
    await expect(page.getByText(/thanks|received|sent|message/i).first()).toBeVisible({
      timeout: 20_000,
    });
  });

  test("status lookup accepts a reference without requesting personal details", async ({
    page,
  }) => {
    await page.goto("/apply/status");
    await page.locator("#appId").fill("CEA-2026-TEST99");
    await page.getByRole("button", { name: /track application/i }).click();
    await page.waitForURL("**/apply/status/CEA-2026-TEST99");
    await expect(page.getByText("Pay in full", { exact: true })).toHaveCount(0);
  });
});
