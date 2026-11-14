import { expect, test, type Page } from "@playwright/test";
const origin = new URL(process.env.E2E_BASE_URL ?? "http://127.0.0.1:3001").origin;
const cors = {
  "Access-Control-Allow-Origin": origin,
  "Access-Control-Allow-Credentials": "true",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, PUT, OPTIONS",
};
test.use({ serviceWorkers: "block" });
async function fixture(page: Page, role: "admin" | "student") {
  let status: "none" | "issued" | "revoked" = "none";
  const writes: { path: string; body: Record<string, unknown> }[] = [];
  await page.addInitScript(() => localStorage.setItem("cea:onboarding:tour:v1", "test"));
  await page.route("**/*", async (route) => {
    const url = new URL(route.request().url());
    if (!["localhost", "127.0.0.1"].includes(url.hostname)) return route.abort();
    if (!url.pathname.startsWith("/v1/")) return route.continue();
    const method = route.request().method();
    if (method === "OPTIONS") return route.fulfill({ status: 204, headers: cors });
    const reply = (json: unknown) => route.fulfill({ headers: cors, json });
    if (url.pathname === "/v1/auth/session")
      return reply({
        user: {
          id: "fixture",
          name: "Test User",
          email: "test@example.test",
          roleKey: role,
          permissions: ["*"],
        },
        expiresAt: "2099-01-01T00:00:00Z",
      });
    if (url.pathname === "/v1/account")
      return reply({
        id: "fixture",
        name: "Test User",
        email: "test@example.test",
        roleKey: role,
        emailVerified: true,
      });
    if (url.pathname === "/v1/admin/accounts")
      return reply({
        items: [
          {
            id: "learner",
            name: "Learner Test",
            email: "learner@example.test",
            roleKey: "student",
            status: "active",
          },
        ],
        total: 1,
        nextCursor: null,
      });
    if (url.pathname === "/v1/courses")
      return reply({
        items: [{ slug: "course-one", title: "Course One" }],
        total: 1,
        nextCursor: null,
      });
    if (url.pathname === "/v1/certificates/admin/records")
      return reply({
        items:
          status === "none"
            ? []
            : [
                {
                  id: "certificate-one",
                  title: "Course One",
                  code: "CEA-TEST-CODE1",
                  issuedAt: "2026-01-01T00:00:00Z",
                  status,
                },
              ],
        truncated: false,
      });
    if (url.pathname === "/v1/certificates" && method === "POST") {
      writes.push({ path: url.pathname, body: route.request().postDataJSON() });
      status = "issued";
      return reply({
        id: "certificate-one",
        courseSlug: "course-one",
        title: "Course One",
        code: "CEA-TEST-CODE1",
        issuedAt: "2026-01-01T00:00:00Z",
        status,
      });
    }
    if (url.pathname === "/v1/certificates/certificate-one/revoke" && method === "POST") {
      writes.push({ path: url.pathname, body: route.request().postDataJSON() });
      status = "revoked";
      return reply({ ok: true });
    }
    if (url.pathname === "/v1/certificates/mine")
      return reply({
        items: [
          {
            id: "certificate-one",
            courseSlug: "course-one",
            title: "Course One",
            code: "CEA-TEST-CODE1",
            issuedAt: "2026-01-01T00:00:00Z",
            status: "revoked",
          },
        ],
        total: 1,
      });
    if (url.pathname === "/v1/certificates/verify")
      return reply({
        valid: false,
        status: "revoked",
        message: "This certificate record has been revoked.",
      });
    return reply({ items: [], total: 0, nextCursor: null });
  });
  return writes;
}
test("administrator reviews, issues and revokes a course record", async ({ page }) => {
  const writes = await fixture(page, "admin");
  await page.goto("/app/admin/users");
  await page.getByLabel("Certificate learner account").selectOption("learner");
  await page.getByLabel("Certificate course").selectOption("course-one");
  await expect(page.getByText("No records for this learner and course.")).toBeVisible();
  await page.getByLabel("Review reference").fill("review-42");
  await page.getByRole("checkbox", { name: /independently reviewed this learner/ }).check();
  await page.getByRole("button", { name: "Issue reviewed certificate" }).click();
  await expect(
    page.getByText("Certificate issued. The learner can see it in their account."),
  ).toBeVisible();
  expect(writes[0]?.body).toEqual({
    userId: "learner",
    courseSlug: "course-one",
    evidenceRef: "review-42",
    confirmed: true,
  });
  await page.getByRole("button", { name: "Review revocation" }).click();
  await page.getByLabel("Reason for revocation").fill("Incorrect record");
  await page.getByRole("button", { name: "Confirm revocation" }).click();
  await expect(page.getByText("Certificate revoked.")).toBeVisible();
  expect(writes[1]?.body).toEqual({ reason: "Incorrect record", confirmed: true });
});
test("learner and public verifier can see a record is revoked", async ({ page }) => {
  await fixture(page, "student");
  await page.goto("/app/certificates");
  await expect(page.getByText("Revoked", { exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "Print / save PDF" })).toBeDisabled();
  await page.goto("/certificates/verify");
  await page.getByLabel("Certificate code").fill("CEA-TEST-CODE1");
  await page.getByRole("button", { name: "Verify", exact: true }).click();
  await expect(page.getByText("Record revoked")).toBeVisible();
  await expect(page.getByText("This certificate record has been revoked.")).toBeVisible();
});
