import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CalendarClock, CheckCircle2, Clock3, UserRoundX } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
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

const trends = [
  { t: "Attendance rate", v: "96.2%", d: "target 95%", tone: "bg-success/10 text-success" },
  { t: "Late arrivals", v: "1.4%", d: "this week", tone: "bg-warning/10 text-warning" },
  { t: "Absenteeism", v: "0.6%", d: "down 0.2 pts", tone: "bg-primary/10 text-primary" },
];

function HrAttendance() {
  return (
    <AppShell
      roleKey="instructor"
      title="Attendance"
      subtitle="This week · 96.2% attendance · 88 of 94 present today"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">Above target</Badge>
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
            label: "Present today",
            value: "88",
            delta: "of 94 staff",
            icon: CheckCircle2,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Late arrivals",
            value: "4",
            delta: "1.4% of staff",
            icon: Clock3,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Absent",
            value: "6",
            delta: "3 approved leave",
            icon: UserRoundX,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Week avg.",
            value: "96.2%",
            delta: "target 95%",
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
            <CalendarClock className="text-primary size-4" /> Monthly trends
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          {trends.map((t) => (
            <div key={t.t} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{t.t}</p>
                <p className="text-muted-foreground text-xs">{t.d}</p>
              </div>
              <Badge className={cn("border-0 font-semibold", t.tone)}>{t.v}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
