"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { ArrowLeft, CalendarClock, CheckCircle2, Clock3, UserRoundX } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { useEmployees, useLeaveRequests } from "@/lib/query/hr";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/hr/attendance")({
  head: () => ({
    meta: [
      { title: "Attendance — CEA-OS" },
      { name: "description", content: "Staff attendance, lateness and absenteeism." },
    ],
  }),
  component: HrAttendance,
});

function HrAttendance() {
  const employees = useEmployees();
  const leave = useLeaveRequests();

  const staff = employees.data?.pages.flatMap((p) => p.items) ?? [];
  const requests = leave.data?.pages.flatMap((p) => p.items) ?? [];

  const active = staff.filter((s) => s.status === "Active").length;
  const onLeave = staff.filter((s) => s.status === "On leave").length;
  const approved = requests.filter((r) => r.status === "Approved").length;
  const pending = requests.filter((r) => r.status === "Pending").length;
  const attendanceRate = staff.length ? Math.round((active / staff.length) * 1000) / 10 : 0;

  const depts = new Map<string, number>();
  for (const s of staff) depts.set(s.dept, (depts.get(s.dept) ?? 0) + 1);
  const spread = Array.from(depts.entries())
    .map(([dept, count]) => ({
      dept,
      count,
      pct: staff.length ? Math.round((count / staff.length) * 100) : 0,
    }))
    .sort((a, b) => b.count - a.count);

  return (
    <AppShell
      roleKey="hr"
      title="Attendance"
      subtitle={`${staff.length} staff · ${active} active today · ${onLeave} on leave`}
      actions={
        <>
          <Badge
            className={cn(
              "border-0 font-semibold",
              attendanceRate >= 90 ? "bg-success/10 text-success" : "bg-warning/10 text-warning",
            )}
          >
            {attendanceRate}% active
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/hr">
              <ArrowLeft className="size-4" /> HR hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Active today",
            value: String(active),
            delta: `of ${staff.length} staff`,
            icon: CheckCircle2,
            tone: "bg-success/10 text-success",
          },
          {
            label: "On leave",
            value: String(onLeave),
            delta: `${approved} approved requests`,
            icon: Clock3,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Leave pending",
            value: String(pending),
            delta: "awaiting decision",
            icon: UserRoundX,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Active rate",
            value: `${attendanceRate}%`,
            delta: "of headcount",
            icon: CalendarClock,
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
            <CalendarClock className="text-primary size-4" /> Staff by department
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {spread.map((d) => (
            <div key={d.dept}>
              <div className="flex items-center justify-between text-xs font-semibold">
                <span>{d.dept}</span>
                <span>
                  {d.count} staff · {d.pct}%
                </span>
              </div>
              <div className="bg-muted mt-1.5 h-2 overflow-hidden rounded-full">
                <div
                  className="bg-gradient-brand h-full rounded-full"
                  style={{ width: `${d.pct}%` }}
                />
              </div>
            </div>
          ))}
          {spread.length === 0 && (
            <p className="text-muted-foreground py-4 text-center text-sm">
              No employee records yet.
            </p>
          )}
        </CardContent>
      </Card>
    </AppShell>
  );
}
