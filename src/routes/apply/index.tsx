"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
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
import { TUITION_POLICY } from "@/data/academy/tuition-policy";
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
          "Apply for one of the 13 core flyer short courses at Cyber Elias Academy, Port Harcourt. Specialist-course availability and start dates are confirmed by admissions.",
      },
    ],
  }),
  component: ApplyPage,
});

const STEPS = [
  { key: "course", label: "Course", icon: GraduationCap },
  { key: "schedule", label: "Schedule", icon: CalendarDays },
  { key: "payment", label: "Fee & plan", icon: ArrowRight },
  { key: "details", label: "About you", icon: UserRound },
  { key: "review", label: "Review & submit", icon: ClipboardCheck },
] as const;

type StepKey = (typeof STEPS)[number]["key"];

function normalizeDraft(draft: EnrollmentDraft): EnrollmentDraft {
  const next = { ...draft, programKind: "short" as const };
  if (!["full", "50-50"].includes(next.paymentPlan)) {
    next.paymentPlan = "full";
  }
  return next;
}

function ApplyPage() {
  const { program: initialProgram } = Route.useSearch();
  const initialMeta = initialProgram ? getProgramMeta(initialProgram) : null;
  const initialShortCourse = initialMeta?.kind === "short" ? (initialProgram ?? "") : "";
  const [step, setStep] = useState<StepKey>("course");
  const [stepIndex, setStepIndex] = useState(0);
  const [draft, setDraft] = useState<EnrollmentDraft>(() =>
    normalizeDraft({ ...INITIAL_DRAFT, programSlug: initialShortCourse, programKind: "short" }),
  );
  const [turnstileToken, setTurnstileToken] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const submissionKey = useRef<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [done, setDone] = useState<{ ref: string } | null>(null);

  const [draftReady, setDraftReady] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const stepPanel = useRef<HTMLDivElement>(null);
  const focusedStep = useRef(-1);
  const errorSummary = useRef<HTMLDivElement>(null);
  const [errorFocusRequest, setErrorFocusRequest] = useState(0);
  const DRAFT_KEY = "cea-application-draft-v1";

  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) {
        const saved = raw.length < 50000 ? JSON.parse(raw) : null;
        if (
          saved?.version === 1 &&
          saved.expires > Date.now() &&
          saved.draft &&
          typeof saved.draft === "object"
        ) {
          const restored = { ...INITIAL_DRAFT };
          for (const key of Object.keys(INITIAL_DRAFT) as (keyof EnrollmentDraft)[]) {
            const value = saved.draft[key];
            if (
              typeof value === typeof INITIAL_DRAFT[key] &&
              (typeof value !== "string" || value.length <= 5000)
            ) {
              Object.assign(restored, { [key]: value });
            }
          }
          const choices: Partial<Record<keyof EnrollmentDraft, readonly string[]>> = {
            scheduleDays: ["standard", "mwf", "tss"],
            timeSlot: ["morning", "afternoon", "evening", "any"],
            mode: ["onsite", "online", "hybrid"],
            paymentPlan: ["full", "50-50"],
            paymentMethod: ["paystack", "bank-transfer"],
            gender: ["", "female", "male", "other", "prefer-not"],
          };
          for (const [key, allowed] of Object.entries(choices)) {
            const field = key as keyof EnrollmentDraft;
            if (!allowed.includes(String(restored[field])))
              Object.assign(restored, { [field]: INITIAL_DRAFT[field] });
          }
          if (
            typeof saved.submissionKey === "string" &&
            /^[0-9a-f-]{36}$/.test(saved.submissionKey)
          )
            submissionKey.current = saved.submissionKey;
          // Consent is always collected again; never persist human-check tokens.
          restored.consentPrivacy = false;
          restored.consentTerms = false;
          restored.consentWhatsApp = false;
          const course = initialShortCourse || restored.programSlug;
          restored.programSlug = getProgramMeta(course)?.kind === "short" ? course : "";
          setDraft(normalizeDraft(restored));
          if (
            restored.programSlug &&
            (!initialShortCourse || initialShortCourse === saved.draft.programSlug) &&
            Number.isInteger(saved.stepIndex) &&
            saved.stepIndex >= 0 &&
            saved.stepIndex < STEPS.length
          ) {
            setStepIndex(saved.stepIndex);
            setStep(STEPS[saved.stepIndex].key);
          }
          setSaveMessage("Your saved answers are restored. Please check them before sending.");
        } else localStorage.removeItem(DRAFT_KEY);
      }
    } catch {
      setSaveMessage(
        "This browser cannot restore saved answers. Keep this page open until you finish.",
      );
    }
    setDraftReady(true);
  }, [initialShortCourse]);

  useEffect(() => {
    if (!draftReady || done) return;
    try {
      localStorage.setItem(
        DRAFT_KEY,
        JSON.stringify({
          version: 1,
          stepIndex,
          submissionKey: submissionKey.current,
          expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
          draft: { ...draft, consentPrivacy: false, consentTerms: false, consentWhatsApp: false },
        }),
      );
    } catch {
      setSaveMessage(
        "Your browser cannot save these answers. Keep this page open until you finish.",
      );
    }
  }, [draft, draftReady, done, submitting, stepIndex]);

  useEffect(() => {
    if (errorFocusRequest) errorSummary.current?.focus();
  }, [errorFocusRequest]);

  useEffect(() => {
    if (!draftReady || focusedStep.current === stepIndex) return;
    focusedStep.current = stepIndex;
    if (!Object.keys(fieldErrors).length)
      stepPanel.current?.querySelector<HTMLElement>("h2")?.focus();
  }, [stepIndex, draftReady, fieldErrors]);

  const meta = useMemo(() => getProgramMeta(draft.programSlug), [draft.programSlug]);

  const update = (patch: Partial<EnrollmentDraft>) => {
    setDraft((d) => normalizeDraft({ ...d, ...patch }));
    setFieldErrors((e) => {
      const next = { ...e };
      for (const key of Object.keys(patch)) delete next[key];
      return next;
    });
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
    if (Object.keys(errors).length) setErrorFocusRequest((n) => n + 1);
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
    submissionKey.current ??= crypto.randomUUID();
    const input: SubmitEnrollmentInput = {
      submissionKey: submissionKey.current,
      policyVersion: TUITION_POLICY.version,
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
      try {
        localStorage.removeItem(DRAFT_KEY);
      } catch {
        /* Storage may be blocked. */
      }
      setDone({ ref: result.enrollment.ref });
      window.scrollTo({ top: 0 });
    } catch (err) {
      if (err instanceof ApiError && err.code === "SUBMISSION_CHANGED")
        submissionKey.current = null;
      if (err instanceof ApiError && Object.keys(err.fieldErrors).length) {
        setFieldErrors(
          Object.fromEntries(
            Object.entries(err.fieldErrors).map(([key, messages]) => [key, messages.join(" ")]),
          ),
        );
        setErrorFocusRequest((n) => n + 1);
      }
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

  if (!draftReady)
    return (
      <PageShell>
        <p role="status" className="container-page py-12">
          Opening your application…
        </p>
      </PageShell>
    );

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
        description="Apply for one of the 13 core flyer short courses. Share your preferences, review the fee and apply for free. No payment is requested until CEA confirms a deliverable timetable, equipment arrangement and place. Unscheduled courses collect interest only."
      />

      <section className="container-page pb-20">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div>
            <div className="mb-4 rounded-lg border p-4 text-sm">
              <p>
                Answers are saved on this device for up to 7 days. On a shared phone, clear them
                when you finish. Consent choices are not saved.
              </p>
              {saveMessage && (
                <p role="status" className="mt-2">
                  {saveMessage}
                </p>
              )}
              <button
                type="button"
                className="mt-2 min-h-12 underline"
                onClick={() => {
                  if (!window.confirm("Clear your saved answers and start again?")) return;
                  try {
                    localStorage.removeItem(DRAFT_KEY);
                  } catch {
                    /* blocked storage */
                  }
                  setDraft(normalizeDraft({ ...INITIAL_DRAFT }));
                  setStep("course");
                  setStepIndex(0);
                  setFieldErrors({});
                  submissionKey.current = null;
                  setSaveMessage("Your previous answers have been cleared.");
                }}
              >
                Clear saved answers
              </button>
            </div>
            <p className="mb-3 font-medium" aria-live="polite">
              Step {stepIndex + 1} of {STEPS.length}: {STEPS[stepIndex].label}
            </p>
            {/* Progress rail */}
            <ol className="mb-6 grid grid-cols-5 gap-1.5" aria-label="Registration steps">
              {STEPS.map((s, i) => {
                const state = i < stepIndex ? "done" : i === stepIndex ? "current" : "todo";
                return (
                  <li key={s.key} className="min-w-0">
                    <button
                      type="button"
                      disabled={i >= stepIndex}
                      aria-current={i === stepIndex ? "step" : undefined}
                      aria-label={`Step ${i + 1}: ${s.label}${i < stepIndex ? ". Go back to this step" : ""}`}
                      onClick={() => {
                        setStepIndex(i);
                        setStep(s.key);
                        setFieldErrors({});
                      }}
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
                    </button>
                  </li>
                );
              })}
            </ol>

            <div ref={stepPanel} className="border-card shadow-soft rounded-2xl border p-6 sm:p-8">
              {Object.keys(fieldErrors).length > 0 && (
                <div
                  ref={errorSummary}
                  tabIndex={-1}
                  role="alert"
                  className="mb-6 rounded-lg border border-error p-4 focus:outline-2"
                >
                  <h3 className="font-semibold">Please check these answers</h3>
                  <ul className="list-disc pl-5">
                    {Object.entries(fieldErrors).map(([key, message]) => (
                      <li key={key}>{message}</li>
                    ))}
                  </ul>
                </div>
              )}
              {step === "course" && (
                <>
                  <h2 tabIndex={-1} className="font-display text-xl font-bold">
                    What would you like to learn?
                  </h2>
                  <p className="text-muted-foreground mt-1 text-sm">
                    This form is for the 13 core short courses shown below. Specialist-course
                    availability and longer-programme enquiries go to admissions.
                  </p>
                  <div className="mt-5">
                    <ProgramStep
                      selected={draft.programSlug}
                      onSelect={(slug) => update({ programSlug: slug })}
                      error={fieldErrors.program}
                    />
                  </div>
                </>
              )}

              {step === "schedule" && meta && (
                <>
                  <h2 tabIndex={-1} className="font-display text-xl font-bold">
                    When suits you?
                  </h2>
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
                  <h2 tabIndex={-1} className="font-display text-xl font-bold">
                    The fee, clearly
                  </h2>
                  <p className="text-muted-foreground mt-1 text-sm">
                    Choose a preference only. Do not pay until your exact cohort, equipment
                    arrangement and place are confirmed in an offer.
                  </p>
                  <div className="mt-5">
                    <PaymentStep meta={meta} draft={draft} update={update} />
                  </div>
                </>
              )}

              {step === "details" && (
                <>
                  <h2 tabIndex={-1} className="font-display text-xl font-bold">
                    Tell us about you
                  </h2>
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
                  <h2 tabIndex={-1} className="font-display text-xl font-bold">
                    One last look
                  </h2>
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
                <p
                  role="alert"
                  className="text-error bg-error/10 mt-4 rounded-lg px-4 py-3 text-sm"
                >
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
              or visit us at 24 Ebony Road.
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
