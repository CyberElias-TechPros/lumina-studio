import { expect } from "@playwright/test";
import { test, API_BASE } from "./helpers";

test.describe("Public marketing + application journey", () => {
  test("home page loads with core navigation", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: /learn tech\./i })).toBeVisible();
    await expect(page.getByRole("link", { name: /programs/i }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: /start your application/i }).first()).toBeVisible();
  });

  test("programs list + detail pages load", async ({ page }) => {
    await page.goto("/programs");
    await expect(page).toHaveTitle(/Programs/);

    await page.goto("/programs/full-stack-software-development");
    await expect(page).toHaveTitle(/Program/);
    await expect(page.getByText(/node|react|typescript/i).first()).toBeVisible();
  });

  test("visitor fills the full application form end-to-end", async ({ page }) => {
    const email = `e2e.apply.${Date.now()}@example.com`;

    await page.goto("/apply");
    await expect(page).toHaveTitle(/Apply/);

    // Step 1 â€” choose program
    await page.getByRole("button", { name: /full-stack software development/i }).click();
    await page.getByRole("button", { name: /continue/i }).click();
    await expect(page.getByRole("heading", { name: /your profile/i })).toBeVisible();

    // Step 2 â€” profile
    await page.locator("#firstName").fill("E2E");
    await page.locator("#lastName").fill("Tester");
    await page.locator("#email").fill(email);
    await page.locator("#phone").fill("+2349058628386");

    await page.locator("#city").click();
    await page.getByRole("option", { name: /lagos/i }).click();

    await page.locator("#experience").click();
    await page.getByRole("option", { name: /no experience/i }).click();

    await page.getByRole("button", { name: /continue/i }).click();
    await expect(page.getByRole("heading", { name: /background assessment/i })).toBeVisible();

    // Step 3 â€” assessment (checkboxes are pre-checked)
    await page.getByRole("button", { name: /continue/i }).click();
    await expect(page.getByRole("heading", { name: /financing/i })).toBeVisible();

    // Step 4 â€” financing then submit
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
