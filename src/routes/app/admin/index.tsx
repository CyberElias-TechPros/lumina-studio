import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Gauge,
  KeyRound,
  ScrollText,
  Settings2,
  ShieldAlert,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/admin/")({
  head: () => ({
    meta: [
      { title: "Admin Hub — CEA-OS" },
      { name: "description", content: "System health, security and configuration." },
    ],
  }),
  component: AdminHub,
});

const screens = [
  {
    icon: Users,
    label: "User management",
    desc: "Accounts, roles",
    path: "/app/admin/users",
    tone: "bg-primary/10 text-primary",
  },
  {
    icon: ShieldAlert,
    label: "Security",
    desc: "2FA, IP whitelist",
    path: "/app/admin/security",
    tone: "bg-warning/10 text-warning",
  },
  {
    icon: ScrollText,
    label: "Audit log",
    desc: "Immutable trail",
    path: "/app/admin/audit",
    tone: "bg-learning/10 text-learning",
  },
  {
    icon: Settings2,
    label: "System config",
    desc: "Flags, maintenance",
    path: "/app/admin/config",
    tone: "bg-success/10 text-success",
  },
  {
    icon: Gauge,
    label: "Monitoring",
    desc: "CPU, memory, errors",
    path: "/app/admin/monitoring",
    tone: "bg-career/10 text-career",
  },
  {
    icon: KeyRound,
    label: "API keys",
    desc: "Service tokens",
    path: "/app/admin/api-keys",
    tone: "bg-services/10 text-services",
  },
];

function AdminHub() {
  return (
    <AppShell
      roleKey="admin"
      title="Admin hub"
      subtitle="cea-os core · all services nominal · zero security alerts"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">All healthy</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/portal/admin">
              <ArrowLeft className="size-4" /> Admin portal
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Users",
            value: "8,412",
            delta: "+214 this month",
            icon: Users,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Security alerts",
            value: "0",
            delta: "last 24h",
            icon: ShieldAlert,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Uptime (30d)",
            value: "99.99%",
            delta: "two nines nine",
            icon: Gauge,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Backups",
            value: "12",
            delta: "all verified",
            icon: Settings2,
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
            <Gauge className="text-primary size-4" /> Administration
          </CardTitle>
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
