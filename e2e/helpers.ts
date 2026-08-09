import { test as base, type Page, type APIRequestContext } from "@playwright/test";

export const DEMO_PASSWORD = "cea-demo-pass-2026";

export const DEMO_USERS = {
  student: "student@cea.ng",
  instructor: "instructor@cea.ng",
  parent: "parent@cea.ng",
  admin: "admin@cea.ng",
  mentor: "mentor@cea.ng",
  hr: "hr@cea.ng",
  finance: "finance@cea.ng",
} as const;

export const API_BASE = process.env.E2E_API_BASE ?? "https://cea-api.cyber-e54.workers.dev";

export type Role = keyof typeof DEMO_USERS;

/**
 * Sign in via the API and set the cea_session cookie into the browser context.
 * Cross-origin cookies (worker) require the context to allow third-party cookies.
 */
export async function signInViaApi(page: Page, role: Role): Promise<void> {
  const email = DEMO_USERS[role];
  const request = page.context().request;
  const res = await request.post(`${API_BASE}/v1/auth/sign-in`, {
    data: { email, password: DEMO_PASSWORD, remember: true },
    headers: { "Content-Type": "application/json" },
  });
  const body = (await res.json()) as {
    user?: { roleKey?: string };
    error?: { message?: string };
  };
  if (!res.ok()) {
    throw new Error(`sign-in failed for ${email}: ${res.status()} ${body.error?.message ?? JSON.stringify(body)}`);
  }
  const cookies = await request.storageState();
  const sessionCookie = cookies.cookies.find(
    (c) => c.name === "cea_session" || (c.name === "cea_session" && c.domain.includes("workers.dev")),
  );
  if (!sessionCookie) {
    throw new Error(`no cea_session cookie returned for ${email}`);
  }
  await page.context().addCookies([
    {
      name: sessionCookie.name,
      value: sessionCookie.value,
      domain: sessionCookie.domain,
      path: sessionCookie.path,
      expires: sessionCookie.expires,
      httpOnly: sessionCookie.httpOnly,
      secure: sessionCookie.secure,
      sameSite: sessionCookie.sameSite as "Lax" | "Strict" | "None",
    },
  ]);
  // Prime the session and dismiss the onboarding tour so it cannot block later clicks.
  await page.goto("/app");
  await dismissTour(page);
  await page.goto("about:blank");
}

/** Dismiss the onboarding tour modal if it appears and mark it seen. */
export async function dismissTour(page: Page): Promise<void> {
  await page
    .evaluate(() => window.localStorage.setItem("cea:onboarding:tour:v1", new Date().toISOString()))
    .catch(() => {});
  const close = page.getByRole("button", { name: /close tour/i });
  if (await close.isVisible().catch(() => false)) {
    await close.click().catch(() => {});
  }
  const dialog = page.getByRole("dialog", { name: /welcome to lumina studio/i });
  if (await dialog.isVisible().catch(() => false)) {
    await page.keyboard.press("Escape").catch(() => {});
  }
}

/** Sign in through the real browser UI (covers the full form flow). */
export async function signInViaUi(page: Page, email: string, password: string): Promise<void> {
  await page.goto("/auth/sign-in");
  // Prime the tour key BEFORE the app loads so the 900ms delayed tour never schedules.
  await page
    .evaluate(() => window.localStorage.setItem("cea:onboarding:tour:v1", new Date().toISOString()))
    .catch(() => {});
  await page.locator("#email").fill(email);
  await page.locator("#password").fill(password);
  await page.getByRole("button", { name: "Sign in", exact: true }).click();
  await page.waitForURL("**/app**", { timeout: 30_000 });
  await page.waitForTimeout(1_200);
  await dismissTour(page);
}

/** Wait for a heading/text to appear, throwing a readable error otherwise. */
export async function expectVisible(page: Page, selector: string | RegExp): Promise<void> {
  const locator =
    typeof selector === "string" ? page.locator(selector).first() : page.getByText(selector).first();
  await locator.waitFor({ state: "visible", timeout: 20_000 });
}

export async function expectNoErrorState(page: Page): Promise<void> {
  await page.waitForLoadState("networkidle").catch(() => {});
  const errors = page.locator("text=/something went wrong|failed to load|error occurred/i");
  const count = await errors.count();
  if (count > 0) {
    throw new Error(`page shows error state: ${await errors.first().textContent()}`);
  }
}

/** Convenience test wrapper with helpers attached. */
export const test = base.extend<{ signIn: (role: Role) => Promise<void> }>({
  signIn: async ({ page }, use) => {
    await use((role: Role) => signInViaApi(page, role));
  },
});

export { expect } from "@playwright/test";
