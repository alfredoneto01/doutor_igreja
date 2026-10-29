import type { Metadata } from 'next'
import { PageHeader } from '@/components/layout/page-header'
import { Section } from '@/components/layout/section'
import { Pending } from '@/components/content/pending'
import { WhatsappCta } from '@/components/content/whatsapp-cta'
import { PodcastEpisodes } from '@/components/sections/podcast-episodes'
import { SOCIAL, WA } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Podcast Doutor Igreja',
  description:
    'Tecnologia, liderança, pessoas, propósito cristão e a realidade das igrejas. Ao vivo, com participação do público.',
  alternates: { canonical: '/podcast' },
}

/**
 * Contexto §3 e §14 ("Podcast"). Periodicidade só aparece quando confirmada —
 * por isso não é publicada aqui.
 */
export default function PodcastPage() {
  const social = SOCIAL.filter((s) => s.href)
  return (
    <>
      <PageHeader
        kicker="Podcast Doutor Igreja"
        title="Tecnologia, liderança e a realidade das igrejas"
        intro="Conteúdo que aproxima tecnologia, liderança, pessoas e propósito cristão. Ao vivo, com cerca de duas horas, participação do público e o quadro “O que tem na sua mochila?”."
      />

      <Section kicker="Episódios" title="Em destaque">
        <PodcastEpisodes limit={6} />
      </Section>

      <Section kicker="Onde acompanhar" title="Canais" className="border-border/60 border-t">
        {social.length > 0 ? (
          <ul className="flex flex-wrap gap-3">
            {social.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <Pending>
            URLs do Instagram, YouTube e TikTok do Doutor Igreja e do Instagram do Cadu.
          </Pending>
        )}
      </Section>

      <Section
        kicker="Patrocínio e parcerias"
        title="Para marcas e parceiros"
        className="border-border/60 border-t"
      >
        <Pending>
          formatos de parceria e indicadores de audiência aprovados, com data de referência.
        </Pending>
        <div className="mt-8">
          <WhatsappCta title="Quer falar sobre patrocínio ou participação?" message={WA.parceria} />
        </div>
      </Section>
    </>
  )
}
