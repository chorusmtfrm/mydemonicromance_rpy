import { cn } from "@/lib/utils"
import type { DraftStatus } from "@/lib/content"

const STYLES: Record<DraftStatus, string> = {
  planned: "bg-muted text-muted-foreground border-border",
  drafted: "bg-accent text-accent-foreground border-border",
  scripted: "bg-primary/20 text-primary border-primary/40",
  "scenes-blocked": "bg-destructive/15 text-destructive border-destructive/40",
  complete: "bg-primary text-primary-foreground border-primary",
  canonical: "bg-primary text-primary-foreground border-primary",
}

const LABELS: Record<DraftStatus, string> = {
  planned: "Planned",
  drafted: "Drafted",
  scripted: "Scripted",
  "scenes-blocked": "Scenes Blocked",
  complete: "Complete",
  canonical: "Canonical",
}

export function StatusPill({
  status,
  className,
}: {
  status: DraftStatus
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm border px-1.5 py-0.5 text-[10px] font-mono uppercase tracking-wider",
        STYLES[status] ?? STYLES.planned,
        className,
      )}
    >
      {LABELS[status] ?? status}
    </span>
  )
}
