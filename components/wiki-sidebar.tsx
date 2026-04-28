import Link from "next/link"
import { ScrollText } from "lucide-react"
import { getNavTree, type NavNode } from "@/lib/content"
import { cn } from "@/lib/utils"

const PRETTY_NAMES: Record<string, string> = {
  characters: "Characters",
  mechanics: "Mechanics",
  locations: "Locations",
  items: "Items",
  plot: "Plot & Endings",
  lore: "Lore",
  dev: "Dev Reference",
  endings: "Endings",
  reference: "Reference",
  scenes: "Scenes",
}

function NavList({
  nodes,
  depth = 0,
  currentPath,
}: {
  nodes: NavNode[]
  depth?: number
  currentPath?: string
}) {
  return (
    <ul className={cn("space-y-0.5", depth > 0 && "mt-1")}>
      {nodes.map((node) => {
        if (node.type === "page") {
          const active = currentPath === node.href
          return (
            <li key={node.href}>
              <Link
                href={node.href!}
                className={cn(
                  "block rounded-sm px-2 py-1 text-sm transition-colors",
                  "text-sidebar-foreground/85 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  active &&
                    "bg-sidebar-primary/15 text-sidebar-primary font-medium",
                )}
              >
                {node.title}
              </Link>
            </li>
          )
        }
        const pretty = PRETTY_NAMES[node.name] ?? node.name
        return (
          <li key={node.name} className="pt-3 first:pt-0">
            <div className="px-2 mb-1 font-display text-[11px] uppercase tracking-[0.18em] text-sidebar-foreground/55">
              {pretty}
            </div>
            {node.children && (
              <NavList
                nodes={node.children}
                depth={depth + 1}
                currentPath={currentPath}
              />
            )}
          </li>
        )
      })}
    </ul>
  )
}

export function WikiSidebar({ currentPath }: { currentPath?: string }) {
  const nav = getNavTree()
  return (
    <aside className="hidden lg:flex w-72 shrink-0 flex-col border-r border-sidebar-border bg-sidebar h-[calc(100vh-4rem)] sticky top-16">
      <div className="flex items-center gap-2 px-4 py-4 border-b border-sidebar-border">
        <ScrollText className="size-4 text-sidebar-primary" aria-hidden />
        <span className="font-display text-sm uppercase tracking-widest text-sidebar-foreground">
          Codex Index
        </span>
      </div>
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <Link
          href="/"
          className={cn(
            "block rounded-sm px-2 py-1 text-sm",
            currentPath === "/"
              ? "bg-sidebar-primary/15 text-sidebar-primary font-medium"
              : "text-sidebar-foreground/85 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
          )}
        >
          Dashboard
        </Link>
        <NavList nodes={nav} currentPath={currentPath} />
      </nav>
    </aside>
  )
}
