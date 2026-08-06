import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, BookOpen, FileText, Link2, ListChecks, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { useMntResourceItems, useMntResources } from "@/lib/query/mentorDashboard";
import type { MntResource } from "@/lib/api/mentorDashboard";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/mentor/resources")({
  head: () => ({
    meta: [
      { title: "Resources Library — CEA-OS" },
      { name: "description", content: "Mentoring templates, question banks and guides." },
    ],
  }),
  component: MentorResources,
});

const groupTone = [
  "bg-primary/10 text-primary",
  "bg-learning/10 text-learning",
  "bg-success/10 text-success",
  "bg-warning/10 text-warning",
];

function MentorResources() {
  const groupsQuery = useMntResources();
  const groups = useMntResourceItems();

  const total = groups.reduce((n, g) => n + g.items.length, 0);

  return (
    <AppShell
      roleKey="instructor"
      title="Resources library"
      subtitle="Templates, banks and guides · updated weekly"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            {groups.length > 0 ? `${total} resources` : "—"}
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/mentor">
              <ArrowLeft className="size-4" /> Dashboard
            </Link>
          </Button>
        </>
      }
    >
      <QueryState<MntResource[]>
        query={groupsQuery}
        error={{ title: "Resources unavailable" }}
        empty={{
          title: "No resources yet",
          description: "Resources from the mentoring team will show here.",
        }}
        isEmpty={(rows) => rows.length === 0}
      >
        {(rows) => (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {rows.map((g, i) => (
              <Card key={g.id} className="bg-card shadow-soft border">
                <CardHeader className="pb-3">
                  <span
                    className={cn(
                      "grid size-10 place-items-center rounded-xl",
                      groupTone[i % groupTone.length],
                    )}
                  >
                    <BookOpen className="size-5" />
                  </span>
                  <CardTitle className="font-display mt-3 text-sm font-extrabold">
                    {g.groupTitle}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {g.items.map((item) => (
                    <div
                      key={item}
                      className="hover:bg-muted/50 flex cursor-pointer items-center justify-between gap-2 rounded-lg border p-2.5 transition-colors"
                    >
                      <span className="text-xs font-semibold">{item}</span>
                      <FileText className="text-muted-foreground size-3.5 shrink-0" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </QueryState>

      <Card className="bg-card mt-5 shadow-soft border">
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <Star className="text-primary size-4" /> Most used this month
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { t: "Interview question bank", v: "Used 18×", tone: "bg-primary/10 text-primary" },
            { t: "Goal-setting worksheet", v: "Used 11×", tone: "bg-learning/10 text-learning" },
            { t: "CV rubric v3", v: "Used 9×", tone: "bg-success/10 text-success" },
          ].map((x) => (
            <div key={x.t} className="flex items-center justify-between rounded-xl border p-3">
              <span className="flex items-center gap-2 text-sm font-semibold">
                <ListChecks className="text-muted-foreground size-4" /> {x.t}
              </span>
              <Badge className={cn("border-0 font-semibold", x.tone)}>{x.v}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      <p className="text-muted-foreground mt-4 flex items-center gap-2 text-xs">
        <Link2 className="size-3.5" /> Resources sync from the academic team's drive each week.
      </p>
    </AppShell>
  );
}
