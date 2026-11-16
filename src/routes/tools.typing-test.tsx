import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { ArrowLeft, Keyboard } from "lucide-react";
import { PageShell, PageHero, CTASection, Eyebrow } from "@/components/marketing/shell";
import { TypingTest } from "@/components/tools/typing-test";
import { getPageHead } from "@/lib/seo";

export const Route = createFileRoute("/tools/typing-test")({
  head: () =>
    getPageHead({
      title: "Typing Test — Check Your WPM Online Free",
      description:
        "Free monkeytype-style typing speed test: timed 15–120s common-word runs, home-row and number drills, passages, live WPM, accuracy and consistency. History saved on your device.",
      path: "/tools/typing-test",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "CEA Typing Test",
        applicationCategory: "EducationalApplication",
        operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "NGN" },
      },
    }),
  component: TypingTestPage,
});

function TypingTestPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Free tool · Typing speed"
        title={
          <>
            Type fast.{" "}
            <span className="font-serif text-primary font-normal italic">Type clean.</span>
          </>
        }
        description="How fast can you type right now? Pick a mode, click the text and go — live WPM, accuracy and consistency, with your history saved on this device."
        meta={["15–120s tests", "Home-row drills", "Accuracy + consistency"]}
      >
        <Link
          to="/tools"
          className="text-muted-foreground hover:text-foreground mt-6 inline-flex items-center gap-1.5 text-sm font-medium"
        >
          <ArrowLeft className="size-4" /> All tools
        </Link>
      </PageHero>

      <section className="container-page py-12 md:py-16" aria-label="Typing test">
        <TypingTest />

        <div className="mx-auto mt-12 max-w-3xl">
          <Eyebrow>
            <Keyboard className="size-3.5" aria-hidden="true" /> How to read your result
          </Eyebrow>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {[
              [
                "Under 25 wpm",
                "Nascent typist. Cover the keyboard with a cloth, relearn home-row first, and do one drill a day.",
              ],
              [
                "25–45 wpm",
                "Working speed. The office threshold is ~40 wpm. Accuracy over speed — errors cost more than keystrokes.",
              ],
              [
                "60+ wpm",
                "Professional speed. You out-type most of the workforce. Keep the accuracy above 95%.",
              ],
            ].map(([range, advice]) => (
              <div key={range} className="border-foreground/10 bg-card rounded-2xl border p-5">
                <p className="font-display text-lg font-semibold tracking-tight tabular-nums">
                  {range}
                </p>
                <p className="text-muted-foreground mt-2 text-[13px] leading-relaxed">{advice}</p>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground mt-6 text-sm leading-relaxed">
            Training the keyboard is one of the twelve modules in the CEA{" "}
            <Link
              to="/classes/computer-basics-typing"
              className="text-primary font-semibold hover:underline"
            >
              Computer Basics &amp; Typing
            </Link>{" "}
            course — two sessions a week, teacher in the room, at 24 Ebony Road.
          </p>
        </div>
      </section>

      <CTASection
        title="Stuck below 40? That's a solvable problem."
        description="The Computer Basics & Typing course takes you from hunt-and-peck to confident typing — plus files, email, Office and safer browsing. Two sessions a week."
        primary={{ label: "See the course", to: "/classes/computer-basics-typing" }}
        secondary={{ label: "Apply for admission", to: "/apply" }}
      />
    </PageShell>
  );
}
