# Doutor Igreja

Site institucional + base para o agente de WhatsApp do Cadu Aranha — som,
transmissão ao vivo e projeto de áudio para igrejas. Marca única "Doutor Igreja"
(decisão A da especificação).

Um único projeto Next.js serve o site, o backend do bot (Fase 2) e o painel
(Fase 3). Esta entrega cobre a **Fase 1 — Site institucional**.

## Stack

- **Next.js 16** (App Router) + **TypeScript** + **Tailwind 4**
- **Velite** — conteúdo em MDX no repositório, sem CMS
- **Extrator** — MDX cru → texto limpo para o prompt do bot (`pnpm extract`)
- Hospedagem alvo: **Railway** (processo Node persistente para o `node-cron` da Fase 2)

## Comandos

```bash
pnpm dev        # Velite + Next dev
pnpm build      # Velite + build de produção
pnpm start      # servidor de produção
pnpm extract    # gera generated/bot-knowledge.md a partir do MDX (para o bot)
pnpm typecheck  # tsc --noEmit
pnpm lint       # eslint
```

## Estrutura

```
app/(site)/       Páginas do site (home + serviços, diagnóstico, faq, curso, privacidade)
components/
  sections/       Seções da home (hero, diagnóstico, serviços, prova, curso, conteúdo, faq, contato)
  content/        Renderizador MDX, Callout, acordeão de FAQ
  brand/          Assinatura visual (curvas de cobertura acústica)
  layout/         Header, footer, Section, PageHeader
content/          MDX: faq, servicos, diagnostico (SEO), casos, episodios
lib/
  site.ts         Fonte única: domínio, número de WhatsApp, helper de CTA
  content.ts      Acessores das coleções Velite
  redirects.ts    Mapa de 301 do rebrand (preencher na Fase 0.6)
scripts/
  extract-knowledge.ts   Extrator para o prompt do bot (Fase 1.2)
```

## Configuração

Copie `.env.example` para `.env.local`:

- `NEXT_PUBLIC_SITE_URL` — URL base (canônicas, OG, sitemap, robots)
- `NEXT_PUBLIC_WHATSAPP_NUMBER` — E.164 só dígitos. **Na Fase 1 aponta para o
  número de teste**; migra para o real só na Fase 3.

## Conteúdo

Todo o conteúdo atual é **placeholder marcado** — será substituído pelo
levantamento real com o Cadu (§12 da spec): FAQs do histórico de WhatsApp/Instagram,
faixas de preço, região de atendimento, casos com fotos, ementa do curso.

O mesmo MDX alimenta o site (via Velite) e o prompt do bot (via `pnpm extract`,
que remove JSX e formatação e emite texto limpo em `generated/`).

## Deploy (Railway)

1. Novo projeto a partir deste repo; Railway detecta Next.js.
2. Build: `pnpm build` · Start: `pnpm start`.
3. Postgres gerenciado ao lado (já usado a partir da Fase 2).
4. Variáveis de ambiente conforme `.env.example`.
5. Domínio `doutorigreja.com.br`. Apontar `caduaranha.com.br` para este app e
   preencher `lib/redirects.ts` com o mapa 301 (Fase 0.6) antes de derrubar o site atual.

## Pendências antes do launch

- Conteúdo real (§12) no lugar dos placeholders
- Número de teste do WhatsApp nos CTAs
- Mapa de 301 de `caduaranha.com.br` (Fase 0.6)
- Revisão jurídica da política de privacidade
- Fontes: hoje via `next/font` (Source Serif 4 / Inter / JetBrains Mono)
