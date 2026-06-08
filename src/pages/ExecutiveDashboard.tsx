import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Activity, BarChart3, Target, TrendingUp, Users } from 'lucide-react'

import { ChartCard } from '@/components/ChartCard'
import { ChartTooltip } from '@/components/charts/ChartTooltip'
import { PageHeader } from '@/components/PageHeader'
import { ScoreRing } from '@/components/copilot/ScoreRing'
import { Badge } from '@/components/ui/badge'
import {
  AGENT_LEADERBOARD,
  CONVERSION_TREND,
  COVERAGE_GAPS,
  EXEC_KPIS,
  FAST_SEGMENTS,
  TOP_NEIGHBORHOODS,
} from '@/data/executive'
import { formatCompact, formatPercent, formatUSDCompact } from '@/utils/format'
import { cn } from '@/utils/cn'

export function ExecutiveDashboard() {
  const k = EXEC_KPIS
  const maxConv = Math.max(...TOP_NEIGHBORHOODS.map((n) => n.conversion))

  return (
    <div className="mx-auto flex w-full max-w-[1380px] flex-col gap-6 animate-fade-in">
      <PageHeader
        eyebrow="For Agents · Executive Dashboard"
        title="The platform at a glance."
        display
        ai="Platform intelligence"
        subtitle="Conversion, agent performance, demand and prediction accuracy across the SettleSavvy network — and where the next revenue is hiding."
        actions={<Badge variant="secondary">Austin–Round Rock · YTD</Badge>}
      />

      {/* KPI strip */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <KPI label="Active buyers" value={formatCompact(k.activeBuyers)} hint="this month" icon={Users} />
        <KPI label="Conversion rate" value={formatPercent(k.conversionRate)} hint={`▲ ${(k.conversionDelta * 100).toFixed(1)}pts YoY`} tone="positive" icon={TrendingUp} />
        <KPI label="GMV" value={formatUSDCompact(k.gmv)} hint="closed volume" icon={BarChart3} />
        <KPI label="Prediction accuracy" value={formatPercent(k.predictionAccuracy)} hint="fit-score vs outcome" tone="iris" icon={Target} />
      </div>

      {/* Conversion trend + top neighborhoods */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <ChartCard eyebrow="Conversion analytics" title="Buyer conversion trend" subtitle="Share of active buyers reaching a closed decision, monthly." bodyClassName="px-2">
          <div className="h-[260px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={CONVERSION_TREND} margin={{ top: 12, right: 16, left: 4, bottom: 4 }}>
                <defs>
                  <linearGradient id="convfill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0F766E" stopOpacity={0.22} />
                    <stop offset="100%" stopColor="#0F766E" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#ECEFEF" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#6B7C85' }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#6B7C85' }} tickLine={false} axisLine={false} domain={[12, 20]} width={30} unit="%" />
                <Tooltip
                  cursor={{ stroke: '#CFD8D9' }}
                  content={({ active, label, payload }) => (
                    <ChartTooltip
                      active={active}
                      title={String(label)}
                      rows={[
                        { label: 'Conversion', value: `${Number(payload?.[0]?.value ?? 0).toFixed(1)}%`, swatch: '#0F766E' },
                        { label: 'Buyers', value: formatCompact((payload?.[0]?.payload as { buyers: number } | undefined)?.buyers ?? 0) },
                      ]}
                    />
                  )}
                />
                <Area type="monotone" dataKey="conversion" stroke="#0F766E" strokeWidth={2.4} fill="url(#convfill)" isAnimationActive={false} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard eyebrow="Demand" title="Top-converting neighborhoods" subtitle="Conversion rate and closed deals, YTD." bodyClassName="px-4 pb-4">
          <ul className="space-y-3">
            {TOP_NEIGHBORHOODS.map((n) => (
              <li key={n.name}>
                <div className="flex items-center justify-between text-[12.5px]">
                  <span className="flex items-center gap-1.5 font-medium text-ink">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: n.color }} /> {n.name}
                  </span>
                  <span className="font-mono tabular text-ink-muted">{n.conversion}% · {n.deals} deals</span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-canvas-subtle">
                  <div className="h-full rounded-full" style={{ width: `${(n.conversion / maxConv) * 100}%`, backgroundColor: n.color }} />
                </div>
              </li>
            ))}
          </ul>
        </ChartCard>
      </div>

      {/* Agent leaderboard + accuracy + segments */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <section className="overflow-hidden rounded-xl border border-hairline bg-card shadow-card-sm">
          <div className="flex items-center justify-between gap-2 border-b border-hairline px-4 py-3">
            <h3 className="text-[14px] font-semibold tracking-tight-bank text-ink">Agent performance</h3>
            <span className="text-[11px] text-ink-subtle">ranked by closed deals</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px]">
              <thead>
                <tr className="border-b border-hairline text-[10.5px] uppercase tracking-wide-eyebrow text-ink-subtle">
                  <th className="px-4 py-2.5 text-left font-medium">Agent</th>
                  <th className="px-3 py-2.5 text-right font-medium">Deals</th>
                  <th className="px-3 py-2.5 text-right font-medium">Conversion</th>
                  <th className="px-3 py-2.5 text-right font-medium">CSAT</th>
                  <th className="px-3 py-2.5 text-right font-medium">Trend</th>
                </tr>
              </thead>
              <tbody>
                {AGENT_LEADERBOARD.map((a, i) => (
                  <tr key={a.name} className="border-b border-hairline last:border-0 hover:bg-canvas-subtle/50">
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-2.5">
                        <span className="w-4 text-right font-mono text-[11px] tabular text-ink-faint">{i + 1}</span>
                        <span className="grid h-7 w-7 place-items-center rounded-full text-[10px] font-semibold text-canvas tabular" style={{ backgroundColor: a.hue }}>{a.initials}</span>
                        <span className="text-[12.5px] font-medium text-ink">{a.name}</span>
                      </div>
                    </td>
                    <td className="px-3 py-2.5 text-right font-mono text-[12.5px] font-semibold tabular text-ink">{a.deals}</td>
                    <td className="px-3 py-2.5 text-right font-mono text-[12.5px] tabular text-ink-muted">{Math.round(a.conversion * 100)}%</td>
                    <td className="px-3 py-2.5 text-right font-mono text-[12.5px] tabular text-ink-muted">{(a.satisfaction * 5).toFixed(1)}</td>
                    <td className={cn('px-3 py-2.5 text-right font-mono text-[12px] tabular', a.trend >= 0 ? 'text-signal-positive' : 'text-signal-risk')}>
                      {a.trend >= 0 ? '▲' : '▼'} {Math.abs(Math.round(a.trend * 100))}pts
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="flex flex-col gap-4">
          <section className="flex items-center gap-4 rounded-xl border border-hairline bg-card p-5 shadow-card-sm">
            <ScoreRing value={k.predictionAccuracy * 100} caption="acc." tone="iris" size={76} stroke={7} />
            <div>
              <p className="eyebrow">Prediction accuracy</p>
              <h3 className="mt-1 text-[15px] font-semibold tracking-tight-bank text-ink">Fit score vs outcome</h3>
              <p className="mt-1 text-[12px] leading-relaxed text-ink-muted">
                91% of homes scored 85+ closed within 5% of the predicted fit — calibration improving each quarter.
              </p>
            </div>
          </section>

          <section className="rounded-xl border border-hairline bg-card p-5 shadow-card-sm">
            <p className="eyebrow">Fastest-growing segments</p>
            <ul className="mt-3 space-y-2.5">
              {FAST_SEGMENTS.map((s) => (
                <li key={s.segment} className="flex items-center justify-between gap-2">
                  <span className="text-[12.5px] text-ink">{s.segment}</span>
                  <span className="flex items-center gap-2">
                    <span className="font-mono text-[11px] tabular text-ink-subtle">{formatPercent(s.share)} share</span>
                    <span className="font-mono text-[12px] font-semibold tabular text-signal-positive">▲{Math.round(s.growth * 100)}%</span>
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      {/* Coverage gaps */}
      <section className="overflow-hidden rounded-xl border border-hairline bg-card shadow-card-sm">
        <div className="flex items-center justify-between gap-2 border-b border-hairline px-4 py-3">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-iris-deep" />
            <h3 className="text-[14px] font-semibold tracking-tight-bank text-ink">Market coverage gaps</h3>
          </div>
          <Badge variant="iris">revenue opportunity</Badge>
        </div>
        <ul className="grid grid-cols-1 divide-y divide-hairline md:grid-cols-3 md:divide-x md:divide-y-0">
          {COVERAGE_GAPS.map((g) => (
            <li key={g.area} className="p-4">
              <div className="flex items-center justify-between">
                <p className="text-[13px] font-semibold text-ink">{g.area}</p>
                <span className="font-mono text-[12px] tabular text-ink-subtle">{g.agents} agents</span>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-wide-eyebrow text-ink-subtle">Demand</span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-canvas-subtle">
                  <div className="h-full rounded-full bg-signal-warning" style={{ width: `${g.demand}%` }} />
                </div>
                <span className="font-mono text-[11px] tabular text-ink-muted">{g.demand}</span>
              </div>
              <p className="mt-2 text-[11.5px] leading-relaxed text-ink-muted">{g.note}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

function KPI({ label, value, hint, tone = 'neutral', icon: Icon }: { label: string; value: string; hint?: string; tone?: 'positive' | 'iris' | 'neutral'; icon: typeof Users }) {
  const toneClass = tone === 'positive' ? 'text-signal-positive' : tone === 'iris' ? 'text-iris-deep' : 'text-ink'
  return (
    <div className="rounded-xl border border-hairline bg-card p-4 shadow-card-sm">
      <div className="flex items-center justify-between">
        <p className="text-[10.5px] uppercase tracking-wide-eyebrow text-ink-subtle">{label}</p>
        <Icon className="h-3.5 w-3.5 text-ink-faint" />
      </div>
      <p className={cn('mt-1.5 font-mono text-[22px] font-semibold tabular', toneClass)}>{value}</p>
      {hint && <p className={cn('text-[10.5px]', tone === 'positive' ? 'text-signal-positive' : 'text-ink-subtle')}>{hint}</p>}
    </div>
  )
}
