"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  FileText,
  Megaphone,
  MessageSquareText,
  Rocket,
  Search,
  Sword,
  Tags,
  Target,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import { usePmOverview } from "@/lib/query/productMarketing";
import type { PmKpi } from "@/lib/api/productMarketing";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/product-marketing/")({
  head: () => ({
    meta: [
      { title: "Product Marketing Hub — CEA-OS" },
      {
        name: "description",
        content: "GTM planning, positioning, competitive intel and launch analytics.",
      },
    ],
  }),
  component: ProductMarketingHub,
});

const screens = [
  {
    icon: Rocket,
    label: "GTM planner",
    desc: "Phases, checklists, owners",
    path: "/app/product-marketing/gtm",
    tone: "bg-primary/10 text-primary",
  },
  {
    icon: Target,
    label: "Positioning",
    desc: "Statements, message house",
    path: "/app/product-marketing/positioning",
    tone: "bg-learning/10 text-learning",
  },
  {
    icon: Sword,
    label: "Competitive intel",
    desc: "Feature gaps, win/loss",
    path: "/app/product-marketing/competitive",
    tone: "bg-success/10 text-success",
  },
  {
    icon: CalendarDays,
    label: "Launch calendar",
    desc: "Dates, phases, owners",
    path: "/app/product-marketing/launch-calendar",
    tone: "bg-warning/10 text-warning",
  },
  {
    icon: Search,
    label: "Market research",
    desc: "Studies, key findings",
    path: "/app/product-marketing/research",
    tone: "bg-career/10 text-career",
  },
  {
    icon: MessageSquareText,
    label: "Messaging matrix",
    desc: "Product x audience grid",
    path: "/app/product-marketing/messaging",
    tone: "bg-community/10 text-community",
  },
  {
    icon: FileText,
    label: "Campaign briefs",
    desc: "Templates, draft statuses",
    path: "/app/product-marketing/briefs",
    tone: "bg-erp/10 text-erp",
  },
  {
    icon: Megaphone,
    label: "Analytics",
    desc: "ROI, win rate, pipeline",
    path: "/app/product-marketing/analytics",
    tone: "bg-services/10 text-services",
  },
];

const kpiMeta = [
  { icon: Rocket, tone: "bg-primary/10 text-primary" },
  { icon: Target, tone: "bg-learning/10 text-learning" },
  { icon: Sword, tone: "bg-success/10 text-success" },
  { icon: Tags, tone: "bg-warning/10 text-warning" },
];

function ProductMarketingHub() {
  const overviewQuery = usePmOverview();

  return (
    <AppShell
      roleKey="product-marketing"
      title="Product marketing hub"
      subtitle="Q3 2026 · 3 launches in flight · GTM on track"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">GTM on track</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/portal/product-marketing">
              <ArrowLeft className="size-4" /> PM portal
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <QueryState<PmKpi[]>
          query={overviewQuery}
          error={{ title: "Metrics unavailable" }}
          empty={{
            title: "No metrics yet",
            description: "Overview KPIs will appear here.",
          }}
          isEmpty={(rows) => rows.length === 0}
        >
          {(rows) => (
            <>
              {rows.map((k, i) => {
                const meta = kpiMeta[i % kpiMeta.length];
                return (
                  <Card key={k.id} className="bg-card shadow-soft border">
                    <CardContent className="p-5">
                      <div className="flex items-center justify-between">
                        <p className="text-muted-foreground text-xs font-bold tracking-wide uppercase">
                          {k.metric}
                        </p>
                        <span
                          className={cn("grid size-8 place-items-center rounded-lg", meta.tone)}
                        >
                          <meta.icon className="size-4" />
                        </span>
                      </div>
                      <p className="font-display mt-3 text-2xl font-extrabold">{k.valueLabel}</p>
                      <p className="text-muted-foreground mt-0.5 text-xs font-semibold">
                        {k.delta}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </>
          )}
        </QueryState>
      </div>

      <Card className="bg-card mt-5 shadow-soft border">
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <Megaphone className="text-primary size-4" /> Workspace
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {screens.map((s) => (
            <Link
              key={s.path}
              to={s.path}
              className="group bg-card shadow-soft hover:shadow-elevated flex flex-col rounded-xl border p-4 transition-all hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between">
                <span className={cn("grid size-9 place-items-center rounded-lg", s.tone)}>
                  <s.icon className="size-4" />
                </span>
                <ArrowRight className="text-muted-foreground group-hover:text-primary size-4 transition-colors" />
              </div>
              <p className="font-display mt-3 text-sm font-extrabold">{s.label}</p>
              <p className="text-muted-foreground mt-1 text-xs">{s.desc}</p>
            </Link>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
