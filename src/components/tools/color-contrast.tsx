"use client";

import { useMemo, useState } from "react";
import { ArrowLeftRight, Check, Copy, Pipette } from "lucide-react";
import { cn } from "@/lib/utils";

/* WCAG contrast + palette harmony — built for CEA's design students. */

const hexToRgb = (hex: string): [number, number, number] | null => {
  const match = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!match) return null;
  const value = parseInt(match[1], 16);
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255];
};

const luminance = ([r, g, b]: [number, number, number]) => {
  const channel = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
};

const contrastRatio = (l1: number, l2: number) =>
  (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);

const rgbToHsl = ([r, g, b]: [number, number, number]) => {
  const rn = r / 255,
    gn = g / 255,
    bn = b / 255;
  const max = Math.max(rn, gn, bn),
    min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  const d = max - min;
  if (d === 0) return { h: 0, s: 0, l };
  const s = d / (1 - Math.abs(2 * l - 1));
  const h =
    max === rn
      ? 60 * (((gn - bn) / d) % 6)
      : max === gn
        ? 60 * ((bn - rn) / d + 2)
        : 60 * ((rn - gn) / d + 4);
  return { h: (h + 360) % 360, s, l };
};

const hslToHex = (h: number, s: number, l: number) => {
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const c = l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
    return Math.round(255 * c)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
};

const PRESETS: { name: string; fg: string; bg: string }[] = [
  { name: "Ink on paper", fg: "#1a1a1a", bg: "#faf9f6" },
  { name: "CEA navy on white", fg: "#194587", bg: "#ffffff" },
  { name: "White on navy", fg: "#ffffff", bg: "#194587" },
  { name: "Gold on ink", fg: "#f5c86e", bg: "#101828" },
  { name: "Cyan on midnight", fg: "#67e8f9", bg: "#050b1c" },
  { name: "Mint on pine", fg: "#a7f3d0", bg: "#0f2e23" },
  { name: "Rose on charcoal", fg: "#fda4af", bg: "#292524" },
  { name: "Slate on cream", fg: "#475569", bg: "#f5f0e6" },
];

function Badge({ pass, label }: { pass: boolean; label: string }) {
  return (
    <span
      className={cn(
        "rounded-full border px-3 py-1 font-mono text-[10px] font-semibold tracking-[0.14em] uppercase",
        pass
          ? "border-success/40 bg-success/10 text-success"
          : "border-destructive/40 bg-destructive/10 text-destructive",
      )}
    >
      {label} {pass ? "✓" : "✕"}
    </span>
  );
}

export function ColorContrast() {
  const [fg, setFg] = useState("#1a1a1a");
  const [bg, setBg] = useState("#faf9f6");
  const [base, setBase] = useState("#2f6bff");
  const [copied, setCopied] = useState<string | null>(null);

  const analysis = useMemo(() => {
    const fgRgb = hexToRgb(fg);
    const bgRgb = hexToRgb(bg);
    if (!fgRgb || !bgRgb) return null;
    const ratio = contrastRatio(luminance(fgRgb), luminance(bgRgb));
    return {
      ratio,
      aaNormal: ratio >= 4.5,
      aaLarge: ratio >= 3,
      aaaNormal: ratio >= 7,
      aaaLarge: ratio >= 4.5,
    };
  }, [fg, bg]);

  const palette = useMemo(() => {
    const rgb = hexToRgb(base);
    if (!rgb) return [];
    const { h, s, l } = rgbToHsl(rgb);
    const entries: { name: string; hex: string }[] = [
      { name: "Base", hex: hslToHex(h, s, l) },
      { name: "Complement", hex: hslToHex((h + 180) % 360, s, l) },
      { name: "Analogous +30°", hex: hslToHex((h + 30) % 360, s, l) },
      { name: "Analogous −30°", hex: hslToHex((h + 330) % 360, s, l) },
      { name: "Split comp. 1", hex: hslToHex((h + 150) % 360, s, l) },
      { name: "Split comp. 2", hex: hslToHex((h + 210) % 360, s, l) },
      { name: "Tint 20%", hex: hslToHex(h, s, Math.min(0.92, l + 0.2)) },
      { name: "Shade 20%", hex: hslToHex(h, s, Math.max(0.08, l - 0.2)) },
    ];
    return entries;
  }, [base]);

  const copy = (value: string) => {
    void navigator.clipboard?.writeText(value).then(() => {
      setCopied(value);
      window.setTimeout(() => setCopied(null), 1200);
    });
  };

  const swap = () => {
    setFg(bg);
    setBg(fg);
  };

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {/* ── Contrast checker ─────────────────────────────────────────── */}
      <section className="border-foreground/10 bg-card overflow-hidden rounded-xl border">
        <div className="border-foreground/10 flex items-center justify-between gap-3 border-b px-5 py-3.5">
          <p className="font-mono text-[9px] tracking-[0.24em] text-muted-foreground uppercase">
            WCAG contrast checker
          </p>
          <button
            type="button"
            onClick={swap}
            aria-label="Swap foreground and background"
            className="text-muted-foreground hover:text-foreground grid size-9 cursor-pointer place-items-center rounded-lg transition-colors"
          >
            <ArrowLeftRight className="size-4.5" />
          </button>
        </div>
        <div
          className="flex min-h-44 flex-col justify-center gap-3 p-6 transition-colors"
          style={{ backgroundColor: bg, color: fg }}
        >
          <p className="font-serif text-3xl tracking-tight">The quick brown fox</p>
          <p className="max-w-md text-sm leading-relaxed">
            Jumps over the lazy dog. If you can read this comfortably, the pair works for body copy
            — not just headlines.
          </p>
          <p className="text-lg font-bold">Bold heading 18 pt</p>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-2 gap-3">
            {(
              [
                { label: "Text", value: fg, set: setFg },
                { label: "Background", value: bg, set: setBg },
              ] as const
            ).map(({ label, value, set }) => (
              <label key={label} className="block">
                <span className="text-muted-foreground font-mono text-[9px] tracking-[0.22em] uppercase">
                  {label}
                </span>
                <span className="border-foreground/12 mt-1.5 flex h-12 items-center gap-2 rounded-xl border pl-1.5">
                  <span className="relative grid size-9 shrink-0 place-items-center overflow-hidden rounded-lg border border-black/10">
                    <input
                      type="color"
                      value={/^#[0-9a-f]{6}$/i.test(value) ? value : "#000000"}
                      onChange={(event) => set(event.target.value)}
                      aria-label={`${label} colour picker`}
                      className="absolute inset-0 size-full cursor-pointer opacity-0"
                    />
                    <span
                      aria-hidden="true"
                      className="size-full"
                      style={{ background: /^#[0-9a-f]{6}$/i.test(value) ? value : "#000" }}
                    />
                    <Pipette className="pointer-events-none absolute size-4 text-white mix-blend-difference" />
                  </span>
                  <input
                    type="text"
                    value={value}
                    onChange={(event) => set(event.target.value)}
                    spellCheck={false}
                    autoCapitalize="off"
                    className="w-full bg-transparent font-mono text-sm outline-none"
                    aria-label={`${label} hex value`}
                  />
                </span>
              </label>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between gap-3">
            <p className="font-display text-4xl font-semibold tracking-tight tabular-nums">
              {analysis ? `${analysis.ratio.toFixed(2)}` : "—"}
              <span className="text-muted-foreground text-base font-normal"> : 1</span>
            </p>
          </div>
          {analysis && (
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge pass={analysis.aaNormal} label="AA normal" />
              <Badge pass={analysis.aaLarge} label="AA large" />
              <Badge pass={analysis.aaaNormal} label="AAA normal" />
              <Badge pass={analysis.aaaLarge} label="AAA large" />
            </div>
          )}
          <div className="mt-4">
            <p className="text-muted-foreground font-mono text-[8px] tracking-[0.22em] uppercase">
              Presets
            </p>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {PRESETS.map((preset) => (
                <li key={preset.name}>
                  <button
                    type="button"
                    onClick={() => {
                      setFg(preset.fg);
                      setBg(preset.bg);
                    }}
                    className="border-foreground/10 cursor-pointer overflow-hidden rounded-lg border text-[10px] font-semibold transition-transform hover:-translate-y-0.5"
                    aria-label={`Apply preset ${preset.name}`}
                  >
                    <span
                      className="block px-2.5 py-1.5"
                      style={{ background: preset.bg, color: preset.fg }}
                    >
                      Aa
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Palette harmony ───────────────────────────────────────────── */}
      <section className="border-foreground/10 bg-card overflow-hidden rounded-xl border">
        <div className="border-foreground/10 border-b px-5 py-3.5">
          <p className="font-mono text-[9px] tracking-[0.24em] text-muted-foreground uppercase">
            Palette harmony — click any chip to copy
          </p>
        </div>
        <div className="p-5">
          <label className="text-muted-foreground font-mono text-[9px] tracking-[0.22em] uppercase">
            Base colour
            <span className="border-foreground/12 mt-1.5 flex h-14 w-full max-w-56 items-center gap-2 rounded-xl border pl-1.5">
              <span className="relative size-11 shrink-0 overflow-hidden rounded-lg border border-black/10">
                <input
                  type="color"
                  value={/^#[0-9a-f]{6}$/i.test(base) ? base : "#2f6bff"}
                  onChange={(event) => setBase(event.target.value)}
                  aria-label="Base colour picker"
                  className="absolute inset-0 size-full cursor-pointer opacity-0"
                />
                <span
                  aria-hidden="true"
                  className="size-full"
                  style={{ background: /^#[0-9a-f]{6}$/i.test(base) ? base : "#2f6bff" }}
                />
              </span>
              <input
                type="text"
                value={base}
                onChange={(event) => setBase(event.target.value)}
                spellCheck={false}
                autoCapitalize="off"
                className="w-full bg-transparent font-mono outline-none"
                aria-label="Base hex value"
              />
            </span>
          </label>
          <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {palette.map(({ name, hex }) => (
              <li key={name}>
                <button
                  type="button"
                  onClick={() => copy(hex)}
                  className="group w-full cursor-pointer text-left"
                  aria-label={`Copy ${hex}`}
                >
                  <span
                    className="border-foreground/10 relative flex h-24 items-end overflow-hidden rounded-xl border p-2 transition-transform group-hover:-translate-y-0.5"
                    style={{ background: hex }}
                  >
                    <span className="grid size-7 place-items-center rounded-lg bg-black/35 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                      {copied === hex ? (
                        <Check className="size-4" strokeWidth={3} />
                      ) : (
                        <Copy className="size-4" />
                      )}
                    </span>
                  </span>
                  <span className="mt-2 block text-[11px] font-semibold">{name}</span>
                  <span className="text-muted-foreground block font-mono text-[10px] uppercase">
                    {hex}
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <p className="text-muted-foreground mt-6 border-t border-foreground/10 pt-4 text-xs leading-relaxed">
            Rule of thumb for student branding: one base, one complement, one neutral, and a tint
            and shade of each. If the text pair passes AA at 4.5:1, your palette is usable
            everywhere — posters, flyers, slides and websites.
          </p>
        </div>
      </section>
    </div>
  );
}
