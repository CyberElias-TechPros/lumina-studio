"use client";

import { useMemo, useState } from "react";
import { ArrowLeftRight, HardDrive, Image as ImageIcon, Music, Video } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Data-size converter.
 *
 * Answers the single biggest query cluster in CEA's Search Console data:
 * "which is bigger mb or kb", "kb ka matlab kya hota hai", "1 gb me kitne
 * mb hote hain", "megabyte data", "what is a megabyte". Those searches are
 * overwhelmingly asked on a phone, by people working out what a data bundle
 * or a storage card actually holds, so the tool is built around a phone:
 *
 *   · plain-language unit names, no jargon on first sight
 *   · decimal (SI, what networks and phone makers sell) AND binary (what
 *     Windows shows) side by side, because that mismatch is the real
 *     confusion behind "why does my 16 GB phone show 14 GB"
 *   · "what fits" answers in photos, songs, video and documents
 *   · input accepts 500mb, 1.5 gb, 2GB, "1,024 kb" and so on
 *
 * Everything is computed locally; nothing is sent anywhere.
 */

type UnitKey = "B" | "KB" | "MB" | "GB" | "TB";

const DECIMAL: Record<UnitKey, number> = {
  B: 1,
  KB: 1_000,
  MB: 1_000_000,
  GB: 1_000_000_000,
  TB: 1_000_000_000_000,
};

const BINARY: Record<UnitKey, number> = {
  B: 1,
  KB: 1_024,
  MB: 1_048_576,
  GB: 1_073_741_824,
  TB: 1_099_511_627_776,
};

const UNIT_ORDER: UnitKey[] = ["B", "KB", "MB", "GB", "TB"];

const UNIT_NAMES: Record<UnitKey, { singular: string; plural: string; hindi: string }> = {
  B: { singular: "byte", plural: "bytes", hindi: "बाइट" },
  KB: { singular: "kilobyte", plural: "kilobytes", hindi: "किलोबाइट (KB)" },
  MB: { singular: "megabyte", plural: "megabytes", hindi: "मेगाबाइट (MB)" },
  GB: { singular: "gigabyte", plural: "gigabytes", hindi: "गीगाबाइट (GB)" },
  TB: { singular: "terabyte", plural: "terabytes", hindi: "टेराबाइट (TB)" },
};

/** Everyday reference sizes, in bytes (decimal). Deliberately realistic for Nigeria. */
const REFERENCE = {
  photo: 3_500_000, // 3.5 MB — a modern phone camera photo
  song: 4_000_000, // 4 MB — 4-minute MP3 at 128 kbps
  whatsappVideo: 16_000_000, // 16 MB — a 30-second WhatsApp video
  wordDoc: 120_000, // 120 KB — a 4-page Word document
  pdfScan: 900_000, // 900 KB — a scanned one-page PDF
  app: 90_000_000, // 90 MB — a typical phone app
};

const PRESETS: { label: string; value: string }[] = [
  { label: "1 MB", value: "1 MB" },
  { label: "50 MB bundle", value: "50 MB" },
  { label: "1 GB bundle", value: "1 GB" },
  { label: "16 GB phone", value: "16 GB" },
  { label: "128 GB card", value: "128 GB" },
  { label: "1 TB drive", value: "1 TB" },
];

/** Parse "1.5gb", "500 mb", "1,024 KB", "2 GB" — returns null when unusable. */
function parseSize(raw: string): { value: number; unit: UnitKey } | null {
  const cleaned = raw.replace(/,/g, "").trim();
  const match = /^(\d+(?:\.\d+)?)\s*([kmgt]?b)?$/i.exec(cleaned);
  if (!match) return null;
  const value = Number(match[1]);
  if (!Number.isFinite(value) || value < 0) return null;
  const suffix = (match[2] ?? "MB").toUpperCase() as UnitKey;
  const unit = (UNIT_ORDER.includes(suffix) ? suffix : "MB") as UnitKey;
  return { value, unit };
}

/** Human-friendly number: no trailing zeros, thousands separators only above 9,999. */
function fmtNumber(value: number): string {
  if (!Number.isFinite(value)) return "—";
  if (value === 0) return "0";
  const abs = Math.abs(value);
  if (abs >= 1000) return value.toLocaleString("en-NG", { maximumFractionDigits: 0 });
  if (abs >= 10) return value.toLocaleString("en-NG", { maximumFractionDigits: 1 });
  if (abs >= 1) return value.toLocaleString("en-NG", { maximumFractionDigits: 2 });
  if (abs >= 0.01) return value.toLocaleString("en-NG", { maximumFractionDigits: 3 });
  return value.toExponential(2);
}

function fitLabel(count: number, one: string, many: string): string {
  if (count < 1) return `less than one ${one}`;
  const n = Math.floor(count);
  return `${fmtNumber(n)} ${n === 1 ? one : many}`;
}

function Card({
  icon,
  label,
  value,
  hint,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="border-foreground/10 bg-card rounded-xl border p-4">
      <div className="text-muted-foreground flex items-center gap-2">
        <span className="grid size-7 place-items-center rounded-md bg-foreground/5">{icon}</span>
        <p className="font-mono text-[9px] tracking-[0.2em] uppercase">{label}</p>
      </div>
      <p className="font-display mt-2 text-lg font-semibold tracking-tight">{value}</p>
      <p className="text-muted-foreground mt-0.5 text-[11px] leading-snug">{hint}</p>
    </div>
  );
}

export function DataSizeConverter() {
  const [input, setInput] = useState("1 GB");

  const parsed = useMemo(() => parseSize(input), [input]);

  const sizes = useMemo(() => {
    if (!parsed) return null;
    const bytes = parsed.value * DECIMAL[parsed.unit];
    return {
      bytes,
      decimal: UNIT_ORDER.map((unit) => ({
        unit,
        value: bytes / DECIMAL[unit],
        exact: bytes % DECIMAL[unit] === 0,
      })),
      binary: UNIT_ORDER.map((unit) => ({
        unit,
        value: bytes / BINARY[unit],
      })),
    };
  }, [parsed]);

  const stepUp = useMemo(() => {
    if (!parsed || !sizes) return null;
    const index = UNIT_ORDER.indexOf(parsed.unit);
    const next = UNIT_ORDER[index + 1];
    const previous = UNIT_ORDER[index - 1];
    return {
      bytesInUnit: DECIMAL[parsed.unit],
      next,
      nextFactor: next ? DECIMAL[next] / DECIMAL[parsed.unit] : null,
      previous,
      previousFactor: previous ? DECIMAL[parsed.unit] / DECIMAL[previous] : null,
    };
  }, [parsed, sizes]);

  const swapTarget = parsed ? UNIT_ORDER[UNIT_ORDER.indexOf(parsed.unit) + 1] : undefined;

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
      {/* ── Input + ladder ─────────────────────────────────────────────── */}
      <section className="border-foreground/10 bg-card overflow-hidden rounded-2xl border">
        <div className="border-foreground/10 border-b px-5 py-3.5">
          <p className="text-muted-foreground font-mono text-[9px] tracking-[0.24em] uppercase">
            Type any size — 500 MB, 1.5 GB, 250 KB
          </p>
        </div>

        <div className="p-5">
          <label className="block">
            <span className="sr-only">Data size</span>
            <div
              className={cn(
                "border-foreground/12 focus-within:border-primary/60 flex h-16 items-center gap-3 rounded-xl border px-4 transition-colors",
                !parsed && input.trim().length > 0 && "border-destructive/50",
              )}
            >
              <HardDrive className="text-muted-foreground size-5 shrink-0" />
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                inputMode="text"
                spellCheck={false}
                autoComplete="off"
                aria-label="Size to convert, for example 500 MB or 1.5 GB"
                className="font-display w-full bg-transparent text-2xl font-semibold tracking-tight outline-none"
              />
            </div>
          </label>

          {!parsed && input.trim().length > 0 && (
            <p className="text-destructive mt-2 text-xs">
              Use a number and a unit, for example <span className="font-mono">500 MB</span> or{" "}
              <span className="font-mono">1.5 GB</span>.
            </p>
          )}

          <ul className="mt-3 flex flex-wrap gap-1.5">
            {PRESETS.map((preset) => (
              <li key={preset.value}>
                <button
                  type="button"
                  onClick={() => setInput(preset.value)}
                  className={cn(
                    "border-foreground/10 cursor-pointer rounded-full border px-3 py-1.5 text-[11px] font-medium transition-colors",
                    input === preset.value
                      ? "border-primary/50 bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {preset.label}
                </button>
              </li>
            ))}
          </ul>

          {sizes && parsed && (
            <>
              <p className="text-muted-foreground mt-6 border-t border-foreground/10 pt-4 text-sm leading-relaxed">
                <strong className="text-foreground">
                  {fmtNumber(parsed.value)} {UNIT_NAMES[parsed.unit].plural}
                </strong>{" "}
                means exactly {fmtNumber(sizes.bytes)} bytes.
                {stepUp?.nextFactor && (
                  <>
                    {" "}
                    That is{" "}
                    <strong className="text-foreground">1/{fmtNumber(stepUp.nextFactor)}</strong> of
                    a {UNIT_NAMES[stepUp.next].singular}.
                  </>
                )}
                {stepUp?.previousFactor && (
                  <>
                    {" "}
                    It is{" "}
                    <strong className="text-foreground">
                      {fmtNumber(stepUp.previousFactor)}×
                    </strong>{" "}
                    bigger than one {UNIT_NAMES[stepUp.previous].singular}.
                  </>
                )}
              </p>

              {/* Smallest → largest ladder */}
              <div className="mt-5">
                <p className="text-muted-foreground font-mono text-[9px] tracking-[0.22em] uppercase">
                  Smallest → largest
                </p>
                <ul className="mt-2 space-y-1.5">
                  {sizes.decimal.map((row) => {
                    const active = row.unit === parsed.unit;
                    return (
                      <li
                        key={row.unit}
                        className={cn(
                          "flex items-baseline justify-between gap-3 rounded-lg px-2.5 py-2 text-sm",
                          active ? "bg-primary/8" : "hover:bg-foreground/[0.03]",
                        )}
                      >
                        <span className="flex items-baseline gap-2">
                          <span
                            className={cn(
                              "font-mono text-[10px] tracking-wider uppercase",
                              active ? "text-primary" : "text-muted-foreground",
                            )}
                          >
                            {row.unit}
                          </span>
                          <span className="text-muted-foreground text-[11px]">
                            {UNIT_NAMES[row.unit].plural}
                          </span>
                        </span>
                        <span
                          className={cn(
                            "font-mono tabular-nums",
                            active ? "text-foreground font-semibold" : "text-foreground/80",
                          )}
                        >
                          {fmtNumber(row.value)}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {swapTarget && (
                <button
                  type="button"
                  onClick={() => {
                    const row = sizes.decimal.find((r) => r.unit === swapTarget);
                    if (row) setInput(`${fmtNumber(row.value)} ${swapTarget}`);
                  }}
                  className="text-muted-foreground hover:text-foreground mt-4 inline-flex cursor-pointer items-center gap-1.5 text-xs font-medium"
                >
                  <ArrowLeftRight className="size-3.5" /> Show the same size in{" "}
                  {UNIT_NAMES[swapTarget].plural}
                </button>
              )}
            </>
          )}
        </div>
      </section>

      {/* ── Answers in real things + decimal vs binary ──────────────────── */}
      <div className="space-y-5">
        <section className="border-foreground/10 bg-card overflow-hidden rounded-2xl border">
          <div className="border-foreground/10 border-b px-5 py-3.5">
            <p className="text-muted-foreground font-mono text-[9px] tracking-[0.24em] uppercase">
              What that actually holds
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 p-5 sm:grid-cols-2">
            {sizes ? (
              <>
                <Card
                  icon={<ImageIcon className="size-4" />}
                  label="Photos"
                  value={fitLabel(sizes.bytes / REFERENCE.photo, "photo", "photos")}
                  hint="3.5 MB each (12 MP phone camera)"
                />
                <Card
                  icon={<Music className="size-4" />}
                  label="Songs"
                  value={fitLabel(sizes.bytes / REFERENCE.song, "song", "songs")}
                  hint="4 MB each (MP3, 128 kbps)"
                />
                <Card
                  icon={<Video className="size-4" />}
                  label="WhatsApp videos"
                  value={fitLabel(sizes.bytes / REFERENCE.whatsappVideo, "video", "videos")}
                  hint="16 MB each (about 30 seconds)"
                />
                <Card
                  icon={<HardDrive className="size-4" />}
                  label="Phone apps"
                  value={fitLabel(sizes.bytes / REFERENCE.app, "app", "apps")}
                  hint="90 MB each (typical install)"
                />
              </>
            ) : (
              <p className="text-muted-foreground col-span-2 py-8 text-center text-sm">
                Type a size above and this panel fills in.
              </p>
            )}
          </div>
          {sizes && (
            <p className="text-muted-foreground border-t border-foreground/10 px-5 py-3 text-[11px] leading-relaxed">
              Or {fitLabel(sizes.bytes / REFERENCE.wordDoc, "Word document", "Word documents")} of
              typing, or{" "}
              {fitLabel(sizes.bytes / REFERENCE.pdfScan, "scanned page", "scanned pages")}. Photos
              and video are what drain a bundle fastest; text is almost free.
            </p>
          )}
        </section>

        <section className="border-foreground/10 bg-card overflow-hidden rounded-2xl border">
          <div className="border-foreground/10 flex items-center justify-between gap-3 border-b px-5 py-3.5">
            <p className="text-muted-foreground font-mono text-[9px] tracking-[0.24em] uppercase">
              Why your 16 GB phone shows 14 GB
            </p>
          </div>
          <div className="p-5">
            <p className="text-muted-foreground text-sm leading-relaxed">
              Phone makers and mobile networks sell in{" "}
              <strong className="text-foreground">decimal</strong> units: 1 GB = 1,000 MB. Windows
              and some older software report in <strong className="text-foreground">binary</strong>{" "}
              units: 1 GiB = 1,024 MiB but label it &quot;GB&quot;. Nothing is missing — the same
              bytes are being counted by two rulers.
            </p>
            {sizes ? (
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="border-foreground/10 rounded-xl border p-3.5">
                  <p className="text-muted-foreground font-mono text-[9px] tracking-[0.2em] uppercase">
                    Decimal (network, Android)
                  </p>
                  <p className="font-display mt-1.5 text-2xl font-semibold tabular-nums">
                    {fmtNumber(sizes.decimal[2].value)}
                    <span className="text-muted-foreground text-sm font-normal"> MB</span>
                  </p>
                  <p className="text-muted-foreground mt-0.5 font-mono text-[10px]">
                    {fmtNumber(sizes.decimal[3].value)} GB
                  </p>
                </div>
                <div className="border-foreground/10 rounded-xl border p-3.5">
                  <p className="text-muted-foreground font-mono text-[9px] tracking-[0.2em] uppercase">
                    Binary (Windows &quot;GB&quot;)
                  </p>
                  <p className="font-display mt-1.5 text-2xl font-semibold tabular-nums">
                    {fmtNumber(sizes.binary[2].value)}
                    <span className="text-muted-foreground text-sm font-normal"> MiB</span>
                  </p>
                  <p className="text-muted-foreground mt-0.5 font-mono text-[10px]">
                    {fmtNumber(sizes.binary[3].value)} GiB
                  </p>
                </div>
              </div>
            ) : null}
            <p className="text-muted-foreground mt-3 text-[11px] leading-relaxed">
              The gap is about 7% at GB and 10% at TB. It appears nowhere else in your life: data
              bundles, NEPA-free battery talk, and every &quot;16 GB&quot; advert use decimal.
            </p>
          </div>
        </section>

        <section className="border-foreground/10 bg-primary/5 rounded-2xl border p-5">
          <p className="text-primary font-mono text-[9px] tracking-[0.22em] uppercase">
            The one-line answer
          </p>
          <p className="text-foreground mt-2 text-sm leading-relaxed">
            <strong>TB &gt; GB &gt; MB &gt; KB.</strong> Each step is about a thousand of the one
            below it. So 1 GB is bigger than 1 MB, 1 MB is bigger than 1 KB, and 2 GB is a thousand
            times bigger than 2 MB even though the digits look close.
          </p>
          <p className="text-muted-foreground mt-2 text-xs leading-relaxed">
            <span className="font-semibold">Hindi:</span> टेराबाइट &gt; गीगाबाइट &gt; मेगाबाइट &gt;
            किलोबाइट। हर अगली इकाई पिछली से लगभग 1000 गुना बड़ी होती है। 1 GB = 1000 MB, 1 MB = 1000
            KB.
          </p>
        </section>
      </div>
    </div>
  );
}
