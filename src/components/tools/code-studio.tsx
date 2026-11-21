"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  CheckCircle2,
  Code2,
  Download,
  Monitor,
  Play,
  RotateCcw,
  Smartphone,
  Tablet,
  Terminal,
  Trophy,
} from "lucide-react";
import { cn } from "@/lib/utils";

type TabId = "html" | "css" | "js";
type Viewport = "desktop" | "tablet" | "mobile";

interface ConsoleEntry {
  level: "log" | "warn" | "error";
  text: string;
}

interface CodeChallenge {
  id: string;
  title: string;
  track: string;
  difficulty: "Starter" | "Intermediate" | "Project";
  brief: string;
  html: string;
  css: string;
  js: string;
  checks: {
    label: string;
    test: (code: { html: string; css: string; js: string; logs: string[] }) => boolean;
  }[];
  hint: string;
}

const CHALLENGES: CodeChallenge[] = [
  {
    id: "semantic-card",
    title: "1. Semantic Academy Profile Card",
    track: "Web Development",
    difficulty: "Starter",
    brief:
      'Replace the generic <div> tags with semantic <article> and <h2> tags, and add a working <a href="/apply">Apply Now</a> link inside the card.',
    html: `<div class="card">
  <span class="tag">Port Harcourt · Cohort 2026</span>
  <div class="title">Web Development Track</div>
  <p>Learn HTML, CSS, JavaScript and real deployment in 12 weeks.</p>
  <!-- Add an Apply Now link below -->
</div>`,
    css: `body {
  font-family: system-ui, sans-serif;
  background: #f4f6fb;
  padding: 24px;
  margin: 0;
}
.card {
  max-width: 360px;
  background: #ffffff;
  border: 1px solid #d9e2ec;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 10px 30px -15px rgba(15, 39, 66, 0.25);
}
.tag {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #1d4ed8;
  font-weight: 700;
}
.title {
  font-size: 22px;
  font-weight: 700;
  margin: 10px 0 8px;
  color: #0f172a;
}
p {
  color: #475569;
  line-height: 1.5;
  font-size: 14px;
}
a.btn {
  display: inline-block;
  margin-top: 12px;
  background: #1d4ed8;
  color: #ffffff;
  padding: 10px 16px;
  border-radius: 999px;
  text-decoration: none;
  font-size: 13px;
  font-weight: 600;
}`,
    js: `console.log("Profile card loaded.");`,
    checks: [
      {
        label: "Uses semantic <article> wrapper",
        test: ({ html }) => /<article[\s>]/i.test(html) && /<\/article>/i.test(html),
      },
      {
        label: "Uses an <h2> heading for the title",
        test: ({ html }) => /<h2[\s>]/i.test(html) && /<\/h2>/i.test(html),
      },
      {
        label: "Includes an <a href=...> Apply link",
        test: ({ html }) => /<a\s+[^>]*href\s*=\s*["'][^"']+["']/i.test(html),
      },
    ],
    hint: 'Change <div class="card"> to <article class="card">, <div class="title"> to <h2 class="title">, and add <a class="btn" href="/apply">Apply Now</a>.',
  },
  {
    id: "flexbox-navbar",
    title: "2. Responsive Flexbox Navigation Bar",
    track: "Web Design",
    difficulty: "Starter",
    brief:
      "Turn .nav into a horizontal bar with the brand on the left and links on the right using display: flex, justify-content: space-between, and align-items: center.",
    html: `<header class="nav">
  <strong class="brand">CEA Studio</strong>
  <nav class="links">
    <a href="#courses">Courses</a>
    <a href="#tools">Tools</a>
    <a href="#contact">Contact</a>
  </nav>
</header>`,
    css: `body {
  font-family: system-ui, sans-serif;
  margin: 0;
  background: #f8fafc;
}
.nav {
  background: #0f172a;
  color: #ffffff;
  padding: 14px 20px;
  /* Add flexbox alignment properties here */
}
.links {
  display: flex;
  gap: 16px;
}
.links a {
  color: #cbd5e1;
  text-decoration: none;
  font-size: 14px;
}`,
    js: `console.log("Navbar rendered.");`,
    checks: [
      {
        label: "Sets display: flex on .nav",
        test: ({ css }) => /display\s*:\s*flex/i.test(css),
      },
      {
        label: "Spreads brand and links with justify-content: space-between",
        test: ({ css }) => /justify-content\s*:\s*space-between/i.test(css),
      },
      {
        label: "Vertically centres items with align-items: center",
        test: ({ css }) => /align-items\s*:\s*center/i.test(css),
      },
    ],
    hint: "Inside .nav { ... }, add: display: flex; justify-content: space-between; align-items: center;",
  },
  {
    id: "naira-vat-calculator",
    title: "3. Nigerian Invoice & 7.5% VAT Calculator",
    track: "JavaScript",
    difficulty: "Intermediate",
    brief:
      "Complete the calculateTotal(amount) function in JS so it adds 7.5% VAT (amount * 1.075), updates #output, and logs the formatted Naira total to the console.",
    html: `<main class="box">
  <h2>SME Invoice Calculator</h2>
  <label for="subtotal">Subtotal (NGN)</label>
  <input id="subtotal" type="number" value="50000" />
  <button id="calc-btn" type="button">Calculate + 7.5% VAT</button>
  <p id="output">Total: ₦53,750</p>
</main>`,
    css: `body { font-family: system-ui, sans-serif; padding: 24px; background: #f1f5f9; }
.box { max-width: 340px; background: #fff; padding: 20px; border-radius: 14px; border: 1px solid #cbd5e1; }
label { display: block; font-size: 12px; font-weight: 600; color: #475569; margin-bottom: 6px; }
input { width: 100%; box-sizing: border-box; padding: 10px; border: 1px solid #94a3b8; border-radius: 8px; font-size: 16px; }
button { margin-top: 12px; width: 100%; padding: 10px; border: 0; border-radius: 8px; background: #0f766e; color: #fff; font-weight: 600; cursor: pointer; }
#output { margin-top: 14px; font-size: 18px; font-weight: 700; color: #0f172a; }`,
    js: `function calculateTotal(amount) {
  // Return amount plus 7.5% Nigerian VAT
  return amount;
}

const input = document.getElementById("subtotal");
const btn = document.getElementById("calc-btn");
const output = document.getElementById("output");

btn.addEventListener("click", () => {
  const val = Number(input.value || 0);
  const total = calculateTotal(val);
  output.textContent = "Total: ₦" + Math.round(total).toLocaleString("en-NG");
  console.log("Calculated:", total);
});

console.log("Ready — click the button or update calculateTotal()");`,
    checks: [
      {
        label: "Multiplies or adds 0.075 (7.5% VAT) in JS",
        test: ({ js }) => /(1\.075|0\.075)/.test(js),
      },
      {
        label: "Logs result with console.log",
        test: ({ logs }) => logs.length > 0,
      },
    ],
    hint: "In calculateTotal(amount), change `return amount;` to `return amount * 1.075;` and click Run.",
  },
  {
    id: "grid-course-cards",
    title: "4. CSS Grid Course Catalogue",
    track: "Web Design",
    difficulty: "Intermediate",
    brief:
      "Use CSS Grid with repeat(auto-fit, minmax(150px, 1fr)) and a 12px gap on .grid so the 3 course cards adapt automatically on mobile and desktop.",
    html: `<section class="grid">
  <article class="tile"><strong>Excel</strong><p>4 weeks</p></article>
  <article class="tile"><strong>Web Design</strong><p>8 weeks</p></article>
  <article class="tile"><strong>Data SQL</strong><p>10 weeks</p></article>
</section>`,
    css: `body { font-family: system-ui, sans-serif; padding: 18px; background: #0f172a; color: #f8fafc; }
.grid {
  /* Make this a responsive CSS Grid */
}
.tile {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 12px;
  padding: 16px;
}
.tile p { margin: 6px 0 0; color: #94a3b8; font-size: 13px; }`,
    js: ``,
    checks: [
      {
        label: "Sets display: grid on .grid",
        test: ({ css }) => /display\s*:\s*grid/i.test(css),
      },
      {
        label: "Uses grid-template-columns with repeat/minmax",
        test: ({ css }) => /grid-template-columns\s*:[^;]*repeat\(/i.test(css),
      },
      {
        label: "Adds spacing with gap",
        test: ({ css }) => /\bgap\s*:/i.test(css),
      },
    ],
    hint: "Add `display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 12px;` inside `.grid`.",
  },
  {
    id: "accessible-form",
    title: "5. Accessible Form Validation",
    track: "JavaScript",
    difficulty: "Project",
    brief:
      "Validate that the email input includes '@' before submitting, and show an accessible status message inside #msg (role=\"status\").",
    html: `<form id="signup" novalidate>
  <h3>Join Friday Coding Club</h3>
  <label for="email">Email address</label>
  <input id="email" type="email" placeholder="ada@example.com" />
  <button type="submit">Join free</button>
  <p id="msg" role="status"></p>
</form>`,
    css: `body { font-family: system-ui, sans-serif; padding: 24px; background: #fafafa; }
form { max-width: 340px; background: #fff; padding: 20px; border-radius: 14px; border: 1px solid #e2e8f0; }
label { display: block; font-size: 13px; font-weight: 600; margin-bottom: 6px; }
input { width: 100%; box-sizing: border-box; padding: 9px 12px; border: 1px solid #cbd5e1; border-radius: 8px; }
button { margin-top: 12px; padding: 10px 16px; border: 0; border-radius: 8px; background: #2563eb; color: #fff; font-weight: 600; cursor: pointer; }
#msg { margin-top: 12px; font-size: 13px; font-weight: 600; }`,
    js: `const form = document.getElementById("signup");
const email = document.getElementById("email");
const msg = document.getElementById("msg");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = email.value.trim();
  if (!value.includes("@")) {
    msg.textContent = "Please enter a valid email address.";
    msg.style.color = "#dc2626";
    return;
  }
  msg.textContent = "Welcome aboard, " + value + "!";
  msg.style.color = "#15803d";
  console.log("Registered:", value);
});`,
    checks: [
      {
        label: "Prevents page reload with event.preventDefault()",
        test: ({ js }) => /preventDefault\s*\(/i.test(js),
      },
      {
        label: 'Includes live status element (role="status")',
        test: ({ html }) => /role\s*=\s*["']status["']/i.test(html),
      },
      {
        label: "Checks email format before confirmation",
        test: ({ js }) => /includes\s*\(\s*["']@["']\s*\)/.test(js),
      },
    ],
    hint: 'Try submitting an empty email in the preview, then a real one — and inspect how preventDefault() + role="status" work together.',
  },
  {
    id: "free-sandbox",
    title: "6. Open Scratchpad (Free Build)",
    track: "Open Sandbox",
    difficulty: "Starter",
    brief:
      "Build anything you want in HTML, CSS and JavaScript. Export your finished page as a standalone .html file at any time.",
    html: `<main class="hero">
  <span class="pill">Port Harcourt Tech</span>
  <h1>Build your first web page</h1>
  <p>Edit HTML, CSS and JavaScript on the left. Switch viewports above the preview to test mobile.</p>
  <button id="ping">Click me</button>
</main>`,
    css: `body {
  margin: 0;
  min-height: 100vh;
  display: grid;
  place-items: center;
  font-family: system-ui, sans-serif;
  background: linear-gradient(135deg, #0f172a, #1e3a8a);
  color: #f8fafc;
}
.hero {
  max-width: 420px;
  padding: 28px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.16);
}
.pill {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: #93c5fd;
}
button {
  margin-top: 12px;
  padding: 10px 18px;
  border-radius: 999px;
  border: 0;
  background: #38bdf8;
  color: #0f172a;
  font-weight: 700;
  cursor: pointer;
}`,
    js: `let clicks = 0;
document.getElementById("ping").addEventListener("click", () => {
  clicks += 1;
  console.log("Button clicked", clicks, "time(s)");
});`,
    checks: [],
    hint: "Use Download .html to save your work onto your computer and open it in any browser.",
  },
];

const STORAGE_KEY = "cea-code-studio-completed-v1";

function buildSrcDoc(html: string, css: string, js: string): string {
  const safeJs = js.replace(/<\/script>/gi, "<\\/script>");
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<style>${css}</style>
</head>
<body>
${html}
<script>
(function() {
  var send = function(level, args) {
    try {
      var text = Array.prototype.slice.call(args).map(function(item) {
        if (typeof item === "string") return item;
        try { return JSON.stringify(item); } catch (e) { return String(item); }
      }).join(" ");
      parent.postMessage({ channel: "cea-code-studio", level: level, text: text }, "*");
    } catch (e) {}
  };
  console.log = function() { send("log", arguments); };
  console.warn = function() { send("warn", arguments); };
  console.error = function() { send("error", arguments); };
  window.onerror = function(msg, _src, line) {
    send("error", [msg + (line ? " (line " + line + ")" : "")]);
  };
})();
</script>
<script>
try {
${safeJs}
} catch (err) {
  console.error(err && err.message ? err.message : String(err));
}
</script>
</body>
</html>`;
}

export function CodeStudio() {
  const [challengeIdx, setChallengeIdx] = useState(0);
  const active = CHALLENGES[challengeIdx];

  const [html, setHtml] = useState(active.html);
  const [css, setCss] = useState(active.css);
  const [js, setJs] = useState(active.js);
  const [tab, setTab] = useState<TabId>("html");
  const [viewport, setViewport] = useState<Viewport>("desktop");
  const [logs, setLogs] = useState<ConsoleEntry[]>([]);
  const [runNonce, setRunNonce] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [completed, setCompleted] = useState<string[]>([]);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setCompleted(JSON.parse(saved));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.source !== iframeRef.current?.contentWindow) return;
      if (!event.data || event.data.channel !== "cea-code-studio") return;
      setLogs((prev) => [
        ...prev.slice(-39),
        {
          level:
            event.data.level === "error" ? "error" : event.data.level === "warn" ? "warn" : "log",
          text: String(event.data.text ?? ""),
        },
      ]);
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  const selectChallenge = (index: number) => {
    const next = CHALLENGES[index];
    setChallengeIdx(index);
    setHtml(next.html);
    setCss(next.css);
    setJs(next.js);
    setLogs([]);
    setShowHint(false);
    setRunNonce((n) => n + 1);
  };

  const resetChallenge = () => {
    setHtml(active.html);
    setCss(active.css);
    setJs(active.js);
    setLogs([]);
    setRunNonce((n) => n + 1);
  };

  const runPreview = useCallback(() => {
    setLogs([]);
    setRunNonce((n) => n + 1);
  }, []);

  const checkResults = useMemo(() => {
    const logStrings = logs.map((l) => l.text);
    return active.checks.map((c) => ({
      label: c.label,
      passed: c.test({ html, css, js, logs: logStrings }),
    }));
  }, [active, html, css, js, logs]);

  const allPassed = active.checks.length > 0 && checkResults.every((c) => c.passed);

  useEffect(() => {
    if (allPassed && !completed.includes(active.id)) {
      const next = [...completed, active.id];
      setCompleted(next);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
    }
  }, [allPassed, active.id, completed]);

  const srcDoc = useMemo(() => {
    void runNonce;
    return buildSrcDoc(html, css, js);
  }, [html, css, js, runNonce]);

  const downloadHtml = () => {
    const doc = `<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8" />\n<meta name="viewport" content="width=device-width, initial-scale=1" />\n<title>CEA Code Studio Export</title>\n<style>\n${css}\n</style>\n</head>\n<body>\n${html}\n<script>\n${js}\n</script>\n</body>\n</html>`;
    const blob = new Blob([doc], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${active.id}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const currentCode = tab === "html" ? html : tab === "css" ? css : js;
  const setCurrentCode = (value: string) => {
    if (tab === "html") setHtml(value);
    else if (tab === "css") setCss(value);
    else setJs(value);
  };

  const previewWidthClass =
    viewport === "mobile"
      ? "max-w-[375px]"
      : viewport === "tablet"
        ? "max-w-[768px]"
        : "max-w-full";

  return (
    <div className="space-y-6">
      {/* Challenge selector strip */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Coding challenges">
          {CHALLENGES.map((item, idx) => {
            const done = completed.includes(item.id);
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={idx === challengeIdx}
                onClick={() => selectChallenge(idx)}
                className={cn(
                  "inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
                  idx === challengeIdx
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-foreground/15 bg-card hover:bg-muted text-foreground",
                )}
              >
                {done && <CheckCircle2 className="size-3.5 shrink-0" aria-hidden="true" />}
                <span>{item.title}</span>
              </button>
            );
          })}
        </div>
        <div className="text-muted-foreground flex items-center gap-2 font-mono text-xs">
          <Trophy className="text-primary size-4" aria-hidden="true" />
          <span>
            {completed.length}/{CHALLENGES.length - 1} challenges passed
          </span>
        </div>
      </div>

      {/* Active task banner */}
      <div className="border-foreground/10 bg-card rounded-2xl border p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-3xl">
            <p className="text-primary font-mono text-[10px] tracking-[0.2em] uppercase">
              {active.track} · {active.difficulty}
            </p>
            <h2 className="font-display mt-1 text-xl font-semibold">{active.title}</h2>
            <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">{active.brief}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setShowHint((h) => !h)}
              className="border-foreground/15 hover:bg-muted cursor-pointer rounded-full border px-3.5 py-1.5 text-xs font-medium"
            >
              {showHint ? "Hide hint" : "Need a hint?"}
            </button>
            <button
              type="button"
              onClick={resetChallenge}
              className="border-foreground/15 hover:bg-muted inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium"
            >
              <RotateCcw className="size-3.5" aria-hidden="true" /> Reset
            </button>
            <button
              type="button"
              onClick={downloadHtml}
              className="border-foreground/15 hover:bg-muted inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium"
            >
              <Download className="size-3.5" aria-hidden="true" /> Export .html
            </button>
          </div>
        </div>
        {showHint && (
          <p className="bg-primary/8 text-foreground mt-3 rounded-xl px-4 py-2.5 text-xs leading-relaxed">
            <strong>Hint:</strong> {active.hint}
          </p>
        )}
      </div>

      {/* Main workspace: Editor + Isolated Preview */}
      <div className="grid gap-5 lg:grid-cols-2">
        {/* Left: Code Editor */}
        <div className="border-foreground/12 bg-card flex flex-col overflow-hidden rounded-2xl border">
          <div className="border-foreground/10 bg-muted/40 flex items-center justify-between border-b px-3 py-2">
            <div className="flex gap-1" role="tablist" aria-label="Editor file tabs">
              {(["html", "css", "js"] as TabId[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  role="tab"
                  aria-selected={tab === t}
                  onClick={() => setTab(t)}
                  className={cn(
                    "cursor-pointer rounded-lg px-3 py-1 font-mono text-xs font-semibold uppercase transition-colors",
                    tab === t
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={runPreview}
              className="bg-primary text-primary-foreground inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-semibold"
            >
              <Play className="size-3" aria-hidden="true" /> Run
            </button>
          </div>

          <textarea
            aria-label={`${tab.toUpperCase()} code editor`}
            value={currentCode}
            onChange={(e) => setCurrentCode(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Tab") {
                e.preventDefault();
                const el = e.currentTarget;
                const start = el.selectionStart;
                const end = el.selectionEnd;
                const next = `${currentCode.slice(0, start)}  ${currentCode.slice(end)}`;
                setCurrentCode(next);
                requestAnimationFrame(() => {
                  el.selectionStart = el.selectionEnd = start + 2;
                });
              }
            }}
            spellCheck={false}
            className="bg-[#0b1220] text-[#e2e8f0] min-h-[340px] w-full flex-1 resize-y p-4 font-mono text-[13px] leading-6 focus:outline-none"
          />

          {/* Console output */}
          <div className="border-foreground/10 border-t bg-[#080d17] px-4 py-3 text-xs text-slate-300">
            <div className="mb-1.5 flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.18em] text-slate-400 uppercase">
                <Terminal className="size-3.5" aria-hidden="true" /> Console
              </span>
              <button
                type="button"
                onClick={() => setLogs([])}
                className="cursor-pointer font-mono text-[10px] text-slate-400 hover:text-white"
              >
                Clear
              </button>
            </div>
            <div className="max-h-24 space-y-1 overflow-y-auto font-mono text-[12px]">
              {logs.length === 0 ? (
                <p className="text-slate-500">No console output yet.</p>
              ) : (
                logs.map((entry, idx) => (
                  <p
                    key={`${idx}-${entry.text}`}
                    className={cn(
                      entry.level === "error"
                        ? "text-rose-400"
                        : entry.level === "warn"
                          ? "text-amber-300"
                          : "text-emerald-300",
                    )}
                  >
                    &gt; {entry.text}
                  </p>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right: Sandboxed Live Preview + Automated Checks */}
        <div className="flex flex-col gap-4">
          <div className="border-foreground/12 bg-card flex flex-1 flex-col overflow-hidden rounded-2xl border">
            <div className="border-foreground/10 bg-muted/40 flex items-center justify-between border-b px-3 py-2">
              <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-medium">
                <Code2 className="text-primary size-3.5" aria-hidden="true" /> Isolated Preview
                (sandbox=&quot;allow-scripts&quot;)
              </span>
              <div className="flex items-center gap-1" aria-label="Preview viewport width">
                {(
                  [
                    { id: "desktop", icon: Monitor, label: "Desktop" },
                    { id: "tablet", icon: Tablet, label: "Tablet" },
                    { id: "mobile", icon: Smartphone, label: "Mobile" },
                  ] as const
                ).map((vp) => (
                  <button
                    key={vp.id}
                    type="button"
                    aria-label={`${vp.label} viewport`}
                    onClick={() => setViewport(vp.id)}
                    className={cn(
                      "cursor-pointer rounded-md p-1.5 transition-colors",
                      viewport === vp.id
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <vp.icon className="size-3.5" aria-hidden="true" />
                  </button>
                ))}
              </div>
            </div>
            <div className="bg-muted/30 flex flex-1 justify-center p-3">
              <iframe
                ref={iframeRef}
                title="CEA Code Studio sandboxed output"
                sandbox="allow-scripts"
                srcDoc={srcDoc}
                className={cn(
                  "min-h-[340px] w-full rounded-xl border border-slate-200 bg-white transition-all duration-200",
                  previewWidthClass,
                )}
              />
            </div>
          </div>

          {checkResults.length > 0 && (
            <div className="border-foreground/10 bg-card rounded-2xl border p-4">
              <p className="font-mono text-[10px] tracking-[0.2em] text-primary uppercase">
                Automated Check ({checkResults.filter((c) => c.passed).length}/{checkResults.length}
                )
              </p>
              <ul className="mt-2.5 space-y-2 text-sm">
                {checkResults.map((check) => (
                  <li key={check.label} className="flex items-center gap-2">
                    <CheckCircle2
                      className={cn(
                        "size-4 shrink-0",
                        check.passed ? "text-emerald-600" : "text-muted-foreground/40",
                      )}
                      aria-hidden="true"
                    />
                    <span
                      className={
                        check.passed ? "text-foreground font-medium" : "text-muted-foreground"
                      }
                    >
                      {check.label}
                    </span>
                  </li>
                ))}
              </ul>
              {allPassed && (
                <p className="mt-3 rounded-xl bg-emerald-500/10 px-3 py-2 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                  Challenge passed! Move to the next tab above or export your HTML.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
