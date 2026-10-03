"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  FileText,
  History,
  Megaphone,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import { useGovChanges, useGovOverview } from "@/lib/query/government";
import type { GovChange, GovKpi } from "@/lib/api/government";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/government/changelog")({
  head: () => ({
    meta: [
      { title: "Regulatory Change Log — CEA-OS" },
      { name: "description", content: "Changes to regulations and institutional response." },
    ],
  }),
  component: GovernmentChangelog,
});

const kpiMeta: Record<string, { icon: LucideIcon; tone: string }> = {
  Tracked: { icon: FileText, tone: "bg-primary/10 text-primary" },
  Compliant: { icon: CheckCircle2, tone: "bg-success/10 text-success" },
  "In review": { icon: AlertTriangle, tone: "bg-warning/10 text-warning" },
  "Changed (30d)": { icon: Megaphone, tone: "bg-learning/10 text-learning" },
};

const defaultKpiMeta: { icon: LucideIcon; tone: string } = {
  icon: FileText,
  tone: "bg-primary/10 text-primary",
};

const changeTones: Record<string, string> = {
  Compliant: "bg-success/10 text-success",
  "In review": "bg-warning/10 text-warning",
};

function GovernmentChangelog() {
  const overviewQuery = useGovOverview();
  const changesQuery = useGovChanges();

  return (
    <AppShell
      roleKey="government"
      title="Regulatory change log"
      subtitle="Regulatory watch-list · items that may affect the academy"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">Up to date</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/government">
              <ArrowLeft className="size-4" /> Compliance portal
            </Link>
          </Button>
        </>
      }
    >
      <QueryState<GovKpi[]>
        query={overviewQuery}
        error={{ title: "Metrics unavailable" }}
        empty={{ title: "No metrics", description: "Compliance metrics will appear here." }}
        isEmpty={(rows) => rows.length === 0}
      >
        {(rows) => (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {rows.map((k) => {
              const meta = kpiMeta[k.metric] ?? defaultKpiMeta;
              return (
                <Card key={k.id} className="bg-card shadow-soft border">
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between">
                      <p className="text-muted-foreground text-xs font-bold tracking-wide uppercase">
                        {k.metric}
                      </p>
                      <span className={cn("grid size-8 place-items-center rounded-lg", meta.tone)}>
                        <meta.icon className="size-4" />
                      </span>
                    </div>
                    <p className="font-display mt-3 text-2xl font-extrabold">{k.valueLabel}</p>
                    <p className="text-muted-foreground mt-0.5 text-xs font-semibold">{k.delta}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </QueryState>

      <Card className="bg-card mt-5 shadow-soft border">
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <History className="text-primary size-4" /> Recent changes
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          <QueryState<GovChange[]>
            query={changesQuery}
            error={{ title: "Changes unavailable" }}
            empty={{ title: "No changes", description: "Regulatory changes will show here." }}
            isEmpty={(rows) => rows.length === 0}
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
                    <Badge
                      className={cn(
                        "border-0 font-semibold",
                        changeTones[c.status] ?? "bg-primary/10 text-primary",
                      )}
                    >
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
