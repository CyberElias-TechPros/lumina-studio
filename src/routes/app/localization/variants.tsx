import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, Globe, Languages, MapPin, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { useVariants, useLocalizationStats } from "@/lib/query/localization";
import type { CopyVariant } from "@/lib/api/localization";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/localization/variants")({
  head: () => ({
    meta: [
      { title: "Copy Variants — CEA-OS" },
      { name: "description", content: "Market-specific copy variants with tone notes." },
    ],
  }),
  component: CopyVariants,
});

function variantTone(status: string): string {
  if (status === "Live") return "bg-success/10 text-success";
  if (status === "In review") return "bg-warning/10 text-warning";
  return "bg-primary/10 text-primary";
}

function CopyVariants() {
  const query = useVariants();
  const locales = query.data?.pages.flatMap((p) => p.items) ?? [];
  const stats = useLocalizationStats();
  const pageStats = (stats.data?.items ?? []).filter((s) => s.page === "variants");

  return (
    <AppShell
      roleKey="localization"
      title="Copy variants"
      subtitle="9 locales · 4 live · cultural QA gate enabled"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">QA on</Badge>
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
            label: "Locales",
            value: String(locales.length),
            delta: "6 NG + 3 global",
            icon: Globe,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Variants live",
            stat: pageStats.find((s) => s.label === "Variants live"),
            icon: Languages,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "In review",
            stat: pageStats.find((s) => s.label === "In review"),
            icon: MapPin,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "QA passed",
            stat: pageStats.find((s) => s.label === "QA passed"),
            icon: CheckCircle2,
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
              <p className="font-display mt-3 text-2xl font-extrabold">
                {"value" in k ? k.value : (k.stat?.value ?? "—")}
              </p>
              <p className="text-muted-foreground mt-0.5 text-xs font-semibold">
                {"value" in k ? k.delta : (k.stat?.delta ?? "—")}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        <QueryState<CopyVariant[]> query={query} error={{ title: "Variants unavailable" }}>
          {(rows) => (
            <>
              {rows.map((l) => (
                <Card key={l.id} className="bg-card shadow-soft border">
                  <CardHeader className="flex-row items-center justify-between">
                    <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                      <Languages className="text-primary size-4" /> {l.name}
                    </CardTitle>
                    <Badge className={cn("border-0 font-semibold", variantTone(l.status))}>
                      {l.status}
                    </Badge>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="rounded-xl border p-3">
                      <p className="text-muted-foreground text-[10px] font-bold tracking-wide uppercase">
                        Locale code
                      </p>
                      <p className="font-mono mt-0.5 text-xs font-bold">{l.code}</p>
                    </div>
                    <div className="rounded-xl border p-3">
                      <p className="text-muted-foreground text-[10px] font-bold tracking-wide uppercase">
                        Tone notes
                      </p>
                      <p className="mt-0.5 text-xs font-semibold">{l.toneNotes}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Sparkles className="text-warning size-3.5" />
                      <span className="text-muted-foreground text-[10px] font-semibold">
                        Reviewer: {l.status === "Live" ? "approved" : "assigned"}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </>
          )}
        </QueryState>
      </div>
    </AppShell>
  );
}
