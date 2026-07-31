import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowRight,
  FileWarning,
  Fingerprint,
  ShieldAlert,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/portal/security")({
  head: () => ({
    meta: [
      { title: "Security Operations — CEA-OS" },
      {
        name: "description",
        content: "Threat monitoring, access reviews and incident response for the security team.",
      },
    ],
  }),
  component: SecurityPortal,
});

const alerts = [
  {
    t: "Brute-force pattern on SSO endpoint",
    severity: "High",
    status: "Investigating",
    tone: "bg-error/10 text-error",
  },
  {
    t: "New device logins — cohort batch",
    severity: "Info",
    status: "Auto-approved",
    tone: "bg-success/10 text-success",
  },
  {
    t: "Certificate API rate spike",
    severity: "Medium",
    status: "Monitoring",
    tone: "bg-warning/10 text-warning",
  },
];

function SecurityPortal() {
  return (
    <AppShell
      roleKey="admin"
      title="Security operations"
      subtitle="Threat monitoring · access · incident response"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            SOC 2: in progress
          </Badge>
          <Badge variant="secondary" className="font-semibold">
            NDPR compliant
          </Badge>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Open incidents",
            value: "1",
            delta: "high · investigating",
            icon: ShieldAlert,
            tone: "bg-error/10 text-error",
          },
          {
            label: "Alerts (24h)",
            value: "14",
            delta: "11 triaged",
            icon: AlertTriangle,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "MFA coverage",
            value: "100%",
            delta: "staff + learners",
            icon: Fingerprint,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Access reviews",
            value: "5",
            delta: "2 due this month",
            icon: UserCheck,
            tone: "bg-primary/10 text-primary",
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
              <ShieldAlert className="text-primary size-4" /> Active alerts
            </CardTitle>
            <Badge variant="secondary" className="font-semibold">
              Auto-triaged by SIEM
            </Badge>
          </CardHeader>
          <CardContent className="divide-y">
            {alerts.map((a) => (
              <div
                key={a.t}
                className="flex flex-wrap items-center gap-3 py-3.5 first:pt-0 last:pb-0"
              >
                <span className="bg-muted text-muted-foreground grid size-9 shrink-0 place-items-center rounded-lg">
                  <AlertTriangle className="size-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold">{a.t}</p>
                  <p className="text-muted-foreground text-xs">severity: {a.severity}</p>
                </div>
                <Badge className={cn("border-0 font-semibold", a.tone)}>{a.status}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-5">
          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <FileWarning className="text-primary size-4" /> Incident history
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                {
                  t: "Phishing simulation",
                  d: "July · 12% click rate, all coached",
                  tone: "bg-success/10 text-success",
                },
                {
                  t: "API key leak (partner)",
                  d: "June · rotated in 40 min",
                  tone: "bg-success/10 text-success",
                },
                {
                  t: "Assessment tampering attempt",
                  d: "May · blocked by proctoring",
                  tone: "bg-warning/10 text-warning",
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
              <p className="font-display mt-3 text-base font-extrabold">Pen-test: August</p>
              <p className="text-ink-foreground/70 mt-1 text-sm">
                External scoping complete. 12 findings last round — 0 critical, all remediated
                within 14 days.
              </p>
              <Button asChild size="sm" className="bg-gradient-brand shadow-glow mt-4 border-0">
                <Link to="/portal/admin">
                  Admin console <ArrowRight className="ml-1 size-3.5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
