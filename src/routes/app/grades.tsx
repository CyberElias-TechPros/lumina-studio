import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  Download,
  GraduationCap,
  Scale,
  ShieldCheck,
  TrendingDown,
  TrendingUp,
  Minus,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { useGradebook } from "@/lib/query/courses";
import type { GradebookCourse } from "@/data/learning";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/grades")({
  head: () => ({
    meta: [
      { title: "Gradebook — CEA-OS" },
      { name: "description", content: "Your grades, assessments, GPA and term progress." },
    ],
  }),
  component: GradebookPage,
});

const gradeColor = (pct: number) =>
  pct >= 90
    ? "text-success"
    : pct >= 80
      ? "text-primary"
      : pct >= 70
        ? "text-warning"
        : "text-error";

function GradebookPage() {
  const gradebookQuery = useGradebook();
  const gradebookItems = gradebookQuery.data?.pages.flatMap((p) => p.items) ?? [];
  const units = gradebookItems.reduce((sum, c) => sum + c.units, 0);
  const gpa =
    units > 0
      ? (gradebookItems.reduce((sum, c) => sum + c.units * c.pct, 0) / units / 20).toFixed(2)
      : "0.00";

  return (
    <AppShell
      roleKey="student"
      title="Gradebook"
      subtitle="Term 2 · Mid-term · all assessments"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            GPA {gpa} / 5.0
          </Badge>
          <Badge variant="secondary" className="font-semibold">
            Top 5% of cohort
          </Badge>
        </>
      }
    >
      <QueryState<GradebookCourse[]>
        query={gradebookQuery}
        error={{ title: "Gradebook unavailable" }}
      >
        {(items) => {
          const rows = items;
          return (
            <>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  {
                    label: "Term GPA",
                    value: gpa,
                    delta: "+0.1 vs mid-term",
                    icon: GraduationCap,
                    tone: "bg-primary/10 text-primary",
                  },
                  {
                    label: "Best course",
                    value: "94%",
                    delta: "Career Readiness",
                    icon: Award,
                    tone: "bg-success/10 text-success",
                  },
                  {
                    label: "Assessments done",
                    value: "17 / 19",
                    delta: "2 due this month",
                    icon: Scale,
                    tone: "bg-learning/10 text-learning",
                  },
                  {
                    label: "Disputes",
                    value: "0",
                    delta: "window closes Aug 28",
                    icon: ShieldCheck,
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
                      <p className="text-muted-foreground mt-0.5 text-xs font-semibold">
                        {k.delta}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-5 space-y-5">
                {rows.map((course) => {
                  const TrendIcon =
                    course.trend === "+" ? TrendingUp : course.trend === "-" ? TrendingDown : Minus;
                  return (
                    <Card key={course.name} className="bg-card shadow-soft border">
                      <CardHeader className="flex-row items-center justify-between">
                        <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                          {course.name}
                          <Badge variant="secondary" className="font-semibold">
                            {course.units} units
                          </Badge>
                        </CardTitle>
                        <div className="flex items-center gap-3">
                          <TrendIcon
                            className={cn(
                              "size-4",
                              course.trend === "+"
                                ? "text-success"
                                : course.trend === "-"
                                  ? "text-error"
                                  : "text-muted-foreground",
                            )}
                          />
                          <span
                            className={cn(
                              "font-display text-lg font-extrabold",
                              gradeColor(course.pct),
                            )}
                          >
                            {course.pct}%
                          </span>
                          <Badge className="bg-primary/10 text-primary w-11 justify-center border-0 font-bold">
                            {course.letter}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="overflow-x-auto">
                          <table className="w-full min-w-[480px] text-sm">
                            <thead>
                              <tr className="text-muted-foreground border-b text-left text-[11px] font-bold tracking-wide uppercase">
                                <th className="py-2 pr-4">Assessment</th>
                                <th className="py-2 pr-4">Type</th>
                                <th className="py-2 pr-4">Weight</th>
                                <th className="py-2 pr-4">Score</th>
                                <th className="py-2 text-right">Grade</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y">
                              {course.items.map((item) => (
                                <tr key={item.name}>
                                  <td className="py-3 pr-4 font-semibold">{item.name}</td>
                                  <td className="text-muted-foreground py-3 pr-4 text-xs font-semibold capitalize">
                                    {item.kind}
                                  </td>
                                  <td className="text-muted-foreground py-3 pr-4 text-xs font-semibold">
                                    {item.weight}%
                                  </td>
                                  <td className="text-muted-foreground py-3 pr-4 text-xs font-semibold">
                                    {item.score} / {item.max}
                                  </td>
                                  <td className="text-right">
                                    <Progress
                                      value={(item.score / item.max) * 100}
                                      className="ml-auto h-1.5 w-24"
                                    />
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                <p className="text-muted-foreground text-xs">
                  Weighted average across {units} units — grades final after the Aug 28 dispute
                  window.
                </p>
                <Button variant="outline" size="sm" className="font-semibold">
                  <Download className="mr-1.5 size-3.5" /> Export transcript (PDF)
                </Button>
              </div>

              <Card className="bg-gradient-ink text-ink-foreground shadow-elevated mt-5 border-0">
                <CardContent className="flex flex-wrap items-center gap-4 p-6">
                  <span className="bg-ink-foreground/10 grid size-10 place-items-center rounded-xl">
                    <TrendingUp className="text-success size-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-sm font-extrabold">Trend: strong</p>
                    <p className="text-ink-foreground/70 text-xs">
                      Three courses trending up at mid-term. Keep the pace and your projected term
                      GPA clears 4.4.
                    </p>
                  </div>
                  <Button asChild size="sm" className="bg-gradient-brand shadow-glow border-0">
                    <Link to="/app/learn">
                      Keep learning <ArrowRight className="ml-1 size-3.5" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </>
          );
        }}
      </QueryState>
    </AppShell>
  );
}
