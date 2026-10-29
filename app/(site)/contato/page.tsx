import type { Metadata } from 'next'
import { MessageCircle } from 'lucide-react'
import { PageHeader } from '@/components/layout/page-header'
import { Section } from '@/components/layout/section'
import { WA, WEBINHO_NOTE, whatsappLink } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Contato',
  description: 'Fale com a Cadu Aranha Produções, o Doutor Igreja ou o Estúdio Teia pelo WhatsApp.',
  alternates: { canonical: '/contato' },
}

/**
 * Entradas separadas por contexto (contexto §14 "Contato"). Cada uma abre o
 * WhatsApp com a mensagem inicial correspondente, para o Webinho já saber a
 * origem sem que a pessoa precise escolher uma categoria na conversa.
 */
const ENTRIES = [
  {
    title: 'Igreja',
    text: 'Som, transmissão, iluminação, acústica, equipe ou infraestrutura.',
    message: WA.igreja,
  },
  {
    title: 'Estúdio Teia',
    text: 'Gravar podcast, videocast, videoaula ou transmissão.',
    message: WA.estudio,
  },
  {
    title: 'Audiovisual corporativo',
    text: 'Produção, eventos, livestream ou direção técnica.',
    message: WA.corporativo,
  },
  { title: 'Imprensa', text: 'Pautas, entrevistas e materiais.', message: WA.imprensa },
  { title: 'Palestra', text: 'Convites para palestras e eventos.', message: WA.palestra },
  { title: 'Parceria', text: 'Agências, patrocínio e parcerias.', message: WA.parceria },
]

export default function ContatoPage() {
  return (
    <>
      <PageHeader
        kicker="Contato"
        title="Como podemos ajudar?"
        intro="Escolha o assunto para abrir o WhatsApp com a conversa já encaminhada."
      />
      <Section>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ENTRIES.map((e) => (
            <li key={e.title}>
              <a
                href={whatsappLink(e.message)}
                target="_blank"
                rel="noopener noreferrer"
                className="group border-border bg-card hover:border-accent/60 flex h-full flex-col rounded-xl border p-6 transition-colors"
              >
                <span className="text-foreground font-serif text-xl font-semibold">{e.title}</span>
                <span className="text-muted-foreground mt-2 flex-1 text-sm text-pretty">
                  {e.text}
                </span>
                <span className="text-accent mt-5 inline-flex items-center gap-1.5 font-mono text-xs tracking-wide uppercase">
                  <MessageCircle className="size-3.5" />
                  Abrir WhatsApp
                </span>
              </a>
            </li>
          ))}
        </ul>
        <p className="text-muted-foreground/80 mt-8 max-w-xl font-mono text-xs text-pretty">
          {WEBINHO_NOTE}
        </p>
      </Section>
    </>
  )
}
