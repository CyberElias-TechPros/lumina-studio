import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Banknote, CheckCircle2, Clock3, UserRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { usePayrollChanges, useEmployees } from "@/lib/query/hr";
import type { PayrollChange } from "@/lib/api/hr";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/accountant/payroll")({
  head: () => ({
    meta: [
      { title: "Payroll — CEA-OS" },
      { name: "description", content: "Salaries, deductions and payslips." },
    ],
  }),
  component: AccountantPayroll,
});

function changeTone(status: string): string {
  if (status === "sent" || status === "approved") return "bg-success/10 text-success";
  return "bg-warning/10 text-warning";
}

function AccountantPayroll() {
  const changes = usePayrollChanges();
  const employees = useEmployees();

  const changeRows = changes.data?.pages.flatMap((p) => p.items) ?? [];
  const staff = employees.data?.pages.flatMap((p) => p.items) ?? [];
  const sent = changeRows.filter((c) => c.status === "sent" || c.status === "approved");
  const pending = changeRows.filter((c) => c.status !== "sent" && c.status !== "approved");
  const active = staff.filter((s) => s.status === "Active");

  return (
    <AppShell
      roleKey="instructor"
      title="Payroll"
      subtitle={`${changeRows.length} payroll changes · ${staff.length} employees · ${sent.length} processed`}
      actions={
        <>
          <Badge
            className={cn(
              "border-0 font-semibold",
              pending.length > 0 ? "bg-warning/10 text-warning" : "bg-success/10 text-success",
            )}
          >
            {pending.length > 0 ? `${pending.length} pending` : "On schedule"}
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
            label: "Employees",
            value: String(staff.length),
            delta: `${active.length} active`,
            icon: UserRound,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Changes",
            value: String(changeRows.length),
            delta: "on record",
            icon: Banknote,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Processed",
            value: String(sent.length),
            delta: "sent to payroll",
            icon: CheckCircle2,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Pending",
            value: String(pending.length),
            delta: "awaiting sign-off",
            icon: Clock3,
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
            <Banknote className="text-primary size-4" /> Payroll changes
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          <QueryState<PayrollChange[]>
            query={changes}
            error={{ title: "Payroll changes unavailable" }}
            empty={{
              title: "No changes yet",
              description: "Hires, leavers and revisions appear here.",
            }}
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
                      {c.status}
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
