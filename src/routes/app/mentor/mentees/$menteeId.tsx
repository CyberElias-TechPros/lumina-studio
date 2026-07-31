import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  BriefcaseBusiness,
  CheckCircle2,
  FolderGit2,
  Goal,
  Target,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/mentor/mentees/$menteeId")({
  head: () => ({
    meta: [
      { title: "Mentee Overview — CEA-OS" },
      { name: "description", content: "Mentee profile, goals, portfolio and career." },
    ],
  }),
  component: MenteeOverview,
});

const goals = [
  {
    t: "NaijaEats demo day",
    pct: 90,
    d: "Aug 30",
    status: "On track",
    tone: "bg-success/10 text-success",
  },
  {
    t: "Backend certification",
    pct: 60,
    d: "Oct 15",
    status: "On track",
    tone: "bg-success/10 text-success",
  },
  {
    t: "Interview readiness",
    pct: 35,
    d: "Nov 1",
    status: "Needs focus",
    tone: "bg-warning/10 text-warning",
  },
];

function MenteeOverview() {
  return (
    <AppShell
      roleKey="instructor"
      title="Ada Okafor"
      subtitle="Backend specialisation · Cohort 15 · mentee since Feb 2026"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            On track · 2 goals
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/mentor">
              <ArrowLeft className="size-4" /> All mentees
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "GPA",
            value: "4.2",
            delta: "top 5% of cohort",
            icon: Target,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Sessions",
            value: "8",
            delta: "2 this term",
            icon: Users,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Goals",
            value: "3",
            delta: "2 on track",
            icon: Goal,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Applications",
            value: "4",
            delta: "1 interview",
            icon: BriefcaseBusiness,
            tone: "bg-warning/10 text-warning",
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
        <Card className="bg-card shadow-soft border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <Goal className="text-primary size-4" /> Goals & milestones
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {goals.map((g) => (
              <div key={g.t} className="rounded-xl border p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-bold">{g.t}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground text-xs font-semibold">{g.d}</span>
                    <Badge className={cn("border-0 font-semibold", g.tone)}>{g.status}</Badge>
                  </div>
                </div>
                <Progress value={g.pct} className="mt-2.5 h-1.5" />
                <p className="text-muted-foreground mt-2 text-xs">{g.pct}% complete</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-5">
          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <FolderGit2 className="text-primary size-4" /> Portfolio
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                {
                  t: "NaijaEats — food delivery API",
                  v: "Featured",
                  tone: "bg-warning/10 text-warning",
                },
                {
                  t: "BudgetPadi — expense tracker",
                  v: "Live",
                  tone: "bg-success/10 text-success",
                },
                { t: "ClassBoard — LMS UI", v: "In review", tone: "bg-primary/10 text-primary" },
              ].map((x) => (
                <div key={x.t} className="flex items-center justify-between rounded-xl border p-3">
                  <span className="text-sm font-semibold">{x.t}</span>
                  <Badge className={cn("border-0 font-semibold", x.tone)}>{x.v}</Badge>
                </div>
              ))}
              <Button asChild variant="outline" size="sm" className="w-full font-semibold">
                <Link
                  to="/app/mentor/mentees/$menteeId/portfolio"
                  params={{ menteeId: "ada-okafor" }}
                >
                  Review portfolio
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <CheckCircle2 className="text-primary size-4" /> Recent notes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="rounded-xl border p-3 text-xs leading-relaxed">
                <strong className="text-foreground">Aug 10:</strong> Reviewed DB schema for
                NaijaEats — solid 3NF work. Encouraged EXPLAIN practice for the exam.
              </p>
              <p className="rounded-xl border p-3 text-xs leading-relaxed">
                <strong className="text-foreground">Jul 28:</strong> Mock interview #3 — strong on
                systems, needs STAR formatting for behavioural questions.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
