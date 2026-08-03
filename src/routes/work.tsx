import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Building2, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CTASection, PageHero, PageShell, SectionHeading } from "@/components/marketing/shell";
import { Reveal } from "@/components/motion";
import { caseStudies } from "@/data/site";

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

function Work() {
  const [sector, setSector] = useState("All");
  const sectors = ["All", ...Array.from(new Set(caseStudies.map((c) => c.sector)))];
  const filtered = sector === "All" ? caseStudies : caseStudies.filter((c) => c.sector === sector);

  return (
    <PageShell>
      <PageHero
        eyebrow="Selected work"
        art="market"
        title={
          <>
            Proof, not <span className="text-gradient">promises</span>
          </>
        }
        description="Engagements here ship through the Services Engine — scoped by a senior lead, delivered by supervised squads, reviewed by the client. The board opens with our first engagements."
      />

      <section className="container-page py-20 md:py-24">
        {caseStudies.length > 0 ? (
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <Reveal>
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
                      <p className="font-display font-bold">{caseStudies[0].client}</p>
                    </div>
                  </div>
                  <h3 className="font-display mt-6 text-2xl leading-tight font-extrabold text-balance sm:text-3xl">
                    {caseStudies[0].title}
                  </h3>
                  <p className="text-ink-foreground/75 mt-4 max-w-xl leading-relaxed">
                    {caseStudies[0].summary}
                  </p>
                </div>
              </div>
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
                    className="bg-card text-muted-foreground hover:text-foreground rounded-full border px-4 py-2 text-sm font-semibold transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
              <div className="mt-8 space-y-4">
                {filtered.map((c) => (
                  <div
                    key={c.slug}
                    className="bg-card shadow-soft w-full rounded-2xl border p-5 text-left"
                  >
                    <p className="font-display text-sm font-bold">{c.client}</p>
                    <p className="text-muted-foreground mt-0.5 text-xs">{c.title}</p>
                    <p className="text-primary mt-2 text-sm font-bold">{c.result}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="border-dashed bg-card/50 flex flex-col items-center rounded-3xl border p-12 text-center md:p-16">
            <FolderOpen className="text-muted-foreground size-9" />
            <h3 className="font-display mt-5 text-2xl font-extrabold">
              The portfolio is being built
            </h3>
            <p className="text-muted-foreground mt-3 max-w-lg leading-relaxed">
              Case studies are published after clients sign off on the numbers — we won't dress up a
              demo as a deployment. The first engagements land here as the Services Engine goes live
              in Port Harcourt.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button
                asChild
                size="lg"
                className="bg-gradient-brand shadow-glow h-12 border-0 px-8"
              >
                <Link to="/contact">
                  Start a project <ArrowRight className="ml-1.5 size-4" />
                </Link>
              </Button>
            </div>
          </div>
        )}
      </section>

      <section className="bg-muted/40 border-y py-20 md:py-24">
        <div className="container-page">
          <SectionHeading
            align="center"
            eyebrow="Your project"
            title="The next case study could be yours"
            description="Send us a brief. If we take it on, you'll see the work as it ships — and the results get published here."
          />
          <Reveal delay={0.1} className="mt-8 text-center">
            <Button asChild size="lg" className="bg-gradient-brand shadow-glow h-12 border-0 px-8">
              <Link to="/contact">
                Start a project <ArrowRight className="ml-1.5 size-4" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>

      <CTASection
        title="Want to see the engine behind the work?"
        description="Preview how a project runs from proposal to handover — scoped by leads, delivered by squads, reviewed by clients."
        primary={{ label: "Preview the services", to: "/services" }}
        secondary={{ label: "Book a demo", to: "/contact" }}
      />
    </PageShell>
  );
}
