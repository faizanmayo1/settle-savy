import type { LucideIcon } from 'lucide-react'
import { Area, AreaChart, ResponsiveContainer } from 'recharts'

import { cn } from '@/utils/cn'

export interface KPICardProps {
  label: string
  value: string
  delta: string
  deltaTone: 'positive' | 'negative' | 'neutral'
  context?: string
  icon?: LucideIcon
  trend?: number[]
  trendTone?: 'teal' | 'positive' | 'warning' | 'risk' | 'info' | 'iris'
  className?: string
}

const toneText = {
  positive: 'text-signal-positive',
  negative: 'text-signal-risk',
  neutral: 'text-ink-muted',
} as const

const trendColors = {
  teal: { stroke: '#0F766E', fill: '#0F766E' },
  positive: { stroke: '#16A34A', fill: '#16A34A' },
  warning: { stroke: '#D97706', fill: '#D97706' },
  risk: { stroke: '#DC2626', fill: '#DC2626' },
  info: { stroke: '#0E92C7', fill: '#0E92C7' },
  iris: { stroke: '#4F46E5', fill: '#6366F1' },
} as const

export function KPICard({
  label,
  value,
  delta,
  deltaTone,
  context,
  icon: Icon,
  trend,
  trendTone = 'teal',
  className,
}: KPICardProps) {
  const sparkData = trend?.map((v, i) => ({ i, v })) ?? []
  const colors = trendColors[trendTone]
  const gradientId = `kpi-spark-${label.replace(/\s+/g, '-').toLowerCase()}`

  return (
    <div
      className={cn(
        'group relative flex flex-col gap-3 rounded-lg border border-hairline bg-card p-5 shadow-card-sm transition-shadow hover:shadow-card-md',
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-medium uppercase tracking-wide-eyebrow text-ink-subtle">{label}</p>
        {Icon && (
          <span className="grid h-7 w-7 place-items-center rounded-md bg-canvas-subtle text-ink-subtle transition-colors group-hover:text-teal">
            <Icon className="h-3.5 w-3.5" />
          </span>
        )}
      </div>

      <div className="flex items-end justify-between gap-4">
        <p className="text-[26px] font-semibold leading-none tracking-tight-bank text-ink tabular">{value}</p>
        {sparkData.length > 1 && (
          <div className="h-10 w-24 shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sparkData} margin={{ top: 2, right: 0, left: 0, bottom: 2 }}>
                <defs>
                  <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={colors.fill} stopOpacity={0.28} />
                    <stop offset="100%" stopColor={colors.fill} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="v"
                  stroke={colors.stroke}
                  strokeWidth={1.6}
                  fill={`url(#${gradientId})`}
                  isAnimationActive={false}
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
        <span className={cn('text-xs font-medium tabular', toneText[deltaTone])}>{delta}</span>
        {context && <span className="text-[11px] text-ink-subtle">{context}</span>}
      </div>
    </div>
  )
}
