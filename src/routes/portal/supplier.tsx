import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Boxes,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Package,
  Truck,
  Warehouse,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/portal/supplier")({
  head: () => ({
    meta: [
      { title: "Supplier — CEA-OS" },
      {
        name: "description",
        content: "Supplier portal: purchase orders, deliveries, invoices and catalog.",
      },
    ],
  }),
  component: SupplierPortal,
});

const orders = [
  {
    po: "PO-1028",
    item: "Cafeteria staples — monthly",
    amount: "₦1,850,000",
    eta: "ETA Aug 4",
    status: "Confirmed",
    tone: "bg-success/10 text-success",
  },
  {
    po: "PO-1026",
    item: "Lab consumables",
    amount: "₦420,000",
    eta: "Delivered Aug 1",
    status: "Delivered",
    tone: "bg-primary/10 text-primary",
  },
  {
    po: "PO-1024",
    item: "Printing & stationery",
    amount: "₦310,000",
    eta: "ETA Aug 6",
    status: "In transit",
    tone: "bg-warning/10 text-warning",
  },
];

function SupplierPortal() {
  return (
    <AppShell
      roleKey="instructor"
      title="Supplier workspace"
      subtitle="Jona Traders Ltd · verified vendor since 2024"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            Vendor status: active
          </Badge>
          <Badge variant="secondary" className="font-semibold">
            Rating 4.8 / 5
          </Badge>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Open POs",
            value: "3",
            delta: "₦2.6m in flight",
            icon: ClipboardList,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Due deliveries",
            value: "2",
            delta: "this week",
            icon: Truck,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Unpaid invoices",
            value: "1",
            delta: "₦310,000 · 14 days",
            icon: Package,
            tone: "bg-error/10 text-error",
          },
          {
            label: "Order value (YTD)",
            value: "₦18.4m",
            delta: "+12% vs last year",
            icon: Boxes,
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

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.5fr_1fr]">
        <Card className="bg-card shadow-soft border">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <ClipboardList className="text-primary size-4" /> Purchase orders
            </CardTitle>
            <Button variant="outline" size="sm" className="font-semibold">
              Upload delivery note
            </Button>
          </CardHeader>
          <CardContent className="divide-y">
            {orders.map((o) => (
              <div
                key={o.po}
                className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
              >
                <span className="bg-muted text-muted-foreground grid size-9 shrink-0 place-items-center rounded-lg">
                  <Warehouse className="size-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold">{o.item}</p>
                  <p className="text-muted-foreground text-xs">
                    {o.po} · {o.eta}
                  </p>
                </div>
                <p className="text-sm font-extrabold">{o.amount}</p>
                <Badge className={cn("border-0 font-semibold", o.tone)}>{o.status}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-5">
          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <CalendarDays className="text-primary size-4" /> Delivery schedule
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { t: "Cafeteria staples", v: "Mon · 07:30", tone: "bg-primary/10 text-primary" },
                { t: "Stationery restock", v: "Thu · 12:00", tone: "bg-learning/10 text-learning" },
                {
                  t: "Water refills (offices)",
                  v: "Fri · 09:00",
                  tone: "bg-success/10 text-success",
                },
              ].map((x) => (
                <div key={x.t} className="flex items-center justify-between rounded-xl border p-3">
                  <span className="text-sm font-semibold">{x.t}</span>
                  <Badge className={cn("border-0 font-semibold", x.tone)}>{x.v}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <CheckCircle2 className="text-primary size-4" /> Compliance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { t: "Vendor agreement", v: "Signed 2026", tone: "bg-success/10 text-success" },
                {
                  t: "Tax clearance (FIRS)",
                  v: "Valid to Dec",
                  tone: "bg-success/10 text-success",
                },
                { t: "Food safety cert", v: "Renewal Aug 20", tone: "bg-warning/10 text-warning" },
              ].map((x) => (
                <div key={x.t} className="flex items-center justify-between rounded-xl border p-3">
                  <span className="text-sm font-semibold">{x.t}</span>
                  <Badge className={cn("border-0 font-semibold", x.tone)}>{x.v}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-gradient-ink text-ink-foreground shadow-elevated border-0">
            <CardContent className="p-6">
              <Truck className="text-success size-5" />
              <p className="font-display mt-3 text-base font-extrabold">Next delivery</p>
              <p className="text-ink-foreground/70 mt-1 text-sm">
                Cafeteria staples due Monday 07:30 at the loading bay. Invoices 7 days after
                delivery.
              </p>
              <Button asChild size="sm" className="bg-gradient-brand shadow-glow mt-4 border-0">
                <Link to="/portal/operations">
                  Ops coordination <ArrowRight className="ml-1 size-3.5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
