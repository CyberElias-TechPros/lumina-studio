import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { ArrowLeft, ArrowRight, Keyboard, ShieldCheck } from "lucide-react";
import { PageShell, PageHero, CTASection, Eyebrow } from "@/components/marketing/shell";
import { NairaKeyboardHelper } from "@/components/tools/naira-keyboard-helper";
import { getPageHead } from "@/lib/seo";

export const Route = createFileRoute("/tools/naira-keyboard")({
  head: () =>
    getPageHead({
      title: "How to Type the Naira Sign (₦) on Keyboard — Every Method",
      description:
        "Type ₦ on any keyboard: Word's 20A6 + Alt+X, Windows Alt+8358, Win+., Android and iPhone long-press. Copy ₦, and write any naira amount in words for cheques and invoices.",
      path: "/tools/naira-keyboard",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "CEA Naira Sign Keyboard Helper & Amount in Words",
        applicationCategory: "EducationalApplication",
        operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "NGN" },
        description:
          "Every working way to type the naira symbol on Windows, Word, Android and iPhone, plus a converter that writes naira amounts in words.",
      },
    }),
  component: NairaKeyboardPage,
});

const FAQS = [
  {
    q: "How do I type the naira sign on a laptop without a number pad?",
    a: "Use Microsoft Word: type 20A6, then press Alt + X together. The code turns into ₦. On a Mac, the same shortcut is ⌥ Option + X. This is the only method that works on every laptop keyboard with no numeric keypad.",
  },
  {
    q: "What is the Alt code for ₦?",
    a: "Alt + 8358, typed on the numeric keypad with Num Lock on. It does not work with the number row above the letters, and it does not work on most laptops that have no keypad.",
  },
  {
    q: "How do I get the naira sign on Android?",
    a: "Switch to the numbers/symbols keyboard and long-press the $ key. A pop-up list appears; slide to ₦ and release. On Samsung and Gboard keyboards the same list also sits behind ?123 → =\\<.",
  },
  {
    q: "How do I type ₦ on an iPhone?",
    a: "Tap 123 to reach the number keyboard, then long-press $ and slide to ₦.",
  },
  {
    q: "Why does my naira sign print as a box or question mark?",
    a: "The font or the program cannot display Unicode U+20A6. Change the font to Arial, Calibri or Segoe UI — all three include the naira sign. If the document must run on very old software, write NGN 25,000 instead of ₦25,000.",
  },
  {
    q: "How do I write ₦1,250,000.50 in words on a cheque?",
    a: 'One million, two hundred and fifty thousand naira, fifty kobo only. Capitalise the first letter, write the kobo as words not decimals, and draw a line through any space after the word "only" so nothing can be added.',
  },
  {
    q: "Is it ₦ or NGN in an invoice?",
    a: "Both are correct. ₦ is the symbol for everyday use and design; NGN is the ISO 4217 code and is safer in contracts, bank transfers and any system that may not render the symbol.",
  },
];

function NairaKeyboardPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Free tool · Everyday computing"
        title={
          <>
            How to type the{" "}
            <span className="font-serif text-primary font-normal italic">naira sign ₦</span>
          </>
        }
        description="Every method that actually works — Word, Windows, Android and iPhone — plus one-tap copy for ₦ and accented letters, and a writer that turns any amount into words for cheques and invoices."
        meta={["Word · Windows · Android · iOS", "Tap to copy", "Amount in words"]}
      >
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <Link
            to="/tools"
            className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm font-medium"
          >
            <ArrowLeft className="size-4" /> All tools
          </Link>
          <Link
            to="/blog/naira-and-accents"
            className="text-primary inline-flex items-center gap-1.5 text-sm font-semibold hover:underline"
          >
            Read the full lesson <ArrowRight className="size-4" />
          </Link>
        </div>
      </PageHero>

      <section className="container-page py-12 md:py-16" aria-label="Naira keyboard helper">
        <div className="mx-auto max-w-5xl">
          <NairaKeyboardHelper />
        </div>

        <div className="mx-auto mt-14 max-w-3xl">
          <Eyebrow>
            <Keyboard className="size-3.5" aria-hidden="true" /> The four answers people actually
            need
          </Eyebrow>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="border-foreground/10 bg-card rounded-xl border p-4">
              <p className="text-muted-foreground font-mono text-[9px] tracking-[0.18em] uppercase">
                Slowest, works everywhere
              </p>
              <p className="font-display mt-1.5 text-lg font-semibold">Copy and paste</p>
              <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
                Tap ₦ above, then Ctrl+V. Best for a one-off invoice or a design file.
              </p>
            </div>
            <div className="border-primary/30 bg-primary/5 rounded-xl border p-4">
              <p className="text-primary font-mono text-[9px] tracking-[0.18em] uppercase">
                Fastest on a laptop
              </p>
              <p className="font-display mt-1.5 text-lg font-semibold">20A6 + Alt+X in Word</p>
              <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
                No keypad, no settings, no software. Four characters and a key combination.
              </p>
            </div>
            <div className="border-foreground/10 bg-card rounded-xl border p-4">
              <p className="text-muted-foreground font-mono text-[9px] tracking-[0.18em] uppercase">
                Best if you type it daily
              </p>
              <p className="font-display mt-1.5 text-lg font-semibold">Word autocorrect: NGN → ₦</p>
              <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
                Set once in AutoCorrect Options. Every Word document afterwards is automatic.
              </p>
            </div>
            <div className="border-foreground/10 bg-card rounded-xl border p-4">
              <p className="text-muted-foreground font-mono text-[9px] tracking-[0.18em] uppercase">
                On a phone
              </p>
              <p className="font-display mt-1.5 text-lg font-semibold">Long-press the $ key</p>
              <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
                Android and iPhone both hide ₦ behind the currency key on the number keyboard.
              </p>
            </div>
          </div>

          <div className="border-foreground/10 mt-10 rounded-xl border p-5">
            <div className="flex items-start gap-3">
              <ShieldCheck className="text-primary mt-0.5 size-5 shrink-0" />
              <div>
                <h2 className="font-display text-lg font-semibold">Why ₦ is harder than $ or £</h2>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  The naira sign was added to Unicode in 1999 as{" "}
                  <span className="font-mono text-xs">U+20A6</span>, decades after the dollar and
                  pound signs that sit in the original ASCII set. Older keyboards and cheap imported
                  laptops were never labelled for it, so the sign has to be typed through a code or
                  a symbol panel rather than a dedicated key. Every method on this page is a
                  workaround for that one historical accident — and none of them need a new
                  keyboard.
                </p>
              </div>
            </div>
          </div>

          <h2 className="font-display mt-12 text-2xl font-semibold tracking-tight">
            Common questions
          </h2>
          <div className="divide-foreground/10 mt-4 divide-y border-y border-foreground/10">
            {FAQS.map((faq) => (
              <details key={faq.q} className="group">
                <summary className="hover:text-primary flex cursor-pointer list-none items-start justify-between gap-4 py-4 text-sm font-semibold">
                  {faq.q}
                  <ArrowRight className="text-muted-foreground mt-0.5 size-4 shrink-0 transition-transform group-open:rotate-90" />
                </summary>
                <p className="text-muted-foreground pb-4 text-sm leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Typing faster makes everything else easier."
        description="Our Computer Basics and Data Entry tracks teach keyboard shortcuts, accurate typing and document formatting — the two skills that appear in almost every Nigerian job advert."
        primary={{ label: "See courses & fees", to: "/classes" }}
        secondary={{ label: "Try the typing test", to: "/tools/typing-test" }}
      />
    </PageShell>
  );
}
