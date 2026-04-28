import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronRight } from "lucide-react"
import { WikiShell } from "@/components/wiki-shell"
import { MarkdownRenderer } from "@/components/markdown-renderer"
import { RouteBadge } from "@/components/route-badge"
import { StatusPill } from "@/components/status-pill"
import { getAllPages, getPageBySlug } from "@/lib/content"

export async function generateStaticParams() {
  const pages = getAllPages()
  return pages
    .filter((p) => p.slug.length > 0)
    .map((p) => ({ slug: p.slug }))
}

interface PageProps {
  params: Promise<{ slug: string[] }>
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const page = getPageBySlug(slug)
  if (!page) return { title: "Not Found" }
  return {
    title: `${page.frontmatter.title} — Codex`,
    description: page.frontmatter.summary,
  }
}

export default async function WikiPage({ params }: PageProps) {
  const { slug } = await params
  const page = getPageBySlug(slug)
  if (!page) notFound()

  const currentPath = `/wiki/${slug.join("/")}`

  // Build breadcrumb
  const crumbs = slug.map((segment, idx) => {
    const href = `/wiki/${slug.slice(0, idx + 1).join("/")}`
    return { segment, href }
  })

  return (
    <WikiShell currentPath={currentPath}>
      <div className="px-6 md:px-10 py-10 max-w-4xl mx-auto">
        {/* breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex items-center flex-wrap gap-1 text-xs font-mono uppercase tracking-widest text-muted-foreground"
        >
          <Link href="/" className="hover:text-primary transition-colors">
            Codex
          </Link>
          {crumbs.map((c, i) => (
            <span key={c.href} className="flex items-center gap-1">
              <ChevronRight className="size-3" aria-hidden />
              {i === crumbs.length - 1 ? (
                <span className="text-foreground">{c.segment}</span>
              ) : (
                <Link
                  href={c.href}
                  className="hover:text-primary transition-colors"
                >
                  {c.segment}
                </Link>
              )}
            </span>
          ))}
        </nav>

        {/* header */}
        <header className="mb-8 pb-6 border-b border-border">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {page.frontmatter.category && (
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                {page.frontmatter.category}
              </span>
            )}
            {page.frontmatter.route && (
              <RouteBadge route={page.frontmatter.route} />
            )}
            {page.frontmatter.status && (
              <StatusPill status={page.frontmatter.status} />
            )}
          </div>
          <h1 className="font-display text-4xl md:text-5xl text-foreground text-balance leading-tight">
            {page.frontmatter.title}
          </h1>
          {page.frontmatter.summary && (
            <p className="mt-3 text-lg text-muted-foreground leading-relaxed text-pretty">
              {page.frontmatter.summary}
            </p>
          )}
          {page.frontmatter.tags && page.frontmatter.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {page.frontmatter.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-sm bg-secondary px-1.5 py-0.5 font-mono text-[10px] text-secondary-foreground"
                >
                  #{t}
                </span>
              ))}
            </div>
          )}
        </header>

        <MarkdownRenderer source={page.body} />
      </div>
    </WikiShell>
  )
}
