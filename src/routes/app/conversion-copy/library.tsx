import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CopyCheck, FileText, Library, PenLine, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import type { CcpAsset, CcpKpi } from "@/lib/query/conversionCopy";
import { useCcpAssets, useCcpOverview } from "@/lib/query/conversionCopy";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/conversion-copy/library")({
  head: () => ({
    meta: [
      { title: "Copy Asset Library — CEA-OS" },
      { name: "description", content: "Reusable conversion copy assets." },
    ],
  }),
  component: CopyLibrary,
});

const kpiMeta = [
  { icon: FileText, tone: "bg-primary/10 text-primary" },
  { icon: CopyCheck, tone: "bg-success/10 text-success" },
  { icon: Library, tone: "bg-learning/10 text-learning" },
  { icon: PenLine, tone: "bg-warning/10 text-warning" },
];

const assetTones = [
  "bg-success/10 text-success",
  "bg-success/10 text-success",
  "bg-warning/10 text-warning",
];

function CopyLibrary() {
  const overviewQuery = useCcpOverview();
  const assetsQuery = useCcpAssets();

  return (
    <AppShell
      roleKey="conversion-copy"
      title="Copy asset library"
      subtitle="214 assets · tagged · versioned · 1-click reuse"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">214 assets</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/portal/copywriter">
              <ArrowLeft className="size-4" /> Copywriter portal
            </Link>
          </Button>
        </>
      }
    >
      <QueryState<CcpKpi[]>
        query={overviewQuery}
        error={{ title: "Stats unavailable" }}
        empty={{
          title: "No stats yet",
          description: "Your copy library stats will appear here.",
        }}
        isEmpty={(rows) => rows.length === 0}
      >
        {(rows) => (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {rows.map((k, i) => {
              const meta = kpiMeta[i % kpiMeta.length];
              return (
                <Card key={k.id} className="bg-card shadow-soft border">
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between">
                      <p className="text-muted-foreground text-xs font-bold tracking-wide uppercase">
                        {k.metric}
                      </p>
                      <span className={cn("grid size-8 place-items-center rounded-lg", meta.tone)}>
                        <meta.icon className="size-4" />
                      </span>
                    </div>
                    <p className="font-display mt-3 text-2xl font-extrabold">{k.valueLabel}</p>
                    <p className="text-muted-foreground mt-0.5 text-xs font-semibold">{k.delta}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </QueryState>

      <Card className="bg-card mt-5 shadow-soft border">
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <Search className="text-primary size-4" /> Recent assets
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          <QueryState<CcpAsset[]>
            query={assetsQuery}
            error={{ title: "Assets unavailable" }}
            empty={{
              title: "No assets yet",
              description: "Reusable conversion copy assets will show here.",
            }}
            isEmpty={(rows) => rows.length === 0}
          >
            {(rows) => (
              <>
                {rows.map((a, i) => (
                  <div
                    key={a.id}
                    className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold">{a.title}</p>
                      <p className="text-muted-foreground text-xs">
                        {a.category} · {a.variants} variants · last used {a.lastUsed}
                      </p>
                    </div>
                    <Badge
                      className={cn("border-0 font-semibold", assetTones[i % assetTones.length])}
                    >
                      {a.status}
                    </Badge>
                    <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                      Open
                    </Button>
                  </div>
                ))}
              </>
            )}
          </QueryState>
        </CardContent>
      </Card>
    </AppShell>
  );
}
