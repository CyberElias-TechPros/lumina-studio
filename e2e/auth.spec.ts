import { expect } from "@playwright/test";
import { test, signInViaUi, DEMO_USERS, DEMO_PASSWORD } from "./helpers";

test.describe("Auth journey", () => {
  test("unauthenticated user is redirected to sign-in from the app", async ({ page }) => {
    await page.goto("/app");
    await page.waitForURL("**/auth/sign-in**", { timeout: 20_000 });
    await expect(page.getByRole("heading", { name: /welcome back/i })).toBeVisible();
  });

  test("missing magic-link token has a clear recovery path", async ({ page }) => {
    await page.goto("/auth/magic-link");
    await expect(page.getByRole("heading", { name: /no sign-in link found/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /go to sign in/i })).toBeVisible();
  });

  test("wrong password shows a clear error and does not sign in", async ({ page }) => {
    await page.goto("/auth/sign-in");
    await page.locator("#email").fill(DEMO_USERS.student);
    await page.locator("#password").fill("definitely-wrong");
    await page.getByRole("button", { name: "Sign in", exact: true }).click();
    await expect(page.getByText(/incorrect email or password|invalid|wrong/i)).toBeVisible({
      timeout: 20_000,
    });
    await expect(page).toHaveURL(/\/auth\/sign-in/);
  });

  test("magic link toggle requests a link without a password", async ({ page }) => {
    await page.goto("/auth/sign-in");
    await page.getByRole("button", { name: /sign in with a magic link/i }).click();
    await page.locator("#email").fill(DEMO_USERS.student);
    await page.getByRole("button", { name: /send magic link/i }).click();
    await expect(page.getByText(/link|sent|check your email/i)).toBeVisible({ timeout: 20_000 });
  });

  test("signs in and signs out cleanly", async ({ page }) => {
    await signInViaUi(page, DEMO_USERS.admin, DEMO_PASSWORD);
    await page.waitForURL("**/app**");

    await page.getByTitle("Sign out").click();
    await page.waitForURL("**/**", { timeout: 20_000 });
    // Back on the marketing site — session cookie cleared.
    await page.goto("/auth/sign-in");
    await page.locator("#email").fill(DEMO_USERS.admin);
    await page.locator("#password").fill(DEMO_PASSWORD);
    await page.getByRole("button", { name: "Sign in", exact: true }).click();
    await page.waitForURL("**/app**", { timeout: 30_000 });
  });
});
