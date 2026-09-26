import { useTurnstile } from "@/components/turnstile";
import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Mail, MapPin, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { CTASection, PageHero, PageShell } from "@/components/marketing/shell";
import { CampusImg } from "@/components/marketing/photos";
import { submitContact } from "@/lib/api/marketing";
import { ApiError } from "@/lib/errors";
import { getPageHead } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () =>
    getPageHead({
      title: "Contact — Cyber Elias Academy",
      description:
        "Contact Cyber Elias Academy in Port Harcourt: 26 Ebony Road, +234 905 862 8386, hello@cea.ng.",
      path: "/contact",
    }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    topic: "",
    message: "",
  });

  const turnstile = useTurnstile();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError(null);
    try {
      await submitContact({
        name: form.name,
        email: form.email,
        message: `${form.topic ? `[${form.topic}] ` : ""}${form.message}`,
        turnstileToken: turnstile.token,
      });
      setSent(true);
    } catch (err) {
      turnstile.reset();
      setError(err instanceof ApiError ? err.message : "We couldn't send your message. Try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <PageShell>
      <PageHero
        eyebrow="Contact"
        title="Talk to us"
        description="Admissions, a course question, or a visit to the centre. We reply on working days."
      />

      <section className="container-page grid gap-10 py-16 lg:grid-cols-[0.85fr_1.15fr] md:py-20">
        <div className="space-y-6 text-sm leading-relaxed">
          <figure className="border-border overflow-hidden rounded-lg border">
            <CampusImg id="lab-1" className="aspect-[16/10]" />
            <figcaption className="text-muted-foreground px-3 py-2 text-xs">
              Classroom, 26 Ebony Road
            </figcaption>
          </figure>
          <div>
            <h2 className="font-display flex items-center gap-2 text-base font-semibold">
              <MapPin className="size-4" /> Centre
            </h2>
            <p className="text-muted-foreground mt-2">
              26 Ebony Road, Off Rumuola Road
              <br />
              Port Harcourt, Rivers State, Nigeria
            </p>
          </div>
          <div>
            <h2 className="font-display flex items-center gap-2 text-base font-semibold">
              <Phone className="size-4" /> Phone
            </h2>
            <p className="text-muted-foreground mt-2">
              <a href="tel:+2349058628386" className="hover:text-foreground">
                +234 905 862 8386
              </a>
              <br />
              Mon–Sat, 8:00–20:00 WAT
            </p>
          </div>
          <div>
            <h2 className="font-display flex items-center gap-2 text-base font-semibold">
              <Mail className="size-4" /> Email
            </h2>
            <p className="text-muted-foreground mt-2">
              <a href="mailto:hello@cea.ng" className="hover:text-foreground">
                hello@cea.ng
              </a>
            </p>
          </div>
        </div>

        <div className="border-border bg-card rounded-lg border p-6 sm:p-8">
          {sent ? (
            <div className="flex min-h-[320px] flex-col items-center justify-center text-center">
              <span className="bg-success/10 text-success grid size-12 place-items-center rounded-full">
                <CheckCircle2 className="size-6" />
              </span>
              <h3 className="font-display mt-5 text-xl font-semibold">Message sent</h3>
              <p className="text-muted-foreground mt-2 max-w-sm text-sm leading-relaxed">
                Thank you. We will reply on a working day.
              </p>
              <Button asChild variant="outline" className="mt-6">
                <Link to="/classes">View courses</Link>
              </Button>
            </div>
          ) : (
            <form className="space-y-5" onSubmit={submit}>
              <h3 className="font-display text-lg font-semibold">Send a message</h3>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full name</Label>
                  <Input
                    id="name"
                    required
                    placeholder="Ada Obi"
                    className="h-11"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    disabled={sending}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    placeholder="ada@email.com"
                    className="h-11"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    disabled={sending}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="topic">What is this about?</Label>
                <Select
                  value={form.topic || undefined}
                  onValueChange={(t) => setForm((f) => ({ ...f, topic: t }))}
                >
                  <SelectTrigger id="topic" className="h-11">
                    <SelectValue placeholder="Choose a topic" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "Admissions",
                      "A course question",
                      "Visiting the centre",
                      "Accessibility",
                      "Something else",
                    ].map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  required
                  rows={6}
                  placeholder="How can we help?"
                  className="resize-none"
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  disabled={sending}
                />
              </div>
              {error && (
                <p className="text-error bg-error/10 rounded-md px-3 py-2 text-sm">{error}</p>
              )}
              <turnstile.Widget />
              <Button type="submit" className="w-full" disabled={sending || !turnstile.ready}>
                <Send className="size-4" /> {sending ? "Sending…" : "Send message"}
              </Button>
            </form>
          )}
        </div>
      </section>

      <CTASection
        title="Prefer to apply directly?"
        description="Choose a course and send your details."
        primary={{ label: "Apply", to: "/apply" }}
        secondary={{ label: "View courses", to: "/classes" }}
      />
    </PageShell>
  );
}
