import { cn } from '@/utils/cn'

interface TooltipRow {
  label: string
  value: string
  swatch?: string
}

interface ChartTooltipProps {
  title?: string
  rows: TooltipRow[]
  active?: boolean
  className?: string
}

export function ChartTooltip({ title, rows, active, className }: ChartTooltipProps) {
  if (!active) return null
  return (
    <div
      className={cn(
        'min-w-[160px] rounded-md border border-hairline bg-card px-3 py-2.5 shadow-card-md',
        className,
      )}
    >
      {title && <p className="text-[10px] uppercase tracking-wide-eyebrow text-ink-subtle">{title}</p>}
      <ul className="mt-1 space-y-1">
        {rows.map((row, i) => (
          <li key={i} className="flex items-center justify-between gap-3 text-[12px]">
            <span className="flex items-center gap-1.5 text-ink-muted">
              {row.swatch && (
                <span
                  className="inline-block h-2 w-2 rounded-[2px]"
                  style={{ backgroundColor: row.swatch }}
                  aria-hidden
                />
              )}
              {row.label}
            </span>
            <span className="font-semibold tabular text-ink">{row.value}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
