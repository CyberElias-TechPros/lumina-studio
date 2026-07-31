import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, Clock, GitBranch, History, Undo2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/design/versions")({
  head: () => ({
    meta: [
      { title: "Version History — CEA-OS" },
      { name: "description", content: "Design version timeline with changelogs and rollbacks." },
    ],
  }),
  component: VersionHistory,
});

const versions = [
  {
    t: "v3.2 · Learning hub refresh",
    change: "Rebalanced card grid, added streak widget",
    editor: "Ada Obi",
    when: "2h ago",
    status: "Current",
    tone: "bg-primary/10 text-primary",
  },
  {
    t: "v3.1 · Learning hub refresh",
    change: "Fixed nav overflow on 1280px",
    editor: "Tunde Bakare",
    when: "Yesterday",
    status: "Stable",
    tone: "bg-success/10 text-success",
  },
  {
    t: "v3.0 · Learning hub refresh",
    change: "Token migration to CEA-UI v2.4",
    editor: "Chiamaka Eze",
    when: "Jul 24",
    status: "Stable",
    tone: "bg-success/10 text-success",
  },
  {
    t: "v2.9 · Learning hub refresh",
    change: "Rolled back accent color change",
    editor: "Ngozi Adeyemi",
    when: "Jul 18",
    status: "Archived",
    tone: "bg-muted-foreground/10 text-muted-foreground",
  },
];

function VersionHistory() {
  return (
    <AppShell
      roleKey="design"
      title="Version history"
      subtitle="Learning hub refresh · 23 versions · auto-save on"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">Auto-save on</Badge>
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
            label: "Versions",
            value: "23",
            delta: "this quarter",
            icon: History,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Rollbacks",
            value: "3",
            delta: "2 in July",
            icon: Undo2,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Editors",
            value: "5",
            delta: "design team",
            icon: GitBranch,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Pending review",
            value: "2",
            delta: "versions staged",
            icon: CheckCircle2,
            tone: "bg-success/10 text-success",
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
            <Clock className="text-primary size-4" /> Timeline
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {versions.map((v) => (
            <div key={v.t} className="flex flex-wrap items-center gap-3 rounded-xl border p-4">
              <span className="bg-muted text-muted-foreground grid size-9 shrink-0 place-items-center rounded-lg">
                <History className="size-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{v.t}</p>
                <p className="text-muted-foreground text-xs">
                  {v.change} · {v.editor} · {v.when}
                </p>
              </div>
              <Badge className={cn("border-0 font-semibold", v.tone)}>{v.status}</Badge>
              <Button variant="outline" size="sm" className="shrink-0">
                <Undo2 className="mr-1.5 size-3.5" /> Rollback
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
