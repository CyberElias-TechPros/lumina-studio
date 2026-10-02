import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Bot, GraduationCap, Loader2, MessageCircle, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTurnstile } from "@/components/turnstile";
import { cn } from "@/lib/utils";
import {
  askAssistant,
  fetchAssistantIntro,
  whatsappHref,
  type AssistantIntro,
  type AssistantTurn,
} from "@/lib/api/assistant";

/**
 * Public site assistant — a floating chat panel for marketing pages.
 *
 * Purpose: answer the ten questions the academy answers every day (fees,
 * duration, next start, payment, location, beginner guidance) without a human,
 * and hand over to WhatsApp the moment the answer isn't in the catalogue.
 *
 * Deliberately small and self-contained: no query library, no global state, and
 * the conversation survives page navigation via sessionStorage.
 */

const STORAGE_KEY = "cea-assistant-thread";
const MAX_TURNS = 8;

const FALLBACK_INTRO: AssistantIntro = {
  enabled: true,
  greeting:
    "Hi 👋 I'm the CEA assistant. Ask me about any course, fee, schedule or how to enrol — I'll answer straight away.",
  suggestions: [
    "How much is the web development course?",
    "Which course should I start with if I'm a beginner?",
    "How do I pay, and is there an instalment plan?",
    "Where are you located?",
  ],
  whatsapp: "2349058628386",
  helpEmail: "help@cea.ng",
};

function readStoredThread(): AssistantTurn[] {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (t): t is AssistantTurn =>
          typeof t === "object" &&
          t !== null &&
          ((t as AssistantTurn).role === "user" || (t as AssistantTurn).role === "assistant") &&
          typeof (t as AssistantTurn).content === "string",
      )
      .slice(-MAX_TURNS * 2);
  } catch {
    return [];
  }
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [intro, setIntro] = useState(FALLBACK_INTRO);
  const [turns, setTurns] = useState<AssistantTurn[]>([]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState<string | null>(null);
  const [unread, setUnread] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Optional bot protection: one solved challenge per conversation, only when
  // the site has Turnstile keys configured (no keys → widget renders nothing).
  const {
    enabled: captchaEnabled,
    token: captchaToken,
    reset: resetCaptcha,
    Widget: CaptchaWidget,
  } = useTurnstile();

  // Restore this session's conversation and load the server-provided intro.
  useEffect(() => {
    setTurns(readStoredThread());
    let cancelled = false;
    fetchAssistantIntro()
      .then((data) => {
        if (!cancelled) setIntro({ ...FALLBACK_INTRO, ...data });
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(turns.slice(-MAX_TURNS * 2)));
    } catch {
      /* storage unavailable (private mode) — the widget still works */
    }
  }, [turns]);

  useEffect(() => {
    if (!open) return;
    const node = scrollRef.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [turns, busy, open]);

  useEffect(() => {
    if (open) {
      setUnread(false);
      const id = window.setTimeout(() => inputRef.current?.focus(), 60);
      return () => window.clearTimeout(id);
    }
  }, [open]);

  // Escape closes the panel, like every other dialog on the site.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const firstMessage = turns.length === 0;

  const lastQuestion = useMemo(
    () => [...turns].reverse().find((t) => t.role === "user")?.content ?? "",
    [turns],
  );

  const send = useCallback(
    async (text: string) => {
      const question = text.trim();
      if (!question || busy) return;
      if (firstMessage && captchaEnabled && !captchaToken) {
        setNote("Please complete the quick human check below first.");
        return;
      }
      setDraft("");
      setNote(null);
      const next = [...turns, { role: "user" as const, content: question }].slice(-MAX_TURNS * 2);
      setTurns(next);
      setBusy(true);
      try {
        const res = await askAssistant(
          next.slice(-MAX_TURNS),
          firstMessage ? captchaToken : undefined,
        );
        setTurns((prev) => [...prev, { role: "assistant", content: res.answer }]);
        if (res.mock) {
          setNote(
            res.budgetExhausted || res.disabled
              ? "Our live assistant is unavailable right now — WhatsApp is the fastest route."
              : "Preview answer — the AI assistant is live once the API is connected.",
          );
        }
      } catch {
        setTurns((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "I couldn't reach the server just now. Please message us on WhatsApp at 0905 862 8386 (Mon–Sat, 8am–8pm WAT) — or email help@cea.ng.",
          },
        ]);
        setNote("Connection problem");
        if (firstMessage) resetCaptcha();
      } finally {
        setBusy(false);
        if (!open) setUnread(true);
      }
    },
    [busy, captchaEnabled, captchaToken, firstMessage, open, resetCaptcha, turns],
  );

  if (!intro.enabled) return null;

  return (
    <>
      {/* Launcher */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close the CEA assistant" : "Ask the CEA assistant a question"}
        aria-expanded={open}
        className={cn(
          "fixed right-4 bottom-4 z-[80] flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold shadow-lg transition-transform",
          "bg-primary text-primary-foreground hover:scale-[1.03] focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none",
          "sm:right-6 sm:bottom-6",
        )}
      >
        {open ? <X className="size-5" /> : <MessageCircle className="size-5" />}
        <span className={cn("hidden sm:inline", open && "sm:hidden")}>Ask a question</span>
        {unread && !open && (
          <span className="bg-destructive absolute -top-0.5 -right-0.5 size-3 rounded-full" />
        )}
      </button>

      {/* Panel */}
      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="false"
          aria-label="CEA assistant"
          className={cn(
            "bg-card fixed right-4 bottom-20 z-[80] flex w-[min(92vw,26rem)] flex-col overflow-hidden rounded-2xl border shadow-2xl",
            "max-h-[min(75vh,34rem)] sm:right-6 sm:bottom-24",
          )}
        >
          <header className="bg-primary text-primary-foreground flex items-center gap-3 px-4 py-3">
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white/15">
              <Bot className="size-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold">CEA assistant</p>
              <p className="truncate text-[11px] opacity-80">
                Courses · fees · schedules · how to enrol
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-primary-foreground hover:bg-white/15 size-8"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              <X className="size-4" />
            </Button>
          </header>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            <Bubble role="assistant">{intro.greeting}</Bubble>

            {turns.length === 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {intro.suggestions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => void send(s)}
                    className="bg-muted hover:bg-muted/70 text-muted-foreground rounded-full border px-3 py-1.5 text-left text-xs font-medium transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {turns.map((t, i) => (
              <Bubble key={`${t.role}-${i}`} role={t.role}>
                {t.content}
              </Bubble>
            ))}

            {busy && (
              <div className="text-muted-foreground flex items-center gap-2 text-xs">
                <Loader2 className="size-3.5 animate-spin" /> Typing…
              </div>
            )}

            {note && <p className="text-muted-foreground text-[11px] italic">{note}</p>}
          </div>

          <div className="border-t px-4 py-3">
            {firstMessage && captchaEnabled && <CaptchaWidget className="mb-2" />}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                void send(draft);
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Ask about a course, fee or date…"
                maxLength={600}
                aria-label="Your question"
                className="border-input bg-background focus-visible:ring-ring min-w-0 flex-1 rounded-lg border px-3 py-2 text-sm focus-visible:ring-1 focus-visible:outline-none"
              />
              <Button
                type="submit"
                size="icon"
                disabled={
                  busy ||
                  draft.trim().length === 0 ||
                  (firstMessage && captchaEnabled && !captchaToken)
                }
                aria-label="Send question"
              >
                <Send className="size-4" />
              </Button>
            </form>

            <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px]">
              <a
                href={whatsappHref(lastQuestion, intro.whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 font-medium"
              >
                <MessageCircle className="size-3.5" /> Continue on WhatsApp
              </a>
              <span className="text-muted-foreground/50">·</span>
              <Link
                to="/apply"
                className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 font-medium"
              >
                <GraduationCap className="size-3.5" /> Register
              </Link>
              <Link
                to="/programs"
                className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 font-medium"
              >
                <ArrowUpRight className="size-3.5" /> All courses
              </Link>
              <Badge variant="secondary" className="ml-auto h-5 px-1.5 text-[10px] font-medium">
                AI · may be imperfect
              </Badge>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Bubble({ role, children }: { role: "user" | "assistant"; children: React.ReactNode }) {
  const isUser = role === "user";
  return (
    <div className={cn("flex", isUser && "justify-end")}>
      <p
        className={cn(
          "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap",
          isUser
            ? "bg-primary text-primary-foreground rounded-br-sm"
            : "bg-muted text-foreground rounded-bl-sm",
        )}
      >
        {children}
      </p>
    </div>
  );
}
