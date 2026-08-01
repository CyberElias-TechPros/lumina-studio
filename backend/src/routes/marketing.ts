import { Hono } from "hono";
import type { AppEnv } from "../types";
import { base64UrlDecode, base64UrlEncode } from "../lib/crypto";
import { paginate, parsePagination, type Paginated } from "../lib/pagination";
import { requireAuth } from "../lib/auth";

export interface ApiMarketingKpi {
  id: string;
  page: string;
  label: string;
  value: string;
  delta: string;
}

export interface ApiCampaign {
  id: string;
  name: string;
  channel: string;
  spend: number;
  leads: number;
  roas: number;
  status: string;
}

export interface ApiEmailCampaign {
  id: string;
  title: string;
  recipients: number;
  openRate: number;
  status: string;
}

export interface ApiSocialPost {
  id: string;
  title: string;
  channel: string;
  date: string;
  status: string;
}

export interface ApiLandingPage {
  id: string;
  title: string;
  conversion: number;
  status: string;
}

export interface ApiSeoKeyword {
  id: string;
  keyword: string;
  position: number;
  delta: string;
}

export interface ApiContentItem {
  id: string;
  title: string;
  channel: string;
  date: string;
  status: string;
}

export interface ApiLead {
  id: string;
  name: string;
  score: number;
  detail: string;
}

export interface ApiReport {
  id: string;
  title: string;
  published: string;
}

export interface ApiFunnelStage {
  id: string;
  stage: string;
  value: number;
  pct: number;
}

interface KpiRow {
  id: string;
  page: string;
  label: string;
  value: string;
  delta: string;
}

interface CampaignRow {
  id: string;
  name: string;
  channel: string;
  spend: number;
  leads: number;
  roas: number;
  status: string;
}

interface EmailRow {
  id: string;
  title: string;
  recipients: number;
  open_rate: number;
  status: string;
}

interface SocialRow {
  id: string;
  title: string;
  channel: string;
  date: string;
  status: string;
}

interface LandingRow {
  id: string;
  title: string;
  conversion: number;
  status: string;
}

interface SeoRow {
  id: string;
  keyword: string;
  position: number;
  delta: string;
}

interface ContentRow {
  id: string;
  title: string;
  channel: string;
  date: string;
  status: string;
}

interface LeadRow {
  id: string;
  name: string;
  score: number;
  detail: string;
}

interface ReportRow {
  id: string;
  title: string;
  published: string;
}

interface FunnelRow {
  id: string;
  stage: string;
  value: number;
  pct: number;
}

export const marketing = new Hono<{ Bindings: AppEnv }>();

marketing.use("*", requireAuth);

marketing.get("/kpis", async (c) => {
  const { cursor, limit } = parsePagination(c);
  const total = await c.env.DB.prepare(`SELECT COUNT(*) AS n FROM marketing_kpis`).first<{
    n: number;
  }>();
  const rows = await c.env.DB.prepare(
    `SELECT id, page, label, value, delta FROM marketing_kpis
      ${cursor ? "WHERE id > ?" : ""} ORDER BY id ASC LIMIT ?`,
  )
    .bind(...(cursor ? [base64UrlDecode(cursor) ?? ""] : []), limit)
    .all<KpiRow>();
  const items: ApiMarketingKpi[] = rows.results.map((r) => ({ ...r }));
  const result: Paginated<ApiMarketingKpi> = paginate(items, total?.n ?? 0, (last) =>
    base64UrlEncode(last.id),
  );
  return c.json(result);
});

marketing.get("/campaigns", async (c) => {
  const { cursor, limit } = parsePagination(c);
  const total = await c.env.DB.prepare(`SELECT COUNT(*) AS n FROM campaigns`).first<{
    n: number;
  }>();
  const rows = await c.env.DB.prepare(
    `SELECT id, name, channel, spend, leads, roas, status FROM campaigns
      ${cursor ? "WHERE id > ?" : ""} ORDER BY id ASC LIMIT ?`,
  )
    .bind(...(cursor ? [base64UrlDecode(cursor) ?? ""] : []), limit)
    .all<CampaignRow>();
  const items: ApiCampaign[] = rows.results.map((r) => ({ ...r }));
  const result: Paginated<ApiCampaign> = paginate(items, total?.n ?? 0, (last) =>
    base64UrlEncode(last.id),
  );
  return c.json(result);
});

marketing.get("/email", async (c) => {
  const { cursor, limit } = parsePagination(c);
  const total = await c.env.DB.prepare(`SELECT COUNT(*) AS n FROM email_campaigns`).first<{
    n: number;
  }>();
  const rows = await c.env.DB.prepare(
    `SELECT id, title, recipients, open_rate, status FROM email_campaigns
      ${cursor ? "WHERE id > ?" : ""} ORDER BY id ASC LIMIT ?`,
  )
    .bind(...(cursor ? [base64UrlDecode(cursor) ?? ""] : []), limit)
    .all<EmailRow>();
  const items: ApiEmailCampaign[] = rows.results.map((r) => ({
    id: r.id,
    title: r.title,
    recipients: r.recipients,
    openRate: r.open_rate,
    status: r.status,
  }));
  const result: Paginated<ApiEmailCampaign> = paginate(items, total?.n ?? 0, (last) =>
    base64UrlEncode(last.id),
  );
  return c.json(result);
});

marketing.get("/social", async (c) => {
  const { cursor, limit } = parsePagination(c);
  const total = await c.env.DB.prepare(`SELECT COUNT(*) AS n FROM social_posts`).first<{
    n: number;
  }>();
  const rows = await c.env.DB.prepare(
    `SELECT id, title, channel, date, status FROM social_posts
      ${cursor ? "WHERE id > ?" : ""} ORDER BY id ASC LIMIT ?`,
  )
    .bind(...(cursor ? [base64UrlDecode(cursor) ?? ""] : []), limit)
    .all<SocialRow>();
  const items: ApiSocialPost[] = rows.results.map((r) => ({ ...r }));
  const result: Paginated<ApiSocialPost> = paginate(items, total?.n ?? 0, (last) =>
    base64UrlEncode(last.id),
  );
  return c.json(result);
});

marketing.get("/landing-pages", async (c) => {
  const { cursor, limit } = parsePagination(c);
  const total = await c.env.DB.prepare(`SELECT COUNT(*) AS n FROM landing_pages`).first<{
    n: number;
  }>();
  const rows = await c.env.DB.prepare(
    `SELECT id, title, conversion, status FROM landing_pages
      ${cursor ? "WHERE id > ?" : ""} ORDER BY id ASC LIMIT ?`,
  )
    .bind(...(cursor ? [base64UrlDecode(cursor) ?? ""] : []), limit)
    .all<LandingRow>();
  const items: ApiLandingPage[] = rows.results.map((r) => ({ ...r }));
  const result: Paginated<ApiLandingPage> = paginate(items, total?.n ?? 0, (last) =>
    base64UrlEncode(last.id),
  );
  return c.json(result);
});

marketing.get("/seo", async (c) => {
  const { cursor, limit } = parsePagination(c);
  const total = await c.env.DB.prepare(`SELECT COUNT(*) AS n FROM seo_keywords`).first<{
    n: number;
  }>();
  const rows = await c.env.DB.prepare(
    `SELECT id, keyword, position, delta FROM seo_keywords
      ${cursor ? "WHERE id > ?" : ""} ORDER BY id ASC LIMIT ?`,
  )
    .bind(...(cursor ? [base64UrlDecode(cursor) ?? ""] : []), limit)
    .all<SeoRow>();
  const items: ApiSeoKeyword[] = rows.results.map((r) => ({ ...r }));
  const result: Paginated<ApiSeoKeyword> = paginate(items, total?.n ?? 0, (last) =>
    base64UrlEncode(last.id),
  );
  return c.json(result);
});

marketing.get("/content-calendar", async (c) => {
  const { cursor, limit } = parsePagination(c);
  const total = await c.env.DB.prepare(`SELECT COUNT(*) AS n FROM content_calendar`).first<{
    n: number;
  }>();
  const rows = await c.env.DB.prepare(
    `SELECT id, title, channel, date, status FROM content_calendar
      ${cursor ? "WHERE id > ?" : ""} ORDER BY id ASC LIMIT ?`,
  )
    .bind(...(cursor ? [base64UrlDecode(cursor) ?? ""] : []), limit)
    .all<ContentRow>();
  const items: ApiContentItem[] = rows.results.map((r) => ({ ...r }));
  const result: Paginated<ApiContentItem> = paginate(items, total?.n ?? 0, (last) =>
    base64UrlEncode(last.id),
  );
  return c.json(result);
});

marketing.get("/leads", async (c) => {
  const { cursor, limit } = parsePagination(c);
  const total = await c.env.DB.prepare(`SELECT COUNT(*) AS n FROM leads`).first<{
    n: number;
  }>();
  const rows = await c.env.DB.prepare(
    `SELECT id, name, score, detail FROM leads
      ${cursor ? "WHERE id > ?" : ""} ORDER BY id ASC LIMIT ?`,
  )
    .bind(...(cursor ? [base64UrlDecode(cursor) ?? ""] : []), limit)
    .all<LeadRow>();
  const items: ApiLead[] = rows.results.map((r) => ({ ...r }));
  const result: Paginated<ApiLead> = paginate(items, total?.n ?? 0, (last) =>
    base64UrlEncode(last.id),
  );
  return c.json(result);
});

marketing.get("/reports", async (c) => {
  const { cursor, limit } = parsePagination(c);
  const total = await c.env.DB.prepare(`SELECT COUNT(*) AS n FROM marketing_reports`).first<{
    n: number;
  }>();
  const rows = await c.env.DB.prepare(
    `SELECT id, title, published FROM marketing_reports
      ${cursor ? "WHERE id > ?" : ""} ORDER BY id ASC LIMIT ?`,
  )
    .bind(...(cursor ? [base64UrlDecode(cursor) ?? ""] : []), limit)
    .all<ReportRow>();
  const items: ApiReport[] = rows.results.map((r) => ({ ...r }));
  const result: Paginated<ApiReport> = paginate(items, total?.n ?? 0, (last) =>
    base64UrlEncode(last.id),
  );
  return c.json(result);
});

marketing.get("/funnel", async (c) => {
  const { cursor, limit } = parsePagination(c);
  const total = await c.env.DB.prepare(`SELECT COUNT(*) AS n FROM funnel_stages`).first<{
    n: number;
  }>();
  const rows = await c.env.DB.prepare(
    `SELECT id, stage, value, pct FROM funnel_stages
      ${cursor ? "WHERE id > ?" : ""} ORDER BY id ASC LIMIT ?`,
  )
    .bind(...(cursor ? [base64UrlDecode(cursor) ?? ""] : []), limit)
    .all<FunnelRow>();
  const items: ApiFunnelStage[] = rows.results.map((r) => ({ ...r }));
  const result: Paginated<ApiFunnelStage> = paginate(items, total?.n ?? 0, (last) =>
    base64UrlEncode(last.id),
  );
  return c.json(result);
});
