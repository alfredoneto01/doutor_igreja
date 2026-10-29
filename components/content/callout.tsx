import type { ReactNode } from 'react'
import { AlertTriangle, BookOpen, Info, Lightbulb, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

type CalloutType = 'info' | 'warning' | 'tip' | 'note'

const CONFIG: Record<CalloutType, { icon: LucideIcon; label: string; classes: string }> = {
  info: { icon: Info, label: 'Nota', classes: 'border-primary/40 bg-primary/5 text-foreground' },
  warning: {
    icon: AlertTriangle,
    label: 'Atenção',
    classes: 'border-accent/50 bg-accent/10 text-foreground',
  },
  tip: { icon: Lightbulb, label: 'Dica', classes: 'border-accent/50 bg-accent/10 text-foreground' },
  note: {
    icon: BookOpen,
    label: 'Observação',
    classes: 'border-border bg-muted/40 text-foreground',
  },
}

export function Callout({
  type = 'info',
  title,
  children,
}: {
  type?: CalloutType
  title?: string
  children: ReactNode
}) {
  const { icon: Icon, label, classes } = CONFIG[type]
  return (
    <aside
      role="note"
      className={cn(
        'not-prose my-6 flex gap-3 rounded-md border-y border-l-4 border-y-transparent p-4',
        classes,
      )}
    >
      <Icon className="mt-0.5 size-5 shrink-0 opacity-90" aria-hidden />
      <div className="min-w-0 flex-1 space-y-1.5">
        <p className="font-mono text-[11px] tracking-widest uppercase opacity-80">
          {title ?? label}
        </p>
        <div className="text-sm leading-relaxed [&_p]:my-1">{children}</div>
      </div>
    </aside>
  )
}
