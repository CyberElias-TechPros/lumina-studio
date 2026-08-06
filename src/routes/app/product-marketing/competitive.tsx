import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Check, Database, Shield, Sword, TrendingUp, Trophy, X } from "lucide-react";
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
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import { usePmCompetitors, usePmFeatures } from "@/lib/query/productMarketing";
import type { PmCompetitor, PmFeatureFlag } from "@/lib/api/productMarketing";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/product-marketing/competitive")({
  head: () => ({
    meta: [
      { title: "Competitive Intelligence — CEA-OS" },
      {
        name: "description",
        content: "Competitor tracking, feature comparisons and win/loss notes.",
      },
    ],
  }),
  component: CompetitiveIntel,
});

const competitorTones = [
  "bg-primary/10 text-primary",
  "bg-learning/10 text-learning",
  "bg-warning/10 text-warning",
];

function CompetitiveIntel() {
  const competitorsQuery = usePmCompetitors();
  const featuresQuery = usePmFeatures();

  return (
    <AppShell
      roleKey="product-marketing"
      title="Competitive intelligence"
      subtitle="9 tracked · 3 new this quarter · win rate 68%"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">Win rate 68%</Badge>
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
            label: "Competitors tracked",
            value: "9",
            delta: "3 in Lagos market",
            icon: Sword,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Feature gaps",
            value: "4",
            delta: "1 critical",
            icon: Shield,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Win rate",
            value: "68%",
            delta: "+5 pts QoQ",
            icon: Trophy,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Win/loss notes",
            value: "14",
            delta: "4 this month",
            icon: Database,
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

      <div className="mt-5 grid gap-5 xl:grid-cols-2">
        <div className="space-y-5">
          <QueryState<PmCompetitor[]>
            query={competitorsQuery}
            error={{ title: "Competitors unavailable" }}
            empty={{
              title: "No competitors tracked",
              description: "Competitor cards will appear here.",
            }}
            isEmpty={(rows) => rows.length === 0}
          >
            {(rows) => (
              <>
                {rows.map((c, i) => {
                  const tone = competitorTones[i % competitorTones.length];
                  return (
                    <Card key={c.id} className="bg-card shadow-soft border">
                      <CardHeader className="flex-row items-center justify-between">
                        <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                          <Sword className={cn("size-4", tone)} /> {c.name}
                        </CardTitle>
                        <Badge className={cn("border-0 font-semibold", tone)}>{c.focus}</Badge>
                      </CardHeader>
                      <CardContent className="grid gap-3 sm:grid-cols-3">
                        <div className="rounded-xl border p-3">
                          <p className="text-success text-[10px] font-bold tracking-wide uppercase">
                            Strength
                          </p>
                          <p className="mt-1 text-xs font-semibold">{c.strength}</p>
                        </div>
                        <div className="rounded-xl border p-3">
                          <p className="text-error text-[10px] font-bold tracking-wide uppercase">
                            Weakness
                          </p>
                          <p className="mt-1 text-xs font-semibold">{c.weakness}</p>
                        </div>
                        <div className="rounded-xl border p-3">
                          <p className="text-muted-foreground text-[10px] font-bold tracking-wide uppercase">
                            Win/loss
                          </p>
                          <p className="mt-1 text-xs font-semibold">{c.notes}</p>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </>
            )}
          </QueryState>
        </div>

        <Card className="bg-card shadow-soft border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <TrendingUp className="text-primary size-4" /> Feature comparison
            </CardTitle>
          </CardHeader>
          <CardContent>
            <QueryState<PmFeatureFlag[]>
              query={featuresQuery}
              error={{ title: "Feature comparison unavailable" }}
              empty={{
                title: "No feature flags",
                description: "Feature comparisons will appear here.",
              }}
              isEmpty={(rows) => rows.length === 0}
            >
              {(rows) => (
                <>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Capability</TableHead>
                        <TableHead>CEA-OS</TableHead>
                        <TableHead>Skilledge</TableHead>
                        <TableHead>Aptbridge</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {rows.map((r) => (
                        <TableRow key={r.id}>
                          <TableCell className="font-semibold">{r.capability}</TableCell>
                          <TableCell>
                            <Check className="text-success size-4" />
                          </TableCell>
                          <TableCell>
                            {r.skilledge ? (
                              <Check className="text-success size-4" />
                            ) : (
                              <X className="text-error size-4" />
                            )}
                          </TableCell>
                          <TableCell>
                            {r.aptbridge ? (
                              <Check className="text-success size-4" />
                            ) : (
                              <X className="text-error size-4" />
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </>
              )}
            </QueryState>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
