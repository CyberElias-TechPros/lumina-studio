import { useApiQuery } from "@/lib/query/hooks";
import {
  fetchLibrary,
  fetchLibraryCatalog,
  type LibraryCatalog,
  type PaginatedLibrary,
} from "@/lib/api/library";

export const libraryKeys = {
  catalog: ["library", "catalog"] as const,
  full: ["library", "full"] as const,
};

export function useLibraryCatalog() {
  return useApiQuery<LibraryCatalog>(libraryKeys.catalog, fetchLibraryCatalog);
}

export function useLibrary() {
  return useApiQuery<PaginatedLibrary>(libraryKeys.full, fetchLibrary);
}
