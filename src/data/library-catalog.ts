import raw from "./library-catalog.json";

export interface LibraryCatalogItem {
  name: string;
  kind: "file" | "folder" | "link";
  url: string;
}

export interface LibraryCategory {
  slug: string;
  path: string;
  count: number;
  items: LibraryCatalogItem[];
}

interface LibraryCatalogData {
  generatedAt: string;
  source: string;
  totalItems: number;
  categories: LibraryCategory[];
}

const catalog = raw as LibraryCatalogData;

export function getLibraryCategories(): LibraryCategory[] {
  return catalog.categories;
}

export function getLibraryCategory(slug: string): LibraryCategory | undefined {
  return catalog.categories.find((c) => c.slug === slug);
}

export const libraryCatalogMeta = {
  generatedAt: catalog.generatedAt,
  totalItems: catalog.totalItems,
  categoryCount: catalog.categories.length,
};
