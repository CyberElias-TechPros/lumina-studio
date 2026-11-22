import { Hono } from "hono";
import type { AppEnv } from "../types";
import { z } from "zod";
import { base64UrlDecode, base64UrlEncode } from "../lib/crypto";
import { paginate, parsePagination, type Paginated } from "../lib/pagination";
import { requireAuth, requireAnyRole } from "../lib/auth";
import { ApiError } from "../lib/errors";
import { parseBody } from "../lib/validate";

export interface ApiLiveSession {
  id: string;
  title: string;
  instructor: string;
  cohort: string;
  courseSlug: string;
  cohortId: string;
  meetingUrl?: string;
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
  course_slug: string;
  cohort_id: string;
  instructor_user_id: string;
  meeting_url: string;
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
live.use("*", async (c, next) => {
  c.header("Cache-Control", "no-store");
  await next();
});

const requireInstructorOrAdmin = requireAnyRole(["instructor", "admin"]);

function isoNow(): string {
  return new Date().toISOString();
}

function mapSessionRow(r: SessionRow): ApiLiveSession {
  return {
    id: r.id,
    title: r.title,
    instructor: r.instructor,
    cohort: r.cohort,
    courseSlug: r.course_slug,
    cohortId: r.cohort_id,
    ...(r.meeting_url ? { meetingUrl: r.meeting_url } : {}),
    status: r.status,
    startsAt: r.starts_at,
  };
}

async function canAccessSession(
  db: AppEnv["DB"],
  user: { id: string; roleKey: string },
  session: SessionRow,
): Promise<boolean> {
  if (user.roleKey === "admin") return true;
  if (user.roleKey === "instructor") {
    if (session.instructor_user_id && session.instructor_user_id === user.id) return true;
    if (session.course_slug) {
      const roster = await db
        .prepare(
          `SELECT 1 AS ok FROM assignment_roster_grants
            WHERE instructor_id = ? AND course_slug = ? AND active = 1 AND expires_at > ?
            LIMIT 1`,
        )
        .bind(user.id, session.course_slug, isoNow())
        .first<{ ok: number }>();
      if (roster) return true;
    }
    return false;
  }
  if (user.roleKey === "student" && session.course_slug) {
    const enrolled = await db
      .prepare(`SELECT 1 AS ok FROM enrollments WHERE user_id = ? AND course_slug = ? LIMIT 1`)
      .bind(user.id, session.course_slug)
      .first<{ ok: number }>();
    if (enrolled) return true;
    const activated = await db
      .prepare(
        `SELECT 1 AS ok FROM registrations
          WHERE activated_user_id = ? AND program_slug = ? AND activated_at IS NOT NULL
          LIMIT 1`,
      )
      .bind(user.id, session.course_slug)
      .first<{ ok: number }>();
    return Boolean(activated);
  }
  return false;
}

async function requireLiveAccess(
  db: AppEnv["DB"],
  user: { id: string; roleKey: string },
  classId: string,
): Promise<SessionRow> {
  const row = await db
    .prepare(
      `SELECT id, title, instructor, cohort, course_slug, cohort_id, instructor_user_id, meeting_url, status, starts_at
         FROM live_sessions WHERE id = ?`,
    )
    .bind(classId)
    .first<SessionRow>();
  if (!row) throw ApiError.notFound("Class not found.");
  if (!(await canAccessSession(db, user, row))) {
    throw ApiError.forbidden("You are not enrolled in or assigned to this live class.");
  }
  return row;
}

async function requireLiveManage(
  db: AppEnv["DB"],
  user: { id: string; roleKey: string },
  classId: string,
): Promise<SessionRow> {
  const row = await requireLiveAccess(db, user, classId);
  if (user.roleKey === "admin") return row;
  if (user.roleKey === "instructor" && row.instructor_user_id === user.id) return row;
  throw ApiError.forbidden(
    "Only the assigned instructor or an administrator can manage this class.",
  );
}

live.get("/classes", async (c) => {
  const { cursor, limit } = parsePagination(c);
  const user = c.get("authUser");
  const now = isoNow();
  const decodedCursor = cursor ? (base64UrlDecode(cursor) ?? "") : "";

  let rows: SessionRow[] = [];
  let total = 0;

  if (user.roleKey === "admin") {
    const countRow = await c.env.DB.prepare(`SELECT COUNT(*) AS n FROM live_sessions`).first<{
      n: number;
    }>();
    total = countRow?.n ?? 0;
    const res = await c.env.DB.prepare(
      `SELECT id, title, instructor, cohort, course_slug, cohort_id, instructor_user_id, meeting_url, status, starts_at
         FROM live_sessions
        ${decodedCursor ? "WHERE id > ?" : ""}
        ORDER BY id ASC LIMIT ?`,
    )
      .bind(...(decodedCursor ? [decodedCursor] : []), limit)
      .all<SessionRow>();
    rows = res.results;
  } else if (user.roleKey === "instructor") {
    const whereClause = `(instructor_user_id = ? OR course_slug IN (
      SELECT course_slug FROM assignment_roster_grants WHERE instructor_id = ? AND active = 1 AND expires_at > ?
    ))`;
    const countRow = await c.env.DB.prepare(
      `SELECT COUNT(*) AS n FROM live_sessions WHERE ${whereClause}`,
    )
      .bind(user.id, user.id, now)
      .first<{ n: number }>();
    total = countRow?.n ?? 0;
    const res = await c.env.DB.prepare(
      `SELECT id, title, instructor, cohort, course_slug, cohort_id, instructor_user_id, meeting_url, status, starts_at
         FROM live_sessions
        WHERE ${whereClause} ${decodedCursor ? "AND id > ?" : ""}
        ORDER BY id ASC LIMIT ?`,
    )
      .bind(user.id, user.id, now, ...(decodedCursor ? [decodedCursor] : []), limit)
      .all<SessionRow>();
    rows = res.results;
  } else if (user.roleKey === "student") {
    const whereClause = `course_slug != '' AND (
      course_slug IN (SELECT course_slug FROM enrollments WHERE user_id = ?)
      OR course_slug IN (SELECT program_slug FROM registrations WHERE activated_user_id = ? AND activated_at IS NOT NULL)
    )`;
    const countRow = await c.env.DB.prepare(
      `SELECT COUNT(*) AS n FROM live_sessions WHERE ${whereClause}`,
    )
      .bind(user.id, user.id)
      .first<{ n: number }>();
    total = countRow?.n ?? 0;
    const res = await c.env.DB.prepare(
      `SELECT id, title, instructor, cohort, course_slug, cohort_id, instructor_user_id, meeting_url, status, starts_at
         FROM live_sessions
        WHERE ${whereClause} ${decodedCursor ? "AND id > ?" : ""}
        ORDER BY id ASC LIMIT ?`,
    )
      .bind(user.id, user.id, ...(decodedCursor ? [decodedCursor] : []), limit)
      .all<SessionRow>();
    rows = res.results;
  }

  const items: ApiLiveSession[] = rows.map(mapSessionRow);
  const result: Paginated<ApiLiveSession> = paginate(items, total, (last) =>
    base64UrlEncode(last.id),
  );
  if (items.length < limit) delete result.nextCursor;
  return c.json(result);
});

live.get("/classes/:id", async (c) => {
  const row = await requireLiveAccess(c.env.DB, c.get("authUser"), c.req.param("id"));
  return c.json(mapSessionRow(row));
});

/* ---------------- class chat (persisted alongside realtime fan-out) ---------------- */

live.get("/classes/:id/chat", async (c) => {
  const { cursor, limit } = parsePagination(c);
  const classId = c.req.param("id");
  await requireLiveAccess(c.env.DB, c.get("authUser"), classId);

  const total = await c.env.DB.prepare(
    `SELECT COUNT(*) AS n FROM realtime_messages WHERE room_id = ? AND channel = 'live'`,
  )
    .bind(classId)
    .first<{ n: number }>();
  const rows = await c.env.DB.prepare(
    `SELECT id, room_id, channel, user_id, user_name, body, created_at FROM realtime_messages
      WHERE room_id = ? AND channel = 'live' ${cursor ? "AND id > ?" : ""} ORDER BY rowid ASC LIMIT ?`,
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
  if (items.length < limit) delete result.nextCursor;
  return c.json(result);
});

live.post("/classes/:id/chat", async (c) => {
  const classId = c.req.param("id");
  const user = c.get("authUser");
  await requireLiveAccess(c.env.DB, user, classId);

  const { body } = await parseBody(
    c,
    z.object({ body: z.string().trim().min(1, "Message body is required.").max(4000) }).strict(),
  );

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
  await requireLiveAccess(c.env.DB, c.get("authUser"), classId);

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
  if (items.length < limit) delete result.nextCursor;
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
  const user = c.get("authUser");
  await requireLiveManage(c.env.DB, user, classId);

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
    .bind(id, classId, question, JSON.stringify(options), user.id)
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
  const { id: classId, pollId } = c.req.param();
  const user = c.get("authUser");
  await requireLiveAccess(c.env.DB, user, classId);

  const poll = await c.env.DB.prepare(
    `SELECT id, options, status FROM live_polls WHERE id = ? AND class_id = ?`,
  )
    .bind(pollId, classId)
    .first<{ id: string; options: string; status: string }>();
  if (!poll) throw ApiError.notFound("Poll not found.");
  if (poll.status !== "open") throw ApiError.conflict("This poll is closed.");

  const input = (await c.req.json().catch(() => ({}))) as { option?: string };
  const option = (input.option ?? "").trim();
  const options = (JSON.parse(poll.options) ?? []) as string[];
  if (!options.includes(option)) throw ApiError.validation({ option: ["Unknown option."] });

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
    class_id: classId,
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
  await requireLiveAccess(c.env.DB, c.get("authUser"), classId);

  const total = await c.env.DB.prepare(
    `SELECT COUNT(*) AS n FROM live_whiteboard_ops WHERE class_id = ?`,
  )
    .bind(classId)
    .first<{ n: number }>();
  const rows = await c.env.DB.prepare(
    `SELECT id, class_id, user_id, user_name, op, op_order, created_at FROM live_whiteboard_ops
      WHERE class_id = ? ${cursor ? "AND id > ?" : ""} ORDER BY op_order ASC, id ASC LIMIT ?`,
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
  if (items.length < limit) delete result.nextCursor;
  return c.json(result);
});

live.post("/classes/:id/whiteboard/ops", requireInstructorOrAdmin, async (c) => {
  const classId = c.req.param("id");
  const user = c.get("authUser");
  await requireLiveManage(c.env.DB, user, classId);

  const input = (await c.req.json().catch(() => ({}))) as { op?: Record<string, unknown> };
  if (!input.op || typeof input.op !== "object") {
    throw ApiError.validation({ op: ["A whiteboard op object is required."] });
  }
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
  const classId = c.req.param("id");
  const user = c.get("authUser");
  await requireLiveAccess(c.env.DB, user, classId);

  if (c.req.header("upgrade")?.toLowerCase() !== "websocket") {
    return c.json(
      { error: { code: "UPGRADE_REQUIRED", message: "A WebSocket upgrade is required." } },
      426,
    );
  }
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
      "x-cea-session-id": c.get("authSession").id,
      "x-cea-role-key": user.roleKey,
      "x-cea-room-id": classId,
    },
  });
  return stub.fetch(upgrade);
});

const meetingUrlSchema = z
  .string()
  .trim()
  .max(400)
  .refine(
    (v) => {
      if (!v) return true;
      try {
        const u = new URL(v);
        return u.protocol === "https:";
      } catch {
        return false;
      }
    },
    { message: "Meeting link must use https://." },
  );

const createClassSchema = z.object({
  title: z.string().trim().min(1, "Title is required.").max(200),
  courseSlug: z.string().trim().min(1, "Course is required.").max(120),
  cohortId: z.string().trim().max(80).optional().default(""),
  cohort: z.string().trim().max(120).optional().default(""),
  meetingUrl: meetingUrlSchema.optional().default(""),
  startsAt: z.string().trim().min(1, "Start time is required."),
  status: z.enum(["scheduled", "live", "ended"]).optional().default("scheduled"),
});

const patchClassSchema = z.object({
  status: z.enum(["scheduled", "live", "ended"], { message: "Invalid class status." }).optional(),
  meetingUrl: meetingUrlSchema.optional(),
});

/** Instructor/admin: schedule a live class bound to a real course & instructor. */
live.post("/classes", requireInstructorOrAdmin, async (c) => {
  const user = c.get("authUser");
  const body = await parseBody(c, createClassSchema);

  const course = await c.env.DB.prepare(`SELECT slug, cohort FROM courses WHERE slug = ?`)
    .bind(body.courseSlug)
    .first<{ slug: string; cohort: string }>();
  if (!course) {
    throw ApiError.validation({ courseSlug: ["Unknown course slug."] });
  }

  if (user.roleKey !== "admin") {
    const assigned = await c.env.DB.prepare(
      `SELECT 1 AS ok FROM assignment_roster_grants
        WHERE instructor_id = ? AND course_slug = ? AND active = 1 AND expires_at > ?
        LIMIT 1`,
    )
      .bind(user.id, course.slug, isoNow())
      .first<{ ok: number }>();
    if (!assigned) {
      throw ApiError.forbidden("You are not assigned to teach this course.");
    }
  }

  const id = crypto.randomUUID();
  const cohortLabel = body.cohort || course.cohort;
  await c.env.DB.prepare(
    `INSERT INTO live_sessions (id, title, instructor, cohort, course_slug, cohort_id, instructor_user_id, meeting_url, status, starts_at, sort_order)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)`,
  )
    .bind(
      id,
      body.title,
      user.name,
      cohortLabel,
      course.slug,
      body.cohortId,
      user.id,
      body.meetingUrl,
      body.status,
      body.startsAt,
    )
    .run();
  return c.json(
    {
      id,
      title: body.title,
      instructor: user.name,
      cohort: cohortLabel,
      courseSlug: course.slug,
      cohortId: body.cohortId,
      ...(body.meetingUrl ? { meetingUrl: body.meetingUrl } : {}),
      status: body.status,
      startsAt: body.startsAt,
    } satisfies ApiLiveSession,
    201,
  );
});

/** Instructor/admin: move a class through scheduled → live → ended or update meeting link. */
live.patch("/classes/:id", requireInstructorOrAdmin, async (c) => {
  const input = await parseBody(c, patchClassSchema);
  const id = c.req.param("id");
  const existing = await requireLiveManage(c.env.DB, c.get("authUser"), id);

  const nextStatus = input.status ?? existing.status;
  const nextMeetingUrl = input.meetingUrl !== undefined ? input.meetingUrl : existing.meeting_url;

  await c.env.DB.prepare(`UPDATE live_sessions SET status = ?, meeting_url = ? WHERE id = ?`)
    .bind(nextStatus, nextMeetingUrl, id)
    .run();
  return c.json({ ok: true, id, status: nextStatus, meetingUrl: nextMeetingUrl });
});
