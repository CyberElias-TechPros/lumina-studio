"use client";
import { useState } from "react";
import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useInstructorAssignment, useGradeSubmission } from "@/lib/query/instructor";
import type { InstructorSubmission } from "@/data/learning";
import { getErrorMessage } from "@/lib/errors";
import { isMockMode } from "@/lib/env";

export const Route = createFileRoute("/app/instructor/assignments/$submissionId/grade")({
  head: () => ({ meta: [{ title: "Grade submission — CEA-OS" }] }),
  component: Grader,
});
function Grader() {
  const { submissionId } = Route.useParams();
  const query = useInstructorAssignment(submissionId);
  return (
    <AppShell roleKey="instructor" title="Grading" subtitle="Review the actual submitted work">
      <QueryState<InstructorSubmission> query={query} error={{ title: "Submission unavailable" }}>
        {(submission) => <GradeForm key={submission.id} submission={submission} />}
      </QueryState>
    </AppShell>
  );
}
function GradeForm({ submission: s }: { submission: InstructorSubmission }) {
  const grade = useGradeSubmission(s.id);
  const [score, setScore] = useState(s.score === undefined ? "" : String(s.score));
  const [feedback, setFeedback] = useState(s.feedback ?? "");
  const max = s.max;
  const valid =
    max != null &&
    score.trim() !== "" &&
    Number.isInteger(Number(score)) &&
    Number(score) >= 0 &&
    Number(score) <= max;
  return (
    <div className="grid gap-5 lg:grid-cols-2" data-testid="grading-content">
      <Card>
        <CardContent className="space-y-4 p-6">
          <h2 className="text-xl font-bold">{s.title}</h2>
          <p>
            Submitted by {s.student} · {s.submitted}
          </p>
          <h3 className="font-semibold">Written answer</h3>
          {s.body ? (
            <div className="whitespace-pre-wrap break-words">{s.body}</div>
          ) : (
            <p>No written answer is available for this attempt.</p>
          )}
          {s.file && (
            <p className="break-words">
              Submitted file/reference: {s.file}
              {s.size ? ` (${s.size})` : ""}
            </p>
          )}
          <p className="text-sm text-muted-foreground">
            Review the supplied work yourself. Automated code, plagiarism and security checks are
            not provided here.
          </p>
          {Array.isArray(s.rubric) && s.rubric.length > 0 && (
            <details>
              <summary>Assignment rubric</summary>
              <pre className="whitespace-pre-wrap break-words text-sm">
                {JSON.stringify(s.rubric, null, 2)}
              </pre>
            </details>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardContent className="space-y-4 p-6">
          <form
            className="space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              if (valid && s.isLatest && !isMockMode && !grade.isPending)
                grade.mutate({ score: Number(score), feedback: feedback.trim() });
            }}
          >
            <h2 className="text-xl font-bold">Return grade and feedback</h2>
            {s.isLatest === false && (
              <p role="alert">A newer attempt exists. Open the latest submission before grading.</p>
            )}
            {max == null && (
              <p>
                The assignment maximum is unavailable. Grading is disabled until the assignment is
                linked correctly.
              </p>
            )}
            <label className="block">
              Score{max != null ? ` (out of ${max})` : ""}
              <input
                aria-label="Score"
                type="number"
                min={0}
                max={max ?? undefined}
                step={1}
                required
                value={score}
                onChange={(e) => setScore(e.target.value)}
                disabled={grade.isPending}
                className="mt-2 block w-full rounded border p-3"
              />
            </label>
            <label className="block">
              Feedback
              <textarea
                value={feedback}
                maxLength={5000}
                rows={7}
                onChange={(e) => setFeedback(e.target.value)}
                disabled={grade.isPending}
                className="mt-2 block w-full rounded border p-3"
              />
            </label>
            <p className="text-sm text-muted-foreground">
              Changes are not autosaved. Returning a grade publishes it to the student.
            </p>
            <Button type="submit" disabled={!valid || !s.isLatest || isMockMode || grade.isPending}>
              {grade.isPending ? "Returning grade…" : "Return grade to student"}
            </Button>
            {grade.isError && <p role="alert">{getErrorMessage(grade.error)}</p>}
            {grade.isSuccess && <p role="status">Grade and feedback saved by the server.</p>}
          </form>
          <Link to="/app/instructor/assignments" className="text-primary">
            Back to grading queue
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
