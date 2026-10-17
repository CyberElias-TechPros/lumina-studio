"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  acceptTuitionOffer,
  startEnrollmentPayment,
  verifyEnrollmentPayment,
  formatNaira,
} from "@/lib/api/enrollments";
import type { NormalizedEnrollmentStatus } from "@/lib/query/enrollments";
import { TUITION_POLICY, tuitionPaymentResult } from "@/data/academy/tuition-policy";
import { BankTransferForm } from "./bank-transfer-form";

const date = (value: string | null) =>
  value
    ? new Date(value).toLocaleString("en-GB", {
        timeZone: "Africa/Lagos",
        dateStyle: "medium",
        timeStyle: "short",
      }) + " WAT"
    : "Not confirmed";

export function TuitionStatusCard({
  data,
  refresh,
}: {
  data: NormalizedEnrollmentStatus;
  refresh: () => unknown;
}) {
  const [accepted, setAccepted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const keys = useRef<Record<string, string>>({});
  const offer = data.offer;
  const payment = data.payment;
  if (!payment) return null;
  async function action(work: () => Promise<void>) {
    setBusy(true);
    setMessage("");
    try {
      await work();
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Could not complete that action. Check your status before retrying.",
      );
    } finally {
      setBusy(false);
    }
  }
  async function pay(kind: "deposit" | "full" | "balance") {
    await action(async () => {
      keys.current[kind] ??= crypto.randomUUID();
      const result = await startEnrollmentPayment(data.ref, kind, keys.current[kind]);
      if (result.mock) {
        setMessage("Preview only: no real payment has been taken or confirmed.");
        return;
      }
      window.location.assign(result.authorizationUrl);
    });
  }
  const acceptNeeded = offer?.status === "held" && offer.acceptedVersion !== offer.version;
  const deposit = ["50-50", "deposit-monthly"].includes(payment.plan)
    ? Math.max(0, (payment.depositAmount ?? 0) - payment.paidAmount)
    : 0;
  return (
    <div className="mt-6 space-y-5 rounded-xl border bg-card p-5">
      <div>
        <h2 className="font-display text-lg font-bold">Your place, payment and learning</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {data.checkout?.reason ?? "CEA must confirm your offer before requesting payment."}
        </p>
      </div>
      {offer?.cohort && (
        <dl className="grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-muted-foreground">Confirmed offer</dt>
            <dd>{offer.cohort.label}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Class dates</dt>
            <dd>
              {offer.cohort.startDate} to {offer.cohort.endDate ?? "to be confirmed"}
            </dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Timetable</dt>
            <dd>
              {offer.cohort.days} · {offer.cohort.startTime ?? "time to be confirmed"} WAT ·{" "}
              {offer.cohort.mode}
            </dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Offer hold</dt>
            <dd>{offer.status === "confirmed" ? "Place confirmed" : date(offer.expiresAt)}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Full tuition</dt>
            <dd>{formatNaira(data.feeDue ?? payment.paidAmount + payment.amountDue)}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Balance due date</dt>
            <dd>{date(offer.balanceDueAt)}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-muted-foreground">Equipment, practice and inclusions</dt>
            <dd>{offer.equipment}</dd>
          </div>
        </dl>
      )}
      {acceptNeeded && (
        <div className="space-y-3 rounded-lg border p-4">
          <p className="text-sm">{TUITION_POLICY.payment}</p>
          <p className="text-sm text-muted-foreground">{TUITION_POLICY.refundSummary}</p>
          <label className="flex gap-3 text-sm">
            <input
              type="checkbox"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
            />
            <span>
              I accept this timetable, equipment arrangement, full fee and{" "}
              <a
                className="text-primary underline"
                href="/terms#tuition"
                target="_blank"
                rel="noreferrer"
              >
                tuition policy ({TUITION_POLICY.version})
              </a>
              . I understand any required costs stated above.
            </span>
          </label>
          <Button
            disabled={!accepted || busy}
            onClick={() =>
              void action(async () => {
                await acceptTuitionOffer(data.ref, offer!.version, TUITION_POLICY.version);
                await refresh();
              })
            }
          >
            Accept this offer
          </Button>
        </div>
      )}
      <div className="flex flex-wrap gap-5 border-t pt-4 text-sm">
        <p>
          Verified payments: <strong>{formatNaira(payment.paidAmount)}</strong>
        </p>
        <p>
          Remaining tuition: <strong>{formatNaira(payment.amountDue)}</strong>
        </p>
        {payment.paidAmount > (data.feeDue ?? Infinity) && (
          <p>Excess credit recorded — CEA will reconcile it with you.</p>
        )}
      </div>
      {payment.review?.status === "pending_review" && (
        <p className="rounded-lg bg-warning/10 p-3 text-sm">
          Transfer under review. Do not pay again. {TUITION_POLICY.support}
        </p>
      )}
      {payment.reference && (
        <Button
          variant="outline"
          disabled={busy}
          onClick={() =>
            void action(async () => {
              const result = await verifyEnrollmentPayment(data.ref, payment.reference!);
              const state = tuitionPaymentResult(result.status, result.enrollmentPaymentStatus);
              setMessage(
                state === "paid"
                  ? "Payment verified; tuition paid in full."
                  : state === "deposit"
                    ? "Payment verified. Check the remaining balance below."
                    : state === "failed"
                      ? "This payment attempt failed. If your bank shows a debit, ask CEA to reconcile it before paying again."
                      : "Confirmation is pending. Do not pay again while it is checked.",
              );
              await refresh();
            })
          }
        >
          Check existing online payment
        </Button>
      )}
      {data.checkout?.allowed && (
        <div className="space-y-3 border-t pt-4">
          <div className="flex flex-wrap gap-3">
            {deposit > 0 && (
              <Button disabled={busy} onClick={() => void pay("deposit")}>
                Pay {formatNaira(Math.min(deposit, payment.amountDue))} deposit
              </Button>
            )}
            <Button
              disabled={busy}
              variant={deposit > 0 ? "outline" : "default"}
              onClick={() => void pay(payment.paidAmount > 0 ? "balance" : "full")}
            >
              Pay {formatNaira(payment.amountDue)}{" "}
              {payment.paidAmount > 0 ? "remaining balance" : "in full"}
            </Button>
          </div>
          <details>
            <summary className="cursor-pointer text-sm font-semibold">
              Prefer bank transfer?
            </summary>
            <BankTransferForm
              key={`${data.ref}-${payment.paidAmount}`}
              refCode={data.ref}
              deposit={deposit > 0 ? Math.min(deposit, payment.amountDue) : null}
              due={payment.amountDue}
              isBalance={payment.paidAmount > 0}
              onReported={refresh}
            />
          </details>
        </div>
      )}
      {message && (
        <p className="text-sm" role="status">
          {message}
        </p>
      )}
      <div className="flex flex-wrap gap-3 border-t pt-4">
        <Button asChild variant="outline">
          <a href={`/apply/receipt/${data.ref}`}>View private receipt</a>
        </Button>
        {data.learning?.active && data.learning.url && (
          <Button asChild>
            <a href={data.learning.url}>Continue learning</a>
          </Button>
        )}
        <Button variant="ghost" onClick={() => void refresh()}>
          Refresh status
        </Button>
      </div>
      {data.learning && <p className="text-sm text-muted-foreground">{data.learning.reason}</p>}
    </div>
  );
}
