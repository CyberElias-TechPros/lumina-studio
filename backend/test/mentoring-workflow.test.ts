import { env } from "cloudflare:workers";
import { beforeAll, describe, expect, it } from "vitest";
import { api, authHeaders, createTestSession, setupDb } from "./helpers";
type Session = Awaited<ReturnType<typeof createTestSession>>;
let admin: Session, mentor: Session, student: Session, stranger: Session;
beforeAll(async () => {
  await setupDb();
  admin = await createTestSession("admin@cea.ng");
  mentor = await createTestSession("mentor@cea.ng");
  student = await createTestSession("student@cea.ng");
  stranger = await createTestSession("mentoring-stranger@cea.test");
});
const req = (path: string, actor: Session, method = "GET", body?: unknown) =>
  api(`/v1/mentor${path}`, {
    method,
    headers: authHeaders(actor.cookie),
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
const eligibility = (actor: Session, user: Session, active = true) =>
  req("/admin/eligibility", actor, "PUT", {
    userId: user.session.user.id,
    active,
    adultVerified: true,
    reviewRef: "adult-review-test",
    expiresAt: new Date(Date.now() + 90 * 86400000).toISOString(),
  });
const submit = () =>
  req("/profile", mentor, "PUT", {
    displayName: "Test Mentor",
    focus: "Web development",
    bio: "Helping learners develop web projects.",
    consent: true,
  });
const browse = () => req("/profiles", student);
const send = (profileId: string, actor = student) =>
  req("/requests", actor, "POST", { mentorId: profileId, goal: "Help with a web project" });
let profileId = "",
  revision = "",
  requestId = "";
describe("reviewed adult mentorship", () => {
  it("does not expose seeded records or accept unauthorized eligibility grants", async () => {
    expect(await (await browse()).json()).toMatchObject({ items: [] });
    expect((await eligibility(student, student)).status).toBe(403);
    const invalid = await req("/admin/eligibility", admin, "PUT", {
      userId: student.session.user.id,
      active: true,
      adultVerified: false,
      reviewRef: "review",
      expiresAt: new Date(Date.now() + 86400000).toISOString(),
    });
    expect(invalid.status).toBe(400);
    expect((await eligibility(admin, student)).status).toBe(200);
    expect((await eligibility(admin, mentor)).status).toBe(200);
  });
  it("requires affirmative consent and a reviewed current profile", async () => {
    const denied = await req("/profile", mentor, "PUT", {
      displayName: "Test Mentor",
      focus: "Web development",
      bio: "Helping learners develop web projects.",
      consent: false,
    });
    expect(denied.status).toBe(400);
    expect((await submit()).status).toBe(200);
    expect(await (await browse()).json()).toMatchObject({ items: [] });
    const details = (await (
      await req(`/admin/profile?userId=${encodeURIComponent(mentor.session.user.id)}`, admin)
    ).json()) as { profile: { id: string; revision: string } };
    profileId = details.profile.id;
    revision = details.profile.revision;
    expect((await send(profileId)).status).toBe(409);
    expect(
      (
        await req("/admin/profile/approve", student, "POST", {
          userId: mentor.session.user.id,
          revision,
          reviewRef: "identity-review",
          confirmed: true,
        })
      ).status,
    ).toBe(403);
    expect(
      (
        await req("/admin/profile/approve", admin, "POST", {
          userId: mentor.session.user.id,
          revision: "old-version",
          reviewRef: "identity-review",
          confirmed: true,
        })
      ).status,
    ).toBe(409);
    expect(
      (
        await req("/admin/profile/approve", admin, "POST", {
          userId: mentor.session.user.id,
          revision,
          reviewRef: "identity-review",
          confirmed: true,
        })
      ).status,
    ).toBe(200);
    const result = (await (await browse()).json()) as { items: Record<string, unknown>[] };
    expect(result.items).toEqual([
      {
        id: profileId,
        name: "Test Mentor",
        focus: "Web development",
        bio: "Helping learners develop web projects.",
      },
    ]);
    expect(JSON.stringify(result)).not.toContain("mentor@cea.ng");
  });
  it("scopes requests to eligible people and makes state transitions atomic", async () => {
    expect((await send(profileId, stranger)).status).toBe(409);
    const response = await send(profileId);
    expect(response.status).toBe(201);
    requestId = ((await response.json()) as { id: string }).id;
    expect((await send(profileId)).status).toBe(409);
    expect(
      (await req(`/requests/${requestId}/respond`, stranger, "POST", { decision: "accept" }))
        .status,
    ).toBe(403);
    const otherMentor = await createTestSession("mentoring-other-mentor@cea.test");
    await env.DB.prepare("UPDATE users SET role_key='mentor' WHERE id=?")
      .bind(otherMentor.session.user.id)
      .run();
    const refreshed = await createTestSession("mentoring-other-mentor@cea.test");
    expect(
      (await req(`/requests/${requestId}/respond`, refreshed, "POST", { decision: "accept" }))
        .status,
    ).toBe(409);
    expect(await (await req("/requests?direction=incoming", refreshed)).json()).toMatchObject({
      items: [],
    });
    expect(
      (await req(`/requests/${requestId}/respond`, mentor, "POST", { decision: "accept" })).status,
    ).toBe(200);
    expect(
      (await req(`/requests/${requestId}/respond`, mentor, "POST", { decision: "decline" })).status,
    ).toBe(409);
    expect(await (await req("/requests?direction=outgoing", student)).json()).toMatchObject({
      items: [{ id: requestId, status: "accepted" }],
    });
    expect((await req(`/requests/${requestId}/cancel`, student, "POST", {})).status).toBe(200);
  });
  it("withdraws consent immediately and prevents acceptance after eligibility expires or is revoked", async () => {
    const pending = await send(profileId);
    expect(pending.status).toBe(201);
    const pendingId = ((await pending.json()) as { id: string }).id;
    expect((await eligibility(admin, student, false)).status).toBe(200);
    expect(
      (await req(`/requests/${pendingId}/respond`, mentor, "POST", { decision: "accept" })).status,
    ).toBe(409);
    expect((await eligibility(admin, student)).status).toBe(200);
    expect((await req("/profile", mentor, "DELETE")).status).toBe(200);
    expect(await (await browse()).json()).toMatchObject({ items: [] });
    expect(
      (await req(`/requests/${pendingId}/respond`, mentor, "POST", { decision: "accept" })).status,
    ).toBe(409);
    expect((await req(`/requests/${pendingId}/cancel`, student, "POST", {})).status).toBe(200);
    expect((await submit()).status).toBe(200);
    expect(await (await browse()).json()).toMatchObject({ items: [] });
  });
  it("rolls back profile and audit if event recording fails", async () => {
    await env.DB.prepare(
      "CREATE TRIGGER mentoring_audit_fail BEFORE INSERT ON mentoring_profile_events BEGIN SELECT RAISE(ABORT,'audit failed'); END",
    ).run();
    const before = await env.DB.prepare("SELECT revision FROM mentoring_profiles WHERE id=?")
      .bind(profileId)
      .first();
    try {
      expect((await submit()).status).toBe(500);
      expect(
        await env.DB.prepare("SELECT revision FROM mentoring_profiles WHERE id=?")
          .bind(profileId)
          .first(),
      ).toEqual(before);
    } finally {
      await env.DB.prepare("DROP TRIGGER mentoring_audit_fail").run();
    }
  });
  it("requires fresh profile review after mentor eligibility changes and does not duplicate approval events", async () => {
    const current = (await (
      await req(`/admin/profile?userId=${mentor.session.user.id}`, admin)
    ).json()) as { profile: { revision: string } };
    const approve = () =>
      req("/admin/profile/approve", admin, "POST", {
        userId: mentor.session.user.id,
        revision: current.profile.revision,
        reviewRef: "review-again",
        confirmed: true,
      });
    const before = (await env.DB.prepare(
      "SELECT COUNT(*) AS n FROM mentoring_profile_events WHERE profile_id=? AND action='approved'",
    )
      .bind(profileId)
      .first<{ n: number }>())!.n;
    const [a, b] = await Promise.all([approve(), approve()]);
    expect([a.status, b.status].sort()).toEqual([200, 409]);
    expect(
      (await env.DB.prepare(
        "SELECT COUNT(*) AS n FROM mentoring_profile_events WHERE profile_id=? AND action='approved'",
      )
        .bind(profileId)
        .first<{ n: number }>())!.n,
    ).toBe(before + 1);
    expect((await eligibility(admin, mentor, false)).status).toBe(200);
    expect((await eligibility(admin, mentor)).status).toBe(200);
    expect(await (await browse()).json()).toMatchObject({ items: [] });
    expect(
      (await env.DB.prepare(
        "SELECT COUNT(*) AS n FROM mentoring_profile_events WHERE profile_id=? AND action='approval_reset'",
      )
        .bind(profileId)
        .first<{ n: number }>())!.n,
    ).toBe(1);
    expect((await approve()).status).toBe(200);
    expect(await (await req("/profiles?q=%25", student)).json()).toMatchObject({ items: [] });
  });
  it("rolls back request and notification when the request event cannot be recorded", async () => {
    const before = (await env.DB.prepare("SELECT COUNT(*) AS n FROM notifications WHERE user_id=?")
      .bind(mentor.session.user.id)
      .first<{ n: number }>())!.n;
    await env.DB.prepare(
      "CREATE TRIGGER mentoring_request_fail BEFORE INSERT ON mentoring_request_events BEGIN SELECT RAISE(ABORT,'audit failed'); END",
    ).run();
    try {
      expect((await send(profileId)).status).toBe(500);
      expect(
        (await env.DB.prepare(
          "SELECT COUNT(*) AS n FROM mentoring_requests WHERE mentor_id=? AND status='pending'",
        )
          .bind(mentor.session.user.id)
          .first<{ n: number }>())!.n,
      ).toBe(0);
      expect(
        (await env.DB.prepare("SELECT COUNT(*) AS n FROM notifications WHERE user_id=?")
          .bind(mentor.session.user.id)
          .first<{ n: number }>())!.n,
      ).toBe(before);
    } finally {
      await env.DB.prepare("DROP TRIGGER mentoring_request_fail").run();
    }
  });
  it("enforces a transactional per-learner hourly request cap", async () => {
    const now = new Date().toISOString();
    await env.DB.prepare(
      `WITH RECURSIVE n(i) AS (VALUES(1) UNION ALL SELECT i+1 FROM n WHERE i<10)
      INSERT INTO mentoring_requests (id,learner_id,mentor_id,profile_id,goal,status,created_at,updated_at,operation_id)
      SELECT 'rate-request-'||i,?,?,?,'test','cancelled',?,?,'rate-'||i FROM n`,
    )
      .bind(student.session.user.id, mentor.session.user.id, profileId, now, now)
      .run();
    expect((await send(profileId)).status).toBe(409);
  });
});
