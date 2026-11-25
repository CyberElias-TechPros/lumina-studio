"use client";

import { useMemo, useState } from "react";
import { Check, Copy, CornerDownLeft, Delete, RotateCcw, Wand2 } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Naira & accent keyboard helper.
 *
 * From CEA's Search Console data: "how to type naira sign on keyboard",
 * "how to get naira sign on keyboard on laptop", "naira sign in word",
 * "write naira in words", "accent number", "how to do @ on keyboard".
 *
 * These are almost all Windows/Word users with a standard QWERTY keyboard and
 * no numeric keypad. So the tool shows every working method, side by side:
 *   · Word's built-in shortcut (Alt+X with 20A6) — works with no keypad
 *   · Word autocorrect (type NGN and it becomes ₦) — set once, works forever
 *   · Windows Alt code (Alt+8358) — needs a number pad
 *   · Windows emoji/symbol panel (Win + .)
 *   · Android / iPhone long-press
 *   · Copy buttons for the characters themselves
 *
 * It also includes the other characters people ask about on the same visit
 * (é, ñ, @, €, £, °, ½) and a Naira-in-words writer, because "write naira in
 * words" is a real query with no good free tool behind it.
 */

type Item = { char: string; name: string; note?: string };

const CURRENCY: Item[] = [
  { char: "₦", name: "Naira", note: "Unicode U+20A6" },
  { char: "K", name: "Kobo (as K)", note: "No standard symbol" },
  { char: "$", name: "Dollar", note: "U+0024" },
  { char: "£", name: "Pound", note: "U+00A3" },
  { char: "€", name: "Euro", note: "U+20AC" },
  { char: "¢", name: "Cent", note: "U+00A2" },
];

const ACCENTS: Item[] = [
  { char: "é", name: "e acute", note: "café, résumé" },
  { char: "è", name: "e grave", note: "très" },
  { char: "ê", name: "e circumflex", note: "être" },
  { char: "á", name: "a acute", note: "São" },
  { char: "à", name: "a grave", note: "voilà" },
  { char: "ñ", name: "n tilde", note: "Español" },
  { char: "ç", name: "c cedilla", note: "français" },
  { char: "ü", name: "u umlaut", note: "Müller" },
  { char: "ö", name: "o umlaut", note: "schön" },
  { char: "ô", name: "o circumflex", note: "côte" },
  { char: "î", name: "i circumflex", note: "île" },
  { char: "â", name: "a circumflex", note: "pâte" },
];

const SYMBOLS: Item[] = [
  { char: "@", name: "at sign", note: "Shift + 2 (UK/EU board)" },
  { char: "°", name: "degree", note: "32°C" },
  { char: "½", name: "one half", note: "Alt+0189" },
  { char: "¼", name: "one quarter", note: "Alt+0188" },
  { char: "·", name: "middot", note: "a·b" },
  { char: "—", name: "em dash", note: "long pause" },
  { char: "–", name: "en dash", note: "2020–2025" },
  { char: "…", name: "ellipsis", note: "one character, not three dots" },
  { char: "©", name: "copyright", note: "© 2026" },
  { char: "™", name: "trademark", note: "™" },
  { char: "×", name: "multiply", note: "2 × 3" },
  { char: "÷", name: "divide", note: "6 ÷ 2" },
];

type Method = {
  id: string;
  label: string;
  where: string;
  steps: string[];
  needsNumpad?: boolean;
};

const METHODS: Method[] = [
  {
    id: "word-autocorrect",
    label: "Word: type NGN, get ₦",
    where: "Microsoft Word (desktop, Windows or Mac) — set once",
    steps: [
      "Open Word and go to File → Options → Proofing → AutoCorrect Options.",
      "In the Replace box type NGN, and in the With box paste ₦ (copy it above).",
      "Press Add, then OK.",
      "From now on, typing NGN followed by a space writes ₦ in every Word document.",
    ],
  },
  {
    id: "word-altx",
    label: "Word: 20A6 then Alt+X",
    where: "Microsoft Word only — works on any laptop, no number pad needed",
    steps: [
      "Type the four characters 20A6 exactly where the naira sign should go.",
      "Press Alt and X together (Mac: ⌥ Option + X).",
      "20A6 turns into ₦ immediately.",
      "Change it back with Ctrl+Z if you typed it in the wrong place.",
    ],
  },
  {
    id: "windows-altcode",
    label: "Windows: Alt + 8358",
    where: "Windows apps — needs a numeric keypad (right side of a full keyboard)",
    steps: [
      "Turn Num Lock on.",
      "Hold Alt and type 8358 on the numeric keypad, then release Alt.",
      "₦ appears. On a laptop with no number pad this method will not work — use Word's 20A6 Alt+X instead.",
    ],
    needsNumpad: true,
  },
  {
    id: "windows-symbols",
    label: "Windows: Win + . panel",
    where: "Windows 10 and 11, in any text box",
    steps: [
      "Press Windows key and the full stop/period key together.",
      "Choose the Ω (symbols) tab.",
      "Pick ₦ from the list. It is near the other currency signs.",
    ],
  },
  {
    id: "android",
    label: "Android: long-press the currency key",
    where: "Any Android phone (Gboard, Samsung keyboard)",
    steps: [
      "Open any text field and switch to the numbers/symbols keyboard.",
      "Long-press the $ (or the currency key your keyboard shows).",
      "Pick ₦ from the pop-up list.",
      "Some keyboards put it under ?123 → =\\< instead.",
    ],
  },
  {
    id: "iphone",
    label: "iPhone: long-press $",
    where: "iOS 12 and later",
    steps: [
      "Tap the 123 key to reach the number keyboard.",
      "Long-press the $ key.",
      "Slide to ₦ and let go.",
    ],
  },
  {
    id: "google-docs",
    label: "Google Docs: Insert → Special characters",
    where: "Google Docs on any computer",
    steps: [
      "Put the cursor where the sign belongs.",
      "Choose Insert → Special characters.",
      "Search for naira, then click ₦ once in the results.",
    ],
  },
];

const UNIT_WORDS = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
  "nineteen",
];
const TENS = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];

/** 0–999 in words, British/Nigerian style (no "and" after hundreds is optional here). */
function underThousand(n: number): string {
  if (n < 20) return UNIT_WORDS[n];
  if (n < 100) {
    const tens = Math.floor(n / 10);
    const rest = n % 10;
    return rest ? `${TENS[tens]}-${UNIT_WORDS[rest]}` : TENS[tens];
  }
  const hundreds = Math.floor(n / 100);
  const rest = n % 100;
  return rest
    ? `${UNIT_WORDS[hundreds]} hundred and ${underThousand(rest)}`
    : `${UNIT_WORDS[hundreds]} hundred`;
}

const SCALES: { value: number; name: string }[] = [
  { value: 1_000_000_000_000, name: "trillion" },
  { value: 1_000_000_000, name: "billion" },
  { value: 1_000_000, name: "million" },
  { value: 1_000, name: "thousand" },
];

/** Positive integer to words. */
function integerToWords(n: number): string {
  if (n === 0) return "zero";
  const parts: string[] = [];
  let remaining = n;
  for (const scale of SCALES) {
    if (remaining >= scale.value) {
      const count = Math.floor(remaining / scale.value);
      parts.push(`${integerToWords(count)} ${scale.name}`);
      remaining -= count * scale.value;
    }
  }
  if (remaining > 0) parts.push(underThousand(remaining));
  return parts.join(" ");
}

function wordsToKobo(kobo: number): string {
  if (kobo === 0) return "";
  return `${integerToWords(kobo)} kobo`;
}

type WordForm = "cheque" | "cheque-and" | "figure";

function amountInWords(raw: string, form: WordForm): { words: string; error?: string } {
  const cleaned = raw.replace(/[₦,\s]/g, "");
  if (!cleaned) return { words: "" };
  if (!/^\d+(\.\d{0,2})?$/.test(cleaned)) {
    return {
      words: "",
      error: "Use digits only, with at most two decimal places (kobo).",
    };
  }
  const [nairaPart, koboPart = ""] = cleaned.split(".");
  const naira = Number(nairaPart);
  if (!Number.isSafeInteger(naira)) return { words: "", error: "That number is too large." };

  const koboDigits = Number((koboPart + "00").slice(0, 2));
  const kobo = Number.isFinite(koboDigits) ? koboDigits : 0;

  if (naira === 0 && kobo === 0) return { words: "Zero naira only" };

  const nairaWords = naira === 0 ? "" : `${integerToWords(naira)} naira`;
  const koboWords = wordsToKobo(kobo);

  if (form === "figure") {
    if (naira === 0) return { words: `${koboWords} only` };
    return { words: koboWords ? `${nairaWords}, ${koboWords} only` : `${nairaWords} only` };
  }

  const joiner = form === "cheque-and" ? " and " : ", ";
  if (!nairaWords) return { words: `${koboWords} only` };
  if (!koboWords) return { words: `${nairaWords} only` };
  return { words: `${nairaWords}${joiner}${koboWords} only` };
}

function TokenButton({ item }: { item: Item }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      title={item.note ? `${item.name} — ${item.note}` : item.name}
      onClick={() => {
        void navigator.clipboard?.writeText(item.char).then(() => {
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1200);
        });
      }}
      className={cn(
        "group border-foreground/10 bg-card flex cursor-pointer items-center gap-2.5 rounded-xl border px-3 py-2 text-left transition-colors hover:border-foreground/25",
        copied && "border-primary/50 bg-primary/8",
      )}
      aria-label={`Copy ${item.name}`}
    >
      <span className="font-display grid size-9 shrink-0 place-items-center rounded-lg bg-foreground/[0.06] text-lg leading-none">
        {copied ? <Check className="text-primary size-4" strokeWidth={3} /> : item.char}
      </span>
      <span className="min-w-0">
        <span className="text-foreground block truncate text-xs font-semibold">{item.name}</span>
        {item.note && (
          <span className="text-muted-foreground block truncate font-mono text-[9px]">
            {item.note}
          </span>
        )}
      </span>
    </button>
  );
}

export function NairaKeyboardHelper() {
  const [amount, setAmount] = useState("1250000.50");
  const [form, setForm] = useState<WordForm>("cheque");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [practice, setPractice] = useState("");

  const words = useMemo(() => amountInWords(amount, form), [amount, form]);

  const copy = (key: string, value: string) => {
    void navigator.clipboard?.writeText(value).then(() => {
      setCopiedKey(key);
      window.setTimeout(() => setCopiedKey(null), 1400);
    });
  };

  return (
    <div className="space-y-5">
      {/* ── Copy-ready characters ─────────────────────────────────────── */}
      <section className="border-foreground/10 bg-card overflow-hidden rounded-2xl border">
        <div className="border-foreground/10 flex flex-wrap items-center justify-between gap-2 border-b px-5 py-3.5">
          <p className="text-muted-foreground font-mono text-[9px] tracking-[0.24em] uppercase">
            Tap any character to copy it
          </p>
          <p className="text-muted-foreground text-[10px]">Then paste with Ctrl+V</p>
        </div>
        <div className="space-y-5 p-5">
          <div>
            <p className="text-muted-foreground font-mono text-[9px] tracking-[0.2em] uppercase">
              Currency
            </p>
            <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {CURRENCY.map((item) => (
                <TokenButton key={item.char} item={item} />
              ))}
            </div>
          </div>
          <div>
            <p className="text-muted-foreground font-mono text-[9px] tracking-[0.2em] uppercase">
              Accented letters
            </p>
            <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {ACCENTS.map((item) => (
                <TokenButton key={item.char} item={item} />
              ))}
            </div>
          </div>
          <div>
            <p className="text-muted-foreground font-mono text-[9px] tracking-[0.2em] uppercase">
              Symbols people ask for
            </p>
            <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {SYMBOLS.map((item) => (
                <TokenButton key={item.char} item={item} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Methods ───────────────────────────────────────────────────── */}
      <section className="border-foreground/10 bg-card overflow-hidden rounded-2xl border">
        <div className="border-foreground/10 border-b px-5 py-3.5">
          <p className="text-muted-foreground font-mono text-[9px] tracking-[0.24em] uppercase">
            Every working way to type ₦
          </p>
        </div>
        <div className="divide-foreground/10 divide-y">
          {METHODS.map((method, index) => (
            <details key={method.id} className="group" open={index === 0}>
              <summary className="hover:bg-foreground/[0.03] flex cursor-pointer list-none items-start gap-3 px-5 py-4">
                <span className="bg-foreground/[0.06] text-muted-foreground font-mono mt-0.5 grid size-6 shrink-0 place-items-center rounded-md text-[10px] font-semibold">
                  {index + 1}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="text-foreground block text-sm font-semibold">{method.label}</span>
                  <span className="text-muted-foreground mt-0.5 block text-[11px]">
                    {method.where}
                    {method.needsNumpad && (
                      <span className="text-destructive/80 ml-1.5 font-semibold">
                        · numeric keypad required
                      </span>
                    )}
                  </span>
                </span>
                <CornerDownLeft className="text-muted-foreground mt-1 size-3.5 shrink-0 transition-transform group-open:rotate-90" />
              </summary>
              <ol className="text-muted-foreground space-y-1.5 px-5 pb-5 pl-14 text-sm leading-relaxed">
                {method.steps.map((step, stepIndex) => (
                  <li key={stepIndex} className="flex gap-2">
                    <span className="text-muted-foreground/60 font-mono text-[11px]">
                      {stepIndex + 1}.
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </details>
          ))}
        </div>
      </section>

      {/* ── Naira in words ────────────────────────────────────────────── */}
      <section className="border-foreground/10 bg-card overflow-hidden rounded-2xl border">
        <div className="border-foreground/10 border-b px-5 py-3.5">
          <p className="text-muted-foreground font-mono text-[9px] tracking-[0.24em] uppercase">
            Write an amount in words — for cheques, invoices and bank forms
          </p>
        </div>
        <div className="p-5">
          <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto]">
            <label className="block">
              <span className="text-muted-foreground font-mono text-[9px] tracking-[0.2em] uppercase">
                Amount in figures
              </span>
              <div className="border-foreground/12 focus-within:border-primary/60 mt-1.5 flex h-14 items-center gap-2 rounded-xl border px-4 transition-colors">
                <span className="text-muted-foreground font-display text-xl">₦</span>
                <input
                  value={amount}
                  onChange={(event) => setAmount(event.target.value)}
                  inputMode="decimal"
                  spellCheck={false}
                  aria-label="Amount in naira"
                  className="font-display w-full bg-transparent text-xl font-semibold tracking-tight tabular-nums outline-none"
                />
                {amount && (
                  <button
                    type="button"
                    onClick={() => setAmount("")}
                    aria-label="Clear amount"
                    className="text-muted-foreground hover:text-foreground shrink-0 cursor-pointer"
                  >
                    <Delete className="size-4" />
                  </button>
                )}
              </div>
            </label>

            <fieldset className="sm:pt-6">
              <legend className="text-muted-foreground font-mono text-[9px] tracking-[0.2em] uppercase">
                Style
              </legend>
              <div className="border-foreground/10 mt-1.5 flex h-14 items-center gap-1 rounded-xl border p-1">
                {(
                  [
                    { id: "cheque" as const, label: "Cheque" },
                    { id: "cheque-and" as const, label: "…and kobo" },
                    { id: "figure" as const, label: "Sentence" },
                  ] satisfies { id: WordForm; label: string }[]
                ).map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setForm(option.id)}
                    className={cn(
                      "h-full cursor-pointer rounded-lg px-3 text-xs font-semibold transition-colors",
                      form === option.id
                        ? "bg-primary/12 text-primary"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </fieldset>
          </div>

          {words.error ? (
            <p className="text-destructive mt-3 text-xs">{words.error}</p>
          ) : words.words ? (
            <div className="border-foreground/10 bg-muted/30 mt-4 rounded-xl border p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-muted-foreground font-mono text-[9px] tracking-[0.2em] uppercase">
                    In words
                  </p>
                  <p className="font-display mt-1.5 text-lg leading-snug font-semibold capitalize">
                    {words.words}
                  </p>
                  <p className="text-muted-foreground mt-1 text-[11px]">
                    Capitalise the first letter when writing on a cheque. Nigerian banks accept
                    either style, but never leave a gap between the end of the words and the printed
                    line — draw a line through it.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => copy("words", words.words)}
                  className="border-foreground/12 hover:border-foreground/25 shrink-0 cursor-pointer rounded-lg border p-2.5"
                  aria-label="Copy amount in words"
                >
                  {copiedKey === "words" ? (
                    <Check className="text-primary size-4" strokeWidth={3} />
                  ) : (
                    <Copy className="size-4" />
                  )}
                </button>
              </div>
            </div>
          ) : null}

          <p className="text-muted-foreground mt-4 text-[11px] leading-relaxed">
            British/Nigerian convention: <em>One million, two hundred and fifty thousand naira,
            fifty kobo only.</em> The word <em>only</em> closes the amount so nothing can be added
            after it. Never write kobo as a decimal on the words line.
          </p>
        </div>
      </section>

      {/* ── Practice box ──────────────────────────────────────────────── */}
      <section className="border-foreground/10 bg-primary/5 rounded-2xl border p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-primary font-mono text-[9px] tracking-[0.22em] uppercase">
              Practise here first
            </p>
            <p className="text-muted-foreground mt-1 text-xs">
              Type into the box below. Symbols you copy from above will paste correctly here, so you
              can see them before sending a real invoice.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setPractice("")}
            className="text-muted-foreground hover:text-foreground inline-flex cursor-pointer items-center gap-1.5 text-xs font-medium"
          >
            <RotateCcw className="size-3.5" /> Clear
          </button>
        </div>
        <textarea
          value={practice}
          onChange={(event) => setPractice(event.target.value)}
          rows={3}
          placeholder="e.g. Total: ₦125,000 — paid in full. Café invoice, 32°C day."
          spellCheck={false}
          className="border-foreground/12 focus:border-primary/60 bg-card mt-3 w-full resize-y rounded-xl border p-3.5 font-mono text-sm leading-relaxed outline-none"
          aria-label="Practice typing area"
        />
        <p className="text-muted-foreground mt-2 flex items-start gap-1.5 text-[11px]">
          <Wand2 className="mt-0.5 size-3.5 shrink-0" />
          If a character shows as a box (▯) in an older program, the program cannot display that
          character — use the word instead: &quot;NGN 125,000&quot;.
        </p>
      </section>
    </div>
  );
}
