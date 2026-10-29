import {
  faq,
  symptom,
  proof,
  episode,
  type Faq,
  type Symptom,
  type Proof,
  type Episode,
} from '#site/content'

export type { Faq, Symptom, Proof, Episode }

export type FaqTopic = Faq['topic']

export const AREA_LABEL: Record<Symptom['area'], string> = {
  sonorizacao: 'Sonorização',
  transmissao: 'Transmissão ao vivo',
  projeto: 'Projeto e implantação',
  treinamento: 'Equipes e capacitação',
  geral: 'Geral',
}

// `order` crescente primeiro; sem valor vai ao fim.
const byOrder = <T extends { order?: number }>(a: T, b: T) =>
  (a.order ?? Number.POSITIVE_INFINITY) - (b.order ?? Number.POSITIVE_INFINITY)

export function getFaq(topic?: FaqTopic): Faq[] {
  return faq.filter((f) => !topic || f.topic === topic).sort(byOrder)
}

/** FAQ que entra no prompt do agente. Filtrado por `botIncluded`. */
export function getBotFaq(): Faq[] {
  return getFaq().filter((f) => f.botIncluded)
}

export function getSymptoms(): Symptom[] {
  return [...symptom].sort(byOrder)
}

export function getSymptomBySlug(slug: string): Symptom | undefined {
  return symptom.find((s) => s.slug === slug)
}

/** Só casos com autorização de uso aparecem no site (§14). */
export function getProof(brand?: Proof['brand']): Proof[] {
  return proof.filter((p) => p.authorized && (!brand || p.brand === brand)).sort(byOrder)
}

export function getEpisodes(): Episode[] {
  return [...episode].sort((a, b) => b.number - a.number)
}
