import { Link } from "@/lib/next-compat/router";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4">
      <div className="relative text-center">
        <p className="font-display text-muted-foreground text-7xl font-semibold tracking-tight sm:text-8xl">
          404
        </p>
        <h1 className="font-display mt-4 text-xl font-bold text-foreground sm:text-2xl">
          Page not found
        </h1>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
          The link may be old, or we moved something. Start from the home page.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="bg-primary text-primary-foreground inline-flex h-10 items-center justify-center rounded-md px-6 text-sm font-medium"
          >
            Go home
          </Link>
          <Link
            to="/classes"
            className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            View courses
          </Link>
          <Link
            to="/blog"
            className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Notes
          </Link>
        </div>
      </div>
    </main>
  );
}
