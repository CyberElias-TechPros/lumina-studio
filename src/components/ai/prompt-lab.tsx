"use client";

import { useState } from "react";
import { Check, Copy, Sparkles } from "lucide-react";

/**
 * Prompt patterns, before → after — adapted for CEA learners from
 * "Prompt Engineering" (Phase 11, Lesson 01) of AI Engineering from Scratch.
 * MIT © 2026 Rohit Ghumare. Examples rewritten for everyday work.
 */
const PAIRS = [
  {
    label: "Everyday writing",
    before: "Write a marketing email for our new product.",
    after:
      "You are a senior copywriter at a B2B software company. Write a product launch email for DevFlow, a CI/CD pipeline debugger. Audience: engineering managers at Series B startups. Tone: confident, technical, not salesy. Length: 150 words. Include one specific metric (3.2× faster pipeline debugging). End with a single call to action linking to the demo page. Output the email only.",
  },
  {
    label: "Summarising a report",
    before: "Summarise this report.",
    after:
      "You are an analyst briefing a busy director. Summarise the attached report in exactly five bullet points, each under 20 words. Lead with the decision the director must make. Flag any number the report cannot support. No preamble, no conclusion.",
  },
  {
    label: "Debugging code",
    before: "Fix my code.",
    after:
      'You are a senior TypeScript engineer. This React function throws "Cannot read properties of undefined" on line 12 when items is empty. Here is the code and the full stack trace: <paste code>. Explain the root cause in two sentences, give the minimal fix, then one sentence on how to prevent this class of bug. Do not rewrite unrelated parts.',
  },
  {
    label: "Extracting structure",
    before: "Get the key info from these invoices.",
    after:
      "Extract the following fields from each invoice as JSON: invoice_number, vendor, date (YYYY-MM-DD), currency, total (number, no symbols), due_date. If a field is missing, set it to null. Return a JSON array only — no prose. Here are the invoices: <paste>.",
  },
];

export function PromptLab() {
  const [copied, setCopied] = useState<number | null>(null);

  const copy = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(index);
      window.setTimeout(() => setCopied(null), 1600);
    } catch {
      /* clipboard unavailable — ignore */
    }
  };

  return (
    <div className="border-foreground/10 bg-card divide-y divide-foreground/8 overflow-hidden rounded-2xl border">
      {PAIRS.map((pair, index) => (
        <div
          key={pair.label}
          className="grid gap-4 p-5 sm:p-6 md:grid-cols-[7rem_1fr_1fr] md:gap-6"
        >
          <div>
            <p className="font-mono text-[9px] tracking-[0.22em] text-primary uppercase">
              {String(index + 1).padStart(2, "0")}
            </p>
            <p className="mt-1.5 text-[13px] leading-snug font-semibold">{pair.label}</p>
          </div>
          <div className="border-destructive/25 rounded-xl border border-dashed p-4">
            <p className="font-mono text-[8px] tracking-[0.22em] text-destructive uppercase">
              Vague
            </p>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed italic">
              “{pair.before}”
            </p>
          </div>
          <div className="relative border-success/30 bg-success/5 rounded-xl border border-solid p-4">
            <p className="text-success font-mono text-[8px] tracking-[0.22em] uppercase">
              Engineered
            </p>
            <p className="mt-2 text-[13px] leading-relaxed">{pair.after}</p>
            <button
              type="button"
              onClick={() => void copy(pair.after, index)}
              aria-label={copied === index ? "Copied" : "Copy engineered prompt"}
              className="border-foreground/12 bg-background/60 text-muted-foreground hover:text-foreground absolute top-3 right-3 grid size-8 cursor-pointer place-items-center rounded-lg border transition-colors"
            >
              {copied === index ? (
                <Check className="text-success size-4" />
              ) : (
                <Copy className="size-4" />
              )}
            </button>
          </div>
        </div>
      ))}
      <p className="text-muted-foreground flex items-center gap-2 px-5 py-3 text-[11px] sm:px-6">
        <Sparkles className="text-primary size-3.5 shrink-0" aria-hidden="true" />
        Role + context + constraints + format. Same model, same question — wildly different answer.
        Adapted from “Prompt Engineering” in AI Engineering from Scratch (MIT © 2026 Rohit Ghumare).
      </p>
    </div>
  );
}
