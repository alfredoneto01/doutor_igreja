import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Pending } from '@/components/content/pending'
import { WhatsappCta } from '@/components/content/whatsapp-cta'
import { SOLUTIONS, getSolution } from '@/lib/catalog'

interface PageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return SOLUTIONS.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const s = getSolution(slug)
  if (!s) return {}
  return {
    title: s.name,
    description: s.summary,
    alternates: { canonical: `/solucoes/${s.slug}` },
  }
}

/**
 * Página de solução corporativa. O contexto §14 pede: problema atendido,
 * possibilidades de entrega, processo, portfólio autorizado e CTA para briefing.
 */
export default async function SolucaoPage({ params }: PageProps) {
  const { slug } = await params
  const s = getSolution(slug)
  if (!s) notFound()

  return (
    <article className="mx-auto max-w-3xl px-4 py-16">
      <Link
        href="/solucoes"
        className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 font-mono text-xs tracking-wide uppercase"
      >
        <ArrowLeft className="size-3.5" />
        Soluções
      </Link>
      <h1 className="text-foreground mt-8 text-4xl font-semibold tracking-tight text-balance">
        {s.name}
      </h1>
      <p className="text-muted-foreground mt-4 text-lg text-pretty">{s.summary}</p>

      <div className="mt-10">
        <Pending>
          problema atendido, possibilidades de entrega, processo de trabalho e portfólio autorizado
          desta solução.
        </Pending>
      </div>

      <p className="text-muted-foreground mt-10 text-pretty">
        Cada projeto depende de escopo. Para direcionar, ajudam: tipo de entrega, objetivo, data,
        local, duração, número de ambientes e canais de distribuição.
      </p>

      <div className="mt-10">
        <WhatsappCta
          title="Vamos entender o seu projeto"
          message={`Olá! Preciso conversar sobre ${s.name.toLowerCase()}.`}
          label="Enviar briefing"
        />
      </div>
    </article>
  )
}
