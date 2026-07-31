import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Building2, TrendingDown, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CTASection, PageHero, PageShell, SectionHeading } from "@/components/marketing/shell";
import { Reveal, StaggerGroup, StaggerItem, TiltCard } from "@/components/motion";
import { caseStudies } from "@/data/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Client Work & Case Studies — Cyber Elias Academy" },
      {
        name: "description",
        content:
          "Selected work from the Services Engine: logistics platforms, security overhauls, multi-campus ERPs and public-sector talent pipelines.",
      },
    ],
  }),
  component: Work,
});

const sectors = ["All", ...Array.from(new Set(caseStudies.map((c) => c.sector)))];

function Work() {
  const [sector, setSector] = useState("All");
  const [featured, setFeatured] = useState(caseStudies[0]);
  const filtered = sector === "All" ? caseStudies : caseStudies.filter((c) => c.sector === sector);

  return (
    <PageShell>
      <PageHero
        eyebrow="Selected work"
        title={
          <>
            Proof, not <span className="text-gradient">promises</span>
          </>
        }
        description="Every engagement below shipped through the Services Engine — scoped by a senior lead, delivered by student squads, reviewed by the client."
      />

      <section className="container-page py-20 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <TiltCard intensity={5} className="h-full">
              <div className="bg-gradient-ink text-ink-foreground shadow-elevated relative flex h-full flex-col justify-between overflow-hidden rounded-3xl p-10 md:p-12">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_70%_at_80%_0%,oklch(0.6_0.16_330/0.35),transparent)]" />
                <div className="relative">
                  <div className="flex items-center gap-3">
                    <span className="bg-ink-foreground/10 grid size-11 place-items-center rounded-xl">
                      <Building2 className="size-5" />
                    </span>
                    <div>
                      <p className="text-ink-foreground/60 text-xs font-bold tracking-[0.16em] uppercase">
                        Featured engagement
                      </p>
                      <p className="font-display font-bold">{featured.client}</p>
                    </div>
                  </div>
                  <h3 className="font-display mt-6 text-2xl leading-tight font-extrabold text-balance sm:text-3xl">
                    {featured.title}
                  </h3>
                  <p className="text-ink-foreground/75 mt-4 max-w-xl leading-relaxed">
                    {featured.summary}
                  </p>
                  <Badge className="mt-6 border-ink-foreground/25 bg-transparent font-semibold">
                    {featured.sector}
                  </Badge>
                </div>
                <div className="relative mt-10 grid gap-4 sm:grid-cols-3">
                  {featured.metrics.map((m) => (
                    <div key={m.label} className="bg-ink-foreground/10 rounded-2xl p-4">
                      <p className="font-display text-2xl font-extrabold">{m.value}</p>
                      <p className="text-ink-foreground/60 mt-1 text-xs font-medium">{m.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TiltCard>
          </Reveal>

          <div>
            <SectionHeading
              eyebrow="Case studies"
              title="Browse by sector"
              description="Pick a sector to see how we measured up."
            />
            <div className="mt-7 flex flex-wrap gap-2">
              {sectors.map((s) => (
                <button
                  key={s}
                  onClick={() => setSector(s)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                    sector === s
                      ? "bg-gradient-brand border-transparent text-white shadow"
                      : "bg-card text-muted-foreground hover:text-foreground",
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
            <StaggerGroup className="mt-8 space-y-4">
              {filtered.map((c) => (
                <StaggerItem key={c.slug}>
                  <button
                    onClick={() => setFeatured(c)}
                    className={cn(
                      "group bg-card shadow-soft hover:shadow-elevated w-full rounded-2xl border p-5 text-left transition-all",
                      featured.slug === c.slug && "border-primary/40 ring-primary/20 ring-2",
                    )}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-display text-sm font-bold">{c.client}</p>
                        <p className="text-muted-foreground mt-0.5 line-clamp-1 text-xs">
                          {c.title}
                        </p>
                      </div>
                      <span className="text-primary shrink-0 text-sm font-bold">{c.result}</span>
                    </div>
                  </button>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </div>
      </section>

      <section className="bg-muted/40 border-y py-20 md:py-24">
        <div className="container-page">
          <SectionHeading
            align="center"
            eyebrow="The full board"
            title="Every engagement, every metric"
            description="Results below the fold are real numbers from real handovers."
          />
          <StaggerGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {caseStudies.map((c) => (
              <StaggerItem key={c.slug}>
                <div className="bg-card shadow-soft h-full rounded-2xl border p-6">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="font-semibold">
                      {c.sector}
                    </Badge>
                    {c.engine === "services" ? (
                      <TrendingUp className="text-services size-4" />
                    ) : (
                      <TrendingDown className="text-services size-4" />
                    )}
                  </div>
                  <p className="font-display text-muted-foreground mt-4 text-xs font-bold tracking-[0.14em] uppercase">
                    {c.client}
                  </p>
                  <h3 className="font-display mt-1.5 text-base leading-snug font-bold">
                    {c.title}
                  </h3>
                  <div className="mt-4 grid grid-cols-2 gap-2 border-t pt-4">
                    {c.metrics.slice(0, 2).map((m) => (
                      <div key={m.label}>
                        <p className="font-display text-lg font-extrabold">{m.value}</p>
                        <p className="text-muted-foreground text-[11px] font-medium">{m.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <section className="container-page py-20">
        <SectionHeading
          align="center"
          eyebrow="Your project"
          title="The next case study could be yours"
        />
        <Reveal delay={0.1} className="mt-8 text-center">
          <Button asChild size="lg" className="bg-gradient-brand shadow-glow h-12 border-0 px-8">
            <Link to="/contact">
              Start a project <ArrowRight className="ml-1.5 size-4" />
            </Link>
          </Button>
        </Reveal>
      </section>

      <CTASection
        title="Want to see the engine behind the work?"
        description="Book a client portal demo and watch a project run from proposal to handover."
        primary={{ label: "Preview the services", to: "/services" }}
        secondary={{ label: "Book a demo", to: "/contact" }}
      />
    </PageShell>
  );
}
