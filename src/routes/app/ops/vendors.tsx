import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, BadgeCheck, FileSignature, Handshake, Star, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/ops/vendors")({
  head: () => ({
    meta: [
      { title: "Vendors — CEA-OS" },
      { name: "description", content: "Vendor contracts, performance and purchase history." },
    ],
  }),
  component: OperationsVendors,
});

const vendors = [
  {
    v: "OfficeMate",
    s: "Stationery",
    r: "4.8 / 5",
    status: "Active",
    tone: "bg-success/10 text-success",
  },
  {
    v: "GasMaster",
    s: "Cafeteria gas",
    r: "4.6 / 5",
    status: "Active",
    tone: "bg-success/10 text-success",
  },
  {
    v: "Compton Power",
    s: "Generator servicing",
    r: "3.9 / 5",
    status: "Watch",
    tone: "bg-warning/10 text-warning",
  },
];

const contracts = [
  {
    c: "OfficeMate annual supply",
    d: "Renews Nov 2026",
    v2: "₦2.4m/yr",
    tone: "bg-primary/10 text-primary",
  },
  {
    c: "GasMaster delivery SLA",
    d: "Renews Sep 2026",
    v2: "₦1.1m/yr",
    tone: "bg-learning/10 text-learning",
  },
];

function OperationsVendors() {
  return (
    <AppShell
      roleKey="instructor"
      title="Vendor management"
      subtitle="11 active vendors · 2 contracts renewing this quarter"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            Payments on track
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
            label: "Active vendors",
            value: "11",
            delta: "2 onboarding",
            icon: Handshake,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Avg rating",
            value: "4.5",
            delta: "of 5 · 24 reviews",
            icon: Star,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Contracts live",
            value: "8",
            delta: "2 renewing soon",
            icon: FileSignature,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Spend MTD",
            value: "₦3.1m",
            delta: "92% on budget",
            icon: Truck,
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

      <div className="mt-5 grid gap-5 xl:grid-cols-2">
        <Card className="bg-card shadow-soft border">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <BadgeCheck className="text-primary size-4" /> Vendor performance
            </CardTitle>
            <Button variant="outline" size="sm" className="font-semibold">
              Add vendor
            </Button>
          </CardHeader>
          <CardContent className="divide-y">
            {vendors.map((v) => (
              <div
                key={v.v}
                className="flex flex-wrap items-center gap-3 py-3.5 first:pt-0 last:pb-0"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold">{v.v}</p>
                  <p className="text-muted-foreground text-xs">
                    {v.s} · rated {v.r}
                  </p>
                </div>
                <Badge className={cn("border-0 font-semibold", v.tone)}>{v.status}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-card shadow-soft border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <FileSignature className="text-primary size-4" /> Contracts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {contracts.map((c) => (
              <div key={c.c} className="flex items-center justify-between rounded-xl border p-3">
                <div>
                  <p className="text-sm font-bold">{c.c}</p>
                  <p className="text-muted-foreground mt-0.5 text-xs">
                    {c.d} · {c.v2}
                  </p>
                </div>
                <Badge className={cn("border-0 font-semibold", c.tone)}>Active</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
