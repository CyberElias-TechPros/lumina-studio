import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle2,
  GitBranch,
  GitPullRequest,
  ListTodo,
  UserRound,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/dev/tasks")({
  head: () => ({
    meta: [
      { title: "Dev Tasks — CEA-OS" },
      { name: "description", content: "Sprint board and assignments." },
    ],
  }),
  component: DevTasks,
});

const tasks = [
  {
    t: "CEA-214 · Invoice PDF regression",
    d: "Sprint 14 · in progress",
    s: "Doing",
    tone: "bg-primary/10 text-primary",
  },
  {
    t: "CEA-218 · Webhook retry logic",
    d: "Sprint 14 · ready",
    s: "Todo",
    tone: "bg-warning/10 text-warning",
  },
  {
    t: "CEA-205 · Portals nav caching",
    d: "Sprint 13 · done",
    s: "Done",
    tone: "bg-success/10 text-success",
  },
];

function DevTasks() {
  return (
    <AppShell
      roleKey="instructor"
      title="Tasks"
      subtitle="Sprint 14 · 9 done · 5 doing · 4 todo"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">50% done</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/dev">
              <ArrowLeft className="size-4" /> Dev hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Todo",
            value: "4",
            delta: "2 blocked",
            icon: ListTodo,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "In progress",
            value: "5",
            delta: "1 today",
            icon: GitBranch,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Done",
            value: "9",
            delta: "sprint 14",
            icon: CheckCircle2,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Assignees",
            value: "4",
            delta: "engineers",
            icon: UserRound,
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
            <GitPullRequest className="text-primary size-4" /> Sprint 14
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          {tasks.map((t) => (
            <div key={t.t} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="font-mono text-sm font-bold">{t.t}</p>
                <p className="text-muted-foreground text-xs">{t.d}</p>
              </div>
              <Badge className={cn("border-0 font-semibold", t.tone)}>{t.s}</Badge>
              <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                Open
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
