import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { PageHeader } from '@/components/layout/page-header'
import { getSymptoms, AREA_LABEL, type Area } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Diagnóstico — o problema do som da sua igreja',
  description:
    'Som embolado, microfonia, cobertura irregular, transmissão com áudio ruim? Encontre o sintoma da sua igreja e entenda o que investigar.',
}

export default function DiagnosticoPage() {
  const symptoms = getSymptoms()
  return (
    <>
      <PageHeader
        kicker="O problema, na sua língua"
        title="Qual é o sintoma na sua igreja?"
        intro="Comece pelo que você percebe no culto. Cada sintoma explica a causa provável e o que dá para fazer."
      />
      <div className="mx-auto max-w-6xl px-4 py-16">
        <ul className="grid gap-3 sm:grid-cols-2">
          {symptoms.map((s) => (
            <li key={s.slug}>
              <Link
                href={s.permalink}
                className="group border-border bg-card hover:border-accent/60 flex h-full flex-col justify-between rounded-lg border p-6 transition-colors"
              >
                <div>
                  <p className="text-muted-foreground font-mono text-[11px] tracking-widest uppercase">
                    {AREA_LABEL[s.area as Area]}
                  </p>
                  <span className="text-foreground mt-2 block font-medium text-pretty">
                    {s.title}
                  </span>
                </div>
                <span className="text-accent mt-4 inline-flex items-center gap-1 font-mono text-xs tracking-wide uppercase">
                  Ver diagnóstico
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
