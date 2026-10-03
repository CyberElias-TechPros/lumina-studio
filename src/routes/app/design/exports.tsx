"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { ArrowLeft, Download, FileDown, Layers, Package, QrCode } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { useDesignExports, useDesignKpis } from "@/lib/query/design";
import type { DesignExport } from "@/lib/api/design";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/design/exports")({
  head: () => ({
    meta: [
      { title: "Asset Exports — CEA-OS" },
      { name: "description", content: "Asset export requests with format, size and status." },
    ],
  }),
  component: ExportCenter,
});

function exportTone(status: string): string {
  if (status === "Ready") return "bg-success/10 text-success";
  if (status === "Processing") return "bg-primary/10 text-primary";
  if (status === "Queued") return "bg-warning/10 text-warning";
  return "bg-error/10 text-error";
}

function ExportCenter() {
  const query = useDesignExports();
  const kpis = useDesignKpis();
  const kpi = (id: string) => kpis.data?.find((k) => k.id === id)?.value ?? 0;
  return (
    <AppShell
      roleKey="design"
      title="Asset export center"
      subtitle="28 requests this week · 22 delivered · queue healthy"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">22 delivered</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/design">
              <ArrowLeft className="size-4" /> Design hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Requests (wk)",
            value: String(kpi("exports-requests")),
            delta: "+6 vs last wk",
            icon: Download,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Formats",
            value: String(kpi("exports-formats")),
            delta: "SVG, PNG, WebP, CSS",
            icon: FileDown,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Delivered",
            value: String(kpi("exports-delivered")),
            delta: "79% same-day",
            icon: Package,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Pending",
            value: String(kpi("exports-pending")),
            delta: "1 failed retry",
            icon: QrCode,
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
            <Layers className="text-primary size-4" /> Recent exports
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          <QueryState<DesignExport[]> query={query} error={{ title: "Exports unavailable" }}>
            {(rows) => (
              <>
                {rows.map((e) => (
                  <div
                    key={e.t}
                    className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                  >
                    <span className="bg-muted text-muted-foreground grid size-9 shrink-0 place-items-center rounded-lg">
                      <FileDown className="size-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold">{e.t}</p>
                      <p className="text-muted-foreground text-xs">
                        {e.format} · {e.size} · {e.owner}
                      </p>
                    </div>
                    <Badge className={cn("border-0 font-semibold", exportTone(e.status))}>
                      {e.status}
                    </Badge>
                    <Button variant="outline" size="sm" className="shrink-0">
                      Download
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
