"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { getPageHead } from "@/lib/seo";
import { ArrowRight, BookOpen, ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CTASection, PageShell } from "@/components/marketing/shell";
import { NoteCard } from "@/components/marketing/note-card";
import { blogPosts } from "@/data/blog";
import { noteChapters, notesInChapter } from "@/data/note-chapters";
import {
  browseNotes,
  isNoteChapter,
  NOTES_PAGE_SIZE,
  NOTES_SORT_OPTIONS,
  notesInLearningOrder,
  pageWindow,
  type NotesSort,
} from "@/lib/notes-browse";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/blog/")({
  head: () =>
    getPageHead({
      title: "Notes — computer skills from scratch",
      description:
        "A free self-study library of practical computer lessons: files, email, office work, phones and safer browsing. Browse by chapter, search by task and practise at your own pace.",
      path: "/blog",
    }),
  component: Blog,
});

const ALL = "all";

function Blog() {
  const [query, setQuery] = useState("");
  const [chapter, setChapter] = useState<string>(ALL);
  const [sort, setSort] = useState<NotesSort>("lesson");
  const [page, setPage] = useState(1);
  const [restored, setRestored] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Read a shared view (?chapter=&q=&sort=&page=) once on the client, then keep
  // the URL in step so readers can bookmark or share the view they are on.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ch = params.get("chapter");
    if (ch && (ch === ALL || isNoteChapter(ch))) setChapter(ch);
    const q = params.get("q");
    if (q) setQuery(q);
    const s = params.get("sort");
    if (s === "quick" || s === "deep") setSort(s);
    const pg = Number(params.get("page"));
    if (Number.isInteger(pg) && pg > 1) setPage(pg);
    setRestored(true);
  }, []);

  useEffect(() => {
    if (!restored) return;
    const params = new URLSearchParams();
    if (chapter !== ALL) params.set("chapter", chapter);
    if (query.trim()) params.set("q", query.trim());
    if (sort !== "lesson") params.set("sort", sort);
    if (page > 1) params.set("page", String(page));
    const qs = params.toString();
    const url = `${window.location.pathname}${qs ? `?${qs}` : ""}`;
    window.history.replaceState(window.history.state, "", url);
  }, [restored, chapter, query, sort, page]);

  const results = useMemo(() => browseNotes({ query, chapter, sort }), [query, chapter, sort]);
  const totalPages = Math.max(1, Math.ceil(results.length / NOTES_PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const pageStart = (current - 1) * NOTES_PAGE_SIZE;
  const visible = results.slice(pageStart, pageStart + NOTES_PAGE_SIZE);

  const activeChapter =
    chapter === ALL ? null : (noteChapters.find((c) => c.slug === chapter) ?? null);
  const searching = query.trim().length > 0;
  const filtered = Boolean(activeChapter) || searching;

  const chooseChapter = (slug: string) => {
    setChapter(slug);
    setPage(1);
  };
  const changeQuery = (value: string) => {
    setQuery(value);
    setPage(1);
  };
  const clearAll = () => {
    setQuery("");
    setChapter(ALL);
    setPage(1);
  };
  const goToPage = (next: number) => {
    setPage(next);
    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <PageShell>
      {/* Hero */}
      <section className="border-border bg-muted/30 border-b">
        <div className="container-page py-12 md:py-16">
          <nav aria-label="Breadcrumb" className="text-muted-foreground text-sm">
            <ol className="flex items-center gap-2">
              <li>
                <Link to="/" className="hover:text-foreground">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-foreground font-medium">Notes</li>
            </ol>
          </nav>

          <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div className="max-w-3xl">
              <p className="text-primary text-xs font-semibold tracking-[0.12em] uppercase">
                Notes · Free self-study
              </p>
              <h1 className="font-display mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl md:text-[2.75rem] md:leading-tight">
                Computer skills, one lesson at a time
              </h1>
              <p className="text-muted-foreground mt-5 text-base leading-relaxed text-pretty sm:text-[17px]">
                {blogPosts.length} practical lessons in {noteChapters.length} chapters, written by
                Ellis Dennis Graham at Cyber Elias Academy in Port Harcourt. Search for the task you
                need today, or start at the beginning and work through in order.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Button asChild size="lg">
                <Link to="/blog/$slug" params={{ slug: notesInLearningOrder[0].slug }}>
                  Start at lesson 1 <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/editorial">How we maintain the notes</Link>
              </Button>
            </div>
          </div>

          <div className="relative mt-10 max-w-2xl">
            <label htmlFor="notes-search" className="sr-only">
              Search notes
            </label>
            <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2" />
            <input
              id="notes-search"
              type="search"
              value={query}
              onChange={(e) => changeQuery(e.target.value)}
              placeholder="Search by task, e.g. “backup”"
              className="border-input bg-background focus-visible:ring-ring placeholder:text-muted-foreground h-14 w-full rounded-xl border pr-12 pl-12 text-base shadow-sm focus-visible:ring-2 focus-visible:outline-none [&::-webkit-search-cancel-button]:hidden"
            />
            {query && (
              <button
                type="button"
                onClick={() => changeQuery("")}
                aria-label="Clear search"
                className="text-muted-foreground hover:bg-muted hover:text-foreground absolute top-1/2 right-3 grid size-8 -translate-y-1/2 place-items-center rounded-md"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Mobile and tablet: horizontal chapter chips */}
      <div className="border-border bg-background sticky top-16 z-20 border-b lg:hidden">
        <nav aria-label="Chapters" className="container-page">
          <ul className="-mx-1 flex snap-x gap-2 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {[
              { slug: ALL, title: "All lessons" },
              ...noteChapters.map((c) => ({ slug: c.slug, title: c.title })),
            ].map((c) => (
              <li key={c.slug} className="snap-start">
                <button
                  type="button"
                  onClick={() => chooseChapter(c.slug)}
                  aria-pressed={chapter === c.slug}
                  className={cn(
                    "rounded-full border px-4 py-1.5 text-sm whitespace-nowrap transition-colors",
                    chapter === c.slug
                      ? "border-primary bg-primary text-primary-foreground font-medium"
                      : "border-border bg-card hover:border-primary/40",
                  )}
                >
                  {c.title}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="container-page grid gap-10 py-10 md:py-12 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-12">
        {/* Desktop: chapter sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-2">
            <p className="text-muted-foreground text-xs font-semibold tracking-[0.12em] uppercase">
              Chapters
            </p>
            <nav aria-label="Chapters" className="mt-3">
              <ul className="space-y-1">
                <li>
                  <ChapterButton
                    active={chapter === ALL}
                    onClick={() => chooseChapter(ALL)}
                    label="All lessons"
                    count={blogPosts.length}
                  />
                </li>
                {noteChapters.map((ch) => (
                  <li key={ch.slug}>
                    <ChapterButton
                      active={chapter === ch.slug}
                      onClick={() => chooseChapter(ch.slug)}
                      label={ch.title}
                      count={notesInChapter(ch).length}
                      detail={`Lessons ${ch.from}–${ch.to} · ${ch.courseLabel}`}
                    />
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </aside>

        {/* Results */}
        <div ref={resultsRef} className="min-w-0 scroll-mt-32">
          <div className="border-border flex flex-wrap items-center justify-between gap-4 border-b pb-5">
            <div>
              <p className="font-display text-xl font-semibold tracking-tight" aria-live="polite">
                {activeChapter ? activeChapter.title : "All lessons"}
              </p>
              <p className="text-muted-foreground mt-1 text-sm">
                {results.length === 0
                  ? "No lessons match"
                  : `Showing ${pageStart + 1}–${pageStart + visible.length} of ${results.length} ${results.length === 1 ? "lesson" : "lessons"}`}
                {searching && (
                  <>
                    {" "}
                    for <span className="text-foreground font-medium">“{query.trim()}”</span>
                  </>
                )}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="notes-sort" className="text-muted-foreground text-sm">
                Sort by
              </label>
              <select
                id="notes-sort"
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value as NotesSort);
                  setPage(1);
                }}
                className="border-input bg-background focus-visible:ring-ring h-9 rounded-md border px-3 text-sm focus-visible:ring-2 focus-visible:outline-none"
              >
                {NOTES_SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {filtered && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-muted-foreground mr-1 text-sm">Filters:</span>
              {activeChapter && (
                <FilterChip label={activeChapter.title} onRemove={() => chooseChapter(ALL)} />
              )}
              {searching && (
                <FilterChip label={`“${query.trim()}”`} onRemove={() => changeQuery("")} />
              )}
              <button
                type="button"
                onClick={clearAll}
                className="text-primary ml-1 text-sm font-medium hover:underline"
              >
                Clear all
              </button>
            </div>
          )}

          {results.length === 0 ? (
            <div className="border-border bg-muted/30 mt-8 rounded-xl border border-dashed p-10 text-center">
              <BookOpen className="text-muted-foreground mx-auto size-8" />
              <p className="font-display mt-4 text-lg font-semibold">
                No lessons match that search
              </p>
              <p className="text-muted-foreground mx-auto mt-2 max-w-md text-sm leading-relaxed">
                Try a shorter word, such as “file”, “email” or “backup”, or browse the chapters
                instead.
              </p>
              <Button className="mt-6" variant="outline" onClick={clearAll}>
                Show all lessons
              </Button>
            </div>
          ) : (
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {visible.map((post) => (
                <li key={post.slug} className="flex">
                  <NoteCard post={post} />
                </li>
              ))}
            </ul>
          )}

          {totalPages > 1 && (
            <Pagination current={current} total={totalPages} onChange={goToPage} />
          )}
        </div>
      </div>

      <section className="border-border bg-muted/40 border-y">
        <div className="container-page grid gap-6 py-12 md:grid-cols-[1fr_auto] md:items-center md:py-14">
          <div className="max-w-2xl">
            <p className="font-display text-xl font-semibold">
              New to computers? Start at the beginning.
            </p>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              Lesson 1 assumes nothing. Every chapter after it builds on the one before, so the
              order matters.
            </p>
          </div>
          <Button asChild>
            <Link to="/blog/$slug" params={{ slug: notesInLearningOrder[0].slug }}>
              Read lesson 1 <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </section>

      <CTASection
        title="Prefer a class?"
        description="The same basics are taught at the centre, two sessions a week, with a machine in front of you."
        primary={{ label: "View courses", to: "/classes" }}
        secondary={{ label: "Contact us", to: "/contact" }}
      />
    </PageShell>
  );
}

function ChapterButton({
  active,
  onClick,
  label,
  count,
  detail,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
  detail?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? "true" : undefined}
      className={cn(
        "group flex w-full items-start justify-between gap-3 rounded-lg px-3 py-2.5 text-left transition-colors",
        active ? "bg-primary text-primary-foreground" : "hover:bg-muted",
      )}
    >
      <span className="min-w-0">
        <span
          className={cn("block text-sm leading-snug", active ? "font-semibold" : "font-medium")}
        >
          {label}
        </span>
        {detail && (
          <span
            className={cn(
              "mt-0.5 block text-xs leading-snug",
              active ? "text-primary-foreground/80" : "text-muted-foreground",
            )}
          >
            {detail}
          </span>
        )}
      </span>
      <span
        className={cn(
          "mt-0.5 shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold tabular-nums",
          active ? "bg-white/20 text-primary-foreground" : "bg-muted text-muted-foreground",
        )}
      >
        {count}
      </span>
    </button>
  );
}

function FilterChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="bg-muted inline-flex items-center gap-1.5 rounded-full py-1 pr-1 pl-3 text-sm">
      {label}
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove filter ${label}`}
        className="hover:bg-background grid size-5 place-items-center rounded-full"
      >
        <X className="size-3.5" />
      </button>
    </span>
  );
}

function Pagination({
  current,
  total,
  onChange,
}: {
  current: number;
  total: number;
  onChange: (page: number) => void;
}) {
  return (
    <nav aria-label="Pagination" className="mt-12 flex flex-wrap items-center justify-center gap-2">
      <Button
        variant="outline"
        size="sm"
        disabled={current === 1}
        onClick={() => onChange(current - 1)}
        aria-label="Previous page"
      >
        <ChevronLeft className="size-4" /> Previous
      </Button>
      <ul className="flex items-center gap-1">
        {pageWindow(current, total).map((item, i) =>
          item === "…" ? (
            <li key={`gap-${i}`} className="text-muted-foreground px-2 text-sm" aria-hidden="true">
              …
            </li>
          ) : (
            <li key={item}>
              <button
                type="button"
                onClick={() => onChange(item)}
                aria-current={item === current ? "page" : undefined}
                aria-label={`Page ${item}`}
                className={cn(
                  "grid size-9 place-items-center rounded-md text-sm tabular-nums transition-colors",
                  item === current
                    ? "bg-primary text-primary-foreground font-semibold"
                    : "hover:bg-muted text-foreground",
                )}
              >
                {item}
              </button>
            </li>
          ),
        )}
      </ul>
      <Button
        variant="outline"
        size="sm"
        disabled={current === total}
        onClick={() => onChange(current + 1)}
        aria-label="Next page"
      >
        Next <ChevronRight className="size-4" />
      </Button>
    </nav>
  );
}
