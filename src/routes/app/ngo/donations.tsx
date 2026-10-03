"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { ArrowLeft, CheckCircle2, DollarSign, Heart, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import type { NgoTransaction } from "@/lib/api/ngo";
import { useNgoTransactions } from "@/lib/query/ngo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/ngo/donations")({
  head: () => ({
    meta: [
      { title: "Donations — CEA-OS" },
      { name: "description", content: "Inbound and outbound donation tracking." },
    ],
  }),
  component: NgoDonations,
});

const tones = [
  "bg-success/10 text-success",
  "bg-primary/10 text-primary",
  "bg-warning/10 text-warning",
  "bg-muted-foreground/10 text-muted-foreground",
];

function NgoDonations() {
  const transactionsQuery = useNgoTransactions();

  return (
    <AppShell
      roleKey="ngo"
      title="Donations"
      subtitle="₦46.2m received · ₦38.1m deployed · 100% accounted"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">Audited</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/ngo">
              <ArrowLeft className="size-4" /> Partnership hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Received",
            value: "₦46.2m",
            delta: "2026",
            icon: DollarSign,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Deployed",
            value: "₦38.1m",
            delta: "82% of inflow",
            icon: Wallet,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Sources",
            value: "14",
            delta: "grants, donors",
            icon: Heart,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Accounted",
            value: "100%",
            delta: "quarterly audit",
            icon: CheckCircle2,
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
            <DollarSign className="text-primary size-4" /> Transactions
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          <QueryState<NgoTransaction[]>
            query={transactionsQuery}
            error={{ title: "Transactions unavailable" }}
            empty={{
              title: "No transactions yet",
              description: "Donation transactions will appear here.",
            }}
            isEmpty={(rows) => rows.length === 0}
          >
            {(rows) => (
              <>
                {rows.map((d, i) => (
                  <div
                    key={d.id}
                    className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold">{d.title}</p>
                      <p className="text-muted-foreground text-xs">
                        {d.amount} · {d.dateLabel}
                      </p>
                    </div>
                    <Badge className={cn("border-0 font-semibold", tones[i % tones.length])}>
                      {d.status}
                    </Badge>
                    <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                      Details
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
