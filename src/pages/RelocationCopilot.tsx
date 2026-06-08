import { useState } from 'react'
import {
  ArrowRight,
  Compass,
  Fingerprint,
  ListOrdered,
  Map as MapIcon,
  Mic,
  Plus,
  ScanText,
  SlidersHorizontal,
  Sparkles,
  Wand2,
} from 'lucide-react'

import { AIGenerationFlow, type AIStep } from '@/components/AIGenerationFlow'
import { DataFusionBar } from '@/components/DataFusionBar'
import { AgentSuggestionCard } from '@/components/copilot/AgentSuggestionCard'
import { BuyerDNAPanel } from '@/components/copilot/BuyerDNAPanel'
import { NeighborhoodMatchCard } from '@/components/copilot/NeighborhoodMatchCard'
import { ScoreRing } from '@/components/copilot/ScoreRing'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/toast'
import {
  AGENT_SUGGESTIONS,
  BUYER_BRIEF,
  BUYER_DNA,
  CONVERSATION,
  NEIGHBORHOOD_MATCHES,
  REFINEMENTS,
  RESOLVED_SUMMARY,
} from '@/data/copilot'
import type { NeighborhoodMatch } from '@/types/copilot'
import { formatNumber } from '@/utils/format'
import { cn } from '@/utils/cn'

const FLOW_STEPS: AIStep[] = [
  { label: 'Parsing lifestyle intent', icon: ScanText },
  { label: 'Building your Buyer DNA model', icon: Fingerprint },
  { label: 'Weighing affordability · commute · safety · schools', icon: SlidersHorizontal },
  { label: 'Scanning 5,000 neighborhoods · 50,000 listings', icon: MapIcon },
  { label: 'Ranking matches & scoring confidence', icon: ListOrdered },
]

export function RelocationCopilot() {
  const { toast } = useToast()
  const [brief, setBrief] = useState(BUYER_BRIEF)
  const [resolved, setResolved] = useState(false)
  const [flowOpen, setFlowOpen] = useState(false)

  const lead = NEIGHBORHOOD_MATCHES[0]

  const resolve = () => setFlowOpen(true)

  const refine = (text: string) => {
    setBrief((b) => `${b} ${text}.`)
    toast({ title: 'Brief refined', description: `“${text}” — re-running the match engine.`, tone: 'info' })
    setFlowOpen(true)
  }

  return (
    <div className="mx-auto flex w-full max-w-[1380px] flex-col gap-6 animate-fade-in">
      {/* Page header */}
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="eyebrow">Discover · Relocation Copilot</span>
            <Badge variant="iris" className="gap-1">
              <Sparkles className="h-3 w-3" /> AI decision engine
            </Badge>
          </div>
          <h2 className="font-display text-[30px] font-semibold leading-tight tracking-tight-bank text-ink">
            Tell us how you want to live. We&apos;ll rank where.
          </h2>
          <p className="max-w-[680px] text-sm leading-relaxed text-ink-muted">
            The Copilot replaces keyword search with a decision engine — it understands lifestyle intent, builds a
            Buyer DNA model, and reasons across affordability, commute, safety and schools to rank neighborhoods with
            explainable confidence.
          </p>
        </div>
        <Button variant="secondary" size="sm" className="gap-1.5" onClick={() => { setResolved(false); setBrief(BUYER_BRIEF) }}>
          <Plus className="h-3.5 w-3.5" /> New brief
        </Button>
      </header>

      <DataFusionBar />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        {/* Main column */}
        <div className="flex min-w-0 flex-col gap-5">
          {/* Intent composer */}
          <section className="overflow-hidden rounded-xl border border-hairline bg-card shadow-card-sm">
            <div className="accent-rule" aria-hidden />
            <div className="flex items-center gap-2 border-b border-hairline px-4 py-3">
              <span className="grid h-7 w-7 place-items-center rounded-md bg-iris text-canvas">
                <Compass className="h-4 w-4" />
              </span>
              <div className="flex-1">
                <h3 className="text-[13.5px] font-semibold tracking-tight-bank text-ink">Relocation intake</h3>
                <p className="text-[11px] text-ink-subtle">Natural language · refines dynamically</p>
              </div>
              <Badge variant="secondary" className="gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-signal-positive" /> Listening
              </Badge>
            </div>

            {/* Conversation */}
            <div className="space-y-3 px-4 py-4">
              {CONVERSATION.map((turn) => (
                <Bubble key={turn.id} role={turn.role} text={turn.text} />
              ))}
              {resolved && <Bubble role="assistant" text={RESOLVED_SUMMARY} highlight />}
            </div>

            {/* Composer input */}
            <div className="border-t border-hairline bg-canvas-subtle/30 px-4 py-3">
              <div className="rounded-lg border border-hairline bg-card p-2 shadow-card-sm focus-within:ring-2 focus-within:ring-iris/30">
                <textarea
                  value={brief}
                  onChange={(e) => setBrief(e.target.value)}
                  rows={2}
                  className="w-full resize-none border-0 bg-transparent px-2 py-1 text-[13px] leading-relaxed text-ink outline-none placeholder:text-ink-faint"
                  placeholder="Describe your move in plain English…"
                />
                <div className="flex items-center justify-between gap-2 px-1 pt-1">
                  <button
                    type="button"
                    onClick={() => toast({ title: 'Voice intake', description: 'Dictate your brief — transcribed and parsed live.', tone: 'info' })}
                    className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[11.5px] text-ink-subtle transition-colors hover:bg-canvas-subtle hover:text-ink"
                  >
                    <Mic className="h-3.5 w-3.5" /> Voice
                  </button>
                  <Button size="sm" className="gap-1.5" onClick={resolve}>
                    <Wand2 className="h-3.5 w-3.5" />
                    {resolved ? 'Re-resolve matches' : 'Resolve matches'}
                  </Button>
                </div>
              </div>

              {/* Refinement chips */}
              <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                <span className="text-[10.5px] uppercase tracking-wide-eyebrow text-ink-subtle">Refine</span>
                {REFINEMENTS.map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => refine(r)}
                    className="rounded-full border border-hairline bg-card px-2.5 py-1 text-[11.5px] text-ink-muted transition-colors hover:border-iris/40 hover:text-iris-deep"
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Results */}
          {resolved ? (
            <section className="flex flex-col gap-3.5">
              <div className="flex flex-wrap items-end justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-[17px] font-semibold tracking-tight-bank text-ink">Top neighborhood matches</h3>
                    <Badge variant="iris" className="gap-1">
                      <Sparkles className="h-3 w-3" /> ranked by Buyer DNA fit
                    </Badge>
                  </div>
                  <p className="mt-0.5 text-[12px] text-ink-subtle">
                    5 clusters surfaced from {formatNumber(5000)} neighborhoods · each scored on five indices with a confidence band.
                  </p>
                </div>
              </div>

              {NEIGHBORHOOD_MATCHES.map((m, i) => (
                <NeighborhoodMatchCard
                  key={m.id}
                  match={m}
                  onView={(mm) => toast({ title: `${mm.name}`, description: 'Opening the neighborhood intelligence deep-dive.', tone: 'info' })}
                  className="animate-fade-in"
                  style={{ animationDelay: `${i * 70}ms` }}
                />
              ))}
            </section>
          ) : (
            <EmptyResults onResolve={resolve} />
          )}
        </div>

        {/* Right rail */}
        <aside className="flex flex-col gap-5">
          <BuyerDNAPanel constraints={BUYER_DNA} />

          <section className="overflow-hidden rounded-xl border border-hairline bg-card shadow-card-sm">
            <div className="flex items-center justify-between gap-2 border-b border-hairline px-4 py-3">
              <div>
                <h3 className="text-[13.5px] font-semibold tracking-tight-bank text-ink">Suggested specialists</h3>
                <p className="text-[11px] text-ink-subtle">
                  {resolved ? 'Matched to your top neighborhoods' : 'Matched to your Buyer DNA'}
                </p>
              </div>
              <Badge variant="secondary">Top 3</Badge>
            </div>
            <div className="flex flex-col gap-2.5 p-3">
              {AGENT_SUGGESTIONS.map((a) => (
                <AgentSuggestionCard
                  key={a.id}
                  agent={a}
                  onConnect={(ag) => toast({ title: `Intro requested`, description: `${ag.name} will reach out to schedule. We shared your Buyer DNA, not your contact details.`, tone: 'success' })}
                />
              ))}
            </div>
          </section>
        </aside>
      </div>

      {/* Signature AI generation flow */}
      <AIGenerationFlow
        open={flowOpen}
        onClose={() => setFlowOpen(false)}
        title="Resolving your relocation brief"
        subtitle="Buyer DNA → multi-constraint reasoning → ranked matches"
        steps={FLOW_STEPS}
        stepDurationMs={520}
        onComplete={() => {
          setResolved(true)
          toast({ title: 'Matches ready', description: 'Mueller leads your top 5 at a 94% fit.', tone: 'success' })
        }}
        result={<TopMatchArtifact lead={lead} />}
      />
    </div>
  )
}

function Bubble({ role, text, highlight }: { role: 'assistant' | 'user'; text: string; highlight?: boolean }) {
  const isAssistant = role === 'assistant'
  return (
    <div className={cn('flex items-start gap-2.5', isAssistant ? '' : 'flex-row-reverse')}>
      <span
        className={cn(
          'mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full text-[11px] font-semibold',
          isAssistant ? 'bg-iris-soft text-iris-deep' : 'bg-teal text-canvas tabular',
        )}
      >
        {isAssistant ? <Sparkles className="h-3.5 w-3.5" /> : 'MD'}
      </span>
      <div
        className={cn(
          'max-w-[82%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed',
          isAssistant
            ? cn('rounded-tl-sm border bg-card text-ink-muted', highlight ? 'border-iris/30 bg-iris-soft/40' : 'border-hairline')
            : 'rounded-tr-sm bg-teal text-canvas',
        )}
      >
        {text}
      </div>
    </div>
  )
}

function EmptyResults({ onResolve }: { onResolve: () => void }) {
  return (
    <section className="relative overflow-hidden rounded-xl border border-dashed border-hairline-strong bg-card">
      <div className="map-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <div className="relative flex flex-col items-center justify-center gap-4 px-6 py-14 text-center">
        <span className="grid h-14 w-14 place-items-center rounded-2xl border border-hairline bg-card shadow-card-sm">
          <Compass className="h-6 w-6 text-teal" />
        </span>
        <div className="space-y-1.5">
          <h3 className="text-[16px] font-semibold tracking-tight-bank text-ink">Your matches will appear here</h3>
          <p className="mx-auto max-w-[420px] text-[12.5px] leading-relaxed text-ink-muted">
            Resolve your brief and the Copilot will rank the five neighborhoods that best fit your Buyer DNA — with the
            tradeoffs reasoned out, not hidden.
          </p>
        </div>
        <Button size="sm" className="gap-1.5" onClick={onResolve}>
          <Wand2 className="h-3.5 w-3.5" /> Resolve matches
          <ArrowRight className="h-3.5 w-3.5" />
        </Button>
      </div>
    </section>
  )
}

function TopMatchArtifact({ lead }: { lead: NeighborhoodMatch }) {
  const rows: Array<{ label: string; value: number }> = [
    { label: 'Commute fit', value: 96 },
    { label: 'School alignment', value: lead.indices.schools },
    { label: 'Affordability', value: lead.indices.affordability },
    { label: 'Lifestyle match', value: lead.indices.lifestyle },
  ]
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 rounded-lg border border-iris/30 bg-iris-soft/40 p-4">
        <ScoreRing value={lead.matchScore} caption="match" tone="iris" size={72} />
        <div className="min-w-0">
          <p className="text-[11px] uppercase tracking-wide-eyebrow text-iris-deep">Top match · {Math.round(lead.confidence * 100)}% confidence</p>
          <h4 className="text-[18px] font-semibold tracking-tight-bank text-ink">{lead.name}</h4>
          <p className="text-[12px] text-ink-muted">{lead.metro} · {lead.priceBand} · {lead.commuteMin} min downtown</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {rows.map((r) => (
          <div key={r.label} className="rounded-lg border border-hairline bg-card px-3 py-2.5">
            <div className="flex items-baseline justify-between">
              <span className="text-[11px] text-ink-subtle">{r.label}</span>
              <span className="font-mono text-[13px] font-semibold tabular text-ink">{r.value}%</span>
            </div>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-canvas-subtle">
              <div className="h-full rounded-full bg-gradient-to-r from-iris-deep to-iris" style={{ width: `${r.value}%` }} />
            </div>
          </div>
        ))}
      </div>

      <p className="rounded-lg border-l-2 border-iris/40 bg-canvas-subtle/50 px-3 py-2.5 text-[12.5px] leading-relaxed text-ink-muted">
        <span className="font-medium text-iris-deep">Why it leads: </span>
        {lead.tradeoff}
      </p>

      <p className="text-[12px] text-ink-subtle">Plus 4 more ranked matches and 3 suggested specialist agents — close this to explore them.</p>
    </div>
  )
}
