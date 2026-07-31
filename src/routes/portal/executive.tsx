import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  Building2,
  GraduationCap,
  HeartPulse,
  LineChart,
  ShieldCheck,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AppShell } from "@/components/app/app-shell";
import { formatNaira } from "@/data/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/portal/executive")({
  head: () => ({
    meta: [
      { title: "Executive Dashboard — CEA-OS" },
      {
        name: "description",
        content: "Organisation-wide KPIs, enrolment, finances and outcomes for leadership.",
      },
    ],
  }),
  component: ExecutivePortal,
});

const kpis = [
  {
    label: "Enrolment",
    value: "214",
    delta: "target 240 · 89%",
    icon: GraduationCap,
    tone: "bg-primary/10 text-primary",
  },
  {
    label: "Placement",
    value: "71%",
    delta: "Cohort 14 · target 75%",
    icon: TrendingUp,
    tone: "bg-career/10 text-career",
  },
  {
    label: "Revenue (MTD)",
    value: formatNaira(18600000),
    delta: "+18% MoM",
    icon: Wallet,
    tone: "bg-success/10 text-success",
  },
  {
    label: "NPS",
    value: "72",
    delta: "+6 vs Q1",
    icon: HeartPulse,
    tone: "bg-community/10 text-community",
  },
];

function ExecutivePortal() {
  return (
    <AppShell
      roleKey="admin"
      title="Executive dashboard"
      subtitle="Organisation-wide · Q3 2026 · refreshed 5 min ago"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">On track</Badge>
          <Button asChild variant="outline" size="sm" className="ml-auto">
            <Link to="/portal/quality">QA report</Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((k) => (
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

      <div className="mt-5 grid gap-5 xl:grid-cols-2">
        <Card className="bg-card shadow-soft border">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <BarChart3 className="text-primary size-4" /> Enrolment by program
            </CardTitle>
            <Badge variant="secondary" className="font-semibold">
              Cohorts 14–16
            </Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { p: "Full-Stack Software Development", v: 68, m: "of 90" },
              { p: "Cybersecurity Analyst", v: 54, m: "of 60" },
              { p: "Cloud Engineering & DevOps", v: 42, m: "of 50" },
              { p: "Data Science & Applied AI", v: 31, m: "of 40" },
              { p: "Product & UI/UX Design", v: 19, m: "of 30" },
            ].map((x) => (
              <div key={x.p}>
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span>{x.p}</span>
                  <span className="font-display text-sm font-extrabold">
                    {x.v}{" "}
                    <span className="text-muted-foreground text-xs font-semibold">/ {x.m}</span>
                  </span>
                </div>
                <Progress value={(x.v / parseInt(x.m)) * 100} className="mt-1.5 h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-5">
          <Card className="bg-card shadow-soft border">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <LineChart className="text-primary size-4" /> Quarterly outlook
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                {
                  t: "Cohort 16 launch · Sep 7",
                  d: "Pipeline 74 applications · ahead of pace",
                  tone: "bg-primary/10 text-primary",
                },
                {
                  t: "Accreditation on-site visit",
                  d: "Q4 · readiness checklist 3/5",
                  tone: "bg-warning/10 text-warning",
                },
                {
                  t: "Career fair · Sep 12",
                  d: "40 booths booked · 12 sponsors",
                  tone: "bg-career/10 text-career",
                },
              ].map((x) => (
                <div key={x.t} className="rounded-xl border p-3.5">
                  <p className="text-sm font-bold">{x.t}</p>
                  <p className="text-muted-foreground mt-0.5 text-xs">{x.d}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-gradient-ink text-ink-foreground shadow-elevated border-0">
            <CardContent className="p-6">
              <ShieldCheck className="text-success size-5" />
              <p className="font-display mt-3 text-base font-extrabold">Board pack ready</p>
              <p className="text-ink-foreground/70 mt-1 text-sm">
                Q3 board pack: financials, enrolment, outcomes and risk register — published for the
                August sitting.
              </p>
              <Button asChild size="sm" className="bg-gradient-brand shadow-glow mt-4 border-0">
                <Link to="/about">
                  Company overview <ArrowRight className="ml-1 size-3.5" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-card shadow-soft border">
            <CardContent className="flex items-start gap-3 p-5">
              <Building2 className="text-primary mt-0.5 size-5 shrink-0" />
              <p className="text-sm leading-relaxed font-medium">
                <strong className="font-display">Organisation:</strong> 42 staff, 8 programs, 3
                campuses, 5 engines — all on one platform.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
