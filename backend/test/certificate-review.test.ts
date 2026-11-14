import { env } from "cloudflare:workers";
import { beforeAll, describe, expect, it } from "vitest";
import { api, authHeaders, createTestSession, setupDb } from "./helpers";

type Session = Awaited<ReturnType<typeof createTestSession>>;
let admin: Session, student: Session, other: Session, teacher: Session;
const course = "reviewed-certificate-course";
const secondCourse = "reviewed-certificate-second";
beforeAll(async () => {
  await setupDb();
  admin = await createTestSession("admin@cea.ng");
  student = await createTestSession("certificate-student@cea.test");
  other = await createTestSession("certificate-other@cea.test");
  teacher = await createTestSession("instructor@cea.ng");
  await env.DB.batch([
    env.DB.prepare("INSERT INTO courses (slug,title) VALUES (?,?)").bind(course, "Reviewed course"),
    env.DB.prepare("INSERT INTO courses (slug,title) VALUES (?,?)").bind(
      secondCourse,
      "Another course",
    ),
    env.DB.prepare("INSERT INTO enrollments (id,user_id,course_slug) VALUES (?,?,?)").bind(
      "certificate-enroll-1",
      student.session.user.id,
      course,
    ),
    env.DB.prepare("INSERT INTO enrollments (id,user_id,course_slug) VALUES (?,?,?)").bind(
      "certificate-enroll-2",
      student.session.user.id,
      secondCourse,
    ),
  ]);
});
function issue(actor: Session, userId = student.session.user.id, courseSlug = course) {
  return api("/v1/certificates", {
    method: "POST",
    headers: authHeaders(actor.cookie),
    body: JSON.stringify({
      userId,
      courseSlug,
      evidenceRef: "internal-review-42",
      confirmed: true,
      title: "Caller cannot change title",
    }),
  });
}
let id = "",
  code = "";
describe("certificate review and revocation", () => {
  it("requires explicit administrative review and a currently enrolled active learner", async () => {
    expect((await issue(teacher)).status).toBe(403);
    expect((await issue(admin, other.session.user.id)).status).toBe(409);
    const missing = await api("/v1/certificates", {
      method: "POST",
      headers: authHeaders(admin.cookie),
      body: JSON.stringify({
        userId: student.session.user.id,
        courseSlug: course,
        evidenceRef: "review",
        confirmed: false,
      }),
    });
    expect(missing.status).toBe(400);
    await env.DB.prepare("UPDATE users SET status='suspended' WHERE id=?")
      .bind(student.session.user.id)
      .run();
    expect((await issue(admin)).status).toBe(409);
    await env.DB.prepare("UPDATE users SET status='active' WHERE id=?")
      .bind(student.session.user.id)
      .run();
  });
  it("issues once, records evidence privately and exposes only record data to the owner and verifier", async () => {
    const [a, b] = await Promise.all([issue(admin), issue(admin)]);
    expect([a.status, b.status].sort()).toEqual([201, 409]);
    const issued = (await (a.status === 201 ? a : b).json()) as {
      id: string;
      code: string;
      title: string;
    };
    id = issued.id;
    code = issued.code;
    expect(issued.title).toBe("Reviewed course");
    const review = await env.DB.prepare(
      "SELECT evidence_ref,issued_by FROM certificate_issuances WHERE certificate_id=?",
    )
      .bind(id)
      .first();
    expect(review).toMatchObject({
      evidence_ref: "internal-review-42",
      issued_by: admin.session.user.id,
    });
    const verified = await api(`/v1/certificates/verify?code=${code}`);
    const publicBody = (await verified.json()) as Record<string, unknown>;
    expect(publicBody).toMatchObject({
      valid: true,
      certificate: { title: "Reviewed course", code },
    });
    expect(JSON.stringify(publicBody)).not.toContain("internal-review-42");
    const mine = await api("/v1/certificates/mine", { headers: authHeaders(student.cookie) });
    expect(await mine.json()).toMatchObject({
      items: [expect.objectContaining({ id, status: "issued" })],
    });
    const adminRecords = await api(
      `/v1/certificates/admin/records?userId=${student.session.user.id}&courseSlug=${course}`,
      { headers: authHeaders(admin.cookie) },
    );
    expect(await adminRecords.json()).toMatchObject({
      items: [{ id, evidenceRef: "internal-review-42", issuedBy: admin.session.user.id }],
    });
    const theirs = await api("/v1/certificates/mine", { headers: authHeaders(other.cookie) });
    expect(JSON.stringify(await theirs.json())).not.toContain(id);
    expect(
      (
        await api(
          `/v1/certificates/admin/records?userId=${student.session.user.id}&courseSlug=${course}`,
          { headers: authHeaders(teacher.cookie) },
        )
      ).status,
    ).toBe(403);
  });
  it("revokes an issued record and permits a reviewed replacement without resurrecting the old code", async () => {
    const revoke = (actor: Session) =>
      api(`/v1/certificates/${id}/revoke`, {
        method: "POST",
        headers: authHeaders(actor.cookie),
        body: JSON.stringify({ reason: "Incorrect record", confirmed: true }),
      });
    expect((await revoke(teacher)).status).toBe(403);
    expect((await revoke(admin)).status).toBe(200);
    expect((await revoke(admin)).status).toBe(409);
    expect(await (await api(`/v1/certificates/verify?code=${code}`)).json()).toMatchObject({
      valid: false,
      message: "This certificate record has been revoked.",
    });
    expect(
      await (await api("/v1/certificates/mine", { headers: authHeaders(student.cookie) })).json(),
    ).toMatchObject({ items: [expect.objectContaining({ id, status: "revoked" })] });
    const portal = await api("/v1/portal/summary?portal=student", {
      headers: authHeaders(student.cookie),
    });
    const metrics = (await portal.json()) as { metrics: { key: string; value: number }[] };
    expect(metrics.metrics.find((metric) => metric.key === "certificates")?.value).toBe(0);
    const replacement = await issue(admin);
    expect(replacement.status).toBe(201);
    expect(((await replacement.json()) as { code: string }).code).not.toBe(code);
    const events = await env.DB.prepare(
      "SELECT action FROM certificate_events WHERE certificate_id=? ORDER BY action",
    )
      .bind(id)
      .all<{ action: string }>();
    expect(events.results.map((e) => e.action)).toEqual(["issued", "revoked"]);
  });
  it("can revoke legacy records and makes an audit failure roll back revocation", async () => {
    await env.DB.prepare(
      `INSERT INTO certificates (id,user_id,course_slug,title,code,issued_at) VALUES (?,?,?,?,?,?)`,
    )
      .bind(
        "legacy-review-test",
        other.session.user.id,
        course,
        "Legacy course",
        "CEA-LEGACY-REVIEW",
        "2026-01-01T00:00:00Z",
      )
      .run();
    const revoke = () =>
      api("/v1/certificates/legacy-review-test/revoke", {
        method: "POST",
        headers: authHeaders(admin.cookie),
        body: JSON.stringify({ reason: "Needs correction", confirmed: true }),
      });
    await env.DB.prepare(
      "CREATE TRIGGER certificate_revoke_fail BEFORE INSERT ON certificate_events BEGIN SELECT RAISE(ABORT, 'audit failed'); END",
    ).run();
    try {
      expect((await revoke()).status).toBe(500);
      expect(
        await env.DB.prepare(
          "SELECT certificate_id FROM certificate_revocations WHERE certificate_id='legacy-review-test'",
        ).first(),
      ).toBeNull();
      expect(
        await (await api("/v1/certificates/verify?code=CEA-LEGACY-REVIEW")).json(),
      ).toMatchObject({ valid: true });
    } finally {
      await env.DB.prepare("DROP TRIGGER certificate_revoke_fail").run();
    }
    expect((await revoke()).status).toBe(200);
    expect(
      await (await api("/v1/certificates/verify?code=CEA-LEGACY-REVIEW")).json(),
    ).toMatchObject({ valid: false, status: "revoked" });
  });
  it("rolls back issuance when the audit event cannot be recorded", async () => {
    await env.DB.prepare(
      "CREATE TRIGGER certificate_audit_fail BEFORE INSERT ON certificate_events BEGIN SELECT RAISE(ABORT, 'audit failed'); END",
    ).run();
    try {
      expect((await issue(admin, student.session.user.id, secondCourse)).status).toBe(500);
      expect(
        (
          await env.DB.prepare(
            "SELECT COUNT(*) AS n FROM certificates WHERE user_id=? AND course_slug=?",
          )
            .bind(student.session.user.id, secondCourse)
            .first<{ n: number }>()
        )?.n,
      ).toBe(0);
    } finally {
      await env.DB.prepare("DROP TRIGGER certificate_audit_fail").run();
    }
  });
});
