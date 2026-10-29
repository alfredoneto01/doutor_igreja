import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { CHECKUPS, currentPrice, formatPrice, type Checkup } from '@/lib/catalog'

/** Preço vigente hoje; sem preço vigente, encaminha para a equipe (nunca inventa). */
export function CheckupPrice({ checkup }: { checkup: Checkup }) {
  const price = currentPrice(checkup.prices)
  return <>{price ? formatPrice(price) : 'Consulte a equipe'}</>
}

/** Tabela comparativa das quatro modalidades (contexto §3, §14). */
export function CheckupTable() {
  return (
    <div className="border-border overflow-x-auto rounded-xl border">
      <table className="w-full min-w-[720px] text-left text-sm">
        <caption className="sr-only">Comparativo das modalidades de Check-Up</caption>
        <thead className="bg-muted/50 text-muted-foreground font-mono text-[11px] tracking-widest uppercase">
          <tr>
            <th scope="col" className="p-4 font-medium">
              Modalidade
            </th>
            <th scope="col" className="p-4 font-medium">
              Escopo
            </th>
            <th scope="col" className="p-4 font-medium">
              Duração
            </th>
            <th scope="col" className="p-4 font-medium">
              Participantes
            </th>
            <th scope="col" className="p-4 font-medium">
              Relatório
            </th>
            <th scope="col" className="p-4 font-medium">
              Investimento
            </th>
          </tr>
        </thead>
        <tbody className="divide-border divide-y">
          {CHECKUPS.map((c) => (
            <tr key={c.slug}>
              <th scope="row" className="p-4 align-top font-medium">
                <Link href={`/doutor-igreja/check-up/${c.slug}`} className="hover:text-accent">
                  {c.name}
                </Link>
              </th>
              <td className="text-muted-foreground p-4 align-top">{c.scope}</td>
              <td className="p-4 align-top whitespace-nowrap">{c.duration}</td>
              <td className="p-4 align-top">{c.participants}</td>
              <td className="p-4 align-top whitespace-nowrap">{c.reportDeadline}</td>
              <td className="p-4 align-top font-medium whitespace-nowrap tabular-nums">
                <CheckupPrice checkup={c} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/** Cartões das quatro modalidades, com link para a página de cada uma. */
export function CheckupCards() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {CHECKUPS.map((c) => (
        <li key={c.slug}>
          <Link
            href={`/doutor-igreja/check-up/${c.slug}`}
            className="group border-border bg-card hover:border-accent/60 flex h-full flex-col rounded-xl border p-6 transition-colors"
          >
            <span className="text-accent font-mono text-[11px] tracking-widest uppercase">
              {c.amplitude} · {c.format}
            </span>
            <span className="text-foreground mt-2 font-serif text-xl font-semibold">{c.name}</span>
            <span className="text-muted-foreground mt-2 text-sm text-pretty">{c.whenToChoose}</span>
            <span className="text-foreground mt-4 font-medium tabular-nums">
              <CheckupPrice checkup={c} />
            </span>
            <span className="text-accent mt-4 inline-flex items-center gap-1 font-mono text-xs tracking-wide uppercase">
              Ver modalidade
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
