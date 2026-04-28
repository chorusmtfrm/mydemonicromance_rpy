import "server-only"
import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"

const CONTENT_ROOT = path.join(process.cwd(), "content")

export type RouteFlavor =
  | "vanilla"
  | "ntr"
  | "rescue"
  | "bittersweet"
  | "shared"
  | "both"
  | "neutral"
export type DraftStatus =
  | "planned"
  | "drafted"
  | "scripted"
  | "scenes-blocked"
  | "complete"
  | "canonical"

export interface PageFrontmatter {
  title: string
  category?: string
  route?: RouteFlavor
  status?: DraftStatus
  order?: number
  summary?: string
  tags?: string[]
}

export interface WikiPage {
  slug: string[]
  href: string
  frontmatter: PageFrontmatter
  body: string
}

export interface NavNode {
  type: "dir" | "page"
  name: string
  href?: string
  title?: string
  order?: number
  children?: NavNode[]
}

function walk(dir: string, base: string[] = []): WikiPage[] {
  if (!fs.existsSync(dir)) return []
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  const pages: WikiPage[] = []
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      pages.push(...walk(full, [...base, entry.name]))
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      const raw = fs.readFileSync(full, "utf8")
      const { data, content } = matter(raw)
      const fileSlug = entry.name.replace(/\.md$/, "")
      const slugParts =
        fileSlug === "index" ? base : [...base, fileSlug]
      const href =
        slugParts.length === 0 ? "/" : `/wiki/${slugParts.join("/")}`
      pages.push({
        slug: slugParts,
        href,
        frontmatter: data as PageFrontmatter,
        body: content,
      })
    }
  }
  return pages
}

export function getAllPages(): WikiPage[] {
  return walk(CONTENT_ROOT)
}

export function getPageBySlug(slug: string[]): WikiPage | null {
  const all = getAllPages()
  const target = slug.join("/")
  return (
    all.find((p) => p.slug.join("/") === target) ?? null
  )
}

/** Build a sidebar tree grouped by directory. */
export function getNavTree(): NavNode[] {
  const pages = getAllPages()
  const root: NavNode = { type: "dir", name: "", children: [] }

  function ensureDir(parts: string[]): NavNode {
    let node = root
    for (const part of parts) {
      if (!node.children) node.children = []
      let child = node.children.find(
        (c) => c.type === "dir" && c.name === part,
      )
      if (!child) {
        child = { type: "dir", name: part, children: [] }
        node.children.push(child)
      }
      node = child
    }
    return node
  }

  for (const page of pages) {
    if (page.slug.length === 0) continue // root index
    const dirParts = page.slug.slice(0, -1)
    const fileName = page.slug[page.slug.length - 1]
    const parent = ensureDir(dirParts)
    parent.children!.push({
      type: "page",
      name: fileName,
      href: page.href,
      title: page.frontmatter.title ?? fileName,
      order: page.frontmatter.order ?? 999,
    })
  }

  function sortNode(node: NavNode) {
    if (!node.children) return
    node.children.sort((a, b) => {
      // dirs after pages, then by order, then by name
      if (a.type !== b.type) return a.type === "page" ? -1 : 1
      const ao = a.order ?? 999
      const bo = b.order ?? 999
      if (ao !== bo) return ao - bo
      return (a.title ?? a.name).localeCompare(b.title ?? b.name)
    })
    node.children.forEach(sortNode)
  }
  sortNode(root)

  return root.children ?? []
}

export function getStats() {
  const pages = getAllPages()
  const byStatus: Record<string, number> = {}
  const byCategory: Record<string, number> = {}
  const byRoute: Record<string, number> = {}
  for (const p of pages) {
    const s = p.frontmatter.status ?? "planned"
    const c = p.frontmatter.category ?? "Uncategorized"
    const r = p.frontmatter.route ?? "neutral"
    byStatus[s] = (byStatus[s] ?? 0) + 1
    byCategory[c] = (byCategory[c] ?? 0) + 1
    byRoute[r] = (byRoute[r] ?? 0) + 1
  }
  return { total: pages.length, byStatus, byCategory, byRoute }
}
