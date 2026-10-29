import Image from 'next/image'
import Link from 'next/link'
import { Section } from '@/components/layout/section'
import { LinkCards } from '@/components/content/link-cards'
import { Pending } from '@/components/content/pending'
import { WhatsappCta } from '@/components/content/whatsapp-cta'
import { PodcastEpisodes } from '@/components/sections/podcast-episodes'
import { buttonVariants } from '@/components/ui/button'
import { BRANDS, SOLUTIONS } from '@/lib/catalog'
import { getProof } from '@/lib/content'
import { WA } from '@/lib/site'

/**
 * Homepage institucional (contexto §14): apresentar Cadu Aranha e direcionar
 * rapidamente para a frente correta. Três portas de entrada com os CTAs oficiais.
 */
const DOORS = [
  {
    href: '/solucoes',
    kicker: BRANDS.institucional.short,
    title: 'Preciso de uma solução audiovisual',
    text: 'Produção, transmissões, eventos, direção técnica e projetos de estúdio para empresas, marcas e instituições.',
    cta: 'Ver soluções',
  },
  {
    href: '/estudio-teia',
    kicker: BRANDS.estudioTeia.name,
    title: 'Quero gravar no Estúdio Teia',
    text: 'Podcasts, videocasts, videoaulas e transmissões em estúdio — e operação de eventos externos.',
    cta: 'Conhecer o estúdio',
  },
  {
    href: '/doutor-igreja',
    kicker: BRANDS.doutorIgreja.name,
    title: 'Quero melhorar o audiovisual da minha igreja',
    text: 'Diagnóstico, projetos, implantação e formação de equipes. Tecnologia, ambientes e equipes a serviço da missão.',
    cta: 'Conhecer o Doutor Igreja',
  },
]

export default function HomePage() {
  const proof = getProof()

  return (
    <>
      {/* Abertura no estilo do site anterior: grade de alto-falante + logo grande. */}
      <section className="relative overflow-hidden bg-black bg-[url(/brand/grade-alto-falante.jpg)] bg-cover bg-center">
        <div className="pointer-events-none absolute inset-0 bg-radial from-transparent via-black/30 to-black/80" />
        <div className="relative mx-auto flex max-w-4xl flex-col items-center px-4 py-20 text-center sm:py-28">
          <Image
            src="/brand/cadu-aranha-logo.png"
            alt="Cadu Aranha"
            width={980}
            height={343}
            priority
            className="h-auto w-full max-w-md drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] sm:max-w-xl"
          />
        </div>
      </section>

      {/* Texto em fundo liso, logo abaixo da grade — como no site anterior. */}
      <section className="bg-[#333333]">
        <div className="mx-auto flex max-w-4xl flex-col items-center px-4 py-16 text-center sm:py-20">
          <p className="text-accent font-mono text-sm font-bold tracking-[0.2em] uppercase">
            Produção · Direção técnica · Estúdio · Igrejas
          </p>
          <h1 className="text-foreground mt-4 text-3xl leading-tight font-bold text-balance sm:text-5xl">
            Audiovisual com direção, previsibilidade e propósito.
          </h1>
          <p className="text-muted-foreground mt-5 max-w-2xl text-lg text-pretty">
            {BRANDS.institucional.name}: {BRANDS.institucional.tagline.toLowerCase()} Uma estrutura
            que reúne a produtora, o Estúdio Teia e o Doutor Igreja — cada um com a sua jornada.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#frentes" className={buttonVariants({ size: 'lg' })}>
              Por onde começar
            </a>
            <Link href="/sobre-cadu" className={buttonVariants({ variant: 'outline', size: 'lg' })}>
              Sobre Cadu
            </Link>
          </div>
        </div>
      </section>

      <Section
        id="frentes"
        kicker="Três portas de entrada"
        title="O que você precisa viabilizar?"
        className="border-border/60 border-t"
      >
        <LinkCards items={DOORS} />
      </Section>

      <Section
        kicker="Trajetória"
        title="Mais de 15 anos de produção audiovisual e direção técnica"
        intro="Produção audiovisual, direção técnica, fotografia e formação, com atuação em igrejas e eventos. Cadu é fundador da Cadu Aranha Produções e idealizador do Doutor Igreja."
        className="border-border/60 border-t"
      >
        <Link href="/sobre-cadu" className={buttonVariants({ variant: 'outline' })}>
          Conhecer a trajetória
        </Link>
      </Section>

      <Section
        kicker="Soluções"
        title="Para empresas, marcas e instituições"
        className="border-border/60 border-t"
      >
        <LinkCards
          items={SOLUTIONS.map((s) => ({
            href: `/solucoes/${s.slug}`,
            title: s.name,
            text: s.summary,
          }))}
        />
      </Section>

      <Section
        kicker="Projetos e portfólio"
        title="Trabalhos realizados"
        className="border-border/60 border-t"
      >
        {proof.length === 0 ? (
          <Pending>projetos, clientes, imagens e depoimentos com autorização de uso.</Pending>
        ) : (
          <LinkCards
            items={proof.map((p) => ({
              href: `/portfolio#${p.slug}`,
              title: p.client,
              text: p.summary,
            }))}
          />
        )}
      </Section>

      <Section
        kicker="Podcast Doutor Igreja"
        title="Tecnologia, liderança e a realidade das igrejas"
        className="border-border/60 border-t"
      >
        <PodcastEpisodes />
        <Link href="/podcast" className={buttonVariants({ variant: 'outline', className: 'mt-6' })}>
          Sobre o podcast
        </Link>
      </Section>

      <Section className="border-border/60 border-t">
        <WhatsappCta
          title="Me conta o contexto que motivou seu contato"
          text="Não precisa escolher uma área antes: conte o que está acontecendo e a gente direciona."
          message={WA.geral}
        />
      </Section>
    </>
  )
}
