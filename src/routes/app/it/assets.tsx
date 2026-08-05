import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Cpu, HardDrive, Laptop, MonitorCheck, Server } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { useItAssets, useItAssetItems } from "@/lib/query/it";
import type { ItAsset } from "@/lib/api/it";
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

const statusTone: Record<string, string> = {
  "in use": "bg-success/10 text-success",
  provisioning: "bg-warning/10 text-warning",
  healthy: "bg-primary/10 text-primary",
  repair: "bg-destructive/10 text-destructive",
};

function ItAssets() {
  const query = useItAssets();
  const assets = useItAssetItems();

  const laptops = assets.filter((a) => a.category === "laptop").length;
  const servers = assets.filter((a) => a.category === "server").length;
  const peripherals = assets.filter((a) => a.category === "peripheral").length;
  const repair = assets.filter((a) => a.status === "repair").length;
  const provisioning = assets.filter((a) => a.status === "provisioning").length;
  const tracked =
    assets.length > 0 ? Math.round(((assets.length - provisioning) / assets.length) * 100) : 0;

  return (
    <AppShell
      roleKey="instructor"
      title="Asset management"
      subtitle={
        assets.length > 0
          ? `${assets.length} assets · ${provisioning} awaiting provisioning`
          : "Loading assets…"
      }
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            {tracked}% tracked
          </Badge>
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
            value: laptops > 0 ? String(laptops) : "—",
            delta: "primary fleet",
            icon: Laptop,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Servers",
            value: servers > 0 ? String(servers) : "—",
            delta: "infrastructure",
            icon: Server,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Peripherals",
            value: peripherals > 0 ? String(peripherals) : "—",
            delta: "monitors + printers",
            icon: MonitorCheck,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "In repair",
            value: repair > 0 ? String(repair) : "0",
            delta: "attention needed",
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
          <QueryState<ItAsset[]>
            query={query}
            error={{ title: "Assets unavailable" }}
            empty={{
              title: "No devices yet",
              description: "Registered hardware will show here.",
            }}
            isEmpty={(rows) => rows.length === 0}
          >
            {(rows) =>
              rows.map((a) => (
                <div
                  key={a.id}
                  className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold">{a.name}</p>
                    <p className="text-muted-foreground text-xs">{a.assignedTo}</p>
                  </div>
                  <Badge
                    className={cn(
                      "border-0 font-semibold capitalize",
                      statusTone[a.status] ?? "bg-muted/20 text-muted-foreground",
                    )}
                  >
                    {a.status}
                  </Badge>
                  <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                    View
                  </Button>
                </div>
              ))
            }
          </QueryState>
        </CardContent>
      </Card>
    </AppShell>
  );
}
