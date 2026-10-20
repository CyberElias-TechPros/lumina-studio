"use client";

import { TUITION_POLICY } from "@/data/academy/tuition-policy";

import { BadgeCheck, CreditCard, Landmark, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { longPaymentPlans, shortPaymentPlans } from "@/data/academy";
import { cn } from "@/lib/utils";
import { depositFor, feeFor, formatFee, type ProgramMeta } from "./meta";
import type { EnrollmentDraft } from "./types";

interface PaymentStepProps {
  meta: ProgramMeta | null;
  draft: EnrollmentDraft;
  update: (patch: Partial<EnrollmentDraft>) => void;
}

/**
 * Step 3 — money, clearly. Fee maths for the chosen plan, and how the
 * student will pay. Payment itself happens on the success screen (lead
 * first, pay second) so a dropout never loses the conversation.
 */
export function PaymentStep({ meta, draft, update }: PaymentStepProps) {
  const plans = meta?.kind === "long" ? longPaymentPlans : shortPaymentPlans;
  const plan = plans.find((p) => p.value === draft.paymentPlan) ?? plans[0];
  const { due, discount } = meta ? feeFor(meta, plan.value) : { due: 0, discount: 0 };
  const deposit = meta ? depositFor(meta) : 0;
  const usesDeposit = plan.depositPct !== null;

  return (
    <div className="space-y-6">
      {meta && (
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="p-5">
            <p className="text-muted-foreground text-[11px] font-bold tracking-wide uppercase">
              {meta.title} — fee summary
            </p>
            <div className="mt-3 space-y-2 text-sm">
              <div className="flex items-baseline justify-between">
                <span className="text-muted-foreground">Full fee</span>
                <span
                  className={cn(
                    "font-semibold",
                    discount > 0 && "text-muted-foreground line-through",
                  )}
                >
                  {formatFee(meta.fee)}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex items-baseline justify-between">
                  <span className="text-success flex items-center gap-1 text-xs font-semibold">
                    <Sparkles className="size-3.5" /> Pay-in-full discount
                  </span>
                  <span className="text-success font-bold">−{formatFee(discount)}</span>
                </div>
              )}
              <div className="flex items-baseline justify-between border-border border-t pt-2">
                <span className="font-bold">Total payable</span>
                <span className="font-display text-xl font-extrabold">{formatFee(due)}</span>
              </div>
              {usesDeposit && (
                <div className="rounded-lg bg-card px-3 py-2.5 text-xs leading-relaxed">
                  <p className="font-semibold">
                    After offer acceptance: {formatFee(deposit)} before class ·{" "}
                    {formatFee(due - deposit)}{" "}
                    {meta.kind === "short"
                      ? "before the second half (exact date in your offer)"
                      : "in equal monthly instalments"}
                  </p>
                  <p className="text-muted-foreground mt-0.5">
                    {TUITION_POLICY.refundSummary}{" "}
                    <a className="underline" href="/terms#tuition">
                      Read the tuition policy
                    </a>
                    .
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      <div>
        <p className="text-sm font-bold">Choose a payment plan</p>
        <div className="mt-2.5 grid gap-2">
          {plans.map((p) => {
            const isSel = plan.value === p.value;
            return (
              <button
                key={p.value}
                aria-pressed={isSel}
                type="button"
                onClick={() => update({ paymentPlan: p.value as EnrollmentDraft["paymentPlan"] })}
                className={cn(
                  "flex items-center justify-between gap-3 rounded-lg border px-4 py-3 text-left transition-all",
                  isSel
                    ? "border-primary bg-primary/5 ring-1 ring-primary"
                    : "hover:border-primary/40",
                )}
              >
                <div>
                  <p className={cn("text-sm font-semibold", isSel && "text-primary")}>{p.label}</p>
                  <p className="text-muted-foreground mt-0.5 text-xs">{p.detail}</p>
                </div>
                {p.value === "full-10-off" && meta && (
                  <Badge className="bg-success/10 text-success h-5 shrink-0 border-0 text-[10px] font-bold">
                    Save {formatFee(Math.round(meta.fee * 0.1))}
                  </Badge>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <p className="text-sm font-bold">How will you pay?</p>
        <div className="mt-2.5 grid gap-2 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => update({ paymentMethod: "paystack" })}
            aria-pressed={draft.paymentMethod === "paystack"}
            className={cn(
              "rounded-lg border px-4 py-3 text-left transition-all",
              draft.paymentMethod === "paystack"
                ? "border-primary bg-primary/5 ring-1 ring-primary"
                : "hover:border-primary/40",
            )}
          >
            <p className="flex items-center gap-2 text-sm font-semibold">
              <CreditCard className="text-primary size-4" /> Card, bank or USSD
            </p>
            <p className="text-muted-foreground mt-0.5 text-xs">
              Secure Paystack checkout — receipt issued after payment confirmation
            </p>
          </button>
          <button
            type="button"
            onClick={() => update({ paymentMethod: "bank-transfer" })}
            aria-pressed={draft.paymentMethod === "bank-transfer"}
            className={cn(
              "rounded-lg border px-4 py-3 text-left transition-all",
              draft.paymentMethod === "bank-transfer"
                ? "border-primary bg-primary/5 ring-1 ring-primary"
                : "hover:border-primary/40",
            )}
          >
            <p className="flex items-center gap-2 text-sm font-semibold">
              <Landmark className="text-primary size-4" /> Direct bank transfer
            </p>
            <p className="text-muted-foreground mt-0.5 text-xs">
              Instructions appear after offer acceptance. Report your transfer online; CEA verifies
              it against bank records.
            </p>
          </button>
        </div>
        <p className="text-muted-foreground mt-2 flex items-center gap-1.5 text-xs">
          <BadgeCheck className="text-success size-3.5" />
          No payment on submission. Review and accept a confirmed offer first; applying is always
          free.
        </p>
      </div>
    </div>
  );
}
