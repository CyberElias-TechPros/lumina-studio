import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  BookOpenCheck,
  GraduationCap,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/director/academic")({
  head: () => ({
    meta: [
      { title: "Academic Overview — CEA-OS" },
      { name: "description", content: "Enrollment, completion and placement across programs." },
    ],
  }),
  component: DirectorAcademic,
});

const programs = [
  {
    p: "Full-Stack Software Development",
    e: "68 / 90",
    c: "86%",
    t: "88%",
    tone: "bg-primary/10 text-primary",
  },
  {
    p: "Cybersecurity Analyst",
    e: "54 / 60",
    c: "91%",
    t: "88%",
    tone: "bg-success/10 text-success",
  },
  {
    p: "Cloud Engineering & DevOps",
    e: "42 / 50",
    c: "79%",
    t: "88%",
    tone: "bg-warning/10 text-warning",
  },
  {
    p: "Data Science & Applied AI",
    e: "31 / 40",
    c: "84%",
    t: "88%",
    tone: "bg-learning/10 text-learning",
  },
];

function DirectorAcademic() {
  return (
    <AppShell
      roleKey="admin"
      title="Academic overview"
      subtitle="Q3 · 214 enrolled · 84% completion · 71% placement"
      actions={
        <>
          <Badge className="bg-warning/10 text-warning border-0 font-semibold">
            1 program amber
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/portal/director">
              <ArrowLeft className="size-4" /> Director portal
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Enrolled",
            value: "214",
            delta: "target 240",
            icon: GraduationCap,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Completion",
            value: "84%",
            delta: "target 88%",
            icon: BookOpenCheck,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Placement (14)",
            value: "71%",
            delta: "target 75%",
            icon: TrendingUp,
            tone: "bg-career/10 text-career",
          },
          {
            label: "Dropouts (30d)",
            value: "6",
            delta: "1.8% of cohort",
            icon: Users,
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
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <Target className="text-primary size-4" /> Program health
          </CardTitle>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/director/reports">
              Drill down <ArrowRight className="ml-1 size-3.5" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent className="divide-y">
          {programs.map((p) => (
            <div key={p.p} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{p.p}</p>
                <p className="text-muted-foreground text-xs">
                  Enrolled {p.e} · completion {p.c}
                </p>
              </div>
              <Badge className={cn("border-0 font-semibold", p.tone)}>target {p.t}</Badge>
              <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                Review
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
