import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, Component, Eye, Layers, LayoutGrid } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/design/components")({
  head: () => ({
    meta: [
      { title: "Component Explorer — CEA-OS" },
      { name: "description", content: "Component cards with variants, states and usage counts." },
    ],
  }),
  component: ComponentExplorer,
});

const components = [
  {
    t: "Button",
    d: "Primary, secondary, ghost, outline, destructive",
    states: "8 states",
    usage: "312 screens",
    status: "Stable",
    tone: "bg-success/10 text-success",
  },
  {
    t: "Input",
    d: "Text, search, numeric, with prefix icon",
    states: "6 states",
    usage: "198 screens",
    status: "Stable",
    tone: "bg-success/10 text-success",
  },
  {
    t: "Badge",
    d: "Tone badges, dot badges, counter badges",
    states: "4 states",
    usage: "188 screens",
    status: "Stable",
    tone: "bg-success/10 text-success",
  },
  {
    t: "Tabs",
    d: "Underline, pill, segmented",
    states: "4 states",
    usage: "86 screens",
    status: "Beta",
    tone: "bg-warning/10 text-warning",
  },
  {
    t: "Progress",
    d: "Bar, circle, indeterminate",
    states: "5 states",
    usage: "64 screens",
    status: "Beta",
    tone: "bg-warning/10 text-warning",
  },
  {
    t: "Chart",
    d: "Line, bar, donut, sparkline",
    states: "3 states",
    usage: "18 screens",
    status: "Draft",
    tone: "bg-primary/10 text-primary",
  },
];

function ComponentExplorer() {
  return (
    <AppShell
      roleKey="design"
      title="Component explorer"
      subtitle="84 components · 512 variants · 46 in beta"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">78 stable</Badge>
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
            label: "Components",
            value: "84",
            delta: "6 in review",
            icon: Component,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Variants",
            value: "512",
            delta: "+38 this qtr",
            icon: Layers,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "States documented",
            value: "406",
            delta: "94% coverage",
            icon: CheckCircle2,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Usage (screens)",
            value: "1,862",
            delta: "across 3 products",
            icon: Eye,
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

      <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {components.map((c) => (
          <Card key={c.t} className="bg-card shadow-soft border">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <LayoutGrid className="text-primary size-4" /> {c.t}
              </CardTitle>
              <Badge className={cn("border-0 font-semibold", c.tone)}>{c.status}</Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="rounded-xl border p-3">
                <p className="text-muted-foreground text-[10px] font-bold tracking-wide uppercase">
                  Variants
                </p>
                <p className="mt-0.5 text-xs font-semibold">{c.d}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border p-3">
                  <p className="text-muted-foreground text-[10px] font-bold tracking-wide uppercase">
                    States
                  </p>
                  <p className="mt-0.5 text-xs font-semibold">{c.states}</p>
                </div>
                <div className="rounded-xl border p-3">
                  <p className="text-muted-foreground text-[10px] font-bold tracking-wide uppercase">
                    Usage
                  </p>
                  <p className="mt-0.5 text-xs font-semibold">{c.usage}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
