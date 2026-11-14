import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAdminAccounts } from "@/lib/query/admin";
import { useCourses } from "@/lib/query/courses";
import {
  fetchCertificateRecords,
  issueCertificate,
  revokeCertificate,
} from "@/lib/api/certificates";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function CertificateReview() {
  const accounts = useAdminAccounts();
  const courses = useCourses();
  const client = useQueryClient();
  const [userId, setUserId] = useState("");
  const [courseSlug, setCourseSlug] = useState("");
  const [evidenceRef, setEvidenceRef] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [revokeId, setRevokeId] = useState("");
  const [reason, setReason] = useState("");
  const ready = Boolean(userId && courseSlug);
  const queryKey = ["certificate-review", userId, courseSlug];
  const records = useQuery({
    queryKey,
    queryFn: () => fetchCertificateRecords(userId, courseSlug),
    enabled: ready,
  });
  const issue = useMutation({
    mutationFn: issueCertificate,
    retry: false,
    onSuccess: async () => {
      setEvidenceRef("");
      setConfirmed(false);
      await client.invalidateQueries({ queryKey });
    },
  });
  const revoke = useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) => revokeCertificate(id, reason),
    retry: false,
    onSuccess: async () => {
      setRevokeId("");
      setReason("");
      await client.invalidateQueries({ queryKey });
    },
  });
  const busy = issue.isPending || revoke.isPending;
  const selectedRevocation = records.data?.items.find(
    (record) => record.id === revokeId && record.status !== "revoked",
  );
  const clear = () => {
    setConfirmed(false);
    setEvidenceRef("");
    setRevokeId("");
    setReason("");
    issue.reset();
    revoke.reset();
  };
  const people = accounts.data?.pages.flatMap((page) => page.items) ?? [];
  const courseItems = courses.data?.pages.flatMap((page) => page.items) ?? [];
  const selectClass = "border-input bg-background w-full rounded-md border px-3 py-2 text-sm";
  return (
    <Card className="bg-card mt-5 border shadow-soft">
      <CardContent className="space-y-4 p-5">
        <div>
          <h2 className="font-display text-lg font-bold">Certificate review</h2>
          <p className="text-muted-foreground text-sm">
            Issue only after independently checking the academy’s requirements. Enrollment is not
            proof of completion. The record stores your review reference; do not include sensitive
            personal information.
          </p>
        </div>
        {(accounts.isError || courses.isError) && (
          <p role="alert" className="text-destructive text-sm">
            Could not load accounts or courses.
          </p>
        )}
        <label className="block text-sm font-semibold" htmlFor="certificate-learner">
          Certificate learner account
        </label>
        <select
          id="certificate-learner"
          className={selectClass}
          disabled={busy}
          value={userId}
          onChange={(e) => {
            setUserId(e.target.value);
            clear();
          }}
        >
          <option value="">Select an account</option>
          {people.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} · {p.email} · {p.roleKey} · {p.status}
            </option>
          ))}
        </select>
        {accounts.hasNextPage && (
          <Button
            type="button"
            variant="outline"
            disabled={accounts.isFetchingNextPage}
            onClick={() => void accounts.fetchNextPage()}
          >
            Load more accounts
          </Button>
        )}
        <label className="block text-sm font-semibold" htmlFor="certificate-course">
          Certificate course
        </label>
        <select
          id="certificate-course"
          className={selectClass}
          disabled={busy}
          value={courseSlug}
          onChange={(e) => {
            setCourseSlug(e.target.value);
            clear();
          }}
        >
          <option value="">Select a course</option>
          {courseItems.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.title}
            </option>
          ))}
        </select>
        {courses.hasNextPage && (
          <Button
            type="button"
            variant="outline"
            disabled={courses.isFetchingNextPage}
            onClick={() => void courses.fetchNextPage()}
          >
            Load more courses
          </Button>
        )}
        {ready && records.isLoading && <p className="text-sm">Checking certificate records…</p>}
        {ready && records.isError && (
          <p role="alert" className="text-destructive text-sm">
            Could not load certificate records. No change was made.
          </p>
        )}
        {ready && records.isSuccess && (
          <div className="space-y-2">
            <p className="text-sm font-semibold">Existing records</p>
            {records.data.items.length === 0 && (
              <p className="text-muted-foreground text-sm">
                No records for this learner and course.
              </p>
            )}
            {records.data.truncated && (
              <p className="text-sm">
                Only the first 100 records are shown. Review the complete registry before making a
                change.
              </p>
            )}
            {records.data.items.map((record) => (
              <div key={record.id} className="rounded-md border p-3 text-sm">
                <p className="font-semibold">
                  {record.title} ·{" "}
                  {record.status === "legacy"
                    ? "Legacy"
                    : record.status === "revoked"
                      ? "Revoked"
                      : "Issued"}
                </p>
                <p className="text-muted-foreground break-all font-mono text-xs">{record.code}</p>
                {record.evidenceRef && (
                  <p className="text-muted-foreground mt-1 text-xs">
                    Review: {record.evidenceRef} · Issuer ID: {record.issuedBy}
                  </p>
                )}
                {record.reason && (
                  <p className="text-muted-foreground mt-1 text-xs">
                    Revocation: {record.reason} · Reviewer ID: {record.revokedBy}
                  </p>
                )}
                {record.status !== "revoked" && (
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="mt-2"
                    disabled={busy}
                    onClick={() => {
                      setRevokeId(record.id);
                      setReason("");
                      revoke.reset();
                    }}
                  >
                    Review revocation
                  </Button>
                )}
              </div>
            ))}
          </div>
        )}
        {selectedRevocation && (
          <div className="space-y-2 rounded-md border p-3">
            <p className="text-sm font-semibold">Revoking {selectedRevocation.title}</p>
            <p className="text-muted-foreground break-all font-mono text-xs">
              {selectedRevocation.code}
            </p>
            <label htmlFor="certificate-revoke-reason" className="block text-sm font-semibold">
              Reason for revocation
            </label>
            <Input
              id="certificate-revoke-reason"
              value={reason}
              maxLength={240}
              disabled={busy}
              onChange={(e) => setReason(e.target.value)}
            />
            <p className="text-muted-foreground text-xs">
              Revocation makes the code invalid; it does not delete the historical record.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="destructive"
                disabled={busy || reason.trim().length < 3}
                onClick={() => revoke.mutate({ id: revokeId, reason: reason.trim() })}
              >
                Confirm revocation
              </Button>
              <Button
                type="button"
                variant="outline"
                disabled={busy}
                onClick={() => setRevokeId("")}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
        <label htmlFor="certificate-evidence" className="block text-sm font-semibold">
          Review reference
        </label>
        <Input
          id="certificate-evidence"
          maxLength={240}
          value={evidenceRef}
          disabled={busy}
          onChange={(e) => setEvidenceRef(e.target.value)}
        />
        <label className="flex items-start gap-2 text-sm">
          <input
            type="checkbox"
            className="mt-1"
            checked={confirmed}
            disabled={busy}
            onChange={(e) => setConfirmed(e.target.checked)}
          />
          I have independently reviewed this learner’s eligibility for this course under the
          academy’s requirements.
        </label>
        {(issue.isError || revoke.isError) && (
          <p role="alert" className="text-destructive text-sm">
            {(issue.error ?? revoke.error) instanceof Error
              ? (issue.error ?? revoke.error)?.message
              : "Could not confirm the change."}{" "}
            If the response was interrupted, refresh and review the registry before retrying.
          </p>
        )}
        {issue.isSuccess && (
          <p role="status" className="text-sm">
            Certificate issued. The learner can see it in their account.
          </p>
        )}
        {revoke.isSuccess && (
          <p role="status" className="text-sm">
            Certificate revoked.
          </p>
        )}
        <Button
          type="button"
          disabled={
            !ready ||
            !records.isSuccess ||
            records.data.truncated ||
            busy ||
            !confirmed ||
            evidenceRef.trim().length < 3 ||
            records.data.items.some((r) => r.status !== "revoked")
          }
          onClick={() =>
            issue.mutate({ userId, courseSlug, evidenceRef: evidenceRef.trim(), confirmed: true })
          }
        >
          Issue reviewed certificate
        </Button>
      </CardContent>
    </Card>
  );
}
