import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { MDXContent } from '@/components/content/mdx-content'
import { WhatsappCta } from '@/components/content/whatsapp-cta'
import { AREA_LABEL, getSymptoms, getSymptomBySlug } from '@/lib/content'

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

export default async function ConteudoPage({ params }: PageProps) {
  const { slug } = await params
  const s = getSymptomBySlug(slug)
  if (!s) notFound()

  return (
    <article className="mx-auto max-w-3xl px-4 py-16">
      <Link
        href="/doutor-igreja/conteudos"
        className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 font-mono text-xs tracking-wide uppercase"
      >
        <ArrowLeft className="size-3.5" />
        Conteúdos
      </Link>
      <p className="text-accent mt-8 font-mono text-xs tracking-[0.2em] uppercase">
        {AREA_LABEL[s.area]}
      </p>
      <h1 className="text-foreground mt-3 text-4xl font-semibold tracking-tight text-balance">
        {s.title}
      </h1>
      <div className="prose prose-lg mt-8 max-w-none">
        <MDXContent code={s.body} />
      </div>
      <div className="mt-12">
        <WhatsappCta
          title="É isso que está acontecendo na sua igreja?"
          text="O Check-Up existe para entender o problema antes de investir em soluções inadequadas."
          message={`Olá! Li o conteúdo "${s.title}" e quero entender a situação da minha igreja.`}
        />
      </div>
    </article>
  )
}
