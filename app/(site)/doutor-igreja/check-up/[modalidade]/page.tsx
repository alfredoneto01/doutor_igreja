import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { CheckupPrice } from '@/components/checkup/checkup'
import { Pending } from '@/components/content/pending'
import { WhatsappCta } from '@/components/content/whatsapp-cta'
import { CHECKUPS, getCheckup } from '@/lib/catalog'

interface PageProps {
  params: Promise<{ modalidade: string }>
}

export function generateStaticParams() {
  return CHECKUPS.map((c) => ({ modalidade: c.slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { modalidade } = await params
  const c = getCheckup(modalidade)
  if (!c) return {}
  return {
    title: c.name,
    description: `${c.scope} Encontro de ${c.duration.toLowerCase()}; relatório em ${c.reportDeadline.toLowerCase()}.`,
    alternates: { canonical: `/doutor-igreja/check-up/${c.slug}` },
  }
}

/**
 * Página individual de modalidade (contexto §14): público, sintomas, análise,
 * duração, participantes, entregáveis, prazo, investimento, limitações,
 * próximos passos e CTA.
 */
export default async function ModalidadePage({ params }: PageProps) {
  const { modalidade } = await params
  const c = getCheckup(modalidade)
  if (!c) notFound()

  const facts = [
    { label: 'Escopo', value: c.scope },
    { label: 'Duração', value: c.duration },
    { label: 'Participantes', value: c.participants },
    { label: 'Relatório', value: c.reportDeadline },
  ]

  return (
    <article className="mx-auto max-w-3xl px-4 py-16">
      <Link
        href="/doutor-igreja/check-up"
        className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 font-mono text-xs tracking-wide uppercase"
      >
        <ArrowLeft className="size-3.5" />
        Check-Up
      </Link>

      <p className="text-accent mt-8 font-mono text-xs tracking-[0.2em] uppercase">
        {c.amplitude} · {c.format}
      </p>
      <h1 className="text-foreground mt-3 text-4xl font-semibold tracking-tight text-balance">
        {c.name}
      </h1>
      <p className="text-muted-foreground mt-4 text-lg text-pretty">
        <strong className="text-foreground font-medium">Quando faz sentido:</strong>{' '}
        {c.whenToChoose}
      </p>

      <dl className="border-border mt-8 grid gap-5 rounded-xl border p-6 sm:grid-cols-2">
        {facts.map((f) => (
          <div key={f.label}>
            <dt className="text-muted-foreground font-mono text-[11px] tracking-widest uppercase">
              {f.label}
            </dt>
            <dd className="text-foreground mt-1">{f.value}</dd>
          </div>
        ))}
        <div className="sm:col-span-2">
          <dt className="text-muted-foreground font-mono text-[11px] tracking-widest uppercase">
            Investimento vigente
          </dt>
          <dd className="text-foreground mt-1 text-2xl font-semibold tabular-nums">
            <CheckupPrice checkup={c} />
          </dd>
          {c.format === 'Presencial' && (
            <dd className="text-muted-foreground mt-2 text-sm text-pretty">
              Honorários fixos. A logística (deslocamento e despesas) é calculada conforme cidade,
              endereço e data, e aparece separada na proposta.
            </dd>
          )}
        </div>
      </dl>

      <section className="mt-10 space-y-3">
        <h2 className="text-foreground text-2xl font-semibold">O que o Check-Up não inclui</h2>
        <p className="text-muted-foreground text-pretty">
          Projeto, orçamento detalhado, lista definitiva de equipamentos, planta, desenho executivo,
          instalação ou solução técnica completa. Quando o diagnóstico mostra que a igreja precisa
          de um projeto, essa etapa é proposta separadamente.
        </p>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-foreground text-2xl font-semibold">Gravação</h2>
        <p className="text-muted-foreground text-pretty">
          {c.format === 'Online'
            ? 'O encontro acontece pelo Google Meet; a gravação é enviada em até 1 dia útil.'
            : 'O atendimento presencial pode ter gravação de áudio para a elaboração do relatório.'}{' '}
          Arquivos mantidos conforme a política operacional, com exclusão prevista em 90 dias.
        </p>
      </section>

      <div className="mt-10">
        <Pending>
          público, sintomas típicos, o que será analisado, entregáveis do relatório e exemplos desta
          modalidade.
        </Pending>
      </div>

      <div className="mt-12">
        <WhatsappCta
          title={`O ${c.name} é o caminho para a sua igreja?`}
          message={`Olá! Quero entender se o ${c.name} é adequado para minha igreja.`}
        />
      </div>
    </article>
  )
}
