import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Boxes,
  Building2,
  CalendarDays,
  ClipboardCheck,
  DoorOpen,
  FileText,
  Fuel,
  ListTodo,
  PackageCheck,
  ShieldCheck,
  Thermometer,
  Truck,
  Workflow,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/portal/operations")({
  head: () => ({
    meta: [
      { title: "Operations — CEA-OS" },
      {
        name: "description",
        content: "Campus operations: facilities, transport, security, suppliers and daily logs.",
      },
    ],
  }),
  component: OperationsPortal,
});

const tasks = [
  {
    t: "Generator servicing — block B",
    due: "Today 15:00",
    status: "Scheduled",
    tone: "bg-primary/10 text-primary",
  },
  {
    t: "WiFi AP replace — lab 3",
    due: "Today",
    status: "In progress",
    tone: "bg-warning/10 text-warning",
  },
  {
    t: "Supplies delivery — cafeteria",
    due: "Thu",
    status: "Booked",
    tone: "bg-learning/10 text-learning",
  },
  {
    t: "Fire extinguisher inspection",
    due: "Aug 12",
    status: "Pending",
    tone: "bg-error/10 text-error",
  },
];

const fleet = [
  { v: "Bus 1 · Prado", status: "Available", km: "84,120 km", tone: "bg-success/10 text-success" },
  {
    v: "Bus 2 · Coaster",
    status: "On trip — Ikeja",
    km: "112,430 km",
    tone: "bg-primary/10 text-primary",
  },
  {
    v: "Shuttle · Corolla",
    status: "Servicing",
    km: "96,210 km",
    tone: "bg-warning/10 text-warning",
  },
];

const screens = [
  {
    icon: Building2,
    label: "Branches",
    desc: "Manage campus branches",
    path: "/app/ops/branches",
    tone: "bg-primary/10 text-primary",
  },
  {
    icon: Boxes,
    label: "Inventory",
    desc: "Stock and supplies tracking",
    path: "/app/ops/inventory",
    tone: "bg-success/10 text-success",
  },
  {
    icon: DoorOpen,
    label: "Facilities",
    desc: "Buildings, utilities, upkeep",
    path: "/app/ops/facilities",
    tone: "bg-learning/10 text-learning",
  },
  {
    icon: ListTodo,
    label: "Tasks",
    desc: "Maintenance and task board",
    path: "/app/ops/tasks",
    tone: "bg-warning/10 text-warning",
  },
  {
    icon: Workflow,
    label: "Automation",
    desc: "Scheduled and repeatable ops",
    path: "/app/ops/automation",
    tone: "bg-career/10 text-career",
  },
  {
    icon: Truck,
    label: "Vendors",
    desc: "Supplier and vendor directory",
    path: "/app/ops/vendors",
    tone: "bg-community/10 text-community",
  },
  {
    icon: FileText,
    label: "Reports",
    desc: "Operations analytics and logs",
    path: "/app/ops/reports",
    tone: "bg-erp/10 text-erp",
  },
];

function OperationsPortal() {
  return (
    <AppShell
      roleKey="instructor"
      title="Operations"
      subtitle="Facilities, transport, security, supplies · Ikeja campus"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            All systems nominal
          </Badge>
          <Badge variant="secondary" className="font-semibold">
            Day 31 · 0 incidents
          </Badge>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Open tasks",
            value: "12",
            delta: "4 due today",
            icon: ClipboardCheck,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Fleet",
            value: "3",
            delta: "1 on trip",
            icon: Truck,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Supplies (MTD)",
            value: "₦2.4m",
            delta: "within budget",
            icon: PackageCheck,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Fuel",
            value: "78%",
            delta: "top-up Thu",
            icon: Fuel,
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
              <CalendarDays className="text-primary size-4" /> Today's operations
            </CardTitle>
            <Badge variant="secondary" className="font-semibold">
              7 of 12 open
            </Badge>
          </CardHeader>
          <CardContent className="divide-y">
            {tasks.map((t) => (
              <div
                key={t.t}
                className="flex flex-wrap items-center gap-3 py-3.5 first:pt-0 last:pb-0"
              >
                <span className="bg-muted text-muted-foreground grid size-9 shrink-0 place-items-center rounded-lg">
                  <ClipboardCheck className="size-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold">{t.t}</p>
                  <p className="text-muted-foreground text-xs">{t.due}</p>
                </div>
                <Badge className={cn("border-0 font-semibold", t.tone)}>{t.status}</Badge>
                <Button variant="outline" size="sm" className="shrink-0">
                  Update
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-5">
          <Card className="bg-card shadow-soft border">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <Truck className="text-primary size-4" /> Fleet
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {fleet.map((f) => (
                <div key={f.v} className="rounded-xl border p-3.5">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-bold">{f.v}</p>
                    <Badge className={cn("border-0 font-semibold", f.tone)}>{f.status}</Badge>
                  </div>
                  <p className="text-muted-foreground mt-1 text-xs">{f.km}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-card shadow-soft border">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <Thermometer className="text-primary size-4" /> Environment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { t: "Classroom temps", d: "All labs 23–25°C", tone: "bg-success/10 text-success" },
                { t: "Power", d: "Grid + backup healthy", tone: "bg-success/10 text-success" },
                {
                  t: "Internet",
                  d: "2 of 3 ISPs up · failover tested",
                  tone: "bg-primary/10 text-primary",
                },
              ].map((x) => (
                <div key={x.t} className="flex items-center justify-between rounded-xl border p-3">
                  <span className="text-sm font-semibold">{x.t}</span>
                  <Badge className={cn("border-0 font-semibold", x.tone)}>{x.d}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-gradient-ink text-ink-foreground shadow-elevated border-0">
            <CardContent className="p-6">
              <DoorOpen className="text-success size-5" />
              <p className="font-display mt-3 text-base font-extrabold">Visitor & security sync</p>
              <p className="text-ink-foreground/70 mt-1 text-sm">
                9 visitors, 0 incidents, badges reconciled with the reception desk at 14:00.
              </p>
              <Button asChild size="sm" className="bg-gradient-brand shadow-glow mt-4 border-0">
                <Link to="/portal/receptionist">
                  Reception desk <ArrowRight className="ml-1 size-3.5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      <Card className="bg-card mt-5 shadow-soft border">
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <Building2 className="text-primary size-4" /> Workspace
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
