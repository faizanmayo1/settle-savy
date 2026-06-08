import type { ReactNode } from 'react'
import { Sparkles } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { cn } from '@/utils/cn'

interface PageHeaderProps {
  eyebrow: string
  title: string
  subtitle?: string
  /** Render the title in the Fraunces display serif (hero pages). */
  display?: boolean
  /** Small iris "AI" pill next to the eyebrow. */
  ai?: string
  actions?: ReactNode
  className?: string
}

export function PageHeader({ eyebrow, title, subtitle, display, ai, actions, className }: PageHeaderProps) {
  return (
    <header className={cn('flex flex-wrap items-end justify-between gap-4', className)}>
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="eyebrow">{eyebrow}</span>
          {ai && (
            <Badge variant="iris" className="gap-1">
              <Sparkles className="h-3 w-3" /> {ai}
            </Badge>
          )}
        </div>
        <h2
          className={cn(
            'font-semibold leading-tight tracking-tight-bank text-ink',
            display ? 'font-display text-[30px]' : 'text-[28px]',
          )}
        >
          {title}
        </h2>
        {subtitle && <p className="max-w-[700px] text-sm leading-relaxed text-ink-muted">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </header>
  )
}
