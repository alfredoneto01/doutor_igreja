# Ecossistema Cadu Aranha — site

Site institucional da **Cadu Aranha Produções Audiovisuais**, com as frentes
**Doutor Igreja** (igrejas) e **Estúdio Teia** (estúdio e eventos), e base para o
agente de atendimento Webinho.

- Contexto completo do projeto: [`docs/contexto-ecossistema-cadu-aranha.md`](docs/contexto-ecossistema-cadu-aranha.md)
- Plano de implementação: [`plano-implementacao.md`](plano-implementacao.md)
- `doutor-igreja-spec.md` e `plano-execucao.md` são da fase anterior (marca única) e
  estão superados onde conflitam com o contexto.

Estado atual: MVP do site (contexto §41), como portal único em homologação (§40).

## Stack

- **Next.js 16** (App Router) + **TypeScript** + **Tailwind 4**
- **Velite** — conteúdo editorial em MDX no repositório
- **Catálogo** (`lib/catalog.ts`) — produtos, preços com vigência e prazos; nunca em MDX
- **Extrator** — FAQ + catálogo → `generated/` para o prompt do agente (`pnpm extract`)

## Comandos

```bash
pnpm dev        # Velite + Next dev
pnpm build      # Velite + build de produção
pnpm start      # servidor de produção
pnpm extract    # gera generated/ (bot-knowledge.md, knowledge-base.json, catalog.json)
pnpm typecheck  # tsc --noEmit (rodar depois de `pnpm exec velite`)
pnpm lint       # eslint
```

Requer pnpm 11+ (builds permitidos em `pnpm-workspace.yaml`).

## Estrutura

```
app/(site)/
  /                          Home institucional (três portas de entrada)
  sobre-cadu/  solucoes/[slug]/  podcast/  cursos-e-treinamentos/  imprensa/  contato/
  doutor-igreja/             Área Doutor Igreja
    check-up/                Página central + [modalidade] (4) + qual-escolher
    projetos/  workshops/  conteudos/[slug]/
  estudio-teia/              Gravações, estrutura, condições e eventos externos
  politica-de-privacidade/
components/
  checkup/                   Tabela e cartões do Check-Up (preços do catálogo)
  content/                   CTA de WhatsApp, cartões, FAQ, MDX, <Pending>
  layout/  brand/  seo/  sections/
content/                     MDX: faq (por tópico), diagnostico, casos, episodios
lib/
  catalog.ts                 Fonte única de produtos, preços (com vigência) e prazos
  site.ts                    Domínio, WhatsApp, mensagens por contexto, indexação
  nav.ts                     Navegação principal
  redirects.ts               301 das rotas antigas + mapa do site antigo
scripts/
  extract-knowledge.ts       FAQ + catálogo → generated/
```

Conteúdo ainda não entregue ou não aprovado aparece na página como
"Conteúdo pendente" (componente `<Pending>`). Buscar por `<Pending` lista tudo o que falta.

## Configuração

Copie `.env.example` para `.env.local`:

- `NEXT_PUBLIC_SITE_URL` — URL base (canônicas, OG, sitemap, robots). Domínio definitivo pendente.
- `NEXT_PUBLIC_WHATSAPP_NUMBER` — E.164 só dígitos. Em homologação, o número de teste.
- `NEXT_PUBLIC_ALLOW_INDEXING` — vazio em homologação (robots `noindex`, sitemap vazio);
  `true` só em produção.

## Regras de conteúdo (contexto §3, §14, §40)

- Check-Up: só as quatro modalidades vigentes; nada de Lite, Full, 360, Direcionado,
  Integrado ou Visita Técnica como nome comercial, nem "consultoria" como nome do Check-Up.
- Preço só aparece se estiver vigente na data (`currentPrice`). Reajustes de 2027 ficam
  cadastrados sem `validFrom` até aprovação.
- Valores do Estúdio Teia só vão ao site com `SHOW_ESTUDIO_PRICES = true` (aprovação do Cadu).
- Cursos online não são vendidos: aparecem como "em desenvolvimento".
- Portfólio e depoimentos só com `authorized: true`.

## Deploy (Railway)

1. Novo projeto a partir deste repo; Railway detecta Next.js.
2. Build: `pnpm build` · Start: `pnpm start`.
3. Variáveis de ambiente conforme `.env.example`.
4. Antes de substituir o site atual de `caduaranha.com.br`, preencher `legacyRedirects`
   em `lib/redirects.ts` com o mapa das URLs atuais.
