import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  GraduationCap,
  LineChart,
  MessageSquare,
  TrendingUp,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/instructor/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics — CEA-OS" },
      {
        name: "description",
        content: "Performance trends and at-risk learners across your courses.",
      },
    ],
  }),
  component: InstructorAnalytics,
});

const atRisk = [
  {
    name: "Ngozi Umeh",
    course: "Backend & APIs",
    pct: 61,
    flag: "2 assignments missed",
    tone: "bg-error/10 text-error",
  },
  {
    name: "Samuel Adebayo",
    course: "Backend & APIs",
    pct: 53,
    flag: "attendance 71%",
    tone: "bg-error/10 text-error",
  },
  {
    name: "Zainab K.",
    course: "Backend & APIs",
    pct: 81,
    flag: "grade slip 9 pts",
    tone: "bg-warning/10 text-warning",
  },
  {
    name: "Dapo Olu",
    course: "Backend & APIs",
    pct: 71,
    flag: "1 late submission",
    tone: "bg-warning/10 text-warning",
  },
];

const trend = [58, 62, 60, 66, 70, 69, 74, 78, 76, 82, 84, 88];

function InstructorAnalytics() {
  const max = 100;
  return (
    <AppShell
      roleKey="instructor"
      title="Analytics"
      subtitle="Backend & APIs · Cohort 15 · mid-term snapshot"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">Up 3.2 pts</Badge>
          <Badge variant="secondary" className="font-semibold">
            Auto-refreshed daily
          </Badge>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Class average",
            value: "82%",
            delta: "+3.2% vs last term",
            icon: GraduationCap,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Completion rate",
            value: "84%",
            delta: "of lessons viewed",
            icon: BookOpen,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Avg. watch time",
            value: "31m",
            delta: "vs 26m target",
            icon: LineChart,
            tone: "bg-success/10 text-success",
          },
          {
            label: "At-risk learners",
            value: "4",
            delta: "2 critical",
            icon: AlertTriangle,
            tone: "bg-error/10 text-error",
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
                <TrendingUp className="text-primary size-4" /> Class performance · 12 weeks
              </CardTitle>
              <Badge variant="secondary" className="font-semibold">
                weekly averages
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="flex h-44 items-end gap-2">
                {trend.map((v, i) => (
                  <div key={i} className="flex flex-1 flex-col items-center gap-2">
                    <div
                      className={cn(
                        "w-full rounded-t-lg transition-colors",
                        i === trend.length - 1
                          ? "bg-gradient-brand"
                          : "bg-primary/25 hover:bg-primary/40",
                      )}
                      style={{ height: `${(v / max) * 100}%` }}
                    />
                    {i % 3 === 0 && (
                      <span className="text-muted-foreground text-[10px] font-bold">W{i + 1}</span>
                    )}
                  </div>
                ))}
              </div>
              <p className="text-muted-foreground mt-4 border-t pt-3 text-xs">
                Peak at week 12 (88%) after the REST API milestone. Dip at week 10 coincided with
                exam week across the campus.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <Users className="text-primary size-4" /> Lesson drop-off
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { t: "Node.js runtime & modules", v: 91, warn: false },
                { t: "Auth, sessions & JWT", v: 84, warn: false },
                { t: "SQL & PostgreSQL fundamentals", v: 63, warn: true },
                { t: "REST design & Express routes", v: 57, warn: true },
              ].map((l) => (
                <div key={l.t}>
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span>{l.t}</span>
                    <span className={l.warn ? "text-warning" : "text-muted-foreground"}>
                      {l.v}% retention
                    </span>
                  </div>
                  <div className="bg-muted mt-2 h-2 overflow-hidden rounded-full">
                    <div
                      className={cn(
                        "h-full rounded-full",
                        l.warn ? "bg-warning" : "bg-gradient-brand",
                      )}
                      style={{ width: `${l.v}%` }}
                    />
                  </div>
                </div>
              ))}
              <p className="text-muted-foreground border-t pt-3 text-xs">
                Two lessons drop below 65% retention — consider splitting and adding a hands-on
                checkpoint.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-5">
          <Card className="bg-card shadow-soft border">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <AlertTriangle className="text-error size-4" /> At-risk list
              </CardTitle>
              <Button asChild variant="ghost" size="sm" className="text-primary font-semibold">
                <Link to="/app/instructor/gradebook">
                  Gradebook <ArrowRight className="ml-1 size-3.5" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {atRisk.map((r) => (
                <div key={r.name} className="rounded-xl border p-3.5">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-bold">{r.name}</p>
                    <Badge className={cn("border-0 font-semibold", r.tone)}>{r.pct}%</Badge>
                  </div>
                  <p className="text-muted-foreground mt-1 text-xs">{r.flag}</p>
                  <div className="mt-2 flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 text-xs font-semibold">
                      <MessageSquare className="mr-1 size-3.5" /> Message
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 text-xs font-semibold">
                      Flag mentor
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-gradient-ink text-ink-foreground shadow-elevated border-0">
            <CardContent className="p-6">
              <LineChart className="text-success size-5" />
              <p className="font-display mt-3 text-base font-extrabold">Insight</p>
              <p className="text-ink-foreground/70 mt-1 text-sm">
                Learners who attend both live classes weekly score 14 pts higher on average.
                Consider pairing at-risk students with mentors for the next 3 weeks.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
