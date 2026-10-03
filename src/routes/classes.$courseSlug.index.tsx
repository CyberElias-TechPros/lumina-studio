"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link, useParams } from "@/lib/next-compat/router";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  ChevronRight,
  Clock,
  FileText,
  GraduationCap,
  Laptop,
  Target,
  Users,
  Wallet,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CTASection, PageShell } from "@/components/marketing/shell";
import { CourseCover, CourseIcon } from "@/components/marketing/photos";
import { Reveal } from "@/components/motion";
import {
  achievementLevels,
  coursePhotoSrc,
  findCourse,
  formatFee,
  lectureReadingMinutes,
  resolvedCourses,
} from "@/data/academy";
import { getPageHead } from "@/lib/seo";

export const Route = createFileRoute("/classes/$courseSlug/")({
  head: ({ params }) => {
    const course = findCourse(params.courseSlug) ?? resolvedCourses[0];
    return getPageHead({
      title: `${course.title} — ${course.weeks}-Week Practical Course at Cyber Elias Academy`,
      description: `${course.hook} ${formatFee(course.fee)}, ${course.weeks} weeks, ${course.sessions.length} practical sessions with full class notes published for every session.`,
      path: `/classes/${course.slug}`,
      image: coursePhotoSrc(course.slug)
        ? `https://cea.ng${coursePhotoSrc(course.slug)}`
        : undefined,
      structuredData: [
        {
          "@context": "https://schema.org",
          "@type": "Course",
          name: course.title,
          description: course.goal[0],
          provider: {
            "@type": "EducationalOrganization",
            name: "Cyber Elias Academy",
            sameAs: "https://cea.ng",
          },
          offers: {
            "@type": "Offer",
            price: course.fee,
            priceCurrency: "NGN",
            category: course.category,
          },
          hasCourseInstance: {
            "@type": "CourseInstance",
            courseMode: "blended",
            courseWorkload: `PT${course.weeks * course.sessionsPerWeek * 2}H`,
          },
          educationalLevel: course.level,
          teaches: course.outcomes,
          coursePrerequisites: course.requirements,
          syllabusSections: course.sessions.map((session) => ({
            "@type": "Syllabus",
            name: `Session ${session.number}: ${session.title}`,
            description: session.topics.join(", "),
          })),
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Classes", item: "https://cea.ng/classes" },
            {
              "@type": "ListItem",
              position: 2,
              name: course.title,
              item: `https://cea.ng/classes/${course.slug}`,
            },
          ],
        },
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: course.faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        },
      ],
    });
  },
  component: CoursePage,
});

function CoursePage() {
  const { courseSlug } = useParams({ from: "/classes/$courseSlug/" });
  const course = findCourse(courseSlug) ?? resolvedCourses[0];
  const related = resolvedCourses
    .filter((c) => c.slug !== course.slug && c.category === course.category)
    .slice(0, 3);
  const fallbackRelated =
    related.length > 0
      ? related
      : resolvedCourses.filter((c) => c.slug !== course.slug).slice(0, 3);

  const weeks = course.weekOutline;

  return (
    <PageShell>
      <article>
        {/* Hero */}
        <header className="border-border relative border-b py-12 md:py-16">
          <div className="container-page">
            <Reveal>
              <nav aria-label="Breadcrumb">
                <Link
                  to="/classes"
                  className="text-foreground/60 hover:text-foreground inline-flex items-center gap-1.5 text-sm font-semibold transition-colors"
                >
                  <ArrowLeft className="size-4" /> All classes
                </Link>
              </nav>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="mt-7 flex flex-wrap items-center gap-2">
                <Badge variant="secondary" className="font-semibold">
                  {course.category}
                </Badge>
                <Badge variant="outline" className="border-foreground/15 font-normal">
                  {course.level}
                </Badge>
                {course.rotating && (
                  <Badge variant="outline" className="border-foreground/15 font-normal">
                    Rotating short course
                  </Badge>
                )}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="font-display mt-6 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                {course.title}
              </h1>
            </Reveal>

            <Reveal delay={0.14}>
              <p className="text-foreground/80 mt-6 max-w-2xl text-body-lg text-pretty">
                {course.hook}
              </p>
            </Reveal>

            <Reveal delay={0.16}>
              <figure className="border-foreground/12 mt-8 max-w-3xl overflow-hidden rounded-[14px] border">
                <div className="bg-muted aspect-[16/9]">
                  <CourseCover slug={course.slug} />
                </div>
              </figure>
            </Reveal>

            <Reveal delay={0.18}>
              <dl className="border-foreground/10 mt-10 grid grid-cols-2 border-t lg:grid-cols-4">
                {[
                  { icon: Wallet, label: "Course fee", value: formatFee(course.fee) },
                  { icon: Clock, label: "Duration", value: `${course.weeks} weeks` },
                  {
                    icon: GraduationCap,
                    label: "Sessions",
                    value: `${course.sessions.length} · ${course.sessionsPerWeek} per week`,
                  },
                  {
                    icon: Target,
                    label: "You leave with",
                    value: course.deliverable.title,
                  },
                ].map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="border-foreground/10 border-b px-1 py-5 lg:border-r lg:border-b-0 lg:pr-6 lg:last:border-r-0"
                  >
                    <dt className="font-label text-foreground/55 flex items-center gap-2 text-[10px] tracking-[0.14em] uppercase">
                      <Icon className="size-3.5" /> {label}
                    </dt>
                    <dd className="font-display mt-2 text-lg leading-snug font-semibold">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.22}>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button asChild>
                  <Link to="/apply">Apply for this course</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/contact">Ask a question</Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </header>

        {/* About + sidebar */}
        <section className="border-foreground/10 border-b">
          <div className="container-page grid gap-14 py-16 lg:grid-cols-[1.4fr_0.6fr] md:py-20">
            <div>
              <h2 className="font-display text-3xl font-semibold tracking-tight">
                About this course
              </h2>
              <div className="mt-6 space-y-5">
                {course.goal.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="text-foreground/80 text-[16.5px] leading-relaxed text-pretty"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              <h3 className="font-display mt-12 text-2xl font-semibold tracking-tight">
                What you will be able to do
              </h3>
              <ul className="mt-6 space-y-3">
                {course.outcomes.map((outcome) => (
                  <li
                    key={outcome}
                    className="text-foreground/80 flex items-start gap-3 text-[15.5px]"
                  >
                    <Check className="text-primary mt-1 size-4 shrink-0" />
                    {outcome}
                  </li>
                ))}
              </ul>

              <h3 className="font-display mt-12 text-2xl font-semibold tracking-tight">
                The deliverable
              </h3>
              <Reveal>
                <div className="border-primary/25 bg-primary/[0.04] mt-5 rounded-[14px] border p-6">
                  <p className="font-label text-primary text-[10px] tracking-[0.16em] uppercase">
                    Certificate requirement
                  </p>
                  <p className="font-display mt-3 text-xl leading-snug font-semibold">
                    {course.deliverable.title}
                  </p>
                  <p className="text-foreground/75 mt-3 text-[15px] leading-relaxed">
                    {course.deliverable.detail}
                  </p>
                </div>
              </Reveal>

              <h3 className="font-display mt-12 text-2xl font-semibold tracking-tight">
                How the course is assessed
              </h3>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {achievementLevels.map((level) => (
                  <div key={level.name} className="border-foreground/12 rounded-[12px] border p-5">
                    <p className="font-label text-primary text-[10px] tracking-[0.14em] uppercase">
                      Level {level.level}
                    </p>
                    <p className="font-display mt-1 text-lg font-semibold">{level.name}</p>
                    <p className="text-foreground/70 mt-2 text-[13px] leading-relaxed">
                      {level.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
              <div className="border-foreground/12 bg-card/60 rounded-[14px] border p-6 backdrop-blur-md">
                <h3 className="font-label text-foreground/60 flex items-center gap-2 text-[10px] tracking-[0.16em] uppercase">
                  <Users className="size-3.5" /> Who this is for
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {course.audience.map((item) => (
                    <li key={item} className="text-foreground/80 text-[13.5px] leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-foreground/12 bg-card/60 rounded-[14px] border p-6 backdrop-blur-md">
                <h3 className="font-label text-foreground/60 flex items-center gap-2 text-[10px] tracking-[0.16em] uppercase">
                  <Laptop className="size-3.5" /> What you need
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {course.requirements.map((item) => (
                    <li key={item} className="text-foreground/80 text-[13.5px] leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-foreground/12 bg-card/60 rounded-[14px] border p-6 backdrop-blur-md">
                <h3 className="font-label text-foreground/60 flex items-center gap-2 text-[10px] tracking-[0.16em] uppercase">
                  <FileText className="size-3.5" /> At a glance
                </h3>
                <dl className="mt-4 space-y-2.5 text-[13.5px]">
                  <div className="flex justify-between gap-4">
                    <dt className="text-foreground/60">Fee</dt>
                    <dd className="text-primary font-semibold">{formatFee(course.fee)}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-foreground/60">Duration</dt>
                    <dd className="font-medium">{course.weeks} weeks</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-foreground/60">Sessions</dt>
                    <dd className="font-medium">{course.sessions.length}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-foreground/60">Contact time</dt>
                    <dd className="font-medium">~{Math.round(course.totalMinutes / 60)} hours</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-foreground/60">Class notes</dt>
                    <dd className="font-medium">
                      {course.publishedCount}/{course.sessions.length} published
                    </dd>
                  </div>
                </dl>
                <Button asChild className="mt-6 w-full">
                  <Link to="/apply">Apply</Link>
                </Button>
              </div>
            </aside>
          </div>
        </section>

        {/* Week outline + sessions */}
        <section className="border-foreground/10 bg-foreground/[0.02] border-b">
          <div className="container-page py-16 md:py-20">
            <div className="max-w-3xl">
              <h2 className="font-display text-3xl font-semibold tracking-tight text-balance md:text-4xl">
                Week by week
              </h2>
              <p className="text-foreground/75 mt-4 text-body-lg text-pretty">
                {course.weeks} weeks, {course.sessions.length} practical sessions.{" "}
                {course.publishedCount} of {course.sessions.length} sessions currently have a full
                lecture; each session link is labelled so you can tell a complete lesson from a
                topic outline before opening it.
              </p>
            </div>

            <div className="mt-12 space-y-10">
              {weeks.map((week) => {
                const sessions = course.sessions.filter((s) => s.week === week.week);
                return (
                  <div key={week.week}>
                    <div className="border-foreground/10 flex flex-wrap items-baseline gap-4 border-b pb-4">
                      <span className="text-muted-foreground font-display text-3xl leading-none font-light tabular-nums">
                        {String(week.week).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="font-display text-xl font-semibold tracking-tight">
                          Week {week.week} — {week.theme}
                        </h3>
                        <p className="text-foreground/70 mt-1.5 max-w-3xl text-[14.5px] leading-relaxed">
                          {week.summary}
                        </p>
                      </div>
                    </div>

                    <ol className="mt-6 grid gap-4 lg:grid-cols-2">
                      {sessions.map((session) => {
                        const hasLecture = Boolean(session.lecture);
                        const minutes = session.lecture
                          ? lectureReadingMinutes(session.lecture)
                          : null;
                        return (
                          <li key={session.slug}>
                            <Link
                              to="/classes/$courseSlug/$sessionSlug"
                              params={{ courseSlug: course.slug, sessionSlug: session.slug }}
                              className="group border-foreground/12 hover:border-primary/35 bg-card/70 flex h-full flex-col rounded-[12px] border p-5 backdrop-blur-md transition-all duration-400 hover:-translate-y-0.5"
                            >
                              <div className="flex items-start justify-between gap-4">
                                <span className="font-label text-primary text-[10px] tracking-[0.14em] uppercase">
                                  Session {session.number}
                                </span>
                                <span className="text-foreground/50 flex items-center gap-1.5 text-[11px]">
                                  <Clock className="size-3.5" />
                                  {session.minutes} min
                                  {minutes ? ` · ${minutes} min read` : ""}
                                </span>
                              </div>
                              <h4 className="font-display mt-3 text-lg leading-snug font-semibold transition-colors group-hover:text-primary">
                                {session.title}
                              </h4>
                              <ul className="text-foreground/65 mt-3 flex flex-wrap gap-x-2 gap-y-1 text-[12px]">
                                {session.topics.slice(0, 6).map((topic) => (
                                  <li
                                    key={topic}
                                    className="after:text-foreground/30 after:ml-2 after:content-['·'] last:after:content-none"
                                  >
                                    {topic}
                                  </li>
                                ))}
                                {session.topics.length > 6 && (
                                  <li className="text-foreground/45">
                                    +{session.topics.length - 6} more
                                  </li>
                                )}
                              </ul>
                              <span className="border-foreground/10 mt-auto flex items-center justify-between border-t pt-4 text-xs">
                                <span
                                  className={
                                    hasLecture ? "text-primary font-semibold" : "text-foreground/50"
                                  }
                                >
                                  {hasLecture ? "Read the class lecture" : "Session outline"}
                                </span>
                                <ChevronRight className="text-primary size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                              </span>
                            </Link>
                          </li>
                        );
                      })}
                    </ol>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="border-foreground/10 border-b">
          <div className="container-page grid gap-14 py-16 lg:grid-cols-[0.8fr_1.2fr] md:py-20">
            <div>
              <h2 className="font-display text-3xl font-semibold tracking-tight text-balance">
                {course.title} — questions
              </h2>
              <p className="text-foreground/75 mt-5 text-body-lg text-pretty">
                The things prospective students actually ask before enrolling.
              </p>
            </div>
            <div className="divide-foreground/10 divide-y">
              {course.faqs.map((faq) => (
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

        {/* Related */}
        <section className="border-foreground/10 border-b">
          <div className="container-page py-16 md:py-20">
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              Other courses in {course.category}
            </h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {fallbackRelated.map((other) => (
                <Link
                  key={other.slug}
                  to="/classes/$courseSlug"
                  params={{ courseSlug: other.slug }}
                  className="group border-foreground/12 hover:border-primary/35 bg-card/70 flex flex-col overflow-hidden rounded-[12px] border transition-all duration-400 hover:-translate-y-1"
                >
                  <div className="bg-muted aspect-[16/9]">
                    <CourseCover slug={other.slug} />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display inline-flex items-center gap-2 text-lg leading-snug font-semibold transition-colors group-hover:text-primary">
                      <CourseIcon slug={other.slug} className="text-primary size-4 shrink-0" />
                      {other.title}
                    </h3>
                    <p className="text-foreground/70 mt-3 flex-1 text-[13.5px] leading-relaxed">
                      {other.hook}
                    </p>
                    <span className="text-foreground/60 mt-4 text-xs">
                      {formatFee(other.fee)} · {other.weeks} weeks
                    </span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Button asChild variant="outline" className="border-foreground/20 rounded-full px-6">
                <Link to="/classes">
                  All classes <ArrowUpRight className="ml-1.5 size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </article>

      <CTASection
        title={`Apply for ${course.title}`}
        description={`${course.weeks} weeks, ${formatFee(course.fee)}. Two sessions a week. You leave with ${course.deliverable.title.toLowerCase()}.`}
      />
    </PageShell>
  );
}
