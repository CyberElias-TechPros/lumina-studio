import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

/**
 * List page filters kept in the URL.
 *
 * Bookmarking, refreshing and sharing a filtered view all keep working, and the
 * browser back button steps through filter changes instead of leaving the page.
 */
export function useListFilters(initial: Record<string, string> = {}) {
  const [params, setParams] = useSearchParams();

  const filters = useMemo(() => {
    const out: Record<string, string> = { ...initial };
    for (const key of Object.keys(initial)) {
      const value = params.get(key);
      if (value !== null) out[key] = value;
    }
    for (const [key, value] of params.entries()) {
      if (key === "page" || key === "limit") out[key] = value;
    }
    return out;
  }, [params, initial]);

  const setFilter = useCallback(
    (key: string, value: string) => {
      setParams((current) => {
        const next = new URLSearchParams(current);
        if (value === "" || value === initial[key]) next.delete(key);
        else next.set(key, value);
        // Any filter change resets pagination to the first page.
        if (key !== "page") next.delete("page");
        return next;
      });
    },
    [setParams, initial],
  );

  const page = Number.parseInt(filters.page ?? "1", 10) || 1;
  const limit = Number.parseInt(filters.limit ?? "25", 10) || 25;

  const setPage = useCallback(
    (next: number) => {
      setParams((current) => {
        const copy = new URLSearchParams(current);
        if (next <= 1) copy.delete("page");
        else copy.set("page", String(next));
        return copy;
      });
    },
    [setParams],
  );

  return { filters, setFilter, page, limit, setPage };
}

/**
 * Debounce a fast-changing value (a search box) so typing does not fire a
 * request per keystroke. Returns the settled value.
 */
export function useDebouncedValue<T>(value: T, delay = 350): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handle = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handle);
  }, [value, delay]);

  return debounced;
}
