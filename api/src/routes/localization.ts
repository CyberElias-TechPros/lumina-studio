import { Hono } from "hono";
import type { AppEnv } from "../types";
import { base64UrlDecode, base64UrlEncode } from "../lib/crypto";
import { paginate, parsePagination, type Paginated } from "../lib/pagination";
import { requireAuth } from "../lib/auth";

export interface ApiLocalizationProject {
  id: string;
  name: string;
  desc: string;
  path: string;
  tone: string;
}

export interface ApiGlossaryTerm {
  id: string;
  term: string;
  definition: string;
  usage: string;
  culturalNotes: string;
  status: string;
}

export interface ApiStyleGuide {
  id: string;
  market: string;
  dos: string[];
  donts: string[];
  status: string;
}

export interface ApiTranslationMemoryPair {
  id: string;
  source: string;
  target: string;
  locale: string;
  match: number;
  status: string;
}

export interface ApiDialectGroup {
  id: string;
  group: string;
  variants: string[];
  coverage: number;
  status: string;
}

export interface ApiCopyVariant {
  id: string;
  name: string;
  code: string;
  toneNotes: string;
  status: string;
}

export interface ApiMarketAnalyticsRow {
  id: string;
  name: string;
  conversion: string;
  engagement: string;
  pct: number;
  trend: string;
  tone: string;
}

export interface ApiPreviewBlock {
  id: string;
  en: string;
  yo: string;
  enSub: string;
  yoSub: string;
}

export interface ApiLocalizationStat {
  id: string;
  page: string;
  label: string;
  value: string;
  delta: string;
}

interface ProjectRow {
  id: string;
  name: string;
  description: string;
  path: string;
  tone: string;
}

interface TermRow {
  id: string;
  term: string;
  definition: string;
  usage: string;
  cultural_notes: string;
  status: string;
}

interface StyleGuideRow {
  id: string;
  market: string;
  dos: string;
  donts: string;
  status: string;
}

interface TranslationMemoryRow {
  id: string;
  source: string;
  target: string;
  locale: string;
  match_pct: number;
  status: string;
}

interface DialectRow {
  id: string;
  group_name: string;
  variants: string;
  coverage: number;
  status: string;
}

interface VariantRow {
  id: string;
  name: string;
  code: string;
  tone_notes: string;
  status: string;
}

interface MarketRow {
  id: string;
  name: string;
  conversion: string;
  engagement: string;
  pct: number;
  trend: string;
  tone: string;
}

interface PreviewRow {
  id: string;
  en: string;
  yo: string;
  en_sub: string;
  yo_sub: string;
}

interface StatRow {
  id: string;
  page: string;
  label: string;
  value: string;
  delta: string;
}

export const localization = new Hono<{ Bindings: AppEnv }>();

localization.use("*", requireAuth);

localization.get("/projects", async (c) => {
  const { cursor, limit } = parsePagination(c);
  const total = await c.env.DB.prepare(`SELECT COUNT(*) AS n FROM localization_projects`).first<{
    n: number;
  }>();
  const rows = await c.env.DB.prepare(
    `SELECT id, name, description, path, tone FROM localization_projects
      ${cursor ? "WHERE id > ?" : ""} ORDER BY id ASC LIMIT ?`,
  )
    .bind(...(cursor ? [base64UrlDecode(cursor) ?? ""] : []), limit)
    .all<ProjectRow>();
  const items: ApiLocalizationProject[] = rows.results.map((r) => ({
    id: r.id,
    name: r.name,
    desc: r.description,
    path: r.path,
    tone: r.tone,
  }));
  const result: Paginated<ApiLocalizationProject> = paginate(items, total?.n ?? 0, (last) =>
    base64UrlEncode(last.id),
  );
  return c.json(result);
});

localization.get("/glossary", async (c) => {
  const { cursor, limit } = parsePagination(c);
  const total = await c.env.DB.prepare(`SELECT COUNT(*) AS n FROM glossary_terms`).first<{
    n: number;
  }>();
  const rows = await c.env.DB.prepare(
    `SELECT id, term, definition, usage, cultural_notes, status FROM glossary_terms
      ${cursor ? "WHERE id > ?" : ""} ORDER BY id ASC LIMIT ?`,
  )
    .bind(...(cursor ? [base64UrlDecode(cursor) ?? ""] : []), limit)
    .all<TermRow>();
  const items: ApiGlossaryTerm[] = rows.results.map((r) => ({
    id: r.id,
    term: r.term,
    definition: r.definition,
    usage: r.usage,
    culturalNotes: r.cultural_notes,
    status: r.status,
  }));
  const result: Paginated<ApiGlossaryTerm> = paginate(items, total?.n ?? 0, (last) =>
    base64UrlEncode(last.id),
  );
  return c.json(result);
});

localization.get("/style-guides", async (c) => {
  const { cursor, limit } = parsePagination(c);
  const total = await c.env.DB.prepare(`SELECT COUNT(*) AS n FROM style_guides`).first<{
    n: number;
  }>();
  const rows = await c.env.DB.prepare(
    `SELECT id, market, dos, donts, status FROM style_guides
      ${cursor ? "WHERE id > ?" : ""} ORDER BY id ASC LIMIT ?`,
  )
    .bind(...(cursor ? [base64UrlDecode(cursor) ?? ""] : []), limit)
    .all<StyleGuideRow>();
  const items: ApiStyleGuide[] = rows.results.map((r) => ({
    id: r.id,
    market: r.market,
    dos: JSON.parse(r.dos) as string[],
    donts: JSON.parse(r.donts) as string[],
    status: r.status,
  }));
  const result: Paginated<ApiStyleGuide> = paginate(items, total?.n ?? 0, (last) =>
    base64UrlEncode(last.id),
  );
  return c.json(result);
});

localization.get("/translation-memory", async (c) => {
  const { cursor, limit } = parsePagination(c);
  const total = await c.env.DB.prepare(`SELECT COUNT(*) AS n FROM translation_memory`).first<{
    n: number;
  }>();
  const rows = await c.env.DB.prepare(
    `SELECT id, source, target, locale, match_pct, status FROM translation_memory
      ${cursor ? "WHERE id > ?" : ""} ORDER BY id ASC LIMIT ?`,
  )
    .bind(...(cursor ? [base64UrlDecode(cursor) ?? ""] : []), limit)
    .all<TranslationMemoryRow>();
  const items: ApiTranslationMemoryPair[] = rows.results.map((r) => ({
    id: r.id,
    source: r.source,
    target: r.target,
    locale: r.locale,
    match: r.match_pct,
    status: r.status,
  }));
  const result: Paginated<ApiTranslationMemoryPair> = paginate(items, total?.n ?? 0, (last) =>
    base64UrlEncode(last.id),
  );
  return c.json(result);
});

localization.get("/dialects", async (c) => {
  const { cursor, limit } = parsePagination(c);
  const total = await c.env.DB.prepare(`SELECT COUNT(*) AS n FROM dialect_groups`).first<{
    n: number;
  }>();
  const rows = await c.env.DB.prepare(
    `SELECT id, group_name, variants, coverage, status FROM dialect_groups
      ${cursor ? "WHERE id > ?" : ""} ORDER BY id ASC LIMIT ?`,
  )
    .bind(...(cursor ? [base64UrlDecode(cursor) ?? ""] : []), limit)
    .all<DialectRow>();
  const items: ApiDialectGroup[] = rows.results.map((r) => ({
    id: r.id,
    group: r.group_name,
    variants: JSON.parse(r.variants) as string[],
    coverage: r.coverage,
    status: r.status,
  }));
  const result: Paginated<ApiDialectGroup> = paginate(items, total?.n ?? 0, (last) =>
    base64UrlEncode(last.id),
  );
  return c.json(result);
});

localization.get("/variants", async (c) => {
  const { cursor, limit } = parsePagination(c);
  const total = await c.env.DB.prepare(`SELECT COUNT(*) AS n FROM copy_variants`).first<{
    n: number;
  }>();
  const rows = await c.env.DB.prepare(
    `SELECT id, name, code, tone_notes, status FROM copy_variants
      ${cursor ? "WHERE id > ?" : ""} ORDER BY id ASC LIMIT ?`,
  )
    .bind(...(cursor ? [base64UrlDecode(cursor) ?? ""] : []), limit)
    .all<VariantRow>();
  const items: ApiCopyVariant[] = rows.results.map((r) => ({
    id: r.id,
    name: r.name,
    code: r.code,
    toneNotes: r.tone_notes,
    status: r.status,
  }));
  const result: Paginated<ApiCopyVariant> = paginate(items, total?.n ?? 0, (last) =>
    base64UrlEncode(last.id),
  );
  return c.json(result);
});

localization.get("/analytics", async (c) => {
  const { cursor, limit } = parsePagination(c);
  const total = await c.env.DB.prepare(`SELECT COUNT(*) AS n FROM localization_markets`).first<{
    n: number;
  }>();
  const rows = await c.env.DB.prepare(
    `SELECT id, name, conversion, engagement, pct, trend, tone FROM localization_markets
      ${cursor ? "WHERE id > ?" : ""} ORDER BY id ASC LIMIT ?`,
  )
    .bind(...(cursor ? [base64UrlDecode(cursor) ?? ""] : []), limit)
    .all<MarketRow>();
  const items: ApiMarketAnalyticsRow[] = rows.results.map((r) => ({ ...r }));
  const result: Paginated<ApiMarketAnalyticsRow> = paginate(items, total?.n ?? 0, (last) =>
    base64UrlEncode(last.id),
  );
  return c.json(result);
});

localization.get("/preview", async (c) => {
  const { cursor, limit } = parsePagination(c);
  const total = await c.env.DB.prepare(`SELECT COUNT(*) AS n FROM preview_blocks`).first<{
    n: number;
  }>();
  const rows = await c.env.DB.prepare(
    `SELECT id, en, yo, en_sub, yo_sub FROM preview_blocks
      ${cursor ? "WHERE id > ?" : ""} ORDER BY id ASC LIMIT ?`,
  )
    .bind(...(cursor ? [base64UrlDecode(cursor) ?? ""] : []), limit)
    .all<PreviewRow>();
  const items: ApiPreviewBlock[] = rows.results.map((r) => ({
    id: r.id,
    en: r.en,
    yo: r.yo,
    enSub: r.en_sub,
    yoSub: r.yo_sub,
  }));
  const result: Paginated<ApiPreviewBlock> = paginate(items, total?.n ?? 0, (last) =>
    base64UrlEncode(last.id),
  );
  return c.json(result);
});

localization.get("/kpis", async (c) => {
  const { cursor, limit } = parsePagination(c);
  const total = await c.env.DB.prepare(`SELECT COUNT(*) AS n FROM localization_stats`).first<{
    n: number;
  }>();
  const rows = await c.env.DB.prepare(
    `SELECT id, page, label, value, delta FROM localization_stats
      ${cursor ? "WHERE id > ?" : ""} ORDER BY id ASC LIMIT ?`,
  )
    .bind(...(cursor ? [base64UrlDecode(cursor) ?? ""] : []), limit)
    .all<StatRow>();
  const items: ApiLocalizationStat[] = rows.results.map((r) => ({ ...r }));
  const result: Paginated<ApiLocalizationStat> = paginate(items, total?.n ?? 0, (last) =>
    base64UrlEncode(last.id),
  );
  return c.json(result);
});
