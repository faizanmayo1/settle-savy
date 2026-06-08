import {
  CalendarCheck,
  Check,
  HeartHandshake,
  Sparkles,
  TrendingDown,
} from 'lucide-react'

import { ListingThumb } from '@/components/ListingThumb'
import { InsightRibbon } from '@/components/InsightRibbon'
import { PageHeader } from '@/components/PageHeader'
import { ScoreRing } from '@/components/copilot/ScoreRing'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/toast'
import { ALTERNATIVES, HERO_LISTING, type Listing } from '@/data/listings'
import { DECISION_CONFIDENCE, FUNNEL, HESITATION_SIGNAL } from '@/data/funnel'
import { formatNumber, formatUSDCompact } from '@/utils/format'
import { cn } from '@/utils/cn'

const COMPARE: Listing[] = [ALTERNATIVES[0], HERO_LISTING, ALTERNATIVES[1]]
const recommendedId = COMPARE.reduce((a, b) => (b.fitScore > a.fitScore ? b : a)).id

const ROWS: Array<{ label: string; get: (l: Listing) => string; higherBetter?: boolean; pick?: (ls: Listing[]) => string }> = [
  { label: 'Fit score', get: (l) => `${l.fitScore}`, pick: (ls) => ls.reduce((a, b) => (b.fitScore > a.fitScore ? b : a)).id },
  { label: 'Price', get: (l) => formatUSDCompact(l.price), pick: (ls) => ls.reduce((a, b) => (b.price < a.price ? b : a)).id },
  { label: '$ / ft²', get: (l) => `$${Math.round(l.price / l.sqft)}`, pick: (ls) => ls.reduce((a, b) => (b.price / b.sqft < a.price / a.sqft ? b : a)).id },
  { label: 'Size', get: (l) => `${formatNumber(l.sqft)} ft²`, pick: (ls) => ls.reduce((a, b) => (b.sqft > a.sqft ? b : a)).id },
  { label: 'Days on market', get: (l) => `${l.daysOnMarket}d`, pick: (ls) => ls.reduce((a, b) => (b.daysOnMarket < a.daysOnMarket ? b : a)).id },
  { label: 'Confidence', get: (l) => `${Math.round(l.confidence * 100)}%`, pick: (ls) => ls.reduce((a, b) => (b.confidence > a.confidence ? b : a)).id },
]

export function DecisionFunnel() {
  const { toast } = useToast()
  const maxCount = FUNNEL[0].count

  return (
    <div className="mx-auto flex w-full max-w-[1380px] flex-col gap-6 animate-fade-in">
      <PageHeader
        eyebrow="Decide · Decision Funnel"
        title="From browsing to a confident decision."
        display
        ai="Decision engine"
        subtitle="Track the journey from interest to decision, compare the finalists on one screen, and catch hesitation before it becomes drop-off."
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="flex min-w-0 flex-col gap-5">
          {/* Funnel */}
          <section className="rounded-xl border border-hairline bg-card p-5 shadow-card-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="eyebrow">Buyer journey</p>
                <h3 className="mt-1 text-[16px] font-semibold tracking-tight-bank text-ink">Decision funnel</h3>
              </div>
              <Badge variant="secondary">last 7 days</Badge>
            </div>
            <div className="mt-4 space-y-2.5">
              {FUNNEL.map((stage, i) => {
                const pct = (stage.count / maxCount) * 100
                return (
                  <div key={stage.key} className="flex items-center gap-3">
                    <span className="w-20 shrink-0 text-[12px] font-medium text-ink">{stage.label}</span>
                    <div className="relative h-8 flex-1 overflow-hidden rounded-lg bg-canvas-subtle">
                      <div
                        className={cn('flex h-full items-center rounded-lg bg-gradient-to-r px-3', i === FUNNEL.length - 1 ? 'from-iris-deep to-iris' : 'from-teal to-teal-500')}
                        style={{ width: `${Math.max(pct, 14)}%` }}
                      >
                        <span className="font-mono text-[12px] font-semibold tabular text-white">{stage.count}</span>
                      </div>
                    </div>
                    <span className="w-20 shrink-0 text-right font-mono text-[11px] tabular text-ink-subtle">
                      {stage.dropoff > 0 ? `−${Math.round(stage.dropoff * 100)}% drop` : 'in progress'}
                    </span>
                  </div>
                )
              })}
            </div>
          </section>

          {/* Comparison table */}
          <section className="overflow-hidden rounded-xl border border-hairline bg-card shadow-card-sm">
            <div className="flex items-center justify-between gap-2 border-b border-hairline px-4 py-3">
              <h3 className="text-[14px] font-semibold tracking-tight-bank text-ink">Finalist comparison</h3>
              <Badge variant="iris" className="gap-1"><Sparkles className="h-3 w-3" /> AI comparison</Badge>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[620px]">
                <thead>
                  <tr>
                    <th className="w-32 px-4 py-3" />
                    {COMPARE.map((l) => (
                      <th key={l.id} className="px-3 py-3 text-left align-bottom">
                        <div className={cn('rounded-lg border p-2', l.id === recommendedId ? 'border-iris/40 bg-iris-soft/40' : 'border-hairline')}>
                          <ListingThumb hue={l.hue} className="mb-1.5 h-12 w-full rounded-md" />
                          <p className="truncate text-[12px] font-semibold text-ink">{l.address.split(' ').slice(0, 2).join(' ')}</p>
                          <p className="truncate text-[10.5px] text-ink-subtle">{l.neighborhood}</p>
                          {l.id === recommendedId && (
                            <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-iris px-1.5 py-0.5 text-[9.5px] font-semibold text-white"><Sparkles className="h-2.5 w-2.5" /> Recommended</span>
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ROWS.map((row) => {
                    const best = row.pick?.(COMPARE)
                    return (
                      <tr key={row.label} className="border-t border-hairline">
                        <td className="px-4 py-2.5 text-[11.5px] uppercase tracking-wide-eyebrow text-ink-subtle">{row.label}</td>
                        {COMPARE.map((l) => {
                          const isBest = best === l.id
                          return (
                            <td key={l.id} className="px-3 py-2.5">
                              <span className={cn('inline-flex items-center gap-1 font-mono text-[13px] tabular', isBest ? 'font-semibold text-signal-positive' : 'text-ink')}>
                                {isBest && <Check className="h-3.5 w-3.5" />}{row.get(l)}
                              </span>
                            </td>
                          )
                        })}
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between gap-2 border-t border-hairline bg-canvas-subtle/40 px-4 py-2.5">
              <span className="text-[11.5px] text-ink-muted">Across the finalists, <span className="font-medium text-ink">1908 Zach Scott</span> wins on fit, price and confidence.</span>
              <Button size="sm" onClick={() => toast({ title: 'Scheduling', description: 'One-click tour requested for 1908 Zach Scott St.', tone: 'success' })}>
                <CalendarCheck className="h-3.5 w-3.5" /> Schedule the pick
              </Button>
            </div>
          </section>
        </div>

        {/* Right rail */}
        <aside className="flex flex-col gap-5">
          {/* Decision confidence */}
          <section className="rounded-xl border border-hairline bg-card p-5 text-center shadow-card-sm">
            <p className="eyebrow">Decision confidence</p>
            <div className="mt-3 grid place-items-center">
              <ScoreRing value={DECISION_CONFIDENCE} caption="ready" tone={DECISION_CONFIDENCE >= 80 ? 'positive' : 'iris'} size={92} stroke={8} />
            </div>
            <p className="mt-3 text-[12px] leading-relaxed text-ink-muted">
              Maya is close, but hesitating. A side-by-side and a quick agent consult typically lift confidence above 85%.
            </p>
          </section>

          {/* Hesitation nudge */}
          <InsightRibbon
            tone="warning"
            icon={TrendingDown}
            headline="Hesitation detected — act before drop-off."
            detail={HESITATION_SIGNAL}
            confidence={0.83}
            actionLabel="Send confidence-boost view"
            onAction={() => toast({ title: 'Sent', description: 'A confidence-boost comparison and 2 alternatives were shared with Maya.', tone: 'success' })}
          />

          {/* Agent consult */}
          <section className="rounded-xl border border-hairline bg-card p-4 shadow-card-sm">
            <div className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-md bg-teal/10 text-teal">
                <HeartHandshake className="h-4 w-4" />
              </span>
              <div>
                <p className="text-[13px] font-semibold text-ink">Talk it through</p>
                <p className="text-[11px] text-ink-subtle">15-min consult with Priya Raman</p>
              </div>
            </div>
            <Button variant="secondary" size="sm" className="mt-3 w-full" onClick={() => toast({ title: 'Consult booked', description: 'Priya will call to walk through the finalists.', tone: 'success' })}>
              Book a 15-min consult
            </Button>
          </section>
        </aside>
      </div>
    </div>
  )
}
