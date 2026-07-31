import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Flag, Settings2, SlidersHorizontal, ToggleRight, Wrench } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/admin/config")({
  head: () => ({
    meta: [
      { title: "System Configuration — CEA-OS" },
      { name: "description", content: "Settings, feature flags and maintenance windows." },
    ],
  }),
  component: AdminConfig,
});

const settings = [
  {
    s: "Maintenance window",
    v: "Next: Sat 02:00–03:00 WAT",
    s2: "Scheduled",
    tone: "bg-warning/10 text-warning",
  },
  {
    s: "Enrollment open",
    v: "Cohort 17 applications",
    s2: "Enabled",
    tone: "bg-success/10 text-success",
  },
  {
    s: "Fee payment window",
    v: "Term 2 · closes Aug 30",
    s2: "Enabled",
    tone: "bg-success/10 text-success",
  },
];

function AdminConfig() {
  return (
    <AppShell
      roleKey="admin"
      title="System configuration"
      subtitle="Last changed by Adaeze Okafor · 08:22"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">Synced</Badge>
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
            label: "Feature flags",
            value: "18",
            delta: "11 live",
            icon: ToggleRight,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Settings",
            value: "96",
            delta: "key-value",
            icon: Settings2,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Maintenance",
            value: "2h / wk",
            delta: "Saturdays",
            icon: Wrench,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Unsynced",
            value: "0",
            delta: "env drift",
            icon: SlidersHorizontal,
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
            <Flag className="text-primary size-4" /> Key settings
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          {settings.map((s) => (
            <div key={s.s} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{s.s}</p>
                <p className="text-muted-foreground text-xs">{s.v}</p>
              </div>
              <Badge className={cn("border-0 font-semibold", s.tone)}>{s.s2}</Badge>
              <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                Change
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
