import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, FilePlus2, Mail, ReceiptText, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/accountant/invoicing")({
  head: () => ({
    meta: [
      { title: "Invoicing — CEA-OS" },
      { name: "description", content: "Create, send and track invoices." },
    ],
  }),
  component: AccountantInvoicing,
});

const invoices = [
  {
    i: "INV-9021",
    to: "TechHub Ltd",
    v: "₦4.2m",
    d: "Due Aug 20",
    s: "Sent",
    tone: "bg-primary/10 text-primary",
  },
  {
    i: "INV-9018",
    to: "Family of A. Musa",
    v: "₦320,000",
    d: "Due Aug 5",
    s: "Paid",
    tone: "bg-success/10 text-success",
  },
  {
    i: "INV-9012",
    to: "NGO partner",
    v: "₦1.1m",
    d: "Overdue 12d",
    s: "Overdue",
    tone: "bg-destructive/10 text-destructive",
  },
];

function AccountantInvoicing() {
  return (
    <AppShell
      roleKey="instructor"
      title="Invoicing"
      subtitle="24 invoices this month · ₦18.6m billed"
      actions={
        <>
          <Badge className="bg-warning/10 text-warning border-0 font-semibold">1 overdue</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/accountant">
              <ArrowLeft className="size-4" /> Finance hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Billed (MTD)",
            value: "₦18.6m",
            delta: "24 invoices",
            icon: ReceiptText,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Collected",
            value: "₦9.2m",
            delta: "49% collection",
            icon: Mail,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Outstanding",
            value: "₦9.4m",
            delta: "₦2.1m overdue",
            icon: FilePlus2,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Avg. DSO",
            value: "18 days",
            delta: "down 3 days",
            icon: Send,
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
            <ReceiptText className="text-primary size-4" /> Recent invoices
          </CardTitle>
          <Button size="sm" className="bg-gradient-brand shadow-glow border-0 font-semibold">
            <FilePlus2 className="size-4" /> New invoice
          </Button>
        </CardHeader>
        <CardContent className="divide-y">
          {invoices.map((i) => (
            <div key={i.i} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">
                  {i.i} · {i.to}
                </p>
                <p className="text-muted-foreground text-xs">
                  {i.v} · {i.d}
                </p>
              </div>
              <Badge className={cn("border-0 font-semibold", i.tone)}>{i.s}</Badge>
              <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                {i.s === "Sent" ? "Remind" : "View"}
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
