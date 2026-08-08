import { ArrowUpRight } from 'lucide-react'
import { Section } from '@/components/layout/section'
import { getEpisodes } from '@/lib/content'

/**
 * Conteúdo — o podcast "Doutor Igreja" é o motor de autoridade e a principal
 * fonte de lead (§4). Últimos episódios em destaque.
 */
export function ConteudoSection() {
  const episodes = getEpisodes().slice(0, 4)
  if (episodes.length === 0) return null

  return (
    <Section
      id="conteudo"
      kicker="Conteúdo · Podcast Doutor Igreja"
      title="Áudio de igreja explicado, episódio a episódio"
      intro="O canal onde a dúvida técnica é respondida a fundo. Comece por aqui e chegue à consultoria já sabendo o que perguntar."
      className="border-border/60 border-t"
    >
      <ul className="grid gap-3 sm:grid-cols-2">
        {episodes.map((ep) => {
          const href = ep.youtubeId
            ? `https://www.youtube.com/watch?v=${ep.youtubeId}`
            : undefined
          const Inner = (
            <>
              <span className="text-muted-foreground font-mono text-xs tracking-widest uppercase">
                Ep. {String(ep.number).padStart(2, '0')}
              </span>
              <span className="text-foreground mt-1 flex items-start justify-between gap-2 font-medium text-pretty">
                {ep.title}
                {href && <ArrowUpRight className="text-accent size-4 shrink-0" />}
              </span>
              {ep.summary && (
                <span className="text-muted-foreground mt-2 block text-sm text-pretty">
                  {ep.summary}
                </span>
              )}
            </>
          )
          return (
            <li key={ep.slug}>
              {href ? (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group border-border bg-card hover:border-accent/60 flex h-full flex-col rounded-lg border p-5 transition-colors"
                >
                  {Inner}
                </a>
              ) : (
                <div className="border-border bg-card flex h-full flex-col rounded-lg border p-5">
                  {Inner}
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
