/**
 * Redirects 301.
 *
 * 1. `internalRedirects` — rotas da Fase 1 (marca única) que mudaram de lugar
 *    com a reestruturação para o ecossistema.
 * 2. `legacyRedirects` — caminhos do site antigo de caduaranha.com.br. O domínio
 *    institucional provavelmente continua; o que muda são os caminhos. Preencher
 *    com o levantamento das URLs atuais antes de substituir o site.
 */
export type RedirectRule = { source: string; destination: string; permanent: true }

export const internalRedirects: RedirectRule[] = [
  { source: '/servicos', destination: '/doutor-igreja', permanent: true },
  { source: '/servicos/:slug', destination: '/doutor-igreja/projetos', permanent: true },
  { source: '/diagnostico', destination: '/doutor-igreja/conteudos', permanent: true },
  { source: '/diagnostico/:slug', destination: '/doutor-igreja/conteudos/:slug', permanent: true },
  { source: '/faq', destination: '/doutor-igreja/check-up#faq', permanent: true },
  { source: '/curso', destination: '/cursos-e-treinamentos', permanent: true },
  { source: '/privacidade', destination: '/politica-de-privacidade', permanent: true },
]

export const legacyRedirects: RedirectRule[] = [
  // Preencher com o mapa real de caduaranha.com.br, ex.:
  // { source: '/artigos/:slug', destination: '/doutor-igreja/conteudos/:slug', permanent: true },
]
