"use client";

import { useState, useSyncExternalStore } from "react";
import {
  ArrowRight,
  Check,
  CircleHelp,
  Code2,
  Compass,
  FileText,
  Folder,
  Keyboard,
  Lightbulb,
  Megaphone,
  Monitor,
  MousePointer2,
  Palette,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { Link } from "@/lib/next-compat/router";
import { flyerCourses } from "@/data/academy/catalog";
import type { AcademyCourse } from "@/data/academy/types";

// Each specific goal maps to one course in the canonical flyer catalogue.
const interests = [
  {
    value: "everyday",
    icon: Monitor,
    label: "Everyday computer and office skills",
    detail: "Get comfortable on a computer or work with documents and data.",
    goals: [
      { slug: "computer-basics-typing", label: "Learn the basics of using a computer" },
      { slug: "microsoft-office", label: "Make documents, spreadsheets and presentations" },
      { slug: "data-entry", label: "Organise records and enter data accurately" },
    ],
  },
  {
    value: "creative",
    icon: Palette,
    label: "Creative work and content",
    detail: "Make designs, photos or videos for a project or business.",
    goals: [
      { slug: "graphic-design", label: "Create flyers and visual designs" },
      { slug: "content-creation", label: "Create photo and video content" },
    ],
  },
  {
    value: "web",
    icon: Code2,
    label: "Websites and coding",
    detail: "Design web pages or learn to build interactive websites.",
    goals: [
      { slug: "web-design", label: "Design web pages with HTML and CSS" },
      { slug: "web-development", label: "Build interactive websites with code" },
    ],
  },
  {
    value: "business",
    icon: Megaphone,
    label: "Business, marketing and teaching",
    detail: "Promote a business, work with clients or teach online.",
    goals: [
      { slug: "digital-marketing", label: "Promote a business online" },
      { slug: "social-media-management", label: "Manage a business's social media" },
      { slug: "business-freelancing", label: "Price and deliver freelance work" },
      { slug: "online-teaching", label: "Teach a class or course online" },
    ],
  },
  {
    value: "technical",
    icon: ShieldCheck,
    label: "Computers and digital safety",
    detail: "Understand computer hardware or practise safer digital habits.",
    goals: [
      { slug: "computer-repairs", label: "Understand and troubleshoot computers" },
      { slug: "cybersecurity", label: "Improve my digital safety skills" },
    ],
  },
  {
    value: "unsure",
    icon: Compass,
    label: "I'm not sure yet",
    detail: "Explore a foundation for using a computer while you decide.",
    goals: [{ slug: "computer-basics-typing", label: "Start by building computer confidence" }],
  },
] as const;

type Interest = (typeof interests)[number]["value"];
type Answer = "yes" | "no" | "unsure";

const skillQuestions = [
  {
    key: "typing",
    legend: "3. You want to type in an open document. What would you do?",
    options: [
      { value: "yes", label: "Click inside the document, then use the keyboard" },
      { value: "no", label: "Press the computer's power button" },
      { value: "unsure", label: "I'm not sure yet" },
    ],
    explanation: "Click inside the document to place the cursor, then type with the keyboard.",
  },
  {
    key: "saving",
    legend: "4. How would you keep a document so you can open it later?",
    options: [
      { value: "yes", label: "Use Save or Save As and choose a name and location" },
      { value: "no", label: "Close it without saving" },
      { value: "unsure", label: "I'm not sure yet" },
    ],
    explanation: "Use Save or Save As, choose a name and location, and save the file.",
  },
] as const;

type Recommendation = { course: AcademyCourse; label: string; reason: string };

function recommend(
  interest: Interest,
  goal: string,
  answers: { typing: Answer; saving: Answer },
): Recommendation[] {
  const target = flyerCourses.find((course) => course.slug === goal);
  const basics = flyerCourses.find((course) => course.slug === "computer-basics-typing");
  if (!target) return [];

  const needsFoundation = answers.typing !== "yes" || answers.saving !== "yes";
  const targetReason =
    interest === "unsure"
      ? "You said you are still deciding; this course is one way to explore the basics."
      : "This course matches the goal you chose. Review its requirements before applying.";
  if (needsFoundation && target.slug !== "computer-basics-typing" && basics) {
    return [
      {
        course: basics,
        label: "Consider starting here",
        reason:
          "One or both computer-basics answers need practice or were unsure. This course may help you build confidence first; it is a suggestion, not a requirement.",
      },
      { course: target, label: "Your interest match", reason: targetReason },
    ];
  }
  return [{ course: target, label: "Your interest match", reason: targetReason }];
}

function RecommendationCard({ item }: { item: Recommendation }) {
  const { course } = item;
  return (
    <article className="border-border bg-card rounded-xl border p-5">
      <p className="text-primary text-xs font-semibold tracking-[0.12em] uppercase">{item.label}</p>
      <h4 className="font-display mt-2 text-xl font-semibold tracking-tight">{course.title}</h4>
      <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{item.reason}</p>
      <dl className="border-border mt-4 grid grid-cols-2 gap-3 border-y py-4 text-sm">
        <div>
          <dt className="text-muted-foreground text-xs">Listed fee</dt>
          <dd className="mt-1 font-semibold">₦{course.fee.toLocaleString("en-NG")}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground text-xs">Course length</dt>
          <dd className="mt-1 font-semibold">{course.weeks} weeks</dd>
        </div>
        <div className="col-span-2">
          <dt className="text-muted-foreground text-xs">You practise toward</dt>
          <dd className="mt-1 font-semibold">{course.deliverable.title}</dd>
        </div>
      </dl>
      <Link
        to="/classes/$courseSlug"
        params={{ courseSlug: course.slug }}
        className="text-primary mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold hover:underline"
      >
        See fee, requirements and syllabus <ArrowRight aria-hidden="true" className="size-4" />
      </Link>
    </article>
  );
}

function Choice({
  name,
  value,
  label,
  detail,
  icon: Icon,
  selected,
  onChange,
}: {
  name: string;
  value: string;
  label: string;
  detail?: string;
  icon?: LucideIcon;
  selected: boolean;
  onChange: () => void;
}) {
  return (
    <label className="cursor-pointer">
      <input
        className="peer sr-only"
        type="radio"
        name={name}
        value={value}
        checked={selected}
        onChange={onChange}
      />
      <span
        className={`border-border bg-card hover:border-primary/50 flex h-full min-h-11 items-start gap-3 rounded-xl border p-4 transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 ${selected ? "border-primary bg-primary/5 shadow-sm" : ""}`}
      >
        {Icon && (
          <span
            aria-hidden="true"
            className={`grid size-10 shrink-0 place-items-center rounded-xl ${selected ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"}`}
          >
            <Icon className="size-5" />
          </span>
        )}
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-semibold leading-snug">{label}</span>
          {detail && (
            <span className="text-muted-foreground mt-1.5 block text-xs leading-relaxed">
              {detail}
            </span>
          )}
        </span>
        <span
          aria-hidden="true"
          className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border ${selected ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground/45"}`}
        >
          {selected && <Check className="size-3" strokeWidth={3} />}
        </span>
      </span>
    </label>
  );
}

const subscribeHydration = () => () => {};

export function CourseFinder({ id = "course-finder" }: { id?: string }) {
  const hydrated = useSyncExternalStore(
    subscribeHydration,
    () => true,
    () => false,
  );
  const [interest, setInterest] = useState<Interest | "">("");
  const [goal, setGoal] = useState("");
  const [answers, setAnswers] = useState<
    Partial<Record<(typeof skillQuestions)[number]["key"], Answer>>
  >({});
  const selectedInterest = interests.find((item) => item.value === interest);
  const recommendations =
    interest && goal && answers.typing && answers.saving
      ? recommend(interest, goal, { typing: answers.typing, saving: answers.saving })
      : [];
  const hasAnswers = Boolean(interest || goal || answers.typing || answers.saving);
  const checkpoints = [
    Boolean(interest),
    Boolean(goal),
    Boolean(answers.typing),
    Boolean(answers.saving),
  ];
  const completed = checkpoints.filter(Boolean).length;

  const reset = () => {
    setInterest("");
    setGoal("");
    setAnswers({});
  };

  return (
    <section id={id} className="border-border scroll-mt-24 border-y bg-muted/35">
      <div className="container-page py-14 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div>
            <p className="text-primary text-xs font-semibold tracking-[0.14em] uppercase">
              Find your starting point
            </p>
            <h2 className="font-display mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-balance md:text-4xl">
              What could you learn next?
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl text-base leading-relaxed">
              Tell us what interests you, then try two everyday computer questions. We will suggest
              a path from our {flyerCourses.length} core courses. It is not an exam or an admissions
              decision—it's fine to be unsure.
            </p>

            {!hydrated && (
              <p className="text-muted-foreground mt-4 text-sm">
                This interactive guide needs JavaScript. You can also{" "}
                <Link className="text-primary underline" to="/classes">
                  browse all courses
                </Link>{" "}
                and compare their fees and requirements.
              </p>
            )}
            <div className="mt-8 overflow-hidden rounded-2xl bg-[#101f34] p-5 text-white sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#a4dce7]">
                    Your discovery journey
                  </p>
                  <p className="font-display mt-2 text-xl font-semibold">
                    Explore at your own pace.
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-300">
                    No scores, no timer. Every answer is a step forward.
                  </p>
                </div>
                <span className="rounded-full border border-white/25 px-3 py-1.5 text-xs font-semibold">
                  {completed} of 4 answered
                </span>
              </div>
              <div
                role="progressbar"
                aria-label="Questions answered"
                aria-valuemin={0}
                aria-valuemax={4}
                aria-valuenow={completed}
                aria-valuetext={`${completed} of 4 questions answered`}
                className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/15"
              >
                <div
                  className="h-full rounded-full bg-[#8ed9e4] transition-[width] duration-300 motion-reduce:transition-none"
                  style={{ width: `${completed * 25}%` }}
                />
              </div>
              <ol aria-label="Assessment checkpoints" className="mt-5 grid grid-cols-4 gap-2">
                {(["Interest", "Goal", "Try one", "Try two"] as const).map((label, index) => (
                  <li
                    key={label}
                    className="flex min-w-0 flex-col items-start gap-2 text-xs text-slate-200"
                  >
                    <span
                      aria-hidden="true"
                      className={`grid size-8 place-items-center rounded-full border text-xs font-bold ${checkpoints[index] ? "border-[#8ed9e4] bg-[#8ed9e4] text-[#101f34]" : "border-white/35 text-white"}`}
                    >
                      {checkpoints[index] ? (
                        <Check className="size-4" strokeWidth={3} />
                      ) : (
                        String(index + 1).padStart(2, "0")
                      )}
                    </span>
                    <span>
                      {label}
                      <span className="sr-only">
                        {checkpoints[index] ? ": answered" : ": not answered"}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
            <fieldset className="mt-9">
              <legend className="font-display text-lg font-semibold">
                <span className="text-primary mr-2 text-xs tracking-widest">01 / EXPLORE</span>
                <br />
                1. Which area interests you most?
              </legend>
              <p className="text-muted-foreground mt-2 text-sm">
                Pick the world you are curious about. You can change your mind.
              </p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {interests.map((item) => (
                  <Choice
                    key={item.value}
                    name={`${id}-interest`}
                    value={item.value}
                    label={item.label}
                    detail={item.detail}
                    icon={item.icon}
                    selected={interest === item.value}
                    onChange={() => {
                      setInterest(item.value);
                      setGoal("");
                    }}
                  />
                ))}
              </div>
            </fieldset>

            {selectedInterest && (
              <fieldset className="mt-9">
                <legend className="font-display text-lg font-semibold">
                  <span className="text-primary mr-2 text-xs tracking-widest">
                    02 / CHOOSE A GOAL
                  </span>
                  <br />
                  2. What would you most like to do?
                </legend>
                <p className="text-muted-foreground mt-2 text-sm">
                  Choose the outcome that sounds most exciting to you.
                </p>
                <div className="mt-4 grid gap-2">
                  {selectedInterest.goals.map((item) => (
                    <Choice
                      key={item.slug}
                      name={`${id}-goal`}
                      value={item.slug}
                      label={item.label}
                      selected={goal === item.slug}
                      onChange={() => setGoal(item.slug)}
                    />
                  ))}
                </div>
              </fieldset>
            )}

            {skillQuestions.map((question, index) => (
              <fieldset key={question.key} className="mt-9">
                <legend className="font-display text-lg font-semibold">
                  <span className="text-primary mr-2 text-xs tracking-widest">
                    0{index + 3} / QUICK CHALLENGE
                  </span>
                  <br />
                  {question.legend}
                </legend>
                <div className="mt-4 grid gap-4 rounded-2xl border border-border bg-card p-4 sm:grid-cols-[10rem_1fr] sm:p-5">
                  <div
                    aria-hidden="true"
                    className="relative flex min-h-28 items-center justify-center overflow-hidden rounded-xl bg-[#e8f2f7] text-[#194587] dark:bg-[#263b4e] dark:text-[#b6d7ff]"
                  >
                    <span className="absolute top-3 left-3 text-[10px] font-bold tracking-widest uppercase opacity-70">
                      SCENARIO 0{index + 1}
                    </span>
                    <span className="absolute -right-5 -bottom-8 size-28 rounded-full border-[18px] border-current opacity-[0.07]" />
                    <span className="relative mt-4 grid size-16 place-items-center rounded-2xl border border-current/15 bg-white/70 shadow-sm dark:bg-black/20">
                      {question.key === "typing" ? (
                        <FileText className="size-8" strokeWidth={1.4} />
                      ) : (
                        <Folder className="size-8" strokeWidth={1.4} />
                      )}
                      <span className="absolute -right-3 -bottom-2 grid size-8 place-items-center rounded-full bg-[#194587] text-white">
                        {question.key === "typing" ? (
                          <MousePointer2 className="size-4" />
                        ) : (
                          <Keyboard className="size-4" />
                        )}
                      </span>
                    </span>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-3 flex items-center gap-2 text-xs leading-relaxed">
                      <Lightbulb aria-hidden="true" className="text-primary size-4 shrink-0" /> Take
                      your best guess. It's okay not to know.
                    </p>
                    <div className="grid gap-2">
                      {question.options.map((option) => (
                        <Choice
                          key={option.value}
                          name={`${id}-${question.key}`}
                          value={option.value}
                          label={option.label}
                          selected={answers[question.key] === option.value}
                          onChange={() =>
                            setAnswers((previous) => ({
                              ...previous,
                              [question.key]: option.value,
                            }))
                          }
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </fieldset>
            ))}
            {recommendations.length > 0 && (
              <a
                href={`#${id}-results`}
                className="text-primary mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold underline underline-offset-4"
              >
                View your suggestions <ArrowRight aria-hidden="true" className="size-4" />
              </a>
            )}
            <p className="text-muted-foreground mt-5 text-xs leading-relaxed">
              Your answers stay on this page and are not submitted or stored. This short guide
              checks only two basic concepts, not your full skills or potential. Fees and schedules
              can change; confirm details with admissions before paying.
            </p>
          </div>

          <aside
            id={`${id}-results`}
            aria-label="Course recommendation"
            className="border-border bg-background scroll-mt-24 rounded-2xl border p-5 md:p-6"
          >
            <p className="sr-only" aria-live="polite">
              {recommendations.length
                ? `Your suggestions are ready: ${recommendations.map((item) => item.course.title).join(", ")}.`
                : "Answer all four questions for a suggestion."}
            </p>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-muted-foreground text-xs font-semibold tracking-[0.12em] uppercase">
                  Your next step
                </p>
                <h3 className="font-display mt-2 text-2xl font-semibold tracking-tight">
                  {recommendations.length ? "A path to explore" : "Your guide is ready"}
                </h3>
              </div>
              {hasAnswers && (
                <button
                  type="button"
                  onClick={reset}
                  className="text-muted-foreground hover:text-foreground inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-md px-2 text-xs font-medium focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <RotateCcw aria-hidden="true" className="size-3.5" /> Start over
                </button>
              )}
            </div>
            {recommendations.length ? (
              <div className="mt-5 space-y-3">
                <div className="flex items-center gap-3 rounded-xl bg-primary/10 p-4 text-primary">
                  <span
                    aria-hidden="true"
                    className="grid size-10 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground"
                  >
                    <Sparkles className="size-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">Your exploration is complete</p>
                    <p className="mt-0.5 text-xs leading-relaxed">
                      A starting point, not a score. Change any answer to explore again.
                    </p>
                  </div>
                </div>
                {recommendations.map((item) => (
                  <RecommendationCard key={item.course.slug} item={item} />
                ))}
                <div className="border-border rounded-xl border p-4">
                  <h4 className="font-display text-base font-semibold">
                    About the computer questions
                  </h4>
                  {skillQuestions.map((question) => (
                    <p
                      key={question.key}
                      className="text-muted-foreground mt-2 text-sm leading-relaxed"
                    >
                      <span className="text-foreground font-medium">
                        {answers[question.key] === "yes"
                          ? "You chose the helpful action. "
                          : answers[question.key] === "unsure"
                            ? "Not sure yet? "
                            : "A helpful action: "}
                      </span>
                      {question.explanation}
                    </p>
                  ))}
                </div>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  These are starting suggestions, not a measure of your potential or a guarantee of
                  admission. Check each course's requirements and ask admissions if you are unsure.
                </p>
              </div>
            ) : (
              <div className="border-border bg-muted/30 mt-5 rounded-xl border border-dashed p-6">
                <span
                  aria-hidden="true"
                  className="bg-primary/10 text-primary mb-4 grid size-12 place-items-center rounded-2xl"
                >
                  <CircleHelp className="size-6" />
                </span>
                <p className="font-display text-lg font-semibold">
                  Four questions, one starting point.
                </p>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  Choose an interest and a goal, then answer the two computer questions. No account
                  is needed.
                </p>
              </div>
            )}
            <p className="text-muted-foreground mt-5 text-sm leading-relaxed">
              Want to compare for yourself? Browse all courses, including specialist courses that
              rotate through the timetable.
            </p>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
              <Link
                to="/classes"
                className="text-primary inline-flex min-h-11 items-center gap-2 text-sm font-semibold hover:underline"
              >
                Browse all courses <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
              <Link
                to="/classes#rotating-courses"
                className="text-primary inline-flex min-h-11 items-center gap-2 text-sm font-semibold hover:underline"
              >
                Specialist courses <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
