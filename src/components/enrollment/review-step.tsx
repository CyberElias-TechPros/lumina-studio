"use client";

import { AlertCircle, CheckCircle2, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { longPaymentPlans, shortPaymentPlans } from "@/data/academy";
import { depositFor, durationLabel, feeFor, formatFee, type ProgramMeta } from "./meta";
import { Turnstile } from "./turnstile";
import type { EnrollmentDraft } from "./types";

interface ReviewStepProps {
  meta: ProgramMeta | null;
  draft: EnrollmentDraft;
  update: (patch: Partial<EnrollmentDraft>) => void;
  errors: Record<string, string>;
  onToken: (token: string) => void;
}

const SCHEDULE_LABELS: Record<string, string> = {
  standard: "Two sessions a week",
  mwf: "Mon · Wed · Fri",
  tss: "Tue · Thu · Sat",
};
const SLOT_LABELS: Record<string, string> = {
  morning: "Morning",
  afternoon: "Afternoon",
  evening: "Evening",
  any: "Flexible",
};
const MODE_LABELS: Record<string, string> = {
  onsite: "Onsite",
  online: "Online",
  hybrid: "Hybrid",
};

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2 text-sm">
      <span className="text-muted-foreground shrink-0">{label}</span>
      <span className="text-right font-medium">{value}</span>
    </div>
  );
}

/**
 * Step 5 — review everything, accept the policies, pass the human check,
 * submit.
 */
export function ReviewStep({ meta, draft, update, errors, onToken }: ReviewStepProps) {
  const plans = meta?.kind === "long" ? longPaymentPlans : shortPaymentPlans;
  const plan = plans.find((p) => p.value === draft.paymentPlan) ?? plans[0];
  const { due } = meta ? feeFor(meta, plan.value) : { due: 0 };
  const deposit = meta ? depositFor(meta) : 0;
  const usesDeposit = plan.depositPct !== null;

  return (
    <div className="space-y-6">
      {meta && (
        <Card>
          <CardContent className="p-5">
            <p className="font-display text-base font-bold">
              {meta.title}{" "}
              <Badge className="bg-muted text-muted-foreground ml-1 h-5 border-0 text-[10px] font-bold">
                {meta.kind === "long" ? "Long-form" : "Short course"}
              </Badge>
            </p>
            <div className="divide-border/70 mt-2 divide-y">
              <Row
                label="Duration"
                value={`${durationLabel(meta)} · ${meta.daysPerWeek} days/week`}
              />
              <Row
                label="Schedule"
                value={`${SCHEDULE_LABELS[draft.scheduleDays] ?? SCHEDULE_LABELS.mwf} · ${SLOT_LABELS[draft.timeSlot]} · ${MODE_LABELS[draft.mode]}`}
              />
              {draft.preferredStart && <Row label="Preferred start" value={draft.preferredStart} />}
              <Row label="Plan" value={plan.label} />
              <Row
                label={usesDeposit ? "Pay now (deposit)" : "Pay after submitting"}
                value={
                  <span className="font-display text-base font-extrabold">
                    {formatFee(usesDeposit ? deposit : due)}
                  </span>
                }
              />
              <Row
                label="Payment method"
                value={
                  draft.paymentMethod === "paystack"
                    ? "Card, bank or USSD (Paystack)"
                    : "Direct bank transfer"
                }
              />
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="p-5">
          <p className="font-display text-base font-bold">
            {draft.firstName || "…"} {draft.lastName || "…"}
          </p>
          <div className="divide-border/70 mt-2 divide-y">
            <Row label="Email" value={draft.email || "…"} />
            <Row label="Phone" value={draft.phone || "…"} />
            <Row label="Location" value={draft.city || "…"} />
            {draft.educationLevel && <Row label="Education" value={draft.educationLevel} />}
            {draft.experienceLevel && <Row label="Experience" value={draft.experienceLevel} />}
            {draft.goal && (
              <Row
                label="Goal"
                value={draft.goal.length > 90 ? `${draft.goal.slice(0, 90)}…` : draft.goal}
              />
            )}
            <Row
              label="Laptop"
              value={draft.hasLaptop ? "Yes" : "No — will use academy machines where possible"}
            />
            {draft.referredBy && <Row label="Heard about us via" value={draft.referredBy} />}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <p className="text-muted-foreground flex items-center gap-2 text-[11px] font-bold tracking-wide uppercase">
          <ShieldCheck className="text-primary size-3.5" /> Agreements
        </p>
        {(
          [
            {
              key: "consentPrivacy" as const,
              label: (
                <>
                  I agree to the{" "}
                  <a href="/privacy" className="text-primary underline-offset-2 hover:underline">
                    privacy policy
                  </a>{" "}
                  — my details are used only for admissions and class communication.
                </>
              ),
            },
            {
              key: "consentTerms" as const,
              label: (
                <>
                  I accept the{" "}
                  <a href="/terms" className="text-primary underline-offset-2 hover:underline">
                    terms of sale
                  </a>{" "}
                  , including the deposit refund and transfer policy.
                </>
              ),
            },
            {
              key: "consentWhatsApp" as const,
              label:
                "You may contact me on WhatsApp about my application and class updates (optional).",
            },
          ] as const
        ).map((item) => (
          <div key={item.key} className="flex items-start gap-3">
            <Checkbox
              id={`consent-${item.key}`}
              checked={draft[item.key]}
              onCheckedChange={(v) =>
                update({ [item.key]: v === true } as Partial<EnrollmentDraft>)
              }
              className="mt-0.5"
            />
            <label htmlFor={`consent-${item.key}`} className="text-sm leading-relaxed">
              {item.label}
            </label>
          </div>
        ))}
        {(errors.consentPrivacy || errors.consentTerms) && (
          <p className="text-error flex items-center gap-1.5 text-sm">
            <AlertCircle className="size-4" /> Please accept the privacy policy and terms to
            continue.
          </p>
        )}
      </div>

      <div className="border-border/70 border-t pt-5">
        <Turnstile onToken={onToken} />
      </div>
    </div>
  );
}
