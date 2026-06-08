import type { LucideIcon } from 'lucide-react'

import { cn } from '@/utils/cn'

export type StatTone = 'default' | 'positive' | 'warning' | 'risk' | 'info' | 'iris' | 'teal'

interface StatTileProps {
  label: string
  value: string
  hint?: string
  tone?: StatTone
  /** Colour the hint green (e.g. a positive delta). */
  hintPositive?: boolean
  icon?: LucideIcon
  className?: string
}

const valueTone: Record<StatTone, string> = {
  default: 'text-ink',
  positive: 'text-signal-positive',
  warning: 'text-signal-warning',
  risk: 'text-signal-risk',
  info: 'text-signal-info',
  iris: 'text-iris-deep',
  teal: 'text-teal',
}

/** Canonical KPI tile — one definition shared across every screen for pixel consistency. */
export function StatTile({ label, value, hint, tone = 'default', hintPositive, icon: Icon, className }: StatTileProps) {
  return (
    <div className={cn('rounded-xl border border-hairline bg-card p-4 shadow-card-sm', className)}>
      <div className="flex items-center justify-between">
        <p className="text-[10.5px] uppercase tracking-wide-eyebrow text-ink-subtle">{label}</p>
        {Icon && <Icon className="h-3.5 w-3.5 text-ink-faint" />}
      </div>
      <p className={cn('mt-1.5 font-mono text-[22px] font-semibold leading-none tabular', valueTone[tone])}>{value}</p>
      {hint && <p className={cn('mt-1.5 text-[10.5px]', hintPositive ? 'text-signal-positive' : 'text-ink-subtle')}>{hint}</p>}
    </div>
  )
}
