import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  GraduationCap,
  Loader2,
  UserRound,
  ClipboardCheck,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageShell, PageHero } from "@/components/marketing/shell";
import { InfoPanel } from "@/components/enrollment/info-panel";
import { ProgramStep } from "@/components/enrollment/program-step";
import { ScheduleStep } from "@/components/enrollment/schedule-step";
import { PaymentStep } from "@/components/enrollment/payment-step";
import { DetailsStep } from "@/components/enrollment/details-step";
import { ReviewStep } from "@/components/enrollment/review-step";
import { SuccessScreen } from "@/components/enrollment/success-screen";
import { INITIAL_DRAFT, type EnrollmentDraft } from "@/components/enrollment/types";
import { getProgramMeta } from "@/components/enrollment/meta";
import { submitEnrollment, type SubmitEnrollmentInput } from "@/lib/api/enrollments";
import { env } from "@/lib/env";
import { ApiError } from "@/lib/errors";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/apply/")({
  validateSearch: (search: Record<string, unknown>) =>
    z.object({ program: z.string().optional() }).parse(search),
  head: () => ({
    meta: [
      { title: "Register for a course — Cyber Elias Academy" },
      {
        name: "description",
        content:
          "Register for a short course or long-form training at Cyber Elias Academy, Port Harcourt. See fees, dates, payment plans and what happens next — it takes five minutes.",
      },
    ],
  }),
  component: ApplyPage,
});

const STEPS = [
  { key: "course", label: "Course", icon: GraduationCap },
  { key: "schedule", label: "Schedule", icon: CalendarDays },
  { key: "payment", label: "Payment", icon: ArrowRight },
  { key: "details", label: "About you", icon: UserRound },
  { key: "review", label: "Review & submit", icon: ClipboardCheck },
] as const;

type StepKey = (typeof STEPS)[number]["key"];

function normalizeDraft(draft: EnrollmentDraft, kind: "short" | "long"): EnrollmentDraft {
  const next = { ...draft, programKind: kind };
  if (kind === "long" && next.scheduleDays === "standard") {
    next.scheduleDays = "mwf";
  }
  const validPlans = kind === "short" ? ["full", "50-50"] : ["deposit-monthly", "full-10-off"];
  if (!validPlans.includes(next.paymentPlan)) {
    next.paymentPlan = kind === "short" ? "full" : "deposit-monthly";
  }
  return next;
}

function ApplyPage() {
  const { program: initialProgram } = Route.useSearch();
  const [step, setStep] = useState<StepKey>("course");
  const [stepIndex, setStepIndex] = useState(0);
  const [kind, setKind] = useState<"short" | "long">(() => {
    const meta = initialProgram ? getProgramMeta(initialProgram) : null;
    return meta?.kind === "long" ? "long" : "short";
  });
  const [draft, setDraft] = useState<EnrollmentDraft>(() => {
    const base = { ...INITIAL_DRAFT, programSlug: initialProgram ?? "", programKind: kind };
    return normalizeDraft(base, kind);
  });
  const [turnstileToken, setTurnstileToken] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [done, setDone] = useState<{ ref: string } | null>(null);

  const meta = useMemo(() => getProgramMeta(draft.programSlug), [draft.programSlug]);

  const update = (patch: Partial<EnrollmentDraft>) => {
    setDraft((d) => normalizeDraft({ ...d, ...patch }, d.programKind ?? kind));
    setFieldErrors((e) => {
      const next = { ...e };
      for (const key of Object.keys(patch)) delete next[key];
      return next;
    });
  };

  const changeKind = (k: "short" | "long") => {
    setKind(k);
    setDraft((d) => normalizeDraft({ ...d, programSlug: "", programKind: k }, k));
  };

  const validate = (s: StepKey): boolean => {
    const errors: Record<string, string> = {};
    if (s === "course" && !draft.programSlug) {
      errors.program = "Choose a course to continue.";
    }
    if (s === "details") {
      if (draft.firstName.trim().length < 2) errors.firstName = "Enter your first name.";
      if (draft.lastName.trim().length < 2) errors.lastName = "Enter your last name.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(draft.email.trim())) {
        errors.email = "Enter a valid email address.";
      }
      if (draft.phone.trim().length < 7 || !/^\+?[0-9\s\-()]{7,20}$/.test(draft.phone.trim())) {
        errors.phone = "Enter a valid phone number (e.g. +234 800 000 0000).";
      }
      if (!draft.city) errors.city = "Select your location.";
      if (draft.birthYear) {
        const y = Number(draft.birthYear);
        if (!Number.isInteger(y) || y < 1950 || y > 2012) {
          errors.birthYear = "Enter a valid birth year.";
        }
      }
    }
    if (s === "review") {
      if (!draft.consentPrivacy) errors.consentPrivacy = "Accept the privacy policy.";
      if (!draft.consentTerms) errors.consentTerms = "Accept the terms of sale.";
      if (env.turnstileSiteKey && !turnstileToken) {
        errors.turnstile = "Complete the human check below.";
      }
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const next = () => {
    if (!validate(step)) return;
    const idx = Math.min(stepIndex + 1, STEPS.length - 1);
    setStepIndex(idx);
    setStep(STEPS[idx].key);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const back = () => {
    setFieldErrors({});
    const idx = Math.max(stepIndex - 1, 0);
    setStepIndex(idx);
    setStep(STEPS[idx].key);
  };

  const submit = async () => {
    for (const s of ["course", "details", "review"] as StepKey[]) {
      if (!validate(s)) {
        const idx = STEPS.findIndex((x) => x.key === s);
        setStepIndex(idx);
        setStep(s);
        return;
      }
    }
    if (!meta) return;
    setSubmitting(true);
    setSubmitError(null);
    const input: SubmitEnrollmentInput = {
      programSlug: draft.programSlug,
      scheduleDays: draft.scheduleDays,
      timeSlot: draft.timeSlot,
      mode: draft.mode,
      preferredStart: draft.preferredStart || undefined,
      firstName: draft.firstName.trim(),
      lastName: draft.lastName.trim(),
      email: draft.email.trim(),
      phone: draft.phone.trim(),
      city: draft.city,
      birthYear: draft.birthYear ? Number(draft.birthYear) : undefined,
      gender: draft.gender || undefined,
      educationLevel: draft.educationLevel || undefined,
      experienceLevel: draft.experienceLevel || undefined,
      goal: draft.goal.trim() || undefined,
      employer: draft.employer.trim() || undefined,
      hasLaptop: draft.hasLaptop,
      referredBy: draft.referredBy || undefined,
      paymentPlan: draft.paymentPlan,
      paymentMethod: draft.paymentMethod,
      consentPrivacy: true,
      consentTerms: true,
      consentWhatsApp: draft.consentWhatsApp,
      turnstileToken: turnstileToken || undefined,
    };
    try {
      const result = await submitEnrollment(input);
      setDone({ ref: result.enrollment.ref });
      window.scrollTo({ top: 0 });
    } catch (err) {
      setSubmitError(
        err instanceof ApiError
          ? err.fieldErrors && Object.keys(err.fieldErrors).length > 0
            ? "Please fix the highlighted fields."
            : err.message
          : "Something went wrong submitting your registration. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <PageShell>
        <section className="container-page py-16 sm:py-20">
          <SuccessScreen
            refCode={done.ref}
            meta={meta}
            plan={draft.paymentPlan}
            method={draft.paymentMethod}
            phone={draft.phone}
          />
        </section>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <PageHero
        eyebrow="Admissions"
        title="Register for a course"
        description="Five short steps: pick your course, choose your schedule, see the fee clearly, tell us about you, submit. There is no application fee — and your fee, dates and what to bring are shown at every step."
      />

      <section className="container-page pb-20">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div>
            {/* Progress rail */}
            <ol className="mb-6 grid grid-cols-5 gap-1.5" aria-label="Registration steps">
              {STEPS.map((s, i) => {
                const state = i < stepIndex ? "done" : i === stepIndex ? "current" : "todo";
                return (
                  <li key={s.key} className="min-w-0">
                    <div
                      className={cn(
                        "flex items-center gap-1.5 rounded-md border px-2 py-2",
                        state === "current" && "border-primary/50 bg-primary/5",
                        state === "done" && "border-border bg-success/5",
                        state === "todo" && "border-border/70",
                      )}
                    >
                      <s.icon
                        className={cn(
                          "size-3.5 shrink-0",
                          state === "current" && "text-primary",
                          state === "done" && "text-success",
                          state === "todo" && "text-muted-foreground/60",
                        )}
                      />
                      <span
                        className={cn(
                          "hidden truncate text-[11px] font-semibold sm:block",
                          state === "todo" && "text-muted-foreground/70",
                        )}
                      >
                        {i + 1}. {s.label}
                      </span>
                      <span
                        className={cn(
                          "truncate text-[11px] font-semibold sm:hidden",
                          state === "todo" && "text-muted-foreground/70",
                        )}
                      >
                        {i + 1}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ol>

            <div className="border-card shadow-soft rounded-2xl border p-6 sm:p-8">
              {step === "course" && (
                <>
                  <h2 className="font-display text-xl font-bold">What would you like to learn?</h2>
                  <p className="text-muted-foreground mt-1 text-sm">
                    Short courses are 2–6 weeks; long-form trainings are 3–6 months at 3 days a
                    week.
                  </p>
                  <div className="mt-5">
                    <ProgramStep
                      kind={kind}
                      onKind={changeKind}
                      selected={draft.programSlug}
                      onSelect={(slug) => update({ programSlug: slug })}
                      error={fieldErrors.program}
                    />
                  </div>
                </>
              )}

              {step === "schedule" && meta && (
                <>
                  <h2 className="font-display text-xl font-bold">When suits you?</h2>
                  <p className="text-muted-foreground mt-1 text-sm">
                    {meta.title} —{" "}
                    {meta.daysPerWeek === 3
                      ? "three practical days a week"
                      : "two practical sessions a week"}
                    . We confirm exact dates with you.
                  </p>
                  <div className="mt-5">
                    <ScheduleStep
                      kind={meta.kind}
                      draft={draft}
                      update={update}
                      errors={fieldErrors}
                    />
                  </div>
                </>
              )}

              {step === "payment" && (
                <>
                  <h2 className="font-display text-xl font-bold">The fee, clearly</h2>
                  <p className="text-muted-foreground mt-1 text-sm">
                    No hidden charges. Pick a plan — you pay on the next screen after submitting.
                  </p>
                  <div className="mt-5">
                    <PaymentStep meta={meta} draft={draft} update={update} />
                  </div>
                </>
              )}

              {step === "details" && (
                <>
                  <h2 className="font-display text-xl font-bold">Tell us about you</h2>
                  <p className="text-muted-foreground mt-1 text-sm">
                    This is what we use to place you in the right cohort and prepare your welcome
                    pack.
                  </p>
                  <div className="mt-5">
                    <DetailsStep draft={draft} update={update} errors={fieldErrors} />
                  </div>
                </>
              )}

              {step === "review" && (
                <>
                  <h2 className="font-display text-xl font-bold">One last look</h2>
                  <p className="text-muted-foreground mt-1 text-sm">
                    Check everything is right, accept the policies, and submit.
                  </p>
                  <div className="mt-5">
                    <ReviewStep
                      meta={meta}
                      draft={draft}
                      update={update}
                      errors={fieldErrors}
                      onToken={setTurnstileToken}
                    />
                  </div>
                </>
              )}

              {/* Nav */}
              <div className="border-border/70 mt-8 flex items-center justify-between border-t pt-6">
                <Button variant="ghost" onClick={back} disabled={stepIndex === 0}>
                  <ArrowLeft className="size-4" /> Back
                </Button>
                {stepIndex < STEPS.length - 1 ? (
                  <Button onClick={next} size="lg">
                    Continue <ArrowRight className="size-4" />
                  </Button>
                ) : (
                  <Button onClick={submit} size="lg" disabled={submitting}>
                    {submitting ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <Send className="size-4" />
                    )}{" "}
                    {submitting ? "Submitting…" : "Submit registration"}
                  </Button>
                )}
              </div>

              {submitError && (
                <p className="text-error bg-error/10 mt-4 rounded-lg px-4 py-3 text-sm">
                  {submitError}
                </p>
              )}
            </div>

            <p className="text-muted-foreground mt-4 text-center text-xs">
              Applying is free and takes about 5 minutes. Questions?{" "}
              <Link
                to="/contact"
                className="text-primary font-semibold underline-offset-2 hover:underline"
              >
                Contact us
              </Link>{" "}
              or visit us at 24/26 Ebony Road.
            </p>
          </div>

          <InfoPanel
            meta={meta}
            plan={draft.paymentPlan}
            timeSlot={draft.timeSlot}
            mode={draft.mode}
            scheduleDays={draft.scheduleDays}
          />
        </div>
      </section>
    </PageShell>
  );
}
