import { Hono } from "hono";
import type { AppEnv } from "../types";
import { z } from "zod";
import { base64UrlDecode, base64UrlEncode, isoNow } from "../lib/crypto";
import { ApiError } from "../lib/errors";
import { paginate, parsePagination } from "../lib/pagination";
import { requireAuth, requireAnyRole } from "../lib/auth";
import { parseBody } from "../lib/validate";

export interface ApiMentorProfile {
  id: string;
  name: string;
  focus: string;
  bio: string;
  skills: string[];
  areas: string[];
  availability: string;
  rating: number;
  sessionsCount: number;
}

interface MentorProfileRow {
  id: string;
  name: string;
  focus: string;
  bio: string;
  skills: string;
  areas: string;
  availability: string;
  rating: number;
  sessions_count: number;
}

function toProfile(row: MentorProfileRow): ApiMentorProfile {
  return {
    id: row.id,
    name: row.name,
    focus: row.focus,
    bio: row.bio,
    skills: JSON.parse(row.skills) as string[],
    areas: JSON.parse(row.areas) as string[],
    availability: row.availability,
    rating: row.rating,
    sessionsCount: row.sessions_count,
  };
}

export const mentor = new Hono<{ Bindings: AppEnv }>();

mentor.use("*", requireAuth, requireAnyRole(["student", "alumni", "mentor", "admin"]));

mentor.get("/profiles", async (c) => {
  const { cursor, limit } = parsePagination(c);
  const total = await c.env.DB.prepare(`SELECT COUNT(*) AS n FROM mentor_profiles`).first<{
    n: number;
  }>();
  const rows = await c.env.DB.prepare(
    `SELECT id, name, focus, bio, skills, areas, availability, rating, sessions_count
       FROM mentor_profiles
       ${cursor ? "WHERE id > ?" : ""} ORDER BY id ASC LIMIT ?`,
  )
    .bind(...(cursor ? [base64UrlDecode(cursor) ?? ""] : []), limit)
    .all<MentorProfileRow>();
  const items = rows.results.map(toProfile);
  return c.json(paginate(items, total?.n ?? 0, (last) => base64UrlEncode(last.id)));
});

const matchSchema = z.object({
  program: z.string().trim().max(120).optional(),
  goal: z.string().trim().max(500).optional(),
});

/** Rule-based mentor matchmaking: keyword overlap between the request and
 *  each mentor's focus, areas and skills, softened by rating. */
const requestSchema = z.object({
  mentorId: z.string().trim().min(1).max(120),
  goal: z.string().trim().min(1).max(500),
  program: z.string().trim().max(120).optional(),
});

/** Student/alumni: request a specific mentor; requests are stored for review. */
mentor.post("/requests", async (c) => {
  const user = c.get("authUser");
  const input = await parseBody(c, requestSchema);
  const profile = await c.env.DB.prepare(`SELECT id, name FROM mentor_profiles WHERE id = ?`)
    .bind(input.mentorId)
    .first<{ id: string; name: string }>();
  if (!profile) throw ApiError.notFound("Mentor not found.");

  const existing = await c.env.DB.prepare(
    `SELECT id, status FROM mentor_requests WHERE userId = ? AND mentor_id = ? AND status = 'pending'`,
  )
    .bind(user.id, input.mentorId)
    .first<{ id: string; status: string }>();
  if (existing) {
    return c.json({ ok: true, alreadyRequested: true, id: existing.id, mentor: profile.name });
  }

  const id = crypto.randomUUID();
  await c.env.DB.prepare(
    `INSERT INTO mentor_requests
      (id, userId, mentor_id, studentName, goal, program, status, created_at, sort_order)
     VALUES (?, ?, ?, ?, ?, ?, 'pending', ?, ?)`,
  )
    .bind(
      id,
      user.id,
      input.mentorId,
      user.name,
      input.goal,
      input.program ?? "",
      isoNow(),
      Date.now(),
    )
    .run();
  return c.json({ ok: true, alreadyRequested: false, id, mentor: profile.name }, 201);
});

mentor.post("/match", async (c) => {
  const body = await parseBody(c, matchSchema);
  const keywords = [...(body.program ?? "").split(/\s+/), ...(body.goal ?? "").split(/\s+/)]
    .map((w) => w.toLowerCase().replace(/[^a-z0-9]/g, ""))
    .filter((w) => w.length > 2 && !["with", "and", "the", "for", "into"].includes(w));

  const rows = await c.env.DB.prepare(
    `SELECT id, name, focus, bio, skills, areas, availability, rating, sessions_count
       FROM mentor_profiles ORDER BY rating DESC LIMIT 200`,
  ).all<MentorProfileRow>();

  const scored = rows.results.map((row) => {
    const profile = toProfile(row);
    const haystack = [profile.focus, ...profile.areas, ...profile.skills].join(" ").toLowerCase();
    const hits =
      keywords.length > 0
        ? keywords.filter((w) => haystack.includes(w)).length
        : profile.areas.length > 0
          ? 1
          : 0;
    const raw = keywords.length > 0 ? Math.round((hits / keywords.length) * 100) : 100;
    const score = Math.min(99, Math.max(40, Math.round(raw * 0.8 + (profile.rating ?? 0) * 10)));
    return { ...profile, match: score };
  });
  scored.sort((a, b) => b.match - a.match);
  return c.json({
    program: body.program ?? "",
    goal: body.goal ?? "",
    matches: scored.slice(0, 3),
  });
});
