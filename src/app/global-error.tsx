"use client";

/**
 * Last-resort error boundary.
 *
 * `error.tsx` catches failures *inside* the route tree, but it renders within
 * the root layout. If the root layout itself throws — a bad provider, a failed
 * theme read, a font that 404s during hydration — there is nothing left to
 * catch it and the visitor gets a white screen with no explanation and no way
 * out. This file is the only thing that still runs in that case.
 *
 * Two constraints shape it:
 *
 *   1. **It replaces the root layout**, `<html>` and `<body>` included. That is
 *      the React contract for global-error, and it is why the styles are inline
 *      rather than Tailwind classes: the stylesheet may be exactly what failed
 *      to load.
 *   2. **It cannot import anything from the app.** Any module it pulled in could
 *      be the module that threw. Everything here is plain JSX and inline style.
 *
 * Nothing in the app should ever render this. If it does, the fix belongs in the
 * layout — this page exists so a broken deploy degrades to an explanation rather
 * than to a blank page, and so the visitor has a route back to something that
 * works.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // A digest is the only piece of a production error that is safe to show and
  // genuinely useful: it ties this visitor's report to a server log entry.
  const digest = error?.digest;

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          padding: "1.5rem",
          background: "#faf9f7",
          color: "#1c1b1a",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        }}
      >
        <main style={{ maxWidth: "32rem", textAlign: "center" }}>
          <p
            style={{
              margin: 0,
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#6b6a67",
            }}
          >
            Cyber Elias Academy
          </p>
          <h1
            style={{
              margin: "0.75rem 0 0",
              fontSize: "1.5rem",
              lineHeight: 1.25,
              fontWeight: 800,
            }}
          >
            The site could not start
          </h1>
          <p
            style={{ marginTop: "0.75rem", fontSize: "0.9rem", lineHeight: 1.6, color: "#4a4846" }}
          >
            This is a fault on our side, not something you did. Reloading often clears it. If it
            does not, the pages below are served separately and should still work.
          </p>

          {digest ? (
            <p
              style={{
                marginTop: "1rem",
                fontSize: "0.75rem",
                color: "#6b6a67",
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
              }}
            >
              Reference: {digest}
            </p>
          ) : null}

          <div
            style={{
              marginTop: "1.75rem",
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem",
              justifyContent: "center",
            }}
          >
            <button
              type="button"
              onClick={reset}
              style={{
                cursor: "pointer",
                border: "none",
                borderRadius: "0.5rem",
                background: "#1c1b1a",
                color: "#ffffff",
                padding: "0.6rem 1.1rem",
                fontSize: "0.875rem",
                fontWeight: 600,
              }}
            >
              Try again
            </button>
            {/* Plain anchors, not router links: the router is part of the app
                that failed, so navigating with it would fail the same way. */}
            <a
              href="/"
              style={{
                borderRadius: "0.5rem",
                border: "1px solid #d6d3ce",
                background: "#ffffff",
                color: "#1c1b1a",
                padding: "0.6rem 1.1rem",
                fontSize: "0.875rem",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Go to the home page
            </a>
            <a
              href="/contact"
              style={{
                borderRadius: "0.5rem",
                border: "1px solid #d6d3ce",
                background: "#ffffff",
                color: "#1c1b1a",
                padding: "0.6rem 1.1rem",
                fontSize: "0.875rem",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Contact the team
            </a>
          </div>

          <p style={{ marginTop: "1.5rem", fontSize: "0.8rem", color: "#6b6a67" }}>
            WhatsApp 0905 862 8386 · help@cea.ng
          </p>
        </main>
      </body>
    </html>
  );
}
