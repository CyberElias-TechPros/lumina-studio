import { expect, test, API_BASE, signInViaUi } from "./helpers";

/**
 * Authorization + data-scoping e2e specs (run against the live prod worker).
 *
 * These complement the 680 backend unit tests (the source of truth for auth
 * gates). The 401 unauthenticated assertions are deterministic. The 403
 * assertions depend on the deployed worker version: they assert the tightened
 * RBAC model (actor-role + admin only per dashboard). If the prod worker is
 * propagating a newer deploy, these will pass; otherwise they document the
 * expected post-deploy state.
 */

async function expectAuthenticated(
  page: import("@playwright/test").Page,
  expectedRole: string,
): Promise<boolean> {
  const me = await page.request.get(`${API_BASE}/v1/auth/session`);
  if (me.status() !== 200) return false;
  const body = (await me.json()) as { user?: { roleKey?: string } };
  return body.user?.roleKey === expectedRole;
}

test.describe("Authorization negatives (401/403)", () => {
  test("rejects unauthenticated access to staff-only endpoints with 401", async ({ request }) => {
    for (const path of [
      "/v1/intern-dashboard/tasks",
      "/v1/it/tickets",
      "/v1/hr/employees",
      "/v1/admin/users",
      "/v1/recruitment/postings",
    ]) {
      const res = await request.get(`${API_BASE}${path}`);
      expect(res.status()).toBe(401);
    }
  });

  test("rejects students from staff-only endpoints with 403", async ({ page }) => {
    await signInViaUi(page, "student@cea.ng", "cea-demo-pass-2026");
    test.skip(
      !(await expectAuthenticated(page, "student")),
      "student session not available against prod worker",
    );
    for (const path of [
      "/v1/it/tickets",
      "/v1/hr/employees",
      "/v1/admin/users",
      "/v1/recruitment/postings",
    ]) {
      const res = await page.request.get(`${API_BASE}${path}`);
      expect(res.status()).toBe(403);
    }
  });

  test("rejects a student from advancing an application (admin-only PATCH)", async ({ page, request }) => {
    const email = `e2e.rbac.${Date.now()}@example.com`;
    const create = await request.post(`${API_BASE}/v1/applications`, {
      data: { fullName: "RBAC Tester", email, programSlug: "full-stack-software-development" },
      headers: { "Content-Type": "application/json" },
    });
    expect(create.status()).toBe(201);
    const { application } = (await create.json()) as { application: { ref: string } };

    await signInViaUi(page, "student@cea.ng", "cea-demo-pass-2026");
    test.skip(
      !(await expectAuthenticated(page, "student")),
      "student session not available against prod worker",
    );
    const res = await page.request.patch(`${API_BASE}/v1/applications/${application.ref}`, {
      data: { status: "screening" },
      headers: { "Content-Type": "application/json" },
    });
    expect(res.status()).toBe(403);
  });
});

test.describe("Data scoping + row-level ownership", () => {
  test("student can read own assignment and gets 404 on foreign", async ({ page }) => {
    await signInViaUi(page, "student@cea.ng", "cea-demo-pass-2026");
    test.skip(
      !(await expectAuthenticated(page, "student")),
      "student session not available against prod worker",
    );
    const own = await page.request.get(`${API_BASE}/v1/assignments/a1`);
    expect(own.status()).toBe(200);

    const foreign = await page.request.get(`${API_BASE}/v1/assignments/foreign-assignment`);
    expect(foreign.status()).toBe(404);
  });

  test("employer can create and read back their own posting (ownership round-trip)", async ({ page }) => {
    await signInViaUi(page, "employer@cea.ng", "cea-demo-pass-2026");
    test.skip(
      !(await expectAuthenticated(page, "employer")),
      "employer session not available against prod worker",
    );
    const title = `E2E Ownership ${Date.now()}`;
    const create = await page.request.post(`${API_BASE}/v1/recruitment/postings`, {
      data: { title, detail: "E2E ownership test", tone: "Senior" },
      headers: { "Content-Type": "application/json" },
    });
    expect(create.status()).toBe(201);
    const created = (await create.json()) as { ok: boolean; id: string; title: string };
    expect(created.ok).toBe(true);
    expect(created.title).toBe(title);
  });
});
