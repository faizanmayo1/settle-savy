import { useLocation } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { findRouteByPath } from '@/routes/registry'

/**
 * On-brand placeholder for screens not yet built in this demo pass. Keeps the
 * shell and navigation fully functional while screens are added one per turn.
 */
export function ComingSoon() {
  const { pathname } = useLocation()
  const route = findRouteByPath(pathname)
  const Icon = route?.icon ?? Sparkles

  return (
    <div className="mx-auto flex w-full max-w-[1100px] flex-col items-center justify-center gap-6 py-20 text-center animate-fade-in">
      <div className="relative grid h-16 w-16 place-items-center rounded-2xl border border-hairline bg-card shadow-card-sm">
        <div className="accent-rule absolute inset-x-3 top-0" aria-hidden />
        <Icon className="h-7 w-7 text-teal" />
      </div>
      <div className="space-y-2">
        <Badge variant="iris" className="gap-1">
          <Sparkles className="h-3 w-3" /> Next in the build
        </Badge>
        <h2 className="text-[28px] font-semibold leading-tight tracking-tight-bank text-ink">
          {route?.label ?? 'Module'}
        </h2>
        <p className="mx-auto max-w-[560px] text-sm leading-relaxed text-ink-muted">
          {route?.description ?? 'This module is part of the SettleSavvy platform.'}
        </p>
      </div>
      <div className="flex items-center gap-2 rounded-full border border-hairline bg-card px-4 py-2 text-[12.5px] text-ink-subtle shadow-card-sm">
        <span className="h-1.5 w-1.5 rounded-full bg-signal-warning" />
        Designed next — added one screen per turn
        <ArrowRight className="h-3.5 w-3.5 text-ink-faint" />
      </div>
    </div>
  )
}
