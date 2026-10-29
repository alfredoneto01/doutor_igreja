/**
 * Fonte única de verdade do site. Mudança de domínio ou número de WhatsApp
 * acontece só aqui (ou via env var) e propaga para metadataBase, canônicas,
 * OG, sitemap, robots e todos os CTAs de WhatsApp.
 *
 * Domínio definitivo ainda não decidido (contexto §13/§39). Padrão provisório
 * (§40): portal institucional único, em homologação.
 */
const FALLBACK_SITE_URL = 'https://caduaranha.com.br'

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? FALLBACK_SITE_URL).replace(/\/$/, '')

export const SITE_NAME = 'Cadu Aranha Produções Audiovisuais'
export const SITE_SHORT_NAME = 'Cadu Aranha Produções'

export const SITE_DESCRIPTION =
  'Produção audiovisual, direção técnica, transmissões, estúdio e soluções para igrejas. ' +
  'Ecossistema Cadu Aranha: Cadu Aranha Produções, Doutor Igreja e Estúdio Teia.'

/**
 * Número de WhatsApp dos CTAs (E.164, só dígitos). Número confirmado (§15):
 * +55 11 98783-7773. Em homologação, apontar NEXT_PUBLIC_WHATSAPP_NUMBER para o
 * número de teste — não migrar o número atual sem aprovação expressa (§40).
 */
export const WHATSAPP_NUMBER = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '5511987837773').replace(
  /\D/g,
  '',
)

/**
 * Monta um link wa.me com mensagem pré-preenchida por contexto (§15 — "CTA
 * WhatsApp"). A mensagem identifica a origem para o Webinho sem expor nada
 * interno.
 */
export function whatsappLink(prefilledMessage: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(prefilledMessage)}`
}

/** Mensagens iniciais por contexto (§15). */
export const WA = {
  checkup: 'Olá! Quero entender qual Check-Up é mais adequado para minha igreja.',
  igreja: 'Olá! Quero melhorar o audiovisual da minha igreja.',
  estudio: 'Olá! Quero informações para gravar no Estúdio Teia.',
  estudioVisita: 'Olá! Gostaria de conhecer o Estúdio Teia.',
  estudioEvento: 'Olá! Quero conversar sobre um evento com o Estúdio Teia.',
  corporativo: 'Olá! Preciso conversar sobre uma produção audiovisual.',
  workshop: 'Olá! Quero saber mais sobre os workshops do Doutor Igreja.',
  imprensa: 'Olá! Sou da imprensa e gostaria de falar sobre uma pauta.',
  palestra: 'Olá! Gostaria de convidar o Cadu para uma palestra.',
  parceria: 'Olá! Gostaria de conversar sobre uma parceria.',
  geral: 'Olá! Vim pelo site.',
} as const

/** Nota de transparência do atendimento (§22): o Webinho se identifica como assistente virtual. */
export const WEBINHO_NOTE =
  'O primeiro atendimento é feito pelo Webinho, assistente virtual da Cadu Aranha Produções. ' +
  'Quando precisar, ele passa a conversa para o Cadu com o contexto já registrado.'

/**
 * Canais sociais confirmados (§3). URLs a cadastrar — itens sem `href` não são
 * renderizados.
 */
export const SOCIAL: { label: string; href?: string }[] = [
  { label: 'Instagram Doutor Igreja' },
  { label: 'YouTube Doutor Igreja' },
  { label: 'TikTok Doutor Igreja' },
  { label: 'Instagram Cadu Aranha' },
]

/**
 * Indexação por buscadores. Em homologação (padrão) o site NÃO é indexado —
 * evita que preços e páginas provisórias apareçam no Google antes do launch.
 * Ligar só em produção: NEXT_PUBLIC_ALLOW_INDEXING=true.
 */
export const ALLOW_INDEXING = process.env.NEXT_PUBLIC_ALLOW_INDEXING === 'true'
