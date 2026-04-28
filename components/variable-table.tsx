import { cn } from "@/lib/utils"

export interface VarRow {
  name: string
  type: string
  initial: string
  purpose: string
}

export function VariableTable({
  rows,
  className,
}: {
  rows: VarRow[]
  className?: string
}) {
  return (
    <div className={cn("overflow-x-auto rounded-md border border-border bg-card", className)}>
      <table className="w-full text-sm">
        <thead className="bg-secondary">
          <tr>
            <th className="px-3 py-2 text-left font-display text-xs uppercase tracking-wider text-secondary-foreground">
              Variable
            </th>
            <th className="px-3 py-2 text-left font-display text-xs uppercase tracking-wider text-secondary-foreground">
              Type
            </th>
            <th className="px-3 py-2 text-left font-display text-xs uppercase tracking-wider text-secondary-foreground">
              Initial
            </th>
            <th className="px-3 py-2 text-left font-display text-xs uppercase tracking-wider text-secondary-foreground">
              Purpose
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map((row) => (
            <tr key={row.name} className="hover:bg-accent/40">
              <td className="px-3 py-2 font-mono text-xs text-primary">
                {row.name}
              </td>
              <td className="px-3 py-2 font-mono text-xs text-muted-foreground">
                {row.type}
              </td>
              <td className="px-3 py-2 font-mono text-xs text-foreground">
                {row.initial}
              </td>
              <td className="px-3 py-2 text-foreground">{row.purpose}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
