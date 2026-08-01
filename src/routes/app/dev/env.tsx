import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, KeyRound, ShieldAlert, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/dev/env")({
  head: () => ({
    meta: [
      { title: "Environment Vars — CEA-OS" },
      { name: "description", content: "Manage environment variables and secrets." },
    ],
  }),
  component: DevEnv,
});

const vars = [
  { k: "VITE_API_URL", v: "https://api.cea.edu.ng", s: "Prod", tone: "bg-success/10 text-success" },
  {
    k: "VITE_PAYSTACK_PUBLIC_KEY",
    v: "pk_live_••••••••",
    s: "Prod",
    tone: "bg-success/10 text-success",
  },
  { k: "VITE_ANALYTICS_ID", v: "G-8QP2X4M9", s: "Staging", tone: "bg-warning/10 text-warning" },
];

function DevEnv() {
  return (
    <AppShell
      roleKey="instructor"
      title="Environment variables"
      subtitle="3 environments · secrets encrypted at rest"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">Synced</Badge>
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
            label: "Variables",
            value: "42",
            delta: "across 3 envs",
            icon: KeyRound,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Secrets",
            value: "6",
            delta: "all encrypted",
            icon: ShieldAlert,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Last rotation",
            value: "12d",
            delta: "automated",
            icon: Sparkles,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Stale vars",
            value: "0",
            delta: "no drift",
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
            <KeyRound className="text-primary size-4" /> Variables
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          {vars.map((v) => (
            <div key={v.k} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="font-mono text-sm font-bold">{v.k}</p>
                <p className="font-mono text-muted-foreground text-xs">{v.v}</p>
              </div>
              <Badge className={cn("border-0 font-semibold", v.tone)}>{v.s}</Badge>
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
