import * as runtime from 'react/jsx-runtime'
import type { ComponentType } from 'react'
import { Callout } from '@/components/content/callout'

type MDXComponentsMap = Record<string, ComponentType<Record<string, unknown>>>
type MDXComponent = ComponentType<{ components?: MDXComponentsMap }>

const componentCache = new Map<string, MDXComponent>()

function getMDXComponent(code: string): MDXComponent {
  const cached = componentCache.get(code)
  if (cached) return cached
  const fn = new Function(code)
  const Component = fn({ ...runtime }).default as MDXComponent
  componentCache.set(code, Component)
  return Component
}

const sharedComponents: MDXComponentsMap = {
  Callout: Callout as unknown as ComponentType<Record<string, unknown>>,
}

export function MDXContent({
  code,
  components,
}: {
  code: string
  components?: MDXComponentsMap
}) {
  const Component = getMDXComponent(code)
  return (
    // eslint-disable-next-line react-hooks/static-components -- Velite emite um componente por corpo MDX; cacheado acima, referência estável entre renders.
    <Component components={{ ...sharedComponents, ...components }} />
  )
}
