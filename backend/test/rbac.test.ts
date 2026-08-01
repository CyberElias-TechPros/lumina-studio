import { beforeAll, describe, expect, it } from "vitest";
import { api, cookieHeaders, createTestSession, setupDb } from "./helpers";
import { RBAC_RULES } from "../src/lib/rbac";

type TestSession = Awaited<ReturnType<typeof createTestSession>>;

let student: TestSession;
let instructor: TestSession;
let hr: TestSession;
let finance: TestSession;
let admin: TestSession;

beforeAll(async () => {
  await setupDb();
  student = await createTestSession("student@cea.ng");
  instructor = await createTestSession("instructor@cea.ng");
  hr = await createTestSession("hr@cea.ng");
  finance = await createTestSession("finance@cea.ng");
  admin = await createTestSession("admin@cea.ng");
});

describe("RBAC registry integrity", () => {
  it("lists no duplicate path+method rules", () => {
    const keys = RBAC_RULES.map((r) => `${r.methods.join("|")} ${r.path}`);
    expect(new Set(keys).size).toBe(keys.length);
  });

  it("registers every known endpoint prefix", () => {
    const paths = RBAC_RULES.map((r) => r.path);
    for (const prefix of [
      "/v1/auth/",
      "/v1/programs",
      "/v1/applications",
      "/v1/courses",
      "/v1/dashboard/",
      "/v1/assignments",
      "/v1/assessments",
      "/v1/calendar/",
      "/v1/messages/",
      "/v1/instructor/",
      "/v1/hr/",
      "/v1/invoices",
      "/v1/expenses",
      "/v1/payments",
      "/v1/admin/",
      "/v1/notifications",
      "/v1/recruitment/",
      "/v1/marketing/",
      "/v1/design/",
      "/v1/localization/",
      "/v1/flags",
      "/v1/health",
      "/v1/push/",
    ]) {
      expect(
        paths.some((p) => p.startsWith(prefix)),
        prefix,
      ).toBe(true);
    }
  });
});

describe("RBAC guard", () => {
  it("keeps public routes open", async () => {
    expect((await api("/v1/flags")).status).toBe(200);
    expect((await api("/v1/programs")).status).toBe(200);
  });

  it("rejects unauthenticated requests on protected routes", async () => {
    for (const path of [
      "/v1/courses",
      "/v1/notifications",
      "/v1/recruitment/postings",
      "/v1/realtime/chat/rooms",
      "/v1/live/classes",
      "/v1/ai/recommendations",
    ]) {
      const res = await api(path);
      expect(res.status, path).toBe(401);
    }
  });

  it("403s a student from admin, hr and instructor routes", async () => {
    for (const path of ["/v1/admin/users", "/v1/hr/employees", "/v1/instructor/gradebook"]) {
      const res = await api(path, { headers: cookieHeaders(student.cookie) });
      expect(res.status, path).toBe(403);
    }
  });

  it("403s a student from finance routes and 200s a finance officer", async () => {
    const studentRes = await api("/v1/expenses", { headers: cookieHeaders(student.cookie) });
    expect(studentRes.status).toBe(403);
    const financeRes = await api("/v1/expenses", { headers: cookieHeaders(finance.cookie) });
    expect(financeRes.status).toBe(200);
    const adminRes = await api("/v1/expenses", { headers: cookieHeaders(admin.cookie) });
    expect(adminRes.status).toBe(200);
  });

  it("403s non-admins from admin routes and allows the admin", async () => {
    const hrRes = await api("/v1/admin/users", { headers: cookieHeaders(hr.cookie) });
    expect(hrRes.status).toBe(403);
    const adminRes = await api("/v1/admin/users", { headers: cookieHeaders(admin.cookie) });
    expect(adminRes.status).toBe(200);
  });

  it("403s non-instructors from instructor routes and allows an instructor", async () => {
    const studentRes = await api("/v1/instructor/gradebook", {
      headers: cookieHeaders(student.cookie),
    });
    expect(studentRes.status).toBe(403);
    const instructorRes = await api("/v1/instructor/gradebook", {
      headers: cookieHeaders(instructor.cookie),
    });
    expect(instructorRes.status).toBe(200);
  });

  it("allows any authenticated role on shared read suites", async () => {
    for (const path of [
      "/v1/recruitment/postings",
      "/v1/marketing/campaigns",
      "/v1/design/tokens",
      "/v1/localization/glossary",
      "/v1/calendar/events",
    ]) {
      const res = await api(path, { headers: cookieHeaders(student.cookie) });
      expect(res.status, path).toBe(200);
    }
  });

  it("403s unregistered paths", async () => {
    const res = await api("/v1/definitely-not-registered", {
      headers: cookieHeaders(student.cookie),
    });
    expect(res.status).toBe(403);
  });
});
