import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Award, BriefcaseBusiness, Search, Star, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { useTalentCandidates } from "@/lib/query/recruitment";
import type { TalentCandidate } from "@/lib/api/recruitment";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/employer/talent")({
  head: () => ({
    meta: [
      { title: "Talent Search — CEA-OS" },
      { name: "description", content: "Browse verified portfolios by skill and certification." },
    ],
  }),
  component: EmployerTalentSearch,
});

function matchTone(match: number): string {
  if (match >= 90) return "bg-primary/10 text-primary";
  if (match >= 85) return "bg-learning/10 text-learning";
  return "bg-success/10 text-success";
}

function EmployerTalentSearch() {
  const query = useTalentCandidates();

  return (
    <AppShell
      roleKey="instructor"
      title="Talent search"
      subtitle="OSKM-verified candidates · 214 profiles in your filters"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            All candidates verified
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/employer/hub">
              <ArrowLeft className="size-4" /> Employer hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="bg-card shadow-soft flex flex-wrap items-center gap-2 rounded-2xl border p-3">
        <div className="bg-muted flex min-w-0 flex-1 items-center gap-2 rounded-xl px-3 py-2">
          <Search className="text-muted-foreground size-4 shrink-0" />
          <input
            className="placeholder:text-muted-foreground w-full bg-transparent text-sm font-medium outline-none"
            placeholder="Skills, track, certification, name…"
          />
        </div>
        <Button size="sm" className="font-semibold">
          Search
        </Button>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <QueryState<TalentCandidate[]> query={query} error={{ title: "Candidates unavailable" }}>
          {(rows) => (
            <>
              {rows.map((c) => (
                <Card key={c.id} className="bg-card shadow-soft border">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-display text-sm font-extrabold">{c.name}</p>
                        <p className="text-muted-foreground text-xs">{c.program}</p>
                      </div>
                      <Badge className={cn("border-0 font-bold", matchTone(c.match))}>
                        {c.match}% match
                      </Badge>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {c.skills.map((s) => (
                        <Badge key={s} variant="secondary" className="font-semibold">
                          {s}
                        </Badge>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <Badge variant="outline" className="font-semibold">
                        <Star className="text-warning size-3" /> OSKM: {c.score}/16
                      </Badge>
                      <Badge className="bg-muted text-muted-foreground border-0 font-semibold">
                        {c.available}
                      </Badge>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1 font-semibold">
                        Portfolio
                      </Button>
                      <Button size="sm" className="flex-1 font-semibold">
                        Shortlist
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </>
          )}
        </QueryState>
      </div>

      <Card className="bg-card mt-5 shadow-soft border">
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <Award className="text-primary size-4" /> Why verified matters
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-3">
          {[
            {
              icon: Users,
              t: "Skills proven",
              d: "OSKM verifications from projects, exams and mentor endorsements",
            },
            {
              icon: BriefcaseBusiness,
              t: "Work-ready",
              d: "Every profile links real, demoed projects",
            },
            {
              icon: Star,
              t: "Zero ghosts",
              d: "All candidates are currently enrolled or recently graduated",
            },
          ].map((f) => (
            <div key={f.t} className="rounded-xl border p-4">
              <f.icon className="text-primary size-5" />
              <p className="mt-2 text-sm font-bold">{f.t}</p>
              <p className="text-muted-foreground mt-1 text-xs leading-relaxed">{f.d}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
