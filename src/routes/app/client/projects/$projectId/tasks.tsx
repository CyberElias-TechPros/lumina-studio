import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, ClipboardCheck, Clock3, ListTodo } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import type { CliTask } from "@/lib/query/clientEngagement";
import { useCliTasks } from "@/lib/query/clientEngagement";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/client/projects/$projectId/tasks")({
  head: () => ({
    meta: [
      { title: "Project Tasks — CEA-OS" },
      { name: "description", content: "Comment and approve deliverables." },
    ],
  }),
  component: ClientProjectTasks,
});

function statusTone(s: string) {
  const l = s.toLowerCase();
  if (l.includes("approved") || l.includes("done")) return "bg-success/10 text-success";
  if (l.includes("review")) return "bg-warning/10 text-warning";
  if (l.includes("doing") || l.includes("progress")) return "bg-primary/10 text-primary";
  return "bg-muted-foreground/10 text-muted-foreground";
}

function ClientProjectTasks() {
  const tasksQuery = useCliTasks();

  return (
    <AppShell
      roleKey="client"
      title="Project tasks"
      subtitle="Platform rebuild · 14 tasks · 8 approved"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">57% done</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/client/projects/$projectId" params={{ projectId: "platform-rebuild" }}>
              <ArrowLeft className="size-4" /> Project
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Open",
            value: "6",
            delta: "3 in review",
            icon: ListTodo,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Approved",
            value: "8",
            delta: "of 14 total",
            icon: CheckCircle2,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Awaiting you",
            value: "2",
            delta: "approvals needed",
            icon: ClipboardCheck,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "On track",
            value: "87%",
            delta: "milestones",
            icon: Clock3,
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
            <ListTodo className="text-primary size-4" /> Tasks
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          <QueryState<CliTask[]>
            query={tasksQuery}
            error={{ title: "Tasks unavailable" }}
            empty={{
              title: "No tasks",
              description: "Project tasks will appear here.",
            }}
            isEmpty={(rows) => rows.length === 0}
          >
            {(rows) => (
              <>
                {rows.map((t) => (
                  <div
                    key={t.id}
                    className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold">{t.title}</p>
                      <p className="text-muted-foreground text-xs">
                        {t.kind} · {t.detail}
                      </p>
                    </div>
                    <Badge className={cn("border-0 font-semibold", statusTone(t.status))}>
                      {t.status}
                    </Badge>
                    <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                      Open
                    </Button>
                  </div>
                ))}
              </>
            )}
          </QueryState>
        </CardContent>
      </Card>
    </AppShell>
  );
}
