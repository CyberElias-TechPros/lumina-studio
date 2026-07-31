import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Cpu, HardDrive, Laptop, MonitorCheck, Server } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/it/assets")({
  head: () => ({
    meta: [
      { title: "Assets — CEA-OS" },
      { name: "description", content: "Hardware lifecycle management." },
    ],
  }),
  component: ItAssets,
});

const assets = [
  {
    a: "Laptop · HP EliteBook · #L-0142",
    u: "Ms. Chidera",
    s: "In use",
    tone: "bg-success/10 text-success",
  },
  {
    a: "Laptop · Dell Latitude · #L-0143",
    u: "New starter",
    s: "Provisioning",
    tone: "bg-warning/10 text-warning",
  },
  { a: "Server · App node 2", u: "Infra", s: "Healthy", tone: "bg-primary/10 text-primary" },
];

function ItAssets() {
  return (
    <AppShell
      roleKey="instructor"
      title="Asset management"
      subtitle="214 assets · 12 awaiting provisioning"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">96% tracked</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/portal/it-support">
              <ArrowLeft className="size-4" /> IT Support portal
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Laptops",
            value: "128",
            delta: "94 in use",
            icon: Laptop,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Servers",
            value: "6",
            delta: "all healthy",
            icon: Server,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Peripherals",
            value: "80",
            delta: "monitors + printers",
            icon: MonitorCheck,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "In repair",
            value: "4",
            delta: "2 this week",
            icon: Cpu,
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
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <HardDrive className="text-primary size-4" /> Devices
          </CardTitle>
          <Button size="sm" className="bg-gradient-brand shadow-glow border-0 font-semibold">
            Register asset
          </Button>
        </CardHeader>
        <CardContent className="divide-y">
          {assets.map((a) => (
            <div key={a.a} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{a.a}</p>
                <p className="text-muted-foreground text-xs">{a.u}</p>
              </div>
              <Badge className={cn("border-0 font-semibold", a.tone)}>{a.s}</Badge>
              <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                View
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
