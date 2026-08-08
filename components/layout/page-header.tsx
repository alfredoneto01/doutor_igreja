import type { ReactNode } from 'react'

export function PageHeader({
  kicker,
  title,
  intro,
}: {
  kicker?: string
  title: string
  intro?: ReactNode
}) {
  return (
    <header className="border-border/60 border-b">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        {kicker && (
          <p className="text-accent font-mono text-xs font-medium tracking-[0.2em] uppercase">
            {kicker}
          </p>
        )}
        <h1 className="text-foreground mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          {title}
        </h1>
        {intro && (
          <div className="text-muted-foreground mt-5 max-w-2xl text-lg text-pretty">{intro}</div>
        )}
      </div>
    </header>
  )
}
