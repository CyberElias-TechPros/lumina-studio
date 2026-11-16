"use client";

import { useMemo, useState } from "react";
import { Check, Copy, Eraser } from "lucide-react";

/** Common English stopwords, trimmed for keyword density. */
const STOPWORDS = new Set(
  "a,about,after,all,also,am,an,and,any,are,as,at,be,because,been,before,being,between,both,but,by,can,could,did,do,does,doing,done,each,few,for,from,further,get,had,has,have,having,he,her,here,hers,herself,him,himself,his,how,i,if,in,into,is,it,its,itself,just,me,more,most,my,myself,no,nor,not,now,of,off,on,once,only,or,other,our,ours,ourselves,out,over,own,same,she,should,so,some,such,than,that,the,their,theirs,them,themselves,then,there,these,they,this,those,through,to,too,under,until,up,very,was,we,were,what,when,where,which,while,who,whom,why,will,with,would,you,your,yours,yourself,yourselves,it's,don't,i'm,we're,they're,there's,that's,what's".split(
    ",",
  ),
);

const READING_WPM = 200;
const SPEAKING_WPM = 130;

export function WordCounter() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const stats = useMemo(() => {
    const trimmed = text.trim();
    const words = trimmed ? trimmed.split(/\s+/) : [];
    const cleaned = words.map((w) => w.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, ""));
    const trimmedWords = cleaned.filter(Boolean);
    const wordCount = words.length;
    const longest = trimmedWords.reduce((max, w) => Math.max(max, w.length), 0);
    const charsNoSpaces = text.replace(/\s/g, "").length;
    const chars = text.length;
    const sentences = trimmed ? (trimmed.match(/[.!?…]+(\s|$)/g) ?? []).length || 1 : 0;
    const paragraphs = trimmed ? trimmed.split(/\n\s*\n/).filter(Boolean).length : 0;
    const readingSeconds = Math.round((wordCount / READING_WPM) * 60);
    const speakingSeconds = Math.round((wordCount / SPEAKING_WPM) * 60);

    const freq = new Map<string, number>();
    for (const raw of words) {
      const word = raw.toLowerCase().replace(/^[^\p{L}\p{N}']+|[^\p{L}\p{N}']+$/gu, "");
      if (word.length < 3 || STOPWORDS.has(word)) continue;
      freq.set(word, (freq.get(word) ?? 0) + 1);
    }
    const topKeywords = [...freq.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([word, count]) => ({ word, count }));

    return {
      words: wordCount,
      chars,
      charsNoSpaces,
      sentences,
      paragraphs,
      readingSeconds,
      speakingSeconds,
      topKeywords,
      longest,
    };
  }, [text]);

  const fmt = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    return `${minutes}m ${String(seconds % 60).padStart(2, "0")}s`;
  };

  const copy = async () => {
    if (!text.trim()) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div className="border-foreground/10 bg-card overflow-hidden rounded-2xl border">
      <div className="border-foreground/10 flex items-center justify-between gap-3 border-b px-4 py-3 sm:px-6">
        <p className="text-muted-foreground font-mono text-[9px] tracking-[0.24em] uppercase">
          Paste or type — everything stays on this device
        </p>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={copy}
            aria-label="Copy text"
            className="border-foreground/12 text-muted-foreground hover:text-foreground grid size-9 cursor-pointer place-items-center rounded-lg border transition-colors"
          >
            {copied ? <Check className="text-success size-4" /> : <Copy className="size-4" />}
          </button>
          <button
            type="button"
            onClick={() => setText("")}
            aria-label="Clear text"
            className="border-foreground/12 text-muted-foreground hover:text-foreground grid size-9 cursor-pointer place-items-center rounded-lg border transition-colors"
          >
            <Eraser className="size-4" />
          </button>
        </div>
      </div>

      <label htmlFor="word-counter-input" className="sr-only">
        Text to count
      </label>
      <textarea
        id="word-counter-input"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Start typing or paste your essay, email, script…"
        className="placeholder:text-muted-foreground/60 h-56 w-full resize-y bg-transparent px-4 py-4 text-base leading-relaxed outline-none sm:h-64 sm:px-6"
        autoFocus
      />

      <div className="border-foreground/10 grid grid-cols-2 gap-px border-t bg-foreground/8 sm:grid-cols-4">
        {[
          ["Words", String(stats.words)],
          ["Characters", String(stats.chars)],
          ["No spaces", String(stats.charsNoSpaces)],
          ["Sentences", String(stats.sentences)],
          ["Paragraphs", String(stats.paragraphs)],
          ["Reading time", fmt(stats.readingSeconds)],
          ["Speaking time", fmt(stats.speakingSeconds)],
          ["Longest word", stats.longest ? `${stats.longest} chars` : "—"],
        ].map(([label, value]) => (
          <div key={label} className="bg-card px-4 py-4 text-center">
            <p className="font-display text-2xl font-semibold tabular-nums">{value}</p>
            <p className="text-muted-foreground mt-1 font-mono text-[8px] tracking-[0.22em] uppercase">
              {label}
            </p>
          </div>
        ))}
      </div>

      {stats.topKeywords.length > 0 && (
        <div className="border-foreground/10 border-t px-4 py-4 sm:px-6">
          <p className="text-muted-foreground font-mono text-[9px] tracking-[0.24em] uppercase">
            Top keywords
          </p>
          <ul className="mt-2.5 flex flex-wrap gap-2">
            {stats.topKeywords.map(({ word, count }) => (
              <li
                key={word}
                className="border-primary/30 bg-primary/8 text-primary rounded-full border px-3 py-1 text-xs font-semibold"
              >
                {word} <span className="opacity-70 tabular-nums">×{count}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
