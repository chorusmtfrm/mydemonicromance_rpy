import Link from "next/link"
import {
  Sword,
  Heart,
  Skull,
  Sparkles,
  ScrollText,
  Map,
  Package,
  Users,
  ArrowRight,
} from "lucide-react"
import { WikiShell } from "@/components/wiki-shell"
import { RouteBadge } from "@/components/route-badge"
import { StatusPill } from "@/components/status-pill"
import { VariableTable } from "@/components/variable-table"
import { getStats, getAllPages } from "@/lib/content"

export default function DashboardPage() {
  const stats = getStats()
  const pages = getAllPages()

  const totals = [
    {
      label: "Characters",
      value: stats.byCategory["Characters"] ?? 0,
      icon: Users,
      href: "/wiki/characters",
    },
    {
      label: "Mechanics",
      value: stats.byCategory["Mechanics"] ?? 0,
      icon: Sparkles,
      href: "/wiki/mechanics",
    },
    {
      label: "Locations",
      value: stats.byCategory["Locations"] ?? 0,
      icon: Map,
      href: "/wiki/locations",
    },
    {
      label: "Items",
      value: stats.byCategory["Items"] ?? 0,
      icon: Package,
      href: "/wiki/items",
    },
    {
      label: "Plot & Endings",
      value: stats.byCategory["Plot"] ?? 0,
      icon: Skull,
      href: "/wiki/plot/endings",
    },
    {
      label: "Dev Reference",
      value: stats.byCategory["Dev Reference"] ?? 0,
      icon: ScrollText,
      href: "/wiki/dev/variables",
    },
  ]

  const trackingVars = [
    {
      name: "player_name",
      type: "str",
      initial: '""',
      purpose: "Dynamic protagonist name. Set in opening prompt.",
    },
    {
      name: "ryoka_corruption",
      type: "int",
      initial: "0",
      purpose: "0–100. Drives Ryoka's NTR scenes & dialogue.",
    },
    {
      name: "yuriko_corruption",
      type: "int",
      initial: "0",
      purpose: "0–100. Drives Yuriko's NTR scenes & dialogue.",
    },
    {
      name: "ryoka_affection",
      type: "int",
      initial: "0",
      purpose: "0–100. Vanilla intimacy with Ryoka.",
    },
    {
      name: "yuriko_affection",
      type: "int",
      initial: "0",
      purpose: "0–100. Vanilla intimacy with Yuriko.",
    },
    {
      name: "curse_severity",
      type: "int",
      initial: "1",
      purpose:
        "0–3. 0 Pristine · 1 Marked · 2 Corrupted · 3 Bound. Cure Quest decrements.",
    },
    {
      name: "ryoka_suspicion",
      type: "int",
      initial: "0",
      purpose: "Hidden. Sabotage telegraphs. Soft-gates corruption past 30/60/90.",
    },
    {
      name: "yuriko_suspicion",
      type: "int",
      initial: "0",
      purpose: "Hidden. Same scale as Ryoka. Decays −1 per rest day.",
    },
    {
      name: "day_count",
      type: "int",
      initial: "1",
      purpose: "Increments at dawn. Hard cap at Day 90. Crucible fires Day 45.",
    },
    {
      name: "time_of_day",
      type: "str",
      initial: '"day"',
      purpose: '"day" or "night". Controls hub vs quest screens.',
    },
    {
      name: "route_locked",
      type: "str | None",
      initial: "None",
      purpose:
        'Set by Day 45 Crucible event. "vanilla" | "ntr" | "split" | "tragedy".',
    },
    {
      name: "memory_fragments",
      type: "list[str]",
      initial: "[]",
      purpose:
        "Antagonist backstory drops collected at Dark Alley. Drives lore reframe.",
    },
  ]

  // surface a few priority pages
  const FEATURED_SLUGS = [
    "dev/codebase-audit",
    "dev/aio-template",
    "mechanics/corruption",
    "mechanics/cure-quest",
    "plot/endings",
    "dev/variables",
  ]
  const featured = FEATURED_SLUGS
    .map((slug) => pages.find((p) => p.slug.join("/") === slug))
    .filter((p): p is NonNullable<typeof p> => p !== undefined)

  return (
    <WikiShell currentPath="/">
      <div className="px-6 md:px-10 py-10 max-w-6xl mx-auto">
        {/* HERO */}
        <section className="mb-12">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              Project Codex
            </span>
            <span className="text-muted-foreground/60">·</span>
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">
              Pre-production
            </span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl text-balance leading-tight text-foreground">
            The Cuckhealer&apos;s Codex
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-muted-foreground leading-relaxed text-pretty">
            Dev bible for a Konosuba-flavored Ren&apos;Py VN-RPG. Two routes, one
            curse, two overpowered party members, and a protagonist whose only
            real spell is &quot;heal.&quot; Every page here is a working note —
            variables, screen logic, scene flags, branch rules.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            <RouteBadge route="vanilla" />
            <RouteBadge route="ntr" />
            <RouteBadge route="rescue" />
          </div>
        </section>

        {/* STAT GRID */}
        <section className="mb-14">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {totals.map(({ label, value, icon: Icon, href }) => (
              <Link
                key={label}
                href={href}
                className="group rounded-md border border-border bg-card p-4 hover:border-primary/60 hover:bg-accent/40 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <Icon className="size-4 text-primary" aria-hidden />
                  <ArrowRight className="size-3.5 text-muted-foreground/60 group-hover:text-primary transition-colors" />
                </div>
                <div className="font-display text-3xl text-foreground leading-none">
                  {value}
                </div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  {label}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ROUTE LOGIC SNAPSHOT */}
        <section className="mb-14">
          <header className="mb-4 flex items-baseline justify-between">
            <h2 className="font-display text-2xl text-foreground">
              Route Logic Snapshot
            </h2>
            <Link
              href="/wiki/mechanics/corruption"
              className="font-mono text-xs uppercase tracking-widest text-primary hover:underline"
            >
              full mechanic →
            </Link>
          </header>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="rounded-md border border-border bg-card p-5">
              <div className="flex items-center gap-2 mb-3">
                <Heart className="size-4 text-primary" aria-hidden />
                <h3 className="font-display text-lg">Vanilla / Harem</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Both girls{" "}
                <span className="font-mono text-foreground">affection ≥ 50</span>{" "}
                and{" "}
                <span className="font-mono text-foreground">corruption &lt; 50</span>{" "}
                at the Day 45 Crucible. Unlocks the four-step Cure Quest.
                Each step drops <span className="font-mono text-foreground">curse_severity</span> by one.
              </p>
              <div className="mt-3">
                <StatusPill status="planned" />
              </div>
            </div>
            <div className="rounded-md border border-destructive/40 bg-destructive/8 p-5">
              <div className="flex items-center gap-2 mb-3">
                <Skull className="size-4 text-destructive" aria-hidden />
                <h3 className="font-display text-lg">NTR / Corruption</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Both girls{" "}
                <span className="font-mono text-foreground">corruption ≥ 50</span>{" "}
                at the Day 45 Crucible. Triggers Breaking Point. Sabotage
                becomes craved; suspicion decays to zero.
              </p>
              <div className="mt-3">
                <StatusPill status="planned" />
              </div>
            </div>
            <div className="rounded-md border border-border bg-accent/40 p-5">
              <div className="flex items-center gap-2 mb-3">
                <Sword className="size-4 text-foreground" aria-hidden />
                <h3 className="font-display text-lg">Rescue / Bittersweet</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Mixed Crucible — one girl{" "}
                <span className="font-mono text-foreground">corruption ≥ 50</span>,
                the other{" "}
                <span className="font-mono text-foreground">affection ≥ 50</span>.
                Truncated three-step Cure for the one you can still save.
                Default Tragedy if uncommitted by Day 90.
              </p>
              <div className="mt-3">
                <StatusPill status="planned" />
              </div>
            </div>
          </div>
        </section>

        {/* TRACKING VARIABLES */}
        <section className="mb-14">
          <header className="mb-4 flex items-baseline justify-between">
            <h2 className="font-display text-2xl text-foreground">
              Core Tracking Variables
            </h2>
          <Link
            href="/wiki/dev/variables"
            className="font-mono text-xs uppercase tracking-widest text-primary hover:underline"
          >
            full reference →
          </Link>
          </header>
          <VariableTable rows={trackingVars} />
        </section>

        {/* FEATURED PAGES */}
        <section className="mb-10">
          <header className="mb-4">
            <h2 className="font-display text-2xl text-foreground">
              Priority Pages
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Where to start cracking the script.
            </p>
          </header>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {featured.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="group rounded-md border border-border bg-card p-4 hover:border-primary/60 transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  {p.frontmatter.route && (
                    <RouteBadge route={p.frontmatter.route} />
                  )}
                  {p.frontmatter.status && (
                    <StatusPill status={p.frontmatter.status} />
                  )}
                </div>
                <h3 className="font-display text-lg text-foreground group-hover:text-primary transition-colors">
                  {p.frontmatter.title}
                </h3>
                {p.frontmatter.summary && (
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                    {p.frontmatter.summary}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </WikiShell>
  )
}
