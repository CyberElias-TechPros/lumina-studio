import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Columns2, Eye, Globe, Monitor, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { usePreviewBlocks, useLocalizationStats } from "@/lib/query/localization";
import type { PreviewBlock } from "@/lib/api/localization";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/localization/preview")({
  head: () => ({
    meta: [
      { title: "Localized Preview — CEA-OS" },
      { name: "description", content: "Side-by-side preview of landing copy in two locales." },
    ],
  }),
  component: LocalizedPreview,
});

function LocalizedPreview() {
  const query = usePreviewBlocks();
  const stats = useLocalizationStats();
  const pageStats = (stats.data?.items ?? []).filter((s) => s.page === "preview");

  return (
    <AppShell
      roleKey="localization"
      title="Localized preview"
      subtitle="Landing · en-NG vs yo-NG · checks passed"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">0 issues</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/localization">
              <ArrowLeft className="size-4" /> L10n hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Pages previewed",
            icon: Eye,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Locale pairs",
            icon: Columns2,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Checks passed",
            icon: Globe,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Issues open",
            icon: Zap,
            tone: "bg-warning/10 text-warning",
          },
        ].map((k) => {
          const stat = pageStats.find((s) => s.label === k.label);
          return (
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
                <p className="font-display mt-3 text-2xl font-extrabold">{stat?.value ?? "—"}</p>
                <p className="text-muted-foreground mt-0.5 text-xs font-semibold">
                  {stat?.delta ?? "—"}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <QueryState<PreviewBlock[]>
        query={query}
        error={{ title: "Preview unavailable" }}
        empty={{
          title: "No preview blocks",
          description: "Nothing to compare in this locale pair.",
        }}
      >
        {(blocks) => (
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <Card className="bg-card shadow-soft border">
              <CardHeader className="flex-row items-center justify-between">
                <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                  <Monitor className="text-primary size-4" /> en-NG
                </CardTitle>
                <Badge variant="secondary" className="font-semibold">
                  Source
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                {blocks.map((b) => (
                  <div key={b.id} className="rounded-xl border p-4">
                    <p className="font-display text-base font-extrabold">{b.en}</p>
                    <p className="text-muted-foreground mt-1 text-sm">{b.enSub}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-card shadow-soft border">
              <CardHeader className="flex-row items-center justify-between">
                <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                  <Globe className="text-primary size-4" /> yo-NG
                </CardTitle>
                <Badge className="bg-success/10 text-success border-0 font-semibold">
                  Approved
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                {blocks.map((b) => (
                  <div key={b.id} className="rounded-xl border p-4">
                    <p className="font-display text-base font-extrabold">{b.yo}</p>
                    <p className="text-muted-foreground mt-1 text-sm">{b.yoSub}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}
      </QueryState>
    </AppShell>
  );
}
