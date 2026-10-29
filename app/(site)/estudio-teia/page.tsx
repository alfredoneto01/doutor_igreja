import type { Metadata } from 'next'
import { PageHeader } from '@/components/layout/page-header'
import { Section } from '@/components/layout/section'
import { BulletList } from '@/components/content/link-cards'
import { Pending } from '@/components/content/pending'
import { WhatsappButton, WhatsappCta } from '@/components/content/whatsapp-cta'
import {
  BRANDS,
  ESTUDIO_EXTERNAL_OPERATIONS,
  ESTUDIO_LOCATION,
  ESTUDIO_POLICIES,
  ESTUDIO_SERVICES,
  SHOW_ESTUDIO_PRICES,
  currentPrice,
  formatPrice,
} from '@/lib/catalog'
import { WA } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Estúdio Teia — podcasts, videocasts, transmissões e eventos',
  description:
    'Estúdio premium em São Paulo (Bela Vista, região da Av. Paulista) para podcasts, videocasts, videoaulas e transmissões, e operação de eventos externos.',
  alternates: { canonical: '/estudio-teia' },
}

const FORMATS = [
  'Podcasts e videocasts',
  'Videoaulas e cursos de clientes',
  'Gravações empresariais e conteúdo',
  'Transmissões ao vivo',
]

/**
 * Contexto §14 ("Estúdio Teia") + §35: o estúdio vai além do espaço físico.
 * Visita ao estúdio e agendamento de gravação são CTAs distintos (§36).
 */
export default function EstudioTeiaPage() {
  return (
    <>
      <PageHeader
        kicker={BRANDS.estudioTeia.name}
        title="Estúdio premium para gravar, transmitir e produzir"
        intro={`${BRANDS.estudioTeia.tagline} ${ESTUDIO_LOCATION}.`}
      />

      <Section kicker="No estúdio" title="Formatos de gravação e transmissão">
        <BulletList items={FORMATS} />
        <div className="mt-8 flex flex-wrap gap-3">
          <WhatsappButton message={WA.estudio}>Quero agendar uma gravação</WhatsappButton>
          <WhatsappButton message={WA.estudioVisita} variant="outline">
            Quero conhecer o estúdio
          </WhatsappButton>
        </div>
      </Section>

      <Section kicker="Estrutura" title="Infraestrutura" className="border-border/60 border-t">
        <p className="text-muted-foreground max-w-2xl text-pretty">
          Operação técnica, ambiente profissional e três câmeras Sony A7C 4K. Inclusões exatas,
          configuração, convidados, cenário, edição e transmissão são confirmados antes de fechar.
        </p>
        <div className="mt-6">
          <Pending>fotos do estúdio e endereço público autorizado.</Pending>
        </div>
      </Section>

      <Section kicker="Contratação" title="Condições" className="border-border/60 border-t">
        <BulletList items={ESTUDIO_POLICIES} />
        {SHOW_ESTUDIO_PRICES ? (
          <ul className="divide-border border-border mt-8 divide-y rounded-xl border">
            {ESTUDIO_SERVICES.map((s) => {
              const p = currentPrice(s.prices)
              return (
                <li key={s.name} className="flex flex-wrap justify-between gap-2 p-4">
                  <span className="text-foreground font-medium">{s.name}</span>
                  <span className="tabular-nums">
                    {p ? `${formatPrice(p)}/${s.unit}` : 'Consulte'}
                  </span>
                  <span className="text-muted-foreground w-full text-sm">{s.note}</span>
                </li>
              )
            })}
          </ul>
        ) : (
          <div className="mt-8">
            <Pending>aprovação para publicar os valores de referência do estúdio.</Pending>
          </div>
        )}
      </Section>

      <Section
        id="eventos"
        kicker="Além do estúdio"
        title="Operações externas de eventos"
        intro="Sonorização, transmissão, iluminação, LED e captação multicâmera para eventos presenciais, híbridos e corporativos."
        className="border-border/60 border-t"
      >
        <BulletList items={ESTUDIO_EXTERNAL_OPERATIONS} />
        <div className="mt-8">
          <WhatsappButton message={WA.estudioEvento}>Conversar sobre um evento</WhatsappButton>
        </div>
      </Section>

      <Section
        kicker="Portfólio"
        title="Produções realizadas"
        className="border-border/60 border-t"
      >
        <Pending>portfólio do Estúdio Teia com autorização de uso.</Pending>
      </Section>

      <Section className="border-border/60 border-t">
        <WhatsappCta
          title="Vocês pretendem gravar um podcast, fazer uma live ou produzir outro conteúdo?"
          text="Se já tiver uma data em mente, pode contar também."
          message={WA.estudio}
        />
      </Section>
    </>
  )
}
