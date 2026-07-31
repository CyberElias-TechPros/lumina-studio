import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  CalendarCheck,
  CalendarDays,
  CircleAlert,
  Clock3,
  FileText,
  GraduationCap,
  LayoutDashboard,
  ListChecks,
  Megaphone,
  Plus,
  ShieldCheck,
  TrendingUp,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/instructor/")({
  head: () => ({
    meta: [
      { title: "Instructor Dashboard — CEA-OS" },
      {
        name: "description",
        content: "Your courses, grading queue and today's classes at a glance.",
      },
    ],
  }),
  component: InstructorDashboard,
});

const workspace = [
  {
    to: "/app/instructor/courses",
    label: "Course builder",
    desc: "Modules, lessons, publishing",
    icon: BookOpen,
    tone: "bg-primary/10 text-primary",
  },
  {
    to: "/app/instructor/assignments",
    label: "Assignments",
    desc: "Briefs and submissions",
    icon: FileText,
    tone: "bg-learning/10 text-learning",
  },
  {
    to: "/app/instructor/assessments",
    label: "Assessment engine",
    desc: "Quizzes, exams, auto-grading",
    icon: ShieldCheck,
    tone: "bg-success/10 text-success",
  },
  {
    to: "/app/instructor/gradebook",
    label: "Gradebook",
    desc: "Weights, scores, disputes",
    icon: GraduationCap,
    tone: "bg-primary/10 text-primary",
  },
  {
    to: "/app/instructor/attendance",
    label: "Attendance",
    desc: "Live classes, roll calls",
    icon: Users,
    tone: "bg-warning/10 text-warning",
  },
  {
    to: "/app/instructor/analytics",
    label: "Analytics",
    desc: "Retention, at-risk learners",
    icon: BarChart3,
    tone: "bg-learning/10 text-learning",
  },
  {
    to: "/app/instructor/calendar",
    label: "Calendar",
    desc: "Classes, office hours",
    icon: CalendarDays,
    tone: "bg-career/10 text-career",
  },
  {
    to: "/app/instructor/announcements",
    label: "Announcements",
    desc: "Cohort-wide updates",
    icon: Megaphone,
    tone: "bg-warning/10 text-warning",
  },
  {
    to: "/app/instructor/lessons/create",
    label: "New lesson",
    desc: "Build a lesson from scratch",
    icon: Plus,
    tone: "bg-success/10 text-success",
  },
];

const classesToday = [
  {
    t: "09:00",
    title: "Backend & APIs · live lab",
    place: "Lab B3 · Yaba campus",
    tone: "bg-gradient-learning",
  },
  {
    t: "12:00",
    title: "System design · mock interviews",
    place: "Zoom · link sent 08:00",
    tone: "bg-gradient-erp",
  },
  {
    t: "16:00",
    title: "Office hours",
    place: "Room 12 · first come, first served",
    tone: "bg-gradient-services",
  },
];

const queue = [
  {
    student: "Chiamaka Eze",
    item: "REST API Assignment 3",
    course: "Backend & APIs",
    submitted: "Jul 31 · 09:12",
    due: "Due today",
    tone: "bg-warning/10 text-warning",
  },
  {
    student: "Ibrahim Sule",
    item: "SQL Fundamentals Quiz",
    course: "Backend & APIs",
    submitted: "Jul 30 · 18:40",
    due: "Due today",
    tone: "bg-warning/10 text-warning",
  },
  {
    student: "Funke Adeyemi",
    item: "Auth & JWT Lab",
    course: "Backend & APIs",
    submitted: "Jul 30 · 14:22",
    due: "Due Aug 1",
    tone: "bg-primary/10 text-primary",
  },
  {
    student: "Tunde Bakare",
    item: "Middleware Take-home",
    course: "Backend & APIs",
    submitted: "Jul 29 · 21:05",
    due: "Due Aug 1",
    tone: "bg-primary/10 text-primary",
  },
  {
    student: "Ngozi Umeh",
    item: "Data Modelling Brief",
    course: "Frontend Foundations",
    submitted: "Jul 29 · 10:30",
    due: "Overdue",
    tone: "bg-error/10 text-error",
  },
];

function InstructorDashboard() {
  return (
    <AppShell
      roleKey="instructor"
      title="Instructor dashboard"
      subtitle="Backend & APIs · Cohort 15 · term 2 · week 8"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            6 courses active
          </Badge>
          <Badge variant="secondary" className="font-semibold">
            23 items awaiting grading
          </Badge>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Active students",
            value: "128",
            delta: "+9 this week",
            icon: Users,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Pending grading",
            value: "23",
            delta: "4 due today",
            icon: ListChecks,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Completion rate",
            value: "84%",
            delta: "+3.2% vs last term",
            icon: TrendingUp,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Avg class attendance",
            value: "91%",
            delta: "vs 85% target",
            icon: CalendarCheck,
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
            <LayoutDashboard className="text-primary size-4" /> Workspace
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {workspace.map((s) => (
            <Link
              key={s.to}
              to={s.to}
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

      <div className="mt-5 grid gap-5 xl:grid-cols-2">
        <Card className="bg-card shadow-soft border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <CalendarDays className="text-primary size-4" /> Today's classes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {classesToday.map((c) => (
              <div key={c.t} className={cn("rounded-2xl p-4 text-white", c.tone)}>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="bg-white/15 grid size-10 shrink-0 place-items-center rounded-xl">
                      <Clock3 className="size-4" />
                    </span>
                    <div>
                      <p className="font-display text-sm font-extrabold">{c.title}</p>
                      <p className="text-white/70 text-xs">{c.place}</p>
                    </div>
                  </div>
                  <Badge className="bg-white/15 text-white border-0 font-semibold">{c.t}</Badge>
                </div>
              </div>
            ))}
            <Button asChild variant="outline" size="sm" className="w-full font-semibold">
              <Link to="/app/instructor/calendar">
                Open calendar <ArrowRight className="ml-1 size-3.5" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-card shadow-soft border">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <ListChecks className="text-primary size-4" /> Pending grading queue
            </CardTitle>
            <Badge className="bg-error/10 text-error border-0 font-semibold">1 overdue</Badge>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Item</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {queue.map((q) => (
                  <TableRow key={q.student}>
                    <TableCell>
                      <p className="text-xs font-bold">{q.student}</p>
                      <p className="text-muted-foreground text-[11px]">{q.course}</p>
                    </TableCell>
                    <TableCell className="text-xs font-semibold">{q.item}</TableCell>
                    <TableCell className="text-muted-foreground text-xs">{q.submitted}</TableCell>
                    <TableCell>
                      <Badge className={cn("border-0 font-semibold", q.tone)}>{q.due}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" className="text-xs font-semibold">
                        Grade
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex flex-wrap items-center gap-3 border-t p-4 text-xs">
              <CircleAlert className="text-error size-4 shrink-0" />
              <p className="text-muted-foreground flex-1 font-semibold">
                Ngozi's data modelling brief slipped past the grace window — flag for mentor
                outreach after grading.
              </p>
              <Button size="sm" className="bg-gradient-brand border-0">
                Grade all
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
