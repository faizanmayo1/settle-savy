import { Activity, Database } from 'lucide-react'

import { cn } from '@/utils/cn'

const SOURCES = [
  { label: 'MLS listings', dot: '#0F766E' },
  { label: 'Crime data', dot: '#DC2626' },
  { label: 'School districts', dot: '#6366F1' },
  { label: 'Live traffic', dot: '#D97706' },
  { label: 'Economic signals', dot: '#0E92C7' },
  { label: 'Buyer behavior', dot: '#16A34A' },
]

/**
 * Real-time data fusion backbone (requirement §9). A slim, always-live strip
 * showing the feeds being unified, with an event-driven recalculation note —
 * the "new listing enters → everything recomputes" story, made visible.
 */
export function DataFusionBar({ className }: { className?: string }) {
  return (
    <section className={cn('overflow-hidden rounded-xl border border-hairline bg-card shadow-card-sm', className)}>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-2.5">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wide-eyebrow text-ink-subtle">
          <Database className="h-3.5 w-3.5 text-teal" /> Live data fusion
        </span>

        <ul className="flex flex-1 flex-wrap items-center gap-x-3.5 gap-y-1.5">
          {SOURCES.map((s) => (
            <li key={s.label} className="inline-flex items-center gap-1.5 text-[11.5px] text-ink-muted">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" style={{ backgroundColor: s.dot }} />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ backgroundColor: s.dot }} />
              </span>
              {s.label}
            </li>
          ))}
        </ul>

        <span className="inline-flex items-center gap-1.5 rounded-full bg-signal-positive-soft px-2 py-0.5 text-[10.5px] font-medium text-signal-positive">
          <Activity className="h-3 w-3" /> New listing ingested · 1,204 scores recomputed
        </span>
      </div>
    </section>
  )
}
