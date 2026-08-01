import { beforeAll, describe, expect, it } from "vitest";
import { api, cookieHeaders, createTestSession, setupDb } from "./helpers";

type TestSession = Awaited<ReturnType<typeof createTestSession>>;

let student: TestSession;
let instructor: TestSession;
let admin: TestSession;

beforeAll(async () => {
  await setupDb();
  student = await createTestSession("student@cea.ng");
  instructor = await createTestSession("instructor@cea.ng");
  admin = await createTestSession("admin@cea.ng");
});

interface LivePoll {
  id: string;
  classId: string;
  question: string;
  options: string[];
  status: string;
  results?: Record<string, number>;
  totalVotes?: number;
}

describe("live classes", () => {
  it("lists seeded sessions and returns a detail row", async () => {
    const list = await api("/v1/live/classes", {
      headers: cookieHeaders(student.cookie),
    });
    expect(list.status).toBe(200);
    const body = (await list.json()) as {
      items: { id: string; title: string; instructor: string; status: string }[];
      total: number;
    };
    expect(body.total).toBeGreaterThan(0);
    const first = body.items[0]!;

    const detail = await api(`/v1/live/classes/${first.id}`, {
      headers: cookieHeaders(student.cookie),
    });
    expect(detail.status).toBe(200);
    const session = (await detail.json()) as { id: string; title: string };
    expect(session.id).toBe(first.id);
  });

  it("404s unknown classes", async () => {
    const res = await api("/v1/live/classes/nope", { headers: cookieHeaders(student.cookie) });
    expect(res.status).toBe(404);
  });

  it("persists live chat and returns it scoped to the channel", async () => {
    const sent = await api("/v1/live/classes/live-1/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cookieHeaders(student.cookie) },
      body: JSON.stringify({ body: "Hello class!" }),
    });
    expect(sent.status).toBe(201);

    const history = await api("/v1/live/classes/live-1/chat", {
      headers: cookieHeaders(student.cookie),
    });
    const page = (await history.json()) as { items: { body: string; channel: string }[] };
    expect(page.items.at(-1)).toMatchObject({ body: "Hello class!", channel: "live" });
  });

  it("answers 426 to plain HTTP on the class websocket", async () => {
    const res = await api("/v1/live/classes/live-1/ws", {
      headers: cookieHeaders(student.cookie),
    });
    expect(res.status).toBe(426);
  });
});

describe("live polls", () => {
  it("lets instructors create a poll and students vote", async () => {
    const created = await api("/v1/live/classes/live-1/polls", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cookieHeaders(instructor.cookie) },
      body: JSON.stringify({
        question: "Which track next?",
        options: ["Frontend", "Backend", "Data"],
      }),
    });
    expect(created.status).toBe(201);
    const poll = (await created.json()) as LivePoll;
    expect(poll).toMatchObject({
      question: "Which track next?",
      options: ["Frontend", "Backend", "Data"],
      status: "open",
    });

    const vote = await api(`/v1/live/classes/live-1/polls/${poll.id}/vote`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cookieHeaders(student.cookie) },
      body: JSON.stringify({ option: "Frontend" }),
    });
    expect(vote.status).toBe(200);
    const withVotes = (await vote.json()) as LivePoll;
    expect(withVotes.totalVotes).toBe(1);
    expect(withVotes.results?.Frontend).toBe(1);

    const list = await api("/v1/live/classes/live-1/polls", {
      headers: cookieHeaders(student.cookie),
    });
    const page = (await list.json()) as { items: LivePoll[] };
    expect(page.items.some((p) => p.id === poll.id)).toBe(true);
  });

  it("rejects students creating polls", async () => {
    const res = await api("/v1/live/classes/live-1/polls", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cookieHeaders(student.cookie) },
      body: JSON.stringify({ question: "?", options: ["A", "B"] }),
    });
    expect(res.status).toBe(403);
  });

  it("rejects invalid polls and unknown options", async () => {
    const bad = await api("/v1/live/classes/live-1/polls", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cookieHeaders(instructor.cookie) },
      body: JSON.stringify({ question: "", options: ["A"] }),
    });
    expect(bad.status).toBe(400);

    const created = await api("/v1/live/classes/live-1/polls", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cookieHeaders(instructor.cookie) },
      body: JSON.stringify({ question: "Pick", options: ["A", "B"] }),
    });
    const poll = (await created.json()) as LivePoll;
    const vote = await api(`/v1/live/classes/live-1/polls/${poll.id}/vote`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cookieHeaders(student.cookie) },
      body: JSON.stringify({ option: "NotAnOption" }),
    });
    expect(vote.status).toBe(400);
  });
});

describe("live whiteboard", () => {
  it("records ops in order and replays them", async () => {
    const created = await api("/v1/live/classes/live-1/whiteboard/ops", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cookieHeaders(instructor.cookie) },
      body: JSON.stringify({ op: { type: "rect", x: 10, y: 20, w: 100, h: 50 } }),
    });
    expect(created.status).toBe(201);
    const op = (await created.json()) as { id: string; opOrder: number };
    expect(op.opOrder).toBe(0);

    const replay = await api("/v1/live/classes/live-1/whiteboard/ops", {
      headers: cookieHeaders(student.cookie),
    });
    const page = (await replay.json()) as {
      items: { op: Record<string, unknown>; opOrder: number }[];
    };
    expect(page.items.at(-1)).toMatchObject({ op: { type: "rect", x: 10 }, opOrder: 0 });
  });

  it("rejects students writing ops", async () => {
    const res = await api("/v1/live/classes/live-1/whiteboard/ops", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cookieHeaders(student.cookie) },
      body: JSON.stringify({ op: { type: "rect" } }),
    });
    expect(res.status).toBe(403);
  });
});
