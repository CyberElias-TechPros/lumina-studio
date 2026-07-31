import { beforeAll, describe, expect, it } from "vitest";
import { env } from "cloudflare:workers";
import { api, cookieHeaders, createTestSession, setupDb } from "./helpers";

beforeAll(async () => {
  await setupDb();
});

const VALID = {
  fullName: "Ada Obi",
  email: "ada.obi@example.com",
  phone: "+2348000000000",
  city: "Port Harcourt",
  programSlug: "full-stack-software-development",
  experience: "Self-taught, two side projects.",
};

describe("POST /v1/applications", () => {
  it("creates an application with a CEA reference", async () => {
    const res = await api("/v1/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(VALID),
    });
    expect(res.status).toBe(201);
    const body = (await res.json()) as {
      application: { id: string; ref: string; status: string };
    };
    expect(body.application.status).toBe("submitted");
    expect(body.application.ref).toMatch(/^CEA-\d{4}-[A-Z0-9]{6}$/);
  });

  it("normalizes the email", async () => {
    const res = await api("/v1/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...VALID, email: "  Mixed.Case@Example.com  " }),
    });
    expect(res.status).toBe(201);
  });

  it("rejects invalid input with FIELD_VALIDATION", async () => {
    const res = await api("/v1/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...VALID, email: "nope", fullName: "x" }),
    });
    expect(res.status).toBe(400);
    const body = (await res.json()) as {
      error: { code: string; fieldErrors: Record<string, string[]> };
    };
    expect(body.error.code).toBe("FIELD_VALIDATION");
    expect(body.error.fieldErrors.email).toBeDefined();
    expect(body.error.fieldErrors.fullName).toBeDefined();
  });

  it("rejects unknown programs with PROGRAM_NOT_FOUND", async () => {
    const res = await api("/v1/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...VALID, programSlug: "fake-program" }),
    });
    expect(res.status).toBe(400);
    const body = (await res.json()) as {
      error: { code: string; fieldErrors: Record<string, string[]> };
    };
    expect(body.error.code).toBe("PROGRAM_NOT_FOUND");
    expect(body.error.fieldErrors.programSlug).toBeDefined();
  });
});

describe("GET /v1/applications/:ref (public status lookup)", () => {
  it("returns status + stage timeline", async () => {
    const created = await api("/v1/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...VALID, email: "lookup@example.com" }),
    });
    const { application } = (await created.json()) as {
      application: { ref: string };
    };

    const res = await api(`/v1/applications/${application.ref}`);
    expect(res.status).toBe(200);
    const body = (await res.json()) as {
      ref: string;
      status: string;
      programTitle: string;
      stages: Array<{ key: string; done: boolean; active: boolean }>;
      updatedAt: string;
    };
    expect(body.ref).toBe(application.ref);
    expect(body.status).toBe("submitted");
    expect(body.programTitle).toBe("Full-Stack Software Development");
    expect(body.stages[0]!.active).toBe(true);
    expect(body.stages.every((s) => !s.done)).toBe(true);
    expect(body.updatedAt).toBeDefined();
  });

  it("reflects progressed stages after a status update", async () => {
    const created = await api("/v1/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...VALID, email: "progress@example.com" }),
    });
    const { application } = (await created.json()) as { application: { ref: string } };

    await env.DB.prepare(`UPDATE applications SET status = 'interview', updated_at = ? WHERE ref = ?`)
      .bind(new Date().toISOString(), application.ref)
      .run();

    const res = await api(`/v1/applications/${application.ref}`);
    const body = (await res.json()) as { status: string; stages: Array<{ key: string; done: boolean; active: boolean }> };
    expect(body.status).toBe("interview");
    const byKey = Object.fromEntries(body.stages.map((s) => [s.key, s]));
    expect(byKey["submitted"]!.done).toBe(true);
    expect(byKey["screening"]!.done).toBe(true);
    expect(byKey["assessment"]!.done).toBe(true);
    expect(byKey["interview"]!.active).toBe(true);
    expect(byKey["offer"]!.done).toBe(false);
  });

  it("returns NOT_FOUND for unknown references", async () => {
    const res = await api("/v1/applications/CEA-2999-NOPE99");
    expect(res.status).toBe(404);
    const body = (await res.json()) as { error: { code: string } };
    expect(body.error.code).toBe("NOT_FOUND");
  });
});

describe("GET /v1/applications (own list)", () => {
  it("requires authentication", async () => {
    const res = await api("/v1/applications");
    expect(res.status).toBe(401);
  });

  it("returns applications for the signed-in email", async () => {
    const email = "owner.list@example.com";
    await api("/v1/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...VALID, email }),
    });
    const { cookie } = await createTestSession(email);

    const res = await api("/v1/applications", { headers: cookieHeaders(cookie) });
    expect(res.status).toBe(200);
    const body = (await res.json()) as {
      items: Array<{ id: string; ref: string; status: string }>;
      total: number;
    };
    expect(body.total).toBe(1);
    expect(body.items[0]!.status).toBe("submitted");
  });

  it("does not leak other users' applications", async () => {
    const { cookie } = await createTestSession("someone.else@example.com");
    const res = await api("/v1/applications", { headers: cookieHeaders(cookie) });
    const body = (await res.json()) as { items: unknown[]; total: number };
    expect(body.total).toBe(0);
    expect(body.items).toEqual([]);
  });
});
