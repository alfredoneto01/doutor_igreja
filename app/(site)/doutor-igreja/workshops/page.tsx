import type { Metadata } from 'next'
import { PageHeader } from '@/components/layout/page-header'
import { Section } from '@/components/layout/section'
import { Pending } from '@/components/content/pending'
import { WhatsappCta } from '@/components/content/whatsapp-cta'
import { WORKSHOPS } from '@/lib/catalog'
import { WA } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Workshops para equipes de igreja',
  description:
    'Seis workshops autorais do Doutor Igreja para equipes técnicas, músicos, mídia e liderança, com possibilidade de personalização.',
  alternates: { canonical: '/doutor-igreja/workshops' },
}

/**
 * Contexto §14 ("Workshops e treinamentos"). A referência interna de valor do
 * workshop presencial não é publicada: não é cotação fechada (§3).
 */
export default function WorkshopsPage() {
  return (
    <>
      <PageHeader
        kicker="Doutor Igreja · Formação"
        title="Workshops autorais"
        intro="Formação prática para equipes técnicas, músicos, mídia e liderança. Formato, duração e conteúdo podem ser personalizados para a realidade da igreja."
      />
      <Section>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {WORKSHOPS.map((w) => (
            <li
              key={w.slug}
              id={w.slug}
              className="border-border bg-card scroll-mt-24 rounded-xl border p-6"
            >
              <p className="text-foreground font-serif text-xl font-semibold text-balance">
                {w.name}
              </p>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <Pending>
            público, benefício e formato de cada workshop (página individual por workshop).
          </Pending>
        </div>
      </Section>
      <Section className="border-border/60 border-t">
        <WhatsappCta
          title="Quer levar um workshop para a sua equipe?"
          text="Conte sobre a equipe e o que motivou a busca por capacitação neste momento."
          message={WA.workshop}
        />
      </Section>
    </>
  )
}
