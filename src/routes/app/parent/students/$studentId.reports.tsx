import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Download, FileText, GraduationCap, Printer, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/parent/students/$studentId/reports")({
  head: () => ({
    meta: [
      { title: "Reports — CEA-OS" },
      { name: "description", content: "Term reports and progress summaries for parents." },
    ],
  }),
  component: ParentStudentReports,
});

const reports = [
  {
    t: "Term 2 progress summary",
    d: "Issued Jul 15, 2026",
    tag: "Latest",
    tone: "bg-primary/10 text-primary",
  },
  {
    t: "Term 1 full report",
    d: "Issued Apr 3, 2026",
    tag: "PDF",
    tone: "bg-success/10 text-success",
  },
  {
    t: "Mentor check-in notes (Q2)",
    d: "Updated Jun 28, 2026",
    tag: "PDF",
    tone: "bg-learning/10 text-learning",
  },
];

function ParentStudentReports() {
  return (
    <AppShell
      roleKey="student"
      title="Reports"
      subtitle="Ada Okafor · term reports and summaries"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            3 reports available
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/parent/students/$studentId" params={{ studentId: "ada-okafor" }}>
              <ArrowLeft className="size-4" /> Overview
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-5 xl:grid-cols-[1.5fr_1fr]">
        <Card className="bg-card shadow-soft border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <FileText className="text-primary size-4" /> Report library
            </CardTitle>
          </CardHeader>
          <CardContent className="divide-y">
            {reports.map((r) => (
              <div
                key={r.t}
                className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
              >
                <span className="bg-muted text-muted-foreground grid size-9 shrink-0 place-items-center rounded-lg">
                  <FileText className="size-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold">{r.t}</p>
                  <p className="text-muted-foreground text-xs">{r.d}</p>
                </div>
                <Badge className={cn("border-0 font-semibold", r.tone)}>{r.tag}</Badge>
                <div className="flex shrink-0 gap-1">
                  <Button variant="outline" size="sm" className="font-semibold">
                    <Download className="size-3.5" /> PDF
                  </Button>
                  <Button variant="ghost" size="sm" className="text-primary font-semibold">
                    <Printer className="size-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-5">
          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <GraduationCap className="text-primary size-4" /> Latest summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { t: "GPA", v: "4.2 · top 5%", tone: "bg-success/10 text-success" },
                { t: "Attendance", v: "94%", tone: "bg-success/10 text-success" },
                { t: "Skill verifications", v: "11 of 16", tone: "bg-primary/10 text-primary" },
                {
                  t: "Teacher comments",
                  v: "4 · all positive",
                  tone: "bg-learning/10 text-learning",
                },
              ].map((x) => (
                <div key={x.t} className="flex items-center justify-between rounded-xl border p-3">
                  <span className="text-sm font-semibold">{x.t}</span>
                  <Badge className={cn("border-0 font-semibold", x.tone)}>{x.v}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-gradient-ink text-ink-foreground shadow-elevated border-0">
            <CardContent className="p-6">
              <Star className="text-warning size-5" />
              <p className="font-display mt-3 text-base font-extrabold">This term's highlight</p>
              <p className="text-ink-foreground/70 mt-1 text-sm">
                "Ada's NaijaEats project won best-in-cohort at the demo day. She led a team of four
                and shipped a fully documented API."
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
