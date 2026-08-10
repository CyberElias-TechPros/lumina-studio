import { beforeAll, describe, expect, it } from "vitest";
import { api, cookieHeaders, createTestSession, setupDb } from "./helpers";

type TestSession = Awaited<ReturnType<typeof createTestSession>>;

let admin: TestSession;
let instructor: TestSession;
let student: TestSession;

let inviteToken: string;

beforeAll(async () => {
  await setupDb();
  admin = await createTestSession("admin@cea.ng");
  instructor = await createTestSession("instructor@cea.ng");
  student = await createTestSession("student@cea.ng");
});

describe("POST /v1/invitations (create ??? parent invitation)", () => {
  it("403s non-staff roles", async () => {
    const res = await api("/v1/invitations", {
      method: "POST",
      headers: { ...cookieHeaders(student.cookie), "Content-Type": "application/json" },
      body: JSON.stringify({ studentId: "student", guardianName: "G" }),
    });
    expect(res.status).toBe(403);
  });

  it("401s unauthenticated requests", async () => {
    const res = await api("/v1/invitations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentId: "student", guardianName: "G" }),
    });
    expect(res.status).toBe(401);
  });

  it("creates an invitation for a student and returns a token + url", async () => {
    const res = await api("/v1/invitations", {
      method: "POST",
      headers: { ...cookieHeaders(admin.cookie), "Content-Type": "application/json" },
      body: JSON.stringify({
        studentId: "00000000-0000-4000-8000-000000000001",
        guardianName: "Chiamaka Okafor",
        note: "Primary guardian",
        expiresInDays: 30,
      }),
    });
    expect(res.status).toBe(201);
    const body = (await res.json()) as { ok: boolean; token: string; url: string; expiresAt: string };
    expect(body.ok).toBe(true);
    expect(body.token).toMatch(/^[0-9a-f]{48}$/);
    expect(body.url).toContain(`/app/parent/invitation/accept?token=${body.token}`);
    expect(body.expiresAt).toBeTruthy();
    inviteToken = body.token;
  });

  it("404s for unknown students", async () => {
    const res = await api("/v1/invitations", {
      method: "POST",
      headers: { ...cookieHeaders(admin.cookie), "Content-Type": "application/json" },
      body: JSON.stringify({ studentId: "no-such-user", guardianName: "G" }),
    });
    expect(res.status).toBe(404);
  });

  it("rejects staff users as invite targets", async () => {
    const res = await api("/v1/invitations", {
      method: "POST",
      headers: { ...cookieHeaders(admin.cookie), "Content-Type": "application/json" },
      body: JSON.stringify({ studentId: "00000000-0000-4000-8000-000000000002", guardianName: "G" }),
    });
    expect(res.status).toBe(400);
  });
});

describe("GET /v1/invitations/:token (public verify)", () => {
  it("returns pending invitation details without auth", async () => {
    const res = await api(`/v1/invitations/${inviteToken}`);
    expect(res.status).toBe(200);
    const body = (await res.json()) as {
      status: string;
      studentName: string;
      guardianName: string;
      note: string;
      expiresAt: string;
    };
    expect(body.status).toBe("pending");
    expect(body.studentName).toBeTruthy();
    expect(body.guardianName).toBe("Chiamaka Okafor");
    expect(body.note).toBe("Primary guardian");
    expect(body.expiresAt).toBeTruthy();
  });

  it("404s unknown tokens", async () => {
    const res = await api("/v1/invitations/deadbeefdeadbeef");
    expect(res.status).toBe(404);
  });
});

describe("POST /v1/invitations/:token/accept", () => {
  it("accepts and links the guardian to the student", async () => {
    const res = await api(`/v1/invitations/${inviteToken}/accept`, {
      method: "POST",
      headers: cookieHeaders(student.cookie),
    });
    expect(res.status).toBe(200);
    const body = (await res.json()) as {
      ok: boolean;
      studentId: string;
      roleUpdated: boolean;
      linked: boolean;
    };
    expect(body.ok).toBe(true);
    expect(body.studentId).toBe("00000000-0000-4000-8000-000000000001");
    expect(body.linked).toBe(true);
  });

  it("rejects re-accepting the same invitation", async () => {
    const res = await api(`/v1/invitations/${inviteToken}/accept`, {
      method: "POST",
      headers: cookieHeaders(student.cookie),
    });
    expect(res.status).toBe(409);
  });

  it("401s unauthenticated accept attempts", async () => {
    const res = await api(`/v1/invitations/${inviteToken}/accept`, { method: "POST" });
    expect(res.status).toBe(401);
  });

  it("lets the new parent list the linked student", async () => {
    const res = await api("/v1/parent/students", { headers: cookieHeaders(student.cookie) });
    expect(res.status).toBe(200);
    const body = (await res.json()) as { items: Array<{ studentId: string }> };
    expect(body.items.some((s) => s.studentId === "00000000-0000-4000-8000-000000000001")).toBe(true);
  });
});

describe("GET /v1/admin-systems-dashboard/metrics (monitoring)", () => {
  it("403s students", async () => {
    const res = await api("/v1/admin-systems-dashboard/metrics", {
      headers: cookieHeaders(student.cookie),
    });
    expect(res.status).toBe(403);
  });

  it("returns computed cards + service roster for staff", async () => {
    const res = await api("/v1/admin-systems-dashboard/metrics", {
      headers: cookieHeaders(admin.cookie),
    });
    expect(res.status).toBe(200);
    const body = (await res.json()) as {
      cards: Array<{ label: string; value: string; delta: string }>;
      services: Array<{ name: string; status: string }>;
      generatedAt: string;
    };
    expect(body.cards).toHaveLength(4);
    expect(body.cards[0]?.label).toBe("Services");
    expect(Number(body.cards[0]?.value)).toBe(body.services.length);
    expect(body.cards[2]?.label).toBe("Reported errors");
    expect(body.services.length).toBeGreaterThanOrEqual(5);
    expect(body.services[0]?.name).toBe("web");
    expect(body.services[0]?.status).toBe("Healthy");
    expect(body.generatedAt).toBeTruthy();
  });

  it("lists monitoring services for admin", async () => {
    const res = await api("/v1/admin-systems-dashboard/services", {
      headers: cookieHeaders(admin.cookie),
    });
    expect(res.status).toBe(200);
    const body = (await res.json()) as {
      items: Array<{ id: number; name: string; detail: string; status: string }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(5);
    expect(body.items[0]?.name).toBe("web");
    expect(body.items[0]?.status).toBe("Healthy");
  });
});

