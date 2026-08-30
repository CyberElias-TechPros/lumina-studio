import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { ArrowLeft, CalendarDays, MapPin, PartyPopper, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import type { AluEvent } from "@/lib/api/alumni";
import { useAluEvents, useRsvpToAluEvent } from "@/lib/query/alumni";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/alumni/events")({
  head: () => ({
    meta: [
      { title: "Alumni Events — CEA-OS" },
      { name: "description", content: "Reunions, career days and workshops." },
    ],
  }),
  component: AlumniEvents,
});

const eventTones = [
  "bg-success/10 text-success",
  "bg-primary/10 text-primary",
  "bg-warning/10 text-warning",
  "bg-muted-foreground/10 text-muted-foreground",
];

function AlumniEvents() {
  const eventsQuery = useAluEvents();
  const rsvp = useRsvpToAluEvent();
  const [selectedEvent, setSelectedEvent] = useState<AluEvent | null>(null);

  const submitRsvp = () => {
    if (!selectedEvent || rsvp.isPending || /rsvp/i.test(selectedEvent.status)) return;
    rsvp.mutate(selectedEvent.id, {
      onSuccess: (result) => {
        toast.success(
          result.alreadyRsvpd ? "You are already RSVP'd" : `RSVP confirmed for ${result.title}`,
        );
        if (!result.alreadyRsvpd) {
          setSelectedEvent((event) =>
            event ? { ...event, going: event.going + 1, status: "RSVP'd" } : event,
          );
        }
      },
    });
  };

  return (
    <AppShell
      roleKey="alumni"
      title="Alumni events"
      subtitle="6 events this quarter · 2 RSVP'd"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">Reunion Sep 6</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/alumni/hub">
              <ArrowLeft className="size-4" /> Alumni hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "RSVP'd",
            value: "2",
            delta: "reunion + career day",
            icon: PartyPopper,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Total attendees",
            value: "428",
            delta: "next 60 days",
            icon: Users,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Online events",
            value: "3",
            delta: "join anywhere",
            icon: CalendarDays,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "New this quarter",
            value: "2",
            delta: "speed mentoring",
            icon: MapPin,
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
            <CalendarDays className="text-primary size-4" /> Upcoming
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          <QueryState<AluEvent[]>
            query={eventsQuery}
            error={{ title: "Events unavailable" }}
            empty={{
              title: "No upcoming events",
              description: "Reunions, career days and workshops will show here.",
            }}
            isEmpty={(rows) => rows.length === 0}
          >
            {(rows) => (
              <>
                {rows.map((e, i) => (
                  <div
                    key={e.id}
                    className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                  >
                    <span className="bg-muted text-muted-foreground grid size-9 shrink-0 place-items-center rounded-lg">
                      <MapPin className="size-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold">{e.title}</p>
                      <p className="text-muted-foreground text-xs">
                        {e.dateLabel} · {e.location} · {e.going} going
                      </p>
                    </div>
                    <Badge
                      className={cn("border-0 font-semibold", eventTones[i % eventTones.length])}
                    >
                      {e.status}
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      className="shrink-0 font-semibold"
                      onClick={() => setSelectedEvent(e)}
                    >
                      Details
                    </Button>
                  </div>
                ))}
              </>
            )}
          </QueryState>
        </CardContent>
      </Card>
      <Dialog
        open={selectedEvent !== null}
        onOpenChange={(open) => !open && setSelectedEvent(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedEvent?.title ?? "Event details"}</DialogTitle>
            <DialogDescription>
              Alumni event information from the community calendar.
            </DialogDescription>
          </DialogHeader>
          {selectedEvent && (
            <dl className="grid gap-3 rounded-xl border p-4 text-sm">
              <div>
                <dt className="text-muted-foreground text-xs font-bold uppercase">When</dt>
                <dd className="mt-1 font-semibold">{selectedEvent.dateLabel}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground text-xs font-bold uppercase">Where</dt>
                <dd className="mt-1 font-semibold">{selectedEvent.location}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground text-xs font-bold uppercase">Attendance</dt>
                <dd className="mt-1 font-semibold">{selectedEvent.going} going</dd>
              </div>
              <div>
                <dt className="text-muted-foreground text-xs font-bold uppercase">Your status</dt>
                <dd className="mt-1 font-semibold">{selectedEvent.status}</dd>
              </div>
            </dl>
          )}
          <Button
            className="bg-gradient-brand border-0"
            onClick={submitRsvp}
            disabled={!selectedEvent || rsvp.isPending || /rsvp/i.test(selectedEvent.status)}
          >
            {rsvp.isPending
              ? "Confirming…"
              : selectedEvent && /rsvp/i.test(selectedEvent.status)
                ? "RSVP confirmed"
                : "RSVP to event"}
          </Button>
          {rsvp.error && (
            <p role="alert" className="text-destructive text-sm font-semibold">
              {rsvp.error.message}
            </p>
          )}
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}
