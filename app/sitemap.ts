import type { MetadataRoute } from 'next'
import { ALLOW_INDEXING, SITE_URL } from '@/lib/site'
import { CHECKUPS, SOLUTIONS } from '@/lib/catalog'
import { getSymptoms } from '@/lib/content'

/** Rotas do MVP do site (contexto §41); a arquitetura-alvo completa está no §13. */
const STATIC_PATHS = [
  '',
  '/sobre-cadu',
  '/solucoes',
  '/doutor-igreja',
  '/doutor-igreja/check-up',
  '/doutor-igreja/check-up/qual-escolher',
  '/doutor-igreja/projetos',
  '/doutor-igreja/workshops',
  '/doutor-igreja/conteudos',
  '/estudio-teia',
  '/podcast',
  '/cursos-e-treinamentos',
  '/imprensa',
  '/contato',
  '/politica-de-privacidade',
]

export default function sitemap(): MetadataRoute.Sitemap {
  if (!ALLOW_INDEXING) return []

  const now = new Date()
  const entry = (path: string, priority: number): MetadataRoute.Sitemap[number] => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority,
  })

  return [
    ...STATIC_PATHS.map((p) => entry(p, p === '' ? 1 : 0.8)),
    ...CHECKUPS.map((c) => entry(`/doutor-igreja/check-up/${c.slug}`, 0.9)),
    ...SOLUTIONS.map((s) => entry(`/solucoes/${s.slug}`, 0.7)),
    ...getSymptoms().map((s) => entry(s.permalink, 0.7)),
  ]
}
