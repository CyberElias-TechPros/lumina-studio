"use client";

import { useState } from "react";
import { ArrowRight, Lightbulb } from "lucide-react";
import { Link } from "@/lib/next-compat/router";
import type { LessonChallenge } from "@/data/practice/beginner-challenges";
import { LessonProgressControls } from "@/components/practice/learning-progress";
import { trackLearningEvent } from "@/lib/learning/measurement";

export function LessonChallengeCard({
  challenge,
  slug,
}: {
  challenge: LessonChallenge;
  slug: string;
}) {
  const [selected, setSelected] = useState("");
  const [checked, setChecked] = useState(false);
  const answer = challenge.options.find((option) => option.id === selected);
  return (
    <section
      aria-labelledby="lesson-practice-heading"
      className="border-primary/25 bg-primary/5 mt-12 rounded-2xl border p-5 sm:p-7"
    >
      <p className="text-primary flex items-center gap-2 text-xs font-semibold tracking-widest uppercase">
        <Lightbulb aria-hidden="true" className="size-4" /> Try what you learned
      </p>
      <h2 id="lesson-practice-heading" className="font-display mt-3 text-2xl font-semibold">
        A small practice check
      </h2>
      <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
        Choose an answer and see why. This is practice, not a test; you can change your answer and
        try again. The check needs JavaScript; you can still read the lesson without it.
      </p>
      <fieldset className="mt-5">
        <legend className="text-base font-semibold">{challenge.question}</legend>
        <div className="mt-3 grid gap-2">
          {challenge.options.map((option) => (
            <label
              key={option.id}
              className="border-border bg-card flex cursor-pointer items-start gap-3 rounded-xl border p-4 text-sm has-[:checked]:border-primary has-[:checked]:bg-primary/5"
            >
              <input
                type="radio"
                className="accent-primary mt-0.5 size-4 shrink-0"
                name={`practice-${slug}`}
                value={option.id}
                checked={selected === option.id}
                onChange={() => {
                  setSelected(option.id);
                  setChecked(false);
                }}
              />
              <span>{option.text}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <button
        type="button"
        disabled={!selected}
        onClick={() => {
          trackLearningEvent("cea_lesson_check");
          setChecked(true);
        }}
        className="bg-primary text-primary-foreground mt-4 inline-flex min-h-11 items-center rounded-lg px-5 text-sm font-semibold disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        Check my answer
      </button>
      <div aria-live="polite" aria-atomic="true">
        {checked && answer && (
          <div className="border-border bg-background mt-4 rounded-xl border p-4 text-sm leading-relaxed">
            <p className="font-semibold">
              {answer.correct ? "That's a useful choice." : "Let's look at it together."}
            </p>
            <p className="text-muted-foreground mt-1">{answer.feedback}</p>
          </div>
        )}
      </div>
      <p className="text-muted-foreground mt-5 text-xs">
        Your choice stays on this page and is not saved or submitted.
      </p>
      <LessonProgressControls slug={slug} />
      <Link
        to="/practice/computer-basics"
        className="text-primary mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-semibold hover:underline"
      >
        Try the Computer Basics Lab <ArrowRight aria-hidden="true" className="size-4" />
      </Link>
    </section>
  );
}
