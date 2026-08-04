import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, MailCheck, UserRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { useAdminApplications, useUpdateApplicationStatus } from "@/lib/query/admissions";
import {
  PIPELINE_ORDER,
  PIPELINE_STAGE_LABELS,
  type AdminApplication,
  type PipelineStage,
} from "@/lib/api/applications";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/admissions/applications/$id")({
  head: () => ({
    meta: [
      { title: "Application — CEA-OS" },
      { name: "description", content: "Application detail view." },
    ],
  }),
  component: AdmissionsApplicationDetail,
});

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

function AdmissionsApplicationDetail() {
  const { id } = Route.useParams();
  const applications = useAdminApplications();
  const advance = useUpdateApplicationStatus();
  const items = applications.data?.pages.flatMap((p) => p.items) ?? [];
  const app = items.find((a) => a.ref === id || a.id === id);

  return (
    <AppShell
      roleKey="instructor"
      title={app ? `Application · ${app.fullName}` : "Application"}
      subtitle={
        app
          ? `${app.programTitle ?? "Program not listed"} · applied ${formatDate(app.createdAt)}`
          : "Loading…"
      }
      actions={
        <>
          <Badge className="bg-primary/10 text-primary border-0 font-semibold">
            {app ? (PIPELINE_STAGE_LABELS[app.status as PipelineStage] ?? app.status) : "…"}
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/admissions/applications">
              <ArrowLeft className="size-4" /> Applications
            </Link>
          </Button>
        </>
      }
    >
      <QueryState<AdminApplication[]>
        query={applications}
        error={{ title: "Application unavailable" }}
        empty={{
          title: "Application not found",
          description: "It may have been removed or the link is wrong.",
        }}
        isEmpty={(rows) => !rows.some((a) => a.ref === id || a.id === id)}
      >
        {(rows) => {
          const current = rows.find((a) => a.ref === id || a.id === id) as AdminApplication;
          const idx = PIPELINE_ORDER.indexOf(current.status as PipelineStage);
          const nextStage =
            idx >= 0 && idx < PIPELINE_ORDER.length - 1 ? PIPELINE_ORDER[idx + 1] : null;
          const beforeOffer = idx >= 0 && idx < 4;
          const beforeEnrolled = idx >= 0 && idx < 5;
          const move = (status: PipelineStage) => advance.mutate({ ref: current.ref, status });

          return (
            <div className="grid gap-5 xl:grid-cols-[1.5fr_1fr]">
              <div className="space-y-5">
                <Card className="bg-card shadow-soft border">
                  <CardHeader>
                    <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                      <UserRound className="text-primary size-4" /> Applicant
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <p>
                      <span className="text-muted-foreground font-semibold">Name:</span>{" "}
                      {current.fullName}
                    </p>
                    <p>
                      <span className="text-muted-foreground font-semibold">Email:</span>{" "}
                      {current.email}
                    </p>
                    <p>
                      <span className="text-muted-foreground font-semibold">Program:</span>{" "}
                      {current.programTitle ?? "—"}
                    </p>
                    <p>
                      <span className="text-muted-foreground font-semibold">Reference:</span>{" "}
                      {current.ref}
                    </p>
                    {current.city && (
                      <p>
                        <span className="text-muted-foreground font-semibold">City:</span>{" "}
                        {current.city}
                      </p>
                    )}
                    {current.phone && (
                      <p>
                        <span className="text-muted-foreground font-semibold">Phone:</span>{" "}
                        {current.phone}
                      </p>
                    )}
                    {current.experience && (
                      <p>
                        <span className="text-muted-foreground font-semibold">Experience:</span>{" "}
                        {current.experience}
                      </p>
                    )}
                  </CardContent>
                </Card>

                {current.note && (
                  <Card className="bg-card shadow-soft border">
                    <CardHeader>
                      <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                        <CheckCircle2 className="text-primary size-4" /> Latest note
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm">{current.note}</CardContent>
                  </Card>
                )}
              </div>

              <div className="space-y-5">
                <Card className="bg-card shadow-soft border">
                  <CardHeader>
                    <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                      <CheckCircle2 className="text-primary size-4" /> Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {nextStage && (
                      <Button
                        size="sm"
                        className="bg-gradient-brand shadow-glow w-full border-0 font-semibold"
                        onClick={() => move(nextStage)}
                        disabled={advance.isPending}
                      >
                        <MailCheck className="size-4" />{" "}
                        {advance.isPending
                          ? "Updating…"
                          : `Advance to ${PIPELINE_STAGE_LABELS[nextStage]}`}
                      </Button>
                    )}
                    {beforeOffer && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full font-semibold"
                        onClick={() => move("offer")}
                        disabled={advance.isPending}
                      >
                        Send offer
                      </Button>
                    )}
                    {beforeEnrolled && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full font-semibold"
                        onClick={() => move("enrolled")}
                        disabled={advance.isPending}
                      >
                        Mark enrolled
                      </Button>
                    )}
                  </CardContent>
                </Card>

                <Card className="bg-card shadow-soft border">
                  <CardHeader>
                    <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                      <CheckCircle2 className="text-primary size-4" /> Timeline
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-xs font-semibold">
                    <p className="text-muted-foreground">
                      {formatDate(current.createdAt)} · Application submitted
                    </p>
                    <p className="text-muted-foreground">
                      {formatDate(current.updatedAt)} ·{" "}
                      {PIPELINE_STAGE_LABELS[current.status as PipelineStage] ?? current.status}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          );
        }}
      </QueryState>
    </AppShell>
  );
}
