"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QueryState } from "@/components/ui/query-state";
import { MentoringProfileEditor } from "@/components/mentoring/profile-editor";
import { MentoringRequests } from "@/components/mentoring/requests";
import { AppShell } from "@/components/app/app-shell";
import { useMntRequests } from "@/lib/query/mentorDashboard";
import type { MntRequest } from "@/lib/api/mentorDashboard";

export const Route = createFileRoute("/app/mentor/requests")({
  head: () => ({
    meta: [
      { title: "Mentorship Requests — CEA-OS" },
      { name: "description", content: "Review existing mentorship request records." },
    ],
  }),
  component: MentorRequests,
});

function MentorRequests() {
  const requests = useMntRequests();
  return (
    <AppShell
      roleKey="mentor"
      title="Mentorship requests"
      subtitle="Your mentoring profile and requests"
      actions={
        <Button asChild variant="outline" size="sm">
          <Link to="/app/mentor">
            <ArrowLeft className="size-4" /> Dashboard
          </Link>
        </Button>
      }
    >
      <div className="space-y-5">
        <MentoringProfileEditor />
        <MentoringRequests direction="incoming" />
        <Card className="bg-card shadow-soft border">
          <CardHeader>
            <CardTitle>Legacy dashboard records (read-only)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground text-sm">
              These older dashboard records are separate from the new request queue above. Their
              provenance is not verified. Contact the Academy to confirm a record or follow up.
            </p>
            <QueryState<MntRequest[]>
              query={requests}
              error={{ title: "Requests unavailable" }}
              empty={{
                title: "No existing records shown",
                description: "This does not confirm whether there are requests elsewhere.",
              }}
              isEmpty={(rows) => rows.length === 0}
            >
              {(rows) => (
                <div className="grid gap-3 sm:grid-cols-2">
                  {rows.map((r) => (
                    <Card key={r.id} className="border">
                      <CardContent className="space-y-2 p-4">
                        <p className="font-semibold">{r.requesterName}</p>
                        <p className="text-muted-foreground text-sm">{r.track}</p>
                        <p className="text-muted-foreground text-sm">{r.why}</p>
                        <p className="text-muted-foreground text-xs">Recorded status: {r.status}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </QueryState>
            {requests.hasNextPage && (
              <Button
                variant="outline"
                onClick={() => void requests.fetchNextPage()}
                disabled={requests.isFetchingNextPage}
              >
                {requests.isFetchingNextPage ? "Loading…" : "Load more records"}
              </Button>
            )}
            {requests.isFetchNextPageError && (
              <p role="alert" className="text-sm">
                Could not load more records. Try again.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
