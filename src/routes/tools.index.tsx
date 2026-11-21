import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import {
  ArrowRight,
  ArrowUpRight,
  Box,
  Clock,
  FileText,
  Image,
  Keyboard,
  LayoutGrid,
  Palette,
  QrCode,
  ScrollText,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { PageHero, PageShell, CTASection, Eyebrow } from "@/components/marketing/shell";
import { getPageHead } from "@/lib/seo";

export const Route = createFileRoute("/tools/")({
  head: () =>
    getPageHead({
      title: "Free Practice Tools — Typing, Office Shortcuts, Design & More",
      description:
        "Free practice tools from Cyber Elias Academy, Port Harcourt: a monkeytype-style typing speed test, keyboard shortcuts for Microsoft Office, an image specs calculator, a CSS generator, a freelancer rate calculator and a QR code generator. No sign-up, no tracking of your content.",
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

  {
    to: "/tools/keyboard-shortcuts",
    icon: Keyboard,
    name: "Keyboard Shortcuts",
    headline: "Know your keyboard. Work faster.",
    blurb:
      "Browse and practise the shortcuts for Microsoft Word, Excel, PowerPoint, your browser and Windows — all in one place. Search by shortcut or description, then test yourself with a practice mode that scores you as you go.",
    meta: "Word · Excel · PowerPoint · Browser · Windows",
  },
  {
    to: "/tools/image-specs",
    icon: Image,
    name: "Image Specs Calculator",
    headline: "What size is that image, really?",
    blurb:
      "Plug in pixel dimensions and get the aspect ratio, print size at any DPI, a target resize that keeps the shape, and a crop or letterbox check. Useful for graphic design, photography and video export work.",
    meta: "Aspect ratio · DPI · Print size · Resize · Crop",
  },
  {
    to: "/tools/css-generator",
    icon: Palette,
    name: "CSS Generator",
    headline: "Build CSS you can actually use.",
    blurb:
      "Tweak a gradient, a box-shadow or a border-radius with sliders and see the result live — then copy the CSS for your own project. Made for the Web Design and Web Development courses.",
    meta: "Gradient · Box-shadow · Border-radius",
  },
  {
    to: "/tools/freelancer-calculator",
    icon: FileText,
    name: "Freelancer Rate & Quote",
    headline: "What should I charge? Set your rate.",
    blurb:
      "Find the hourly rate that hits your income target, and quote a project by the hours or by the margin you want. All figures in Naira. Made for the Business Freelancing and Content Creation courses.",
    meta: "Hourly rate · Project quote · Margin · Naira",
  },
  {
    to: "/tools/qr-code",
    icon: QrCode,
    name: "QR Code Generator",
    headline: "Make a QR code in seconds.",
    blurb:
      "Links, text, contacts, Wi-Fi and more — custom colours, size and error correction, then download or share. Your input never leaves the page. Added to the CEA Lab tools directory.",
    meta: "URLs · Text · Contacts · Wi-Fi · PNG",
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
        description="The small software that makes practice stick: type faster, learn your keyboard shortcuts, size images for print and web, build CSS and figure your freelance rate. Free, fast, and nothing you type leaves your browser."
        meta={["8 tools", "100% client-side", "Free for everyone"]}
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
