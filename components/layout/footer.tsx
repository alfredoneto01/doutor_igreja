import Link from 'next/link'
import { SITE_NAME, whatsappLink } from '@/lib/site'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-border/60 mt-24 border-t">
      <div className="text-muted-foreground mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 text-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-foreground font-serif text-base font-semibold">{SITE_NAME}</p>
          <p className="mt-1">Som, transmissão e projeto de áudio para igrejas.</p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Rodapé">
          <Link href="/servicos" className="hover:text-foreground">
            Serviços
          </Link>
          <Link href="/faq" className="hover:text-foreground">
            FAQ
          </Link>
          <Link href="/privacidade" className="hover:text-foreground">
            Privacidade
          </Link>
          <a
            href={whatsappLink('Olá! Vim pelo site do Doutor Igreja.')}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground"
          >
            WhatsApp
          </a>
        </nav>
      </div>
      <div className="text-muted-foreground/70 mx-auto max-w-6xl px-4 pb-8 text-xs">
        © {year} {SITE_NAME}. Todos os direitos reservados.
      </div>
    </footer>
  )
}
