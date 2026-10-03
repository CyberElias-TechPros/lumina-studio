import { expect } from "@playwright/test";
import { test, API_BASE } from "./helpers";

test.describe("Public marketing + application journey", () => {
  test("home page loads with core navigation", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: /learn digital skills by doing real work/i }),
    ).toBeVisible();
    await expect(page.getByRole("link", { name: /^courses$/i }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: /^apply$/i }).first()).toBeVisible();
  });

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

    // Step 1 — choose course
    await page.getByRole("button", { name: /microsoft office/i }).click();
    await page.getByRole("button", { name: /continue/i }).click();
    await expect(page.getByRole("heading", { name: /your details/i })).toBeVisible();

    // Step 2 — profile
    await page.locator("#firstName").fill("E2E");
    await page.locator("#lastName").fill("Tester");
    await page.locator("#email").fill(email);
    await page.locator("#phone").fill("+2349058628386");

    await page.locator("#city").click();
    await page.getByRole("option", { name: /lagos/i }).click();

    await page.locator("#experience").click();
    await page.getByRole("option", { name: /no experience/i }).click();

    await page.getByRole("button", { name: /submit application/i }).click();

    await expect(page.getByRole("heading", { name: /application submitted/i })).toBeVisible({
      timeout: 30_000,
    });
    const ref = await page
      .getByText(/CEA-2026-[A-Z0-9]+/i)
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

  test("application status lookup renders the pipeline", async ({ page, request }) => {
    // Create a real application through the API, then track it via the UI.
    const email = `e2e.track.${Date.now()}@example.com`;
    const res = await request.post(`${API_BASE}/v1/applications`, {
      data: {
        fullName: "E2E Tracker",
        email,
        phone: "+2349058628386",
        programSlug: "full-stack-software-development",
      },
    });
    const created = (await res.json()) as { application?: { ref: string } };
    const ref = created.application?.ref;
    if (!ref)
      throw new Error(
        `could not create application for tracking: ${res.status()} ${JSON.stringify(created)}`,
      );

    await page.goto("/apply/status");
    await page.locator("#appId").fill(ref);
    await page.getByRole("button", { name: /track application/i }).click();
    await page.waitForURL(`**/apply/status/${ref}`, { timeout: 30_000 }).catch(async () => {
      console.log("URL did not change after track click:", page.url());
      await page.getByRole("button", { name: /track application/i }).click();
      await page.waitForURL(`**/apply/status/${ref}`, { timeout: 30_000 });
    });
    console.log("URL after track:", page.url());
    await expect(page.getByText(new RegExp(ref)).first()).toBeVisible({ timeout: 20_000 });
    await expect(page.getByText(/application received|submitted|screening/i).first()).toBeVisible();
  });
});
