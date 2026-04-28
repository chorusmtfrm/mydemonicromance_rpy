import { Children, isValidElement, cloneElement, type ReactNode, type ReactElement } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeSlug from "rehype-slug"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import { cn } from "@/lib/utils"
import { DevCallout } from "@/components/dev-callout"

type CalloutVariant = "note" | "warning" | "proposal" | "lore"

const CALLOUT_PATTERN = /^\s*\[!(dev|note|warning|proposal|lore)\]\s*/i
const VARIANT_MAP: Record<string, CalloutVariant> = {
  dev: "note",
  note: "note",
  warning: "warning",
  proposal: "proposal",
  lore: "lore",
}

/**
 * Inspect blockquote children for a leading `[!dev]` marker (GitHub-style
 * admonition). If found, strip the marker text and return the variant + cleaned
 * children. Otherwise return null.
 */
function detectCallout(
  children: ReactNode,
): { variant: CalloutVariant; cleaned: ReactNode } | null {
  const arr = Children.toArray(children)
  for (let i = 0; i < arr.length; i++) {
    const node = arr[i]
    if (!isValidElement(node)) continue
    const el = node as ReactElement<{ children?: ReactNode }>
    const inner = Children.toArray(el.props.children ?? [])
    if (inner.length === 0) continue
    const first = inner[0]
    if (typeof first !== "string") continue
    const match = first.match(CALLOUT_PATTERN)
    if (!match) continue
    const variant = VARIANT_MAP[match[1].toLowerCase()] ?? "note"
    const stripped = first.replace(CALLOUT_PATTERN, "")
    const newInner = stripped.length > 0 ? [stripped, ...inner.slice(1)] : inner.slice(1)
    const replacedFirst = cloneElement(el, { children: newInner })
    const cleaned = [...arr.slice(0, i), replacedFirst, ...arr.slice(i + 1)]
    return { variant, cleaned }
  }
  return null
}

export function MarkdownRenderer({
  source,
  className,
}: {
  source: string
  className?: string
}) {
  return (
    <article
      className={cn(
        "prose-wiki max-w-none",
        "leading-relaxed text-foreground",
        className,
      )}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            { behavior: "wrap", properties: { className: "anchor-link" } },
          ],
        ]}
        components={{
          h1: ({ children, ...props }) => (
            <h1
              {...props}
              className="font-display text-3xl md:text-4xl mt-10 mb-4 text-foreground"
            >
              {children}
            </h1>
          ),
          h2: ({ children, ...props }) => (
            <h2
              {...props}
              className="font-display text-2xl mt-10 mb-3 pb-1.5 border-b border-border text-foreground"
            >
              {children}
            </h2>
          ),
          h3: ({ children, ...props }) => (
            <h3
              {...props}
              className="font-display text-xl mt-6 mb-2 text-foreground"
            >
              {children}
            </h3>
          ),
          h4: ({ children, ...props }) => (
            <h4
              {...props}
              className="font-display text-base uppercase tracking-wider mt-5 mb-2 text-primary"
            >
              {children}
            </h4>
          ),
          p: ({ children }) => (
            <p className="my-3 leading-relaxed">{children}</p>
          ),
          a: ({ children, href, ...props }) => (
            <a
              {...props}
              href={href}
              className="text-primary underline decoration-primary/40 underline-offset-2 hover:decoration-primary"
            >
              {children}
            </a>
          ),
          ul: ({ children }) => (
            <ul className="my-3 list-disc pl-6 marker:text-primary [&>li]:my-1">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="my-3 list-decimal pl-6 marker:text-primary [&>li]:my-1">
              {children}
            </ol>
          ),
          blockquote: ({ children }) => {
            const callout = detectCallout(children)
            if (callout) {
              return (
                <DevCallout variant={callout.variant}>
                  {callout.cleaned}
                </DevCallout>
              )
            }
            return (
              <blockquote className="my-4 border-l-4 border-primary/50 bg-accent/40 pl-4 pr-3 py-2 italic text-muted-foreground rounded-r">
                {children}
              </blockquote>
            )
          },
          code: ({ children, className, ...props }) => {
            const isBlock = /language-/.test(className ?? "")
            if (isBlock) {
              return (
                <code
                  {...props}
                  className={cn(
                    "block w-full text-[13px] leading-relaxed",
                    className,
                  )}
                >
                  {children}
                </code>
              )
            }
            return (
              <code
                {...props}
                className="rounded bg-secondary px-1.5 py-0.5 font-mono text-[0.85em] text-primary"
              >
                {children}
              </code>
            )
          },
          pre: ({ children }) => (
            <pre className="my-4 overflow-x-auto rounded-md border border-border bg-foreground/[0.04] p-4 font-mono">
              {children}
            </pre>
          ),
          table: ({ children }) => (
            <div className="my-5 overflow-x-auto rounded-md border border-border">
              <table className="w-full text-sm">{children}</table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-secondary">{children}</thead>
          ),
          th: ({ children }) => (
            <th className="px-3 py-2 text-left font-display text-xs uppercase tracking-wider text-secondary-foreground">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-3 py-2 border-t border-border align-top">
              {children}
            </td>
          ),
          hr: () => <hr className="my-8 border-border" />,
          strong: ({ children }) => (
            <strong className="font-semibold text-foreground">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="italic text-foreground/90">{children}</em>
          ),
        }}
      >
        {source}
      </ReactMarkdown>
    </article>
  )
}
