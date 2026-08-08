import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Loader2,
  MessageCircle,
  Send,
  Star,
  ThumbsUp,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { PageShell, PageHero, CTASection } from "@/components/marketing/shell";
import { Reveal } from "@/components/motion";
import { cn } from "@/lib/utils";
import { submitContact } from "@/lib/api/marketing";

export const Route = createFileRoute("/visit/feedback")({
  head: () => ({
    meta: [
      { title: "Visit Feedback — Cyber Elias Academy" },
      {
        name: "description",
        content:
          "Tell us how your visit to Cyber Elias Academy went. Your feedback shapes every open day and campus tour.",
      },
    ],
  }),
  component: VisitFeedbackPage,
});

const quickRatings = ["Excellent", "Good", "Average", "Poor"];

function VisitFeedbackPage() {
  const [rating, setRating] = useState(0);
  const [impression, setImpression] = useState("Excellent");
  const [whatStoodOut, setWhatStoodOut] = useState("");
  const [improvements, setImprovements] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const submit = useMutation({
    mutationFn: async (data: { name: string; email: string; message: string }) => {
      return submitContact(data);
    },
    onSuccess: () => {
      setSent(true);
    },
    onError: (err) => {
      setError(err instanceof Error ? err.message : "Could not submit feedback.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (rating === 0) {
      setError("Please select a rating.");
      return;
    }
    if (!name.trim() || !email.trim()) {
      setError("Name and email are required.");
      return;
    }
    const message = `Visit feedback (${rating}/5): ${impression}\n\nWhat stood out: ${whatStoodOut}\n\nImprovements: ${improvements}`;
    submit.mutate({ name: name.trim(), email: email.trim(), message });
  };

  return (
    <PageShell>
      <PageHero
        eyebrow="Post-visit feedback"
        title={
          <>
            How was your <span className="text-gradient">visit?</span>
          </>
        }
        description="Two minutes, honest answers. Your feedback shapes every open day, tour and welcome we run."
      />

      <section className="container-page pb-20">
        <div className="mx-auto grid max-w-4xl gap-6 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <Card className="bg-card shadow-soft border">
              <CardContent className="p-6 sm:p-8">
                {sent ? (
                  <div className="py-8 text-center">
                    <span className="bg-success/10 text-success mx-auto grid size-14 place-items-center rounded-full">
                      <CheckCircle2 className="size-7" />
                    </span>
                    <h2 className="font-display mt-4 text-xl font-extrabold">Thank you!</h2>
                    <p className="text-muted-foreground mx-auto mt-2 max-w-sm text-sm">
                      Your feedback goes straight to the visitor experience team. We read every
                      single response.
                    </p>
                    <div className="mt-6 flex flex-wrap justify-center gap-3">
                      <Button asChild className="bg-gradient-brand shadow-glow border-0">
                        <Link to="/apply">
                          Start your application <ArrowRight className="ml-1.5 size-4" />
                        </Link>
                      </Button>
                      <Button asChild variant="outline">
                        <Link to="/visit">Plan another visit</Link>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <Label htmlFor="f-name">Your name</Label>
                        <Input
                          id="f-name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your name"
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="f-email">Email</Label>
                        <Input
                          id="f-email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          type="email"
                          placeholder="you@example.com"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label>How would you rate your visit?</Label>
                      <div className="mt-3 flex gap-2">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <button
                            key={n}
                            type="button"
                            onClick={() => setRating(n)}
                            className={cn(
                              "grid size-11 place-items-center rounded-xl border transition-colors",
                              rating >= n
                                ? "border-primary bg-primary/10 text-primary"
                                : "bg-background text-muted-foreground hover:border-primary/40",
                            )}
                          >
                            <Star className={cn("size-5", rating >= n && "fill-current")} />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label>Overall impression</Label>
                      <RadioGroup
                        value={impression}
                        onValueChange={setImpression}
                        className="mt-2 flex flex-wrap gap-2"
                      >
                        {quickRatings.map((r) => (
                          <label
                            key={r}
                            className="flex cursor-pointer items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5"
                          >
                            <RadioGroupItem value={r} id={r} className="size-4" />
                            {r}
                          </label>
                        ))}
                      </RadioGroup>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="f-what">What stood out?</Label>
                      <Textarea
                        id="f-what"
                        value={whatStoodOut}
                        onChange={(e) => setWhatStoodOut(e.target.value)}
                        rows={3}
                        placeholder="The lab tour was… the demo day was…"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="f-improve">What could we do better?</Label>
                      <Textarea
                        id="f-improve"
                        value={improvements}
                        onChange={(e) => setImprovements(e.target.value)}
                        rows={3}
                        placeholder="Optional — honest answers welcome"
                      />
                    </div>

                    {error && (
                      <p className="bg-error/10 text-error rounded-lg px-3 py-2 text-xs font-semibold">
                        {error}
                      </p>
                    )}

                    <Button
                      type="submit"
                      disabled={submit.isPending}
                      className="bg-gradient-brand shadow-glow w-full border-0"
                    >
                      {submit.isPending && <Loader2 className="mr-1.5 size-4 animate-spin" />}
                      <Send className="mr-1.5 size-4" /> Submit feedback
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </Reveal>

          <div className="space-y-5">
            <Reveal delay={0.1}>
              <Card className="bg-card shadow-soft border">
                <CardContent className="p-6">
                  <ThumbsUp className="text-primary size-5" />
                  <p className="font-display mt-3 text-base font-extrabold">What visitors say</p>
                  <div className="mt-4 space-y-4">
                    {[
                      {
                        name: "First visitor",
                        visit: "Open day · Cohort 01",
                        text: "Your quote could live here after the first open day — with your name, if you like.",
                      },
                    ].map((t) => (
                      <div key={t.name} className="rounded-xl border p-4">
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((n) => (
                            <Star key={n} className="text-warning size-3.5 fill-current" />
                          ))}
                        </div>
                        <p className="mt-2 text-sm leading-relaxed">"{t.text}"</p>
                        <p className="text-muted-foreground mt-2 text-xs font-semibold">
                          {t.name} · {t.visit}
                        </p>
                      </div>
                    ))}
                  </div>
                  <p className="text-muted-foreground mt-4 text-xs">
                    We publish real feedback from real visitors — starting with our first open day.
                  </p>
                </CardContent>
              </Card>
            </Reveal>

            <Reveal delay={0.15}>
              <Card className="bg-gradient-ink text-ink-foreground shadow-elevated border-0">
                <CardContent className="p-6">
                  <MessageCircle className="text-success size-5" />
                  <p className="font-display mt-3 text-base font-extrabold">
                    Prefer to talk it through?
                  </p>
                  <p className="text-ink-foreground/70 mt-1 text-sm">
                    WhatsApp our front desk on +234 801 234 5678 — a real person replies.
                  </p>
                  <Badge className="bg-ink-foreground/15 text-ink-foreground mt-4 border-0 font-semibold">
                    Mon–Sat · 9am–6pm
                  </Badge>
                </CardContent>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>

      <CTASection />
    </PageShell>
  );
}
