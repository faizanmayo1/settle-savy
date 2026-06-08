import type { LucideIcon } from 'lucide-react'
import { ArrowUpRight, Sparkles } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/utils/cn'

export type InsightTone = 'iris' | 'positive' | 'warning' | 'risk' | 'info'

export interface InsightRibbonProps {
  tone?: InsightTone
  icon: LucideIcon
  headline: string
  detail: string
  confidence?: number
  metas?: Array<{ label: string; value: string }>
  actionLabel?: string
  onAction?: () => void
  className?: string
}

const toneTokens: Record<InsightTone, { chipBg: string; chipText: string; bar: string; ribbon: string }> = {
  iris: { chipBg: 'bg-iris-soft', chipText: 'text-iris-deep', bar: 'bg-iris', ribbon: 'from-iris/16 via-iris/4 to-transparent' },
  positive: { chipBg: 'bg-signal-positive-soft', chipText: 'text-signal-positive', bar: 'bg-signal-positive', ribbon: 'from-signal-positive/14 via-signal-positive/3 to-transparent' },
  warning: { chipBg: 'bg-signal-warning-soft', chipText: 'text-signal-warning', bar: 'bg-signal-warning', ribbon: 'from-signal-warning/16 via-signal-warning/4 to-transparent' },
  risk: { chipBg: 'bg-signal-risk-soft', chipText: 'text-signal-risk', bar: 'bg-signal-risk', ribbon: 'from-signal-risk/14 via-signal-risk/3 to-transparent' },
  info: { chipBg: 'bg-signal-info-soft', chipText: 'text-signal-info', bar: 'bg-signal-info', ribbon: 'from-signal-info/14 via-signal-info/3 to-transparent' },
}

export function InsightRibbon({
  tone = 'iris',
  icon: Icon,
  headline,
  detail,
  confidence,
  metas,
  actionLabel,
  onAction,
  className,
}: InsightRibbonProps) {
  const t = toneTokens[tone]
  return (
    <article className={cn('group relative overflow-hidden rounded-xl border border-hairline bg-card shadow-card-sm', className)}>
      <div className={cn('absolute inset-x-0 top-0 h-16 bg-gradient-to-b', t.ribbon)} aria-hidden />
      <div className={cn('absolute left-0 top-0 h-full w-0.5', t.bar)} aria-hidden />
      <div className="relative flex flex-col gap-3 p-5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className={cn('grid h-7 w-7 place-items-center rounded-md', t.chipBg, t.chipText)}>
              <Icon className="h-3.5 w-3.5" />
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-medium uppercase tracking-wide-eyebrow text-ink-subtle">
              <Sparkles className="h-3 w-3 text-iris-deep" /> AI insight
            </span>
          </div>
          {confidence !== undefined && (
            <span className="inline-flex items-center gap-1 text-[11px] text-ink-subtle">
              <span className="h-1.5 w-1.5 rounded-full bg-signal-positive" />
              {Math.round(confidence * 100)}% confidence
            </span>
          )}
        </div>

        <h3 className="text-[15px] font-semibold leading-snug tracking-tight-bank text-ink">{headline}</h3>
        <p className="text-[13px] leading-relaxed text-ink-muted">{detail}</p>

        {metas && metas.length > 0 && (
          <ul className="mt-1 grid grid-cols-1 gap-2 sm:grid-cols-3">
            {metas.map((m) => (
              <li key={m.label} className="rounded-md border border-hairline bg-canvas-subtle px-2.5 py-1.5">
                <p className="text-[10px] uppercase tracking-wide-eyebrow text-ink-subtle">{m.label}</p>
                <p className="mt-0.5 font-mono text-[13px] font-semibold tabular text-ink">{m.value}</p>
              </li>
            ))}
          </ul>
        )}

        {actionLabel && (
          <div className="mt-1 flex items-center justify-between gap-2 border-t border-hairline pt-2.5">
            <span className="inline-flex items-center gap-1 text-[10.5px] text-ink-subtle">
              <span className="inline-block h-1 w-1 rounded-full bg-iris" /> Grounded · explainable
            </span>
            <Button variant="ghost" size="sm" className="text-teal hover:text-teal" onClick={onAction}>
              {actionLabel}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        )}
      </div>
    </article>
  )
}
