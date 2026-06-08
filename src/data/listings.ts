import type { LucideIcon } from 'lucide-react'
import { CircleDollarSign, Footprints, GraduationCap, Route as RouteIcon, ShieldCheck } from 'lucide-react'

export interface FitFactor {
  key: string
  label: string
  score: number
  icon: LucideIcon
  why: string
}

export interface Listing {
  id: string
  address: string
  neighborhood: string
  price: number
  fairValue: number
  beds: number
  baths: number
  sqft: number
  daysOnMarket: number
  fitScore: number
  confidence: number
  /** Hue used for the placeholder image gradient. */
  hue: string
  tags: string[]
}

export const HERO_LISTING: Listing = {
  id: 'berkman-4204',
  address: '4204 Berkman Drive',
  neighborhood: 'Mueller',
  price: 824000,
  fairValue: 871000,
  beds: 4,
  baths: 3,
  sqft: 2410,
  daysOnMarket: 12,
  fitScore: 87,
  confidence: 0.9,
  hue: '#0F766E',
  tags: ['Walkable', 'Corner lot', 'Solar', 'Near park'],
}

export const FIT_FACTORS: FitFactor[] = [
  { key: 'commute', label: 'Commute fit', score: 92, icon: RouteIcon, why: '18 min to downtown off-peak — comfortably inside your 30-minute target.' },
  { key: 'schools', label: 'School alignment', score: 85, icon: GraduationCap, why: 'Zoned to an 8.4-rated elementary; middle school is the soft spot at 7.9.' },
  { key: 'affordability', label: 'Affordability', score: 78, icon: CircleDollarSign, why: 'List sits below your ceiling, but $342/ft² runs above the Mueller median.' },
  { key: 'safety', label: 'Neighborhood safety', score: 88, icon: ShieldCheck, why: 'Top-quartile safety index; property-crime trend improving for 6 quarters.' },
  { key: 'lifestyle', label: 'Lifestyle match', score: 94, icon: Footprints, why: 'A block from the greenway and two coffee shops — your walkable-but-quiet brief.' },
]

export const FIT_EXPLANATION =
  "This home scores 87 because it nails the two factors you weighted highest — commute and lifestyle — while affordability and the middle-school zone pull it just below the 90s. It's priced 5% under our modelled fair value, which is why it also flags as a hidden gem."

export const ALTERNATIVES: Listing[] = [
  {
    id: 'zach-scott-1908',
    address: '1908 Zach Scott Street',
    neighborhood: 'Mueller',
    price: 798000,
    fairValue: 815000,
    beds: 4,
    baths: 3,
    sqft: 2280,
    daysOnMarket: 6,
    fitScore: 91,
    confidence: 0.92,
    hue: '#6366F1',
    tags: ['Better schools', 'Lower price'],
  },
  {
    id: 'caswell-5100',
    address: '5100 Caswell Avenue',
    neighborhood: 'Crestview',
    price: 812000,
    fairValue: 840000,
    beds: 4,
    baths: 2,
    sqft: 2120,
    daysOnMarket: 9,
    fitScore: 89,
    confidence: 0.89,
    hue: '#0E92C7',
    tags: ['9.2 schools', 'Quieter'],
  },
  {
    id: 'berkman-4600',
    address: '4600 Berkman Drive',
    neighborhood: 'Mueller',
    price: 769000,
    fairValue: 802000,
    beds: 4,
    baths: 3,
    sqft: 2360,
    daysOnMarket: 21,
    fitScore: 88,
    confidence: 0.87,
    hue: '#D97706',
    tags: ['Best value', 'Motivated seller'],
  },
]
