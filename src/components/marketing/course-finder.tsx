"use client";

import { useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, RotateCcw } from "lucide-react";
import { Link } from "@/lib/next-compat/router";
import { flyerCourses } from "@/data/academy/catalog";
import type { AcademyCourse } from "@/data/academy/types";

const tasks = [
  {
    slug: "computer-basics-typing",
    title: "Get comfortable using a computer",
    detail: "Mouse, keyboard, files, email and safe everyday use.",
  },
  {
    slug: "microsoft-office",
    title: "Make documents, spreadsheets and slides",
    detail: "Create useful work for school, an office or a small business.",
  },
  {
    slug: "graphic-design",
    title: "Create flyers and visual designs",
    detail: "Turn an idea into a clear, finished design.",
  },
  {
    slug: "web-design",
    title: "Build a website with HTML and CSS",
    detail: "Structure, style and publish real pages for a business or project.",
  },
  {
    slug: "web-development",
    title: "Build a website with code",
    detail: "Learn the foundations behind interactive web pages.",
  },
  {
    slug: "digital-marketing",
    title: "Promote a business online",
    detail: "Plan digital campaigns and understand how to measure them.",
  },
  {
    slug: "social-media-management",
    title: "Plan and manage a business's social media",
    detail: "Build a content calendar, handle customer interactions and read performance.",
  },
  {
    slug: "content-creation",
    title: "Create useful photo and video content",
    detail: "Plan, shoot and edit material for a brand, project or campaign.",
  },
  {
    slug: "business-freelancing",
    title: "Price and deliver freelance work",
    detail: "Practise client briefs, proposals, pricing and professional handover.",
  },
  {
    slug: "online-teaching",
    title: "Teach a class or course online",
    detail: "Plan lessons and practise clear, effective online teaching.",
  },
  {
    slug: "data-entry",
    title: "Organise records and enter data accurately",
    detail: "Build careful, consistent data-entry and spreadsheet habits.",
  },
  {
    slug: "computer-repairs",
    title: "Understand and troubleshoot computers",
    detail: "Learn the safe foundations of hardware diagnosis and care.",
  },
  {
    slug: "cybersecurity",
    title: "Improve my digital safety skills",
    detail: "Understand everyday security risks and safer practices.",
  },
] as const;

const startingPoints = [
  { value: "new", label: "I am new to using a computer" },
  { value: "some", label: "I can do basic tasks, but need more practice" },
  { value: "comfortable", label: "I use a computer regularly" },
] as const;

type StartingPoint = (typeof startingPoints)[number]["value"];
type Recommendation = { course: AcademyCourse; reason: string };

function formatCourseFee(fee: number): string {
  return `₦${fee.toLocaleString("en-NG")}`;
}

function recommend(taskSlug: string, startingPoint: StartingPoint): Recommendation[] {
  const target = flyerCourses.find((course) => course.slug === taskSlug);
  const basics = flyerCourses.find((course) => course.slug === "computer-basics-typing");
  if (!target) return [];

  if (startingPoint === "new" && target.slug !== "computer-basics-typing" && basics) {
    return [
      {
        course: basics,
        reason:
          "Start with the foundations. This beginner course covers the computer habits the other practical courses assume.",
      },
      {
        course: target,
        reason: "Then follow the course that matches the task you chose.",
      },
    ];
  }

  return [
    {
      course: target,
      reason:
        target.slug === "computer-basics-typing"
          ? "A practical first step if you want to build confidence with a computer."
          : "This is the closest match to the task you selected. Check the prerequisites on the course page before applying.",
    },
  ];
}

function RecommendationCard({ item, number }: { item: Recommendation; number: number }) {
  const { course } = item;

  return (
    <article className="border-border bg-card rounded-xl border p-5">
      <p className="text-primary text-xs font-semibold tracking-[0.12em] uppercase">
        {number === 1 ? "Recommended starting point" : "Next step to explore"}
      </p>
      <h3 className="font-display mt-2 text-xl font-semibold tracking-tight">{course.title}</h3>
      <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{item.reason}</p>

      <dl className="border-border mt-4 grid grid-cols-2 gap-3 border-y py-4 text-sm">
        <div>
          <dt className="text-muted-foreground text-xs">Listed fee</dt>
          <dd className="mt-1 font-semibold">{formatCourseFee(course.fee)}</dd>
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
        className="text-primary mt-4 inline-flex items-center gap-2 text-sm font-semibold hover:underline"
      >
        See fee, requirements and syllabus <ArrowRight className="size-4" />
      </Link>
    </article>
  );
}

export function CourseFinder({ id = "course-finder" }: { id?: string }) {
  const [taskSlug, setTaskSlug] = useState("");
  const [startingPoint, setStartingPoint] = useState<StartingPoint | "">("");

  const recommendations = useMemo(
    () => (taskSlug && startingPoint ? recommend(taskSlug, startingPoint) : []),
    [taskSlug, startingPoint],
  );

  const reset = () => {
    setTaskSlug("");
    setStartingPoint("");
  };

  return (
    <section id={id} className="border-border scroll-mt-24 border-y bg-muted/35">
      <div className="container-page py-14 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div>
            <p className="text-primary text-xs font-semibold tracking-[0.14em] uppercase">
              A practical course guide
            </p>
            <h2 className="font-display mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-balance md:text-4xl">
              Start with the task you want to do.
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl text-base leading-relaxed">
              Choose a real task and tell us where you are starting from. We will match it to one of
              the {flyerCourses.length} core courses, show the listed fee and final project, and
              explain when computer basics should come first. Some specialist courses rotate through
              the timetable;{" "}
              <Link
                to="/classes#rotating-courses"
                className="text-primary font-medium hover:underline"
              >
                check the specialist-course list
              </Link>
              .
            </p>

            <fieldset className="mt-8">
              <legend className="font-display text-base font-semibold">
                1. What would you like to learn to do?
              </legend>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {tasks.map((task) => {
                  const selected = taskSlug === task.slug;
                  return (
                    <label key={task.slug} className="cursor-pointer">
                      <input
                        className="peer sr-only"
                        type="radio"
                        name={`${id}-task`}
                        value={task.slug}
                        checked={selected}
                        onChange={() => setTaskSlug(task.slug)}
                      />
                      <span
                        className={`border-border bg-card hover:border-primary/45 flex h-full gap-3 rounded-lg border p-3.5 transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-ring ${selected ? "border-primary bg-primary/5" : ""}`}
                      >
                        <CheckCircle2
                          aria-hidden="true"
                          className={`mt-0.5 size-4 shrink-0 ${selected ? "text-primary" : "text-muted-foreground/45"}`}
                        />
                        <span>
                          <span className="block text-sm font-medium leading-snug">
                            {task.title}
                          </span>
                          <span className="text-muted-foreground mt-1 block text-xs leading-relaxed">
                            {task.detail}
                          </span>
                        </span>
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <fieldset className="mt-7">
              <legend className="font-display text-base font-semibold">
                2. Where are you starting from?
              </legend>
              <div className="mt-3 grid gap-2">
                {startingPoints.map((option) => {
                  const selected = startingPoint === option.value;
                  return (
                    <label key={option.value} className="cursor-pointer">
                      <input
                        className="peer sr-only"
                        type="radio"
                        name={`${id}-starting-point`}
                        value={option.value}
                        checked={selected}
                        onChange={() => setStartingPoint(option.value)}
                      />
                      <span
                        className={`border-border bg-card hover:border-primary/45 flex items-center gap-3 rounded-lg border px-4 py-3 text-sm transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-ring ${selected ? "border-primary bg-primary/5 font-medium" : ""}`}
                      >
                        <span
                          aria-hidden="true"
                          className={`flex size-4 shrink-0 items-center justify-center rounded-full border ${selected ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground/45"}`}
                        >
                          {selected && <span className="size-1.5 rounded-full bg-current" />}
                        </span>
                        {option.label}
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <p className="text-muted-foreground mt-5 text-xs leading-relaxed">
              This guide is private to your browser: your selections are not submitted or stored.
              Course fees and schedules can change; confirm details with admissions before you pay.
            </p>
          </div>

          <aside
            aria-label="Course recommendation"
            className="border-border bg-background rounded-2xl border p-5 md:p-6"
          >
            <p className="sr-only" aria-live="polite">
              {recommendations.length
                ? `Recommended courses: ${recommendations.map((item) => item.course.title).join(", ")}.`
                : "Choose a task and starting point to get a course recommendation."}
            </p>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-muted-foreground text-xs font-semibold tracking-[0.12em] uppercase">
                  Your next step
                </p>
                <h3 className="font-display mt-2 text-2xl font-semibold tracking-tight">
                  {recommendations.length ? "A course path to explore" : "Your guide is ready"}
                </h3>
              </div>
              {recommendations.length > 0 && (
                <button
                  type="button"
                  onClick={reset}
                  className="text-muted-foreground hover:text-foreground inline-flex shrink-0 items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <RotateCcw className="size-3.5" /> Start over
                </button>
              )}
            </div>

            {recommendations.length > 0 ? (
              <div className="mt-5 space-y-3">
                {recommendations.map((item, index) => (
                  <RecommendationCard
                    key={`${item.course.slug}-${index}`}
                    item={item}
                    number={index + 1}
                  />
                ))}
                <p className="text-muted-foreground text-xs leading-relaxed">
                  This is a starting suggestion, not an admissions decision. Review each course's
                  listed requirements and ask the Academy if you are unsure.
                </p>
              </div>
            ) : (
              <div className="border-border bg-muted/30 mt-5 rounded-xl border border-dashed p-6">
                <p className="font-display text-lg font-semibold">
                  Two choices make a useful plan.
                </p>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  Select a task and your current comfort level. No account is needed, and nothing is
                  sent to the Academy.
                </p>
                <p className="text-muted-foreground mt-5 text-sm leading-relaxed">
                  Not sure yet? Start with the course outlines and compare fees, entry requirements
                  and the work each course is designed around.
                </p>
                <Link
                  to="/classes"
                  className="text-primary mt-4 inline-flex items-center gap-2 text-sm font-semibold hover:underline"
                >
                  Browse all courses <ArrowRight className="size-4" />
                </Link>
              </div>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}
