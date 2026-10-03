"use client";

import { useState } from "react";
import { ArrowLeft, CheckCircle2, Loader2, Send } from "lucide-react";
import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { useTurnstile } from "@/components/turnstile";
import { PageHero, PageShell } from "@/components/marketing/shell";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { submitProjectRequest, type ProjectRequestInput } from "@/lib/api/businessIntake";
import { ApiError } from "@/lib/errors";
import { getPageHead } from "@/lib/seo";

export const Route = createFileRoute("/request-project")({
  head: () =>
    getPageHead({
      title: "Request a website, app or digital project",
      description:
        "Share the goal, timing and investment range for your digital project with Cyber Elias Academy.",
      path: "/request-project",
    }),
  component: RequestProjectPage,
});

type FormState = ProjectRequestInput;
const emptyForm: FormState = {
  fullName: "",
  email: "",
  phone: "",
  organization: "",
  projectType: "website",
  brief: "",
  budgetRange: "undecided",
  timeline: "flexible",
  privacyConsent: false,
  contactWebsite: "",
};

function RequestProjectPage() {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [reference, setReference] = useState("");
  const turnstile = useTurnstile();

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((current) => ({ ...current, [key]: value }));

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSending(true);
    setError("");
    try {
      const result = await submitProjectRequest({ ...form, turnstileToken: turnstile.token });
      setReference(result.ref);
    } catch (reason) {
      turnstile.reset();
      setError(
        reason instanceof ApiError
          ? reason.message
          : "We could not send your brief. Please try again.",
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <PageShell>
      <PageHero
        eyebrow="Project request"
        title="Tell us what you need built or improved."
        description="Share the essentials. We will review the goal, budget range and timeline, then follow up using the contact details you provide. You do not need a finished specification."
      />
      <section className="container-page grid gap-8 py-10 md:grid-cols-[minmax(0,1fr)_19rem] md:py-14">
        <div className="border-border bg-card rounded-2xl border p-5 shadow-sm sm:p-8">
          {reference ? (
            <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
              <span className="bg-success/10 text-success grid size-14 place-items-center rounded-full">
                <CheckCircle2 className="size-7" />
              </span>
              <h2 className="font-display mt-5 text-2xl font-semibold">
                Your project brief is with our team.
              </h2>
              <p className="text-muted-foreground mt-2 max-w-md text-sm leading-relaxed">
                We have recorded your request. Keep this reference if you contact us about it; the
                team will follow up using the details you supplied.
              </p>
              <div className="bg-muted mt-6 rounded-xl px-5 py-3 text-sm">
                <span className="text-muted-foreground mr-2">Reference</span>
                <strong className="font-mono tracking-wide">{reference}</strong>
              </div>
              <Button asChild variant="outline" className="mt-7">
                <Link to="/services">Back to services</Link>
              </Button>
            </div>
          ) : (
            <form className="space-y-5" onSubmit={submit}>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="project-name">Your name</Label>
                  <Input
                    id="project-name"
                    autoComplete="name"
                    required
                    maxLength={120}
                    value={form.fullName}
                    onChange={(e) => update("fullName", e.target.value)}
                    disabled={sending}
                    placeholder="Ada Obi"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project-email">Email</Label>
                  <Input
                    id="project-email"
                    type="email"
                    autoComplete="email"
                    required
                    maxLength={254}
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    disabled={sending}
                    placeholder="you@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project-phone">
                    Phone / WhatsApp{" "}
                    <span className="text-muted-foreground font-normal">(optional)</span>
                  </Label>
                  <Input
                    id="project-phone"
                    type="tel"
                    autoComplete="tel"
                    maxLength={30}
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    disabled={sending}
                    placeholder="+234…"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project-organisation">
                    Organisation{" "}
                    <span className="text-muted-foreground font-normal">(optional)</span>
                  </Label>
                  <Input
                    id="project-organisation"
                    autoComplete="organization"
                    maxLength={160}
                    value={form.organization}
                    onChange={(e) => update("organization", e.target.value)}
                    disabled={sending}
                    placeholder="Company or team name"
                  />
                </div>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="project-type">What kind of project?</Label>
                  <Select
                    value={form.projectType}
                    onValueChange={(value) =>
                      update("projectType", value as FormState["projectType"])
                    }
                  >
                    <SelectTrigger id="project-type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="website">Website</SelectItem>
                      <SelectItem value="web_app">Web application or portal</SelectItem>
                      <SelectItem value="mobile_app">Mobile app</SelectItem>
                      <SelectItem value="internal_tool">Internal business tool</SelectItem>
                      <SelectItem value="automation">Workflow automation or integration</SelectItem>
                      <SelectItem value="consulting">Technical discovery or consulting</SelectItem>
                      <SelectItem value="other">Other digital project</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project-budget">Indicative budget (NGN)</Label>
                  <Select
                    value={form.budgetRange}
                    onValueChange={(value) =>
                      update("budgetRange", value as FormState["budgetRange"])
                    }
                  >
                    <SelectTrigger id="project-budget">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="undecided">Not decided yet</SelectItem>
                      <SelectItem value="under_250k">Under ₦250,000</SelectItem>
                      <SelectItem value="250k_750k">₦250,000–₦750,000</SelectItem>
                      <SelectItem value="750k_2m">₦750,000–₦2,000,000</SelectItem>
                      <SelectItem value="2m_plus">Over ₦2,000,000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="project-timeline">When are you hoping to start?</Label>
                <Select
                  value={form.timeline}
                  onValueChange={(value) => update("timeline", value as FormState["timeline"])}
                >
                  <SelectTrigger id="project-timeline">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asap">As soon as practical</SelectItem>
                    <SelectItem value="one_to_three_months">Within 1–3 months</SelectItem>
                    <SelectItem value="three_to_six_months">Within 3–6 months</SelectItem>
                    <SelectItem value="six_plus_months">More than 6 months</SelectItem>
                    <SelectItem value="flexible">Flexible / exploring</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="project-brief">What are you trying to achieve?</Label>
                <Textarea
                  id="project-brief"
                  required
                  minLength={30}
                  maxLength={5000}
                  rows={7}
                  className="resize-y"
                  value={form.brief}
                  onChange={(e) => update("brief", e.target.value)}
                  disabled={sending}
                  placeholder="Who will use it? What should it help them do? What is frustrating or missing today? Include any must-have features or constraints you already know."
                />
                <p className="text-muted-foreground text-xs">
                  A few sentences is enough to start. Do not include passwords, payment details or
                  other sensitive information.
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <Checkbox
                  id="project-consent"
                  checked={form.privacyConsent}
                  onCheckedChange={(value) => update("privacyConsent", value === true)}
                />
                <Label
                  htmlFor="project-consent"
                  className="text-muted-foreground cursor-pointer text-sm font-normal leading-relaxed"
                >
                  I agree that Cyber Elias Academy may use these details to review and respond to
                  this project request. See the{" "}
                  <Link to="/privacy" className="text-primary underline underline-offset-2">
                    privacy notice
                  </Link>
                  .
                </Label>
              </div>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-[10000px] top-auto h-px w-px overflow-hidden"
              >
                <label htmlFor="project-contact-website">Leave this field empty</label>
                <input
                  id="project-contact-website"
                  name="contactWebsite"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.contactWebsite ?? ""}
                  onChange={(e) => update("contactWebsite", e.target.value)}
                />
              </div>
              <turnstile.Widget />
              {error && (
                <p role="alert" className="text-error bg-error/10 rounded-md px-3 py-2 text-sm">
                  {error}
                </p>
              )}
              <Button
                type="submit"
                className="w-full sm:w-auto"
                disabled={sending || !turnstile.ready || !form.privacyConsent}
              >
                {sending ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Send className="size-4" />
                )}
                {sending ? "Sending brief…" : "Send project brief"}
              </Button>
            </form>
          )}
        </div>
        <aside className="space-y-4">
          <div className="bg-muted/40 rounded-2xl border p-5">
            <h2 className="font-display font-semibold">What happens next?</h2>
            <ol className="text-muted-foreground mt-3 space-y-3 text-sm leading-relaxed">
              <li>
                <span className="text-foreground font-semibold">1.</span> We review your goals,
                budget and timing.
              </li>
              <li>
                <span className="text-foreground font-semibold">2.</span> We contact you to clarify
                anything important.
              </li>
              <li>
                <span className="text-foreground font-semibold">3.</span> If there is a fit, we
                agree a written scope before work begins.
              </li>
            </ol>
          </div>
          <div className="rounded-2xl border p-5">
            <p className="text-muted-foreground text-sm leading-relaxed">
              Not sure whether your idea is a website, an app or something else? Choose “Other” or
              “Technical discovery” and describe the outcome you want.
            </p>
            <Button asChild variant="link" className="mt-2 h-auto px-0">
              <Link to="/services">
                <ArrowLeft className="size-4" />
                View services
              </Link>
            </Button>
          </div>
        </aside>
      </section>
    </PageShell>
  );
}
