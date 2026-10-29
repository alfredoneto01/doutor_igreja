import type { Metadata } from 'next'
import { PageHeader } from '@/components/layout/page-header'
import { Section } from '@/components/layout/section'
import { LinkCards } from '@/components/content/link-cards'
import { Pending } from '@/components/content/pending'
import { AREA_LABEL, getSymptoms } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Conteúdos — problemas de som e transmissão na igreja',
  description:
    'Som embolado, transmissão ruim, equipe sem treinamento: entenda os problemas mais comuns do audiovisual das igrejas e o que investigar.',
  alternates: { canonical: '/doutor-igreja/conteudos' },
}

export default function ConteudosPage() {
  const symptoms = getSymptoms()
  return (
    <>
      <PageHeader
        kicker="Doutor Igreja · Conteúdos"
        title="Os problemas que as igrejas mais enfrentam"
        intro="Comece pelo que está acontecendo no culto. Cada conteúdo explica o que investigar antes de investir."
      />
      <Section>
        {symptoms.length > 0 ? (
          <LinkCards
            items={symptoms.map((s) => ({
              href: s.permalink,
              kicker: AREA_LABEL[s.area],
              title: s.title,
              cta: 'Ler',
            }))}
          />
        ) : (
          <Pending>artigos e materiais educativos.</Pending>
        )}
      </Section>
    </>
  )
}
