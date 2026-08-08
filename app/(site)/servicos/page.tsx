import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { PageHeader } from '@/components/layout/page-header'
import { getServices, AREA_LABEL, type Area } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Serviços',
  description:
    'Sonorização, transmissão ao vivo, projeto e instalação, e treinamento de equipe — serviços de áudio e vídeo para igrejas.',
}

export default function ServicosPage() {
  const services = getServices()
  return (
    <>
      <PageHeader
        kicker="O que fazemos"
        title="Serviços para som e transmissão de igreja"
        intro="Cada serviço com escopo claro, para quem é e faixa de investimento — para você já saber se faz sentido antes de falar com a gente."
      />
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-5 md:grid-cols-2">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={s.permalink}
              className="group border-border bg-card hover:border-accent/60 flex flex-col rounded-xl border p-6 transition-colors"
            >
              <p className="text-muted-foreground font-mono text-[11px] tracking-widest uppercase">
                {AREA_LABEL[s.area as Area]}
              </p>
              <h2 className="text-foreground mt-2 font-serif text-xl font-semibold">{s.title}</h2>
              <p className="text-muted-foreground mt-2 flex-1 text-pretty">{s.summary}</p>
              {s.priceRange && (
                <p className="text-foreground mt-4 text-sm">
                  <span className="text-muted-foreground">Investimento: </span>
                  {s.priceRange}
                </p>
              )}
              <span className="text-accent mt-4 inline-flex items-center gap-1 font-mono text-xs tracking-wide uppercase">
                Detalhes
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
