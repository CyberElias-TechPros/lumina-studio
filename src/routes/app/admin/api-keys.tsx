import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, KeyRound, RefreshCcw, ShieldCheck, Terminal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import { useAdmKeys } from "@/lib/query/adminSystems";
import type { AdmKey } from "@/lib/api/adminSystems";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/admin/api-keys")({
  head: () => ({
    meta: [
      { title: "API Keys & Tokens — CEA-OS" },
      { name: "description", content: "Service tokens and scopes." },
    ],
  }),
  component: AdminApiKeys,
});

function statusTone(status: string) {
  if (/active|verified|connected|on track|published/i.test(status))
    return "bg-success/10 text-success";
  if (/expiring|pending|paused/i.test(status)) return "bg-warning/10 text-warning";
  if (/failed|rejected|revoked/i.test(status)) return "bg-destructive/10 text-destructive";
  return "bg-primary/10 text-primary";
}

function AdminApiKeys() {
  const keysQuery = useAdmKeys();
  return (
    <AppShell
      roleKey="admin"
      title="API keys & service tokens"
      subtitle="14 active · 90-day auto-rotation · scopes enforced"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">2 rotating</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/admin">
              <ArrowLeft className="size-4" /> Admin hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Active keys",
            value: "14",
            delta: "6 service",
            icon: KeyRound,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Last rotated",
            value: "24h",
            delta: "ci-deploy",
            icon: RefreshCcw,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Expiring < 30d",
            value: "2",
            delta: "need rotation",
            icon: ShieldCheck,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Scope violations",
            value: "0",
            delta: "last 30d",
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
            <Terminal className="text-primary size-4" /> Service tokens
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          <QueryState<AdmKey[]>
            query={keysQuery}
            error={{ title: "Failed to load service tokens" }}
            empty={{ title: "No service tokens yet" }}
            isEmpty={(rows) => rows.length === 0}
          >
            {(rows) =>
              rows.map((k) => (
                <div
                  key={k.id}
                  className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-sm font-bold">{k.name}</p>
                    <p className="text-muted-foreground text-xs">
                      {k.scope} · {k.lastUsed}
                    </p>
                  </div>
                  <Badge className={cn("border-0 font-semibold", statusTone(k.status))}>
                    {k.status}
                  </Badge>
                  <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                    Rotate
                  </Button>
                </div>
              ))
            }
          </QueryState>
        </CardContent>
      </Card>
    </AppShell>
  );
}
