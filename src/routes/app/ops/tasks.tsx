"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import {
  ArrowLeft,
  CalendarCheck2,
  CheckCircle2,
  ClipboardList,
  Gauge,
  UserRound,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { useOpsTasks, useOpsTaskItems, useWorkflows, useWorkflowItems } from "@/lib/query/ops";
import type { OpsTask, Workflow } from "@/lib/api/ops";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/ops/tasks")({
  head: () => ({
    meta: [
      { title: "Operations Tasks — CEA-OS" },
      { name: "description", content: "Assign, track and run operational workflows." },
    ],
  }),
  component: OperationsTasks,
});

function OperationsTasks() {
  const tasksQuery = useOpsTasks();
  const tasks = useOpsTaskItems();
  const workflowsQuery = useWorkflows();
  const workflows = useWorkflowItems();

  const open = tasks.filter((t) => t.done === 0).length;
  const done = tasks.filter((t) => t.done === 1).length;
  const completion = tasks.length > 0 ? Math.round((done / tasks.length) * 100) : 0;
  const live = workflows.filter((w) => w.status === "active").length;

  return (
    <AppShell
      roleKey="ops"
      title="Task management"
      subtitle={tasks.length > 0 ? `Ops board · ${open} open · ${done} done` : "Loading tasks…"}
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            {completion}% complete
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/portal/operations">
              <ArrowLeft className="size-4" /> Operations
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Open tasks",
            value: tasks.length > 0 ? String(open) : "—",
            delta: `${tasks.length} total`,
            icon: ClipboardList,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Done",
            value: done > 0 ? String(done) : "—",
            delta: "completed tasks",
            icon: CheckCircle2,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Completion rate",
            value: tasks.length > 0 ? `${completion}%` : "—",
            delta: "of tracked tasks",
            icon: Gauge,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Workflows live",
            value: workflows.length > 0 ? String(live) : "—",
            delta: `${workflows.length} total`,
            icon: CalendarCheck2,
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

      <div className="mt-5 grid gap-5 xl:grid-cols-2">
        <Card className="bg-card shadow-soft border">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <ClipboardList className="text-primary size-4" /> Active tasks
            </CardTitle>
            <Button variant="outline" size="sm" className="font-semibold">
              New task
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            <QueryState<OpsTask[]>
              query={tasksQuery}
              error={{ title: "Tasks unavailable" }}
              empty={{
                title: "No tasks yet",
                description: "Assigned operational tasks will show here.",
              }}
              isEmpty={(rows) => rows.length === 0}
            >
              {(rows) => (
                <>
                  {rows.map((t) => (
                    <div
                      key={t.id}
                      className={cn(
                        "flex items-center gap-3 rounded-xl border p-3",
                        t.done === 1 && "opacity-60",
                      )}
                    >
                      <CheckCircle2
                        className={cn(
                          "size-4 shrink-0",
                          t.done === 1 ? "text-success" : "text-muted-foreground",
                        )}
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold">{t.title}</p>
                        <p className="text-muted-foreground text-xs">
                          {t.assignee} · {t.detail}
                        </p>
                      </div>
                      <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                        {t.done === 1 ? "View" : "Assign"}
                      </Button>
                    </div>
                  ))}
                </>
              )}
            </QueryState>
          </CardContent>
        </Card>

        <Card className="bg-card shadow-soft border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <CalendarCheck2 className="text-primary size-4" /> Automated workflows
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <QueryState<Workflow[]>
              query={workflowsQuery}
              error={{ title: "Workflows unavailable" }}
              empty={{
                title: "No workflows yet",
                description: "Automated operations workflows will show here.",
              }}
              isEmpty={(rows) => rows.length === 0}
            >
              {(rows) => (
                <>
                  {rows.map((w) => (
                    <div
                      key={w.id}
                      className="flex items-center justify-between rounded-xl border p-3"
                    >
                      <div>
                        <p className="text-sm font-bold">{w.name}</p>
                        <p className="text-muted-foreground mt-0.5 text-xs">{w.stats}</p>
                      </div>
                      <Badge className="border-0 bg-success/10 font-semibold text-success">
                        Active
                      </Badge>
                    </div>
                  ))}
                </>
              )}
            </QueryState>
            <Button asChild variant="outline" size="sm" className="w-full font-semibold">
              <Link to="/app/ops/automation">
                <UserRound className="size-4" /> Open automation builder
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
