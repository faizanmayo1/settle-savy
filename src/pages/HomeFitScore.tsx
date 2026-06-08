import {
  ArrowRight,
  BedDouble,
  Bath,
  CalendarDays,
  Gem,
  Maximize,
  Sparkles,
} from 'lucide-react'

import { ListingThumb } from '@/components/ListingThumb'
import { PageHeader } from '@/components/PageHeader'
import { ScoreRing } from '@/components/copilot/ScoreRing'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/toast'
import { ALTERNATIVES, FIT_EXPLANATION, FIT_FACTORS, HERO_LISTING, type Listing } from '@/data/listings'
import { formatBeds, formatNumber, formatPercent, formatUSD, formatUSDCompact } from '@/utils/format'
import { cn } from '@/utils/cn'

export function HomeFitScore() {
  const { toast } = useToast()
  const l = HERO_LISTING
  const undervaluedPct = (l.fairValue - l.price) / l.fairValue
  const psf = Math.round(l.price / l.sqft)

  return (
    <div className="mx-auto flex w-full max-w-[1380px] flex-col gap-6 animate-fade-in">
      <PageHeader
        eyebrow="Discover · Home Fit Score"
        title="How well does this home fit you?"
        display
        ai="Predictive fit"
        subtitle="A 0–100 fit score predicted before you ever visit — multi-factor, explainable, and benchmarked against your Buyer DNA. Every point is attributable to a reason."
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
        {/* Main */}
        <div className="flex min-w-0 flex-col gap-5">
          {/* Hero property */}
          <section className="overflow-hidden rounded-xl border border-iris/40 bg-card shadow-card-sm">
            <div className="accent-rule" aria-hidden />
            <div className="grid grid-cols-1 sm:grid-cols-[220px_minmax(0,1fr)]">
              <ListingThumb
                hue={l.hue}
                className="h-44 sm:h-full"
                badge={
                  <span className="inline-flex items-center gap-1 rounded-full bg-card/95 px-2 py-0.5 text-[10.5px] font-semibold text-signal-warning shadow-card-sm">
                    <Gem className="h-3 w-3" /> Hidden gem
                  </span>
                }
              />
              <div className="flex flex-col gap-3 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="text-[18px] font-semibold tracking-tight-bank text-ink">{l.address}</h3>
                    <p className="text-[12.5px] text-ink-subtle">{l.neighborhood} · Austin, TX</p>
                  </div>
                  <ScoreRing value={l.fitScore} caption="fit" tone="iris" size={64} />
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[12.5px] text-ink-muted">
                  <span className="font-mono text-[20px] font-semibold tabular text-ink">{formatUSD(l.price)}</span>
                  <Spec icon={BedDouble} text={`${l.beds} bd`} />
                  <Spec icon={Bath} text={`${l.baths} ba`} />
                  <Spec icon={Maximize} text={`${formatNumber(l.sqft)} ft²`} />
                  <Spec icon={CalendarDays} text={`${l.daysOnMarket} days on market`} />
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {l.tags.map((t) => (
                    <span key={t} className="rounded-md border border-hairline px-2 py-0.5 text-[11px] text-ink-subtle">{t}</span>
                  ))}
                </div>

                <div className="mt-auto flex items-center gap-2 pt-1">
                  <Button size="sm" className="gap-1.5" onClick={() => toast({ title: 'Tour requested', description: 'We shared your availability with the listing agent.', tone: 'success' })}>
                    Schedule a tour
                  </Button>
                  <Button variant="secondary" size="sm" onClick={() => toast({ title: 'Saved', description: `${l.address} added to your shortlist.`, tone: 'info' })}>
                    Save to shortlist
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Factor breakdown */}
          <section className="rounded-xl border border-hairline bg-card p-5 shadow-card-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="eyebrow">Explainable AI</p>
                <h3 className="mt-1 text-[16px] font-semibold tracking-tight-bank text-ink">Why this home scores {l.fitScore}</h3>
              </div>
              <Badge variant="secondary">{Math.round(l.confidence * 100)}% confidence</Badge>
            </div>

            <ul className="mt-4 space-y-4">
              {FIT_FACTORS.map((f) => (
                <li key={f.key} className="flex gap-3">
                  <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-md bg-canvas-subtle text-ink-muted">
                    <f.icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-[13px] font-medium text-ink">{f.label}</p>
                      <span className="font-mono text-[13px] font-semibold tabular text-ink">{f.score}%</span>
                    </div>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-canvas-subtle">
                      <div
                        className={cn('h-full rounded-full', f.score >= 88 ? 'bg-signal-positive' : f.score >= 80 ? 'bg-teal' : 'bg-signal-warning')}
                        style={{ width: `${f.score}%` }}
                      />
                    </div>
                    <p className="mt-1.5 text-[12px] leading-relaxed text-ink-muted">{f.why}</p>
                  </div>
                </li>
              ))}
            </ul>

            <p className="mt-4 rounded-lg border-l-2 border-iris/40 bg-iris-soft/30 px-3 py-2.5 text-[12.5px] leading-relaxed text-ink-muted">
              <span className="font-medium text-iris-deep">In plain English: </span>
              {FIT_EXPLANATION}
            </p>
          </section>
        </div>

        {/* Right rail */}
        <aside className="flex flex-col gap-5">
          {/* Price intelligence */}
          <section className="overflow-hidden rounded-xl border border-hairline bg-card shadow-card-sm">
            <div className="flex items-center gap-2 border-b border-hairline px-4 py-3">
              <span className="grid h-7 w-7 place-items-center rounded-md bg-signal-warning-soft text-signal-warning">
                <Gem className="h-4 w-4" />
              </span>
              <div>
                <h3 className="text-[13.5px] font-semibold tracking-tight-bank text-ink">Price intelligence</h3>
                <p className="text-[11px] text-ink-subtle">List vs modelled fair value</p>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-[11px] text-ink-subtle">List price</p>
                  <p className="font-mono text-[20px] font-semibold tabular text-ink">{formatUSDCompact(l.price)}</p>
                </div>
                <ArrowRight className="mb-1 h-4 w-4 text-ink-faint" />
                <div className="text-right">
                  <p className="text-[11px] text-ink-subtle">Fair value</p>
                  <p className="font-mono text-[20px] font-semibold tabular text-ink">{formatUSDCompact(l.fairValue)}</p>
                </div>
              </div>
              <div className="mt-3 rounded-lg bg-signal-positive-soft px-3 py-2.5 text-center">
                <p className="font-mono text-[22px] font-semibold tabular text-signal-positive">{formatPercent(undervaluedPct)}</p>
                <p className="text-[11px] text-signal-positive">undervalued vs comparable homes</p>
              </div>
              <p className="mt-2 text-center font-mono text-[11px] tabular text-ink-subtle">{formatUSD(psf)}/ft² · {l.daysOnMarket} days on market</p>
            </div>
          </section>

          {/* Better alternatives */}
          <section className="overflow-hidden rounded-xl border border-hairline bg-card shadow-card-sm">
            <div className="flex items-center justify-between gap-2 border-b border-hairline px-4 py-3">
              <div>
                <h3 className="text-[13.5px] font-semibold tracking-tight-bank text-ink">3 stronger alternatives</h3>
                <p className="text-[11px] text-ink-subtle">Higher fit for your Buyer DNA</p>
              </div>
              <Badge variant="iris" className="gap-1"><Sparkles className="h-3 w-3" /> AI</Badge>
            </div>
            <ul className="divide-y divide-hairline">
              {ALTERNATIVES.map((a) => (
                <AlternativeRow key={a.id} listing={a} onView={() => toast({ title: a.address, description: 'Opening the full fit breakdown.', tone: 'info' })} />
              ))}
            </ul>
          </section>
        </aside>
      </div>
    </div>
  )
}

function Spec({ icon: Icon, text }: { icon: typeof BedDouble; text: string }) {
  return (
    <span className="inline-flex items-center gap-1">
      <Icon className="h-3.5 w-3.5 text-ink-faint" /> {text}
    </span>
  )
}

function AlternativeRow({ listing, onView }: { listing: Listing; onView: () => void }) {
  return (
    <li>
      <button type="button" onClick={onView} className="flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors hover:bg-canvas-subtle/60">
        <ListingThumb hue={listing.hue} className="h-12 w-14 shrink-0 rounded-md" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[12.5px] font-medium text-ink">{listing.address}</p>
          <p className="truncate text-[11px] text-ink-subtle">{listing.neighborhood} · {formatBeds(listing.beds, listing.baths)} · {formatUSDCompact(listing.price)}</p>
          <div className="mt-1 flex flex-wrap gap-1">
            {listing.tags.map((t) => (
              <span key={t} className="rounded bg-canvas-subtle px-1.5 py-0.5 text-[10px] text-ink-muted">{t}</span>
            ))}
          </div>
        </div>
        <div className="shrink-0 text-right">
          <p className="font-mono text-[15px] font-semibold tabular text-iris-deep">{listing.fitScore}</p>
          <p className="text-[9.5px] uppercase tracking-wide-eyebrow text-ink-subtle">fit</p>
        </div>
      </button>
    </li>
  )
}
