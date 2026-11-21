"use client";

import { useEffect, useMemo, useState } from "react";
import { Link } from "@/lib/next-compat/router";
import {
  CheckCircle2,
  Clock,
  HelpCircle,
  RotateCcw,
  ShieldAlert,
  Sparkles,
  XCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AssessQuestion {
  id: string;
  topic: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  hint: string;
  explanation: string;
}

interface AssessTrack {
  id: string;
  title: string;
  courseSlug: string;
  courseTitle: string;
  minutes: number;
  questions: AssessQuestion[];
}

const TRACKS: AssessTrack[] = [
  {
    id: "computer-basics",
    title: "Computer Basics & Online Safety",
    courseSlug: "computer-basics-typing",
    courseTitle: "Computer Basics & Typing",
    minutes: 5,
    questions: [
      {
        id: "cb-1",
        topic: "Files & Storage",
        prompt:
          "Which keyboard shortcut saves the document you are currently working on in most desktop programs?",
        options: ["Ctrl + P", "Ctrl + S", "Ctrl + X", "Alt + F4"],
        correctIndex: 1,
        hint: "Think of the first letter of the word 'Save'.",
        explanation:
          "Ctrl + S (Cmd + S on Mac) saves changes immediately — essential when power is unstable.",
      },
      {
        id: "cb-2",
        topic: "Phishing & Links",
        prompt:
          "You receive an SMS claiming your bank account is blocked and linking to 'gtb-verify-ng.xyz'. What should you do?",
        options: [
          "Click quickly and enter your PIN before it locks",
          "Forward it to friends to check",
          "Delete it and open your bank's official app or dial their verified USSD code directly",
          "Reply STOP with your BVN",
        ],
        correctIndex: 2,
        hint: "Never trust an urgent domain that differs from the bank's real website.",
        explanation:
          "Look-alike domains are phishing traps. Always use the official app or type the verified address yourself.",
      },
      {
        id: "cb-3",
        topic: "File Management",
        prompt: "Which file name is best for a CV you plan to email to a Port Harcourt employer?",
        options: [
          "Document(14).docx",
          "my new cv final final v2.docx",
          "Amina-Bello-CV-2026.pdf",
          "IMG_20261104.jpg",
        ],
        correctIndex: 2,
        hint: "Employers prefer PDF files with your full name in the filename.",
        explanation:
          "PDF preserves formatting across phones and laptops, and naming it clearly makes you easy to find.",
      },
      {
        id: "cb-4",
        topic: "Typing & Ergonomics",
        prompt: "On a standard QWERTY keyboard, which row do your fingers return to between words?",
        options: ["Number row", "Top row (QWERTY)", "Home row (ASDF / JKL;)", "Bottom row"],
        correctIndex: 2,
        hint: "The F and J keys have small raised bumps to guide your index fingers.",
        explanation:
          "Resting on ASDF and JKL; reduces finger travel and builds accuracy without looking down.",
      },
    ],
  },
  {
    id: "web-dev",
    title: "Web Development & CSS Layout",
    courseSlug: "web-development",
    courseTitle: "Web Development",
    minutes: 6,
    questions: [
      {
        id: "wd-1",
        topic: "Semantic HTML",
        prompt: "Which HTML element should wrap the primary navigation links of a website?",
        options: ['<div class="menu">', "<nav>", "<section>", "<header-links>"],
        correctIndex: 1,
        hint: "Screen readers look for a built-in landmark tag named after navigation.",
        explanation:
          "<nav> communicates navigation landmarks directly to browsers and assistive screen readers.",
      },
      {
        id: "wd-2",
        topic: "Flexbox",
        prompt:
          "In a row flex container, which property distributes items evenly with the first at the left edge and the last at the right edge?",
        options: [
          "align-items: center",
          "justify-content: space-between",
          "flex-wrap: wrap",
          "display: grid",
        ],
        correctIndex: 1,
        hint: "Horizontal alignment along the main row axis uses justify-content.",
        explanation:
          "justify-content: space-between places equal space between flex children without outer padding.",
      },
      {
        id: "wd-3",
        topic: "CSS Grid",
        prompt: "What does `grid-template-columns: 1fr 3fr;` create?",
        options: [
          "Two rows of equal height",
          "Two columns where the second column is three times as wide as the first",
          "Four equal columns",
          "A fixed 1px border",
        ],
        correctIndex: 1,
        hint: "fr stands for fractional unit of remaining available space.",
        explanation:
          "1fr + 3fr splits available width into 4 shares: 25% for the sidebar and 75% for main content.",
      },
      {
        id: "wd-4",
        topic: "JavaScript Events",
        prompt: "Why do we call `event.preventDefault()` inside a form's submit listener?",
        options: [
          "To encrypt the password automatically",
          "To stop the browser from reloading the page so JS can validate and handle the submission",
          "To clear all input fields",
          "To hide console errors",
        ],
        correctIndex: 1,
        hint: "Default HTML form submission triggers a full page navigation.",
        explanation:
          "Calling preventDefault() lets client-side validation run cleanly without wiping the UI state.",
      },
    ],
  },
  {
    id: "sql-data",
    title: "Data Analytics & SQL",
    courseSlug: "data-analytics",
    courseTitle: "Data Analytics",
    minutes: 6,
    questions: [
      {
        id: "sq-1",
        topic: "Filtering",
        prompt: "Which clause filters grouped aggregate results such as `COUNT(*) >= 3`?",
        options: ["WHERE", "ORDER BY", "HAVING", "LIMIT"],
        correctIndex: 2,
        hint: "WHERE filters rows before grouping; another clause filters groups afterwards.",
        explanation:
          "HAVING runs after GROUP BY so it can evaluate COUNT(), SUM(), and AVG() results.",
      },
      {
        id: "sq-2",
        topic: "Joins",
        prompt:
          "You want ALL orders in your result, even orders that do not yet have a matching row in `payments`. Which join should you write?",
        options: ["INNER JOIN", "LEFT JOIN", "CROSS JOIN", "SELF JOIN"],
        correctIndex: 1,
        hint: "Keep every row from the left table (`orders`) even if the right table has NULL.",
        explanation:
          "LEFT JOIN preserves every row from `orders` and fills missing payment columns with NULL.",
      },
      {
        id: "sq-3",
        topic: "Data Cleaning",
        prompt:
          "A sales CSV has '120000' in most rows and 'not_a_number' in one row of `amount_ngn`. What is the safest first step?",
        options: [
          "Delete the whole column",
          "Flag and inspect the non-numeric row against the source receipt before converting types",
          "Replace it with 1,000,000",
          "Ignore it and run SUM anyway",
        ],
        correctIndex: 1,
        hint: "Never invent financial figures or silently drop rows without checking.",
        explanation:
          "Auditing invalid values against the original POS/Paystack record prevents silent reporting distortion.",
      },
      {
        id: "sq-4",
        topic: "Aggregation",
        prompt: "What is the difference between `COUNT(*)` and `COUNT(email)`?",
        options: [
          "No difference at all",
          "`COUNT(*)` counts every row; `COUNT(email)` skips rows where email is NULL",
          "`COUNT(*)` is twice as slow and disallowed in SQLite",
          "`COUNT(email)` adds numbers together",
        ],
        correctIndex: 1,
        hint: "Column-specific COUNT ignores NULL entries.",
        explanation: "Knowing how COUNT handles NULLs prevents under-counting orders or customers.",
      },
    ],
  },
  {
    id: "excel-office",
    title: "Microsoft Office & Spreadsheets",
    courseSlug: "microsoft-office",
    courseTitle: "Microsoft Office",
    minutes: 5,
    questions: [
      {
        id: "ex-1",
        topic: "Conditional Logic",
        prompt:
          'Which Excel formula returns "Pass" if cell B2 is 50 or higher, and "Resit" otherwise?',
        options: [
          '=SUM(B2>=50, "Pass", "Resit")',
          '=IF(B2>=50, "Pass", "Resit")',
          "=COUNTIF(B2, 50)",
          '=VLOOKUP(B2, 50, "Pass")',
        ],
        correctIndex: 1,
        hint: "Three arguments: condition, value_if_true, value_if_false.",
        explanation:
          "=IF(condition, true_value, false_value) is the backbone of automated grading and discount sheets.",
      },
      {
        id: "ex-2",
        topic: "Error Diagnosis",
        prompt: "A spreadsheet cell displays `#DIV/0!`. What caused it?",
        options: [
          "The column is slightly too narrow",
          "The formula attempted to divide by zero or an empty cell",
          "You misspelled the sheet tab name",
          "The file is password-protected",
        ],
        correctIndex: 1,
        hint: "Too-narrow columns show `###`; look at the math word `DIV`.",
        explanation:
          "#DIV/0! means division by zero — often fixed by checking blank input cells or wrapping with IFERROR.",
      },
      {
        id: "ex-3",
        topic: "Conditional Totals",
        prompt:
          'You want to sum column C (`Amount`) ONLY where column B (`Channel`) equals "POS". Which function fits?',
        options: [
          "=AVERAGE(C2:C50)",
          '=SUMIF(B2:B50, "POS", C2:C50)',
          "=MAX(C2:C50)",
          "=COUNTA(B2:B50)",
        ],
        correctIndex: 1,
        hint: "Combine SUM and IF into a single range-criteria-sum_range function.",
        explanation:
          "SUMIF evaluates a criteria range first and sums only the matching rows from the third argument.",
      },
    ],
  },
  {
    id: "ai-literacy",
    title: "AI Literacy & Prompt Engineering",
    courseSlug: "ai-productivity",
    courseTitle: "AI Productivity",
    minutes: 5,
    questions: [
      {
        id: "ai-1",
        topic: "Prompt Structure",
        prompt: "Why does adding audience, length limit and output format improve an AI draft?",
        options: [
          "It increases the cost per word",
          "It narrows the model's choices from generic filler to a specific deliverable",
          "It disables model memory",
          "It forces the AI to browse paid databases",
        ],
        correctIndex: 1,
        hint: "Compare 'Write an email' with specifying audience, tone, word count and format.",
        explanation:
          "Clear constraints remove guesswork so you spend seconds reviewing rather than rewriting.",
      },
      {
        id: "ai-2",
        topic: "Verification",
        prompt:
          "An AI assistant cites a Nigerian tax threshold or GitHub repository URL you did not provide. What should you do?",
        options: [
          "Publish it immediately because models never invent citations",
          "Verify the statute, number or repository link against the primary source before using it",
          "Ask the same model 'Are you 100% sure?' and trust 'Yes'",
          "Increase the font size so readers trust it",
        ],
        correctIndex: 1,
        hint: "Language models predict plausible text; they can fabricate URLs and figures.",
        explanation:
          "Always verify URLs, legal dates, prices and statistics against primary sources.",
      },
      {
        id: "ai-3",
        topic: "Privacy",
        prompt: "Which of these should NEVER be pasted into a public consumer AI chat window?",
        options: [
          "A generic practice CSS snippet",
          "A sample fictional grocery list",
          "Customer BVN/NIN records, live API secret keys, or private medical files",
          "A public blog headline you want to shorten",
        ],
        correctIndex: 2,
        hint: "Think about sensitive PII and production credentials.",
        explanation:
          "Strip personally identifiable data and secret credentials before using any external AI tool.",
      },
    ],
  },
];

export function AssessStudio() {
  const [trackIdx, setTrackIdx] = useState(0);
  const track = TRACKS[trackIdx];
  const [mode, setMode] = useState<"study" | "exam">("study");
  const [qIdx, setQIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [showHint, setShowHint] = useState(false);
  const [finished, setFinished] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(track.minutes * 60);

  useEffect(() => {
    if (mode !== "exam" || finished) return;
    const timer = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [mode, finished]);

  const startTrack = (idx: number, nextMode = mode) => {
    const nextTrack = TRACKS[idx];
    setTrackIdx(idx);
    setMode(nextMode);
    setQIdx(0);
    setAnswers({});
    setRevealed({});
    setShowHint(false);
    setFinished(false);
    setSecondsLeft(nextTrack.minutes * 60);
  };

  const question = track.questions[qIdx];
  const selected = answers[question.id];
  const isRevealed = mode === "study" && Boolean(revealed[question.id]);

  const scoreSummary = useMemo(() => {
    let correct = 0;
    const weakTopics: string[] = [];
    for (const q of track.questions) {
      if (answers[q.id] === q.correctIndex) correct += 1;
      else if (!weakTopics.includes(q.topic)) weakTopics.push(q.topic);
    }
    const pct = Math.round((correct / track.questions.length) * 100);
    return { correct, total: track.questions.length, pct, weakTopics };
  }, [track, answers]);

  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");

  return (
    <div className="space-y-6">
      {/* Track & Mode Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {TRACKS.map((t, idx) => (
            <button
              key={t.id}
              type="button"
              onClick={() => startTrack(idx)}
              className={cn(
                "cursor-pointer rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
                idx === trackIdx
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-foreground/15 bg-card hover:bg-muted",
              )}
            >
              {t.title}
            </button>
          ))}
        </div>

        <div className="border-foreground/12 bg-card inline-flex rounded-full border p-1">
          <button
            type="button"
            onClick={() => startTrack(trackIdx, "study")}
            className={cn(
              "cursor-pointer rounded-full px-3.5 py-1 text-xs font-semibold",
              mode === "study" ? "bg-primary text-primary-foreground" : "text-muted-foreground",
            )}
          >
            Study Mode (Hints)
          </button>
          <button
            type="button"
            onClick={() => startTrack(trackIdx, "exam")}
            className={cn(
              "cursor-pointer rounded-full px-3.5 py-1 text-xs font-semibold",
              mode === "exam" ? "bg-primary text-primary-foreground" : "text-muted-foreground",
            )}
          >
            Timed Exam Mode
          </button>
        </div>
      </div>

      {/* Assessment Card */}
      <div className="border-foreground/12 bg-card mx-auto max-w-3xl rounded-2xl border p-6 sm:p-8">
        {!finished ? (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-foreground/10 pb-4">
              <div>
                <p className="text-primary font-mono text-[10px] tracking-[0.2em] uppercase">
                  Question {qIdx + 1} of {track.questions.length} · {question.topic}
                </p>
                <p className="text-muted-foreground mt-0.5 text-xs">{track.title}</p>
              </div>
              {mode === "exam" ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/12 px-3 py-1 font-mono text-xs font-semibold text-amber-700 dark:text-amber-300">
                  <Clock className="size-3.5" aria-hidden="true" /> {mm}:{ss}
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowHint((h) => !h)}
                  className="border-foreground/15 hover:bg-muted inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium"
                >
                  <HelpCircle className="size-3.5" aria-hidden="true" />
                  {showHint ? "Hide hint" : "Hint"}
                </button>
              )}
            </div>

            {showHint && mode === "study" && (
              <p className="bg-primary/8 rounded-xl px-4 py-2.5 text-xs leading-relaxed">
                <strong>Hint:</strong> {question.hint}
              </p>
            )}

            <h2 className="font-display text-xl leading-snug font-semibold sm:text-2xl">
              {question.prompt}
            </h2>

            <div className="space-y-2.5">
              {question.options.map((opt, idx) => {
                const isSelected = selected === idx;
                const isCorrect = idx === question.correctIndex;
                return (
                  <button
                    key={opt}
                    type="button"
                    disabled={isRevealed}
                    onClick={() => {
                      setAnswers((prev) => ({ ...prev, [question.id]: idx }));
                      if (mode === "study") {
                        setRevealed((prev) => ({ ...prev, [question.id]: true }));
                      }
                    }}
                    className={cn(
                      "flex w-full cursor-pointer items-start gap-3 rounded-xl border p-4 text-left text-sm transition-colors",
                      isRevealed && isCorrect && "border-emerald-500 bg-emerald-500/10 font-medium",
                      isRevealed && isSelected && !isCorrect && "border-rose-500 bg-rose-500/10",
                      !isRevealed && isSelected && "border-primary bg-primary/8 font-medium",
                      !isRevealed && !isSelected && "border-foreground/12 hover:bg-muted/50",
                    )}
                  >
                    <span className="border-foreground/20 mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border font-mono text-[10px]">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="flex-1">{opt}</span>
                  </button>
                );
              })}
            </div>

            {isRevealed && (
              <div className="border-foreground/10 bg-muted/40 rounded-xl border p-4 text-sm">
                <p className="flex items-center gap-1.5 font-semibold">
                  {selected === question.correctIndex ? (
                    <>
                      <CheckCircle2 className="size-4 text-emerald-600" /> Correct
                    </>
                  ) : (
                    <>
                      <XCircle className="size-4 text-rose-600" /> Not quite — best answer is{" "}
                      {String.fromCharCode(65 + question.correctIndex)}
                    </>
                  )}
                </p>
                <p className="text-muted-foreground mt-1.5 text-xs leading-relaxed">
                  {question.explanation}
                </p>
              </div>
            )}

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                disabled={qIdx === 0}
                onClick={() => {
                  setQIdx((i) => Math.max(0, i - 1));
                  setShowHint(false);
                }}
                className="border-foreground/15 hover:bg-muted cursor-pointer rounded-full border px-4 py-2 text-xs font-medium disabled:opacity-40"
              >
                Previous
              </button>

              {qIdx + 1 < track.questions.length ? (
                <button
                  type="button"
                  onClick={() => {
                    setQIdx((i) => i + 1);
                    setShowHint(false);
                  }}
                  className="bg-primary text-primary-foreground cursor-pointer rounded-full px-5 py-2 text-xs font-semibold"
                >
                  Next question
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setFinished(true)}
                  className="bg-primary text-primary-foreground cursor-pointer rounded-full px-5 py-2 text-xs font-semibold"
                >
                  Finish &amp; Review Score
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-foreground/10 pb-5">
              <div>
                <p className="text-primary font-mono text-[10px] tracking-[0.2em] uppercase">
                  Self-Assessment Complete
                </p>
                <h2 className="font-display mt-1 text-3xl font-bold">
                  {scoreSummary.correct} / {scoreSummary.total} ({scoreSummary.pct}%)
                </h2>
              </div>
              <button
                type="button"
                onClick={() => startTrack(trackIdx, mode)}
                className="border-foreground/15 hover:bg-muted inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-semibold"
              >
                <RotateCcw className="size-3.5" /> Retake track
              </button>
            </div>

            {scoreSummary.weakTopics.length > 0 ? (
              <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
                <p className="font-semibold">Topics to review next:</p>
                <p className="text-muted-foreground mt-1 text-xs">
                  {scoreSummary.weakTopics.join(" · ")} — consider pairing practice with the{" "}
                  <Link
                    to="/classes/$courseSlug"
                    params={{ courseSlug: track.courseSlug }}
                    className="text-primary font-semibold underline"
                  >
                    {track.courseTitle}
                  </Link>{" "}
                  syllabus.
                </p>
              </div>
            ) : (
              <div className="flex items-center gap-2 rounded-xl bg-emerald-500/12 p-4 text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                <Sparkles className="size-4" /> 100% score on {track.title}!
              </div>
            )}

            <ul className="space-y-3">
              {track.questions.map((q, idx) => {
                const userAns = answers[q.id];
                const ok = userAns === q.correctIndex;
                return (
                  <li key={q.id} className="border-foreground/10 rounded-xl border p-4 text-xs">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-semibold">
                        {idx + 1}. {q.prompt}
                      </p>
                      {ok ? (
                        <CheckCircle2 className="size-4 shrink-0 text-emerald-600" />
                      ) : (
                        <XCircle className="size-4 shrink-0 text-rose-600" />
                      )}
                    </div>
                    <p className="text-muted-foreground mt-1.5">
                      Correct answer: <strong>{q.options[q.correctIndex]}</strong>
                    </p>
                    <p className="text-muted-foreground mt-1">{q.explanation}</p>
                  </li>
                );
              })}
            </ul>

            <p className="text-muted-foreground flex items-start gap-2 rounded-xl border border-foreground/10 p-3 text-[11px] leading-relaxed">
              <ShieldAlert className="size-4 shrink-0 text-primary" aria-hidden="true" />
              This free browser diagnostic helps you choose the right starting track. Official CEA
              certificates are issued only after supervised assessments inside your cohort.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
