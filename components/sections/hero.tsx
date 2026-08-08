import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { CoverageArcs } from '@/components/brand/coverage-arcs'
import { whatsappLink } from '@/lib/site'
import { cn } from '@/lib/utils'

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <CoverageArcs className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[130%] w-full opacity-70" />
      <div className="from-background via-background/70 pointer-events-none absolute inset-0 -z-10 bg-linear-to-b to-transparent" />

      <div className="mx-auto max-w-4xl px-4 py-24 sm:py-32">
        <p className="text-accent font-mono text-xs font-medium tracking-[0.2em] uppercase">
          Som · Transmissão · Projeto para igrejas
        </p>
        <h1 className="text-foreground mt-5 text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-6xl">
          A palavra precisa ser entendida do fundo do templo.
        </h1>
        <p className="text-muted-foreground mt-6 max-w-2xl text-lg text-pretty">
          Consultoria, projeto e operação de áudio e transmissão ao vivo para igrejas — com quem
          faz som de igreja de verdade. Diagnóstico do seu problema, sistema dimensionado e equipe
          treinada.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            className={buttonVariants({ size: 'lg' })}
            href={whatsappLink(
              'Olá! Vim pelo site e quero falar sobre o som/transmissão da minha igreja.',
            )}
            target="_blank"
            rel="noopener noreferrer"
          >
            Falar no WhatsApp
          </a>
          <Link
            href="/diagnostico"
            className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
          >
            Meu som tem um problema
          </Link>
        </div>

        <p className="text-muted-foreground/80 mt-6 font-mono text-xs">
          Resposta normalmente até a manhã seguinte.
        </p>
      </div>
    </section>
  )
}
