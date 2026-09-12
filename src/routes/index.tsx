import { useCallback, useState, type ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowRight, ArrowUpRight, Check, Plus, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  CTASection,
  CornerMarks,
  Eyebrow,
  PageShell,
  StatBand,
} from "@/components/marketing/shell";
import {
  Arrival,
  BigMarquee,
  DragRail,
  EASE,
  LightField,
  LineMaskReveal,
  LiveClock,
  Magnetic,
  Reveal,
  Scramble,
  ScrollCue,
  SplitReveal,
  StickyShowcase,
  type ShowcaseStep,
} from "@/components/motion";
import { engines, faqs, formatNaira, partnersList, programs } from "@/data/site";
import { ProgramArt } from "@/components/art/program-art";
import { SceneArt, type ArtVariant } from "@/components/art/scene-art";
import { getPageHead } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    };
    return getPageHead({
      title: "Cyber Elias Academy — Learn Tech. Build Work. Get Hired.",
      description:
        "Nigeria's digital skills academy: software, cloud, cybersecurity, data, AI, design and marketing programs with mentorship, portfolios and employer placement.",
      path: "/",
      structuredData: faqSchema,
    });
  },
  component: Home,
});

/* ------------------------------------------------------------------ *
 * Hero — the arrival. Type-led, lit from within, framed by registration
 * rails. Everything below is earned by scrolling.
 * ------------------------------------------------------------------ */

const HERO_CONTAINER = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const HERO_ITEM = {
  hidden: { opacity: 0, y: 26, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.85, ease: EASE } },
};

function Hero({ ready }: { ready: boolean }) {
  const reduce = useReducedMotion();
  const stage = ready ? "show" : "hidden";

  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden pt-32 pb-10 md:pt-36">
      <LightField density={6} opacity={0.9} />
      <div className="rule-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(80%_70%_at_50%_35%,black,transparent)]" />

      {/* Vertical registration rails */}
      <div
        aria-hidden="true"
        className="text-muted-foreground/60 pointer-events-none absolute top-1/2 left-6 hidden -translate-y-1/2 xl:block"
      >
        <span className="font-label block -rotate-90 text-[9px] whitespace-nowrap">
          CEA · LUMINA — EST. 2024
        </span>
      </div>
      <div
        aria-hidden="true"
        className="text-muted-foreground/60 pointer-events-none absolute top-1/2 right-6 hidden -translate-y-1/2 xl:block"
      >
        <span className="font-label block rotate-90 text-[9px] whitespace-nowrap">
          04°48′N&nbsp;&nbsp;07°00′E
        </span>
      </div>

      <motion.div
        variants={HERO_CONTAINER}
        initial="hidden"
        animate={stage}
        className="container-page relative flex flex-1 flex-col"
      >
        {/* Meta strip */}
        <motion.div
          variants={HERO_ITEM}
          className="text-muted-foreground flex flex-wrap items-center justify-between gap-4"
        >
          <span className="font-label flex items-center gap-2.5 text-[10px]">
            <span className="relative flex size-1.5">
              <span className="bg-success absolute inline-flex size-full rounded-full" />
              {!reduce && (
                <span className="bg-success absolute inline-flex size-full animate-ping rounded-full opacity-60" />
              )}
            </span>
            Applications open · Cohort 01
          </span>
          <span className="font-label flex items-center gap-3 text-[10px]">
            <LiveClock />
            <span className="text-foreground/20">|</span>
            <span>Port Harcourt, NG</span>
          </span>
        </motion.div>

        {/* The statement */}
        <HeroStatement>
          <h1 className="text-[clamp(3rem,1rem+9.5vw,9rem)] leading-[0.86] font-semibold tracking-[-0.05em]">
            <SplitReveal
              as="span"
              start={ready}
              delay={0.25}
              stagger={0.13}
              lines={[
                <>Learn tech.</>,
                <>
                  <span className="font-serif-accent text-gradient font-normal">
                    Build real work.
                  </span>
                </>,
                <>Get hired.</>,
              ]}
            />
          </h1>

          <div className="mt-12 grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-end">
            <motion.p
              variants={HERO_ITEM}
              className="text-muted-foreground text-body-lg max-w-xl text-pretty"
            >
              From absolute scratch to advanced practitioner — software, cloud, cybersecurity, data
              and AI, design and digital marketing. Taught by people who ship, backed by an employer
              network we are building from day one.
            </motion.p>
            <motion.div
              variants={HERO_ITEM}
              className="flex flex-wrap items-center gap-3 md:justify-end"
            >
              <Magnetic strength={14}>
                <Button
                  asChild
                  size="lg"
                  className="bg-foreground text-background hover:bg-primary hover:text-primary-foreground h-14 rounded-full border-0 px-8 text-base font-semibold transition-colors duration-300"
                >
                  <Link to="/admissions">
                    Start your application <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
              </Magnetic>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-foreground/20 hover:border-foreground/50 hover:bg-foreground/5 h-14 rounded-full px-7 text-base font-medium transition-colors"
              >
                <Link to="/programs">Explore programs</Link>
              </Button>
            </motion.div>
          </div>
        </HeroStatement>

        {/* Foot strip */}
        <motion.div
          variants={HERO_ITEM}
          className="border-foreground/10 flex flex-wrap items-end justify-between gap-6 border-t pt-6"
        >
          <ul className="text-muted-foreground flex flex-wrap items-center gap-x-8 gap-y-3">
            {["Cohort 01 · Port Harcourt", "Placement promise included", "Portfolio-first"].map(
              (item) => (
                <li key={item} className="font-label flex items-center gap-2.5 text-[10px]">
                  <Check className="text-primary size-3.5" />
                  {item}
                </li>
              ),
            )}
          </ul>
          <div className="hidden md:block">
            <ScrollCue label="Scroll to explore" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/**
 * The headline drifts up and dims as you leave it, so the hero reads as a
 * place you departed from rather than a block you scrolled past.
 */
function HeroStatement({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, -90]);
  const opacity = useTransform(scrollY, [0, 680], [1, 0]);
  return (
    <motion.div
      style={reduce ? undefined : { y, opacity }}
      className="flex flex-1 flex-col justify-center py-10 md:py-14"
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ *
 * 01 — The operating system. Pinned storytelling across the five engines.
 * ------------------------------------------------------------------ */

const ENGINE_ART: Record<string, ArtVariant> = {
  learning: "code",
  career: "market",
  services: "design",
  erp: "data",
  community: "community",
};

const ENGINE_ACCENT: Record<string, string> = {
  learning: "var(--learning)",
  career: "var(--career)",
  services: "var(--services)",
  erp: "var(--erp)",
  community: "var(--community)",
};

function EnginePanel({ engineKey }: { engineKey: string }) {
  const engine = engines.find((e) => e.key === engineKey);
  if (!engine) return null;
  const accent = ENGINE_ACCENT[engineKey] ?? "var(--primary)";
  return (
    <div className="relative flex h-full flex-col justify-between p-7">
      <SceneArt variant={ENGINE_ART[engineKey] ?? "code"} className="absolute inset-0 opacity-45" />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, color-mix(in oklab, ${accent} 22%, transparent), var(--background) 78%)`,
        }}
      />
      <div className="relative">
        <span className="font-label text-[10px]" style={{ color: accent }}>
          {engine.tagline}
        </span>
        <p className="font-display mt-3 text-3xl leading-none font-semibold">{engine.name}</p>
      </div>
      <ul className="relative mt-8 flex flex-wrap gap-2">
        {engine.bullets.map((b) => (
          <li
            key={b}
            className="border-foreground/12 bg-background/50 rounded-full border px-3 py-1.5 text-xs backdrop-blur-sm"
          >
            {b}
          </li>
        ))}
      </ul>
      <CornerMarks className="inset-5" />
    </div>
  );
}

function EnginesSection() {
  const steps: ShowcaseStep[] = engines.map((engine, i) => ({
    index: String(i + 1).padStart(2, "0"),
    kicker: engine.tagline,
    title: engine.name.replace(" Engine", ""),
    body: engine.description,
    points: engine.bullets,
    accent: ENGINE_ACCENT[engine.key],
    media: <EnginePanel engineKey={engine.key} />,
  }));

  return (
    <section className="relative border-t border-foreground/10 py-20 md:py-28">
      <div className="container-page">
        <StickyShowcase
          steps={steps}
          heading={
            <div>
              <Eyebrow scramble>The operating system</Eyebrow>
              <h2 className="text-h2 font-display mt-6 font-semibold text-balance">
                Five engines.
                <br />
                <span className="font-serif-accent text-gradient font-normal">One academy.</span>
              </h2>
              <p className="text-muted-foreground text-body-lg mt-6 max-w-md text-pretty">
                Everything from your first lesson to your first client invoice runs on one connected
                platform — so nothing about your progress gets lost between systems.
              </p>
              <Button
                asChild
                variant="outline"
                className="border-foreground/20 hover:border-foreground/50 hover:bg-foreground/5 mt-8 rounded-full px-6 transition-colors"
              >
                <Link to="/engines">
                  Explore the engines <ArrowUpRight className="ml-2 size-4" />
                </Link>
              </Button>
            </div>
          }
        />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * 02 — Programs. A rail you grab and pull.
 * ------------------------------------------------------------------ */

function ProgramsSection() {
  return (
    <section className="border-foreground/10 relative border-y py-20 md:py-28">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-2xl">
            <Reveal>
              <div className="flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="font-display text-outline text-[2.75rem] leading-none font-light tabular-nums"
                >
                  02
                </span>
                <Eyebrow scramble>Programs</Eyebrow>
              </div>
            </Reveal>
            <h2 className="text-h2 font-display mt-6 font-semibold text-balance">
              <LineMaskReveal text="Pick the track that changes your next five years" />
            </h2>
          </div>
          <Reveal delay={0.1}>
            <Button
              asChild
              variant="outline"
              className="border-foreground/20 hover:border-foreground/50 hover:bg-foreground/5 rounded-full px-6 transition-colors"
            >
              <Link to="/programs">
                All programs <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </Reveal>
        </div>

        <DragRail className="mt-16" ariaLabel="Featured programs">
          {programs.slice(0, 6).map((p, i) => (
            <Link
              key={p.slug}
              to="/programs/$slug"
              params={{ slug: p.slug }}
              className="group border-foreground/12 hover:border-primary/40 relative flex w-[86vw] shrink-0 snap-start flex-col overflow-hidden rounded-[3px] border transition-colors duration-500 sm:w-[46vw] lg:w-[30vw] xl:w-[24vw]"
            >
              <div className="mask-fade-b relative h-52 overflow-hidden">
                <ProgramArt slug={p.slug} interactive />
                <span
                  aria-hidden="true"
                  className="font-display text-muted-foreground/35 absolute top-4 left-5 text-5xl leading-none font-light tabular-nums"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center justify-between gap-3">
                  <Badge
                    variant="outline"
                    className="border-foreground/15 text-muted-foreground font-label rounded-full px-3 py-1 text-[9px] font-normal"
                  >
                    {p.category}
                  </Badge>
                  <span className="font-label text-muted-foreground text-[9px]">{p.duration}</span>
                </div>
                <h3 className="font-display group-hover:text-primary mt-5 text-2xl leading-tight font-semibold transition-colors">
                  {p.title}
                </h3>
                <p className="text-muted-foreground mt-3 line-clamp-3 text-sm leading-relaxed">
                  {p.blurb}
                </p>
                <div className="text-muted-foreground mt-6 flex items-center justify-between border-t border-foreground/10 pt-5">
                  <span className="font-display text-lg font-semibold">{formatNaira(p.price)}</span>
                  <span className="text-primary flex items-center gap-1.5 text-sm font-semibold">
                    View
                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </div>
              <span
                aria-hidden="true"
                className="bg-gradient-brand absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
              />
            </Link>
          ))}
        </DragRail>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * 03 — The principle. One idea, set large enough that you cannot skim it.
 * ------------------------------------------------------------------ */

function PrincipleSection() {
  return (
    <section className="relative overflow-hidden py-24 md:py-36">
      <LightField density={3} opacity={0.4} pointer={false} />
      <div className="container-page relative">
        <div className="grid gap-14 lg:grid-cols-[0.35fr_0.65fr]">
          <Reveal>
            <div className="lg:sticky lg:top-32">
              <Eyebrow scramble>The principle</Eyebrow>
              <div className="text-muted-foreground/50 mt-8">
                <Quote className="size-10" />
              </div>
            </div>
          </Reveal>
          <div>
            <Reveal delay={0.1}>
              <p className="font-display text-[clamp(1.9rem,1.1rem+3.2vw,4rem)] leading-[1.06] font-medium tracking-[-0.03em] text-balance">
                We don't fake outcomes. We build the machine that produces them —{" "}
                <span className="font-serif-accent text-gradient font-normal">
                  then we show the receipts.
                </span>
              </p>
            </Reveal>
            <div className="border-foreground/10 mt-16 grid gap-px border-t sm:grid-cols-3">
              {[
                {
                  n: "01",
                  t: "Cohorts, not courses",
                  d: "Small groups, fixed start dates, mentors who know your name and your blockers.",
                },
                {
                  n: "02",
                  t: "Shipped, not watched",
                  d: "Every module ends in something deployed — a real artefact a client could use.",
                },
                {
                  n: "03",
                  t: "Hired, not hopeful",
                  d: "Portfolio review, mock interviews and warm introductions through the Career Engine.",
                },
              ].map((item, i) => (
                <Reveal
                  key={item.n}
                  delay={0.15 + i * 0.08}
                  className="group border-foreground/10 pt-8 pr-6 sm:border-l sm:pl-6 sm:first:border-l-0 sm:first:pl-0"
                >
                  <span className="font-label text-primary text-[10px]">{item.n}</span>
                  <h3 className="font-display mt-4 text-xl leading-tight font-semibold">
                    {item.t}
                  </h3>
                  <p className="text-muted-foreground mt-3 text-sm leading-relaxed">{item.d}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * 04 — Free resources, as an editorial index.
 * ------------------------------------------------------------------ */

const RESOURCES = [
  {
    label: "Glossary",
    count: "62 terms",
    description: "Technical terms explained with Nigerian context, linked through every page.",
    to: "/glossary",
    art: "code" as ArtVariant,
  },
  {
    label: "Career Guides",
    count: "19 roadmaps",
    description: "Salary ranges, 90-day plans and the pitfalls nobody warns you about.",
    to: "/career-guides",
    art: "market" as ArtVariant,
  },
  {
    label: "Resources",
    count: "12 templates",
    description: "Ungated checklists, templates and cheat sheets. No sign-up wall.",
    to: "/resources",
    art: "design" as ArtVariant,
  },
  {
    label: "Library",
    count: "1,958 items",
    description: "Books, courses and tools curated for Nigerian learners and budgets.",
    to: "/library",
    art: "data" as ArtVariant,
  },
];

function ResourcesSection() {
  return (
    <section className="border-foreground/10 relative border-y py-20 md:py-28">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-2xl">
            <Reveal>
              <div className="flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="font-display text-outline text-[2.75rem] leading-none font-light tabular-nums"
                >
                  04
                </span>
                <Eyebrow scramble>Free resources</Eyebrow>
              </div>
            </Reveal>
            <h2 className="text-h2 font-display mt-6 font-semibold text-balance">
              <LineMaskReveal text="Learn beyond the classroom" />
            </h2>
          </div>
          <Reveal delay={0.1}>
            <p className="text-muted-foreground max-w-sm text-sm leading-relaxed">
              Everything here is free and ungated — because the fastest way to judge an academy is
              to use what it makes.
            </p>
          </Reveal>
        </div>

        <ul className="border-foreground/10 mt-16 border-t">
          {RESOURCES.map((item, i) => (
            <Reveal key={item.to} delay={i * 0.06}>
              <li className="border-foreground/10 border-b">
                <Link
                  to={item.to}
                  className="group relative grid items-center gap-4 py-7 md:grid-cols-[auto_1.1fr_1.6fr_auto] md:gap-8"
                >
                  <span
                    aria-hidden="true"
                    className="bg-gradient-brand pointer-events-none absolute inset-0 -z-10 origin-bottom scale-y-0 opacity-[0.06] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100 motion-reduce:transition-none"
                  />
                  <span className="font-label text-muted-foreground w-10 text-[10px] tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display flex items-baseline gap-4 text-3xl leading-none font-semibold transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-2 md:text-[2.6rem] motion-reduce:transition-none">
                    {item.label}
                    <span className="font-label text-primary text-[10px] font-normal">
                      {item.count}
                    </span>
                  </span>
                  <span className="text-muted-foreground text-sm leading-relaxed">
                    {item.description}
                  </span>
                  <span className="flex items-center gap-4 md:justify-end">
                    <span className="border-foreground/12 hidden size-16 shrink-0 overflow-hidden rounded-full border lg:block">
                      <SceneArt
                        variant={item.art}
                        className="transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                      />
                    </span>
                    <ArrowUpRight className="text-primary size-5 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </span>
                </Link>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * 05 — Questions, answered properly.
 * ------------------------------------------------------------------ */

function FaqSection() {
  return (
    <section className="border-foreground/10 border-b">
      <div className="container-page grid gap-14 py-20 md:py-28 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <div className="flex items-center gap-4">
              <span
                aria-hidden="true"
                className="font-display text-outline text-[2.75rem] leading-none font-light tabular-nums"
              >
                05
              </span>
              <Eyebrow scramble>Questions</Eyebrow>
            </div>
          </Reveal>
          <h2 className="text-h2 font-display mt-6 font-semibold text-balance">
            <LineMaskReveal text="Everything you were about to ask" />
          </h2>
          <Reveal delay={0.1}>
            <p className="text-muted-foreground mt-6 max-w-sm text-body-lg text-pretty">
              Still unsure? Our admissions team answers within one working day.
            </p>
            <Button
              asChild
              variant="outline"
              className="border-foreground/20 hover:border-foreground/50 hover:bg-foreground/5 mt-8 rounded-full px-6 transition-colors"
            >
              <Link to="/contact">
                Talk to admissions <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`item-${i}`} className="border-foreground/10">
                <AccordionTrigger className="font-display hover:text-primary text-left text-lg font-semibold">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-body-lg leading-relaxed">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}

function PartnersBand() {
  return (
    <section className="border-foreground/10 relative overflow-hidden border-b py-8">
      <div className="container-page">
        <p className="font-label text-muted-foreground mb-6 text-center text-[10px]">
          <Scramble text="We're building relationships with" />
        </p>
      </div>
      <BigMarquee
        items={partnersList}
        duration={44}
        glyph="·"
        itemClassName="text-xl md:text-2xl"
        glyphClassName="text-lg"
      />
    </section>
  );
}

function Home() {
  const [ready, setReady] = useState(false);
  return (
    <PageShell>
      <Arrival onDone={useCallback(() => setReady(true), [])} />
      <Hero ready={ready} />
      <PartnersBand />
      <EnginesSection />
      <StatBand />
      <ProgramsSection />
      <PrincipleSection />
      <ResourcesSection />
      <FaqSection />
      <CTASection />
      <PlusMarker />
    </PageShell>
  );
}

/** A quiet mark at the very end of the page — the house signature. */
function PlusMarker() {
  return (
    <div aria-hidden="true" className="flex justify-center py-10">
      <Plus className="text-foreground/20 size-4" />
    </div>
  );
}
