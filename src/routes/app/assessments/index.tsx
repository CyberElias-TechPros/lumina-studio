import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Award, CalendarDays, CheckCircle2, Clock, FileQuestion } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { useAssessments } from "@/lib/query/assessments";
import type { Assessment } from "@/data/learning";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/assessments/")({
  head: () => ({
    meta: [
      { title: "Assessments — CEA-OS" },
      { name: "description", content: "Quizzes, tests and exams — windows, attempts and scores." },
    ],
  }),
  component: AssessmentsPage,
});

const tone: Record<string, string> = {
  available: "bg-primary/10 text-primary",
  scheduled: "bg-learning/10 text-learning",
  done: "bg-success/10 text-success",
  overdue: "bg-error/10 text-error",
};

function AssessmentsPage() {
  const assessmentsQuery = useAssessments();
  const items = assessmentsQuery.data?.pages.flatMap((p) => p.items) ?? [];
  const available = items.filter((a) => a.status === "available").length;
  const done = items.filter((a) => a.status === "done").length;

  return (
    <AppShell
      roleKey="assessments"
      title="Assessments"
      subtitle="Quizzes, tests and exams · windows and attempts"
      actions={
        <>
          <Badge className="bg-primary/10 text-primary border-0 font-semibold">
            {available} open now
          </Badge>
          <Badge variant="secondary" className="font-semibold">
            {done} completed
          </Badge>
        </>
      }
    >
      <QueryState<Assessment[]>
        query={assessmentsQuery}
        error={{ title: "Assessments unavailable" }}
      >
        {(rows) => (
          <>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[
                {
                  label: "Available now",
                  value: String(available),
                  delta: "1 closes Sunday",
                  icon: FileQuestion,
                  tone: "bg-primary/10 text-primary",
                },
                {
                  label: "Completed",
                  value: String(done),
                  delta: "avg 88.3%",
                  icon: CheckCircle2,
                  tone: "bg-success/10 text-success",
                },
                {
                  label: "Scheduled",
                  value: "1",
                  delta: "term exam · Aug 20",
                  icon: CalendarDays,
                  tone: "bg-learning/10 text-learning",
                },
                {
                  label: "Proctoring",
                  value: "Auto",
                  delta: "tab-lock + camera",
                  icon: Award,
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

            <div className="mt-5 space-y-4">
              {rows.map((a) => {
                const canStart = a.status === "available";
                return (
                  <Card key={a.id} className="bg-card shadow-soft border">
                    <CardContent className="flex flex-wrap items-center gap-4 p-5">
                      <span
                        className={cn(
                          "grid size-11 shrink-0 place-items-center rounded-xl",
                          a.status === "done"
                            ? "bg-success/10 text-success"
                            : a.kind === "exam"
                              ? "bg-error/10 text-error"
                              : "bg-primary/10 text-primary",
                        )}
                      >
                        {a.kind === "exam" ? (
                          <Award className="size-5" />
                        ) : (
                          <FileQuestion className="size-5" />
                        )}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="font-display text-sm font-extrabold">{a.title}</p>
                        <p className="text-muted-foreground text-xs">
                          {a.course} · {a.kind} · {a.questions} questions · {a.duration}
                        </p>
                        <p className="text-muted-foreground mt-1 flex items-center gap-1.5 text-xs">
                          <CalendarDays className="size-3.5" /> {a.window}
                        </p>
                      </div>
                      <div className="text-right">
                        {a.status === "done" && a.score !== undefined && a.max ? (
                          <p className="font-display text-lg font-extrabold">
                            {a.score}/{a.max}
                          </p>
                        ) : (
                          <p className="text-muted-foreground flex items-center gap-1.5 text-xs font-semibold">
                            <Clock className="size-3.5" /> {a.attemptsLeft} attempts left
                          </p>
                        )}
                      </div>
                      <Badge className={cn("border-0 font-semibold", tone[a.status])}>
                        {a.status}
                      </Badge>
                      {canStart ? (
                        <Button asChild size="sm" className="bg-gradient-brand border-0">
                          <Link
                            to="/app/assessments/$assessmentId/take"
                            params={{ assessmentId: a.id }}
                          >
                            Start <ArrowRight className="ml-1 size-3.5" />
                          </Link>
                        </Button>
                      ) : a.status === "done" ? (
                        <Button asChild variant="outline" size="sm" className="font-semibold">
                          <Link
                            to="/app/assessments/$assessmentId/take"
                            params={{ assessmentId: a.id }}
                          >
                            Review <ArrowRight className="ml-1 size-3.5" />
                          </Link>
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm" className="font-semibold" disabled>
                          Locked
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </>
        )}
      </QueryState>
    </AppShell>
  );
}
