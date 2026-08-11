import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Boxes, Building2, RefreshCw, Users, Workflow } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { useBranchItems, useInventoryItems, useVendorItems } from "@/lib/query/ops";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/ops/")({
  head: () => ({
    meta: [
      { title: "Ops Hub — CEA-OS" },
      { name: "description", content: "Branches, facilities, inventory and vendors." },
    ],
  }),
  component: OpsHub,
});

const screens = [
  {
    icon: Workflow,
    label: "Automation",
    desc: "Processes, runs",
    path: "/app/ops/automation",
    tone: "bg-primary/10 text-primary",
  },
  {
    icon: Building2,
    label: "Branches",
    desc: "Campuses, sites",
    path: "/app/ops/branches",
    tone: "bg-learning/10 text-learning",
  },
  {
    icon: Boxes,
    label: "Inventory",
    desc: "Stock, requests",
    path: "/app/ops/inventory",
    tone: "bg-success/10 text-success",
  },
  {
    icon: Users,
    label: "Vendors",
    desc: "Suppliers, contracts",
    path: "/app/ops/vendors",
    tone: "bg-warning/10 text-warning",
  },
];

function OpsHub() {
  const inventory = useInventoryItems();
  const branches = useBranchItems();
  const vendors = useVendorItems();

  const lowStock = inventory.filter((i) => i.qty <= i.reorderPoint).length;

  return (
    <AppShell
      roleKey="ops"
      title="Operations hub"
      subtitle="Run the physical academy"
      actions={
        <>
          <Badge
            className={cn(
              "border-0 font-semibold",
              lowStock > 0 ? "bg-warning/10 text-warning" : "bg-success/10 text-success",
            )}
          >
            {lowStock > 0 ? `${lowStock} low stock` : "Stock healthy"}
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/portal">
              <ArrowLeft className="size-4" /> CEA-OS portal
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Branches",
            value: branches.length > 0 ? String(branches.length) : "—",
            delta: "1 flagship site",
            icon: Building2,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Inventory items",
            value: inventory.length > 0 ? String(inventory.length) : "—",
            delta: `${lowStock} low stock`,
            icon: Boxes,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Vendors",
            value: vendors.length > 0 ? String(vendors.length) : "—",
            delta: "3 contracts active",
            icon: Users,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Automations",
            value: "8",
            delta: "2 runs today",
            icon: RefreshCw,
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
        <CardContent className="grid gap-4 p-5 sm:grid-cols-2 xl:grid-cols-4">
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
