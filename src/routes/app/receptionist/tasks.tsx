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

const tasks = [
  { t: "Morning mail to registrar", d: "08:30 · done", done: true },
  { t: "Verify visitor badges after lunch", d: "13:00", done: false },
  { t: "Update phone log follow-ups", d: "15:00", done: false },
  { t: "Handover notes + desk report", d: "17:00", done: false },
];

const handover = [
  { t: "Oluwaseun waiting — remind Mr. Adeyemi", tone: "bg-warning/10 text-warning" },
  { t: "Printer toner at desk for IT pickup", tone: "bg-primary/10 text-primary" },
  { t: "Tour group booked 14:30 (12 people)", tone: "bg-learning/10 text-learning" },
];

function ReceptionistTasks() {
  return (
    <AppShell
      roleKey="student"
      title="Shift & tasks"
      subtitle="Morning shift · 08:00–17:00 · desk 1"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">3 tasks left</Badge>
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
            value: "7",
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
            value: "3",
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
                  <p className="text-sm font-medium">{t.t}</p>
                  <p className="text-muted-foreground text-xs">{t.d}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-card shadow-soft border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <Sun className="text-primary size-4" /> Handover for evening desk
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {handover.map((h) => (
              <div key={h.t} className="rounded-xl border p-3">
                <Badge className={cn("border-0 font-semibold", h.tone)}>Pass on</Badge>
                <p className="mt-2 text-sm font-medium">{h.t}</p>
              </div>
            ))}
            <Button variant="outline" size="sm" className="w-full font-semibold">
              <CalendarDays className="size-3.5" /> Submit shift report
            </Button>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
