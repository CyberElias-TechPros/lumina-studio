import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CopyCheck, FileText, Library, PenLine, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/conversion-copy/library")({
  head: () => ({
    meta: [
      { title: "Copy Asset Library — CEA-OS" },
      { name: "description", content: "Reusable conversion copy assets." },
    ],
  }),
  component: CopyLibrary,
});

const assets = [
  {
    a: "Enrolment page H1 set",
    v: "12 variants · last used Jul 28",
    s: "Active",
    tone: "bg-success/10 text-success",
  },
  {
    a: "Cohort 17 launch email",
    v: "4 variants · last used Jul 20",
    s: "Active",
    tone: "bg-success/10 text-success",
  },
  {
    a: "Scholarship hero copy",
    v: "3 variants · review pending",
    s: "Draft",
    tone: "bg-warning/10 text-warning",
  },
];

function CopyLibrary() {
  return (
    <AppShell
      roleKey="instructor"
      title="Copy asset library"
      subtitle="214 assets · tagged · versioned · 1-click reuse"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">214 assets</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/portal/copywriter">
              <ArrowLeft className="size-4" /> Copywriter portal
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Assets",
            value: "214",
            delta: "112 email · 64 page",
            icon: FileText,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Variants",
            value: "38",
            delta: "A/B ready",
            icon: CopyCheck,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Reused (30d)",
            value: "142",
            delta: "pull count",
            icon: Library,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Drafts",
            value: "7",
            delta: "in progress",
            icon: PenLine,
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
            <Search className="text-primary size-4" /> Recent assets
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          {assets.map((a) => (
            <div key={a.a} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{a.a}</p>
                <p className="text-muted-foreground text-xs">{a.v}</p>
              </div>
              <Badge className={cn("border-0 font-semibold", a.tone)}>{a.s}</Badge>
              <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                Open
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
