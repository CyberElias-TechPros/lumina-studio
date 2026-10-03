"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { ArrowLeft, ArrowRight, BriefcaseBusiness } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import { usePostings } from "@/lib/query/recruitment";
import type { JobPosting } from "@/lib/api/recruitment";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/employer/pipeline/")({
  head: () => ({
    meta: [
      { title: "Candidate Pipelines — CEA-OS" },
      { name: "description", content: "Choose a job opening to review its candidate pipeline." },
    ],
  }),
  component: PipelineIndex,
});

function PipelineIndex() {
  const postingsQuery = usePostings();

  return (
    <AppShell
      roleKey="employer"
      title="Candidate pipelines"
      subtitle="Choose a job opening to shortlist, interview and hire candidates"
      actions={
        <Button asChild variant="outline" size="sm" className="font-semibold">
          <Link to="/app/employer/hub">
            <ArrowLeft className="size-4" /> Employer hub
          </Link>
        </Button>
      }
    >
      <Card className="bg-card shadow-soft border">
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <BriefcaseBusiness className="text-primary size-4" /> Your job openings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <QueryState<JobPosting[]>
            query={postingsQuery}
            error={{ title: "Job openings unavailable" }}
            empty={{
              title: "No job openings yet",
              description:
                "Create a job opening first, then its candidate pipeline will appear here.",
              action: (
                <Button asChild size="sm">
                  <Link to="/app/employer/jobs">Manage jobs</Link>
                </Button>
              ),
            }}
          >
            {(postings) => (
              <div className="grid gap-3 md:grid-cols-2">
                {postings.map((posting) => (
                  <Link
                    key={posting.id}
                    to="/app/employer/pipeline/$jobId"
                    params={{ jobId: posting.id }}
                    className="group rounded-xl border p-4 transition-colors hover:border-primary/50 hover:bg-muted/30"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-display truncate text-sm font-bold">{posting.title}</p>
                        <p className="text-muted-foreground mt-1 text-xs">
                          {posting.applicants} applicants · {posting.views} views
                        </p>
                      </div>
                      <Badge className={cn("shrink-0 border-0 font-semibold", posting.tone)}>
                        {posting.status}
                      </Badge>
                    </div>
                    <div className="text-primary mt-4 flex items-center gap-1 text-xs font-bold">
                      Open pipeline{" "}
                      <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </QueryState>
        </CardContent>
      </Card>
    </AppShell>
  );
}
