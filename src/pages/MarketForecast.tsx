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
import { Activity, CalendarClock, Gauge, Sparkles, TrendingUp } from 'lucide-react'

import { ChartCard } from '@/components/ChartCard'
import { ChartTooltip } from '@/components/charts/ChartTooltip'
import { InsightRibbon } from '@/components/InsightRibbon'
import { PageHeader } from '@/components/PageHeader'
import { StatTile } from '@/components/StatTile'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/components/ui/toast'
import { FORECAST, MARKET_SIGNALS, RENT_VS_BUY, monthlyPayment } from '@/data/market'
import { formatUSD } from '@/utils/format'
import { cn } from '@/utils/cn'

export function MarketForecast() {
  const { toast } = useToast()
  const [rate, setRate] = useState(6.5)
  const s = MARKET_SIGNALS
  const pay = monthlyPayment(rate)
  const payBase = monthlyPayment(6.5)
  const payDelta = pay - payBase

  return (
    <div className="mx-auto flex w-full max-w-[1380px] flex-col gap-6 animate-fade-in">
      <PageHeader
        eyebrow="Market · Forecast"
        title="Where the market is going — not just where it is."
        display
        ai="Forecast models"
        subtitle="Appreciation forecasts, supply-demand imbalance and a buy-now-vs-wait engine for Avery Ranch. Every projection carries a confidence band, not false precision."
        actions={
          <Badge variant="iris" className="gap-1"><Sparkles className="h-3 w-3" /> Avery Ranch</Badge>
        }
      />

      {/* KPI strip */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatTile label="18-mo appreciation" value={`+${Math.round(s.appreciation18mo * 100)}%`} hint="modelled, mid-case" tone="positive" icon={TrendingUp} />
        <StatTile label="Inventory" value={`${s.inventoryMonths} mo`} hint={`${Math.round(s.inventoryTrend * 100)}% YoY · tightening`} tone="warning" icon={Activity} />
        <StatTile label="Demand vs supply" value={`${s.demandIndex} / ${s.supplyIndex}`} hint="seller's market" tone="iris" icon={Gauge} />
        <StatTile label="Optimal window" value={`${s.optimalWindowDays} days`} hint="entry before lift" tone="positive" icon={CalendarClock} />
      </div>

      {/* Forecast chart */}
      <ChartCard
        eyebrow="Appreciation model"
        title="Projected price index · next 18 months"
        subtitle="Solid teal is actual to today; dashed iris is the forecast mid-case. The shaded band marks the forecast horizon — hover for the bull/bear range."
        bodyClassName="px-2"
      >
        <div className="h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={FORECAST} margin={{ top: 12, right: 16, left: 4, bottom: 4 }}>
              <CartesianGrid stroke="#ECEFEF" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#6B7C85' }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#6B7C85' }} tickLine={false} axisLine={false} domain={[98, 124]} width={32} />
              <ReferenceArea x1="Jun" x2="Jun'" fill="#6366F1" fillOpacity={0.05} />
              <ReferenceLine x="Jun" stroke="#A6B3BA" strokeDasharray="4 4" label={{ value: 'Today', position: 'insideTopRight', fontSize: 10, fill: '#6B7C85' }} />
              <Tooltip
                cursor={{ stroke: '#CFD8D9' }}
                content={({ active, label, payload }) => {
                  const p = payload?.[0]?.payload as (typeof FORECAST)[number] | undefined
                  if (!p) return null
                  const rows = p.actual != null
                    ? [{ label: 'Actual', value: p.actual.toFixed(1), swatch: '#0F766E' }]
                    : [
                        { label: 'Forecast', value: (p.mid ?? 0).toFixed(1), swatch: '#6366F1' },
                        { label: 'Range', value: `${(p.low ?? 0).toFixed(1)}–${((p.low ?? 0) + (p.band ?? 0)).toFixed(1)}`, swatch: '#C7C9F5' },
                      ]
                  return <ChartTooltip active={active} title={String(label)} rows={rows} />
                }}
              />
              <Line dataKey="actual" stroke="#0F766E" strokeWidth={2.4} dot={false} isAnimationActive={false} connectNulls />
              <Line dataKey="mid" stroke="#6366F1" strokeWidth={2} strokeDasharray="5 4" dot={false} isAnimationActive={false} connectNulls />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      <InsightRibbon
        tone="positive"
        icon={TrendingUp}
        headline="Avery Ranch is projected +12% over 18 months, with inventory tightening fast."
        detail="Months-of-supply has fallen 34% year-over-year to 1.8 — a clear seller's market — while employer expansion sustains demand. The model puts the optimal entry window within ~60 days, before the steeper part of the curve."
        confidence={0.86}
        metas={[
          { label: 'Mid-case', value: '+12.0%' },
          { label: 'Bear-case', value: '+6.4%' },
          { label: 'Bull-case', value: '+17.1%' },
        ]}
        actionLabel="Set a price-movement alert"
        onAction={() => toast({ title: 'Alert set', description: 'We’ll notify you on inventory or price-trend shifts in Avery Ranch.', tone: 'success' })}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Rate sensitivity */}
        <section className="rounded-xl border border-hairline bg-card p-5 shadow-card-sm">
          <p className="eyebrow">Interest-rate sensitivity</p>
          <h3 className="mt-1 text-[15px] font-semibold tracking-tight-bank text-ink">Payment simulation</h3>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-[12px] text-ink-subtle">Mortgage rate</span>
            <span className="font-mono text-[18px] font-semibold tabular text-teal">{rate.toFixed(2)}%</span>
          </div>
          <input type="range" min={5} max={8} step={0.05} value={rate} onChange={(e) => setRate(Number(e.target.value))} className="mt-2 w-full accent-teal" />
          <div className="mt-3 rounded-lg bg-canvas-subtle/60 px-3 py-3 text-center">
            <p className="font-mono text-[24px] font-semibold tabular text-ink">{formatUSD(Math.round(pay))}<span className="text-[12px] text-ink-subtle">/mo</span></p>
            <p className={cn('text-[11.5px]', payDelta > 0 ? 'text-signal-risk' : payDelta < 0 ? 'text-signal-positive' : 'text-ink-subtle')}>
              {payDelta === 0 ? 'at baseline 6.50%' : `${payDelta > 0 ? '+' : '−'}${formatUSD(Math.abs(Math.round(payDelta)))}/mo vs 6.50%`}
            </p>
          </div>
          <p className="mt-2 text-[11px] leading-relaxed text-ink-subtle">P&amp;I on a $720K home, 20% down, 30-year fixed.</p>
        </section>

        {/* Rent vs buy */}
        <section className="rounded-xl border border-hairline bg-card p-5 shadow-card-sm">
          <p className="eyebrow">Rent vs buy</p>
          <h3 className="mt-1 text-[15px] font-semibold tracking-tight-bank text-ink">Optimization</h3>
          <div className="mt-3 space-y-2">
            <Row label="Rent / mo" value={formatUSD(RENT_VS_BUY.monthlyRent)} />
            <Row label="Own / mo" value={formatUSD(RENT_VS_BUY.monthlyOwnership)} />
            <Row label="Breakeven" value={`${RENT_VS_BUY.breakevenMonths} mo`} />
          </div>
          <div className="mt-3 rounded-lg bg-signal-positive-soft px-3 py-2.5">
            <p className="font-mono text-[18px] font-semibold tabular text-signal-positive">+{formatUSD(RENT_VS_BUY.fiveYearAdvantage)}</p>
            <p className="text-[11px] text-signal-positive">5-year buy advantage at the mid-case forecast</p>
          </div>
        </section>

        {/* Buy now vs wait */}
        <section className="overflow-hidden rounded-xl border border-iris/40 bg-card shadow-card-sm">
          <div className="accent-rule" aria-hidden />
          <div className="p-5">
            <p className="eyebrow">Buy now vs wait</p>
            <h3 className="mt-1 text-[15px] font-semibold tracking-tight-bank text-ink">Recommendation</h3>
            <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-iris-soft px-3 py-1.5 text-[13px] font-semibold text-iris-deep">
              <Sparkles className="h-3.5 w-3.5" /> Buy within 60 days
            </div>
            <ul className="mt-3 space-y-2 text-[12px] leading-relaxed text-ink-muted">
              <li className="flex gap-2"><span className="text-signal-positive">▲</span> Appreciation outpaces the carrying cost of waiting.</li>
              <li className="flex gap-2"><span className="text-signal-warning">●</span> Inventory tightening reduces choice each month.</li>
              <li className="flex gap-2"><span className="text-signal-info">◆</span> Rate cuts are unlikely to offset the price lift.</li>
            </ul>
            <p className="mt-3 font-mono text-[11px] tabular text-ink-subtle">Volatility: {s.volatility} · confidence 84%</p>
          </div>
        </section>
      </div>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-hairline pb-2 text-[12.5px] last:border-0">
      <span className="text-ink-subtle">{label}</span>
      <span className="font-mono font-semibold tabular text-ink">{value}</span>
    </div>
  )
}
