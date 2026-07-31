import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CalendarCheck2, CalendarClock, CalendarDays, Clock3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/government/calendar")({
  head: () => ({
    meta: [
      { title: "Compliance Calendar — CEA-OS" },
      { name: "description", content: "Deadlines and scheduled obligations." },
    ],
  }),
  component: GovernmentCalendar,
});

const events = [
  {
    e: "Audit inspection",
    d: "Sep 18 · on-site",
    s: "Scheduled",
    tone: "bg-primary/10 text-primary",
  },
  {
    e: "Tuition fee schedule filing",
    d: "Aug 30 · online",
    s: "Upcoming",
    tone: "bg-warning/10 text-warning",
  },
  {
    e: "Q3 enrolment census",
    d: "Oct 15 · online",
    s: "Upcoming",
    tone: "bg-warning/10 text-warning",
  },
];

function GovernmentCalendar() {
  return (
    <AppShell
      roleKey="admin"
      title="Compliance calendar"
      subtitle="22 events this year · 3 upcoming · auto-reminders on"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">Synced</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/government">
              <ArrowLeft className="size-4" /> Compliance portal
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Events (year)",
            value: "22",
            delta: "all scheduled",
            icon: CalendarDays,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Completed",
            value: "19",
            delta: "100% on time",
            icon: CalendarCheck2,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Upcoming",
            value: "3",
            delta: "next Aug 30",
            icon: CalendarClock,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Lead time",
            value: "30 days",
            delta: "average notice",
            icon: Clock3,
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
            <CalendarDays className="text-primary size-4" /> Upcoming
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          {events.map((ev) => (
            <div
              key={ev.e + ev.d}
              className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
            >
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{ev.e}</p>
                <p className="text-muted-foreground text-xs">{ev.d}</p>
              </div>
              <Badge className={cn("border-0 font-semibold", ev.tone)}>{ev.s}</Badge>
              <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                Details
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
