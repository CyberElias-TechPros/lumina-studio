import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays, Clock, UserCheck, Users, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
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

const records = [
  {
    d: "Mon, Jul 28",
    c: "Full-Stack Development",
    status: "Present",
    tone: "bg-success/10 text-success",
  },
  { d: "Thu, Jul 24", c: "Cloud & DevOps", status: "Present", tone: "bg-success/10 text-success" },
  { d: "Wed, Jul 23", c: "Product Design", status: "Late 12m", tone: "bg-warning/10 text-warning" },
  {
    d: "Mon, Jul 21",
    c: "Full-Stack Development",
    status: "Present",
    tone: "bg-success/10 text-success",
  },
  { d: "Thu, Jul 17", c: "Cloud & DevOps", status: "Excused", tone: "bg-primary/10 text-primary" },
];

function ParentStudentAttendance() {
  return (
    <AppShell
      roleKey="student"
      title="Attendance report"
      subtitle="Ada Okafor · Term 2 · 94% overall"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            Above 90% policy
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/parent/students/$studentId" params={{ studentId: "ada-okafor" }}>
              <ArrowLeft className="size-4" /> Overview
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Present",
            value: "61",
            delta: "of 65 sessions",
            icon: UserCheck,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Late arrivals",
            value: "3",
            delta: "avg 9 minutes",
            icon: Clock,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Excused",
            value: "1",
            delta: "medical note filed",
            icon: CalendarDays,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Unexcused",
            value: "0",
            delta: "no strikes",
            icon: XCircle,
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

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.5fr_1fr]">
        <Card className="bg-card shadow-soft border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <CalendarDays className="text-primary size-4" /> Recent sessions
            </CardTitle>
          </CardHeader>
          <CardContent className="divide-y">
            {records.map((r) => (
              <div key={r.d + r.c} className="flex items-center gap-3 py-4 first:pt-0 last:pb-0">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold">{r.c}</p>
                  <p className="text-muted-foreground text-xs">{r.d}</p>
                </div>
                <Badge className={cn("border-0 font-semibold", r.tone)}>{r.status}</Badge>
              </div>
            ))}
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
              { t: "Current standing", v: "94%", tone: "bg-success/10 text-success" },
              { t: "Lates allowed", v: "3 per term", tone: "bg-warning/10 text-warning" },
            ].map((x) => (
              <div key={x.t} className="flex items-center justify-between rounded-xl border p-3">
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
    </AppShell>
  );
}
