import { Bell, Clock, Gem, Sparkles, TrendingDown } from 'lucide-react'

import { ListingThumb } from '@/components/ListingThumb'
import { PageHeader } from '@/components/PageHeader'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/toast'
import { FEATURED, OPPORTUNITIES, type Opportunity, type OpportunityType } from '@/data/opportunities'
import { formatBeds, formatNumber, formatPercent, formatUSD, formatUSDCompact } from '@/utils/format'
import { cn } from '@/utils/cn'

const TYPE_STYLE: Record<OpportunityType, string> = {
  Underpriced: 'bg-signal-positive-soft text-signal-positive',
  'Price-drop likely': 'bg-signal-warning-soft text-signal-warning',
  'Stale listing': 'bg-signal-info-soft text-signal-info',
  'Hidden value': 'bg-iris-soft text-iris-deep',
}

const discount = (o: Pick<Opportunity, 'price' | 'fairValue'>) => (o.fairValue - o.price) / o.fairValue

export function HiddenOpportunities() {
  const { toast } = useToast()
  const avgDiscount =
    OPPORTUNITIES.reduce((a, o) => a + discount(o), 0) / OPPORTUNITIES.length
  const dropLikely = OPPORTUNITIES.filter((o) => o.type === 'Price-drop likely').length
  const anomalies = OPPORTUNITIES.filter((o) => o.daysOnMarket > o.areaMedianDom * 2).length

  return (
    <div className="mx-auto flex w-full max-w-[1380px] flex-col gap-6 animate-fade-in">
      <PageHeader
        eyebrow="Market · Hidden Opportunities"
        title="The listings other platforms don’t surface."
        display
        ai="Opportunity engine"
        subtitle="Underpriced homes, price-drop predictions and days-on-market anomalies — scored for hidden value the moment they hit the feed."
        actions={
          <Button variant="secondary" size="sm" className="gap-1.5" onClick={() => toast({ title: 'Alerts on', description: 'You’ll be notified the instant a new opportunity scores 85+.', tone: 'success' })}>
            <Bell className="h-3.5 w-3.5" /> Alert me on 85+
          </Button>
        }
      />

      {/* KPI strip */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <KPI label="Opportunities" value={`${OPPORTUNITIES.length + 1}`} hint="in your areas" tone="iris" />
        <KPI label="Avg discount" value={formatPercent(avgDiscount)} hint="vs fair value" tone="positive" />
        <KPI label="Drops predicted" value={`${dropLikely}`} hint="within 2 weeks" tone="warning" />
        <KPI label="DOM anomalies" value={`${anomalies + 1}`} hint="stale vs area" tone="info" />
      </div>

      {/* Featured */}
      <section className="overflow-hidden rounded-xl border border-signal-warning/40 bg-card shadow-card-sm">
        <div className="h-1 bg-gradient-to-r from-signal-warning to-signal-positive" aria-hidden />
        <div className="grid grid-cols-1 sm:grid-cols-[240px_minmax(0,1fr)]">
          <ListingThumb
            hue={FEATURED.hue}
            className="h-44 sm:h-full"
            badge={
              <span className="inline-flex items-center gap-1 rounded-full bg-card/95 px-2 py-0.5 text-[10.5px] font-semibold text-signal-warning shadow-card-sm">
                <Gem className="h-3 w-3" /> Top opportunity
              </span>
            }
          />
          <div className="flex flex-col gap-3 p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-[18px] font-semibold tracking-tight-bank text-ink">{FEATURED.address}</h3>
                <p className="text-[12.5px] text-ink-subtle">{FEATURED.neighborhood} · {formatBeds(FEATURED.beds, FEATURED.baths)} · {formatNumber(FEATURED.sqft)} ft²</p>
              </div>
              <span className={cn('rounded-full px-2.5 py-1 text-[11px] font-semibold', TYPE_STYLE[FEATURED.type])}>{FEATURED.type}</span>
            </div>

            <div className="flex flex-wrap items-end gap-x-6 gap-y-2">
              <div>
                <p className="text-[11px] text-ink-subtle">List price</p>
                <p className="font-mono text-[22px] font-semibold tabular text-ink">{formatUSD(FEATURED.price)}</p>
              </div>
              <div>
                <p className="text-[11px] text-ink-subtle">Fair value</p>
                <p className="font-mono text-[18px] font-semibold tabular text-ink-muted line-through decoration-ink-faint">{formatUSDCompact(FEATURED.fairValue)}</p>
              </div>
              <div className="rounded-lg bg-signal-positive-soft px-3 py-1.5 text-center">
                <p className="font-mono text-[20px] font-semibold tabular text-signal-positive">{formatPercent(discount(FEATURED))}</p>
                <p className="text-[10px] text-signal-positive">undervalued</p>
              </div>
            </div>

            <p className="rounded-lg border-l-2 border-signal-warning/40 bg-canvas-subtle/50 px-3 py-2 text-[12.5px] leading-relaxed text-ink-muted">
              <span className="font-medium text-ink">Why it’s hidden: </span>{FEATURED.signal}
            </p>

            <div className="mt-auto flex items-center gap-2">
              <Button size="sm" onClick={() => toast({ title: 'Tour requested', description: `${FEATURED.address} — we flagged the value case to your agent.`, tone: 'success' })}>Move fast — book a tour</Button>
              <span className="font-mono text-[11px] tabular text-ink-subtle">value score {FEATURED.valueScore}/100</span>
            </div>
          </div>
        </div>
      </section>

      {/* Table */}
      <section className="overflow-hidden rounded-xl border border-hairline bg-card shadow-card-sm">
        <div className="flex items-center justify-between gap-2 border-b border-hairline px-4 py-3">
          <h3 className="text-[14px] font-semibold tracking-tight-bank text-ink">More opportunities</h3>
          <Badge variant="iris" className="gap-1"><Sparkles className="h-3 w-3" /> ranked by value score</Badge>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left">
            <thead>
              <tr className="border-b border-hairline text-[10.5px] uppercase tracking-wide-eyebrow text-ink-subtle">
                <th className="px-4 py-2.5 font-medium">Home</th>
                <th className="px-3 py-2.5 font-medium">Type</th>
                <th className="px-3 py-2.5 text-right font-medium">Price</th>
                <th className="px-3 py-2.5 text-right font-medium">Discount</th>
                <th className="px-3 py-2.5 text-right font-medium">DOM</th>
                <th className="px-3 py-2.5 text-right font-medium">Value</th>
                <th className="px-3 py-2.5" />
              </tr>
            </thead>
            <tbody>
              {OPPORTUNITIES.map((o) => {
                const stale = o.daysOnMarket > o.areaMedianDom * 2
                return (
                  <tr key={o.id} className="border-b border-hairline last:border-0 transition-colors hover:bg-canvas-subtle/50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <ListingThumb hue={o.hue} className="h-10 w-12 shrink-0 rounded-md" />
                        <div className="min-w-0">
                          <p className="truncate text-[12.5px] font-medium text-ink">{o.address}</p>
                          <p className="truncate text-[11px] text-ink-subtle">{o.neighborhood} · {formatBeds(o.beds, o.baths)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <span className={cn('inline-block rounded-full px-2 py-0.5 text-[10.5px] font-medium', TYPE_STYLE[o.type])}>{o.type}</span>
                    </td>
                    <td className="px-3 py-3 text-right font-mono text-[12.5px] tabular text-ink">{formatUSDCompact(o.price)}</td>
                    <td className="px-3 py-3 text-right font-mono text-[12.5px] font-semibold tabular text-signal-positive">{formatPercent(discount(o))}</td>
                    <td className="px-3 py-3 text-right">
                      <span className={cn('inline-flex items-center gap-1 font-mono text-[12px] tabular', stale ? 'text-signal-warning' : 'text-ink-muted')}>
                        {stale && <Clock className="h-3 w-3" />}{o.daysOnMarket}d
                      </span>
                    </td>
                    <td className="px-3 py-3 text-right font-mono text-[13px] font-semibold tabular text-iris-deep">{o.valueScore}</td>
                    <td className="px-3 py-3 text-right">
                      <Button variant="ghost" size="sm" className="text-teal hover:text-teal" onClick={() => toast({ title: o.address, description: o.signal, tone: 'info' })}>
                        <TrendingDown className="h-3.5 w-3.5" /> Details
                      </Button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

function KPI({ label, value, hint, tone }: { label: string; value: string; hint?: string; tone: 'positive' | 'warning' | 'iris' | 'info' }) {
  const toneClass = { positive: 'text-signal-positive', warning: 'text-signal-warning', iris: 'text-iris-deep', info: 'text-signal-info' }[tone]
  return (
    <div className="rounded-xl border border-hairline bg-card p-4 shadow-card-sm">
      <p className="text-[10.5px] uppercase tracking-wide-eyebrow text-ink-subtle">{label}</p>
      <p className={cn('mt-1 font-mono text-[22px] font-semibold tabular', toneClass)}>{value}</p>
      {hint && <p className="text-[10.5px] text-ink-subtle">{hint}</p>}
    </div>
  )
}
