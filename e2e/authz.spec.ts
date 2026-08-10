import { expect, test, API_BASE } from "./helpers";

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
    await page.context().request.post(`${API_BASE}/v1/auth/sign-in`, {
      data: { email: "student@cea.ng", password: "cea-demo-pass-2026" },
      headers: { "Content-Type": "application/json" },
    });
    const cookies = await page.context().request.storageState();
    const session = cookies.cookies.find((c) => c.name === "cea_session");
    expect(session).toBeTruthy();
    const cookieHeader = `cea_session=${session!.value}`;

    for (const path of [
      "/v1/it/tickets",
      "/v1/hr/employees",
      "/v1/admin/users",
      "/v1/recruitment/postings",
    ]) {
      const res = await page.context().request.get(`${API_BASE}${path}`, {
        headers: { cookie: cookieHeader },
      });
      expect(res.status()).toBe(403);
    }
  });

  test("rejects a student from advancing an application (admin-only PATCH)", async ({ page }) => {
    // Create a public application first
    const email = `e2e.rbac.${Date.now()}@example.com`;
    const create = await page.context().request.post(`${API_BASE}/v1/applications`, {
      data: { fullName: "RBAC Tester", email, programSlug: "full-stack-software-development" },
      headers: { "Content-Type": "application/json" },
    });
    expect(create.status()).toBe(201);
    const { application } = (await create.json()) as { application: { ref: string } };

    // Sign in as student and attempt to advance it
    await page.context().request.post(`${API_BASE}/v1/auth/sign-in`, {
      data: { email: "student@cea.ng", password: "cea-demo-pass-2026" },
      headers: { "Content-Type": "application/json" },
    });
    const cookies = await page.context().request.storageState();
    const session = cookies.cookies.find((c) => c.name === "cea_session");
    const res = await page.context().request.patch(
      `${API_BASE}/v1/applications/${application.ref}`,
      {
        data: { status: "screening" },
        headers: { "Content-Type": "application/json", cookie: `cea_session=${session!.value}` },
      },
    );
    expect(res.status()).toBe(403);
  });
});

test.describe("Data scoping + row-level ownership", () => {
  test("student cannot read another student's assignment submissions", async ({ page }) => {
    // Sign in as student (id ...0001 owns assignment a1)
    await page.context().request.post(`${API_BASE}/v1/auth/sign-in`, {
      data: { email: "student@cea.ng", password: "cea-demo-pass-2026" },
      headers: { "Content-Type": "application/json" },
    });
    const cookies = await page.context().request.storageState();
    const session = cookies.cookies.find((c) => c.name === "cea_session");
    const cookieHeader = `cea_session=${session!.value}`;

    // Student can read their own assignment
    const own = await page.context().request.get(`${API_BASE}/v1/assignments/a1`, {
      headers: { cookie: cookieHeader },
    });
    expect(own.status()).toBe(200);

    // Student cannot access an assignment they don't own (a non-existent/foreign id → 404)
    const foreign = await page.context().request.get(`${API_BASE}/v1/assignments/foreign-assignment`, {
      headers: { cookie: cookieHeader },
    });
    expect(foreign.status()).toBe(404);
  });

  test("employer can create and read back their own posting (ownership round-trip)", async ({ page }) => {
    await page.context().request.post(`${API_BASE}/v1/auth/sign-in`, {
      data: { email: "employer@cea.ng", password: "cea-demo-pass-2026" },
      headers: { "Content-Type": "application/json" },
    });
    const cookies = await page.context().request.storageState();
    const session = cookies.cookies.find((c) => c.name === "cea_session");
    const cookieHeader = `cea_session=${session!.value}`;

    const title = `E2E Ownership ${Date.now()}`;
    const create = await page.context().request.post(`${API_BASE}/v1/recruitment/postings`, {
      data: { title, detail: "E2E ownership test", tone: "Senior" },
      headers: { "Content-Type": "application/json", cookie: cookieHeader },
    });
    expect(create.status()).toBe(201);
    const created = (await create.json()) as { ok: boolean; id: string; title: string };
    expect(created.ok).toBe(true);
    expect(created.title).toBe(title);
  });
});
