import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, ClipboardCheck, Laptop, UserRoundPlus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { usePayrollChanges } from "@/lib/query/hr";
import type { PayrollChange } from "@/lib/api/hr";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/hr/onboarding")({
  head: () => ({
    meta: [
      { title: "Onboarding — CEA-OS" },
      { name: "description", content: "Onboarding and offboarding checklists." },
    ],
  }),
  component: HrOnboarding,
});

function stepPct(status: string): number {
  return status === "sent" || status === "approved" ? 100 : 40;
}

function changeStatus(status: string): string {
  return status === "sent" || status === "approved" ? "Complete" : "In progress";
}

function HrOnboarding() {
  const changes = usePayrollChanges();
  const rows = changes.data?.pages.flatMap((p) => p.items) ?? [];

  const starters = rows.filter(
    (c) => /starter|new hire|hire/i.test(c.title) || /leaver|exit|offboard/i.test(c.title),
  );
  const completed = starters.filter((c) => c.status === "sent" || c.status === "approved").length;
  const inProgress = starters.length - completed;

  return (
    <AppShell
      roleKey="instructor"
      title="Onboarding / offboarding"
      subtitle={`${starters.length} staffing changes · ${completed} complete · ${inProgress} in progress`}
      actions={
        <>
          <Badge
            className={cn(
              "border-0 font-semibold",
              inProgress > 0 ? "bg-warning/10 text-warning" : "bg-success/10 text-success",
            )}
          >
            {inProgress > 0 ? `${inProgress} pending` : "All current"}
          </Badge>
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
            label: "In progress",
            value: String(inProgress),
            delta: "key in / out",
            icon: UserRoundPlus,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Complete",
            value: String(completed),
            delta: "100% steps",
            icon: CheckCircle2,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Payroll changes",
            value: String(rows.length),
            delta: "on record",
            icon: Laptop,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Pipeline signal",
            value: starters.length ? "Live" : "—",
            delta: "from payroll changes",
            icon: ClipboardCheck,
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
            <ClipboardCheck className="text-primary size-4" /> Change log
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <QueryState<PayrollChange[]>
            query={changes}
            error={{ title: "Changes unavailable" }}
            empty={{ title: "No changes yet", description: "Hires and exits appear here." }}
          >
            {(rows) => (
              <>
                {rows.map((c) => {
                  const pct = stepPct(c.status);
                  return (
                    <div key={c.id}>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold">{c.title}</span>
                        <Badge
                          className={cn(
                            "border-0 font-semibold",
                            pct >= 100
                              ? "bg-success/10 text-success"
                              : "bg-warning/10 text-warning",
                          )}
                        >
                          {isStatus(c.status)} · {pct}%
                        </Badge>
                      </div>
                      <div className="bg-muted mt-1.5 h-2 overflow-hidden rounded-full">
                        <div
                          className={cn(
                            "h-full rounded-full",
                            pct >= 100 ? "bg-success" : "bg-warning",
                          )}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <p className="text-muted-foreground mt-1 text-xs">{c.detail}</p>
                    </div>
                  );
                })}
              </>
            )}
          </QueryState>
        </CardContent>
      </Card>
    </AppShell>
  );
}

function isStatus(status: string): string {
  return status === "sent" || status === "approved" ? "Complete" : "In progress";
}
