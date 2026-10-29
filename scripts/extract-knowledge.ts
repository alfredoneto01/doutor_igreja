/**
 * Extrator de base de conhecimento para o prompt do bot (§4, §6).
 *
 * O MDX cru carrega JSX (<Callout>, <ServiceCard>) que vira ruído no prompt.
 * Este script lê os arquivos de conteúdo, separa o frontmatter e converte o
 * corpo em TEXTO LIMPO (sem JSX, sem formatação markdown). É essa saída que
 * entra no prompt do bot — nunca o arquivo bruto.
 *
 * Também exporta o catálogo comercial (lib/catalog.ts) — a fonte de verdade de
 * preços e prazos que o agente consulta (contexto §10). Preço nunca vem do MDX.
 *
 * Saídas (em /generated, fora do git):
 *   - knowledge-base.json  → FAQ estruturado, para consumo programático
 *   - catalog.json         → catálogo comercial com vigência (para o n8n/agente)
 *   - bot-knowledge.md     → bloco estável pronto para o prefixo cacheável
 *
 * Rodar: pnpm extract
 */
import { readdirSync, readFileSync, mkdirSync, writeFileSync, existsSync } from 'node:fs'
import { join, extname } from 'node:path'
import { fileURLToPath } from 'node:url'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkMdx from 'remark-mdx'
import stripMarkdown from 'strip-markdown'
import { visit } from 'unist-util-visit'
import type { Root } from 'mdast'
import * as catalog from '../lib/catalog'

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..')
const CONTENT_DIR = join(ROOT, 'content')
const OUT_DIR = join(ROOT, 'generated')

/** Remove nós MDX (JSX e expressões) antes de reduzir a texto puro. */
function removeMdxNodes() {
  return (tree: Root) => {
    const MDX = new Set([
      'mdxjsEsm',
      'mdxFlowExpression',
      'mdxTextExpression',
      'mdxJsxFlowElement',
      'mdxJsxTextElement',
    ])
    visit(tree, (node, index, parent) => {
      if (parent && typeof index === 'number' && MDX.has(node.type)) {
        parent.children.splice(index, 1)
        return index // revisita a mesma posição
      }
    })
  }
}

const processor = remark().use(remarkMdx).use(removeMdxNodes).use(stripMarkdown)

async function mdxToPlainText(body: string): Promise<string> {
  const file = await processor.process(body)
  return String(file)
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]+\n/g, '\n')
    .trim()
}

function readMdxDir(dir: string): { file: string; data: Record<string, unknown>; body: string }[] {
  const full = join(CONTENT_DIR, dir)
  if (!existsSync(full)) return []
  const out: { file: string; data: Record<string, unknown>; body: string }[] = []
  const walk = (d: string) => {
    for (const entry of readdirSync(d, { withFileTypes: true })) {
      const p = join(d, entry.name)
      if (entry.isDirectory()) walk(p)
      else if (extname(entry.name) === '.mdx') {
        const { data, content } = matter(readFileSync(p, 'utf8'))
        out.push({ file: p, data, body: content })
      }
    }
  }
  walk(full)
  return out
}

type Entry = {
  type: 'faq'
  slug: string
  topic: string
  title: string
  text: string
}

async function build(): Promise<Entry[]> {
  const entries: Entry[] = []

  // FAQ — só o que está marcado para o bot (botIncluded !== false).
  for (const { data, body } of readMdxDir('faq')) {
    if (data.botIncluded === false) continue
    entries.push({
      type: 'faq',
      slug: String(data.slug ?? ''),
      topic: String(data.topic ?? 'geral'),
      title: String(data.question ?? ''),
      text: await mdxToPlainText(body),
    })
  }

  return entries
}

/** Catálogo com os preços já resolvidos para hoje — o agente nunca escolhe vigência sozinho. */
function catalogSnapshot(on = new Date()) {
  return {
    generatedAt: on.toISOString(),
    brands: catalog.BRANDS,
    checkups: catalog.CHECKUPS.map((c) => ({
      ...c,
      currentPrice: catalog.currentPrice(c.prices, on) ?? null,
    })),
    estudioTeia: catalog.ESTUDIO_SERVICES.map((s) => ({
      ...s,
      currentPrice: catalog.currentPrice(s.prices, on) ?? null,
    })),
    estudioPolicies: catalog.ESTUDIO_POLICIES,
    workshops: catalog.WORKSHOPS,
    projectStages: catalog.PROJECT_STAGES,
    solutions: catalog.SOLUTIONS,
  }
}

function toPromptMarkdown(entries: Entry[], snap: ReturnType<typeof catalogSnapshot>): string {
  const lines: string[] = []

  lines.push('# Base de conhecimento — Ecossistema Cadu Aranha')
  lines.push('')
  lines.push(
    'Bloco estável para o prefixo cacheável do prompt. Gerado por `pnpm extract` ' +
      'a partir do MDX do site e de lib/catalog.ts — não editar à mão.',
  )
  lines.push('')
  // Sem data aqui: este bloco é o prefixo cacheado e não pode mudar a cada geração.
  lines.push('## Check-Up Doutor Igreja — modalidades vigentes')
  lines.push('')
  for (const c of snap.checkups) {
    const price = c.currentPrice
      ? catalog.formatPrice(c.currentPrice)
      : 'sem preço vigente — encaminhar à equipe'
    lines.push(`### ${c.name}`)
    lines.push(`Escopo: ${c.scope} Duração: ${c.duration}. Participantes: ${c.participants}.`)
    lines.push(`Relatório: ${c.reportDeadline}. Investimento: ${price}.`)
    lines.push(`Quando recomendar: ${c.whenToChoose}`)
    lines.push('')
  }
  lines.push('## Perguntas frequentes')
  lines.push('')
  for (const f of entries) {
    lines.push(`### ${f.title}`)
    lines.push(f.text)
    lines.push('')
  }
  return (
    lines
      .join('\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim() + '\n'
  )
}

async function main() {
  const entries = await build()
  const snap = catalogSnapshot()
  if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true })

  writeFileSync(join(OUT_DIR, 'knowledge-base.json'), JSON.stringify(entries, null, 2) + '\n')
  writeFileSync(join(OUT_DIR, 'catalog.json'), JSON.stringify(snap, null, 2) + '\n')
  writeFileSync(join(OUT_DIR, 'bot-knowledge.md'), toPromptMarkdown(entries, snap))

  console.log(`[extract] ${entries.length} FAQ + ${snap.checkups.length} Check-Ups → generated/`)
}

main().catch((err) => {
  console.error('[extract] falhou:', err)
  process.exit(1)
})
