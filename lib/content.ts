import {
  faq,
  service,
  symptom,
  proof,
  episode,
  type Faq,
  type Service,
  type Symptom,
  type Proof,
  type Episode,
} from '#site/content'

export type { Faq, Service, Symptom, Proof, Episode }

export const AREAS = ['sonorizacao', 'transmissao', 'projeto', 'treinamento', 'geral'] as const
export type Area = (typeof AREAS)[number]

export const AREA_LABEL: Record<Area, string> = {
  sonorizacao: 'Sonorização',
  transmissao: 'Transmissão ao vivo',
  projeto: 'Projeto e instalação',
  treinamento: 'Treinamento de equipe',
  geral: 'Geral',
}

// `order` crescente primeiro (mais fundamental/importante); sem valor vai ao fim.
const byOrder = <T extends { order?: number }>(a: T, b: T) =>
  (a.order ?? Number.POSITIVE_INFINITY) - (b.order ?? Number.POSITIVE_INFINITY)

export function getFaq(): Faq[] {
  return [...faq].sort(byOrder)
}

/** FAQ que entra no prompt do bot (§4). Filtrado por `botIncluded`. */
export function getBotFaq(): Faq[] {
  return getFaq().filter((f) => f.botIncluded)
}

export function getServices(): Service[] {
  return [...service].sort(byOrder)
}

export function getServiceBySlug(slug: string): Service | undefined {
  return service.find((s) => s.slug === slug)
}

export function getSymptoms(): Symptom[] {
  return [...symptom].sort(byOrder)
}

export function getSymptomBySlug(slug: string): Symptom | undefined {
  return symptom.find((s) => s.slug === slug)
}

export function getProof(): Proof[] {
  return [...proof].sort(byOrder)
}

export function getEpisodes(): Episode[] {
  return [...episode].sort((a, b) => b.number - a.number)
}
