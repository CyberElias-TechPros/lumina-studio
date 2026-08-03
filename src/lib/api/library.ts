import { apiFetch } from "@/lib/api/client";
import type { Paginated } from "@/lib/api/types";

export interface LibraryItem {
  id: string;
  sourceKey: string;
  folderPath: string;
  name: string;
  kind: "file" | "folder" | "link";
  driveFileId: string;
  url: string;
  isProtected: boolean;
}

export interface LibrarySource {
  key: string;
  name: string;
  itemCount: number;
}

export interface LibraryCatalog extends Paginated<LibraryItem> {
  sources: LibrarySource[];
}

export type PaginatedLibrary = Paginated<LibraryItem>;

/** Public catalog — public items only, no auth required. */
export function fetchLibraryCatalog(): Promise<LibraryCatalog> {
  return apiFetch<LibraryCatalog>("/v1/library/catalog", { query: { limit: 10_000 } });
}

/** Full library for authenticated users — includes protected course materials. */
export function fetchLibrary(): Promise<Paginated<LibraryItem>> {
  return apiFetch<Paginated<LibraryItem>>("/v1/library", { query: { limit: 10_000 } });
}
