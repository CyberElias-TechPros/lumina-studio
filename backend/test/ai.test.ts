import { beforeAll, describe, expect, it } from "vitest";
import { api, cookieHeaders, createTestSession, setupDb } from "./helpers";

type TestSession = Awaited<ReturnType<typeof createTestSession>>;

let student: TestSession;
let instructor: TestSession;

beforeAll(async () => {
  await setupDb();
  student = await createTestSession("student@cea.ng");
  instructor = await createTestSession("instructor@cea.ng");
});

describe("AI models catalog (free tier)", () => {
  it("returns only completely-free NVIDIA NIM models", async () => {
    const res = await api("/v1/ai/models", {
      headers: cookieHeaders(student.cookie),
    });
    expect(res.status).toBe(200);
    const body = (await res.json()) as {
      provider: string;
      tier: string;
      models: { id: string; label: string; cost: string }[];
      default: string;
      configured: string;
    };
    expect(body.provider).toBe("NVIDIA NIM");
    expect(body.tier).toBe("free");
    expect(body.models.length).toBeGreaterThan(0);
    expect(body.models.every((m) => m.cost === "free")).toBe(true);
    expect(body.default).toMatch(/^[a-z0-9-]+\/[a-z0-9.-]+$/i);
    expect(body.default).toBe(body.models[0]!.id);
  });

  it("requires a session", async () => {
    const res = await api("/v1/ai/models");
    expect(res.status).toBe(401);
  });
});

describe("AI grading", () => {
  it("grades a submission with a rubric breakdown (mock mode)", async () => {
    const res = await api("/v1/ai/grade", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cookieHeaders(instructor.cookie) },
      body: JSON.stringify({
        rubric: [
          { criterion: "Understanding", max: 10 },
          { criterion: "Structure", max: 5 },
        ],
      }),
    });
    expect(res.status).toBe(200);
    const body = (await res.json()) as {
      overall: number;
      max: number;
      breakdown: { criterion: string; score: number; max: number; comment: string }[];
      summary: string;
      mock: boolean;
    };
    expect(body.max).toBe(15);
    expect(body.overall).toBeGreaterThanOrEqual(1);
    expect(body.overall).toBeLessThanOrEqual(15);
    expect(body.breakdown).toHaveLength(2);
    expect(body.breakdown[0]).toMatchObject({ criterion: "Understanding", max: 10 });
    expect(body.mock).toBe(true);
  });

  it("forbids students from grading", async () => {
    const res = await api("/v1/ai/grade", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cookieHeaders(student.cookie) },
      body: JSON.stringify({}),
    });
    expect(res.status).toBe(403);
  });
});

describe("AI recommendations", () => {
  it("returns personalized recommendations for any user", async () => {
    const res = await api("/v1/ai/recommendations", {
      headers: cookieHeaders(student.cookie),
    });
    expect(res.status).toBe(200);
    const body = (await res.json()) as {
      items: { id: string; kind: string; title: string; reason: string; cta: string }[];
      total: number;
      mock: boolean;
    };
    expect(body.total).toBeGreaterThan(0);
    expect(body.items[0]).toMatchObject({
      kind: expect.any(String),
      title: expect.any(String),
      reason: expect.any(String),
    });
    expect(body.mock).toBe(true);
  });
});

describe("AI assistant", () => {
  it("answers a question in mock mode", async () => {
    const res = await api("/v1/ai/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cookieHeaders(student.cookie) },
      body: JSON.stringify({ question: "How do closures work?" }),
    });
    expect(res.status).toBe(200);
    const body = (await res.json()) as { answer: string; mock: boolean };
    expect(body.answer.length).toBeGreaterThan(10);
    expect(body.mock).toBe(true);
  });

  it("rejects empty questions", async () => {
    const res = await api("/v1/ai/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cookieHeaders(student.cookie) },
      body: JSON.stringify({ question: " " }),
    });
    expect(res.status).toBe(400);
  });
});

describe("AI content generation", () => {
  it("generates lesson content, outlines and quizzes", async () => {
    for (const kind of ["lesson", "outline", "quiz"]) {
      const res = await api("/v1/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...cookieHeaders(instructor.cookie) },
        body: JSON.stringify({ kind, topic: "React hooks" }),
      });
      expect(res.status, kind).toBe(201);
      const body = (await res.json()) as {
        kind: string;
        topic: string;
        content: Record<string, unknown>;
        mock: boolean;
      };
      expect(body.kind).toBe(kind);
      expect(body.topic).toBe("React hooks");
      expect(body.mock).toBe(true);
      expect(Object.keys(body.content).length).toBeGreaterThan(0);
    }
  });

  it("rejects empty topics", async () => {
    const res = await api("/v1/ai/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cookieHeaders(instructor.cookie) },
      body: JSON.stringify({ kind: "lesson", topic: "" }),
    });
    expect(res.status).toBe(400);
  });
});
