# Doutor Igreja — Especificação do Projeto

**Revisão 2** — incorpora avaliação técnica, com verificação em documentação oficial dos pontos marcados como não confirmados.

Documento de contexto para desenvolvimento assistido. Cobre o site institucional, o agente de atendimento no WhatsApp e o painel de apoio.

---

## 0. O que mudou nesta revisão

Dois fatos foram verificados em fonte oficial e mudaram premissas centrais da revisão 1:

**1. A coexistência WhatsApp Business App + Cloud API existe e está ativa no Brasil.** A revisão 1 afirmava que o app morre quando o número migra. Isso está desatualizado. A Meta lançou o recurso (nome oficial: "API Solutions for Business App Users") em maio de 2025, e a disponibilidade no Brasil foi confirmada em abril de 2026 — hoje está liberado globalmente. O app e a Cloud API operam no mesmo número com sincronização bidirecional em tempo real. **Isso reduz muito o escopo da Fase 3 e elimina o bug de ordem das fases.** Detalhes e ressalvas na §5.

**2. Os números de prompt caching e o comportamento do Opus 5 estão confirmados** na documentação da Claude API — com uma discordância sobre qual modelo usar, na §6.

Correções incorporadas do resto da avaliação: ordem das fases, SEO da marca, aritmética da janela de 24h, mecânica de webhook, concorrência, mídia, modelo de dados, autenticação do painel, LGPD, custo e a inconsistência Vercel + node-cron.

---

## 1. Contexto do negócio

**Cliente:** Cadu Aranha — consultor de áudio e vídeo, atende principalmente igrejas.

**Perfil:** natural de Campinas, pós-graduado em Fotografia e Audiovisual, formado em Produção Musical. Diretor técnico e técnico de áudio, com passagem pelo SESC/SP e experiência em grandes shows e eventos. Hoje é responsável por equipes de som e transmissão ao vivo em várias igrejas de São Paulo. Ministra cursos e treinamentos de sonorização pelo Brasil.

**Serviços:** consultoria, projetos, instalação de sistemas, assessoria em importação de equipamentos, mão de obra especializada, treinamento e capacitação de equipes, transmissões ao vivo, produção de eventos.

**Produto digital:** curso online "Fundamentos de Áudio — Básico" (marca "Áudio na Igreja").

**Presença:** podcast/canal no YouTube "Doutor Igreja" (episódios numerados), Instagram e Facebook como "Cadu Aranha - Áudio Profissional". Site atual em `caduaranha.com.br`, desenvolvido por terceiro.

**Contato atual:** (11) 98783-7773 · atendimento@caduaranha.com

### O problema a resolver

A dor não é volume de mensagens — é **disponibilidade**. O trabalho de consultoria e operação exige atenção total presencial, então as conversas de WhatsApp ficam abandonadas durante o dia. Mensagens chegam em horários muito variados, incluindo noite e fim de semana, que é justamente quando igreja toma decisão (reunião de domingo, ensaio de quarta).

**Métrica-alvo: tempo até a primeira resposta (TTFR).** Não taxa de resolução automática. Quem manda mensagem às 10h e recebe silêncio até as 22h já procurou outro fornecedor.

TTFR não é dashboard — é **critério de aceite**, instrumentado desde o dia 1 com dois timestamps e uma query. O que fica para depois é analytics de funil, tags e gráficos (§11).

**Restrição aceita:** a resposta humana pode levar cerca de 1 dia, desde que o bot sinalize isso com clareza no primeiro contato.

---

## 2. Decisão de posicionamento (bloqueia o design)

O site atual é posicionado em **evento** e atende igreja, banda, show e empresa. "Doutor Igreja" é marca de **nicho de igreja**. Adotá-la como marca principal significa abandonar publicamente os outros segmentos.

### O problema de SEO da marca

"Doutor da Igreja" é uma categoria teológica consagrada — Santo Agostinho, São Tomás de Aquino, Santo Ambrósio. Existe um corpus enorme, antigo e com autoridade de domínio altíssima ocupando exatamente esse termo. Competir por SERP nesse termo é competir contra enciclopédia católica e site de diocese.

Isso não invalida a marca — o podcast já roda com esse nome e funciona por outros canais. Mas define a estratégia:

- **O tráfego orgânico não virá de busca pela marca.** Virá de long tail de sintoma: "sonorização para igreja", "som da igreja embolado", "microfone microfonando na igreja", "como transmitir culto ao vivo", "quanto custa sonorizar uma igreja".
- **Logo, o SEO é 100% orientado a sintoma, não a marca.** Isso promove a seção "Problema/diagnóstico" da §4 de recurso de copy a espinha dorsal da estratégia de conteúdo.
- Busca pela marca serve só para quem já ouviu o podcast. Converte muito bem, mas é pequeno e não escala sozinho.

### Alternativas

- **A — Rebrand total.** Doutor Igreja como marca única, foco exclusivo em igreja. Posicionamento mais forte, FAQ e bot muito mais simples. Custo: perde trabalho corporativo/eventos, que costuma pagar melhor por job.
- **B — Duas marcas.** `doutorigreja.com.br` para igreja, `caduaranha.com.br` para evento e corporativo. **O custo de manutenção aqui é baixo** — um único projeto Next.js serve dois domínios por roteamento de hostname, mesmo MDX, mesmo deploy. O custo real de B é posicionamento e atenção dividida, não infraestrutura.
- **C — Doutor Igreja como sub-marca** apenas de conteúdo e cursos, com Cadu Aranha seguindo como marca de serviço.

Recomendação: **A**, com **B** mais forte do que parecia — corrigido o custo de manutenção, B preserva a receita corporativa sem diluir o posicionamento de igreja. A decisão depende de quanto do faturamento dele vem de fora de igreja hoje. **Perguntar isso antes de decidir.**

### Migração de domínio

Rebrand exige **301 de `caduaranha.com.br` para o novo domínio**, rota a rota. O site atual tem histórico e backlinks; abandonar sem redirecionar joga isso fora. Mapear as URLs existentes antes de derrubar qualquer coisa.

### Ações imediatas

- Registrar `doutorigreja.com.br` e variações (`.com` e `.live` estavam livres em consulta recente)
- Confirmar quem tem acesso ao domínio e à hospedagem atuais
- Levantar as URLs atuais de `caduaranha.com.br` para o mapa de 301
- Padronizar o domínio de e-mail (hoje o site é `.com.br` e o e-mail é `.com`)

---

## 3. Fases

| Fase | Entrega |
|---|---|
| 0 | Verificações e dependências de prazo longo |
| 1 | Site institucional com FAQ estruturado |
| 2 | Bot em número de teste, respondendo dúvida operacional + sinalização de prazo |
| 3 | Coexistência ativada no número real + painel de apoio |
| 4 | Pipeline de lead, métricas de funil |

### Fase 0 — antes de qualquer código

Dependências com prazo externo, todas paralelizáveis:

1. **Validar a coexistência na conta específica do Cadu.** O recurso existe e está no Brasil, mas confirmar que se aplica ao número dele. Regra crítica: só funciona para número **já registrado no WhatsApp Business app** — não funciona no sentido inverso. Se o número for para a Cloud API primeiro, a coexistência não pode mais ser ativada.
2. **Verificação de negócio na Meta** (CNPJ) e aprovação do display name. Leva dias.
3. **Submeter os templates** (§5). É a dependência mais longa do projeto.
4. **Fechar a decisão A/B/C da §2** com o dado de faturamento por segmento.
5. **Levantamento de conteúdo com o Cadu** (§12).

### Por que o bot nasce em número de teste

Mesmo com a coexistência eliminando o risco de o Cadu ficar sem interface, um número separado na Fase 2 permite testar com tráfego real sem apostar a operação. Os CTAs do site novo apontam para ele; o número atual segue intacto até a Fase 3 estar estável.

A Meta oferece número sandbox para desenvolvimento — usar antes mesmo do número separado, senão o primeiro teste real é com cliente.

---

## 4. Fase 1 — Site institucional

### Princípio central

**Construir o site a partir do FAQ, não colar um FAQ num site pronto.** Cada pergunta bem respondida no site é uma mensagem que não chega no WhatsApp, ou que chega já qualificada.

### Problemas do site atual a corrigir

1. **Hero desperdiçado.** O primeiro scroll inteiro é logo sobre padrão hexagonal e uma seta para baixo. Zero informação.
2. **Serviços sem descrição.** Oito ícones com uma palavra cada. O visitante não consegue se auto-qualificar. É daí que sai o WhatsApp lotado de "o que exatamente vocês fazem?".
3. **Sem preço.** Mesmo uma faixa ("projetos a partir de R$X") filtra volume grande de contato desqualificado.
4. **Sem prova social.** Nenhum caso, depoimento, logo ou foto de instalação. Comprador de igreja é comitê, e comitê compra confiança.
5. **Sem FAQ.**
6. **Conteúdo enterrado.** O podcast é o motor de autoridade e a principal fonte de lead; virou item de menu chamado "Artigos".
7. **Contato genérico.** Telefone e e-mail soltos.

### Estrutura

- **Hero** — proposta de valor específica para igreja + CTA principal
- **Problema/diagnóstico** — os sintomas que a igreja reconhece. **Espinha dorsal do SEO** (§2): cada sintoma vira página ou seção indexável com a linguagem que a pessoa usa na busca
- **Serviços** — cada um com descrição real, público, entregável e faixa de investimento
- **Prova** — casos, antes/depois, depoimentos, igrejas atendidas
- **Curso** — página própria com ementa, duração, formato, preço, para quem serve
- **Conteúdo** — últimos episódios do podcast em destaque
- **FAQ** — a seção mais importante do projeto
- **Contato** — CTAs para WhatsApp com contexto

### CTAs com contexto

Todo CTA é link `wa.me/55DDDNUMERO?text=<mensagem pré-preenchida>`, com texto diferente por seção. O bot já sabe de onde a pessoa veio e pula uma rodada — que, no cenário de ~1 dia por rodada, vale um dia inteiro.

### Stack

- **Next.js** (App Router) + TypeScript + **Tailwind**
- Conteúdo em **MDX no repositório** — sem CMS. O mesmo arquivo alimenta o site e o prompt do bot.
- **Etapa de extração obrigatória:** MDX cru carrega JSX (`<Callout>`, `<ServiceCard>`) que vira ruído no prompt. Escrever um extrator que produz frontmatter + texto limpo — é essa saída que entra no prompt, não o arquivo bruto.
- Atenção ao `metadataBase` para as URLs canônicas ficarem corretas

### Direção visual

O site atual é fundo quase preto com acento laranja — o default mais comum de site técnico, que não diz nada sobre o assunto.

Antes de codar, montar um plano de design curto (paleta de 4–6 hex nomeados, pareamento de display + corpo, conceito de layout, e um elemento de assinatura), revisar contra este briefing e só então implementar. O mundo do assunto tem vocabulário visual próprio e pouco explorado: faders e cursores, escalas de VU e headroom, curvas de EQ, plantas de cobertura acústica, cabo e patchbay, a geometria de um templo. Procurar a assinatura ali, e gastar ousadia num lugar só.

Piso de qualidade sem anunciar: responsivo até mobile, foco de teclado visível, `prefers-reduced-motion` respeitado.

---

## 5. Fase 2 — Agente de WhatsApp

### Acesso à API

**WhatsApp Cloud API (Meta), direto.** Não usar BSP: a interface necessária aqui não é inbox de live chat, e o custo por mensagem é menor no acesso direto.

**Não usar bibliotecas não-oficiais** (Baileys, whatsapp-web.js). Violam os termos e o número pode ser banido.

### Coexistência — premissa corrigida

O app WhatsApp Business **não morre**. Com a coexistência ativada, o Cadu continua respondendo pelo celular como sempre, e o sistema opera no mesmo número em paralelo, com sincronização bidirecional em tempo real.

Consequências de arquitetura:

- **O painel deixa de ser caminho crítico.** Vira ferramenta de apoio (rascunhos, alertas de janela, contexto consolidado), não a única porta de entrada. O escopo da Fase 3 cai bastante.
- **A escalação ganha um caminho degradado trivial.** Se o painel não estiver pronto ou falhar, "escalar para humano" pode significar simplesmente o bot ficar em silêncio e o Cadu responder pelo app. É o fallback que a revisão 1 não tinha.

Ressalvas verificadas, todas com impacto operacional:

- **Só funciona a partir de número já registrado no app.** Não funciona no sentido inverso.
- **Se o app ficar mais de 14 dias sem ser aberto, a conexão da API é cortada.** Documentar para o Cadu e prever alerta se não houver atividade do app.
- **O display name pode não aparecer no cabeçalho** para contatos novos, que veriam só o número. Verificar e corrigir na configuração.
- **Listas de transmissão e mensagens temporárias deixam de funcionar** no fluxo integrado.

### Concorrência humano × bot

Com os dois ativos no mesmo número, existe risco de o Cadu estar digitando no app enquanto o bot responde — duas respostas simultâneas e possivelmente contraditórias.

Mitigação: quando chegar pelo webhook uma mensagem **outbound originada no app**, marcar a conversa como `humano_ativo` por 30–60 min e suprimir a resposta automática nesse período. O bot volta ao normal depois, ou quando o Cadu liberar no painel.

### A janela de 24 horas

A Cloud API só permite mensagem de formato livre dentro de **24h desde a última mensagem do lead**. Passado isso, apenas template pré-aprovado, pago por envio.

A aritmética é mais apertada que "triagem de manhã resolve":

> Mensagem às 09h30 de segunda → janela expira 09h30 de terça. Triagem começando 09h00 de terça deixa **30 minutos** de folga.

Três mecanismos:

**1. O bot sempre encerra com pergunta, nunca com afirmação — com teto.** Toda resposta do lead reinicia a janela do zero. Em vez de "o Cadu te retorna amanhã", usar "enquanto isso, me conta: qual o tamanho aproximado do templo?". Coleta contexto e compra 24h na mesma jogada.

Mas com limite, senão degrada em interrogatório e fica evidente que é robô:
- Agressivo nos 2–3 primeiros turnos
- Depois, só pergunta quando houver campo relevante ainda vazio
- **Nunca** pergunta logo após redirecionar uma dúvida técnica — ali a pergunta lê como esquiva
- Quando o lead já respondeu tudo, encerrar com a sinalização de prazo e ponto

**2. Horário de triagem fixo e cedo — 07h30.** Explícito, não "de manhã".

**3. O alerta de 6h dispara template automático, não notificação humana.** Se a janela vai fechar e a fila não foi limpa, o sistema manda o template sozinho. Notificar um humano com 6h de antecedência às 03h30 é inútil. Prometer e não cumprir é pior que não prometer — o mecanismo tem que ser automático.

### Templates — risco de categoria

A Meta é restritiva com a categoria **utility**: exige relação com transação ou solicitação existente. Um template genérico ("oi, ainda estamos analisando seu pedido") tem chance real de ser reclassificado como **marketing**, que tem preço diferente e exige opt-in.

Ação: submeter na Fase 0, redigidos como follow-up de solicitação concreta do próprio lead (ele pediu orçamento → é solicitação em andamento). Ter plano B se vierem reclassificados.

**Confirmar a tabela de preços atual da Meta para o Brasil.** A precificação por mensagem mudou em 2025 e novamente em julho de 2026 — não planejar em cima de memória.

### Escopo do que o bot responde

**Responde sozinho:** perguntas operacionais — o que é cada serviço, como funciona uma visita técnica, região de atendimento, formato e preço de curso, como contratar, prazos.

**Não responde sozinho:** dúvida técnica de áudio. Dois motivos:

- **Risco de alucinação onde mais dói.** Specs, potência, impedância e acústica são exatamente o que o modelo erra com confiança. O produto do Cadu é a autoridade técnica dele.
- **Canibaliza o que ele vende.** Consultoria e curso *são* esse conhecimento.

Em pergunta técnica, redireciona para o episódio pertinente do podcast ou para a consultoria paga. Rascunho de resposta técnica só sai com aprovação.

**Regra dura, não decisão do modelo:** "quero falar com uma pessoa" e variações escalam imediatamente, sem passar pelo julgamento do LLM.

### Coleta de contexto

Como cada ida-e-volta custa um dia, coletar **agressivamente**. Objetivo: o Cadu abrir e já conseguir mandar proposta fechada, sem abrir três dias de ping-pong.

Campos: nome, cidade, nome/tipo da igreja, tamanho aproximado do espaço e da congregação, equipamento atual, problema relatado, urgência, orçamento aproximado, se já tem equipe técnica.

Uma pergunta por mensagem, sempre como fechamento — respeitando o teto acima.

### Mídia — crítico neste domínio

Consultoria de áudio é o caso extremo: o lead vai mandar **foto do rack** e **áudio do problema**. Não tratar é pior que tratar mal — a pessoa manda a foto, o bot ignora, e a percepção de que tem alguém do outro lado quebra na hora.

- **Foto** responde sozinha "qual equipamento você tem hoje", um dos campos de coleta. Vale muito.
- **Voice note** é o formato nativo de quem está dentro de uma igreja.

Mínimo viável: baixar da Media API, guardar referência, responder "recebi a foto, o Cadu vai olhar" — sem interpretar. Ideal: imagem via visão do modelo, áudio via transcrição.

### Sinalização de prazo

Obrigatória no primeiro contato, com promessa conservadora: **"até amanhã de manhã"**, não "em até 24 horas". Fica dentro do limite técnico com folga e é mais concreto.

O bot também **se identifica como automatizado logo de cara**. Além de transparência, melhora a percepção quando ele erra.

### Orquestração

Não usar n8n. A orquestração é o próprio backend: webhook chega numa rota, monta o histórico, chama a Claude API com tool use, recebe qual ferramenta chamar e executa.

### Mecânica de webhook — o que sempre quebra

Nada disso é opcional:

- **Verificação de assinatura** `X-Hub-Signature-256` em todo POST, e o handshake GET com `verify_token`. Sem isso o endpoint é público e injetável.
- **Deduplicação por `wa_message_id`.** A Meta reenvia webhooks. Sem dedupe, o lead recebe resposta dupla.
- **Callbacks de status** (`sent`/`delivered`/`read`/`failed`) chegam no mesmo webhook e precisam ser distinguidos de mensagens de entrada.
- **Retry com idempotência** no envio quando a API da Meta falha, senão o fallback duplica.
- **Responder 200 rápido** e processar assíncrono — a Meta trata timeout como falha e reenvia.

### Concorrência de mensagens

No WhatsApp as pessoas mandam três mensagens curtas seguidas. Sem tratamento, cada uma dispara uma chamada à Claude API em paralelo sobre o mesmo histórico → duas ou três respostas do bot, cada uma terminando com uma pergunta diferente. É o defeito mais visível que o produto pode ter.

Solução: **debounce por conversa** (aguardar 5–10s sem nova mensagem antes de processar) + **lock por `conversation_id`**. Cerca de 30 linhas.

### Outros itens do WhatsApp

- **Grupos não são suportados pela Cloud API.** Comitê de igreja vai querer adicionar o número num grupo. Precisa de resposta prevista, no FAQ do site e, se possível, aviso automático.
- **Tier de mensagens:** número não verificado começa limitado (ordem de 250 conversas únicas/24h). Suficiente aqui, mas monitorar.
- **Quality rating:** template mal calibrado derruba a nota e reduz o limite de mensagens.
- **Timezone:** `America/Sao_Paulo` explícito em toda lógica de janela e horário; armazenar em UTC. Bug clássico.

### O que NÃO construir

- **RAG com pgvector.** A base de um consultor único fica entre 20 e 50 perguntas. Cabe inteira no prompt. Reavaliar só se passar de algumas centenas de itens.
- **Redis.** Volume baixo e as mensagens já estarão no Postgres.

---

## 6. Camada Claude API

### Modelo — discordância com a avaliação

A avaliação recomenda `claude-opus-5` como padrão, argumentando que a conversa representa a autoridade técnica do cliente. **Esse argumento contradiz a própria decisão de escopo:** o bot explicitamente *não* responde dúvida técnica. A tarefa em tempo real é consultar um FAQ de 20–50 itens, responder pergunta operacional e fechar com uma pergunta. Não exige o modelo mais capaz, e o modelo mais capaz custa latência — que é justamente a métrica-alvo (§1).

**Roteamento por caminho, não modelo único:**

| Caminho | Modelo | Razão |
|---|---|---|
| Resposta em tempo real ao lead | `claude-sonnet-5` | Tarefa simples, latência importa (TTFR), custo menor |
| Rascunho para o Cadu aprovar | `claude-opus-5` | Assíncrono (latência irrelevante), qualidade importa, sai assinado como ele |

Rodar eval com Sonnet 5 antes de fixar. Se a qualidade não segurar no caminho em tempo real, subir para Opus 5 — mas partindo do barato e rápido, não do contrário.

### Effort e max_tokens

No Opus 5, **thinking está ligado por padrão** e o effort padrão é `high`. `max_tokens` é teto de **thinking + resposta juntos** — valor apertado trunca a resposta no meio.

- Caminho em tempo real: `output_config: { effort: "low" }` ou `"medium"`, `max_tokens` folgado
- Caminho de rascunho: effort padrão serve
- **Não combinar** `thinking: {"type":"disabled"}` com effort `xhigh`/`max` no Opus 5 — retorna 400
- Mudar effort no meio da conversa invalida o cache: fixar um nível por caminho

### Stop reasons

O Opus 5 pode retornar `stop_reason: "refusal"` com HTTP 200 e `content` vazio. Código que lê `content[0]` direto quebra. **Checar `stop_reason` antes de ler o conteúdo**, tratando `refusal` e `model_context_window_exceeded` pelo mesmo caminho de fallback do timeout (§11).

### Prompt caching — TTL de 1 hora, não o padrão

Números confirmados na documentação:

| Item | Valor |
|---|---|
| Escrita, TTL 5min | 1,25× o input base |
| Escrita, TTL 1h | 2× o input base |
| Leitura | 0,1× o input base |
| Mínimo cacheável, Opus 5 | 512 tokens |
| Mínimo cacheável, Sonnet 5 | 1.024 tokens |

O padrão de tráfego aqui é esparso — mensagens espalhadas ao longo do dia. Com TTL de 5 minutos, boa parte das requisições é cache miss pagando o prêmio de escrita sem nunca ler: **caching mal configurado sai mais caro que não cachear.**

Usar `"cache_control": { "type": "ephemeral", "ttl": "1h" }`. Cobre o padrão real: o lead responde em minutos, então 3–5 mensagens da mesma conversa leem o mesmo prefixo.

Uma base de FAQ de 20–50 perguntas passa dos mínimos com folga nos dois modelos. Ainda assim, **verificar `usage.cache_read_input_tokens` em produção** — se vier zero de forma consistente, o cache não está funcionando e o custo sobe em silêncio.

Colocar o breakpoint no último bloco **estável** (fim do FAQ + instruções), nunca no bloco que contém a mensagem do lead ou um timestamp.

### Tools

```
save_lead_info(campo, valor)         — grava contexto coletado
update_lead_stage(stage)             — move o lead no funil
log_unanswered_question(pergunta)    — registra lacuna na base de conhecimento
escalate_to_human(motivo, resumo)    — marca para o painel
```

**`get_service_info` foi removida.** A revisão 1 tinha duas arquiteturas no mesmo parágrafo: dizia que o conteúdo cabe inteiro no prompt e, ao mesmo tempo, criava uma tool para buscá-lo. Se está no prompt cacheado, a tool só adiciona um round-trip (≈ dobro da latência) para buscar algo que o modelo já tem. Conteúdo inteiro no prompt, sem tool de consulta.

`log_unanswered_question` é o que faz a base melhorar com o tempo. Sem ela, não há como saber onde o FAQ tem buraco.

---

## 7. Fase 3 — Painel de apoio

Com a coexistência ativa, o painel **não é mais a única interface**. O Cadu responde pelo app quando quiser; o painel existe para o que o app não faz.

### O que o painel entrega

- **Fila de rascunhos** — conversas aguardando resposta, cada uma com contexto consolidado, histórico e **resposta já redigida** para aprovar com um toque ou editar
- **Ordenação por tempo até a janela de 24h fechar**, não por ordem de chegada
- **Contador de conversas expiradas** e de fila não limpa no dia
- Ficha do contexto coletado pelo bot, para montar proposta rápido

### Autenticação

Não é opcional. É uma tela pública na internet com PII de clientes e histórico de conversas — usuário único não dispensa auth. Link mágico ou provider OAuth, sessão curta, tabela de usuários do painel (§8).

### Notificação

**Não depender de web push.** Se o Cadu usa iPhone, web push exige PWA instalado na tela de início (iOS 16.4+) e é notoriamente instável — permissão que some, entrega que atrasa. E é o canal que avisa sobre janela prestes a fechar.

Alternativa robusta e quase grátis: **o próprio sistema manda mensagem no WhatsApp pessoal do Cadu**. A infraestrutura já existe, chega no aparelho que ele já olha, e não depende de PWA.

---

## 8. Modelo de dados

```
contacts
  id, phone (UNIQUE, normalizado E.164), name, city, church_name,
  church_size, venue_size, current_equipment, reported_problem,
  urgency, budget_range, has_tech_team,
  lead_stage, opted_out_at,
  created_at, updated_at

conversations
  id, contact_id,
  state,                      -- aguardando_bot | aguardando_humano | humano_ativo | encerrada
  intent_tag,
  last_inbound_at,
  window_expires_at,          -- coluna gerada: last_inbound_at + interval '24 hours'
  created_at, updated_at

messages
  id, conversation_id, wa_message_id (UNIQUE), direction,
  origin,                     -- bot | painel | app_coexistencia | template
  body, media_url, media_type,
  state,                      -- draft | approved | sent | delivered | read | failed
  template_name, error_code,
  approved_by, approved_at, sent_at,
  created_at

unanswered_questions
  id, conversation_id, question, created_at, resolved_at

panel_users
  id, email, name, created_at, last_login_at

consents
  id, contact_id, kind, granted_at, revoked_at, source
```

Decisões que corrigem a revisão 1:

- **`lead_stage` está em `contacts`, não em `conversations`.** Estágio de funil (`novo` → `qualificado` → `orcamento_enviado` → `fechado` | `perdido`) é atributo da oportunidade. A conversa tem estado operacional, que é outra coisa.
- **`messages.state` é enum único**, substituindo `is_draft` + `approved_by_human` + `sent_at`, que permitiam combinações inválidas (`is_draft=true` com `sent_at` preenchido).
- **`approved_by` é id de usuário**, não booleano. Auditoria de quem aprovou o quê importa quando o texto sai assinado como o Cadu.
- **`window_expires_at` é coluna gerada e indexada** (`GENERATED ALWAYS AS (last_inbound_at + interval '24 hours') STORED`), não campo escrito à mão — senão diverge.
- **`wa_message_id` UNIQUE** é o que faz o dedupe de webhook funcionar.
- **`messages.origin`** distingue mensagem enviada pelo bot, pelo painel e pelo app do Cadu — necessário para a lógica de `humano_ativo` (§5).

---

## 9. Stack consolidada

| Camada | Escolha |
|---|---|
| Site + backend + painel | Um projeto Next.js (App Router) + TypeScript + Tailwind |
| Conteúdo | MDX no repositório + extrator para o prompt |
| WhatsApp | Cloud API (Meta), direto, com coexistência |
| LLM | Claude API — Sonnet 5 em tempo real, Opus 5 nos rascunhos |
| Banco | PostgreSQL |
| Agendamento | `node-cron` no processo Node |
| Hospedagem | **Railway** (ou Fly.io) |

### Por que não Vercel

A revisão 1 tinha uma inconsistência: mandava deploy na Vercel e ao mesmo tempo `node-cron`. `node-cron` precisa de processo vivo; serverless na Vercel não tem. Vercel Cron existe, mas com limites de granularidade e de plano — e o cron aqui é justamente o que salva conversa de expirar. Não é lugar para descobrir limite.

**Railway com processo Node persistente**, Postgres gerenciado ao lado, `node-cron` funcionando de verdade, MDX acessível ao site e ao bot no mesmo repo. Simplifica o deploy mais do que separar.

---

## 10. Custo

Ordem de grandeza, para decidir se o projeto se paga. Cenário: 300 conversas/mês, 6 turnos por conversa, prompt de FAQ de ~5k tokens.

| Item | Estimativa |
|---|---|
| Claude API, tempo real (Sonnet 5, cache 1h) | ~US$ 10–15/mês |
| Claude API, rascunhos (Opus 5, ~100/mês) | ~US$ 5/mês |
| Hospedagem (Railway + Postgres) | ~US$ 20/mês |
| Mensagens Meta | **verificar tabela BR atual** |

Infraestrutura fica abaixo de US$ 50/mês nesse volume. **A restrição do projeto é tempo de construção, não custo de operação** — o que reforça cortar escopo agressivamente: nada de RAG, nada de Redis, nada de métrica antes de haver uso.

Duas ressalvas: o preço do Sonnet 5 sobe de US$ 2 para US$ 3 por milhão de tokens de input a partir de 1º de setembro de 2026; e a precificação de mensagem da Meta mudou em 2026 e precisa ser confirmada para o Brasil na Fase 0.

---

## 11. LGPD, falhas e testes

### LGPD — especificado, não só mencionado

- **Opt-out por palavra-chave** (`PARAR`, `SAIR`) tratado no webhook, antes de qualquer chamada ao modelo. Grava `opted_out_at` e encerra.
- **Registro de consentimento** no primeiro contato, na tabela `consents`.
- **Política de retenção com prazo definido** — conversas e mídia expiram após N meses.
- **Identificação como automatizado** na primeira mensagem.
- Política de privacidade publicada no site, com base legal e caminho de exclusão a pedido.

### Falha do bot

Se a Claude API cair, der timeout ou retornar `refusal`, precisa haver resposta de fallback que reconheça a mensagem e sinalize o prazo. **Silêncio é o pior resultado possível** — é literalmente o problema que o projeto existe para resolver.

### Testes

- Número sandbox da Meta durante o desenvolvimento
- Número separado na Fase 2, antes de tocar o número real
- Suíte cobrindo: dedupe de webhook, debounce de rajada, expiração de janela, supressão por `humano_ativo`, e o caminho de fallback

### Métricas — o que instrumentar quando

- **Desde o dia 1, como critério de aceite:** TTFR, taxa de conversas expiradas, taxa de fallback acionado
- **Depois, quando houver volume:** funil de lead, tags de intenção, deflexão, dashboards

---

## 12. Levantamento pendente com o Cadu

Nada da base de conhecimento deve ser inventado.

- **Perguntas frequentes reais**, extraídas do histórico de WhatsApp e Instagram dos últimos meses
- **Percentual do faturamento vindo de fora de igreja** — decide A vs. B na §2
- **Faixas de preço** que ele aceita publicar, por serviço
- **Região de atendimento** — presencial versus remoto, e o que muda
- **Casos e depoimentos** liberados, com fotos de instalações
- **Ementa e formato do curso** — duração, preço, público
- **Quanto tempo depois de mandar mensagem uma pessoa desiste** — calibra o quão completa a resposta automática precisa ser
- **Confirmar que o número está no WhatsApp Business app** e não na API — pré-requisito da coexistência
