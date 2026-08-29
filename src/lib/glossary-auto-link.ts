import { getGlossaryTerm, getGlossaryTerms, type GlossaryTerm } from "@/data/glossary";

interface LinkMatch {
  term: GlossaryTerm;
  start: number;
  end: number;
}

const termCache = new Map<string, GlossaryTerm>();

function buildTermIndex(): GlossaryTerm[] {
  const terms = getGlossaryTerms();
  for (const term of terms) {
    termCache.set(term.term.toLowerCase(), term);
    termCache.set(term.slug.toLowerCase(), term);
  }
  return terms;
}

const sortedTerms = buildTermIndex().sort((a, b) => b.term.length - a.term.length);

export function findGlossaryLinks(text: string): LinkMatch[] {
  const matches: LinkMatch[] = [];
  const lowerText = text.toLowerCase();

  for (const term of sortedTerms) {
    const searchTerm = term.term.toLowerCase();
    let index = lowerText.indexOf(searchTerm);
    while (index !== -1) {
      const isWordBoundary =
        (index === 0 || !/[a-z0-9]/.test(lowerText[index - 1])) &&
        (index + searchTerm.length === lowerText.length ||
          !/[a-z0-9]/.test(lowerText[index + searchTerm.length]));
      if (isWordBoundary) {
        const existing = matches.find(
          (m) => m.start <= index && m.end >= index + searchTerm.length,
        );
        if (!existing) {
          matches.push({ term, start: index, end: index + searchTerm.length });
        }
      }
      index = lowerText.indexOf(searchTerm, index + 1);
    }
  }

  matches.sort((a, b) => a.start - b.start);
  return matches;
}

export function applyGlossaryLinks(html: string, maxLinks = 8): string {
  const matches = findGlossaryLinks(html);
  if (matches.length === 0) return html;

  const limited = matches.slice(0, maxLinks);
  let result = "";
  let lastEnd = 0;

  for (const match of limited) {
    result += html.slice(lastEnd, match.start);
    result += `<a href="/glossary/${match.term.slug}" class="glossary-link" data-glossary="${match.term.slug}">${html.slice(match.start, match.end)}</a>`;
    lastEnd = match.end;
  }
  result += html.slice(lastEnd);
  return result;
}

export function linkGlossaryTermsInHtml(
  html: string,
  options?: { maxLinks?: number; excludeSelectors?: string[] },
): string {
  const { maxLinks = 8, excludeSelectors = ["code", "pre", "a"] } = options ?? {};
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  for (const selector of excludeSelectors) {
    for (const el of doc.querySelectorAll(selector)) {
      el.setAttribute("data-glossary-ignore", "");
    }
  }

  for (const node of doc.querySelectorAll("p, li, h2, h3, h4, blockquote, td, th")) {
    if (node.hasAttribute("data-glossary-ignore")) continue;
    if (node.querySelector("a")) continue;
    const linked = applyGlossaryLinks(node.innerHTML, maxLinks);
    if (linked !== node.innerHTML) {
      node.innerHTML = linked;
    }
  }

  return doc.body.innerHTML;
}

export function getGlossaryTermForLink(slug: string): GlossaryTerm | undefined {
  return getGlossaryTerm(slug);
}
