import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHeader } from '@/components/layout/page-header'
import { FaqAccordion } from '@/components/content/faq-accordion'
import { buttonVariants } from '@/components/ui/button'
import { getFaq, AREA_LABEL, type Area } from '@/lib/content'
import { whatsappLink } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Perguntas frequentes',
  description:
    'Respostas diretas sobre sonorização, transmissão ao vivo, projeto e treinamento de áudio para igrejas.',
}

export default function FaqPage() {
  const all = getFaq()
  // Agrupa por área, preservando a ordem já ordenada por `order`.
  const areas = [...new Set(all.map((f) => f.area))] as Area[]

  return (
    <>
      <PageHeader
        kicker="Perguntas frequentes"
        title="O que as igrejas mais perguntam"
        intro="Se a sua dúvida está aqui, você já resolve sem esperar retorno. Se não estiver, é só chamar no WhatsApp."
      />
      <div className="mx-auto max-w-3xl px-4 py-16">
        <div className="space-y-12">
          {areas.map((area) => {
            const items = all.filter((f) => f.area === area)
            return (
              <section key={area}>
                <h2 className="text-muted-foreground mb-4 font-mono text-xs tracking-[0.2em] uppercase">
                  {AREA_LABEL[area]}
                </h2>
                <FaqAccordion items={items} />
              </section>
            )
          })}
        </div>

        <div className="border-border mt-16 rounded-xl border p-8 text-center">
          <p className="text-foreground font-serif text-xl font-semibold">Não achou a sua pergunta?</p>
          <p className="text-muted-foreground mt-2">O primeiro atendimento responde na hora.</p>
          <a
            className={buttonVariants({ size: 'lg', className: 'mt-6' })}
            href={whatsappLink('Olá! Não achei minha dúvida no FAQ do site. Minha pergunta é: ')}
            target="_blank"
            rel="noopener noreferrer"
          >
            Perguntar no WhatsApp
          </a>
        </div>
      </div>

      <p className="sr-only">
        <Link href="/">Voltar à página inicial</Link>
      </p>
    </>
  )
}
