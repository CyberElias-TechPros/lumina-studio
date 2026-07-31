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

const components = [
  {
    t: "Button",
    variants: "12",
    states: "8",
    usage: "312",
    status: "Stable",
    tone: "bg-success/10 text-success",
  },
  {
    t: "Card",
    variants: "9",
    states: "6",
    usage: "204",
    status: "Stable",
    tone: "bg-success/10 text-success",
  },
  {
    t: "Badge",
    variants: "7",
    states: "4",
    usage: "188",
    status: "Stable",
    tone: "bg-success/10 text-success",
  },
  {
    t: "Table",
    variants: "5",
    states: "4",
    usage: "96",
    status: "Beta",
    tone: "bg-warning/10 text-warning",
  },
  {
    t: "Command palette",
    variants: "3",
    states: "5",
    usage: "42",
    status: "In review",
    tone: "bg-primary/10 text-primary",
  },
  {
    t: "Chart",
    variants: "6",
    states: "3",
    usage: "18",
    status: "Draft",
    tone: "bg-muted-foreground/10 text-muted-foreground",
  },
];

function DesignSystem() {
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
            value: "9",
            delta: "color, type, spacing...",
            icon: Palette,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Components",
            value: "84",
            delta: "78 stable",
            icon: Component,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Adoption",
            value: "98%",
            delta: "across 3 products",
            icon: LayoutGrid,
            tone: "bg-success/10 text-success",
          },
          {
            label: "In review",
            value: "6",
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
                {components.map((c) => (
                  <TableRow key={c.t}>
                    <TableCell className="font-semibold">{c.t}</TableCell>
                    <TableCell>{c.variants}</TableCell>
                    <TableCell>{c.states}</TableCell>
                    <TableCell className="text-muted-foreground">{c.usage} screens</TableCell>
                    <TableCell>
                      <Badge className={cn("border-0 font-semibold", c.tone)}>{c.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
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
