import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Boxes, CheckSquare, Plus, Split, Workflow, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { useWorkflows, useWorkflowItems } from "@/lib/query/ops";
import type { Workflow as WorkflowItem } from "@/lib/api/ops";
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

function OperationsAutomation() {
  const query = useWorkflows();
  const workflows = useWorkflowItems();

  const live = workflows.filter((w) => w.status === "active").length;
  const drafts = workflows.filter((w) => w.status === "draft").length;
  const approvals = workflows.filter((w) => w.stats.includes("approvals")).length;

  return (
    <AppShell
      roleKey="ops"
      title="Process automation"
      subtitle={
        workflows.length > 0
          ? `Visual builder · ${live} live workflows · ${drafts} drafts`
          : "Loading workflows…"
      }
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            {live > 0 ? `${live} live` : "—"}
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
            value: workflows.length > 0 ? String(live) : "—",
            delta: "all healthy",
            icon: Workflow,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Total workflows",
            value: workflows.length > 0 ? String(workflows.length) : "—",
            delta: "in the builder",
            icon: Zap,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Drafts",
            value: drafts > 0 ? String(drafts) : "0",
            delta: "awaiting activation",
            icon: Split,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Approvals",
            value: approvals > 0 ? String(approvals) : "0",
            delta: "need review",
            icon: CheckSquare,
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
          <QueryState<WorkflowItem[]>
            query={query}
            error={{ title: "Workflows unavailable" }}
            empty={{
              title: "No workflows yet",
              description: "Built workflows will appear in the builder.",
            }}
            isEmpty={(rows) => rows.length === 0}
          >
            {(rows) => (
              <>
                {rows.map((b) => (
                  <div
                    key={b.id}
                    className="flex flex-wrap items-center gap-3 rounded-xl border p-3.5"
                  >
                    <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-success/10 text-success">
                      <Zap className="size-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold">{b.name}</p>
                      <p className="text-muted-foreground text-xs">{b.triggerDetail}</p>
                    </div>
                    <Badge className="border-0 bg-primary/10 font-semibold text-primary">
                      {b.stats}
                    </Badge>
                    <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                      Edit
                    </Button>
                  </div>
                ))}
              </>
            )}
          </QueryState>
          <p className="text-muted-foreground flex items-center gap-1.5 text-xs font-semibold">
            <Boxes className="size-3.5" /> Triggers, actions and approvals are configured here.
          </p>
        </CardContent>
      </Card>
    </AppShell>
  );
}
