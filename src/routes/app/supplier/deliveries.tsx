import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, Clock3, MapPin, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import { useSupDeliveries, useSupDeliveryItems } from "@/lib/query/supplierPartner";
import type { SupDelivery } from "@/lib/api/supplierPartner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/supplier/deliveries")({
  head: () => ({
    meta: [
      { title: "Deliveries — CEA-OS" },
      { name: "description", content: "Schedule and track deliveries." },
    ],
  }),
  component: SupplierDeliveries,
});

const statusMeta: Record<string, { label: string; tone: string }> = {
  scheduled: { label: "Scheduled", tone: "bg-learning/10 text-learning" },
  delivered: { label: "Delivered", tone: "bg-success/10 text-success" },
};

function SupplierDeliveries() {
  const deliveriesQuery = useSupDeliveries();
  const deliveries = useSupDeliveryItems();

  const scheduled = deliveries.filter((d) => d.status === "scheduled");
  const delivered = deliveries.filter((d) => d.status === "delivered");
  const onTimePct =
    deliveries.length > 0 ? Math.round((delivered.length / deliveries.length) * 100) : 0;

  return (
    <AppShell
      roleKey="supplier"
      title="Deliveries"
      subtitle={`${scheduled.length} scheduled · next Aug 5 · 10:00`}
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            {deliveries.length > 0 ? `${onTimePct}% on time` : "—"}
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
            label: "Scheduled",
            value: deliveries.length > 0 ? String(scheduled.length) : "—",
            delta: "next: Aug 5",
            icon: Clock3,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Delivered (30d)",
            value: deliveries.length > 0 ? String(delivered.length) : "—",
            delta: "confirmed by store",
            icon: CheckCircle2,
            tone: "bg-success/10 text-success",
          },
          {
            label: "On-time rate",
            value: deliveries.length > 0 ? `${onTimePct}%` : "—",
            delta: "vs. agreed windows",
            icon: Truck,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Next destination",
            value: "Ikeja HQ",
            delta: "store · Aug 5",
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
          <QueryState<SupDelivery[]>
            query={deliveriesQuery}
            error={{ title: "Deliveries unavailable" }}
            empty={{ title: "No deliveries", description: "Scheduled deliveries will show here." }}
            isEmpty={(rows) => rows.length === 0}
          >
            {(rows) => (
              <>
                {rows.map((d) => {
                  const meta = statusMeta[d.status] ?? {
                    label: d.status,
                    tone: "bg-muted text-muted-foreground",
                  };
                  return (
                    <div
                      key={d.id}
                      className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold">{d.poLabel}</p>
                        <p className="text-muted-foreground text-xs">
                          {d.whenLabel} · {d.toLabel}
                        </p>
                      </div>
                      <Badge className={cn("border-0 font-semibold", meta.tone)}>
                        {meta.label}
                      </Badge>
                      <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                        {d.status === "scheduled" ? "Reschedule" : "Details"}
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
