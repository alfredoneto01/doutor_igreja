import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export type LinkCardItem = {
  href: string
  kicker?: string
  title: string
  text?: string
  cta?: string
}

/** Grade de cartões de navegação (portas de entrada, soluções, áreas). */
export function LinkCards({ items, className }: { items: LinkCardItem[]; className?: string }) {
  return (
    <ul className={cn('grid gap-4 sm:grid-cols-2 lg:grid-cols-3', className)}>
      {items.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            className="group border-border bg-card hover:border-accent/60 flex h-full flex-col rounded-xl border p-6 transition-colors"
          >
            {item.kicker && (
              <span className="text-accent font-mono text-[11px] tracking-widest uppercase">
                {item.kicker}
              </span>
            )}
            <span className="text-foreground mt-2 font-serif text-xl font-semibold text-balance">
              {item.title}
            </span>
            {item.text && (
              <span className="text-muted-foreground mt-2 flex-1 text-sm text-pretty">
                {item.text}
              </span>
            )}
            <span className="text-accent mt-5 inline-flex items-center gap-1 font-mono text-xs tracking-wide uppercase">
              {item.cta ?? 'Saiba mais'}
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}

/** Lista simples com marcador em latão (accent). */
export function BulletList({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={cn('grid gap-2 sm:grid-cols-2', className)}>
      {items.map((i) => (
        <li key={i} className="text-foreground flex gap-3">
          <span aria-hidden className="bg-accent mt-2.5 size-1.5 shrink-0 rounded-full" />
          <span className="text-pretty">{i}</span>
        </li>
      ))}
    </ul>
  )
}
