import Image from 'next/image'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { MAIN_NAV } from '@/lib/nav'
import { SITE_SHORT_NAME, WA, whatsappLink } from '@/lib/site'
import { cn } from '@/lib/utils'

/**
 * Header multimarcas (contexto §15), no estilo do site anterior: logo Cadu
 * Aranha à esquerda, menu em caixa-alta condensada. No mobile, menu com
 * <details> nativo — funciona sem JS e por teclado.
 */
export function Header() {
  return (
    <header className="border-border/60 sticky top-0 z-40 border-b bg-[#1f1f1f]/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link href="/" className="shrink-0" aria-label={`${SITE_SHORT_NAME} — início`}>
          <Image
            src="/brand/cadu-aranha-logo.png"
            alt={SITE_SHORT_NAME}
            width={980}
            height={343}
            priority
            className="h-9 w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-5 xl:flex" aria-label="Principal">
          {MAIN_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-foreground/85 hover:text-accent font-mono text-sm font-bold whitespace-nowrap uppercase transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
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
              className="border-border bg-card absolute right-0 mt-2 w-64 rounded-lg border p-2 shadow-lg"
            >
              {MAIN_NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-foreground hover:bg-muted hover:text-accent block rounded-md px-3 py-2 font-mono text-sm font-bold uppercase"
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
