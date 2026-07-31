import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Download, FileDown, Layers, Package, QrCode } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/design/exports")({
  head: () => ({
    meta: [
      { title: "Asset Exports — CEA-OS" },
      { name: "description", content: "Asset export requests with format, size and status." },
    ],
  }),
  component: ExportCenter,
});

const exportsList = [
  {
    t: "Learning hub icons",
    format: "SVG + PNG @2x",
    size: "24 files · 4.2MB",
    owner: "Ada Obi",
    status: "Ready",
    tone: "bg-success/10 text-success",
  },
  {
    t: "Parent app marketing kit",
    format: "PNG + WebP",
    size: "18 files · 31MB",
    owner: "Tunde Bakare",
    status: "Processing",
    tone: "bg-primary/10 text-primary",
  },
  {
    t: "Brand gradient pack",
    format: "Figma + CSS",
    size: "12 tokens",
    owner: "Chiamaka Eze",
    status: "Queued",
    tone: "bg-warning/10 text-warning",
  },
  {
    t: "Certificates template",
    format: "PDF + SVG",
    size: "6 files · 9.8MB",
    owner: "Ngozi Adeyemi",
    status: "Failed",
    tone: "bg-error/10 text-error",
  },
];

function ExportCenter() {
  return (
    <AppShell
      roleKey="design"
      title="Asset export center"
      subtitle="28 requests this week · 22 delivered · queue healthy"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">22 delivered</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/design">
              <ArrowLeft className="size-4" /> Design hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Requests (wk)",
            value: "28",
            delta: "+6 vs last wk",
            icon: Download,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Formats",
            value: "6",
            delta: "SVG, PNG, WebP, CSS",
            icon: FileDown,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Delivered",
            value: "22",
            delta: "79% same-day",
            icon: Package,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Pending",
            value: "6",
            delta: "1 failed retry",
            icon: QrCode,
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
            <Layers className="text-primary size-4" /> Recent exports
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          {exportsList.map((e) => (
            <div key={e.t} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <span className="bg-muted text-muted-foreground grid size-9 shrink-0 place-items-center rounded-lg">
                <FileDown className="size-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{e.t}</p>
                <p className="text-muted-foreground text-xs">
                  {e.format} · {e.size} · {e.owner}
                </p>
              </div>
              <Badge className={cn("border-0 font-semibold", e.tone)}>{e.status}</Badge>
              <Button variant="outline" size="sm" className="shrink-0">
                Download
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
