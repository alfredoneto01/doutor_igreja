import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHeader } from '@/components/layout/page-header'
import { Section } from '@/components/layout/section'
import { BulletList } from '@/components/content/link-cards'
import { Pending } from '@/components/content/pending'
import { WhatsappCta } from '@/components/content/whatsapp-cta'
import { WA } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Sobre Cadu',
  description:
    'Cadu Aranha: mais de 15 anos em produção audiovisual, direção técnica, fotografia e formação. Fundador da Cadu Aranha Produções e idealizador do Doutor Igreja.',
  alternates: { canonical: '/sobre-cadu' },
}

// Fontes: contexto §14 ("Sobre Cadu") e perfil da spec Rev. 2 §1.
const HIGHLIGHTS = [
  'Mais de 15 anos de experiência em produção audiovisual, direção técnica, fotografia e formação.',
  'Fundador da Cadu Aranha Produções e idealizador do Doutor Igreja.',
  'Diretor técnico e técnico de áudio, com passagem pelo SESC/SP e experiência em grandes shows e eventos.',
  'Responsável por equipes de som e transmissão ao vivo em igrejas de São Paulo.',
  'Pós-graduado em Fotografia e Audiovisual e formado em Produção Musical.',
  'Ministra cursos, treinamentos e palestras pelo Brasil.',
]

export default function SobreCaduPage() {
  return (
    <>
      <PageHeader
        kicker="Sobre"
        title="Cadu Aranha"
        intro="Produção audiovisual, direção técnica e formação de equipes — em empresas, eventos e igrejas."
      />

      <Section kicker="Trajetória" title="Biografia profissional">
        <BulletList items={HIGHLIGHTS} className="sm:grid-cols-1" />
        <div className="mt-8">
          <Pending>
            biografia completa aprovada, fotos oficiais, lista de palestras e projetos (versões
            curta/média/longa da central de imprensa).
          </Pending>
        </div>
      </Section>

      <Section
        kicker="Imprensa"
        title="Materiais e entrevistas"
        className="border-border/60 border-t"
      >
        <p className="text-muted-foreground max-w-2xl">
          Release, biografias e fotos aprovadas ficam na{' '}
          <Link href="/imprensa" className="text-accent hover:underline">
            central de imprensa
          </Link>
          .
        </p>
      </Section>

      <Section className="border-border/60 border-t">
        <WhatsappCta
          title="Convite para palestra ou projeto?"
          message={WA.palestra}
          label="Falar sobre um convite"
        />
      </Section>
    </>
  )
}
