import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, ArrowUpRight, Search, SlidersHorizontal, Star, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CTASection, PageHero, PageShell, SectionHeading } from "@/components/marketing/shell";
import { ProgramArt } from "@/components/art/program-art";
import { EASE, Reveal, StaggerGroup, StaggerItem, TiltCard } from "@/components/motion";
import { engines, formatNaira, programs } from "@/data/site";
import { cn } from "@/lib/utils";
import { getPageHead } from "@/lib/seo";

export const Route = createFileRoute("/programs/")({
  head: () =>
    getPageHead({
      title: "Programs & Courses — Cyber Elias Academy",
      description:
        "Browse cohort programs in software development, cybersecurity, cloud, data & AI, design, marketing, networking and mobile — from scratch to advanced.",
      path: "/programs",
      image: "https://cea.ng/og-programs.png",
    }),
  component: Programs,
});

const categories = ["All", ...Array.from(new Set(programs.map((p) => p.category)))];
const levels = ["All", "Beginner", "Intermediate", "Advanced"] as const;

function Programs() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [level, setLevel] = useState<(typeof levels)[number]>("All");

  const filtered = useMemo(() => {
    return programs.filter((p) => {
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.blurb.toLowerCase().includes(q) ||
        p.tools.some((t) => t.toLowerCase().includes(q));
      const matchesCategory = category === "All" || p.category === category;
      const matchesLevel = level === "All" || p.level === level;
      return matchesQuery && matchesCategory && matchesLevel;
    });
  }, [query, category, level]);

  return (
    <PageShell>
      <PageHero
        eyebrow="Programs"
        cue
        title={
          <>
            From scratch to <span className="text-gradient">advanced</span>
          </>
        }
        description="Cohort programs across the academy's five engines. Every track is project-heavy, capped by a practitioner-graded capstone and backed by the employer network."
      >
        <div className="mt-10 flex max-w-2xl flex-col gap-4 sm:flex-row">
          <div className="group relative flex-1">
            <Search className="text-muted-foreground group-focus-within:text-primary absolute top-1/2 left-4 size-4 -translate-y-1/2 transition-colors" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title, skill or tool…"
              className="bg-card h-12 border pl-11 shadow-sm transition-shadow duration-300 focus-visible:shadow-glow"
            />
          </div>
          <Button asChild variant="outline" className="h-12">
            <Link to="/programs/compare">
              <SlidersHorizontal className="size-4" /> Compare programs
            </Link>
          </Button>
        </div>
      </PageHero>

      {/* Control deck — the filter rail stays within reach while the catalog
          scrolls beneath it. The active category travels as one physical pill
          (layoutId), so changing filters reads as a thing moving, not a repaint. */}
      <section className="glass sticky top-[4.25rem] z-20 border-b">
        <div className="container-page flex flex-wrap items-center gap-2 py-4">
          <div
            className="flex flex-wrap items-center gap-1.5"
            role="group"
            aria-label="Filter by category"
          >
            {categories.map((c) => {
              const active = category === c;
              return (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  aria-pressed={active}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200",
                    active ? "text-white" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="programs-category-pill"
                      className="bg-gradient-brand shadow-glow absolute inset-0 rounded-full"
                      transition={{ duration: 0.4, ease: EASE }}
                    />
                  )}
                  <span className="relative z-[1]">{c}</span>
                </button>
              );
            })}
          </div>
          <span aria-hidden="true" className="mx-2 hidden h-6 w-px bg-border sm:block" />
          <div
            className="flex flex-wrap items-center gap-1.5"
            role="group"
            aria-label="Filter by level"
          >
            {levels.map((l) => {
              const active = level === l;
              return (
                <button
                  key={l}
                  onClick={() => setLevel(l)}
                  aria-pressed={active}
                  className={cn(
                    "rounded-full border px-3.5 py-1.5 text-[13px] font-semibold transition-all duration-200",
                    active
                      ? "border-primary bg-primary/10 text-primary"
                      : "bg-card text-muted-foreground hover:text-foreground",
                  )}
                >
                  {l}
                </button>
              );
            })}
          </div>
          <span
            aria-live="polite"
            className="text-muted-foreground ml-auto text-sm font-semibold tabular-nums"
          >
            {filtered.length} {filtered.length === 1 ? "program" : "programs"}
          </span>
        </div>
      </section>

      <section className="container-page py-16 md:py-20">
        {filtered.length === 0 ? (
          <div className="bg-card shadow-soft rounded-3xl border p-16 text-center">
            <p className="font-display text-xl font-bold">No programs match those filters</p>
            <p className="text-muted-foreground mt-2 text-sm">
              Try clearing the search or picking a different category.
            </p>
            <Button
              className="bg-gradient-brand mt-6 border-0"
              onClick={() => {
                setQuery("");
                setCategory("All");
                setLevel("All");
              }}
            >
              Reset filters
            </Button>
          </div>
        ) : (
          <StaggerGroup className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => {
              const engine = engines.find((e) => e.key === p.engine);
              return (
                <StaggerItem key={p.slug} className="h-full">
                  <TiltCard intensity={5} className="h-full">
                    <Link
                      to="/programs/$slug"
                      params={{ slug: p.slug }}
                      className="group bg-card shadow-soft hover:shadow-elevated relative flex h-full flex-col overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1 focus-visible:translate-y-0"
                    >
                      <div
                        className={`${engine?.gradient ?? "bg-gradient-brand"} absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100`}
                      />
                      {/* Engine wash — the card catches its engine's color on hover.
                          Depth feedback tied to wayfinding, not decoration. */}
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        style={{
                          background: `radial-gradient(420px circle at 50% -10%, color-mix(in oklab, var(--${p.engine}) 14%, transparent), transparent 70%)`,
                        }}
                      />
                      <div className="relative flex flex-1 flex-col p-6">
                        <div className="relative mb-5 h-36 overflow-hidden rounded-2xl">
                          <ProgramArt slug={p.slug} interactive />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="font-semibold">
                              {p.category}
                            </Badge>
                            {engine && (
                              <span
                                className={`${engine.text} text-xs font-bold tracking-wide uppercase`}
                              >
                                {engine.name.split(" ")[0]}
                              </span>
                            )}
                            {p.rating > 0 && (
                              <span className="text-muted-foreground flex items-center gap-1 text-xs font-semibold">
                                <Star className="fill-career text-career size-3.5" /> {p.rating}
                              </span>
                            )}
                          </div>
                        </div>
                        <h3 className="font-display group-hover:text-primary mt-4 text-lg leading-snug font-bold transition-colors">
                          {p.title}
                        </h3>
                        <p className="text-muted-foreground mt-2.5 line-clamp-2 text-sm leading-relaxed">
                          {p.blurb}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {p.tools.slice(0, 4).map((t) => (
                            <span
                              key={t}
                              className="bg-muted/70 text-muted-foreground rounded-md px-2 py-1 text-[11px] font-medium"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                        <div className="text-muted-foreground mt-5 flex flex-wrap gap-x-4 gap-y-1 text-xs font-medium">
                          <span>{p.duration}</span>
                          <span>·</span>
                          <span>{p.level}</span>
                          <span>·</span>
                          <span>{p.mode}</span>
                        </div>
                        <div className="mt-3 flex items-center gap-2">
                          <Badge variant="outline" className="flex items-center gap-1 text-xs">
                            <BookOpen className="size-3" /> 5 modules
                          </Badge>
                        </div>
                        <div className="mt-5 flex items-center justify-between border-t pt-4">
                          <span className="font-display font-bold">{formatNaira(p.price)}</span>
                          <span className="flex items-center gap-3">
                            {p.learners > 0 && (
                              <span className="text-muted-foreground text-xs font-medium">
                                {p.learners.toLocaleString()} learners
                              </span>
                            )}
                            <span
                              aria-hidden="true"
                              className="bg-primary/10 text-primary grid size-8 place-items-center rounded-full transition-all duration-300 group-hover:bg-gradient-brand group-hover:text-white"
                            >
                              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
                            </span>
                          </span>
                        </div>
                      </div>
                    </Link>
                  </TiltCard>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        )}
      </section>

      <section className="border-t">
        <div className="container-page py-20">
          <SectionHeading
            eyebrow="Not sure where to start?"
            title="Take the 5-minute fit quiz"
            description="Tell us your goal — build apps, defend networks, ship design, run campaigns or wrangle data — and we'll recommend a track with a roadmap."
            aside={
              <Button
                asChild
                size="lg"
                className="bg-gradient-brand shadow-glow h-12 border-0 px-8 transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0 motion-reduce:transition-none"
              >
                <Link to="/admissions">
                  Talk to admissions <ArrowRight className="ml-1.5 size-4" />
                </Link>
              </Button>
            }
          />
        </div>
      </section>

      <CTASection />
    </PageShell>
  );
}
