import { test, expect, type Page } from "@playwright/test";

// These UI contract tests run against an explicitly mock-enabled local build.
// Financial/authentication integration tests live in backend/test/enrollments.test.ts.
// No provider, production API or real recipient is contacted.
test.beforeEach(async ({ page, baseURL }) => {
  await page.addLocatorHandler(
    page.getByRole("button", { name: "Decline", exact: true }),
    async () => {
      await page.getByRole("button", { name: "Decline", exact: true }).click();
    },
  );
  const origin = new URL(baseURL!).origin;
  await page.route("**/*", (route) => {
    const url = new URL(route.request().url());
    return url.origin === origin ? route.continue() : route.abort();
  });
});

async function applyWithoutPayment(page: Page) {
  await page.goto("/apply?course=microsoft-office");
  await expect(page.getByRole("heading", { name: /what would you like to learn/i })).toBeVisible();
  await page.getByRole("button", { name: /microsoft office/i }).click();
  await page.getByRole("button", { name: /^continue/i }).click();
  await expect(page.getByRole("heading", { name: /when suits you/i })).toBeVisible();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await page.getByRole("button", { name: /^continue/i }).click();
  await expect(page.getByText(/choose a preference only/i)).toBeVisible();
  await page.getByRole("button", { name: /^continue/i }).click();
  await page.locator("#firstName").fill("Preview");
  await page.locator("#lastName").fill("Learner");
  await page.locator("#email").fill("isolated.tuition@example.test");
  await page.locator("#phone").fill("08012345678");
  await page.locator("#city").click();
  await page.getByRole("option", { name: /lagos/i }).click();
  await page.getByRole("button", { name: /^continue/i }).click();
  await expect(page.getByText(/after.*offer/i).first()).toBeVisible();
  for (const consent of await page.getByRole("checkbox").all()) await consent.check();
  await page.getByRole("button", { name: /submit registration/i }).click();
  await expect(page.getByRole("heading", { name: "Application received" })).toBeVisible();
  await expect(page.getByText(/no payment is due yet/i)).toBeVisible();
  await expect(page.getByText(/does not reserve a place/i)).toBeVisible();
  await expect(page.getByText(/CEA-\d{4}-[A-Z0-9]{6}/).first()).toBeVisible();
  await expect(page.getByRole("button", { name: /pay now|pay in full|pay deposit/i })).toHaveCount(
    0,
  );
}

for (const viewport of [
  { width: 1280, height: 900 },
  { width: 390, height: 844 },
]) {
  test.describe(`Protected tuition at ${viewport.width}px`, () => {
    test.use({ viewport });
    test("completes a free request without selling an unconfirmed seat", async ({ page }) => {
      await applyWithoutPayment(page);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1),
      ).toBe(true);
    });
    test("shows honest intake and unchanged fee", async ({ page }) => {
      await page.goto("/classes/microsoft-office");
      await expect(page.getByText("Next intake to be confirmed")).toBeVisible();
      await expect(page.locator("main")).toContainText("₦30,000");
      await expect(page.getByText(/register interest without paying/i)).toBeVisible();
    });
  });
}

test("tuition policy is clear and private routes opt out of indexing/referrers", async ({
  page,
  request,
}) => {
  await page.goto("/terms#tuition");
  await expect(page.locator("main")).toContainText("tuition-2026-10-17");
  await expect(page.locator("main")).toContainText(/existing/i);
  for (const path of [
    "/apply/status/CEA-2026-TEST99",
    "/apply/receipt/CEA-2026-TEST99",
    "/auth/magic-link?token=test-only",
  ]) {
    const response = await request.get(path);
    expect(response.headers()["x-robots-tag"]).toContain("noindex");
    expect(response.headers()["referrer-policy"]).toBe("no-referrer");
  }
});

test("owner worklist and cohort readiness controls are usable without invented defaults", async ({
  page,
}) => {
  await page.addLocatorHandler(
    page.getByRole("button", { name: "Skip tour", exact: true }),
    async () => {
      await page.getByRole("button", { name: "Skip tour", exact: true }).click();
    },
  );
  await page.goto("/app/admin/operations");
  await expect(page.getByText("Your academy worklist", { exact: true })).toBeVisible();
  await expect(page.getByText(/preview only.*not live applications/i)).toBeVisible();
  await page.getByRole("link", { name: "Manage actual cohorts" }).click();
  await expect(page.getByLabel(/actual first-session time/i)).toHaveValue("");
  await expect(page.getByLabel(/actual session length/i)).toHaveValue("");
  await expect(page.getByRole("checkbox", { name: /open for reviewed offers/i })).not.toBeChecked();
});

test("general payment guidance does not solicit a transfer before a confirmed offer", async ({
  page,
}) => {
  await page.goto("/pay");
  await expect(page.getByRole("heading", { name: "Check your offer before paying" })).toBeVisible();
  await expect(page.locator("main")).not.toContainText("1028649972");
  await expect(page.getByRole("button", { name: /review offer.*payment status/i })).toBeVisible();
});
