"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type ChangeEvent } from "react";
import { ChevronDown, ChevronUp, History, RotateCcw, Target, Trash2, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

/* ────────────────────────────────────────────────────────────────────────
 * CEA Typing — a monkeytype-class speed test built for the academy's
 * digital-skills courses. Common-word timed tests, home-row drills,
 * number drills and original CEA passages. History lives in localStorage.
 * ────────────────────────────────────────────────────────────────────── */

const COMMON_WORDS = [
  "about",
  "above",
  "action",
  "add",
  "again",
  "age",
  "agree",
  "air",
  "all",
  "also",
  "always",
  "and",
  "answer",
  "any",
  "apple",
  "area",
  "around",
  "ask",
  "back",
  "basic",
  "before",
  "begin",
  "below",
  "best",
  "between",
  "big",
  "blue",
  "book",
  "both",
  "bring",
  "build",
  "but",
  "business",
  "call",
  "came",
  "can",
  "car",
  "carry",
  "change",
  "city",
  "clear",
  "close",
  "come",
  "computer",
  "consider",
  "could",
  "course",
  "day",
  "deal",
  "design",
  "different",
  "do",
  "does",
  "door",
  "each",
  "early",
  "earth",
  "easy",
  "education",
  "end",
  "enough",
  "even",
  "every",
  "example",
  "eye",
  "fact",
  "family",
  "far",
  "feel",
  "few",
  "find",
  "first",
  "floor",
  "follow",
  "food",
  "for",
  "form",
  "found",
  "four",
  "friend",
  "front",
  "full",
  "future",
  "general",
  "get",
  "give",
  "good",
  "great",
  "group",
  "grow",
  "hand",
  "happen",
  "has",
  "head",
  "help",
  "here",
  "high",
  "hold",
  "home",
  "hospital",
  "house",
  "how",
  "idea",
  "image",
  "important",
  "in",
  "inside",
  "interest",
  "into",
  "issue",
  "job",
  "keep",
  "kind",
  "know",
  "knowledge",
  "large",
  "last",
  "late",
  "learn",
  "left",
  "lesson",
  "letter",
  "level",
  "life",
  "light",
  "like",
  "line",
  "list",
  "live",
  "local",
  "long",
  "look",
  "love",
  "machine",
  "made",
  "make",
  "man",
  "manage",
  "market",
  "matter",
  "may",
  "mean",
  "meet",
  "memory",
  "might",
  "mind",
  "money",
  "month",
  "morning",
  "most",
  "move",
  "much",
  "music",
  "name",
  "near",
  "need",
  "never",
  "new",
  "night",
  "number",
  "office",
  "often",
  "old",
  "once",
  "one",
  "only",
  "open",
  "order",
  "other",
  "our",
  "out",
  "over",
  "own",
  "page",
  "paper",
  "part",
  "people",
  "place",
  "plan",
  "play",
  "point",
  "power",
  "practice",
  "problem",
  "program",
  "project",
  "public",
  "quick",
  "question",
  "read",
  "real",
  "reason",
  "right",
  "room",
  "run",
  "school",
  "science",
  "screen",
  "search",
  "second",
  "see",
  "self",
  "send",
  "sense",
  "service",
  "share",
  "short",
  "should",
  "show",
  "side",
  "small",
  "software",
  "some",
  "sound",
  "south",
  "space",
  "stand",
  "start",
  "state",
  "story",
  "study",
  "student",
  "system",
  "table",
  "take",
  "talk",
  "team",
  "technology",
  "tell",
  "text",
  "than",
  "thank",
  "that",
  "the",
  "their",
  "them",
  "then",
  "there",
  "they",
  "thing",
  "think",
  "this",
  "time",
  "together",
  "tool",
  "touch",
  "true",
  "try",
  "type",
  "understand",
  "under",
  "until",
  "upon",
  "use",
  "used",
  "user",
  "very",
  "voice",
  "wait",
  "walk",
  "want",
  "water",
  "way",
  "well",
  "what",
  "when",
  "where",
  "which",
  "while",
  "white",
  "whole",
  "will",
  "win",
  "window",
  "with",
  "without",
  "woman",
  "work",
  "world",
  "would",
  "write",
  "year",
  "young",
  "your",
];

const HOME_ROW_WORDS = [
  "as",
  "ad",
  "add",
  "all",
  "ask",
  "asks",
  "sad",
  "dad",
  "fall",
  "flask",
  "glass",
  "glad",
  "flag",
  "flags",
  "hall",
  "half",
  "has",
  "ash",
  "lash",
  "lag",
  "slab",
  "slash",
  "jag",
  "jags",
  "gala",
  "saga",
  "salsa",
  "shall",
  "salad",
  "alfalfa",
  "glasses",
  "flagfall",
  "alas",
];

const PASSAGES = [
  "Practice is the quiet engine behind every confident typist. Ten minutes a day beats two hours on a Sunday, and your fingers will remember what your eyes have seen a hundred times.",
  "A computer is a tool that rewards patience. Learn the keyboard first, then the mouse, then the shortcuts — and watch how quickly the machine starts to feel like a natural extension of your thinking.",
  "The teachers at the centre all say the same thing: everyone can learn to type well. Nobody is born fast. The ones who are fast simply refused to give up after week one.",
  "Good documents are written in clear sentences. Good spreadsheets are built in small steps. Good websites are shipped early and improved in public. Start messy, then refine.",
  "When you apply for a job in Port Harcourt, the first test is often a keyboard and a clock. Finish this paragraph without looking down, and you have already outpaced half the room.",
  "Every expert at the academy was once a beginner holding a mouse like a pencil. They did not wait until they felt ready. They started, typed badly, and improved one session at a time.",
  "Two sessions a week is all it takes to change a career. Show up, ask questions, practise after class, and let the compound interest of small daily effort do its quiet work.",
  "The internet rewards people who can produce. Designs, documents, spreadsheets, websites — the person who makes one useful thing a week will never be short of opportunities.",
];

type Mode = "time" | "quotes";
type WordSet = "common" | "home" | "numbers";
type Phase = "idle" | "running" | "done";

type HistoryEntry = {
  wpm: number;
  raw: number;
  accuracy: number;
  consistency: number;
  mode: Mode;
  duration: number;
  date: string;
};

const HISTORY_KEY = "cea-typing-history";
const DURATIONS = [15, 30, 60, 120] as const;

const pickWords = (set: WordSet, count: number): string[] => {
  if (set === "numbers") {
    return Array.from({ length: count }, () => String(Math.floor(100 + Math.random() * 9900)));
  }
  const source = set === "home" ? HOME_ROW_WORDS : COMMON_WORDS;
  const out: string[] = [];
  for (let i = 0; i < count; i++) {
    out.push(source[Math.floor(Math.random() * source.length)]);
  }
  return out;
};

const loadHistory = (): HistoryEntry[] => {
  try {
    const raw = window.localStorage.getItem(HISTORY_KEY);
    return raw ? (JSON.parse(raw) as HistoryEntry[]) : [];
  } catch {
    return [];
  }
};

export function TypingTest() {
  const [mode, setMode] = useState<Mode>("time");
  const [duration, setDuration] = useState<number>(30);
  const [wordSet, setWordSet] = useState<WordSet>("common");
  const [phase, setPhase] = useState<Phase>("idle");
  const [target, setTarget] = useState("");
  const [input, setInput] = useState("");
  const [remaining, setRemaining] = useState(30);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const startTimeRef = useRef<number | null>(null);
  const correctKeystrokesRef = useRef(0);
  const wrongKeystrokesRef = useRef(0);
  const secondSamplesRef = useRef<{ t: number; correct: number }[]>([]);
  const lastSampleRef = useRef(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const wordsContainerRef = useRef<HTMLDivElement | null>(null);
  const currentWordRef = useRef<HTMLSpanElement | null>(null);

  const buildTarget = useCallback((nextMode: Mode, nextDuration: number, nextSet: WordSet) => {
    if (nextMode === "quotes") {
      const passage = PASSAGES[Math.floor(Math.random() * PASSAGES.length)];
      setTarget(passage);
    } else {
      setTarget(pickWords(nextSet, 500).join(" "));
    }
    setInput("");
    setPhase("idle");
    setRemaining(nextDuration);
    startTimeRef.current = null;
    correctKeystrokesRef.current = 0;
    wrongKeystrokesRef.current = 0;
    secondSamplesRef.current = [];
    lastSampleRef.current = 0;
  }, []);

  const restart = useCallback(
    (nextMode = mode, nextDuration = duration, nextSet = wordSet) => {
      buildTarget(nextMode, nextDuration, nextSet);
      window.setTimeout(() => inputRef.current?.focus(), 30);
    },
    [buildTarget, mode, duration, wordSet],
  );

  useEffect(() => {
    buildTarget("time", 30, "common");
    setHistory(loadHistory());
  }, [buildTarget]);

  // Keep focus on the hidden input whenever the test is interactive.
  useEffect(() => {
    if (phase !== "done") inputRef.current?.focus();
  }, [phase, mode, duration, wordSet]);

  // Auto-scroll the current word into view inside the word window.
  useEffect(() => {
    currentWordRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [input.length]);

  // Tab anywhere inside the component restarts the test.
  const rootRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const targetNode = event.target as Node | null;
      if (rootRef.current && targetNode && !rootRef.current.contains(targetNode)) return;
      event.preventDefault();
      restart();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [restart]);

  const finish = useCallback(
    (finalInput: string) => {
      const elapsed = startTimeRef.current ? (Date.now() - startTimeRef.current) / 1000 : 1;
      const totalTyped = correctKeystrokesRef.current + wrongKeystrokesRef.current;
      const accuracy = totalTyped === 0 ? 0 : (correctKeystrokesRef.current / totalTyped) * 100;
      const minutes = Math.max(elapsed / 60, 1 / 600);
      const correctChars = [...finalInput].filter((char, index) => target[index] === char).length;
      const wpm = correctChars / 5 / minutes;
      const raw = totalTyped / 5 / minutes;

      const samples = secondSamplesRef.current;
      const deltas: number[] = [];
      for (let i = 1; i < samples.length; i++) {
        deltas.push(samples[i].correct - samples[i - 1].correct);
      }
      let consistency = 0;
      if (deltas.length > 1) {
        const mean = deltas.reduce((a, b) => a + b, 0) / deltas.length;
        const variance = deltas.reduce((acc, d) => acc + (d - mean) ** 2, 0) / deltas.length;
        const std = Math.sqrt(variance);
        consistency = mean === 0 ? 0 : Math.max(0, Math.min(100, 100 * (1 - std / mean)));
      } else if (deltas.length === 1) {
        consistency = 100;
      }

      const entry: HistoryEntry = {
        wpm: Math.round(wpm),
        raw: Math.round(raw),
        accuracy: Math.round(accuracy),
        consistency: Math.round(consistency),
        mode,
        duration,
        date: new Date().toISOString(),
      };
      setHistory((current) => {
        const next = [entry, ...current].slice(0, 20);
        try {
          window.localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
        } catch {
          /* storage full — keep in memory */
        }
        return next;
      });
      setPhase("done");
    },
    [duration, mode, target],
  );

  // Timer loop (100ms resolution).
  useEffect(() => {
    if (phase !== "running") return;
    const id = window.setInterval(() => {
      const start = startTimeRef.current;
      if (!start) return;
      const elapsed = (Date.now() - start) / 1000;
      const left = duration - elapsed;
      if (left <= 0) {
        setRemaining(0);
        window.clearInterval(id);
        finish(inputRef.current?.value ?? "");
        return;
      }
      setRemaining(left);

      // Per-second sample for consistency.
      const wholeSecond = Math.floor(elapsed);
      if (wholeSecond > lastSampleRef.current) {
        const correctChars = [...(inputRef.current?.value ?? "")].filter(
          (char, index) => target[index] === char,
        ).length;
        secondSamplesRef.current.push({ t: wholeSecond, correct: correctChars });
        lastSampleRef.current = wholeSecond;
      }
    }, 100);
    return () => window.clearInterval(id);
  }, [phase, duration, finish, target]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const next = event.target.value;
    if (phase === "done") return;
    if (phase === "idle" && next.length > 0) {
      setPhase("running");
      startTimeRef.current = Date.now();
      secondSamplesRef.current = [{ t: 0, correct: 0 }];
      lastSampleRef.current = 0;
    }
    // Keystroke accounting (forward typing only)
    if (next.length > input.length) {
      const added = next.length - input.length;
      for (let offset = 0; offset < added; offset++) {
        const position = input.length + offset;
        if (next[position] === target[position]) correctKeystrokesRef.current += 1;
        else wrongKeystrokesRef.current += 1;
      }
    }
    setInput(next);

    if (mode === "quotes" && next === target) {
      finish(next);
    }
  };

  // Derived stats (live)
  const elapsedMs = startTimeRef.current ? Date.now() - startTimeRef.current : 0;
  const elapsed = Math.max(elapsedMs / 1000, 0.001);
  const correctCharsNow = [...input].filter((char, i) => target[i] === char).length;
  const liveWpm =
    phase === "done" || phase === "running" ? Math.round(correctCharsNow / 5 / (elapsed / 60)) : 0;
  const totalTyped = correctKeystrokesRef.current + wrongKeystrokesRef.current;
  const liveAccuracy =
    totalTyped === 0 ? 100 : Math.round((correctKeystrokesRef.current / totalTyped) * 100);

  const words = useMemo(() => {
    const result: { word: string; start: number }[] = [];
    let cursor = 0;
    for (const word of target.split(" ")) {
      result.push({ word, start: cursor });
      cursor += word.length + 1;
    }
    return result;
  }, [target]);

  const best = history.length ? Math.max(...history.map((entry) => entry.wpm)) : null;
  const currentWordIndex = useMemo(() => {
    let index = 0;
    for (let i = 0; i < words.length; i++) {
      if (input.length >= words[i].start && input.length <= words[i].start + words[i].word.length) {
        index = i;
        break;
      }
      index = i;
    }
    return index;
  }, [input.length, words]);

  const progress =
    mode === "time"
      ? Math.max(0, Math.min(1, remaining / duration))
      : target.length
        ? Math.min(1, input.length / target.length)
        : 0;

  return (
    <div
      ref={rootRef}
      className="border-white/12 relative overflow-hidden rounded-2xl border bg-[#070d1d] text-[#eef2fb] shadow-[0_24px_70px_-32px_rgba(0,0,0,0.8)]"
    >
      {/* Time progress hairline */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-0.5 bg-white/5">
        <div
          className="h-full bg-gradient-to-r from-[#2f6bff] via-[#8ec4ff] to-[#c4b0ff] transition-[width] duration-100 ease-linear"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* Controls row */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/8 px-4 py-3 sm:px-6">
        <div className="flex flex-wrap items-center gap-1.5">
          {(
            [
              { id: "time", label: "Time" },
              { id: "quotes", label: "Quotes" },
            ] as { id: Mode; label: string }[]
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setMode(tab.id);
                restart(tab.id, duration, wordSet);
              }}
              className={cn(
                "h-8 cursor-pointer rounded-full px-3.5 font-mono text-[10px] font-semibold tracking-[0.18em] uppercase transition-colors",
                mode === tab.id ? "bg-[#f2f6ff] text-[#0a1120]" : "text-[#8ba3c7] hover:text-white",
              )}
              aria-pressed={mode === tab.id}
            >
              {tab.label}
            </button>
          ))}
          <span aria-hidden="true" className="mx-1 h-4 w-px bg-white/10" />
          {mode === "time" &&
            DURATIONS.map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => {
                  setDuration(value);
                  restart("time", value, wordSet);
                }}
                className={cn(
                  "h-8 w-9 cursor-pointer rounded-full font-mono text-[11px] tabular-nums transition-colors",
                  duration === value
                    ? "bg-[#2f6bff] text-white"
                    : "text-[#8ba3c7] hover:text-white",
                )}
                aria-pressed={duration === value}
              >
                {value}
              </button>
            ))}
          {mode === "time" && (
            <>
              <span aria-hidden="true" className="mx-1 h-4 w-px bg-white/10" />
              {(
                [
                  { id: "common", label: "Common" },
                  { id: "home", label: "Home row" },
                  { id: "numbers", label: "Numbers" },
                ] as { id: WordSet; label: string }[]
              ).map((set) => (
                <button
                  key={set.id}
                  type="button"
                  onClick={() => {
                    setWordSet(set.id);
                    restart("time", duration, set.id);
                  }}
                  className={cn(
                    "h-8 cursor-pointer rounded-full border px-3 font-mono text-[10px] uppercase transition-colors",
                    wordSet === set.id
                      ? "border-[#2f6bff]/60 bg-[#2f6bff]/20 text-[#8ec4ff]"
                      : "border-white/12 text-[#8ba3c7] hover:text-white",
                  )}
                  aria-pressed={wordSet === set.id}
                >
                  {set.label}
                </button>
              ))}
            </>
          )}
        </div>
        <button
          type="button"
          onClick={() => setShowHistory((v) => !v)}
          className="inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-full border border-white/12 px-3 font-mono text-[10px] tracking-[0.18em] text-[#8ba3c7] uppercase transition-colors hover:text-white"
          aria-expanded={showHistory}
        >
          <History className="size-3.5" />
          {best ? `Best ${best} wpm` : "History"}
          {showHistory ? <ChevronUp className="size-3.5" /> : <ChevronDown className="size-3.5" />}
        </button>
      </div>

      {/* History panel */}
      {showHistory && (
        <div className="border-b border-white/8 bg-[#050b1c] px-4 py-4 sm:px-6">
          <div className="flex items-center justify-between gap-3">
            <p className="font-mono text-[9px] tracking-[0.24em] text-[#7d94b5] uppercase">
              Your last {Math.min(history.length, 8)} runs
            </p>
            {history.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  setHistory([]);
                  try {
                    window.localStorage.removeItem(HISTORY_KEY);
                  } catch {
                    /* ignore */
                  }
                }}
                className="inline-flex cursor-pointer items-center gap-1.5 font-mono text-[9px] tracking-[0.2em] text-[#f87171] uppercase hover:text-[#fca5a5]"
              >
                <Trash2 className="size-3.5" /> Clear
              </button>
            )}
          </div>
          {history.length === 0 ? (
            <p className="text-muted-foreground mt-3 text-sm">
              No runs yet. Finish a test and it lands here — only on this device.
            </p>
          ) : (
            <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {history.slice(0, 8).map((entry, index) => (
                <li
                  key={`${entry.date}-${index}`}
                  className="border-white/8 rounded-xl border bg-white/[0.03] px-3 py-2.5"
                >
                  <p className="font-display text-xl font-semibold tabular-nums">
                    {entry.wpm}
                    <span className="ml-1 text-[10px] font-normal text-[#7d94b5]">wpm</span>
                  </p>
                  <p className="mt-1 font-mono text-[9px] tracking-wide text-[#8ba3c7] tabular-nums">
                    ACC {entry.accuracy}% · RAW {entry.raw} ·{" "}
                    {entry.mode === "time" ? `${entry.duration}s` : "quote"}
                  </p>
                  <p className="mt-0.5 font-mono text-[8px] text-[#4b5b7d]">
                    {new Date(entry.date).toLocaleDateString("en-NG", {
                      day: "numeric",
                      month: "short",
                    })}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Test area */}
      <div className="relative px-4 py-6 sm:px-8 sm:py-8">
        {/* Hidden input captures keystrokes */}
        <input
          ref={inputRef}
          value={input}
          onChange={handleChange}
          onPaste={(event) => event.preventDefault()}
          className="pointer-events-none absolute size-0 opacity-0"
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          aria-label="Typing test input"
          disabled={phase === "done"}
        />

        {phase !== "done" ? (
          <>
            <div className="flex items-baseline justify-between gap-4">
              <p className="font-mono text-[10px] tracking-[0.24em] text-[#7d94b5] uppercase">
                {mode === "time" ? `${remaining.toFixed(0)}s remaining` : "Passage"}
              </p>
              <p className="font-mono text-[10px] tracking-[0.24em] text-[#7d94b5] uppercase tabular-nums">
                {liveWpm} wpm · acc {liveAccuracy}%
              </p>
            </div>
            <div
              ref={wordsContainerRef}
              onClick={() => inputRef.current?.focus()}
              className="relative mt-5 max-h-44 cursor-text overflow-hidden text-xl leading-[2.35] font-medium select-none sm:max-h-48 sm:text-2xl"
              aria-hidden="true"
            >
              {words.map(({ word, start }, wordIndex) => {
                const isCurrent = wordIndex === currentWordIndex;
                return (
                  <span
                    key={`${start}-${wordIndex}`}
                    ref={isCurrent ? currentWordRef : undefined}
                    className="inline-block"
                  >
                    {[...word].map((char, charIndex) => {
                      const absolute = start + charIndex;
                      const typed = absolute < input.length;
                      const correct = typed && input[absolute] === char;
                      const wrong = typed && input[absolute] !== char;
                      const isCaret = absolute === input.length;
                      return (
                        <span
                          key={charIndex}
                          className={cn(
                            "rounded-sm transition-colors",
                            !typed && "text-[#4b5b7d]",
                            correct && "text-[#eef2fb]",
                            wrong && "bg-[#f87171]/15 text-[#f87171]",
                            isCaret &&
                              "animate-blink shadow-[inset_2.5px_0_0_0_#8ec4ff] text-[#c8d6ef]",
                          )}
                        >
                          {char}
                        </span>
                      );
                    })}
                    {/* space between words */}
                    {(() => {
                      const absolute = start + word.length;
                      const typed = absolute < input.length;
                      const correct = typed && input[absolute] === " ";
                      const wrong = typed && input[absolute] !== " ";
                      const isCaret = absolute === input.length;
                      return absolute < target.length ? (
                        <span
                          key={`sp-${wordIndex}`}
                          className={cn(
                            "inline-block",
                            !typed && "text-[#4b5b7d]",
                            correct && "text-[#eef2fb]",
                            wrong && "bg-[#f87171]/15 text-[#f87171]",
                            isCaret && "animate-blink shadow-[inset_2.5px_0_0_0_#8ec4ff]",
                          )}
                        >
                          &nbsp;
                        </span>
                      ) : null;
                    })()}
                  </span>
                );
              })}
            </div>
            <div className="mt-5 flex items-center justify-between gap-3">
              <p className="font-mono text-[9px] tracking-[0.24em] text-[#4b5b7d] uppercase">
                Click the text and type · Tab restarts
              </p>
              <button
                type="button"
                onClick={() => restart()}
                className="grid size-10 cursor-pointer place-items-center rounded-full border border-white/12 text-[#8ba3c7] transition-all hover:rotate-[-40deg] hover:border-white/30 hover:text-white"
                aria-label="Restart test"
              >
                <RotateCcw className="size-4.5" />
              </button>
            </div>
          </>
        ) : (
          <DonePanel score={history[0]} target={target} onRestart={() => restart()} />
        )}
      </div>
    </div>
  );
}

function DonePanel({
  score,
  target,
  onRestart,
}: {
  score: HistoryEntry | undefined;
  target: string;
  onRestart: () => void;
}) {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        event.preventDefault();
        onRestart();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onRestart]);

  const verdict = !score
    ? ""
    : score.wpm >= 60
      ? "Office-ready speed"
      : score.wpm >= 40
        ? "Solid — keep pushing past 60"
        : score.wpm >= 25
          ? "Getting comfortable — daily reps will move this fast"
          : "Everyone starts here — book a keyboard session at CEA";

  return (
    <div className="grid gap-6 py-4 md:grid-cols-[auto_1fr] md:items-center">
      <div className="flex flex-col items-center text-center md:w-64">
        <p className="font-mono text-[10px] tracking-[0.28em] text-[#7fb5ff] uppercase">
          Your speed
        </p>
        <p className="font-display mt-2 bg-gradient-to-br from-[#f2f6ff] via-[#8ec4ff] to-[#5b9dff] bg-clip-text text-8xl font-semibold tracking-[-0.05em] text-transparent tabular-nums">
          {score?.wpm ?? 0}
        </p>
        <p className="font-mono text-[11px] tracking-[0.3em] text-[#8ba3c7] uppercase">wpm</p>
        <p className="mt-3 max-w-45 text-xs leading-relaxed text-[#a9bcd6]">{verdict}</p>
      </div>
      <div>
        <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: "Accuracy", value: `${score?.accuracy ?? 0}%`, icon: Target },
            { label: "Raw", value: `${score?.raw ?? 0} wpm`, icon: Zap },
            { label: "Consistency", value: `${score?.consistency ?? 0}%`, icon: Zap },
            {
              label: "Length",
              value: `${target.trim().split(/\s+/).length} words`,
              icon: Target,
            },
          ].map(({ label, value, icon: Icon }) => (
            <div
              key={label + value}
              className="border-white/8 rounded-2xl border bg-white/[0.03] px-4 py-4 text-center"
            >
              <Icon className="mx-auto size-4 text-[#5b9dff]" aria-hidden="true" />
              <dt className="mt-2 font-mono text-[8px] tracking-[0.22em] text-[#7d94b5] uppercase">
                {label}
              </dt>
              <dd className="font-display mt-1 text-lg font-semibold tabular-nums">{value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onRestart}
            className="inline-flex h-12 cursor-pointer items-center gap-2 rounded-full bg-[#f2f6ff] px-6 text-sm font-semibold text-[#0a1120] transition-all hover:-translate-y-0.5"
          >
            <RotateCcw className="size-4" /> Test again · Enter
          </button>
          <button
            type="button"
            onClick={() => {
              const text = `CEA Typing — ${score?.wpm ?? 0} WPM at ${score?.accuracy ?? 0}% accuracy. Think you can beat it?`;
              const url = typeof window !== "undefined" ? window.location.href : "";
              void navigator.clipboard
                ?.writeText(`${text} ${url}`)
                .then(() => {
                  setCopied(true);
                  window.setTimeout(() => setCopied(false), 1500);
                })
                .catch(() => undefined);
            }}
            className="inline-flex h-12 cursor-pointer items-center gap-2 rounded-full border border-white/20 px-6 text-sm font-semibold text-white transition-all hover:border-white/45"
          >
            {copied ? "Copied — share it" : "Share your result"}
          </button>
        </div>
      </div>
    </div>
  );
}
