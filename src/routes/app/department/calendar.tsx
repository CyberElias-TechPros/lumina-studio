"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import {
  ArrowLeft,
  CalendarDays,
  CalendarRange,
  Clock3,
  GraduationCap,
  StickyNote,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import type { DepEvent } from "@/lib/api/department";
import { useDepEvents } from "@/lib/query/department";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/department/calendar")({
  head: () => ({
    meta: [
      { title: "Department Calendar — CEA-OS" },
      { name: "description", content: "Academic calendar and department events." },
    ],
  }),
  component: DeptCalendar,
});

const eventTones: Record<string, string> = {
  Upcoming: "bg-warning/10 text-warning",
  Scheduled: "bg-primary/10 text-primary",
  Completed: "bg-success/10 text-success",
  Cancelled: "bg-muted-foreground/10 text-muted-foreground",
};

function DeptCalendar() {
  const eventsQuery = useDepEvents();

  return (
    <AppShell
      roleKey="department"
      title="Department calendar"
      subtitle="Term 2 · 14 events · synced with academic board"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">Synced</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/portal/department-head">
              <ArrowLeft className="size-4" /> Dept head portal
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Events (term)",
            value: "14",
            delta: "academic + dept",
            icon: CalendarDays,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Upcoming",
            value: "5",
            delta: "next Aug 17",
            icon: CalendarRange,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Synced",
            value: "100%",
            delta: "to academic board",
            icon: GraduationCap,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Clashes found",
            value: "0",
            delta: "auto-checked",
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
            <StickyNote className="text-primary size-4" /> Upcoming events
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          <QueryState<DepEvent[]>
            query={eventsQuery}
            error={{ title: "Events unavailable" }}
            empty={{
              title: "No events yet",
              description: "Academic calendar and department events will appear here.",
            }}
            isEmpty={(rows) => rows.length === 0}
          >
            {(rows) => (
              <>
                {rows.map((e) => (
                  <div
                    key={e.id}
                    className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold">{e.title}</p>
                      <p className="text-muted-foreground text-xs">{e.dateLabel}</p>
                    </div>
                    <Badge
                      className={cn(
                        "border-0 font-semibold",
                        eventTones[e.status] ?? "bg-muted text-muted-foreground",
                      )}
                    >
                      {e.status}
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
