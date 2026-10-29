/**
 * Catálogo comercial — fonte única de produtos, preços e prazos do site.
 *
 * Origem: docs/contexto-ecossistema-cadu-aranha.md (§3, §4, §5, §10 "Fonte de
 * verdade comercial"). Preço nunca vai solto em MDX: as páginas leem daqui, e o
 * mesmo arquivo é exportado para o agente (`pnpm extract` → generated/catalog.json).
 *
 * Próximo passo (plano-implementacao.md, Fase 1): este arquivo passa a ser
 * gerado a partir da base Notion "Produtos e Preços — Doutor Igreja".
 */

// ─── Marcas do ecossistema ────────────────────────────────────────────────────

export const BRANDS = {
  institucional: {
    name: 'Cadu Aranha Produções Audiovisuais',
    short: 'Cadu Aranha Produções',
    href: '/',
    tagline:
      'Serviços audiovisuais, direção técnica, produção, projetos, estúdios e soluções personalizadas.',
  },
  doutorIgreja: {
    name: 'Doutor Igreja',
    short: 'Doutor Igreja',
    href: '/doutor-igreja',
    tagline: 'Tecnologia, ambientes e equipes a serviço da missão.',
  },
  estudioTeia: {
    name: 'Estúdio Teia',
    short: 'Estúdio Teia',
    href: '/estudio-teia',
    tagline:
      'Estúdio premium para podcasts, videocasts, videoaulas e transmissões — e operação de eventos externos.',
  },
} as const

export type BrandKey = keyof typeof BRANDS

// ─── Preços com vigência ──────────────────────────────────────────────────────

/** Um preço só vale entre `validFrom` e `validUntil`. Sem `validFrom` = não aprovado. */
export type PriceVersion = {
  amount: number // em reais
  plusLogistics?: boolean
  validFrom?: string // ISO yyyy-mm-dd
  validUntil?: string
  note?: string
}

/** Preço vigente na data (padrão: hoje). `undefined` se nenhum estiver vigente. */
export function currentPrice(
  versions: PriceVersion[],
  on: Date = new Date(),
): PriceVersion | undefined {
  const day = on.toISOString().slice(0, 10)
  return versions.find(
    (v) =>
      v.validFrom !== undefined && v.validFrom <= day && (!v.validUntil || day <= v.validUntil),
  )
}

const BRL = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  maximumFractionDigits: 0,
})

export function formatPrice(p: PriceVersion): string {
  return `${BRL.format(p.amount)}${p.plusLogistics ? ' + logística' : ''}`
}

// ─── Doutor Igreja — Check-Up (§3) ────────────────────────────────────────────

export type CheckupSlug =
  'pontual-online' | 'pontual-presencial' | 'global-online' | 'global-presencial'

export type Checkup = {
  slug: CheckupSlug
  name: string
  amplitude: 'Pontual' | 'Global'
  format: 'Online' | 'Presencial'
  scope: string
  duration: string
  participants: string
  reportDeadline: string
  whenToChoose: string
  prices: PriceVersion[]
}

export const CHECKUPS: Checkup[] = [
  {
    slug: 'pontual-online',
    name: 'Check-Up Pontual Online',
    amplitude: 'Pontual',
    format: 'Online',
    scope: 'Uma questão principal; encontro remoto.',
    duration: 'Até 1h30',
    participants: 'Até 3',
    reportDeadline: 'Até 5 dias úteis',
    whenToChoose:
      'Uma dor delimitada, compreensível com conversa, fotos, vídeos, documentos ou medidas.',
    prices: [
      { amount: 497, validFrom: '2026-01-01', validUntil: '2026-12-31' },
      // Reajuste previsto para 2027 — NÃO vigente até Cadu cadastrar a data (§3).
      { amount: 597, note: 'Reajuste previsto para 2027, pendente de aprovação.' },
    ],
  },
  {
    slug: 'pontual-presencial',
    name: 'Check-Up Pontual Presencial',
    amplitude: 'Pontual',
    format: 'Presencial',
    scope: 'Uma questão principal; observação no local; um ambiente.',
    duration: 'Até 2h',
    participants: 'Até 3',
    reportDeadline: 'Até 10 dias úteis',
    whenToChoose:
      'Uma dor delimitada que depende de observação física, arquitetura, instalação, obra ou ambiente específico.',
    prices: [
      { amount: 1297, plusLogistics: true, validFrom: '2026-01-01', validUntil: '2026-12-31' },
    ],
  },
  {
    slug: 'global-online',
    name: 'Check-Up Global Online',
    amplitude: 'Global',
    format: 'Online',
    scope: 'Análise integrada de áreas, processos ou equipes; encontro remoto.',
    duration: 'Até 3h',
    participants: 'Participação ampliada',
    reportDeadline: 'Até 7 dias úteis',
    whenToChoose: 'Diferentes áreas relacionadas podem ser compreendidas remotamente.',
    prices: [
      { amount: 997, validFrom: '2026-01-01', validUntil: '2026-12-31' },
      { amount: 1197, note: 'Reajuste previsto para 2027, pendente de aprovação.' },
    ],
  },
  {
    slug: 'global-presencial',
    name: 'Check-Up Global Presencial',
    amplitude: 'Global',
    format: 'Presencial',
    scope: 'Análise integrada no local; áreas, ambientes, sistemas ou equipes.',
    duration: 'Até 4h',
    participants: 'Participação ampliada',
    reportDeadline: 'Até 15 dias úteis',
    whenToChoose:
      'Múltiplos sistemas, ambientes, equipes ou infraestrutura exigem leitura presencial.',
    prices: [
      { amount: 1997, plusLogistics: true, validFrom: '2026-01-01', validUntil: '2026-12-31' },
    ],
  },
]

export function getCheckup(slug: string): Checkup | undefined {
  return CHECKUPS.find((c) => c.slug === slug)
}

export const CHECKUP_AREAS = [
  'áudio',
  'sonorização',
  'transmissão',
  'vídeo',
  'projeção',
  'iluminação',
  'acústica',
  'elétrica',
  'rede',
  'infraestrutura',
  'ambientes',
  'operação',
  'processos',
  'equipe',
  'liderança',
  'capacitação',
  'comunicação',
  'planejamento de investimentos',
]

/** Jornada comercial do Doutor Igreja (§3). Etapas posteriores não são automáticas. */
export const DOUTOR_IGREJA_JOURNEY = [
  'Check-Up',
  'Direcionamento',
  'Projeto, capacitação ou serviço',
  'Implantação',
  'Operação assistida',
]

export const PROJECT_STAGES = [
  {
    name: 'Projeto Conceitual',
    description: 'Define direção, estratégia, fases e ordem de grandeza.',
  },
  {
    name: 'Projeto Técnico',
    description:
      'Desenvolve soluções, sistemas, compatibilizações e especificações conforme escopo contratado.',
  },
  {
    name: 'Projeto Executivo',
    description: 'Entrega documentação prevista para orientar implantação.',
  },
  {
    name: 'Implantação',
    description:
      'Instalação, direção de instalação com mão de obra local, configuração e comissionamento.',
  },
  {
    name: 'Operação assistida',
    description: 'Acompanhamento prático e estabilização da operação.',
  },
  {
    name: 'Capacitação personalizada',
    description: 'Workshops, treinamentos e desenvolvimento das equipes.',
  },
]

export const WORKSHOPS = [
  { slug: 'o-grande-mixionario', name: 'O Grande Mixionário' },
  { slug: 'lidera-midia', name: 'Lidera Mídia' },
  { slug: 'focus-christus', name: 'Focus Christus — Do Enquadramento à Missão' },
  { slug: 'direcao-e-corte', name: 'Direção & Corte' },
  { slug: '1-2-teste-som', name: '1, 2, Teste, Som' },
  { slug: 'audio-pra-quem-toca', name: 'Áudio pra Quem Toca' },
]
// Referência interna de workshop (R$ 2.900 / 8h) NÃO vai ao site: não é cotação (§3).

// ─── Estúdio Teia (§4) ────────────────────────────────────────────────────────

/**
 * O §14 pede "valores quando aprovados" na página do estúdio. Enquanto o Cadu
 * não aprovar a publicação, os preços ficam no catálogo (para o agente) mas não
 * aparecem no site.
 */
export const SHOW_ESTUDIO_PRICES = false

export const ESTUDIO_SERVICES = [
  {
    name: 'Gravação em estúdio',
    unit: 'hora',
    prices: [{ amount: 350, validFrom: '2026-01-01' }] as PriceVersion[],
    note: 'Mínimo de 2 horas; sessão-base R$ 700.',
  },
  {
    name: 'Transmissão ao vivo',
    unit: 'hora',
    prices: [{ amount: 530, validFrom: '2026-01-01' }] as PriceVersion[],
    note: 'Mínimo de 2 horas; confirmar necessidades técnicas.',
  },
  {
    name: 'Edição completa',
    unit: 'episódio',
    prices: [{ amount: 500, validFrom: '2026-01-01' }] as PriceVersion[],
    note: 'Confirmar escopo e disponibilidade.',
  },
  {
    name: 'Teleprompter com operador',
    unit: 'hora',
    prices: [{ amount: 100, validFrom: '2026-01-01' }] as PriceVersion[],
    note: 'Serviço adicional.',
  },
]

export const ESTUDIO_POLICIES = [
  'Contratação mínima de 2 horas.',
  'Tolerância de 10 minutos.',
  'Reagendamento com 48 horas de antecedência.',
]

export const ESTUDIO_EXTERNAL_OPERATIONS = [
  'Eventos corporativos',
  'Sonorização de eventos',
  'Transmissão ao vivo externa',
  'Eventos híbridos',
  'Iluminação',
  'Painel de LED e projeção',
  'Produção multicâmera',
  'Videoaulas e cursos de clientes',
]

export const ESTUDIO_LOCATION = 'Bela Vista, região da Avenida Paulista, São Paulo'

// ─── Cadu Aranha Produções — soluções (§5, sitemap §13) ───────────────────────

export type Solution = { slug: string; name: string; summary: string }

export const SOLUTIONS: Solution[] = [
  {
    slug: 'producao-audiovisual',
    name: 'Produção audiovisual',
    summary: 'Captação, gravação e produção corporativa para empresas, marcas e instituições.',
  },
  {
    slug: 'transmissao-ao-vivo',
    name: 'Transmissão ao vivo',
    summary: 'Livestream de eventos, apresentações e conteúdos com operação técnica dedicada.',
  },
  {
    slug: 'eventos-e-corporativo',
    name: 'Eventos e corporativo',
    summary: 'Cobertura de eventos, sonorização e operações presenciais ou híbridas.',
  },
  {
    slug: 'projetos-de-estudio',
    name: 'Projetos de estúdio',
    summary: 'Planejamento, integração e implantação de estúdios.',
  },
  {
    slug: 'direcao-tecnica',
    name: 'Direção técnica',
    summary: 'Direção e coordenação técnica, incluindo a coordenação de fornecedores.',
  },
  {
    slug: 'podcasts-e-videocasts',
    name: 'Podcasts e videocasts',
    summary: 'Podcasts e videocasts corporativos, da estrutura à produção.',
  },
]

export function getSolution(slug: string): Solution | undefined {
  return SOLUTIONS.find((s) => s.slug === slug)
}
