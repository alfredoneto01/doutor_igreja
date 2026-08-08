import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'
import { getServices, getSymptoms } from '@/lib/content'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ['', '/servicos', '/diagnostico', '/faq', '/curso', '/privacidade']

  const now = new Date()
  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((p) => ({
    url: `${SITE_URL}${p}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: p === '' ? 1 : 0.8,
  }))

  const serviceEntries: MetadataRoute.Sitemap = getServices().map((s) => ({
    url: `${SITE_URL}${s.permalink}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  // Sintomas = espinha dorsal do SEO (§2): prioridade alta.
  const symptomEntries: MetadataRoute.Sitemap = getSymptoms().map((s) => ({
    url: `${SITE_URL}${s.permalink}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.9,
  }))

  return [...staticEntries, ...serviceEntries, ...symptomEntries]
}
