import { Dna } from 'lucide-react'

import type { BuyerConstraint } from '@/types/copilot'
import { cn } from '@/utils/cn'

export function BuyerDNAPanel({ constraints }: { constraints: BuyerConstraint[] }) {
  return (
    <section className="overflow-hidden rounded-xl border border-hairline bg-card shadow-card-sm">
      <div className="flex items-center justify-between gap-2 border-b border-hairline px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-iris-soft text-iris-deep">
            <Dna className="h-4 w-4" />
          </span>
          <div>
            <h3 className="text-[13.5px] font-semibold tracking-tight-bank text-ink">Buyer DNA model</h3>
            <p className="text-[11px] text-ink-subtle">Parsed from your brief · weighted live</p>
          </div>
        </div>
        <span className="font-mono text-[11px] tabular text-ink-subtle">v3</span>
      </div>

      <ul className="divide-y divide-hairline">
        {constraints.map((c) => {
          const pct = Math.round(c.weight * 100)
          const Icon = c.icon
          return (
            <li key={c.id} className="px-4 py-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2.5">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-canvas-subtle text-ink-muted">
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-[12.5px] font-medium text-ink">{c.label}</p>
                    <p className="truncate text-[11px] text-ink-subtle">{c.value}</p>
                  </div>
                </div>
                <span
                  className={cn(
                    'shrink-0 rounded-full border px-1.5 py-0.5 text-[9.5px] font-medium uppercase tracking-wide-eyebrow',
                    c.hard
                      ? 'border-teal/25 bg-teal/8 text-teal'
                      : 'border-hairline bg-canvas-subtle text-ink-subtle',
                  )}
                >
                  {c.hard ? 'Must' : 'Prefer'}
                </span>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-canvas-subtle">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-iris-deep to-iris"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="w-8 shrink-0 text-right font-mono text-[10.5px] tabular text-ink-subtle">{pct}%</span>
              </div>
            </li>
          )
        })}
      </ul>

      <p className="border-t border-hairline bg-canvas-subtle/40 px-4 py-2.5 text-[11px] leading-relaxed text-ink-subtle">
        Weights update as you refine. The model continuously learns from the homes and neighborhoods you engage with.
      </p>
    </section>
  )
}
