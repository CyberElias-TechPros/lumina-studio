import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, ArrowLeft, Boxes, PackageCheck, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/ops/inventory")({
  head: () => ({
    meta: [
      { title: "Inventory — CEA-OS" },
      { name: "description", content: "Stock levels, reorder alerts and purchase orders." },
    ],
  }),
  component: OperationsInventory,
});

const stock = [
  {
    i: "Printer toner · HP 62",
    qty: "3 left",
    level: "Low",
    tone: "bg-destructive/10 text-destructive",
    auto: true,
  },
  {
    i: "A4 paper (reams)",
    qty: "48",
    level: "Healthy",
    tone: "bg-success/10 text-success",
    auto: false,
  },
  {
    i: "Laptop charger 65W",
    qty: "12",
    level: "Good",
    tone: "bg-primary/10 text-primary",
    auto: false,
  },
  {
    i: "Cafeteria gas (cylinder)",
    qty: "2",
    level: "Reorder soon",
    tone: "bg-warning/10 text-warning",
    auto: true,
  },
];

const pos = [
  {
    po: "PO-2413",
    v: "OfficeMate",
    i: "Toner + paper",
    v2: "₦185,000",
    d: "ETA Aug 5",
    tone: "bg-primary/10 text-primary",
  },
  {
    po: "PO-2412",
    v: "GasMaster",
    i: "Cafeteria gas",
    v2: "₦96,000",
    d: "ETA Aug 7",
    tone: "bg-learning/10 text-learning",
  },
];

function OperationsInventory() {
  return (
    <AppShell
      roleKey="instructor"
      title="Inventory"
      subtitle="Ikeja store · 214 SKUs tracked · synced with supplier portal"
      actions={
        <>
          <Badge className="bg-warning/10 text-warning border-0 font-semibold">
            2 reorder alerts
          </Badge>
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
            label: "SKUs tracked",
            value: "214",
            delta: "across 3 stores",
            icon: Boxes,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Reorder alerts",
            value: "2",
            delta: "auto-PO ready",
            icon: AlertTriangle,
            tone: "bg-destructive/10 text-destructive",
          },
          {
            label: "Open POs",
            value: "2",
            delta: "₦281,000 in transit",
            icon: ShoppingCart,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Stock value",
            value: "₦4.8m",
            delta: "0.6% shrink MTD",
            icon: PackageCheck,
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
              <Boxes className="text-primary size-4" /> Stock levels
            </CardTitle>
            <Badge variant="secondary" className="font-semibold">
              Auto-reorder on
            </Badge>
          </CardHeader>
          <CardContent className="divide-y">
            {stock.map((s) => (
              <div
                key={s.i}
                className="flex flex-wrap items-center gap-3 py-3.5 first:pt-0 last:pb-0"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold">{s.i}</p>
                  <p className="text-muted-foreground text-xs">{s.qty} in store</p>
                </div>
                {s.auto && (
                  <Badge variant="secondary" className="font-semibold">
                    Auto-PO
                  </Badge>
                )}
                <Badge className={cn("border-0 font-semibold", s.tone)}>{s.level}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-card shadow-soft border">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <ShoppingCart className="text-primary size-4" /> Purchase orders
            </CardTitle>
            <Button variant="outline" size="sm" className="font-semibold">
              New PO
            </Button>
          </CardHeader>
          <CardContent className="divide-y">
            {pos.map((p) => (
              <div
                key={p.po}
                className="flex flex-wrap items-center gap-3 py-3.5 first:pt-0 last:pb-0"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold">
                    {p.po} · {p.v}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {p.i} · {p.v2}
                  </p>
                </div>
                <Badge className={cn("border-0 font-semibold", p.tone)}>{p.d}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
