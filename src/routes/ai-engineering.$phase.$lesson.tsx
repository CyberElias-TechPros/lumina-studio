import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Clock,
  Code2,
  ExternalLink,
  FileQuestion,
  Github,
  ShieldCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageShell, Eyebrow } from "@/components/marketing/shell";
import { LessonQuiz } from "@/components/ai/lesson-quiz";
import {
  AI_LESSON_INDEX,
  AI_SOURCE,
  findLessonNeighbors,
  findPhase,
  type AiLessonModule,
} from "@/data/ai-from-scratch";
import { loadPhaseLessons } from "@/data/ai-lessons-server";
import { getPageHead } from "@/lib/seo";
import { SITE_URL } from "@/lib/site-url";

type LessonParams = { phase?: string; lesson?: string };

export const Route = createFileRoute("/ai-engineering/$phase/$lesson")({
  head: async ({ params }: { params: LessonParams }) => {
    const entry = AI_LESSON_INDEX.find(
      (candidate) => candidate.phase === params.phase && candidate.lesson === params.lesson,
    );
    const phase = findPhase(params.phase ?? "");
    const title = entry?.title ?? "AI Engineering from Scratch";
    const phaseLabel = phase?.title ?? "AI Engineering";
    const minutes = entry?.minutes ?? null;
    const description = `Free, MIT-licensed lesson from AI Engineering from Scratch: ${title} (${phaseLabel}).${
      minutes ? ` ~${minutes} minutes,` : ""
    } hands-on, hosted in full by CEA with the author's permission.`;
    const path = `/ai-engineering/${params.phase}/${params.lesson}`;
    return getPageHead({
      title: `${title} — AI Engineering from Scratch`,
      description,
      path,
      type: "article",
      noIndex: true,
      structuredData: [
        {
          "@context": "https://schema.org",
          "@type": "TechArticle",
          name: title,
          description,
          inLanguage: "en",
          isBasedOn: `${AI_SOURCE.site}/learn/${(params.phase ?? "").replace(/^\d+-/, "")}/${(
            params.lesson ?? ""
          ).replace(/^\d+-/, "")}`,
          license: "https://opensource.org/licenses/MIT",
          author: { "@type": "Person", name: AI_SOURCE.author, url: AI_SOURCE.repo },
          provider: {
            "@type": "EducationalOrganization",
            name: "Cyber Elias Academy",
            sameAs: SITE_URL,
          },
          ...(minutes ? { timeRequired: `PT${minutes}M` } : {}),
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "AI Engineering from Scratch",
              item: `${SITE_URL}/ai-engineering`,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: phaseLabel,
              item: `${SITE_URL}/ai-engineering/lessons`,
            },
            { "@type": "ListItem", position: 3, name: title, item: `${SITE_URL}${path}` },
          ],
        },
      ],
    });
  },
  component: AiLessonPage,
});

function findLesson(lessons: readonly AiLessonModule[], slug: string): AiLessonModule | undefined {
  return lessons.find((lesson) => lesson.slug === slug);
}

async function AiLessonPage({ params }: { params: LessonParams }) {
  const phase = params.phase ?? "";
  const lessonSlug = params.lesson ?? "";
  const phaseEntry = findPhase(phase);
  const lessons = phaseEntry ? await loadPhaseLessons(phase) : [];
  const lesson = findLesson(lessons, lessonSlug);
  const neighbors = findLessonNeighbors(phase, lessonSlug);

  if (!phaseEntry || !lesson) {
    return (
      <PageShell>
        <article className="container-page max-w-3xl pt-32 pb-20 md:pt-40">
          <Link
            to="/ai-engineering/lessons"
            className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm font-semibold"
          >
            <ArrowLeft className="size-4" aria-hidden="true" /> All 542 lessons
          </Link>
          <h1 className="font-display mt-8 text-3xl font-semibold tracking-tight">
            That lesson isn’t in the mirror yet.
          </h1>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            The catalogue is generated from the upstream repository. Regenerate it with{" "}
            <code>npm run generate:ai-lessons</code>, or browse the full index.
          </p>
          <Button asChild className="mt-6 rounded-full">
            <Link to="/ai-engineering/lessons">Browse the curriculum</Link>
          </Button>
        </article>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <link rel="stylesheet" href="/vendor/katex/katex.min.css" precedence="default" />
      <article className="container-page max-w-4xl pt-28 pb-16 md:pt-32 md:pb-24">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="text-muted-foreground flex flex-wrap items-center gap-2 text-sm"
        >
          <Link
            to="/ai-engineering"
            className="hover:text-foreground font-semibold transition-colors"
          >
            AI Engineering
          </Link>
          <span aria-hidden="true" className="text-muted-foreground/50">
            /
          </span>
          <Link
            to="/ai-engineering/lessons"
            className="hover:text-foreground font-semibold transition-colors"
          >
            {phaseEntry.title}
          </Link>
          <span aria-hidden="true" className="text-muted-foreground/50">
            /
          </span>
          <span className="text-foreground/80">{lesson.title}</span>
        </nav>

        {/* Meta badges */}
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <Badge variant="secondary" className="font-mono text-[10px] tracking-[0.14em] uppercase">
            {phaseEntry.title}
          </Badge>
          {lesson.minutes ? (
            <Badge variant="outline" className="border-foreground/15 font-normal">
              <Clock className="mr-1 size-3.5" aria-hidden="true" /> ~{lesson.minutes} min
            </Badge>
          ) : null}
          {lesson.quiz?.length ? (
            <Badge variant="outline" className="border-foreground/15 font-normal">
              <FileQuestion className="mr-1 size-3.5" aria-hidden="true" /> {lesson.quiz.length}
              -question self-check
            </Badge>
          ) : null}
          <Badge
            variant="outline"
            className="border-emerald-500/40 font-normal text-emerald-700 dark:text-emerald-400"
          >
            <ShieldCheck className="mr-1 size-3.5" aria-hidden="true" /> MIT licensed
          </Badge>
        </div>

        <h1 className="font-display mt-5 text-4xl leading-[1.05] font-semibold tracking-[-0.03em] text-balance sm:text-5xl">
          {lesson.title}
        </h1>

        <div className="text-muted-foreground border-foreground/10 mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-b pb-6 text-xs font-medium">
          <span className="flex items-center gap-1.5">
            <Github className="size-3.5" aria-hidden="true" /> Rohit Ghumare · AI Engineering from
            Scratch
          </span>
          <a
            href={lesson.codeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary flex items-center gap-1.5 font-semibold hover:underline"
          >
            <Code2 className="size-3.5" aria-hidden="true" /> Code & notebooks
          </a>
          <a
            href={lesson.canonical}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary flex items-center gap-1.5 font-semibold hover:underline"
          >
            <ExternalLink className="size-3.5" aria-hidden="true" /> Canonical lesson
          </a>
        </div>

        {/* Rendered lesson body (vendored MIT content, sanitised at vendor time) */}
        <div className="ai-lesson mt-10" dangerouslySetInnerHTML={{ __html: lesson.html }} />

        {/* Attribution — the licence requires it; we make it a feature */}
        <aside
          className="border-foreground/12 bg-muted/35 mt-12 rounded-2xl border p-5 text-sm leading-relaxed sm:p-6"
          aria-label="About this lesson"
        >
          <div className="flex items-center gap-2">
            <Github className="text-primary size-4" aria-hidden="true" />
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-muted-foreground">
              Source & licence
            </p>
          </div>
          <p className="text-muted-foreground mt-2">
            This lesson is part of{" "}
            <a
              href={AI_SOURCE.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground font-semibold hover:underline"
            >
              AI Engineering from Scratch
            </a>{" "}
            by Rohit Ghumare, reproduced under the MIT License (© 2026). CEA hosts the complete
            curriculum free — the hands-on code, exercises and quizzes are the author’s work, not
            ours. If something looks wrong, the fix belongs{" "}
            <a
              href={AI_SOURCE.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground font-semibold hover:underline"
            >
              upstream
            </a>
            . CEA cohorts teach this material with Nigerian projects, labs and certificates at{" "}
            <Link to="/ai-engineering" className="text-primary font-semibold hover:underline">
              /ai-engineering
            </Link>
            .
          </p>
        </aside>

        {/* Quiz */}
        {lesson.quiz?.length ? (
          <div className="mt-10">
            <LessonQuiz questions={lesson.quiz} />
          </div>
        ) : null}

        {/* Prev / next */}
        <nav
          className="border-foreground/10 mt-12 grid gap-3 border-t pt-8 sm:grid-cols-2"
          aria-label="Lesson navigation"
        >
          {neighbors.previous ? (
            <Link
              to="/ai-engineering/$phase/$lesson"
              params={{ phase: neighbors.previous.phase, lesson: neighbors.previous.lesson }}
              className="group border-foreground/12 hover:border-primary/50 rounded-2xl border p-4 transition-colors"
            >
              <span className="text-muted-foreground flex items-center gap-1.5 font-mono text-[10px] tracking-[0.2em] uppercase">
                <ChevronLeft
                  className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5"
                  aria-hidden="true"
                />
                Previous
              </span>
              <span className="mt-2 block leading-snug font-semibold">
                {neighbors.previous.title}
              </span>
            </Link>
          ) : (
            <span className="hidden sm:block" />
          )}
          {neighbors.next ? (
            <Link
              to="/ai-engineering/$phase/$lesson"
              params={{ phase: neighbors.next.phase, lesson: neighbors.next.lesson }}
              className="group border-foreground/12 hover:border-primary/50 rounded-2xl border p-4 text-right transition-colors sm:justify-self-end sm:w-full"
            >
              <span className="text-muted-foreground flex items-center gap-1.5 justify-end font-mono text-[10px] tracking-[0.2em] uppercase">
                Next
                <ChevronRight
                  className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </span>
              <span className="mt-2 block leading-snug font-semibold">{neighbors.next.title}</span>
            </Link>
          ) : null}
        </nav>
      </article>
    </PageShell>
  );
}
