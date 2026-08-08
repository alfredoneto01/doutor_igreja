import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Section } from '@/components/layout/section'
import { getServices, AREA_LABEL, type Area } from '@/lib/content'

/**
 * Serviços — cada um com descrição real, público, entregável e faixa de
 * investimento (§4). Faixa visível filtra contato desqualificado.
 */
export function ServicosSection() {
  const services = getServices()
  return (
    <Section
      id="servicos"
      kicker="O que fazemos"
      title="Serviços para som e transmissão de igreja"
      intro="Do diagnóstico à equipe treinada. Cada serviço com escopo claro e faixa de investimento — para você já saber se faz sentido antes de falar com a gente."
      className="border-border/60 border-t"
    >
      <div className="grid gap-5 md:grid-cols-2">
        {services.map((s) => (
          <article
            key={s.slug}
            className="border-border bg-card flex flex-col rounded-xl border p-6"
          >
            <p className="text-muted-foreground font-mono text-[11px] tracking-widest uppercase">
              {AREA_LABEL[s.area as Area]}
            </p>
            <h3 className="text-foreground mt-2 font-serif text-xl font-semibold">{s.title}</h3>
            <p className="text-muted-foreground mt-2 flex-1 text-pretty">{s.summary}</p>

            <dl className="mt-4 space-y-1 text-sm">
              <div className="flex gap-2">
                <dt className="text-muted-foreground shrink-0">Para quem:</dt>
                <dd className="text-foreground">{s.audience}</dd>
              </div>
              {s.priceRange && (
                <div className="flex gap-2">
                  <dt className="text-muted-foreground shrink-0">Investimento:</dt>
                  <dd className="text-foreground">{s.priceRange}</dd>
                </div>
              )}
            </dl>

            <Link
              href={s.permalink}
              className="text-accent mt-5 inline-flex items-center gap-1 font-mono text-xs tracking-wide uppercase hover:underline"
            >
              Detalhes do serviço
              <ArrowRight className="size-3.5" />
            </Link>
          </article>
        ))}
      </div>
    </Section>
  )
}
