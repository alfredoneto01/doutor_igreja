import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

/**
 * Curso "Fundamentos de Áudio — Básico" (marca "Áudio na Igreja"). Teaser na
 * home; página própria em /curso com ementa, duração, formato e preço (§4).
 */
export function CursoSection() {
  return (
    <section id="curso" className="scroll-mt-20 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="border-border from-primary/5 overflow-hidden rounded-2xl border bg-linear-to-br to-transparent p-8 sm:p-12">
          <p className="text-accent font-mono text-xs font-medium tracking-[0.2em] uppercase">
            Curso · Áudio na Igreja
          </p>
          <h2 className="text-foreground mt-3 max-w-2xl font-serif text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Fundamentos de Áudio para quem opera o som no domingo
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl text-lg text-pretty">
            Curso online e direto ao ponto para formar a equipe de som da sua igreja — do ganho ao
            retorno, sem enrolação. Ementa, duração e formato na página do curso.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/curso" className={buttonVariants({ size: 'lg' })}>
              Ver o curso
            </Link>
            <Link
              href="/curso#ementa"
              className={cn(
                buttonVariants({ variant: 'ghost', size: 'lg' }),
                'text-accent',
              )}
            >
              Ementa completa
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
