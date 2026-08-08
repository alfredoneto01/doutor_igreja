import { Section } from '@/components/layout/section'
import { getProof } from '@/lib/content'

/**
 * Prova social (§4). Comprador de igreja é comitê, e comitê compra confiança.
 */
export function ProvaSection() {
  const cases = getProof()
  if (cases.length === 0) return null

  return (
    <Section
      id="casos"
      kicker="Prova"
      title="Igrejas que passaram a ser entendidas"
      intro="Casos, antes e depois e depoimentos de quem já resolveu o som e a transmissão."
      className="border-border/60 border-t"
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {cases.map((c) => (
          <figure key={c.slug} className="border-border bg-card flex flex-col rounded-xl border p-6">
            {c.quote && (
              <blockquote className="text-foreground text-pretty">“{c.quote}”</blockquote>
            )}
            <figcaption className="mt-4">
              <p className="text-foreground font-medium">{c.church}</p>
              <p className="text-muted-foreground text-sm">
                {c.city}
                {c.quoteAuthor ? ` · ${c.quoteAuthor}` : ''}
              </p>
            </figcaption>
            <p className="text-muted-foreground mt-3 text-sm text-pretty">{c.summary}</p>
          </figure>
        ))}
      </div>
    </Section>
  )
}
