import { beforeAll, describe, expect, it } from "vitest";
import { env } from "cloudflare:workers";
import { api, cookieHeaders, createTestSession, setupDb } from "./helpers";

type TestSession = Awaited<ReturnType<typeof createTestSession>>;

let student: TestSession;
let finance: TestSession;
let admin: TestSession;
let parent: TestSession;

const SEEDED_STUDENT_ID = "00000000-0000-4000-8000-000000000001";

beforeAll(async () => {
  await setupDb();
  student = await createTestSession("student@cea.ng");
  finance = await createTestSession("finance@cea.ng");
  admin = await createTestSession("admin@cea.ng");
  parent = await createTestSession("parent@cea.ng");
  await env.DB.prepare("UPDATE users SET email_verified_at = ? WHERE id = ?")
    .bind("2026-01-01T00:00:00.000Z", parent.session.user.id)
    .run();
  const invite = await api("/v1/invitations", {
    method: "POST",
    headers: { ...cookieHeaders(admin.cookie), "Content-Type": "application/json" },
    body: JSON.stringify({ studentId: SEEDED_STUDENT_ID, guardianUserId: parent.session.user.id }),
  });
  if (invite.status !== 201)
    throw new Error(`Unable to issue isolated parent fixture: ${invite.status}`);
  const { token } = (await invite.json()) as { token: string };
  const accepted = await api(`/v1/invitations/${token}/accept`, {
    method: "POST",
    headers: cookieHeaders(parent.cookie),
  });
  if (accepted.status !== 200)
    throw new Error(`Unable to verify isolated parent fixture: ${accepted.status}`);
});

describe("GET /v1/applications/admin (admissions review)", () => {
  it("403s non-admins", async () => {
    const res = await api("/v1/applications/admin", { headers: cookieHeaders(student.cookie) });
    expect(res.status).toBe(403);
  });

  it("lists all applications for an admin", async () => {
    const created = await api("/v1/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: "Admissions Reviewer",
        email: "reviewer@example.com",
        programSlug: "full-stack-software-development",
      }),
    });
    expect(created.status).toBe(201);
    const { application } = (await created.json()) as { application: { ref: string } };

    const res = await api("/v1/applications/admin", { headers: cookieHeaders(admin.cookie) });
    expect(res.status).toBe(200);
    const body = (await res.json()) as {
      items: Array<{ ref: string; fullName: string; status: string; programTitle: string }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(1);
    const row = body.items.find((i) => i.ref === application.ref);
    expect(row?.fullName).toBe("Admissions Reviewer");
    expect(row?.programTitle).toBe("Full-Stack Software Development");
  });

  it("filters by stage", async () => {
    const res = await api("/v1/applications/admin?stage=offer", {
      headers: cookieHeaders(admin.cookie),
    });
    expect(res.status).toBe(200);
    const body = (await res.json()) as { items: Array<{ status: string }>; total: number };
    expect(body.items.every((i) => i.status === "offer")).toBe(true);
  });
});

describe("GET /v1/applications/admin/stats (admissions funnel)", () => {
  it("returns stage counts for an admin", async () => {
    const res = await api("/v1/applications/admin/stats", {
      headers: cookieHeaders(admin.cookie),
    });
    expect(res.status).toBe(200);
    const body = (await res.json()) as {
      total: number;
      activeStages: number;
      stages: Array<{ key: string; value: number }>;
    };
    expect(body.total).toBeGreaterThanOrEqual(1);
    expect(body.stages.length).toBe(6);
    expect(body.stages[0]!.key).toBe("submitted");
    expect(body.stages.some((s) => s.value > 0)).toBe(true);
  });
});

describe("POST /v1/payroll/run (finance payroll batch)", () => {
  it("403s non-finance roles", async () => {
    const res = await api("/v1/payroll/run", {
      method: "POST",
      headers: cookieHeaders(student.cookie),
    });
    expect(res.status).toBe(403);
  });

  it("applies pending payroll changes and records a batch", async () => {
    await env.DB.prepare(
      `INSERT INTO payroll_changes (id, title, detail, status, sort_order) VALUES (?, ?, ?, 'draft', 0)`,
    )
      .bind("pc-tier2-test", "Tier 2 hire", "Junior engineer")
      .run();

    const res = await api("/v1/payroll/run", {
      method: "POST",
      headers: cookieHeaders(finance.cookie),
    });
    expect(res.status).toBe(200);
    const body = (await res.json()) as {
      ok: boolean;
      processed: number;
      batch: { batch: string } | null;
    };
    expect(body.ok).toBe(true);
    expect(body.processed).toBeGreaterThanOrEqual(1);
    expect(body.batch?.batch).toContain("Payroll");

    const row = await env.DB.prepare(`SELECT status FROM payroll_changes WHERE id = ?`)
      .bind("pc-tier2-test")
      .first<{ status: string }>();
    expect(row?.status).toBe("applied");

    const batches = await api("/v1/payments", { headers: cookieHeaders(finance.cookie) });
    const batchBody = (await batches.json()) as {
      items: Array<{ batch: string; status: string }>;
    };
    expect(batchBody.items.some((b) => b.status === "paid")).toBe(true);
  });
});

describe("GET /v1/parent/students (parent-scoped grade reads)", () => {
  it("403s non-parent roles", async () => {
    const res = await api("/v1/parent/students", { headers: cookieHeaders(student.cookie) });
    expect(res.status).toBe(403);
  });

  it("lists only the parent's linked children with derived progress", async () => {
    const res = await api("/v1/parent/students", { headers: cookieHeaders(parent.cookie) });
    expect(res.status).toBe(200);
    const body = (await res.json()) as {
      items: Array<{ studentId: string; name: string; gpa: string | null; course: string }>;
      total: number;
    };
    expect(body.total).toBe(1);
    const child = body.items[0]!;
    expect(child.studentId).toBe(SEEDED_STUDENT_ID);
    expect(child.name).toBe("Chiamaka Obi");
    expect(child.gpa).toBeNull();
    expect(child.course).toBe("Full-Stack Software Development");
  });

  it("returns gradebook detail for a linked student", async () => {
    const res = await api(`/v1/parent/students/${SEEDED_STUDENT_ID}`, {
      headers: cookieHeaders(parent.cookie),
    });
    expect(res.status).toBe(200);
    const body = (await res.json()) as {
      name: string;
      gradebook: Array<{ courseName: string; letter: string; pct: number }>;
      courses: Array<{ pct: number }>;
    };
    expect(body.name).toBe("Chiamaka Obi");
    expect(body.gradebook.length).toBeGreaterThan(0);
    expect(body.gradebook[0]!.letter).toBeTruthy();
    expect(body.courses.some((c) => c.pct > 0)).toBe(true);
  });

  it("blocks reading a student that is not linked", async () => {
    const other = await env.DB.prepare(
      `SELECT id FROM users WHERE email = 'instructor@cea.ng'`,
    ).first<{ id: string }>();
    expect(other?.id).toBeTruthy();

    const res = await api(`/v1/parent/students/${other!.id}`, {
      headers: cookieHeaders(parent.cookie),
    });
    expect(res.status).toBe(403);
  });
});

describe("GET /v1/parent/students/:id/finance (billing ledger)", () => {
  it("blocks reading a student that is not linked", async () => {
    const other = await env.DB.prepare(
      `SELECT id FROM users WHERE email = 'instructor@cea.ng'`,
    ).first<{ id: string }>();
    const res = await api(`/v1/parent/students/${other!.id}/finance`, {
      headers: cookieHeaders(parent.cookie),
    });
    expect(res.status).toBe(403);
  });

  it("returns the linked student's invoices with totals", async () => {
    const res = await api(`/v1/parent/students/${SEEDED_STUDENT_ID}/finance`, {
      headers: cookieHeaders(parent.cookie),
    });
    expect(res.status).toBe(200);
    const body = (await res.json()) as {
      studentId: string;
      items: Array<{ id: string; party: string; amount: number; status: string }>;
      totals: { paid: number; outstanding: number; count: number };
    };
    expect(body.studentId).toBe(SEEDED_STUDENT_ID);
    expect(body.items.length).toBeGreaterThanOrEqual(1);
    expect(body.items[0]!.party).toBeTruthy();
    expect(body.totals.paid).toBeGreaterThan(0);
    expect(body.totals.outstanding).toBeGreaterThan(0);
    expect(body.totals.count).toBeGreaterThan(0);
  });
});

describe("parent billing record consistency", () => {
  it("excludes void and refunded records from outstanding totals", async () => {
    await env.DB.prepare(
      "INSERT INTO invoices (id, user_id, party, amount, due, status) VALUES (?, ?, 'Test', 500, '', ?)",
    )
      .bind("parent-void-test", SEEDED_STUDENT_ID, "void")
      .run();
    const overview = await api("/v1/parent/students", { headers: cookieHeaders(parent.cookie) });
    const child = (
      (await overview.json()) as { items: { studentId: string; due: number; dueCount: number }[] }
    ).items.find((item) => item.studentId === SEEDED_STUDENT_ID)!;
    const financeRes = await api(`/v1/parent/students/${SEEDED_STUDENT_ID}/finance`, {
      headers: cookieHeaders(parent.cookie),
    });
    const financeBody = (await financeRes.json()) as {
      totals: { outstanding: number; count: number };
    };
    expect(financeBody.totals.outstanding).toBe(child.due);
    expect(financeBody.totals.count).toBe(child.dueCount);
  });
});

describe("GET /v1/parent/students/:id/attendance (records)", () => {
  it("blocks reading a student that is not linked", async () => {
    const other = await env.DB.prepare(
      `SELECT id FROM users WHERE email = 'instructor@cea.ng'`,
    ).first<{ id: string }>();
    const res = await api(`/v1/parent/students/${other!.id}/attendance`, {
      headers: cookieHeaders(parent.cookie),
    });
    expect(res.status).toBe(403);
  });

  it("returns attendance summary and records for a linked student", async () => {
    const res = await api(`/v1/parent/students/${SEEDED_STUDENT_ID}/attendance`, {
      headers: cookieHeaders(parent.cookie),
    });
    expect(res.status).toBe(200);
    const body = (await res.json()) as {
      pct: number;
      counts: { present: number; late: number; excused: number; absent: number };
      total: number;
      items: Array<{ date: string; status: string }>;
    };
    expect(body.pct).toBeGreaterThanOrEqual(0);
    expect(body.pct).toBeLessThanOrEqual(100);
    expect(body.total).toBeGreaterThanOrEqual(10);
    expect(body.counts.present).toBeGreaterThan(0);
    expect(body.items[0]!.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});

describe("POST /v1/mentor/match (rule-based matchmaking)", () => {
  it("403s roles outside the learner set", async () => {
    const res = await api("/v1/mentor/match", {
      method: "POST",
      headers: cookieHeaders(parent.cookie),
    });
    expect(res.status).toBe(403);
  });

  it("does not expose unreviewed mentor profiles or scores to a learner", async () => {
    const browse = await api("/v1/mentor/profiles", { headers: cookieHeaders(student.cookie) });
    expect(browse.status).toBe(200);
    expect(await browse.json()).toMatchObject({ items: [] });
    const match = await api("/v1/mentor/match", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cookieHeaders(student.cookie) },
      body: JSON.stringify({ goal: "backend" }),
    });
    expect(match.status).toBe(200);
    expect(await match.json()).toMatchObject({ matches: [] });
  });
});
