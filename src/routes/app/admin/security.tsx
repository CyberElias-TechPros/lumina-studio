import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Fingerprint, Globe, KeyRound, Lock, ShieldAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/admin/security")({
  head: () => ({
    meta: [
      { title: "Security Dashboard — CEA-OS" },
      { name: "description", content: "Logins, 2FA, API keys and IP whitelist." },
    ],
  }),
  component: AdminSecurity,
});

const events = [
  {
    e: "2FA enabled · Adaeze Okafor",
    t: "Jul 31 · 09:14",
    s: "Normal",
    tone: "bg-success/10 text-success",
  },
  {
    e: "API key rotated · ci-deploy",
    t: "Jul 30 · 18:02",
    s: "Normal",
    tone: "bg-success/10 text-success",
  },
  {
    e: "Blocked login · 197.210.x.x",
    t: "Jul 30 · 03:47",
    s: "Blocked",
    tone: "bg-warning/10 text-warning",
  },
];

function AdminSecurity() {
  return (
    <AppShell
      roleKey="admin"
      title="Security dashboard"
      subtitle="All clear · 2,4 14 logins / hr · zero breaches"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">0 alerts</Badge>
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
            label: "2FA coverage",
            value: "96%",
            delta: "of staff",
            icon: Fingerprint,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Blocked attempts",
            value: "34",
            delta: "last 24h",
            icon: ShieldAlert,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "IP whitelist",
            value: "6",
            delta: "ranges",
            icon: Globe,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Active API keys",
            value: "14",
            delta: "2 rotated / mo",
            icon: KeyRound,
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
            <Lock className="text-primary size-4" /> Recent events
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          {events.map((e) => (
            <div key={e.e} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{e.e}</p>
                <p className="text-muted-foreground text-xs">{e.t}</p>
              </div>
              <Badge className={cn("border-0 font-semibold", e.tone)}>{e.s}</Badge>
              <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                Inspect
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
