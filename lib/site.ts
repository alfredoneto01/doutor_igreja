/**
 * Fonte única de verdade do site. Mudança de domínio ou número de WhatsApp
 * acontece só aqui (ou via env var) e propaga para metadataBase, canônicas,
 * OG, sitemap, robots e todos os CTAs de WhatsApp.
 */
const FALLBACK_SITE_URL = 'https://doutorigreja.com.br'

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? FALLBACK_SITE_URL).replace(/\/$/, '')

export const SITE_NAME = 'Doutor Igreja'

export const SITE_DESCRIPTION =
  'Sonorização, transmissão ao vivo e projeto de áudio para igrejas. ' +
  'Consultoria e execução com quem faz som de igreja de verdade — Cadu Aranha.'

/**
 * Número de WhatsApp dos CTAs (E.164, só dígitos). Na Fase 1 aponta para o
 * NÚMERO DE TESTE; migra para o real só na Fase 3 (§3). Mudar via env var.
 */
export const WHATSAPP_NUMBER = (
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '5511987837773'
).replace(/\D/g, '')

/**
 * Monta um link wa.me com mensagem pré-preenchida por seção (§4 — "CTAs com
 * contexto"). O bot já sabe de onde a pessoa veio e pula uma rodada.
 */
export function whatsappLink(prefilledMessage: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(prefilledMessage)}`
}
