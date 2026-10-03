"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { ArrowLeft, BookOpen, CheckCircle2, Flag, Lightbulb, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { useGlossaryTerms, useLocalizationStats } from "@/lib/query/localization";
import type { GlossaryTerm } from "@/lib/api/localization";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/localization/glossary")({
  head: () => ({
    meta: [
      { title: "Cultural Glossary — CEA-OS" },
      { name: "description", content: "Term entries with definitions, usage and cultural notes." },
    ],
  }),
  component: CulturalGlossary,
});

function termTone(status: string): string {
  if (status === "Approved") return "bg-success/10 text-success";
  if (status === "Flagged") return "bg-error/10 text-error";
  return "bg-warning/10 text-warning";
}

function CulturalGlossary() {
  const query = useGlossaryTerms();
  const stats = useLocalizationStats();
  const pageStats = (stats.data?.items ?? []).filter((s) => s.page === "glossary");

  return (
    <AppShell
      roleKey="localization"
      title="Cultural glossary"
      subtitle="96 terms · 81 approved · 3 flagged · owned by copy team"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">81 approved</Badge>
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
            label: "Terms",
            icon: BookOpen,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Approved",
            icon: CheckCircle2,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Flagged",
            icon: Flag,
            tone: "bg-error/10 text-error",
          },
          {
            label: "Markets covered",
            icon: Sparkles,
            tone: "bg-learning/10 text-learning",
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
        <QueryState<GlossaryTerm[]> query={query} error={{ title: "Glossary unavailable" }}>
          {(rows) => (
            <>
              {rows.map((t) => (
                <Card key={t.id} className="bg-card shadow-soft border">
                  <CardHeader className="flex-row items-center justify-between">
                    <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                      <Lightbulb className="text-primary size-4" /> {t.term}
                    </CardTitle>
                    <Badge className={cn("border-0 font-semibold", termTone(t.status))}>
                      {t.status}
                    </Badge>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="rounded-xl border p-3">
                      <p className="text-muted-foreground text-[10px] font-bold tracking-wide uppercase">
                        Definition
                      </p>
                      <p className="mt-0.5 text-xs font-semibold">{t.definition}</p>
                    </div>
                    <div className="rounded-xl border p-3">
                      <p className="text-muted-foreground text-[10px] font-bold tracking-wide uppercase">
                        Usage
                      </p>
                      <p className="mt-0.5 text-xs font-semibold">{t.usage}</p>
                    </div>
                    <div className="rounded-xl border p-3">
                      <p className="text-muted-foreground text-[10px] font-bold tracking-wide uppercase">
                        Cultural notes
                      </p>
                      <p className="mt-0.5 text-xs font-semibold">{t.culturalNotes}</p>
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
