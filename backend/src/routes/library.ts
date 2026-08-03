import { Hono } from "hono";
import type { AppEnv } from "../types";
import { ApiError } from "../lib/errors";
import { requireAuth } from "../lib/auth";
import { base64UrlDecode, base64UrlEncode } from "../lib/crypto";
import { paginate, parsePagination, type Paginated } from "../lib/pagination";

export interface ApiLibraryItem {
  id: string;
  sourceKey: string;
  folderPath: string;
  name: string;
  kind: "file" | "folder" | "link";
  driveFileId: string;
  url: string;
  isProtected: boolean;
}

interface LibraryRow {
  id: string;
  source_key: string;
  folder_path: string;
  name: string;
  kind: string;
  drive_file_id: string;
  url: string;
  is_protected: number;
}

const LIBRARY_SELECT = `
  SELECT id, source_key, folder_path, name, kind, drive_file_id, url, is_protected
    FROM library_items
`;

function toApiItem(row: LibraryRow): ApiLibraryItem {
  return {
    id: row.id,
    sourceKey: row.source_key,
    folderPath: row.folder_path,
    name: row.name,
    kind: row.kind === "folder" ? "folder" : row.kind === "link" ? "link" : "file",
    driveFileId: row.drive_file_id,
    url: row.url,
    isProtected: row.is_protected === 1,
  };
}

export const library = new Hono<{ Bindings: AppEnv }>();

/** Public catalog: sources + public items only. No auth required. */
library.get("/catalog", async (c) => {
  const { cursor, limit } = parsePagination(c, 10_000);
  const sources = await c.env.DB.prepare(
    `SELECT source_key, MIN(folder_path) AS name, COUNT(*) AS item_count
       FROM library_items
      WHERE is_protected = 0
      GROUP BY source_key
      ORDER BY source_key`,
  ).all<{ source_key: string; name: string; item_count: number }>();

  const total = await c.env.DB.prepare(
    `SELECT COUNT(*) AS n FROM library_items WHERE is_protected = 0`,
  ).first<{ n: number }>();
  const rows = await c.env.DB.prepare(
    `${LIBRARY_SELECT} WHERE is_protected = 0
      ${cursor ? "AND id > ?" : ""} ORDER BY folder_path ASC, kind DESC, name ASC LIMIT ?`,
  )
    .bind(...(cursor ? [base64UrlDecode(cursor) ?? ""] : []), limit)
    .all<LibraryRow>();
  const items = rows.results.map(toApiItem);
  const result: Paginated<ApiLibraryItem> = paginate(items, total?.n ?? 0, (last) =>
    base64UrlEncode(last.id),
  );
  return c.json({
    sources: sources.results.map((s) => ({
      key: s.source_key,
      name: s.name,
      itemCount: s.item_count,
    })),
    ...result,
  });
});

/** Full library for authenticated users: includes protected course materials. */
library.get("/", requireAuth, async (c) => {
  const { cursor, limit } = parsePagination(c, 10_000);
  const total = await c.env.DB.prepare(`SELECT COUNT(*) AS n FROM library_items`).first<{
    n: number;
  }>();
  const rows = await c.env.DB.prepare(
    `${LIBRARY_SELECT} ${cursor ? "WHERE id > ?" : ""}
      ORDER BY folder_path ASC, kind DESC, name ASC LIMIT ?`,
  )
    .bind(...(cursor ? [base64UrlDecode(cursor) ?? ""] : []), limit)
    .all<LibraryRow>();
  const items = rows.results.map(toApiItem);
  const result: Paginated<ApiLibraryItem> = paginate(items, total?.n ?? 0, (last) =>
    base64UrlEncode(last.id),
  );
  return c.json(result);
});

library.get("/:id", requireAuth, async (c) => {
  const row = await c.env.DB.prepare(`${LIBRARY_SELECT} WHERE id = ?`)
    .bind(c.req.param("id"))
    .first<LibraryRow>();
  if (!row) throw ApiError.notFound("Library item not found.");
  return c.json(toApiItem(row));
});
