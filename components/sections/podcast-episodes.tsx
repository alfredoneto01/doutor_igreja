import { ArrowUpRight } from 'lucide-react'
import { Pending } from '@/components/content/pending'
import { getEpisodes } from '@/lib/content'

/** Episódios do Podcast Doutor Igreja (destaque primeiro). Usado em /podcast e na home. */
export function PodcastEpisodes({ limit = 4 }: { limit?: number }) {
  const episodes = getEpisodes()
    .sort((a, b) => Number(b.featured) - Number(a.featured))
    .slice(0, limit)

  // Placeholders de episódio (sem youtubeId) não vão para a página pública.
  const real = episodes.filter((ep) => ep.youtubeId)
  if (real.length === 0) {
    return <Pending>episódios reais do canal (título, número e ID do YouTube).</Pending>
  }

  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {real.map((ep) => (
        <li key={ep.slug}>
          <a
            href={`https://www.youtube.com/watch?v=${ep.youtubeId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group border-border bg-card hover:border-accent/60 flex h-full flex-col rounded-lg border p-5 transition-colors"
          >
            <span className="text-muted-foreground font-mono text-xs tracking-widest uppercase">
              Ep. {String(ep.number).padStart(2, '0')}
            </span>
            <span className="text-foreground mt-1 flex items-start justify-between gap-2 font-medium text-pretty">
              {ep.title}
              <ArrowUpRight className="text-accent size-4 shrink-0" />
            </span>
            {ep.summary && (
              <span className="text-muted-foreground mt-2 block text-sm text-pretty">
                {ep.summary}
              </span>
            )}
          </a>
        </li>
      ))}
    </ul>
  )
}
