import { Clock, Flame, Sparkles, TrendingUp, Users, Wallet } from 'lucide-react'

import { PageHeader } from '@/components/PageHeader'
import { ScoreRing } from '@/components/copilot/ScoreRing'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/toast'
import { COMMAND_KPIS, EXPERTISE, LEADS, type Lead } from '@/data/command'
import { formatPercent, formatUSDCompact } from '@/utils/format'
import { cn } from '@/utils/cn'

export function AgentCommandCenter() {
  const { toast } = useToast()
  const k = COMMAND_KPIS
  const hot = LEADS.filter((l) => l.readiness >= 90)

  return (
    <div className="mx-auto flex w-full max-w-[1380px] flex-col gap-6 animate-fade-in">
      <PageHeader
        eyebrow="For Agents · Command Center"
        title="Your highest-intent buyers, ranked to act on."
        display
        ai="Lead intelligence"
        subtitle="The revenue layer for agents — pre-qualified, high-intent leads with readiness scores, conversion probability and the right moment to reach out."
        actions={
          <div className="flex items-center gap-2 rounded-full border border-hairline bg-card px-3 py-1.5 shadow-card-sm">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-teal text-canvas text-[10px] font-semibold">PR</span>
            <span className="text-[12px] font-medium text-ink">Priya Raman</span>
          </div>
        }
      />

      {/* KPI strip */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <KPI label="90%+ ready" value={`${hot.length}`} hint="in your specialty areas" tone="iris" icon={Flame} />
        <KPI label="Pipeline value" value={formatUSDCompact(k.pipelineValue)} hint="active buyers" tone="teal" icon={Wallet} />
        <KPI label="Avg conversion" value={formatPercent(k.avgConversion)} hint="probability" tone="positive" icon={TrendingUp} />
        <KPI label="Avg readiness" value={`${k.avgReadiness}`} hint="top of funnel strong" tone="teal" icon={Users} />
      </div>

      {/* Hot banner */}
      <div className="flex flex-wrap items-center gap-3 overflow-hidden rounded-xl border border-iris/40 bg-iris-soft/40 px-4 py-3">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-iris text-canvas"><Flame className="h-4 w-4" /></span>
        <p className="text-[13px] font-medium text-ink">
          <span className="font-semibold">{hot.length} buyers are 90%+ ready</span> to convert in Mueller, Crestview and Allandale — your highest win-rate areas.
        </p>
        <Button size="sm" className="ml-auto" onClick={() => toast({ title: 'Outreach queued', description: 'Suggested messages drafted for all 5 high-intent buyers.', tone: 'success' })}>
          Action all 5
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        {/* Lead feed */}
        <section className="overflow-hidden rounded-xl border border-hairline bg-card shadow-card-sm">
          <div className="flex items-center justify-between gap-2 border-b border-hairline px-4 py-3">
            <h3 className="text-[14px] font-semibold tracking-tight-bank text-ink">High-intent lead feed</h3>
            <Badge variant="iris" className="gap-1"><Sparkles className="h-3 w-3" /> ranked by readiness</Badge>
          </div>
          <ul className="divide-y divide-hairline">
            {LEADS.map((l) => (
              <LeadRow key={l.id} lead={l} onAct={() => toast({ title: `${l.name}`, description: l.action, tone: 'info' })} />
            ))}
          </ul>
        </section>

        {/* Expertise heatmap */}
        <aside className="flex flex-col gap-5">
          <section className="rounded-xl border border-hairline bg-card p-5 shadow-card-sm">
            <p className="eyebrow">Neighborhood expertise</p>
            <h3 className="mt-1 text-[14px] font-semibold tracking-tight-bank text-ink">Where you win</h3>
            <ul className="mt-3 space-y-2.5">
              {EXPERTISE.map((e) => (
                <li key={e.neighborhood} className="flex items-center gap-2.5">
                  <span className="w-24 shrink-0 truncate text-[12px] text-ink">{e.neighborhood}</span>
                  <div className="h-5 flex-1 overflow-hidden rounded-md bg-canvas-subtle">
                    <div
                      className="flex h-full items-center justify-end rounded-md pr-1.5"
                      style={{ width: `${e.winRate * 100}%`, backgroundColor: heatColor(e.winRate) }}
                    >
                      <span className="font-mono text-[10px] font-semibold tabular text-white">{Math.round(e.winRate * 100)}%</span>
                    </div>
                  </div>
                  <span className="w-12 shrink-0 text-right font-mono text-[11px] tabular text-ink-subtle">{e.deals} won</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-xl border border-hairline bg-card p-5 shadow-card-sm">
            <p className="eyebrow">Follow-up automation</p>
            <ul className="mt-3 space-y-3">
              {[
                { t: 'Wei Chen revisited a listing 3×', a: 'Auto-nudge scheduled · 9:00am' },
                { t: '2 buyers crossed 90% readiness', a: 'Added to today’s call list' },
                { t: 'New Crestview listing matched 4 buyers', a: 'Alerts sent automatically' },
              ].map((row) => (
                <li key={row.t} className="flex gap-2.5">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-iris" />
                  <div>
                    <p className="text-[12px] font-medium text-ink">{row.t}</p>
                    <p className="text-[11px] text-ink-subtle">{row.a}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>
    </div>
  )
}

function heatColor(w: number) {
  if (w >= 0.9) return '#0F766E'
  if (w >= 0.82) return '#129A8B'
  if (w >= 0.75) return '#2BB7A6'
  return '#5FD3C4'
}

function LeadRow({ lead, onAct }: { lead: Lead; onAct: () => void }) {
  return (
    <li className="flex flex-wrap items-center gap-x-4 gap-y-3 px-4 py-3.5 transition-colors hover:bg-canvas-subtle/40">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-[12px] font-semibold text-canvas tabular" style={{ backgroundColor: lead.hue }}>{lead.initials}</span>

      <div className="min-w-[150px] flex-1">
        <div className="flex items-center gap-2">
          <p className="text-[13.5px] font-semibold text-ink">{lead.name}</p>
          {lead.readiness >= 90 && <span className="inline-flex items-center gap-1 rounded-full bg-iris-soft px-1.5 py-0.5 text-[9.5px] font-semibold text-iris-deep"><Flame className="h-2.5 w-2.5" /> hot</span>}
        </div>
        <p className="text-[11.5px] text-ink-subtle">{lead.budget} · {lead.target}</p>
        <p className="mt-0.5 text-[11.5px] leading-relaxed text-ink-muted">{lead.signal}</p>
      </div>

      <div className="hidden text-center sm:block">
        <ScoreRing value={lead.readiness} caption="ready" tone={lead.readiness >= 90 ? 'iris' : 'teal'} size={48} stroke={5} />
      </div>

      <div className="w-24 text-center">
        <p className="font-mono text-[15px] font-semibold tabular text-signal-positive">{Math.round(lead.conversion * 100)}%</p>
        <p className="text-[9.5px] uppercase tracking-wide-eyebrow text-ink-subtle">convert</p>
      </div>

      <div className="min-w-[150px] flex-1">
        <p className="text-[11.5px] font-medium text-ink">{lead.action}</p>
        <p className="inline-flex items-center gap-1 text-[10.5px] text-ink-subtle"><Clock className="h-3 w-3" /> {lead.timing}</p>
      </div>

      <Button size="sm" variant={lead.readiness >= 90 ? 'default' : 'secondary'} onClick={onAct}>Reach out</Button>
    </li>
  )
}

function KPI({ label, value, hint, tone, icon: Icon }: { label: string; value: string; hint?: string; tone: 'iris' | 'teal' | 'positive'; icon: typeof Users }) {
  const toneClass = { iris: 'text-iris-deep', teal: 'text-teal', positive: 'text-signal-positive' }[tone]
  return (
    <div className="rounded-xl border border-hairline bg-card p-4 shadow-card-sm">
      <div className="flex items-center justify-between">
        <p className="text-[10.5px] uppercase tracking-wide-eyebrow text-ink-subtle">{label}</p>
        <Icon className="h-3.5 w-3.5 text-ink-faint" />
      </div>
      <p className={cn('mt-1.5 font-mono text-[22px] font-semibold tabular', toneClass)}>{value}</p>
      {hint && <p className="text-[10.5px] text-ink-subtle">{hint}</p>}
    </div>
  )
}
