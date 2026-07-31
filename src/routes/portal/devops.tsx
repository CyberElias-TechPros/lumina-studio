import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Boxes,
  CheckCircle2,
  CloudCog,
  Gauge,
  Server,
  ShieldCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/portal/devops")({
  head: () => ({
    meta: [
      { title: "DevOps — CEA-OS" },
      {
        name: "description",
        content: "Infrastructure, pipelines, observability and cost for the platform.",
      },
    ],
  }),
  component: DevOpsPortal,
});

const services = [
  { s: "ceapi-api", v: 42, tone: "bg-success/10 text-success" },
  { s: "ceapi-worker", v: 67, tone: "bg-success/10 text-success" },
  { s: "ceapi-pdfs", v: 83, tone: "bg-warning/10 text-warning" },
  { s: "ceapi-search", v: 21, tone: "bg-primary/10 text-primary" },
];

function DevOpsPortal() {
  return (
    <AppShell
      roleKey="admin"
      title="DevOps & infrastructure"
      subtitle="AWS · EKS · Terraform · observability"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">Deploy: green</Badge>
          <Badge variant="secondary" className="font-semibold">
            Cost: ₦4.2m/mo
          </Badge>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Services",
            value: "34",
            delta: "3 clusters",
            icon: Boxes,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "p95 latency",
            value: "240ms",
            delta: "target 300ms",
            icon: Gauge,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Error rate",
            value: "0.4%",
            delta: "SLO 1%",
            icon: Server,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "IaC coverage",
            value: "97%",
            delta: "Terraform",
            icon: CloudCog,
            tone: "bg-erp/10 text-erp",
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
              <Gauge className="text-primary size-4" /> Resource pressure
            </CardTitle>
            <Badge variant="secondary" className="font-semibold">
              Auto-scale enabled
            </Badge>
          </CardHeader>
          <CardContent className="space-y-5">
            {services.map((s) => (
              <div key={s.s}>
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="font-mono font-bold">{s.s}</span>
                  <Badge className={cn("border-0 font-semibold", s.tone)}>{s.v}%</Badge>
                </div>
                <Progress value={s.v} className="mt-1.5 h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-5">
          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <CloudCog className="text-primary size-4" /> Environments
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                {
                  t: "Production",
                  d: "eu-west-2 · blue/green · autoscale on",
                  tone: "bg-success/10 text-success",
                },
                {
                  t: "Staging",
                  d: "mirrors prod · nightly deploy",
                  tone: "bg-primary/10 text-primary",
                },
                { t: "Preview", d: "per-PR · 18 live now", tone: "bg-learning/10 text-learning" },
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
              <CheckCircle2 className="text-success size-5" />
              <p className="font-display mt-3 text-base font-extrabold">Disaster recovery</p>
              <p className="text-ink-foreground/70 mt-1 text-sm">
                RPO: 15 min · RTO: 4 hours. Last drill passed with a 3h42m recovery.
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
