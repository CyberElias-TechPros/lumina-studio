"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import {
  ArrowLeft,
  CalendarCheck2,
  CalendarClock,
  CalendarDays,
  Clock3,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import { useGovCalendar, useGovOverview } from "@/lib/query/government";
import type { GovEvent, GovKpi } from "@/lib/api/government";
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

const kpiMeta: Record<string, { icon: LucideIcon; tone: string }> = {
  "Events (year)": { icon: CalendarDays, tone: "bg-primary/10 text-primary" },
  Completed: { icon: CalendarCheck2, tone: "bg-success/10 text-success" },
  Upcoming: { icon: CalendarClock, tone: "bg-warning/10 text-warning" },
  "Lead time": { icon: Clock3, tone: "bg-learning/10 text-learning" },
};

const defaultKpiMeta: { icon: LucideIcon; tone: string } = {
  icon: CalendarDays,
  tone: "bg-primary/10 text-primary",
};

const eventTones: Record<string, string> = {
  Scheduled: "bg-primary/10 text-primary",
  Upcoming: "bg-warning/10 text-warning",
};

function GovernmentCalendar() {
  const overviewQuery = useGovOverview();
  const eventsQuery = useGovCalendar();

  return (
    <AppShell
      roleKey="government"
      title="Compliance calendar"
      subtitle="CAC and NRS deadlines will appear here once they are tracked"
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
      <QueryState<GovKpi[]>
        query={overviewQuery}
        error={{ title: "Metrics unavailable" }}
        empty={{ title: "No metrics", description: "Compliance metrics will appear here." }}
        isEmpty={(rows) => rows.length === 0}
      >
        {(rows) => (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {rows.map((k) => {
              const meta = kpiMeta[k.metric] ?? defaultKpiMeta;
              return (
                <Card key={k.id} className="bg-card shadow-soft border">
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between">
                      <p className="text-muted-foreground text-xs font-bold tracking-wide uppercase">
                        {k.metric}
                      </p>
                      <span className={cn("grid size-8 place-items-center rounded-lg", meta.tone)}>
                        <meta.icon className="size-4" />
                      </span>
                    </div>
                    <p className="font-display mt-3 text-2xl font-extrabold">{k.valueLabel}</p>
                    <p className="text-muted-foreground mt-0.5 text-xs font-semibold">{k.delta}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </QueryState>

      <Card className="bg-card mt-5 shadow-soft border">
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <CalendarDays className="text-primary size-4" /> Upcoming
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          <QueryState<GovEvent[]>
            query={eventsQuery}
            error={{ title: "Events unavailable" }}
            empty={{ title: "No events", description: "Scheduled obligations will show here." }}
            isEmpty={(rows) => rows.length === 0}
          >
            {(rows) => (
              <>
                {rows.map((ev) => (
                  <div
                    key={ev.id}
                    className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold">{ev.title}</p>
                      <p className="text-muted-foreground text-xs">{ev.dateLabel}</p>
                    </div>
                    <Badge
                      className={cn(
                        "border-0 font-semibold",
                        eventTones[ev.status] ?? "bg-primary/10 text-primary",
                      )}
                    >
                      {ev.status}
                    </Badge>
                    <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                      Details
                    </Button>
                  </div>
                ))}
              </>
            )}
          </QueryState>
        </CardContent>
      </Card>
    </AppShell>
  );
}
