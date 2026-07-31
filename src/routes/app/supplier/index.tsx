import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Banknote, Boxes, Star, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

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

function SupplierHub() {
  return (
    <AppShell
      roleKey="student"
      title="Supplier hub"
      subtitle="OfficeMate Ltd · CEA vendor since 2024"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">4.8 rating</Badge>
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
            value: "2",
            delta: "1 due this week",
            icon: Boxes,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Deliveries",
            value: "11",
            delta: "100% on time",
            icon: Truck,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Invoices pending",
            value: "₦640k",
            delta: "2 invoices",
            icon: Banknote,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Rating",
            value: "4.8",
            delta: "24 reviews",
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
