import { cn } from "@/lib/utils";

export function AdSlot({
  className,
  label = "Advertisement",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <div
      className={cn(
        "bg-muted/40 flex items-center justify-center rounded-xl border border-dashed",
        "min-h-[90px] w-full px-4 py-3 text-center",
        className,
      )}
    >
      <div className="space-y-1">
        <p className="text-muted-foreground text-[10px] font-bold tracking-[0.18em] uppercase">
          {label}
        </p>
        <p className="text-muted-foreground text-xs">
          Ad space — enable via{" "}
          <code className="bg-muted rounded px-1 py-0.5 text-[11px]">ADSENSE_CLIENT</code>
        </p>
      </div>
    </div>
  );
}

export function AdSidebarSlot() {
  return <AdSlot className="sticky top-24 hidden lg:block" />;
}

export function AdInContentSlot() {
  return <AdSlot className="my-8" />;
}
