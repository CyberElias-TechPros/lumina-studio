import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Heart, MapPin, Megaphone, Users, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import type { NgoProgram } from "@/lib/api/ngo";
import { useNgoPrograms } from "@/lib/query/ngo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/ngo/programs")({
  head: () => ({
    meta: [
      { title: "Community Programs — CEA-OS" },
      { name: "description", content: "Outreach programs and beneficiaries." },
    ],
  }),
  component: NgoPrograms,
});

const tones = [
  "bg-success/10 text-success",
  "bg-primary/10 text-primary",
  "bg-warning/10 text-warning",
  "bg-muted-foreground/10 text-muted-foreground",
];

function NgoPrograms() {
  const programsQuery = useNgoPrograms();

  return (
    <AppShell
      roleKey="ngo"
      title="Community programs"
      subtitle="3 programs · 1,240 beneficiaries · 12 partners"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">2 ongoing</Badge>
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
            label: "Programs",
            value: "3",
            delta: "2026",
            icon: Megaphone,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Beneficiaries",
            value: "1,240",
            delta: "+310 this term",
            icon: Heart,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Locations",
            value: "3",
            delta: "states",
            icon: MapPin,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Budget used",
            value: "₦8.2m",
            delta: "of ₦11m",
            icon: Wallet,
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
            <Users className="text-primary size-4" /> Programs
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          <QueryState<NgoProgram[]>
            query={programsQuery}
            error={{ title: "Programs unavailable" }}
            empty={{
              title: "No programs yet",
              description: "Community programs will appear here.",
            }}
            isEmpty={(rows) => rows.length === 0}
          >
            {(rows) => (
              <>
                {rows.map((p, i) => (
                  <div
                    key={p.id}
                    className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold">{p.name}</p>
                      <p className="text-muted-foreground text-xs">
                        {p.location} · {p.beneficiaries}
                      </p>
                    </div>
                    <Badge className={cn("border-0 font-semibold", tones[i % tones.length])}>
                      {p.status}
                    </Badge>
                    <Button asChild variant="outline" size="sm" className="shrink-0 font-semibold">
                      <Link to="/app/ngo/programs/$programId/budget" params={{ programId: p.id }}>
                        Budget
                      </Link>
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
