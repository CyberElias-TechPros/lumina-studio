import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CalendarDays,
  Clock,
  Laptop,
  MapPin,
  MonitorPlay,
  Sparkles,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CTASection, PageHero, PageShell, SectionHeading } from "@/components/marketing/shell";
import { Reveal, StaggerGroup, StaggerItem, TiltCard } from "@/components/motion";
import { engineMap, events } from "@/data/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events — Cyber Elias Academy" },
      {
        name: "description",
        content:
          "Open days, AI builder nights, career fairs, alumni summits, cloud clinics and design workshops — join the academy live in Lagos or online.",
      },
    ],
  }),
  component: Events,
});

const formats = ["All", ...Array.from(new Set(events.map((e) => e.type)))];

function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-NG", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function Events() {
  const [format, setFormat] = useState("All");

  const upcoming = useMemo(() => {
    const list = format === "All" ? events : events.filter((e) => e.type === format);
    return [...list].sort((a, b) => a.date.localeCompare(b.date));
  }, [format]);

  return (
    <PageShell>
      <PageHero
        eyebrow="Events"
        title={
          <>
            Come see it <span className="text-gradient">live</span>
          </>
        }
        description="Open days, build nights, career fairs and workshops — on campus in Lagos or online from anywhere. Most events are free and open to everyone."
      >
        <div className="mt-8 flex flex-wrap gap-2">
          {formats.map((f) => (
            <button
              key={f}
              onClick={() => setFormat(f)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                format === f
                  ? "bg-gradient-brand border-transparent text-white shadow"
                  : "bg-card text-muted-foreground hover:text-foreground",
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </PageHero>

      <section className="container-page py-16 md:py-20">
        <StaggerGroup className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {upcoming.map((e) => {
            const engine = engineMap[e.engine];
            return (
              <StaggerItem key={e.slug}>
                <TiltCard intensity={5} className="h-full">
                  <div className="group bg-card shadow-soft hover:shadow-elevated relative flex h-full flex-col overflow-hidden rounded-2xl border transition-shadow">
                    <div
                      className={`${engine?.gradient ?? "bg-gradient-brand"} absolute inset-x-0 top-0 h-1`}
                    />
                    <div className="flex flex-1 flex-col p-7">
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="font-semibold">
                          {e.type}
                        </Badge>
                        {engine && (
                          <span
                            className={`${engine.text} text-xs font-bold tracking-wide uppercase`}
                          >
                            {engine.name.split(" ")[0]} Engine
                          </span>
                        )}
                      </div>
                      <div className="mt-5 flex items-center gap-4">
                        <div className="bg-primary/10 text-primary font-display grid size-14 shrink-0 place-items-center rounded-2xl text-center leading-tight">
                          <span className="text-lg font-extrabold">
                            {formatDate(e.date).split(",")[1]?.trim()}
                          </span>
                          <span className="text-[10px] font-bold tracking-wide uppercase">
                            {formatDate(e.date).split(",")[0]}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-display text-lg leading-snug font-bold">{e.title}</h3>
                          <p className="text-muted-foreground mt-1 flex items-center gap-1.5 text-xs font-medium">
                            <Clock className="size-3.5" /> {e.time}
                          </p>
                        </div>
                      </div>
                      <p className="text-muted-foreground mt-4 flex-1 text-sm leading-relaxed">
                        {e.blurb}
                      </p>
                      <div className="text-muted-foreground mt-5 flex items-center gap-2 border-t pt-4 text-sm font-medium">
                        <MapPin className="text-primary size-4 shrink-0" /> {e.location}
                      </div>
                      <Button asChild className="bg-gradient-brand shadow-glow mt-5 border-0">
                        <Link to="/contact">
                          Register interest <ArrowRight className="ml-1.5 size-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </TiltCard>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </section>

      <section className="bg-muted/40 border-y py-20 md:py-24">
        <div className="container-page">
          <SectionHeading
            align="center"
            eyebrow="Every month"
            title="The academy runs on a live rhythm"
            description="A snapshot of the community engine's weekly calendar."
          />
          <StaggerGroup className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2">
            {[
              {
                icon: Users,
                title: "Open day",
                body: "First Saturday. Tour labs, sit in on a cohort, meet instructors.",
              },
              {
                icon: MonitorPlay,
                title: "Build night",
                body: "Every two weeks. Student squads demo what they shipped.",
              },
              {
                icon: Sparkles,
                title: "Career fair",
                body: "Quarterly. 60+ employers interviewing graduating cohorts.",
              },
              {
                icon: CalendarDays,
                title: "Alumni gathering",
                body: "Monthly. Talks, networking and the alumni fund.",
              },
            ].map((r, i) => (
              <StaggerItem key={r.title}>
                <div className="bg-card shadow-soft flex h-full items-start gap-4 rounded-2xl border p-6">
                  <span className="bg-primary/10 text-primary grid size-11 shrink-0 place-items-center rounded-xl">
                    <r.icon className="size-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-base font-bold">{r.title}</h3>
                    <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">{r.body}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <section className="container-page py-20">
        <Reveal>
          <div className="bg-gradient-ink text-ink-foreground shadow-elevated relative overflow-hidden rounded-3xl px-8 py-14 md:px-14">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_85%_0%,oklch(0.55_0.15_330/0.3),transparent)]" />
            <div className="relative grid items-center gap-8 md:grid-cols-[1fr_auto]">
              <div>
                <h2 className="font-display text-2xl font-extrabold sm:text-3xl">
                  Host an event with us
                </h2>
                <p className="text-ink-foreground/75 mt-3 max-w-xl leading-relaxed">
                  Employers, partners and NGOs regularly co-host hiring days, workshops and
                  community programs at the academy. Let's plan yours.
                </p>
              </div>
              <Button
                asChild
                variant="outline"
                className="border-ink-foreground/25 text-ink-foreground hover:bg-ink-foreground/10 bg-transparent"
              >
                <Link to="/partners">
                  Partner with us <ArrowRight className="ml-1.5 size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </section>

      <CTASection
        title="Never miss an event"
        description="Join the community mailing list for invites, early access and monthly digests of everything the academy is shipping."
        primary={{ label: "Talk to us", to: "/contact" }}
        secondary={{ label: "Visit the campus", to: "/visit" }}
      />
    </PageShell>
  );
}
