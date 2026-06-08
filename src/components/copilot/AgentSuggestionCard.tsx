import { CalendarPlus, Star } from 'lucide-react'

import { Button } from '@/components/ui/button'
import type { AgentSuggestion } from '@/types/copilot'
import { cn } from '@/utils/cn'

export function AgentSuggestionCard({
  agent,
  onConnect,
  className,
}: {
  agent: AgentSuggestion
  onConnect?: (a: AgentSuggestion) => void
  className?: string
}) {
  return (
    <article className={cn('rounded-xl border border-hairline bg-card p-3.5 shadow-card-sm transition-shadow hover:shadow-card-md', className)}>
      <div className="flex items-start gap-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-teal text-canvas text-[12px] font-semibold tabular">
          {agent.initials}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p className="truncate text-[13.5px] font-semibold text-ink">{agent.name}</p>
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-iris-soft px-1.5 py-0.5 font-mono text-[10.5px] font-semibold tabular text-iris-deep">
              {agent.compatibility}
              <span className="font-sans text-[8.5px] uppercase tracking-wide-eyebrow">fit</span>
            </span>
          </div>
          <p className="truncate text-[11.5px] text-ink-subtle">{agent.title}</p>
          <p className="mt-0.5 truncate text-[11px] text-teal">{agent.neighborhoods}</p>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2">
        <Stat label="Win rate" value={`${Math.round(agent.successRate * 100)}%`} />
        <Stat label="Avg close" value={`${agent.avgDaysToClose}d`} />
        <Stat label="CSAT" value={`${(agent.satisfaction * 5).toFixed(1)}`} icon />
      </div>

      <p className="mt-3 text-[11.5px] leading-relaxed text-ink-muted">{agent.reason}</p>

      <Button variant="secondary" size="sm" className="mt-3 w-full gap-1.5" onClick={() => onConnect?.(agent)}>
        <CalendarPlus className="h-3.5 w-3.5" />
        Book intro call
      </Button>
    </article>
  )
}

function Stat({ label, value, icon }: { label: string; value: string; icon?: boolean }) {
  return (
    <div className="rounded-md border border-hairline bg-canvas-subtle/60 px-2 py-1.5 text-center">
      <p className="inline-flex items-center justify-center gap-0.5 font-mono text-[13px] font-semibold tabular text-ink">
        {icon && <Star className="h-3 w-3 fill-signal-warning text-signal-warning" />}
        {value}
      </p>
      <p className="mt-0.5 text-[9.5px] uppercase tracking-wide-eyebrow text-ink-subtle">{label}</p>
    </div>
  )
}
