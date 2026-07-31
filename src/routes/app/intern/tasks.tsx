import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CheckCircle2, Clock3, ListTodo } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
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

const tasks = [
  {
    t: "CI pipeline fix — Jenkins job",
    d: "Due Fri · DevOps",
    s: "In progress",
    tone: "bg-warning/10 text-warning",
  },
  {
    t: "Monitoring dashboard widgets",
    d: "Due Aug 12 · Data",
    s: "Assigned",
    tone: "bg-primary/10 text-primary",
  },
  {
    t: "Infra docs update",
    d: "Due Aug 15 · Docs",
    s: "Assigned",
    tone: "bg-learning/10 text-learning",
  },
  { t: "Load test report", d: "Done Jul 29", s: "Approved", tone: "bg-success/10 text-success" },
];

function InternTasks() {
  return (
    <AppShell
      roleKey="student"
      title="Tasks"
      subtitle="12 total · 2 due this week · 1 in review"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">On-time 90%</Badge>
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
            value: "7",
            delta: "2 due this week",
            icon: ListTodo,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "In review",
            value: "1",
            delta: "with supervisor",
            icon: Clock3,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Approved",
            value: "4",
            delta: "this month",
            icon: CheckCircle2,
            tone: "bg-success/10 text-success",
          },
          {
            label: "On-time rate",
            value: "90%",
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
          {tasks.map((t) => (
            <div key={t.t} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{t.t}</p>
                <p className="text-muted-foreground text-xs">{t.d}</p>
              </div>
              <Badge className={cn("border-0 font-semibold", t.tone)}>{t.s}</Badge>
              <Button asChild variant="outline" size="sm" className="shrink-0 font-semibold">
                <Link to="/app/intern/portfolio">
                  Submit <ArrowRight className="ml-1 size-3.5" />
                </Link>
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
