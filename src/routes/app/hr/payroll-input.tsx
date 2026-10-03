"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { ArrowLeft, Banknote, CheckCircle2, Clock3, UserRoundCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { usePayrollChanges } from "@/lib/query/hr";
import type { PayrollChange } from "@/lib/api/hr";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/hr/payroll-input")({
  head: () => ({
    meta: [
      { title: "Payroll Input — CEA-OS" },
      { name: "description", content: "Changes that flow to finance for payroll." },
    ],
  }),
  component: HrPayrollInput,
});

function changeTone(status: string): string {
  if (status === "sent") return "bg-success/10 text-success";
  return "bg-warning/10 text-warning";
}

function HrPayrollInput() {
  const query = usePayrollChanges();
  const changes = query.data?.pages.flatMap((p) => p.items) ?? [];
  const sent = changes.filter((c) => c.status === "sent").length;
  const drafts = changes.filter((c) => c.status !== "sent").length;

  return (
    <AppShell
      roleKey="hr"
      title="Payroll input"
      subtitle={`${changes.length} changes for August · cut-off Aug 5`}
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">On schedule</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/hr">
              <ArrowLeft className="size-4" /> HR hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Changes (Aug)",
            value: String(changes.length),
            delta: `${sent} sent`,
            icon: UserRoundCheck,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Sent to finance",
            value: String(sent),
            delta: "awaiting payroll run",
            icon: Banknote,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Drafts",
            value: String(drafts),
            delta: "need review",
            icon: Clock3,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Cut-off",
            value: "Aug 5",
            delta: "4 days away",
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
            <Banknote className="text-primary size-4" /> August changes
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          <QueryState<PayrollChange[]>
            query={query}
            error={{ title: "Payroll changes unavailable" }}
          >
            {(rows) => (
              <>
                {rows.map((c) => (
                  <div
                    key={c.id}
                    className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold">{c.title}</p>
                      <p className="text-muted-foreground text-xs">{c.detail}</p>
                    </div>
                    <Badge className={cn("border-0 font-semibold", changeTone(c.status))}>
                      {c.status === "sent" ? "Sent to finance" : "Draft"}
                    </Badge>
                    <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                      View
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
