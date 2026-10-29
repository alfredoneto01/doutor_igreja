import type { Metadata } from 'next'
import { Source_Serif_4, Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/components/theme/theme-provider'
import { ALLOW_INDEXING, SITE_URL, SITE_NAME, SITE_SHORT_NAME, SITE_DESCRIPTION } from '@/lib/site'

const serif = Source_Serif_4({
  variable: '--font-serif',
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
})

const sans = Inter({
  variable: '--font-sans',
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
})

const mono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s — ${SITE_SHORT_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: 'Cadu Aranha' }],
  creator: 'Cadu Aranha Produções',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: SITE_URL,
    siteName: SITE_NAME,
  },
  robots: { index: ALLOW_INDEXING, follow: ALLOW_INDEXING },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={cn('h-full antialiased', serif.variable, sans.variable, mono.variable)}
    >
      <body className="bg-background text-foreground flex min-h-full flex-col font-sans">
        <a
          href="#main"
          className="bg-primary text-primary-foreground focus-visible:outline-ring sr-only z-50 rounded-md px-3 py-2 font-mono text-xs tracking-widest uppercase focus-visible:not-sr-only focus-visible:fixed focus-visible:top-3 focus-visible:left-3 focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          Pular para o conteúdo
        </a>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
