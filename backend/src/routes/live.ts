import { Hono } from "hono";
import type { AppEnv } from "../types";
import { base64UrlDecode, base64UrlEncode } from "../lib/crypto";
import { paginate, parsePagination, type Paginated } from "../lib/pagination";
import { requireAuth, requireAnyRole } from "../lib/auth";
import { ApiError } from "../lib/errors";

export interface ApiLiveSession {
  id: string;
  title: string;
  instructor: string;
  cohort: string;
  status: string;
  startsAt: string;
}

export interface ApiLivePoll {
  id: string;
  classId: string;
  question: string;
  options: string[];
  status: string;
  results?: Record<string, number>;
  totalVotes?: number;
}

export interface ApiLiveWhiteboardOp {
  id: string;
  classId: string;
  userId: string;
  userName: string;
  op: Record<string, unknown>;
  opOrder: number;
  createdAt: string;
}

interface SessionRow {
  id: string;
  title: string;
  instructor: string;
  cohort: string;
  status: string;
  starts_at: string;
}

interface PollRow {
  id: string;
  class_id: string;
  question: string;
  options: string;
  status: string;
}

interface OpRow {
  id: string;
  class_id: string;
  user_id: string;
  user_name: string;
  op: string;
  op_order: number;
  created_at: string;
}

export const live = new Hono<{ Bindings: AppEnv }>();

live.use("*", requireAuth);
const requireInstructorOrAdmin = requireAnyRole(["instructor", "admin"]);

function isoNow(): string {
  return new Date().toISOString();
}

live.get("/classes", async (c) => {
  const { cursor, limit } = parsePagination(c);
  const total = await c.env.DB.prepare(`SELECT COUNT(*) AS n FROM live_sessions`).first<{
    n: number;
  }>();
  const rows = await c.env.DB.prepare(
    `SELECT id, title, instructor, cohort, status, starts_at FROM live_sessions
      ${cursor ? "WHERE id > ?" : ""} ORDER BY id ASC LIMIT ?`,
  )
    .bind(...(cursor ? [base64UrlDecode(cursor) ?? ""] : []), limit)
    .all<SessionRow>();
  const items: ApiLiveSession[] = rows.results.map((r) => ({
    id: r.id,
    title: r.title,
    instructor: r.instructor,
    cohort: r.cohort,
    status: r.status,
    startsAt: r.starts_at,
  }));
  const result: Paginated<ApiLiveSession> = paginate(items, total?.n ?? 0, (last) =>
    base64UrlEncode(last.id),
  );
  return c.json(result);
});

live.get("/classes/:id", async (c) => {
  const row = await c.env.DB.prepare(
    `SELECT id, title, instructor, cohort, status, starts_at FROM live_sessions WHERE id = ?`,
  )
    .bind(c.req.param("id"))
    .first<SessionRow>();
  if (!row) throw ApiError.notFound("Class not found.");
  const session: ApiLiveSession = {
    id: row.id,
    title: row.title,
    instructor: row.instructor,
    cohort: row.cohort,
    status: row.status,
    startsAt: row.starts_at,
  };
  return c.json(session);
});

/* ---------------- class chat (persisted alongside realtime fan-out) ---------------- */

live.get("/classes/:id/chat", async (c) => {
  const { cursor, limit } = parsePagination(c);
  const classId = c.req.param("id");
  const total = await c.env.DB.prepare(
    `SELECT COUNT(*) AS n FROM realtime_messages WHERE room_id = ? AND channel = 'live'`,
  )
    .bind(classId)
    .first<{ n: number }>();
  const rows = await c.env.DB.prepare(
    `SELECT id, room_id, channel, user_id, user_name, body, created_at FROM realtime_messages
      WHERE room_id = ? AND channel = 'live' ${cursor ? "AND id > ?" : ""} ORDER BY id ASC LIMIT ?`,
  )
    .bind(classId, ...(cursor ? [base64UrlDecode(cursor) ?? ""] : []), limit)
    .all<{
      id: string;
      room_id: string;
      channel: string;
      user_id: string | null;
      user_name: string;
      body: string;
      created_at: string;
    }>();
  const items = rows.results.map((r) => ({
    id: r.id,
    roomId: r.room_id,
    channel: r.channel,
    userId: r.user_id,
    userName: r.user_name,
    body: r.body,
    createdAt: r.created_at,
  }));
  const result: Paginated<(typeof items)[number]> = paginate(items, total?.n ?? 0, (last) =>
    base64UrlEncode(last.id),
  );
  return c.json(result);
});

live.post("/classes/:id/chat", async (c) => {
  const classId = c.req.param("id");
  const cls = await c.env.DB.prepare(`SELECT id FROM live_sessions WHERE id = ?`)
    .bind(classId)
    .first<{ id: string }>();
  if (!cls) throw ApiError.notFound("Class not found.");

  const input = (await c.req.json().catch(() => ({}))) as { body?: string };
  const body = (input.body ?? "").trim();
  if (body.length === 0) throw ApiError.validation({ body: ["Message body is required."] });

  const user = c.get("authUser");
  const id = crypto.randomUUID();
  const now = isoNow();
  await c.env.DB.prepare(
    `INSERT INTO realtime_messages (id, room_id, channel, user_id, user_name, body, created_at, sort_order)
     VALUES (?, ?, 'live', ?, ?, ?, ?, 0)`,
  )
    .bind(id, classId, user.id, user.name, body, now)
    .run();
  return c.json(
    {
      id,
      roomId: classId,
      channel: "live",
      userId: user.id,
      userName: user.name,
      body,
      createdAt: now,
    },
    201,
  );
});

/* ---------------- polls ---------------- */

live.get("/classes/:id/polls", async (c) => {
  const { cursor, limit } = parsePagination(c);
  const classId = c.req.param("id");
  const total = await c.env.DB.prepare(`SELECT COUNT(*) AS n FROM live_polls WHERE class_id = ?`)
    .bind(classId)
    .first<{ n: number }>();
  const rows = await c.env.DB.prepare(
    `SELECT id, class_id, question, options, status FROM live_polls
      WHERE class_id = ? ${cursor ? "AND id > ?" : ""} ORDER BY id ASC LIMIT ?`,
  )
    .bind(classId, ...(cursor ? [base64UrlDecode(cursor) ?? ""] : []), limit)
    .all<PollRow>();
  const items: ApiLivePoll[] = [];
  for (const r of rows.results) {
    items.push(await pollShape(c, r));
  }
  const result: Paginated<ApiLivePoll> = paginate(items, total?.n ?? 0, (last) =>
    base64UrlEncode(last.id),
  );
  return c.json(result);
});

async function pollShape(c: { env: AppEnv }, r: PollRow): Promise<ApiLivePoll> {
  const options = (JSON.parse(r.options) ?? []) as string[];
  const votes = await c.env.DB.prepare(
    `SELECT option, COUNT(*) AS n FROM live_poll_votes WHERE poll_id = ? GROUP BY option`,
  )
    .bind(r.id)
    .all<{ option: string; n: number }>();
  const results: Record<string, number> = {};
  let totalVotes = 0;
  for (const v of votes.results) {
    results[v.option] = v.n;
    totalVotes += v.n;
  }
  return {
    id: r.id,
    classId: r.class_id,
    question: r.question,
    options,
    status: r.status,
    ...(totalVotes > 0 ? { results, totalVotes } : {}),
  };
}

live.post("/classes/:id/polls", requireInstructorOrAdmin, async (c) => {
  const classId = c.req.param("id");
  const cls = await c.env.DB.prepare(`SELECT id FROM live_sessions WHERE id = ?`)
    .bind(classId)
    .first<{ id: string }>();
  if (!cls) throw ApiError.notFound("Class not found.");

  const input = (await c.req.json().catch(() => ({}))) as {
    question?: string;
    options?: string[];
  };
  const question = (input.question ?? "").trim();
  const options = Array.isArray(input.options)
    ? input.options.map((o) => String(o).trim()).filter(Boolean)
    : [];
  if (question.length === 0) throw ApiError.validation({ question: ["Question is required."] });
  if (options.length < 2) {
    throw ApiError.validation({ options: ["At least two options are required."] });
  }

  const id = crypto.randomUUID();
  await c.env.DB.prepare(
    `INSERT INTO live_polls (id, class_id, question, options, status, created_by, sort_order)
     VALUES (?, ?, ?, ?, 'open', ?, 0)`,
  )
    .bind(id, classId, question, JSON.stringify(options), c.get("authUser").id)
    .run();
  return c.json(
    {
      id,
      classId,
      question,
      options,
      status: "open",
    } satisfies ApiLivePoll,
    201,
  );
});

live.post("/classes/:id/polls/:pollId/vote", async (c) => {
  const { pollId } = c.req.param();
  const poll = await c.env.DB.prepare(`SELECT id, options, status FROM live_polls WHERE id = ?`)
    .bind(pollId)
    .first<{ id: string; options: string; status: string }>();
  if (!poll) throw ApiError.notFound("Poll not found.");
  if (poll.status !== "open") throw ApiError.conflict("This poll is closed.");

  const input = (await c.req.json().catch(() => ({}))) as { option?: string };
  const option = (input.option ?? "").trim();
  const options = (JSON.parse(poll.options) ?? []) as string[];
  if (!options.includes(option)) throw ApiError.validation({ option: ["Unknown option."] });

  const user = c.get("authUser");
  const existing = await c.env.DB.prepare(
    `SELECT id FROM live_poll_votes WHERE poll_id = ? AND user_id = ?`,
  )
    .bind(pollId, user.id)
    .first<{ id: string }>();
  if (existing) {
    await c.env.DB.prepare(`UPDATE live_poll_votes SET option = ? WHERE id = ?`)
      .bind(option, existing.id)
      .run();
  } else {
    await c.env.DB.prepare(
      `INSERT INTO live_poll_votes (id, poll_id, user_id, option, created_at, sort_order)
       VALUES (?, ?, ?, ?, ?, 0)`,
    )
      .bind(crypto.randomUUID(), pollId, user.id, option, isoNow())
      .run();
  }
  const shape = await pollShape(c, {
    id: poll.id,
    class_id: c.req.param("id"),
    question: "",
    options: poll.options,
    status: poll.status,
  });
  return c.json(shape);
});

/* ---------------- whiteboard ops ---------------- */

live.get("/classes/:id/whiteboard/ops", async (c) => {
  const { cursor, limit } = parsePagination(c);
  const classId = c.req.param("id");
  const total = await c.env.DB.prepare(
    `SELECT COUNT(*) AS n FROM live_whiteboard_ops WHERE class_id = ?`,
  )
    .bind(classId)
    .first<{ n: number }>();
  const rows = await c.env.DB.prepare(
    `SELECT id, class_id, user_id, user_name, op, op_order, created_at FROM live_whiteboard_ops
      WHERE class_id = ? ${cursor ? "AND id > ?" : ""} ORDER BY id ASC LIMIT ?`,
  )
    .bind(classId, ...(cursor ? [base64UrlDecode(cursor) ?? ""] : []), limit)
    .all<OpRow>();
  const items: ApiLiveWhiteboardOp[] = rows.results.map((r) => ({
    id: r.id,
    classId: r.class_id,
    userId: r.user_id,
    userName: r.user_name,
    op: (JSON.parse(r.op) ?? {}) as Record<string, unknown>,
    opOrder: r.op_order,
    createdAt: r.created_at,
  }));
  const result: Paginated<ApiLiveWhiteboardOp> = paginate(items, total?.n ?? 0, (last) =>
    base64UrlEncode(last.id),
  );
  return c.json(result);
});

live.post("/classes/:id/whiteboard/ops", requireInstructorOrAdmin, async (c) => {
  const classId = c.req.param("id");
  const cls = await c.env.DB.prepare(`SELECT id FROM live_sessions WHERE id = ?`)
    .bind(classId)
    .first<{ id: string }>();
  if (!cls) throw ApiError.notFound("Class not found.");

  const input = (await c.req.json().catch(() => ({}))) as { op?: Record<string, unknown> };
  if (!input.op || typeof input.op !== "object") {
    throw ApiError.validation({ op: ["A whiteboard op object is required."] });
  }
  const user = c.get("authUser");
  const now = isoNow();
  const opOrder = await c.env.DB.prepare(
    `SELECT COALESCE(MAX(op_order), -1) + 1 AS next FROM live_whiteboard_ops WHERE class_id = ?`,
  )
    .bind(classId)
    .first<{ next: number }>();
  const id = crypto.randomUUID();

  await c.env.DB.prepare(
    `INSERT INTO live_whiteboard_ops (id, class_id, user_id, user_name, op, op_order, created_at, sort_order)
     VALUES (?, ?, ?, ?, ?, ?, ?, 0)`,
  )
    .bind(id, classId, user.id, user.name, JSON.stringify(input.op), opOrder?.next ?? 0, now)
    .run();
  return c.json(
    {
      id,
      classId,
      userId: user.id,
      userName: user.name,
      op: input.op,
      opOrder: opOrder?.next ?? 0,
      createdAt: now,
    } satisfies ApiLiveWhiteboardOp,
    201,
  );
});

/** WebSocket upgrade for live class chat — plain HTTP requests get 426. */
live.get("/classes/:id/ws", async (c) => {
  if (c.req.header("upgrade")?.toLowerCase() !== "websocket") {
    return c.json(
      { error: { code: "UPGRADE_REQUIRED", message: "A WebSocket upgrade is required." } },
      426,
    );
  }
  const classId = c.req.param("id");
  const user = c.get("authUser");
  const id = c.env.REALTIME_ROOMS.idFromName(`live:${classId}`);
  const stub = c.env.REALTIME_ROOMS.get(id);
  const url = new URL(c.req.url);
  url.pathname = "/ws";
  url.searchParams.set("channel", "live");
  const upgrade = new Request(url.toString(), {
    method: "GET",
    headers: {
      upgrade: "websocket",
      connection: "Upgrade",
      "x-cea-user-id": user.id,
      "x-cea-user-name": user.name,
    },
  });
  return stub.fetch(upgrade);
});
