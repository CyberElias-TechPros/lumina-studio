import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Download, FileText, Heart, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import type { NgoReport } from "@/lib/api/ngo";
import { useNgoReports } from "@/lib/query/ngo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/ngo/reports")({
  head: () => ({
    meta: [
      { title: "Impact Reports — CEA-OS" },
      { name: "description", content: "Outcomes and stories." },
    ],
  }),
  component: NgoReports,
});

const tones = [
  "bg-success/10 text-success",
  "bg-primary/10 text-primary",
  "bg-warning/10 text-warning",
  "bg-muted-foreground/10 text-muted-foreground",
];

function NgoReports() {
  const reportsQuery = useNgoReports();

  return (
    <AppShell
      roleKey="instructor"
      title="Impact reports"
      subtitle="6 published · auto-collected from CEA data"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">1.2k lives</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/ngo">
              <ArrowLeft className="size-4" /> Partnership hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Published",
            value: "6",
            delta: "this year",
            icon: FileText,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Beneficiaries",
            value: "1,240",
            delta: "2026",
            icon: Heart,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Completion rate",
            value: "91%",
            delta: "programs",
            icon: TrendingUp,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Downloads",
            value: "184",
            delta: "by donors",
            icon: Download,
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
            <FileText className="text-primary size-4" /> Reports
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          <QueryState<NgoReport[]>
            query={reportsQuery}
            error={{ title: "Reports unavailable" }}
            empty={{
              title: "No reports yet",
              description: "Impact reports will appear here.",
            }}
            isEmpty={(rows) => rows.length === 0}
          >
            {(rows) => (
              <>
                {rows.map((r, i) => (
                  <div
                    key={r.id}
                    className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold">{r.title}</p>
                      <p className="text-muted-foreground text-xs">{r.detail}</p>
                    </div>
                    <Badge className={cn("border-0 font-semibold", tones[i % tones.length])}>
                      {r.status}
                    </Badge>
                    <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                      View
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
