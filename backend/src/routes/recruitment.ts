import { Hono, type Context } from "hono";
import type { AppEnv } from "../types";
import { z } from "zod";
import { base64UrlDecode, base64UrlEncode, isoNow } from "../lib/crypto";
import { paginate, parsePagination, type Paginated } from "../lib/pagination";
import { requireAuth, requireAnyRole } from "../lib/auth";
import { ApiError } from "../lib/errors";
import { parseBody } from "../lib/validate";

export interface ApiJobPosting {
  id: string;
  title: string;
  applicants: number;
  views: number;
  posted: string;
  status: string;
  detail: string;
  tone: string;
}

export interface ApiPipelineCandidate {
  id: string;
  name: string;
  stage: string;
  detail: string;
  score: number;
}

export interface ApiInterview {
  id: string;
  candidate: string;
  role: string;
  date: string;
  mode: string;
  status: string;
}

export interface ApiTalentCandidate {
  id: string;
  name: string;
  program: string;
  score: number;
  stage: string;
  match: number;
  skills: string[];
  available: string;
}

interface JobPostingRow {
  id: string;
  title: string;
  applicants: number;
  views: number;
  posted: string;
  status: string;
  detail: string;
  tone: string;
}

interface PipelineCandidateRow {
  id: string;
  name: string;
  stage: string;
  detail: string;
  score: number;
}

interface InterviewRow {
  id: string;
  candidate: string;
  role: string;
  date: string;
  mode: string;
  status: string;
}

interface TalentCandidateRow {
  id: string;
  name: string;
  program: string;
  score: number;
  stage: string;
  match: number;
  skills: string;
  available: string;
}

export const recruitment = new Hono<{ Bindings: AppEnv }>();

recruitment.use("*", requireAuth);

/** Employers only ever see their own postings; HR and admin see everything. */
function ownerClause(c: Context<{ Bindings: AppEnv }>): { sql: string; bind: string } {
  const roleKey = c.get("authUser").roleKey;
  if (roleKey === "employer") {
    return { sql: "created_by = ?", bind: c.get("authUser").id };
  }
  return { sql: "1 = 1", bind: "" };
}

recruitment.get("/postings", async (c) => {
  const { cursor, limit } = parsePagination(c);
  const owner = ownerClause(c);
  const total = await c.env.DB.prepare(`SELECT COUNT(*) AS n FROM job_postings WHERE ${owner.sql}`)
    .bind(...(owner.bind ? [owner.bind] : []))
    .first<{ n: number }>();
  const rows = await c.env.DB.prepare(
    `SELECT id, title, applicants, views, posted, status, detail, tone FROM job_postings
      WHERE ${owner.sql}${cursor ? " AND id > ?" : ""} ORDER BY id ASC LIMIT ?`,
  )
    .bind(
      ...(owner.bind ? [owner.bind] : []),
      ...(cursor ? [base64UrlDecode(cursor) ?? ""] : []),
      limit,
    )
    .all<JobPostingRow>();
  const items: ApiJobPosting[] = rows.results.map((r) => ({ ...r }));
  const result: Paginated<ApiJobPosting> = paginate(items, total?.n ?? 0, (last) =>
    base64UrlEncode(last.id),
  );
  return c.json(result);
});

/** Guards a posting id for employer role (owning employer or staff). */
async function assertPostingAccess(
  c: Context<{ Bindings: AppEnv }>,
  postingId: string,
): Promise<void> {
  const user = c.get("authUser");
  const row = await c.env.DB.prepare(`SELECT id, created_by FROM job_postings WHERE id = ?`)
    .bind(postingId)
    .first<{ id: string; created_by: string }>();
  if (!row) throw ApiError.notFound("Posting not found.");
  if (user.roleKey === "employer" && row.created_by !== user.id) {
    throw ApiError.forbidden("You can only access your own postings.");
  }
}

recruitment.get("/postings/:id/candidates", async (c) => {
  const postingId = c.req.param("id");
  await assertPostingAccess(c, postingId);
  const { cursor, limit } = parsePagination(c);
  const total = await c.env.DB.prepare(
    `SELECT COUNT(*) AS n FROM pipeline_candidates WHERE job_id = ?`,
  )
    .bind(postingId)
    .first<{ n: number }>();
  const rows = await c.env.DB.prepare(
    `SELECT id, name, stage, detail, score FROM pipeline_candidates
      WHERE job_id = ?${cursor ? " AND id > ?" : ""} ORDER BY id ASC LIMIT ?`,
  )
    .bind(postingId, ...(cursor ? [base64UrlDecode(cursor) ?? ""] : []), limit)
    .all<PipelineCandidateRow>();
  const items: ApiPipelineCandidate[] = rows.results.map((r) => ({ ...r }));
  const result: Paginated<ApiPipelineCandidate> = paginate(items, total?.n ?? 0, (last) =>
    base64UrlEncode(last.id),
  );
  return c.json(result);
});

recruitment.get("/interviews", async (c) => {
  const { cursor, limit } = parsePagination(c);
  const owner = ownerClause(c);
  const total = await c.env.DB.prepare(`SELECT COUNT(*) AS n FROM interviews WHERE ${owner.sql}`)
    .bind(...(owner.bind ? [owner.bind] : []))
    .first<{ n: number }>();
  const rows = await c.env.DB.prepare(
    `SELECT id, candidate, role, date, mode, status FROM interviews
      WHERE ${owner.sql}${cursor ? " AND id > ?" : ""} ORDER BY id ASC LIMIT ?`,
  )
    .bind(
      ...(owner.bind ? [owner.bind] : []),
      ...(cursor ? [base64UrlDecode(cursor) ?? ""] : []),
      limit,
    )
    .all<InterviewRow>();
  const items: ApiInterview[] = rows.results.map((r) => ({ ...r }));
  const result: Paginated<ApiInterview> = paginate(items, total?.n ?? 0, (last) =>
    base64UrlEncode(last.id),
  );
  return c.json(result);
});

recruitment.get("/talent", async (c) => {
  const { cursor, limit } = parsePagination(c);
  const total = await c.env.DB.prepare(`SELECT COUNT(*) AS n FROM talent_candidates`).first<{
    n: number;
  }>();
  const rows = await c.env.DB.prepare(
    `SELECT id, name, program, score, stage, match, skills, available FROM talent_candidates
      ${cursor ? "WHERE id > ?" : ""} ORDER BY id ASC LIMIT ?`,
  )
    .bind(...(cursor ? [base64UrlDecode(cursor) ?? ""] : []), limit)
    .all<TalentCandidateRow>();
  const items: ApiTalentCandidate[] = rows.results.map((r) => ({
    id: r.id,
    name: r.name,
    program: r.program,
    score: r.score,
    stage: r.stage,
    match: r.match,
    skills: JSON.parse(r.skills) as string[],
    available: r.available,
  }));
  const result: Paginated<ApiTalentCandidate> = paginate(items, total?.n ?? 0, (last) =>
    base64UrlEncode(last.id),
  );
  return c.json(result);
});

const postingSchema = z.object({
  title: z.string().trim().min(1, "Title is required.").max(200),
  detail: z.string().trim().max(5_000).optional(),
  tone: z.string().trim().max(200).optional(),
});

/** Employer/HR/admin: publish a job posting. */
recruitment.post("/postings", requireAnyRole(["employer", "hr", "admin"]), async (c) => {
  const user = c.get("authUser");
  const body = await parseBody(c, postingSchema);
  const id = crypto.randomUUID();
  await c.env.DB.prepare(
    `INSERT INTO job_postings (id, title, detail, tone, status, applicants, views, posted, created_by, sort_order)
     VALUES (?, ?, ?, ?, 'open', 0, 0, ?, ?, 0)`,
  )
    .bind(id, body.title, body.detail ?? "", body.tone ?? "", isoNow(), user.id)
    .run();
  return c.json(
    { ok: true, id, title: body.title, applicants: 0, views: 0, posted: isoNow(), status: "open" },
    201,
  );
});

const postingPatchSchema = z
  .object({
    title: z.string().trim().min(1, "Title is required.").max(200).optional(),
    detail: z.string().trim().max(5_000).optional(),
    status: z.enum(["open", "closed"], { message: "Invalid posting status." }).optional(),
  })
  .refine(
    (body) => body.title !== undefined || body.detail !== undefined || body.status !== undefined,
    {
      message: "Provide a title, detail or status to update.",
    },
  );

/** Employer/HR/admin: edit a posting or open/close it. */
recruitment.patch("/postings/:id", requireAnyRole(["employer", "hr", "admin"]), async (c) => {
  const body = await parseBody(c, postingPatchSchema);
  const id = c.req.param("id");
  await assertPostingAccess(c, id);
  await c.env.DB.prepare(
    `UPDATE job_postings
        SET title = COALESCE(?, title), detail = COALESCE(?, detail), status = COALESCE(?, status)
      WHERE id = ?`,
  )
    .bind(body.title ?? null, body.detail ?? null, body.status ?? null, id)
    .run();
  const updated = await c.env.DB.prepare(
    `SELECT id, title, detail, status FROM job_postings WHERE id = ?`,
  )
    .bind(id)
    .first<{ id: string; title: string; detail: string; status: string }>();
  return c.json({ ok: true, ...updated });
});

const advanceCandidateSchema = z.object({
  stage: z.string().trim().min(1, "Stage is required.").max(120),
});

/** Employer/HR/admin: move a candidate through the pipeline. */
recruitment.patch(
  "/postings/:id/candidates/:candidateId",
  requireAnyRole(["employer", "hr", "admin"]),
  async (c) => {
    const { stage } = await parseBody(c, advanceCandidateSchema);
    const { id: postingId, candidateId } = c.req.param();
    await assertPostingAccess(c, postingId);
    const row = await c.env.DB.prepare(
      `SELECT id FROM pipeline_candidates WHERE id = ? AND job_id = ?`,
    )
      .bind(candidateId, postingId)
      .first<{ id: string }>();
    if (!row) throw ApiError.notFound("Candidate not found for this posting.");
    await c.env.DB.prepare(`UPDATE pipeline_candidates SET stage = ? WHERE id = ?`)
      .bind(stage, candidateId)
      .run();
    return c.json({ ok: true, id: candidateId, stage });
  },
);

const interviewSchema = z.object({
  candidate: z.string().trim().min(1, "Candidate is required.").max(200),
  role: z.string().trim().min(1, "Role is required.").max(200),
  date: z.string().trim().min(1, "Date is required."),
  mode: z.enum(["virtual", "onsite"], { message: "Invalid interview mode." }).optional(),
});

/** Employer/HR/admin: schedule an interview. */
recruitment.post("/interviews", requireAnyRole(["employer", "hr", "admin"]), async (c) => {
  const user = c.get("authUser");
  const body = await parseBody(c, interviewSchema);
  const id = crypto.randomUUID();
  await c.env.DB.prepare(
    `INSERT INTO interviews (id, candidate, role, date, mode, status, created_by, sort_order) VALUES (?, ?, ?, ?, ?, 'scheduled', ?, 0)`,
  )
    .bind(id, body.candidate, body.role, body.date, body.mode ?? "virtual", user.id)
    .run();
  return c.json(
    {
      ok: true,
      id,
      candidate: body.candidate,
      role: body.role,
      date: body.date,
      mode: body.mode ?? "virtual",
      status: "scheduled",
    },
    201,
  );
});
