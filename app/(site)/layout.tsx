import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { JsonLd } from '@/components/seo/json-ld'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd />
      <Header />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  )
}
