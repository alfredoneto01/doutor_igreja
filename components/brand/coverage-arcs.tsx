import { cn } from '@/lib/utils'

/**
 * Elemento de assinatura (design-plan.md): curvas de cobertura acústica —
 * isóbaras de SPL irradiando de uma fonte (a caixa/o púlpito) sobre a nave.
 * Une áudio + igreja num só símbolo. Puramente decorativo (aria-hidden).
 *
 * Cor herdada via currentColor — o pai define `text-accent` (latão).
 */
export function CoverageArcs({ className }: { className?: string }) {
  // Fonte na frente/base da nave; arcos abrem para cima como cobertura sonora.
  const cx = 400
  const cy = 560
  const radii = [90, 150, 215, 285, 360, 440, 525]
  // Cone de cobertura ~ ±58° a partir da vertical.
  const spread = (58 * Math.PI) / 180

  const arc = (r: number) => {
    const x1 = cx - r * Math.sin(spread)
    const y1 = cy - r * Math.cos(spread)
    const x2 = cx + r * Math.sin(spread)
    const y2 = cy - r * Math.cos(spread)
    return `M ${x1.toFixed(1)} ${y1.toFixed(1)} A ${r} ${r} 0 0 1 ${x2.toFixed(1)} ${y2.toFixed(1)}`
  }

  const edgeX = cx + 560 * Math.sin(spread)
  const edgeY = cy - 560 * Math.cos(spread)

  return (
    <svg
      viewBox="0 0 800 600"
      fill="none"
      aria-hidden="true"
      className={cn('text-accent', className)}
      preserveAspectRatio="xMidYMax slice"
    >
      {/* Linhas do templo (bancos/nave), bem sutis */}
      <g stroke="currentColor" strokeOpacity="0.06" strokeWidth="1.5">
        {[470, 500, 530].map((y) => (
          <line key={y} x1="120" y1={y} x2="680" y2={y} />
        ))}
      </g>

      {/* Bordas do cone de cobertura */}
      <g stroke="currentColor" strokeOpacity="0.14" strokeWidth="1.5">
        <line x1={cx} y1={cy} x2={cx - (edgeX - cx)} y2={edgeY} />
        <line x1={cx} y1={cy} x2={edgeX} y2={edgeY} />
      </g>

      {/* Isóbaras — opacidade decresce com o raio */}
      <g stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
        {radii.map((r, i) => (
          <path key={r} d={arc(r)} strokeOpacity={(0.5 - i * 0.055).toFixed(3)} />
        ))}
      </g>

      {/* A fonte */}
      <circle cx={cx} cy={cy} r="5" fill="currentColor" fillOpacity="0.7" />
    </svg>
  )
}
