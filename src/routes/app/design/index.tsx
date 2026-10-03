"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import {
  ArrowLeft,
  ArrowRight,
  Component,
  Download,
  History,
  LayoutDashboard,
  MessagesSquare,
  MousePointerClick,
  Palette,
  Pipette,
  Workflow,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { useDesignKpis } from "@/lib/query/design";
import type { DesignKpi } from "@/lib/api/design";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/design/")({
  head: () => ({
    meta: [
      { title: "Design Hub — CEA-OS" },
      {
        name: "description",
        content: "Design system, components, prototypes, tokens and collaboration.",
      },
    ],
  }),
  component: DesignHub,
});

const screens = [
  {
    icon: Palette,
    label: "Design system",
    desc: "Token groups, component status",
    path: "/app/design/system",
    tone: "bg-primary/10 text-primary",
  },
  {
    icon: Component,
    label: "Components",
    desc: "Variants, states, usage",
    path: "/app/design/components",
    tone: "bg-learning/10 text-learning",
  },
  {
    icon: MousePointerClick,
    label: "Prototypes",
    desc: "Versions, feedback count",
    path: "/app/design/prototypes",
    tone: "bg-success/10 text-success",
  },
  {
    icon: Workflow,
    label: "User flows",
    desc: "Steps, decision points",
    path: "/app/design/flows",
    tone: "bg-warning/10 text-warning",
  },
  {
    icon: Pipette,
    label: "Token editor",
    desc: "Color, spacing, type",
    path: "/app/design/tokens",
    tone: "bg-career/10 text-career",
  },
  {
    icon: Download,
    label: "Exports",
    desc: "Asset export center",
    path: "/app/design/exports",
    tone: "bg-community/10 text-community",
  },
  {
    icon: MessagesSquare,
    label: "Collaboration",
    desc: "Threads, annotations",
    path: "/app/design/collaboration",
    tone: "bg-erp/10 text-erp",
  },
  {
    icon: History,
    label: "Versions",
    desc: "Timeline, changelogs",
    path: "/app/design/versions",
    tone: "bg-services/10 text-services",
  },
];

function DesignHub() {
  const kpis = useDesignKpis();

  return (
    <AppShell
      roleKey="design"
      title="Design hub"
      subtitle="212 tokens · 84 components · 5 prototypes · WCAG AA"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            Token coverage 98%
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/portal/visual-designer">
              <ArrowLeft className="size-4" /> Design portal
            </Link>
          </Button>
        </>
      }
    >
      <QueryState<DesignKpi[]> query={kpis} error={{ title: "Design KPIs unavailable" }}>
        {(rows) => {
          const value = (id: string) => rows.find((k) => k.id === id)?.value ?? 0;
          return (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[
                {
                  label: "Design tokens",
                  value: String(value("hub-tokens")),
                  delta: "98% adopted",
                  icon: Palette,
                  tone: "bg-primary/10 text-primary",
                },
                {
                  label: "Components",
                  value: String(value("hub-components")),
                  delta: "6 in review",
                  icon: Component,
                  tone: "bg-learning/10 text-learning",
                },
                {
                  label: "Prototypes",
                  value: String(value("hub-prototypes")),
                  delta: "2 in testing",
                  icon: MousePointerClick,
                  tone: "bg-success/10 text-success",
                },
                {
                  label: "Open feedback",
                  value: String(value("hub-feedback")),
                  delta: "4 resolved this wk",
                  icon: MessagesSquare,
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
          );
        }}
      </QueryState>

      <Card className="bg-card mt-5 shadow-soft border">
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <LayoutDashboard className="text-primary size-4" /> Workspace
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
