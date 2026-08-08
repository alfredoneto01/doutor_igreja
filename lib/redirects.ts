/**
 * Mapa de 301 do rebrand (§2). Ao adotar "Doutor Igreja" como marca única, as
 * URLs de caduaranha.com.br precisam redirecionar rota-a-rota para o novo
 * domínio — senão o histórico e os backlinks do site atual são perdidos.
 *
 * ⚠️ Depende da Fase 0.6: levantar as URLs atuais de caduaranha.com.br ANTES de
 * derrubar qualquer coisa. Preencher este array com o mapa real. Cada `source`
 * é o caminho antigo; `destination`, a rota nova equivalente.
 *
 * Pré-requisito operacional: apontar caduaranha.com.br para este app (ou um
 * proxy) para que estes redirects sejam aplicados.
 */
export type RedirectRule = { source: string; destination: string; permanent: true }

export const legacyRedirects: RedirectRule[] = [
  // Exemplos (substituir pelo mapa real da Fase 0.6):
  // { source: '/servicos-de-som', destination: '/servicos', permanent: true },
  // { source: '/contato', destination: '/#contato', permanent: true },
  // { source: '/blog/:slug', destination: '/faq', permanent: true },
]
