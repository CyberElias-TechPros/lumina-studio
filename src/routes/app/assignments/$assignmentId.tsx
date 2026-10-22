"use client";
import { useState } from "react";
import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  useAssignment,
  useAssignmentSubmission,
  useSubmitAssignment,
} from "@/lib/query/assignments";
import type { StudentAssignment } from "@/data/learning";
import { getErrorMessage } from "@/lib/errors";
import { isMockMode } from "@/lib/env";

export const Route = createFileRoute("/app/assignments/$assignmentId")({
  head: () => ({ meta: [{ title: "Assignment — CEA-OS" }] }),
  component: AssignmentPage,
});
function AssignmentPage() {
  const { assignmentId } = Route.useParams();
  const query = useAssignment(assignmentId);
  return (
    <AppShell roleKey="student" title="Assignment" subtitle="Your work and instructor feedback">
      <QueryState<StudentAssignment> query={query} error={{ title: "Assignment unavailable" }}>
        {(assignment) => <AssignmentWork key={assignment.id} assignment={assignment} />}
      </QueryState>
    </AppShell>
  );
}
function AssignmentWork({ assignment: a }: { assignment: StudentAssignment }) {
  const latest = useAssignmentSubmission(a.id);
  const submit = useSubmitAssignment(a.id);
  const [answer, setAnswer] = useState("");
  const graded = a.status === "graded" || latest.data?.status === "graded";
  return (
    <div className="space-y-5" data-testid="assignment-content">
      <Card>
        <CardContent className="space-y-4 p-6">
          <h2 className="text-xl font-bold">{a.title}</h2>
          <p>
            {a.course} · Due: {a.due} · Maximum score: {a.max}
          </p>
          <p className="whitespace-pre-wrap">{a.description}</p>
          {a.rubric?.length > 0 && (
            <ul className="space-y-2">
              {a.rubric.map((r) => (
                <li key={r.criterion}>
                  {r.criterion} ({r.weight}) — {r.detail}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardContent className="space-y-4 p-6">
          <h2 className="text-xl font-bold">Latest submission and feedback</h2>
          {latest.isPending ? (
            <p role="status">Checking your submission…</p>
          ) : latest.isError ? (
            <p role="alert">{getErrorMessage(latest.error)}</p>
          ) : latest.data ? (
            <>
              <p>
                Status: {latest.data.status} · Submitted: {latest.data.submittedAt}
                {latest.data.late ? " · Late" : ""}
              </p>
              {latest.data.body && (
                <details>
                  <summary>Your submitted answer</summary>
                  <p className="whitespace-pre-wrap break-words">{latest.data.body}</p>
                </details>
              )}
              {latest.data.file && (
                <p className="break-words">File/reference: {latest.data.file}</p>
              )}
              {latest.data.score != null && (
                <p>
                  Score: {latest.data.score} / {a.max}
                </p>
              )}
              <p className="whitespace-pre-wrap">
                {latest.data.feedback || "No instructor feedback has been returned yet."}
              </p>
            </>
          ) : (
            <p>No submission has been recorded yet.</p>
          )}
          <Button
            variant="outline"
            onClick={() => void latest.refetch()}
            disabled={latest.isFetching}
          >
            Refresh submission status
          </Button>
        </CardContent>
      </Card>
      {!graded && (
        <Card>
          <CardContent className="space-y-4 p-6">
            <form
              className="space-y-4"
              onSubmit={(event) => {
                event.preventDefault();
                if (
                  answer.trim() &&
                  !submit.isPending &&
                  !isMockMode &&
                  !latest.isError &&
                  !latest.isPending
                )
                  submit.mutate({ body: answer.trim() }, { onSuccess: () => setAnswer("") });
              }}
            >
              <label className="block font-semibold">
                Written answer or repository link
                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  maxLength={20000}
                  rows={10}
                  required
                  disabled={submit.isPending}
                  className="mt-2 block w-full rounded border p-3 font-normal"
                />
              </label>
              <p className="text-sm text-muted-foreground">
                Your draft stays in this page only and is not autosaved. Submitting again creates a
                new attempt for review. File upload is not available in this form.
              </p>
              {isMockMode && <p>Demo data only. Submitting work is disabled.</p>}
              <Button
                type="submit"
                disabled={
                  !answer.trim() ||
                  submit.isPending ||
                  isMockMode ||
                  latest.isError ||
                  latest.isPending
                }
              >
                {submit.isPending ? "Submitting…" : "Submit written answer"}
              </Button>
              {submit.isError && (
                <p role="alert">
                  {getErrorMessage(submit.error)} Check submission status before retrying; the
                  request may have reached the server.
                </p>
              )}
              {submit.isSuccess && <p role="status">Your answer was recorded by the server.</p>}
            </form>
          </CardContent>
        </Card>
      )}
      <Link to="/app/assignments" className="text-primary">
        Back to assignments
      </Link>
    </div>
  );
}
