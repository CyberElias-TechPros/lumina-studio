import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Boxes, Plus, Split, Workflow, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/ops/automation")({
  head: () => ({
    meta: [
      { title: "Process Automation — CEA-OS" },
      { name: "description", content: "Visual workflow builder for operations processes." },
    ],
  }),
  component: OperationsAutomation,
});

const builders = [
  {
    w: "Visitor badge → notify host",
    d: "Trigger: visitor checks in",
    s: "38 runs · 0 errors",
    tone: "bg-success/10 text-success",
  },
  {
    w: "Low stock → supplier PO",
    d: "Trigger: SKU below reorder point",
    s: "11 runs · 2 approvals",
    tone: "bg-primary/10 text-primary",
  },
  {
    w: "Room book → AC + lights",
    d: "Trigger: booking confirmed",
    s: "9 runs · sync OK",
    tone: "bg-learning/10 text-learning",
  },
];

function OperationsAutomation() {
  return (
    <AppShell
      roleKey="instructor"
      title="Process automation"
      subtitle="Visual builder · 6 live workflows · 2 drafts"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            38 runs this week
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/portal/operations">
              <ArrowLeft className="size-4" /> Operations
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Live workflows",
            value: "6",
            delta: "all healthy",
            icon: Workflow,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Runs this week",
            value: "38",
            delta: "+12% vs last",
            icon: Zap,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Error rate",
            value: "0.3%",
            delta: "2 retries auto",
            icon: Split,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Hours saved",
            value: "14h",
            delta: "per week est.",
            icon: Boxes,
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
            <Workflow className="text-primary size-4" /> Workflow builder
          </CardTitle>
          <Button size="sm" className="bg-gradient-brand shadow-glow border-0 font-semibold">
            <Plus className="size-4" /> New workflow
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {builders.map((b) => (
            <div key={b.w} className="flex flex-wrap items-center gap-3 rounded-xl border p-3.5">
              <span className={cn("grid size-9 shrink-0 place-items-center rounded-lg", b.tone)}>
                <Zap className="size-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{b.w}</p>
                <p className="text-muted-foreground text-xs">{b.d}</p>
              </div>
              <Badge className={cn("border-0 font-semibold", b.tone)}>{b.s}</Badge>
              <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                Edit
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
