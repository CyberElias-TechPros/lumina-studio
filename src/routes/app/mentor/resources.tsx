import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, BookOpen, FileText, Link2, ListChecks, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
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

const groups = [
  {
    t: "Session templates",
    items: ["Goal review · 45 min", "Mock interview · 60 min", "Portfolio critique · 30 min"],
    tone: "bg-primary/10 text-primary",
  },
  {
    t: "Career toolkit",
    items: ["CV rubric v3", "Interview question bank (120+)", "Salary guide 2026"],
    tone: "bg-learning/10 text-learning",
  },
  {
    t: "Learning support",
    items: ["SQL exercise pack", "Systems design scenarios", "Debugging drills"],
    tone: "bg-success/10 text-success",
  },
  {
    t: "Reports & feedback",
    items: ["Progress report template", "Endorsement guide", "Goal-setting worksheet"],
    tone: "bg-warning/10 text-warning",
  },
];

function MentorResources() {
  return (
    <AppShell
      roleKey="instructor"
      title="Resources library"
      subtitle="Templates, banks and guides · updated weekly"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">24 resources</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/mentor">
              <ArrowLeft className="size-4" /> Dashboard
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {groups.map((g) => (
          <Card key={g.t} className="bg-card shadow-soft border">
            <CardHeader className="pb-3">
              <span className={cn("grid size-10 place-items-center rounded-xl", g.tone)}>
                <BookOpen className="size-5" />
              </span>
              <CardTitle className="font-display mt-3 text-sm font-extrabold">{g.t}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {g.items.map((i) => (
                <div
                  key={i}
                  className="hover:bg-muted/50 flex cursor-pointer items-center justify-between gap-2 rounded-lg border p-2.5 transition-colors"
                >
                  <span className="text-xs font-semibold">{i}</span>
                  <FileText className="text-muted-foreground size-3.5 shrink-0" />
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

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
    </AppShell>
  );
}
