/** Cursor-paginated response used by all list endpoints. */
export interface Paginated<T> {
  items: T[];
  nextCursor?: string | null;
  total?: number;
}

/** Query params serialized into the URL. */
export type QueryParams = Record<string, string | number | boolean | null | undefined>;
