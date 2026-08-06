import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays, Clock, Video, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import { useRecAppointments, useRecAppointmentItems } from "@/lib/query/volunteerReceptionist";
import type { RecAppointment } from "@/lib/api/volunteerReceptionist";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/receptionist/appointments")({
  head: () => ({
    meta: [
      { title: "Appointments — CEA-OS" },
      { name: "description", content: "Book and manage front desk appointments." },
    ],
  }),
  component: ReceptionistAppointments,
});

const statusMeta: Record<string, { label: string; tone: string }> = {
  arrived: { label: "Arrived", tone: "bg-success/10 text-success" },
  confirmed: { label: "Confirmed", tone: "bg-primary/10 text-primary" },
  available: { label: "Available", tone: "bg-muted-foreground/10 text-muted-foreground" },
};

function ReceptionistAppointments() {
  const slotsQuery = useRecAppointments();
  const slots = useRecAppointmentItems();

  return (
    <AppShell
      roleKey="student"
      title="Appointments"
      subtitle={`Front desk · today · ${slots.length > 0 ? `${slots.length} appointments` : "9 appointments"}`}
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">3 in next 2h</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/portal/receptionist">
              <ArrowLeft className="size-4" /> Front desk
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Today",
            value: "9",
            delta: `${slots.filter((s) => s.status === "confirmed").length} confirmed`,
            icon: CalendarDays,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Arrived",
            value:
              slots.length > 0 ? String(slots.filter((s) => s.status === "arrived").length) : "—",
            delta: "hosts notified",
            icon: Users,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Video calls",
            value: "2",
            delta: "check-in room 4",
            icon: Video,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Open slots",
            value:
              slots.length > 0 ? String(slots.filter((s) => s.status === "available").length) : "—",
            delta: "bookable today",
            icon: Clock,
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
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <CalendarDays className="text-primary size-4" /> Today's schedule
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          <QueryState<RecAppointment[]>
            query={slotsQuery}
            error={{ title: "Schedule unavailable" }}
            empty={{ title: "No appointments", description: "Today's slots will show here." }}
            isEmpty={(rows) => rows.length === 0}
          >
            {(rows) => (
              <>
                {rows.map((s) => {
                  const meta = statusMeta[s.status] ?? {
                    label: s.status,
                    tone: "bg-muted text-muted-foreground",
                  };
                  return (
                    <div
                      key={s.id}
                      className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                    >
                      <span className="bg-muted text-muted-foreground grid size-9 shrink-0 place-items-center rounded-lg">
                        <Clock className="size-4" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold">{s.title}</p>
                        <p className="text-muted-foreground text-xs">
                          {s.who} · {s.detail}
                        </p>
                      </div>
                      <Badge className={cn("border-0 font-semibold", meta.tone)}>
                        {meta.label}
                      </Badge>
                      <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                        Manage
                      </Button>
                    </div>
                  );
                })}
              </>
            )}
          </QueryState>
        </CardContent>
      </Card>
    </AppShell>
  );
}
