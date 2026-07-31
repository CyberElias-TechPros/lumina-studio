import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Boxes, CheckCircle2, Clock3, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/supplier/orders")({
  head: () => ({
    meta: [
      { title: "Orders — CEA-OS" },
      { name: "description", content: "Confirm and update purchase orders." },
    ],
  }),
  component: SupplierOrders,
});

const orders = [
  {
    o: "PO-2413",
    i: "Toner HP 62 ×6, A4 paper ×20",
    v: "₦185,000",
    d: "Due Aug 5",
    s: "Confirmed",
    tone: "bg-primary/10 text-primary",
  },
  {
    o: "PO-2412",
    i: "Cafeteria gas cylinders ×4",
    v: "₦96,000",
    d: "Due Aug 7",
    s: "Pending confirm",
    tone: "bg-warning/10 text-warning",
  },
  {
    o: "PO-2408",
    i: "Desk chairs ×10",
    v: "₦310,000",
    d: "Delivered Jul 24",
    s: "Completed",
    tone: "bg-success/10 text-success",
  },
];

function SupplierOrders() {
  return (
    <AppShell
      roleKey="student"
      title="Orders"
      subtitle="2 active · auto-synced with CEA procurement"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">SLA met 100%</Badge>
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
            label: "Active orders",
            value: "2",
            delta: "₦281k value",
            icon: ShoppingCart,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Pending confirm",
            value: "1",
            delta: "PO-2412",
            icon: Clock3,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Completed (30d)",
            value: "7",
            delta: "all on time",
            icon: CheckCircle2,
            tone: "bg-success/10 text-success",
          },
          {
            label: "SKUs supplied",
            value: "34",
            delta: "catalog",
            icon: Boxes,
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
            <ShoppingCart className="text-primary size-4" /> Purchase orders
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          {orders.map((o) => (
            <div key={o.o} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">
                  {o.o} · {o.v}
                </p>
                <p className="text-muted-foreground text-xs">
                  {o.i} · {o.d}
                </p>
              </div>
              <Badge className={cn("border-0 font-semibold", o.tone)}>{o.s}</Badge>
              <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                {o.s === "Pending confirm" ? "Confirm" : "View"}
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
