"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  cancelMentoringRequest,
  getMentoringRequests,
  respondMentoringRequest,
} from "@/lib/api/mentoring";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function MentoringRequests({ direction }: { direction: "incoming" | "outgoing" }) {
  const client = useQueryClient(),
    query = useQuery({
      queryKey: ["mentoring", "requests", direction],
      queryFn: () => getMentoringRequests(direction),
    });
  const action = useMutation({
    mutationFn: ({ id, decision }: { id: string; decision: "accept" | "decline" | "cancel" }) =>
      decision === "cancel" ? cancelMentoringRequest(id) : respondMentoringRequest(id, decision),
    retry: false,
    onSuccess: async () => {
      await client.invalidateQueries({ queryKey: ["mentoring", "requests"] });
    },
  });
  return (
    <Card className="bg-card border shadow-soft">
      <CardContent className="space-y-3 p-5">
        <h2 className="font-display text-lg font-bold">
          {direction === "incoming" ? "Incoming requests" : "Your requests"}
        </h2>
        <p className="text-muted-foreground text-sm">
          This workflow does not arrange meetings or share contact details. If a request is
          accepted, contact the Academy to coordinate safely. Cancelling does not erase existing
          records.
        </p>
        {query.isLoading && <p className="text-sm">Loading requests…</p>}
        {query.isError && (
          <p role="alert" className="text-destructive text-sm">
            Could not load requests.
          </p>
        )}
        {query.data?.items.length === 0 && (
          <p className="text-muted-foreground text-sm">No requests yet.</p>
        )}
        {query.data?.truncated && (
          <p className="text-sm">
            Showing the latest 100 requests. Contact the academy for older records.
          </p>
        )}
        {query.data?.items.map((r) => (
          <div key={r.id} className="space-y-2 rounded-md border p-3">
            <p className="text-sm font-semibold">
              {direction === "incoming" ? r.learnerName : r.mentorName} · {r.status}
            </p>
            <p className="whitespace-pre-wrap text-sm">{r.goal}</p>
            {r.status === "pending" && !r.eligible && (
              <p className="text-muted-foreground text-xs">
                Current eligibility or profile review is missing; acceptance is unavailable.
              </p>
            )}
            <div className="flex flex-wrap gap-2">
              {direction === "incoming" && r.status === "pending" && (
                <>
                  <Button
                    type="button"
                    size="sm"
                    disabled={action.isPending || !r.eligible}
                    onClick={() => action.mutate({ id: r.id, decision: "accept" })}
                  >
                    Accept
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    disabled={action.isPending}
                    onClick={() => action.mutate({ id: r.id, decision: "decline" })}
                  >
                    Decline
                  </Button>
                </>
              )}
              {(r.status === "pending" || r.status === "accepted") && (
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  disabled={action.isPending}
                  onClick={() => action.mutate({ id: r.id, decision: "cancel" })}
                >
                  Cancel request
                </Button>
              )}
            </div>
          </div>
        ))}
        {action.isError && (
          <p role="alert" className="text-destructive text-sm">
            {action.error instanceof Error ? action.error.message : "Could not update the request."}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
