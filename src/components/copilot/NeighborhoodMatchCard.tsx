import type { CSSProperties } from 'react'
import { ArrowUpRight, MapPin, Sparkles } from 'lucide-react'

import { ScoreRing } from '@/components/copilot/ScoreRing'
import { StatusBadge } from '@/components/StatusBadge'
import { Button } from '@/components/ui/button'
import type { NeighborhoodIndices, NeighborhoodMatch } from '@/types/copilot'
import { formatCommute, formatPercent } from '@/utils/format'
import { cn } from '@/utils/cn'

const INDEX_META: Array<{ key: keyof NeighborhoodIndices; label: string }> = [
  { key: 'safety', label: 'Safety' },
  { key: 'schools', label: 'Schools' },
  { key: 'affordability', label: 'Afford' },
  { key: 'lifestyle', label: 'Lifestyle' },
  { key: 'appreciation', label: 'Growth' },
]

function IndexMeter({ label, value }: { label: string; value: number }) {
  const tone = value >= 88 ? 'bg-signal-positive' : value >= 76 ? 'bg-teal' : value >= 65 ? 'bg-signal-warning' : 'bg-signal-risk'
  return (
    <div className="min-w-0">
      <div className="flex items-baseline justify-between gap-1">
        <span className="truncate text-[10px] uppercase tracking-wide-eyebrow text-ink-subtle">{label}</span>
        <span className="font-mono text-[11px] font-semibold tabular text-ink-muted">{value}</span>
      </div>
      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-canvas-subtle">
        <div className={cn('h-full rounded-full', tone)} style={{ width: `${value}%` }} />
      </div>
    </div>
  )
}

interface Props {
  match: NeighborhoodMatch
  onView?: (m: NeighborhoodMatch) => void
  className?: string
  style?: CSSProperties
}

export function NeighborhoodMatchCard({ match, onView, className, style }: Props) {
  const isLead = match.rank === 1
  return (
    <article
      className={cn(
        'group relative overflow-hidden rounded-xl border bg-card shadow-card-sm transition-shadow hover:shadow-card-md',
        isLead ? 'border-iris/40' : 'border-hairline',
        className,
      )}
      style={style}
    >
      {isLead && <div className="accent-rule" aria-hidden />}

      <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-stretch sm:gap-5">
        {/* Rank + score */}
        <div className="flex shrink-0 items-center gap-4 sm:flex-col sm:items-center sm:justify-center sm:gap-2.5">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                'grid h-6 w-6 place-items-center rounded-md font-mono text-[12px] font-semibold tabular',
                isLead ? 'bg-iris text-canvas' : 'bg-canvas-subtle text-ink-muted',
              )}
            >
              {match.rank}
            </span>
            {isLead && (
              <span className="inline-flex items-center gap-1 rounded-full bg-iris-soft px-2 py-0.5 text-[10px] font-medium text-iris-deep sm:hidden">
                <Sparkles className="h-3 w-3" /> Top match
              </span>
            )}
          </div>
          <ScoreRing value={match.matchScore} caption="match" tone="iris" />
          <span className="hidden text-[10.5px] text-ink-subtle sm:block">
            {Math.round(match.confidence * 100)}% conf.
          </span>
        </div>

        {/* Body */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-1.5">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-[16px] font-semibold tracking-tight-bank text-ink">{match.name}</h3>
                {isLead && (
                  <span className="hidden items-center gap-1 rounded-full bg-iris-soft px-2 py-0.5 text-[10px] font-medium text-iris-deep sm:inline-flex">
                    <Sparkles className="h-3 w-3" /> Top match
                  </span>
                )}
              </div>
              <p className="mt-0.5 inline-flex items-center gap-1 text-[12px] text-ink-subtle">
                <MapPin className="h-3 w-3" /> {match.metro} · {match.listings} listings
              </p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <StatusBadge status={match.trend} />
              <span className="font-mono text-[13px] font-semibold tabular text-ink">{match.priceBand}</span>
            </div>
          </div>

          {/* Index meters */}
          <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2.5 sm:grid-cols-5">
            {INDEX_META.map((m) => (
              <IndexMeter key={m.key} label={m.label} value={match.indices[m.key]} />
            ))}
          </div>

          {/* Tradeoff explanation */}
          <p className="mt-3 border-l-2 border-iris/30 pl-3 text-[12.5px] leading-relaxed text-ink-muted">
            <span className="font-medium text-iris-deep">Why #{match.rank}: </span>
            {match.tradeoff}
          </p>

          {/* Footer chips + CTA */}
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="inline-flex items-center gap-1 rounded-md bg-canvas-subtle px-2 py-1 font-mono text-[11px] tabular text-ink-muted">
                {formatCommute(match.commuteMin)} downtown
              </span>
              <span className="inline-flex items-center gap-1 rounded-md bg-signal-positive-soft px-2 py-1 font-mono text-[11px] tabular text-signal-positive">
                {formatPercent(match.appreciation18mo)} / 18mo
              </span>
              {match.tags.map((t) => (
                <span key={t} className="rounded-md border border-hairline px-2 py-1 text-[11px] text-ink-subtle">
                  {t}
                </span>
              ))}
            </div>
            <Button variant="ghost" size="sm" className="text-teal hover:text-teal" onClick={() => onView?.(match)}>
              Explore
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </article>
  )
}
