import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock,
  FileText,
  FolderOpen,
  Send,
  Timer,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { useAssignments } from "@/lib/query/assignments";
import type { StudentAssignment } from "@/data/learning";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/assignments/")({
  head: () => ({
    meta: [
      { title: "Assignments — CEA-OS" },
      { name: "description", content: "All your assignments, deadlines, submissions and grades." },
    ],
  }),
  component: AssignmentsCenter,
});

const statusTone: Record<string, string> = {
  pending: "bg-warning/10 text-warning",
  draft: "bg-muted-foreground/10 text-muted-foreground",
  submitted: "bg-primary/10 text-primary",
  graded: "bg-success/10 text-success",
};

const statusLabel: Record<string, string> = {
  pending: "Not started",
  draft: "Draft saved",
  submitted: "Submitted",
  graded: "Graded",
};

function AssignmentsCenter() {
  const assignmentsQuery = useAssignments();
  const items = assignmentsQuery.data?.pages.flatMap((p) => p.items) ?? [];

  const graded = items.filter((a) => a.status === "graded").length;
  const submitted = items.filter((a) => a.status === "submitted").length;
  const pending = items.filter((a) => a.status === "pending").length;
  const dueSoon = items.filter((a) => a.status !== "graded");

  return (
    <AppShell
      roleKey="student"
      title="Assignments"
      subtitle="Term 2 · all courses · sorted by deadline"
      actions={
        <>
          <Badge className="bg-warning/10 text-warning border-0 font-semibold">
            {pending} not started
          </Badge>
          <Badge variant="secondary" className="font-semibold">
            {submitted + graded} of {items.length} done
          </Badge>
        </>
      }
    >
      <QueryState<StudentAssignment[]>
        query={assignmentsQuery}
        error={{ title: "Assignments unavailable" }}
      >
        {(rows) => (
          <>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[
                {
                  label: "Active",
                  value: String(rows.length),
                  delta: "this term",
                  icon: FileText,
                  tone: "bg-primary/10 text-primary",
                },
                {
                  label: "Submitted",
                  value: String(submitted),
                  delta: "awaiting grade",
                  icon: Send,
                  tone: "bg-learning/10 text-learning",
                },
                {
                  label: "Graded",
                  value: String(graded),
                  delta: "avg 90.5%",
                  icon: CheckCircle2,
                  tone: "bg-success/10 text-success",
                },
                {
                  label: "Hours until due",
                  value: "8h",
                  delta: "REST API · tonight",
                  icon: Timer,
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

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {dueSoon.map((a) => (
                <Link
                  key={a.id}
                  to="/app/assignments/$assignmentId"
                  params={{ assignmentId: a.id }}
                  className="group bg-card shadow-soft hover:shadow-elevated flex flex-col rounded-2xl border p-5 transition-all hover:-translate-y-0.5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span
                      className={cn(
                        "grid size-10 shrink-0 place-items-center rounded-xl",
                        a.status === "pending"
                          ? "bg-warning/10 text-warning"
                          : "bg-primary/10 text-primary",
                      )}
                    >
                      <FolderOpen className="size-5" />
                    </span>
                    <Badge className={cn("border-0 font-semibold", statusTone[a.status])}>
                      {statusLabel[a.status]}
                    </Badge>
                  </div>
                  <p className="font-display mt-4 text-sm font-extrabold">{a.title}</p>
                  <p className="text-muted-foreground mt-1 text-xs font-semibold">{a.course}</p>
                  <p className="text-muted-foreground mt-3 line-clamp-2 text-xs leading-relaxed">
                    {a.description}
                  </p>
                  <div className="mt-auto flex items-center justify-between gap-3 border-t pt-4">
                    <span className="text-muted-foreground flex items-center gap-1.5 text-xs">
                      <CalendarDays className="size-3.5" /> {a.due}
                    </span>
                    <Button variant="ghost" size="sm" className="text-primary font-semibold">
                      Open <ArrowRight className="ml-1 size-3.5" />
                    </Button>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-5">
              <Card className="bg-card shadow-soft border">
                <CardContent className="divide-y">
                  {rows.map((a) => (
                    <Link
                      key={a.id}
                      to="/app/assignments/$assignmentId"
                      params={{ assignmentId: a.id }}
                      className="flex flex-wrap items-center gap-3 py-4 first:pt-2 last:pb-0"
                    >
                      <span className="bg-muted text-muted-foreground grid size-9 shrink-0 place-items-center rounded-lg">
                        <FileText className="size-4" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold">{a.title}</p>
                        <p className="text-muted-foreground text-xs">
                          {a.course} · weight {a.weight}%
                        </p>
                      </div>
                      {a.status === "graded" && a.score !== undefined ? (
                        <div className="flex items-center gap-3">
                          <Progress value={a.score} className="h-1.5 w-24" />
                          <Badge className="bg-primary/10 text-primary w-12 justify-center border-0 font-bold">
                            {a.score}%
                          </Badge>
                        </div>
                      ) : (
                        <span className="text-muted-foreground flex items-center gap-1.5 text-xs">
                          <Clock className="size-3.5" /> {a.due}
                        </span>
                      )}
                      <Badge className={cn("border-0 font-semibold", statusTone[a.status])}>
                        {statusLabel[a.status]}
                      </Badge>
                    </Link>
                  ))}
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </QueryState>
    </AppShell>
  );
}
