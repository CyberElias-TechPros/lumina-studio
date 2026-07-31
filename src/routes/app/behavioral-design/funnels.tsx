import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Funnel, Percent, TrendingDown, TrendingUp, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/behavioral-design/funnels")({
  head: () => ({
    meta: [
      { title: "Funnel Analysis — CEA-OS" },
      { name: "description", content: "Funnel stages with conversion rates and drop-off." },
    ],
  }),
  component: FunnelAnalysis,
});

const stages = [
  {
    t: "Signup",
    users: "8,400",
    conv: "100%",
    drop: "—",
    pct: 100,
    tone: "bg-primary/10 text-primary",
  },
  {
    t: "First lesson started",
    users: "5,376",
    conv: "64%",
    drop: "−36%",
    pct: 64,
    tone: "bg-learning/10 text-learning",
  },
  {
    t: "Week-2 active",
    users: "3,864",
    conv: "46%",
    drop: "−18%",
    pct: 46,
    tone: "bg-success/10 text-success",
  },
  {
    t: "Week-4 still enrolled",
    users: "3,024",
    conv: "36%",
    drop: "−10%",
    pct: 36,
    tone: "bg-warning/10 text-warning",
  },
  {
    t: "First assessment passed",
    users: "2,352",
    conv: "28%",
    drop: "−8%",
    pct: 28,
    tone: "bg-error/10 text-error",
  },
];

function FunnelAnalysis() {
  return (
    <AppShell
      roleKey="behavioral-design"
      title="Funnel analysis"
      subtitle="Core LMS onboarding · cohort 14-17 · refreshed weekly"
      actions={
        <>
          <Badge className="bg-warning/10 text-warning border-0 font-semibold">
            Leak: week-2 active
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/behavioral-design">
              <ArrowLeft className="size-4" /> Behavior hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Sessions (30d)",
            value: "31.2k",
            delta: "+8% MoM",
            icon: Users,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Signup→lesson",
            value: "64%",
            delta: "+3 pts vs last qtr",
            icon: Funnel,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Biggest leak",
            value: "−18%",
            delta: "week-2 active",
            icon: TrendingDown,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Assessment pass",
            value: "28%",
            delta: "target 32%",
            icon: TrendingUp,
            tone: "bg-success/10 text-success",
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
            <Funnel className="text-primary size-4" /> Funnel stages
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {stages.map((s) => (
            <div key={s.t}>
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                <span className="text-sm font-bold">{s.t}</span>
                <span className="text-muted-foreground">{s.users} learners</span>
                <span className="text-muted-foreground ml-auto">{s.drop}</span>
                <Badge className={cn("border-0 font-semibold", s.tone)}>{s.conv}</Badge>
              </div>
              <Progress value={s.pct} className="mt-1.5 h-2.5" />
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
