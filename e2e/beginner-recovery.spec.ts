import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.route("**/*", (route) => {
    const host = new URL(route.request().url()).hostname;
    return ["localhost", "127.0.0.1"].includes(host) ? route.continue() : route.abort();
  });
});

test("step focus, recovery, consent reset, clear and validation", async ({ page }) => {
  await page.goto("/apply?program=microsoft-office");
  await expect(page.getByText("Step 1 of 5:", { exact: false })).toBeVisible();
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await expect(page.getByRole("heading", { name: "When suits you?" })).toBeFocused();
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.getByLabel("First name", { exact: true }).fill("Ada");
  await page.getByLabel("Last name", { exact: true }).fill("Okoro");
  await page.reload();
  await expect(page.getByLabel("First name", { exact: true })).toHaveValue("Ada");
  await expect(page.getByText("Step 4 of 5:", { exact: false })).toBeVisible();
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await expect(
    page.getByRole("alert").filter({ hasText: "Please check these answers" }),
  ).toBeFocused();
  await page.getByLabel("First name", { exact: true }).fill("Adanna");
  await expect(page.getByLabel("First name", { exact: true })).toBeFocused();
  const saved = await page.evaluate(() =>
    JSON.parse(localStorage.getItem("cea-application-draft-v1")!),
  );
  expect(saved.draft.consentTerms).toBe(false);
  expect(saved.draft.consentPrivacy).toBe(false);
  page.once("dialog", (dialog) => dialog.accept());
  await page.getByRole("button", { name: "Clear saved answers" }).click();
  await expect(page.getByText("Your previous answers have been cleared.")).toBeVisible();
  expect(
    await page.evaluate(
      () => JSON.parse(localStorage.getItem("cea-application-draft-v1")!).draft.firstName,
    ),
  ).toBe("");
});

test("expired and malformed saved answers do not crash application", async ({ page }) => {
  await page.goto("/apply");
  await page.evaluate(() => localStorage.setItem("cea-application-draft-v1", "{bad json"));
  await page.reload();
  await expect(page.getByRole("button", { name: "Continue", exact: true })).toBeVisible();
  await page.evaluate(() =>
    localStorage.setItem(
      "cea-application-draft-v1",
      JSON.stringify({ version: 1, expires: 1, draft: { firstName: "Expired" } }),
    ),
  );
  await page.reload();
  await expect(page.getByText("Step 1 of 5:", { exact: false })).toBeVisible();
  expect(
    await page.evaluate(
      () => JSON.parse(localStorage.getItem("cea-application-draft-v1")!).draft.firstName,
    ),
  ).toBe("");
});

test("restored consents are cleared and blocked storage is explained", async ({ page }) => {
  await page.goto("/apply");
  await expect(page.getByRole("button", { name: "Continue", exact: true })).toBeVisible();
  await page.evaluate(() => {
    const saved = JSON.parse(localStorage.getItem("cea-application-draft-v1")!);
    saved.draft.consentTerms = true;
    saved.draft.consentPrivacy = true;
    localStorage.setItem("cea-application-draft-v1", JSON.stringify(saved));
  });
  await page.reload();
  await expect(page.getByText("Your saved answers are restored.", { exact: false })).toBeVisible();
  const saved = await page.evaluate(() =>
    JSON.parse(localStorage.getItem("cea-application-draft-v1")!),
  );
  expect(saved.draft.consentTerms).toBe(false);
  expect(saved.draft.consentPrivacy).toBe(false);
  await page.addInitScript(() => {
    Storage.prototype.setItem = () => {
      throw new Error("Storage unavailable");
    };
  });
  await page.reload();
  await expect(
    page.getByText("Your browser cannot save these answers.", { exact: false }),
  ).toBeVisible();
});
