import { beforeAll, describe, expect, it } from "vitest";
import { api, authHeaders, createTestSession, setupDb } from "./helpers";

beforeAll(async () => {
  await setupDb();
});

describe("GET /v1/auth/magic-link", () => {
  it("rejects invalid emails with FIELD_VALIDATION fieldErrors", async () => {
    const res = await api("/v1/auth/magic-link", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "not-an-email" }),
    });
    expect(res.status).toBe(400);
    const body = (await res.json()) as { error: { code: string; fieldErrors: Record<string, string[]> } };
    expect(body.error.code).toBe("FIELD_VALIDATION");
    expect(body.error.fieldErrors.email).toBeDefined();
  });

  it("issues a link and returns ok + devToken outside production", async () => {
    const res = await api("/v1/auth/magic-link", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: " Ada@CeA.ng " }),
    });
    expect(res.status).toBe(201);
    const body = (await res.json()) as { ok: boolean; devToken: string };
    expect(body.ok).toBe(true);
    expect(body.devToken).toMatch(/^[0-9a-f]{64}$/);
  });
});

describe("GET /v1/auth/magic-link/verify", () => {
  it("creates a user and returns a session + token", async () => {
    const { token, session } = await createTestSession("new.student@cea.ng");
    expect(token).toMatch(/^[0-9a-f]{64}$/);
    expect(session.user.email).toBe("new.student@cea.ng");
    expect(session.user.name).toBe("New Student");
    expect(session.user.roleKey).toBe("student");
    expect(session.user.permissions).toContain("lms:read");
    expect(session.expiresAt).toBeDefined();
  });

  it("is single-use", async () => {
    const magic = await api("/v1/auth/magic-link", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "single.use@cea.ng" }),
    });
    const { devToken } = (await magic.json()) as { devToken: string };
    await api(`/v1/auth/magic-link/verify?token=${devToken}`);
    const second = await api(`/v1/auth/magic-link/verify?token=${devToken}`);
    expect(second.status).toBe(400);
    const body = (await second.json()) as { error: { code: string } };
    expect(body.error.code).toBe("INVALID_MAGIC_TOKEN");
  });

  it("rejects a garbage token", async () => {
    const res = await api("/v1/auth/magic-link/verify?token=deadbeef");
    expect(res.status).toBe(400);
    const body = (await res.json()) as { error: { code: string } };
    expect(body.error.code).toBe("INVALID_MAGIC_TOKEN");
  });

  it("reuses the same user on second sign-in", async () => {
    const first = await createTestSession("repeat.user@cea.ng");
    const second = await createTestSession("repeat.user@cea.ng");
    expect(second.session.user.id).toBe(first.session.user.id);
  });
});

describe("GET /v1/auth/session", () => {
  it("returns the session for a valid token", async () => {
    const { token } = await createTestSession("session.check@cea.ng");
    const res = await api("/v1/auth/session", { headers: authHeaders(token) });
    expect(res.status).toBe(200);
    const body = (await res.json()) as { user: { email: string; permissions: string[] } };
    expect(body.user.email).toBe("session.check@cea.ng");
    expect(body.user.permissions).toContain("lms:enroll");
  });

  it("returns UNAUTHORIZED without a token", async () => {
    const res = await api("/v1/auth/session");
    expect(res.status).toBe(401);
    const body = (await res.json()) as { error: { code: string } };
    expect(body.error.code).toBe("UNAUTHORIZED");
  });

  it("returns UNAUTHORIZED for a garbage token", async () => {
    const res = await api("/v1/auth/session", { headers: authHeaders("deadbeef") });
    expect(res.status).toBe(401);
  });
});

describe("POST /v1/auth/refresh", () => {
  it("extends the session and returns it", async () => {
    const { token, session } = await createTestSession("refresh.me@cea.ng");
    const res = await api("/v1/auth/refresh", { method: "POST", headers: authHeaders(token) });
    expect(res.status).toBe(200);
    const body = (await res.json()) as { expiresAt: string };
    expect(new Date(body.expiresAt).getTime()).toBeGreaterThan(new Date(session.expiresAt).getTime());
  });
});

describe("POST /v1/auth/sign-out", () => {
  it("revokes the session", async () => {
    const { token } = await createTestSession("sign.out@cea.ng");
    const out = await api("/v1/auth/sign-out", { method: "POST", headers: authHeaders(token) });
    expect(out.status).toBe(200);
    expect((await out.json()) as { ok: boolean }).toEqual({ ok: true });

    const after = await api("/v1/auth/session", { headers: authHeaders(token) });
    expect(after.status).toBe(401);
  });
});

describe("password endpoints", () => {
  it("sign-in returns 501 PASSWORD_NOT_ENABLED", async () => {
    const res = await api("/v1/auth/sign-in", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "a@b.ng", password: "password123" }),
    });
    expect(res.status).toBe(501);
    const body = (await res.json()) as { error: { code: string } };
    expect(body.error.code).toBe("PASSWORD_NOT_ENABLED");
  });

  it("sign-up validates input before declining", async () => {
    const res = await api("/v1/auth/sign-up", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "bad", password: "x", name: "x" }),
    });
    expect(res.status).toBe(400);
    expect(((await res.json()) as { error: { code: string } }).error.code).toBe("FIELD_VALIDATION");
  });
});
