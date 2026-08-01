import { beforeAll, describe, expect, it } from "vitest";
import { api, cookieHeaders, createTestSession, setupDb } from "./helpers";

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

interface GradebookRowShape {
  id: string;
  student: string;
  quiz: number;
  lab: number;
  assignment: number;
  midterm: number;
  total: number;
  letter: string;
  atRisk: boolean;
}

interface CourseShape {
  id: string;
  title: string;
  cohort: string;
  status: string;
  modules: unknown[];
}

interface SubmissionShape {
  id: string;
  student: string;
  title: string;
  submitted: string;
  status: string;
  score?: number;
  late: boolean;
  file: string;
  size: string;
}

interface EmployeeShape {
  id: string;
  name: string;
  role: string;
  dept: string;
  status: string;
  joined: string;
}

interface LeaveShape {
  id: string;
  employee: string;
  type: string;
  from: string;
  to: string;
  status: string;
}

interface InvoiceShape {
  id: string;
  party: string;
  amount: number;
  due: string;
  status: string;
}

interface ExpenseShape {
  id: string;
  category: string;
  amount: number;
}

interface AdminUserShape {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  lastSeen: string;
}

interface AuditShape {
  id: string;
  actor: string;
  action: string;
  time: string;
  severity: string;
}

interface NotificationShape {
  id: string;
  title: string;
  body: string;
  time: string;
  engine: string;
}

interface Page<T> {
  items: T[];
  nextCursor?: string;
  total: number;
}

describe("instructor suite", () => {
  it("rejects unauthenticated requests", async () => {
    const res = await api("/v1/instructor/gradebook");
    expect(res.status).toBe(401);
  });

  it("forbids students from instructor endpoints", async () => {
    for (const path of [
      "/v1/instructor/gradebook",
      "/v1/instructor/courses",
      "/v1/instructor/assignments",
    ]) {
      const res = await api(path, { headers: cookieHeaders(student.cookie) });
      expect(res.status).toBe(403);
    }
  });

  it("returns the gradebook for an instructor", async () => {
    const res = await api("/v1/instructor/gradebook", {
      headers: cookieHeaders(instructor.cookie),
    });
    expect(res.status).toBe(200);
    const body = (await res.json()) as Page<GradebookRowShape>;
    expect(body.items.length).toBeGreaterThan(0);
    const row = body.items[0]!;
    expect(row).toMatchObject({
      student: expect.any(String),
      quiz: expect.any(Number),
      lab: expect.any(Number),
      assignment: expect.any(Number),
      midterm: expect.any(Number),
      total: expect.any(Number),
      letter: expect.any(String),
      atRisk: expect.any(Boolean),
    });
    expect(body.total).toBe(body.items.length);
  });

  it("lists instructor courses and returns a detail row", async () => {
    const list = await api("/v1/instructor/courses", {
      headers: cookieHeaders(instructor.cookie),
    });
    expect(list.status).toBe(200);
    const listBody = (await list.json()) as Page<CourseShape>;
    expect(listBody.items.length).toBeGreaterThan(0);

    const slug = listBody.items[0]!.id;
    const detail = await api(`/v1/instructor/courses/${slug}`, {
      headers: cookieHeaders(instructor.cookie),
    });
    expect(detail.status).toBe(200);
    const course = (await detail.json()) as CourseShape;
    expect(course.id).toBe(slug);
    expect(Array.isArray(course.modules)).toBe(true);
  });

  it("404s on an unknown instructor course", async () => {
    const res = await api("/v1/instructor/courses/nope", {
      headers: cookieHeaders(instructor.cookie),
    });
    expect(res.status).toBe(404);
  });

  it("lists submissions and returns a single submission", async () => {
    const list = await api("/v1/instructor/assignments", {
      headers: cookieHeaders(instructor.cookie),
    });
    expect(list.status).toBe(200);
    const listBody = (await list.json()) as Page<SubmissionShape>;
    expect(listBody.items.length).toBeGreaterThan(0);

    const id = listBody.items[0]!.id;
    const detail = await api(`/v1/instructor/assignments/${id}`, {
      headers: cookieHeaders(instructor.cookie),
    });
    expect(detail.status).toBe(200);
    const sub = (await detail.json()) as SubmissionShape;
    expect(sub.id).toBe(id);
    expect(sub).toHaveProperty("student");
    expect(typeof sub.late).toBe("boolean");
  });

  it("does not leak unknown submissions", async () => {
    const res = await api("/v1/instructor/assignments/sub-x", {
      headers: cookieHeaders(instructor.cookie),
    });
    expect(res.status).toBe(404);
  });
});

describe("hr suite", () => {
  it("rejects students", async () => {
    const res = await api("/v1/hr/employees", {
      headers: cookieHeaders(student.cookie),
    });
    expect(res.status).toBe(403);
  });

  it("returns employees for an hr officer", async () => {
    const res = await api("/v1/hr/employees", {
      headers: cookieHeaders(hr.cookie),
    });
    expect(res.status).toBe(200);
    const body = (await res.json()) as Page<EmployeeShape>;
    expect(body.items.length).toBeGreaterThan(0);
    expect(body.items[0]).toMatchObject({
      name: expect.any(String),
      role: expect.any(String),
      dept: expect.any(String),
      status: expect.any(String),
      joined: expect.any(String),
    });
  });

  it("returns leave requests", async () => {
    const res = await api("/v1/hr/leave-requests", {
      headers: cookieHeaders(hr.cookie),
    });
    expect(res.status).toBe(200);
    const body = (await res.json()) as Page<LeaveShape>;
    expect(body.items.length).toBeGreaterThan(0);
    expect(body.items[0]).toMatchObject({
      employee: expect.any(String),
      type: expect.any(String),
      from: expect.any(String),
      to: expect.any(String),
      status: expect.any(String),
    });
  });

  it("allows admins to read hr data", async () => {
    const res = await api("/v1/hr/employees", {
      headers: cookieHeaders(admin.cookie),
    });
    expect(res.status).toBe(200);
  });
});

describe("finance suite", () => {
  it("rejects students", async () => {
    const res = await api("/v1/invoices", {
      headers: cookieHeaders(student.cookie),
    });
    expect(res.status).toBe(403);
  });

  it("returns invoices for a finance officer", async () => {
    const res = await api("/v1/invoices", {
      headers: cookieHeaders(finance.cookie),
    });
    expect(res.status).toBe(200);
    const body = (await res.json()) as Page<InvoiceShape>;
    expect(body.items.length).toBeGreaterThan(0);
    expect(body.items[0]).toMatchObject({
      id: expect.any(String),
      party: expect.any(String),
      amount: expect.any(Number),
      due: expect.any(String),
      status: expect.any(String),
    });
  });

  it("returns expenses", async () => {
    const res = await api("/v1/expenses", {
      headers: cookieHeaders(finance.cookie),
    });
    expect(res.status).toBe(200);
    const body = (await res.json()) as Page<ExpenseShape>;
    expect(body.items.length).toBeGreaterThan(0);
    expect(body.items[0]).toMatchObject({
      category: expect.any(String),
      amount: expect.any(Number),
    });
  });
});

describe("admin suite", () => {
  it("rejects non-admins", async () => {
    const res = await api("/v1/admin/users", {
      headers: cookieHeaders(hr.cookie),
    });
    expect(res.status).toBe(403);
  });

  it("returns system users for an admin", async () => {
    const res = await api("/v1/admin/users", {
      headers: cookieHeaders(admin.cookie),
    });
    expect(res.status).toBe(200);
    const body = (await res.json()) as Page<AdminUserShape>;
    expect(body.items.length).toBeGreaterThan(0);
    expect(body.items[0]).toMatchObject({
      name: expect.any(String),
      email: expect.any(String),
      role: expect.any(String),
      status: expect.any(String),
      lastSeen: expect.any(String),
    });
  });

  it("returns the audit log", async () => {
    const res = await api("/v1/admin/audit-log", {
      headers: cookieHeaders(admin.cookie),
    });
    expect(res.status).toBe(200);
    const body = (await res.json()) as Page<AuditShape>;
    expect(body.items.length).toBeGreaterThan(0);
    expect(body.items[0]).toMatchObject({
      actor: expect.any(String),
      action: expect.any(String),
      time: expect.any(String),
      severity: expect.any(String),
    });
  });
});

describe("notifications", () => {
  it("requires auth", async () => {
    const res = await api("/v1/notifications");
    expect(res.status).toBe(401);
  });

  it("returns shared notifications for any authenticated user", async () => {
    const res = await api("/v1/notifications", {
      headers: cookieHeaders(student.cookie),
    });
    expect(res.status).toBe(200);
    const body = (await res.json()) as Page<NotificationShape>;
    expect(body.items.length).toBeGreaterThan(0);
    expect(body.items[0]).toMatchObject({
      title: expect.any(String),
      body: expect.any(String),
      engine: expect.any(String),
    });
  });

  it("paginates with a cursor", async () => {
    const res = await api("/v1/notifications?limit=1", {
      headers: cookieHeaders(student.cookie),
    });
    expect(res.status).toBe(200);
    const body = (await res.json()) as Page<NotificationShape>;
    expect(body.items).toHaveLength(1);
    expect(body.nextCursor).toBeTruthy();
  });
});
