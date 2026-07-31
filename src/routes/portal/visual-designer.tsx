import { createFileRoute } from "@tanstack/react-router";
import {
  Accessibility,
  Eye,
  LayoutGrid,
  MousePointerClick,
  Palette,
  PenTool,
  Ruler,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/portal/visual-designer")({
  head: () => ({
    meta: [
      { title: "Visual & UX Designer — CEA-OS" },
      { name: "description", content: "Design system, component library and experience quality." },
    ],
  }),
  component: VisualDesignerPortal,
});

const projects = [
  {
    t: "Learning hub refresh",
    stage: "Prototyping",
    status: "In progress",
    tone: "bg-primary/10 text-primary",
  },
  {
    t: "Parent app UI kit",
    stage: "Handoff",
    status: "In dev",
    tone: "bg-learning/10 text-learning",
  },
  {
    t: "Alumni portal theme",
    stage: "Ideation",
    status: "Queued",
    tone: "bg-warning/10 text-warning",
  },
];

function VisualDesignerPortal() {
  return (
    <AppShell
      roleKey="instructor"
      title="Visual & UX design"
      subtitle="Design system · 3 products · WCAG AA"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            Token coverage 98%
          </Badge>
          <Badge variant="secondary" className="font-semibold">
            a11y: AA target
          </Badge>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Design tokens",
            value: "212",
            delta: "98% adopted",
            icon: Palette,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Components",
            value: "84",
            delta: "6 in review",
            icon: LayoutGrid,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Usability tests",
            value: "5",
            delta: "this quarter",
            icon: MousePointerClick,
            tone: "bg-success/10 text-success",
          },
          {
            label: "a11y issues",
            value: "3",
            delta: "2 fixed this wk",
            icon: Accessibility,
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
              <PenTool className="text-primary size-4" /> Active projects
            </CardTitle>
          </CardHeader>
          <CardContent className="divide-y">
            {projects.map((p) => (
              <div
                key={p.t}
                className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
              >
                <span className="bg-muted text-muted-foreground grid size-9 shrink-0 place-items-center rounded-lg">
                  <Eye className="size-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold">{p.t}</p>
                  <p className="text-muted-foreground text-xs">{p.stage}</p>
                </div>
                <Badge className={cn("border-0 font-semibold", p.tone)}>{p.status}</Badge>
                <Button variant="outline" size="sm" className="shrink-0">
                  Figma
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-5">
          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <Ruler className="text-primary size-4" /> Design system health
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                {
                  t: "Contrast AA verified",
                  v: "All surfaces",
                  tone: "bg-success/10 text-success",
                },
                { t: "Spacing scale", v: "4px base", tone: "bg-primary/10 text-primary" },
                { t: "Icon set", v: "Lucide · 40px", tone: "bg-learning/10 text-learning" },
              ].map((x) => (
                <div key={x.t} className="flex items-center justify-between rounded-xl border p-3">
                  <span className="text-sm font-semibold">{x.t}</span>
                  <Badge className={cn("border-0 font-semibold", x.tone)}>{x.v}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-gradient-ink text-ink-foreground shadow-elevated border-0">
            <CardContent className="p-6">
              <Accessibility className="text-success size-5" />
              <p className="font-display mt-3 text-base font-extrabold">Accessibility promise</p>
              <p className="text-ink-foreground/70 mt-1 text-sm">
                Every screen ships WCAG AA — keyboards, screen readers and 200% zoom included.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
