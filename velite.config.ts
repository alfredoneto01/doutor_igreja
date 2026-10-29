import { defineConfig, s } from 'velite'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'

/**
 * Conteúdo editorial em MDX. Produtos, preços e prazos NÃO ficam aqui — vêm de
 * lib/catalog.ts (fonte de verdade comercial, contexto §10).
 */

/** Áreas técnicas — agrupam os conteúdos de diagnóstico do Doutor Igreja. */
const AREAS = ['sonorizacao', 'transmissao', 'projeto', 'treinamento', 'geral'] as const

/** Onde cada pergunta frequente aparece no site. */
const FAQ_TOPICS = ['checkup', 'doutor-igreja', 'estudio-teia', 'corporativo', 'geral'] as const

export default defineConfig({
  root: 'content',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    name: '[name]-[hash:6].[ext]',
    clean: true,
  },
  collections: {
    // ── FAQ — cada pergunta bem respondida no site é uma mensagem que chega
    //    ao WhatsApp já qualificada. Também alimenta o agente (`pnpm extract`).
    faq: {
      name: 'Faq',
      pattern: 'faq/**/*.mdx',
      schema: s.object({
        question: s.string().min(1).max(200),
        slug: s.slug('faq'),
        topic: s.enum(FAQ_TOPICS).default('geral'),
        searchTerms: s.array(s.string()).default([]),
        order: s.number().int().min(0).optional(),
        // Se false, a resposta fica só no site e não entra no prompt do agente.
        botIncluded: s.boolean().default(true),
        body: s.mdx(),
      }),
    },

    // ── Conteúdos do Doutor Igreja — páginas indexáveis escritas na linguagem
    //    de busca da igreja ("som da igreja embolado").
    symptom: {
      name: 'Symptom',
      pattern: 'diagnostico/**/*.mdx',
      schema: s
        .object({
          title: s.string().min(1).max(140),
          slug: s.slug('diagnostico'),
          area: s.enum(AREAS).default('geral'),
          searchTerms: s.array(s.string()).min(1),
          order: s.number().int().min(0).optional(),
          seo: s
            .object({
              title: s.string().optional(),
              description: s.string().optional(),
            })
            .optional(),
          body: s.mdx(),
        })
        .transform((data) => ({ ...data, permalink: `/doutor-igreja/conteudos/${data.slug}` })),
    },

    // ── Portfólio — só clientes, imagens e resultados com autorização (§14).
    proof: {
      name: 'Proof',
      pattern: 'casos/**/*.mdx',
      schema: s.object({
        client: s.string().min(1),
        brand: s.enum(['institucional', 'doutorIgreja', 'estudioTeia']),
        city: s.string().optional(),
        slug: s.slug('casos'),
        summary: s.string().min(1).max(240),
        quote: s.string().optional(),
        quoteAuthor: s.string().optional(),
        cover: s.image().optional(),
        coverAlt: s.string().optional(),
        // Publicação exige autorização de uso (§14, §17).
        authorized: s.boolean().default(false),
        order: s.number().int().min(0).optional(),
        body: s.mdx(),
      }),
    },

    // ── Episódios do Podcast Doutor Igreja em destaque.
    episode: {
      name: 'Episode',
      pattern: 'episodios/**/*.mdx',
      schema: s.object({
        number: s.number().int().min(1),
        title: s.string().min(1),
        slug: s.slug('episodios'),
        youtubeId: s.string().optional(),
        publishedAt: s.isodate().optional(),
        summary: s.string().max(280).optional(),
        featured: s.boolean().default(false),
        body: s.mdx().optional(),
      }),
    },
  },
  mdx: {
    gfm: true,
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug],
  },
})
