"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { blogPosts } from "@/data/blog";
import { CEA_BUILT_IN_LABS } from "@/data/cea-lab-registry";
import { cn } from "@/lib/utils";

/**
 * Deep site search — the linkable counterpart to the ⌘K modal.
 *
 * ## Why both exist, and why this one is not a duplicate
 *
 * `components/marketing/global-search.tsx` is a command palette: it opens over
 * the page, matches course titles, FAQ questions, tool names and lesson
 * *titles/excerpts/slugs*, and closes. It is the right tool for "take me to the
 * thing I can already name".
 *
 * It cannot answer "which page mentions preheated ovens" or "where do you
 * explain what a dataset is", because the lesson bodies are never searched
 * there. With 210 lessons averaging 782 words, most of the site's actual
 * content is invisible to the only search box the site has.
 *
 * This page indexes full body text and — crucially — has a URL. Results can be
 * linked, shared, bookmarked and tested, which the modal cannot be.
 *
 * ## Why it is client-side
 *
 * The corpus is already in the bundle for the blog index. A server route would
 * need an API that does not exist, would be slower for the reader, and would not
 * work offline. The index is built once at module load (~200KB of strings, no
 * network) and every keystroke is an in-memory filter.
 */

type Document = {
  kind: "lesson" | "tool";
  title: string;
  description: string;
  href: string;
  /** Lowercased searchable haystack, built once. */
  haystack: string;
  /** Chip label shown above the title. */
  meta: string;
};

function buildIndex(): Document[] {
  const lessons: Document[] = blogPosts.map((post) => ({
    kind: "lesson",
    title: post.seoTitle ?? post.title,
    description: post.quickAnswer ?? post.excerpt,
    href: `/blog/${post.slug}`,
    meta: `Lesson ${post.order}`,
    haystack:
      `${post.title} ${post.seoTitle ?? ""} ${post.excerpt} ${post.quickAnswer ?? ""} ${post.body
        .map((block) => {
          if (block.type === "p") return block.text;
          if (block.type === "h2") return block.text;
          if (block.type === "ul") return block.items.join(" ");
          if (block.type === "table") return block.rows.flat().join(" ");
          return block.caption ?? "";
        })
        .join(" ")}`.toLowerCase(),
  }));

  const tools: Document[] = CEA_BUILT_IN_LABS.map((lab) => ({
    kind: "tool",
    title: lab.name,
    description: lab.blurb,
    href: lab.to,
    meta: lab.badge,
    haystack: `${lab.name} ${lab.headline} ${lab.blurb} ${lab.meta}`.toLowerCase(),
  }));

  return [...tools, ...lessons];
}

const INDEX = buildIndex();

const SUGGESTIONS = [
  "which is bigger mb or kb",
  "naira sign",
  "what is the cloud",
  "password",
  "soc room",
  "wpm",
  "excel formula",
  "pdf",
] as const;

/**
 * Score a document against the query.
 *
 * Tiers, highest first. Deliberately explainable rather than clever: a search
 * box that silently mis-ranks teaches you not to trust it.
 *
 *   1. the whole query appears in the title
 *   2. every word appears in the title
 *   3. every word appears somewhere, at least one in the title
 *   4. every word appears somewhere in the body
 */
function score(doc: Document, phrase: string): number | null {
  const title = doc.title.toLowerCase();

  if (title.includes(phrase)) return 1000 - title.indexOf(phrase);

  const words = phrase.split(/\s+/).filter(Boolean);
  const haystack = doc.haystack;
  const inTitle = words.filter((word) => title.includes(word)).length;
  const inHaystack = words.filter((word) => doc.haystack.includes(word)).length;

  if (inTitle === words.length) return 800 - title.indexOf(words[0]);
  if (inTitle > 0 && inTitle + inHaystack >= words.length) return 500 + inTitle * 10;
  if (inHaystack === words.length) return 200;
  return null;
}

export function SiteSearch({
  limit = 10,
  initialQuery = "",
  autoFocus = false,
  className,
}: {
  limit?: number;
  initialQuery?: string;
  autoFocus?: boolean;
  className?: string;
}) {
  const [query, setQuery] = useState(initialQuery);

  const results = useMemo(() => {
    const phrase = query.trim().toLowerCase();
    if (phrase.length < 2) return [];
    return INDEX.map((doc) => ({ doc, rank: score(doc, phrase) }))
      .filter((entry): entry is { doc: Document; rank: number } => entry.rank !== null)
      .sort((a, b) => b.rank - a.rank)
      .slice(0, limit)
      .map((entry) => entry.doc);
  }, [query, limit]);

  const tooShort = query.trim().length < 2;
  const noResults = !tooShort && results.length === 0;

  return (
    <div className={cn("w-full", className)}>
      <div className="relative">
        <Search
          className="text-muted-foreground pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2"
          aria-hidden="true"
        />
        <input
          type="search"
          value={query}
          autoFocus={autoFocus}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Escape") setQuery("");
            // Enter opens the top result rather than submitting a form; there is
            // nothing to submit to, and a reload would lose the query.
            if (event.key === "Enter" && results[0]) {
              event.preventDefault();
              window.location.href = results[0].href;
            }
          }}
          placeholder="Search inside every lesson — try “mb or kb” or “naira”"
          aria-label="Search inside lessons and tools"
          className="border-foreground/12 bg-card focus:border-primary/60 placeholder:text-muted-foreground/80 h-12 w-full rounded-xl border pr-10 pl-11 text-sm outline-none"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Clear search"
            className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      {tooShort && (
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {SUGGESTIONS.map((suggestion) => (
            <li key={suggestion}>
              <button
                type="button"
                onClick={() => setQuery(suggestion)}
                className="border-foreground/10 text-muted-foreground hover:text-foreground hover:border-foreground/25 cursor-pointer rounded-full border px-3 py-1.5 text-[11px] font-medium transition-colors"
              >
                {suggestion}
              </button>
            </li>
          ))}
        </ul>
      )}

      {results.length > 0 && (
        <>
          <p className="text-muted-foreground mt-3 text-[11px]">
            {results.length} result{results.length === 1 ? "" : "s"}, best match first
          </p>
          <ul className="border-foreground/10 bg-card mt-2 divide-y divide-foreground/10 overflow-hidden rounded-xl border">
            {results.map((result) => (
              <li key={result.href}>
                <a
                  href={result.href}
                  className="hover:bg-foreground/[0.03] block px-4 py-3 transition-colors"
                >
                  <span className="text-muted-foreground font-mono text-[9px] tracking-[0.16em] uppercase">
                    {result.kind === "tool" ? "Tool" : "Lesson"} · {result.meta}
                  </span>
                  <span className="text-foreground mt-0.5 block text-sm font-semibold">
                    {result.title}
                  </span>
                  <span className="text-muted-foreground mt-0.5 line-clamp-2 block text-xs leading-relaxed">
                    {result.description}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </>
      )}

      {noResults && (
        <div className="border-foreground/10 bg-muted/25 mt-3 rounded-xl border p-4">
          <p className="text-foreground text-sm font-medium">Nothing matched “{query.trim()}”.</p>
          <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
            This search reads every lesson title, summary and full body, and every tool. A query
            that returns nothing is usually a page worth writing —{" "}
            <a href="/contact" className="text-primary underline">
              tell us what you were looking for
            </a>
            . That is how the{" "}
            <a href="/blog/kilobytes-and-megabytes" className="text-primary underline">
              file-size lesson
            </a>{" "}
            and the{" "}
            <a href="/tools/naira-keyboard" className="text-primary underline">
              naira sign helper
            </a>{" "}
            were chosen.
          </p>
        </div>
      )}
    </div>
  );
}
