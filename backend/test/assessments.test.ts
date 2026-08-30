import { beforeAll, describe, expect, it } from "vitest";
import { api, cookieHeaders, createTestSession, setupDb } from "./helpers";

beforeAll(async () => {
  await setupDb();
});

interface AssessmentShape {
  id: string;
  title: string;
  course: string;
  kind: string;
  questions: number;
  duration: string;
  due: string;
  status: string;
  score?: number;
  max?: number;
  attempts: number;
  attemptsLeft: number;
  window: string;
}

describe("GET /v1/assessments", () => {
  it("returns 401 without a session", async () => {
    const res = await api("/v1/assessments");
    expect(res.status).toBe(401);
  });

  it("returns the demo student's assessments with optional score fields", async () => {
    const { cookie } = await createTestSession("student@cea.ng");
    const res = await api("/v1/assessments", { headers: cookieHeaders(cookie) });
    expect(res.status).toBe(200);
    const body = (await res.json()) as { items: AssessmentShape[]; total: number };
    expect(body.total).toBe(4);

    const q1 = body.items.find((a) => a.id === "q1");
    expect(q1).toBeDefined();
    expect(q1!.status).toBe("available");
    expect(q1!.attemptsLeft).toBe(2);
    expect(q1!.score).toBeUndefined();
    expect(q1!.max).toBeUndefined();

    const q2 = body.items.find((a) => a.id === "q2");
    expect(q2!.status).toBe("done");
    expect(q2!.score).toBe(46);
    expect(q2!.max).toBe(50);

    const e1 = body.items.find((a) => a.id === "e1");
    expect(e1!.kind).toBe("exam");
    expect(e1!.status).toBe("scheduled");
    expect(e1!.questions).toBe(45);
  });

  it("returns 403 for non-students", async () => {
    const { cookie } = await createTestSession("instructor@cea.ng");
    const res = await api("/v1/assessments", { headers: cookieHeaders(cookie) });
    expect(res.status).toBe(403);
  });
});

describe("GET /v1/assessments/:id", () => {
  it("returns a single assessment", async () => {
    const { cookie } = await createTestSession("student@cea.ng");
    const res = await api("/v1/assessments/t1", { headers: cookieHeaders(cookie) });
    expect(res.status).toBe(200);
    const body = (await res.json()) as AssessmentShape;
    expect(body.title).toBe("Mid-term test — Backend");
    expect(body.score).toBe(91);
    expect(body.max).toBe(100);
    expect(body.attempts).toBe(1);
    expect(body.attemptsLeft).toBe(0);
  });

  it("returns 404 for unknown ids", async () => {
    const { cookie } = await createTestSession("student@cea.ng");
    const res = await api("/v1/assessments/nope", { headers: cookieHeaders(cookie) });
    expect(res.status).toBe(404);
  });
});

describe("POST /v1/assessments/:id/submit", () => {
  it("scores answers on the server and closes the assessment", async () => {
    const { cookie } = await createTestSession("student@cea.ng");
    const res = await api("/v1/assessments/q1/submit", {
      method: "POST",
      headers: { ...cookieHeaders(cookie), "Content-Type": "application/json" },
      body: JSON.stringify({ answers: [1, 0, 2, 0, 2] }),
    });
    expect(res.status).toBe(200);
    const body = (await res.json()) as {
      status: string;
      score: number;
      max: number;
      attemptsLeft: number;
    };
    expect(body.status).toBe("done");
    expect(body.score).toBe(5);
    expect(body.max).toBe(5);
    expect(body.attemptsLeft).toBe(1);

    const detail = await api("/v1/assessments/q1", { headers: cookieHeaders(cookie) });
    const assessment = (await detail.json()) as AssessmentShape;
    expect(assessment.status).toBe("done");
    expect(assessment.score).toBe(5);

    const attempts = await api("/v1/assessments/q1/attempts", {
      headers: cookieHeaders(cookie),
    });
    expect(attempts.status).toBe(200);
    expect(await attempts.json()).toMatchObject({
      total: 1,
      items: [{ score: 5, max: 5 }],
    });
  });

  it("rejects malformed submissions and non-students", async () => {
    const student = await createTestSession("student@cea.ng");
    const invalid = await api("/v1/assessments/q1/submit", {
      method: "POST",
      headers: { ...cookieHeaders(student.cookie), "Content-Type": "application/json" },
      body: JSON.stringify({ answers: [9] }),
    });
    expect(invalid.status).toBe(400);

    const instructor = await createTestSession("instructor@cea.ng");
    const forbidden = await api("/v1/assessments/q1/submit", {
      method: "POST",
      headers: { ...cookieHeaders(instructor.cookie), "Content-Type": "application/json" },
      body: JSON.stringify({ answers: [1, 0, 2, 0, 2] }),
    });
    expect(forbidden.status).toBe(403);
  });
});
