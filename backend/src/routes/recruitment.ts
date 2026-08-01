import { Hono } from "hono";
import type { AppEnv } from "../types";
import { base64UrlDecode, base64UrlEncode } from "../lib/crypto";
import { paginate, parsePagination, type Paginated } from "../lib/pagination";
import { requireAuth } from "../lib/auth";

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

recruitment.get("/postings", async (c) => {
  const { cursor, limit } = parsePagination(c);
  const total = await c.env.DB.prepare(`SELECT COUNT(*) AS n FROM job_postings`).first<{
    n: number;
  }>();
  const rows = await c.env.DB.prepare(
    `SELECT id, title, applicants, views, posted, status, detail, tone FROM job_postings
      ${cursor ? "WHERE id > ?" : ""} ORDER BY id ASC LIMIT ?`,
  )
    .bind(...(cursor ? [base64UrlDecode(cursor) ?? ""] : []), limit)
    .all<JobPostingRow>();
  const items: ApiJobPosting[] = rows.results.map((r) => ({ ...r }));
  const result: Paginated<ApiJobPosting> = paginate(items, total?.n ?? 0, (last) =>
    base64UrlEncode(last.id),
  );
  return c.json(result);
});

recruitment.get("/postings/:id/candidates", async (c) => {
  const postingId = c.req.param("id");
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
  const total = await c.env.DB.prepare(`SELECT COUNT(*) AS n FROM interviews`).first<{
    n: number;
  }>();
  const rows = await c.env.DB.prepare(
    `SELECT id, candidate, role, date, mode, status FROM interviews
      ${cursor ? "WHERE id > ?" : ""} ORDER BY id ASC LIMIT ?`,
  )
    .bind(...(cursor ? [base64UrlDecode(cursor) ?? ""] : []), limit)
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
