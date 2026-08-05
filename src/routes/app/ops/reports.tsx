import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, BarChart3, Building2, FileBarChart2, Landmark, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { useBranches, useBranchItems } from "@/lib/query/ops";
import type { Branch } from "@/lib/api/ops";
import { cn, formatNairaCompact } from "@/lib/utils";

export const Route = createFileRoute("/app/ops/reports")({
  head: () => ({
    meta: [
      { title: "Ops Reports — CEA-OS" },
      { name: "description", content: "Operational efficiency and cost per branch." },
    ],
  }),
  component: OperationsReports,
});

const reports = [
  {
    r: "Monthly operations report",
    d: "July · published Aug 2",
    tone: "bg-success/10 text-success",
  },
  {
    r: "Energy & fuel consumption",
    d: "Q2 · published Jul 15",
    tone: "bg-primary/10 text-primary",
  },
  {
    r: "Supplier performance review",
    d: "July · published Jul 31",
    tone: "bg-learning/10 text-learning",
  },
];

const statusBadge: Record<string, { label: string; tone: string }> = {
  healthy: { label: "Healthy", tone: "bg-success/10 text-success" },
  steady: { label: "Steady", tone: "bg-primary/10 text-primary" },
  underused: { label: "Underused", tone: "bg-warning/10 text-warning" },
};

function utilization(b: Branch): number {
  return b.capacity > 0 ? Math.round((b.occupied / b.capacity) * 100) : 0;
}

function OperationsReports() {
  const query = useBranches();
  const branches = useBranchItems();

  const totalCapacity = branches.reduce((s, b) => s + b.capacity, 0);
  const totalOccupied = branches.reduce((s, b) => s + b.occupied, 0);
  const avgUtil = totalCapacity > 0 ? Math.round((totalOccupied / totalCapacity) * 100) : 0;
  const avgCost =
    branches.length > 0
      ? Math.round(branches.reduce((s, b) => s + b.costSeatDay, 0) / branches.length)
      : 0;

  return (
    <AppShell
      roleKey="instructor"
      title="Reports & analytics"
      subtitle={
        branches.length > 0 ? `Efficiency by campus · updated daily 07:00` : "Loading reports…"
      }
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            {branches.length > 0 ? `${avgUtil}% utilization` : "—"}
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/portal/operations">
              <ArrowLeft className="size-4" /> Operations
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Cost per seat-day",
            value: avgCost > 0 ? formatNairaCompact(avgCost) : "—",
            delta: "average across campuses",
            icon: Landmark,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Utilization",
            value: avgUtil > 0 ? `${avgUtil}%` : "—",
            delta: "target 75–90%",
            icon: TrendingUp,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Seats tracked",
            value: totalCapacity > 0 ? String(totalCapacity) : "—",
            delta: "across campuses",
            icon: BarChart3,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Branches",
            value: branches.length > 0 ? String(branches.length) : "—",
            delta: "campuses reporting",
            icon: Building2,
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
            <Landmark className="text-primary size-4" /> Cost per branch · July
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          <QueryState<Branch[]>
            query={query}
            error={{ title: "Branch data unavailable" }}
            empty={{
              title: "No branches yet",
              description: "Per-branch cost data will show here.",
            }}
            isEmpty={(rows) => rows.length === 0}
          >
            {(rows) => (
              <>
                {rows.map((b) => {
                  const util = utilization(b);
                  const badge = statusBadge[b.status] ?? {
                    label: b.status,
                    tone: "bg-muted/20 text-muted-foreground",
                  };
                  return (
                    <div
                      key={b.id}
                      className="flex flex-wrap items-center gap-3 py-3.5 first:pt-0 last:pb-0"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold">{b.name}</p>
                        <p className="text-muted-foreground text-xs">Utilization {util}%</p>
                      </div>
                      <p className="text-sm font-semibold">
                        {formatNairaCompact(b.costSeatDay)} / seat-day
                      </p>
                      <Badge className={cn("border-0 font-semibold", badge.tone)}>
                        {badge.label}
                      </Badge>
                    </div>
                  );
                })}
              </>
            )}
          </QueryState>
        </CardContent>
      </Card>

      <Card className="bg-card mt-5 shadow-soft border">
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <FileBarChart2 className="text-primary size-4" /> Published reports
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {reports.map((r) => (
            <div key={r.r} className="flex flex-wrap items-center gap-3 rounded-xl border p-3">
              <span className={cn("grid size-9 shrink-0 place-items-center rounded-lg", r.tone)}>
                <FileBarChart2 className="size-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{r.r}</p>
                <p className="text-muted-foreground text-xs">{r.d}</p>
              </div>
              <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                Open
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
