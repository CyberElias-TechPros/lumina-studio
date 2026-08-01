import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, Component, LayoutGrid, Layers, Palette } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import { useDesignKpis, useSystemComponents } from "@/lib/query/design";
import type { SystemComponent } from "@/lib/api/design";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/design/system")({
  head: () => ({
    meta: [
      { title: "Design System — CEA-OS" },
      {
        name: "description",
        content: "Design system manager with token groups and component status.",
      },
    ],
  }),
  component: DesignSystem,
});

function systemTone(status: string): string {
  if (status === "Stable") return "bg-success/10 text-success";
  if (status === "Beta") return "bg-warning/10 text-warning";
  if (status === "In review") return "bg-primary/10 text-primary";
  return "bg-muted-foreground/10 text-muted-foreground";
}

function DesignSystem() {
  const query = useSystemComponents();
  const kpis = useDesignKpis();
  const kpi = (id: string) => kpis.data?.find((k) => k.id === id)?.value ?? 0;
  const components = query.data?.pages.flatMap((p) => p.items) ?? [];
  return (
    <AppShell
      roleKey="design"
      title="Design system"
      subtitle="CEA-UI v2.4 · 212 tokens · 84 components · WCAG AA"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">98% coverage</Badge>
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
            label: "Token groups",
            value: String(kpi("system-groups")),
            delta: "color, type, spacing...",
            icon: Palette,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Components",
            value: String(components.length),
            delta: "78 stable",
            icon: Component,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Adoption",
            value: `${String(kpi("system-adoption"))}%`,
            delta: "across 3 products",
            icon: LayoutGrid,
            tone: "bg-success/10 text-success",
          },
          {
            label: "In review",
            value: String(components.filter((c) => c.status === "In review").length),
            delta: "2 blockers",
            icon: CheckCircle2,
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

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.5fr_1fr]">
        <Card className="bg-card shadow-soft border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <Component className="text-primary size-4" /> Component status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Component</TableHead>
                  <TableHead>Variants</TableHead>
                  <TableHead>States</TableHead>
                  <TableHead>Usage</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <QueryState<SystemComponent[]>
                  query={query}
                  error={{ title: "Components unavailable" }}
                >
                  {(rows) => (
                    <>
                      {rows.map((c) => (
                        <TableRow key={c.t}>
                          <TableCell className="font-semibold">{c.t}</TableCell>
                          <TableCell>{c.variants}</TableCell>
                          <TableCell>{c.states}</TableCell>
                          <TableCell className="text-muted-foreground">{c.usage} screens</TableCell>
                          <TableCell>
                            <Badge className={cn("border-0 font-semibold", systemTone(c.status))}>
                              {c.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </>
                  )}
                </QueryState>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="bg-card shadow-soft border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <Layers className="text-primary size-4" /> Token group health
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { l: "Color", v: 99, s: "142 tokens" },
              { l: "Spacing", v: 96, s: "12 steps" },
              { l: "Typography", v: 94, s: "24 styles" },
              { l: "Elevation", v: 88, s: "9 shadows" },
            ].map((x) => (
              <div key={x.l}>
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-sm font-bold">{x.l}</span>
                  <span className="text-muted-foreground">
                    {x.v}% · {x.s}
                  </span>
                </div>
                <Progress value={x.v} className="mt-1.5 h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
