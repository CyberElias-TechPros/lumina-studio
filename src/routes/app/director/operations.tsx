import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Fuel,
  ShieldCheck,
  ThermometerSun,
  Truck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import { useDirBranches } from "@/lib/query/director";
import type { DirBranch } from "@/lib/api/director";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/director/operations")({
  head: () => ({
    meta: [
      { title: "Operations Overview — CEA-OS" },
      { name: "description", content: "Branch performance and operational efficiency." },
    ],
  }),
  component: DirectorOperations,
});

function branchTone(status: string) {
  if (/high/i.test(status)) return "bg-success/10 text-success";
  if (/normal/i.test(status)) return "bg-primary/10 text-primary";
  return "bg-warning/10 text-warning";
}

function DirectorOperations() {
  const branchesQuery = useDirBranches();
  return (
    <AppShell
      roleKey="director"
      title="Operations overview"
      subtitle="3 campuses · 82% utilization · 0 incidents (30d)"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            Efficiency 91%
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
            label: "Utilization",
            value: "82%",
            delta: "peak 94%",
            icon: Building2,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Cost / seat-day",
            value: "₦9.2",
            delta: "−4% QoQ",
            icon: Fuel,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Fleet uptime",
            value: "97%",
            delta: "3 vehicles",
            icon: Truck,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Incidents",
            value: "0",
            delta: "down from 3",
            icon: ShieldCheck,
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
            <ThermometerSun className="text-primary size-4" /> Branch performance · July
          </CardTitle>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/ops/reports">
              Ops reports <ArrowRight className="ml-1 size-3.5" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent className="divide-y">
          <QueryState<DirBranch[]>
            query={branchesQuery}
            empty={{ title: "No branch data yet" }}
            error={{ title: "Failed to load branches" }}
            isEmpty={(rows) => rows.length === 0}
          >
            {(rows) =>
              rows.map((b) => (
                <div
                  key={b.id}
                  className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold">{b.name}</p>
                    <p className="text-muted-foreground text-xs">Cost {b.cost}</p>
                  </div>
                  <div className="bg-muted h-2 w-32 overflow-hidden rounded-full">
                    <div
                      className={cn(
                        "h-full rounded-full",
                        parseInt(b.utilization) >= 70 ? "bg-success" : "bg-warning",
                      )}
                      style={{ width: b.utilization }}
                    />
                  </div>
                  <Badge className={cn("shrink-0 border-0 font-semibold", branchTone(b.status))}>
                    {b.utilization} used
                  </Badge>
                </div>
              ))
            }
          </QueryState>
        </CardContent>
      </Card>
    </AppShell>
  );
}
