import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Banknote, CheckCircle2, Clock3, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/supplier/invoices")({
  head: () => ({
    meta: [
      { title: "Invoices — CEA-OS" },
      { name: "description", content: "Submit and track invoice payments." },
    ],
  }),
  component: SupplierInvoices,
});

const invoices = [
  {
    i: "INV-8821",
    v: "₦385,000",
    d: "Issued Jul 28 · net-30",
    s: "Awaiting payment",
    tone: "bg-warning/10 text-warning",
  },
  {
    i: "INV-8740",
    v: "₦255,000",
    d: "Issued Jul 10",
    s: "Paid Jul 29",
    tone: "bg-success/10 text-success",
  },
  {
    i: "INV-8695",
    v: "₦310,000",
    d: "Issued Jun 28",
    s: "Paid Jul 15",
    tone: "bg-success/10 text-success",
  },
];

function SupplierInvoices() {
  return (
    <AppShell
      roleKey="student"
      title="Invoices"
      subtitle="₦640k outstanding · avg. paid in 14 days"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">No overdue</Badge>
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
            label: "Outstanding",
            value: "₦640k",
            delta: "2 invoices",
            icon: Banknote,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Paid (30d)",
            value: "₦1.2m",
            delta: "6 invoices",
            icon: CheckCircle2,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Avg. payment",
            value: "14 days",
            delta: "net-30 terms",
            icon: Clock3,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Submitted",
            value: "8",
            delta: "this year",
            icon: FileText,
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
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <FileText className="text-primary size-4" /> Invoice history
          </CardTitle>
          <Button size="sm" className="bg-gradient-brand shadow-glow border-0 font-semibold">
            Submit invoice
          </Button>
        </CardHeader>
        <CardContent className="divide-y">
          {invoices.map((i) => (
            <div key={i.i} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">
                  {i.i} · {i.v}
                </p>
                <p className="text-muted-foreground text-xs">{i.d}</p>
              </div>
              <Badge className={cn("border-0 font-semibold", i.tone)}>{i.s}</Badge>
              <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                View
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
