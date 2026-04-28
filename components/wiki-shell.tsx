import Link from "next/link"
import { Feather, Github, Search } from "lucide-react"
import { WikiSidebar } from "./wiki-sidebar"

export function WikiShell({
  children,
  currentPath,
}: {
  children: React.ReactNode
  currentPath?: string
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-30 h-16 border-b border-border bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
        <div className="h-full px-4 md:px-6 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 group">
            <span className="grid place-items-center size-9 rounded-sm bg-primary text-primary-foreground shadow-sm">
              <Feather className="size-5" aria-hidden />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="font-display text-base md:text-lg tracking-wide text-foreground group-hover:text-primary transition-colors">
                The Cuckhealer&apos;s Codex
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                Dev Reference · v0.1
              </span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-sm border border-border bg-card/60">
              <Search className="size-3.5" aria-hidden />
              <span className="font-mono text-xs">cmd-k · soon</span>
            </div>
            <a
              href="https://www.renpy.org/doc/html/"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 rounded-sm border border-border bg-card/60 hover:bg-accent transition-colors font-mono text-xs"
            >
              Ren&apos;Py Docs
            </a>
            <a
              href="#"
              className="grid place-items-center size-8 rounded-sm border border-border bg-card/60 hover:bg-accent transition-colors"
              aria-label="Repository"
            >
              <Github className="size-4" aria-hidden />
            </a>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        <WikiSidebar currentPath={currentPath} />
        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>
    </div>
  )
}
