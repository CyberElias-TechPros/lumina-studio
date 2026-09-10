import { cn } from "@/lib/utils";

/**
 * NOTE (AdSense recovery): ad slots are intentionally disabled until the
 * site is approved. Rendering empty "Ad space" boxes signals a
 * made-for-AdSense site to reviewers, so these render nothing for now.
 * Re-enable by restoring the placeholder UI once approved.
 */
export function AdSlot({
  className,
  label = "Advertisement",
}: {
  className?: string;
  label?: string;
}) {
  void className;
  void label;
  void cn;
  return null;
}

export function AdSidebarSlot() {
  return null;
}

export function AdInContentSlot() {
  return null;
}
