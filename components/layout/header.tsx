import Link from 'next/link'
import { ThemeToggle } from '@/components/theme/theme-toggle'
import { buttonVariants } from '@/components/ui/button'
import { SITE_NAME, whatsappLink } from '@/lib/site'
import { cn } from '@/lib/utils'

const NAV = [
  { href: '/servicos', label: 'Serviços' },
  { href: '/diagnostico', label: 'Diagnóstico' },
  { href: '/casos', label: 'Casos' },
  { href: '/curso', label: 'Curso' },
  { href: '/faq', label: 'FAQ' },
]

export function Header() {
  return (
    <header className="border-border/60 bg-background/80 sticky top-0 z-40 border-b backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="font-serif text-lg font-semibold tracking-tight">
          {SITE_NAME}
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Principal">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            className={cn(buttonVariants({ size: 'sm' }), 'hidden sm:inline-flex')}
            href={whatsappLink('Olá! Vim pelo site e quero falar sobre som/transmissão na minha igreja.')}
            target="_blank"
            rel="noopener noreferrer"
          >
            Falar no WhatsApp
          </a>
        </div>
      </div>
    </header>
  )
}
