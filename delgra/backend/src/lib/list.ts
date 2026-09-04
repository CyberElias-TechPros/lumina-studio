/**
 * Small response-shape helpers shared by every list endpoint, so pagination
 * metadata is identical across the API (and the frontend can rely on it).
 */
export interface ListMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export function listMeta(page: number, limit: number, total: number): ListMeta {
  const totalPages = limit > 0 ? Math.max(1, Math.ceil(total / limit)) : 1;
  return {
    page,
    limit,
    total,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1,
  };
}

/** Whitelist helper: reject an unknown sort key rather than interpolating it. */
export function pickSort<T extends string>(requested: string | undefined, allowed: readonly T[], fallback: T): T {
  return allowed.includes(requested as T) ? (requested as T) : fallback;
}
