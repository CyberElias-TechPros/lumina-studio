import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity,
  ArrowRight,
  BookOpen,
  Boxes,
  ClipboardList,
  Cpu,
  FileCheck,
  FileText,
  HardDrive,
  Headset,
  HelpCircle,
  Inbox,
  Laptop,
  MonitorCheck,
  Network,
  ShieldAlert,
  Users,
  Wrench,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/portal/it-support")({
  head: () => ({
    meta: [
      { title: "IT Support — CEA-OS" },
      {
        name: "description",
        content: "IT support: tickets, devices, network health and hardware inventory.",
      },
    ],
  }),
  component: ItSupportPortal,
});

const tickets = [
  {
    t: "Projector flicker — hall A",
    who: "Prof. Adaeze",
    p: "High",
    status: "In progress",
    tone: "bg-warning/10 text-warning",
  },
  {
    t: "New starter laptop setup",
    who: "HR · Chidinma",
    p: "Medium",
    status: "Queued",
    tone: "bg-primary/10 text-primary",
  },
  {
    t: "WiFi drop — lab 2 row D",
    who: "3 reports",
    p: "High",
    status: "Investigated",
    tone: "bg-error/10 text-error",
  },
  {
    t: "Printer jam — finance",
    who: "Bisi",
    p: "Low",
    status: "Resolved",
    tone: "bg-success/10 text-success",
  },
];

const screens = [
  {
    icon: Inbox,
    label: "Tickets",
    desc: "Incidents and requests",
    path: "/app/it/tickets",
    tone: "bg-primary/10 text-primary",
  },
  {
    icon: Boxes,
    label: "Assets",
    desc: "Hardware inventory",
    path: "/app/it/assets",
    tone: "bg-success/10 text-success",
  },
  {
    icon: Activity,
    label: "Monitoring",
    desc: "Network and uptime",
    path: "/app/it/monitoring",
    tone: "bg-learning/10 text-learning",
  },
  {
    icon: BookOpen,
    label: "Knowledge base",
    desc: "Guides and runbooks",
    path: "/app/it/knowledge-base",
    tone: "bg-warning/10 text-warning",
  },
  {
    icon: Users,
    label: "Users",
    desc: "Accounts and access",
    path: "/app/it/users",
    tone: "bg-career/10 text-career",
  },
  {
    icon: Headset,
    label: "Remote support",
    desc: "Remote sessions",
    path: "/app/it/remote-support",
    tone: "bg-community/10 text-community",
  },
  {
    icon: FileText,
    label: "Reports",
    desc: "SLA and trends",
    path: "/app/it/reports",
    tone: "bg-erp/10 text-erp",
  },
  {
    icon: ClipboardList,
    label: "Templates",
    desc: "Reusable ticket templates",
    path: "/app/it/templates",
    tone: "bg-services/10 text-services",
  },
  {
    icon: Wrench,
    label: "Maintenance",
    desc: "Scheduled upkeep",
    path: "/app/it/maintenance",
    tone: "bg-ink/10 text-ink",
  },
  {
    icon: FileCheck,
    label: "Licenses",
    desc: "Software entitlements",
    path: "/app/it/licenses",
    tone: "bg-error/10 text-error",
  },
];

function ItSupportPortal() {
  return (
    <AppShell
      roleKey="instructor"
      title="IT support"
      subtitle="Tickets, devices and network health · 2 technicians on shift"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">SLA 94%</Badge>
          <Badge variant="secondary" className="font-semibold">
            17 open tickets
          </Badge>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Open tickets",
            value: "17",
            delta: "3 due today",
            icon: HelpCircle,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Devices managed",
            value: "186",
            delta: "12 pending setup",
            icon: Laptop,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Uptime (30d)",
            value: "99.2%",
            delta: "1 incident",
            icon: Network,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Patches due",
            value: "9",
            delta: "4 critical",
            icon: ShieldAlert,
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
              <Wrench className="text-primary size-4" /> Ticket queue
            </CardTitle>
            <Badge variant="secondary" className="font-semibold">
              Priority sorted
            </Badge>
          </CardHeader>
          <CardContent className="divide-y">
            {tickets.map((t) => (
              <div
                key={t.t}
                className="flex flex-wrap items-center gap-3 py-3.5 first:pt-0 last:pb-0"
              >
                <span className="bg-muted text-muted-foreground grid size-9 shrink-0 place-items-center rounded-lg">
                  <MonitorCheck className="size-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold">{t.t}</p>
                  <p className="text-muted-foreground text-xs">
                    {t.who} · priority {t.p.toLowerCase()}
                  </p>
                </div>
                <Badge className={cn("border-0 font-semibold", t.tone)}>{t.status}</Badge>
                <Button variant="outline" size="sm" className="shrink-0">
                  Claim
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-5">
          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <HardDrive className="text-primary size-4" /> Infrastructure
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { t: "Servers", v: "All healthy", tone: "bg-success/10 text-success" },
                {
                  t: "Internet — primary ISP",
                  v: "500 Mbps up",
                  tone: "bg-success/10 text-success",
                },
                { t: "Backup link", v: "Standby", tone: "bg-primary/10 text-primary" },
                { t: "NAS storage", v: "64% used", tone: "bg-warning/10 text-warning" },
              ].map((x) => (
                <div key={x.t} className="flex items-center justify-between rounded-xl border p-3">
                  <span className="text-sm font-semibold">{x.t}</span>
                  <Badge className={cn("border-0 font-semibold", x.tone)}>{x.v}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <Cpu className="text-primary size-4" /> Hardware
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { t: "Laptops in lab", v: "58 / 60", tone: "bg-success/10 text-success" },
                { t: "Spare loaners", v: "4 available", tone: "bg-primary/10 text-primary" },
                { t: "Printers", v: "2 offline", tone: "bg-warning/10 text-warning" },
              ].map((x) => (
                <div key={x.t} className="flex items-center justify-between rounded-xl border p-3">
                  <span className="text-sm font-semibold">{x.t}</span>
                  <Badge className={cn("border-0 font-semibold", x.tone)}>{x.v}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-gradient-ink text-ink-foreground shadow-elevated border-0">
            <CardContent className="p-6">
              <ShieldAlert className="text-success size-5" />
              <p className="font-display mt-3 text-base font-extrabold">Security watch</p>
              <p className="text-ink-foreground/70 mt-1 text-sm">
                Phishing drill due Friday. 2-factor rollout at 84% of accounts.
              </p>
              <Button asChild size="sm" className="bg-gradient-brand shadow-glow mt-4 border-0">
                <Link to="/portal/security">
                  Security ops <ArrowRight className="ml-1 size-3.5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      <Card className="bg-card mt-5 shadow-soft border">
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <Wrench className="text-primary size-4" /> Workspace
          </CardTitle>
          <Badge variant="secondary" className="font-semibold">
            {screens.length} modules
          </Badge>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {screens.map((s) => (
            <Link
              key={s.path}
              to={s.path}
              className="group bg-card shadow-soft hover:shadow-elevated flex flex-col rounded-xl border p-4 transition-all hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between">
                <span className={cn("grid size-9 place-items-center rounded-lg", s.tone)}>
                  <s.icon className="size-4" />
                </span>
                <ArrowRight className="text-muted-foreground group-hover:text-primary size-4 transition-colors" />
              </div>
              <p className="font-display mt-3 text-sm font-extrabold">{s.label}</p>
              <p className="text-muted-foreground mt-1 text-xs">{s.desc}</p>
            </Link>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
