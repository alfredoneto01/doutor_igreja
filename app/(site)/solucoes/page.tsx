import type { Metadata } from 'next'
import { PageHeader } from '@/components/layout/page-header'
import { Section } from '@/components/layout/section'
import { LinkCards } from '@/components/content/link-cards'
import { WhatsappCta } from '@/components/content/whatsapp-cta'
import { BRANDS, SOLUTIONS } from '@/lib/catalog'
import { WA } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Soluções audiovisuais',
  description:
    'Produção audiovisual, transmissões ao vivo, eventos, direção técnica, podcasts e projetos de estúdio para empresas, marcas e instituições.',
  alternates: { canonical: '/solucoes' },
}

export default function SolucoesPage() {
  return (
    <>
      <PageHeader
        kicker={BRANDS.institucional.short}
        title="Soluções audiovisuais"
        intro="Para empresas, marcas, instituições, agências, eventos e produtores de conteúdo. Cada projeto é dimensionado pelo escopo: a proposta é elaborada pelo Cadu a partir do seu briefing."
      />
      <Section>
        <LinkCards
          items={SOLUTIONS.map((s) => ({
            href: `/solucoes/${s.slug}`,
            title: s.name,
            text: s.summary,
          }))}
        />
      </Section>
      <Section className="border-border/60 border-t">
        <WhatsappCta
          title="Conte o que precisa acontecer"
          text="Tipo de entrega, objetivo, data e local já ajudam a direcionar a conversa."
          message={WA.corporativo}
          label="Enviar briefing"
        />
      </Section>
    </>
  )
}
