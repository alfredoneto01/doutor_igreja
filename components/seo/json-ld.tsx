import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, WHATSAPP_NUMBER } from '@/lib/site'

/**
 * Dados estruturados de negócio local de serviço. Busca pela marca é pequena
 * (§2), então schema de serviço/área atendida ajuda mais que schema de marca.
 */
export function JsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#business`,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    telephone: `+${WHATSAPP_NUMBER}`,
    areaServed: 'BR',
    knowsAbout: [
      'Sonorização de igreja',
      'Transmissão ao vivo de culto',
      'Projeto de áudio',
      'Treinamento de equipe de som',
    ],
    founder: { '@type': 'Person', name: 'Cadu Aranha' },
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
