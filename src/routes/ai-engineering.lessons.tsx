"use client";

import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import {
  ArrowLeft,
  BookOpenCheck,
  ChevronDown,
  Clock,
  FileQuestion,
  Github,
  Search,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CTASection, Eyebrow, PageHero, PageShell } from "@/components/marketing/shell";
import { AI_LESSON_INDEX, AI_LESSON_COUNT, AI_SOURCE, aiPhases } from "@/data/ai-from-scratch";
import { getPageHead } from "@/lib/seo";

export const Route = createFileRoute("/ai-engineering/lessons")({
  head: () =>
    getPageHead({
      title: "All 542 Lessons — AI Engineering from Scratch (Free, MIT)",
      description:
        "The complete AI Engineering from Scratch curriculum hosted free by CEA: 542 hands-on lessons across 20 phases — from dev setup to agent engineering — with self-check quizzes, code and canonical links. MIT licensed.",
      path: "/ai-engineering/lessons",
    }),
  component: AiLessonsIndexPage,
});

const PAGE_SIZE = 60;
const phaseTitle = (id: string) => aiPhases.find((p) => p.id === id)?.title ?? id;

function AiLessonsIndexPage() {
  const [query, setQuery] = useState("");
  const [phase, setPhase] = useState<string>("all");
  const [quizOnly, setQuizOnly] = useState(false);
  const [visible, setVisible] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return AI_LESSON_INDEX.filter((entry) => {
      if (phase !== "all" && entry.phase !== phase) return false;
      if (quizOnly && !entry.quiz) return false;
      if (!needle) return true;
      return (
        entry.title.toLowerCase().includes(needle) ||
        phaseTitle(entry.phase).toLowerCase().includes(needle)
      );
    });
  }, [query, phase, quizOnly]);

  useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [query, phase, quizOnly]);

  const shown = filtered.slice(0, visible);

  return (
    <PageShell>
      <PageHero
        eyebrow="The full mirror · MIT licensed"
        title={
          <>
            Every lesson.{" "}
            <span className="font-serif text-primary font-normal italic">On this site.</span>
          </>
        }
        description="AI Engineering from Scratch — 542 lessons, 20 phases, 392 self-check quizzes — hosted in full by CEA, free, with the author's MIT blessing. Nothing paywalled, nothing rewritten: the same hands-on curriculum, searchable here."
        meta={[`${AI_LESSON_COUNT} lessons`, "20 phases", "392 quizzes", "MIT licensed"]}
      >
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild variant="outline" className="rounded-full">
            <Link to="/ai-engineering">
              <ArrowLeft className="size-4" aria-hidden="true" /> Back to the CEA gateway
            </Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full">
            <a href={AI_SOURCE.repo} target="_blank" rel="noopener noreferrer">
              <Github className="size-4" aria-hidden="true" /> Source repository
            </a>
          </Button>
        </div>
      </PageHero>

      <section className="container-page py-12 md:py-16" aria-labelledby="lesson-index-heading">
        <h2 id="lesson-index-heading" className="sr-only">
          Search all lessons
        </h2>

        {/* Filters */}
        <div className="border-foreground/10 bg-card rounded-xl border p-4 sm:p-5">
          <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_16rem_auto]">
            <label className="relative block">
              <span className="sr-only">Search lessons</span>
              <Search
                className="text-muted-foreground absolute top-1/2 left-4 size-4 -translate-y-1/2"
                aria-hidden="true"
              />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search 542 lessons…"
                className="border-foreground/12 bg-background focus:border-primary h-12 w-full rounded-xl border pr-4 pl-11 text-sm outline-none"
              />
            </label>
            <label className="relative block">
              <span className="sr-only">Filter by phase</span>
              <select
                value={phase}
                onChange={(event) => setPhase(event.target.value)}
                className="border-foreground/12 bg-background focus:border-primary h-12 w-full appearance-none rounded-xl border pr-9 pl-4 text-sm outline-none"
              >
                <option value="all">All 20 phases</option>
                {aiPhases.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title} ({p.lessons})
                  </option>
                ))}
              </select>
              <ChevronDown
                className="text-muted-foreground pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2"
                aria-hidden="true"
              />
            </label>
            <label className="border-foreground/12 flex h-12 cursor-pointer items-center gap-2 rounded-xl border px-4 text-sm font-medium select-none">
              <input
                type="checkbox"
                checked={quizOnly}
                onChange={(event) => setQuizOnly(event.target.checked)}
                className="accent-primary size-4"
              />
              Has self-check
            </label>
          </div>
          <p aria-live="polite" className="text-muted-foreground mt-3 text-xs font-medium">
            {filtered.length} of {AI_LESSON_COUNT} lessons
            {quizOnly ? " with self-check" : ""}
            {phase !== "all" ? ` in ${phaseTitle(phase)}` : ""}
            {query.trim() ? ` matching “${query.trim()}”` : ""}
          </p>
        </div>

        {/* Results */}
        <ol className="mt-6 grid gap-2 sm:grid-cols-2">
          {shown.map((entry) => (
            <li key={entry.key}>
              <Link
                to="/ai-engineering/$phase/$lesson"
                params={{ phase: entry.phase, lesson: entry.lesson }}
                className="group border-foreground/10 hover:border-primary/50 bg-card flex h-full items-start justify-between gap-3 rounded-xl border px-4 py-3 transition-colors"
              >
                <span className="min-w-0">
                  <span className="text-muted-foreground block font-mono text-[9px] tracking-[0.18em] uppercase">
                    {phaseTitle(entry.phase)}
                  </span>
                  <span className="mt-1 block leading-snug font-semibold text-balance">
                    {entry.title}
                  </span>
                </span>
                <span className="flex shrink-0 flex-col items-end gap-1.5 pt-0.5">
                  {entry.minutes ? (
                    <span className="text-muted-foreground flex items-center gap-1 text-[11px] tabular-nums">
                      <Clock className="size-3" aria-hidden="true" />
                      {entry.minutes}m
                    </span>
                  ) : null}
                  {entry.quiz ? (
                    <FileQuestion
                      className="text-muted-foreground size-4"
                      aria-label="Includes self-check quiz"
                    />
                  ) : null}
                </span>
              </Link>
            </li>
          ))}
        </ol>

        {shown.length === 0 && (
          <p className="text-muted-foreground mt-10 text-center">
            Nothing matches. Clear the search or pick another phase.
          </p>
        )}

        {visible < filtered.length && (
          <div className="mt-8 text-center">
            <Button
              variant="outline"
              className="rounded-full"
              onClick={() => setVisible((v) => v + PAGE_SIZE)}
            >
              Show more ({filtered.length - visible} remaining)
            </Button>
          </div>
        )}
      </section>

      <section className="container-page pb-4">
        <Eyebrow>
          <BookOpenCheck className="size-3.5" aria-hidden="true" /> MIT, properly
        </Eyebrow>
        <p className="text-muted-foreground mt-3 max-w-3xl text-sm leading-relaxed">
          Every lesson here is reproduced from{" "}
          <a
            href={AI_SOURCE.repo}
            className="text-primary font-semibold hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            AI Engineering from Scratch
          </a>{" "}
          by Rohit Ghumare under the MIT License (© 2026). Code stays the author’s; if something
          needs fixing, it gets fixed upstream. CEA’s contribution is teaching, hosting, quizzes in
          context and local delivery.
        </p>
      </section>

      <CTASection
        title="Free curriculum, structured if you want it."
        description="Work through this at your own pace — or join a CEA cohort and get labs, mentors and a certificate that employers here recognise."
        primary={{ label: "Explore CEA AI courses", to: "/classes" }}
        secondary={{ label: "Apply for admission", to: "/apply" }}
      />
    </PageShell>
  );
}
