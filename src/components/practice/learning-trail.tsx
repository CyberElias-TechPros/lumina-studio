"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "@/lib/next-compat/router";
import { clearProgress } from "@/lib/learning/progress";
import { useProgress } from "@/components/practice/use-learning-progress";

const buttonClass =
  "border-border bg-background hover:border-primary/50 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50";

export function LearningTrail({ lessons }: { lessons: { slug: string; title: string }[] }) {
  const { progress, error, hasSaved } = useProgress();
  const [message, setMessage] = useState("");
  const completeCount = lessons.filter((lesson) => progress.lessons[lesson.slug]?.completed).length;
  const next = lessons.find((lesson) => !progress.lessons[lesson.slug]?.completed);
  const bookmarks = lessons.filter((lesson) => progress.lessons[lesson.slug]?.bookmarked);
  function clear() {
    setMessage(
      clearProgress()
        ? "Saved bookmarks and completion marks were cleared from this browser."
        : "Could not clear progress. Check browser storage settings.",
    );
  }
  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,0.8fr)] lg:items-start">
      <div>
        <div className="rounded-2xl bg-[#101f34] p-6 text-white">
          <p className="text-xs font-semibold tracking-widest text-[#a4dce7] uppercase">
            Your beginner trail
          </p>
          <h2 className="font-display mt-2 text-2xl font-semibold">
            {completeCount} of {lessons.length} lessons marked complete
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-200">
            These are your own marks, not a test score or a certificate. You can revisit any step.
          </p>
          <div
            role="progressbar"
            aria-label="Lessons marked complete"
            aria-valuemin={0}
            aria-valuemax={lessons.length}
            aria-valuenow={completeCount}
            aria-valuetext={`${completeCount} of ${lessons.length} lessons marked complete`}
            className="mt-5 h-2 overflow-hidden rounded-full bg-white/20"
          >
            <div
              className="h-full rounded-full bg-[#8ed9e4] transition-[width] motion-reduce:transition-none"
              style={{ width: `${lessons.length ? (completeCount / lessons.length) * 100 : 0}%` }}
            />
          </div>
        </div>
        <section
          className="border-border bg-card mt-6 rounded-2xl border p-5 sm:p-7"
          aria-labelledby="continue-title"
        >
          <p className="text-primary text-xs font-semibold tracking-widest uppercase">
            A suggested next step
          </p>
          <h2 id="continue-title" className="font-display mt-2 text-2xl font-semibold">
            {next
              ? "Continue learning"
              : !progress.labCompleted
                ? "Try the practice lab"
                : "Explore more at your own pace"}
          </h2>
          <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
            {next
              ? `Your first lesson not yet marked complete: ${next.title}.`
              : !progress.labCompleted
                ? "You've marked all five lessons. Try the lab to practise pointing, typing and naming a file."
                : "You have marked the five lessons and the lab complete. You can revisit them or browse more notes."}
          </p>
          <Link
            to={
              next
                ? `/blog/${next.slug}`
                : !progress.labCompleted
                  ? "/practice/computer-basics"
                  : "/blog"
            }
            className="bg-primary text-primary-foreground mt-5 inline-flex min-h-11 items-center gap-2 rounded-lg px-5 text-sm font-semibold"
          >
            {next
              ? "Open next lesson"
              : !progress.labCompleted
                ? "Open the lab"
                : "Browse all notes"}{" "}
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </section>
        <section className="mt-9" aria-labelledby="trail-lessons">
          <h2 id="trail-lessons" className="font-display text-2xl font-semibold">
            Your five beginner lessons
          </h2>
          <ol className="mt-4 space-y-3">
            {lessons.map((lesson, index) => {
              const entry = progress.lessons[lesson.slug];
              return (
                <li key={lesson.slug} className="border-border bg-card rounded-xl border p-4">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="text-primary font-semibold">0{index + 1} / LESSON</span>
                    {entry?.completed && (
                      <span className="bg-primary/10 text-primary rounded-full px-2 py-1 font-medium">
                        Marked complete
                      </span>
                    )}
                    {entry?.bookmarked && (
                      <span className="bg-muted rounded-full px-2 py-1 font-medium">
                        Bookmarked
                      </span>
                    )}
                  </div>
                  <Link
                    to={`/blog/${lesson.slug}`}
                    className="font-display hover:text-primary mt-2 inline-flex min-h-11 items-center gap-2 text-base font-semibold"
                  >
                    {lesson.title} <ArrowRight aria-hidden="true" className="size-4" />
                  </Link>
                </li>
              );
            })}
          </ol>
        </section>
      </div>
      <aside className="space-y-5">
        <section className="border-border bg-card rounded-2xl border p-6">
          <h2 className="font-display text-xl font-semibold">Your bookmarks</h2>
          {bookmarks.length ? (
            <ul className="mt-3 space-y-2">
              {bookmarks.map((lesson) => (
                <li key={lesson.slug}>
                  <Link
                    to={`/blog/${lesson.slug}`}
                    className="text-primary inline-flex min-h-11 items-center text-sm font-semibold hover:underline"
                  >
                    {lesson.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
              No bookmarks yet. Use “Bookmark lesson” on any of the five lessons to keep it here.
            </p>
          )}
        </section>
        <section className="border-border bg-card rounded-2xl border p-6">
          <h2 className="font-display text-xl font-semibold">Computer Basics Lab</h2>
          <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
            {progress.labCompleted
              ? "You marked the lab complete."
              : "Try three activities, then optionally mark the lab complete."}
          </p>
          <Link
            to="/practice/computer-basics"
            className="text-primary mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-semibold hover:underline"
          >
            Open the lab <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </section>
        <section className="border-border bg-muted/30 rounded-2xl border p-6">
          <h2 className="font-display text-xl font-semibold">Your privacy</h2>
          <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
            Progress is optional and stays in this browser on this device. We save only your
            bookmarks and completion marks when you choose to; answers and typed practice are not
            saved. It does not sync to other devices and can be removed by your browser. On a shared
            device, clear it when finished.
          </p>
          <button
            type="button"
            onClick={clear}
            disabled={!hasSaved}
            className={`${buttonClass} mt-4`}
          >
            Clear saved learning progress
          </button>
          <p aria-live="polite" className="text-muted-foreground mt-3 text-xs leading-relaxed">
            {message || error || (!hasSaved ? "No saved learning progress on this browser." : "")}
          </p>
          <p className="text-muted-foreground mt-3 text-xs">
            Clearing the trail does not clear application drafts or other browser data.
          </p>
        </section>
      </aside>
    </div>
  );
}
