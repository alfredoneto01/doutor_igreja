import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHeader } from '@/components/layout/page-header'
import { Section } from '@/components/layout/section'
import { CheckupCards } from '@/components/checkup/checkup'
import { LinkCards } from '@/components/content/link-cards'
import { Pending } from '@/components/content/pending'
import { WhatsappCta } from '@/components/content/whatsapp-cta'
import { FaqAccordion } from '@/components/content/faq-accordion'
import { buttonVariants } from '@/components/ui/button'
import { BRANDS, DOUTOR_IGREJA_JOURNEY } from '@/lib/catalog'
import { getFaq, getProof, getSymptoms } from '@/lib/content'
import { WA } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Doutor Igreja — tecnologia, ambientes e equipes a serviço da missão',
  description:
    'Diagnóstico, projetos, implantação e formação de equipes para igrejas: som, transmissão, iluminação, acústica e infraestrutura.',
  alternates: { canonical: '/doutor-igreja' },
}

export default function DoutorIgrejaPage() {
  const symptoms = getSymptoms().slice(0, 6)
  const proof = getProof('doutorIgreja')

  return (
    <>
      <PageHeader
        kicker={BRANDS.doutorIgreja.name}
        title={BRANDS.doutorIgreja.tagline}
        intro="Para igrejas, ministérios técnicos, liderança, equipes, músicos e voluntários. Do diagnóstico à operação, sem reduzir a necessidade da igreja a uma lista de equipamentos."
      />

      <Section
        kicker="Problemas recorrentes"
        title="Reconhece algum destes na sua igreja?"
        intro="Som que a congregação não entende, transmissão que não acompanha o culto, equipe sobrecarregada, obra em andamento sem plano para o audiovisual."
      >
        {symptoms.length > 0 ? (
          <LinkCards
            items={symptoms.map((s) => ({ href: s.permalink, title: s.title, cta: 'Ler mais' }))}
          />
        ) : (
          <Pending>conteúdos sobre problemas recorrentes das igrejas.</Pending>
        )}
      </Section>

      <Section
        kicker="Jornada"
        title="Do diagnóstico à operação"
        intro="Cada etapa é contratada separadamente. A próxima só começa quando faz sentido para a igreja."
        className="border-border/60 border-t"
      >
        <ol className="grid gap-3 sm:grid-cols-5">
          {DOUTOR_IGREJA_JOURNEY.map((step, i) => (
            <li key={step} className="border-border bg-card rounded-lg border p-4">
              <span className="text-accent font-mono text-xs">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="text-foreground mt-1 font-medium text-pretty">{step}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        id="check-up"
        kicker="Check-Up"
        title="Quatro modalidades de diagnóstico"
        intro="Duas decisões definem a modalidade: a necessidade é Pontual ou Global? O atendimento pode ser Online ou precisa ser Presencial?"
        className="border-border/60 border-t"
      >
        <CheckupCards />
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/doutor-igreja/check-up" className={buttonVariants()}>
            Entender o Check-Up
          </Link>
          <Link
            href="/doutor-igreja/check-up/qual-escolher"
            className={buttonVariants({ variant: 'outline' })}
          >
            Qual escolher?
          </Link>
        </div>
      </Section>

      <Section
        kicker="Depois do diagnóstico"
        title="Projetos, workshops e podcast"
        className="border-border/60 border-t"
      >
        <LinkCards
          items={[
            {
              href: '/doutor-igreja/projetos',
              title: 'Projetos e implantação',
              text: 'Conceitual, Técnico e Executivo; implantação, comissionamento e operação assistida.',
            },
            {
              href: '/doutor-igreja/workshops',
              title: 'Workshops e treinamentos',
              text: 'Seis workshops autorais e capacitação personalizada para as equipes.',
            },
            {
              href: '/podcast',
              title: 'Podcast Doutor Igreja',
              text: 'Tecnologia, liderança, pessoas e propósito cristão na realidade das igrejas.',
            },
          ]}
        />
      </Section>

      <Section
        kicker="Prova social"
        title="Igrejas atendidas"
        className="border-border/60 border-t"
      >
        {proof.length === 0 ? (
          <Pending>casos e depoimentos de igrejas com autorização de uso.</Pending>
        ) : (
          <LinkCards
            items={proof.map((p) => ({
              href: `/portfolio#${p.slug}`,
              title: p.client,
              text: p.summary,
            }))}
          />
        )}
      </Section>

      <Section
        kicker="Perguntas frequentes"
        title="Sobre o Check-Up"
        className="border-border/60 border-t"
      >
        <FaqAccordion items={getFaq('checkup').slice(0, 4)} />
      </Section>

      <Section className="border-border/60 border-t">
        <WhatsappCta
          title="Qual é a principal dificuldade da sua igreja hoje?"
          message={WA.igreja}
        />
      </Section>
    </>
  )
}
