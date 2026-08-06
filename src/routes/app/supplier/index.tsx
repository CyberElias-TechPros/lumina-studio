import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Banknote, Boxes, Star, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";
import {
  useSupDeliveryItems,
  useSupInvoiceItems,
  useSupOrderItems,
  useSupPerformanceItems,
} from "@/lib/query/supplierPartner";

export const Route = createFileRoute("/app/supplier/")({
  head: () => ({
    meta: [
      { title: "Supplier Hub — CEA-OS" },
      { name: "description", content: "Orders, deliveries, invoices and performance." },
    ],
  }),
  component: SupplierHub,
});

const screens = [
  {
    icon: Boxes,
    label: "Orders",
    desc: "Confirm, update status",
    path: "/app/supplier/orders",
    tone: "bg-primary/10 text-primary",
  },
  {
    icon: Truck,
    label: "Deliveries",
    desc: "Schedule, mark delivered",
    path: "/app/supplier/deliveries",
    tone: "bg-learning/10 text-learning",
  },
  {
    icon: Banknote,
    label: "Invoices",
    desc: "Submit, track payment",
    path: "/app/supplier/invoices",
    tone: "bg-success/10 text-success",
  },
  {
    icon: Star,
    label: "Performance",
    desc: "Ratings and history",
    path: "/app/supplier/performance",
    tone: "bg-warning/10 text-warning",
  },
];

const formatNaira = (n: number) => (n >= 1000 ? `₦${(n / 1000).toFixed(0)}k` : `₦${n}`);

function SupplierHub() {
  const orders = useSupOrderItems();
  const deliveries = useSupDeliveryItems();
  const invoices = useSupInvoiceItems();
  const performance = useSupPerformanceItems();

  const openOrders = orders.filter((o) => o.status !== "completed");
  const openValue = openOrders.reduce((n, o) => n + o.amount, 0);
  const pendingInvoices = invoices.filter((i) => i.status === "awaiting payment");
  const pendingValue = pendingInvoices.reduce((n, i) => n + i.amount, 0);
  const delivered = deliveries.filter((d) => d.status === "delivered");
  const onTimePct =
    deliveries.length > 0 ? Math.round((delivered.length / deliveries.length) * 100) : 0;
  const rating = performance.find((p) => p.metric === "Overall")?.valueLabel ?? "—";

  return (
    <AppShell
      roleKey="instructor"
      title="Supplier hub"
      subtitle="OfficeMate Ltd · CEA vendor since 2024"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            {rating} rating
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/portal/supplier">
              <ArrowLeft className="size-4" /> Supplier portal
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Open orders",
            value: orders.length > 0 ? String(openOrders.length) : "—",
            delta: `${formatNaira(openValue)} value`,
            icon: Boxes,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Deliveries",
            value: deliveries.length > 0 ? String(deliveries.length) : "—",
            delta: `${onTimePct}% on time`,
            icon: Truck,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Invoices pending",
            value: pendingInvoices.length > 0 ? formatNaira(pendingValue) : "—",
            delta: `${pendingInvoices.length} invoices`,
            icon: Banknote,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Rating",
            value: rating,
            delta: "from CEA reviews",
            icon: Star,
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
            <Truck className="text-primary size-4" /> Workspace
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {screens.map((s) => (
            <Link
              key={s.path}
              to={s.path}
              className="group bg-card shadow-soft hover:shadow-elevated flex flex-col rounded-xl border p-4 transition-all hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between">
                <span className={cn("grid size-9 place-items-center rounded-lg", s.tone)}>
                  <s.icon className="size-4" />
                </span>
                <ArrowRight className="text-muted-foreground group-hover:text-primary size-4 transition-colors" />
              </div>
              <p className="font-display mt-3 text-sm font-extrabold">{s.label}</p>
              <p className="text-muted-foreground mt-1 text-xs">{s.desc}</p>
            </Link>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
