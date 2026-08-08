import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Section } from '@/components/layout/section'
import { getSymptoms } from '@/lib/content'

/**
 * Problema/diagnóstico — espinha dorsal do SEO (§2). Cada sintoma é uma página
 * indexável escrita na linguagem que a igreja usa na busca.
 */
export function DiagnosticoSection() {
  const symptoms = getSymptoms().slice(0, 6)
  return (
    <Section
      id="diagnostico"
      kicker="O problema, na sua língua"
      title="Reconhece algum destes na sua igreja?"
      intro="Se a congregação ouve mas não entende, quase nunca é falta de volume. Comece pelo sintoma — cada um leva ao que investigar."
    >
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {symptoms.map((s) => (
          <li key={s.slug}>
            <Link
              href={s.permalink}
              className="group border-border bg-card hover:border-accent/60 flex h-full flex-col justify-between rounded-lg border p-5 transition-colors"
            >
              <span className="text-foreground font-medium text-pretty">{s.title}</span>
              <span className="text-accent mt-4 inline-flex items-center gap-1 font-mono text-xs tracking-wide uppercase">
                Ver diagnóstico
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  )
}
