import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Clock, DoorOpen, LogOut, QrCode, UserRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import { useRecInside, useRecInsideItems } from "@/lib/query/volunteerReceptionist";
import type { RecInsideEntry } from "@/lib/api/volunteerReceptionist";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/receptionist/check-out")({
  head: () => ({
    meta: [
      { title: "Visitor Check-Out — CEA-OS" },
      { name: "description", content: "End visits, collect badges and log departures." },
    ],
  }),
  component: ReceptionistCheckOut,
});

const tones = [
  "bg-primary/10 text-primary",
  "bg-primary/10 text-primary",
  "bg-learning/10 text-learning",
];

function ReceptionistCheckOut() {
  const insideQuery = useRecInside();
  const inside = useRecInsideItems();

  return (
    <AppShell
      roleKey="student"
      title="Visitor check-out"
      subtitle={`Front desk · Ikeja campus · ${inside.length > 0 ? `${inside.length} visitors inside` : "5 visitors inside"}`}
      actions={
        <>
          <Badge className="bg-warning/10 text-warning border-0 font-semibold">
            {inside.length > 0 ? `${inside.length} inside` : "5 inside"}
          </Badge>
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
            label: "Visitors inside",
            value: inside.length > 0 ? String(inside.length) : "—",
            delta: "2 visitors · 3 residents",
            icon: DoorOpen,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Badges out",
            value: "7",
            delta: "5 returned today",
            icon: QrCode,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Avg. visit length",
            value: "1h 20m",
            delta: "across today",
            icon: Clock,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Checked out",
            value: "12",
            delta: "today so far",
            icon: LogOut,
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
            <UserRound className="text-primary size-4" /> Currently on site
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          <QueryState<RecInsideEntry[]>
            query={insideQuery}
            error={{ title: "Occupancy unavailable" }}
            empty={{ title: "No one on site", description: "Checked-in visitors will show here." }}
            isEmpty={(rows) => rows.length === 0}
          >
            {(rows) => (
              <>
                {rows.map((v, i) => (
                  <div
                    key={v.id}
                    className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                  >
                    <span className="bg-muted text-muted-foreground grid size-9 shrink-0 place-items-center rounded-lg">
                      <UserRound className="size-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold">{v.name}</p>
                      <p className="text-muted-foreground text-xs">{v.sinceLabel}</p>
                    </div>
                    <Badge className={cn("border-0 font-semibold", tones[i % tones.length])}>
                      {v.badgeLabel}
                    </Badge>
                    <Button size="sm" variant="outline" className="shrink-0 font-semibold">
                      <LogOut className="size-3.5" /> Check out
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
