import { registerMock, registerMockPattern } from "@/lib/api/client";
import type { ApiRequestInit } from "@/lib/api/client";
import { ApiError } from "@/lib/errors";
import { liveSessions, type LiveSession } from "@/data/learning";
import type { LivePoll } from "@/lib/api/live";
import type { RealtimeMessage } from "@/lib/api/realtime";

function delay(milliseconds = 120): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function segmentAt(path: string, index: number): string {
  return path.split("/").filter(Boolean)[index] ?? "";
}

const MOCK_USER_ID = "00000000-0000-4000-8000-000000000001";

const sessions: LiveSession[] = liveSessions.map((s) => ({ ...s }));

const chatByClass = new Map<string, RealtimeMessage[]>([
  [
    "live-1",
    [
      {
        id: "lc-1",
        roomId: "live-1",
        channel: "live",
        userId: "instructor-1",
        userName: "Chioma Eze",
        body: "Welcome to the live class — we're covering indexes and query plans today.",
        createdAt: new Date(Date.now() - 12 * 60_000).toISOString(),
      },
      {
        id: "lc-2",
        roomId: "live-1",
        channel: "live",
        userId: MOCK_USER_ID,
        userName: "Adaeze Okafor",
        body: "Do we cover EXPLAIN output in the assignment?",
        createdAt: new Date(Date.now() - 9 * 60_000).toISOString(),
      },
      {
        id: "lc-3",
        roomId: "live-1",
        channel: "live",
        userId: "instructor-1",
        userName: "Chioma Eze",
        body: "Yes — task 3 is a query plan exercise. Paste your EXPLAIN in #qna.",
        createdAt: new Date(Date.now() - 7 * 60_000).toISOString(),
      },
    ],
  ],
]);

interface PollState extends LivePoll {
  /** user id → chosen option */
  votes: Record<string, string>;
}

interface MockWhiteboardOp {
  id: string;
  classId: string;
  userId: string;
  userName: string;
  op: string;
  createdAt: string;
}

const polls: PollState[] = [
  {
    id: "poll-1",
    classId: "live-1",
    question: "Which SQL index type would you use for a lookup-heavy table?",
    options: ["B-tree", "Hash", "Full-text", "Not sure yet"],
    status: "open",
    votes: { [MOCK_USER_ID]: "B-tree", "student-2": "B-tree", "student-3": "Hash" },
  },
];

export function registerLiveMocks(): void {
  registerMock("GET", "/v1/live/classes", async () => {
    await delay();
    return { items: sessions, total: sessions.length };
  });

  registerMockPattern("POST", "/v1/live/classes/*/polls/*/vote", async (init: ApiRequestInit) => {
    await delay();
    const segments = (init.path ?? "").split("/").filter(Boolean);
    const classId = segments[3];
    const pollId = segments[5];
    const input = (init.body ?? {}) as { option?: string };
    const option = (input.option ?? "").trim();
    const poll = polls.find((p) => p.id === pollId && p.classId === classId);
    if (!poll) throw new ApiError(404, "NOT_FOUND", "Poll not found.");
    if (!poll.options.includes(option)) {
      throw new ApiError(400, "FIELD_VALIDATION", "That option is not part of this poll.");
    }
    poll.votes[MOCK_USER_ID] = option;
    return toApiPoll(poll);
  });

  registerMockPattern("GET", "/v1/live/classes/*/polls", async (init: ApiRequestInit) => {
    await delay();
    const classId = segmentAt(init.path ?? "", 3);
    const items = polls.filter((p) => p.classId === classId).map(toApiPoll);
    return { items, total: items.length };
  });

  registerMockPattern("POST", "/v1/live/classes/*/polls", async (init: ApiRequestInit) => {
    await delay();
    const classId = segmentAt(init.path ?? "", 3);
    const input = (init.body ?? {}) as { question?: string; options?: string[] };
    const question = (input.question ?? "").trim();
    const options = (input.options ?? []).map((o) => o.trim()).filter((o) => o.length > 0);
    if (question.length === 0 || options.length < 2) {
      throw new ApiError(
        400,
        "FIELD_VALIDATION",
        "A question and at least two options are required.",
      );
    }
    const poll: PollState = {
      id: `poll-${Math.random().toString(36).slice(2, 8)}`,
      classId,
      question,
      options,
      status: "open",
      votes: {},
    };
    polls.push(poll);
    return toApiPoll(poll);
  });

  registerMockPattern("GET", "/v1/live/classes/*/chat", async (init: ApiRequestInit) => {
    await delay();
    const classId = segmentAt(init.path ?? "", 3);
    const items = chatByClass.get(classId) ?? [];
    return { items: items.map((m) => ({ ...m })), total: items.length };
  });

  registerMockPattern("POST", "/v1/live/classes/*/chat", async (init: ApiRequestInit) => {
    await delay();
    const classId = segmentAt(init.path ?? "", 3);
    const input = (init.body ?? {}) as { body?: string };
    const body = (input.body ?? "").trim();
    if (body.length === 0) {
      throw new ApiError(400, "FIELD_VALIDATION", "Message body is required.", {
        body: ["Message body is required."],
      });
    }
    if (!sessions.some((s) => s.id === classId)) {
      throw new ApiError(404, "NOT_FOUND", "Class not found.");
    }
    const message: RealtimeMessage = {
      id: `lc-${Math.random().toString(36).slice(2, 10)}`,
      roomId: classId,
      channel: "live",
      userId: MOCK_USER_ID,
      userName: "Adaeze Okafor",
      body,
      createdAt: new Date().toISOString(),
    };
    const items = chatByClass.get(classId) ?? [];
    items.push(message);
    chatByClass.set(classId, items);
    return message;
  });

  registerMockPattern("GET", "/v1/live/classes/*", async (init: ApiRequestInit) => {
    await delay();
    const path = init.path ?? "";
    const segments = path.split("/").filter(Boolean);
    const id = segments[3];
    const session = sessions.find((s) => s.id === id);
    if (!session) throw new ApiError(404, "NOT_FOUND", "Class not found.");
    return session;
  });

  const whiteboardStore: Map<string, MockWhiteboardOp[]> = new Map();

  registerMockPattern("GET", "/v1/live/classes/*/whiteboard/ops", async (init: ApiRequestInit) => {
    await delay();
    const classId = segmentAt(init.path ?? "", 3);
    return whiteboardStore.get(classId) ?? [];
  });

  registerMockPattern("POST", "/v1/live/classes/*/whiteboard/ops", async (init: ApiRequestInit) => {
    await delay();
    const classId = segmentAt(init.path ?? "", 3);
    const input = (init.body ?? {}) as { op?: string };
    const op: MockWhiteboardOp = {
      id: `wbo-${Date.now()}`,
      classId,
      userId: MOCK_USER_ID,
      userName: "Adaeze Okafor",
      op: input.op ?? "",
      createdAt: new Date().toISOString(),
    };
    const list = whiteboardStore.get(classId) ?? [];
    list.push(op);
    whiteboardStore.set(classId, list);
    return op;
  });
}

function toApiPoll(poll: PollState): LivePoll {
  const counts: Record<string, number> = {};
  for (const option of poll.options) {
    counts[option] = 0;
  }
  for (const vote of Object.values(poll.votes)) {
    if (vote in counts) counts[vote] += 1;
  }
  const totalVotes = Object.keys(poll.votes).length;
  return {
    id: poll.id,
    classId: poll.classId,
    question: poll.question,
    options: poll.options,
    status: poll.status,
    results: counts,
    totalVotes,
    myVote: poll.votes[MOCK_USER_ID],
  };
}
