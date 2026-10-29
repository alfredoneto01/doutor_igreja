import { Plus } from 'lucide-react'
import { MDXContent } from '@/components/content/mdx-content'
import type { Faq } from '@/lib/content'

/**
 * Acordeão de FAQ com <details>/<summary> nativos — acessível por teclado sem
 * JS. Usado na home (teaser) e na página /faq. Cada item tem id para deep-link.
 */
export function FaqAccordion({ items }: { items: Faq[] }) {
  return (
    <div className="divide-border border-border divide-y overflow-hidden rounded-xl border">
      {items.map((f) => (
        <details key={f.slug} id={f.slug} className="group bg-card open:bg-muted/30 scroll-mt-24">
          <summary className="hover:text-accent flex cursor-pointer items-center justify-between gap-4 p-5 font-medium marker:content-none [&::-webkit-details-marker]:hidden">
            <span className="text-pretty">{f.question}</span>
            <Plus className="text-accent size-5 shrink-0 transition-transform group-open:rotate-45" />
          </summary>
          <div className="prose prose-sm max-w-none px-5 pb-5">
            <MDXContent code={f.body} />
          </div>
        </details>
      ))}
    </div>
  )
}
