import { useState } from 'react'
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceArea,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Check, GraduationCap, Plus, TrendingUp } from 'lucide-react'

import { ChartCard } from '@/components/ChartCard'
import { ChartTooltip } from '@/components/charts/ChartTooltip'
import { InsightRibbon } from '@/components/InsightRibbon'
import { Meter } from '@/components/Meter'
import { PageHeader } from '@/components/PageHeader'
import { RiskBadge } from '@/components/RiskBadge'
import { StatusBadge } from '@/components/StatusBadge'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/toast'
import {
  NEIGHBORHOODS,
  PRICE_INDEX_SERIES,
  TODAY_QUARTER,
  getNeighborhood,
} from '@/data/neighborhoods'
import { formatCommute, formatPercent, formatPSF, formatUSDCompact } from '@/utils/format'
import { cn } from '@/utils/cn'

const INDEX_ROWS: Array<{ key: keyof (typeof NEIGHBORHOODS)[number]['indices']; label: string }> = [
  { key: 'safety', label: 'Safety' },
  { key: 'education', label: 'Education' },
  { key: 'affordability', label: 'Affordability' },
  { key: 'lifestyle', label: 'Lifestyle' },
  { key: 'appreciation', label: 'Appreciation' },
]

export function NeighborhoodIntelligence() {
  const { toast } = useToast()
  const [selected, setSelected] = useState<string[]>(['mueller', 'crestview', 'avery-ranch'])

  const toggle = (id: string) => {
    setSelected((cur) => {
      if (cur.includes(id)) return cur.length > 1 ? cur.filter((x) => x !== id) : cur
      if (cur.length >= 3) {
        toast({ title: 'Compare up to 3', description: 'Remove one to add another neighborhood.', tone: 'warning' })
        return cur
      }
      return [...cur, id]
    })
  }

  const cols = selected.map((id) => getNeighborhood(id)!).filter(Boolean)

  return (
    <div className="mx-auto flex w-full max-w-[1380px] flex-col gap-6 animate-fade-in">
      <PageHeader
        eyebrow="Discover · Neighborhood Intelligence"
        title="A living graph of where you could live."
        display
        ai="Neighborhood graph"
        subtitle="Not static listings — a unified model of each neighborhood across safety, schools, commute and appreciation, updated as the data moves. Compare up to three side-by-side."
        actions={
          <Button variant="secondary" size="sm" className="gap-1.5" onClick={() => toast({ title: 'Export', description: 'Comparison exported as a shareable PDF brief.', tone: 'success' })}>
            <Plus className="h-3.5 w-3.5" /> Export comparison
          </Button>
        }
      />

      {/* Selector */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[10.5px] uppercase tracking-wide-eyebrow text-ink-subtle">Compare</span>
        {NEIGHBORHOODS.map((n) => {
          const on = selected.includes(n.id)
          return (
            <button
              key={n.id}
              type="button"
              onClick={() => toggle(n.id)}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[12px] font-medium transition-colors',
                on ? 'border-teal/30 bg-teal/8 text-teal' : 'border-hairline bg-card text-ink-muted hover:border-hairline-strong',
              )}
            >
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: on ? n.color : '#CFD8D9' }} />
              {n.name}
              {on && <Check className="h-3 w-3" />}
            </button>
          )
        })}
      </div>

      {/* Compare columns */}
      <div className={cn('grid grid-cols-1 gap-4', cols.length === 3 ? 'lg:grid-cols-3' : cols.length === 2 ? 'sm:grid-cols-2' : '')}>
        {cols.map((n) => (
          <section key={n.id} className="overflow-hidden rounded-xl border border-hairline bg-card shadow-card-sm">
            <div className="h-1" style={{ backgroundColor: n.color }} aria-hidden />
            <div className="flex items-start justify-between gap-2 px-4 pt-3.5">
              <div>
                <h3 className="text-[16px] font-semibold tracking-tight-bank text-ink">{n.name}</h3>
                <p className="text-[11.5px] text-ink-subtle">{n.metro}</p>
              </div>
              <StatusBadge status={n.trend} />
            </div>
            <div className="grid grid-cols-2 gap-2 px-4 py-3">
              <Stat label="Median" value={formatUSDCompact(n.medianPrice)} />
              <Stat label="$ / ft²" value={formatPSF(n.pricePerSqft).replace('/ft²', '')} />
              <Stat label="Commute" value={formatCommute(n.commute.rush)} hint="rush hr" />
              <Stat label="18-mo growth" value={formatPercent(n.appreciation18mo)} tone="positive" />
            </div>
            <div className="space-y-2.5 border-t border-hairline px-4 py-3">
              {INDEX_ROWS.map((r) => (
                <Meter key={r.key} label={r.label} value={n.indices[r.key]} />
              ))}
            </div>
            <div className="flex items-center gap-2 border-t border-hairline px-4 py-2.5">
              <RiskBadge level={n.safetyLevel} />
              <span className="inline-flex items-center gap-1 text-[11px] text-ink-subtle">
                <GraduationCap className="h-3 w-3" /> Schools {n.schoolRating.toFixed(1)}/10
              </span>
            </div>
          </section>
        ))}
      </div>

      {/* Appreciation forecast */}
      <ChartCard
        eyebrow="Temporal intelligence"
        title="Projected price appreciation"
        subtitle="Indexed to 100 at the start of the window · shaded region is the AI forecast beyond today."
        rightSlot={<Badge variant="iris" className="gap-1"><TrendingUp className="h-3 w-3" /> 18-mo forecast</Badge>}
        bodyClassName="px-2"
      >
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={PRICE_INDEX_SERIES} margin={{ top: 12, right: 16, left: 4, bottom: 4 }}>
              <CartesianGrid stroke="#ECEFEF" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="q" tick={{ fontSize: 11, fill: '#6B7C85' }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#6B7C85' }} tickLine={false} axisLine={false} domain={[98, 'auto']} width={32} />
              <ReferenceArea x1={TODAY_QUARTER} x2="26 Q2" fill="#6366F1" fillOpacity={0.05} />
              <ReferenceLine x={TODAY_QUARTER} stroke="#A6B3BA" strokeDasharray="4 4" label={{ value: 'Today', position: 'insideTopRight', fontSize: 10, fill: '#6B7C85' }} />
              <Tooltip
                cursor={{ stroke: '#CFD8D9' }}
                content={({ active, label, payload }) => (
                  <ChartTooltip
                    active={active}
                    title={`20${label}`}
                    rows={(payload ?? []).map((p) => ({
                      label: getNeighborhood(String(p.dataKey))?.name ?? String(p.dataKey),
                      value: `${Number(p.value).toFixed(1)}`,
                      swatch: p.color,
                    }))}
                  />
                )}
              />
              {cols.map((n) => (
                <Line
                  key={n.id}
                  type="monotone"
                  dataKey={n.id}
                  stroke={n.color}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4 }}
                  isAnimationActive={false}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      {/* Deltas + temporal narrative */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <ChartCard eyebrow="School ranking" title="Education delta" subtitle="Rating /10 and year-over-year change." bodyClassName="px-4 pb-4">
          <ul className="space-y-3">
            {cols.map((n) => (
              <li key={n.id} className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: n.color }} />
                <span className="w-24 shrink-0 truncate text-[12.5px] text-ink">{n.name}</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-canvas-subtle">
                  <div className="h-full rounded-full" style={{ width: `${(n.schoolRating / 10) * 100}%`, backgroundColor: n.color }} />
                </div>
                <span className="w-10 shrink-0 text-right font-mono text-[12px] font-semibold tabular text-ink">{n.schoolRating.toFixed(1)}</span>
                <span className="w-12 shrink-0 text-right font-mono text-[11px] tabular text-signal-positive">▲{n.schoolDelta.toFixed(1)}</span>
              </li>
            ))}
          </ul>
        </ChartCard>

        <ChartCard eyebrow="Commute variability" title="Off-peak vs rush hour" subtitle="Downtown drive time, minutes." bodyClassName="px-4 pb-4">
          <ul className="space-y-3.5">
            {cols.map((n) => {
              const max = 50
              return (
                <li key={n.id}>
                  <div className="flex items-center justify-between text-[12px]">
                    <span className="flex items-center gap-1.5 text-ink">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: n.color }} /> {n.name}
                    </span>
                    <span className="font-mono tabular text-ink-muted">{n.commute.offPeak}–{n.commute.rush} min</span>
                  </div>
                  <div className="relative mt-1.5 h-2 rounded-full bg-canvas-subtle">
                    <div
                      className="absolute top-0 h-full rounded-full opacity-90"
                      style={{ left: `${(n.commute.offPeak / max) * 100}%`, width: `${((n.commute.rush - n.commute.offPeak) / max) * 100}%`, backgroundColor: n.color }}
                    />
                  </div>
                </li>
              )
            })}
          </ul>
        </ChartCard>

        <ChartCard eyebrow="Walk & transit" title="Getting around" subtitle="Walkability and transit access scores." bodyClassName="px-4 pb-4">
          <div className="space-y-3.5">
            {cols.map((n) => (
              <div key={n.id} className="space-y-1.5">
                <p className="flex items-center gap-1.5 text-[12.5px] font-medium text-ink">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: n.color }} /> {n.name}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <Meter label="Walk" value={n.walkScore} compact tone="teal" />
                  <Meter label="Transit" value={n.transitScore} compact tone="iris" />
                </div>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* Temporal narrative + insight */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <section className="rounded-xl border border-hairline bg-card p-5 shadow-card-sm">
          <p className="eyebrow">How these are changing</p>
          <ul className="mt-3 space-y-3.5">
            {cols.map((n) => (
              <li key={n.id} className="flex gap-3">
                <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: n.color }} />
                <p className="text-[12.5px] leading-relaxed text-ink-muted">
                  <span className="font-medium text-ink">{n.name}.</span> {n.changing}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <InsightRibbon
          tone="iris"
          icon={TrendingUp}
          headline="Crestview edges ahead on the school-to-commute trade you care about."
          detail="Across your three, Crestview pairs a 9.2 school rating with a 26-minute rush commute and the second-strongest 18-month forecast — while Avery Ranch wins on price and growth, its 41-minute rush commute is the deciding constraint."
          confidence={0.9}
          metas={[
            { label: 'Best schools', value: 'Allandale 9.5' },
            { label: 'Best growth', value: 'Avery +12%' },
            { label: 'Best balance', value: 'Crestview' },
          ]}
          actionLabel="Score homes in Crestview"
          onAction={() => toast({ title: 'Crestview', description: 'Opening Home Fit scoring for Crestview listings.', tone: 'info' })}
        />
      </div>
    </div>
  )
}

function Stat({ label, value, hint, tone }: { label: string; value: string; hint?: string; tone?: 'positive' }) {
  return (
    <div className="rounded-md border border-hairline bg-canvas-subtle/50 px-2.5 py-1.5">
      <p className="text-[10px] uppercase tracking-wide-eyebrow text-ink-subtle">{label}</p>
      <p className={cn('mt-0.5 font-mono text-[14px] font-semibold tabular', tone === 'positive' ? 'text-signal-positive' : 'text-ink')}>
        {value}
        {hint && <span className="ml-1 font-sans text-[10px] font-normal text-ink-subtle">{hint}</span>}
      </p>
    </div>
  )
}
