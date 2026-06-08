import { useMemo, useState } from 'react'
import {
  Briefcase,
  Dumbbell,
  GraduationCap,
  LockOpen,
  type LucideIcon,
  Plane,
  Sparkles,
  Trees,
} from 'lucide-react'

import { InsightRibbon } from '@/components/InsightRibbon'
import { Meter } from '@/components/Meter'
import { PageHeader } from '@/components/PageHeader'
import { StatTile } from '@/components/StatTile'
import { StatusBadge } from '@/components/StatusBadge'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/components/ui/toast'
import { NEIGHBORHOODS } from '@/data/neighborhoods'
import { formatCommute, formatUSDCompact } from '@/utils/format'
import { cn } from '@/utils/cn'

const DESTINATIONS: Array<{ id: string; label: string; icon: LucideIcon }> = [
  { id: 'work', label: 'Work · downtown', icon: Briefcase },
  { id: 'school', label: 'Elementary school', icon: GraduationCap },
  { id: 'gym', label: 'Gym', icon: Dumbbell },
  { id: 'park', label: 'Parks & trails', icon: Trees },
  { id: 'airport', label: 'Airport', icon: Plane },
]

const CLUSTERS = ['Family-friendly', 'Young professionals', 'Suburban quiet', 'Urban vibrant'] as const

const median = (xs: number[]) => {
  const s = [...xs].sort((a, b) => a - b)
  const m = Math.floor(s.length / 2)
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2
}

export function CommuteLifestyle() {
  const { toast } = useToast()
  const [maxCommute, setMaxCommute] = useState(30)
  const [dests, setDests] = useState<string[]>(['work', 'school', 'gym'])
  const [cluster, setCluster] = useState<(typeof CLUSTERS)[number]>('Family-friendly')

  const ranked = useMemo(
    () => [...NEIGHBORHOODS].sort((a, b) => a.commute.rush - b.commute.rush),
    [],
  )
  const unlocked = ranked.filter((n) => n.commute.rush <= maxCommute)
  const baselineUnlocked = ranked.filter((n) => n.commute.rush <= 30)

  const medianUnlocked = unlocked.length ? median(unlocked.map((n) => n.medianPrice)) : 0
  const medianBaseline = baselineUnlocked.length ? median(baselineUnlocked.map((n) => n.medianPrice)) : 0
  const priceDelta = medianBaseline ? (medianUnlocked - medianBaseline) / medianBaseline : 0
  const newlyUnlockedIds = new Set(unlocked.filter((n) => n.commute.rush > 30).map((n) => n.id))

  const toggleDest = (id: string) =>
    setDests((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]))

  return (
    <div className="mx-auto flex w-full max-w-[1380px] flex-col gap-6 animate-fade-in">
      <PageHeader
        eyebrow="Discover · Commute & Lifestyle"
        title="Turn how you live into search criteria."
        display
        ai="Live optimizer"
        subtitle="Commute and lifestyle become quantifiable, tunable intelligence. Loosen a constraint and watch new neighborhoods — and better pricing — unlock in real time."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[340px_minmax(0,1fr)]">
        {/* Controls */}
        <aside className="flex flex-col gap-4">
          <section className="rounded-xl border border-hairline bg-card p-5 shadow-card-sm">
            <div className="flex items-baseline justify-between">
              <p className="eyebrow">Max commute</p>
              <span className="font-mono text-[22px] font-semibold tabular text-teal">{maxCommute}<span className="text-[12px] text-ink-subtle"> min</span></span>
            </div>
            <input
              type="range"
              min={15}
              max={60}
              step={1}
              value={maxCommute}
              onChange={(e) => setMaxCommute(Number(e.target.value))}
              className="mt-3 w-full accent-teal"
            />
            <div className="mt-1 flex justify-between font-mono text-[10px] tabular text-ink-faint">
              <span>15</span><span>30</span><span>45</span><span>60</span>
            </div>
            <p className="mt-3 text-[12px] leading-relaxed text-ink-muted">
              Rush-hour drive time to downtown. <span className="font-medium text-ink">{unlocked.length}</span> of {NEIGHBORHOODS.length} neighborhoods fit this constraint.
            </p>
          </section>

          <section className="rounded-xl border border-hairline bg-card p-5 shadow-card-sm">
            <p className="eyebrow">Optimize for</p>
            <p className="mb-3 mt-0.5 text-[11.5px] text-ink-subtle">Multi-destination — we balance every drive, not just one.</p>
            <div className="flex flex-wrap gap-1.5">
              {DESTINATIONS.map((d) => {
                const on = dests.includes(d.id)
                return (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => toggleDest(d.id)}
                    className={cn(
                      'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11.5px] font-medium transition-colors',
                      on ? 'border-teal/30 bg-teal/8 text-teal' : 'border-hairline bg-card text-ink-subtle hover:border-hairline-strong',
                    )}
                  >
                    <d.icon className="h-3.5 w-3.5" /> {d.label}
                  </button>
                )
              })}
            </div>
          </section>

          <section className="rounded-xl border border-hairline bg-card p-5 shadow-card-sm">
            <p className="eyebrow">Lifestyle cluster</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {CLUSTERS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCluster(c)}
                  className={cn(
                    'rounded-lg border px-2.5 py-2 text-left text-[12px] font-medium transition-colors',
                    cluster === c ? 'border-iris/40 bg-iris-soft/50 text-iris-deep' : 'border-hairline text-ink-muted hover:border-hairline-strong',
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          </section>
        </aside>

        {/* Results */}
        <div className="flex min-w-0 flex-col gap-4">
          {/* KPI strip */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatTile label="Unlocked" value={`${unlocked.length}`} hint={`of ${NEIGHBORHOODS.length}`} tone="teal" />
            <StatTile label="Median price" value={formatUSDCompact(medianUnlocked)} hint={priceDelta < 0 ? `${(priceDelta * 100).toFixed(0)}% vs 30 min` : 'baseline'} tone={priceDelta < 0 ? 'positive' : 'default'} hintPositive={priceDelta < 0} />
            <StatTile label="Fastest" value={formatCommute(unlocked[0]?.commute.rush ?? 0)} hint={unlocked[0]?.name ?? '—'} />
            <StatTile label="New options" value={`+${newlyUnlockedIds.size}`} hint="beyond 30 min" tone={newlyUnlockedIds.size > 0 ? 'iris' : 'default'} />
          </div>

          {priceDelta < -0.02 && (
            <InsightRibbon
              tone="iris"
              icon={LockOpen}
              headline={`Stretching to ${maxCommute} minutes unlocks ${newlyUnlockedIds.size} more neighborhoods at a lower median.`}
              detail={`Allowing up to ${maxCommute} min rush-hour brings ${unlocked.filter((n) => newlyUnlockedIds.has(n.id)).map((n) => n.name).join(' and ')} into range — pulling the median price down ${Math.abs(Math.round(priceDelta * 100))}% versus a strict 30-minute cap, with strong schools and value intact.`}
              confidence={0.88}
              actionLabel="Score homes in the new areas"
              onAction={() => toast({ title: 'New areas', description: 'Opening Home Fit scoring for the newly unlocked neighborhoods.', tone: 'info' })}
            />
          )}

          {/* Unlocked list */}
          <section className="overflow-hidden rounded-xl border border-hairline bg-card shadow-card-sm">
            <div className="flex items-center justify-between gap-2 border-b border-hairline px-4 py-3">
              <h3 className="text-[14px] font-semibold tracking-tight-bank text-ink">Neighborhoods in range</h3>
              <Badge variant="iris" className="gap-1"><Sparkles className="h-3 w-3" /> {cluster}</Badge>
            </div>
            <ul className="divide-y divide-hairline">
              {unlocked.map((n) => {
                const isNew = newlyUnlockedIds.has(n.id)
                return (
                  <li key={n.id} className={cn('flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3 transition-colors', isNew && 'bg-iris-soft/25')}>
                    <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: n.color }} />
                    <div className="min-w-[140px] flex-1">
                      <p className="flex items-center gap-2 text-[13.5px] font-medium text-ink">
                        {n.name}
                        {isNew && <span className="inline-flex items-center gap-1 rounded-full bg-iris text-canvas px-1.5 py-0.5 text-[9.5px] font-semibold"><LockOpen className="h-2.5 w-2.5" /> just unlocked</span>}
                      </p>
                      <p className="text-[11px] text-ink-subtle">{n.metro}</p>
                    </div>
                    <div className="w-16 text-center">
                      <p className="font-mono text-[13px] font-semibold tabular text-ink">{n.commute.rush}<span className="text-[10px] text-ink-subtle"> min</span></p>
                      <p className="text-[9.5px] uppercase tracking-wide-eyebrow text-ink-subtle">commute</p>
                    </div>
                    <div className="w-20 text-center">
                      <p className="font-mono text-[13px] font-semibold tabular text-ink">{formatUSDCompact(n.medianPrice)}</p>
                      <p className="text-[9.5px] uppercase tracking-wide-eyebrow text-ink-subtle">median</p>
                    </div>
                    <div className="hidden w-40 grid-cols-2 gap-2 sm:grid">
                      <Meter label="Walk" value={n.walkScore} compact tone="teal" />
                      <Meter label="Transit" value={n.transitScore} compact tone="iris" />
                    </div>
                    <StatusBadge status={n.trend} />
                  </li>
                )
              })}
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}

