import { cn } from '@/utils/cn'

interface ScoreRingProps {
  /** 0–100 */
  value: number
  size?: number
  stroke?: number
  tone?: 'iris' | 'teal' | 'positive'
  /** Small caption under the value, e.g. "match". */
  caption?: string
  className?: string
}

const toneColor = {
  iris: '#6366F1',
  teal: '#0F766E',
  positive: '#16A34A',
} as const

/**
 * Circular gauge for the AI fit score. Iris by default — it's an AI-produced
 * score. The arc draws in via a stroke-dashoffset transition on mount.
 */
export function ScoreRing({ value, size = 64, stroke = 6, tone = 'iris', caption, className }: ScoreRingProps) {
  const r = (size - stroke) / 2
  const circ = 2 * Math.PI * r
  const offset = circ * (1 - Math.max(0, Math.min(100, value)) / 100)
  const color = toneColor[tone]

  return (
    <div className={cn('relative inline-grid place-items-center', className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#E2E8E9" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1s cubic-bezier(0.22, 1, 0.36, 1)' }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center leading-none">
        <div>
          <span className="font-mono text-[15px] font-semibold tabular text-ink">{Math.round(value)}</span>
          {caption && <p className="mt-0.5 text-[8.5px] uppercase tracking-wide-eyebrow text-ink-subtle">{caption}</p>}
        </div>
      </div>
    </div>
  )
}
