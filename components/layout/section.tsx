import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * Seção com kicker em mono (etiqueta de console) + título serif, seguindo a
 * linguagem da Fase 1.3. `id` serve às âncoras internas e ao SEO.
 */
export function Section({
  id,
  kicker,
  title,
  intro,
  children,
  className,
}: {
  id?: string
  kicker?: string
  title?: string
  intro?: ReactNode
  children: ReactNode
  className?: string
}) {
  return (
    <section id={id} className={cn('scroll-mt-20 py-16 sm:py-20', className)}>
      <div className="mx-auto max-w-6xl px-4">
        {(kicker || title) && (
          <header className="mb-10 max-w-2xl">
            {kicker && (
              <p className="text-accent font-mono text-xs font-medium tracking-[0.2em] uppercase">
                {kicker}
              </p>
            )}
            {title && (
              <h2 className="text-foreground mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                {title}
              </h2>
            )}
            {intro && <div className="text-muted-foreground mt-4 text-lg text-pretty">{intro}</div>}
          </header>
        )}
        {children}
      </div>
    </section>
  )
}
