import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarClock,
  CheckCircle2,
  MapPin,
  Wrench,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CTASection, PageHero, PageShell, SectionHeading } from "@/components/marketing/shell";
import { Reveal, StaggerGroup, StaggerItem, TiltCard } from "@/components/motion";
import { gigs, jobs } from "@/data/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/marketplace")({
  head: () => ({
    meta: [
      { title: "Marketplace — Jobs & Gigs | Cyber Elias Academy" },
      {
        name: "description",
        content:
          "The Career Engine marketplace: full-time roles, internships and freelance gigs for students and alumni — vetted by the employer network.",
      },
    ],
  }),
  component: Marketplace,
});

function Marketplace() {
  const [tab, setTab] = useState<"jobs" | "gigs">("jobs");

  return (
    <PageShell>
      <PageHero
        eyebrow="Career Engine"
        title={
          <>
            Skills to <span className="text-gradient">income</span>
          </>
        }
        description="A private marketplace where the employer network meets verified graduates — full-time roles, internships and freelance gigs with tracked outcomes."
      >
        <div className="mt-8 flex rounded-2xl border bg-card p-1.5 shadow-sm">
          {(
            [
              { key: "jobs", label: `Full-time & internships (${jobs.length})` },
              { key: "gigs", label: `Freelance gigs (${gigs.length})` },
            ] as const
          ).map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={cn(
                "flex-1 rounded-xl px-5 py-3 text-sm font-bold transition-all",
                tab === t.key
                  ? "bg-gradient-brand text-white shadow"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </PageHero>

      <section className="container-page py-16 md:py-20">
        {tab === "jobs" ? (
          <StaggerGroup className="grid gap-5 md:grid-cols-2">
            {jobs.map((j) => (
              <StaggerItem key={j.id}>
                <TiltCard intensity={4} className="h-full">
                  <div className="group bg-card shadow-soft hover:shadow-elevated flex h-full flex-col rounded-2xl border p-7 transition-shadow">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-display text-muted-foreground text-xs font-bold tracking-[0.14em] uppercase">
                          {j.company}
                        </p>
                        <h3 className="font-display mt-1 text-xl leading-snug font-bold">
                          {j.title}
                        </h3>
                      </div>
                      <Badge variant="secondary" className="shrink-0">
                        {j.level}
                      </Badge>
                    </div>
                    <div className="text-muted-foreground mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-sm font-medium">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="size-3.5" /> {j.location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <BriefcaseBusiness className="size-3.5" /> {j.type}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <CalendarClock className="size-3.5" /> {j.posted}
                      </span>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {j.skills.map((s) => (
                        <span
                          key={s}
                          className="bg-muted/70 text-muted-foreground rounded-md px-2 py-1 text-[11px] font-medium"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                    <div className="mt-5 flex items-center justify-between border-t pt-4">
                      <span className="font-display text-gradient text-lg font-extrabold">
                        {j.salary}
                      </span>
                      <span className="text-primary inline-flex items-center gap-1 text-sm font-bold">
                        Apply{" "}
                        <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </div>
                  </div>
                </TiltCard>
              </StaggerItem>
            ))}
          </StaggerGroup>
        ) : (
          <StaggerGroup className="grid gap-5 md:grid-cols-2">
            {gigs.map((g) => (
              <StaggerItem key={g.id}>
                <TiltCard intensity={4} className="h-full">
                  <div className="group bg-card shadow-soft hover:shadow-elevated flex h-full flex-col rounded-2xl border p-7 transition-shadow">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-display text-lg leading-snug font-bold">{g.title}</h3>
                      <span className="bg-career/10 text-career shrink-0 rounded-full px-3 py-1 text-xs font-bold">
                        {g.proposals} proposals
                      </span>
                    </div>
                    <p className="text-muted-foreground mt-3 flex items-center gap-1.5 text-sm font-medium">
                      <Wrench className="size-3.5" /> {g.duration}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {g.skills.map((s) => (
                        <span
                          key={s}
                          className="bg-muted/70 text-muted-foreground rounded-md px-2 py-1 text-[11px] font-medium"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                    <div className="mt-5 flex items-center justify-between border-t pt-4">
                      <span className="font-display text-gradient text-xl font-extrabold">
                        {g.budget}
                      </span>
                      <span className="text-primary inline-flex items-center gap-1 text-sm font-bold">
                        Bid{" "}
                        <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </div>
                  </div>
                </TiltCard>
              </StaggerItem>
            ))}
          </StaggerGroup>
        )}
      </section>

      <section className="bg-muted/40 border-y py-20 md:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <SectionHeading
            eyebrow="For employers"
            title="Hire verified capability, not resumes"
            description="Every applicant in this marketplace carries a portfolio and verified certificate from the academy. Match by skill, review real work, interview in-app."
          />
          <div className="space-y-4">
            {[
              "Post roles or gigs — reach 12,000+ verified alumni and current students",
              "Search portfolios by skill, certification and project outcomes",
              "Run the whole pipeline: shortlist, interview, hire, feedback",
              "Track time-to-hire and retention of every placement",
            ].map((f, i) => (
              <Reveal key={f} delay={i * 0.06}>
                <div className="bg-card shadow-soft flex items-start gap-3 rounded-2xl border p-5">
                  <CheckCircle2 className="text-career mt-0.5 size-5 shrink-0" />
                  <p className="text-sm leading-relaxed font-medium">{f}</p>
                </div>
              </Reveal>
            ))}
            <Reveal delay={0.2}>
              <Button asChild className="bg-gradient-career shadow-glow h-11 border-0">
                <Link to="/contact">
                  Partner with the marketplace <ArrowRight className="ml-1.5 size-4" />
                </Link>
              </Button>
            </Reveal>
          </div>
        </div>
      </section>

      <CTASection
        title="Your first role is closer than you think"
        description="Students get marketplace access from day one — portfolio studio, mentor review and matching built into every program."
        primary={{ label: "Explore programs", to: "/programs" }}
        secondary={{ label: "Talk to us", to: "/contact" }}
      />
    </PageShell>
  );
}
