import { env } from "cloudflare:workers";
import { beforeAll, describe, expect, it } from "vitest";
import { api, cookieHeaders, createTestSession, setupDb } from "./helpers";

type Session = Awaited<ReturnType<typeof createTestSession>>;
let first: Session;
let second: Session;
let admin: Session;
let intern: Session;
let parent: Session;
let instructor: Session;

beforeAll(async () => {
  await setupDb();
  for (const id of ["isolation-student-one", "isolation-student-two"]) {
    await env.DB.prepare(
      "INSERT INTO users (id, name, email, role_key) VALUES (?, ?, ?, 'student')",
    )
      .bind(id, id, `${id}@example.test`)
      .run();
  }
  first = await createTestSession("isolation-student-one@example.test");
  second = await createTestSession("isolation-student-two@example.test");
  admin = await createTestSession("admin@cea.ng");
  intern = await createTestSession("intern@cea.ng");
  parent = await createTestSession("parent@cea.ng");
  instructor = await createTestSession("instructor@cea.ng");
});

async function list(path: string, session: Session) {
  const response = await api(path, { headers: cookieHeaders(session.cookie) });
  return {
    response,
    body: (await response.json()) as {
      items: Array<{ id: string }>;
      total: number;
      nextCursor?: string;
      error?: { code: string };
    },
  };
}

describe("student ownership", () => {
  it("does not show shared legacy records to learners with no attendance", async () => {
    const { response, body } = await list("/v1/student-self-dashboard/records", second);
    expect(response.status).toBe(200);
    expect(body.items).toEqual([]);
    expect(body.total).toBe(0);
  });

  it("isolates projects, counts and cursor pages including from null-owner rows", async () => {
    for (const [id, owner] of [
      ["iso-project-a", "isolation-student-one"],
      ["iso-project-b", "isolation-student-one"],
      ["iso-project-other", "isolation-student-two"],
      ["iso-project-unowned", null],
    ] as const) {
      await env.DB.prepare("INSERT INTO stu_projects (id, name, user_id) VALUES (?, ?, ?)")
        .bind(id, id, owner)
        .run();
    }
    const page = await list("/v1/student-self-dashboard/projects?limit=1", first);
    expect(page.response.status).toBe(200);
    expect(page.body.total).toBe(2);
    expect(page.body.items.map((x) => x.id)).toEqual(["iso-project-a"]);
    const next = await list(
      `/v1/student-self-dashboard/projects?limit=1&cursor=${page.body.nextCursor}`,
      first,
    );
    expect(next.body.items.map((x) => x.id)).toEqual(["iso-project-b"]);
    const other = await list("/v1/student-self-dashboard/projects", second);
    expect(other.body.items.map((x) => x.id)).toEqual(["iso-project-other"]);
    const all = await list("/v1/student-self-dashboard/projects?limit=50", admin);
    expect(all.body.items.map((x) => x.id)).toContain("iso-project-unowned");
  });

  it("isolates QR check-ins and paginates stably by date and id", async () => {
    for (const [id, owner, date] of [
      ["check-a", "isolation-student-one", "2026-01-02"],
      ["check-b", "isolation-student-one", "2026-01-02"],
      ["check-c", "isolation-student-one", "2026-01-01"],
      ["check-other", "isolation-student-two", "2026-01-03"],
    ]) {
      await env.DB.prepare(
        "INSERT INTO attendance (id, user_id, date, status, note) VALUES (?, ?, ?, 'present', 'QR check-in · Test')",
      )
        .bind(id, owner, date)
        .run();
    }
    const p1 = await list("/v1/student-self-dashboard/records?limit=2", first);
    expect(p1.body.total).toBe(3);
    expect(p1.body.items.map((x) => x.id)).toEqual(["check-b", "check-a"]);
    const p2 = await list(
      `/v1/student-self-dashboard/records?limit=2&cursor=${p1.body.nextCursor}`,
      first,
    );
    expect(p2.body.items.map((x) => x.id)).toEqual(["check-c"]);
    expect(p2.body.nextCursor).toBeUndefined();
    const other = await list("/v1/student-self-dashboard/records", second);
    expect(other.body.items.map((x) => x.id)).toEqual(["check-other"]);
    const bad = await list("/v1/student-self-dashboard/records?cursor=bad", first);
    expect(bad.response.status).toBe(400);
  });

  it.each(["attendance", "policy", "portfolio", "skills", "cv", "reportKpis", "templates"])(
    "blocks unowned %s while retaining admin access",
    async (collection) => {
      const path = `/v1/student-self-dashboard/${collection}`;
      const denied = await list(path, first);
      expect(denied.response.status).toBe(503);
      expect(denied.body.error?.code).toBe("STUDENT_DATA_UNAVAILABLE");
      expect((await list(path, admin)).response.status).toBe(200);
    },
  );
});

describe("unmapped legacy role collections", () => {
  it.each([
    "tasks",
    "timesheets",
    "mentor-sessions",
    "milestones",
    "skills",
    "resources",
    "evaluations",
    "projects",
    "conversations",
    "conversations/itc-01",
  ])("fails closed for interns on %s", async (path) => {
    const result = await list(`/v1/intern-dashboard/${path}`, intern);
    expect(result.response.status).toBe(503);
    expect(result.body.error?.code).toBe("INTERN_DATA_UNAVAILABLE");
    expect((await list(`/v1/intern-dashboard/${path}`, admin)).response.status).toBe(200);
  });
  it.each(["contacts", "meetings"])("blocks parent %s", async (path) => {
    const result = await list(`/v1/parent-extras-dashboard/${path}`, parent);
    expect(result.response.status).toBe(503);
    expect(result.body.error?.code).toBe("PARENT_DATA_UNAVAILABLE");
    expect((await list(`/v1/parent-extras-dashboard/${path}`, admin)).response.status).toBe(200);
  });
  it.each(["overview", "classes", "announcements", "queue", "revisions"])(
    "blocks instructor %s",
    async (path) => {
      const result = await list(`/v1/instructor-extras-dashboard/${path}`, instructor);
      expect(result.response.status).toBe(503);
      expect(result.body.error?.code).toBe("INSTRUCTOR_DATA_UNAVAILABLE");
      expect((await list(`/v1/instructor-extras-dashboard/${path}`, admin)).response.status).toBe(
        200,
      );
    },
  );
});
