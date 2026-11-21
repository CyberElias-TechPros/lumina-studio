"use client";

import { useState } from "react";
import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { ArrowRight, ArrowUpRight, Check, Clock, GraduationCap, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CTASection, PageShell } from "@/components/marketing/shell";
import { CampusImg, CourseCover, CourseIcon } from "@/components/marketing/photos";
import { Reveal } from "@/components/motion";
import { CourseFinder } from "@/components/marketing/course-finder";
import { HeroMotion } from "@/components/marketing/hero-motion";
import { courseFamilyTheme } from "@/lib/course-families";
import { cn } from "@/lib/utils";
import {
  achievementLevels,
  courseCategories,
  formatFee,
  resolvedCourses,
  resolvedFlyerCourses,
  resolvedRotatingCourses,
  teachingLoop,
  type ResolvedCourse,
} from "@/data/academy";
import { getPageHead } from "@/lib/seo";
import { SITE_URL } from "@/lib/site-url";

export const Route = createFileRoute("/classes/")({
  head: () => {
    const itemList = resolvedFlyerCourses.map((course, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: course.title,
      url: `${SITE_URL}/classes/${course.slug}`,
    }));
    return getPageHead({
      title: "IT Courses List & Fees in Nigeria (₦20,000–₦50,000) — Digital Skills",
      description:
        "Full IT courses list and fees at Cyber Elias Academy Port Harcourt: Computer Basics, Excel, Web Development, Cybersecurity, Graphics, Data Analytics & Repairs from ₦20,000.",
      path: "/classes",
      structuredData: [
        {
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Cyber Elias Academy practical digital skills courses",
          itemListElement: itemList,
        },
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: HUB_FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        },
      ],
    });
  },
  component: Classes,
});

const publishedSessionCount = resolvedCourses.reduce(
  (count, course) => count + course.publishedCount,
  0,
);
const totalSessionCount = resolvedCourses.reduce(
  (count, course) => count + course.sessions.length,
  0,
);

const HUB_FAQS = [
  {
    q: "How are the classes delivered?",
    a: "Two practical sessions per week for every course, each running 1.5 to 2 hours depending on the timetable you join. Each session follows the same loop — Learn, Practice, Create, Correct, Repeat, Demonstrate — with instructor demonstration, guided practice, individual practice, a weekly assignment and a practical project. Nothing is delivered as a lecture you simply sit through.",
  },
  {
    q: "Are the full class notes published online?",
    a: `${publishedSessionCount} of ${totalSessionCount} course sessions currently have a full class lecture published here, including objectives, taught content, demonstrations, practice and assessment guidance. Each course card shows its own count, and each session link is labelled so you can tell a full lecture from an outline before opening it.`,
  },
  {
    q: "What do I actually leave with?",
    a: "An artefact you can show. Not a certificate on its own — a document, a spreadsheet, a presentation, a flyer, a published website, a cleaned dataset, a serviced machine, a marketing campaign, a security report, a portfolio or a delivered lesson. The promise of every course here is: don't just complete a course, complete something you can show.",
  },
  {
    q: "Do the short durations mean I become a professional in three weeks?",
    a: "No, and we will not pretend otherwise. These are introductory practical courses. Web Development in six weeks builds your first functional websites and gives you a genuine foundation for further learning — it does not make you a professional developer. What it does give you is real capability you can demonstrate immediately and a base to build on.",
  },
  {
    q: "Do I need my own computer?",
    a: "For Typing & Computer Basics, no — practice happens on academy machines. For every other course you need a laptop or reliable access to one, because the homework is where the ability is actually built. Every course page lists its specific requirements before you pay anything.",
  },
  {
    q: "Which course should I start with?",
    a: "If you have never used a computer, start with Typing & Computer Basics. If you can use a computer but need office skills, start with Microsoft Office. From there, choose by what you want to be able to do: Graphic Design or Content Creation for visual work, Web Design then Web Development for building websites, Digital Marketing or Social Media Management for growing a business, Computer Repairs or IT Support for hardware, Cybersecurity for protection, and Business & Freelancing to earn from any of them.",
  },
];

function CourseCard({ course, index }: { course: ResolvedCourse; index: number }) {
  const family = courseFamilyTheme(course.category, course.slug);
  return (
    <div className="h-full">
      <Link
        to="/classes/$courseSlug"
        params={{ courseSlug: course.slug }}
        className={cn(
          "cea-course-card group border-foreground/12 bg-card flex h-full flex-col overflow-hidden rounded-2xl border shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md",
          family.accentBar,
        )}
      >
        <div className="bg-muted relative aspect-[16/9] overflow-hidden">
          <CourseCover slug={course.slug} />
          <span
            className={cn(
              "absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold shadow-sm backdrop-blur-sm",
              family.pill,
            )}
          >
            <span className={cn("size-1.5 rounded-full", family.dot)} aria-hidden="true" />
            {family.label}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-start justify-between gap-4">
            <span className="font-mono text-muted-foreground inline-flex items-center gap-2 text-xs tabular-nums">
              <CourseIcon slug={course.slug} className="text-primary size-4" />
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="flex flex-wrap items-center justify-end gap-2">
              <Badge variant="outline" className="border-foreground/15 font-normal">
                {course.level}
              </Badge>
              <span className="text-foreground font-mono text-sm font-bold tabular-nums">
                {formatFee(course.fee)}
              </span>
            </div>
          </div>

          <h3 className="font-display mt-4 text-xl leading-tight font-semibold tracking-tight transition-colors group-hover:text-primary">
            {course.title}
          </h3>
          <p className="text-foreground/70 mt-3 text-sm leading-relaxed">{course.hook}</p>
          <p className="mt-4 text-sm leading-relaxed">
            <span className="text-foreground/60">You practise toward: </span>
            {course.deliverable.title}
          </p>

          <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
            <span className="font-medium">You need: </span>
            {course.requirements.join(" · ")}
          </p>

          <div className="text-foreground/70 mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
            <span className="flex items-center gap-1.5">
              <Clock className="size-3.5" /> {course.weeks} weeks
            </span>
            <span className="flex items-center gap-1.5">
              <GraduationCap className="size-3.5" /> {course.sessions.length} sessions
            </span>
            <span className="flex items-center gap-1.5">
              <Wallet className="size-3.5" /> {course.sessionsPerWeek}/week
            </span>
          </div>

          <div className="border-foreground/10 mt-5 flex items-center justify-between border-t pt-4">
            <span className="text-foreground/70 text-xs">
              {course.publishedCount > 0
                ? `${course.publishedCount} of ${course.sessions.length} class notes published`
                : `${course.sessions.length} sessions · full outline`}
            </span>
            <span className="text-primary flex items-center gap-1 text-xs font-semibold">
              View
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}

function CourseGroup({
  id,
  title,
  description,
  courses,
}: {
  id?: string;
  title: string;
  description: string;
  courses: ResolvedCourse[];
}) {
  const categories = courseCategories.filter((cat) => courses.some((c) => c.category === cat));
  return (
    <section id={id} className="border-foreground/10 border-b scroll-mt-24">
      <div className="container-page py-16 md:py-20">
        <div className="max-w-3xl">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-balance md:text-4xl">
            {title}
          </h2>
          <p className="text-foreground/75 mt-4 text-body-lg text-pretty">{description}</p>
        </div>

        {categories.map((category) => (
          <div
            key={category}
            id={`${id ?? "core"}-${category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
            className="mt-12 scroll-mt-24"
          >
            <div className="border-foreground/10 flex items-center gap-4 border-b pb-3">
              <span className="font-mono text-primary text-xs font-semibold tracking-wider uppercase">
                {category}
              </span>
              <span className="bg-foreground/10 h-px flex-1" />
            </div>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {courses
                .filter((c) => c.category === category)
                .map((course, i) => (
                  <CourseCard key={course.slug} course={course} index={i} />
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function HowWeTeach() {
  return (
    <section className="border-foreground/10 bg-foreground/[0.02] border-b">
      <div className="container-page py-20 md:py-24">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Reveal>
              <span className="font-mono text-primary inline-flex items-center gap-2.5 text-xs font-semibold tracking-wider uppercase">
                <span aria-hidden="true" className="bg-primary inline-block h-px w-6" />
                How every class runs
              </span>
            </Reveal>
            <h2 className="font-display mt-6 text-3xl leading-tight font-semibold tracking-tight text-balance md:text-4xl">
              Learn, practise, create, correct, repeat, demonstrate.
            </h2>
            <Reveal delay={0.1}>
              <p className="text-foreground/80 mt-6 text-body-lg text-pretty">
                Every session in every course follows the same loop. The instructor demonstrates,
                the class practises together, you then do it alone, your work is corrected, you
                repeat until it is right, and you finish by demonstrating it. That loop is why our
                students leave able to do the thing rather than describe it.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <ol className="mt-8 flex flex-wrap gap-2">
                {teachingLoop.map((step) => (
                  <li
                    key={step}
                    className="border-foreground/15 bg-card/70 rounded-full border px-4 py-2 text-sm"
                  >
                    {step}
                  </li>
                ))}
              </ol>
            </Reveal>
            <Reveal delay={0.2}>
              <figure className="border-foreground/12 mt-8 overflow-hidden rounded-[14px] border">
                <CampusImg id="lab-3" className="aspect-[16/10]" />
              </figure>
              <ul className="text-foreground/75 mt-8 space-y-3 text-sm">
                {[
                  "Theory kept to the minimum necessary",
                  "Instructor demonstration before you touch the keyboard",
                  "Guided practice, then individual practice",
                  "A weekly assignment and a practical project",
                  "A final assessment and a practical project",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="text-primary mt-0.5 size-4 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="space-y-4">
            {achievementLevels.map((level, i) => (
              <Reveal key={level.name} delay={i * 0.08}>
                <div className="border-foreground/12 bg-card/60 rounded-[14px] border p-6 backdrop-blur-md">
                  <div className="flex items-center gap-4">
                    <span className="text-muted-foreground font-display text-4xl leading-none font-light tabular-nums">
                      {level.level}
                    </span>
                    <div>
                      <p className="font-label text-primary text-[10px] tracking-[0.16em] uppercase">
                        Level {level.level}
                      </p>
                      <h3 className="font-display text-2xl font-semibold tracking-tight">
                        {level.name}
                      </h3>
                    </div>
                  </div>
                  <p className="text-foreground/75 mt-4 text-sm leading-relaxed">
                    {level.description}
                  </p>
                </div>
              </Reveal>
            ))}
            <Reveal delay={0.28}>
              <p className="font-display border-foreground/10 border-l-2 pl-5 text-lg leading-relaxed italic">
                The third level is what separates this academy from a place where people sit through
                computer classes and collect certificates.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function DeliverablesTable() {
  return (
    <section className="border-foreground/10 border-b">
      <div className="container-page py-20 md:py-24">
        <div className="max-w-3xl">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-balance md:text-4xl">
            Don't just complete a course. Complete something you can show.
          </h2>
          <p className="text-foreground/75 mt-5 text-body-lg text-pretty">
            Every course lists a practical deliverable to work toward. Confirm assessment and
            certificate requirements with the Academy before enrolling.
          </p>
        </div>

        <div className="mt-12 overflow-x-auto">
          <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
            <thead>
              <tr className="border-foreground/15 border-b">
                <th
                  scope="col"
                  className="font-label text-foreground/60 py-3 pr-6 text-[10px] tracking-[0.16em] uppercase"
                >
                  Course
                </th>
                <th
                  scope="col"
                  className="font-label text-foreground/60 py-3 pr-6 text-[10px] tracking-[0.16em] uppercase"
                >
                  What you leave with
                </th>
                <th
                  scope="col"
                  className="font-label text-foreground/60 py-3 text-right text-[10px] tracking-[0.16em] uppercase"
                >
                  Fee
                </th>
              </tr>
            </thead>
            <tbody>
              {resolvedFlyerCourses.map((course) => (
                <tr key={course.slug} className="border-foreground/10 border-b last:border-0">
                  <th scope="row" className="py-4 pr-6 align-top">
                    <Link
                      to="/classes/$courseSlug"
                      params={{ courseSlug: course.slug }}
                      className="font-display hover:text-primary text-base font-semibold transition-colors"
                    >
                      {course.title}
                    </Link>
                    <span className="text-foreground/55 mt-1 block text-[11px] font-normal">
                      {course.weeks} weeks · {course.sessions.length} sessions
                    </span>
                  </th>
                  <td className="text-foreground/75 py-4 pr-6 align-top">
                    <span className="text-foreground font-medium">{course.deliverable.title}</span>
                    <span className="mt-1 block text-[13px] leading-relaxed">
                      {course.deliverable.detail}
                    </span>
                  </td>
                  <td className="text-primary py-4 text-right align-top font-semibold whitespace-nowrap">
                    {formatFee(course.fee)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function HubFaqs() {
  return (
    <section className="border-foreground/10 border-b">
      <div className="container-page grid gap-14 py-20 lg:grid-cols-[0.8fr_1.2fr] md:py-24">
        <div>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-balance md:text-4xl">
            Before you enrol
          </h2>
          <p className="text-foreground/75 mt-5 text-body-lg text-pretty">
            Straight answers about delivery, fees, equipment and what the short durations really
            mean.
          </p>
          <Button
            asChild
            variant="outline"
            className="border-foreground/20 mt-8 rounded-full px-6 backdrop-blur-md"
          >
            <Link to="/contact">
              Ask admissions <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>
        <div className="divide-foreground/10 divide-y">
          {HUB_FAQS.map((faq) => (
            <details key={faq.q} className="group py-5">
              <summary className="font-display flex cursor-pointer list-none items-start justify-between gap-6 text-lg font-semibold tracking-tight [&::-webkit-details-marker]:hidden">
                {faq.q}
                <span className="text-primary mt-1 shrink-0 transition-transform duration-300 group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="text-foreground/75 mt-4 text-[15px] leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Classes() {
  const [mode, setMode] = useState<"discover" | "compare">("discover");

  return (
    <PageShell>
      <section
        id="cea-courses-hero"
        className="cea-frontier-grid relative overflow-hidden border-b border-[#2c333c] bg-[#101214] text-[#f4f1e9]"
      >
        <HeroMotion scope="#cea-courses-hero" />
        <div className="container-page grid gap-12 py-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-16 lg:py-24">
          <div>
            <p
              data-hero-copy
              className="inline-flex items-center gap-2 font-mono text-xs font-semibold tracking-[0.16em] text-[#d6fe52] uppercase"
            >
              <span className="size-1.5 rounded-full bg-[#d6fe52]" aria-hidden="true" />
              CEA Catalogue · Discover &amp; Compare
            </p>
            <h1
              data-hero-copy
              className="font-display mt-6 max-w-4xl text-[clamp(2.6rem,5vw,4.75rem)] leading-[0.98] font-semibold tracking-[-0.045em]"
            >
              Find a practical course for the{" "}
              <span className="font-serif font-normal text-[#d6fe52] italic">
                work you want to do.
              </span>
            </h1>
            <p
              data-hero-copy
              className="mt-6 max-w-2xl text-base leading-relaxed text-[#c6cdd6] sm:text-lg"
            >
              Switch between visual discovery and side-by-side comparison. Inspect fees, weeks,
              requirements, and finished projects before you apply.
            </p>
            <div data-hero-copy className="mt-8 flex flex-wrap items-center gap-3">
              <div
                role="tablist"
                aria-label="Course browser mode"
                className="inline-flex rounded-full border border-[#3a424d] bg-[#181c20] p-1"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={mode === "discover"}
                  onClick={() => setMode("discover")}
                  className={cn(
                    "min-h-[40px] rounded-full px-5 text-xs font-bold tracking-wider uppercase transition-colors",
                    mode === "discover"
                      ? "bg-[#d6fe52] text-[#101214]"
                      : "text-[#c6cdd6] hover:text-white",
                  )}
                >
                  Discover mode
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={mode === "compare"}
                  onClick={() => setMode("compare")}
                  className={cn(
                    "min-h-[40px] rounded-full px-5 text-xs font-bold tracking-wider uppercase transition-colors",
                    mode === "compare"
                      ? "bg-[#d6fe52] text-[#101214]"
                      : "text-[#c6cdd6] hover:text-white",
                  )}
                >
                  Compare table
                </button>
              </div>
              <Link
                to="/contact"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[#3a424d] px-5 text-xs font-semibold text-[#f4f1e9] hover:border-[#f4f1e9]/50"
              >
                Ask admissions <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>
          <div
            data-hero-art
            className="rounded-3xl border border-[#2c333c] bg-[#181c20] p-7 sm:p-9"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="font-mono text-xs font-semibold tracking-[0.14em] text-[#d6fe52] uppercase">
                Made for real work
              </span>
              <span className="font-mono text-lg text-[#d6fe52]" aria-hidden="true">
                ↗
              </span>
            </div>
            <p className="font-display mt-10 text-[clamp(4rem,7vw,6.2rem)] leading-none font-semibold tracking-[-0.06em] text-[#f4f1e9]">
              {resolvedFlyerCourses.length}
              <span className="font-serif ml-2 text-3xl font-normal text-[#d6fe52] italic">
                paths
              </span>
            </p>
            <p className="mt-4 max-w-sm text-lg leading-snug font-medium text-[#f4f1e9]">
              Core courses. A printed fee receipt and a finished deliverable in every one.
            </p>
            <p className="mt-5 max-w-sm border-t border-[#2c333c] pt-5 text-sm leading-relaxed text-[#b4bac4]">
              Dates and equipment arrangements are confirmed by admissions before payment.
            </p>
          </div>
        </div>
      </section>

      {mode === "compare" && (
        <section className="border-border bg-muted/30 border-b py-12 md:py-16">
          <div className="container-page">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="font-mono text-xs font-semibold tracking-wider uppercase">
                  Compare Mode · All {resolvedCourses.length} courses
                </p>
                <h2 className="font-display mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                  Side-by-side fees, duration and requirements
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setMode("discover")}
                className="border-border bg-background hover:border-foreground rounded-full border px-4 py-2 text-xs font-semibold"
              >
                Switch back to Discover cards
              </button>
            </div>
            <div className="border-border bg-card mt-7 overflow-x-auto rounded-2xl border">
              <table className="w-full min-w-[44rem] border-collapse text-left text-sm">
                <thead className="border-border bg-muted/50 border-b">
                  <tr>
                    <th className="px-4 py-3.5 font-mono text-xs font-semibold uppercase">
                      Course
                    </th>
                    <th className="px-4 py-3.5 font-mono text-xs font-semibold uppercase">
                      Territory
                    </th>
                    <th className="px-4 py-3.5 font-mono text-xs font-semibold uppercase">
                      Duration
                    </th>
                    <th className="px-4 py-3.5 font-mono text-xs font-semibold uppercase">Level</th>
                    <th className="px-4 py-3.5 font-mono text-xs font-semibold uppercase">Fee</th>
                    <th className="px-4 py-3.5 font-mono text-xs font-semibold uppercase">
                      Requirements
                    </th>
                    <th className="px-4 py-3.5 text-right font-mono text-xs font-semibold uppercase">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-border divide-y">
                  {resolvedCourses.map((c) => {
                    const family = courseFamilyTheme(c.category, c.slug);
                    return (
                      <tr key={c.slug} className="hover:bg-muted/25">
                        <td className="px-4 py-3.5 font-semibold">
                          <Link
                            to="/classes/$courseSlug"
                            params={{ courseSlug: c.slug }}
                            className="hover:underline"
                          >
                            {c.title}
                          </Link>
                          <span className="text-muted-foreground block text-xs font-normal">
                            {c.deliverable.title}
                          </span>
                        </td>
                        <td className="px-4 py-3.5">
                          <span
                            className={cn(
                              "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold",
                              family.pill,
                            )}
                          >
                            {family.label}
                          </span>
                        </td>
                        <td className="px-4 py-3.5 font-mono text-xs tabular-nums">
                          {c.weeks} weeks · {c.sessions.length} sessions
                        </td>
                        <td className="px-4 py-3.5 text-xs">{c.level}</td>
                        <td className="px-4 py-3.5 font-mono text-sm font-bold tabular-nums">
                          {formatFee(c.fee)}
                        </td>
                        <td className="text-muted-foreground px-4 py-3.5 text-xs">
                          {c.requirements.join(" · ")}
                        </td>
                        <td className="px-4 py-3.5 text-right">
                          <Link
                            to="/classes/$courseSlug"
                            params={{ courseSlug: c.slug }}
                            className="inline-flex rounded-full bg-[#101214] px-3.5 py-1.5 text-xs font-semibold text-[#f4f1e9] hover:opacity-90"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      <CourseFinder id="course-finder" />

      <section className="border-border border-b" aria-labelledby="browse-areas">
        <div className="container-page py-12 md:py-16">
          <p className="text-primary text-xs font-semibold tracking-[0.16em] uppercase">
            Explore by interest
          </p>
          <h2
            id="browse-areas"
            className="font-display mt-3 scroll-mt-24 text-2xl font-semibold tracking-tight sm:text-3xl"
          >
            Choose a starting point.
          </h2>
          <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
            Jump to a subject area in our core course list.
          </p>
          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {courseCategories
              .filter((category) =>
                resolvedFlyerCourses.some((course) => course.category === category),
              )
              .map((category, i) => (
                <a
                  key={category}
                  href={`#core-${category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                  className="group border-border hover:border-primary flex min-h-28 flex-col justify-between rounded-lg border p-4 transition-colors"
                >
                  <span className="text-primary text-xs tabular-nums">
                    {String(i + 1).padStart(2, "0")} /
                  </span>
                  <span className="flex justify-between gap-3 text-sm font-semibold">
                    {category}
                    <span aria-hidden="true">↗</span>
                  </span>
                </a>
              ))}
          </div>
        </div>
      </section>

      <CourseGroup
        title="The core courses"
        description="The practical courses listed on the Academy flyer, each taught over two sessions a week and built around work you can show. Course pages include the week-by-week outline, entry requirements, listed fee and an exact count of published class lectures."
        courses={resolvedFlyerCourses}
      />

      <HowWeTeach />
      <DeliverablesTable />

      <CourseGroup
        id="rotating-courses"
        title="Rotating short courses"
        description="We do not advertise 'and more' as a mystery. These are the short courses that rotate through the timetable as demand and instructor availability allow — ask admissions which ones run next."
        courses={resolvedRotatingCourses}
      />

      <section className="border-border border-b" aria-labelledby="open-curriculum-banner">
        <div className="container-page py-10">
          <Link
            to="/open-curriculum"
            className="group border-foreground/12 bg-muted/35 hover:border-primary/50 flex flex-col gap-3 rounded-2xl border p-6 transition-colors sm:flex-row sm:items-center sm:justify-between sm:p-7"
          >
            <span>
              <span className="text-primary text-[10px] font-semibold tracking-[0.18em] uppercase">
                Beyond the timetable
              </span>
              <span
                id="open-curriculum-banner"
                className="font-display mt-1.5 block text-xl font-semibold tracking-tight text-balance sm:text-2xl"
              >
                The open curriculum: 57 verified open-source courses across nine departments.
              </span>
              <span className="text-muted-foreground mt-1.5 block max-w-2xl text-sm leading-relaxed">
                Every source, licence and CEA delivery plan in the open — from AI engineering to
                cybersecurity, cloud and design. Free to study; structured when you study with us.
              </span>
            </span>
            <ArrowUpRight
              className="text-muted-foreground group-hover:text-primary hidden size-8 shrink-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:block"
              aria-hidden="true"
            />
          </Link>
        </div>
      </section>

      <HubFaqs />
      <CTASection
        title="Pick a course"
        description="Apply with the course you want. We will reply with dates, the fee, and what to bring."
      />
    </PageShell>
  );
}
