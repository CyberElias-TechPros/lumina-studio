import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Fuel,
  ShieldCheck,
  ThermometerSun,
  Truck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/director/operations")({
  head: () => ({
    meta: [
      { title: "Operations Overview — CEA-OS" },
      { name: "description", content: "Branch performance and operational efficiency." },
    ],
  }),
  component: DirectorOperations,
});

const branches = [
  { b: "Ikeja HQ", u: "86%", c: "₦8.2/seat-day", tone: "bg-success/10 text-success" },
  { b: "Victoria Island", u: "79%", c: "₦9.6/seat-day", tone: "bg-primary/10 text-primary" },
  { b: "Abeokuta", u: "53%", c: "₦11.4/seat-day", tone: "bg-warning/10 text-warning" },
];

function DirectorOperations() {
  return (
    <AppShell
      roleKey="admin"
      title="Operations overview"
      subtitle="3 campuses · 82% utilization · 0 incidents (30d)"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            Efficiency 91%
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/portal/director">
              <ArrowLeft className="size-4" /> Director portal
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Utilization",
            value: "82%",
            delta: "peak 94%",
            icon: Building2,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Cost / seat-day",
            value: "₦9.2",
            delta: "−4% QoQ",
            icon: Fuel,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Fleet uptime",
            value: "97%",
            delta: "3 vehicles",
            icon: Truck,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Incidents",
            value: "0",
            delta: "down from 3",
            icon: ShieldCheck,
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
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <ThermometerSun className="text-primary size-4" /> Branch performance · July
          </CardTitle>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/ops/reports">
              Ops reports <ArrowRight className="ml-1 size-3.5" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent className="divide-y">
          {branches.map((b) => (
            <div key={b.b} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{b.b}</p>
                <p className="text-muted-foreground text-xs">Cost {b.c}</p>
              </div>
              <div className="bg-muted h-2 w-32 overflow-hidden rounded-full">
                <div
                  className={cn(
                    "h-full rounded-full",
                    parseInt(b.u) >= 70 ? "bg-success" : "bg-warning",
                  )}
                  style={{ width: b.u }}
                />
              </div>
              <Badge className={cn("shrink-0 border-0 font-semibold", b.tone)}>{b.u} used</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
