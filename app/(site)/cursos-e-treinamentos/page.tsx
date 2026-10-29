import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHeader } from '@/components/layout/page-header'
import { Section } from '@/components/layout/section'
import { WhatsappCta } from '@/components/content/whatsapp-cta'
import { buttonVariants } from '@/components/ui/button'
import { WORKSHOPS } from '@/lib/catalog'

export const metadata: Metadata = {
  title: 'Cursos e treinamentos',
  description:
    'Workshops autorais e capacitação personalizada para equipes. Cursos online em desenvolvimento.',
  alternates: { canonical: '/cursos-e-treinamentos' },
}

/**
 * Cursos online, e-books e livros estão no roadmap e NÃO podem ser vendidos
 * como disponíveis (contexto §3, §14, §40). Aqui só se capta interesse.
 */
export default function CursosPage() {
  return (
    <>
      <PageHeader
        kicker="Formação"
        title="Cursos e treinamentos"
        intro="Workshops presenciais e capacitação personalizada para equipes de igrejas e organizações."
      />

      <Section kicker="Disponível" title="Workshops autorais">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {WORKSHOPS.map((w) => (
            <li key={w.slug} className="border-border bg-card rounded-lg border p-4 font-medium">
              {w.name}
            </li>
          ))}
        </ul>
        <Link
          href="/doutor-igreja/workshops"
          className={buttonVariants({ variant: 'outline', className: 'mt-6' })}
        >
          Ver workshops
        </Link>
      </Section>

      <Section
        kicker="Em desenvolvimento"
        title="Cursos online"
        intro="Os cursos online estão em desenvolvimento e ainda não estão à venda. Deixe seu interesse para ser avisado no lançamento."
        className="border-border/60 border-t"
      >
        <WhatsappCta
          title="Quero ser avisado"
          message="Olá! Tenho interesse nos cursos online quando forem lançados."
          label="Registrar interesse"
        />
      </Section>
    </>
  )
}
