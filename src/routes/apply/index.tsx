import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PageShell, PageHero } from "@/components/marketing/shell";
import { CourseCover, CourseIcon } from "@/components/marketing/photos";
import { flyerCourses, formatFee } from "@/data/academy";
import { submitApplication } from "@/lib/api/applications";
import { ApiError } from "@/lib/errors";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/apply/")({
  validateSearch: z.object({
    program: z.string().optional(),
  }),
  head: () => ({
    meta: [
      { title: "Apply — Cyber Elias Academy" },
      {
        name: "description",
        content:
          "Apply for a short digital-skills course at Cyber Elias Academy in Port Harcourt.",
      },
    ],
  }),
  component: ApplyPage,
});

function ApplyPage() {
  const { program: initialProgram } = Route.useSearch();
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [ref, setRef] = useState<string | null>(null);
  const [programSlug, setProgramSlug] = useState(initialProgram ?? "");
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    experience: "",
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const selected = flyerCourses.find((c) => c.slug === programSlug);

  const setField = (key: keyof typeof profile) => (value: string) => {
    setProfile((p) => ({ ...p, [key]: value }));
    setFieldErrors((e) => (e[key] ? { ...e, [key]: "" } : e));
  };

  const validateStep = (s: number): boolean => {
    const errors: Record<string, string> = {};
    if (s === 0 && !programSlug) errors.program = "Choose a course to continue.";
    if (s === 1) {
      if (profile.firstName.trim().length < 2) errors.firstName = "Enter your first name.";
      if (profile.lastName.trim().length < 2) errors.lastName = "Enter your last name.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(profile.email.trim()))
        errors.email = "Enter a valid email address.";
      if (profile.phone.trim() && !/^\+?[0-9\s\-()]{6,20}$/.test(profile.phone.trim()))
        errors.phone = "Enter a valid phone number.";
      if (!profile.city) errors.city = "Select your location.";
      if (!profile.experience) errors.experience = "Select your experience level.";
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const submit = async () => {
    if (!selected) return;
    if (!validateStep(1)) {
      setStep(1);
      return;
    }
    setSubmitting(true);
    setSubmitError(null);
    try {
      const result = await submitApplication({
        fullName: `${profile.firstName.trim()} ${profile.lastName.trim()}`,
        email: profile.email.trim(),
        phone: profile.phone.trim(),
        city: profile.city,
        programSlug: selected.slug,
        experience: profile.experience,
      });
      setRef(result.application.ref);
      setDone(true);
    } catch (err) {
      setSubmitError(
        err instanceof ApiError ? err.message : "Something went wrong submitting your application.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <PageShell>
        <section className="container-page grid min-h-[50vh] place-items-center py-20">
          <div className="text-center">
            <span className="bg-success/10 text-success mx-auto grid size-12 place-items-center rounded-full">
              <CheckCircle2 className="size-6" />
            </span>
            <h1 className="font-display mt-6 text-2xl font-semibold sm:text-3xl">
              Application submitted
            </h1>
            <p className="text-muted-foreground mx-auto mt-3 max-w-md text-sm leading-relaxed">
              Your application for <strong className="text-foreground">{selected?.title}</strong> is
              in. We will email you about dates and the fee.
            </p>
            {ref && (
              <div className="bg-muted mx-auto mt-6 inline-flex items-center gap-3 rounded-lg border px-5 py-3">
                <p className="text-muted-foreground text-sm">Reference</p>
                <p className="font-mono text-base font-semibold tracking-widest">{ref}</p>
              </div>
            )}
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild>
                <Link to="/apply/status">Track application</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/classes">View courses</Link>
              </Button>
            </div>
          </div>
        </section>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <PageHero
        eyebrow="Admissions"
        title="Apply for a course"
        description="Choose a short course and leave your details. There is no application fee. We reply with dates, the fee, and what to bring."
      />

      <section className="container-page pb-20">
        <div className="mx-auto max-w-3xl">
          <ol className="mb-8 grid grid-cols-2 gap-2 text-sm">
            {["Course", "Your details"].map((label, i) => (
              <li
                key={label}
                className={cn(
                  "rounded-md border px-3 py-2",
                  i === step ? "border-primary/40 bg-primary/5 text-foreground" : "text-muted-foreground",
                )}
              >
                {i + 1}. {label}
              </li>
            ))}
          </ol>

          {step === 0 && (
            <div className="border-border rounded-lg border p-6 sm:p-8">
              <h2 className="font-display text-xl font-semibold">Choose your course</h2>
              <p className="text-muted-foreground mt-1 text-sm">
                Fees are for the full short course. Unsure?{" "}
                <Link to="/contact" className="text-primary underline-offset-2 hover:underline">
                  Ask us
                </Link>
                .
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {flyerCourses.map((course) => (
                  <button
                    key={course.slug}
                    type="button"
                    onClick={() => setProgramSlug(course.slug)}
                    className={cn(
                      "overflow-hidden rounded-lg border text-left",
                      programSlug === course.slug
                        ? "border-primary bg-primary/5"
                        : "hover:border-primary/40",
                    )}
                  >
                    <div className="bg-muted aspect-[16/9]">
                      <CourseCover slug={course.slug} />
                    </div>
                    <div className="p-4">
                      <p className="text-muted-foreground text-xs">{course.category}</p>
                      <p className="font-display mt-2 inline-flex items-center gap-1.5 text-sm font-semibold">
                        <CourseIcon slug={course.slug} className="text-primary size-3.5" />
                        {course.title}
                      </p>
                      <p className="text-muted-foreground mt-1 text-xs">
                        {course.level} · {course.weeks} weeks
                      </p>
                      <p className="mt-2 text-sm font-medium">{formatFee(course.fee)}</p>
                    </div>
                  </button>
                ))}
              </div>
              {fieldErrors.program && (
                <p className="text-error mt-3 text-sm">{fieldErrors.program}</p>
              )}
            </div>
          )}

          {step === 1 && (
            <div className="border-border rounded-lg border p-6 sm:p-8">
              <h2 className="font-display text-xl font-semibold">Your details</h2>
              <p className="text-muted-foreground mt-1 text-sm">
                {selected?.title} · {selected ? formatFee(selected.fee) : ""} · {selected?.weeks}{" "}
                weeks
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {[
                  { id: "firstName", label: "First name", ph: "Adaeze" },
                  { id: "lastName", label: "Last name", ph: "Okafor" },
                ].map((f) => (
                  <div key={f.id} className="space-y-1.5">
                    <Label htmlFor={f.id}>{f.label}</Label>
                    <Input
                      id={f.id}
                      placeholder={f.ph}
                      value={profile[f.id as "firstName" | "lastName"]}
                      onChange={(e) => setField(f.id as "firstName" | "lastName")(e.target.value)}
                      required
                      aria-invalid={Boolean(fieldErrors[f.id])}
                    />
                    {fieldErrors[f.id] && (
                      <p className="text-error text-xs">{fieldErrors[f.id]}</p>
                    )}
                  </div>
                ))}
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="adaeze@example.com"
                    value={profile.email}
                    onChange={(e) => setField("email")(e.target.value)}
                    required
                    aria-invalid={Boolean(fieldErrors.email)}
                  />
                  {fieldErrors.email && <p className="text-error text-xs">{fieldErrors.email}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone">Phone (WhatsApp)</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+234 905 862 8386"
                    value={profile.phone}
                    onChange={(e) => setField("phone")(e.target.value)}
                    aria-invalid={Boolean(fieldErrors.phone)}
                  />
                  {fieldErrors.phone && <p className="text-error text-xs">{fieldErrors.phone}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="city">City / State</Label>
                  <Select value={profile.city} onValueChange={setField("city")}>
                    <SelectTrigger id="city" aria-invalid={Boolean(fieldErrors.city)}>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      {["Port Harcourt", "Lagos", "Abuja", "Ibadan", "Kano", "Outside Nigeria"].map(
                        (c) => (
                          <SelectItem key={c} value={c}>
                            {c}
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                  {fieldErrors.city && <p className="text-error text-xs">{fieldErrors.city}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="experience">Prior experience</Label>
                  <Select value={profile.experience} onValueChange={setField("experience")}>
                    <SelectTrigger id="experience" aria-invalid={Boolean(fieldErrors.experience)}>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      {["No experience", "Less than 1 year", "1–3 years", "3+ years"].map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldErrors.experience && (
                    <p className="text-error text-xs">{fieldErrors.experience}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="mt-6 flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => {
                setFieldErrors({});
                setStep(0);
              }}
              disabled={step === 0}
            >
              <ArrowLeft className="size-4" /> Back
            </Button>
            {step === 0 ? (
              <Button
                onClick={() => {
                  if (validateStep(0)) setStep(1);
                }}
                disabled={!programSlug}
              >
                Continue <ArrowRight className="size-4" />
              </Button>
            ) : (
              <Button onClick={submit} disabled={submitting}>
                {submitting ? "Submitting…" : "Submit application"} <ArrowRight className="size-4" />
              </Button>
            )}
          </div>

          {submitError && (
            <p className="text-error bg-error/10 mt-4 rounded-md px-3 py-2 text-sm">{submitError}</p>
          )}
        </div>
      </section>
    </PageShell>
  );
}
