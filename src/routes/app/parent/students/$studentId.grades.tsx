import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, BookOpen, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { useParentStudent } from "@/lib/query/parent";
import type { ParentStudentDetail } from "@/lib/api/parent";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/parent/students/$studentId/grades")({
  head: () => ({
    meta: [
      { title: "Academic Progress — CEA-OS" },
      { name: "description", content: "Gradebook view for parents." },
    ],
  }),
  component: ParentStudentGrades,
});

function trendLabel(trend: string): string {
  if (trend === "+") return "Improving";
  if (trend === "-") return "Slipping";
  return "Steady";
}

function ParentStudentGrades() {
  const { studentId } = Route.useParams();
  const student = useParentStudent(studentId);
  const data = student.data;

  return (
    <AppShell
      roleKey="parent"
      title="Academic progress"
      subtitle={data ? `${data.name} · mid-term` : "Loading…"}
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            {data ? `GPA ${data.gpa} / 4.0` : "GPA …"}
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/parent/students/$studentId" params={{ studentId }}>
              <ArrowLeft className="size-4" /> Overview
            </Link>
          </Button>
        </>
      }
    >
      <QueryState<ParentStudentDetail>
        query={student}
        error={{ title: "Gradebook unavailable" }}
        empty={{
          title: "No grades yet",
          description: "Gradebook entries appear here once assessed.",
        }}
      >
        {(current) => {
          const rows = current.gradebook ?? [];
          const avg = rows.length
            ? Math.round(rows.reduce((s, g) => s + g.pct, 0) / rows.length)
            : 0;
          const aGrades = rows.filter((g) => g.letter?.startsWith("A")).length;
          const units = rows.reduce((s, g) => s + (g.units ?? 0), 0);
          const kpis = [
            {
              label: "Cumulative GPA",
              value: current.gpa,
              delta: "4.0 scale",
              icon: TrendingUp,
              tone: "bg-primary/10 text-primary",
            },
            {
              label: "Course average",
              value: rows.length ? `${avg}%` : "—",
              delta: rows.length ? "across gradebook" : "no grades",
              icon: BookOpen,
              tone: "bg-learning/10 text-learning",
            },
            {
              label: "A grades",
              value: rows.length ? `${aGrades} of ${rows.length}` : "—",
              delta: "this term",
              icon: BookOpen,
              tone: "bg-success/10 text-success",
            },
            {
              label: "Credit units",
              value: String(units),
              delta: "earned so far",
              icon: BookOpen,
              tone: "bg-warning/10 text-warning",
            },
          ];
          return (
            <>
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
                      <p className="text-muted-foreground mt-0.5 text-xs font-semibold">
                        {k.delta}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-card mt-5 shadow-soft border">
                <CardHeader>
                  <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                    <BookOpen className="text-primary size-4" /> Gradebook
                  </CardTitle>
                </CardHeader>
                <CardContent className="divide-y">
                  {rows.map((c) => (
                    <div
                      key={c.courseName}
                      className="flex flex-wrap items-center gap-4 py-4 first:pt-0 last:pb-0"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold">{c.courseName}</p>
                        <p className="text-muted-foreground text-xs">
                          {c.units} {c.units === 1 ? "unit" : "units"} · {trendLabel(c.trend)}
                        </p>
                      </div>
                      <span className="bg-success/10 text-success rounded-md px-2 py-0.5 text-xs font-bold">
                        {c.pct}%
                      </span>
                      <Progress value={c.pct} className="h-1.5 w-24" />
                      <Badge className="bg-primary/10 text-primary w-10 justify-center border-0 font-bold">
                        {c.letter}
                      </Badge>
                    </div>
                  ))}
                  <p className="text-muted-foreground pt-3 text-xs">
                    Grade disputes can be raised with the academic board within 7 days of release.
                  </p>
                </CardContent>
              </Card>
            </>
          );
        }}
      </QueryState>
    </AppShell>
  );
}
