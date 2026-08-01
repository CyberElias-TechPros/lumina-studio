import { Hono } from "hono";
import type { AppEnv } from "../types";
import { base64UrlDecode, base64UrlEncode } from "../lib/crypto";
import { paginate, parsePagination, type Paginated } from "../lib/pagination";
import { requireAuth } from "../lib/auth";

export interface ApiDesignComponent {
  id: string;
  t: string;
  d: string;
  states: number;
  usage: number;
  status: string;
}

export interface ApiDesignFlow {
  id: string;
  t: string;
  steps: number;
  decisions: number;
  status: string;
  list: string[];
}

export interface ApiDesignPrototype {
  id: string;
  t: string;
  version: string;
  status: string;
  feedback: number;
  owner: string;
}

export interface ApiDesignColorToken {
  id: string;
  kind: "color";
  t: string;
  v: string;
  hex: string;
  deprecated: boolean;
}

export interface ApiDesignTypeToken {
  id: string;
  kind: "type";
  t: string;
  v: string;
  family: string;
  status: string;
}

export type ApiDesignToken = ApiDesignColorToken | ApiDesignTypeToken;

export interface ApiDesignVersion {
  id: string;
  t: string;
  change: string;
  editor: string;
  when: string;
  status: string;
}

export interface ApiCollaborationThread {
  id: string;
  t: string;
  d: string;
  author: string;
  status: string;
}

export interface ApiDesignExport {
  id: string;
  t: string;
  format: string;
  size: string;
  owner: string;
  status: string;
}

export interface ApiSystemComponent {
  id: string;
  t: string;
  variants: number;
  states: number;
  usage: number;
  status: string;
}

export interface ApiDesignKpi {
  id: string;
  value: number;
}

interface ComponentRow {
  id: string;
  name: string;
  detail: string;
  states: number;
  usage: number;
  status: string;
}

interface FlowRow {
  id: string;
  name: string;
  steps_count: number;
  decisions_count: number;
  status: string;
  flow_steps: string;
}

interface PrototypeRow {
  id: string;
  name: string;
  version: string;
  status: string;
  feedback_count: number;
  owner: string;
}

interface TokenRow {
  id: string;
  kind: string;
  name: string;
  value: string;
  hex: string;
  family: string;
  deprecated: number;
  status: string;
}

interface VersionRow {
  id: string;
  title: string;
  change: string;
  editor: string;
  when: string;
  status: string;
}

interface CollaborationRow {
  id: string;
  title: string;
  detail: string;
  author: string;
  status: string;
}

interface ExportRow {
  id: string;
  title: string;
  format: string;
  size: string;
  owner: string;
  status: string;
}

interface SystemComponentRow {
  id: string;
  name: string;
  variants: number;
  states: number;
  usage: number;
  status: string;
}

interface KpiRow {
  id: string;
  value: number;
}

export const design = new Hono<{ Bindings: AppEnv }>();

design.use("*", requireAuth);

design.get("/components", async (c) => {
  const { cursor, limit } = parsePagination(c);
  const total = await c.env.DB.prepare(`SELECT COUNT(*) AS n FROM design_components`).first<{
    n: number;
  }>();
  const rows = await c.env.DB.prepare(
    `SELECT id, name, detail, states, usage, status FROM design_components
      ${cursor ? "WHERE id > ?" : ""} ORDER BY id ASC LIMIT ?`,
  )
    .bind(...(cursor ? [base64UrlDecode(cursor) ?? ""] : []), limit)
    .all<ComponentRow>();
  const items: ApiDesignComponent[] = rows.results.map((r) => ({
    id: r.id,
    t: r.name,
    d: r.detail,
    states: r.states,
    usage: r.usage,
    status: r.status,
  }));
  const result: Paginated<ApiDesignComponent> = paginate(items, total?.n ?? 0, (last) =>
    base64UrlEncode(last.id),
  );
  return c.json(result);
});

design.get("/flows", async (c) => {
  const { cursor, limit } = parsePagination(c);
  const total = await c.env.DB.prepare(`SELECT COUNT(*) AS n FROM design_flows`).first<{
    n: number;
  }>();
  const rows = await c.env.DB.prepare(
    `SELECT id, name, steps_count, decisions_count, status, flow_steps FROM design_flows
      ${cursor ? "WHERE id > ?" : ""} ORDER BY id ASC LIMIT ?`,
  )
    .bind(...(cursor ? [base64UrlDecode(cursor) ?? ""] : []), limit)
    .all<FlowRow>();
  const items: ApiDesignFlow[] = rows.results.map((r) => ({
    id: r.id,
    t: r.name,
    steps: r.steps_count,
    decisions: r.decisions_count,
    status: r.status,
    list: (JSON.parse(r.flow_steps) ?? []) as string[],
  }));
  const result: Paginated<ApiDesignFlow> = paginate(items, total?.n ?? 0, (last) =>
    base64UrlEncode(last.id),
  );
  return c.json(result);
});

design.get("/prototypes", async (c) => {
  const { cursor, limit } = parsePagination(c);
  const total = await c.env.DB.prepare(`SELECT COUNT(*) AS n FROM design_prototypes`).first<{
    n: number;
  }>();
  const rows = await c.env.DB.prepare(
    `SELECT id, name, version, status, feedback_count, owner FROM design_prototypes
      ${cursor ? "WHERE id > ?" : ""} ORDER BY id ASC LIMIT ?`,
  )
    .bind(...(cursor ? [base64UrlDecode(cursor) ?? ""] : []), limit)
    .all<PrototypeRow>();
  const items: ApiDesignPrototype[] = rows.results.map((r) => ({
    id: r.id,
    t: r.name,
    version: r.version,
    status: r.status,
    feedback: r.feedback_count,
    owner: r.owner,
  }));
  const result: Paginated<ApiDesignPrototype> = paginate(items, total?.n ?? 0, (last) =>
    base64UrlEncode(last.id),
  );
  return c.json(result);
});

design.get("/tokens", async (c) => {
  const { cursor, limit } = parsePagination(c);
  const total = await c.env.DB.prepare(`SELECT COUNT(*) AS n FROM design_tokens`).first<{
    n: number;
  }>();
  const rows = await c.env.DB.prepare(
    `SELECT id, kind, name, value, hex, family, deprecated, status FROM design_tokens
      ${cursor ? "WHERE id > ?" : ""} ORDER BY id ASC LIMIT ?`,
  )
    .bind(...(cursor ? [base64UrlDecode(cursor) ?? ""] : []), limit)
    .all<TokenRow>();
  const items: ApiDesignToken[] = rows.results.map((r) =>
    r.kind === "type"
      ? {
          id: r.id,
          kind: "type",
          t: r.name,
          v: r.value,
          family: r.family,
          status: r.status,
        }
      : {
          id: r.id,
          kind: "color",
          t: r.name,
          v: r.value,
          hex: r.hex,
          deprecated: r.deprecated === 1,
        },
  );
  const result: Paginated<ApiDesignToken> = paginate(items, total?.n ?? 0, (last) =>
    base64UrlEncode(last.id),
  );
  return c.json(result);
});

design.get("/versions", async (c) => {
  const { cursor, limit } = parsePagination(c);
  const total = await c.env.DB.prepare(`SELECT COUNT(*) AS n FROM design_versions`).first<{
    n: number;
  }>();
  const rows = await c.env.DB.prepare(
    `SELECT id, title, change, editor, "when", status FROM design_versions
      ${cursor ? "WHERE id > ?" : ""} ORDER BY id ASC LIMIT ?`,
  )
    .bind(...(cursor ? [base64UrlDecode(cursor) ?? ""] : []), limit)
    .all<VersionRow>();
  const items: ApiDesignVersion[] = rows.results.map((r) => ({
    id: r.id,
    t: r.title,
    change: r.change,
    editor: r.editor,
    when: r.when,
    status: r.status,
  }));
  const result: Paginated<ApiDesignVersion> = paginate(items, total?.n ?? 0, (last) =>
    base64UrlEncode(last.id),
  );
  return c.json(result);
});

design.get("/collaboration", async (c) => {
  const { cursor, limit } = parsePagination(c);
  const total = await c.env.DB.prepare(`SELECT COUNT(*) AS n FROM collaboration_threads`).first<{
    n: number;
  }>();
  const rows = await c.env.DB.prepare(
    `SELECT id, title, detail, author, status FROM collaboration_threads
      ${cursor ? "WHERE id > ?" : ""} ORDER BY id ASC LIMIT ?`,
  )
    .bind(...(cursor ? [base64UrlDecode(cursor) ?? ""] : []), limit)
    .all<CollaborationRow>();
  const items: ApiCollaborationThread[] = rows.results.map((r) => ({
    id: r.id,
    t: r.title,
    d: r.detail,
    author: r.author,
    status: r.status,
  }));
  const result: Paginated<ApiCollaborationThread> = paginate(items, total?.n ?? 0, (last) =>
    base64UrlEncode(last.id),
  );
  return c.json(result);
});

design.get("/exports", async (c) => {
  const { cursor, limit } = parsePagination(c);
  const total = await c.env.DB.prepare(`SELECT COUNT(*) AS n FROM design_exports`).first<{
    n: number;
  }>();
  const rows = await c.env.DB.prepare(
    `SELECT id, title, format, size, owner, status FROM design_exports
      ${cursor ? "WHERE id > ?" : ""} ORDER BY id ASC LIMIT ?`,
  )
    .bind(...(cursor ? [base64UrlDecode(cursor) ?? ""] : []), limit)
    .all<ExportRow>();
  const items: ApiDesignExport[] = rows.results.map((r) => ({
    id: r.id,
    t: r.title,
    format: r.format,
    size: r.size,
    owner: r.owner,
    status: r.status,
  }));
  const result: Paginated<ApiDesignExport> = paginate(items, total?.n ?? 0, (last) =>
    base64UrlEncode(last.id),
  );
  return c.json(result);
});

design.get("/system-components", async (c) => {
  const { cursor, limit } = parsePagination(c);
  const total = await c.env.DB.prepare(`SELECT COUNT(*) AS n FROM system_components`).first<{
    n: number;
  }>();
  const rows = await c.env.DB.prepare(
    `SELECT id, name, variants, states, usage, status FROM system_components
      ${cursor ? "WHERE id > ?" : ""} ORDER BY id ASC LIMIT ?`,
  )
    .bind(...(cursor ? [base64UrlDecode(cursor) ?? ""] : []), limit)
    .all<SystemComponentRow>();
  const items: ApiSystemComponent[] = rows.results.map((r) => ({
    id: r.id,
    t: r.name,
    variants: r.variants,
    states: r.states,
    usage: r.usage,
    status: r.status,
  }));
  const result: Paginated<ApiSystemComponent> = paginate(items, total?.n ?? 0, (last) =>
    base64UrlEncode(last.id),
  );
  return c.json(result);
});

design.get("/kpis", async (c) => {
  const { cursor, limit } = parsePagination(c);
  const total = await c.env.DB.prepare(`SELECT COUNT(*) AS n FROM design_kpis`).first<{
    n: number;
  }>();
  const rows = await c.env.DB.prepare(
    `SELECT id, value FROM design_kpis ${cursor ? "WHERE id > ?" : ""} ORDER BY id ASC LIMIT ?`,
  )
    .bind(...(cursor ? [base64UrlDecode(cursor) ?? ""] : []), limit)
    .all<KpiRow>();
  const items: ApiDesignKpi[] = rows.results.map((r) => ({ ...r }));
  const result: Paginated<ApiDesignKpi> = paginate(items, total?.n ?? 0, (last) =>
    base64UrlEncode(last.id),
  );
  return c.json(result);
});
