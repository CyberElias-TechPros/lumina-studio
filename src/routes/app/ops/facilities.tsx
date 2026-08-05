import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, DoorOpen, Hammer, KeyRound, MapPinned } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { useRooms, useRoomItems, useMaintenance, useMaintenanceItems } from "@/lib/query/ops";
import type { FacilityRoom, MaintenanceJob } from "@/lib/api/ops";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/ops/facilities")({
  head: () => ({
    meta: [
      { title: "Facilities — CEA-OS" },
      { name: "description", content: "Room booking, maintenance and facility health." },
    ],
  }),
  component: OperationsFacilities,
});

const maintTones = [
  "bg-warning/10 text-warning",
  "bg-primary/10 text-primary",
  "bg-error/10 text-error",
];

function OperationsFacilities() {
  const roomsQuery = useRooms();
  const rooms = useRoomItems();
  const maintQuery = useMaintenance();
  const maint = useMaintenanceItems();

  const labs = rooms.filter((r) => r.name.includes("Lab")).length;
  const studios = rooms.filter((r) => r.name.includes("Studio")).length;
  const seats = rooms.reduce((s, r) => s + r.seats, 0);
  const free = rooms.filter((r) => r.status === "available").length;
  const open = maint.filter((m) => m.status === "open").length;

  return (
    <AppShell
      roleKey="instructor"
      title="Facilities"
      subtitle={
        rooms.length > 0
          ? `${rooms.length} bookable rooms · ${maint.length} maintenance jobs`
          : "Loading facilities…"
      }
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">Campus clean</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/portal/operations">
              <ArrowLeft className="size-4" /> Operations
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Bookable rooms",
            value: rooms.length > 0 ? String(rooms.length) : "—",
            delta: `${labs} labs · ${studios} studios`,
            icon: DoorOpen,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Seats available",
            value: seats > 0 ? String(seats) : "—",
            delta: "across bookable rooms",
            icon: MapPinned,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Maintenance",
            value: maint.length > 0 ? String(maint.length) : "—",
            delta: `${open} open`,
            icon: Hammer,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Rooms free",
            value: free > 0 ? String(free) : "—",
            delta: "next slots available",
            icon: KeyRound,
            tone: "bg-success/10 text-success",
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

      <div className="mt-5 grid gap-5 xl:grid-cols-2">
        <Card className="bg-card shadow-soft border">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <MapPinned className="text-primary size-4" /> Rooms next up
            </CardTitle>
            <Button variant="outline" size="sm" className="font-semibold">
              Book room
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            <QueryState<FacilityRoom[]>
              query={roomsQuery}
              error={{ title: "Rooms unavailable" }}
              empty={{
                title: "No rooms yet",
                description: "Bookable rooms will show here.",
              }}
              isEmpty={(rows) => rows.length === 0}
            >
              {(rows) => (
                <>
                  {rows.map((r) => (
                    <div key={r.id} className="rounded-xl border p-3.5">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-bold">{r.name}</p>
                        <Badge variant="secondary" className="font-semibold">
                          {r.block}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mt-1 text-xs">
                        Next: {r.nextEvent} · {r.seats} seats
                      </p>
                    </div>
                  ))}
                </>
              )}
            </QueryState>
          </CardContent>
        </Card>

        <Card className="bg-card shadow-soft border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <Hammer className="text-primary size-4" /> Maintenance queue
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <QueryState<MaintenanceJob[]>
              query={maintQuery}
              error={{ title: "Maintenance queue unavailable" }}
              empty={{
                title: "No maintenance jobs",
                description: "Open jobs will show here.",
              }}
              isEmpty={(rows) => rows.length === 0}
            >
              {(rows) => (
                <>
                  {rows.map((m, index) => (
                    <div
                      key={m.id}
                      className="flex items-center justify-between rounded-xl border p-3"
                    >
                      <div>
                        <p className="text-sm font-bold">{m.title}</p>
                        <p className="text-muted-foreground mt-0.5 text-xs">{m.detail}</p>
                      </div>
                      <Badge
                        className={cn(
                          "border-0 font-semibold",
                          maintTones[index % maintTones.length],
                        )}
                      >
                        Open
                      </Badge>
                    </div>
                  ))}
                </>
              )}
            </QueryState>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
