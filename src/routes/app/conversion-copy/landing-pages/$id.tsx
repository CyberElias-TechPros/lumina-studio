import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Eye, LayoutTemplate, PenLine, Save } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/conversion-copy/landing-pages/$id")({
  head: () => ({
    meta: [
      { title: "Landing Page Copy — CEA-OS" },
      { name: "description", content: "Edit conversion copy on landing pages." },
    ],
  }),
  component: CopyLandingPage,
});

const sections = [
  {
    s: "Hero",
    v: "Cohort 17 applications open — pay in installments",
    c: "Conversion rate 6.2%",
    tone: "bg-success/10 text-success",
  },
  {
    s: "Social proof",
    v: "1,240+ alumni placed in tech roles",
    c: "Conversion rate 4.8%",
    tone: "bg-success/10 text-success",
  },
  {
    s: "FAQ",
    v: "12 questions · updated by admissions",
    c: "Saves 31% of tickets",
    tone: "bg-primary/10 text-primary",
  },
];

function CopyLandingPage() {
  return (
    <AppShell
      roleKey="instructor"
      title="Landing page copy"
      subtitle="/enroll · cohort 17 · conversion rate 5.4%"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">Published</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/conversion-copy/library">
              <ArrowLeft className="size-4" /> Library
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Visitors (30d)",
            value: "18.4k",
            delta: "+22% MoM",
            icon: Eye,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Conversion",
            value: "5.4%",
            delta: "+0.8 pts",
            icon: LayoutTemplate,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Variants",
            value: "12",
            delta: "A/B tested",
            icon: PenLine,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Unpublished",
            value: "3",
            delta: "pending review",
            icon: Save,
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
            <PenLine className="text-primary size-4" /> Sections
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          {sections.map((s) => (
            <div key={s.s} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{s.s}</p>
                <p className="text-muted-foreground text-xs">{s.v}</p>
              </div>
              <Badge className={cn("border-0 font-semibold", s.tone)}>{s.c}</Badge>
              <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                Edit
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
