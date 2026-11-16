import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import {
  ArrowRight,
  ArrowUpRight,
  Keyboard,
  Palette,
  ScrollText,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { PageHero, PageShell, CTASection, Eyebrow } from "@/components/marketing/shell";
import { getPageHead } from "@/lib/seo";

export const Route = createFileRoute("/tools/")({
  head: () =>
    getPageHead({
      title: "Free Student Tools — Typing Test, Word Counter & More",
      description:
        "Free tools from Cyber Elias Academy, Port Harcourt: a monkeytype-style typing speed test, word counter, password strength checker and WCAG contrast checker. No sign-up, no tracking of your content.",
      path: "/tools",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Free tools from Cyber Elias Academy",
      },
    }),
  component: ToolsPage,
});

const tools = [
  {
    to: "/tools/typing-test",
    icon: Keyboard,
    name: "Typing Test",
    headline: "Know your WPM. Beat it tomorrow.",
    blurb:
      "Timed common-word tests, home-row drills, number sprints and passages — live WPM, raw speed, accuracy and consistency. Best score saved on this device.",
    meta: "WPM · Accuracy · Consistency",
  },
  {
    to: "/tools/word-counter",
    icon: ScrollText,
    name: "Word Counter",
    headline: "Essays, emails and scripts, measured.",
    blurb:
      "Words, characters, sentences, paragraphs, reading and speaking time — plus the keywords you repeat. Everything runs locally.",
    meta: "Words · Reading time · Keywords",
  },
  {
    to: "/tools/password-strength",
    icon: ShieldCheck,
    name: "Password Strength",
    headline: "See your password the way an attacker does.",
    blurb:
      "Entropy, offline crack time, leaked-password check and a hardened generator. Your input never leaves the page.",
    meta: "Entropy · Crack time · Generator",
  },
  {
    to: "/tools/color-contrast",
    icon: Palette,
    name: "Colour Contrast & Palettes",
    headline: "Type people can actually read.",
    blurb:
      "WCAG AA/AAA contrast for any pair, live preview, eight designer presets — and a harmony-palette generator with one-click copy.",
    meta: "WCAG AA/AAA · Palettes",
  },
] as const;

function ToolsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Free tools · No sign-up"
        title={
          <>
            Sharp tools for{" "}
            <span className="font-serif text-primary font-normal italic">sharp students.</span>
          </>
        }
        description="The small software that makes practice stick: type faster, write tighter, stay safe online and design legibly. Free, fast, and nothing you type leaves your browser."
        meta={["4 tools", "100% client-side", "Free for everyone"]}
      />
      <section className="container-page py-14 md:py-20">
        <Eyebrow>The toolbox</Eyebrow>
        <ul className="mt-6 grid gap-5 sm:grid-cols-2">
          {tools.map((tool) => (
            <li key={tool.to}>
              <Link
                to={tool.to}
                className="card-lift border-foreground/10 bg-card group flex h-full flex-col rounded-2xl border p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                    <tool.icon className="size-6" aria-hidden="true" />
                  </span>
                  <ArrowUpRight
                    className="text-muted-foreground size-5 shrink-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
                    aria-hidden="true"
                  />
                </div>
                <p className="text-primary mt-5 font-mono text-[9px] tracking-[0.24em] uppercase">
                  {tool.name}
                </p>
                <h2 className="font-display mt-2 text-2xl leading-snug font-semibold tracking-tight">
                  {tool.headline}
                </h2>
                <p className="text-muted-foreground mt-3 flex-1 text-sm leading-relaxed">
                  {tool.blurb}
                </p>
                <p className="border-foreground/10 text-muted-foreground mt-5 border-t pt-4 font-mono text-[9px] tracking-[0.2em] uppercase">
                  {tool.meta}
                </p>
              </Link>
            </li>
          ))}
        </ul>

        {/* Cross-link into the AI track */}
        <Link
          to="/ai-engineering"
          className="card-lift mt-5 flex flex-col gap-4 rounded-2xl border border-[#2f6bff]/30 bg-[linear-gradient(135deg,#0a1326_0%,#0d1830_60%,#101a3a_100%)] p-6 text-[#eef2fb] sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-start gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[#2f6bff]/20 text-[#8ec4ff]">
              <Sparkles className="size-6" aria-hidden="true" />
            </span>
            <span>
              <span className="font-mono text-[9px] tracking-[0.24em] text-[#7fb5ff] uppercase">
                Graduate from tools to AI
              </span>
              <span className="font-display mt-1.5 block text-xl font-semibold tracking-tight text-white">
                AI Engineering from Scratch — 542 free lessons
              </span>
              <span className="mt-1 block text-sm text-[#a9bcd6]">
                The MIT-licensed open curriculum, curated for CEA learners — with an interactive lab
                and the paths professionals actually take.
              </span>
            </span>
          </div>
          <ArrowRight
            className="size-5 shrink-0 self-end text-[#8ec4ff] sm:self-center"
            aria-hidden="true"
          />
        </Link>
      </section>
      <CTASection
        title="Free tools are the appetiser. Class is the meal."
        description="Two sessions a week at 24 Ebony Road. Small groups, real projects, a teacher in the room — from your first keyboard to your first portfolio."
        primary={{ label: "Explore CEA courses", to: "/classes" }}
        secondary={{ label: "Apply for admission", to: "/apply" }}
      />
    </PageShell>
  );
}
