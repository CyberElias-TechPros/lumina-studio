import { Hono } from "hono";
import type { AppEnv } from "../types";
import { ApiError } from "../lib/errors";
import { base64UrlDecode, base64UrlEncode } from "../lib/crypto";
import { paginate, parsePagination, type Paginated } from "../lib/pagination";

export interface ApiProgram {
  slug: string;
  title: string;
  category: string;
  engine: string;
  level: string;
  duration: string;
  mode: string;
  price: number;
  rating: number;
  learners: number;
  blurb: string;
  outcomes: string[];
  modules: { title: string; lessons: number; hours: number }[];
  tools: string[];
}

const PROGRAM_SELECT = `
  SELECT slug, title, category, engine_key, level, duration, mode,
         price, rating, learners, blurb, outcomes, modules, tools
    FROM programs
`;

function mapRow(row: {
  slug: string;
  title: string;
  category: string;
  engine_key: string;
  level: string;
  duration: string;
  mode: string;
  price: number;
  rating: number;
  learners: number;
  blurb: string;
  outcomes: string;
  modules: string;
  tools: string;
}): ApiProgram {
  return {
    slug: row.slug,
    title: row.title,
    category: row.category,
    engine: row.engine_key,
    level: row.level,
    duration: row.duration,
    mode: row.mode,
    price: row.price,
    rating: row.rating,
    learners: row.learners,
    blurb: row.blurb,
    outcomes: JSON.parse(row.outcomes),
    modules: JSON.parse(row.modules),
    tools: JSON.parse(row.tools),
  };
}

export const programs = new Hono<{ Bindings: AppEnv }>();

programs.get("/", async (c) => {
  const { cursor, limit } = parsePagination(c);
  const total = await c.env.DB.prepare(`SELECT COUNT(*) AS n FROM programs`).first<{ n: number }>();

  const rows = await c.env.DB.prepare(
    `${PROGRAM_SELECT} ${cursor ? "WHERE slug > ?" : ""} ORDER BY slug ASC LIMIT ?`,
  )
    .bind(...(cursor ? [base64UrlDecode(cursor) ?? ""] : []), limit)
    .all<{
      slug: string;
      title: string;
      category: string;
      engine_key: string;
      level: string;
      duration: string;
      mode: string;
      price: number;
      rating: number;
      learners: number;
      blurb: string;
      outcomes: string;
      modules: string;
      tools: string;
    }>();

  const items = rows.results.map(mapRow);
  const result: Paginated<ApiProgram> = paginate(items, total?.n ?? 0, (last) => base64UrlEncode(last.slug));
  return c.json(result);
});

programs.get("/:slug", async (c) => {
  const row = await c.env.DB.prepare(`${PROGRAM_SELECT} WHERE slug = ?`)
    .bind(c.req.param("slug"))
    .first();
  if (!row) throw ApiError.notFound("Program not found.");
  return c.json(mapRow(row as Parameters<typeof mapRow>[0]));
});
