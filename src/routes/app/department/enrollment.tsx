import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, ClipboardList, GraduationCap, UserRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/department/enrollment")({
  head: () => ({
    meta: [
      { title: "Enrollment Overview — CEA-OS" },
      { name: "description", content: "Cohort sizes, retention and capacity." },
    ],
  }),
  component: DepartmentEnrollment,
});

const cohorts = [
  {
    t: "Cohort 15 — Full-Stack",
    size: 48,
    target: 50,
    pct: 96,
    status: "Active",
    tone: "bg-success/10 text-success",
  },
  {
    t: "Cohort 16 — Full-Stack",
    size: 42,
    target: 50,
    pct: 84,
    status: "Admitting",
    tone: "bg-primary/10 text-primary",
  },
  {
    t: "Cohort 14 — DevOps",
    size: 36,
    target: 40,
    pct: 90,
    status: "Active",
    tone: "bg-success/10 text-success",
  },
  {
    t: "Cohort 16 — Product Design",
    size: 30,
    target: 40,
    pct: 75,
    status: "Admitting",
    tone: "bg-warning/10 text-warning",
  },
];

function DepartmentEnrollment() {
  return (
    <AppShell
      roleKey="instructor"
      title="Enrollment overview"
      subtitle="Software Engineering · 4 active cohorts"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">Retention 91%</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/portal/department-head">
              <ArrowLeft className="size-4" /> Department overview
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Enrolled",
            value: "156",
            delta: "across 4 cohorts",
            icon: GraduationCap,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Capacity",
            value: "86%",
            delta: "180 seats total",
            icon: ClipboardList,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Retention (term)",
            value: "91%",
            delta: "+2 pts vs last",
            icon: CheckCircle2,
            tone: "bg-success/10 text-success",
          },
          {
            label: "At-risk students",
            value: "7",
            delta: "review list ready",
            icon: UserRound,
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

      <Card className="bg-card mt-5 shadow-soft border">
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <GraduationCap className="text-primary size-4" /> Cohorts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {cohorts.map((c) => (
            <div key={c.t} className="rounded-xl border p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-bold">{c.t}</p>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground text-xs font-semibold">
                    {c.size} / {c.target} students
                  </span>
                  <Badge className={cn("border-0 font-semibold", c.tone)}>{c.status}</Badge>
                </div>
              </div>
              <div className="bg-muted mt-2.5 h-1.5 overflow-hidden rounded-full">
                <div className="bg-primary h-full rounded-full" style={{ width: `${c.pct}%` }} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
