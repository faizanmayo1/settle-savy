import type { RiskLevel } from '@/types/common'
import { cn } from '@/utils/cn'

const config: Record<RiskLevel, { dot: string; text: string; bg: string; border: string }> = {
  Low: { dot: 'bg-signal-positive', text: 'text-signal-positive', bg: 'bg-signal-positive-soft', border: 'border-signal-positive/20' },
  Medium: { dot: 'bg-signal-info', text: 'text-signal-info', bg: 'bg-signal-info-soft', border: 'border-signal-info/20' },
  Elevated: { dot: 'bg-signal-warning', text: 'text-signal-warning', bg: 'bg-signal-warning-soft', border: 'border-signal-warning/20' },
  High: { dot: 'bg-signal-risk', text: 'text-signal-risk', bg: 'bg-signal-risk-soft', border: 'border-signal-risk/20' },
}

export function RiskBadge({ level, className }: { level: RiskLevel; className?: string }) {
  const conf = config[level]
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-medium leading-none',
        conf.bg,
        conf.text,
        conf.border,
        className,
      )}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', conf.dot)} aria-hidden />
      {level}
    </span>
  )
}
