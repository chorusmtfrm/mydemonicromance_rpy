import { cn } from "@/lib/utils"

export interface StatRow {
  label: string
  value: string | number
  hint?: string
}

export function StatBlock({
  title,
  subtitle,
  rows,
  className,
}: {
  title: string
  subtitle?: string
  rows: StatRow[]
  className?: string
}) {
  return (
    <div
      className={cn(
        "rounded-md border border-border bg-card",
        "shadow-[0_1px_0_oklch(0.78_0.06_85),inset_0_0_0_1px_oklch(0.97_0.025_85)]",
        className,
      )}
    >
      <div className="border-b border-border px-4 py-3">
        <h4 className="font-display text-base text-foreground">{title}</h4>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
        )}
      </div>
      <dl className="divide-y divide-border">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-baseline justify-between gap-4 px-4 py-2"
          >
            <dt className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              {row.label}
            </dt>
            <dd className="text-right">
              <span className="font-display text-sm text-foreground">
                {row.value}
              </span>
              {row.hint && (
                <span className="block text-[11px] text-muted-foreground italic">
                  {row.hint}
                </span>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
