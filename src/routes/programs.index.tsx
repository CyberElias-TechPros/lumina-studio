import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Search, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CTASection, PageHero, PageShell } from "@/components/marketing/shell";
import { StaggerGroup, StaggerItem } from "@/components/motion";
import { formatNaira, programs } from "@/data/site";

export const Route = createFileRoute("/programs/")({
  head: () => ({
    meta: [
      { title: "Programs — Cyber Elias Academy" },
      {
        name: "description",
        content:
          "Cohort programs in software development, cybersecurity, cloud, data & AI, design, marketing, networking and mobile development.",
      },
      { property: "og:title", content: "Programs — Cyber Elias Academy" },
      {
        property: "og:description",
        content: "Eight career-grade tracks, from absolute beginner to advanced practitioner.",
      },
    ],
  }),
  component: ProgramsPage,
});

const categories = ["All", ...Array.from(new Set(programs.map((p) => p.category)))];
const levels = ["All levels", "Beginner", "Intermediate", "Advanced"];

function ProgramsPage() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("All");
  const [level, setLevel] = useState("All levels");

  const filtered = useMemo(
    () =>
      programs.filter(
        (p) =>
          (cat === "All" || p.category === cat) &&
          (level === "All levels" || p.level === level) &&
          (p.title + p.blurb + p.category).toLowerCase().includes(query.toLowerCase()),
      ),
    [query, cat, level],
  );

  return (
    <PageShell>
      <PageHero
        eyebrow="Programs"
        title="Career-grade training, built around what employers actually screen for"
        description="Every track is cohort-based, taught by practitioners, and ends with a capstone you can put in front of a hiring manager."
      />

      <section className="container-page py-14">
        <div className="glass sticky top-20 z-30 flex flex-wrap items-center gap-3 rounded-2xl border p-3">
          <div className="relative min-w-[220px] flex-1">
            <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search programs"
              className="pl-9"
            />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                  cat === c
                    ? "bg-gradient-brand text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="flex gap-1.5">
            {levels.map((l) => (
              <button
                key={l}
                onClick={() => setLevel(l)}
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                  level === l ? "border-primary text-primary" : "text-muted-foreground"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        <StaggerGroup key={`${cat}-${level}-${query}`} className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <StaggerItem key={p.slug}>
              <Link
                to="/programs/$slug"
                params={{ slug: p.slug }}
                className="group bg-card shadow-soft hover:shadow-elevated flex h-full flex-col rounded-2xl border p-6 transition-all hover:-translate-y-1"
              >
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">{p.category}</Badge>
                  <span className="text-muted-foreground flex items-center gap-1 text-xs font-semibold">
                    <Star className="fill-career text-career size-3.5" /> {p.rating}
                  </span>
                </div>
                <h3 className="font-display group-hover:text-primary mt-4 text-lg font-bold transition-colors">
                  {p.title}
                </h3>
                <p className="text-muted-foreground mt-2.5 flex-1 text-sm leading-relaxed">
                  {p.blurb}
                </p>
                <div className="text-muted-foreground mt-5 flex flex-wrap gap-x-3 gap-y-1 text-xs font-medium">
                  <span>{p.duration}</span>
                  <span>·</span>
                  <span>{p.level}</span>
                  <span>·</span>
                  <span>{p.mode}</span>
                </div>
                <div className="mt-5 flex items-center justify-between border-t pt-4">
                  <span className="font-display font-bold">{formatNaira(p.price)}</span>
                  <ArrowUpRight className="text-primary size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>

        {filtered.length === 0 && (
          <div className="py-24 text-center">
            <p className="font-display text-xl font-bold">No programs match that filter</p>
            <p className="text-muted-foreground mt-2 text-sm">Try a different category or level.</p>
            <Button
              className="mt-6"
              variant="outline"
              onClick={() => {
                setQuery("");
                setCat("All");
                setLevel("All levels");
              }}
            >
              Reset filters
            </Button>
          </div>
        )}
      </section>

      <CTASection />
    </PageShell>
  );
}
