import { createFileRoute, Link } from "@tanstack/react-router";
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
import { AppShell } from "@/components/app/app-shell";
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

const tasks = [
  { t: "Weekend cleaning rota", a: "Facilities team", d: "Today · 5/5 done", done: true },
  { t: "ISP failover test", a: "IT support", d: "Today · 17:00", done: false },
  { t: "Store stock count — Block A", a: "Store keeper", d: "Thu · 08:00", done: false },
  { t: "Security patrol log review", a: "Security lead", d: "Fri · 16:00", done: false },
];

const workflows = [
  { w: "Visitor pass workflow", r: "18 runs this week", tone: "bg-success/10 text-success" },
  { w: "Supplier delivery intake", r: "11 runs this week", tone: "bg-primary/10 text-primary" },
  {
    w: "Classroom readiness checklist",
    r: "9 runs this week",
    tone: "bg-learning/10 text-learning",
  },
];

function OperationsTasks() {
  return (
    <AppShell
      roleKey="instructor"
      title="Task management"
      subtitle="Ops board · 12 open · 4 due today"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">On-time 91%</Badge>
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
            value: "12",
            delta: "4 due today",
            icon: ClipboardList,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Done this week",
            value: "38",
            delta: "across 6 teams",
            icon: CheckCircle2,
            tone: "bg-success/10 text-success",
          },
          {
            label: "On-time rate",
            value: "91%",
            delta: "last 30 days",
            icon: Gauge,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Workflows live",
            value: "6",
            delta: "38 runs/week",
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
            {tasks.map((t) => (
              <div
                key={t.t}
                className={cn(
                  "flex items-center gap-3 rounded-xl border p-3",
                  t.done && "opacity-60",
                )}
              >
                <CheckCircle2
                  className={cn(
                    "size-4 shrink-0",
                    t.done ? "text-success" : "text-muted-foreground",
                  )}
                />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold">{t.t}</p>
                  <p className="text-muted-foreground text-xs">
                    {t.a} · {t.d}
                  </p>
                </div>
                <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                  {t.done ? "View" : "Assign"}
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-card shadow-soft border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <CalendarCheck2 className="text-primary size-4" /> Automated workflows
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {workflows.map((w) => (
              <div key={w.w} className="flex items-center justify-between rounded-xl border p-3">
                <div>
                  <p className="text-sm font-bold">{w.w}</p>
                  <p className="text-muted-foreground mt-0.5 text-xs">{w.r}</p>
                </div>
                <Badge className={cn("border-0 font-semibold", w.tone)}>Active</Badge>
              </div>
            ))}
            <Button variant="outline" size="sm" className="w-full font-semibold">
              Open automation builder
            </Button>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
