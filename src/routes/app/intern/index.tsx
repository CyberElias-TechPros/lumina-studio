import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  CalendarCheck2,
  Clock3,
  ListTodo,
  Target,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import {
  useIntMentorSessionItems,
  useIntTaskItems,
  useIntTimesheetItems,
} from "@/lib/query/internDashboard";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/intern/")({
  head: () => ({
    meta: [
      { title: "Intern Hub — CEA-OS" },
      {
        name: "description",
        content: "Your internship: tasks, timesheet, mentorship and evaluation.",
      },
    ],
  }),
  component: InternHub,
});

const screens = [
  {
    icon: ListTodo,
    label: "Tasks",
    desc: "Assigned, submit deliverables",
    path: "/app/intern/tasks",
    tone: "bg-primary/10 text-primary",
  },
  {
    icon: Clock3,
    label: "Timesheet",
    desc: "Log hours, approvals",
    path: "/app/intern/timesheet",
    tone: "bg-learning/10 text-learning",
  },
  {
    icon: Target,
    label: "Mentorship",
    desc: "Sessions and notes",
    path: "/app/intern/mentorship",
    tone: "bg-success/10 text-success",
  },
  {
    icon: Briefcase,
    label: "Learning plan",
    desc: "Milestones and skills",
    path: "/app/intern/learning-plan",
    tone: "bg-warning/10 text-warning",
  },
  {
    icon: CalendarCheck2,
    label: "Evaluation",
    desc: "Self, supervisor, final",
    path: "/app/intern/evaluation",
    tone: "bg-career/10 text-career",
  },
];

function InternHub() {
  const tasks = useIntTaskItems();
  const timesheets = useIntTimesheetItems();
  const sessions = useIntMentorSessionItems();

  const openTasks = tasks.filter(
    (t) => t.status === "assigned" || t.status === "in-progress",
  ).length;
  const hoursLogged = timesheets.reduce((n, w) => n + w.hours, 0);
  const upcoming = sessions.find((s) => s.status === "upcoming");
  const decided = tasks.filter((t) => t.status === "approved" || t.status === "in-review");
  const onTime =
    decided.length > 0
      ? Math.round((tasks.filter((t) => t.status === "approved").length / decided.length) * 100)
      : 0;

  return (
    <AppShell
      roleKey="student"
      title="Intern hub"
      subtitle={
        tasks.length > 0
          ? `DevOps track · week 6 of 12 · ${openTasks} open tasks, ${hoursLogged}h logged`
          : "DevOps track · week 6 of 12 · supervisor: Ms. Chidera"
      }
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">On track</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/portal/intern">
              <ArrowLeft className="size-4" /> Intern portal
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Tasks",
            value: tasks.length > 0 ? String(tasks.length) : "—",
            delta: `${openTasks} due this week`,
            icon: ListTodo,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Hours logged",
            value: timesheets.length > 0 ? `${hoursLogged}h` : "—",
            delta: "of 480 target",
            icon: Clock3,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Mentor sessions",
            value: sessions.length > 0 ? String(sessions.length) : "—",
            delta: upcoming ? `next ${upcoming.dateText}` : "no upcoming",
            icon: Target,
            tone: "bg-success/10 text-success",
          },
          {
            label: "On-time rate",
            value: tasks.length > 0 ? `${onTime}%` : "—",
            delta: "midpoint review",
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

      <Card className="bg-card mt-5 shadow-soft border">
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <Briefcase className="text-primary size-4" /> Intern workspace
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {screens.map((s) => (
            <Link
              key={s.path}
              to={s.path}
              className="group bg-card shadow-soft hover:shadow-elevated flex flex-col rounded-xl border p-4 transition-all hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between">
                <span className={cn("grid size-9 place-items-center rounded-lg", s.tone)}>
                  <s.icon className="size-4" />
                </span>
                <ArrowRight className="text-muted-foreground group-hover:text-primary size-4 transition-colors" />
              </div>
              <p className="font-display mt-3 text-sm font-extrabold">{s.label}</p>
              <p className="text-muted-foreground mt-1 text-xs">{s.desc}</p>
            </Link>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
