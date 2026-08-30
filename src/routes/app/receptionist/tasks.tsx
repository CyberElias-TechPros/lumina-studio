import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Clock3,
  ListTodo,
  Moon,
  Sun,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import {
  useRecTasks,
  useRecTaskItems,
  useUpdateRecTask,
  useRecHandover,
  useRecHandoverItems,
} from "@/lib/query/volunteerReceptionist";
import type { RecTask, RecHandoverNote } from "@/lib/api/volunteerReceptionist";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/receptionist/tasks")({
  head: () => ({
    meta: [
      { title: "Shift & Tasks — CEA-OS" },
      { name: "description", content: "Front desk shift handover and tasks." },
    ],
  }),
  component: ReceptionistTasks,
});

const handoverTones = [
  "bg-warning/10 text-warning",
  "bg-primary/10 text-primary",
  "bg-learning/10 text-learning",
];

function ReceptionistTasks() {
  const tasksQuery = useRecTasks();
  const tasks = useRecTaskItems();
  const handoverQuery = useRecHandover();
  const handover = useRecHandoverItems();
  const updateTask = useUpdateRecTask();

  const done = tasks.filter((t) => t.done === 1).length;
  const left = tasks.length > 0 ? tasks.length - done : 0;

  return (
    <AppShell
      roleKey="receptionist"
      title="Shift & tasks"
      subtitle="Morning shift · 08:00–17:00 · desk 1"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            {tasks.length > 0 ? `${left} tasks left` : "3 tasks left"}
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/portal/receptionist">
              <ArrowLeft className="size-4" /> Front desk
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Tasks today",
            value: tasks.length > 0 ? String(tasks.length) : "—",
            delta: "4 done · 3 left",
            icon: ListTodo,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Checklist",
            value: "100%",
            delta: "morning pass",
            icon: CheckCircle2,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Shift length",
            value: "9h",
            delta: "one break taken",
            icon: Clock3,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Handover items",
            value: handover.length > 0 ? String(handover.length) : "—",
            delta: "for evening desk",
            icon: Moon,
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
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <ClipboardList className="text-primary size-4" /> My tasks
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <QueryState<RecTask[]>
              query={tasksQuery}
              error={{ title: "Tasks unavailable" }}
              empty={{ title: "No tasks", description: "Your shift tasks will show here." }}
              isEmpty={(rows) => rows.length === 0}
            >
              {(rows) => (
                <>
                  {rows.map((t) => {
                    const isDone = t.done === 1;
                    return (
                      <div
                        key={t.id}
                        className={cn(
                          "flex items-center gap-3 rounded-xl border p-3",
                          isDone && "opacity-60",
                        )}
                      >
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="size-8 shrink-0"
                          aria-label={isDone ? `Mark ${t.title} incomplete` : `Complete ${t.title}`}
                          disabled={updateTask.isPending}
                          onClick={() => updateTask.mutate({ id: t.id, done: !isDone })}
                        >
                          <CheckCircle2
                            className={cn(
                              "size-4",
                              isDone ? "text-success" : "text-muted-foreground",
                            )}
                          />
                        </Button>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium">{t.title}</p>
                          <p className="text-muted-foreground text-xs">{t.timeLabel}</p>
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
            </QueryState>
          </CardContent>
        </Card>

        <Card className="bg-card shadow-soft border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <Sun className="text-primary size-4" /> Handover for evening desk
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <QueryState<RecHandoverNote[]>
              query={handoverQuery}
              error={{ title: "Handover unavailable" }}
              empty={{ title: "Nothing to pass on", description: "Handover notes will show here." }}
              isEmpty={(rows) => rows.length === 0}
            >
              {(rows) => (
                <>
                  {rows.map((h, i) => (
                    <div key={h.id} className="rounded-xl border p-3">
                      <Badge
                        className={cn(
                          "border-0 font-semibold",
                          handoverTones[i % handoverTones.length],
                        )}
                      >
                        Pass on
                      </Badge>
                      <p className="mt-2 text-sm font-medium">{h.note}</p>
                    </div>
                  ))}
                </>
              )}
            </QueryState>
            <Button variant="outline" size="sm" className="w-full font-semibold">
              <CalendarDays className="size-3.5" /> Submit shift report
            </Button>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
