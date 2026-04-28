import { cn } from "@/lib/utils"
import type { RouteFlavor } from "@/lib/content"

const ROUTE_STYLES: Record<RouteFlavor, { label: string; className: string }> = {
  vanilla: {
    label: "Vanilla / Harem",
    className:
      "bg-primary/15 text-primary border-primary/40",
  },
  ntr: {
    label: "NTR / Corruption",
    className:
      "bg-destructive/12 text-destructive border-destructive/40",
  },
  rescue: {
    label: "Rescue / Bittersweet",
    className:
      "bg-accent text-accent-foreground border-border",
  },
  bittersweet: {
    label: "Rescue / Bittersweet",
    className:
      "bg-accent text-accent-foreground border-border",
  },
  shared: {
    label: "Shared",
    className:
      "bg-secondary text-secondary-foreground border-border",
  },
  both: {
    label: "Both Routes",
    className:
      "bg-secondary text-secondary-foreground border-border",
  },
  neutral: {
    label: "Neutral",
    className:
      "bg-muted text-muted-foreground border-border",
  },
}

export function RouteBadge({
  route,
  className,
}: {
  route: RouteFlavor
  className?: string
}) {
  const style = ROUTE_STYLES[route] ?? ROUTE_STYLES.neutral
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm border px-2 py-0.5 text-xs font-display tracking-wider uppercase",
        style.className,
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-current opacity-70" />
      {style.label}
    </span>
  )
}
