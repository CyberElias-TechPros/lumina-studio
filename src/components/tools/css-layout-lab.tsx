"use client";

import { useMemo, useState } from "react";
import { Check, CheckCircle2, Copy, LayoutGrid, RotateCcw, Sparkles, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

type LabMode = "playground" | "puzzles";
type LayoutEngine = "flex" | "grid";

interface CssPuzzle {
  id: string;
  title: string;
  engine: LayoutEngine;
  goal: string;
  starterCss: string;
  boxes: { label: string; highlight?: boolean }[];
  required: { prop: string; pattern: RegExp; description: string }[];
  hint: string;
}

const PUZZLES: CssPuzzle[] = [
  {
    id: "flex-center",
    title: "1. Dead-Centre Hero Box",
    engine: "flex",
    goal: "Place the single CTA card directly in the centre both horizontally and vertically.",
    starterCss: "display: flex;\n/* Add justify-content and align-items */",
    boxes: [{ label: "Apply Now", highlight: true }],
    required: [
      { prop: "display", pattern: /^flex$/i, description: "display: flex" },
      { prop: "justify-content", pattern: /^center$/i, description: "justify-content: center" },
      { prop: "align-items", pattern: /^center$/i, description: "align-items: center" },
    ],
    hint: "Set justify-content: center; and align-items: center;",
  },
  {
    id: "flex-navbar",
    title: "2. Space-Between Navigation",
    engine: "flex",
    goal: "Push the brand mark to the far left, nav links in the middle, and button to the far right, all vertically centred.",
    starterCss: "display: flex;\njustify-content: flex-start;\nalign-items: stretch;",
    boxes: [{ label: "CEA" }, { label: "Courses · Tools" }, { label: "Apply", highlight: true }],
    required: [
      { prop: "display", pattern: /^flex$/i, description: "display: flex" },
      {
        prop: "justify-content",
        pattern: /^space-between$/i,
        description: "justify-content: space-between",
      },
      { prop: "align-items", pattern: /^center$/i, description: "align-items: center" },
    ],
    hint: "Use justify-content: space-between; and align-items: center;",
  },
  {
    id: "flex-wrap-chips",
    title: "3. Wrapping Skill Tags",
    engine: "flex",
    goal: "Allow the 6 course tags to wrap cleanly onto multiple lines with a 12px gap.",
    starterCss: "display: flex;\nflex-wrap: nowrap;",
    boxes: [
      { label: "HTML5" },
      { label: "CSS Grid" },
      { label: "JavaScript" },
      { label: "SQL" },
      { label: "Excel" },
      { label: "Python", highlight: true },
    ],
    required: [
      { prop: "display", pattern: /^flex$/i, description: "display: flex" },
      { prop: "flex-wrap", pattern: /^wrap$/i, description: "flex-wrap: wrap" },
      { prop: "gap", pattern: /^\d+(px|rem)$/i, description: "gap (e.g. 12px)" },
    ],
    hint: "Change flex-wrap to wrap; and add gap: 12px;",
  },
  {
    id: "flex-column-reverse",
    title: "4. Mobile Stack Reorder",
    engine: "flex",
    goal: "Stack items vertically from bottom to top (column-reverse) and align them to the centre.",
    starterCss: "display: flex;\nflex-direction: row;\ngap: 10px;",
    boxes: [
      { label: "1. Price" },
      { label: "2. Feature" },
      { label: "3. Headline", highlight: true },
    ],
    required: [
      { prop: "display", pattern: /^flex$/i, description: "display: flex" },
      {
        prop: "flex-direction",
        pattern: /^column-reverse$/i,
        description: "flex-direction: column-reverse",
      },
      { prop: "align-items", pattern: /^center$/i, description: "align-items: center" },
    ],
    hint: "Use flex-direction: column-reverse; and align-items: center;",
  },
  {
    id: "grid-three-cols",
    title: "5. Equal 3-Column Card Grid",
    engine: "grid",
    goal: "Arrange the 6 modules into 3 equal columns using repeat(3, 1fr) and a 12px gap.",
    starterCss: "display: grid;\ngrid-template-columns: 1fr;\ngap: 8px;",
    boxes: [
      { label: "01" },
      { label: "02" },
      { label: "03" },
      { label: "04" },
      { label: "05" },
      { label: "06", highlight: true },
    ],
    required: [
      { prop: "display", pattern: /^grid$/i, description: "display: grid" },
      {
        prop: "grid-template-columns",
        pattern: /^(repeat\(\s*3\s*,\s*1fr\s*\)|1fr\s+1fr\s+1fr)$/i,
        description: "3 equal columns (repeat(3, 1fr))",
      },
      { prop: "gap", pattern: /^12px$/i, description: "gap: 12px" },
    ],
    hint: "Set grid-template-columns: repeat(3, 1fr); and gap: 12px;",
  },
  {
    id: "grid-sidebar",
    title: "6. Sidebar + Main Content (1:3 Ratio)",
    engine: "grid",
    goal: "Build a two-column dashboard where the sidebar takes 1fr and the main area takes 3fr.",
    starterCss: "display: grid;\ngrid-template-columns: 1fr 1fr;\ngap: 12px;",
    boxes: [{ label: "Sidebar" }, { label: "Main Workspace", highlight: true }],
    required: [
      { prop: "display", pattern: /^grid$/i, description: "display: grid" },
      {
        prop: "grid-template-columns",
        pattern: /^1fr\s+3fr$/i,
        description: "grid-template-columns: 1fr 3fr",
      },
    ],
    hint: "Use grid-template-columns: 1fr 3fr;",
  },
  {
    id: "grid-auto-fit",
    title: "7. Responsive Auto-Fit Catalogue",
    engine: "grid",
    goal: "Make columns automatically fit as many 110px+ cards per row as space permits using repeat(auto-fit, minmax(110px, 1fr)).",
    starterCss: "display: grid;\ngrid-template-columns: 1fr 1fr;\ngap: 10px;",
    boxes: [
      { label: "POS" },
      { label: "Excel" },
      { label: "SQL" },
      { label: "Web", highlight: true },
    ],
    required: [
      { prop: "display", pattern: /^grid$/i, description: "display: grid" },
      {
        prop: "grid-template-columns",
        pattern: /^repeat\(\s*auto-fit\s*,\s*minmax\(\s*110px\s*,\s*1fr\s*\)\s*\)$/i,
        description: "repeat(auto-fit, minmax(110px, 1fr))",
      },
    ],
    hint: "Set grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));",
  },
  {
    id: "grid-place-items",
    title: "8. Centred Grid Tiles",
    engine: "grid",
    goal: "Create a 2-column grid (1fr 1fr) and centre every item inside its grid cell with align-items: center and justify-items: center.",
    starterCss: "display: grid;\ngrid-template-columns: 1fr 1fr;\ngap: 12px;",
    boxes: [{ label: "A" }, { label: "B" }, { label: "C" }, { label: "D", highlight: true }],
    required: [
      { prop: "display", pattern: /^grid$/i, description: "display: grid" },
      {
        prop: "grid-template-columns",
        pattern: /^(1fr\s+1fr|repeat\(\s*2\s*,\s*1fr\s*\))$/i,
        description: "2 columns",
      },
      { prop: "align-items", pattern: /^center$/i, description: "align-items: center" },
      { prop: "justify-items", pattern: /^center$/i, description: "justify-items: center" },
    ],
    hint: "Add align-items: center; and justify-items: center;",
  },
];

function parseDeclarations(cssText: string): Record<string, string> {
  const clean = cssText.replace(/\/\*[\s\S]*?\*\//g, "");
  const out: Record<string, string> = {};
  for (const decl of clean.split(";")) {
    const idx = decl.indexOf(":");
    if (idx === -1) continue;
    const prop = decl.slice(0, idx).trim().toLowerCase();
    const val = decl.slice(idx + 1).trim();
    if (prop && val) out[prop] = val;
  }
  return out;
}

function declsToReactStyle(decls: Record<string, string>): React.CSSProperties {
  const style: React.CSSProperties = {};
  if (decls.display === "flex" || decls.display === "grid") style.display = decls.display;
  if (decls["flex-direction"])
    style.flexDirection = decls["flex-direction"] as React.CSSProperties["flexDirection"];
  if (decls["justify-content"]) style.justifyContent = decls["justify-content"];
  if (decls["align-items"]) style.alignItems = decls["align-items"];
  if (decls["flex-wrap"]) style.flexWrap = decls["flex-wrap"] as React.CSSProperties["flexWrap"];
  if (decls["grid-template-columns"]) style.gridTemplateColumns = decls["grid-template-columns"];
  if (decls["justify-items"]) style.justifyItems = decls["justify-items"];
  if (decls.gap) style.gap = decls.gap;
  return style;
}

export function CssLayoutLab() {
  const [mode, setMode] = useState<LabMode>("playground");

  // Playground state
  const [engine, setEngine] = useState<LayoutEngine>("flex");
  const [flexDirection, setFlexDirection] = useState<
    "row" | "row-reverse" | "column" | "column-reverse"
  >("row");
  const [justifyContent, setJustifyContent] = useState<
    "flex-start" | "center" | "flex-end" | "space-between" | "space-around"
  >("space-between");
  const [alignItems, setAlignItems] = useState<"stretch" | "flex-start" | "center" | "flex-end">(
    "center",
  );
  const [flexWrap, setFlexWrap] = useState<"nowrap" | "wrap">("wrap");
  const [gridCols, setGridCols] = useState("repeat(3, 1fr)");
  const [justifyItems, setJustifyItems] = useState<"stretch" | "start" | "center" | "end">(
    "stretch",
  );
  const [gapPx, setGapPx] = useState(12);
  const [itemCount, setItemCount] = useState(4);
  const [copied, setCopied] = useState(false);

  // Puzzle state
  const [puzzleIdx, setPuzzleIdx] = useState(0);
  const activePuzzle = PUZZLES[puzzleIdx];
  const [puzzleCss, setPuzzleCss] = useState(activePuzzle.starterCss);
  const [showHint, setShowHint] = useState(false);
  const [solvedIds, setSolvedIds] = useState<string[]>([]);

  const generatedCss = useMemo(() => {
    if (engine === "flex") {
      return `.container {\n  display: flex;\n  flex-direction: ${flexDirection};\n  justify-content: ${justifyContent};\n  align-items: ${alignItems};\n  flex-wrap: ${flexWrap};\n  gap: ${gapPx}px;\n}`;
    }
    return `.container {\n  display: grid;\n  grid-template-columns: ${gridCols};\n  align-items: ${alignItems};\n  justify-items: ${justifyItems};\n  gap: ${gapPx}px;\n}`;
  }, [engine, flexDirection, justifyContent, alignItems, flexWrap, gridCols, justifyItems, gapPx]);

  const parsedPuzzleDecls = useMemo(() => parseDeclarations(puzzleCss), [puzzleCss]);
  const puzzleChecks = useMemo(
    () =>
      activePuzzle.required.map((req) => ({
        description: req.description,
        passed: Boolean(
          parsedPuzzleDecls[req.prop] && req.pattern.test(parsedPuzzleDecls[req.prop]),
        ),
      })),
    [activePuzzle, parsedPuzzleDecls],
  );
  const puzzleSolved = puzzleChecks.every((c) => c.passed);

  if (puzzleSolved && !solvedIds.includes(activePuzzle.id)) {
    setSolvedIds((prev) => [...prev, activePuzzle.id]);
  }

  const copyCss = async () => {
    try {
      await navigator.clipboard.writeText(generatedCss);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="space-y-6">
      {/* Mode switcher */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="border-foreground/12 bg-card inline-flex rounded-full border p-1">
          <button
            type="button"
            onClick={() => setMode("playground")}
            className={cn(
              "cursor-pointer rounded-full px-4 py-1.5 text-xs font-semibold transition-colors",
              mode === "playground"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            Visual Explorer
          </button>
          <button
            type="button"
            onClick={() => setMode("puzzles")}
            className={cn(
              "cursor-pointer rounded-full px-4 py-1.5 text-xs font-semibold transition-colors",
              mode === "puzzles"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            8 Layout Puzzles ({solvedIds.length}/{PUZZLES.length})
          </button>
        </div>

        <div className="text-muted-foreground flex items-center gap-2 font-mono text-xs">
          <Trophy className="text-primary size-4" aria-hidden="true" />
          <span>
            {solvedIds.length} of {PUZZLES.length} puzzles solved
          </span>
        </div>
      </div>

      {mode === "playground" ? (
        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)]">
          {/* Controls */}
          <div className="border-foreground/10 bg-card space-y-5 rounded-2xl border p-5">
            <div>
              <p className="font-mono text-[10px] tracking-[0.2em] text-primary uppercase">
                1. Layout Engine
              </p>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {(["flex", "grid"] as LayoutEngine[]).map((eng) => (
                  <button
                    key={eng}
                    type="button"
                    onClick={() => setEngine(eng)}
                    className={cn(
                      "cursor-pointer rounded-xl border py-2 text-xs font-semibold uppercase",
                      engine === eng
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-foreground/12 hover:bg-muted",
                    )}
                  >
                    display: {eng}
                  </button>
                ))}
              </div>
            </div>

            {engine === "flex" ? (
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block text-xs">
                  <span className="text-muted-foreground font-mono text-[10px] uppercase">
                    flex-direction
                  </span>
                  <select
                    value={flexDirection}
                    onChange={(e) => setFlexDirection(e.target.value as typeof flexDirection)}
                    className="border-foreground/15 bg-background mt-1 w-full rounded-lg border px-2.5 py-2 text-xs"
                  >
                    {["row", "row-reverse", "column", "column-reverse"].map((v) => (
                      <option key={v} value={v}>
                        {v}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block text-xs">
                  <span className="text-muted-foreground font-mono text-[10px] uppercase">
                    justify-content
                  </span>
                  <select
                    value={justifyContent}
                    onChange={(e) => setJustifyContent(e.target.value as typeof justifyContent)}
                    className="border-foreground/15 bg-background mt-1 w-full rounded-lg border px-2.5 py-2 text-xs"
                  >
                    {["flex-start", "center", "flex-end", "space-between", "space-around"].map(
                      (v) => (
                        <option key={v} value={v}>
                          {v}
                        </option>
                      ),
                    )}
                  </select>
                </label>
                <label className="block text-xs">
                  <span className="text-muted-foreground font-mono text-[10px] uppercase">
                    align-items
                  </span>
                  <select
                    value={alignItems}
                    onChange={(e) => setAlignItems(e.target.value as typeof alignItems)}
                    className="border-foreground/15 bg-background mt-1 w-full rounded-lg border px-2.5 py-2 text-xs"
                  >
                    {["stretch", "flex-start", "center", "flex-end"].map((v) => (
                      <option key={v} value={v}>
                        {v}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block text-xs">
                  <span className="text-muted-foreground font-mono text-[10px] uppercase">
                    flex-wrap
                  </span>
                  <select
                    value={flexWrap}
                    onChange={(e) => setFlexWrap(e.target.value as typeof flexWrap)}
                    className="border-foreground/15 bg-background mt-1 w-full rounded-lg border px-2.5 py-2 text-xs"
                  >
                    {["nowrap", "wrap"].map((v) => (
                      <option key={v} value={v}>
                        {v}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block text-xs sm:col-span-2">
                  <span className="text-muted-foreground font-mono text-[10px] uppercase">
                    grid-template-columns
                  </span>
                  <select
                    value={gridCols}
                    onChange={(e) => setGridCols(e.target.value)}
                    className="border-foreground/15 bg-background mt-1 w-full rounded-lg border px-2.5 py-2 text-xs"
                  >
                    <option value="repeat(2, 1fr)">repeat(2, 1fr)</option>
                    <option value="repeat(3, 1fr)">repeat(3, 1fr)</option>
                    <option value="1fr 2fr">1fr 2fr (sidebar + main)</option>
                    <option value="repeat(auto-fit, minmax(110px, 1fr))">
                      repeat(auto-fit, minmax(110px, 1fr))
                    </option>
                  </select>
                </label>
                <label className="block text-xs">
                  <span className="text-muted-foreground font-mono text-[10px] uppercase">
                    align-items
                  </span>
                  <select
                    value={alignItems}
                    onChange={(e) => setAlignItems(e.target.value as typeof alignItems)}
                    className="border-foreground/15 bg-background mt-1 w-full rounded-lg border px-2.5 py-2 text-xs"
                  >
                    {["stretch", "start", "center", "end"].map((v) => (
                      <option key={v} value={v}>
                        {v}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block text-xs">
                  <span className="text-muted-foreground font-mono text-[10px] uppercase">
                    justify-items
                  </span>
                  <select
                    value={justifyItems}
                    onChange={(e) => setJustifyItems(e.target.value as typeof justifyItems)}
                    className="border-foreground/15 bg-background mt-1 w-full rounded-lg border px-2.5 py-2 text-xs"
                  >
                    {["stretch", "start", "center", "end"].map((v) => (
                      <option key={v} value={v}>
                        {v}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-xs">
                <span className="text-muted-foreground font-mono text-[10px] uppercase">
                  gap: {gapPx}px
                </span>
                <input
                  type="range"
                  min={0}
                  max={32}
                  step={4}
                  value={gapPx}
                  onChange={(e) => setGapPx(Number(e.target.value))}
                  className="mt-2 w-full accent-primary"
                />
              </label>
              <label className="block text-xs">
                <span className="text-muted-foreground font-mono text-[10px] uppercase">
                  Items: {itemCount}
                </span>
                <input
                  type="range"
                  min={2}
                  max={8}
                  value={itemCount}
                  onChange={(e) => setItemCount(Number(e.target.value))}
                  className="mt-2 w-full accent-primary"
                />
              </label>
            </div>

            <div className="relative rounded-xl bg-[#0b1220] p-4 font-mono text-xs leading-relaxed text-slate-200">
              <button
                type="button"
                onClick={copyCss}
                className="absolute top-3 right-3 inline-flex cursor-pointer items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-[10px] text-white hover:bg-white/20"
              >
                {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
                {copied ? "Copied" : "Copy CSS"}
              </button>
              <pre className="overflow-x-auto">{generatedCss}</pre>
            </div>
          </div>

          {/* Live stage */}
          <div className="border-foreground/10 bg-card flex flex-col rounded-2xl border p-5">
            <p className="font-mono text-[10px] tracking-[0.2em] text-primary uppercase">
              Live Stage
            </p>
            <div
              className="border-foreground/15 bg-muted/40 mt-3 min-h-[320px] flex-1 rounded-xl border border-dashed p-4"
              style={
                engine === "flex"
                  ? {
                      display: "flex",
                      flexDirection,
                      justifyContent,
                      alignItems,
                      flexWrap,
                      gap: `${gapPx}px`,
                    }
                  : {
                      display: "grid",
                      gridTemplateColumns: gridCols,
                      alignItems,
                      justifyItems,
                      gap: `${gapPx}px`,
                    }
              }
            >
              {Array.from({ length: itemCount }, (_, i) => (
                <div
                  key={i}
                  className="bg-primary text-primary-foreground flex min-h-14 min-w-16 items-center justify-center rounded-xl px-4 py-2 font-mono text-xs font-bold shadow-sm"
                >
                  Box {i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          {/* Puzzle pills */}
          <div className="flex flex-wrap gap-2">
            {PUZZLES.map((p, idx) => {
              const done = solvedIds.includes(p.id);
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    setPuzzleIdx(idx);
                    setPuzzleCss(p.starterCss);
                    setShowHint(false);
                  }}
                  className={cn(
                    "inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium",
                    idx === puzzleIdx
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-foreground/15 bg-card hover:bg-muted",
                  )}
                >
                  {done && <CheckCircle2 className="size-3.5" aria-hidden="true" />}
                  <span>{p.title}</span>
                </button>
              );
            })}
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="border-foreground/10 bg-card space-y-4 rounded-2xl border p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-primary font-mono text-[10px] tracking-[0.2em] uppercase">
                    {activePuzzle.engine.toUpperCase()} PUZZLE
                  </p>
                  <h3 className="font-display mt-1 text-xl font-semibold">{activePuzzle.title}</h3>
                  <p className="text-muted-foreground mt-1 text-sm">{activePuzzle.goal}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setPuzzleCss(activePuzzle.starterCss)}
                  className="border-foreground/15 hover:bg-muted inline-flex shrink-0 cursor-pointer items-center gap-1 rounded-full border px-3 py-1 text-xs"
                >
                  <RotateCcw className="size-3" /> Reset
                </button>
              </div>

              <div className="overflow-hidden rounded-xl bg-[#0b1220] p-4 font-mono text-xs text-slate-200">
                <p className="text-slate-400">.container &#123;</p>
                <textarea
                  aria-label="Puzzle CSS declarations"
                  value={puzzleCss}
                  onChange={(e) => setPuzzleCss(e.target.value)}
                  rows={6}
                  spellCheck={false}
                  className="my-1 w-full resize-none bg-transparent pl-3 font-mono text-[13px] leading-6 text-sky-200 focus:outline-none"
                />
                <p className="text-slate-400">&#125;</p>
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setShowHint((h) => !h)}
                  className="text-primary cursor-pointer text-xs font-semibold hover:underline"
                >
                  {showHint ? "Hide hint" : "Show hint"}
                </button>
                <span className="text-muted-foreground font-mono text-xs">
                  {puzzleChecks.filter((c) => c.passed).length}/{puzzleChecks.length} rules matched
                </span>
              </div>

              {showHint && (
                <p className="bg-primary/8 rounded-xl px-4 py-2.5 text-xs">{activePuzzle.hint}</p>
              )}

              <ul className="space-y-1.5 text-xs">
                {puzzleChecks.map((chk) => (
                  <li key={chk.description} className="flex items-center gap-2">
                    <CheckCircle2
                      className={cn(
                        "size-4",
                        chk.passed ? "text-emerald-600" : "text-muted-foreground/40",
                      )}
                    />
                    <span className={chk.passed ? "font-semibold" : "text-muted-foreground"}>
                      {chk.description}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-foreground/10 bg-card flex flex-col rounded-2xl border p-5">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.2em] text-primary uppercase">
                  <LayoutGrid className="size-3.5" /> Puzzle Canvas
                </span>
                {puzzleSolved && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                    <Sparkles className="size-3.5" /> Solved!
                  </span>
                )}
              </div>
              <div
                className="border-foreground/15 bg-muted/40 mt-3 min-h-[280px] flex-1 rounded-xl border border-dashed p-4"
                style={declsToReactStyle(parsedPuzzleDecls)}
              >
                {activePuzzle.boxes.map((box, i) => (
                  <div
                    key={i}
                    className={cn(
                      "rounded-xl px-3.5 py-2.5 text-center font-mono text-xs font-bold shadow-sm",
                      box.highlight
                        ? "bg-primary text-primary-foreground"
                        : "bg-card text-foreground border-foreground/15 border",
                    )}
                  >
                    {box.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
