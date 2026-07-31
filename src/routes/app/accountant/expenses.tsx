import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, BadgeCheck, CheckCircle2, Clock3, ReceiptText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/accountant/expenses")({
  head: () => ({
    meta: [
      { title: "Expenses — CEA-OS" },
      { name: "description", content: "Claim, approve and reimburse expenses." },
    ],
  }),
  component: AccountantExpenses,
});

const claims = [
  {
    c: "Fuel — generator week 3",
    by: "Ops manager",
    v: "₦180,000",
    s: "Approved",
    tone: "bg-success/10 text-success",
  },
  {
    c: "Client lunch — TechHub",
    by: "Marketing lead",
    v: "₦64,000",
    s: "In review",
    tone: "bg-warning/10 text-warning",
  },
  {
    c: "Internet top-up — VI campus",
    by: "IT support",
    v: "₦92,000",
    s: "Pending receipt",
    tone: "bg-primary/10 text-primary",
  },
];

function AccountantExpenses() {
  return (
    <AppShell
      roleKey="instructor"
      title="Expenses"
      subtitle="₦1.4m this month · 0 over policy limit"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            Policy compliant
          </Badge>
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
            label: "Claimed (MTD)",
            value: "₦1.4m",
            delta: "23 claims",
            icon: ReceiptText,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Approved",
            value: "₦980k",
            delta: "15 claims",
            icon: BadgeCheck,
            tone: "bg-success/10 text-success",
          },
          {
            label: "In review",
            value: "5",
            delta: "₦310k value",
            icon: Clock3,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Reimbursed",
            value: "₦860k",
            delta: "via next payroll",
            icon: CheckCircle2,
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
            <ReceiptText className="text-primary size-4" /> Open claims
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          {claims.map((c) => (
            <div key={c.c} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{c.c}</p>
                <p className="text-muted-foreground text-xs">
                  {c.by} · {c.v}
                </p>
              </div>
              <Badge className={cn("border-0 font-semibold", c.tone)}>{c.s}</Badge>
              <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                Review
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
