import { cn } from "@/lib/utils"
import { AlertTriangle, Lightbulb, Wand2, BookOpen } from "lucide-react"

type Variant = "note" | "warning" | "proposal" | "lore"

const STYLES: Record<Variant, { icon: React.ElementType; className: string; label: string }> = {
  note: {
    icon: BookOpen,
    label: "Dev Note",
    className: "border-border bg-card text-foreground",
  },
  warning: {
    icon: AlertTriangle,
    label: "Warning",
    className: "border-destructive/40 bg-destructive/8 text-foreground",
  },
  proposal: {
    icon: Lightbulb,
    label: "ENI Proposal",
    className: "border-primary/40 bg-primary/8 text-foreground",
  },
  lore: {
    icon: Wand2,
    label: "Lore Hook",
    className: "border-accent bg-accent/40 text-accent-foreground",
  },
}

export function DevCallout({
  variant = "note",
  title,
  children,
  className,
}: {
  variant?: Variant
  title?: string
  children: React.ReactNode
  className?: string
}) {
  const { icon: Icon, className: variantClass, label } = STYLES[variant]
  return (
    <aside
      className={cn(
        "my-6 rounded-md border-l-4 border px-4 py-3",
        variantClass,
        className,
      )}
    >
      <div className="flex items-center gap-2 mb-1.5">
        <Icon className="size-4" aria-hidden />
        <span className="font-display text-xs uppercase tracking-widest">
          {title ?? label}
        </span>
      </div>
      <div className="text-sm leading-relaxed [&_p]:mb-2 [&_p:last-child]:mb-0">
        {children}
      </div>
    </aside>
  )
}
