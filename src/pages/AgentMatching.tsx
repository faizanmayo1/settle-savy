import { CalendarPlus, MapPin, Sparkles, Star, Trophy, UserCheck } from 'lucide-react'

import { Meter } from '@/components/Meter'
import { PageHeader } from '@/components/PageHeader'
import { ScoreRing } from '@/components/copilot/ScoreRing'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/toast'
import { AGENTS, type AgentProfile } from '@/data/agents'
import { cn } from '@/utils/cn'

export function AgentMatching() {
  const { toast } = useToast()
  const ranked = [...AGENTS].sort((a, b) => b.compatibility - a.compatibility)
  const top3 = ranked.slice(0, 3)
  const rest = ranked.slice(3)

  return (
    <div className="mx-auto flex w-full max-w-[1380px] flex-col gap-6 animate-fade-in">
      <PageHeader
        eyebrow="Decide · Agent Matching"
        title="Matched on data, not just geography."
        display
        ai="Compatibility engine"
        subtitle="Every agent carries an intelligence profile — neighborhood expertise, historical success, closing speed and buyer-type fit. We rank them against your Buyer DNA and explain each call."
      />

      {/* Buyer context */}
      <div className="flex flex-wrap items-center gap-2 rounded-xl border border-hairline bg-card px-4 py-3 shadow-card-sm">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-teal text-canvas text-[11px] font-semibold tabular">MD</span>
        <span className="text-[13px] font-medium text-ink">Maya Donnelly</span>
        <span className="text-[12px] text-ink-subtle">· School-first relocation · 4 bd ≤ $900K · Mueller / Crestview / Avery Ranch</span>
        <Badge variant="iris" className="ml-auto gap-1"><Sparkles className="h-3 w-3" /> {ranked.length} agents scored</Badge>
      </div>

      {/* Top 3 */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {top3.map((a, i) => (
          <FeatureCard key={a.id} agent={a} rank={i + 1} onConnect={() => toast({ title: 'Intro requested', description: `${a.name} will reach out. We shared your Buyer DNA, not your contact details.`, tone: 'success' })} />
        ))}
      </div>

      {/* Remaining roster */}
      <section className="overflow-hidden rounded-xl border border-hairline bg-card shadow-card-sm">
        <div className="flex items-center justify-between gap-2 border-b border-hairline px-4 py-3">
          <h3 className="text-[14px] font-semibold tracking-tight-bank text-ink">Other agents considered</h3>
          <span className="text-[11px] text-ink-subtle">ranked by compatibility · with reasoning</span>
        </div>
        <ul className="divide-y divide-hairline">
          {rest.map((a) => (
            <li key={a.id} className="flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-[11px] font-semibold text-canvas tabular" style={{ backgroundColor: a.hue }}>{a.initials}</span>
              <div className="min-w-[160px] flex-1">
                <p className="text-[13px] font-medium text-ink">{a.name}</p>
                <p className="text-[11.5px] text-ink-subtle">{a.title}</p>
              </div>
              <p className="hidden max-w-[360px] flex-1 text-[11.5px] leading-relaxed text-ink-muted md:block">{a.reason}</p>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[15px] font-semibold tabular text-ink-muted">{a.compatibility}</span>
                <span className="text-[9.5px] uppercase tracking-wide-eyebrow text-ink-subtle">fit</span>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

function FeatureCard({ agent, rank, onConnect }: { agent: AgentProfile; rank: number; onConnect: () => void }) {
  const isTop = rank === 1
  return (
    <article className={cn('relative overflow-hidden rounded-xl border bg-card shadow-card-sm transition-shadow hover:shadow-card-md', isTop ? 'border-iris/40' : 'border-hairline')}>
      {isTop && <div className="accent-rule" aria-hidden />}
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className="relative">
            <span className="grid h-12 w-12 place-items-center rounded-full text-[14px] font-semibold text-canvas tabular" style={{ backgroundColor: agent.hue }}>{agent.initials}</span>
            <span className="absolute -bottom-1 -right-1 grid h-5 w-5 place-items-center rounded-full bg-card text-[10px] font-bold text-ink shadow-card-sm ring-1 ring-hairline">{rank}</span>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <p className="truncate text-[15px] font-semibold tracking-tight-bank text-ink">{agent.name}</p>
              {isTop && <Badge variant="iris" className="gap-1"><Trophy className="h-3 w-3" /> Best</Badge>}
            </div>
            <p className="truncate text-[11.5px] text-ink-subtle">{agent.title}</p>
          </div>
          <ScoreRing value={agent.compatibility} caption="fit" tone="iris" size={52} stroke={5} />
        </div>

        <p className="mt-2 inline-flex items-center gap-1 text-[11px] text-ink-subtle">
          <MapPin className="h-3 w-3" /> {agent.neighborhoods.join(' · ')}
        </p>

        {/* Compatibility breakdown */}
        <div className="mt-3 space-y-2 rounded-lg bg-canvas-subtle/50 p-3">
          <Meter label="Neighborhood expertise" value={agent.breakdown.neighborhoodExpertise} tone="iris" />
          <Meter label="Track record" value={agent.breakdown.trackRecord} tone="iris" />
          <Meter label="Buyer-type fit" value={agent.breakdown.buyerTypeFit} tone="iris" />
        </div>

        {/* Stats */}
        <div className="mt-3 grid grid-cols-3 gap-2">
          <Stat label="Win rate" value={`${Math.round(agent.successRate * 100)}%`} />
          <Stat label="Avg close" value={`${agent.avgDaysToClose}d`} />
          <Stat label="CSAT" value={(agent.satisfaction * 5).toFixed(1)} star />
        </div>

        <p className="mt-3 text-[11.5px] leading-relaxed text-ink-muted">{agent.reason}</p>

        <Button variant={isTop ? 'default' : 'secondary'} size="sm" className="mt-3 w-full gap-1.5" onClick={onConnect}>
          {isTop ? <UserCheck className="h-3.5 w-3.5" /> : <CalendarPlus className="h-3.5 w-3.5" />}
          {isTop ? 'Connect with Priya' : 'Book intro call'}
        </Button>
      </div>
    </article>
  )
}

function Stat({ label, value, star }: { label: string; value: string; star?: boolean }) {
  return (
    <div className="rounded-md border border-hairline bg-card px-2 py-1.5 text-center">
      <p className="inline-flex items-center justify-center gap-0.5 font-mono text-[13px] font-semibold tabular text-ink">
        {star && <Star className="h-3 w-3 fill-signal-warning text-signal-warning" />}{value}
      </p>
      <p className="mt-0.5 text-[9px] uppercase tracking-wide-eyebrow text-ink-subtle">{label}</p>
    </div>
  )
}
