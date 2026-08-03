import type { Context } from "hono";

export interface Paginated<T> {
  items: T[];
  nextCursor?: string;
  total: number;
}

export interface PaginationInput {
  cursor?: string;
  limit: number;
}

export function parsePagination(c: Context, maxLimit = 50): PaginationInput {
  const rawLimit = Number(c.req.query("limit") ?? 20);
  const limit = Number.isFinite(rawLimit)
    ? Math.min(Math.max(Math.floor(rawLimit), 1), maxLimit)
    : 20;
  return { cursor: c.req.query("cursor"), limit };
}

export function paginate<T>(
  items: T[],
  total: number,
  cursorFor: (last: T) => string,
): Paginated<T> {
  return {
    items,
    total,
    ...(items.length > 0 ? { nextCursor: cursorFor(items[items.length - 1]!) } : {}),
  };
}
