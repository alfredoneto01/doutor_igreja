# Doutor Igreja — Plano de Execução Detalhado

> Decisão de posicionamento: **A — Rebrand total** (marca única "Doutor Igreja", foco exclusivo em igreja).
> Consequências: FAQ e bot mais simples; abandono público de corporativo/eventos; **301 rota-a-rota obrigatório** de `caduaranha.com.br` → `doutorigreja.com.br`.
>
> Critério de sucesso: **TTFR** (tempo até primeira resposta), instrumentado desde o dia 1.
> Restrição: **tempo de construção**, não custo. Cortar escopo agressivamente.

---

## Estimativas (ordem de grandeza, dev único)

| Fase | Esforço | Depende de |
|---|---|---|
| 0 — Dependências externas | contínuo, dispara no dia 1 | Cadu + Meta |
| 1 — Site institucional | ~1,5–2 semanas | conteúdo (0.7), domínio (0.6) |
| 2 — Bot em sandbox/teste | ~2–3 semanas | templates (0.3), FAQ (0.7) |
| 3 — Coexistência + painel | ~1–1,5 semana | 0.1, 0.2 confirmados |
| 4 — Funil + métricas | adiado até haver volume | uso real |

Fase 1 e o dev da Fase 2 rodam **em paralelo** enquanto a Meta processa verificação e templates.

---

## Fase 0 — Checklist de dependências (dispara hoje)

- [ ] **0.1** Confirmar número real está no WhatsApp Business **App** (não Cloud API) — irreversível ⟶ *Cadu*
- [ ] **0.2** Verificação de negócio Meta (CNPJ) + aprovação display name ⟶ *Cadu + dev*
- [ ] **0.3** Redigir e submeter templates como follow-up de solicitação concreta (dependência mais longa) ⟶ *dev*
- [ ] **0.4** Ativar número sandbox Meta ⟶ *dev*
- [ ] **0.6** Registrar `doutorigreja.com.br` (+`.com`/`.live`); confirmar acesso a domínio/hospedagem atuais; **exportar todas as URLs de `caduaranha.com.br`** para o mapa de 301 ⟶ *dev + Cadu*
- [ ] **0.7** Levantamento de conteúdo (§12): FAQs reais do histórico, faixas de preço publicáveis, região de atendimento, casos/depoimentos+fotos, ementa do curso, tempo-até-desistência ⟶ *Cadu*
- [ ] **0.8** Confirmar tabela de preços de mensagem Meta BR atual ⟶ *dev*

> **Gate para launch (não para dev):** 0.1 confirmado, 0.6 concluído. Dev de site e bot em sandbox começa sem esperar.

---

## Fase 1 — Site institucional

### 1.1 Fundação
- [ ] Scaffold Next.js (App Router) + TypeScript + Tailwind
- [ ] Deploy vazio no **Railway** desde o início (processo Node vivo — não Vercel)
- [ ] Postgres gerenciado provisionado ao lado (já serve a Fase 2)
- [ ] `metadataBase` configurado para canônicas corretas

### 1.2 Pipeline de conteúdo (contrato site ↔ bot)
- [ ] Estrutura MDX no repo (`/content/faq`, `/content/servicos`, etc.)
- [ ] **Extrator obrigatório**: MDX cru → `{ frontmatter, textoLimpo }` sem JSX (`<Callout>`, `<ServiceCard>`). É essa saída que alimenta o prompt do bot, não o arquivo bruto.
- [ ] Teste do extrator (garante que nenhum JSX vaza para o prompt)

### 1.3 Design (antes de codar UI)
- [ ] Plano de design curto: paleta 4–6 hex **nomeados**, par display+corpo, conceito de layout, **1 elemento de assinatura** do vocabulário de áudio (fader, escala VU/headroom, curva de EQ, planta de cobertura acústica, patchbay, geometria de templo)
- [ ] Revisar contra o briefing → só então implementar
- [ ] Piso silencioso: responsivo até mobile, foco de teclado visível, `prefers-reduced-motion`

### 1.4 Páginas (ordem de valor)
- [ ] **Hero** — proposta de valor específica p/ igreja + CTA principal
- [ ] **Problema/diagnóstico** — espinha dorsal do SEO. Cada sintoma = seção/página indexável com a linguagem de busca ("som da igreja embolado", "microfone microfonando", "como transmitir culto ao vivo", "quanto custa sonorizar igreja")
- [ ] **Serviços** — cada um com descrição real, público, entregável e **faixa de investimento**
- [ ] **Prova** — casos, antes/depois, depoimentos, igrejas atendidas, fotos de instalação
- [ ] **Curso** — página própria: ementa, duração, formato, preço, para quem serve
- [ ] **Conteúdo** — últimos episódios do podcast em destaque
- [ ] **FAQ** — a seção mais importante; alimenta o bot
- [ ] **Contato** — CTAs para WhatsApp com contexto

### 1.5 CTAs e SEO
- [ ] Todo CTA = `wa.me/55DDDNUMERO?text=<mensagem por seção>` apontando para **número de teste** (Fase 2)
- [ ] **301 rota-a-rota** de `caduaranha.com.br` → novo domínio (usar mapa do 0.6)
- [ ] Sitemap, robots, dados estruturados por sintoma

**Aceite Fase 1:** site no ar, FAQ estruturado, CTAs pré-preenchidos, SEO técnico ok, 301 ativos.

---

## Fase 2 — Agente de WhatsApp (sandbox → número de teste)

### 2.1 Modelo de dados (PostgreSQL) — primeiro
- [ ] `contacts` (phone UNIQUE E.164, campos de coleta, `lead_stage`, `opted_out_at`)
- [ ] `conversations` (`state`, `intent_tag`, `last_inbound_at`, `window_expires_at` **GENERATED ALWAYS AS (last_inbound_at + interval '24 hours') STORED** + índice)
- [ ] `messages` (`wa_message_id` **UNIQUE**, `direction`, `origin`, `state` enum único, `template_name`, `error_code`, `approved_by` id, timestamps)
- [ ] `unanswered_questions`, `panel_users`, `consents`

### 2.2 Webhook (tudo obrigatório — é o que sempre quebra)
- [ ] Handshake GET com `verify_token`
- [ ] Verificação `X-Hub-Signature-256` em todo POST
- [ ] **Responder 200 rápido**, processar assíncrono (Meta trata timeout como falha e reenvia)
- [ ] Deduplicação por `wa_message_id`
- [ ] Distinguir callbacks de status (`sent/delivered/read/failed`) de mensagens de entrada
- [ ] Retry idempotente no envio
- [ ] **Debounce por conversa (5–10s) + lock por `conversation_id`** (evita respostas múltiplas em rajada)

### 2.3 Regras que rodam ANTES do modelo
- [ ] **Opt-out** (`PARAR`/`SAIR`) → grava `opted_out_at`, encerra (LGPD, antes de qualquer chamada Claude)
- [ ] **"Falar com pessoa"** e variações → escala imediata, fora do julgamento do LLM
- [ ] Registro de consentimento no 1º contato (`consents`)
- [ ] Supressão por `humano_ativo` (ver 3.2)

### 2.4 Camada Claude API
- [ ] Roteamento por caminho: **Sonnet 5** tempo real / **Opus 5** rascunhos
- [ ] FAQ inteiro no prompt (20–50 itens) — **sem RAG, sem `get_service_info`**
- [ ] Prompt caching **TTL 1h** (`"cache_control": {"type":"ephemeral","ttl":"1h"}`); breakpoint no último bloco **estável** (fim do FAQ+instruções), nunca em timestamp/mensagem do lead
- [ ] Tempo real: `effort: "low"|"medium"` + `max_tokens` folgado
- [ ] **Checar `stop_reason` ANTES de ler `content`**: `refusal` e `model_context_window_exceeded` → mesmo caminho de fallback do timeout
- [ ] Verificar `usage.cache_read_input_tokens` em produção (se vier 0, cache quebrado)
- [ ] Tools: `save_lead_info(campo,valor)`, `update_lead_stage(stage)`, `log_unanswered_question(pergunta)`, `escalate_to_human(motivo,resumo)`

### 2.5 Comportamento de conversa
- [ ] 1º contato: **auto-identificação como bot** + prazo **"até amanhã de manhã"**
- [ ] Encerrar com pergunta (reinicia janela 24h) — **com teto**: agressivo nos 2–3 turnos; depois só se houver campo vazio relevante; **nunca** logo após redirecionar dúvida técnica; quando tudo respondido → sinaliza prazo e ponto
- [ ] Escopo: responde operacional; dúvida técnica de áudio → redireciona a episódio/consultoria (rascunho técnico só com aprovação)
- [ ] Coleta agressiva, **uma pergunta por mensagem**: nome, cidade, igreja/tipo, tamanho espaço+congregação, equipamento atual, problema, urgência, orçamento, se tem equipe técnica

### 2.6 Janela de 24h e agendamento
- [ ] `node-cron` no processo Node (Railway)
- [ ] Timezone `America/Sao_Paulo` explícito em toda lógica de janela; armazenar em UTC
- [ ] Triagem fixa **07h30**
- [ ] **Alerta de 6h → template automático** (não notificação humana): se janela vai fechar e fila não limpa, sistema manda template sozinho

### 2.7 Mídia
- [ ] Mínimo viável: baixar da Media API, guardar referência, responder "recebi a foto/áudio, o Cadu vai olhar"
- [ ] Incremento: imagem via visão do modelo (responde "qual equipamento você tem"), voice note via transcrição

### 2.8 Fallback e testes
- [ ] Fallback: Claude cair/timeout/`refusal` → resposta que reconhece a mensagem + sinaliza prazo (**silêncio é o pior resultado**)
- [ ] Suíte: dedupe de webhook, debounce de rajada, expiração de janela, supressão `humano_ativo`, caminho de fallback
- [ ] **TTFR instrumentado** (2 timestamps + query) desde já
- [ ] Grupos não suportados → resposta prevista no FAQ + aviso automático se possível
- [ ] Monitorar tier de mensagens (~250 conversas únicas/24h) e quality rating

**Aceite Fase 2:** bot no número de teste responde operacional + sinaliza prazo; fallback, opt-out e dedupe funcionando; TTFR medível.

---

## Fase 3 — Coexistência no número real + painel

> Só após 0.1 e 0.2 confirmados.

### 3.1 Ativar coexistência
- [ ] Ativar do **app → API** (não funciona no sentido inverso)
- [ ] Configurar display name no cabeçalho (pode não aparecer p/ contatos novos)
- [ ] Documentar p/ Cadu: abrir o app ≥ a cada 14 dias (senão conexão cai); sem listas de transmissão/mensagens temporárias no fluxo integrado
- [ ] Alerta se o app ficar sem atividade

### 3.2 Concorrência humano × bot
- [ ] Webhook de outbound originado no app (`origin=app_coexistencia`) → marcar conversa `humano_ativo` por 30–60min e **suprimir resposta automática**
- [ ] Bot volta ao normal após o período ou quando Cadu liberar no painel

### 3.3 Painel (apoio, não caminho crítico)
- [ ] **Autenticação obrigatória** (link mágico ou OAuth, sessão curta, `panel_users`) — página pública com PII
- [ ] Fila de rascunhos: contexto consolidado + histórico + **resposta pré-redigida** (aprovar num toque ou editar)
- [ ] **Ordenação por tempo até janela de 24h fechar** (não por chegada)
- [ ] Contador de expiradas + fila não limpa no dia
- [ ] Ficha do contexto coletado (montar proposta rápido)

### 3.4 Notificação
- [ ] **WhatsApp pessoal do Cadu** (não web push — instável no iOS): sistema manda mensagem no aparelho que ele já olha

### 3.5 Fallback degradado
- [ ] Se painel falhar/indisponível: "escalar" = bot silencia, Cadu responde pelo app

**Aceite Fase 3:** número real com coexistência estável, sem respostas duplas bot×humano, painel autenticado priorizado por janela.

---

## Fase 4 — Funil + métricas (adiado até haver volume)

- [ ] Funil de lead: `novo → qualificado → orcamento_enviado → fechado | perdido`
- [ ] Tags de intenção, deflexão, dashboards
- [ ] Nada disso antes de uso real

---

## LGPD (transversal, não opcional)

- [ ] Opt-out por palavra-chave no webhook, antes do modelo
- [ ] Registro de consentimento no 1º contato
- [ ] Política de retenção com prazo definido (conversas/mídia expiram após N meses)
- [ ] Identificação como automatizado na 1ª mensagem
- [ ] Política de privacidade publicada (base legal + caminho de exclusão a pedido)

---

## Estrutura do prompt do bot (ordem para o cache funcionar)

```
[BLOCO ESTÁVEL — cacheado, TTL 1h, breakpoint aqui]
  1. Papel e regras duras (é bot, escopo, o que NÃO responde)
  2. Regras da janela de 24h e teto de perguntas
  3. FAQ inteiro (saída do extrator MDX — frontmatter + texto limpo)
  4. Descrição de cada tool e quando usar
  5. Política de mídia e de sinalização de prazo

[BLOCO VOLÁTIL — fora do cache]
  6. Contexto já coletado deste lead (campos preenchidos)
  7. Histórico da conversa
  8. Mensagem atual do lead   ← nunca dentro do breakpoint de cache
```

Regra de ouro: **timestamp e mensagem do lead ficam sempre fora do bloco cacheado**, senão cada requisição vira cache miss pagando prêmio de escrita.

---

## Stack consolidada

| Camada | Escolha |
|---|---|
| Site + backend + painel | Um projeto Next.js (App Router) + TS + Tailwind |
| Conteúdo | MDX no repo + extrator para o prompt |
| WhatsApp | Cloud API (Meta) direto, com coexistência |
| LLM | Claude API — Sonnet 5 tempo real, Opus 5 rascunhos |
| Banco | PostgreSQL |
| Agendamento | `node-cron` no processo Node |
| Hospedagem | Railway (ou Fly.io) — **não Vercel** |

**Não construir:** RAG/pgvector, Redis, n8n, BSP, libs não-oficiais (Baileys/whatsapp-web.js), métricas de funil antes de uso.
