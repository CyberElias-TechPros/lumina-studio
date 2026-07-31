import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, Flag, GitBranch, Sparkles, ToggleRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/dev/feature-flags")({
  head: () => ({
    meta: [
      { title: "Feature Flags — CEA-OS" },
      { name: "description", content: "Toggle features across environments." },
    ],
  }),
  component: DevFeatureFlags,
});

const flags = [
  {
    f: "new-payment-flow",
    e: "production · 100%",
    s: "Enabled",
    tone: "bg-success/10 text-success",
  },
  {
    f: "ai-admissions-coach",
    e: "staging · 25%",
    s: "Rollout",
    tone: "bg-warning/10 text-warning",
  },
  { f: "dark-mode", e: "production · 0%", s: "Off", tone: "bg-muted text-muted-foreground" },
];

function DevFeatureFlags() {
  return (
    <AppShell
      roleKey="instructor"
      title="Feature flags"
      subtitle="18 flags · 3 environments · kill switch armed"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            No stale flags
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/dev">
              <ArrowLeft className="size-4" /> Dev hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Active flags",
            value: "11",
            delta: "in production",
            icon: ToggleRight,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Rolling out",
            value: "3",
            delta: "1 near 100%",
            icon: GitBranch,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Stale",
            value: "0",
            delta: "auto-cleaned",
            icon: Sparkles,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Kill switches",
            value: "4",
            delta: "armed",
            icon: Flag,
            tone: "bg-learning/10 text-learning",
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
            <CheckCircle2 className="text-primary size-4" /> Flags
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          {flags.map((f) => (
            <div key={f.f} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="font-mono text-sm font-bold">{f.f}</p>
                <p className="text-muted-foreground text-xs">{f.e}</p>
              </div>
              <Badge className={cn("border-0 font-semibold", f.tone)}>{f.s}</Badge>
              <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                Toggle
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
