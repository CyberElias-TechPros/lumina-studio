"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { ArrowLeft, CalendarDays, Clock, UserCheck, Users, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { useParentAttendance, useParentStudent } from "@/lib/query/parent";
import type { ParentAttendance } from "@/lib/api/parent";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/parent/students/$studentId/attendance")({
  head: () => ({
    meta: [
      { title: "Attendance Report — CEA-OS" },
      { name: "description", content: "Attendance history for parents." },
    ],
  }),
  component: ParentStudentAttendance,
});

const statusMeta: Record<string, { label: string; tone: string }> = {
  present: { label: "Present", tone: "bg-success/10 text-success" },
  late: { label: "Late", tone: "bg-warning/10 text-warning" },
  excused: { label: "Excused", tone: "bg-primary/10 text-primary" },
  absent: { label: "Unexcused", tone: "bg-destructive/10 text-destructive" },
};

function formatDate(value: string): string {
  const parsed = new Date(`${value}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
}

function ParentStudentAttendance() {
  const { studentId } = Route.useParams();
  const attendance = useParentAttendance(studentId);
  const student = useParentStudent(studentId);
  const data = attendance.data;
  const name = student.data?.name;

  return (
    <AppShell
      roleKey="parent"
      title={name ? `${name} · Attendance` : "Attendance report"}
      subtitle={data ? `Term to date · ${data.pct}% overall` : "Loading…"}
      actions={
        <>
          <Badge
            className={cn(
              "border-0 font-semibold",
              (data?.pct ?? 0) >= 90 ? "bg-success/10 text-success" : "bg-warning/10 text-warning",
            )}
          >
            {data ? `${data.pct}% · above 90% policy` : "Loading…"}
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/parent/students/$studentId" params={{ studentId }}>
              <ArrowLeft className="size-4" /> Overview
            </Link>
          </Button>
        </>
      }
    >
      <QueryState<ParentAttendance>
        query={attendance}
        error={{ title: "Attendance record unavailable" }}
        empty={{
          title: "No sessions recorded",
          description: "Attendance tracking will appear once sessions are logged.",
        }}
      >
        {(current) => {
          const kpis = [
            {
              label: "Present",
              value: String(current.counts.present),
              delta: `of ${current.total} sessions`,
              icon: UserCheck,
              tone: "bg-success/10 text-success",
            },
            {
              label: "Late arrivals",
              value: String(current.counts.late),
              delta: "logged this term",
              icon: Clock,
              tone: "bg-warning/10 text-warning",
            },
            {
              label: "Excused",
              value: String(current.counts.excused),
              delta: "pre-approved absences",
              icon: CalendarDays,
              tone: "bg-primary/10 text-primary",
            },
            {
              label: "Unexcused",
              value: String(current.counts.absent),
              delta: "no strikes policy",
              icon: XCircle,
              tone: "bg-destructive/10 text-destructive",
            },
          ];
          const recent = [...current.items].reverse().slice(0, 8);
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
                      <CalendarDays className="text-primary size-4" /> Recent sessions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="divide-y">
                    {recent.length === 0 ? (
                      <p className="text-muted-foreground text-sm">No sessions recorded yet.</p>
                    ) : (
                      recent.map((r) => {
                        const meta = statusMeta[r.status.toLowerCase()] ?? {
                          label: r.status,
                          tone: "bg-muted text-muted-foreground",
                        };
                        return (
                          <div
                            key={r.id}
                            className="flex items-center gap-3 py-4 first:pt-0 last:pb-0"
                          >
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-bold">{r.note || "Session"}</p>
                              <p className="text-muted-foreground text-xs">{formatDate(r.date)}</p>
                            </div>
                            <Badge className={cn("border-0 font-semibold", meta.tone)}>
                              {meta.label}
                            </Badge>
                          </div>
                        );
                      })
                    )}
                  </CardContent>
                </Card>

                <Card className="bg-card shadow-soft border">
                  <CardHeader>
                    <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                      <Users className="text-primary size-4" /> Attendance policy
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      { t: "Minimum per term", v: "90%", tone: "bg-primary/10 text-primary" },
                      {
                        t: "Current standing",
                        v: `${current.pct}%`,
                        tone:
                          current.pct >= 90
                            ? "bg-success/10 text-success"
                            : "bg-warning/10 text-warning",
                      },
                      {
                        t: "Sessions on record",
                        v: String(current.total),
                        tone: "bg-learning/10 text-learning",
                      },
                    ].map((x) => (
                      <div
                        key={x.t}
                        className="flex items-center justify-between rounded-xl border p-3"
                      >
                        <span className="text-sm font-semibold">{x.t}</span>
                        <Badge className={cn("border-0 font-semibold", x.tone)}>{x.v}</Badge>
                      </div>
                    ))}
                    <p className="text-muted-foreground pt-1 text-xs">
                      Absences notify parents automatically within 30 minutes of class start.
                    </p>
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
