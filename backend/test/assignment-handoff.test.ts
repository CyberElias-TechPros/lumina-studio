import { beforeAll, describe, expect, it } from "vitest";
import { env } from "cloudflare:workers";
import { api, authHeaders, createTestSession, setupDb } from "./helpers";
import migration from "../migrations/0069_submission_text.sql?raw";

type TestSession = Awaited<ReturnType<typeof createTestSession>>;
let student: TestSession;
let teacher: TestSession;
let other: TestSession;
beforeAll(async () => {
  await setupDb();
  student = await createTestSession("student@cea.ng");
  teacher = await createTestSession("instructor@cea.ng");
  other = await createTestSession("other.assignment.student@cea.ng");
});

async function fixture() {
  const id = crypto.randomUUID();
  await env.DB.prepare(
    "INSERT INTO assignments (id,user_id,title,course,created_by,max) VALUES (?,?,'Written assignment','Full-Stack Software Development',?,20)",
  )
    .bind(id, student.session.user.id, teacher.session.user.id)
    .run();
  const submit = (body: string) =>
    api(`/v1/assignments/${id}/submit`, {
      method: "POST",
      headers: authHeaders(student.cookie),
      body: JSON.stringify({ body }),
    });
  const grade = (submission: string, score: number) =>
    api(`/v1/instructor/submissions/${submission}`, {
      method: "PATCH",
      headers: authHeaders(teacher.cookie),
      body: JSON.stringify({ score, feedback: "Clear reasoning. Add an example." }),
    });
  return { student, teacher, other, id, submit, grade };
}

describe("written assignment handoff", () => {
  it("delivers the exact answer to its instructor and returns real feedback to its student", async () => {
    const f = await fixture();
    const submitted = await f.submit("My written answer <script>not executable</script>");
    expect(submitted.status).toBe(201);
    const { id } = (await submitted.json()) as { id: string };
    const detail = await api(`/v1/instructor/assignments/${id}`, {
      headers: authHeaders(f.teacher.cookie),
    });
    expect(detail.status).toBe(200);
    expect(await detail.json()).toMatchObject({
      body: "My written answer <script>not executable</script>",
      max: 20,
      isLatest: true,
      feedback: "",
    });
    const stranger = await api(`/v1/assignments/${f.id}/submission`, {
      headers: authHeaders(f.other.cookie),
    });
    expect(stranger.status).toBe(404);
    expect((await f.grade(id, 21)).status).toBe(400);
    expect((await f.grade(id, 17)).status).toBe(200);
    const received = await api(`/v1/assignments/${f.id}/submission`, {
      headers: authHeaders(f.student.cookie),
    });
    expect(await received.json()).toMatchObject({
      id,
      score: 17,
      status: "graded",
      feedback: "Clear reasoning. Add an example.",
      body: "My written answer <script>not executable</script>",
    });
    expect((await f.submit("An answer after grading")).status).toBe(409);
  });

  it("orders attempts deterministically and rejects grading superseded work", async () => {
    const f = await fixture();
    const first = (await (await f.submit("First answer")).json()) as { id: string };
    const second = (await (await f.submit("Revised answer")).json()) as { id: string };
    await env.DB.prepare(
      "UPDATE submissions SET submitted = '2026-10-22T12:00:00.000Z' WHERE assignment_id = ?",
    )
      .bind(f.id)
      .run();
    const current = await api(`/v1/assignments/${f.id}/submission`, {
      headers: authHeaders(f.student.cookie),
    });
    expect(await current.json()).toMatchObject({ id: second.id, body: "Revised answer" });
    expect((await f.grade(first.id, 20)).status).toBe(409);
    expect((await f.grade(second.id, 18)).status).toBe(200);
  });

  it("rejects blank answers without adding a queue entry", async () => {
    const f = await fixture();
    expect((await f.submit("   ")).status).toBe(400);
    expect(
      await env.DB.prepare("SELECT id FROM submissions WHERE assignment_id = ?").bind(f.id).first(),
    ).toBeNull();
  });

  it("rolls back the queue entry if updating assignment history fails", async () => {
    const f = await fixture();
    await env.DB.prepare(
      `CREATE TRIGGER fail_assignment_history BEFORE UPDATE ON assignments WHEN OLD.id = '${f.id}' BEGIN SELECT RAISE(ABORT, 'test rollback'); END`,
    ).run();
    try {
      expect((await f.submit("Must not become a partial submission")).status).toBe(500);
      expect(
        await env.DB.prepare("SELECT id FROM submissions WHERE assignment_id = ?")
          .bind(f.id)
          .first(),
      ).toBeNull();
    } finally {
      await env.DB.prepare("DROP TRIGGER fail_assignment_history").run();
    }
  });

  it("recovers only unambiguous legacy history text", async () => {
    const f = await fixture();
    const first = (await (await f.submit("Legacy answer")).json()) as { id: string };
    await env.DB.prepare("UPDATE submissions SET body = '' WHERE id = ?").bind(first.id).run();
    const backfill = "UPDATE submissions" + migration.split("UPDATE submissions")[1];
    await env.DB.prepare(backfill).run();
    expect(
      await env.DB.prepare("SELECT body FROM submissions WHERE id = ?").bind(first.id).first(),
    ).toMatchObject({ body: "Legacy answer" });
    await env.DB.prepare(
      "UPDATE assignments SET submissions = json_insert(submissions, '$[#]', json_extract(submissions, '$[0]')) WHERE id = ?",
    )
      .bind(f.id)
      .run();
    await env.DB.prepare("UPDATE submissions SET body = '' WHERE id = ?").bind(first.id).run();
    await env.DB.prepare(backfill).run();
    expect(
      await env.DB.prepare("SELECT body FROM submissions WHERE id = ?").bind(first.id).first(),
    ).toMatchObject({ body: "" });
  });
  it("does not let a teacher of another course inspect or grade the work", async () => {
    const f = await fixture();
    const attempt = (await (await f.submit("Only my instructor should read this")).json()) as {
      id: string;
    };
    const otherTeacher = await createTestSession("different.course.teacher@cea.ng");
    await env.DB.prepare("UPDATE users SET role_key = 'instructor' WHERE id = ?")
      .bind(otherTeacher.session.user.id)
      .run();
    const course = await env.DB.prepare(
      "SELECT slug,title FROM courses WHERE slug != 'full-stack' LIMIT 1",
    ).first<{ slug: string; title: string }>();
    expect(course).not.toBeNull();
    await env.DB.prepare(
      "INSERT OR IGNORE INTO enrollments (id,user_id,course_slug,pct) VALUES (?,?,?,0)",
    )
      .bind(crypto.randomUUID(), f.student.session.user.id, course!.slug)
      .run();
    await env.DB.prepare(
      "INSERT INTO instructor_courses (id,user_id,title,cohort,status,modules) VALUES (?,?,?,'','active','[]')",
    )
      .bind(crypto.randomUUID(), otherTeacher.session.user.id, course!.title)
      .run();
    expect(
      (
        await api(`/v1/instructor/assignments/${attempt.id}`, {
          headers: authHeaders(otherTeacher.cookie),
        })
      ).status,
    ).toBe(404);
    expect(
      (
        await api(`/v1/instructor/submissions/${attempt.id}`, {
          method: "PATCH",
          headers: authHeaders(otherTeacher.cookie),
          body: JSON.stringify({ score: 20 }),
        })
      ).status,
    ).toBe(403);
  });
});
