import { BRANDS } from '@/lib/catalog'
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, WHATSAPP_NUMBER } from '@/lib/site'

/**
 * Dados estruturados da organização institucional, com Doutor Igreja e Estúdio
 * Teia como marcas do ecossistema (contexto §2).
 */
export function JsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    telephone: `+${WHATSAPP_NUMBER}`,
    areaServed: 'BR',
    founder: { '@type': 'Person', name: 'Cadu Aranha' },
    brand: [BRANDS.doutorIgreja, BRANDS.estudioTeia].map((b) => ({
      '@type': 'Brand',
      name: b.name,
      description: b.tagline,
      url: `${SITE_URL}${b.href}`,
    })),
  }
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  )
}
