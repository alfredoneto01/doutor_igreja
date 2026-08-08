import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { MDXContent } from '@/components/content/mdx-content'
import { buttonVariants } from '@/components/ui/button'
import { getServices, getServiceBySlug, AREA_LABEL, type Area } from '@/lib/content'
import { whatsappLink } from '@/lib/site'

interface PageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getServices().map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const s = getServiceBySlug(slug)
  if (!s) return {}
  return {
    title: s.title,
    description: s.summary,
    alternates: { canonical: s.permalink },
    openGraph: { title: s.title, description: s.summary, url: s.permalink },
  }
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params
  const s = getServiceBySlug(slug)
  if (!s) notFound()

  return (
    <article className="mx-auto max-w-3xl px-4 py-16">
      <Link
        href="/servicos"
        className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 font-mono text-xs tracking-wide uppercase"
      >
        <ArrowLeft className="size-3.5" />
        Serviços
      </Link>

      <p className="text-accent mt-8 font-mono text-xs tracking-[0.2em] uppercase">
        {AREA_LABEL[s.area as Area]}
      </p>
      <h1 className="text-foreground mt-3 text-4xl font-semibold tracking-tight text-balance">
        {s.title}
      </h1>
      <p className="text-muted-foreground mt-4 text-lg text-pretty">{s.summary}</p>

      <dl className="border-border mt-8 grid gap-4 rounded-xl border p-6 sm:grid-cols-2">
        <div>
          <dt className="text-muted-foreground font-mono text-[11px] tracking-widest uppercase">
            Para quem
          </dt>
          <dd className="text-foreground mt-1">{s.audience}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground font-mono text-[11px] tracking-widest uppercase">
            O que você recebe
          </dt>
          <dd className="text-foreground mt-1">{s.deliverable}</dd>
        </div>
        {s.priceRange && (
          <div className="sm:col-span-2">
            <dt className="text-muted-foreground font-mono text-[11px] tracking-widest uppercase">
              Faixa de investimento
            </dt>
            <dd className="text-foreground mt-1">{s.priceRange}</dd>
          </div>
        )}
      </dl>

      <div className="prose prose-lg mt-10 max-w-none">
        <MDXContent code={s.body} />
      </div>

      <div className="border-border mt-12 rounded-xl border p-8 text-center">
        <p className="text-foreground font-serif text-xl font-semibold">
          Faz sentido para a sua igreja?
        </p>
        <a
          className={buttonVariants({ size: 'lg', className: 'mt-5' })}
          href={whatsappLink(
            `Olá! Vim pela página de ${s.title.toLowerCase()} e quero falar sobre a minha igreja.`,
          )}
          target="_blank"
          rel="noopener noreferrer"
        >
          Falar no WhatsApp
        </a>
        <p className="text-muted-foreground/80 mt-4 font-mono text-xs">
          Resposta normalmente até a manhã seguinte.
        </p>
      </div>
    </article>
  )
}
