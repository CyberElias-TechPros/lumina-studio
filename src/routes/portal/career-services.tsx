import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  FileText,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/portal/career-services")({
  head: () => ({
    meta: [
      { title: "Career Services — CEA-OS" },
      {
        name: "description",
        content:
          "Placements, employer partnerships and outcomes tracking for the career services team.",
      },
    ],
  }),
  component: CareerServicesPortal,
});

const outcomes = [
  { label: "Cohort 14 placement", pct: 71, target: "target 75%" },
  { label: "Cohort 15 in-progress", pct: 46, target: "target 60% by Nov" },
  { label: "Cohort 16 pipeline", pct: 18, target: "interviews starting" },
];

const partners = [
  {
    name: "Paystack",
    roles: "Frontend · Platform",
    status: "Active",
    tone: "bg-success/10 text-success",
  },
  { name: "Interswitch", roles: "SOC · QA", status: "Active", tone: "bg-success/10 text-success" },
  {
    name: "Kuda",
    roles: "DevOps · Data",
    status: "Interviewing",
    tone: "bg-primary/10 text-primary",
  },
  {
    name: "Greenfield",
    roles: "IT support · Helpdesk",
    status: "New",
    tone: "bg-warning/10 text-warning",
  },
];

function CareerServicesPortal() {
  return (
    <AppShell
      roleKey="student"
      title="Career services"
      subtitle="Placements, partnerships, outcomes"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            Cohort 14: 71% placed
          </Badge>
          <Button asChild variant="outline" size="sm" className="ml-auto">
            <Link to="/portal/employer">Employer view</Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Hiring partners",
            value: "312",
            delta: "+14 this quarter",
            icon: BriefcaseBusiness,
            tone: "bg-career/10 text-career",
          },
          {
            label: "Open roles",
            value: "186",
            delta: "38 exclusive to CEA",
            icon: Target,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Placements (2026)",
            value: "118",
            delta: "avg. 23 days",
            icon: CheckCircle2,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Employer visits",
            value: "9",
            delta: "this month",
            icon: CalendarDays,
            tone: "bg-learning/10 text-learning",
          },
        ].map((k) => (
          <Card key={k.label} className="bg-card shadow-soft border">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground text-xs font-bold tracking-wide uppercase">
                  {k.label}
                </p>
                <span className={cn("grid size-8 place-items-center rounded-lg", k.tone)}>
                  <k.icon className="size-4" />
                </span>
              </div>
              <p className="font-display mt-3 text-2xl font-extrabold">{k.value}</p>
              <p className="text-muted-foreground mt-0.5 text-xs font-semibold">{k.delta}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.5fr_1fr]">
        <div className="space-y-5">
          <Card className="bg-card shadow-soft border">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <TrendingUp className="text-primary size-4" /> Placement outcomes
              </CardTitle>
              <Badge variant="secondary" className="font-semibold">
                Placement Promise
              </Badge>
            </CardHeader>
            <CardContent className="space-y-5">
              {outcomes.map((o) => (
                <div key={o.label}>
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span>{o.label}</span>
                    <span className="font-display text-sm font-extrabold">{o.pct}%</span>
                  </div>
                  <Progress value={o.pct} className="mt-1.5 h-2" />
                  <p className="text-muted-foreground mt-1.5 text-xs">{o.target}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-card shadow-soft border">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <Users className="text-primary size-4" /> Employer partners
              </CardTitle>
              <Button asChild variant="ghost" size="sm" className="text-primary font-semibold">
                <Link to="/partners">
                  All partners <ArrowRight className="ml-1 size-3.5" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent className="divide-y">
              {partners.map((p) => (
                <div
                  key={p.name}
                  className="flex flex-wrap items-center gap-3 py-3 first:pt-0 last:pb-0"
                >
                  <span className="bg-gradient-brand text-white font-display grid size-10 shrink-0 place-items-center rounded-xl text-[10px] font-bold">
                    {p.name.slice(0, 3).toUpperCase()}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold">{p.name}</p>
                    <p className="text-muted-foreground text-xs">{p.roles}</p>
                  </div>
                  <Badge className={cn("border-0 font-semibold", p.tone)}>{p.status}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-5">
          <Card className="bg-card shadow-soft border">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <CalendarDays className="text-primary size-4" /> Upcoming
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                {
                  t: "Employer spotlight — Paystack",
                  d: "Fri · campus + stream",
                  tone: "bg-career/10 text-career",
                },
                {
                  t: "Cohort 15 mock interviews",
                  d: "Aug 17–21 · 62 learners",
                  tone: "bg-primary/10 text-primary",
                },
                {
                  t: "Career fair — Sep 12",
                  d: "Landmark Centre · 40 booths",
                  tone: "bg-community/10 text-community",
                },
              ].map((e) => (
                <div key={e.t} className="rounded-xl border p-3.5">
                  <p className="text-sm font-bold">{e.t}</p>
                  <p className="text-muted-foreground mt-0.5 text-xs">{e.d}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-gradient-ink text-ink-foreground shadow-elevated border-0">
            <CardContent className="p-6">
              <FileText className="text-career size-5" />
              <p className="font-display mt-3 text-base font-extrabold">Satisfied employer rate</p>
              <p className="text-ink-foreground/70 mt-1 text-sm">
                91% of employers would hire from CEA again. Median time-to-hire: 23 days.
              </p>
              <div className="mt-4 flex items-center gap-2">
                <Progress value={91} className="h-1.5 flex-1 bg-ink-foreground/15" />
                <span className="text-success text-xs font-extrabold">91%</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
