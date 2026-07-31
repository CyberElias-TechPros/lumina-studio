import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  FileCheck2,
  FileText,
  GraduationCap,
  Search,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/portal/registrar")({
  head: () => ({
    meta: [
      { title: "Registrar Portal — CEA-OS" },
      {
        name: "description",
        content:
          "Student records, cohort management, transcripts and verifications for the Registrar's office.",
      },
    ],
  }),
  component: RegistrarPortal,
});

const requests = [
  {
    id: "R-2841",
    name: "Adaeze Okafor",
    item: "Official transcript",
    status: "Pending",
    tone: "bg-warning/10 text-warning",
  },
  {
    id: "R-2840",
    name: "Yusuf Lawal",
    item: "Enrolment letter",
    status: "Ready",
    tone: "bg-success/10 text-success",
  },
  {
    id: "R-2839",
    name: "Halima Sani",
    item: "Certificate verification",
    status: "In review",
    tone: "bg-primary/10 text-primary",
  },
  {
    id: "R-2838",
    name: "Chukwuemeka Obi",
    item: "Deferral request",
    status: "Pending",
    tone: "bg-warning/10 text-warning",
  },
];

function RegistrarPortal() {
  return (
    <AppShell
      roleKey="instructor"
      title="Registrar's office"
      subtitle="Records, cohorts, transcripts, verifications"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            Census: 214 active
          </Badge>
          <div className="relative ml-auto">
            <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
            <Input
              placeholder="Search student records…"
              className="h-9 w-52 pl-9 text-sm shadow-none"
            />
          </div>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Active learners",
            value: "214",
            delta: "across 3 cohorts",
            icon: Users,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Records requests",
            value: "17",
            delta: "4 new today",
            icon: FileText,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Verifications",
            value: "9",
            delta: "this week",
            icon: FileCheck2,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Enrolment this term",
            value: "82",
            delta: "target 90",
            icon: BookOpen,
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

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.5fr_1fr]">
        <Card className="bg-card shadow-soft border">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <FileText className="text-primary size-4" /> Records requests queue
            </CardTitle>
            <Badge className="bg-error/10 text-error border-0 font-semibold">4 overdue</Badge>
          </CardHeader>
          <CardContent className="divide-y">
            {requests.map((r) => (
              <div
                key={r.id}
                className="flex flex-wrap items-center gap-3 py-3.5 first:pt-0 last:pb-0"
              >
                <span className="bg-muted text-muted-foreground font-mono grid size-9 shrink-0 place-items-center rounded-lg text-[10px] font-bold">
                  {r.id}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold">{r.name}</p>
                  <p className="text-muted-foreground text-xs">{r.item}</p>
                </div>
                <Badge className={cn("border-0 font-semibold", r.tone)}>{r.status}</Badge>
                <Button variant="outline" size="sm" className="shrink-0">
                  Process
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-5">
          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <GraduationCap className="text-primary size-4" /> Cohorts · 2026
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                {
                  c: "Cohort 16",
                  d: "Starts Sep 7 · applications open",
                  s: "74 applied",
                  tone: "bg-primary/10 text-primary",
                },
                {
                  c: "Cohort 15",
                  d: "In session · week 12 of 38",
                  s: "62 enrolled",
                  tone: "bg-learning/10 text-learning",
                },
                {
                  c: "Cohort 14",
                  d: "Graduating Nov 14",
                  s: "58 enrolled",
                  tone: "bg-success/10 text-success",
                },
              ].map((x) => (
                <div key={x.c} className="rounded-xl border p-3.5">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold">{x.c}</p>
                    <Badge className={cn("border-0 font-semibold", x.tone)}>{x.s}</Badge>
                  </div>
                  <p className="text-muted-foreground mt-1 text-xs">{x.d}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-gradient-ink text-ink-foreground shadow-elevated border-0">
            <CardContent className="p-6">
              <FileCheck2 className="text-career size-5" />
              <p className="font-display mt-3 text-base font-extrabold">Certificate registry</p>
              <p className="text-ink-foreground/70 mt-1 text-sm">
                2,140 credentials issued since 2021. 96% verification success rate — registry sync
                is healthy.
              </p>
              <Button asChild size="sm" className="bg-gradient-brand shadow-glow mt-4 border-0">
                <Link to="/certificates/verify">
                  Verification portal <ArrowRight className="ml-1 size-3.5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
