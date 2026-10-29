import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHeader } from '@/components/layout/page-header'
import { Section } from '@/components/layout/section'
import { CheckupTable } from '@/components/checkup/checkup'
import { BulletList } from '@/components/content/link-cards'
import { FaqAccordion } from '@/components/content/faq-accordion'
import { WhatsappCta } from '@/components/content/whatsapp-cta'
import { buttonVariants } from '@/components/ui/button'
import { CHECKUP_AREAS } from '@/lib/catalog'
import { getFaq } from '@/lib/content'
import { WA } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Check-Up Doutor Igreja — diagnóstico para igrejas',
  description:
    'Diagnóstico estruturado do audiovisual e da operação da igreja em quatro modalidades: Pontual ou Global, Online ou Presencial. Preços, prazos e como funciona.',
  alternates: { canonical: '/doutor-igreja/check-up' },
}

const IS_NOT = [
  'Projeto',
  'Orçamento detalhado',
  'Lista definitiva de equipamentos',
  'Planta ou desenho executivo',
  'Instalação',
  'Solução técnica completa',
]

const STEPS = [
  'Conversa pelo WhatsApp para entender a situação.',
  'Definição da modalidade; no presencial, cálculo e aprovação da logística.',
  'Pagamento confirmado e data agendada.',
  'Envio do formulário oficial de preparação.',
  'Encontro (online pelo Google Meet ou presencial).',
  'Relatório no prazo da modalidade e devolutiva com o próximo passo.',
]

/** Página central do Check-Up (contexto §14). Preços vêm de lib/catalog.ts. */
export default function CheckupPage() {
  return (
    <>
      <PageHeader
        kicker="Doutor Igreja · Check-Up"
        title="Entender o que a igreja realmente precisa antes de investir"
        intro="O Check-Up é um diagnóstico estruturado: compreende a realidade, identifica prioridades e oferece direcionamento inicial."
      />

      <Section kicker="O que é e o que não é" title="Diagnóstico e direcionamento">
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <p className="text-foreground font-medium">O Check-Up avalia</p>
            <p className="text-muted-foreground mt-2 text-pretty">
              Conforme a necessidade: {CHECKUP_AREAS.join(', ')}.
            </p>
          </div>
          <div>
            <p className="text-foreground font-medium">O Check-Up não é</p>
            <BulletList items={IS_NOT} className="mt-3 sm:grid-cols-1" />
          </div>
        </div>
      </Section>

      <Section
        kicker="Duas decisões"
        title="Pontual ou Global? Online ou Presencial?"
        intro="Pontual trata de uma questão principal; Global faz uma leitura integrada de várias áreas. Online quando conversa e materiais bastam; Presencial quando é preciso observar o ambiente."
        className="border-border/60 border-t"
      >
        <CheckupTable />
        <p className="text-muted-foreground mt-4 font-mono text-xs">
          Valores vigentes em 2026. Presencial: honorários fixos + logística calculada conforme
          cidade, data e deslocamento.
        </p>
        <Link
          href="/doutor-igreja/check-up/qual-escolher"
          className={buttonVariants({ variant: 'outline', className: 'mt-6' })}
        >
          Ajuda para escolher
        </Link>
      </Section>

      <Section
        kicker="Como funciona"
        title="Da conversa ao relatório"
        className="border-border/60 border-t"
      >
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((step, i) => (
            <li key={step} className="border-border bg-card rounded-lg border p-4">
              <span className="text-accent font-mono text-xs">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="text-foreground mt-1 text-pretty">{step}</p>
            </li>
          ))}
        </ol>
        <p className="text-muted-foreground mt-6 max-w-2xl text-pretty">
          O formulário de preparação vem depois do fechamento e do agendamento — ele ajuda a
          compreender a realidade de vocês antes do encontro e a aproveitar melhor o tempo.
        </p>
      </Section>

      <Section
        id="faq"
        kicker="Perguntas frequentes"
        title="Dúvidas sobre o Check-Up"
        className="border-border/60 border-t"
      >
        <FaqAccordion items={getFaq('checkup')} />
      </Section>

      <Section className="border-border/60 border-t">
        <WhatsappCta
          title="Qual Check-Up faz sentido para a sua igreja?"
          text="Conte a principal dificuldade de vocês. A indicação da modalidade vem da conversa."
          message={WA.checkup}
        />
      </Section>
    </>
  )
}
