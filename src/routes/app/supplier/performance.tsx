import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, BadgeCheck, Gauge, Star, ThumbsUp, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/supplier/performance")({
  head: () => ({
    meta: [
      { title: "Performance — CEA-OS" },
      { name: "description", content: "Your ratings and delivery history." },
    ],
  }),
  component: SupplierPerformance,
});

const ratings = [
  { r: "Delivery on-time", v: "100%", tone: "bg-success/10 text-success" },
  { r: "Quality of goods", v: "4.9 / 5", tone: "bg-primary/10 text-primary" },
  { r: "Responsiveness", v: "4.7 / 5", tone: "bg-learning/10 text-learning" },
  { r: "Pricing fairness", v: "4.6 / 5", tone: "bg-warning/10 text-warning" },
];

function SupplierPerformance() {
  return (
    <AppShell
      roleKey="student"
      title="Performance ratings"
      subtitle="4.8 overall · top 5% of CEA suppliers"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            Preferred status
          </Badge>
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
            label: "Overall",
            value: "4.8",
            delta: "24 reviews",
            icon: Star,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "On-time",
            value: "100%",
            delta: "last 30 days",
            icon: Truck,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Response",
            value: "< 2h",
            delta: "to new POs",
            icon: Gauge,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Incidents",
            value: "0",
            delta: "this quarter",
            icon: BadgeCheck,
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
            <ThumbsUp className="text-primary size-4" /> Rating breakdown
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {ratings.map((r) => (
            <div key={r.r}>
              <div className="flex items-center justify-between text-xs font-semibold">
                <span>{r.r}</span>
                <Badge className={cn("border-0 font-semibold", r.tone)}>{r.v}</Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
