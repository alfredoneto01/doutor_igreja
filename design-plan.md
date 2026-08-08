# Plano de Design — Doutor Igreja (Fase 1.3)

> Curto de propósito. Revisar contra o briefing (§4) e só então implementar a UI (Fase 1.4).
> Decisão de marca já tomada: **A — Rebrand total**, nicho exclusivo de igreja.

## Conceito

**"Sala de controle dentro de um templo."** O cruzamento entre a autoridade
técnica do Cadu (console, medição, cobertura acústica) e o lugar onde isso
acontece (a nave, a geometria do templo). O comprador é comitê de igreja, e
**comitê compra confiança** — então o tom é sóbrio e editorial, não "gamer dark".

Fugir explicitamente do que o briefing condena: fundo quase preto + laranja neon
(o default técnico genérico). Inclusive do âmbar-sobre-grafite — é o mesmo clichê.

## Onde gastar a ousadia (um lugar só)

**Curvas de cobertura acústica** — arcos concêntricos de SPL irradiando de um
ponto (a caixa/o púlpito) sobre a planta da nave. É o elemento de assinatura:
- Fundo do Hero (sutil, grande, atrás do texto)
- Divisor entre seções (uma linha de arcos finos)
- Motivo dos ícones de serviço

Une áudio (isóbaras/cobertura) + igreja (planta do templo) num só símbolo, e é um
vocabulário quase não explorado por concorrentes.

## Paleta (6 hex nomeados)

Testada para contraste AA em corpo de texto nos dois temas.

| Token | Nome | Light | Dark | Uso |
|---|---|---|---|---|
| `background` | Nave | `#F7F3EC` (papel quente) | `#12141A` (sala de controle) | fundo |
| `foreground` | Grafite | `#20242C` | `#EDEBE6` | corpo de texto |
| `primary` | Púlpito | `#22344F` (índigo profundo) | `#9DB4D6` (índigo claro) | marca, títulos-âncora, links |
| `accent` | Latão | `#B4802F` (brass/dourado) | `#D6A24E` | a ousadia: arcos de cobertura, CTA, kicker |
| `muted` | Bruma | `#ECE6DB` | `#20242C` | superfícies secundárias |
| `border` | Traço | `#DAD2C4` | `#2A2E37` | bordas, divisores |

- **Índigo "Púlpito"** carrega confiança/arquitetura (vitral sem ser literal).
- **Latão** é a única cor quente e vem no lugar do laranja clichê — evoca metal de
  instrumento e knob analógico, com dignidade. Aparece pouco e sempre com peso.

## Tipografia

- **Display (títulos):** serifada com voz editorial — **Source Serif 4** (já ligada).
  Autoridade, tradição, legibilidade em peso alto.
- **Corpo:** **Inter** — neutra, ótima em telas, excelente em pt-BR.
- **Técnica (kickers, labels, números):** **JetBrains Mono** em maiúsculas espaçadas,
  como etiqueta de console (`SONORIZAÇÃO · PROJETO`). `tabular-nums` em valores.

Par já configurado no `layout.tsx`; a Fase 1.3 só troca os tokens de cor
(placeholder → definitivos) e adiciona o motivo de cobertura.

## Layout

- Grid editorial, respiro generoso, medida de leitura ~65ch.
- Kickers em mono uppercase (etiqueta de console) abrindo cada seção.
- Hero: proposta de valor específica para igreja + CTA WhatsApp, arcos de
  cobertura em latão sobre a nave ao fundo.
- Cartões de serviço com faixa de investimento visível (filtra contato desqualificado).

## Piso de qualidade (sem anunciar, §4)

Responsivo até mobile · foco de teclado visível · `prefers-reduced-motion`
respeitado (arcos não animam se o usuário pediu menos movimento) · AA de contraste.
