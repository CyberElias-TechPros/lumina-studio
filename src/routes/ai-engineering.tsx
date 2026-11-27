import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import {
  ArrowUpRight,
  BookOpenCheck,
  Clock,
  FlaskConical,
  Github,
  GraduationCap,
  Map,
  ShieldCheck,
  Wand2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageShell, Eyebrow, PageHero, CTASection } from "@/components/marketing/shell";
import { GradientDescentLab } from "@/components/ai/gradient-descent";
import { PromptLab } from "@/components/ai/prompt-lab";
import {
  AI_SOURCE,
  aiCareerRoutes,
  aiEntryRoutes,
  aiFeaturedLessons,
  aiPhases,
} from "@/data/ai-from-scratch";
import { getPageHead } from "@/lib/seo";

export const Route = createFileRoute("/ai-engineering")({
  head: () =>
    getPageHead({
      title: "AI Engineering from Scratch — Free MIT-Licensed Curriculum",
      description:
        "Explore AI Engineering from Scratch, the free 542-lesson open curriculum: 20 phases from dev setup to agent engineering. Curated entry paths, an interactive gradient-descent lab and prompt engineering patterns — free for CEA learners. MIT licensed.",
      path: "/ai-engineering",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "AI Engineering from Scratch — CEA gateway",
        description:
          "Cyber Elias Academy's curated gateway to the open MIT-licensed AI Engineering from Scratch curriculum.",
        isBasedOn: AI_SOURCE.repo,
      },
    }),
  component: AiEngineeringPage,
});

const minutesToHours = (minutes: number) => {
  const hours = Math.round(minutes / 60);
  return `~${hours}h`;
};

function AiEngineeringPage() {
  const totalLessons = aiPhases.reduce((sum, phase) => sum + phase.lessons, 0);

  return (
    <PageShell>
      <PageHero
        eyebrow="Free learning · MIT-licensed curriculum"
        title={
          <>
            AI Engineering,{" "}
            <span className="font-serif text-primary font-normal italic">from scratch.</span>
          </>
        }
        description="The world's open AI curriculum — 542 lessons, 20 phases, five programming languages — is free for anyone, and every lesson is hosted right here. CEA adds the way in: starting points, a live gradient-descent lab, prompt engineering patterns, and the career routes that map to real AI work."
        meta={["542 lessons", "20 phases", "MIT licensed", "Free forever"]}
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/ai-engineering/lessons"
            className="group bg-primary text-primary-foreground inline-flex h-12 items-center gap-2 rounded-full px-6 text-sm font-semibold shadow-[var(--shadow-halo)] transition-all hover:-translate-y-0.5"
          >
            Browse all {AI_SOURCE.totalLessons} lessons — free
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <Button asChild variant="outline" size="lg" className="rounded-full">
            <Link to="/classes">See CEA courses first</Link>
          </Button>
        </div>
      </PageHero>

      {/* ── The numbers, real ones ─────────────────────────────────────── */}
      <section className="border-border border-b" aria-label="Curriculum at a glance">
        <div className="container-page grid grid-cols-2 divide-x divide-foreground/8 md:grid-cols-4">
          {[
            [`${AI_SOURCE.totalLessons}`, "lessons, all hands-on"],
            [`${AI_SOURCE.totalPhases}`, "phases, zero → portfolio"],
            [`${AI_SOURCE.languages.length}`, "languages (Python first)"],
            ["MIT", "free, forever, attribution"],
          ].map(([value, label]) => (
            <div key={label} className="px-4 py-8 text-center sm:py-10">
              <p className="font-display text-4xl font-semibold tracking-tight tabular-nums sm:text-5xl">
                {value}
              </p>
              <p className="text-muted-foreground mx-auto mt-2 max-w-37.5 text-[11px] leading-snug sm:text-xs">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Why CEA hosts this ─────────────────────────────────────────── */}
      <section className="container-page py-16 md:py-24">
        <div className="grid gap-10 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16">
          <div>
            <Eyebrow>Why we teach this</Eyebrow>
            <h2 className="font-display mt-4 text-4xl leading-[1.0] font-semibold tracking-[-0.04em] text-balance sm:text-5xl">
              Office skills open the door.{" "}
              <span className="font-serif text-primary font-normal italic">
                AI opens the next one.
              </span>
            </h2>
          </div>
          <div className="text-muted-foreground space-y-5 text-lg leading-relaxed">
            <p>
              Every job in Port Harcourt is quietly adding an AI line to its requirements — the
              accountant who can draft a report with AI, the marketer who can brief one, the
              developer whose agent writes the boilerplate. The gap is not access; the knowledge is
              free. The gap is a guided path and the discipline to finish.
            </p>
            <p>
              CEA teaches the foundation — computer basics, typing, Office, design, web — in the
              classroom. This page is the bridge beyond it: a curated, honest route through the open
              AI curriculum, hosted here with the author's MIT blessing, with the hard parts made
              visible before you commit.
            </p>
            <div className="flex flex-wrap gap-x-8 gap-y-3 pt-2 text-sm font-semibold">
              <Link to="/classes" className="text-primary hover:underline">
                CEA course catalogue →
              </Link>
              <Link to="/blog" className="text-primary hover:underline">
                Free notes from the classroom →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Interactive lab ────────────────────────────────────────────── */}
      <section className="border-border border-t py-16 md:py-24" aria-labelledby="gd-lab">
        <div className="container-page">
          <div className="max-w-2xl">
            <Eyebrow>
              <FlaskConical className="size-3.5" aria-hidden="true" /> Interactive lab
            </Eyebrow>
            <h2
              id="gd-lab"
              className="font-display mt-4 text-4xl leading-[1.0] font-semibold tracking-[-0.04em] text-balance sm:text-5xl"
            >
              Feel gradient descent — before you read a single proof.
            </h2>
            <p className="text-muted-foreground mt-4 max-w-xl leading-relaxed">
              Twenty points on a loss parabola. Drag the learning rate, hit run, and watch the
              steps. Push past η = 1 and the run diverges — the exact failure the math in Phase 01
              predicts.
            </p>
          </div>
          <div className="mt-10">
            <GradientDescentLab />
          </div>
        </div>
      </section>

      {/* ── Prompt patterns ────────────────────────────────────────────── */}
      <section className="border-border border-t py-16 md:py-24" aria-labelledby="prompt-lab">
        <div className="container-page">
          <div className="max-w-2xl">
            <Eyebrow>
              <Wand2 className="size-3.5" aria-hidden="true" /> Prompt patterns
            </Eyebrow>
            <h2
              id="prompt-lab"
              className="font-display mt-4 text-4xl leading-[1.0] font-semibold tracking-[-0.04em] text-balance sm:text-5xl"
            >
              Copy the pattern, not the product.
            </h2>
            <p className="text-muted-foreground mt-4 max-w-xl leading-relaxed">
              The first skill the curriculum teaches, distilled: role, context, constraints, output
              format. Four everyday tasks — click to copy the engineered version.
            </p>
          </div>
          <div className="mt-10">
            <PromptLab />
          </div>
        </div>
      </section>

      {/* ── Three ways in ──────────────────────────────────────────────── */}
      <section className="border-border border-t py-16 md:py-24" aria-labelledby="ai-routes">
        <div className="container-page">
          <Eyebrow>
            <Map className="size-3.5" aria-hidden="true" /> Three ways in
          </Eyebrow>
          <h2
            id="ai-routes"
            className="font-display mt-4 max-w-2xl text-4xl leading-[1.0] font-semibold tracking-[-0.04em] text-balance sm:text-5xl"
          >
            Pick an entry route — don't read lessons in order.
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {aiEntryRoutes.map((route, index) => (
              <Link
                key={route.id}
                to={route.startingHref}
                className="card-lift border-foreground/10 bg-card group flex flex-col rounded-xl border p-6"
              >
                <p className="text-muted-foreground/70 font-mono text-[10px] tracking-[0.24em] uppercase">
                  Route {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="font-display mt-3 flex items-center justify-between gap-3 text-xl font-semibold tracking-tight">
                  {route.label}
                  <ArrowUpRight
                    className="text-muted-foreground size-5 shrink-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
                    aria-hidden="true"
                  />
                </h3>
                <p className="text-muted-foreground mt-3 flex-1 text-sm leading-relaxed">
                  {route.summary}
                </p>
                <p className="border-foreground/10 mt-5 border-t pt-4 text-[11px]">
                  <span className="text-muted-foreground">Start with: </span>
                  <span className="font-semibold">{route.startingPoint}</span>
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Starter lessons ────────────────────────────────────────────── */}
      <section className="border-border border-t py-16 md:py-24" aria-labelledby="ai-lessons">
        <div className="container-page">
          <Eyebrow>
            <BookOpenCheck className="size-3.5" aria-hidden="true" /> Starter lessons
          </Eyebrow>
          <h2
            id="ai-lessons"
            className="font-display mt-4 max-w-2xl text-4xl leading-[1.0] font-semibold tracking-[-0.04em] text-balance sm:text-5xl"
          >
            Six lessons that repay the time.
          </h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {aiFeaturedLessons.map((lesson) => (
              <li key={lesson.title}>
                <Link
                  to={lesson.href}
                  className="card-lift border-foreground/10 bg-card group flex h-full flex-col rounded-xl border p-5"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-muted-foreground font-mono text-[8px] tracking-[0.2em] uppercase">
                      {lesson.phase}
                    </p>
                  </div>
                  <h3 className="font-display mt-3 text-lg leading-snug font-semibold tracking-tight">
                    {lesson.title}
                  </h3>
                  <p className="text-muted-foreground mt-2 flex-1 text-[13px] leading-relaxed">
                    {lesson.summary}
                  </p>
                  <div className="border-foreground/10 mt-4 flex items-center justify-between gap-3 border-t pt-4 text-[11px]">
                    <span className="text-primary inline-flex items-center gap-1.5 font-semibold">
                      <Clock className="size-3.5" aria-hidden="true" /> ~{lesson.minutes} min
                    </span>
                    <span className="border-primary/30 bg-primary/8 rounded-full border px-2.5 py-1 font-mono text-[8px] tracking-[0.18em] text-primary uppercase">
                      {lesson.tag}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── The mirror: every lesson is hosted here ─────────────────────── */}
      <section className="border-border border-t" aria-labelledby="ai-mirror">
        <div className="container-page flex flex-col gap-4 py-8 md:flex-row md:items-center md:justify-between md:gap-10">
          <p id="ai-mirror" className="leading-relaxed">
            <span className="font-mono text-[10px] tracking-[0.22em] text-primary uppercase">
              Hosted here
            </span>
            <span className="mt-1 block font-semibold text-balance">
              All 542 lessons — text, code and quizzes — are on this site now. No external tab, no
              sign-up, no paywall.
            </span>
          </p>
          <Button asChild className="rounded-full shrink-0">
            <Link to="/ai-engineering/lessons">
              Open the lesson library
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </section>

      {/* ── The full map ───────────────────────────────────────────────── */}
      <section className="border-border border-t py-16 md:py-24" aria-labelledby="ai-map">
        <div className="container-page">
          <Eyebrow>
            <Map className="size-3.5" aria-hidden="true" /> The full map
          </Eyebrow>
          <h2
            id="ai-map"
            className="font-display mt-4 max-w-2xl text-4xl leading-[1.0] font-semibold tracking-[-0.04em] text-balance sm:text-5xl"
          >
            Twenty phases. {totalLessons} lessons. Zero tuition.
          </h2>
          <ol className="border-foreground/10 mt-10 divide-y divide-foreground/8 overflow-hidden rounded-xl border">
            {aiPhases.map((phase) => (
              <li key={phase.id}>
                <Link
                  to="/ai-engineering/lessons"
                  className="hover:bg-foreground/[0.03] group flex flex-col gap-1.5 px-5 py-4 transition-colors sm:flex-row sm:items-baseline sm:gap-6 sm:px-6"
                >
                  <span className="text-muted-foreground/70 w-14 shrink-0 font-mono text-[10px] tracking-[0.2em] tabular-nums">
                    {phase.id.slice(0, 2)}
                  </span>
                  <span className="w-52 shrink-0 font-semibold tracking-tight">{phase.title}</span>
                  <span className="text-muted-foreground flex-1 text-[13px] leading-relaxed">
                    {phase.blurb}
                  </span>
                  <span className="text-muted-foreground shrink-0 font-mono text-[10px] tracking-[0.2em] uppercase tabular-nums">
                    {phase.lessons} lessons
                    <ArrowUpRight className="ml-2 inline size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Career routes ──────────────────────────────────────────────── */}
      <section className="border-border border-t py-16 md:py-24" aria-labelledby="ai-careers">
        <div className="container-page">
          <Eyebrow>
            <GraduationCap className="size-3.5" aria-hidden="true" /> Career routes
          </Eyebrow>
          <h2
            id="ai-careers"
            className="font-display mt-4 max-w-2xl text-4xl leading-[1.0] font-semibold tracking-[-0.04em] text-balance sm:text-5xl"
          >
            Turn lessons into a portfolio, not just notes.
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {aiCareerRoutes.map((route) => (
              <a
                key={route.id}
                href={route.learnHref}
                target="_blank"
                rel="noopener noreferrer"
                className="card-lift border-foreground/10 bg-card group flex flex-col rounded-xl border p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-xl font-semibold leading-snug tracking-tight">
                    {route.title}
                  </h3>
                  <ArrowUpRight
                    className="text-muted-foreground size-5 shrink-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
                    aria-hidden="true"
                  />
                </div>
                <p className="text-muted-foreground mt-3 flex-1 text-sm leading-relaxed">
                  {route.summary}
                </p>
                <dl className="border-foreground/10 mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 border-t pt-4 text-[11px]">
                  <div>
                    <dt className="text-muted-foreground font-mono text-[8px] tracking-[0.2em] uppercase">
                      Lesson time
                    </dt>
                    <dd className="mt-0.5 font-semibold tabular-nums">
                      {minutesToHours(route.minutes)}
                    </dd>
                  </div>
                  {route.portfolioProof && (
                    <div>
                      <dt className="text-muted-foreground font-mono text-[8px] tracking-[0.2em] uppercase">
                        Proof project
                      </dt>
                      <dd className="mt-0.5 font-semibold">{route.portfolioProof}</dd>
                    </div>
                  )}
                </dl>
              </a>
            ))}
          </div>
          <p className="text-muted-foreground mt-6 text-xs leading-relaxed">
            Time estimates cover lesson time only; portfolio practice takes longer. Routes are the
            source's own career paths — full rubrics in the repository linked on each card.
          </p>
        </div>
      </section>

      {/* ── How CEA learners should use it ─────────────────────────────── */}
      <section className="bg-aurora-soft bg-[#070d1d] py-16 text-[#eef2fb] md:py-24">
        <div className="container-page relative">
          <Eyebrow className="border-white/15 bg-white/5 text-[#a8c8f7]">
            <ShieldCheck className="size-3.5" aria-hidden="true" /> The CEA method
          </Eyebrow>
          <h2 className="font-display mt-4 max-w-2xl text-4xl leading-[1.0] font-semibold tracking-[-0.04em] text-balance sm:text-5xl">
            How to actually finish it.
          </h2>
          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              [
                "01",
                "Finish the CEA foundation first",
                "Typing, Office, files and safe browsing. AI multiplies a foundation; it doesn't replace one.",
              ],
              [
                "02",
                "Pick ONE entry route",
                "Foundations, LLM systems, or agents. Whichever sounds most like the work you want — never all three at once.",
              ],
              [
                "03",
                "Two sessions a week, like class",
                "Treat 30–45 minute lesson blocks like our timetable: same days, phone in another room, one lesson per session.",
              ],
              [
                "04",
                "Ship one artefact",
                "Prompt library, RAG bot for your notes, an agent that does one real task. Bring it to the centre — we'll review it with you.",
              ],
            ].map(([index, title, body]) => (
              <li
                key={index}
                className="border-white/10 bg-white/[0.04] rounded-xl border p-5 backdrop-blur-sm"
              >
                <p className="font-mono text-[10px] tracking-[0.24em] text-[#5b9dff]">{index}</p>
                <h3 className="mt-3 text-base leading-snug font-semibold text-white">{title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-[#a9bcd6]">{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Licence & attribution ──────────────────────────────────────── */}
      <section className="border-border border-t py-12" aria-labelledby="ai-license">
        <div className="container-page">
          <div className="border-foreground/10 bg-muted/35 rounded-xl border p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-3">
              <Github className="text-primary size-5" aria-hidden="true" />
              <h2 id="ai-license" className="font-display text-lg font-semibold">
                Credit where it's due
              </h2>
            </div>
            <p className="text-muted-foreground mt-3 max-w-3xl text-sm leading-relaxed">
              AI Engineering from Scratch is the work of{" "}
              <a
                href={AI_SOURCE.site}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-semibold hover:underline"
              >
                Rohit Ghumare
              </a>
              , released under the{" "}
              <a
                href={`${AI_SOURCE.repo}/blob/main/LICENSE`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-semibold hover:underline"
              >
                MIT License
              </a>{" "}
              — Copyright (c) 2026 Rohit Ghumare. Every lesson is reproduced here in full — text,
              code, exercises and quizzes — with attribution and canonical links to the source. The
              gradient descent lab on this page is our own implementation inspired by it.
              Corrections and improvements to the source are welcome at{" "}
              <a
                href={AI_SOURCE.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-semibold hover:underline"
              >
                github.com/rohitg00/ai-engineering-from-scratch
              </a>
              . Questions about CEA's use of it:{" "}
              <a href="mailto:help@cea.ng" className="text-primary font-semibold hover:underline">
                help@cea.ng
              </a>
              . This is one of{" "}
              <Link to="/open-curriculum" className="text-primary font-semibold hover:underline">
                57 licence-verified open courses
              </Link>{" "}
              in the CEA open curriculum — every source, licence and delivery plan in the open.
            </p>
          </div>
        </div>
      </section>

      <CTASection
        title="Start with a keyboard. Graduate into AI."
        description="CEA courses build the foundation — typing, Office, design, web. This curriculum extends it for free. Come learn in person, then keep going."
        primary={{ label: "Explore CEA courses", to: "/classes" }}
        secondary={{ label: "Apply for admission", to: "/apply" }}
      />
    </PageShell>
  );
}
