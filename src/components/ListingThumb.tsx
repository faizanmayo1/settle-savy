import type { ReactNode } from 'react'
import { Home } from 'lucide-react'

import { cn } from '@/utils/cn'

/**
 * Placeholder property "photo" — a tinted gradient with the map-grid texture and
 * a house glyph. Keeps the demo image-free while reading as a real listing card.
 */
export function ListingThumb({
  hue,
  className,
  badge,
}: {
  hue: string
  className?: string
  badge?: ReactNode
}) {
  return (
    <div
      className={cn('relative overflow-hidden', className)}
      style={{ background: `linear-gradient(135deg, ${hue} 0%, ${hue}cc 60%, ${hue}99 100%)` }}
    >
      <div className="map-grid pointer-events-none absolute inset-0 opacity-25 mix-blend-overlay" aria-hidden />
      <div className="absolute inset-0 grid place-items-center">
        <Home className="h-8 w-8 text-white/55" />
      </div>
      {badge && <div className="absolute left-2 top-2">{badge}</div>}
    </div>
  )
}
