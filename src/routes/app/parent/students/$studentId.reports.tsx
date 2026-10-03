"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { ArrowLeft, BookOpen, GraduationCap, Receipt, UserCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { useParentStudent, useParentAttendance, useParentFinance } from "@/lib/query/parent";
import { formatNaira } from "@/data/site";
import type { ParentStudentDetail } from "@/lib/api/parent";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/parent/students/$studentId/reports")({
  head: () => ({
    meta: [
      { title: "Reports — CEA-OS" },
      { name: "description", content: "Term reports and progress summaries for parents." },
    ],
  }),
  component: ParentStudentReports,
});

const links = [
  {
    to: "/app/parent/students/$studentId/grades" as const,
    label: "Grades & gradebook",
    desc: "Scores, GPA and teacher comments",
    icon: BookOpen,
    tone: "text-primary bg-primary/10",
  },
  {
    to: "/app/parent/students/$studentId/attendance" as const,
    label: "Attendance",
    desc: "Present, late and excused records",
    icon: UserCheck,
    tone: "text-learning bg-learning/10",
  },
  {
    to: "/app/parent/students/$studentId/finance" as const,
    label: "Finance & billing",
    desc: "Invoices, receipts and payments",
    icon: Receipt,
    tone: "text-success bg-success/10",
  },
];

function ParentStudentReports() {
  const { studentId } = Route.useParams();
  const student = useParentStudent(studentId);
  const attendance = useParentAttendance(studentId);
  const finance = useParentFinance(studentId);
  const data = student.data;

  return (
    <AppShell
      roleKey="parent"
      title={data ? `${data.name} · Reports` : "Reports"}
      subtitle={data ? "live progress summaries" : "Loading…"}
      actions={
        <>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/parent/students/$studentId" params={{ studentId }}>
              <ArrowLeft className="size-4" /> Overview
            </Link>
          </Button>
        </>
      }
    >
      <QueryState<ParentStudentDetail>
        query={student}
        error={{ title: "Report data unavailable" }}
        empty={{
          title: "Record not found",
          description: "This learner is not linked to your account.",
        }}
      >
        {(current) => {
          const rows = current.gradebook ?? [];
          const courses = current.courses ?? [];
          const avg = rows.length
            ? Math.round(rows.reduce((s, g) => s + g.pct, 0) / rows.length)
            : 0;
          const summary = [
            {
              t: "GPA",
              v: current.gpa || "—",
              tone:
                Number(current.gpa) >= 3.5
                  ? "bg-success/10 text-success"
                  : "bg-warning/10 text-warning",
            },
            {
              t: "Term average",
              v: rows.length ? `${avg}%` : "—",
              tone: "bg-primary/10 text-primary",
            },
            {
              t: "Courses enrolled",
              v: String(courses.length),
              tone: "bg-learning/10 text-learning",
            },
            {
              t: "Attendance",
              v: attendance.data ? `${attendance.data.pct}%` : "—",
              tone:
                (attendance.data?.pct ?? 0) >= 90
                  ? "bg-success/10 text-success"
                  : "bg-warning/10 text-warning",
            },
            {
              t: "Paid to date",
              v: finance.data ? formatNaira(finance.data.totals.paid) : "—",
              tone: "bg-success/10 text-success",
            },
          ];
          return (
            <>
              <div className="grid gap-5 xl:grid-cols-[1.5fr_1fr]">
                <Card className="bg-card shadow-soft border">
                  <CardHeader>
                    <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                      <GraduationCap className="text-primary size-4" /> Live progress summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {summary.map((x) => (
                      <div
                        key={x.t}
                        className="flex items-center justify-between rounded-xl border p-3"
                      >
                        <span className="text-sm font-semibold">{x.t}</span>
                        <Badge className={cn("border-0 font-semibold", x.tone)}>{x.v}</Badge>
                      </div>
                    ))}
                    <p className="text-muted-foreground pt-1 text-xs">
                      Built from the live gradebook, attendance and billing records — no stale PDFs.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-card shadow-soft border">
                  <CardHeader>
                    <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                      <BookOpen className="text-primary size-4" /> Summary sources
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {links.map((s) => (
                      <Link
                        key={s.to}
                        to={s.to}
                        params={{ studentId }}
                        className="hover:bg-muted/50 flex items-center gap-3 rounded-xl border p-3 transition-colors"
                      >
                        <span
                          className={cn(
                            "grid size-9 shrink-0 place-items-center rounded-lg",
                            s.tone,
                          )}
                        >
                          <s.icon className="size-4" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-bold">{s.label}</p>
                          <p className="text-muted-foreground text-xs">{s.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </>
          );
        }}
      </QueryState>
    </AppShell>
  );
}
