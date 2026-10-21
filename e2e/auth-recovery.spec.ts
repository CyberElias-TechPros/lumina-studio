import { test, expect } from "@playwright/test";

const cors = {
  "Access-Control-Allow-Origin": new URL(process.env.E2E_BASE_URL ?? "http://127.0.0.1:3000")
    .origin,
  "Access-Control-Allow-Credentials": "true",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

test.use({ serviceWorkers: "block" });
test.beforeEach(async ({ page }) => {
  await page.route("**/*", (route) => {
    const url = new URL(route.request().url());
    if (!["localhost", "127.0.0.1"].includes(url.hostname)) return route.abort();
    if (url.pathname.startsWith("/v1/") && route.request().method() === "OPTIONS")
      return route.fulfill({ status: 204, headers: cors });
    if (url.pathname.startsWith("/v1/"))
      return route.fulfill({
        status: 401,
        headers: cors,
        json: { error: { code: "UNAUTHORIZED", message: "Sign in" } },
      });
    return route.continue();
  });
});

test("same-account guidance and password control are accessible", async ({ page }) => {
  await page.goto("/auth/sign-in");
  await expect(page.getByText(/same CEA email and password/)).toBeVisible();
  await expect(page.getByLabel("Email address")).toHaveAttribute("autocomplete", "username");
  await page.getByRole("button", { name: "Show password", exact: true }).click();
  await expect(page.getByLabel("Password", { exact: true })).toHaveAttribute("type", "text");
  await page.getByRole("button", { name: "Hide password", exact: true }).click();
  await expect(page.getByLabel("Password", { exact: true })).toHaveAttribute("type", "password");
});

test("resend retains email and does not claim a failed email was sent", async ({ page }) => {
  const emails: string[] = [];
  await page.route("**/v1/auth/magic-link", async (route) => {
    if (route.request().method() === "OPTIONS")
      return route.fulfill({ status: 204, headers: cors });
    emails.push(route.request().postDataJSON().email);
    await route.fulfill({
      status: 201,
      headers: cors,
      json: { ok: true, sent: emails.length === 1 },
    });
  });
  await page.goto("/auth/sign-in");
  await page.getByRole("button", { name: "Sign in with a link instead" }).click();
  await page.getByLabel("Email address").fill("learner@example.test");
  await page.getByRole("button", { name: "Send sign-in link", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Check your inbox" })).toBeVisible();
  await page.getByRole("button", { name: "Request another link" }).click();
  await expect(page.getByLabel("Email address")).toHaveValue("learner@example.test");
  await expect(page.getByLabel("Email address")).toBeFocused();
  expect(emails).toHaveLength(1);
  await page.getByRole("button", { name: "Send sign-in link", exact: true }).click();
  await expect(page.getByRole("alert")).toContainText("We could not send the sign-in email");
  await expect(page.getByRole("heading", { name: "Check your inbox" })).toHaveCount(0);
  expect(emails).toEqual(["learner@example.test", "learner@example.test"]);
});

test("registration does not promise self-assigned staff privileges", async ({ page }) => {
  await page.goto("/auth/sign-up");
  await expect(page.getByText(/New accounts start with learner access/)).toBeVisible();
  await expect(page.getByRole("button", { name: /Instructor|Employer|Partner/ })).toHaveCount(0);
  await expect(page.getByLabel("Password", { exact: true })).toHaveAttribute("minlength", "8");
});
