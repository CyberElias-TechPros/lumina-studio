import { blogPosts, type BlogPost } from "@/data/blog";
import { chapterForOrder, noteChapters } from "@/data/note-chapters";
import { bodyText, readingMinutes } from "@/lib/blog-reading-time";

export type NotesSort = "lesson" | "quick" | "deep";

export const NOTES_SORT_OPTIONS: { value: NotesSort; label: string }[] = [
  { value: "lesson", label: "Learning order" },
  { value: "quick", label: "Quickest reads" },
  { value: "deep", label: "Longest reads" },
];

export const NOTES_PAGE_SIZE = 12;

/** Lessons in learning order. Computed once; the list is static content. */
export const notesInLearningOrder: BlogPost[] = [...blogPosts].sort((a, b) => a.order - b.order);

type Indexed = { post: BlogPost; minutes: number; haystack: string };

const indexed: Indexed[] = notesInLearningOrder.map((post) => {
  const chapter = chapterForOrder(post.order);
  return {
    post,
    minutes: readingMinutes(post.body),
    haystack: [
      post.title,
      post.excerpt,
      post.series,
      chapter?.title ?? "",
      chapter?.courseLabel ?? "",
      bodyText(post.body),
    ]
      .join(" ")
      .toLowerCase(),
  };
});

export function isNoteChapter(slug: string): boolean {
  return noteChapters.some((c) => c.slug === slug);
}

/**
 * Filter by chapter and search text (matches title, summary, chapter, course
 * and the lesson body), then sort. Returns posts only, not the index entries.
 */
export function browseNotes({
  query,
  chapter,
  sort,
}: {
  query: string;
  chapter: string;
  sort: NotesSort;
}): BlogPost[] {
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const chapterRange =
    chapter === "all" ? null : (noteChapters.find((c) => c.slug === chapter) ?? null);

  const matched = indexed.filter((entry) => {
    if (
      chapterRange &&
      (entry.post.order < chapterRange.from || entry.post.order > chapterRange.to)
    )
      return false;
    return terms.every((term) => entry.haystack.includes(term));
  });

  if (sort === "quick")
    matched.sort((a, b) => a.minutes - b.minutes || a.post.order - b.post.order);
  if (sort === "deep") matched.sort((a, b) => b.minutes - a.minutes || a.post.order - b.post.order);

  return matched.map((entry) => entry.post);
}

/** Page numbers with ellipses, e.g. [1, "…", 4, 5, 6, "…", 18]. */
export function pageWindow(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = new Set([1, total, current - 1, current, current + 1]);
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
  const out: (number | "…")[] = [];
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) out.push("…");
    out.push(p);
  });
  return out;
}
