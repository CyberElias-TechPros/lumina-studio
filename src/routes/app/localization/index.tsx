import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Database,
  Eye,
  Globe,
  Languages,
  LineChart,
  MapPin,
  MessageSquareText,
  PenTool,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/localization/")({
  head: () => ({
    meta: [
      { title: "Localization Hub — CEA-OS" },
      {
        name: "description",
        content: "Market copy variants, translation memory, glossaries and locale analytics.",
      },
    ],
  }),
  component: LocalizationHub,
});

const screens = [
  {
    icon: Languages,
    label: "Copy variants",
    desc: "9 locale cards, tone notes",
    path: "/app/localization/variants",
    tone: "bg-primary/10 text-primary",
  },
  {
    icon: Database,
    label: "Translation memory",
    desc: "Source-target pairs, match %",
    path: "/app/localization/translation-memory",
    tone: "bg-learning/10 text-learning",
  },
  {
    icon: BookOpen,
    label: "Glossary",
    desc: "Terms, usage, cultural notes",
    path: "/app/localization/glossary",
    tone: "bg-success/10 text-success",
  },
  {
    icon: PenTool,
    label: "Style guides",
    desc: "Do/don't per market",
    path: "/app/localization/style-guides",
    tone: "bg-warning/10 text-warning",
  },
  {
    icon: Eye,
    label: "Page preview",
    desc: "Side-by-side locales",
    path: "/app/localization/preview",
    tone: "bg-career/10 text-career",
  },
  {
    icon: MessageSquareText,
    label: "Dialects",
    desc: "Variant groups, coverage",
    path: "/app/localization/dialects",
    tone: "bg-community/10 text-community",
  },
  {
    icon: LineChart,
    label: "Analytics",
    desc: "Per-locale conversion",
    path: "/app/localization/analytics",
    tone: "bg-erp/10 text-erp",
  },
];

function LocalizationHub() {
  return (
    <AppShell
      roleKey="localization"
      title="Localization hub"
      subtitle="4 markets · 3 languages · 38 localized pages · 1,240 strings"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">Tone verified</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/portal/global-copywriter">
              <ArrowLeft className="size-4" /> Copy portal
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Markets",
            value: "4",
            delta: "NG, UK, GH, US",
            icon: Globe,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Languages",
            value: "3",
            delta: "EN, YO, HA",
            icon: Languages,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Localized pages",
            value: "38",
            delta: "12 pending",
            icon: MapPin,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Cultural flags",
            value: "3",
            delta: "resolved this wk",
            icon: Sparkles,
            tone: "bg-success/10 text-success",
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
            <Globe className="text-primary size-4" /> Workspace
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {screens.map((s) => (
            <Link
              key={s.path}
              to={s.path}
              className="group bg-card shadow-soft hover:shadow-elevated flex flex-col rounded-xl border p-4 transition-all hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between">
                <span className={cn("grid size-9 place-items-center rounded-lg", s.tone)}>
                  <s.icon className="size-4" />
                </span>
                <ArrowRight className="text-muted-foreground group-hover:text-primary size-4 transition-colors" />
              </div>
              <p className="font-display mt-3 text-sm font-extrabold">{s.label}</p>
              <p className="text-muted-foreground mt-1 text-xs">{s.desc}</p>
            </Link>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
