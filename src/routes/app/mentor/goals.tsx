import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Goal, Target, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/mentor/goals")({
  head: () => ({
    meta: [
      { title: "Goal Management — CEA-OS" },
      { name: "description", content: "Mentee milestones and progress across your caseload." },
    ],
  }),
  component: MentorGoals,
});

const goals = [
  {
    t: "NaijaEats demo day",
    m: "Ada Okafor",
    pct: 90,
    d: "Aug 30",
    status: "On track",
    tone: "bg-success/10 text-success",
  },
  {
    t: "CI/CD certification",
    m: "Tobi Adeyemi",
    pct: 55,
    d: "Sep 20",
    status: "On track",
    tone: "bg-success/10 text-success",
  },
  {
    t: "Portfolio launch",
    m: "Zainab Yusuf",
    pct: 40,
    d: "Sep 5",
    status: "Needs focus",
    tone: "bg-warning/10 text-warning",
  },
  {
    t: "First internship application",
    m: "Ada Okafor",
    pct: 25,
    d: "Oct 1",
    status: "New",
    tone: "bg-primary/10 text-primary",
  },
];

function MentorGoals() {
  return (
    <AppShell
      roleKey="instructor"
      title="Goal management"
      subtitle="9 goals across 3 mentees · 7 on track"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">78% on track</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/mentor">
              <ArrowLeft className="size-4" /> Dashboard
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Active goals",
            value: "9",
            delta: "3 added this term",
            icon: Goal,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "On track",
            value: "7",
            delta: "78%",
            icon: TrendingUp,
            tone: "bg-success/10 text-success",
          },
          {
            label: "At risk",
            value: "2",
            delta: "review this week",
            icon: Target,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Completed",
            value: "6",
            delta: "since Feb",
            icon: Goal,
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

      <Card className="bg-card mt-5 shadow-soft border">
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <Target className="text-primary size-4" /> All goals
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {goals.map((g) => (
            <div key={g.t} className="rounded-xl border p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="text-sm font-bold">{g.t}</p>
                  <p className="text-muted-foreground text-xs">{g.m}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground text-xs font-semibold">due {g.d}</span>
                  <Badge className={cn("border-0 font-semibold", g.tone)}>{g.status}</Badge>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-3">
                <Progress value={g.pct} className="h-1.5 flex-1" />
                <span className="text-xs font-bold">{g.pct}%</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
