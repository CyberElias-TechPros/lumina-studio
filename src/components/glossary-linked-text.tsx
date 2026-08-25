"use client";

import { useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { findGlossaryLinks } from "@/lib/glossary-auto-link";

interface Props {
  paragraphs: string[];
  className?: string;
  maxLinksPerParagraph?: number;
}

function applyLinksToParagraph(text: string, maxLinks: number): React.ReactNode[] {
  const matches = findGlossaryLinks(text);
  if (matches.length === 0) return [text];

  const limited = matches.slice(0, maxLinks);
  const parts: React.ReactNode[] = [];
  let lastEnd = 0;

  for (const match of limited) {
    if (match.start > lastEnd) {
      parts.push(text.slice(lastEnd, match.start));
    }
    parts.push(
      <Link
        key={`${match.term.slug}-${match.start}`}
        to="/glossary/$slug"
        params={{ slug: match.term.slug }}
        className="text-primary font-semibold underline decoration-primary/30 decoration-dotted underline-offset-2 hover:decoration-primary/70 transition-colors"
        title={match.term.definition.slice(0, 120)}
      >
        {text.slice(match.start, match.end)}
      </Link>,
    );
    lastEnd = match.end;
  }

  if (lastEnd < text.length) {
    parts.push(text.slice(lastEnd));
  }

  return parts;
}

export function GlossaryLinkedText({
  paragraphs,
  className,
  maxLinksPerParagraph = 3,
}: Props) {
  return (
    <div className={className}>
      {paragraphs.map((para, i) => (
        <p key={i} className="leading-relaxed text-pretty">
          {useMemo(
            () => applyLinksToParagraph(para, maxLinksPerParagraph),
            [para, maxLinksPerParagraph],
          )}
        </p>
      ))}
    </div>
  );
}
