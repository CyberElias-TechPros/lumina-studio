import { expect, test, type Page } from "@playwright/test";

const origin = new URL(process.env.E2E_BASE_URL ?? "http://127.0.0.1:3000").origin;
const cors = {
  "Access-Control-Allow-Origin": origin,
  "Access-Control-Allow-Credentials": "true",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};
test.use({ serviceWorkers: "block" });

async function fixture(
  page: Page,
  roleKey: "admin" | "parent" | "student",
  initialSignedIn = true,
  options: { mfa?: boolean; verified?: boolean } = {},
) {
  let signedIn = initialSignedIn;
  let verified = options.verified ?? true;
  let currentRole = roleKey;
  const requests: Array<{ path: string; method: string; body: unknown }> = [];
  let accepted = false;
  await page.addInitScript(() => localStorage.setItem("cea:onboarding:tour:v1", "test"));
  await page.route("**/*", async (route) => {
    const url = new URL(route.request().url());
    if (!["localhost", "127.0.0.1"].includes(url.hostname)) return route.abort();
    if (!url.pathname.startsWith("/v1/")) return route.continue();
    if (route.request().method() === "OPTIONS")
      return route.fulfill({ status: 204, headers: cors });
    const method = route.request().method();
    requests.push({ path: url.pathname, method, body: route.request().postDataJSON() });
    const reply = (json: unknown) => route.fulfill({ json, headers: cors });
    const session = () => ({
      user: {
        id: "fixture-user",
        name: "Fixture User",
        email: "fixture@example.test",
        roleKey: currentRole,
        permissions: ["*"],
      },
      expiresAt: "2099-01-01T00:00:00.000Z",
    });
    if (url.pathname === "/v1/auth/session" || url.pathname === "/v1/auth/refresh") {
      if (!signedIn)
        return route.fulfill({
          status: 401,
          headers: cors,
          json: { error: { code: "UNAUTHORIZED", message: "Authentication required." } },
        });
      return reply(session());
    }
    if (url.pathname === "/v1/auth/sign-out") {
      signedIn = false;
      return reply({ ok: true });
    }
    if (url.pathname === "/v1/auth/sign-in" || url.pathname === "/v1/auth/magic-link/verify") {
      currentRole = "parent";
      if (options.mfa) return reply({ mfaRequired: true, expiresAt: "2099-01-01T00:00:00Z" });
      signedIn = true;
      return reply(session());
    }
    if (url.pathname === "/v1/auth/mfa/verify") {
      signedIn = true;
      return reply(session());
    }
    if (url.pathname === "/v1/admin/accounts")
      return reply({
        items: [
          {
            id: "student-1",
            name: "Learner Test",
            email: "learner@example.test",
            roleKey: "student",
            status: "active",
            createdAt: "2026-01-01",
          },
          {
            id: "parent-1",
            name: "Parent Test",
            email: "parent@example.test",
            roleKey: "parent",
            status: "active",
            createdAt: "2026-01-01",
          },
        ],
        total: 2,
      });
    if (url.pathname === "/v1/invitations" && method === "POST")
      return reply({
        ok: true,
        token: "test-token",
        url: `${origin}/app/parent/invitation/accept?token=test-token`,
        expiresAt: "2099-01-01T00:00:00Z",
      });
    if (url.pathname === "/v1/invitations/test-token" && method === "GET")
      return reply({
        status: accepted ? "accepted" : "pending",
        expiresAt: "2099-01-01T00:00:00Z",
      });
    if (url.pathname === "/v1/invitations/test-token/accept" && method === "POST") {
      accepted = true;
      return reply({
        ok: true,
        studentId: "student-1",
        studentName: "Learner Test",
        roleUpdated: false,
        linked: true,
      });
    }
    if (url.pathname === "/v1/parent/students") return reply({ items: [], total: 0 });
    if (url.pathname === "/v1/parent/students/student-1")
      return reply({
        studentId: "student-1",
        name: "Learner Test",
        email: "learner@example.test",
        gpa: null,
        due: 1000,
        dueCount: 1,
        courses: [],
        gradebook: [],
      });
    if (url.pathname === "/v1/parent/students/student-1/finance")
      return reply({
        studentId: "student-1",
        items: [
          {
            id: "invoice-1",
            party: "Learner Test",
            amount: 1000,
            due: "2026-12-01",
            status: "pending",
          },
        ],
        totals: { paid: 0, outstanding: 1000, count: 1 },
      });
    if (url.pathname === "/v1/parent/students/student-1/attendance")
      return reply({
        studentId: "student-1",
        pct: 0,
        counts: { present: 0, late: 0, excused: 0, absent: 0 },
        total: 0,
        items: [],
      });
    if (url.pathname === "/v1/notifications/preferences")
      return reply({
        appEnabled: true,
        emailEnabled: true,
        smsEnabled: false,
        quietStart: "21:00",
        quietEnd: "08:00",
      });
    if (url.pathname === "/v1/push/send" && method === "POST")
      return reply({ sent: 0, removed: 0, skipped: 1, failed: 1 });
    if (url.pathname === "/v1/account/verify-email/send") return reply({ ok: true, sent: true });
    if (url.pathname === "/v1/account/verify-email") {
      verified = true;
      return reply({ id: "fixture-user", email: "parent@example.test", emailVerified: verified });
    }
    if (url.pathname === "/v1/account")
      return reply({ id: "fixture-user", email: "parent@example.test", emailVerified: verified });
    return reply({ items: [], total: 0, count: 0 });
  });
  return requests;
}

test("admin creates a targeted link and sees that it must be shared manually", async ({ page }) => {
  const requests = await fixture(page, "admin");
  await page.goto("/app/admin/users");
  await page.getByRole("button", { name: "Invite guardian" }).click();
  await page.getByLabel("Student account").selectOption("student-1");
  await page.getByLabel("Parent account").selectOption("parent-1");
  await page.getByRole("button", { name: "Create link" }).click();
  await expect(
    page.getByText("The link has been created, not sent.", { exact: false }),
  ).toBeVisible();
  await expect(page.getByLabel("Invitation link")).toHaveValue(
    `${origin}/app/parent/invitation/accept?token=test-token`,
  );
  expect(requests.find((r) => r.path === "/v1/invitations" && r.method === "POST")?.body).toEqual({
    studentId: "student-1",
    guardianUserId: "parent-1",
  });
});

test("parent preview is anonymous and the learner name appears only after acceptance", async ({
  page,
}) => {
  await fixture(page, "parent");
  await page.goto("/app/parent/invitation/accept?token=test-token");
  await expect(page.getByText("Parent account invitation")).toBeVisible();
  await expect(page.getByText("Learner Test")).toHaveCount(0);
  await page.getByRole("button", { name: "Accept invitation" }).click();
  await expect(page.getByText("You're now connected")).toBeVisible();
  await expect(page.getByText("Learner Test")).toBeVisible();
});

test("parent dashboard does not present legacy or invented information as fact", async ({
  page,
}) => {
  await fixture(page, "parent");
  await page.goto("/app/parent");
  await expect(page.getByText("No linked learners")).toBeVisible();
  await expect(
    page.getByText("Previously linked learners may need to be verified again.", { exact: false }),
  ).toBeVisible();
  await expect(page.getByText("Accounts in good standing")).toHaveCount(0);
  await expect(page.getByText("Term 2 exams begin Aug 18")).toHaveCount(0);
  await expect(page.getByText("Ada's mentor", { exact: false })).toHaveCount(0);
});

test("parent learner screens do not invent schedules, policy or invoice payment", async ({
  page,
}) => {
  const requests = await fixture(page, "parent");
  await page.goto("/app/parent/students/student-1");
  await expect(page.getByText("Timetable and mentor notes")).toBeVisible();
  await expect(page.getByText("Mr. Adeyemi")).toHaveCount(0);
  await expect(page.getByText("GPA unavailable", { exact: false })).toBeVisible();
  await page.goto("/app/parent/students/student-1/attendance");
  await expect(page.getByText("No attendance records")).toBeVisible();
  await expect(page.getByText("90% policy", { exact: false })).toHaveCount(0);
  await page.goto("/app/parent/students/student-1/finance");
  await expect(page.getByText("Online payment unavailable")).toBeVisible();
  await expect(page.getByRole("button", { name: /Pay .* now/i })).toHaveCount(0);
  expect(requests.filter((r) => r.path === "/v1/payments/checkout")).toHaveLength(0);
  await page.goto("/app/parent/students/student-1/communication");
  await expect(page.getByRole("link", { name: "Overview" })).toHaveAttribute(
    "href",
    "/app/parent/students/student-1",
  );
  await expect(page.getByText("Ada Okafor", { exact: false })).toHaveCount(0);
});

test("browser push UI sends only a generic hint and reports uncertain delivery", async ({
  page,
}) => {
  const requests = await fixture(page, "parent");
  await page.goto("/app/notifications");
  await expect(
    page.getByText("This does not create an inbox message", { exact: false }),
  ).toBeVisible();
  await expect(page.getByText("Browser push is not enabled here.")).toBeVisible();
  await expect(page.getByLabel("Title", { exact: true })).toHaveCount(0);
  await page.getByRole("button", { name: "Send browser hint" }).click();
  await expect(
    page.getByText("Acceptance does not confirm delivery", { exact: false }),
  ).toBeVisible();
  await expect(page.getByText("1 attempt(s) failed", { exact: false })).toBeVisible();
  expect(
    requests.find((request) => request.path === "/v1/push/send" && request.method === "POST")?.body,
  ).toEqual({ title: "CEA update", body: "Open CEA to check your notifications." });
});

test("signed-out guardian keeps the invitation through password sign-in", async ({ page }) => {
  const requests = await fixture(page, "parent", false);
  await page.goto("/app/parent/invitation/accept?token=test-token");
  await expect(page.getByText("Parent account invitation")).toBeVisible();
  await page.getByRole("button", { name: "Sign in to the intended parent account" }).click();
  await expect(page).toHaveURL(/\/auth\/sign-in/);
  expect(await page.evaluate(() => sessionStorage.getItem("cea_pending_invite"))).toBe(
    "test-token",
  );
  await page.getByLabel("Email address").fill("parent@example.test");
  await page.getByLabel("Password", { exact: true }).fill("isolated-test-password");
  await page.getByRole("button", { name: "Sign in", exact: true }).click();
  await expect(page).toHaveURL(/\/app\/parent\/invitation\/accept\?token=test-token/);
  await expect(page.getByRole("button", { name: "Accept invitation" })).toBeVisible();
  expect(requests.some((request) => request.path === "/v1/auth/sign-in")).toBe(true);
});

test("a signed-in wrong-role user can switch accounts without losing the invitation", async ({
  page,
}) => {
  const requests = await fixture(page, "student");
  await page.goto("/app/parent/invitation/accept?token=test-token");
  await expect(page.getByText("Parent account invitation")).toBeVisible();
  await page.getByRole("button", { name: "Use a different account" }).click();
  await expect(page).toHaveURL(/\/auth\/sign-in/);
  expect(await page.evaluate(() => sessionStorage.getItem("cea_pending_invite"))).toBe(
    "test-token",
  );
  expect(requests.some((request) => request.path === "/v1/auth/sign-out")).toBe(true);
  await page.getByLabel("Email address").fill("parent@example.test");
  await page.getByLabel("Password", { exact: true }).fill("isolated-test-password");
  await page.getByRole("button", { name: "Sign in", exact: true }).click();
  await expect(page).toHaveURL(/\/app\/parent\/invitation\/accept\?token=test-token/);
  await expect(page.getByRole("button", { name: "Accept invitation" })).toBeVisible();
});

test("guardian returns after MFA without losing the invitation", async ({ page }) => {
  await fixture(page, "parent", false, { mfa: true });
  await page.goto("/app/parent/invitation/accept?token=test-token");
  await page.getByRole("button", { name: "Sign in to the intended parent account" }).click();
  await page.getByLabel("Email address").fill("parent@example.test");
  await page.getByLabel("Password", { exact: true }).fill("isolated-test-password");
  await page.getByRole("button", { name: "Sign in", exact: true }).click();
  await expect(page).toHaveURL(/\/auth\/mfa/);
  await page.getByLabel("6-digit code from your authenticator app").fill("123456");
  await page.getByRole("button", { name: "Confirm" }).click();
  await expect(page).toHaveURL(/\/app\/parent\/invitation\/accept\?token=test-token/);
  await expect(page.getByRole("button", { name: "Accept invitation" })).toBeVisible();
});

test("guardian can request email verification and return to the invitation", async ({ page }) => {
  await fixture(page, "parent", true, { verified: false });
  await page.goto("/app/parent/invitation/accept?token=test-token");
  await page.getByRole("link", { name: "Open email verification" }).click();
  await expect(page).toHaveURL(/\/auth\/verify-email/);
  await expect(
    page.getByText("If you need a code, request one below.", { exact: false }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Send or resend code" }).click();
  await expect(page.getByText("A new code is on its way.")).toBeVisible();
  await page.getByLabel("Digit 1").fill("123456");
  await page.getByRole("button", { name: "Verify email" }).click();
  await page.getByRole("link", { name: "Return to invitation" }).click();
  await expect(page).toHaveURL(/\/app\/parent\/invitation\/accept\?token=test-token/);
  await expect(page.getByRole("button", { name: "Accept invitation" })).toBeVisible();
});

test("same-tab magic link returns to the pending invitation", async ({ page }) => {
  await fixture(page, "parent", false);
  await page.goto("/app/parent/invitation/accept?token=test-token");
  await page.getByRole("button", { name: "Sign in to the intended parent account" }).click();
  await page.goto("/auth/magic-link?token=isolated-magic-token");
  await expect(page).toHaveURL(/\/app\/parent\/invitation\/accept\?token=test-token/);
  await expect(page.getByRole("button", { name: "Accept invitation" })).toBeVisible();
});
