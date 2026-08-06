import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ClipboardList, FileCheck, FileText, PenTool, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import { usePmBriefs } from "@/lib/query/productMarketing";
import type { PmBrief } from "@/lib/api/productMarketing";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/product-marketing/briefs")({
  head: () => ({
    meta: [
      { title: "Campaign Briefs — CEA-OS" },
      {
        name: "description",
        content: "Brief templates with objectives, audiences and success metrics.",
      },
    ],
  }),
  component: CampaignBriefs,
});

const statusTones: Record<string, string> = {
  approved: "bg-success/10 text-success",
  "in review": "bg-warning/10 text-warning",
};

function toneFor(status: string): string {
  return statusTones[status.toLowerCase()] ?? "bg-muted-foreground/10 text-muted-foreground";
}

function CampaignBriefs() {
  const briefsQuery = usePmBriefs();

  return (
    <AppShell
      roleKey="product-marketing"
      title="Campaign briefs"
      subtitle="12 briefs this quarter · 5 live · budget ₦18.4m"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">5 live</Badge>
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
            label: "Briefs (Q3)",
            value: "12",
            delta: "5 live",
            icon: FileText,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "In review",
            value: "3",
            delta: "2 owner follow-ups",
            icon: ClipboardList,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Approved",
            value: "7",
            delta: "of 12 total",
            icon: FileCheck,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Budget allocated",
            value: "₦18.4m",
            delta: "74% spent",
            icon: Send,
            tone: "bg-learning/10 text-learning",
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

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <QueryState<PmBrief[]>
          query={briefsQuery}
          error={{ title: "Briefs unavailable" }}
          empty={{
            title: "No briefs",
            description: "Campaign briefs will appear here.",
          }}
          isEmpty={(rows) => rows.length === 0}
        >
          {(rows) => (
            <>
              {rows.map((b) => (
                <Card key={b.id} className="bg-card shadow-soft border">
                  <CardHeader className="flex-row items-center justify-between">
                    <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                      <PenTool className="text-primary size-4" /> {b.title}
                    </CardTitle>
                    <Badge className={cn("border-0 font-semibold", toneFor(b.status))}>
                      {b.status}
                    </Badge>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      { l: "Objective", v: b.objective },
                      { l: "Audience", v: b.audience },
                      { l: "Channels", v: b.channels },
                      { l: "Success metric", v: b.metric },
                    ].map((f) => (
                      <div key={f.l} className="rounded-xl border p-3">
                        <p className="text-muted-foreground text-[10px] font-bold tracking-wide uppercase">
                          {f.l}
                        </p>
                        <p className="mt-0.5 text-xs font-semibold">{f.v}</p>
                      </div>
                    ))}
                    <div className="flex items-center justify-between pt-1 text-xs font-semibold">
                      <span className="text-muted-foreground">Budget burn</span>
                      <span>74%</span>
                    </div>
                    <Progress value={74} className="h-2" />
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
