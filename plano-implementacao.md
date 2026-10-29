# Plano de Implementação — Ecossistema Cadu Aranha / Webinho

> **Fonte de verdade:** documento Notion "Agente de Atendimento, Automações n8n e Arquitetura do
> Site — Ecossistema Cadu Aranha" (atualização 25/08/2026), transcrito em
> [`docs/contexto-ecossistema-cadu-aranha.md`](docs/contexto-ecossistema-cadu-aranha.md). Ele é posterior a
> `doutor-igreja-spec.md` (Rev. 2) e `plano-execucao.md` e **os substitui** onde houver conflito.
> A spec Rev. 2 continua válida como referência técnica da mecânica de WhatsApp/Claude (§5–6, §11).

---

## 1. Avaliação

### 1.1 O que mudou em relação ao repositório — três conflitos de base

| Tema | Repo (spec Rev. 2 / Fase 1 entregue) | Documento Notion (vigente) | Impacto |
|---|---|---|---|
| **Marca** | Decisão A: rebrand total, só "Doutor Igreja", abandona corporativo/eventos | Ecossistema de 3 frentes sob **Cadu Aranha Produções Audiovisuais**: Doutor Igreja, Estúdio Teia, produtora corporativa | Site atual precisa ser reestruturado (rotas, header, copy, design). Mapa 301 → `doutorigreja.com.br` deixa de fazer sentido. |
| **Orquestração** | "Não usar n8n" — backend Next.js próprio | **n8n** com 30 workflows | Muda a arquitetura do agente inteira. |
| **Dados** | PostgreSQL | **Notion** como base operacional (7 bases já existentes) | Notion não serve para o caminho quente (ver 1.3). |

Outros pontos do repo que ficaram **errados** frente ao documento:

- **Curso "Áudio na Igreja"** é vendido como disponível em `/curso` → o documento proíbe vender curso não lançado; deve virar "em desenvolvimento" com captura de interesse, ou sair do ar.
- **Serviços** (`sonorizacao`, `transmissao`) com faixa "a definir" → o produto de entrada agora é o **Check-Up** (4 modalidades, preços vigentes 2026 definidos). Projetos/implantação vêm depois, "por escopo".
- Hero fala em "Consultoria" → o documento proíbe "consultoria" como nome do Check-Up e as nomenclaturas antigas (Direcionado, 360, Lite, Full, Integrado, Visita Técnica).
- Agente: identidade agora é **Webinho**, assistente virtual da Cadu Aranha Produções, **sem menu de abertura**, com 4 universos (inclui contatos pessoais do Cadu).
- `.env.example` diz "aponta para número de teste" mas contém o número real.

### 1.2 O que está bom no documento

- **Regras comerciais e de comportamento estão prontas para virar código e testes**: catálogo com preços e vigência, 15 regras de conversa, 36 intenções, objeções com respostas-modelo, critérios de aceite em checklist (§17 e §36). Isso raramente vem tão bem especificado.
- **Estados da jornada** (§9) e **regras de progressão** ("não marcar pago por mensagem do cliente", "não enviar formulário antes de pagamento + agenda") são exatamente as invariantes que devem ser garantidas por código, não pelo LLM.
- **MVP explícito** (§41) e **padrões provisórios** (§40) que destravam o início sem esperar todas as decisões.
- Alinhado com a spec Rev. 2 em: transparência de IA, handoff com pausa do agente, LGPD/retenção, número único com roteamento silencioso.

### 1.3 Riscos e lacunas (o que o documento não resolve)

1. **Notion como banco transacional não funciona.** O caminho quente exige deduplicação por `message_id` (unicidade), lock por conversa, debounce de rajada, timers de 18h/24h/48h/72h e janela de 24h. A API do Notion tem limite baixo de requisições (~3 req/s), não tem constraint de unicidade nem transação. **Recomendação: Postgres para o operacional, Notion como espelho/CRM humano** (ver 2.1).
2. **30 workflows é escopo de produto maduro, não de MVP.** O §41 já corta; o plano abaixo mapeia o MVP para ~10 workflows.
3. **Score em 5 eixos calculado pelo LLM a cada mensagem** é instável (a nota oscila sem fato novo). O LLM deve **extrair sinais** (cargo, prazo, tipo de organização); a **nota é calculada em código** de forma determinística e auditável.
4. **Follow-ups de 7/15/30 dias e reativação de 180 dias caem fora da janela de 24h** → só por template pago, provavelmente categoria **marketing** (exige opt-in e custa mais). Precisa entrar no orçamento e na política de consentimento desde o início, não só na Fase 5.
5. **Universo 1 (pessoal) no mesmo número** é o maior risco de reputação: o bot responder à família do Cadu. Mitigação: **lista de contatos pessoais em que o Webinho nunca responde** (só registra/notifica), além da classificação WF-17.
6. **Coexistência App + Cloud API** (spec Rev. 2 §5) continua sendo pré-requisito: só ativa a partir do app → API, cai se o app ficar 14 dias sem abrir, e mensagens enviadas pelo Cadu no app precisam pausar o agente (o documento pede isso no §40).
7. **Dois prompts** (§7 e §33 "Prompt Mestre v2.0") — o v2.0 prevalece; consolidar num só, versionado no repo.
8. **Dias úteis e feriados** (SLA de relatório, gravação em 1 dia útil, lembretes) exigem calendário de feriados configurável — não existe ainda.
9. **Transcrição de áudio** (WF-30) precisa de serviço de transcrição separado e de regra de consentimento/retenção.
10. **Chat no site** (§35) duplica o canal e o esforço de moderação; adiar e usar `wa.me` com contexto.
11. **Modelos da spec Rev. 2 (Sonnet 5 / Opus 5) estão defasados** — a família atual é 5.5. Fixar via eval, não por suposição.

---

## 2. Arquitetura recomendada

### 2.1 Divisão de responsabilidades

```
WhatsApp Cloud API (coexistência)          Site Next.js (repo atual, reestruturado)
        │ webhook                                   │ CTAs wa.me?text=… + forms → webhook n8n
        ▼                                           ▼
   ┌──────────────────────── n8n (self-hosted) ────────────────────────┐
   │ WF-01 entrada → WF-02 classificação → WF especializado → resposta │
   │ crons: abandono (WF-23), resumo diário (WF-24), retenção (WF-16)  │
   └───────┬───────────────────────────┬───────────────────────┬──────┘
           ▼                           ▼                       ▼
   PostgreSQL (operacional)       Claude API              Notion (humano)
   mensagens, dedupe, locks,      Webinho + extração      Clientes/Igrejas, Oportunidades,
   estado, timers, scores,        de sinais + briefing    Tarefas, Check-Ups, Produtos e Preços
   catálogo cacheado, eventos
```

- **n8n** orquestra (exigência do documento). Self-hosted no Railway, com o **mesmo Postgres** como banco do próprio n8n.
- **Postgres** guarda tudo que precisa de unicidade, concorrência e tempo: `contacts`, `conversations`, `messages` (`wa_message_id UNIQUE`), `opportunities`, `tasks`, `events`, `scores`, `products` (cópia vigente). Reaproveitar o modelo da spec Rev. 2 §8 + campos do documento §12.
- **Notion** é onde o Cadu enxerga e edita: um workflow de **sincronização** (Postgres → Notion) escreve contatos, oportunidades e tarefas nas bases existentes. **Produtos e Preços** é o único fluxo inverso: o Cadu edita no Notion → n8n copia para Postgres (com vigência) → agente e site leem dali.
- **Regras duras em código, não no prompt:** opt-out, "quero falar com o Cadu", contato pessoal, pausa por humano ativo, bloqueio de formulário antes de pagamento + agenda, preço só se vigente na data.

### 2.2 Modelos (a validar com eval)

| Uso | Ponto de partida |
|---|---|
| Resposta em tempo real do Webinho | `claude-sonnet-5-5`, effort baixo/médio, cache 1h no bloco estável |
| Classificação/extração de sinais (WF-02, WF-18) | `claude-haiku-5-5` com saída estruturada; subir se errar |
| Briefing executivo, rascunhos para o Cadu, resumos | `claude-opus-5-5` (assíncrono) |

Mantém-se da spec Rev. 2: checar `stop_reason` antes de ler o conteúdo, fallback sem silêncio, breakpoint de cache antes do histórico/mensagem.

### 2.3 Site

Manter a base (Next.js 16 + Velite/MDX + componentes + extrator), reestruturando para o sitemap do documento §13 com **Alternativa A** (portal único com `/doutor-igreja`, `/estudio-teia`, `/solucoes`) como padrão provisório — fácil de dividir por hostname depois, se o Cadu escolher domínios separados. Preços do Check-Up vêm do catálogo (mesma fonte do agente), não de texto solto em MDX.

---

## 3. Plano por fases

Estimativas em ordem de grandeza para **um desenvolvedor**. As Fases 2 e 3 correm em paralelo.

### Fase 0 — Decisões e acessos (começa hoje, contínua)

Bloqueantes do documento §39 + o que o plano exige:

- [ ] **Confirmar com o Cadu a virada de A (só Doutor Igreja) → ecossistema** e a arquitetura n8n + Postgres + Notion espelho
- [ ] Domínio principal e estratégia de URLs (padrão provisório: portal único)
- [ ] Número de WhatsApp: confirmar que está no **WhatsApp Business App** (pré-requisito da coexistência); verificação de negócio Meta; número sandbox/homologação
- [ ] Submeter templates (utility: lembrete, confirmação, pendência do Cadu; marketing: follow-up/reativação com opt-in)
- [ ] Hospedagem n8n + Postgres (Railway) e responsável pela manutenção/backups
- [ ] Acesso de integração ao Notion **somente** às bases necessárias; exportar o schema real das 7 bases
- [ ] **Lista de contatos pessoais** (Universo 1) para silêncio automático
- [ ] Horário comercial, janelas de silêncio, feriados, canal dos resumos do Cadu
- [ ] Links de visita ao Estúdio Teia e de agendamento de gravação
- [ ] Ativos de marca (logos das 3 marcas, Webinho, fotos aprovadas)

### Fase 1 — Fundação (~1 semana)

- [ ] Railway: Postgres + n8n (produção e homologação separadas), credenciais só no n8n
- [ ] Schema Postgres (contatos, conversas, mensagens, oportunidades, tarefas, eventos, produtos com `vigencia_inicio/fim`, `status`, `aprovado_por`)
- [ ] Carga do catálogo: 4 Check-Ups 2026, Estúdio Teia, logística, workshops (referência interna, não cotação); reajuste 2027 cadastrado **inativo**
- [ ] Sync Notion "Produtos e Preços" → Postgres; sync Postgres → Notion (contatos, oportunidades, tarefas)
- [ ] Prompt Mestre v2.0 consolidado e versionado no repo (`/agent/prompt/`), com variáveis do §33
- [ ] **Suíte de avaliação**: ~60 conversas roteirizadas a partir das 36 intenções, 10 objeções e critérios §17/§36 (ex.: "abre sem menu", "não usa nome antigo", "não manda formulário antes do pagamento", "transfere 'quero falar com o Cadu' sem barreira"). Roda a cada mudança de prompt/modelo.

### Fase 2 — Webinho MVP (~3 semanas) — documento §41

| Workflow | Escopo no MVP |
|---|---|
| **WF-01** Entrada | assinatura, dedupe, normalização, debounce 5–10s + lock, status callbacks, mídia: "recebi" |
| **WF-17** Pessoal | allowlist + detecção → silêncio/notificação, sem comercializar |
| **WF-02** Classificação | universo + intenção (36) + confiança; baixa confiança → handoff |
| **WF-03** Doutor Igreja | recomendação de modalidade, preço vigente, sem fechamento automático |
| **WF-04 / WF-28** Estúdio Teia | preços de referência; visita ≠ gravação com links cadastrados |
| **WF-05** Corporativo | briefing progressivo → tarefa para o Cadu |
| **WF-18** Enriquecimento | extrai nome, organização, cargo, cidade |
| **WF-21** Briefing | resumo estruturado no formato do §31 |
| **WF-23** Abandono | 18h/24h/48h/72h **internos** (só para o Cadu), em horário útil |
| **WF-24** Resumo diário | um envio agrupado; alerta avulso só para crítico |
| **WF-15** Erros | fila de erros, retry só em transitório, alerta |
| **Handoff** | mensagem do Cadu no app → pausa do agente; retomada por comando/tempo |

Também: opt-out, consentimento, fallback sem silêncio, TTFR medido desde o primeiro dia.

**Aceite:** critérios §17 (Agente) + §36 passando na suíte de avaliação; teste com tráfego real no número de homologação antes do número principal.

### Fase 3 — Site MVP reestruturado (~2 semanas, em paralelo à Fase 2) — documento §41

- [x] Rotas: `/`, `/sobre-cadu`, `/doutor-igreja`, `/doutor-igreja/check-up` (+ 4 modalidades + `qual-escolher`), `/doutor-igreja/workshops`, `/estudio-teia` (gravação + eventos externos), `/solucoes`, `/podcast`, `/imprensa` (básico), `/contato`, `/politica-de-privacidade` *(29/10/2026)*
- [x] Header multimarcas (com menu mobile) + 3 portas de entrada na home (CTAs do §14)
- [x] Remover/neutralizar: curso à venda, "consultoria" como nome de produto, faixas "a definir"
- [x] Preços e prazos lidos do catálogo `lib/catalog.ts` (com vigência; 2027 cadastrado sem vigência)
- [x] CTAs `wa.me` com mensagem por contexto (§15)
- [x] Homologação não indexável (`NEXT_PUBLIC_ALLOW_INDEXING`) e 301 das rotas da Fase 1
- [ ] Conteúdo marcado como `<Pending>` (bio completa, fotos, portfólio, links sociais, detalhes por modalidade/workshop/solução)
- [ ] UTM/origem nos CTAs; formulários → webhook n8n com origem, URL, marca, consentimento
- [ ] Revisar o design: a paleta atual foi feita para marca única de igreja; precisa acomodar 3 marcas sob a assinatura institucional
- [ ] Redirects do site antigo `caduaranha.com.br` → novas rotas (o domínio provavelmente **continua**, mudam os caminhos)

**Aceite:** critérios §17 (Website), mobile ok, Lighthouse/SEO técnico ok.

### Fase 4 — Fechamento e operação (~3–4 semanas) — "Segunda etapa" do §41

WF-06 pagamento (gateway com Pix; confirmação só por webhook), WF-07 agenda + Meet, WF-08 logística assistida (cálculo parametrizado, aprovação humana), WF-09 formulário pós-contratação, WF-10 lembretes/no-show, WF-11 pós-atendimento, WF-12 relatório e SLA em dias úteis, WF-19 score completo (sinais por LLM, cálculo em código), WF-20 fadiga, WF-22 rascunhos assistidos, WF-25 resumo semanal, WF-30 transcrição, follow-up 7/15/30 dias (templates aprovados), WF-16 retenção de 90 dias.

### Fase 5 — Relacionamento e autoridade — "Terceira etapa" do §41

WF-13 recuperação, WF-26 reativação de 180 dias, WF-27 campanhas segmentadas, WF-14 imprensa/mídia kit/patrocínio, WF-29 alertas estratégicos, rotas complementares do Estúdio Teia (§35), portfólio, chat no site, dashboards de indicadores (§19).

---

## 4. Próximos passos imediatos

1. Validar com o Cadu os três conflitos da seção 1.1 (marca, n8n, Notion vs. Postgres).
2. Disparar a Fase 0 (WhatsApp/Meta e templates são as dependências mais longas).
3. Começar a Fase 1 e a suíte de avaliação; elas não dependem de nenhuma decisão pendente.
