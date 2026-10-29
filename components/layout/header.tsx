import Link from 'next/link'
import { Menu } from 'lucide-react'
import { ThemeToggle } from '@/components/theme/theme-toggle'
import { buttonVariants } from '@/components/ui/button'
import { MAIN_NAV } from '@/lib/nav'
import { SITE_SHORT_NAME, WA, whatsappLink } from '@/lib/site'
import { cn } from '@/lib/utils'

/**
 * Header multimarcas (contexto §15). A assinatura é institucional; Doutor Igreja
 * e Estúdio Teia aparecem como frentes na navegação. No mobile, menu com
 * <details> nativo — funciona sem JS e por teclado.
 */
export function Header() {
  return (
    <header className="border-border/60 bg-background/80 sticky top-0 z-40 border-b backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link href="/" className="font-serif text-lg font-semibold tracking-tight">
          {SITE_SHORT_NAME}
        </Link>

        <nav className="hidden items-center gap-5 xl:flex" aria-label="Principal">
          {MAIN_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted-foreground hover:text-foreground text-sm whitespace-nowrap transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            className={cn(buttonVariants({ size: 'sm' }), 'hidden sm:inline-flex')}
            href={whatsappLink(WA.geral)}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp
          </a>

          <details className="group relative xl:hidden">
            <summary
              className={cn(
                buttonVariants({ variant: 'ghost', size: 'sm' }),
                'cursor-pointer list-none [&::-webkit-details-marker]:hidden',
              )}
              aria-label="Abrir menu"
            >
              <Menu className="size-5" />
            </summary>
            <nav
              aria-label="Principal"
              className="border-border bg-background absolute right-0 mt-2 w-64 rounded-xl border p-2 shadow-lg"
            >
              {MAIN_NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-foreground hover:bg-muted block rounded-md px-3 py-2 text-sm"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </details>
        </div>
      </div>
    </header>
  )
}
