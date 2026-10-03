"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CalendarDays,
  FileText,
  MessageSquare,
  Receipt,
  UserCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { useParentStudent } from "@/lib/query/parent";
import { formatNaira } from "@/data/site";
import type { ParentStudentDetail } from "@/lib/api/parent";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/parent/students/$studentId/")({
  head: () => ({
    meta: [
      { title: "Student Overview — CEA-OS" },
      { name: "description", content: "Academic progress, attendance, bills and communication." },
    ],
  }),
  component: ParentStudentOverview,
});

const sections = [
  {
    to: "/app/parent/students/$studentId/grades",
    label: "Grades & gradebook",
    desc: "Scores, GPA and teacher comments",
    icon: BookOpen,
    tone: "text-primary bg-primary/10",
  },
  {
    to: "/app/parent/students/$studentId/attendance",
    label: "Attendance",
    desc: "Present, late and excused records",
    icon: UserCheck,
    tone: "text-learning bg-learning/10",
  },
  {
    to: "/app/parent/students/$studentId/finance",
    label: "Finance & billing",
    desc: "Invoices, receipts, pay online",
    icon: Receipt,
    tone: "text-success bg-success/10",
  },
  {
    to: "/app/parent/students/$studentId/communication",
    label: "Communication",
    desc: "Message teachers and request meetings",
    icon: MessageSquare,
    tone: "text-warning bg-warning/10",
  },
  {
    to: "/app/parent/students/$studentId/reports",
    label: "Reports",
    desc: "Term reports and progress summaries",
    icon: FileText,
    tone: "text-erp bg-erp/10",
  },
];

const timetable = [
  { d: "Mon", s: "09:00 — Full-Stack Dev", t: "Mr. Adeyemi" },
  { d: "Tue", s: "10:00 — Cloud & DevOps", t: "Ms. Chidera" },
  { d: "Wed", s: "09:00 — Product Design", t: "Mr. Bello" },
  { d: "Thu", s: "11:00 — Career Readiness", t: "Career office" },
];

function ParentStudentOverview() {
  const { studentId } = Route.useParams();
  const student = useParentStudent(studentId);
  const data = student.data;

  return (
    <AppShell
      roleKey="parent"
      title={data ? data.name : "Student"}
      subtitle={
        data
          ? data.courses[0]
            ? `${data.courses[0].title} · Cohort ${data.courses[0].cohort}`
            : "No active enrollments"
          : "Loading…"
      }
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            {data
              ? `GPA ${data.gpa} · ${data.dueCount} ${data.dueCount === 1 ? "bill" : "bills"} due`
              : "Loading…"}
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/parent">
              <ArrowLeft className="size-4" /> All children
            </Link>
          </Button>
        </>
      }
    >
      <QueryState<ParentStudentDetail>
        query={student}
        error={{ title: "Student record unavailable" }}
        empty={{
          title: "Record not found",
          description: "This learner is not linked to your account.",
        }}
      >
        {(current) => {
          const currentCourses = current.courses ?? [];
          const top = currentCourses[0];
          const rows = current.gradebook ?? [];
          const avg = rows.length
            ? Math.round(rows.reduce((s, g) => s + g.pct, 0) / rows.length)
            : 0;
          const kpis = [
            {
              label: "Course progress",
              value: top ? `${top.pct}%` : "—",
              delta: top ? `${top.title}` : "no courses",
              icon: BookOpen,
              tone: "bg-primary/10 text-primary",
            },
            {
              label: "Courses",
              value: String(currentCourses.length),
              delta: "enrolled this term",
              icon: UserCheck,
              tone: "bg-learning/10 text-learning",
            },
            {
              label: "Balance due",
              value: formatNaira(current.due),
              delta:
                current.dueCount > 0
                  ? `${current.dueCount} ${current.dueCount === 1 ? "instalment" : "instalments"} outstanding`
                  : "all settled",
              icon: Receipt,
              tone: "bg-warning/10 text-warning",
            },
            {
              label: "Term average",
              value: rows.length ? `${avg}%` : "—",
              delta: rows.length ? `${rows.length} gradebook rows` : "no grades yet",
              icon: MessageSquare,
              tone: "bg-success/10 text-success",
            },
          ];
          return (
            <>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {kpis.map((k) => (
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
                      <p className="text-muted-foreground mt-0.5 text-xs font-semibold">
                        {k.delta}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-5 grid gap-5 xl:grid-cols-[1.5fr_1fr]">
                <Card className="bg-card shadow-soft border">
                  <CardHeader>
                    <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                      <BookOpen className="text-primary size-4" /> Progress at a glance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {currentCourses.length === 0 ? (
                      <p className="text-muted-foreground text-sm">No active enrollments yet.</p>
                    ) : (
                      currentCourses.map((c) => (
                        <div key={c.slug}>
                          <div className="flex items-center justify-between text-xs font-semibold">
                            <span>{c.title}</span>
                            <span className="text-muted-foreground">{c.pct}%</span>
                          </div>
                          <Progress value={c.pct} className="mt-1.5 h-1.5" />
                        </div>
                      ))
                    )}
                    <p className="text-muted-foreground pt-1 text-xs">
                      Latest term report and teacher comments live in Reports.
                    </p>
                  </CardContent>
                </Card>

                <div className="space-y-5">
                  <Card className="bg-card shadow-soft border">
                    <CardHeader>
                      <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                        <CalendarDays className="text-primary size-4" /> This week's timetable
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {timetable.map((s) => (
                        <div
                          key={s.d}
                          className="flex items-center justify-between rounded-xl border p-3"
                        >
                          <div>
                            <p className="text-sm font-semibold">{s.s}</p>
                            <p className="text-muted-foreground text-xs">{s.t}</p>
                          </div>
                          <Badge variant="secondary" className="font-semibold">
                            {s.d}
                          </Badge>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-ink text-ink-foreground shadow-elevated border-0">
                    <CardContent className="p-6">
                      <MessageSquare className="text-warning size-5" />
                      <p className="font-display mt-3 text-base font-extrabold">Mentor note</p>
                      <p className="text-ink-foreground/70 mt-1 text-sm">
                        Encourage consistent submissions — steady progress keeps the GPA at its
                        current level.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
                {sections.map((s) => (
                  <Link
                    key={s.to}
                    to={s.to}
                    params={{ studentId }}
                    className="group bg-card shadow-soft hover:shadow-elevated flex flex-col rounded-2xl border p-5 transition-all hover:-translate-y-0.5"
                  >
                    <span className={cn("grid size-10 place-items-center rounded-xl", s.tone)}>
                      <s.icon className="size-5" />
                    </span>
                    <p className="font-display mt-3 text-sm font-extrabold">{s.label}</p>
                    <p className="text-muted-foreground mt-1 flex-1 text-xs">{s.desc}</p>
                    <span className="text-primary mt-3 flex items-center gap-1 text-xs font-bold">
                      Open{" "}
                      <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                ))}
              </div>
            </>
          );
        }}
      </QueryState>
    </AppShell>
  );
}
