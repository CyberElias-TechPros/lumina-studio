import { beforeAll, describe, expect, it } from "vitest";
import { api, cookieHeaders, createTestSession, setupDb } from "./helpers";

beforeAll(async () => {
  await setupDb();
});

interface LessonShape {
  id: string;
  title: string;
  type: string;
  duration: string;
  status: string;
}

interface CourseShape {
  slug: string;
  title: string;
  subtitle: string;
  cohort: string;
  instructor: string;
  pct: number;
  tone: string;
  modules: Array<{ id: string; title: string; lessons: LessonShape[] }>;
}

function findLesson(course: CourseShape, lessonId: string): LessonShape | undefined {
  for (const mod of course.modules) {
    const lesson = mod.lessons.find((l) => l.id === lessonId);
    if (lesson) return lesson;
  }
  return undefined;
}

describe("GET /v1/courses", { timeout: 60_000 }, () => {
  it("returns 401 without a session", async () => {
    const res = await api("/v1/courses");
    expect(res.status).toBe(401);
    const body = (await res.json()) as { error: { code: string } };
    expect(body.error.code).toBe("UNAUTHORIZED");
  });

  it("returns seeded courses with the demo student's merged statuses", async () => {
    const { cookie } = await createTestSession("student@cea.ng");
    const res = await api("/v1/courses", { headers: cookieHeaders(cookie) });
    expect(res.status).toBe(200);
    const body = (await res.json()) as {
      items: CourseShape[];
      total: number;
      nextCursor?: string;
    };
    expect(body.total).toBe(3);
    expect(body.items.length).toBe(3);

    const full = body.items.find((c) => c.slug === "full-stack");
    expect(full).toBeDefined();
    expect(full!.title).toBe("Full-Stack Software Development");
    expect(full!.tone).toBe("bg-gradient-learning");
    expect(full!.pct).toBe(78);
    expect(full!.cohort).toBe("Cohort 15 · Week 12 of 38");
    expect(findLesson(full!, "l1")?.status).toBe("done");
    expect(findLesson(full!, "l8")?.status).toBe("in-progress");
    expect(findLesson(full!, "l9")?.status).toBe("preview");
    expect(findLesson(full!, "l10")?.status).toBe("locked");

    const cloud = body.items.find((c) => c.slug === "cloud-devops");
    expect(cloud?.pct).toBe(54);
    expect(findLesson(cloud!, "l4")?.status).toBe("in-progress");

    const uiux = body.items.find((c) => c.slug === "uiux-design");
    expect(uiux?.pct).toBe(31);
  });

  it("shows a fresh user locked lessons and previews only", async () => {
    const { cookie } = await createTestSession("fresh.student@cea.ng");
    const res = await api("/v1/courses", { headers: cookieHeaders(cookie) });
    expect(res.status).toBe(200);
    const body = (await res.json()) as { items: CourseShape[] };
    const full = body.items.find((c) => c.slug === "full-stack")!;
    expect(full.pct).toBe(0);
    expect(findLesson(full, "l1")?.status).toBe("locked");
    expect(findLesson(full, "l9")?.status).toBe("preview");
    expect(findLesson(full, "l10")?.status).toBe("locked");
  });

  it("walks the cursor page without duplicates or gaps", async () => {
    const { cookie } = await createTestSession("student@cea.ng");
    const seen: string[] = [];
    let cursor: string | undefined;
    let pages = 0;
    do {
      const url = cursor
        ? `/v1/courses?limit=1&cursor=${encodeURIComponent(cursor)}`
        : "/v1/courses?limit=1";
      const res = await api(url, { headers: cookieHeaders(cookie) });
      expect(res.status).toBe(200);
      const body = (await res.json()) as { items: Array<{ slug: string }>; nextCursor?: string };
      for (const item of body.items) {
        expect(seen).not.toContain(item.slug);
        seen.push(item.slug);
      }
      cursor = body.nextCursor;
      pages++;
      expect(pages).toBeLessThan(20);
    } while (cursor);
    expect(seen).toEqual(["cloud-devops", "full-stack", "uiux-design"]);
  });
});

describe("GET /v1/courses/:slug", { timeout: 60_000 }, () => {
  it("returns a full course with modules and lesson bodies", async () => {
    const { cookie } = await createTestSession("student@cea.ng");
    const res = await api("/v1/courses/full-stack", { headers: cookieHeaders(cookie) });
    expect(res.status).toBe(200);
    const body = (await res.json()) as CourseShape;
    expect(body.slug).toBe("full-stack");
    expect(body.modules.length).toBe(3);
    expect(body.modules[0]!.lessons.length).toBe(4);
    expect(body.modules[1]!.lessons.map((l) => l.title)).toContain("Build: REST API assignment");
  });

  it("returns 404 for unknown slugs", async () => {
    const { cookie } = await createTestSession("student@cea.ng");
    const res = await api("/v1/courses/not-a-course", { headers: cookieHeaders(cookie) });
    expect(res.status).toBe(404);
    const body = (await res.json()) as { error: { code: string } };
    expect(body.error.code).toBe("NOT_FOUND");
  });
});

describe("GET /v1/courses/gradebook", { timeout: 60_000 }, () => {
  it("returns 401 without a session", async () => {
    const res = await api("/v1/courses/gradebook");
    expect(res.status).toBe(401);
  });

  it("returns the demo student's gradebook as Paginated<GradebookCourse>", async () => {
    const { cookie } = await createTestSession("student@cea.ng");
    const res = await api("/v1/courses/gradebook", { headers: cookieHeaders(cookie) });
    expect(res.status).toBe(200);
    const body = (await res.json()) as {
      items: Array<{
        name: string;
        units: number;
        letter: string;
        pct: number;
        trend: string;
        items: Array<{ name: string; kind: string; weight: number; score: number; max: number }>;
      }>;
      total: number;
    };
    expect(body.total).toBe(4);
    const backend = body.items.find((g) => g.name === "Backend & APIs");
    expect(backend).toBeDefined();
    expect(backend!.units).toBe(3);
    expect(backend!.letter).toBe("A");
    expect(backend!.pct).toBe(92);
    expect(backend!.trend).toBe("+");
    expect(backend!.items.length).toBe(5);
    expect(backend!.items[0]!.kind).toBe("quiz");
    expect(backend!.items.every((i) => i.weight > 0 && i.max > 0)).toBe(true);
  });

  it("returns 403 for non-students", async () => {
    const { cookie } = await createTestSession("instructor@cea.ng");
    const res = await api("/v1/courses/gradebook", { headers: cookieHeaders(cookie) });
    expect(res.status).toBe(403);
    const body = (await res.json()) as { error: { code: string } };
    expect(body.error.code).toBe("FORBIDDEN");
  });
});
