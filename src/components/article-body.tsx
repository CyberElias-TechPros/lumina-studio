import { Fragment } from "react";
import { Quote } from "lucide-react";
import { GlossaryLinkedText } from "@/components/glossary-linked-text";
import { SiteImage } from "@/components/media/site-image";

/**
 * Minimal article markup for human-written posts:
 * - "## Heading"      → section heading
 * - "![alt](src)"     → captioned figure (alt doubles as caption)
 * - "> quote"         → pull-quote callout
 * - "- item"          → bullet list (consecutive lines group together)
 * - anything else     → body paragraph (with glossary auto-links)
 */
const FIGURE_RE = /^!\[(.*?)\]\((.*?)\)$/;

export function ArticleBody({ paragraphs }: { paragraphs: string[] }) {
  const blocks: React.ReactNode[] = [];
  let listBuffer: string[] = [];

  const flushList = () => {
    if (listBuffer.length === 0) return;
    const items = listBuffer;
    listBuffer = [];
    blocks.push(
      <ul key={`list-${blocks.length}`} className="space-y-2.5">
        {items.map((item, j) => (
          <li key={j} className="flex items-start gap-3 leading-relaxed">
            <span className="bg-primary mt-[0.65em] size-1.5 shrink-0 rounded-full" />
            <GlossaryLinkedText
              paragraphs={[item]}
              className="[&>p]:leading-relaxed"
              maxLinksPerParagraph={2}
            />
          </li>
        ))}
      </ul>,
    );
  };

  paragraphs.forEach((line, i) => {
    const text = line.trim();

    if (text.startsWith("## ")) {
      flushList();
      blocks.push(
        <h2
          key={i}
          className="font-display pt-4 text-2xl font-extrabold tracking-tight text-balance"
        >
          {text.slice(3)}
        </h2>,
      );
      return;
    }

    const fig = text.match(FIGURE_RE);
    if (fig) {
      flushList();
      blocks.push(
        <SiteImage key={i} src={fig[2]} alt={fig[1]} caption={fig[1]} ratio="aspect-[16/9]" />,
      );
      return;
    }

    if (text.startsWith("> ")) {
      flushList();
      blocks.push(
        <blockquote
          key={i}
          className="border-primary/30 bg-primary/5 relative rounded-2xl border p-6 pl-14"
        >
          <Quote className="text-primary/40 absolute top-6 left-5 size-6" />
          <p className="text-lg leading-relaxed font-semibold text-pretty">{text.slice(2)}</p>
        </blockquote>,
      );
      return;
    }

    if (text.startsWith("- ")) {
      listBuffer.push(text.slice(2));
      return;
    }

    flushList();
    if (text.length === 0) return;
    blocks.push(
      <GlossaryLinkedText
        key={i}
        paragraphs={[line]}
        className="[&>p]:text-[1.05rem] [&>p]:leading-[1.85]"
        maxLinksPerParagraph={3}
      />,
    );
  });
  flushList();

  return <div className="space-y-7">{blocks.map((b, i) => <Fragment key={i}>{b}</Fragment>)}</div>;
}
