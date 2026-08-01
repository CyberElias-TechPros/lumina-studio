import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, BookOpen, CheckCircle2, Flag, PenTool, SpellCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { useStyleGuides, useLocalizationStats } from "@/lib/query/localization";
import type { StyleGuide } from "@/lib/api/localization";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/localization/style-guides")({
  head: () => ({
    meta: [
      { title: "Style Guides — CEA-OS" },
      { name: "description", content: "Per-market style guides with do and don't lists." },
    ],
  }),
  component: StyleGuides,
});

function guideTone(status: string): string {
  if (status === "Live") return "bg-success/10 text-success";
  return "bg-warning/10 text-warning";
}

function StyleGuides() {
  const query = useStyleGuides();
  const stats = useLocalizationStats();
  const pageStats = (stats.data?.items ?? []).filter((s) => s.page === "style-guides");

  return (
    <AppShell
      roleKey="localization"
      title="Style guides"
      subtitle="6 guides · 4 live · updated quarterly by copy team"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">4 live</Badge>
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
            label: "Guides",
            icon: BookOpen,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Markets covered",
            icon: PenTool,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Rules total",
            icon: SpellCheck,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Review flags",
            icon: Flag,
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

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <QueryState<StyleGuide[]> query={query} error={{ title: "Style guides unavailable" }}>
          {(rows) => (
            <>
              {rows.map((g) => (
                <Card key={g.id} className="bg-card shadow-soft border">
                  <CardHeader className="flex-row items-center justify-between">
                    <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                      <PenTool className="text-primary size-4" /> {g.market}
                    </CardTitle>
                    <Badge className={cn("border-0 font-semibold", guideTone(g.status))}>
                      {g.status}
                    </Badge>
                  </CardHeader>
                  <CardContent className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-xl border border-success/20 p-3">
                      <p className="text-success text-[10px] font-bold tracking-wide uppercase">
                        Do
                      </p>
                      <ul className="mt-2 space-y-1.5">
                        {g.dos.map((d) => (
                          <li key={d} className="flex items-start gap-1.5 text-xs font-semibold">
                            <CheckCircle2 className="text-success mt-0.5 size-3.5 shrink-0" /> {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-xl border border-error/20 p-3">
                      <p className="text-error text-[10px] font-bold tracking-wide uppercase">
                        Don't
                      </p>
                      <ul className="mt-2 space-y-1.5">
                        {g.donts.map((d) => (
                          <li key={d} className="flex items-start gap-1.5 text-xs font-semibold">
                            <span className="text-error mt-0.5 grid size-3.5 shrink-0 place-items-center text-[10px] font-extrabold">
                              x
                            </span>
                            {d}
                          </li>
                        ))}
                      </ul>
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
