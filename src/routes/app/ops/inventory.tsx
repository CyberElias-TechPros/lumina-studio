"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { AlertTriangle, ArrowLeft, Boxes, PackageCheck, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import {
  useInventory,
  useInventoryItems,
  usePurchaseOrders,
  usePurchaseOrderItems,
} from "@/lib/query/ops";
import type { InventoryItem, PurchaseOrder } from "@/lib/api/ops";
import { cn, formatNaira, formatNairaCompact } from "@/lib/utils";

export const Route = createFileRoute("/app/ops/inventory")({
  head: () => ({
    meta: [
      { title: "Inventory — CEA-OS" },
      { name: "description", content: "Stock levels, reorder alerts and purchase orders." },
    ],
  }),
  component: OperationsInventory,
});

function stockLevel(item: InventoryItem): { label: string; tone: string } {
  if (item.qty <= item.reorderPoint)
    return { label: "Low", tone: "bg-destructive/10 text-destructive" };
  if (item.qty <= Math.ceil(item.reorderPoint * 1.5)) {
    return { label: "Reorder soon", tone: "bg-warning/10 text-warning" };
  }
  return { label: "Healthy", tone: "bg-success/10 text-success" };
}

function formatEta(eta: string): string {
  const date = new Date(`${eta}T00:00:00`);
  return `ETA ${date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;
}

function OperationsInventory() {
  const inv = useInventory();
  const items = useInventoryItems();
  const pos = usePurchaseOrders();
  const posItems = usePurchaseOrderItems();

  const alerts = items.filter((i) => i.qty <= i.reorderPoint);
  const autoPois = alerts.filter((i) => i.autoReorder === 1).length;
  const openPos = posItems.filter((p) => p.status === "open");
  const inTransit = openPos.reduce((s, p) => s + p.amount, 0);
  const stockValue = items.reduce((s, i) => s + i.qty * i.unitPrice, 0);

  return (
    <AppShell
      roleKey="ops"
      title="Inventory"
      subtitle={
        items.length > 0
          ? `${items.length} SKUs tracked · synced with supplier portal`
          : "Loading inventory…"
      }
      actions={
        <>
          <Badge className="bg-warning/10 text-warning border-0 font-semibold">
            {alerts.length} reorder alerts
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
            value: items.length > 0 ? String(items.length) : "—",
            delta: "across 3 stores",
            icon: Boxes,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Reorder alerts",
            value: alerts.length > 0 ? String(alerts.length) : "—",
            delta: `${autoPois} auto-PO ready`,
            icon: AlertTriangle,
            tone: "bg-destructive/10 text-destructive",
          },
          {
            label: "Open POs",
            value: openPos.length > 0 ? String(openPos.length) : "—",
            delta:
              inTransit > 0 ? `${formatNairaCompact(inTransit)} in transit` : "nothing in transit",
            icon: ShoppingCart,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Stock value",
            value: stockValue > 0 ? formatNairaCompact(stockValue) : "—",
            delta: "on hand",
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
            <QueryState<InventoryItem[]>
              query={inv}
              error={{ title: "Inventory unavailable" }}
              empty={{
                title: "No stock tracked",
                description: "Inventory items will show here.",
              }}
              isEmpty={(rows) => rows.length === 0}
            >
              {(rows) => (
                <>
                  {rows.map((s) => {
                    const level = stockLevel(s);
                    return (
                      <div
                        key={s.id}
                        className="flex flex-wrap items-center gap-3 py-3.5 first:pt-0 last:pb-0"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-bold">{s.name}</p>
                          <p className="text-muted-foreground text-xs">
                            {s.qty} {s.unit} in store · {s.category}
                          </p>
                        </div>
                        {s.autoReorder === 1 && (
                          <Badge variant="secondary" className="font-semibold">
                            Auto-PO
                          </Badge>
                        )}
                        <Badge className={cn("border-0 font-semibold", level.tone)}>
                          {level.label}
                        </Badge>
                      </div>
                    );
                  })}
                </>
              )}
            </QueryState>
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
            <QueryState<PurchaseOrder[]>
              query={pos}
              error={{ title: "Purchase orders unavailable" }}
              empty={{
                title: "No purchase orders",
                description: "Open and delivered orders will show here.",
              }}
              isEmpty={(rows) => rows.length === 0}
            >
              {(rows) => (
                <>
                  {rows.map((p) => (
                    <div
                      key={p.id}
                      className="flex flex-wrap items-center gap-3 py-3.5 first:pt-0 last:pb-0"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold">
                          {p.id} · {p.vendor}
                        </p>
                        <p className="text-muted-foreground text-xs">
                          {p.items} · {formatNaira(p.amount)}
                        </p>
                      </div>
                      <Badge
                        className={cn(
                          "border-0 font-semibold",
                          p.status === "delivered"
                            ? "bg-success/10 text-success"
                            : "bg-primary/10 text-primary",
                        )}
                      >
                        {p.status === "delivered" ? "Delivered" : formatEta(p.eta)}
                      </Badge>
                    </div>
                  ))}
                </>
              )}
            </QueryState>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
