import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, Database, Files, Percent, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { useTranslationMemory, useLocalizationStats } from "@/lib/query/localization";
import type { TranslationMemoryPair } from "@/lib/api/localization";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/localization/translation-memory")({
  head: () => ({
    meta: [
      { title: "Translation Memory — CEA-OS" },
      { name: "description", content: "Source and target pairs with match percentages." },
    ],
  }),
  component: TranslationMemory,
});

function pairTone(status: string): string {
  if (status === "Approved") return "bg-success/10 text-success";
  if (status === "In review") return "bg-warning/10 text-warning";
  return "bg-primary/10 text-primary";
}

function TranslationMemory() {
  const query = useTranslationMemory();
  const stats = useLocalizationStats();
  const pageStats = (stats.data?.items ?? []).filter((s) => s.page === "translation-memory");

  return (
    <AppShell
      roleKey="localization"
      title="Translation memory"
      subtitle="1,900 segments · 1,240 translated · 96% avg match"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">96% match</Badge>
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
            label: "Segments",
            icon: Database,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Translated",
            icon: Files,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Avg. match",
            icon: Percent,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Approved",
            icon: CheckCircle2,
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

      <Card className="bg-card mt-5 shadow-soft border">
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <Search className="text-primary size-4" /> Recent segments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Source</TableHead>
                <TableHead>Target</TableHead>
                <TableHead>Locale</TableHead>
                <TableHead>Match</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <QueryState<TranslationMemoryPair[]>
                query={query}
                error={{ title: "Translation memory unavailable" }}
              >
                {(rows) => (
                  <>
                    {rows.map((p) => (
                      <TableRow key={p.id}>
                        <TableCell className="max-w-[240px] font-semibold">{p.source}</TableCell>
                        <TableCell className="max-w-[260px] text-muted-foreground">
                          {p.target}
                        </TableCell>
                        <TableCell className="font-mono text-xs font-bold">{p.locale}</TableCell>
                        <TableCell className="font-bold">{p.match}%</TableCell>
                        <TableCell>
                          <Badge className={cn("border-0 font-semibold", pairTone(p.status))}>
                            {p.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                )}
              </QueryState>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </AppShell>
  );
}
