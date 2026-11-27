/**
 * Where to send someone after they sign in.
 *
 * ## The failure this exists to prevent
 *
 * Sign-in used to always navigate to the role's home page. That is fine for
 * someone who clicked "Sign in" from the marketing site. It is quietly wrong for
 * everyone else, and the failures are hard to notice in testing because nothing
 * errors:
 *
 *   · A learner whose session expired mid-assessment lands back on the dashboard
 *     and has to find the assessment again, with no indication that anything
 *     went wrong.
 *   · Someone who clicks a shared link to a specific lesson, signing in as
 *     prompted, is dropped at the dashboard instead of the lesson.
 *   · A staff member opening a deep link from an email loses it entirely.
 *
 * Every one of those is a real user story, and each one ends with the app
 * silently discarding the thing the person was trying to do.
 *
 * ## Why sessionStorage and not a query string
 *
 * A `?redirect=` parameter is visible, shareable, and spoofable — an attacker can
 * send a link with a redirect to their own site. Keeping the intent in a
 * same-origin, same-tab store means the value cannot arrive from an attacker at
 * all. It also survives the full-page navigation to /auth/sign-in, which a
 * component prop would not.
 */

const REDIRECT_KEY = "cea_post_sign_in_path";
const REASON_KEY = "cea_post_sign_in_reason";

export type ReturnReason = "expired" | "signin_required";

/**
 * Only same-origin, path-only destinations are allowed.
 *
 * This is the security boundary of the whole feature: if a stored value were
 * `https://evil.example` or `//evil.example`, navigating to it after a successful
 * sign-in would hand the freshly authenticated session to another origin. The
 * checks below reject absolute URLs, protocol-relative URLs, backslash tricks
 * (`/\evil.example`, which some browsers normalise to `//`), and anything that
 * is not a normal path.
 */
export function isSafeReturnPath(path: string | null | undefined): path is string {
  if (!path) return false;
  if (!path.startsWith("/")) return false;
  // Protocol-relative: "//evil.example" and "/\evil.example" both escape.
  if (path.startsWith("//")) return false;
  if (path.startsWith("/\\")) return false;
  if (path.includes("\n") || path.includes("\r")) return false;
  // Never bounce someone back into the auth flow itself — that is how you get a
  // redirect loop where signing in sends you to sign in.
  if (path.startsWith("/auth")) return false;
  // Control characters have no business in a path we are about to navigate to.
  // eslint-disable-next-line no-control-regex
  if (/[\u0000-\u001f]/.test(path)) return false;
  return true;
}

/**
 * Remember where the visitor was trying to go, and why they were stopped.
 * Safe to call when `currentPath` is already an auth path — it is ignored.
 */
export function rememberReturnPath(currentPath: string, reason: ReturnReason): void {
  if (typeof window === "undefined") return;
  if (!isSafeReturnPath(currentPath)) return;
  try {
    window.sessionStorage.setItem(REDIRECT_KEY, currentPath);
    window.sessionStorage.setItem(REASON_KEY, reason);
  } catch {
    // Private modes and blocked storage throw. Losing the return path is a
    // degraded experience, never a reason to break the sign-in flow itself.
  }
}

/** Read and clear the stored intent. Clearing prevents replays on refresh. */
export function consumeReturnPath(): { path: string | null; reason: ReturnReason | null } {
  if (typeof window === "undefined") return { path: null, reason: null };
  try {
    const path = window.sessionStorage.getItem(REDIRECT_KEY);
    const reason = window.sessionStorage.getItem(REASON_KEY) as ReturnReason | null;
    window.sessionStorage.removeItem(REDIRECT_KEY);
    window.sessionStorage.removeItem(REASON_KEY);
    return {
      path: isSafeReturnPath(path) ? path : null,
      reason: reason === "expired" || reason === "signin_required" ? reason : null,
    };
  } catch {
    return { path: null, reason: null };
  }
}

/**
 * The page to land on after a successful sign-in.
 *
 * Role home is the fallback, never the default, and a stored path is only
 * honoured when it stays inside the signed-in area — sending a learner to a staff
 * deep link would land them on an access-denied screen immediately after signing
 * in, which reads as a broken login.
 */
export function resolvePostSignInPath(
  roleHomePath: string,
  stored: { path: string | null } = consumeReturnPath(),
): string {
  if (!stored.path) return roleHomePath;
  const isAppPath = stored.path === "/app" || stored.path.startsWith("/app/");
  if (!isAppPath) return roleHomePath;
  return stored.path;
}
