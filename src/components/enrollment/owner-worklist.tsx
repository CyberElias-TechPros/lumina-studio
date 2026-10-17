"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useApiQuery, usePaginatedQuery, flattenPages } from "@/lib/query/hooks";
import { fetchCohorts } from "@/lib/api/operations";
import {
  fetchTuitionWorklist,
  extendTuitionBalance,
  fetchTransferReviews,
  issueTuitionOffer,
  retryTuitionActivation,
  reviewTransfer,
  type TuitionWorkItem,
} from "@/lib/api/tuition";
import { formatNaira } from "@/lib/api/enrollments";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { isMockMode } from "@/lib/env";

export function OwnerWorklist() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const query = useApiQuery(["tuition-worklist", page], () => fetchTuitionWorklist(page));
  const cohorts = useApiQuery(["cohorts"], () => fetchCohorts());
  const proofs = usePaginatedQuery(["tuition-transfers"], fetchTransferReviews);
  const [extension, setExtension] = useState<TuitionWorkItem | null>(null);
  const [extensionDate, setExtensionDate] = useState("");
  const [extensionReason, setExtensionReason] = useState("");
  const [selected, setSelected] = useState<TuitionWorkItem | null>(null);
  const [cohortId, setCohortId] = useState("");
  const [balance, setBalance] = useState("");
  const [equipment, setEquipment] = useState("");
  const [checked, setChecked] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [bankReferences, setBankReferences] = useState<Record<string, string>>({});
  const [received, setReceived] = useState<Record<string, string>>({});
  const [reasons, setReasons] = useState<Record<string, string>>({});
  const refresh = async () => {
    await queryClient.invalidateQueries({ queryKey: ["tuition-worklist"] });
    await queryClient.invalidateQueries({ queryKey: ["tuition-transfers"] });
  };
  const run = async (work: () => Promise<unknown>, done: string) => {
    setBusy(true);
    setMessage("");
    try {
      await work();
      setMessage(done);
      await refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Action failed. Reload before retrying.");
    } finally {
      setBusy(false);
    }
  };
  const input = "mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm";
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Your academy worklist</CardTitle>
        <p className="text-sm text-muted-foreground">
          Review in your admin windows. Payments and access exceptions come first; do not interrupt
          lessons for routine enquiries.
        </p>
        <div className="flex flex-wrap gap-3 pt-2 text-sm">
          <a className="text-primary underline" href="/app/admissions/cohorts">
            Manage actual cohorts
          </a>
          <a className="text-primary underline" href="/app/instructor/assignments">
            Assignments & feedback ({query.data?.ungradedAssignments ?? "…"} awaiting review)
          </a>
          <Button size="sm" variant="outline" onClick={() => void refresh()}>
            Refresh worklist
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {isMockMode && (
          <p className="rounded-lg bg-warning/10 p-3 text-sm">
            Preview only. These are not live applications, payments or class places.
          </p>
        )}
        {query.isPending && <p role="status">Loading your worklist…</p>}
        {query.isError && <p role="alert">{query.error.message}</p>}
        {query.data?.items.length === 0 && (
          <p className="text-muted-foreground text-sm">
            No tuition exceptions in this view. Open a cohort only after checking your timetable,
            equipment, capacity and delivery costs.
          </p>
        )}
        <div className="space-y-3">
          {query.data?.items.map((item) => (
            <div key={item.ref} className="rounded-lg border p-4">
              <div className="flex flex-wrap justify-between gap-3">
                <div>
                  <h3 className="font-semibold">
                    {item.name} · {item.programTitle}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {item.ref} · {item.email}
                  </p>
                </div>
                <p className="text-sm">
                  Received {formatNaira(item.paid)} · outstanding {formatNaira(item.balance)}
                </p>
              </div>
              <ul className="my-3 list-disc pl-5 text-sm">
                {item.reasons.map((reason) => (
                  <li key={reason}>{reason}</li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2">
                <Button size="sm" variant="outline" asChild>
                  <a href={`/apply/status/${item.ref}`}>Review application</a>
                </Button>
                {item.paid > 0 && item.balance > 0 && item.balanceDueAt && (
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={busy}
                    onClick={() => {
                      setExtension(item);
                      setExtensionDate("");
                      setExtensionReason("");
                    }}
                  >
                    Grant fee-free balance extension
                  </Button>
                )}
                {!item.active && (
                  <Button
                    size="sm"
                    disabled={busy}
                    onClick={() => {
                      setSelected(item);
                      setCohortId("");
                      setBalance("");
                      setEquipment("");
                      setChecked(false);
                    }}
                  >
                    Prepare a confirmed offer
                  </Button>
                )}
                {item.paid > 0 && !item.active && (
                  <Button
                    size="sm"
                    disabled={busy}
                    variant="outline"
                    onClick={() =>
                      void run(async () => {
                        const result = await retryTuitionActivation(item.ref);
                        if (!result.active)
                          throw new Error(
                            "Access is not eligible yet. Check the accepted, unexpired placement, payment threshold, matching curriculum and verified student email. Do not collect another payment to fix access.",
                          );
                      }, "Learner access is active.")
                    }
                  >
                    Retry eligible access
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
        {query.data && (
          <p className="text-xs text-muted-foreground">
            Page {page}: up to {query.data.limit} actionable records, paid exceptions first.{" "}
            <a className="underline" href="/app/admissions/registrations">
              All course applications
            </a>
            .
          </p>
        )}
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            disabled={page === 1 || query.isPending}
            onClick={() => setPage(page - 1)}
          >
            Previous exceptions
          </Button>
          <Button
            size="sm"
            variant="outline"
            disabled={!query.data?.nextPage || query.isPending}
            onClick={() => setPage(page + 1)}
          >
            Next exceptions
          </Button>
        </div>
        {extension && (
          <form
            className="space-y-3 rounded-xl border p-5"
            onSubmit={(e) => {
              e.preventDefault();
              void run(async () => {
                await extendTuitionBalance(extension.ref, {
                  previousDueAt: extension.balanceDueAt!,
                  dueAt: new Date(`${extensionDate}:00+01:00`).toISOString(),
                  reason: extensionReason,
                });
                setExtension(null);
              }, "Later balance date recorded; the learner notification is queued. No fee was added.");
            }}
          >
            <h3 className="font-semibold">Later balance date — {extension.name}</h3>
            <p className="text-sm">
              Original/current deadline: {extension.balanceDueAt}. Only a later concession is
              allowed. The original agreement remains in the audit history.
            </p>
            <label className="block text-sm">
              New agreed date and time (WAT)
              <input
                className={input}
                type="datetime-local"
                required
                value={extensionDate}
                onChange={(e) => setExtensionDate(e.target.value)}
              />
            </label>
            <label className="block text-sm">
              Reason shared with learner
              <textarea
                className={input}
                required
                minLength={8}
                maxLength={1000}
                value={extensionReason}
                onChange={(e) => setExtensionReason(e.target.value)}
              />
            </label>
            <Button disabled={busy}>Record extension without fees</Button>
            <Button type="button" variant="ghost" onClick={() => setExtension(null)}>
              Cancel
            </Button>
          </form>
        )}
        {selected && (
          <form
            className="space-y-4 rounded-xl border border-primary/30 p-5"
            onSubmit={(e) => {
              e.preventDefault();
              void run(async () => {
                await issueTuitionOffer(selected.ref, {
                  cohortId,
                  balanceDueAt: new Date(`${balance}:00+01:00`).toISOString(),
                  equipment,
                  eligibilityConfirmed: true,
                });
                setSelected(null);
              }, "Offer saved and queued for email. The learner must accept it before payment.");
            }}
          >
            <h3 className="font-semibold">
              Offer for {selected.name} — {selected.programTitle}
            </h3>
            <p className="text-xs text-muted-foreground">
              The existing quoted fee is preserved. A 48-hour hold (or the first class, if sooner)
              starts when you issue the offer. Pending money is not automatically released for
              resale.
            </p>
            <label className="block text-sm">
              Approved cohort
              <select
                className={input}
                required
                value={cohortId}
                onChange={(e) => setCohortId(e.target.value)}
              >
                <option value="">Choose an open, exact-course cohort</option>
                {cohorts.data?.items
                  .filter((c) => c.programSlug === selected.programSlug && c.enrollmentOpen)
                  .map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.label} · {c.startDate} · {c.startTime} WAT
                    </option>
                  ))}
              </select>
            </label>
            <label className="block text-sm">
              Exact balance due date and time (WAT; before the second half)
              <input
                className={input}
                type="datetime-local"
                required
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
              />
            </label>
            <label className="block text-sm">
              Equipment, practice access, inclusions and any required extra costs
              <textarea
                className={input}
                required
                minLength={12}
                maxLength={1000}
                rows={3}
                value={equipment}
                onChange={(e) => setEquipment(e.target.value)}
                placeholder="Record the actual arrangement agreed with this learner; do not assume a computer is available."
              />
            </label>
            <label className="flex gap-3 text-sm">
              <input
                type="checkbox"
                required
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
              />
              <span>
                I can deliver this cohort within my teaching and feedback capacity. I have checked
                prerequisites, device/practice needs and guardian consent where needed. All
                compulsory costs are disclosed.
              </span>
            </label>
            <div className="flex gap-3">
              <Button type="submit" disabled={busy || !checked}>
                Issue offer
              </Button>
              <Button type="button" variant="ghost" onClick={() => setSelected(null)}>
                Cancel
              </Button>
            </div>
          </form>
        )}
        <div className="border-t pt-5">
          <h3 className="font-display font-semibold">Transfers to verify</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Check your actual bank statement, not a screenshot. Enter the bank credit reference and
            amount you independently verified before confirming.
          </p>
          {proofs.isError && (
            <p role="alert" className="text-sm">
              {proofs.error.message}
            </p>
          )}
          {flattenPages(proofs.data?.pages).map((proof) => (
            <div key={proof.id} className="mt-3 space-y-3 rounded-lg border p-4 text-sm">
              <p className="font-semibold">
                {proof.ref} · {proof.senderName} · {proof.programTitle}
              </p>
              <p>
                Reported: {formatNaira(proof.amount)} · expected:{" "}
                {formatNaira(proof.expectedAmount)} · claimed reference:{" "}
                {proof.bankReference ?? "not provided"}
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <label>
                  Verified bank credit reference
                  <input
                    className={input}
                    value={bankReferences[proof.id] ?? ""}
                    onChange={(e) =>
                      setBankReferences({ ...bankReferences, [proof.id]: e.target.value })
                    }
                  />
                </label>
                <label>
                  Actual amount received (₦)
                  <input
                    className={input}
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={received[proof.id] ?? ""}
                    onChange={(e) => setReceived({ ...received, [proof.id]: e.target.value })}
                  />
                </label>
              </div>
              <Button
                size="sm"
                disabled={
                  busy ||
                  !(bankReferences[proof.id]?.trim().length >= 4) ||
                  !(Number(received[proof.id]) > 0)
                }
                onClick={() =>
                  void run(
                    () =>
                      reviewTransfer(proof.id, "confirm", {
                        bankReference: bankReferences[proof.id],
                        receivedAmount: Number(received[proof.id]),
                      }),
                    "Bank credit recorded once; the receipt is available and email is queued.",
                  )
                }
              >
                Confirm verified bank credit
              </Button>
              <label className="block">
                If unmatched, reason for rejection
                <input
                  className={input}
                  value={reasons[proof.id] ?? ""}
                  onChange={(e) => setReasons({ ...reasons, [proof.id]: e.target.value })}
                />
              </label>
              <Button
                size="sm"
                variant="outline"
                disabled={busy || !reasons[proof.id]?.trim()}
                onClick={() =>
                  void run(
                    () => reviewTransfer(proof.id, "reject", { reason: reasons[proof.id] }),
                    "Report rejected with a recorded reason; no payment was credited.",
                  )
                }
              >
                Reject unmatched report
              </Button>
            </div>
          ))}
          {proofs.hasNextPage && (
            <Button
              className="mt-3"
              variant="outline"
              disabled={proofs.isFetchingNextPage}
              onClick={() => void proofs.fetchNextPage()}
            >
              Load more transfers
            </Button>
          )}
        </div>
        {message && (
          <p className="rounded-lg border p-3 text-sm" role="status">
            {message}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
