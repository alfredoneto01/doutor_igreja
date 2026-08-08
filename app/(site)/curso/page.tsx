import type { Metadata } from 'next'
import { PageHeader } from '@/components/layout/page-header'
import { buttonVariants } from '@/components/ui/button'
import { whatsappLink } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Curso Áudio na Igreja — Fundamentos de Áudio',
  description:
    'Curso online de fundamentos de áudio para formar a equipe de som da sua igreja. Ementa, formato e investimento.',
}

// Conteúdo placeholder — ementa, formato e preço reais a validar com o Cadu (§12).
const EMENTA = [
  ['Ganho e estrutura de ganho', 'Por que o som distorce ou fica fraco, e como acertar a base.'],
  ['A mesa de som sem mistério', 'Canais, auxiliares, EQ e o que cada botão realmente faz.'],
  ['Microfones e captação', 'Qual microfone para voz, instrumento e coral — e como posicionar.'],
  ['Retorno e monitoração', 'Como a banda se ouve sem virar guerra de volume no palco.'],
  ['Equalização na prática', 'Tirar o embolado e a microfonia sem estragar o som.'],
  ['Transmissão ao vivo', 'Levar o áudio limpo da mesa para o YouTube e as redes.'],
]

export default function CursoPage() {
  return (
    <>
      <PageHeader
        kicker="Curso · Áudio na Igreja"
        title="Fundamentos de Áudio para a equipe de som"
        intro="Curso online e direto ao ponto para quem opera o som no domingo — do ganho ao retorno, sem enrolação e com a linguagem da igreja."
      />

      <div className="mx-auto max-w-3xl px-4 py-16">
        <dl className="border-border grid grid-cols-2 gap-6 rounded-xl border p-6 sm:grid-cols-4">
          {[
            ['Formato', 'Online'],
            ['Nível', 'Básico'],
            ['Duração', 'A definir'],
            ['Investimento', 'A definir'],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="text-muted-foreground font-mono text-[11px] tracking-widest uppercase">
                {k}
              </dt>
              <dd className="text-foreground mt-1 font-medium">{v}</dd>
            </div>
          ))}
        </dl>

        <h2 id="ementa" className="text-foreground mt-14 scroll-mt-24 font-serif text-2xl font-semibold">
          Ementa
        </h2>
        <ol className="mt-6 space-y-4">
          {EMENTA.map(([titulo, desc], i) => (
            <li key={titulo} className="border-border flex gap-4 border-b pb-4">
              <span className="text-accent font-mono text-sm tabular-nums">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <p className="text-foreground font-medium">{titulo}</p>
                <p className="text-muted-foreground mt-1 text-sm text-pretty">{desc}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="border-border mt-14 rounded-xl border p-8 text-center">
          <p className="text-foreground font-serif text-xl font-semibold">
            Quer o curso para a sua equipe?
          </p>
          <p className="text-muted-foreground mt-2">
            Fala com a gente para saber datas, turmas e valores.
          </p>
          <a
            className={buttonVariants({ size: 'lg', className: 'mt-6' })}
            href={whatsappLink('Olá! Tenho interesse no curso Áudio na Igreja. Pode me passar detalhes?')}
            target="_blank"
            rel="noopener noreferrer"
          >
            Quero saber mais
          </a>
        </div>
      </div>
    </>
  )
}
