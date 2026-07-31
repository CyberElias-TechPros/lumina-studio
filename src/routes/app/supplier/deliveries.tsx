import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CalendarClock, MapPin, PackageCheck, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/supplier/deliveries")({
  head: () => ({
    meta: [
      { title: "Deliveries — CEA-OS" },
      { name: "description", content: "Schedule and mark deliveries." },
    ],
  }),
  component: SupplierDeliveries,
});

const deliveries = [
  {
    d: "PO-2413 · Toner + paper",
    t: "Aug 5 · 10:00",
    to: "Ikeja HQ · store",
    s: "Scheduled",
    tone: "bg-primary/10 text-primary",
  },
  {
    d: "PO-2412 · Gas cylinders",
    t: "Aug 7 · 09:00",
    to: "Ikeja HQ · cafeteria",
    s: "Scheduled",
    tone: "bg-learning/10 text-learning",
  },
  {
    d: "PO-2408 · Chairs",
    t: "Jul 24 · 11:30",
    to: "VI campus",
    s: "Delivered",
    tone: "bg-success/10 text-success",
  },
];

function SupplierDeliveries() {
  return (
    <AppShell
      roleKey="student"
      title="Deliveries"
      subtitle="2 scheduled · 100% on-time history"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">All tracked</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/supplier">
              <ArrowLeft className="size-4" /> Supplier hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Scheduled",
            value: "2",
            delta: "this week",
            icon: CalendarClock,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "In transit",
            value: "0",
            delta: "—",
            icon: Truck,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Delivered (30d)",
            value: "11",
            delta: "100% on time",
            icon: PackageCheck,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Routes",
            value: "3",
            delta: "HQ · VI · satellite",
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
            <Truck className="text-primary size-4" /> Delivery schedule
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          {deliveries.map((d) => (
            <div key={d.d} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{d.d}</p>
                <p className="text-muted-foreground text-xs">
                  {d.t} · to {d.to}
                </p>
              </div>
              <Badge className={cn("border-0 font-semibold", d.tone)}>{d.s}</Badge>
              <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                {d.s === "Delivered" ? "Receipt" : "Mark delivered"}
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
