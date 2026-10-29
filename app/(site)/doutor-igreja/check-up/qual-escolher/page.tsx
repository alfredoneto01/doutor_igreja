import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHeader } from '@/components/layout/page-header'
import { Section } from '@/components/layout/section'
import { CheckupPrice } from '@/components/checkup/checkup'
import { WhatsappCta } from '@/components/content/whatsapp-cta'
import { CHECKUPS } from '@/lib/catalog'
import { WA } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Qual Check-Up sua igreja precisa?',
  description:
    'Pontual ou Global, Online ou Presencial: como escolher a modalidade de Check-Up do Doutor Igreja.',
  alternates: { canonical: '/doutor-igreja/check-up/qual-escolher' },
}

/** Matriz 2×2 das duas decisões (contexto §3, "Quando recomendar cada modalidade"). */
export default function QualEscolherPage() {
  return (
    <>
      <PageHeader
        kicker="Check-Up · Como escolher"
        title="Qual Check-Up sua igreja precisa?"
        intro="Duas perguntas definem a modalidade. Se ainda ficar dúvida, a conversa no WhatsApp resolve em poucas perguntas."
      />

      <Section>
        <div className="grid gap-4 sm:grid-cols-2">
          {CHECKUPS.map((c) => (
            <Link
              key={c.slug}
              href={`/doutor-igreja/check-up/${c.slug}`}
              className="border-border bg-card hover:border-accent/60 rounded-xl border p-6 transition-colors"
            >
              <p className="text-accent font-mono text-[11px] tracking-widest uppercase">
                {c.amplitude === 'Pontual' ? 'Uma questão principal' : 'Várias áreas integradas'} ·{' '}
                {c.format === 'Online' ? 'materiais bastam' : 'precisa observar no local'}
              </p>
              <p className="text-foreground mt-2 font-serif text-xl font-semibold">{c.name}</p>
              <p className="text-muted-foreground mt-2 text-sm text-pretty">{c.whenToChoose}</p>
              <p className="text-foreground mt-4 font-medium tabular-nums">
                <CheckupPrice checkup={c} />
              </p>
            </Link>
          ))}
        </div>
      </Section>

      <Section className="border-border/60 border-t">
        <WhatsappCta
          title="Ainda em dúvida?"
          text="Conte o que está acontecendo. Com algumas perguntas objetivas dá para indicar a modalidade."
          message={WA.checkup}
        />
      </Section>
    </>
  )
}
