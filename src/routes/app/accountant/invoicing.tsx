import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, FilePlus2, Mail, ReceiptText, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { useInvoices } from "@/lib/query/finance";
import type { Invoice } from "@/lib/api/finance";
import { cn, formatNaira, formatNairaCompact } from "@/lib/utils";

export const Route = createFileRoute("/app/accountant/invoicing")({
  head: () => ({
    meta: [
      { title: "Invoicing — CEA-OS" },
      { name: "description", content: "Create, send and track invoices." },
    ],
  }),
  component: AccountantInvoicing,
});

function invoiceTone(status: string): string {
  if (status === "Paid") return "bg-success/10 text-success";
  if (status === "Overdue") return "bg-destructive/10 text-destructive";
  return "bg-primary/10 text-primary";
}

function AccountantInvoicing() {
  const query = useInvoices();
  const rows = query.data?.pages.flatMap((p) => p.items) ?? [];

  const billed = rows.reduce((s, i) => s + i.amount, 0);
  const collected = rows.filter((i) => i.status === "Paid").reduce((s, i) => s + i.amount, 0);
  const outstanding = billed - collected;
  const overdue = rows.filter((i) => i.status === "Overdue").length;

  return (
    <AppShell
      roleKey="finance"
      title="Invoicing"
      subtitle={`${rows.length} invoices this month · ${formatNairaCompact(billed)} billed`}
      actions={
        <>
          <Badge className="bg-warning/10 text-warning border-0 font-semibold">
            {overdue} overdue
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
            label: "Billed (MTD)",
            value: formatNairaCompact(billed),
            delta: `${rows.length} invoices`,
            icon: ReceiptText,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Collected",
            value: formatNairaCompact(collected),
            delta: `${collected === 0 ? "0" : Math.round((collected / billed) * 100)}% collection`,
            icon: Mail,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Outstanding",
            value: formatNairaCompact(outstanding),
            delta: `${formatNairaCompact(rows.filter((i) => i.status === "Overdue").reduce((s, i) => s + i.amount, 0))} overdue`,
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
          <QueryState<Invoice[]> query={query} error={{ title: "Invoices unavailable" }}>
            {(invoices) => (
              <>
                {invoices.map((i) => (
                  <div
                    key={i.id}
                    className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold">
                        {i.id} · {i.party}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {formatNaira(i.amount)} · Due {i.due}
                      </p>
                    </div>
                    <Badge className={cn("border-0 font-semibold", invoiceTone(i.status))}>
                      {i.status}
                    </Badge>
                    <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                      {i.status === "Sent" ? "Remind" : "View"}
                    </Button>
                  </div>
                ))}
              </>
            )}
          </QueryState>
        </CardContent>
      </Card>
    </AppShell>
  );
}
