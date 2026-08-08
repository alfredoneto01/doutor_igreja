import { defineConfig, s } from 'velite'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'

/**
 * Áreas de serviço do Cadu — usadas para agrupar FAQ, serviços e sintomas.
 * "Doutor Igreja" é marca de nicho: foco exclusivo em igreja (decisão A, §2).
 */
const AREAS = ['sonorizacao', 'transmissao', 'projeto', 'treinamento', 'geral'] as const

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
    // ── FAQ — a seção mais importante do projeto (§4). Cada pergunta bem
    //    respondida no site é uma mensagem que não chega no WhatsApp.
    faq: {
      name: 'Faq',
      pattern: 'faq/**/*.mdx',
      schema: s
        .object({
          question: s.string().min(1).max(200),
          slug: s.slug('faq'),
          area: s.enum(AREAS).default('geral'),
          // Termos de busca long-tail que esta resposta cobre (SEO por sintoma, §2).
          searchTerms: s.array(s.string()).default([]),
          order: s.number().int().min(0).optional(),
          // Se true, o bot também usa esta resposta no prompt (default: usa).
          botIncluded: s.boolean().default(true),
          body: s.mdx(),
        })
        .transform((data) => ({ ...data, permalink: `/faq#${data.slug}` })),
    },

    // ── Serviços — cada um com descrição real, público, entregável e faixa (§4).
    service: {
      name: 'Service',
      pattern: 'servicos/**/*.mdx',
      schema: s
        .object({
          title: s.string().min(1).max(120),
          slug: s.slug('servicos'),
          area: s.enum(AREAS).default('geral'),
          summary: s.string().min(1).max(240),
          audience: s.string(), // para quem é
          deliverable: s.string(), // o que a igreja recebe
          priceRange: s.string().optional(), // faixa de investimento ("a partir de R$X")
          icon: s.string().optional(),
          order: s.number().int().min(0).optional(),
          body: s.mdx(),
        })
        .transform((data) => ({ ...data, permalink: `/servicos/${data.slug}` })),
    },

    // ── Sintomas/diagnóstico — espinha dorsal do SEO (§2). Cada sintoma vira
    //    página indexável com a linguagem que a pessoa usa na busca.
    symptom: {
      name: 'Symptom',
      pattern: 'diagnostico/**/*.mdx',
      schema: s
        .object({
          title: s.string().min(1).max(140), // o sintoma, na voz da igreja
          slug: s.slug('diagnostico'),
          area: s.enum(AREAS).default('geral'),
          searchTerms: s.array(s.string()).min(1),
          relatedService: s.string().optional(),
          order: s.number().int().min(0).optional(),
          seo: s
            .object({
              title: s.string().optional(),
              description: s.string().optional(),
            })
            .optional(),
          body: s.mdx(),
        })
        .transform((data) => ({ ...data, permalink: `/diagnostico/${data.slug}` })),
    },

    // ── Prova social — casos, antes/depois, depoimentos (§4).
    proof: {
      name: 'Proof',
      pattern: 'casos/**/*.mdx',
      schema: s
        .object({
          church: s.string().min(1),
          city: s.string(),
          slug: s.slug('casos'),
          summary: s.string().min(1).max(240),
          quote: s.string().optional(),
          quoteAuthor: s.string().optional(),
          cover: s.image().optional(),
          coverAlt: s.string().optional(),
          order: s.number().int().min(0).optional(),
          body: s.mdx(),
        })
        .transform((data) => ({ ...data, permalink: `/casos/${data.slug}` })),
    },

    // ── Episódios do podcast "Doutor Igreja" em destaque (§4).
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
