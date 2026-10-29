import { MessageCircle } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { WEBINHO_NOTE, whatsappLink } from '@/lib/site'
import { cn } from '@/lib/utils'

/** Botão de WhatsApp com mensagem inicial por contexto (contexto §15). */
export function WhatsappButton({
  message,
  children = 'Falar no WhatsApp',
  variant = 'primary',
  className,
}: {
  message: string
  children?: React.ReactNode
  variant?: 'primary' | 'outline'
  className?: string
}) {
  return (
    <a
      className={cn(buttonVariants({ size: 'lg', variant }), className)}
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
    >
      <MessageCircle className="size-4" />
      {children}
    </a>
  )
}

/** Bloco de fechamento de página: título, texto, CTA e nota de transparência do Webinho. */
export function WhatsappCta({
  title,
  text,
  message,
  label,
}: {
  title: string
  text?: string
  message: string
  label?: string
}) {
  return (
    <div className="border-border bg-card rounded-xl border p-8 text-center sm:p-10">
      <p className="text-foreground font-serif text-2xl font-semibold text-balance">{title}</p>
      {text && <p className="text-muted-foreground mx-auto mt-3 max-w-xl text-pretty">{text}</p>}
      <WhatsappButton message={message} className="mt-6">
        {label}
      </WhatsappButton>
      <p className="text-muted-foreground/80 mx-auto mt-5 max-w-md font-mono text-xs text-pretty">
        {WEBINHO_NOTE}
      </p>
    </div>
  )
}
