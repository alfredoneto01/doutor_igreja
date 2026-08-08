import { Hero } from '@/components/sections/hero'
import { DiagnosticoSection } from '@/components/sections/diagnostico-section'
import { ServicosSection } from '@/components/sections/servicos-section'
import { ProvaSection } from '@/components/sections/prova-section'
import { CursoSection } from '@/components/sections/curso-section'
import { ConteudoSection } from '@/components/sections/conteudo-section'
import { FaqSection } from '@/components/sections/faq-section'
import { ContatoSection } from '@/components/sections/contato-section'

// Ordem de valor da §4: cada seção move o visitante de sintoma → serviço →
// confiança → conteúdo → decisão, com o FAQ desviando contato do WhatsApp.
export default function HomePage() {
  return (
    <>
      <Hero />
      <DiagnosticoSection />
      <ServicosSection />
      <ProvaSection />
      <CursoSection />
      <ConteudoSection />
      <FaqSection />
      <ContatoSection />
    </>
  )
}
