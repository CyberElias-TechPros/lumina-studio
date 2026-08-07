import { beforeAll, describe, expect, it } from "vitest";
import { api, cookieHeaders, createTestSession, setupDb } from "./helpers";

type TestSession = Awaited<ReturnType<typeof createTestSession>>;

let staff: TestSession;
let student: TestSession;

beforeAll(async () => {
  await setupDb();
  staff = await createTestSession("admin@cea.ng");
  student = await createTestSession("student@cea.ng");
});

describe("GET /v1/student-self-dashboard (Student self suite)", () => {
  it("403s non-staff roles", async () => {
    const res = await api("/v1/student-self-dashboard/attendance", {
      headers: cookieHeaders(student.cookie),
    });
    expect(res.status).toBe(200);

    const mentor = await createTestSession("mentor@cea.ng");
    const denied = await api("/v1/student-self-dashboard/attendance", {
      headers: cookieHeaders(mentor.cookie),
    });
    expect(denied.status).toBe(403);
  });

  it.each([
    "/v1/student-self-dashboard/attendance",
    "/v1/student-self-dashboard/records",
    "/v1/student-self-dashboard/policy",
    "/v1/student-self-dashboard/portfolio",
    "/v1/student-self-dashboard/projects",
    "/v1/student-self-dashboard/skills",
    "/v1/student-self-dashboard/cv",
    "/v1/student-self-dashboard/reportKpis",
    "/v1/student-self-dashboard/templates",
  ])("lists %s for staff", async (path) => {
    const res = await api(path, { headers: cookieHeaders(staff.cookie) });
    expect(res.status).toBe(200);
    const body = (await res.json()) as { items: Array<Record<string, unknown>>; total: number };
    expect(body.total).toBeGreaterThanOrEqual(1);
    expect(body.items[0]?.id).toBeTruthy();
  });

  it("returns attendance KPIs with value labels", async () => {
    const res = await api("/v1/student-self-dashboard/attendance", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; metric: string; valueLabel: string; delta: string }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(4);
    expect(body.items[0]?.metric).toBe("Present");
    expect(body.items[0]?.valueLabel).toBe("61");
    expect(body.items[0]?.delta).toBe("of 65 sessions");
  });

  it("returns attendance records with courses and statuses", async () => {
    const res = await api("/v1/student-self-dashboard/records", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; dateLabel: string; course: string; status: string }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(5);
    expect(body.items[0]?.dateLabel).toBe("Mon, Jul 28");
    expect(body.items[0]?.course).toBe("Full-Stack Development");
    expect(body.items[0]?.status).toBe("Present");
  });

  it("returns attendance policy rules", async () => {
    const res = await api("/v1/student-self-dashboard/policy", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; rule: string; valueLabel: string }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(3);
    expect(body.items[0]?.rule).toBe("90% minimum per term");
    expect(body.items[0]?.valueLabel).toBe("You: 94%");
  });

  it("returns portfolio KPIs with value labels", async () => {
    const res = await api("/v1/student-self-dashboard/portfolio", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; metric: string; valueLabel: string; delta: string }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(4);
    expect(body.items[0]?.metric).toBe("Projects");
    expect(body.items[0]?.valueLabel).toBe("3");
    expect(body.items[0]?.delta).toBe("2 featured");
  });

  it("returns portfolio projects with featured flags", async () => {
    const res = await api("/v1/student-self-dashboard/projects", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; name: string; detail: string; tags: string; featured: number }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(3);
    expect(body.items[0]?.name).toContain("NaijaEats");
    expect(body.items[0]?.featured).toBe(1);
  });

  it("returns skills with proficiency percentages", async () => {
    const res = await api("/v1/student-self-dashboard/skills", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; name: string; pct: number }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(4);
    expect(body.items[0]?.name).toBe("JavaScript / TypeScript");
    expect(body.items[0]?.pct).toBe(92);
  });

  it("returns CV downloads", async () => {
    const res = await api("/v1/student-self-dashboard/cv", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; filename: string }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(2);
    expect(body.items[0]?.filename).toBe("CEA_Ada_Okafor_CV.pdf");
  });

  it("returns report KPIs with value labels", async () => {
    const res = await api("/v1/student-self-dashboard/reportKpis", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; metric: string; valueLabel: string; delta: string }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(4);
    expect(body.items[0]?.metric).toBe("Saved reports");
    expect(body.items[0]?.valueLabel).toBe("6");
    expect(body.items[0]?.delta).toBe("shared with 3 roles");
  });

  it("returns report templates with categories", async () => {
    const res = await api("/v1/student-self-dashboard/templates", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; name: string; category: string; usage: string }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(4);
    expect(body.items[0]?.name).toBe("Attendance summary — by cohort");
    expect(body.items[0]?.category).toBe("Academics");
    expect(body.items[0]?.usage).toBe("14 runs");
  });

  it("paginates with cursor", async () => {
    const first = await api("/v1/student-self-dashboard/projects?limit=2", {
      headers: cookieHeaders(staff.cookie),
    });
    const firstBody = (await first.json()) as {
      items: Array<{ id: string }>;
      nextCursor?: string;
    };
    expect(firstBody.items).toHaveLength(2);
    expect(firstBody.nextCursor).toBeTruthy();

    const second = await api(
      `/v1/student-self-dashboard/projects?limit=2&cursor=${firstBody.nextCursor ?? ""}`,
      { headers: cookieHeaders(staff.cookie) },
    );
    const secondBody = (await second.json()) as { items: Array<{ id: string }> };
    expect(secondBody.items[0]?.id).not.toBe(firstBody.items[0]?.id);
  });

  it("404s unknown collections", async () => {
    const res = await api("/v1/student-self-dashboard/bogus", {
      headers: cookieHeaders(staff.cookie),
    });
    expect(res.status).toBe(404);
  });
});
