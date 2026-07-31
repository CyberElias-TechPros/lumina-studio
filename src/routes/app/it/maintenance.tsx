import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CalendarClock, Clock3, Hammer, MonitorCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/it/maintenance")({
  head: () => ({
    meta: [
      { title: "Maintenance — CEA-OS" },
      { name: "description", content: "Scheduled maintenance windows." },
    ],
  }),
  component: ItMaintenance,
});

const windows = [
  {
    m: "Platform maintenance",
    d: "Aug 8 · 02:00–04:00",
    s: "Scheduled",
    tone: "bg-warning/10 text-warning",
  },
  {
    m: "Backup infrastructure upgrade",
    d: "Aug 15 · 01:00–03:00",
    s: "Scheduled",
    tone: "bg-primary/10 text-primary",
  },
  {
    m: "WiFi controller firmware",
    d: "Jul 26 · completed",
    s: "Done",
    tone: "bg-success/10 text-success",
  },
];

function ItMaintenance() {
  return (
    <AppShell
      roleKey="instructor"
      title="Scheduled maintenance"
      subtitle="2 upcoming windows · no impact in 60d"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            Zero incidents
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/portal/it-support">
              <ArrowLeft className="size-4" /> IT Support portal
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Upcoming",
            value: "2",
            delta: "next Aug 8",
            icon: CalendarClock,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Completed (30d)",
            value: "3",
            delta: "all on time",
            icon: Hammer,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Avg. window",
            value: "2.1h",
            delta: "overnight",
            icon: Clock3,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "User impact",
            value: "0",
            delta: "last 60 days",
            icon: MonitorCheck,
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
            <CalendarClock className="text-primary size-4" /> Windows
          </CardTitle>
          <Button size="sm" className="bg-gradient-brand shadow-glow border-0 font-semibold">
            Schedule
          </Button>
        </CardHeader>
        <CardContent className="divide-y">
          {windows.map((w) => (
            <div key={w.m} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{w.m}</p>
                <p className="text-muted-foreground text-xs">{w.d}</p>
              </div>
              <Badge className={cn("border-0 font-semibold", w.tone)}>{w.s}</Badge>
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
