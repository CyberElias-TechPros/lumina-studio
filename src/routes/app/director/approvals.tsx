"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import {
  ArrowLeft,
  ArrowRight,
  Banknote,
  CheckCircle2,
  Clock4,
  FileSignature,
  UserRoundPlus,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { useExpenseItems, useInvoiceItems } from "@/lib/query/finance";
import { useLeaveRequestItems, usePayrollChangeItems } from "@/lib/query/hr";
import { cn, formatNairaCompact } from "@/lib/utils";

export const Route = createFileRoute("/app/director/approvals")({
  head: () => ({
    meta: [
      { title: "Approvals — CEA-OS" },
      {
        name: "description",
        content: "Budgets, hires, partnerships and purchase orders awaiting approval.",
      },
    ],
  }),
  component: DirectorApprovals,
});

function DirectorApprovals() {
  const leave = useLeaveRequestItems();
  const changes = usePayrollChangeItems();
  const invoices = useInvoiceItems();
  const expenses = useExpenseItems();

  const pendingLeave = leave.filter((l) => l.status === "Pending");
  const pendingPayroll = changes.filter((c) => c.status !== "sent" && c.status !== "approved");
  const overdue = invoices.filter((i) => i.status === "Overdue");
  const pendingExpenses = expenses.slice(0, 4);

  const pending = pendingLeave.length + pendingPayroll.length + overdue.length;
  const queueValue = overdue.reduce((s, i) => s + i.amount, 0);
  const approved = changes.filter((c) => c.status === "approved" || c.status === "sent").length;

  const items = [
    ...pendingPayroll.slice(0, 3).map((c) => ({
      t: c.title,
      by: c.detail,
      kind: "Payroll change",
      tone: "bg-primary/10 text-primary",
    })),
    ...pendingLeave.slice(0, 3).map((l) => ({
      t: `Leave — ${l.employee} (${l.type})`,
      by: `${l.from} → ${l.to}`,
      kind: "Leave",
      tone: "bg-learning/10 text-learning",
    })),
    ...overdue.slice(0, 3).map((i) => ({
      t: `Invoice ${i.id} — ${i.party}`,
      by: `${formatNairaCompact(i.amount)} · due ${i.due}`,
      kind: "Overdue invoice",
      tone: "bg-warning/10 text-warning",
    })),
  ].slice(0, 6);

  return (
    <AppShell
      roleKey="director"
      title="Approvals"
      subtitle={`${pending} pending · leave + payroll + overdue invoices · SLA 24h`}
      actions={
        <>
          <Badge
            className={cn(
              "border-0 font-semibold",
              pending > 0 ? "bg-warning/10 text-warning" : "bg-success/10 text-success",
            )}
          >
            {pending > 0 ? `${pending} awaiting sign-off` : "queue clear"}
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/portal/director">
              <ArrowLeft className="size-4" /> Director portal
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Pending",
            value: String(pending),
            delta: `${overdue.length} overdue invoices`,
            icon: Clock4,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Processed (30d)",
            value: String(approved),
            delta: "payroll changes signed",
            icon: CheckCircle2,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Value in queue",
            value: formatNairaCompact(queueValue),
            delta: "overdue receivables",
            icon: Banknote,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Open expense lines",
            value: String(expenses.length),
            delta: "on record",
            icon: UserRoundPlus,
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
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <FileSignature className="text-primary size-4" /> Waiting on you
          </CardTitle>
          <Badge variant="secondary" className="font-semibold">
            Sort: oldest first
          </Badge>
        </CardHeader>
        <CardContent className="divide-y">
          {items.map((i) => (
            <div key={i.t} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{i.t}</p>
                <p className="text-muted-foreground text-xs">{i.by}</p>
              </div>
              <Badge className={cn("border-0 font-semibold", i.tone)}>{i.kind}</Badge>
              <Button size="sm" className="bg-gradient-brand shrink-0 border-0 font-semibold">
                <CheckCircle2 className="mr-1 size-3.5" /> Approve
              </Button>
            </div>
          ))}
          {items.length === 0 && (
            <p className="text-muted-foreground py-4 text-center text-sm">
              Nothing waiting on you — queue clear.
            </p>
          )}
        </CardContent>
      </Card>
    </AppShell>
  );
}
