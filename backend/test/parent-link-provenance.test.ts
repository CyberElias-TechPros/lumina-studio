import { env } from "cloudflare:workers";
import { beforeAll, describe, expect, it } from "vitest";
import { api, cookieHeaders, createTestSession, setupDb } from "./helpers";
import { invitationTokenKey } from "../src/lib/invitation-token";

const parentId = "verified-parent-link-test";
const studentId = "verified-student-link-test";
let admin: string;
let parent: string;
let other: string;
let token: string;
const headers = (cookie: string) => ({
  ...cookieHeaders(cookie),
  "Content-Type": "application/json",
});

beforeAll(async () => {
  await setupDb();
  for (const [id, role] of [
    [parentId, "parent"],
    [studentId, "student"],
    ["unrelated-parent-link-test", "parent"],
  ]) {
    await env.DB.prepare(
      "INSERT INTO users (id,name,email,role_key,email_verified_at) VALUES (?,?,?,?,?)",
    )
      .bind(id, id, `${id}@example.test`, role, "2026-01-01T00:00:00Z")
      .run();
  }
  admin = (await createTestSession("admin@cea.ng")).cookie;
  parent = (await createTestSession(`${parentId}@example.test`)).cookie;
  other = (await createTestSession("unrelated-parent-link-test@example.test")).cookie;
  await env.DB.prepare("INSERT INTO parent_students (parent_id,student_id) VALUES (?,?)")
    .bind(parentId, studentId)
    .run();
});

describe("guardian relationship provenance", () => {
  it("does not expose a legacy unverified relationship in any read or aggregate", async () => {
    const list = await api("/v1/parent/students", { headers: headers(parent) });
    expect(
      ((await list.json()) as { items: { studentId: string }[] }).items.map((s) => s.studentId),
    ).not.toContain(studentId);
    for (const suffix of ["", "/finance", "/attendance"]) {
      expect(
        (await api(`/v1/parent/students/${studentId}${suffix}`, { headers: headers(parent) }))
          .status,
      ).toBe(403);
    }
    const summary = await api("/v1/portal/summary?portal=parent", { headers: headers(parent) });
    const body = (await summary.json()) as { metrics: { key: string; value: number }[] };
    expect(body.metrics.find((metric) => metric.key === "children")?.value).toBe(0);
  });

  it("re-verifies an existing link only after a targeted invitation is accepted", async () => {
    const created = await api("/v1/invitations", {
      method: "POST",
      headers: headers(admin),
      body: JSON.stringify({ studentId, guardianUserId: parentId }),
    });
    expect(created.status).toBe(201);
    token = ((await created.json()) as { token: string }).token;
    expect(
      (await api(`/v1/invitations/${token}/accept`, { method: "POST", headers: headers(other) }))
        .status,
    ).toBe(403);
    const accepted = await api(`/v1/invitations/${token}/accept`, {
      method: "POST",
      headers: headers(parent),
    });
    expect(accepted.status).toBe(200);
    expect(await accepted.json()).toMatchObject({ linked: true });
    expect(
      (await api(`/v1/parent/students/${studentId}`, { headers: headers(parent) })).status,
    ).toBe(200);
    expect(
      (await api(`/v1/parent/students/${studentId}`, { headers: headers(other) })).status,
    ).toBe(403);
    const summary = await api("/v1/portal/summary?portal=parent", { headers: headers(parent) });
    expect(
      ((await summary.json()) as { metrics: { key: string; value: number }[] }).metrics.find(
        (m) => m.key === "children",
      )?.value,
    ).toBe(1);
  });

  it("stops access when the supporting invitation is revoked", async () => {
    await env.DB.prepare("UPDATE parent_invitations SET status = 'revoked' WHERE token = ?")
      .bind(await invitationTokenKey(token))
      .run();
    expect(
      (await api(`/v1/parent/students/${studentId}`, { headers: headers(parent) })).status,
    ).toBe(403);
  });

  it("rolls back re-verification of an existing link if its update fails", async () => {
    const created = await api("/v1/invitations", {
      method: "POST",
      headers: headers(admin),
      body: JSON.stringify({ studentId, guardianUserId: parentId }),
    });
    const newToken = ((await created.json()) as { token: string }).token;
    await env.DB.exec(
      "CREATE TRIGGER block_existing_guardian_link BEFORE UPDATE ON parent_students BEGIN SELECT RAISE(ABORT, 'test re-verification rollback'); END;",
    );
    try {
      expect(
        (
          await api(`/v1/invitations/${newToken}/accept`, {
            method: "POST",
            headers: headers(parent),
          })
        ).status,
      ).toBe(500);
      expect(
        (
          await env.DB.prepare("SELECT status FROM parent_invitations WHERE token = ?")
            .bind(await invitationTokenKey(newToken))
            .first<{ status: string }>()
        )?.status,
      ).toBe("pending");
      expect(
        (await api(`/v1/parent/students/${studentId}`, { headers: headers(parent) })).status,
      ).toBe(403);
    } finally {
      await env.DB.exec("DROP TRIGGER block_existing_guardian_link;");
    }
  });

  it.each(["suspended", "role changed"])(
    "refuses redemption when the learner is %s",
    async (condition) => {
      const created = await api("/v1/invitations", {
        method: "POST",
        headers: headers(admin),
        body: JSON.stringify({ studentId, guardianUserId: parentId }),
      });
      const newToken = ((await created.json()) as { token: string }).token;
      await env.DB.prepare(
        condition === "suspended"
          ? "UPDATE users SET status = 'suspended' WHERE id = ?"
          : "UPDATE users SET role_key = 'instructor' WHERE id = ?",
      )
        .bind(studentId)
        .run();
      try {
        expect(
          (
            await api(`/v1/invitations/${newToken}/accept`, {
              method: "POST",
              headers: headers(parent),
            })
          ).status,
        ).toBe(409);
        expect(
          (
            await env.DB.prepare("SELECT status FROM parent_invitations WHERE token = ?")
              .bind(await invitationTokenKey(newToken))
              .first<{ status: string }>()
          )?.status,
        ).toBe("pending");
      } finally {
        await env.DB.prepare(
          "UPDATE users SET status = 'active', role_key = 'student' WHERE id = ?",
        )
          .bind(studentId)
          .run();
      }
    },
  );
});
