import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  BookOpen,
  CalendarDays,
  ClipboardCheck,
  Clock3,
  FolderOpen,
  GraduationCap,
  LayoutTemplate,
  LineChart,
  ListTodo,
  MessageSquare,
  Target,
  UserCheck,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/portal/intern")({
  head: () => ({
    meta: [
      { title: "Intern — CEA-OS" },
      {
        name: "description",
        content: "Intern portal: projects, milestones, mentorship and evaluations.",
      },
    ],
  }),
  component: InternPortal,
});

const projects = [
  {
    name: "Design system tokens audit",
    owner: "Product team",
    progress: 80,
    status: "On track",
    tone: "bg-success/10 text-success",
  },
  {
    name: "Community newsletter build",
    owner: "Marketing",
    progress: 45,
    status: "At risk",
    tone: "bg-warning/10 text-warning",
  },
  {
    name: "Onboarding flow QA",
    owner: "Platform",
    progress: 100,
    status: "Done",
    tone: "bg-primary/10 text-primary",
  },
];

const milestones = [
  {
    t: "Weekly 1:1 with mentor",
    d: "Every Mon · 16:00",
    status: "Scheduled",
    tone: "bg-primary/10 text-primary",
  },
  {
    t: "Mid-point evaluation",
    d: "Aug 14",
    status: "Upcoming",
    tone: "bg-warning/10 text-warning",
  },
  { t: "Final presentation", d: "Aug 28", status: "Locked", tone: "bg-learning/10 text-learning" },
];

const screens = [
  {
    icon: LayoutTemplate,
    label: "Hub",
    desc: "Intern overview and goals",
    path: "/app/intern",
    tone: "bg-primary/10 text-primary",
  },
  {
    icon: ListTodo,
    label: "Tasks",
    desc: "Sprint tasks and assignments",
    path: "/app/intern/tasks",
    tone: "bg-success/10 text-success",
  },
  {
    icon: Clock3,
    label: "Timesheet",
    desc: "Log hours and timesheets",
    path: "/app/intern/timesheet",
    tone: "bg-learning/10 text-learning",
  },
  {
    icon: Users,
    label: "Mentorship",
    desc: "Mentor sessions and check-ins",
    path: "/app/intern/mentorship",
    tone: "bg-warning/10 text-warning",
  },
  {
    icon: BookOpen,
    label: "Learning plan",
    desc: "Track your learning track",
    path: "/app/intern/learning-plan",
    tone: "bg-career/10 text-career",
  },
  {
    icon: ClipboardCheck,
    label: "Evaluation",
    desc: "Mid-point and final reviews",
    path: "/app/intern/evaluation",
    tone: "bg-community/10 text-community",
  },
  {
    icon: FolderOpen,
    label: "Portfolio",
    desc: "Projects and case studies",
    path: "/app/intern/portfolio",
    tone: "bg-erp/10 text-erp",
  },
  {
    icon: MessageSquare,
    label: "Messaging",
    desc: "Chat with your team",
    path: "/app/intern/messages",
    tone: "bg-services/10 text-services",
  },
];

function InternPortal() {
  return (
    <AppShell
      roleKey="student"
      title="Intern workspace"
      subtitle="Product design intern · cohort Aug 2026 · week 4 of 8"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            Mentor: Adaeze O.
          </Badge>
          <Badge variant="secondary" className="font-semibold">
            Week 4 · 50%
          </Badge>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Projects",
            value: "3",
            delta: "1 done · 1 at risk",
            icon: Target,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Hours this week",
            value: "31",
            delta: "goal 40",
            icon: LineChart,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Skills badges",
            value: "4",
            delta: "1 pending",
            icon: Award,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Mentor feedback",
            value: "3.5h",
            delta: "this month",
            icon: UserCheck,
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

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.5fr_1fr]">
        <Card className="bg-card shadow-soft border">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <GraduationCap className="text-primary size-4" /> Project board
            </CardTitle>
            <Button variant="outline" size="sm" className="font-semibold">
              Log hours
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {projects.map((p) => (
              <div key={p.name} className="rounded-xl border p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="text-sm font-bold">{p.name}</p>
                    <p className="text-muted-foreground text-xs">{p.owner}</p>
                  </div>
                  <Badge className={cn("border-0 font-semibold", p.tone)}>{p.status}</Badge>
                </div>
                <div className="bg-muted mt-3 h-1.5 overflow-hidden rounded-full">
                  <div
                    className="bg-gradient-brand h-full rounded-full"
                    style={{ width: `${p.progress}%` }}
                  />
                </div>
                <p className="text-muted-foreground mt-1.5 text-xs font-semibold">
                  {p.progress}% complete
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-5">
          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <CalendarDays className="text-primary size-4" /> Milestones
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {milestones.map((m) => (
                <div
                  key={m.t}
                  className="flex items-center justify-between gap-2 rounded-xl border p-3"
                >
                  <div>
                    <p className="text-sm font-semibold">{m.t}</p>
                    <p className="text-muted-foreground text-xs">{m.d}</p>
                  </div>
                  <Badge className={cn("border-0 font-semibold", m.tone)}>{m.status}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <BookOpen className="text-primary size-4" /> Learning track
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { t: "Component library deep-dive", v: "Done", tone: "bg-success/10 text-success" },
                {
                  t: "Usability testing basics",
                  v: "In progress",
                  tone: "bg-primary/10 text-primary",
                },
                {
                  t: "Presentation skills",
                  v: "Queued",
                  tone: "bg-muted-foreground/10 text-muted-foreground",
                },
              ].map((x) => (
                <div key={x.t} className="flex items-center justify-between rounded-xl border p-3">
                  <span className="text-sm font-semibold">{x.t}</span>
                  <Badge className={cn("border-0 font-semibold", x.tone)}>{x.v}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-gradient-ink text-ink-foreground shadow-elevated border-0">
            <CardContent className="p-6">
              <Target className="text-success size-5" />
              <p className="font-display mt-3 text-base font-extrabold">Conversion plan</p>
              <p className="text-ink-foreground/70 mt-1 text-sm">
                Strong trajectory — final evaluation gates: project delivery, mentor sign-off and
                presentation score.
              </p>
              <Button asChild size="sm" className="bg-gradient-brand shadow-glow mt-4 border-0">
                <Link to="/portal/career-services">
                  Career services <ArrowRight className="ml-1 size-3.5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      <Card className="bg-card mt-5 shadow-soft border">
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <LayoutTemplate className="text-primary size-4" /> Workspace
          </CardTitle>
          <Badge variant="secondary" className="font-semibold">
            {screens.length} modules
          </Badge>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
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
