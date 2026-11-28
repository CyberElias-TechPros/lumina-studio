"use client";

import { useMemo, useState } from "react";
import { Check, RotateCcw, X, Sparkles, CircleHelp } from "lucide-react";
import { cn } from "@/lib/utils";

export type LessonQuizQuestion = {
  stage: string;
  question: string;
  options: string[];
  correct: number;
  explanation?: string;
};

type QuestionState = {
  selected: number | null;
  revealed: boolean;
};

const stageLabel = (stage: string) => {
  const s = stage.toLowerCase();
  if (s === "pre") return { label: "Warm-up", hint: "Before the lesson" };
  if (s === "post") return { label: "Check", hint: "After the lesson" };
  return { label: stage.toUpperCase(), hint: "Self-check" };
};

/**
 * Self-check quiz for a lesson — adapted directly from the vendored
 * "quiz.json" files in AI Engineering from Scratch (MIT © 2026 Rohit
 * Ghumare). Immediate feedback, explanations, and a score summary.
 */
export function LessonQuiz({
  questions,
  title = "Check yourself",
}: {
  questions: readonly LessonQuizQuestion[];
  title?: string;
}) {
  const [state, setState] = useState<QuestionState[]>(() =>
    questions.map(() => ({ selected: null, revealed: false })),
  );

  const total = questions.length;
  const answered = state.filter((s) => s.revealed).length;
  const correctCount = state.reduce(
    (sum, s, i) => sum + (s.revealed && s.selected === questions[i].correct ? 1 : 0),
    0,
  );
  const done = answered === total;

  const choose = (questionIndex: number, optionIndex: number) => {
    setState((current) => {
      if (current[questionIndex].revealed) return current;
      const next = current.slice();
      next[questionIndex] = { selected: optionIndex, revealed: true };
      return next;
    });
  };

  const reset = () => setState(questions.map(() => ({ selected: null, revealed: false })));

  const scoreMessage = useMemo(() => {
    if (!done) return null;
    if (correctCount === total) return "Flawless. You actually get this — move on or read deeper.";
    if (correctCount >= Math.ceil(total * 0.6))
      return "Solid. Re-read the parts you missed, then continue.";
    return "Worth another pass through the lesson before the next one.";
  }, [done, correctCount, total]);

  return (
    <section
      className="border-foreground/10 bg-card overflow-hidden rounded-xl border"
      aria-label={`${title} — ${total} questions`}
    >
      {/* header */}
      <div className="border-foreground/10 flex flex-wrap items-center justify-between gap-3 border-b px-5 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="bg-primary/10 text-primary inline-flex size-9 items-center justify-center rounded-xl">
            <CircleHelp className="size-5" aria-hidden="true" />
          </span>
          <div>
            <h2 className="font-display text-lg leading-tight font-semibold tracking-tight">
              {title}
            </h2>
            <p className="text-muted-foreground font-mono text-[10px] tracking-[0.2em] uppercase">
              {answered}/{total} answered
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={reset}
          className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 rounded-full border border-foreground/10 px-3 py-1.5 text-xs font-semibold transition-colors"
        >
          <RotateCcw className="size-3.5" aria-hidden="true" />
          Reset
        </button>
      </div>

      <ol className="divide-y divide-foreground/8">
        {questions.map((question, qi) => {
          const { selected, revealed } = state[qi];
          const badge = stageLabel(question.stage);
          return (
            <li key={qi} className="px-5 py-5 sm:px-6">
              <div className="flex items-start gap-3">
                <span
                  className="mt-0.5 inline-flex shrink-0 flex-col items-center rounded-lg border border-foreground/10 bg-muted/40 px-2 py-1"
                  title={badge.hint}
                >
                  <span className="font-mono text-[9px] font-semibold tracking-[0.18em] uppercase">
                    {badge.label}
                  </span>
                </span>
                <p className="leading-snug font-semibold">{question.question}</p>
              </div>

              <div
                className="mt-3 grid gap-2 sm:grid-cols-2"
                role="group"
                aria-label={`Options for question ${qi + 1}`}
              >
                {question.options.map((option, oi) => {
                  const isCorrect = oi === question.correct;
                  const isSelected = oi === selected;
                  const showCorrect = revealed && isCorrect;
                  const showWrong = revealed && isSelected && !isCorrect;
                  return (
                    <button
                      key={oi}
                      type="button"
                      onClick={() => choose(qi, oi)}
                      disabled={revealed}
                      aria-pressed={isSelected}
                      className={cn(
                        "flex items-start gap-2 rounded-xl border px-3.5 py-2.5 text-left text-sm leading-snug transition-all",
                        !revealed &&
                          "border-foreground/12 bg-background hover:border-primary/60 hover:bg-primary/5 cursor-pointer",
                        showCorrect &&
                          "border-emerald-500/60 bg-emerald-500/10 text-emerald-900 dark:text-emerald-100",
                        showWrong &&
                          "border-rose-500/60 bg-rose-500/10 text-rose-900 dark:text-rose-100",
                        revealed && !showCorrect && !showWrong && "border-foreground/8 opacity-60",
                      )}
                    >
                      <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full border border-current/30 text-[10px] font-bold">
                        {showCorrect ? (
                          <Check className="size-3" aria-hidden="true" />
                        ) : showWrong ? (
                          <X className="size-3" aria-hidden="true" />
                        ) : (
                          String.fromCharCode(65 + oi)
                        )}
                      </span>
                      <span>{option}</span>
                    </button>
                  );
                })}
              </div>

              {revealed && question.explanation && (
                <p
                  className="mt-3 rounded-xl border border-foreground/8 bg-muted/35 px-4 py-2.5 text-[13px] leading-relaxed text-muted-foreground"
                  role="status"
                >
                  <span className="text-foreground font-semibold">Why: </span>
                  {question.explanation}
                </p>
              )}
            </li>
          );
        })}
      </ol>

      {/* summary */}
      {done && (
        <div
          className="border-foreground/10 flex flex-wrap items-center justify-between gap-3 border-t bg-primary/5 px-5 py-4 sm:px-6"
          role="status"
          aria-live="polite"
        >
          <p className="flex items-center gap-2 text-sm">
            <Sparkles className="text-primary size-4" aria-hidden="true" />
            <span>
              <strong className="tabular-nums">
                {correctCount}/{total}
              </strong>{" "}
              — {scoreMessage}
            </span>
          </p>
        </div>
      )}
    </section>
  );
}
