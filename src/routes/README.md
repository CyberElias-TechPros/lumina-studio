# Route definitions

The route modules in this directory are the source of truth for the 418
frontend routes. Each module exports a `Route` built with the compatibility
`createFileRoute` helper; Next.js App Router owns the actual URL matching and
rendering.

`scripts/generate-next-routes.mjs` reads those definitions and generates one
explicit server page per route under the ignored `src/app/(generated)/`
directory. It also classifies interactive routes and creates small client
wrappers only where the legacy component uses route hooks, search state, or
browser interactions. Generated files are rebuilt automatically by
`npm run dev`, `npm run typecheck`, and `npm run build` — do not edit them by
hand.

Keep route paths explicit in `createFileRoute`, and update
`src/lib/next-compat/static-params.ts` when a public dynamic route should be
pre-rendered from catalog data. The Next document and shared providers live in
`src/app/layout.tsx` and `src/app/providers.tsx`.
