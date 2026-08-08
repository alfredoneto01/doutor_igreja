import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { MDXContent } from '@/components/content/mdx-content'
import { buttonVariants } from '@/components/ui/button'
import { getSymptoms, getSymptomBySlug, getServiceBySlug, AREA_LABEL, type Area } from '@/lib/content'
import { whatsappLink } from '@/lib/site'

interface PageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getSymptoms().map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const s = getSymptomBySlug(slug)
  if (!s) return {}
  const title = s.seo?.title ?? s.title
  const description = s.seo?.description ?? s.title
  return {
    title,
    description,
    keywords: s.searchTerms,
    alternates: { canonical: s.permalink },
    openGraph: { title, description, url: s.permalink },
  }
}

export default async function SymptomPage({ params }: PageProps) {
  const { slug } = await params
  const s = getSymptomBySlug(slug)
  if (!s) notFound()

  const service = s.relatedService ? getServiceBySlug(s.relatedService) : undefined

  return (
    <article className="mx-auto max-w-3xl px-4 py-16">
      <Link
        href="/diagnostico"
        className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 font-mono text-xs tracking-wide uppercase"
      >
        <ArrowLeft className="size-3.5" />
        Diagnóstico
      </Link>

      <p className="text-accent mt-8 font-mono text-xs tracking-[0.2em] uppercase">
        {AREA_LABEL[s.area as Area]}
      </p>
      <h1 className="text-foreground mt-3 text-4xl font-semibold tracking-tight text-balance">
        {s.title}
      </h1>

      <div className="prose prose-lg mt-8 max-w-none">
        <MDXContent code={s.body} />
      </div>

      <div className="border-border mt-12 rounded-xl border p-8">
        <p className="text-foreground font-serif text-xl font-semibold">
          É isso que está acontecendo na sua igreja?
        </p>
        <p className="text-muted-foreground mt-2">
          Manda uma foto do seu equipamento e um áudio do problema — já ajuda muito no diagnóstico.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a
            className={buttonVariants({ size: 'lg' })}
            href={whatsappLink(
              `Olá! Vim pela página "${s.title}". Na minha igreja está acontecendo isso: `,
            )}
            target="_blank"
            rel="noopener noreferrer"
          >
            Falar no WhatsApp
          </a>
          {service && (
            <Link
              href={service.permalink}
              className={buttonVariants({ variant: 'outline', size: 'lg' })}
            >
              Ver serviço: {service.title}
            </Link>
          )}
        </div>
      </div>
    </article>
  )
}
