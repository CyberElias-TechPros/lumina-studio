import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, Link2, Webhook, Workflow, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import { useAdmIntegrations } from "@/lib/query/adminSystems";
import type { AdmIntegration } from "@/lib/api/adminSystems";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/admin/integrations")({
  head: () => ({
    meta: [
      { title: "Integrations & Webhooks — CEA-OS" },
      { name: "description", content: "Connected services and webhook endpoints." },
    ],
  }),
  component: AdminIntegrations,
});

function statusTone(status: string) {
  if (/active|verified|connected|on track|published/i.test(status))
    return "bg-success/10 text-success";
  if (/expiring|pending|paused/i.test(status)) return "bg-warning/10 text-warning";
  if (/failed|rejected|revoked/i.test(status)) return "bg-destructive/10 text-destructive";
  return "bg-primary/10 text-primary";
}

function AdminIntegrations() {
  const integrationsQuery = useAdmIntegrations();
  return (
    <AppShell
      roleKey="admin"
      title="Integrations & webhooks"
      subtitle="14 apps · 22 webhooks · 99.9% delivery"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">All connected</Badge>
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
            label: "Apps",
            value: "14",
            delta: "12 live",
            icon: Link2,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Webhooks",
            value: "22",
            delta: "3 testing",
            icon: Webhook,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Delivery",
            value: "99.9%",
            delta: "30-day",
            icon: Zap,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Failures (24h)",
            value: "1",
            delta: "retried OK",
            icon: Workflow,
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
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <CheckCircle2 className="text-primary size-4" /> Connected apps
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          <QueryState<AdmIntegration[]>
            query={integrationsQuery}
            error={{ title: "Failed to load integrations" }}
            empty={{ title: "No integrations yet" }}
            isEmpty={(rows) => rows.length === 0}
          >
            {(rows) =>
              rows.map((i) => (
                <div
                  key={i.id}
                  className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold">{i.name}</p>
                    <p className="text-muted-foreground text-xs">{i.detail}</p>
                  </div>
                  <Badge className={cn("border-0 font-semibold", statusTone(i.status))}>
                    {i.status}
                  </Badge>
                  <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                    Configure
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
