import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BriefcaseBusiness,
  CalendarDays,
  GraduationCap,
  HandHeart,
  HeartHandshake,
  Search,
  Star,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import type { AluKpi } from "@/lib/api/alumni";
import { useAluOverview } from "@/lib/query/alumni";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/alumni/hub")({
  head: () => ({
    meta: [
      { title: "Alumni Hub — CEA-OS" },
      { name: "description", content: "Your alumni network, jobs, events and giving." },
    ],
  }),
  component: AlumniHub,
});

const kpiMeta = [
  { icon: Users, tone: "bg-primary/10 text-primary" },
  { icon: CalendarDays, tone: "bg-learning/10 text-learning" },
  { icon: BriefcaseBusiness, tone: "bg-success/10 text-success" },
  { icon: HandHeart, tone: "bg-warning/10 text-warning" },
];

const tiles = [
  {
    to: "/app/alumni/network",
    label: "Network",
    desc: "Search and connect with 1,200+ alumni",
    icon: Users,
    tone: "text-primary bg-primary/10",
  },
  {
    to: "/app/alumni/jobs",
    label: "Job board",
    desc: "Opportunities + refer-a-friend",
    icon: BriefcaseBusiness,
    tone: "text-learning bg-learning/10",
  },
  {
    to: "/app/alumni/events",
    label: "Events",
    desc: "Reunions, career days, workshops",
    icon: CalendarDays,
    tone: "text-success bg-success/10",
  },
  {
    to: "/app/alumni/give-back",
    label: "Give back",
    desc: "Donate, mentor, fund scholarships",
    icon: HandHeart,
    tone: "text-warning bg-warning/10",
  },
  {
    to: "/app/alumni/find",
    label: "Find a mentor",
    desc: "Browse mentors and request mentorship",
    icon: HeartHandshake,
    tone: "text-career bg-career/10",
  },
];

function AlumniHub() {
  const overviewQuery = useAluOverview();

  return (
    <AppShell
      roleKey="alumni"
      title="Alumni hub"
      subtitle="Cohort 12 · Full-Stack · Class of 2024"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            Member since 2024
          </Badge>
          <Badge variant="secondary" className="font-semibold">
            <Star className="text-warning mr-1 size-3" /> Active donor
          </Badge>
        </>
      }
    >
      <QueryState<AluKpi[]>
        query={overviewQuery}
        error={{ title: "Stats unavailable" }}
        empty={{
          title: "No stats yet",
          description: "Your alumni stats will appear here.",
        }}
        isEmpty={(rows) => rows.length === 0}
      >
        {(rows) => (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {rows.map((k, i) => {
              const meta = kpiMeta[i % kpiMeta.length];
              return (
                <Card key={k.id} className="bg-card shadow-soft border">
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between">
                      <p className="text-muted-foreground text-xs font-bold tracking-wide uppercase">
                        {k.metric}
                      </p>
                      <span className={cn("grid size-8 place-items-center rounded-lg", meta.tone)}>
                        <meta.icon className="size-4" />
                      </span>
                    </div>
                    <p className="font-display mt-3 text-2xl font-extrabold">{k.valueLabel}</p>
                    <p className="text-muted-foreground mt-0.5 text-xs font-semibold">{k.delta}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </QueryState>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {tiles.map((t) => (
          <Link
            key={t.to}
            to={t.to}
            className="group bg-card shadow-soft hover:shadow-elevated flex h-full flex-col rounded-2xl border p-5 transition-all hover:-translate-y-0.5"
          >
            <div className="flex items-start justify-between">
              <span className={cn("grid size-10 place-items-center rounded-xl", t.tone)}>
                <t.icon className="size-5" />
              </span>
              <ArrowRight className="text-muted-foreground group-hover:text-primary size-4 transition-colors" />
            </div>
            <p className="font-display mt-4 text-sm font-extrabold">{t.label}</p>
            <p className="text-muted-foreground mt-1 flex-1 text-xs leading-relaxed">{t.desc}</p>
          </Link>
        ))}
      </div>

      <Card className="bg-gradient-ink mt-5 text-ink-foreground shadow-elevated border-0">
        <CardContent className="flex flex-wrap items-center gap-4 p-6">
          <span className="bg-ink-foreground/10 grid size-10 place-items-center rounded-xl">
            <GraduationCap className="size-5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-display text-sm font-extrabold">Cohort 12 reunion — Sep 6</p>
            <p className="text-ink-foreground/70 text-xs">
              74 of 86 confirmed. Bring your plus-one — the courtyard opens at 15:00.
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            size="sm"
            className="bg-transparent text-ink-foreground border-ink-foreground/30 font-semibold hover:bg-ink-foreground/10"
          >
            <Link to="/app/alumni/events">RSVP</Link>
          </Button>
        </CardContent>
      </Card>
    </AppShell>
  );
}
