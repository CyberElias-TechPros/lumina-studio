import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, Gauge, ShieldAlert, Timer, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/admin/rate-limits")({
  head: () => ({
    meta: [
      { title: "Rate Limiting — CEA-OS" },
      { name: "description", content: "Throttling rules and enforcement." },
    ],
  }),
  component: AdminRateLimits,
});

const rules = [
  {
    r: "API · global",
    v: "600 req/min · burst 1,000",
    s: "Enforcing",
    tone: "bg-success/10 text-success",
  },
  { r: "Auth · login", v: "5 / 15 min per IP", s: "Enforcing", tone: "bg-success/10 text-success" },
  { r: "Webhooks · outbound", v: "120 / min", s: "Enforcing", tone: "bg-success/10 text-success" },
];

function AdminRateLimits() {
  return (
    <AppShell
      roleKey="admin"
      title="Rate limiting & throttling"
      subtitle="16 rules · 8,140 blocks today · 4,9 12 throttled"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">Enforcing</Badge>
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
            label: "Rules",
            value: "16",
            delta: "8 global · 8 per-route",
            icon: Gauge,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Blocks (24h)",
            value: "8.1k",
            delta: "0.9% of traffic",
            icon: ShieldAlert,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Throttled (24h)",
            value: "4.9k",
            delta: "smoothed",
            icon: Timer,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "False positives",
            value: "3",
            delta: "allowlisted",
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
            <Zap className="text-primary size-4" /> Active rules
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          {rules.map((r) => (
            <div key={r.r} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{r.r}</p>
                <p className="text-muted-foreground text-xs">{r.v}</p>
              </div>
              <Badge className={cn("border-0 font-semibold", r.tone)}>{r.s}</Badge>
              <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                Adjust
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
