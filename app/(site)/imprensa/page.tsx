import type { Metadata } from 'next'
import { PageHeader } from '@/components/layout/page-header'
import { Section } from '@/components/layout/section'
import { BulletList } from '@/components/content/link-cards'
import { Pending } from '@/components/content/pending'
import { WhatsappCta } from '@/components/content/whatsapp-cta'
import { BRANDS } from '@/lib/catalog'
import { WA } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Imprensa e mídia kit',
  description:
    'Informações institucionais, releases, biografias e materiais de imprensa da Cadu Aranha Produções, do Doutor Igreja e do Estúdio Teia.',
  alternates: { canonical: '/imprensa' },
}

/**
 * Seção básica de imprensa do MVP (contexto §41). Regra §14: materiais públicos
 * separados dos restritos; fotos, marcas e números só após aprovação.
 */
export default function ImprensaPage() {
  return (
    <>
      <PageHeader
        kicker="Imprensa"
        title="Imprensa e mídia kit"
        intro="Informações institucionais e materiais para veículos, organizadores de eventos e parceiros."
      />

      <Section kicker="Institucional" title="O ecossistema">
        <dl className="grid gap-6 sm:grid-cols-3">
          {Object.values(BRANDS).map((b) => (
            <div key={b.name} className="border-border bg-card rounded-xl border p-6">
              <dt className="text-foreground font-serif text-lg font-semibold">{b.name}</dt>
              <dd className="text-muted-foreground mt-2 text-sm text-pretty">{b.tagline}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section kicker="Materiais" title="Downloads" className="border-border/60 border-t">
        <BulletList
          items={[
            'Release de Cadu Aranha e do Doutor Igreja',
            'Apresentação do Estúdio Teia',
            'Biografias curta, média e longa',
            'Fotos aprovadas e logos',
            'Temas de entrevistas e palestras',
          ]}
        />
        <div className="mt-8">
          <Pending>
            versões públicas aprovadas dos materiais acima, com direitos de uso e crédito.
          </Pending>
        </div>
      </Section>

      <Section className="border-border/60 border-t">
        <WhatsappCta
          title="Contato de imprensa"
          text="Conte o veículo, a pauta, o prazo e o formato."
          message={WA.imprensa}
        />
      </Section>
    </>
  )
}
