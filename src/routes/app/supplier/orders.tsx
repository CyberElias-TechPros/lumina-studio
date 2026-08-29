import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Boxes, CheckCircle2, Clock3, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import {
  useSupOrderItems,
  useSupOrders,
  useUpdateSupOrderStatus,
} from "@/lib/query/supplierPartner";
import type { SupOrder } from "@/lib/api/supplierPartner";
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

const formatNaira = (n: number) => (n >= 1000 ? `₦${(n / 1000).toFixed(0)}k` : `₦${n}`);

const statusMeta: Record<string, { label: string; tone: string }> = {
  confirmed: { label: "Confirmed", tone: "bg-primary/10 text-primary" },
  "pending confirm": { label: "Pending confirm", tone: "bg-warning/10 text-warning" },
  completed: { label: "Completed", tone: "bg-success/10 text-success" },
};

function SupplierOrderAction({ order }: { order: SupOrder }) {
  const update = useUpdateSupOrderStatus();
  const pendingConfirm = order.status === "pending confirm";
  return (
    <Button
      variant={pendingConfirm ? "default" : "outline"}
      size="sm"
      className="shrink-0 font-semibold"
      disabled={update.isPending}
      onClick={() => {
        if (!pendingConfirm) return;
        update.mutate(
          { id: order.id, status: "confirmed" },
          { onSuccess: () => toast.success(`${order.ref} confirmed`) },
        );
      }}
    >
      {update.isPending ? "Confirming…" : pendingConfirm ? "Confirm" : "View"}
    </Button>
  );
}

function SupplierOrders() {
  const ordersQuery = useSupOrders();
  const orders = useSupOrderItems();

  const active = orders.filter((o) => o.status !== "completed");
  const activeValue = active.reduce((n, o) => n + o.amount, 0);
  const pending = orders.filter((o) => o.status === "pending confirm");
  const completed = orders.filter((o) => o.status === "completed");

  return (
    <AppShell
      roleKey="supplier"
      title="Orders"
      subtitle={`${active.length} active · auto-synced with CEA procurement`}
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
            value: orders.length > 0 ? String(active.length) : "—",
            delta: `${formatNaira(activeValue)} value`,
            icon: ShoppingCart,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Pending confirm",
            value: orders.length > 0 ? String(pending.length) : "—",
            delta: pending[0]?.ref ?? "none",
            icon: Clock3,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Completed (30d)",
            value: orders.length > 0 ? String(completed.length) : "—",
            delta: "all on time",
            icon: CheckCircle2,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Orders",
            value: orders.length > 0 ? String(orders.length) : "—",
            delta: "total in FY 2026",
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
          <QueryState<SupOrder[]>
            query={ordersQuery}
            error={{ title: "Orders unavailable" }}
            empty={{ title: "No orders", description: "Purchase orders will show here." }}
            isEmpty={(rows) => rows.length === 0}
          >
            {(rows) => (
              <>
                {rows.map((o) => {
                  const meta = statusMeta[o.status] ?? {
                    label: o.status,
                    tone: "bg-muted text-muted-foreground",
                  };
                  return (
                    <div
                      key={o.id}
                      className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold">
                          {o.ref} · {formatNaira(o.amount)}
                        </p>
                        <p className="text-muted-foreground text-xs">
                          {o.items} · {o.dueLabel}
                        </p>
                      </div>
                      <Badge className={cn("border-0 font-semibold", meta.tone)}>
                        {meta.label}
                      </Badge>
                      <SupplierOrderAction order={o} />
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
