import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Boxes, CheckCircle2, PackageOpen, Truck, UserRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/receptionist/deliveries")({
  head: () => ({
    meta: [
      { title: "Delivery Log — CEA-OS" },
      { name: "description", content: "Receive, sign and route deliveries." },
    ],
  }),
  component: ReceptionistDeliveries,
});

const deliveries = [
  {
    c: "OfficeMate Ltd",
    d: "Printer toner ×6",
    t: "Aug 3 · 10:20",
    status: "Awaiting pickup",
    tone: "bg-warning/10 text-warning",
  },
  {
    c: "Books2Africa",
    d: "Textbooks (42 cartons)",
    t: "Aug 3 · 09:10",
    status: "With library",
    tone: "bg-success/10 text-success",
  },
  {
    c: "DHL",
    d: "Server part",
    t: "Aug 2 · 16:30",
    status: "With IT",
    tone: "bg-success/10 text-success",
  },
];

function ReceptionistDeliveries() {
  return (
    <AppShell
      roleKey="student"
      title="Delivery log"
      subtitle="Front desk · 3 parcels today"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">All routed</Badge>
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
            label: "Received today",
            value: "3",
            delta: "2 routed",
            icon: Boxes,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Awaiting pickup",
            value: "1",
            delta: "Toner for IT",
            icon: PackageOpen,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "This week",
            value: "11",
            delta: "100% signed",
            icon: Truck,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Carriers",
            value: "5",
            delta: "regular partners",
            icon: UserRound,
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

      <Card className="bg-card mt-5 shadow-soft border">
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <Truck className="text-primary size-4" /> Today's deliveries
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          {deliveries.map((d) => (
            <div key={d.c} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <span className="bg-muted text-muted-foreground grid size-9 shrink-0 place-items-center rounded-lg">
                <Boxes className="size-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{d.c}</p>
                <p className="text-muted-foreground text-xs">
                  {d.d} · {d.t}
                </p>
              </div>
              <Badge className={cn("border-0 font-semibold", d.tone)}>{d.status}</Badge>
              <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                <CheckCircle2 className="size-3.5" /> Sign
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
