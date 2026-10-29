import type { Metadata } from 'next'
import { PageHeader } from '@/components/layout/page-header'
import { Section } from '@/components/layout/section'
import { WhatsappCta } from '@/components/content/whatsapp-cta'
import { PROJECT_STAGES } from '@/lib/catalog'

export const metadata: Metadata = {
  title: 'Projetos e implantação para igrejas',
  description:
    'Projeto Conceitual, Técnico e Executivo; implantação, comissionamento, operação assistida e capacitação das equipes da igreja.',
  alternates: { canonical: '/doutor-igreja/projetos' },
}

/** Contexto §3 e §14 ("Projetos e implantação"): contratação por escopo. */
export default function ProjetosPage() {
  return (
    <>
      <PageHeader
        kicker="Doutor Igreja · Projetos"
        title="Projetos, implantação e operação assistida"
        intro="Cada etapa é contratada por escopo, normalmente a partir do direcionamento do Check-Up. Nenhuma etapa posterior é incluída automaticamente."
      />
      <Section>
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECT_STAGES.map((stage, i) => (
            <li key={stage.name} className="border-border bg-card rounded-xl border p-6">
              <span className="text-accent font-mono text-xs">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="text-foreground mt-1 font-serif text-xl font-semibold">{stage.name}</p>
              <p className="text-muted-foreground mt-2 text-sm text-pretty">{stage.description}</p>
            </li>
          ))}
        </ol>
      </Section>
      <Section className="border-border/60 border-t">
        <WhatsappCta
          title="A igreja está em obra, reforma ou planejando mudanças?"
          text="Conte em que fase vocês estão e como o audiovisual entra nesse planejamento."
          message="Olá! Quero conversar sobre um projeto audiovisual para a minha igreja."
        />
      </Section>
    </>
  )
}
