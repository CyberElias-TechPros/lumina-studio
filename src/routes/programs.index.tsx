import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Search, SlidersHorizontal, Star, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CTASection, PageHero, PageShell, SectionHeading } from "@/components/marketing/shell";
import { ProgramArt } from "@/components/art/program-art";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion";
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
      image: "https://cea.ng/og-programs.svg",
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
        title={
          <>
            From scratch to <span className="text-gradient">advanced</span>
          </>
        }
        description="Cohort programs across the academy's five engines. Every track is project-heavy, capped by a practitioner-graded capstone and backed by the employer network."
      >
        <div className="mt-10 flex max-w-2xl flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="text-muted-foreground absolute top-1/2 left-4 size-4 -translate-y-1/2" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title, skill or tool…"
              className="bg-card h-12 border pl-11 shadow-sm"
            />
          </div>
          <Button asChild variant="outline" className="h-12">
            <Link to="/programs/compare">
              <SlidersHorizontal className="size-4" /> Compare programs
            </Link>
          </Button>
        </div>
      </PageHero>

      <section className="border-b">
        <div className="container-page flex flex-wrap items-center gap-2 py-6">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                category === c
                  ? "bg-gradient-brand border-transparent text-white shadow"
                  : "bg-card text-muted-foreground hover:text-foreground",
              )}
            >
              {c}
            </button>
          ))}
          <span className="mx-2 hidden h-6 w-px bg-border sm:block" />
          {levels.map((l) => (
            <button
              key={l}
              onClick={() => setLevel(l)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                level === l
                  ? "border-primary text-primary bg-primary/10"
                  : "bg-card text-muted-foreground hover:text-foreground",
              )}
            >
              {l}
            </button>
          ))}
          <span className="text-muted-foreground ml-auto text-sm font-medium">
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
                <StaggerItem key={p.slug}>
                  <Link
                    to="/programs/$slug"
                    params={{ slug: p.slug }}
                    className="group bg-card shadow-soft hover:shadow-elevated relative flex h-full flex-col overflow-hidden rounded-2xl border transition-all hover:-translate-y-1"
                  >
                    <div
                      className={`${engine?.gradient ?? "bg-gradient-brand"} absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100`}
                    />
                    <div className="flex flex-1 flex-col p-6">
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
{/* Module count badge */}
                       <div className="mt-3 flex items-center gap-2">
                         <Badge variant="outline" className="flex items-center gap-1 text-xs">
                           <BookOpen className="size-3" /> 5 modules
                         </Badge>
                       </div>
                       <div className="mt-5 flex items-center justify-between border-t pt-4">
                         <span className="font-display font-bold">{formatNaira(p.price)}</span>
                        {p.learners > 0 && (
                          <span className="text-muted-foreground text-xs font-medium">
                            {p.learners.toLocaleString()} learners
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        )}
      </section>

      <section className="border-t">
        <div className="container-page py-20">
          <SectionHeading
            align="center"
            eyebrow="Not sure where to start?"
            title="Take the 5-minute fit quiz"
            description="Tell us your goal — build apps, defend networks, ship design, run campaigns or wrangle data — and we'll recommend a track with a roadmap."
          />
          <Reveal delay={0.1} className="mt-8 text-center">
            <Button asChild size="lg" className="bg-gradient-brand shadow-glow h-12 border-0 px-8">
              <Link to="/admissions">
                Talk to admissions <ArrowUpRight className="ml-1.5 size-4" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </PageShell>
  );
}
