import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays, CheckCircle2, Clock3, Timer } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/intern/timesheet")({
  head: () => ({
    meta: [
      { title: "Timesheet — CEA-OS" },
      { name: "description", content: "Log hours and track approvals." },
    ],
  }),
  component: InternTimesheet,
});

const weeks = [
  { w: "Jul 27 – Jul 31", h: "38h", s: "Approved", tone: "bg-success/10 text-success" },
  { w: "Jul 20 – Jul 24", h: "40h", s: "Approved", tone: "bg-success/10 text-success" },
  { w: "Jul 13 – Jul 17", h: "36h", s: "Pending", tone: "bg-warning/10 text-warning" },
];

function InternTimesheet() {
  return (
    <AppShell
      roleKey="student"
      title="Timesheet"
      subtitle="182h logged · 40h/week target · approval via supervisor"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">90% approved</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/intern">
              <ArrowLeft className="size-4" /> Intern hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "This week",
            value: "38h",
            delta: "logged so far",
            icon: Clock3,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Total logged",
            value: "182h",
            delta: "of 480 target",
            icon: Timer,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Approved",
            value: "164h",
            delta: "90% rate",
            icon: CheckCircle2,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Weeks",
            value: "5",
            delta: "of 12 completed",
            icon: CalendarDays,
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
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <CalendarDays className="text-primary size-4" /> Weekly log
          </CardTitle>
          <Button size="sm" className="bg-gradient-brand shadow-glow border-0 font-semibold">
            Log hours
          </Button>
        </CardHeader>
        <CardContent className="divide-y">
          {weeks.map((w) => (
            <div key={w.w} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{w.w}</p>
                <p className="text-muted-foreground text-xs">{w.h} logged</p>
              </div>
              <Badge className={cn("border-0 font-semibold", w.tone)}>{w.s}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
