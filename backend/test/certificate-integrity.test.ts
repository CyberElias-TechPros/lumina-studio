import { env } from "cloudflare:workers";
import { beforeAll, describe, expect, it } from "vitest";
import { api, cookieHeaders, createTestSession, setupDb } from "./helpers";

let admin: string;
let instructor: string;
let student: string;

beforeAll(async () => {
  await setupDb();
  admin = (await createTestSession("admin@cea.ng")).cookie;
  instructor = (await createTestSession("instructor@cea.ng")).cookie;
  student = (await createTestSession("student@cea.ng")).cookie;
});

describe("certificate integrity and directory access", () => {
  it.each(["admin", "instructor"])(
    "blocks arbitrary new certificates for %s without writes",
    async (role) => {
      const before = await env.DB.prepare("SELECT COUNT(*) AS n FROM certificates").first<{
        n: number;
      }>();
      const response = await api("/v1/certificates", {
        method: "POST",
        headers: {
          ...cookieHeaders(role === "admin" ? admin : instructor),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: "00000000-0000-4000-8000-000000000001",
          courseSlug: "invented-course",
          title: "Unearned credential",
        }),
      });
      expect(response.status).toBe(role === "admin" ? 400 : 403);
      expect(
        (await env.DB.prepare("SELECT COUNT(*) AS n FROM certificates").first<{ n: number }>())?.n,
      ).toBe(before?.n);
    },
  );
  it("does not expose the global user directory to instructors", async () => {
    const result = await api("/v1/certificates/candidates", { headers: cookieHeaders(instructor) });
    expect(result.status).toBe(503);
    expect(((await result.json()) as { error: { code: string } }).error.code).toBe(
      "CANDIDATES_UNAVAILABLE",
    );
    expect(
      (await api("/v1/certificates/candidates", { headers: cookieHeaders(admin) })).status,
    ).toBe(200);
    expect(
      (await api("/v1/certificates/candidates", { headers: cookieHeaders(student) })).status,
    ).toBe(403);
  });
  it("keeps existing registry lookup and owner access intact", async () => {
    await env.DB.prepare(
      "INSERT INTO certificates (id, user_id, course_slug, title, code, issued_at) VALUES (?, ?, ?, ?, ?, ?)",
    )
      .bind(
        "integrity-test-cert",
        "00000000-0000-4000-8000-000000000001",
        "existing-test-course",
        "Existing test record",
        "CEA-TEST0001-TEST0002",
        "2026-01-01T00:00:00.000Z",
      )
      .run();
    const verified = await api("/v1/certificates/verify?code=CEA-TEST0001-TEST0002");
    expect(((await verified.json()) as { valid: boolean }).valid).toBe(true);
    const mine = await api("/v1/certificates/mine", { headers: cookieHeaders(student) });
    expect(
      ((await mine.json()) as { items: { id: string }[] }).items.some(
        (x) => x.id === "integrity-test-cert",
      ),
    ).toBe(true);
    const notMine = await api("/v1/certificates/mine", { headers: cookieHeaders(instructor) });
    expect(
      ((await notMine.json()) as { items: { id: string }[] }).items.some(
        (x) => x.id === "integrity-test-cert",
      ),
    ).toBe(false);
  });
});

describe("push targeting", () => {
  it("prevents an instructor from targeting arbitrary users by direct request", async () => {
    const response = await api("/v1/push/send", {
      method: "POST",
      headers: { ...cookieHeaders(instructor), "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: "00000000-0000-4000-8000-000000000001",
        title: "Test",
        body: "Test",
      }),
    });
    expect(response.status).toBe(403);
  });
  it.each([
    ["instructor self", "instructor", undefined],
    ["admin target", "admin", "00000000-0000-4000-8000-000000000001"],
  ])("allows %s through the ownership check", async (_label, role, userId) => {
    const response = await api("/v1/push/send", {
      method: "POST",
      headers: {
        ...cookieHeaders(role === "admin" ? admin : instructor),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...(userId ? { userId } : {}), title: "Test", body: "Test" }),
    });
    expect(response.status).toBe(503); // VAPID is intentionally not configured in this test.
    expect(((await response.json()) as { error: { code: string } }).error.code).toBe(
      "PUSH_UNAVAILABLE",
    );
  });
});
