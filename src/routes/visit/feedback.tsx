import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { CheckCircle2, Loader2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PageShell, PageHero, CTASection } from "@/components/marketing/shell";
import { cn } from "@/lib/utils";
import { submitContact } from "@/lib/api/marketing";
import { getPageHead } from "@/lib/seo";

export const Route = createFileRoute("/visit/feedback")({
  head: () =>
    getPageHead({
      title: "Visit feedback — Cyber Elias Academy",
      description: "Tell us how your visit to Cyber Elias Academy went.",
      path: "/visit/feedback",
    }),
  component: VisitFeedbackPage,
});

function VisitFeedbackPage() {
  const [rating, setRating] = useState(0);
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
    onSuccess: () => setSent(true),
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
    const message = `Visit feedback (${rating}/5)\n\nWhat stood out: ${whatStoodOut}\n\nImprovements: ${improvements}`;
    submit.mutate({ name: name.trim(), email: email.trim(), message });
  };

  return (
    <PageShell>
      <PageHero
        eyebrow="Feedback"
        title="How was your visit?"
        description="A short note helps us run the centre better. We do not publish visitor quotes we have not received."
      />

      <section className="container-page pb-16">
        <div className="mx-auto max-w-xl">
          {sent ? (
            <div className="border-border rounded-lg border p-8 text-center">
              <span className="bg-success/10 text-success mx-auto grid size-12 place-items-center rounded-full">
                <CheckCircle2 className="size-6" />
              </span>
              <h2 className="font-display mt-4 text-xl font-semibold">Thank you</h2>
              <p className="text-muted-foreground mt-2 text-sm">We read every response.</p>
              <Button asChild variant="outline" className="mt-6">
                <Link to="/classes">View courses</Link>
              </Button>
            </div>
          ) : (
            <form className="border-border space-y-6 rounded-lg border p-6 sm:p-8" onSubmit={handleSubmit}>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="f-name">Your name</Label>
                  <Input
                    id="f-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                    required
                  />
                </div>
              </div>

              <div>
                <Label>Rating</Label>
                <div className="mt-3 flex gap-2">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setRating(n)}
                      className={cn(
                        "grid size-10 place-items-center rounded-lg border",
                        rating >= n
                          ? "border-primary bg-primary/10 text-primary"
                          : "text-muted-foreground",
                      )}
                    >
                      <Star className={cn("size-4", rating >= n && "fill-current")} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="f-what">What stood out?</Label>
                <Textarea
                  id="f-what"
                  value={whatStoodOut}
                  onChange={(e) => setWhatStoodOut(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="f-improve">What could we do better?</Label>
                <Textarea
                  id="f-improve"
                  value={improvements}
                  onChange={(e) => setImprovements(e.target.value)}
                  rows={3}
                />
              </div>

              {error && <p className="text-error text-sm">{error}</p>}

              <Button type="submit" disabled={submit.isPending} className="w-full">
                {submit.isPending && <Loader2 className="size-4 animate-spin" />}
                Send
              </Button>
            </form>
          )}
        </div>
      </section>

      <CTASection />
    </PageShell>
  );
}
