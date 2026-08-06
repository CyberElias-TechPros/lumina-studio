import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CheckCircle2, Clock3, ListTodo } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import { useIntTaskItems, useIntTasks } from "@/lib/query/internDashboard";
import type { IntTask } from "@/lib/api/internDashboard";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/intern/tasks")({
  head: () => ({
    meta: [
      { title: "Intern Tasks — CEA-OS" },
      { name: "description", content: "Assigned tasks and deliverables." },
    ],
  }),
  component: InternTasks,
});

const statusBadge: Record<string, { label: string; tone: string }> = {
  assigned: { label: "Assigned", tone: "bg-primary/10 text-primary" },
  "in-progress": { label: "In progress", tone: "bg-warning/10 text-warning" },
  "in-review": { label: "In review", tone: "bg-learning/10 text-learning" },
  approved: { label: "Approved", tone: "bg-success/10 text-success" },
};

function InternTasks() {
  const tasksQuery = useIntTasks();
  const tasks = useIntTaskItems();

  const open = tasks.filter((t) => t.status === "assigned" || t.status === "in-progress").length;
  const inReview = tasks.filter((t) => t.status === "in-review").length;
  const approved = tasks.filter((t) => t.status === "approved").length;
  const dueThisWeek = tasks.filter((t) => t.dueLabel.toLowerCase().startsWith("due")).length;
  const onTime =
    open + inReview + approved > 0
      ? Math.round((approved / (open + inReview + approved)) * 100)
      : 0;

  return (
    <AppShell
      roleKey="student"
      title="Tasks"
      subtitle={
        tasks.length > 0
          ? `${tasks.length} total · ${dueThisWeek} due this week · ${inReview} in review`
          : "Loading your tasks…"
      }
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            On-time {onTime}%
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/intern">
              <ArrowLeft className="size-4" /> Intern hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Open",
            value: tasks.length > 0 ? String(open) : "—",
            delta: `${dueThisWeek} due this week`,
            icon: ListTodo,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "In review",
            value: tasks.length > 0 ? String(inReview) : "—",
            delta: "with supervisor",
            icon: Clock3,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Approved",
            value: tasks.length > 0 ? String(approved) : "—",
            delta: "this month",
            icon: CheckCircle2,
            tone: "bg-success/10 text-success",
          },
          {
            label: "On-time rate",
            value: tasks.length > 0 ? `${onTime}%` : "—",
            delta: "last 30 days",
            icon: ListTodo,
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
            <ListTodo className="text-primary size-4" /> My tasks
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          <QueryState<IntTask[]>
            query={tasksQuery}
            error={{ title: "Tasks unavailable" }}
            empty={{ title: "No tasks yet", description: "Assigned tasks will show here." }}
            isEmpty={(rows) => rows.length === 0}
          >
            {(rows) => (
              <>
                {rows.map((t) => {
                  const meta = statusBadge[t.status] ?? {
                    label: t.status,
                    tone: "bg-muted text-muted-foreground",
                  };
                  return (
                    <div
                      key={t.id}
                      className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold">{t.title}</p>
                        <p className="text-muted-foreground text-xs">
                          {t.dueLabel} · {t.category}
                        </p>
                      </div>
                      <Badge className={cn("border-0 font-semibold", meta.tone)}>
                        {meta.label}
                      </Badge>
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="shrink-0 font-semibold"
                      >
                        <Link to="/app/intern/portfolio">
                          Submit <ArrowRight className="ml-1 size-3.5" />
                        </Link>
                      </Button>
                    </div>
                  );
                })}
              </>
            )}
          </QueryState>
        </CardContent>
      </Card>
    </AppShell>
  );
}
