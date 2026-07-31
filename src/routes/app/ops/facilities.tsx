import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, DoorOpen, Hammer, KeyRound, MapPinned } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
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

const rooms = [
  {
    r: "Lab 3 · 40 seats",
    b: "Block B",
    next: "DevOps class · 10:00",
    tone: "bg-primary/10 text-primary",
  },
  {
    r: "Seminar room · 60 seats",
    b: "Block A",
    next: "Workshop · 13:00",
    tone: "bg-learning/10 text-learning",
  },
  {
    r: "Studio · 24 seats",
    b: "Block C",
    next: "Design sprint · 09:30",
    tone: "bg-success/10 text-success",
  },
];

const maint = [
  { j: "AC repair — Lab 2", d: "Assigned · today", tone: "bg-warning/10 text-warning" },
  {
    j: "Generator servicing — Block B",
    d: "Scheduled · today 15:00",
    tone: "bg-primary/10 text-primary",
  },
  { j: "Fire extinguisher inspection", d: "Due Aug 12", tone: "bg-error/10 text-error" },
];

function OperationsFacilities() {
  return (
    <AppShell
      roleKey="instructor"
      title="Facilities"
      subtitle="12 bookable rooms · 96% uptime · 4 maintenance jobs"
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
            value: "12",
            delta: "5 labs · 3 studios",
            icon: DoorOpen,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Occupancy today",
            value: "78%",
            delta: "peak 13:00–16:00",
            icon: MapPinned,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Maintenance",
            value: "4",
            delta: "2 open · 2 due",
            icon: Hammer,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Uptime (30d)",
            value: "96%",
            delta: "power · AC · internet",
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
            {rooms.map((r) => (
              <div key={r.r} className="rounded-xl border p-3.5">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-bold">{r.r}</p>
                  <Badge variant="secondary" className="font-semibold">
                    {r.b}
                  </Badge>
                </div>
                <p className="text-muted-foreground mt-1 text-xs">Next: {r.next}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-card shadow-soft border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <Hammer className="text-primary size-4" /> Maintenance queue
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {maint.map((m) => (
              <div key={m.j} className="flex items-center justify-between rounded-xl border p-3">
                <div>
                  <p className="text-sm font-bold">{m.j}</p>
                  <p className="text-muted-foreground mt-0.5 text-xs">{m.d}</p>
                </div>
                <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                  Track
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
