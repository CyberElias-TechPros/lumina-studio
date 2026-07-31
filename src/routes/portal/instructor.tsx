import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  ClipboardCheck,
  FileText,
  GraduationCap,
  LayoutDashboard,
  LineChart,
  MessageSquare,
  PenTool,
  ShieldCheck,
  TrendingUp,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/portal/instructor")({
  head: () => ({
    meta: [
      { title: "Instructor Portal — CEA-OS" },
      {
        name: "description",
        content:
          "Your teaching workspace: course builder, assignment review, gradebook, attendance and analytics.",
      },
    ],
  }),
  component: InstructorPortal,
});

const myCourses = [
  {
    title: "Backend, APIs & Databases",
    cohort: "Cohort 15 · 42 learners",
    pct: 82,
    next: "Week 12 · Auth & Security",
  },
  {
    title: "Systems Design",
    cohort: "Cohort 14 · 38 learners",
    pct: 64,
    next: "Week 9 · Scaling Databases",
  },
  { title: "DevOps Fundamentals", cohort: "Cohort 16 (prep)", pct: 12, next: "Curriculum review" },
];

const queue = [
  {
    task: "Grade — REST API submission (Cohort 15)",
    due: "12 pending · due today",
    tone: "bg-warning/10 text-warning",
  },
  {
    task: "Review — Capstone milestone 2 (Cohort 14)",
    due: "8 pending · due Fri",
    tone: "bg-primary/10 text-primary",
  },
  {
    task: "Approve — Cohort 16 curriculum changes",
    due: "1 pending · by Aug 14",
    tone: "bg-erp/10 text-erp",
  },
];

const attendance = [
  { cohort: "Cohort 15 · Live class Mon", pct: 93 },
  { cohort: "Cohort 14 · Live class Wed", pct: 87 },
  { cohort: "Cohort 15 · Lab session Sat", pct: 79 },
];

function InstructorPortal() {
  return (
    <AppShell
      roleKey="instructor"
      title="Instructor portal"
      subtitle="Week 12 · 3 courses · 96 learners across cohorts"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">On schedule</Badge>
          <Badge variant="secondary" className="font-semibold">
            Student rating: 4.8/5
          </Badge>
          <Button asChild variant="outline" size="sm" className="ml-auto">
            <Link to="/portal/mentor">Mentor view</Link>
          </Button>
        </>
      }
    >
      <div className="flex flex-wrap gap-2">
        {[
          {
            to: "/app/instructor/courses/$courseId",
            label: "Course builder",
            params: { courseId: "backend-apis" },
          },
          { to: "/app/instructor/assignments", label: "Assignments" },
          { to: "/app/instructor/gradebook", label: "Gradebook" },
          { to: "/app/instructor/attendance", label: "Attendance" },
          { to: "/app/instructor/analytics", label: "Analytics" },
        ].map((m) => (
          <Button asChild key={m.label} variant="outline" size="sm" className="font-semibold">
            <Link to={m.to} params={m.params}>
              {m.label}
            </Link>
          </Button>
        ))}
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Active learners",
            value: "96",
            delta: "+12 this term",
            icon: Users,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Assignments pending",
            value: "21",
            delta: "12 due today",
            icon: ClipboardCheck,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Avg. cohort grade",
            value: "82%",
            delta: "+3% vs last term",
            icon: GraduationCap,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Course builder",
            value: "3",
            delta: "1 in draft",
            icon: PenTool,
            tone: "bg-erp/10 text-erp",
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

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.4fr_1fr]">
        <div className="space-y-5">
          <Card className="bg-card shadow-soft border">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <BookOpen className="text-primary size-4" /> My courses
              </CardTitle>
              <Button asChild variant="ghost" size="sm" className="text-primary font-semibold">
                <Link to="/app/instructor/courses/$courseId" params={{ courseId: "backend-apis" }}>
                  Course builder <ArrowRight className="ml-1 size-3.5" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {myCourses.map((c) => (
                <div key={c.title} className="rounded-xl border p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-display text-sm font-bold">{c.title}</p>
                    <span className="text-muted-foreground text-xs font-semibold">{c.cohort}</span>
                  </div>
                  <Progress value={c.pct} className="mt-2.5 h-1.5" />
                  <p className="text-muted-foreground mt-2.5 flex items-center gap-1.5 text-xs">
                    <CalendarDays className="size-3.5" /> {c.next}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-card shadow-soft border">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <ClipboardCheck className="text-primary size-4" /> Review queue
              </CardTitle>
              <Badge className="bg-error/10 text-error border-0 font-semibold">21 items</Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              {queue.map((q) => (
                <div key={q.task} className="flex items-start gap-3 rounded-xl border p-3.5">
                  <span
                    className={cn("grid size-8 shrink-0 place-items-center rounded-lg", q.tone)}
                  >
                    <FileText className="size-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold">{q.task}</p>
                    <p className="text-muted-foreground mt-0.5 text-xs">{q.due}</p>
                  </div>
                  <Button variant="outline" size="sm" className="shrink-0">
                    Open
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-5">
          <Card className="bg-card shadow-soft border">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <LineChart className="text-primary size-4" /> Class attendance
              </CardTitle>
              <TrendingUp className="text-success size-4" />
            </CardHeader>
            <CardContent className="space-y-4">
              {attendance.map((a) => (
                <div key={a.cohort}>
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span>{a.cohort}</span>
                    <span
                      className={
                        a.pct >= 90 ? "text-success" : a.pct >= 80 ? "text-warning" : "text-error"
                      }
                    >
                      {a.pct}%
                    </span>
                  </div>
                  <Progress value={a.pct} className="mt-1.5 h-1.5" />
                </div>
              ))}
              <p className="text-muted-foreground border-t pt-3 text-xs">
                At-risk learners: <strong className="text-warning">4</strong> — auto-flagged for
                mentor outreach.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <LayoutDashboard className="text-primary size-4" /> Today
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { time: "09:00", t: "Staff standup", tag: "Ops", tone: "text-erp" },
                {
                  time: "16:00",
                  t: "Mentor circle — Cohort 15",
                  tag: "Mentor",
                  tone: "text-community",
                },
                {
                  time: "18:00",
                  t: "Live class · Auth & Security",
                  tag: "Class",
                  tone: "text-learning",
                },
              ].map((e) => (
                <div key={e.time} className="flex items-center gap-3 rounded-xl border p-3">
                  <span className="font-display text-muted-foreground w-12 text-xs font-bold">
                    {e.time}
                  </span>
                  <p className="min-w-0 flex-1 truncate text-sm font-semibold">{e.t}</p>
                  <Badge
                    variant="outline"
                    className={cn("border-0 bg-transparent font-bold", e.tone)}
                  >
                    {e.tag}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-card shadow-soft border">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <MessageSquare className="text-primary size-4" /> Messages
              </CardTitle>
              <Badge className="bg-error/10 text-error h-5 border-0 text-[10px] font-bold">
                3 unread
              </Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { from: "QA Office", msg: "Cohort 15 module 12 review is due Friday.", time: "1h" },
                {
                  from: "Adaeze Okafor",
                  msg: "Can I get an extension on the API assignment? (Sick this week)",
                  time: "3h",
                },
              ].map((m) => (
                <div key={m.from} className="flex items-start gap-3 rounded-xl border p-3">
                  <span className="bg-gradient-erp text-white font-display grid size-9 shrink-0 place-items-center rounded-full text-[10px] font-bold">
                    {m.from
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="flex items-center justify-between text-xs font-bold">
                      {m.from} <span className="text-muted-foreground font-medium">{m.time}</span>
                    </p>
                    <p className="text-muted-foreground mt-0.5 text-xs leading-relaxed">{m.msg}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-gradient-ink text-ink-foreground shadow-elevated border-0">
            <CardContent className="p-6">
              <ShieldCheck className="text-career size-5" />
              <p className="font-display mt-3 text-base font-extrabold">Assessment integrity</p>
              <p className="text-ink-foreground/70 mt-1 text-sm">
                Auto-plagiarism scans ran on 42 submissions — 1 flagged, resolved with the learner.
              </p>
              <Button asChild size="sm" className="bg-gradient-brand shadow-glow mt-4 border-0">
                <Link to="/app">
                  Assessment engine <ArrowRight className="ml-1 size-3.5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
