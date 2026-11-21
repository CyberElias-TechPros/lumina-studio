"use client";

import { useEffect, useState } from "react";
import { Printer } from "lucide-react";

export function ReadingSpine({
  lessonOrder,
  totalLessons,
  chapterTitle,
}: {
  lessonOrder: number;
  totalLessons: number;
  chapterTitle?: string;
}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        setProgress(100);
        return;
      }
      const pct = Math.min(100, Math.max(0, Math.round((scrollTop / docHeight) * 100)));
      setProgress(pct);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="cea-no-print">
      {/* Hairline progress track at top of viewport */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[3px] bg-transparent"
      >
        <div
          className="bg-primary h-full transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Quiet marginalia strip */}
      <div className="border-border bg-background/95 sticky top-[76px] z-20 border-b backdrop-blur-sm">
        <div className="container-page flex max-w-3xl items-center justify-between gap-3 py-2 text-xs">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="font-mono font-semibold text-primary tabular-nums">
              {String(lessonOrder).padStart(2, "0")} / {totalLessons}
            </span>
            {chapterTitle && (
              <span className="text-muted-foreground truncate">· {chapterTitle}</span>
            )}
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <span className="text-muted-foreground font-mono tabular-nums">{progress}% read</span>
            <button
              type="button"
              onClick={() => window.print()}
              className="border-border hover:border-primary/40 hover:text-primary inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-medium transition-colors"
            >
              <Printer className="size-3.5" aria-hidden="true" />
              Print notes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
