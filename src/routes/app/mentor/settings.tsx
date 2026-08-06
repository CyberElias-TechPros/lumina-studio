import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays, Clock, Globe2, UserRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { useMntAvailability, useMntAvailabilityItems } from "@/lib/query/mentorDashboard";
import type { MntAvailability } from "@/lib/api/mentorDashboard";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/mentor/settings")({
  head: () => ({
    meta: [
      { title: "Availability & Settings — CEA-OS" },
      { name: "description", content: "Manage your mentoring availability and preferences." },
    ],
  }),
  component: MentorSettings,
});

function AvailabilityRow({ w }: { w: MntAvailability }) {
  const open = w.isOpen === 1;
  return (
    <div
      className={cn(
        "flex items-center justify-between rounded-xl border p-3",
        !open && "opacity-50",
      )}
    >
      <div>
        <p className="text-sm font-bold">{w.day}</p>
        <p className="text-muted-foreground text-xs">{w.hours}</p>
      </div>
      <Badge
        className={cn(
          "border-0 font-semibold",
          open ? "bg-success/10 text-success" : "bg-muted text-muted-foreground",
        )}
      >
        {open ? "Open" : "Closed"}
      </Badge>
    </div>
  );
}

function MentorSettings() {
  const availabilityQuery = useMntAvailability();
  const availability = useMntAvailabilityItems();

  const openSlots = availability.filter((w) => w.isOpen === 1).length;

  return (
    <AppShell
      roleKey="instructor"
      title="Availability & settings"
      subtitle="When mentees can book you"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            {availability.length > 0 ? `${openSlots} slots / week` : "—"}
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/mentor">
              <ArrowLeft className="size-4" /> Dashboard
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-5 xl:grid-cols-[1.5fr_1fr]">
        <Card className="bg-card shadow-soft border">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <CalendarDays className="text-primary size-4" /> Weekly availability
            </CardTitle>
            <Button size="sm" variant="outline" className="font-semibold">
              Add slot
            </Button>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            <QueryState<MntAvailability[]>
              query={availabilityQuery}
              error={{ title: "Availability unavailable" }}
              empty={{
                title: "No availability set",
                description: "Add slots so mentees can book you.",
              }}
              isEmpty={(rows) => rows.length === 0}
            >
              {(rows) => (
                <>
                  {rows.map((w) => (
                    <AvailabilityRow key={w.id} w={w} />
                  ))}
                </>
              )}
            </QueryState>
          </CardContent>
        </Card>

        <div className="space-y-5">
          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <Globe2 className="text-primary size-4" /> Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { t: "Session mode", v: "Video or on-campus", tone: "bg-primary/10 text-primary" },
                { t: "Languages", v: "English, Yoruba", tone: "bg-learning/10 text-learning" },
                { t: "Notice for booking", v: "48 hours", tone: "bg-success/10 text-success" },
                { t: "Max mentees", v: "4", tone: "bg-warning/10 text-warning" },
              ].map((x) => (
                <div key={x.t} className="flex items-center justify-between rounded-xl border p-3">
                  <span className="text-sm font-semibold">{x.t}</span>
                  <Badge className={cn("border-0 font-semibold", x.tone)}>{x.v}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <Clock className="text-primary size-4" /> Quiet hours
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-muted-foreground rounded-xl border p-3 text-xs">
                Messages from mentees are held between 21:00 and 08:00 — nothing urgent is expected
                outside office hours.
              </p>
              <Button variant="outline" size="sm" className="w-full font-semibold">
                <UserRound className="size-3.5" /> Edit profile
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
