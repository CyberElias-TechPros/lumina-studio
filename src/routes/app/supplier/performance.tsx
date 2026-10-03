"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { ArrowLeft, Award, Gauge, MessageSquare, Star, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import { useSupPerformance, useSupPerformanceItems } from "@/lib/query/supplierPartner";
import type { SupPerformance } from "@/lib/api/supplierPartner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/supplier/performance")({
  head: () => ({
    meta: [
      { title: "Performance — CEA-OS" },
      { name: "description", content: "Ratings and delivery history." },
    ],
  }),
  component: SupplierPerformance,
});

function SupplierPerformance() {
  const performanceQuery = useSupPerformance();
  const performance = useSupPerformanceItems();

  const overall = performance.find((p) => p.metric === "Overall")?.valueLabel ?? "—";
  const onTime = performance.find((p) => p.metric === "Delivery on-time")?.valueLabel ?? "—";

  return (
    <AppShell
      roleKey="supplier"
      title="Performance"
      subtitle={`Overall rating ${overall} · rated by CEA procurement`}
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            {onTime} on time
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/supplier">
              <ArrowLeft className="size-4" /> Supplier hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Overall rating",
            value: overall,
            delta: "across all metrics",
            icon: Star,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Delivery on-time",
            value: onTime,
            delta: "last 12 months",
            icon: Gauge,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Top metric",
            value: "Quality",
            delta: "4.9 / 5",
            icon: Award,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Trend",
            value: "+0.1",
            delta: "this quarter",
            icon: TrendingUp,
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
            <MessageSquare className="text-primary size-4" /> Rating breakdown
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          <QueryState<SupPerformance[]>
            query={performanceQuery}
            error={{ title: "Ratings unavailable" }}
            empty={{ title: "No ratings yet", description: "Ratings appear after reviews." }}
            isEmpty={(rows) => rows.length === 0}
          >
            {(rows) => (
              <>
                {rows
                  .filter((p) => p.metric !== "Overall")
                  .map((p) => (
                    <div
                      key={p.id}
                      className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold">{p.metric}</p>
                        <div className="bg-muted mt-2 h-2 w-full max-w-md overflow-hidden rounded-full">
                          <div
                            className="bg-primary h-full rounded-full"
                            style={{ width: `${Math.min(100, parseFloat(p.valueLabel) * 20)}%` }}
                          />
                        </div>
                      </div>
                      <p className="font-display text-sm font-extrabold">{p.valueLabel}</p>
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
