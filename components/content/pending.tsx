/**
 * Marca visível de conteúdo pendente (homologação). Nada é inventado: onde o
 * material ainda não foi entregue ou aprovado pelo Cadu, a página mostra isto
 * em vez de texto de mentira. Buscar por `<Pending` lista tudo o que falta.
 */
export function Pending({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-accent/50 text-muted-foreground rounded-lg border border-dashed p-4 font-mono text-xs">
      <span className="text-accent tracking-widest uppercase">Conteúdo pendente · </span>
      {children}
    </div>
  )
}
