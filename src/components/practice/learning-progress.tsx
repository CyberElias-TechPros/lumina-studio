"use client";

import { useState } from "react";
import { Bookmark, Check, ArrowRight } from "lucide-react";
import { Link } from "@/lib/next-compat/router";
import { useProgress } from "@/components/practice/use-learning-progress";
import { beginnerLessonSlugs } from "@/data/practice/beginner-challenges";
import { updateProgress } from "@/lib/learning/progress";

const buttonClass =
  "border-border bg-background hover:border-primary/50 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50";
const storageMessage =
  "Optional: buttons save only your bookmarks and completion marks on this browser, not your answers. Shared device? Clear your trail when finished.";

export function LessonProgressControls({ slug }: { slug: string }) {
  const { progress, error } = useProgress();
  const [message, setMessage] = useState("");
  const entry = progress.lessons[slug] ?? { completed: false, bookmarked: false };
  function change(field: "completed" | "bookmarked") {
    if (!(beginnerLessonSlugs as readonly string[]).includes(slug)) return;
    const ok = updateProgress((current) => {
      const previous = current.lessons[slug] ?? { completed: false, bookmarked: false };
      return {
        ...current,
        lessons: { ...current.lessons, [slug]: { ...previous, [field]: !previous[field] } },
      };
    });
    setMessage(
      ok
        ? "Your trail was updated on this browser."
        : "Could not save. Check browser storage or clear unreadable progress on your trail.",
    );
  }
  return (
    <div className="border-border bg-background mt-6 rounded-xl border p-4">
      <p className="text-sm font-semibold">Keep your place, if you want</p>
      <p className="text-muted-foreground mt-2 text-xs leading-relaxed">{storageMessage}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button type="button" onClick={() => change("bookmarked")} className={buttonClass}>
          <Bookmark aria-hidden="true" className="size-4" />
          {entry.bookmarked ? "Remove bookmark" : "Bookmark lesson"}
        </button>
        <button type="button" onClick={() => change("completed")} className={buttonClass}>
          <Check aria-hidden="true" className="size-4" />
          {entry.completed ? "Undo lesson completion" : "Mark lesson complete"}
        </button>
      </div>
      <p aria-live="polite" className="text-muted-foreground mt-2 text-xs">
        {message || error || (entry.completed ? "You marked this lesson complete." : "")}
      </p>
      <Link
        to="/learning-trail"
        className="text-primary mt-1 inline-flex min-h-11 items-center gap-2 text-sm font-semibold hover:underline"
      >
        View my learning trail <ArrowRight aria-hidden="true" className="size-4" />
      </Link>
    </div>
  );
}

export function LabProgressControl({ activitiesComplete }: { activitiesComplete: boolean }) {
  const { progress, error } = useProgress();
  const [message, setMessage] = useState("");
  const marked = progress.labCompleted;
  function toggle() {
    const ok = updateProgress((current) => ({ ...current, labCompleted: !current.labCompleted }));
    setMessage(
      ok
        ? "Your trail was updated on this browser."
        : "Could not save. Check browser storage or clear unreadable progress on your trail.",
    );
  }
  return (
    <section
      aria-label="Save lab progress"
      className="border-border bg-card rounded-2xl border p-5 sm:p-7"
    >
      <h2 className="font-display text-xl font-semibold">Keep your place, if you want</h2>
      <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
        {storageMessage} This records your own completion mark, not a certificate.
      </p>
      {!activitiesComplete && !marked && (
        <p className="text-muted-foreground mt-3 text-sm">
          Try all three activities before marking this lab complete.
        </p>
      )}
      <button
        type="button"
        onClick={toggle}
        disabled={!activitiesComplete && !marked}
        className={`${buttonClass} mt-4`}
      >
        <Check aria-hidden="true" className="size-4" />
        {marked ? "Undo lab completion" : "Mark lab complete"}
      </button>
      <p aria-live="polite" className="text-muted-foreground mt-2 text-xs">
        {message || error || (marked ? "You marked this lab complete." : "")}
      </p>
      <Link
        to="/learning-trail"
        className="text-primary mt-1 inline-flex min-h-11 items-center gap-2 text-sm font-semibold hover:underline"
      >
        View my learning trail <ArrowRight aria-hidden="true" className="size-4" />
      </Link>
    </section>
  );
}
