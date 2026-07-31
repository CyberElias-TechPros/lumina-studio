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

const competitors = [
  {
    name: "Skilledge NG",
    focus: "Coding bootcamps",
    strength: "Strong Lagos brand",
    weakness: "No employer pass",
    notes: "Won 2 of 3 deals Q3",
    tone: "bg-primary/10 text-primary",
  },
  {
    name: "Aptbridge",
    focus: "Corporate training",
    strength: "Enterprise sales team",
    weakness: "Dated LMS UX",
    notes: "Won 1 of 2 this month",
    tone: "bg-learning/10 text-learning",
  },
  {
    name: "GlobalPath",
    focus: "UK placement focus",
    strength: "Strong diaspora links",
    weakness: "Weak portfolio tooling",
    notes: "Active on parent app deal",
    tone: "bg-warning/10 text-warning",
  },
];

function CompetitiveIntel() {
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
          {competitors.map((c) => (
            <Card key={c.name} className="bg-card shadow-soft border">
              <CardHeader className="flex-row items-center justify-between">
                <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                  <Sword className={cn("size-4", c.tone)} /> {c.name}
                </CardTitle>
                <Badge className={cn("border-0 font-semibold", c.tone)}>{c.focus}</Badge>
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
          ))}
        </div>

        <Card className="bg-card shadow-soft border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <TrendingUp className="text-primary size-4" /> Feature comparison
            </CardTitle>
          </CardHeader>
          <CardContent>
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
                {[
                  { f: "Live Lagos classes", a: true, b: true, c: false },
                  { f: "Employer talent pass", a: true, b: false, c: true },
                  { f: "Portfolio builder", a: true, b: true, c: false },
                  { f: "Diaspora financing", a: true, b: false, c: false },
                  { f: "Data & AI track", a: true, b: true, c: false },
                ].map((r) => (
                  <TableRow key={r.f}>
                    <TableCell className="font-semibold">{r.f}</TableCell>
                    <TableCell>
                      <Check className="text-success size-4" />
                    </TableCell>
                    <TableCell>
                      {r.b ? (
                        <Check className="text-success size-4" />
                      ) : (
                        <X className="text-error size-4" />
                      )}
                    </TableCell>
                    <TableCell>
                      {r.c ? (
                        <Check className="text-success size-4" />
                      ) : (
                        <X className="text-error size-4" />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
