/**
 * Restore Next's import conventions for scripts that load source `.ts` directly.
 *
 * Node 22.18 strips TypeScript types natively, but it resolves imports the way a
 * browser does: strictly, by exact path. Next.js lets `import { x } from "./blog"`
 * mean `./blog.ts`, and it lets `import dates from "./x.json"` stand alone. Every
 * file in `src/` is written that way, so a script that imports `src/data/blog.ts`
 * fails the moment that module imports another one — which is what happened when
 * `blog.ts` began importing `companion-posts`.
 *
 * Import this module for its side effect, before any dynamic import of source:
 *
 *   import "../lib/ts-resolve.mjs";   // or the right relative path
 *
 * Both hooks are scoped narrowly — relative extensionless specifiers, and `.json`
 * files. Bare package specifiers pass straight through.
 */

import { readFileSync } from "node:fs";
import { registerHooks } from "node:module";
import { fileURLToPath } from "node:url";

registerHooks({
  resolve(specifier, context, nextResolve) {
    if (
      specifier.startsWith(".") &&
      !/\.[cm]?[jt]sx?$/.test(specifier) &&
      !specifier.endsWith(".json")
    ) {
      try {
        return nextResolve(`${specifier}.ts`, context);
      } catch {
        /* fall through so the original specifier produces the real error */
      }
    }
    return nextResolve(specifier, context);
  },
  load(url, context, nextLoad) {
    if (url.endsWith(".json")) {
      return {
        format: "json",
        source: readFileSync(fileURLToPath(url), "utf8"),
        shortCircuit: true,
      };
    }
    return nextLoad(url, context);
  },
});
