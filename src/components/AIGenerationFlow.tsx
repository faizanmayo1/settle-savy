import { type ReactNode, useEffect, useRef, useState } from 'react'
import { CheckCircle2, type LucideIcon, Loader2, Sparkles, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/utils/cn'

export interface AIStep {
  label: string
  icon: LucideIcon
}

export interface AIGenerationFlowProps {
  open: boolean
  onClose: () => void
  title: string
  subtitle?: string
  steps: AIStep[]
  /** ms per step; total ≈ steps.length * this + 250. Default 620. */
  stepDurationMs?: number
  /** The generated artifact, revealed after the steps complete. */
  result: ReactNode
  /** Fired once when generation completes (e.g. to toast). */
  onComplete?: () => void
}

/**
 * SettleSavvy's signature "aurora scan" AI flow. While thinking, the panel washes
 * a faint teal→iris aurora with a sweeping scanline and a vertical stepper;
 * on completion it reveals a document-grade artifact. Overlay pattern mirrors
 * the command palette (no Dialog dependency).
 */
export function AIGenerationFlow({
  open,
  onClose,
  title,
  subtitle,
  steps,
  stepDurationMs = 620,
  result,
  onComplete,
}: AIGenerationFlowProps) {
  const [phase, setPhase] = useState<'thinking' | 'result'>('thinking')
  const [active, setActive] = useState(0)

  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete
  const stepsLenRef = useRef(steps.length)
  stepsLenRef.current = steps.length

  useEffect(() => {
    if (!open) return
    setPhase('thinking')
    setActive(0)
    const n = stepsLenRef.current
    const timers: number[] = []
    for (let i = 0; i < n; i++) {
      timers.push(window.setTimeout(() => setActive(i + 1), stepDurationMs * (i + 1)))
    }
    timers.push(
      window.setTimeout(() => {
        setPhase('result')
        onCompleteRef.current?.()
      }, stepDurationMs * n + 250),
    )
    return () => timers.forEach((t) => window.clearTimeout(t))
  }, [open, stepDurationMs])

  // Escape closes.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center px-4 pt-[10vh]">
      <button
        type="button"
        aria-label="Close"
        className="absolute inset-0 bg-ink/25 backdrop-blur-[2px] animate-fade-in"
        onClick={onClose}
      />

      <div className="relative w-full max-w-[640px] overflow-hidden rounded-xl border border-hairline bg-card shadow-card-lg animate-fade-in">
        <div className="accent-rule" aria-hidden />
        {/* Header */}
        <div className="flex items-start justify-between gap-3 border-b border-hairline px-5 py-4">
          <div className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-md bg-iris text-canvas">
              <Sparkles className="h-4 w-4" />
            </span>
            <div>
              <h3 className="text-[15px] font-semibold tracking-tight-bank text-ink">{title}</h3>
              {subtitle && <p className="mt-0.5 text-[11.5px] text-ink-muted">{subtitle}</p>}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-7 w-7 place-items-center rounded-md text-ink-subtle hover:bg-canvas-subtle hover:text-ink"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {phase === 'thinking' ? (
          // ─── Aurora-scan thinking state ───────────────────────────
          <div className="relative overflow-hidden px-5 py-6">
            <div className="aurora-wash pointer-events-none absolute inset-0" aria-hidden />
            {/* sweeping scanline */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-16 animate-scan-sweep bg-gradient-to-b from-transparent via-iris/15 to-transparent" aria-hidden />

            <ul className="relative space-y-3">
              {steps.map((step, i) => {
                const done = i < active
                const isActive = i === active
                const Icon = step.icon
                return (
                  <li key={step.label} className="flex items-start gap-3">
                    <span
                      className={cn(
                        'mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-md transition-colors',
                        done
                          ? 'bg-signal-positive-soft text-signal-positive'
                          : isActive
                            ? 'bg-iris-soft text-iris-deep'
                            : 'bg-canvas-subtle text-ink-faint',
                      )}
                    >
                      {done ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : isActive ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Icon className="h-4 w-4" />
                      )}
                    </span>
                    <div className="min-w-0 flex-1 pt-1">
                      <p
                        className={cn(
                          'text-[13px] font-medium',
                          done ? 'text-ink' : isActive ? 'text-ink' : 'text-ink-faint',
                        )}
                      >
                        {step.label}
                      </p>
                      {isActive && (
                        <div className="mt-2 space-y-1.5">
                          <div className="h-2 w-3/4 rounded bg-gradient-to-r from-canvas-subtle via-iris-soft to-canvas-subtle bg-[length:200%_100%] animate-shimmer" />
                          <div className="h-2 w-1/2 rounded bg-gradient-to-r from-canvas-subtle via-iris-soft to-canvas-subtle bg-[length:200%_100%] animate-shimmer" />
                        </div>
                      )}
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        ) : (
          // ─── Revealed artifact ────────────────────────────────────
          <>
            <div className="max-h-[60vh] overflow-y-auto px-5 py-5 animate-fade-in">{result}</div>
            <div className="flex items-center justify-between gap-2 border-t border-hairline bg-canvas-subtle/40 px-5 py-3">
              <span className="inline-flex items-center gap-1.5 text-[11px] text-ink-subtle">
                <Sparkles className="h-3 w-3 text-iris-deep" /> Generated by SettleSavvy AI · grounded, cited
              </span>
              <div className="flex items-center gap-2">
                <Button variant="secondary" size="sm" onClick={onClose}>
                  Close
                </Button>
                <Button size="sm" onClick={onClose}>
                  Save to workspace
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
