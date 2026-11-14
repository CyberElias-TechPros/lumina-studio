/* Adapted from React Bits ShinyText, revision 24b0e1692da541e11526f4f4d9899dbe417b55fb.
 * Copyright (c) 2025 David Haz. See LICENSE.md in this directory.
 * Adaptations: semantic inline element, CSS-scoped styling and reduced-motion support. */
export function ShinyText({ text, className = "" }: { text: string; className?: string }) {
  return <span className={`cea-shiny-text ${className}`}>{text}</span>;
}
