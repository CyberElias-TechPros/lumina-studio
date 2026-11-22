"use client";

import { useState } from "react";
import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { Paperclip, X } from "lucide-react";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  useAssignment,
  useAssignmentSubmission,
  useSubmitAssignment,
} from "@/lib/query/assignments";
import { uploadFile } from "@/lib/api/uploads";
import type { StudentAssignment } from "@/data/learning";
import { getErrorMessage } from "@/lib/errors";

export const Route = createFileRoute("/app/assignments/$assignmentId")({
  head: () => ({ meta: [{ title: "Assignment — CEA-OS" }] }),
  component: AssignmentPage,
});

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const graded = a.status === "graded" || latest.data?.status === "graded";

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const cleanBody = answer.trim();
    if ((!cleanBody && !selectedFile) || submit.isPending || uploading || latest.isPending) return;

    setUploadError("");
    let uploadedKey: string | undefined;
    let uploadedSize: string | undefined;

    if (selectedFile) {
      setUploading(true);
      try {
        const res = await uploadFile(selectedFile);
        uploadedKey = res.key;
        uploadedSize = formatBytes(res.size || selectedFile.size);
      } catch (err) {
        setUploadError(getErrorMessage(err));
        setUploading(false);
        return;
      }
      setUploading(false);
    }

    submit.mutate(
      {
        ...(cleanBody ? { body: cleanBody } : {}),
        ...(uploadedKey ? { file: uploadedKey, size: uploadedSize } : {}),
      },
      {
        onSuccess: () => {
          setAnswer("");
          setSelectedFile(null);
        },
      },
    );
  }

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
                <p className="break-words">
                  Attachment: {latest.data.file}
                  {latest.data.size ? ` (${latest.data.size})` : ""}
                </p>
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
            <form className="space-y-4" onSubmit={(e) => void handleSubmit(e)}>
              <label className="block font-semibold">
                Written answer or repository link
                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  maxLength={20000}
                  rows={8}
                  disabled={submit.isPending || uploading}
                  placeholder="Write your solution summary or paste a repository URL…"
                  className="mt-2 block w-full rounded border p-3 font-normal"
                />
              </label>

              <div className="space-y-2">
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold hover:bg-muted/50">
                  <Paperclip className="size-4" />
                  <span>
                    {selectedFile ? "Replace attachment" : "Attach file (PDF, ZIP, DOCX, image)"}
                  </span>
                  <input
                    type="file"
                    accept=".pdf,.zip,.txt,.doc,.docx,.png,.jpg,.jpeg,.webp,.svg"
                    className="sr-only"
                    disabled={submit.isPending || uploading}
                    onChange={(e) => {
                      setSelectedFile(e.target.files?.[0] ?? null);
                      setUploadError("");
                    }}
                  />
                </label>
                {selectedFile && (
                  <div className="bg-muted/40 flex items-center justify-between gap-2 rounded-lg border px-3 py-2 text-xs">
                    <span className="truncate font-medium">
                      {selectedFile.name} ({formatBytes(selectedFile.size)})
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedFile(null)}
                      aria-label="Remove attachment"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <X className="size-4" />
                    </button>
                  </div>
                )}
                {uploadError && (
                  <p role="alert" className="text-destructive text-xs font-semibold">
                    {uploadError}
                  </p>
                )}
              </div>

              <p className="text-muted-foreground text-sm">
                Submitting again creates a new attempt for instructor review until the assignment is
                graded.
              </p>
              <Button
                type="submit"
                disabled={
                  (!answer.trim() && !selectedFile) ||
                  submit.isPending ||
                  uploading ||
                  latest.isPending
                }
              >
                {uploading
                  ? "Uploading attachment…"
                  : submit.isPending
                    ? "Submitting…"
                    : "Submit assignment"}
              </Button>
              {submit.isError && (
                <p role="alert" className="text-destructive text-sm">
                  {getErrorMessage(submit.error)} Check submission status before retrying; the
                  request may have reached the server.
                </p>
              )}
              {submit.isSuccess && (
                <p role="status" className="text-success text-sm font-semibold">
                  Your submission was recorded by the server.
                </p>
              )}
            </form>
          </CardContent>
        </Card>
      )}
      <Link to="/app/assignments" className="text-primary inline-block font-semibold">
        Back to assignments
      </Link>
    </div>
  );
}
