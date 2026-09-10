import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Building2, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CTASection, PageHero, PageShell, SectionHeading } from "@/components/marketing/shell";
import { Reveal } from "@/components/motion";
import { engagements } from "@/data/site";
import { getPageHead } from "@/lib/seo";

export const Route = createFileRoute("/work")({
  head: () =>
    getPageHead({
      title: "Services & selected work",
      description:
        "Technology services from Cyber Elias Academy: web development, IT support, training and design for small businesses in Rivers State. Detailed case studies coming soon.",
      path: "/work",
      noIndex: true,
    }),
  component: Work,
});

function Work() {
  const [sector, setSector] = useState("All");
  const sectors = ["All", ...Array.from(new Set(engagements.map((e) => e.sector)))];
  const filtered = sector === "All" ? engagements : engagements.filter((e) => e.sector === sector);

  return (
    <PageShell>
      <PageHero
        eyebrow="Selected work"
        art="market"
        title={
          <>
            Where we <span className="text-gradient">focus</span>
          </>
        }
        description="We work across sectors where practical technology makes an immediate difference. Here's where we're building capability."
      />

      <section className="container-page py-20 md:py-24">
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
                      Focus area
                    </p>
                    <p className="font-display font-bold">{engagements[0].sector}</p>
                  </div>
                </div>
                <h3 className="font-display mt-6 text-2xl leading-tight font-extrabold text-balance sm:text-3xl">
                  {engagements[0].title}
                </h3>
                <p className="text-ink-foreground/75 mt-4 max-w-xl leading-relaxed">
                  {engagements[0].description}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {engagements[0].capabilities.map((cap) => (
                    <span
                      key={cap}
                      className="bg-ink-foreground/10 rounded-full px-3 py-1 text-xs font-medium"
                    >
                      {cap}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <div>
            <SectionHeading
              eyebrow="Sectors"
              title="Browse by area"
              description="Pick a sector to see what we bring to it."
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
              {filtered.map((e) => (
                <div
                  key={e.sector}
                  className="bg-card shadow-soft w-full rounded-2xl border p-5 text-left"
                >
                  <p className="font-display text-sm font-bold">{e.title}</p>
                  <p className="text-muted-foreground mt-0.5 text-xs">{e.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
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
