import Link from 'next/link'
import { BRANDS } from '@/lib/catalog'
import { SITE_NAME, SOCIAL } from '@/lib/site'

const COLUMNS = [
  {
    title: BRANDS.institucional.short,
    links: [
      { href: '/sobre-cadu', label: 'Sobre Cadu' },
      { href: '/solucoes', label: 'Soluções' },
      { href: '/imprensa', label: 'Imprensa' },
      { href: '/contato', label: 'Contato' },
    ],
  },
  {
    title: BRANDS.doutorIgreja.name,
    links: [
      { href: '/doutor-igreja', label: 'Visão geral' },
      { href: '/doutor-igreja/check-up', label: 'Check-Up' },
      { href: '/doutor-igreja/projetos', label: 'Projetos e implantação' },
      { href: '/doutor-igreja/workshops', label: 'Workshops' },
      { href: '/podcast', label: 'Podcast' },
    ],
  },
  {
    title: BRANDS.estudioTeia.name,
    links: [
      { href: '/estudio-teia', label: 'O estúdio' },
      { href: '/estudio-teia#eventos', label: 'Eventos externos' },
    ],
  },
]

export function Footer() {
  const year = new Date().getFullYear()
  const social = SOCIAL.filter((s) => s.href)
  return (
    <footer className="border-border/60 mt-24 border-t">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-foreground font-serif text-base font-semibold">{SITE_NAME}</p>
          <p className="text-muted-foreground mt-2 text-sm">{BRANDS.institucional.tagline}</p>
        </div>
        {COLUMNS.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <p className="text-foreground font-mono text-xs tracking-widest uppercase">
              {col.title}
            </p>
            <ul className="text-muted-foreground mt-3 space-y-2 text-sm">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-foreground">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="text-muted-foreground/70 mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-2 px-4 pb-8 text-xs">
        <span>
          © {year} {SITE_NAME}.
        </span>
        <Link href="/politica-de-privacidade" className="hover:text-foreground">
          Política de privacidade
        </Link>
        {social.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground"
          >
            {s.label}
          </a>
        ))}
      </div>
    </footer>
  )
}
