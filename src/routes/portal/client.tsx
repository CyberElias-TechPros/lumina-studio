import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  FolderKanban,
  MessageSquare,
  Receipt,
  Rocket,
  Timer,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AppShell } from "@/components/app/app-shell";
import { formatNaira } from "@/data/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/portal/client")({
  head: () => ({
    meta: [
      { title: "Client Portal — CEA-OS" },
      {
        name: "description",
        content:
          "Track your services projects, deliverables, invoices and support tickets in one place.",
      },
    ],
  }),
  component: ClientPortal,
});

const projects = [
  {
    name: "Logistics dispatch platform",
    phase: "Sprint 6 · Testing",
    pct: 72,
    tone: "bg-gradient-services",
    team: "4 engineers + 1 PM",
    next: "Demo Friday 14:00",
  },
  {
    name: "Cybersecurity audit — phase 2",
    phase: "Remediation support",
    pct: 55,
    tone: "bg-gradient-erp",
    team: "2 pentesters",
    next: "Findings review Mon",
  },
];

const invoices = [
  {
    ref: "INV-2026-0308",
    item: "Sprint 5 milestone",
    amount: 420000,
    status: "Paid",
    tone: "bg-success/10 text-success",
  },
  {
    ref: "INV-2026-0315",
    item: "Sprint 6 milestone",
    amount: 420000,
    status: "Due Aug 20",
    tone: "bg-warning/10 text-warning",
  },
];

function ClientPortal() {
  return (
    <AppShell
      roleKey="employer"
      title="Client portal"
      subtitle="Sabin Holdings · Services Engine · 2 active projects"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">On schedule</Badge>
          <Button asChild variant="outline" size="sm" className="ml-auto">
            <Link to="/services">Services overview</Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Active projects",
            value: "2",
            delta: "+1 this quarter",
            icon: FolderKanban,
            tone: "bg-services/10 text-services",
          },
          {
            label: "Deliverables",
            value: "9/12",
            delta: "sprint 6 in flight",
            icon: FileText,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Invoice balance",
            value: formatNaira(420000),
            delta: "due Aug 20",
            icon: Receipt,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "NPS this quarter",
            value: "88",
            delta: "+6 vs Q1",
            icon: Rocket,
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

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.4fr_1fr]">
        <div className="space-y-5">
          {projects.map((p) => (
            <Card key={p.name} className="bg-card shadow-soft border">
              <CardHeader className="flex-row items-center justify-between">
                <CardTitle className="font-display text-base font-bold">{p.name}</CardTitle>
                <Badge variant="secondary" className="font-semibold">
                  {p.phase}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <Progress value={p.pct} className="h-2 flex-1" />
                  <span className="text-muted-foreground text-xs font-extrabold">{p.pct}%</span>
                </div>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <p className="text-muted-foreground flex items-center gap-1.5 text-xs font-semibold">
                    <Timer className="size-3.5" /> {p.next}
                  </p>
                  <p className="text-muted-foreground text-xs">{p.team}</p>
                </div>
                <div className="mt-4 flex flex-wrap gap-2 border-t pt-4">
                  {["Sprint report", "Demo recording", "Change log", "Invoices"].map((d) => (
                    <Badge
                      key={d}
                      variant="outline"
                      className="text-muted-foreground font-semibold"
                    >
                      {d}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}

          <Card className="bg-card shadow-soft border">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <Receipt className="text-primary size-4" /> Invoices
              </CardTitle>
              <Badge className="bg-success/10 text-success border-0 font-semibold">
                Balance: {formatNaira(420000)}
              </Badge>
            </CardHeader>
            <CardContent className="divide-y">
              {invoices.map((inv) => (
                <div key={inv.ref} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold">{inv.item}</p>
                    <p className="text-muted-foreground font-mono text-xs">{inv.ref}</p>
                  </div>
                  <span className="font-display text-sm font-extrabold">
                    {formatNaira(inv.amount)}
                  </span>
                  <Badge className={cn("border-0 font-semibold", inv.tone)}>{inv.status}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-5">
          <Card className="bg-card shadow-soft border">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <MessageSquare className="text-primary size-4" /> Updates
              </CardTitle>
              <Badge className="bg-error/10 text-error h-5 border-0 text-[10px] font-bold">
                2 new
              </Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                {
                  icon: CheckCircle2,
                  t: "Sprint 6: testing passed 94%",
                  m: "Delivery 12h ago",
                  tone: "bg-success/10 text-success",
                },
                {
                  icon: FileText,
                  t: "Audit phase 2 report ready",
                  m: "Delivery Aug 4",
                  tone: "bg-primary/10 text-primary",
                },
              ].map((n) => (
                <div key={n.t} className="flex items-start gap-3 rounded-xl border p-3.5">
                  <span
                    className={cn("grid size-8 shrink-0 place-items-center rounded-lg", n.tone)}
                  >
                    <n.icon className="size-4" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{n.t}</p>
                    <p className="text-muted-foreground mt-0.5 text-xs">{n.m}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display text-base font-bold">Support</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { t: "SSO access for new PM", s: "Resolved", tone: "bg-success/10 text-success" },
                {
                  t: "Sandbox API key rotation",
                  s: "In progress",
                  tone: "bg-warning/10 text-warning",
                },
              ].map((x) => (
                <div key={x.t} className="flex items-center justify-between rounded-xl border p-3">
                  <span className="text-sm font-semibold">{x.t}</span>
                  <Badge className={cn("border-0 font-semibold", x.tone)}>{x.s}</Badge>
                </div>
              ))}
              <p className="text-muted-foreground border-t pt-3 text-xs">
                SLA: critical issues <strong className="text-foreground">4 hours</strong>, standard{" "}
                <strong className="text-foreground">24 hours</strong>.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-ink text-ink-foreground shadow-elevated border-0">
            <CardContent className="p-6">
              <Rocket className="text-services size-5" />
              <p className="font-display mt-3 text-base font-extrabold">Extend your engagement</p>
              <p className="text-ink-foreground/70 mt-1 text-sm">
                The learners on your project team are 3 months from graduating. Renew early and keep
                the squad.
              </p>
              <Button asChild size="sm" className="bg-gradient-brand shadow-glow mt-4 border-0">
                <Link to="/services">
                  Explore services <ArrowRight className="ml-1 size-3.5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
