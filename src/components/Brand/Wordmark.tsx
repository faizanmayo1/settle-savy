import { cn } from '@/utils/cn'

interface WordmarkProps {
  variant?: 'lockup' | 'mark' | 'wordmark'
  size?: 'sm' | 'md' | 'lg'
  tone?: 'default' | 'inverse'
  className?: string
}

/**
 * SettleSavvy identity. A deep-teal rounded square holding a location pin that
 * doubles as a home (a gabled roof inside the marker), with a single electric-iris
 * node at the pin's locus — the iris dot signals the AI/intelligence layer. The
 * wordmark sets "Settle" in the display serif and "Savvy" in the grotesk.
 */
export function Wordmark({ variant = 'lockup', size = 'md', tone = 'default', className }: WordmarkProps) {
  const sizing = {
    sm: { mark: 'h-5 w-5', text: 'text-sm', gap: 'gap-2' },
    md: { mark: 'h-6 w-6', text: 'text-base', gap: 'gap-2' },
    lg: { mark: 'h-8 w-8', text: 'text-xl', gap: 'gap-2.5' },
  }[size]

  const inkClass = tone === 'inverse' ? 'text-canvas' : 'text-ink'
  const markBg = tone === 'inverse' ? 'bg-canvas' : 'bg-teal'
  const stroke = tone === 'inverse' ? '#0F766E' : '#F6F8F8'

  return (
    <span className={cn('inline-flex items-center', sizing.gap, className)} aria-label="SettleSavvy">
      {variant !== 'wordmark' && (
        <span
          className={cn('relative inline-flex items-center justify-center rounded-[7px]', sizing.mark, markBg)}
          aria-hidden
        >
          <svg viewBox="0 0 24 24" className="h-[74%] w-[74%]" fill="none">
            {/* map pin / marker */}
            <path
              d="M12 2.6c-3.8 0-6.9 3-6.9 6.8 0 4.7 6.9 11.9 6.9 11.9s6.9-7.2 6.9-11.9c0-3.8-3.1-6.8-6.9-6.8Z"
              stroke={stroke}
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            {/* home roofline inside the marker */}
            <path
              d="M8.4 11.1 12 7.9l3.6 3.2"
              stroke={stroke}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9.5 10.7v3.0h5v-3.0"
              stroke={stroke}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* iris AI node */}
            <circle cx="12" cy="9.4" r="1.25" fill="#6366F1" />
          </svg>
        </span>
      )}

      {variant !== 'mark' && (
        <span className={cn('inline-flex items-baseline leading-none', sizing.text, inkClass)}>
          <span className="font-display font-semibold tracking-tight-bank">Settle</span>
          <span className="font-semibold tracking-tight-bank text-teal">Savvy</span>
        </span>
      )}
    </span>
  )
}
