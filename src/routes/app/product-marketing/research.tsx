"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { ArrowLeft, BookOpen, FileSearch, FlaskConical, Lightbulb, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import { usePmStudies, usePmFindings } from "@/lib/query/productMarketing";
import type { PmStudy, PmFinding } from "@/lib/api/productMarketing";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/product-marketing/research")({
  head: () => ({
    meta: [
      { title: "Market Research — CEA-OS" },
      { name: "description", content: "Research studies, key findings and methodology tags." },
    ],
  }),
  component: ResearchRepository,
});

const statusTones: Record<string, string> = {
  published: "bg-success/10 text-success",
  "in field": "bg-primary/10 text-primary",
  "in review": "bg-warning/10 text-warning",
};

function toneFor(status: string): string {
  return statusTones[status.toLowerCase()] ?? "bg-muted-foreground/10 text-muted-foreground";
}

const findingTones = [
  "bg-error/10 text-error",
  "bg-primary/10 text-primary",
  "bg-warning/10 text-warning",
  "bg-success/10 text-success",
];

function ResearchRepository() {
  const studiesQuery = usePmStudies();
  const findingsQuery = usePmFindings();

  return (
    <AppShell
      roleKey="product-marketing"
      title="Market research"
      subtitle="4 active studies · 12 published · 1,900+ respondents"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">2 due this wk</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/product-marketing">
              <ArrowLeft className="size-4" /> PM hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Studies",
            value: "16",
            delta: "4 active",
            icon: FlaskConical,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Key findings",
            value: "34",
            delta: "6 tagged critical",
            icon: Lightbulb,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Respondents",
            value: "1.9k",
            delta: "across 2026",
            icon: Users,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Methods used",
            value: "6",
            delta: "survey, diary, CJ",
            icon: BookOpen,
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

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.5fr_1fr]">
        <Card className="bg-card shadow-soft border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <FileSearch className="text-primary size-4" /> Studies
            </CardTitle>
          </CardHeader>
          <CardContent className="divide-y">
            <QueryState<PmStudy[]>
              query={studiesQuery}
              error={{ title: "Studies unavailable" }}
              empty={{
                title: "No studies",
                description: "Research studies will appear here.",
              }}
              isEmpty={(rows) => rows.length === 0}
            >
              {(rows) => (
                <>
                  {rows.map((s) => (
                    <div
                      key={s.id}
                      className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                    >
                      <span className="bg-muted text-muted-foreground grid size-9 shrink-0 place-items-center rounded-lg">
                        <BookOpen className="size-4" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold">{s.title}</p>
                        <p className="text-muted-foreground text-xs">
                          {s.detail} · {s.sample} · {s.method}
                        </p>
                      </div>
                      <Badge className={cn("border-0 font-semibold", toneFor(s.status))}>
                        {s.status}
                      </Badge>
                      <Button variant="outline" size="sm" className="shrink-0">
                        Report
                      </Button>
                    </div>
                  ))}
                </>
              )}
            </QueryState>
          </CardContent>
        </Card>

        <Card className="bg-card shadow-soft border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <Lightbulb className="text-primary size-4" /> Key findings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <QueryState<PmFinding[]>
              query={findingsQuery}
              error={{ title: "Findings unavailable" }}
              empty={{
                title: "No findings",
                description: "Key findings will appear here.",
              }}
              isEmpty={(rows) => rows.length === 0}
            >
              {(rows) => (
                <>
                  {rows.map((x, i) => (
                    <div
                      key={x.id}
                      className="flex items-center justify-between rounded-xl border p-3"
                    >
                      <span className="text-sm font-semibold">{x.title}</span>
                      <Badge
                        className={cn(
                          "border-0 font-semibold",
                          findingTones[i % findingTones.length],
                        )}
                      >
                        {x.tag}
                      </Badge>
                    </div>
                  ))}
                </>
              )}
            </QueryState>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
