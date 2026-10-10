"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link, useParams } from "@/lib/next-compat/router";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ClipboardList,
  Clock,
  GraduationCap,
  HelpCircle,
  Lightbulb,
  ListChecks,
  MonitorPlay,
  NotebookPen,
  Shield,
  Target,
  Wrench,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CTASection, PageShell } from "@/components/marketing/shell";
import { Reveal } from "@/components/motion";
import { ContentFreshness } from "@/components/content-freshness";
import {
  findCourse,
  findSession,
  formatFee,
  lectureReadingMinutes,
  lectureWordCount,
  resolvedCourses,
} from "@/data/academy";
import { getPageHead } from "@/lib/seo";
import { SITE_URL } from "@/lib/site-url";

export const Route = createFileRoute("/classes/$courseSlug/$sessionSlug")({
  head: ({ params }) => {
    const match = findSession(params.courseSlug, params.sessionSlug);
    const course = match?.course ?? findCourse(params.courseSlug) ?? resolvedCourses[0];
    const session = match?.session ?? course.sessions[0];
    const lecture = session?.lecture;
    const reviewed = lecture?.reviewed;
    const title = `${course.title} — Session ${session?.number ?? 1}: ${session?.title ?? "Class Notes"}`;
    const description =
      lecture?.summary ??
      `Session outline for ${course.title} session ${session?.number}: ${session?.topics.slice(0, 6).join(", ")}.`;

    return getPageHead({
      title,
      description,
      path: `/classes/${course.slug}/${session?.slug ?? ""}`,
      type: "article",
      noIndex: !lecture,
      structuredData: lecture
        ? [
            {
              "@context": "https://schema.org",
              "@type": "LearningResource",
              resourceType: "Lesson",
              name: `Session ${session?.number}: ${session?.title}`,
              description,
              educationalLevel: course.level,
              teaches: lecture?.objectives ?? session?.topics ?? [],
              learningResourceType: "Lesson plan and class lecture",
              inLanguage: "en-NG",
              isPartOf: {
                "@type": "Course",
                name: course.title,
                description: course.goal[0],
                provider: {
                  "@type": "EducationalOrganization",
                  name: "Cyber Elias Academy",
                  sameAs: SITE_URL,
                },
                offers: { "@type": "Offer", price: course.fee, priceCurrency: "NGN" },
              },
              provider: {
                "@type": "EducationalOrganization",
                name: "Cyber Elias Academy",
                sameAs: SITE_URL,
              },
              timeRequired: `PT${session?.minutes ?? 105}M`,
              about: session?.topics ?? [],
            },
            {
              "@context": "https://schema.org",
              "@type": "Article",
              headline: title,
              description,
              ...(reviewed ? { dateModified: reviewed } : {}),
              author: {
                "@type": "Person",
                name: "Ellis Dennis Graham",
                jobTitle: "Founder",
              },
              publisher: {
                "@type": "Organization",
                name: "Cyber Elias Academy",
                logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.svg` },
              },
              mainEntityOfPage: `${SITE_URL}/classes/${course.slug}/${session?.slug ?? ""}`,
              wordCount: lecture ? lectureWordCount(lecture) : undefined,
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Classes",
                  item: `${SITE_URL}/classes`,
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: course.title,
                  item: `${SITE_URL}/classes/${course.slug}`,
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: `Session ${session?.number}: ${session?.title}`,
                  item: `${SITE_URL}/classes/${course.slug}/${session?.slug ?? ""}`,
                },
              ],
            },
            ...(lecture
              ? [
                  {
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    mainEntity: lecture.faqs.map((f) => ({
                      "@type": "Question",
                      name: f.q,
                      acceptedAnswer: { "@type": "Answer", text: f.a },
                    })),
                  },
                ]
              : []),
          ]
        : [],
    });
  },
  component: SessionPage,
});

function SectionLabel({
  icon: Icon,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <h2 className="font-display flex items-center gap-3 text-2xl font-semibold tracking-tight">
      <Icon className="text-primary size-5 shrink-0" />
      {children}
    </h2>
  );
}

function SessionPage() {
  const { courseSlug, sessionSlug } = useParams({
    from: "/classes/$courseSlug/$sessionSlug",
  });
  const match = findSession(courseSlug, sessionSlug);
  const course = match?.course ?? findCourse(courseSlug) ?? resolvedCourses[0];
  const session = match?.session ?? course.sessions[0];
  const prev = match?.prev;
  const next = match?.next;
  const lecture = session?.lecture;
  const reviewed = lecture?.reviewed;

  if (!lecture) {
    return (
      <PageShell>
        <article className="container-page max-w-3xl pt-32 pb-20 md:pt-40">
          <Link
            to="/classes/$courseSlug"
            params={{ courseSlug: course.slug }}
            className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm font-semibold"
          >
            <ArrowLeft className="size-4" /> {course.title}
          </Link>
          <h1 className="font-display mt-8 text-3xl font-semibold tracking-tight md:text-4xl">
            Session {session?.number}: {session?.title}
          </h1>
          <p className="text-muted-foreground mt-5 text-lg leading-relaxed">
            The full class lecture for this session is being written. The topic outline below is
            exactly what the session covers in the classroom, and the complete notes — objectives,
            demonstration script, practice brief, mistakes, homework and rubric — are published here
            as they are finished.
          </p>
          {session && (
            <ul className="mt-8 grid gap-2 sm:grid-cols-2">
              {session.topics.map((topic) => (
                <li key={topic} className="text-foreground/80 flex items-start gap-2.5 text-sm">
                  <CheckCircle2 className="text-primary mt-0.5 size-4 shrink-0" />
                  {topic}
                </li>
              ))}
            </ul>
          )}
          <div className="mt-10 flex flex-wrap gap-3">
            <Button
              asChild
              className="bg-foreground text-background hover:bg-primary hover:text-primary-foreground rounded-full px-6"
            >
              <Link to="/admissions">Enrol on {course.title}</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full px-6">
              <Link to="/classes">All classes</Link>
            </Button>
          </div>
        </article>
        <CTASection />
      </PageShell>
    );
  }

  const readingMinutes = lectureReadingMinutes(lecture);
  const wordCount = lectureWordCount(lecture);

  return (
    <PageShell>
      <article className="container-page max-w-3xl pt-28 pb-16 md:pt-36 md:pb-24">
        <Reveal>
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm">
            <Link
              to="/classes"
              className="text-muted-foreground hover:text-foreground font-semibold transition-colors"
            >
              Classes
            </Link>
            <span className="text-muted-foreground/50">/</span>
            <Link
              to="/classes/$courseSlug"
              params={{ courseSlug: course.slug }}
              className="text-muted-foreground hover:text-foreground font-semibold transition-colors"
            >
              {course.title}
            </Link>
            <span className="text-muted-foreground/50">/</span>
            <span className="text-muted-foreground">Session {session.number}</span>
          </nav>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-7 flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="font-semibold">
              {course.title}
            </Badge>
            <Badge variant="outline" className="border-foreground/15 font-normal">
              Week {session.week}
            </Badge>
            <Badge variant="outline" className="border-foreground/15 font-normal">
              {course.level}
            </Badge>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="font-display mt-5 text-3xl leading-tight font-extrabold text-balance sm:text-4xl md:text-5xl">
            Session {session.number}: {session.title}
          </h1>
        </Reveal>

        <Reveal delay={0.14}>
          <div className="text-muted-foreground border-foreground/10 mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 border-b pb-7 text-xs font-medium">
            <span className="flex items-center gap-1.5">
              <GraduationCap className="size-3.5" /> Ellis Dennis Graham
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="size-3.5" /> {session.minutes}-minute class
            </span>
            <span className="flex items-center gap-1.5">
              <BookOpen className="size-3.5" /> {readingMinutes} min read ·{" "}
              {wordCount.toLocaleString("en-NG")} words
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.18}>
          <p className="text-muted-foreground mt-8 border-l-2 pl-5 text-lg leading-relaxed font-medium text-pretty italic">
            {lecture.summary}
          </p>
        </Reveal>

        {/* Contents */}
        <Reveal>
          <nav
            aria-label="On this page"
            className="border-foreground/12 bg-muted/30 mt-9 rounded-xl border p-5"
          >
            <p className="font-label text-muted-foreground text-[10px] tracking-[0.16em] uppercase">
              On this page
            </p>
            <ol className="mt-3 grid gap-x-6 gap-y-1.5 text-sm sm:grid-cols-2">
              {[
                ["objectives", "Learning objectives"],
                lecture.learningPath ? ["path", "Where this fits"] : null,
                ["theory", "The taught content"],
                ["demonstration", "Do it, step by step"],
                ["practice", "Guided practice"],
                lecture.exercises?.length ? ["exercises", "Practice on your own"] : null,
                ["mistakes", "Common mistakes"],
                lecture.troubleshooting?.length
                  ? ["troubleshooting", "Troubleshooting by symptom"]
                  : null,
                lecture.safetyNotes?.length ? ["safety", "Safety and shared machines"] : null,
                ["expert", "Expert notes"],
                ["vocabulary", "Key terms"],
                ["homework", "Homework"],
                lecture.mastery?.length ? ["mastery", "Mastery checklist"] : null,
                ["rubric", "Assessment rubric"],
                ["questions", "Session questions"],
                lecture.sources?.length ? ["sources", "Sources"] : null,
              ]
                .filter((item): item is [string, string] => item !== null)
                .map(([id, label], i) => (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      className="hover:text-primary flex items-baseline gap-2 transition-colors"
                    >
                      <span className="text-muted-foreground/60 text-[10px] tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {label}
                    </a>
                  </li>
                ))}
            </ol>
          </nav>
        </Reveal>

        {/* Objectives */}
        <section id="objectives" className="mt-14 scroll-mt-28">
          <SectionLabel icon={Target}>Learning objectives</SectionLabel>
          <p className="text-muted-foreground mt-3 text-sm">
            By the end of this session you will be able to do each of these without prompting.
          </p>
          <ul className="mt-6 space-y-3">
            {lecture.objectives.map((objective) => (
              <li
                key={objective}
                className="text-foreground/85 flex items-start gap-3 text-[16px] leading-relaxed"
              >
                <CheckCircle2 className="text-primary mt-1 size-4 shrink-0" />
                {objective}
              </li>
            ))}
          </ul>
        </section>

        {lecture.learningPath && (
          <section id="path" className="mt-14 scroll-mt-28">
            <SectionLabel icon={GraduationCap}>Where this fits</SectionLabel>
            <div className="border-foreground/12 mt-6 rounded-[14px] border p-6">
              <p className="text-foreground/85 text-[16px] leading-relaxed">
                <RichText text={lecture.learningPath.fits} />
              </p>
              <dl className="mt-6 grid gap-5 sm:grid-cols-2">
                <div>
                  <dt className="font-label text-muted-foreground text-[10px] tracking-[0.16em] uppercase">
                    Before you start
                  </dt>
                  <dd className="mt-2">
                    <ul className="space-y-1.5">
                      {lecture.learningPath.prerequisites.map((item) => (
                        <li key={item} className="text-foreground/80 text-[15px] leading-relaxed">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
                <div>
                  <dt className="font-label text-muted-foreground text-[10px] tracking-[0.16em] uppercase">
                    What this unlocks
                  </dt>
                  <dd className="text-foreground/80 mt-2 text-[15px] leading-relaxed">
                    <RichText text={lecture.learningPath.unlocks} />
                  </dd>
                </div>
                <div>
                  <dt className="font-label text-muted-foreground text-[10px] tracking-[0.16em] uppercase">
                    Focused practice
                  </dt>
                  <dd className="text-foreground/80 mt-2 text-[15px] leading-relaxed">
                    {lecture.learningPath.practiceTime}
                  </dd>
                </div>
                <div>
                  <dt className="font-label text-muted-foreground text-[10px] tracking-[0.16em] uppercase">
                    Next lesson
                  </dt>
                  <dd className="mt-2 text-[15px] leading-relaxed">
                    <a
                      href={lecture.learningPath.nextLesson.href}
                      className="text-primary font-semibold underline underline-offset-2"
                    >
                      {lecture.learningPath.nextLesson.label}
                    </a>
                  </dd>
                </div>
              </dl>
              <div className="border-foreground/10 mt-6 border-t pt-5">
                <p className="font-label text-muted-foreground text-[10px] tracking-[0.16em] uppercase">
                  You are done when
                </p>
                <ul className="mt-3 space-y-2">
                  {lecture.learningPath.definitionOfDone.map((item) => (
                    <li
                      key={item}
                      className="text-foreground/80 flex items-start gap-2.5 text-[15px] leading-relaxed"
                    >
                      <CheckCircle2 className="text-primary mt-1 size-3.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-foreground/10 mt-5 border-t pt-5">
                <p className="font-label text-muted-foreground text-[10px] tracking-[0.16em] uppercase">
                  Assumed environment
                </p>
                <ul className="mt-3 space-y-1.5">
                  {lecture.learningPath.assumptions.map((item) => (
                    <li key={item} className="text-foreground/75 text-[14.5px] leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* Theory */}
        <section id="theory" className="mt-14 scroll-mt-28">
          <SectionLabel icon={BookOpen}>The taught content</SectionLabel>
          <div className="mt-7 space-y-10">
            {lecture.blocks.map((block) => (
              <div key={block.heading}>
                <h3 className="font-display text-xl leading-snug font-bold tracking-tight">
                  {block.heading}
                </h3>
                <div className="mt-4 space-y-4">
                  {block.body.map((paragraph, i) => (
                    <p
                      key={`${block.heading}-${i}`}
                      className="text-foreground/80 text-[16.5px] leading-[1.75] text-pretty [&_strong]:text-foreground [&_strong]:font-semibold [&_a]:text-primary [&_a]:font-semibold [&_a]:underline [&_a]:underline-offset-2 [&_code]:bg-muted [&_code]:rounded [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.88em]"
                      dangerouslySetInnerHTML={{ __html: renderInline(paragraph) }}
                    />
                  ))}
                </div>
                {block.code?.map((sample, i) => (
                  <LectureCodeBlock key={`${block.heading}-code-${i}`} sample={sample} />
                ))}
                {block.remember && (
                  <p className="border-primary/30 bg-primary/[0.04] text-foreground/85 mt-4 rounded-r-[10px] border-l-2 px-4 py-3 text-[15.5px] leading-relaxed">
                    <RichText text={block.remember} />
                  </p>
                )}
                <LectureFigures figures={lecture.figures} afterHeading={block.heading} />
              </div>
            ))}
          </div>
        </section>

        {/* Demonstration */}
        <section id="demonstration" className="mt-14 scroll-mt-28">
          <SectionLabel icon={MonitorPlay}>Instructor demonstration</SectionLabel>
          <p className="text-muted-foreground mt-3 text-[15.5px] leading-relaxed">
            {lecture.demonstration.intro}
          </p>
          <ol className="mt-7 space-y-5">
            {lecture.demonstration.steps.map((step, i) => (
              <li
                key={step.step}
                className="border-foreground/12 bg-card/60 rounded-[12px] border p-5"
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-primary text-sm font-bold tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-[17px] leading-snug font-bold">{step.step}</h3>
                </div>
                <p className="text-foreground/75 mt-2.5 text-[15px] leading-relaxed [&_strong]:text-foreground [&_strong]:font-semibold [&_code]:bg-muted [&_code]:rounded [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.88em]">
                  <RichText text={step.detail} />
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* Practice */}
        <section id="practice" className="mt-14 scroll-mt-28">
          <SectionLabel icon={NotebookPen}>Guided practice</SectionLabel>
          <div className="border-primary/25 bg-primary/[0.04] mt-6 rounded-[14px] border p-6">
            <h3 className="font-display text-xl font-bold tracking-tight">
              {lecture.practice.title}
            </h3>
            <p className="text-foreground/80 mt-3 text-[15.5px] leading-relaxed">
              <RichText text={lecture.practice.brief} />
            </p>
            <ol className="mt-6 space-y-2.5">
              {lecture.practice.steps.map((step, i) => (
                <li
                  key={step}
                  className="text-foreground/80 flex items-start gap-3 text-[15px] leading-relaxed"
                >
                  <span className="text-primary/70 mt-0.5 text-xs font-bold tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
            <div className="border-primary/20 mt-6 border-t pt-5">
              <p className="font-label text-primary text-[10px] tracking-[0.16em] uppercase">
                The standard we hold you to
              </p>
              <p className="text-foreground/85 mt-2 text-[15px] leading-relaxed">
                {lecture.practice.standard}
              </p>
            </div>
          </div>
        </section>

        {lecture.exercises && lecture.exercises.length > 0 && (
          <section id="exercises" className="mt-14 scroll-mt-28">
            <SectionLabel icon={NotebookPen}>Practice on your own</SectionLabel>
            <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
              Do these after the guided practice. The solution stays closed until you have tried.
              Open it to check, not to copy the first time through.
            </p>
            <div className="mt-7 space-y-4">
              {lecture.exercises.map((exercise) => (
                <article
                  key={exercise.title}
                  className="border-foreground/12 rounded-[12px] border p-5"
                >
                  <p className="font-label text-primary text-[10px] tracking-[0.16em] uppercase">
                    {exercise.kind}
                  </p>
                  <h3 className="font-display mt-1.5 text-[17px] font-bold">{exercise.title}</h3>
                  <p className="text-foreground/80 mt-3 text-[15px] leading-relaxed">
                    <RichText text={exercise.prompt} />
                  </p>
                  {exercise.hint && (
                    <p className="text-muted-foreground mt-3 text-[14.5px] leading-relaxed">
                      <span className="text-foreground font-semibold">Hint: </span>
                      <RichText text={exercise.hint} />
                    </p>
                  )}
                  <p className="text-foreground/80 mt-3 text-[15px] leading-relaxed">
                    <span className="text-foreground font-semibold">What done looks like: </span>
                    <RichText text={exercise.expected} />
                  </p>
                  <details className="group border-foreground/10 mt-4 border-t pt-3">
                    <summary className="text-primary cursor-pointer text-sm font-semibold">
                      Solution and why it works
                    </summary>
                    <p className="text-foreground/80 mt-3 text-[15px] leading-relaxed">
                      <RichText text={exercise.solution} />
                    </p>
                  </details>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Mistakes */}
        <section id="mistakes" className="mt-14 scroll-mt-28">
          <SectionLabel icon={AlertTriangle}>Common mistakes and how to fix them</SectionLabel>
          <div className="mt-7 space-y-4">
            {lecture.pitfalls.map((pitfall) => (
              <div key={pitfall.problem} className="border-foreground/12 rounded-[12px] border p-5">
                <p className="text-foreground font-semibold text-[15.5px]">{pitfall.problem}</p>
                <p className="text-foreground/75 mt-2 text-[15px] leading-relaxed">
                  <span className="text-primary font-semibold">Fix: </span>
                  <RichText text={pitfall.fix} />
                </p>
              </div>
            ))}
          </div>
        </section>

        {lecture.troubleshooting && lecture.troubleshooting.length > 0 && (
          <section id="troubleshooting" className="mt-14 scroll-mt-28">
            <SectionLabel icon={Wrench}>Troubleshooting by symptom</SectionLabel>
            <p className="text-muted-foreground mt-3 max-w-2xl text-[15px] leading-relaxed">
              Start from what you can see, not from a guess about what is broken. One check at a
              time. If the check does not match, move to the next likely cause. Do not try three
              fixes at once — you will not know which one worked.
            </p>
            <div className="mt-7 space-y-5">
              {lecture.troubleshooting.map((item) => (
                <article
                  key={item.symptom}
                  className="border-foreground/12 rounded-[12px] border p-5"
                >
                  <h3 className="font-display text-[17px] leading-snug font-bold">
                    {item.symptom}
                  </h3>
                  <dl className="mt-4 space-y-3 text-[15px] leading-relaxed">
                    {[
                      ["What is probably happening", item.likelyCause],
                      ["Check", item.check],
                      ["Fix", item.fix],
                      ["Next time", item.prevention],
                      ["Stop and ask for help when", item.whenToStop ?? ""],
                    ]
                      .filter((row) => row[1])
                      .map(([label, value]) => (
                        <div key={label}>
                          <dt className="text-primary text-[13px] font-semibold">{label}</dt>
                          <dd className="text-foreground/80 mt-1">
                            <RichText text={value} />
                          </dd>
                        </div>
                      ))}
                  </dl>
                </article>
              ))}
            </div>
          </section>
        )}

        {lecture.safetyNotes && lecture.safetyNotes.length > 0 && (
          <section id="safety" className="mt-14 scroll-mt-28">
            <SectionLabel icon={Shield}>Safety, privacy, and shared machines</SectionLabel>
            <ul className="mt-6 space-y-4">
              {lecture.safetyNotes.map((note) => (
                <li
                  key={note.slice(0, 48)}
                  className="border-foreground/10 bg-muted/25 text-foreground/80 border-l-2 py-1 pl-5 text-[15.5px] leading-relaxed"
                >
                  <RichText text={note} />
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Expert notes */}
        <section id="expert" className="mt-14 scroll-mt-28">
          <SectionLabel icon={Lightbulb}>Expert notes</SectionLabel>
          <p className="text-muted-foreground mt-3 text-sm">
            The habits that separate someone who can do this from someone who does it well.
          </p>
          <ul className="mt-6 space-y-4">
            {lecture.expertNotes.map((note) => (
              <li
                key={note.slice(0, 40)}
                className="border-foreground/10 bg-muted/25 border-l-2 py-1 pl-5 text-[15.5px] leading-relaxed text-pretty"
              >
                <RichText text={note} />
              </li>
            ))}
          </ul>
        </section>

        {/* Vocabulary */}
        <section id="vocabulary" className="mt-14 scroll-mt-28">
          <SectionLabel icon={ListChecks}>Key terms</SectionLabel>
          <dl className="mt-7 grid gap-4 sm:grid-cols-2">
            {lecture.vocabulary.map((entry) => (
              <div key={entry.term} className="border-foreground/12 rounded-[12px] border p-4">
                <dt className="font-display text-[15px] font-bold">{entry.term}</dt>
                <dd className="text-foreground/75 mt-1.5 text-[13.5px] leading-relaxed">
                  {entry.meaning}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Homework */}
        <section id="homework" className="mt-14 scroll-mt-28">
          <SectionLabel icon={ClipboardList}>Homework before the next session</SectionLabel>
          <div className="mt-7 space-y-4">
            {lecture.homework.map((item) => (
              <div key={item.task} className="border-foreground/12 rounded-[12px] border p-5">
                <p className="font-display text-[16px] font-bold">{item.task}</p>
                <p className="text-foreground/75 mt-2 text-[15px] leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {lecture.mastery && lecture.mastery.length > 0 && (
          <section id="mastery" className="mt-14 scroll-mt-28">
            <SectionLabel icon={ListChecks}>Can you do this?</SectionLabel>
            <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
              Close the page and answer from the machine, not from memory of the sentences. A no
              means go back to that step. It does not mean you failed the lesson.
            </p>
            <ul className="mt-6 space-y-3">
              {lecture.mastery.map((item) => (
                <li
                  key={item}
                  className="text-foreground/85 flex items-start gap-3 text-[15.5px] leading-relaxed"
                >
                  <CheckCircle2 className="text-primary mt-1 size-4 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Rubric */}
        <section id="rubric" className="mt-14 scroll-mt-28">
          <SectionLabel icon={Target}>Assessment rubric</SectionLabel>
          <p className="text-muted-foreground mt-3 text-sm">
            How this session is marked. The certificate for {course.title} is awarded on the
            deliverable, not on attendance.
          </p>
          <div className="mt-7 overflow-x-auto">
            <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
              <thead>
                <tr className="border-foreground/15 border-b">
                  {["Criterion", "Passing", "Excellent"].map((heading) => (
                    <th
                      key={heading}
                      scope="col"
                      className="font-label text-muted-foreground py-3 pr-5 text-[10px] tracking-[0.16em] uppercase"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {lecture.rubric.map((row) => (
                  <tr key={row.criterion} className="border-foreground/10 border-b last:border-0">
                    <th scope="row" className="text-foreground py-4 pr-5 align-top font-semibold">
                      {row.criterion}
                    </th>
                    <td className="text-foreground/75 py-4 pr-5 align-top">{row.passing}</td>
                    <td className="text-foreground/75 py-4 align-top">{row.excellent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Session questions */}
        <section id="questions" className="mt-14 scroll-mt-28">
          <SectionLabel icon={HelpCircle}>Session questions</SectionLabel>
          <div className="divide-foreground/10 mt-6 divide-y">
            {lecture.faqs.map((faq) => (
              <details key={faq.q} className="group py-5">
                <summary className="font-display flex cursor-pointer list-none items-start justify-between gap-6 text-[17px] font-bold tracking-tight [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <span className="text-primary mt-1 shrink-0 transition-transform duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="text-foreground/75 mt-3 text-[15px] leading-relaxed">
                  <RichText text={faq.a} />
                </p>
              </details>
            ))}
          </div>
        </section>

        {lecture.sources && lecture.sources.length > 0 && (
          <section id="sources" className="mt-14 scroll-mt-28">
            <SectionLabel icon={BookOpen}>Sources and what to verify</SectionLabel>
            <ul className="mt-6 space-y-4">
              {lecture.sources.map((source) => (
                <li key={source.url} className="text-[15px] leading-relaxed">
                  <a
                    href={source.url}
                    className="text-primary font-semibold underline underline-offset-2"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {source.title}
                  </a>
                  <p className="text-foreground/75 mt-1">{source.note}</p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {reviewed && (
          <ContentFreshness
            lastReviewed={reviewed}
            author="Cyber Elias Academy faculty"
            className="border-foreground/10 mt-14 border-t pt-6"
          />
        )}

        {/* Prev / next */}
        <nav
          aria-label="Course sessions"
          className="border-foreground/10 mt-10 grid gap-4 border-t pt-8 sm:grid-cols-2"
        >
          {prev ? (
            <Link
              to="/classes/$courseSlug/$sessionSlug"
              params={{ courseSlug: course.slug, sessionSlug: prev.slug }}
              className="group border-foreground/12 hover:border-primary/35 rounded-[12px] border p-5 transition-colors"
            >
              <span className="text-muted-foreground flex items-center gap-1.5 text-xs font-semibold">
                <ArrowLeft className="size-3.5" /> Previous session
              </span>
              <span className="font-display group-hover:text-primary mt-2 block text-[15px] leading-snug font-bold">
                {prev.number}: {prev.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              to="/classes/$courseSlug/$sessionSlug"
              params={{ courseSlug: course.slug, sessionSlug: next.slug }}
              className="group border-foreground/12 hover:border-primary/35 rounded-[12px] border p-5 text-right transition-colors"
            >
              <span className="text-muted-foreground flex items-center justify-end gap-1.5 text-xs font-semibold">
                Next session <ArrowRight className="size-3.5" />
              </span>
              <span className="font-display group-hover:text-primary mt-2 block text-[15px] leading-snug font-bold">
                {next.number}: {next.title}
              </span>
            </Link>
          ) : (
            <Link
              to="/classes/$courseSlug"
              params={{ courseSlug: course.slug }}
              className="group border-foreground/12 hover:border-primary/35 rounded-[12px] border p-5 text-right transition-colors"
            >
              <span className="text-muted-foreground flex items-center justify-end gap-1.5 text-xs font-semibold">
                Course complete <ArrowRight className="size-3.5" />
              </span>
              <span className="font-display group-hover:text-primary mt-2 block text-[15px] leading-snug font-bold">
                Back to {course.title}
              </span>
            </Link>
          )}
        </nav>

        {/* Course CTA */}
        <div className="border-foreground/12 bg-card/60 mt-10 rounded-[14px] border p-6 backdrop-blur-md">
          <p className="font-label text-primary text-[10px] tracking-[0.16em] uppercase">
            This session is part of
          </p>
          <p className="font-display mt-2 text-2xl leading-tight font-bold">{course.title}</p>
          <p className="text-muted-foreground mt-2 text-sm">
            {course.weeks} weeks · {course.sessions.length} sessions · {formatFee(course.fee)} · you
            leave with {course.deliverable.title.toLowerCase()}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              asChild
              className="bg-foreground text-background hover:bg-primary hover:text-primary-foreground rounded-full px-6"
            >
              <Link to="/classes/$courseSlug" params={{ courseSlug: course.slug }}>
                See the full course
              </Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full px-6">
              <Link to="/admissions">Enrol now</Link>
            </Button>
          </div>
        </div>
      </article>

      <CTASection
        title={`Take ${course.title} in the classroom`}
        description="Reading the notes is the first level. Doing the work with an instructor correcting you in the room is how you reach the third. Two sessions a week, supervised practice, and a certificate awarded on what you produce."
      />
    </PageShell>
  );
}

function isSafeHref(href: string): boolean {
  return href.startsWith("/") || href.startsWith("https://");
}

/** Bold, code, and safe links. HTML is escaped first. */
function renderInline(text: string): string {
  const escaped = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return escaped
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (match, label: string, href: string) => {
      if (!isSafeHref(href)) return match;
      const external = href.startsWith("https://");
      const attrs = external ? ' target="_blank" rel="noopener noreferrer"' : "";
      return `<a href="${href}"${attrs}>${label}</a>`;
    })
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
}

function RichText({ text }: { text: string }) {
  return <span dangerouslySetInnerHTML={{ __html: renderInline(text) }} />;
}

function LectureCodeBlock({
  sample,
}: {
  sample: { filename?: string; language: string; source: string; caption?: string };
}) {
  return (
    <figure className="border-foreground/12 mt-5 overflow-hidden rounded-[12px] border">
      <figcaption className="border-foreground/10 bg-muted/40 flex flex-wrap items-baseline justify-between gap-2 border-b px-4 py-2">
        <span className="text-foreground font-mono text-[13px] font-semibold">
          {sample.filename ?? sample.language}
        </span>
        <span className="text-muted-foreground text-[11px] tracking-wide uppercase">
          {sample.language}
        </span>
      </figcaption>
      <pre className="overflow-x-auto p-4 text-[13.5px] leading-relaxed">
        <code className="font-mono">{sample.source}</code>
      </pre>
      {sample.caption && (
        <figcaption className="text-muted-foreground border-foreground/10 border-t px-4 py-3 text-sm leading-relaxed">
          {sample.caption}
        </figcaption>
      )}
    </figure>
  );
}

function LectureFigures({
  figures,
  afterHeading,
}: {
  figures:
    { id: string; src: string; alt: string; caption: string; afterHeading: string }[] | undefined;
  afterHeading: string;
}) {
  const matched = figures?.filter((figure) => figure.afterHeading === afterHeading) ?? [];
  if (matched.length === 0) return null;
  return (
    <div className="mt-6 space-y-6">
      {matched.map((figure) => (
        <figure
          key={figure.id}
          className="border-foreground/12 overflow-hidden rounded-[12px] border"
        >
          <img src={figure.src} alt={figure.alt} className="h-auto w-full" loading="lazy" />
          <figcaption className="text-muted-foreground px-4 py-3 text-sm leading-relaxed">
            {figure.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
