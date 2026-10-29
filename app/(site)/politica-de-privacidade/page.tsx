import type { Metadata } from 'next'
import { PageHeader } from '@/components/layout/page-header'
import { SITE_NAME } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Política de privacidade',
  description: 'Como a Cadu Aranha Produções trata seus dados, a base legal e como pedir exclusão.',
  alternates: { canonical: '/politica-de-privacidade' },
}

// Rascunho de política (LGPD, §11). Precisa de revisão jurídica antes do launch:
// base legal definitiva, prazo de retenção e dados do controlador.
export default function PrivacidadePage() {
  return (
    <>
      <PageHeader kicker="LGPD" title="Política de privacidade" />
      <div className="prose prose-lg mx-auto max-w-3xl px-4 py-16">
        <p>
          Esta página descreve como a <strong>{SITE_NAME}</strong> trata os dados de quem entra em
          contato pelo site e pelo WhatsApp.{' '}
          <em>Rascunho — pendente de revisão jurídica antes da publicação.</em>
        </p>

        <h2>Que dados coletamos</h2>
        <p>
          Ao falar com a gente pelo WhatsApp, coletamos as informações que você mesmo envia: nome,
          cidade, organização ou igreja, a necessidade relatada, e as mídias (fotos e áudios) que
          você compartilha. Usamos esses dados apenas para atender o seu pedido e preparar uma
          proposta.
        </p>

        <h2>Atendimento automatizado</h2>
        <p>
          O primeiro atendimento no WhatsApp é feito pelo Webinho, assistente virtual da Cadu Aranha
          Produções, que se identifica como tal. A qualquer momento você pode pedir para falar com
          uma pessoa.
        </p>

        <h2>Como parar de receber mensagens</h2>
        <p>
          Envie <strong>PARAR</strong> ou <strong>SAIR</strong> pelo WhatsApp e encerramos o contato
          automático imediatamente.
        </p>

        <h2>Retenção e exclusão</h2>
        <p>
          Guardamos as conversas e mídias apenas pelo tempo necessário ao atendimento. Você pode
          pedir a exclusão dos seus dados a qualquer momento pelo mesmo canal de contato.
        </p>

        <h2>Contato</h2>
        <p>Dúvidas sobre privacidade: fale pelo WhatsApp ou pelo e-mail de atendimento.</p>
      </div>
    </>
  )
}
