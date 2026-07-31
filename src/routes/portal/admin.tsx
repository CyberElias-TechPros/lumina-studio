import { createFileRoute, Link } from "@tanstack/react-router";
import { Activity, ArrowRight, Database, KeyRound, Server, ShieldCheck, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/portal/admin")({
  head: () => ({
    meta: [
      { title: "System Admin — CEA-OS" },
      {
        name: "description",
        content:
          "Users, roles, security, audit logs and system health for the platform administrator.",
      },
    ],
  }),
  component: AdminPortal,
});

const recentActions = [
  {
    actor: "careerservices@cea.ng",
    action: "Impersonated employer view (audited)",
    time: "09:12",
    tone: "bg-primary/10 text-primary",
  },
  {
    actor: "finance@cea.ng",
    action: "Issued invoice INV-2026-0315",
    time: "08:47",
    tone: "bg-success/10 text-success",
  },
  {
    actor: "registrar@cea.ng",
    action: "Released term 2 transcripts (58)",
    time: "08:20",
    tone: "bg-success/10 text-success",
  },
  {
    actor: "unknown",
    action: "Blocked login attempt — brute force pattern",
    time: "07:55",
    tone: "bg-error/10 text-error",
  },
];

function AdminPortal() {
  return (
    <AppShell
      roleKey="admin"
      title="System administration"
      subtitle="Platform health, security, access"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            All systems nominal
          </Badge>
          <Badge variant="secondary" className="font-semibold">
            v2.14.0
          </Badge>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Registered users",
            value: "4,812",
            delta: "+64 this week",
            icon: Users,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Active sessions",
            value: "312",
            delta: "peak 540",
            icon: Activity,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Uptime (90d)",
            value: "99.98%",
            delta: "0 incidents",
            icon: Server,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Security alerts",
            value: "3",
            delta: "2 resolved",
            icon: ShieldCheck,
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
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <Activity className="text-primary size-4" /> Audit log · today
            </CardTitle>
            <Button asChild variant="ghost" size="sm" className="text-primary font-semibold">
              <Link to="/app">
                Full log <ArrowRight className="ml-1 size-3.5" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="divide-y">
            {recentActions.map((a) => (
              <div
                key={a.action}
                className="flex flex-wrap items-center gap-3 py-3 first:pt-0 last:pb-0"
              >
                <span className="bg-muted text-muted-foreground font-mono grid size-9 shrink-0 place-items-center rounded-lg text-[10px] font-bold">
                  {a.actor.split("@")[0].slice(0, 4)}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-mono truncate text-xs font-bold">{a.actor}</p>
                  <p className="text-muted-foreground text-xs">{a.action}</p>
                </div>
                <span className="text-muted-foreground font-mono text-xs">{a.time}</span>
                <Badge className={cn("h-5 border-0 text-[10px] font-bold", a.tone)}>logged</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-5">
          <Card className="bg-card shadow-soft border">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <KeyRound className="text-primary size-4" /> Roles & access
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { r: "System Admin", c: "2 users" },
                { r: "Staff roles", c: "18 defined" },
                { r: "External roles", c: "9 (employer, client, partner…)" },
                { r: "Pending approvals", c: "5 requests" },
              ].map((x) => (
                <div key={x.r} className="flex items-center justify-between rounded-xl border p-3">
                  <span className="text-sm font-semibold">{x.r}</span>
                  <Badge variant="secondary" className="font-semibold">
                    {x.c}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <Database className="text-primary size-4" /> Backups
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                {
                  t: "Daily snapshot",
                  d: "03:00 UTC · success · 14 days retained",
                  tone: "bg-success/10 text-success",
                },
                {
                  t: "Weekly full",
                  d: "Sunday 02:00 · success · 8 weeks retained",
                  tone: "bg-success/10 text-success",
                },
                {
                  t: "Disaster recovery drill",
                  d: "Next: Sep 15",
                  tone: "bg-primary/10 text-primary",
                },
              ].map((x) => (
                <div key={x.t} className="rounded-xl border p-3.5">
                  <p className="text-sm font-bold">{x.t}</p>
                  <p className="text-muted-foreground mt-0.5 text-xs">{x.d}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-gradient-ink text-ink-foreground shadow-elevated border-0">
            <CardContent className="p-6">
              <ShieldCheck className="text-success size-5" />
              <p className="font-display mt-3 text-base font-extrabold">Security posture</p>
              <p className="text-ink-foreground/70 mt-1 text-sm">
                MFA enforced for staff, 90-day password rotation, quarterly penetration tests. Last
                test: 12 findings, 0 critical.
              </p>
              <Button asChild size="sm" className="bg-gradient-brand shadow-glow mt-4 border-0">
                <Link to="/portal/security">
                  Security portal <ArrowRight className="ml-1 size-3.5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
