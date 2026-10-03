"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
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
import { submitPartnerApplication, type PartnerApplicationInput } from "@/lib/api/businessIntake";
import { ApiError } from "@/lib/errors";
import { getPageHead } from "@/lib/seo";

export const Route = createFileRoute("/partners/apply")({
  head: () => ({
    ...getPageHead({
      title: "Apply to partner with Cyber Elias Academy",
      description: "Send a partnership proposal to the Cyber Elias Academy team for review.",
      path: "/partners/apply",
      noIndex: true,
    }),
  }),
  component: PartnerApplicationPage,
});

type FormState = PartnerApplicationInput;
const emptyForm: FormState = {
  contactName: "",
  email: "",
  phone: "",
  organization: "",
  website: "",
  partnershipType: "education",
  region: "",
  capabilities: "",
  proposal: "",
  privacyConsent: false,
  contactWebsite: "",
};

function PartnerApplicationPage() {
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
      const result = await submitPartnerApplication({ ...form, turnstileToken: turnstile.token });
      setReference(result.ref);
    } catch (reason) {
      turnstile.reset();
      setError(
        reason instanceof ApiError
          ? reason.message
          : "We could not send your application. Please try again.",
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <PageShell>
      <PageHero
        eyebrow="Partner application"
        title="Propose a collaboration with a clear purpose."
        description="Share who you are, what your organisation can contribute and the outcome you would like to explore together. Applications are reviewed by the academy team; submission is not automatic approval."
      />
      <section className="container-page grid gap-8 py-10 md:grid-cols-[minmax(0,1fr)_18rem] md:py-14">
        <div className="border-border bg-card rounded-2xl border p-5 shadow-sm sm:p-8">
          {reference ? (
            <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
              <span className="bg-success/10 text-success grid size-14 place-items-center rounded-full">
                <CheckCircle2 className="size-7" />
              </span>
              <h2 className="font-display mt-5 text-2xl font-semibold">
                Your application has been received.
              </h2>
              <p className="text-muted-foreground mt-2 max-w-md text-sm leading-relaxed">
                The team will review the proposal and contact you if it needs clarification or is
                ready for a next step. This receipt is not an approval.
              </p>
              <div className="bg-muted mt-6 rounded-xl px-5 py-3 text-sm">
                <span className="text-muted-foreground mr-2">Reference</span>
                <strong className="font-mono tracking-wide">{reference}</strong>
              </div>
              <Button asChild variant="outline" className="mt-7">
                <Link to="/partners">Back to partnerships</Link>
              </Button>
            </div>
          ) : (
            <form className="space-y-5" onSubmit={submit}>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="partner-contact">Your name</Label>
                  <Input
                    id="partner-contact"
                    autoComplete="name"
                    required
                    maxLength={120}
                    value={form.contactName}
                    onChange={(e) => update("contactName", e.target.value)}
                    disabled={sending}
                    placeholder="Chidi Okafor"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="partner-email">Email</Label>
                  <Input
                    id="partner-email"
                    type="email"
                    autoComplete="email"
                    required
                    maxLength={254}
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    disabled={sending}
                    placeholder="you@example.org"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="partner-phone">
                    Phone / WhatsApp{" "}
                    <span className="text-muted-foreground font-normal">(optional)</span>
                  </Label>
                  <Input
                    id="partner-phone"
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
                  <Label htmlFor="partner-organisation">Organisation</Label>
                  <Input
                    id="partner-organisation"
                    autoComplete="organization"
                    required
                    maxLength={160}
                    value={form.organization}
                    onChange={(e) => update("organization", e.target.value)}
                    disabled={sending}
                    placeholder="Organisation or company"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="partner-website">
                    Website <span className="text-muted-foreground font-normal">(optional)</span>
                  </Label>
                  <Input
                    id="partner-website"
                    type="url"
                    maxLength={300}
                    value={form.website}
                    onChange={(e) => update("website", e.target.value)}
                    disabled={sending}
                    placeholder="https://example.org"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="partner-region">City or region</Label>
                  <Input
                    id="partner-region"
                    autoComplete="address-level2"
                    required
                    maxLength={120}
                    value={form.region}
                    onChange={(e) => update("region", e.target.value)}
                    disabled={sending}
                    placeholder="Port Harcourt, Rivers State"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="partner-type">Partnership focus</Label>
                <Select
                  value={form.partnershipType}
                  onValueChange={(value) =>
                    update("partnershipType", value as FormState["partnershipType"])
                  }
                >
                  <SelectTrigger id="partner-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="education">Education / training</SelectItem>
                    <SelectItem value="employer">Employer / talent pathway</SelectItem>
                    <SelectItem value="technology">Technology / product</SelectItem>
                    <SelectItem value="ngo_community">NGO / community</SelectItem>
                    <SelectItem value="government">Government / public sector</SelectItem>
                    <SelectItem value="delivery_partner">
                      Delivery / implementation partner
                    </SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="partner-capabilities">
                  What relevant experience or capability would you bring?
                </Label>
                <Textarea
                  id="partner-capabilities"
                  required
                  minLength={30}
                  maxLength={4000}
                  rows={5}
                  className="resize-y"
                  value={form.capabilities}
                  onChange={(e) => update("capabilities", e.target.value)}
                  disabled={sending}
                  placeholder="Briefly describe your organisation, relevant experience, audience or specialist capability."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="partner-proposal">What would you like to do together?</Label>
                <Textarea
                  id="partner-proposal"
                  required
                  minLength={30}
                  maxLength={4000}
                  rows={5}
                  className="resize-y"
                  value={form.proposal}
                  onChange={(e) => update("proposal", e.target.value)}
                  disabled={sending}
                  placeholder="Who benefits? What could each side contribute? Is there a sensible first activity or pilot?"
                />
              </div>
              <div className="flex items-start gap-2.5">
                <Checkbox
                  id="partner-consent"
                  checked={form.privacyConsent}
                  onCheckedChange={(value) => update("privacyConsent", value === true)}
                />
                <Label
                  htmlFor="partner-consent"
                  className="text-muted-foreground cursor-pointer text-sm font-normal leading-relaxed"
                >
                  I agree that Cyber Elias Academy may use these details to assess and respond to
                  this partnership application. See the{" "}
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
                <label htmlFor="partner-contact-website">Leave this field empty</label>
                <input
                  id="partner-contact-website"
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
                {sending ? "Sending application…" : "Submit partnership application"}
              </Button>
            </form>
          )}
        </div>
        <aside className="space-y-4">
          <div className="bg-muted/40 rounded-2xl border p-5">
            <h2 className="font-display font-semibold">Review process</h2>
            <ol className="text-muted-foreground mt-3 space-y-3 text-sm leading-relaxed">
              <li>
                <span className="text-foreground font-semibold">1.</span> A reviewer checks the
                purpose, fit and contact details.
              </li>
              <li>
                <span className="text-foreground font-semibold">2.</span> The team may request a
                conversation or more information.
              </li>
              <li>
                <span className="text-foreground font-semibold">3.</span> After approval, an
                administrator can admit your organisation and provision a partner workspace account.
              </li>
            </ol>
          </div>
          <div className="rounded-2xl border p-5">
            <p className="text-muted-foreground text-sm leading-relaxed">
              Please do not include confidential, financial-account or special-category personal
              data in this form.
            </p>
          </div>
        </aside>
      </section>
    </PageShell>
  );
}
