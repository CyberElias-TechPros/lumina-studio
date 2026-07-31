import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
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
import { CTASection, PageHero, PageShell, SectionHeading } from "@/components/marketing/shell";
import { Reveal } from "@/components/motion";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Cyber Elias Academy" },
      {
        name: "description",
        content:
          "Talk to admissions, request a quote, book a campus tour or partner with Cyber Elias Academy. We reply within one working day.",
      },
    ],
  }),
  component: Contact,
});

const channels = [
  {
    icon: MapPin,
    title: "Campus",
    lines: ["Port Harcourt, Rivers State", "Nigeria"],
  },
  {
    icon: Phone,
    title: "Phone",
    lines: ["+234 800 000 0000", "Mon–Sat, 8:00–20:00 WAT"],
  },
  {
    icon: Mail,
    title: "Email",
    lines: ["hello@cyberelias.academy", "admissions@cyberelias.academy"],
  },
  {
    icon: Clock,
    title: "Response time",
    lines: ["Admissions: within 24h", "Partnerships: within 48h"],
  },
];

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <PageShell>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Talk to a <span className="text-gradient">human</span>
          </>
        }
        description="Admissions questions, project briefs, partnership ideas or a campus tour — pick a channel and we'll reply within one working day."
      />

      <section className="container-page py-16 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <SectionHeading
              eyebrow="Reach us"
              title="Every channel, one promise"
              description="No bots, no ticket queues for humans. Real people, real answers."
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {channels.map((c) => (
                <Reveal key={c.title}>
                  <div className="bg-card shadow-soft h-full rounded-2xl border p-6">
                    <c.icon className="text-primary size-5" />
                    <h3 className="font-display mt-3 text-base font-bold">{c.title}</h3>
                    {c.lines.map((l) => (
                      <p key={l} className="text-muted-foreground mt-1 text-sm">
                        {l}
                      </p>
                    ))}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={0.1}>
            <div className="bg-card shadow-soft rounded-3xl border p-8">
              {sent ? (
                <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                  <span className="bg-success/10 text-success grid size-16 place-items-center rounded-full">
                    <CheckCircle2 className="size-8" />
                  </span>
                  <h3 className="font-display mt-6 text-2xl font-extrabold">Message sent</h3>
                  <p className="text-muted-foreground mt-2 max-w-sm text-sm leading-relaxed">
                    Thanks for reaching out. A real human will reply within one working day —
                    usually much faster.
                  </p>
                  <Button asChild variant="outline" className="mt-6">
                    <Link to="/programs">Browse programs while you wait</Link>
                  </Button>
                </div>
              ) : (
                <form
                  className="space-y-5"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSent(true);
                  }}
                >
                  <div className="flex items-center gap-2">
                    <MessageSquare className="text-primary size-5" />
                    <h3 className="font-display text-xl font-bold">Send us a message</h3>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full name</Label>
                      <Input id="name" required placeholder="Ada Obi" className="h-11" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        placeholder="ada@email.com"
                        className="h-11"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="topic">What's this about?</Label>
                    <Select>
                      <SelectTrigger id="topic" className="h-11">
                        <SelectValue placeholder="Choose a topic" />
                      </SelectTrigger>
                      <SelectContent>
                        {[
                          "Admissions & applications",
                          "Scholarships & funding",
                          "Client project / services",
                          "Employer partnership",
                          "Institution / NGO / government",
                          "Campus tour",
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
                      placeholder="Tell us what you need…"
                      className="resize-none"
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="bg-gradient-brand shadow-glow w-full border-0"
                  >
                    <Send className="mr-2 size-4" /> Send message
                  </Button>
                  <p className="text-muted-foreground text-center text-xs">
                    We'll only use your details to reply. No spam, ever.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-muted/40 border-y py-16">
        <div className="container-page flex flex-wrap items-center justify-center gap-3 text-center">
          <Badge variant="secondary" className="px-4 py-2 font-semibold">
            Quick answers →
          </Badge>
          <Link to="/admissions" className="text-primary hover:underline text-sm font-semibold">
            How to apply
          </Link>
          <span className="text-muted-foreground">·</span>
          <Link to="/pricing" className="text-primary hover:underline text-sm font-semibold">
            Tuition & payment plans
          </Link>
          <span className="text-muted-foreground">·</span>
          <Link to="/scholarships" className="text-primary hover:underline text-sm font-semibold">
            Scholarships
          </Link>
          <span className="text-muted-foreground">·</span>
          <Link to="/visit" className="text-primary hover:underline text-sm font-semibold">
            Book a campus tour
          </Link>
        </div>
      </section>

      <CTASection
        title="Prefer to start now?"
        description="Most questions answer themselves once you see the programs and the process."
        primary={{ label: "Browse programs", to: "/programs" }}
        secondary={{ label: "Start an application", to: "/apply" }}
      />
    </PageShell>
  );
}
