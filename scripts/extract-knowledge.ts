/**
 * Extrator de base de conhecimento para o prompt do bot (§4, §6).
 *
 * O MDX cru carrega JSX (<Callout>, <ServiceCard>) que vira ruído no prompt.
 * Este script lê os arquivos de conteúdo, separa o frontmatter e converte o
 * corpo em TEXTO LIMPO (sem JSX, sem formatação markdown). É essa saída que
 * entra no prompt do bot — nunca o arquivo bruto.
 *
 * Escopo do bot (§5): responde dúvida OPERACIONAL. Por isso a base cobre FAQ e
 * serviços. Dúvida técnica de áudio o bot NÃO responde — redireciona.
 *
 * Saídas (em /generated, fora do git):
 *   - knowledge-base.json  → estruturado, para consumo programático
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
  type: 'faq' | 'service'
  slug: string
  area: string
  title: string
  text: string
  priceRange?: string
}

async function build(): Promise<Entry[]> {
  const entries: Entry[] = []

  // FAQ — só o que está marcado para o bot (botIncluded !== false).
  for (const { data, body } of readMdxDir('faq')) {
    if (data.botIncluded === false) continue
    entries.push({
      type: 'faq',
      slug: String(data.slug ?? ''),
      area: String(data.area ?? 'geral'),
      title: String(data.question ?? ''),
      text: await mdxToPlainText(body),
    })
  }

  // Serviços — descrição operacional, público, entregável e faixa (§4/§5).
  for (const { data, body } of readMdxDir('servicos')) {
    const parts = [
      String(data.summary ?? ''),
      data.audience ? `Para quem: ${data.audience}` : '',
      data.deliverable ? `Entregável: ${data.deliverable}` : '',
      await mdxToPlainText(body),
    ].filter(Boolean)
    entries.push({
      type: 'service',
      slug: String(data.slug ?? ''),
      area: String(data.area ?? 'geral'),
      title: String(data.title ?? ''),
      text: parts.join('\n'),
      priceRange: data.priceRange ? String(data.priceRange) : undefined,
    })
  }

  return entries
}

function toPromptMarkdown(entries: Entry[]): string {
  const faqs = entries.filter((e) => e.type === 'faq')
  const services = entries.filter((e) => e.type === 'service')
  const lines: string[] = []

  lines.push('# Base de conhecimento — Doutor Igreja')
  lines.push('')
  lines.push(
    'Bloco estável para o prefixo cacheável do prompt (§6). Gerado por ' +
      '`pnpm extract` a partir do MDX do site — não editar à mão.',
  )
  lines.push('')
  lines.push('## Perguntas frequentes (operacional)')
  lines.push('')
  for (const f of faqs) {
    lines.push(`### ${f.title}`)
    lines.push(f.text)
    lines.push('')
  }
  lines.push('## Serviços')
  lines.push('')
  for (const s of services) {
    lines.push(`### ${s.title}`)
    if (s.priceRange) lines.push(`Faixa de investimento: ${s.priceRange}`)
    lines.push(s.text)
    lines.push('')
  }
  return lines.join('\n').replace(/\n{3,}/g, '\n\n').trim() + '\n'
}

async function main() {
  const entries = await build()
  if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true })

  writeFileSync(join(OUT_DIR, 'knowledge-base.json'), JSON.stringify(entries, null, 2) + '\n')
  writeFileSync(join(OUT_DIR, 'bot-knowledge.md'), toPromptMarkdown(entries))

  const counts = entries.reduce<Record<string, number>>((acc, e) => {
    acc[e.type] = (acc[e.type] ?? 0) + 1
    return acc
  }, {})
  console.log(
    `[extract] ${entries.length} itens → generated/ ` +
      `(faq: ${counts.faq ?? 0}, service: ${counts.service ?? 0})`,
  )
}

main().catch((err) => {
  console.error('[extract] falhou:', err)
  process.exit(1)
})
