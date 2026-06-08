import type { ReactNode } from 'react'

import { cn } from '@/utils/cn'

interface ChartCardProps {
  eyebrow?: string
  title: string
  subtitle?: string
  rightSlot?: ReactNode
  children: ReactNode
  footer?: ReactNode
  className?: string
  bodyClassName?: string
}

export function ChartCard({
  eyebrow,
  title,
  subtitle,
  rightSlot,
  children,
  footer,
  className,
  bodyClassName,
}: ChartCardProps) {
  return (
    <section className={cn('flex flex-col rounded-lg border border-hairline bg-card shadow-card-sm', className)}>
      <header className="flex flex-wrap items-start justify-between gap-3 px-6 pb-4 pt-5">
        <div className="min-w-0">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h3 className="mt-1 text-base font-semibold tracking-tight-bank text-ink">{title}</h3>
          {subtitle && <p className="mt-1 text-xs text-ink-muted">{subtitle}</p>}
        </div>
        {rightSlot && <div className="shrink-0">{rightSlot}</div>}
      </header>
      <div className={cn('flex-1 px-3 pb-4', bodyClassName)}>{children}</div>
      {footer && (
        <footer className="border-t border-hairline px-6 py-3 text-[11px] text-ink-subtle">{footer}</footer>
      )}
    </section>
  )
}
