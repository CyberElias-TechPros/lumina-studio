import { env } from "cloudflare:workers";
import { beforeAll, describe, expect, it } from "vitest";
import { api, createTestSession, setupDb } from "./helpers";

beforeAll(async () => {
  await setupDb();
  // Existing records stay readable; this fixture does not assert provenance.
  await env.DB.prepare(
    `INSERT INTO certificates (id, user_id, course_slug, title, code, issued_at)
    VALUES ('fixture-cert', '00000000-0000-4000-8000-000000000001', 'fixture-course', 'Fixture record', 'CEA-TEST0001-TEST0002', '2026-01-01T00:00:00Z')`,
  ).run();
});

describe("certificates (issue / verify / mine / candidates)", () => {
  it("blocks issuance to unauthenticated callers", async () => {
    const res = await api("/v1/certificates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{}",
    });
    expect(res.status).toBe(401);
  });
  it("blocks candidates listing for students", async () => {
    const { cookie } = await createTestSession("student@cea.ng");
    const res = await api("/v1/certificates/candidates", {
      headers: { Cookie: `cea_session=${cookie}` },
    });
    expect(res.status).toBe(403);
  });
  it("keeps the directory available to admins", async () => {
    const { cookie } = await createTestSession("admin@cea.ng");
    const res = await api("/v1/certificates/candidates", {
      headers: { Cookie: `cea_session=${cookie}` },
    });
    expect(res.status).toBe(200);
    expect(
      ((await res.json()) as { items: { email: string }[] }).items.some(
        (u) => u.email === "student@cea.ng",
      ),
    ).toBe(true);
  });
  it("looks up an existing registry entry", async () => {
    const res = await api("/v1/certificates/verify?code=CEA-TEST0001-TEST0002");
    expect(res.status).toBe(200);
    expect((await res.json()) as { valid: boolean; certificate: { title: string } }).toMatchObject({
      valid: true,
      certificate: { title: "Fixture record" },
    });
  });
  it("returns the owner's existing certificates on /mine", async () => {
    const { cookie } = await createTestSession("student@cea.ng");
    const res = await api("/v1/certificates/mine", {
      headers: { Cookie: `cea_session=${cookie}` },
    });
    expect(res.status).toBe(200);
    expect(
      ((await res.json()) as { items: { id: string }[] }).items.some(
        (c) => c.id === "fixture-cert",
      ),
    ).toBe(true);
  });
});
