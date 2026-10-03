"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { ArrowLeft, Building2, GraduationCap, MapPin, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { useBranches, useBranchItems } from "@/lib/query/ops";
import type { Branch } from "@/lib/api/ops";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/ops/branches")({
  head: () => ({
    meta: [
      { title: "Branches — CEA-OS" },
      {
        name: "description",
        content: "Multi-campus operations, capacity and resource utilization.",
      },
    ],
  }),
  component: OperationsBranches,
});

const statusBadge: Record<string, { label: string; tone: string }> = {
  healthy: { label: "Healthy", tone: "bg-success/10 text-success" },
  steady: { label: "Steady", tone: "bg-primary/10 text-primary" },
  underused: { label: "Underused", tone: "bg-warning/10 text-warning" },
};

function utilization(b: Branch): number {
  return b.capacity > 0 ? Math.round((b.occupied / b.capacity) * 100) : 0;
}

function OperationsBranches() {
  const query = useBranches();
  const branches = useBranchItems();

  const totalCapacity = branches.reduce((s, b) => s + b.capacity, 0);
  const totalOccupied = branches.reduce((s, b) => s + b.occupied, 0);
  const staff = branches.reduce((s, b) => s + b.staffOnsite, 0);
  const avgUtil = totalCapacity > 0 ? Math.round((totalOccupied / totalCapacity) * 100) : 0;
  const underused = branches.filter((b) => b.status === "underused").length;

  return (
    <AppShell
      roleKey="ops"
      title="Branch management"
      subtitle={
        branches.length > 0
          ? `${branches.length} campuses · ${totalCapacity} seats · ${avgUtil}% avg utilization`
          : "Loading branches…"
      }
      actions={
        <>
          <Badge
            className={cn(
              "border-0 font-semibold",
              underused > 0 ? "bg-warning/10 text-warning" : "bg-success/10 text-success",
            )}
          >
            {underused > 0 ? `${underused} campus underused` : "All campuses live"}
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
            label: "Branches",
            value: branches.length > 0 ? String(branches.length) : "—",
            delta: branches.length > 1 ? "multi-campus" : "single campus",
            icon: Building2,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Total capacity",
            value: totalCapacity > 0 ? String(totalCapacity) : "—",
            delta: "seats across campuses",
            icon: Users,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Avg utilization",
            value: avgUtil > 0 ? `${avgUtil}%` : "—",
            delta: "target 75–90%",
            icon: GraduationCap,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Staff on site",
            value: staff > 0 ? String(staff) : "—",
            delta: "across campuses",
            icon: MapPin,
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
            <Building2 className="text-primary size-4" /> Campus snapshot
          </CardTitle>
          <Button variant="outline" size="sm" className="font-semibold">
            Add branch
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <QueryState<Branch[]>
            query={query}
            error={{ title: "Branches unavailable" }}
            empty={{
              title: "No branches yet",
              description: "Campus records will show here.",
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
                    <div key={b.id} className="rounded-xl border p-4">
                      <div className="flex flex-wrap items-center gap-3">
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-bold">{b.name}</p>
                          <p className="text-muted-foreground text-xs">{b.location}</p>
                        </div>
                        <Badge className={cn("border-0 font-semibold", badge.tone)}>
                          {badge.label}
                        </Badge>
                        <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                          Manage
                        </Button>
                      </div>
                      <div className="mt-3">
                        <div className="text-muted-foreground flex justify-between text-xs font-semibold">
                          <span>
                            {b.occupied} / {b.capacity} seats
                          </span>
                          <span>{util}%</span>
                        </div>
                        <div className="bg-muted mt-1.5 h-2 overflow-hidden rounded-full">
                          <div
                            className={cn(
                              "h-full rounded-full",
                              util >= 70 ? "bg-success" : "bg-warning",
                            )}
                            style={{ width: `${util}%` }}
                          />
                        </div>
                      </div>
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
