import { cn } from '@/utils/cn'

interface MeterProps {
  label: string
  /** 0–100 */
  value: number
  /** Override the auto tone derived from the value. */
  tone?: 'positive' | 'teal' | 'warning' | 'risk' | 'iris'
  /** Show the numeric value at the right. */
  showValue?: boolean
  /** Render compact (smaller label + bar). */
  compact?: boolean
  className?: string
}

const toneClass = {
  positive: 'bg-signal-positive',
  teal: 'bg-teal',
  warning: 'bg-signal-warning',
  risk: 'bg-signal-risk',
  iris: 'bg-iris',
} as const

function autoTone(v: number): keyof typeof toneClass {
  if (v >= 88) return 'positive'
  if (v >= 76) return 'teal'
  if (v >= 65) return 'warning'
  return 'risk'
}

export function Meter({ label, value, tone, showValue = true, compact, className }: MeterProps) {
  const t = tone ?? autoTone(value)
  return (
    <div className={cn('min-w-0', className)}>
      <div className="flex items-baseline justify-between gap-1">
        <span className={cn('truncate uppercase tracking-wide-eyebrow text-ink-subtle', compact ? 'text-[9.5px]' : 'text-[10px]')}>
          {label}
        </span>
        {showValue && <span className="font-mono text-[11px] font-semibold tabular text-ink-muted">{Math.round(value)}</span>}
      </div>
      <div className={cn('mt-1 overflow-hidden rounded-full bg-canvas-subtle', compact ? 'h-1' : 'h-1.5')}>
        <div className={cn('h-full rounded-full', toneClass[t])} style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
      </div>
    </div>
  )
}
