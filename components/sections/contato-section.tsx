import { MessageCircle } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { CoverageArcs } from '@/components/brand/coverage-arcs'
import { whatsappLink } from '@/lib/site'

/**
 * Contato — CTA principal de WhatsApp com contexto (§4), transparência de que o
 * atendimento é automatizado no primeiro contato e sinalização de prazo (§5).
 */
export function ContatoSection() {
  return (
    <section id="contato" className="relative scroll-mt-20 overflow-hidden py-20 sm:py-28">
      <CoverageArcs className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-full w-full rotate-180 opacity-40" />
      <div className="mx-auto max-w-3xl px-4 text-center">
        <p className="text-accent font-mono text-xs font-medium tracking-[0.2em] uppercase">
          Fale com a gente
        </p>
        <h2 className="text-foreground mt-3 font-serif text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          Conte o que está acontecendo com o som da sua igreja
        </h2>
        <p className="text-muted-foreground mx-auto mt-4 max-w-xl text-lg text-pretty">
          Quanto mais detalhes você já mandar — tamanho do templo, equipamento atual, o problema —
          mais rápido chega uma proposta fechada.
        </p>

        <div className="mt-8 flex justify-center">
          <a
            className={buttonVariants({ size: 'lg' })}
            href={whatsappLink(
              'Olá! Vim pela página de contato. Minha igreja é em [cidade], tem cerca de [nº] lugares, e o problema é: ',
            )}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle className="size-4" />
            Falar no WhatsApp
          </a>
        </div>

        <p className="text-muted-foreground/80 mx-auto mt-6 max-w-md font-mono text-xs text-pretty">
          O primeiro atendimento é automatizado, para responder na hora e já organizar seu caso.
          Resposta humana normalmente até a manhã seguinte.
        </p>
      </div>
    </section>
  )
}
