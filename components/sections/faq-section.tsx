import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Section } from '@/components/layout/section'
import { FaqAccordion } from '@/components/content/faq-accordion'
import { getFaq } from '@/lib/content'

/**
 * FAQ — a seção mais importante do projeto (§4). Cada resposta aqui é uma
 * mensagem que não chega no WhatsApp, ou que chega já qualificada.
 */
export function FaqSection() {
  const items = getFaq().slice(0, 6)
  return (
    <Section
      id="faq"
      kicker="Perguntas frequentes"
      title="O que as igrejas mais perguntam"
      intro="Respostas diretas para você decidir sem precisar esperar retorno. Não achou a sua? Chame no WhatsApp."
      className="border-border/60 border-t"
    >
      <FaqAccordion items={items} />
      <Link
        href="/faq"
        className="text-accent mt-6 inline-flex items-center gap-1 font-mono text-xs tracking-wide uppercase hover:underline"
      >
        Todas as perguntas
        <ArrowRight className="size-3.5" />
      </Link>
    </Section>
  )
}
