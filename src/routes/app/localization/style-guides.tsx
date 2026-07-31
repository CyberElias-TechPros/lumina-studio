import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, BookOpen, CheckCircle2, Flag, PenTool, SpellCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/localization/style-guides")({
  head: () => ({
    meta: [
      { title: "Style Guides — CEA-OS" },
      { name: "description", content: "Per-market style guides with do and don't lists." },
    ],
  }),
  component: StyleGuides,
});

const guides = [
  {
    t: "NG · English",
    dos: [
      "Write like a brilliant Lagos mentor",
      "Use concrete numbers and outcomes",
      "Address learners directly by first name",
    ],
    donts: [
      "Avoid British-US mixed spellings",
      "No get-rich-quick framing",
      "No borrowed American slang",
    ],
    status: "Live",
    tone: "bg-success/10 text-success",
  },
  {
    t: "Yoruba",
    dos: [
      "Use proverbs where they earn trust",
      "Keep sentences short and warm",
      "Respect age in address",
    ],
    donts: ["No direct word-for-word translation", "Avoid English loanwords without gloss"],
    status: "Live",
    tone: "bg-success/10 text-success",
  },
  {
    t: "Pidgin",
    dos: [
      "Keep it chill but respectful",
      "Spell consistently (naija standard)",
      "Use 'you' warmly",
    ],
    donts: ["No slang that drifts by month", "No stereotypes of Lagos life"],
    status: "In review",
    tone: "bg-warning/10 text-warning",
  },
  {
    t: "UK",
    dos: ["Be measured and professional", "Use UK spellings throughout", "Lead with evidence"],
    donts: ["No 'hustle' framing", "Avoid over-familiar tone"],
    status: "Live",
    tone: "bg-success/10 text-success",
  },
];

function StyleGuides() {
  return (
    <AppShell
      roleKey="localization"
      title="Style guides"
      subtitle="6 guides · 4 live · updated quarterly by copy team"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">4 live</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/localization">
              <ArrowLeft className="size-4" /> L10n hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Guides",
            value: "6",
            delta: "4 live · 2 draft",
            icon: BookOpen,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Markets covered",
            value: "6",
            delta: "NG x4 + UK + US",
            icon: PenTool,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Rules total",
            value: "118",
            delta: "72 do · 46 don't",
            icon: SpellCheck,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Review flags",
            value: "4",
            delta: "2 resolved this wk",
            icon: Flag,
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

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        {guides.map((g) => (
          <Card key={g.t} className="bg-card shadow-soft border">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <PenTool className="text-primary size-4" /> {g.t}
              </CardTitle>
              <Badge className={cn("border-0 font-semibold", g.tone)}>{g.status}</Badge>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-success/20 p-3">
                <p className="text-success text-[10px] font-bold tracking-wide uppercase">Do</p>
                <ul className="mt-2 space-y-1.5">
                  {g.dos.map((d) => (
                    <li key={d} className="flex items-start gap-1.5 text-xs font-semibold">
                      <CheckCircle2 className="text-success mt-0.5 size-3.5 shrink-0" /> {d}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-error/20 p-3">
                <p className="text-error text-[10px] font-bold tracking-wide uppercase">Don't</p>
                <ul className="mt-2 space-y-1.5">
                  {g.donts.map((d) => (
                    <li key={d} className="flex items-start gap-1.5 text-xs font-semibold">
                      <span className="text-error mt-0.5 grid size-3.5 shrink-0 place-items-center text-[10px] font-extrabold">
                        x
                      </span>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
